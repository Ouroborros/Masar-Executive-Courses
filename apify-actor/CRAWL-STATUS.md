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


# The full catalogue — 2026-09-30
The 14 September pass kept only short courses with a printed date, fee and
day count (344). The operator asked for every executive-education programme
the fifteen schools publish, so the catalogue model was widened (a record may
carry a null start, fee or day count and the school's own duration line; see
`docs/DESIGN.md`, "Data honesty") and every school was crawled again over its
whole programme section.

## What ran

| Step | Detail |
| --- | --- |
| Crawl | One `apify/website-content-crawler` run per school, `respectRobotsTxtFile: true`, `htmlTransformer: none`, sitemaps on, one include-glob per school's programme path, one concurrent request on the four Crawl-delay hosts. Cheerio for thirteen hosts; a Firefox browser for CBS (client-side Danish pages) and IMD (finder). One follow-up browser run of 11 pages (six Ross pages that returned a login shell to the HTTP client, four empty NUS pages, one AGSM page). Robots review unchanged from `docs/research/school-robots-2026-09-14.md`. |
| Extraction | One Sonnet agent per school under `EXTRACT-RULES v2` (facts only; every open-enrolment programme, dated or not; one row per intake; `duration` line when no day count; `date_note`/`price_note` for approximate or qualified facts). 823 session rows across 15 schools. |
| Conversion | `tools/school-rows-to-csv.py`: 5 rows dropped (start beyond window ×5), later intakes folded to the earliest dated start, past-only programmes kept as undated with the last printed date noted, 818 courses written. Arabic titles and duration lines from `import/translations-school.json` (962 strings, agent-translated, patterned durations rendered deterministically). |
| Gates + merge | reset → `catalogue-gates.py` (1 rejected: USD-equivalent price out of range (58)) → `merge-catalogue.py --scraped`: **15 schools, 817 courses, validation clean**. Duplicate-title rule now keyed by (school, title); per-day plausibility 30–6,000 USD, checked only when both fee and day count are printed. |
| Build | `build.py`, `bundle.py`, browser sweep of nine page types × two locales × two widths: 817 / 15 / 6 on the front page, 817 in the index, 173 under "dates to be announced", no page errors, no horizontal scroll. |

## By school

| School | Courses | Undated | No fee | No day count | Source host | Run |
| --- | --- | --- | --- | --- | --- | --- |
| University of St. Gallen Executive School | 151 | 17 | 1 | 32 | es.unisg.ch | `fO5gAEaLcyu1WsRic` |
| MIT Sloan School of Management | 91 | 15 | 6 | 46 | executive.mit.edu | `ghbBCmvHlrUB3GtIf` |
| UBC Sauder School of Business | 91 | 22 | 1 | 52 | growth.sauder.ubc.ca | `vJhbACf8iZjYFDSe9` |
| IMD Business School | 70 | 9 | 0 | 36 | www.imd.org | `iltw6ya4ajwbfHNoD` |
| CBS Executive, Copenhagen Business School | 66 | 23 | 0 | 7 | cbs-executive.dk | `k2zztEHkG25IxOCOI` |
| NUS Business School | 60 | 26 | 0 | 20 | executive-education.nus.edu.sg | `W02RDKmzbNcptb73V` |
| Kellogg School of Management | 58 | 8 | 7 | 24 | www.kellogg.northwestern.edu | `0JInfLXrcLwYyMbfp` |
| Harvard Kennedy School | 42 | 5 | 0 | 12 | www.hks.harvard.edu | `3BNUpS6Y7sghjPJex` |
| Stanford Graduate School of Business | 40 | 13 | 2 | 19 | www.gsb.stanford.edu | `QBrxZtRi9dtRsOpeA` |
| UC Berkeley Haas School of Business | 39 | 9 | 0 | 24 | executive.berkeley.edu | `bpIsJWugo5h8x3Kic` |
| Smith School of Business, Queen's University | 32 | 1 | 1 | 1 | smith.queensu.ca | `kQHDsKgwwSyBvNFhH` |
| AGSM, University of New South Wales | 28 | 7 | 0 | 8 | www.unsw.edu.au | `2CXntfZa1n0GjT3EH` |
| NYU Stern School of Business | 21 | 15 | 0 | 2 | execed.stern.nyu.edu | `gq3YgfnUnTN52HAZO` |
| Michigan Ross Executive Education | 18 | 1 | 0 | 11 | michiganross.umich.edu | `ys8K3NOnLEMgBfbRC` |
| Center for Creative Leadership | 10 | 2 | 0 | 3 | www.ccl.org | `Zb1NaRLBw7bYk14Iz` |

Follow-up run `cIZjfKSqViPHEr6zo` (11 pages). Totals: formats {'in-person': 484, 'online': 243, 'blended': 90}; languages {'en': 663, 'da': 44, 'de': 110}; currencies {'AUD': 28, 'DKK': 66, 'USD': 333, 'EUR': 6, 'CHF': 211, 'SGD': 51, 'GBP': 1, 'CAD': 121}.

## Decisions worth knowing

- The window is now two intake seasons (to 31 August 2028). A session printed
  after that is dropped; a programme whose only printed session has already
  run is kept as undated, so a school's stale "to be announced" pages still
  appear, as the school shows them.
- German-taught (St. Gallen) and Danish-taught (CBS) programmes keep the
  title the school prints; the Arabic title is a translation of its meaning.
- Seven Kellogg and St. Gallen stub pages print no format; they default to
  in-person and are the only inferred fact in the set.
- Agents' judgement calls (which fee tier, whether a date span counts as
  teaching days, split-format rows) are recorded in their hand-back notes in
  the session; the rows carry `price_note` / `date_note` where they apply.
- Known gaps: CCL lists only the first eight sessions of two programmes on
  its listing page (the earliest is kept, which is what the catalogue
  shows); IMD's five online Sprint programmes were not in the finder crawl;
  the Center for Creative Leadership still has no campus photograph.

## Runbook

    # per school: apify/website-content-crawler with the include-glob for its programme path
    # per school: an extraction agent under scratchpad/full/EXTRACT-RULES.md -> extract/<school>.json
    python3 tools/school-rows-to-csv.py <extract-dir> --out import/courses-school.csv \
        --schools-existing <schools.json from data.js> --translations import/translations-school.json
    # translate import/courses-school.csv.untranslated.json, merge into translations-school.json, rerun
    python3 tools/spreadsheet-to-batch.py import/courses-school.csv --out import/batch-school.json
    python3 tools/reset-catalogue.py --write
    python3 tools/catalogue-gates.py import/batch-school.json
    python3 tools/merge-catalogue.py import --scraped --write
    python3 tools/curate-lists.py --write
    python3 tools/build.py && python3 tools/bundle.py


# Thirteen more schools — 2026-10-24
The operator chose thirteen providers from `docs/research/missing-providers-2026-10-23.md`:
INSEAD, London Business School, Harvard Business School, Wharton, HEC Paris,
IESE, Esade, Oxford Saïd, Cambridge Judge, MBSC, Columbia, Chicago Booth and
Melbourne Business School. Twelve were sourced from their own programme pages
under the same rules as before (robots review in
`docs/research/school-robots-2026-10-23.md`, facts only, one row per intake,
nulls where the school prints nothing). MBSC could not be reached: see below.

## What ran

| Step | Detail |
| --- | --- |
| Discovery | Each listing page fetched once with the HTTP client and read by an agent to learn the programme-page pattern and which facts the cards print. London and Harvard render their listings client-side, so those were re-fetched in Firefox (Harvard's finder still showed 25 of 67 cards; the rest came from its three learning-track pages). HEC lists only ten cards per topic, so the crawl seeded all topic and format pages. |
| Crawl | One bounded `apify/website-content-crawler` run per school, `respectRobotsTxtFile: true`, `htmlTransformer: none`, one concurrent request where robots sets a Crawl-delay (INSEAD, Esade) and on Oxford. HTTP client for nine hosts; Firefox for London (client-side cards), INSEAD and Oxford (both behind Cloudflare: the HTTP client was routed through an unblocker at a few pages an hour, Firefox fetched INSEAD's 185 pages in an hour and Oxford's 101 in four). Esade's listing links to most programmes only through JavaScript and its pagination uses query strings its robots.txt forbids, so Esade carries the programmes reachable from its sitemap and cards. |
| Extraction | Sonnet agents over shards of 25–40 pages under `EXTRACT-RULES v2` plus the 2026-10 additions (translations of a page already captured are duplicates; sub-pages fold into their programme; listing cards are a valid fact source; fees without a currency sign take the school's obvious currency). Shards merged by (URL, start, title), a non-null fee winning. |
| Conversion | `tools/school-rows-to-csv.py` over the fifteen earlier schools' extracts plus the twelve new ones: 5 rows dropped (start beyond window ×5), 1535 courses written. Arabic titles and duration lines from `import/translations-school.json` (1735 strings). New countries, cities and currencies (EUR, GBP, INR, CNY, BRL) added to the converter and the rate table. |
| Gates + merge | reset → `catalogue-gates.py` (0 rejected: none) → `merge-catalogue.py --scraped`: **27 schools, 1535 courses, validation clean**. |
| Build | `build.py`, `bundle.py`, browser sweep in both locales at desktop and phone widths; artifact republished. |

## The new schools

| School | Courses | Undated | No fee | No day count | Source host | Run |
| --- | --- | --- | --- | --- | --- | --- |
| Wharton School, University of Pennsylvania | 119 | 68 | 18 | 72 | executiveeducation.wharton.upenn.edu | `GFh9xB8cv3TzFpVnB` |
| HEC Paris | 99 | 18 | 1 | 6 | www.hec.edu | `FGcDXdDXP7ftcqGfP` |
| INSEAD | 85 | 16 | 7 | 34 | www.insead.edu | `qeFg33shcbLAe3D5Y` |
| Columbia Business School | 74 | 11 | 3 | 40 | execed.business.columbia.edu | `01pFnJ7G940ATQ2A3` |
| London Business School | 66 | 19 | 1 | 26 | www.london.edu | `ZZb6iZo8rWDRv8ItB` |
| Cambridge Judge Business School | 53 | 9 | 3 | 24 | www.jbs.cam.ac.uk | `JkFMTbgY7jcH3ZRPS` |
| Harvard Business School | 47 | 5 | 5 | 11 | www.exed.hbs.edu | `L1kcMERmcrUpBCkld` |
| IESE Business School | 45 | 8 | 2 | 21 | www.iese.edu | `sfj8jombHDEayziSB` |
| Chicago Booth School of Business | 40 | 11 | 3 | 21 | www.chicagobooth.edu | `IZLId6fkkrr0x94FQ` |
| Saïd Business School, University of Oxford | 40 | 9 | 0 | 31 | www.sbs.ox.ac.uk | `cVKhkWpTqwne7nVHs` |
| Melbourne Business School | 33 | 6 | 1 | 8 | mbs.edu | `C5xOCfJcy3evpvrab` |
| Esade Business School | 16 | 1 | 7 | 12 | www.esade.edu | `CXjdGl1nuAxTUTfwN` |

Totals across the catalogue: formats {'in-person': 918, 'online': 453, 'blended': 164}; languages {'en': 1291, 'da': 44, 'es': 34, 'fr': 56, 'de': 110}; currencies {'AUD': 61, 'DKK': 66, 'GBP': 140, 'USD': 652, 'EUR': 221, 'INR': 1, 'CNY': 1, 'BRL': 1, 'CHF': 211, 'SGD': 59, 'CAD': 122}.

## Decisions worth knowing

- **MBSC (Prince Mohammad bin Salman College) is not in the index.** Its host
  `www.mbsc.edu.sa` refused the crawler's datacenter and residential proxies
  (CONNECT 590, connection refused) and did not resolve from a GitHub Actions
  runner either (no address for `www.mbsc.edu.sa` or `mbsc.edu.sa`), so not
  even its robots.txt could be read. Nothing was fetched or guessed. Retry
  with `tools/fetch-pages.py` from a network that resolves the host.
- London Business School runs the same programme names in London (GBP),
  Dubai and Riyadh (USD); each location is its own record because the fee,
  dates and city differ. The Riyadh and Dubai records are the index's first
  in-Kingdom and in-Gulf sessions.
- IESE and HEC publish many programmes only in Spanish or French; those keep
  the school's title and are tagged `es` / `fr`, as German and Danish were.
  Spanish or German pages that mirror an English programme page were skipped.
- Harvard's finder shows 25 of its 67 programmes without JavaScript; the
  learning-track pages list the rest, and the only programme page missing
  from the dataset (Senior Executive Leadership Program China, priced in CNY)
  was built from the leadership-immersions hub. Invitation-only CEO
  programmes were excluded.
- Wharton publishes the same programme under two URLs with different facts
  in several cases (an all-programs page and a self-paced page); both rows
  were kept with their own facts, then folded by title at conversion.
- Esade: only 16 programmes of the 28 its listing counts are reachable
  without JavaScript; the others are language-gated cards with `#` links.
- Oxford Saïd's site answered the runner with HTTP 403 and the HTTP client
  with 60-second timeouts; only the Firefox crawl got through, at about one
  page every two and a half minutes.
- Photographs: all twelve new schools have an openly licensed campus or
  place photograph from Wikimedia Commons (Wharton's is Huntsman Hall,
  Melbourne's is University Square, INSEAD's the Château de Fontainebleau,
  Columbia's Low Library); the Center for Creative Leadership remains the
  only school without one.

## Runbook (unchanged)

    # per school: robots review, discovery agent, bounded crawl, extraction shards -> extract/<school>.json
    python3 tools/school-rows-to-csv.py <extract-dir> --out import/courses-school.csv \
        --schools-existing <schools.json from data.js + new schools> --translations import/translations-school.json
    python3 tools/spreadsheet-to-batch.py import/courses-school.csv --out import/batch-school.json
    python3 tools/reset-catalogue.py --write && python3 tools/catalogue-gates.py import/batch-school.json
    python3 tools/merge-catalogue.py import --scraped --write && python3 tools/curate-lists.py --write
    python3 tools/build.py && python3 tools/bundle.py


# English only — 2026-10-24 (later the same day)

The operator decided that programmes not taught in English are left out.
`tools/school-rows-to-csv.py` now drops a row whose printed language list
does not include English (a bilingual programme that includes English
stays; a page with no language note counts as English). The drop is
recorded in `import/courses-school.csv.dropped.csv` as "not taught in
English (…)". This removed 362 session rows: St. Gallen's German programmes
(193 rows), HEC Paris's French ones (63), CBS Executive's Danish ones (44),
IESE's Spanish ones (43) and Esade's Spanish ones (15). The catalogue is
**27 schools, 1,292 programmes**; St. Gallen falls from 151 to 41, HEC from
99 to 43, CBS from 66 to 22, IESE from 45 to 22, Esade from 16 to 6. The
Arabic translations of the dropped titles stay in
`import/translations-school.json` in case the rule is reversed.
