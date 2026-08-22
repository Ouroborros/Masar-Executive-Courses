#!/usr/bin/env python3
"""Extract course metadata from captured page text with Claude.

    export ANTHROPIC_API_KEY=sk-ant-...        # or `ant auth login`
    python3 tools/llm-extract.py --dataset dataset.json --out courses.csv
    python3 tools/llm-extract.py --html page1.html page2.html --out courses.csv

The deterministic extractors (scrape-courses.py, the Apify page functions)
read schema.org JSON-LD. Some targets publish none — executivecourses.com is
one — so their rows arrive as `extraction: "meta"` with a title and nothing
else. This tool is the second pass for exactly those pages: it takes the
`page_text` the crawler captured, has Claude pull out ONLY the factual,
non-copyrightable data points (names, dates, fees, formats, locations), and
writes rows in the pipeline's column contract so the output feeds
spreadsheet-to-batch.py → merge-catalogue.py unchanged.

What it will not do: copy, summarise or paraphrase the source site's course
descriptions, marketing copy or syllabi. The extraction prompt forbids it and
the output schema has nowhere to put it. Facts are not copyrightable;
expression is — the summary/audience/highlights columns are left empty for a
human (or your own copywriting pass) to fill.

Input formats
    --dataset  Apify dataset export (.json array, .jsonl, or .csv) whose rows
               carry `source_url` and `page_text` (the cheerio page function
               and the actor both capture it). Rows already extracted from
               JSON-LD are skipped unless --all is given.
    --html     Raw saved pages; tags are stripped to text locally.

Same legal note as the crawlers: whether you may republish a site's listings
is governed by its terms, and that judgement is yours.
"""

import argparse
import csv
import json
import os
import re
import sys
from datetime import date, datetime, timezone

# The pipeline's column contract — keep in sync with scrape-courses.py and
# apify-actor/src/extract.py.
COLUMNS = [
    "source_url", "school", "school_city", "school_country",
    "title", "title_ar", "summary", "summary_ar",
    "subject", "format", "start", "days", "price", "currency", "langs",
    "audience", "audience_ar", "highlights", "highlights_ar",
    "rating", "reviews", "scraped_at",
]

MODEL = "claude-opus-5"

# The extraction contract, verbatim from the operator. The schema below
# enforces the output shape; this prompt carries the rules the schema cannot.
EXTRACTION_PROMPT = """\
You are an expert data extraction assistant specialized in processing public \
executive education program pages. Your task is to extract ONLY factual, \
non-copyrightable data points.

CRITICAL SAFETY RULE: Do not summarize, copy, or paraphrase the creative \
course descriptions, marketing text, or syllabi. Only extract the specific \
metadata fields requested below.

### EXTRACTION INSTRUCTIONS:
Analyze the input text and output a valid JSON object matching the exact \
schema below. If a field cannot be found, set its value to null. Clean and \
normalize all dates to YYYY-MM-DD format. Clean currency values to numbers \
only.

### TARGET JSON SCHEMA:
{
  "institution_name": "Official name of the university or business school",
  "program_name": "The exact official title of the course",
  "delivery_format": "Select exactly one: 'On-Campus', 'Online', or 'Hybrid'",
  "city": "City of delivery (null if 100% online)",
  "country": "Country of delivery (null if 100% online)",
  "tuition_fee": {
    "amount": Integer,
    "currency": "3-letter ISO code (e.g., USD, CHF, EUR)"
  },
  "duration": {
    "length_in_days": Integer,
    "type": "Select exactly one: 'Full-time', 'Part-time', or 'Modular'"
  },
  "dates": [
    {
      "start_date": "YYYY-MM-DD",
      "end_date": "YYYY-MM-DD"
    }
  ]
}

If the input text is not a page about one specific course or program (a
listing index, a school profile, an article), return null for program_name
and every other field you cannot attribute to a single program.
"""

SCHEMA = {
    "type": "object",
    "properties": {
        "institution_name": {"type": ["string", "null"]},
        "program_name": {"type": ["string", "null"]},
        "delivery_format": {"type": ["string", "null"]},
        "city": {"type": ["string", "null"]},
        "country": {"type": ["string", "null"]},
        "tuition_fee": {
            "type": ["object", "null"],
            "properties": {
                "amount": {"type": ["integer", "null"]},
                "currency": {"type": ["string", "null"]},
            },
            "required": ["amount", "currency"],
            "additionalProperties": False,
        },
        "duration": {
            "type": ["object", "null"],
            "properties": {
                "length_in_days": {"type": ["integer", "null"]},
                "type": {"type": ["string", "null"]},
            },
            "required": ["length_in_days", "type"],
            "additionalProperties": False,
        },
        "dates": {
            "type": ["array", "null"],
            "items": {
                "type": "object",
                "properties": {
                    "start_date": {"type": ["string", "null"]},
                    "end_date": {"type": ["string", "null"]},
                },
                "required": ["start_date", "end_date"],
                "additionalProperties": False,
            },
        },
    },
    "required": ["institution_name", "program_name", "delivery_format",
                 "city", "country", "tuition_fee", "duration", "dates"],
    "additionalProperties": False,
}

# Extraction schema → site format ids (same targets as FORMAT_ALIASES in
# spreadsheet-to-batch.py, which also accepts these ids unchanged).
FORMAT_MAP = {"on-campus": "in-person", "online": "online", "hybrid": "blended"}

TAG_RE = re.compile(r"<script\b.*?</script>|<style\b.*?</style>|<[^>]+>",
                    re.I | re.S)


def html_to_text(html):
    return re.sub(r"\s+", " ", TAG_RE.sub(" ", html)).strip()


def load_pages(args):
    """Yield (source_url, page_text) pairs from whichever input was given."""
    if args.dataset:
        path = args.dataset
        if path.lower().endswith(".csv"):
            with open(path, newline="", encoding="utf-8") as fh:
                items = list(csv.DictReader(fh))
        elif path.lower().endswith(".jsonl"):
            with open(path, encoding="utf-8") as fh:
                items = [json.loads(line) for line in fh if line.strip()]
        else:
            with open(path, encoding="utf-8") as fh:
                items = json.load(fh)
        for item in items:
            if not args.all and item.get("extraction") == "json-ld":
                continue  # already structured; no model needed
            text = (item.get("page_text") or "").strip()
            if text:
                yield item.get("source_url") or item.get("url") or "", text
            else:
                print("  skip (no page_text):",
                      item.get("source_url", "?"), file=sys.stderr)
    for path in args.html or []:
        with open(path, encoding="utf-8", errors="replace") as fh:
            yield "file://" + os.path.abspath(path), html_to_text(fh.read())


def pick_start(dates):
    """First upcoming start date, else the first parseable one."""
    starts = sorted(d.get("start_date") for d in dates or []
                    if d and re.match(r"^\d{4}-\d{2}-\d{2}$",
                                      str(d.get("start_date") or "")))
    today = date.today().isoformat()
    upcoming = [s for s in starts if s >= today]
    return (upcoming or starts or [""])[0]


def to_row(url, data, scraped_at):
    """Map the extraction schema onto the pipeline's columns."""
    row = {c: "" for c in COLUMNS}
    row["source_url"] = url
    row["scraped_at"] = scraped_at
    row["school"] = data.get("institution_name") or ""
    row["title"] = data.get("program_name") or ""
    row["school_city"] = data.get("city") or ""
    row["school_country"] = data.get("country") or ""
    row["format"] = FORMAT_MAP.get(str(data.get("delivery_format") or "").lower(), "")
    fee = data.get("tuition_fee") or {}
    row["price"] = fee.get("amount") if fee.get("amount") is not None else ""
    row["currency"] = fee.get("currency") or ""
    duration = data.get("duration") or {}
    days = duration.get("length_in_days")
    row["days"] = days if days is not None else ""
    row["start"] = pick_start(data.get("dates"))
    # Extra columns; spreadsheet-to-batch.py reads by header and ignores them.
    row["duration_type"] = duration.get("type") or ""
    row["dates_all"] = " | ".join(
        "{}..{}".format(d.get("start_date") or "?", d.get("end_date") or "?")
        for d in data.get("dates") or [])
    row["extraction"] = "llm"
    return row


def main():
    ap = argparse.ArgumentParser(
        description="LLM metadata extraction for pages without JSON-LD")
    ap.add_argument("--dataset", help="Apify dataset export (.json/.jsonl/.csv)")
    ap.add_argument("--html", nargs="*", help="raw saved page files")
    ap.add_argument("--out", default="courses-llm.csv", help="output CSV")
    ap.add_argument("--all", action="store_true",
                    help="also re-extract rows already marked json-ld")
    ap.add_argument("--max-chars", type=int, default=30000,
                    help="page text sent per request (default 30000)")
    ap.add_argument("--model", default=MODEL)
    args = ap.parse_args()
    if not args.dataset and not args.html:
        ap.error("give --dataset and/or --html")

    try:
        import anthropic
    except ImportError:
        sys.exit("needs the anthropic SDK: pip install anthropic")
    client = anthropic.Anthropic()  # key from env or `ant auth login`

    fieldnames = COLUMNS + ["duration_type", "dates_all", "extraction"]
    rows, skipped = [], 0
    for url, text in load_pages(args):
        try:
            response = client.messages.create(
                model=args.model,
                max_tokens=4096,
                system=EXTRACTION_PROMPT,
                messages=[{"role": "user", "content":
                           "### INPUT TEXT:\n" + text[:args.max_chars]}],
                output_config={"format": {"type": "json_schema",
                                          "schema": SCHEMA}},
            )
        except anthropic.APIStatusError as exc:
            print("  API error on {}: {}".format(url, exc), file=sys.stderr)
            skipped += 1
            continue
        if response.stop_reason == "refusal":
            print("  refused:", url, file=sys.stderr)
            skipped += 1
            continue
        data = json.loads(next(b.text for b in response.content
                               if b.type == "text"))
        if not data.get("program_name"):
            print("  not a course page:", url, file=sys.stderr)
            skipped += 1
            continue
        scraped_at = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        row = to_row(url, data, scraped_at)
        rows.append(row)
        print("  {}  [{} {} {}]".format(
            row["title"][:60], row["price"] or "-",
            row["currency"] or "", row["start"] or "no date"))

    with open(args.out, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print("{}: {} row(s), {} skipped".format(args.out, len(rows), skipped))
    if rows:
        print("next: python3 tools/spreadsheet-to-batch.py", args.out,
              "--out import/batch-scraped.json")


if __name__ == "__main__":
    main()
