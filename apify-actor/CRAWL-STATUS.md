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

---

# Follow-up run — 2026-08-23 (gap closed)

The "one remaining gap" above is closed. Reading the diagnostic dataset
`IhclEQclPkDnkCx3y` first (as this file suggested) showed the upcoming-sessions
tables ARE server-rendered — the first crawl's text transformer had merely
pruned them. No browser engine was needed.

## What ran

| Step | Detail |
| --- | --- |
| Crawler | `apify/website-content-crawler`, cheerio, `htmlTransformer: "none"`, robots.txt respected, maxConcurrency 2 |
| Runs / datasets | `lYzNoUM7a6VvgeVDT` → `0TUcb8puHq2qKqvFB` (19 of 21 school pages; Stanford + Harvard Kennedy dropped by canonical dedup) and `JeM9iIzFXL9Acdypb` → `rfRYHMF4aFocpvwrD` (those 2 pages); 23 requests, 0 failures |
| Capture | url + markdown of all 21 school pages → `apify-actor/dataset.executivecourses-schools.json` |
| Extraction | in-session LLM extraction, facts only, sessions starting 2026-09-01 – 2027-08-31 → 500 rows, 19 schools, in `import/courses-scraped.csv` (replaces the 63 out-of-window rows; those remain in git history). Every extracted fee was mechanically verified to sit adjacent to its course title in the source capture. |
| Conversion | `spreadsheet-to-batch.py` → 134 USD rows; 365 non-USD/UNKNOWN-currency rows honestly rejected to `*.rejected.csv` (AUD 29, CAD 80, CHF 134, DKK 24, GBP 1, INR 7, SGD 10, UNKNOWN 80 — bare fees on non-US pages stay UNKNOWN per the rule above), 1 row lost to unparseable duration |
| Catalogue filter | post-filter before merge: 52 courses outside the 2–20-day / price-per-day gates and 12 later sessions of an already-kept course moved to `*.rejected.csv` |
| Merge + build | `merge-catalogue.py import --scraped --write`: **7 schools, 70 courses admitted, validation clean** → `assets/js/data.js`; `build.py` rebuilt the site |

## Extraction decisions (unchanged from above, plus)

- Section headings that denote on-campus delivery (Short program, Full-time
  program, Modular, Certificate Program, Executive Master's) map to
  `in-person`; Online → `online`; Blended/Hybrid → `blended`.
- `days`: the page's own "Duration: N days" wins; "N weeks" → N×5 (the
  convention the 2026-08-22 extraction used); otherwise the printed date span
  (end − start + 1). Rows with neither stay blank and are rejected downstream.
- Course titles (343 unique) were translated to Arabic for `title_ar`;
  summaries remain composed from extracted metadata only.
- The catalogue models one course per title with its next upcoming start, so
  later sessions of the same course were filed to the rejected CSV, not lost.

## Remaining honest limits

- Only US-school fees are USD-evidenced; the 365 non-USD/UNKNOWN rows await a
  currency-conversion decision by the operator before they can be admitted.
- Vlerick and IMI print bare fees with no currency marker anywhere on their
  pages (recorded as UNKNOWN, likely EUR — unproven, so not guessed).
- Site data quirks copied verbatim, not "fixed": a Michigan row prints a
  reversed date range; a CBS cohort prints 12,000 DKK where siblings print
  120,000; UCT fees are suffixed INR.

## Legal note

Unchanged: robots.txt respected, rates throttled; republishing judgement is
the operator's, and this file records that the operator directed the crawl.

---

# Currency policy adopted — 2026-08-23 (later the same day)

The operator decided: **keep each fee in the currency the source printed it
in, and offer SAR as a display option** (no conversion is baked into the
data). Implementation:

- Course records now carry `currency` (absent = USD). `spreadsheet-to-batch.py`
  no longer rejects non-USD fees — only rows whose currency is unknown
  (`UNKNOWN`, the Vlerick/IMI bare fees) stay rejected as unpriceable.
- `tools/fx.py` + an `fx` block in `assets/js/data.js` hold one dated,
  indicative rate table (SAR pegged at 3.75/USD; floating rates a snapshot,
  asOf 2026-01). Pipeline sanity checks (price range, per-day plausibility)
  run on the USD equivalent; the UI's SAR option converts at display time.
- `tools/catalogue-gates.py` (new) applies the merge's factual gates to a
  scraped batch beforehand — days 2–20, USD-equivalent price bounds, one
  course per title at its next start, titles already in the catalogue — and
  files every exclusion to `*.rejected.csv`, so the merge runs clean.
- UI: a currency selector in the site header (both locales) switches between
  "Course currency" and SAR; the price filter and price sorting compare
  USD equivalents so mixed currencies rank sensibly. Verified in-browser:
  CHF 10,900 renders as SAR 51,094 (× 1.25 × 3.75), Arabic pages render ر.س.

Result: merge admitted **10 more schools and 119 more courses** (CAD 44,
CHF 30, AUD 22, DKK 18, SGD 5, USD 1) on top of the 70 USD courses —
189 scraped courses across 17 schools now in the catalogue. Still excluded,
honestly: the 80 unknown-currency Vlerick/IMI rows, UCT's INR-suffixed fees
(fail the USD-equivalent plausibility floor — likely a source-site error),
and everything outside the 2–20-day scope.

---

# Demo data removed — 2026-08-23

The fictional portfolio-demo catalogue (30 invented schools, 168 invented
courses) is gone from `assets/js/data.js`; the site now serves only the 189
scraped listings across 17 real schools (UCT kept as a school record despite
zero admitted courses — its fees are INR-suffixed at the source). Collections
were repopulated from real courses only: six survive (AI, one-week,
first-time leaders, online, finance, negotiation), and the three whose
premise no real course can honestly satisfy (Arabic-taught, healthcare,
Africa) were dropped rather than padded. Eight flagship courses are marked
featured for the home page. Also fixed: the price slider's "No limit"
position no longer silently hides fees above its own 25k USD-equivalent
maximum.
