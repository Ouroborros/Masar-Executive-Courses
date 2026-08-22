# Crawl + extraction status — executivecourses.com

Date: 2026-08-22. Crawl run on Apify via the claude.ai connector.

## What ran

| Step | Detail |
| --- | --- |
| Crawler | `apify/website-content-crawler`, cheerio engine, robots.txt respected, maxConcurrency 2 |
| Run / dataset | run `qsXqIcYry6ufCNevn`, dataset `Ppgae0cX1eByqmLwv` — 62 pages, 0 failures, ~5 min |
| Coverage | home, upcoming-courses calendar, subject + region listing pages, ~20 school profile pages, articles, top-10 lists |
| Extraction | in-session LLM extraction (facts only, per the operator's extraction prompt) → `import/courses-scraped.csv` (63 course records, 19 schools) |
| Conversion | `spreadsheet-to-batch.py` → 45 USD courses in `import/batch-scraped.json` + 8 schools; 18 non-USD/unknown-currency fees honestly rejected to `*.rejected.csv` |
| Diagnostic | run `eMqTRhbuaD6I2F6Yl`, dataset `IhclEQclPkDnkCx3y` — 2 school pages with untransformed HTML, unread (connector dropped) |

## Extraction decisions (facts only, nothing invented)

- Currency is recorded exactly as the page suffixes it (CHF, CAD, AUD, DKK,
  SGD, INR). Bare fees on US-school pages are USD (those pages carry in-text
  `$` evidence and the site suffixes every non-USD fee). Bare fees on non-US
  pages are `UNKNOWN` — the capture strips currency symbols, and guessing
  would misprice EU schools in a UI that renders everything as `$`.
- Summaries are composed from extracted metadata only (format, length,
  school, dates). No creative copy from the source site is reproduced.
- `audience`, `highlights`, school `about`, `founded` are left empty:
  a fact-only scrape cannot fill them without inventing. `merge-catalogue.py
  --scraped` admits records with those fields empty (factual checks unchanged).

## The one remaining gap

`merge-catalogue.py` only admits courses starting 2026-09-01 – 2027-08-31
(the site is a forward-looking catalogue), 2–20 days long. The crawled
school-page tables are the *past sessions* panel — server-rendered — while
the *upcoming sessions* tables (fees paired with in-window dates) sit behind
client-side tabs the raw-HTTP crawl did not expand. The calendar page proves
the upcoming sessions exist (Aug 23 – Sep 07+ starts) but lists no fees.

**Next run:** re-crawl the ~20 school page URLs with a browser engine
(`crawlerType: "playwright:firefox"`) and a `clickElementsCssSelector` that
expands tabs (e.g. `[aria-expanded="false"], [role="tab"][aria-selected="false"]`),
or first read diagnostic dataset `IhclEQclPkDnkCx3y` (untransformed HTML) to
check whether the upcoming panels are actually server-rendered and merely
pruned by the text transformer. Then re-extract rows with start ≥ 2026-09-01,
convert, and:

    python3 tools/spreadsheet-to-batch.py import/courses-scraped.csv --out import/batch-scraped.json
    python3 tools/merge-catalogue.py import --scraped --write
    python3 tools/build.py

## Legal note

robots.txt was respected and request rates throttled on every run. Whether
executivecourses.com's terms permit republishing its listings is the
operator's decision; this file records that the operator directed the crawl.
