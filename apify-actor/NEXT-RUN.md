# Runbook: crawl executivecourses.com and fill the catalogue

For a Claude Code session that has the Apify MCP connector attached
(connectors bind only to interactively started sessions — if ToolSearch
finds no `call-actor` tool, stop and tell the user to reconnect Apify and
start a fresh session).

Context: executivecourses.com publishes no schema.org JSON-LD, so the crawl
only needs to capture clean page text; the factual fields are recovered
afterwards by `tools/llm-extract.py` (see its header for what it will and
will not extract).

## 1. Run the crawl

Preferred actor: `apify/website-content-crawler` (built to produce clean,
boilerplate-free text per page — exactly what the extraction pass needs).
Call it via the Apify MCP `call-actor` tool with this input:

```json
{
  "startUrls": [
    {"url": "https://executivecourses.com/"},
    {"url": "https://executivecourses.com/upcoming-courses"},
    {"url": "https://executivecourses.com/featured-courses"}
  ],
  "crawlerType": "cheerio",
  "includeUrlGlobs": [{"glob": "https://executivecourses.com/**"}],
  "maxCrawlPages": 60,
  "saveMarkdown": true,
  "respectRobotsTxtFile": true
}
```

Notes:
- The site is server-rendered; `cheerio` is enough (no browser needed).
- Keep `maxCrawlPages` modest on a first run; raise it only after checking
  the dataset looks right.
- Fallback if Website Content Crawler misbehaves: `apify/cheerio-scraper`
  with `input.cheerio.json` from this directory (our page function; every
  row carries `page_text`).

## 2. Save the dataset to the branch

Fetch ALL dataset items (no field projection — keep `url` and `text`), write
them as a JSON array to `apify-actor/dataset.executivecourses.json`, commit,
and push to `claude/executive-courses-scraper-m35i9b`. No PR.

## 3. Extraction and merge

With an `ANTHROPIC_API_KEY` available:

```bash
python3 tools/llm-extract.py --dataset apify-actor/dataset.executivecourses.json --out courses-llm.csv
python3 tools/spreadsheet-to-batch.py courses-llm.csv --out import/batch-scraped.json
python3 tools/merge-catalogue.py import --write
python3 tools/build.py
```

Without a key, the session's own model can perform the extraction in-session
(apply the prompt embedded in `tools/llm-extract.py` to each row's text and
write the same CSV columns), then continue from `spreadsheet-to-batch.py`.

`spreadsheet-to-batch.py` will reject rows with no Arabic fields — that is
by design (the site is bilingual). Translate the factual fields
(`title_ar`, minimally) before the merge, or run the merge and fix the
`.rejected.csv` it writes.

## Legal note (repeated from the main README)

robots.txt compliance is enforced by the crawlers, but it is not a licence.
Whether executivecourses.com's terms allow republishing its listings is the
operator's call, and running this runbook is the act of making it.
