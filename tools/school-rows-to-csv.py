#!/usr/bin/env python3
"""Fold the per-school extraction files into the pipeline's CSV contract.

    python3 tools/school-rows-to-csv.py <extract-dir> --out import/courses-school.csv \
        --translations import/translations-school.json

Each file in <extract-dir> is one extraction agent's output: {"school", "rows":
[...]} where every row is one programme SESSION with facts read from the
school's own page (see the EXTRACT-RULES the agents followed). This script:

  * drops rows that cannot be priced or dated (no start, no price, unknown
    currency) into <out>.dropped.csv with the reason, so nothing is lost silently;
  * keeps ONE session per (school, title): the earliest start in the window,
    the same "next intake" rule the catalogue has always used;
  * fills the school's Arabic name, city and country from the records already
    in data.js (new schools get their Arabic name from --schools-ar if given);
  * composes the English and Arabic summaries from the facts only — format,
    length, school, dates — exactly as the earlier pipeline did;
  * takes title_ar from the translations file (title -> Arabic). Rows without a
    translation are still written; spreadsheet-to-batch.py will reject them,
    which is the signal to translate the remainder.

Nothing here invents a fact. A blank stays blank.
"""

import argparse
import csv
import glob
import json
import os
import re
import sys
from datetime import date, datetime, timedelta

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

WINDOW = (date(2026, 9, 1), date(2027, 8, 31))
COLS = ["source_url", "school", "school_ar", "school_city", "school_city_ar",
        "school_country", "school_country_ar", "region", "title", "title_ar",
        "summary", "summary_ar", "subject", "format", "start", "end", "days",
        "price", "currency", "langs", "audience", "audience_ar", "highlights",
        "highlights_ar", "rating", "reviews", "scraped_at", "extraction"]

REGION_BY_COUNTRY = {
    "United States": "americas", "Canada": "americas",
    "Switzerland": "europe", "Denmark": "europe", "Germany": "europe",
    "Belgium": "europe", "United Kingdom": "europe", "Netherlands": "europe",
    "Singapore": "asia", "Australia": "oceania", "South Africa": "africa",
    "United Arab Emirates": "mena", "Saudi Arabia": "mena",
}
COUNTRY_AR = {
    "United States": "الولايات المتحدة", "Canada": "كندا", "Switzerland": "سويسرا",
    "Denmark": "الدنمارك", "Germany": "ألمانيا", "Belgium": "بلجيكا",
    "United Kingdom": "المملكة المتحدة", "Singapore": "سنغافورة",
    "Australia": "أستراليا", "South Africa": "جنوب أفريقيا",
}
CITY_AR = {
    "Cambridge": "كامبريدج", "Evanston": "إيفانستون", "Miami": "ميامي",
    "Ann Arbor": "آن آربر", "New York": "نيويورك", "Stanford": "ستانفورد",
    "Berkeley": "بيركلي", "Sydney": "سيدني", "Copenhagen": "كوبنهاغن",
    "Singapore": "سنغافورة", "Lausanne": "لوزان", "Kingston": "كينغستون",
    "Toronto": "تورونتو", "Vancouver": "فانكوفر", "St. Gallen": "سانت غالن",
    "Colorado Springs": "كولورادو سبرينغز", "Greensboro": "غرينزبورو",
    "San Diego": "سان دييغو", "Brussels": "بروكسل", "Berlin": "برلين",
    "Chicago": "شيكاغو", "Boston": "بوسطن", "San Francisco": "سان فرانسيسكو",
}
MONTH_AR = ["", "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو",
            "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
FORMAT_EN = {"in-person": "on-campus", "online": "online", "blended": "blended"}
FORMAT_AR = {"in-person": "حضوري", "online": "عبر الإنترنت", "blended": "مدمج"}


def d(iso):
    return datetime.strptime(iso, "%Y-%m-%d").date()


KEEP_CAPS = {"AI", "HR", "ESG", "SCTP", "AMP", "ECREF", "CFO", "CEO", "COO", "CMO",
             "CHRO", "CTO", "CXO", "MBA", "EMBA", "IT", "B2B", "M&A", "AMP)", "(AMP)",
             "UX", "PM", "ERP", "CAS", "DAS", "MAS", "HSG", "CAS-HSG", "NUS", "MIT",
             "IMD", "UBC", "II", "III", "IV", "USA", "UK", "EU", "R&D", "GM", "VP",
             "PMP", "SEO", "CRM", "DPO", "AGSM", "UNSW", "ETH", "UZH", "DEI", "KPI",
             "OKR", "LDP", "GAL", "&", "-", "–"}
SMALL = {"a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
         "of", "on", "or", "the", "to", "vs", "with", "via", "nor", "per"}


def untitle_caps(title):
    """NUS prints titles in capitals; the catalogue prints them in title case.
    Only touches strings that are entirely upper-case, and leaves acronyms."""
    letters = [c for c in title if c.isalpha()]
    if not letters or any(c.islower() for c in letters):
        return title
    out = []
    for i, w in enumerate(title.split(" ")):
        bare = w.strip("(),:;")
        if i and w.lower() in SMALL:
            out.append(w.lower())
        elif bare in KEEP_CAPS or (len(bare) <= 3 and bare.isalpha() and bare not in {"THE", "AND", "FOR", "NEW", "BIG", "LAW", "TAX", "KEY"}):
            out.append(w)
        else:
            out.append("-".join(p[:1] + p[1:].lower() for p in w.split("-")) if w.isupper() else w)
    return " ".join(out)


def tkey(title):
    return re.sub(r"[^a-z0-9\u0600-\u06ff]+", "", title.lower())


def days_ar(n):
    if n == 1:
        return "يوم واحد"
    if n == 2:
        return "يومين"
    if 3 <= n <= 10:
        return "{} أيام".format(n)
    return "{} يومًا".format(n)


def long_en(iso):
    x = d(iso)
    return "{} {} {}".format(x.day, x.strftime("%B"), x.year)


def long_ar(iso):
    x = d(iso)
    return "{} {} {}".format(x.day, MONTH_AR[x.month], x.year)


def summaries(row, school_ar):
    fmt = row["format"]
    n = int(row["days"])
    start, end = row["start"], row.get("end") or ""
    if not end:
        end = (d(start) + timedelta(days=n - 1)).isoformat() if fmt == "in-person" else ""
    en = "A {}-day {} program from {}".format(n, FORMAT_EN[fmt], row["school"])
    ar = "برنامج {} لمدة {} من {}".format(FORMAT_AR[fmt], days_ar(n), school_ar)
    if end:
        en += ", running {} to {}.".format(long_en(start), long_en(end))
        ar += "، من {} إلى {}.".format(long_ar(start), long_ar(end))
    else:
        en += ", starting {}.".format(long_en(start))
        ar += "، يبدأ في {}.".format(long_ar(start))
    return en, ar


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("extract_dir")
    ap.add_argument("--out", default="import/courses-school.csv")
    ap.add_argument("--translations", default=None,
                    help="JSON {english title: arabic title}")
    ap.add_argument("--schools-existing", default=None,
                    help="JSON of school records from data.js (name -> record)")
    ap.add_argument("--schools-ar", default=None,
                    help="JSON {school name: arabic name} for schools not in data.js")
    ap.add_argument("--stamp", default=date.today().isoformat())
    args = ap.parse_args()

    tr = json.load(open(args.translations, encoding="utf-8")) if args.translations else {}
    tr = {tkey(k): v for k, v in tr.items()}   # keyed loosely: caps and spacing vary
    existing = json.load(open(args.schools_existing, encoding="utf-8")) if args.schools_existing else {}
    extra_ar = json.load(open(args.schools_ar, encoding="utf-8")) if args.schools_ar else {}

    # Follow-up passes that resolved a day count from the page after the main
    # extraction: files named *-days.json, keyed by (source_url, start).
    fills = {}
    for path in glob.glob(os.path.join(args.extract_dir, "*-days.json")):
        for f in json.load(open(path, encoding="utf-8")):
            fills[(f.get("source_url", ""), f.get("start", ""))] = f

    rows, dropped = [], []
    for path in sorted(glob.glob(os.path.join(args.extract_dir, "*.json"))):
        if path.endswith("-days.json"):
            continue
        blob = json.load(open(path, encoding="utf-8"))
        for r in blob.get("rows", []):
            r = {k: ("" if v is None else str(v).strip()) for k, v in r.items()}
            r.setdefault("school", blob.get("school", ""))
            r["title"] = untitle_caps(re.sub(r"\s+", " ", r.get("title", "")).strip())
            f = fills.get((r.get("source_url", ""), r.get("start", "")))
            if f and not r.get("days") and f.get("days"):
                r["days"] = str(f["days"])
                r["end"] = r.get("end") or str(f.get("end") or "")
            why = []
            if not r.get("title"):
                why.append("no title")
            if not re.match(r"^\d{4}-\d{2}-\d{2}$", r.get("start", "")):
                why.append("no start date")
            elif not (WINDOW[0] <= d(r["start"]) <= WINDOW[1]):
                why.append("start outside window")
            if not re.match(r"^\d+(\.\d+)?$", r.get("price", "")):
                why.append("no price")
            cur = r.get("currency", "").upper()
            if cur in ("", "UNKNOWN"):
                why.append("currency unknown")
            # The extraction rule: the page's own day count wins; failing that,
            # end - start + 1 when both dates are printed and the span is at
            # most 20 days. Agents sometimes left the second step undone, so
            # it is applied here deterministically — same rule, no guessing.
            if not re.match(r"^\d+$", r.get("days", "")) and \
                    re.match(r"^\d{4}-\d{2}-\d{2}$", r.get("start", "")) and \
                    re.match(r"^\d{4}-\d{2}-\d{2}$", r.get("end", "")):
                span = (d(r["end"]) - d(r["start"])).days + 1
                if 1 <= span <= 20:
                    r["days"] = str(span)
            if not re.match(r"^\d+$", r.get("days", "")):
                why.append("no teaching days")
            if r.get("format") not in FORMAT_EN:
                why.append("format '{}'".format(r.get("format")))
            if why:
                dropped.append({"file": os.path.basename(path), "school": r["school"],
                                "title": r.get("title", ""), "start": r.get("start", ""),
                                "source_url": r.get("source_url", ""),
                                "reason": "; ".join(why)})
                continue
            r["currency"] = cur
            r["price"] = str(int(round(float(r["price"]))))
            rows.append(r)

    # One session per (school, title): the earliest start in the window.
    best = {}
    for r in rows:
        key = (r["school"], r["title"].lower())
        if key not in best or r["start"] < best[key]["start"]:
            best[key] = r
    later = len(rows) - len(best)
    rows = sorted(best.values(), key=lambda r: (r["school"], r["start"], r["title"]))

    out_rows, untranslated = [], set()
    for r in rows:
        ex = existing.get(r["school"], {})
        school_ar = ex.get("name_ar") or extra_ar.get(r["school"], "")
        city = r.get("city") or ex.get("city", "")
        country = r.get("country") or ex.get("country", "")
        title_ar = tr.get(tkey(r["title"]), "")
        if not title_ar:
            untranslated.add(r["title"])
        en, ar = summaries(r, school_ar or r["school"])
        out_rows.append({
            "source_url": r.get("source_url", ""),
            "school": r["school"], "school_ar": school_ar,
            "school_city": city, "school_city_ar": CITY_AR.get(city, ex.get("city_ar", "")) if city else "",
            "school_country": country, "school_country_ar": COUNTRY_AR.get(country, ex.get("country_ar", "")),
            "region": ex.get("region") or REGION_BY_COUNTRY.get(country, ""),
            "title": r["title"], "title_ar": title_ar,
            "summary": en, "summary_ar": ar,
            "subject": r.get("subject", ""), "format": r["format"],
            "start": r["start"], "end": r.get("end", ""), "days": r["days"],
            "price": r["price"], "currency": r["currency"],
            "langs": r.get("langs") or "en",
            "audience": "", "audience_ar": "", "highlights": "", "highlights_ar": "",
            "rating": "", "reviews": "",
            "scraped_at": args.stamp + "T00:00:00Z", "extraction": "school-page",
        })

    os.makedirs(os.path.dirname(os.path.abspath(args.out)) or ".", exist_ok=True)
    with open(args.out, "w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=COLS)
        w.writeheader()
        w.writerows(out_rows)
    with open(args.out + ".dropped.csv", "w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=["file", "school", "title", "start", "source_url", "reason"])
        w.writeheader()
        w.writerows(dropped)
    with open(args.out + ".untranslated.json", "w", encoding="utf-8") as fh:
        json.dump(sorted(untranslated), fh, ensure_ascii=False, indent=1)

    by_school = {}
    for r in out_rows:
        by_school[r["school"]] = by_school.get(r["school"], 0) + 1
    print("{} session rows read; {} dropped (see {}.dropped.csv); {} later intakes folded; "
          "{} courses written -> {}".format(len(rows) + len(dropped) + later, len(dropped),
                                            args.out, later, len(out_rows), args.out))
    for s, n in sorted(by_school.items(), key=lambda x: -x[1]):
        print("  {:3d}  {}".format(n, s))
    print("{} titles still need Arabic -> {}.untranslated.json".format(len(untranslated), args.out))


if __name__ == "__main__":
    main()
