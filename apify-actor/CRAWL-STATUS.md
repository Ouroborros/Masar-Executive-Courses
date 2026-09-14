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

Request rates were throttled on every run. On the robots.txt claim, see the
CORRECTION section at the end of this file — it is not the clean bill of
health it reads as. Whether
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

---

# CORRECTION — source-site legal position (checked 2026-09-13)

**The "robots.txt was respected" line above is technically true and
substantively misleading. Read this section before any further crawl of
executivecourses.com, and before publishing the catalogue anywhere.**

The site's live robots.txt was fetched and read in full (see
`docs/research/source-site-legal-position.md` for the verbatim text). It
contains, alongside a permissive `Allow: /` for the generic `*` agent:

    User-agent: *
    Content-Signal: search=yes,ai-train=no,use=reference
    Allow: /

    User-agent: ClaudeBot
    Disallow: /

ClaudeBot is disallowed outright, as are GPTBot, CCBot, Google-Extended,
Applebot-Extended, Bytespider, Amazonbot, meta-externalagent and Yandex. The
file asserts contractual force ("As a condition of accessing this website,
you agree to abide by the following content signals") and carries an express
Article 4 reservation under EU Directive 2019/790, which is a formal
text-and-data-mining opt-out.

Our crawls ran through `apify/website-content-crawler`, which identifies as
itself and not as ClaudeBot, so the crawler's own robots.txt check passed
against the generic `*` rule. That is why the earlier runs completed without
complaint — but the site's signals are aimed squarely at this use, and
reaching the content through a differently-named agent does not convert a
refusal into permission.

Other findings that bear on republication:

- **Operator is EU-established**: Pritzwalks GmbH & Co. KG, Berlin, Germany.
  The sui generis **database right** (Directive 96/9/EC; §§ 87a–87e UrhG)
  therefore applies by operation of law, whether or not the site asserts it.
  It covers extraction or re-utilisation of a substantial part of the
  collection, and repeated systematic extraction of insubstantial parts.
  What we took — every session from all 21 school pages — is a substantial
  part on any reading.
- **Governing law and forum**: German law, Berlin.
- The Terms (at `/disclaimer`) are unusually weak on content: the only
  express prohibition attaches to their trade marks. There is no
  anti-scraping clause and no database claim in the document. The Terms are
  not the constraint here; robots.txt and the database right are.

**Consequence.** Republishing these listings should not be treated as
permitted. The data captured so far is fine to keep for development, but the
catalogue should not be made public from this source. The remedy is to
re-source from each school's own published programme pages (checking each
school's own robots.txt), which removes both the database-right and the
content-signal exposure against the aggregator, and is what a legitimate
index does in any case. See `docs/research/source-site-legal-position.md`.

---

# Re-sourced from the schools' own pages — 2026-09-14

The CORRECTION above is acted on. Every course in `assets/js/data.js` now
comes from the school's own programme page; nothing derives from
executivecourses.com any more. The aggregator-derived batch, CSV and school
records were deleted from `import/` (they remain in git history before this
commit).

## Before any page was fetched

`robots.txt` was read in full for all 17 hosts involved (through the crawler,
because the sandbox's egress proxy blocks the school domains and api.apify.com
alike). None names an AI crawler, none carries a Content-Signal line or an
Article 4 DSM reservation, and all programme paths are allowed. Four hosts set
`Crawl-delay: 10` (Stanford GSB, IMD, St. Gallen, UNSW); those crawls ran with
one concurrent request. Full table: `docs/research/school-robots-2026-09-14.md`.

## What ran

| Step | Detail |
| --- | --- |
| Discovery | Each school's listing page fetched once (cheerio), then read by an agent per school to learn the programme-page URL pattern and whether the listing itself carries dates and fees. Six listings render client-side (HKS, Kellogg, MIT Sloan, NYU Stern, IMD, Sauder); those were re-fetched in a browser and, where still partial, their programme pages were found through the site's own sitemap with a tight URL glob. |
| Crawl | One bounded run per school, `respectRobotsTxtFile: true`, `htmlTransformer: none`, markdown saved. 17 runs, ~900 pages, 0 failed requests. CBS Executive's Danish-taught programmes are published only at Danish-locale URLs whose facts render client-side; two attempts yielded nothing usable, so CBS carries only its 12 English-language pages. |
| Extraction | Sonnet agents, one per ~30 pages, following `EXTRACT-RULES` (facts only: title, school, city, start, end, teaching days, fee, currency as printed, format, language). Where a page embeds schema.org JSON-LD (HKS Events, CCL / MIT Sloan / St. Gallen / IMD Courses) the rows were built from that first, with the page text as fallback. 930 session rows across 15 schools. |
| Conversion | `tools/school-rows-to-csv.py` → `import/courses-school.csv`: 238 sessions filed as not priceable/datable for a short-course catalogue (232 of them multi-week programmes with no teaching-day count, 4 with no printed fee), 287 later intakes folded into their course's earliest start, 405 courses. Arabic titles from `import/translations-school.json` (409 titles, agent-translated, reviewed by sample). |
| Gates + merge | `spreadsheet-to-batch.py` → `catalogue-gates.py` (61 rejected: days outside 2–20 or fee implausible per day on the USD equivalent, all listed in `import/batch-school.json.rejected.csv`) → `reset-catalogue.py --write` → `merge-catalogue.py import --scraped --write`: **15 schools, 344 courses, validation clean**. |
| Lists + featured | `tools/curate-lists.py --write` refilled the six editorial sets by rule (8 each) and flagged one flagship per school for the eight largest schools. |
| Build | `tools/build.py`, verified in a browser: 344 / 15 / 6 on the front page, 344 in the index in both locales, record pages in both locales, no page errors. |

## By school

| School | Courses | Source host |
| --- | --- | --- |
| University of St. Gallen Executive School | 53 | es.unisg.ch |
| MIT Sloan School of Management | 45 | executive.mit.edu |
| UBC Sauder School of Business | 37 | growth.sauder.ubc.ca |
| Harvard Kennedy School | 30 | www.hks.harvard.edu |
| NUS Business School | 30 | executive-education.nus.edu.sg |
| Kellogg School of Management | 27 | www.kellogg.northwestern.edu |
| Smith School of Business, Queen's University | 27 | smith.queensu.ca |
| Stanford Graduate School of Business | 18 | www.gsb.stanford.edu |
| AGSM, University of New South Wales | 17 | www.unsw.edu.au |
| IMD Business School | 15 | www.imd.org |
| UC Berkeley Haas School of Business | 13 | executive.berkeley.edu |
| CBS Executive, Copenhagen Business School | 12 | cbs-executive.dk |
| Center for Creative Leadership | 8 | www.ccl.org |
| Michigan Ross Executive Education | 6 | michiganross.umich.edu |
| NYU Stern School of Business | 6 | execed.stern.nyu.edu |

UCT Graduate School of Business, which carried no admitted course, is no
longer a school record. The Center for Creative Leadership is one school
record again (home Greensboro); its sessions run in several cities and the
catalogue models a school's city, not a session's.

## Decisions worth knowing

- Danish is now a recognised language of instruction (`da`) across the
  pipeline and the site's language facet; CBS board programmes carry it.
- All-capitals titles (NUS) are printed in title case; acronyms are kept.
- A session with no printed teaching-day count takes `end − start + 1` only
  when both dates are printed and the span is 20 days or fewer — the same
  rule the extraction agents were given, applied once more deterministically.
- Seven currencies appear (USD, CHF, CAD, SGD, AUD, DKK, EUR), so the Method
  chapter's copy and the `plate__codes` line were updated to match.
- `merge-catalogue.py` no longer emits a leading comma into an emptied array
  (a JS elision that yielded an undefined first record).

## Runbook for the next intake season

    python3 tools/school-rows-to-csv.py <extract-dir> --out import/courses-school.csv \
        --schools-existing <schools.json from data.js> --translations import/translations-school.json
    python3 tools/spreadsheet-to-batch.py import/courses-school.csv --out import/batch-school.json
    python3 tools/catalogue-gates.py import/batch-school.json
    python3 tools/reset-catalogue.py --write
    python3 tools/merge-catalogue.py import --scraped --write
    python3 tools/curate-lists.py --write
    python3 tools/build.py && python3 tools/bundle.py

Crawl inputs and datasets are on the Apify account under the run ids in the
session transcript; the robots review lists the ones that matter.
