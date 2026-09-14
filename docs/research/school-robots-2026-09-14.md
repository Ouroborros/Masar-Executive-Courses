# School sites — robots.txt review before re-sourcing (checked 2026-09-14)

Purpose: the catalogue is being re-sourced from each school's own published
programme pages (see the CORRECTION in `apify-actor/CRAWL-STATUS.md`). Before
any page was fetched, every school's `robots.txt` was read in full through
`apify/website-content-crawler` (the sandbox's egress proxy blocks the school
domains directly). Fetched as `text/plain` files; run `l4MXxXIoHZsAZJYfx`
(13 hosts) and `rlFqV5jcSLKso8zce` (UNSW, Sauder), `j8AfpuEJcF5gKqbLC` (NYU Stern Exec Ed) and `XkaO8R3GjJ5o7mSXj` (Sauder Professional Growth).

## Result

None of the 17 hosts names an AI crawler (ClaudeBot, GPTBot, CCBot,
anthropic-ai, Google-Extended) in a Disallow group, none carries a
`Content-Signal` line, and none carries an Article 4 DSM text-and-data-mining
reservation. All programme listing and programme detail paths are allowed
for `User-agent: *`. Constraints that do bind, and how the crawl honours them:

| Host | Binding rules for this crawl | Handling |
| --- | --- | --- |
| www.hks.harvard.edu | `Disallow: /executive-education-program-finder?` (the finder *with query facets*); Drupal defaults | Crawl the bare finder and programme pages only, no `?` facet URLs |
| executive.mit.edu | Disallows tracking-parameter URLs, `*?tab`, `*?q=`, `/*-brochure`, `/mysloan/` | Programme pages only; no query strings |
| www.kellogg.northwestern.edu | Brochure/private media paths only | None needed |
| michiganross.umich.edu | Drupal defaults | None needed |
| www.stern.nyu.edu | Drupal defaults | None needed |
| www.gsb.stanford.edu | **Crawl-delay: 10**; `Disallow: /*.pdf`, `/node/`, `/sites/gsb/files/program-brochure`; a few bots (Maui, Semrush, Yisou) refused | Concurrency 1, small page budget; no PDFs |
| executive.berkeley.edu | Drupal defaults | None needed |
| www.unsw.edu.au (AGSM) | **Crawl-delay: 10**; `Disallow: /sites/default/files/`, `/node/` | Concurrency 1, small page budget |
| cbs-executive.dk | No robots.txt (404) | No restrictions; still throttled |
| www.cbs.dk | Drupal defaults; `Disallow: /?query=`, `/?keywords=` | No search URLs |
| www.ccl.org | `Disallow: /landing/`, `/region/global/`, `*?search_filters=`, `/*?*location=`, `/*?*month=`, `/*?*region=`, a few programme sub-pages (`/share-the-value/`, `/leadership-agility/`) | Path-based listing only; no filter query strings; skip the named sub-pages |
| www.imd.org | **Crawl-delay: 10**; `Disallow: /.pdf`, `/uupload/`; Amazonbot, Bytespider, Ahrefs, PetalBot, trendiction refused | Concurrency 1, small page budget; no PDFs |
| executive-education.nus.edu.sg | `Disallow:` (empty — everything allowed) | None needed |
| smith.queensu.ca | `Disallow: /executiveeducation/enroll/admin/`, `/executiveeducation/landing/*`, `/resources/*` | Programme pages only |
| www.sauder.ubc.ca | Drupal defaults; `Disallow: /sites/default/files/`, `/node/` | None needed |
| es.unisg.ch | **Crawl-delay: 10**; `/wp-admin/` only | Concurrency 1, small page budget |
| execed.stern.nyu.edu (NYU Stern Exec Ed, a Shopify storefront) | `Allow: /` for products, collections and pages; disallows cart, checkout, account, `sort_by`, `+` tag-combination and multi-`filter` collection URLs; a comment asks agents that *transact* to use its UCP/MCP endpoint — not relevant to reading a public listing | Crawl `/collections/take-a-course` and `/products/*` only; no filtered or sorted collection URLs |
| growth.sauder.ubc.ca (UBC Sauder Professional Growth — www.sauder.ubc.ca/executive-education redirects here) | Drupal defaults plus `Disallow: /courses?*`, `/*?courses*`, `/search?searchterm=*`, `/node/`, `/api/`, `/instructor/`; Meta's agents refused | Crawl the bare `/courses` page and course detail pages; no query-string pagination or search |

`apify/website-content-crawler` does not implement `Crawl-delay`, so for the
four hosts that set it the run is pinned to one concurrent request and a
bounded page count instead. `respectRobotsTxtFile: true` is set on every
content crawl so the Disallow rules above are enforced by the crawler as well
as by the URL globs.

## What is and is not taken

Facts only: programme title, school, city, start date, teaching days, fee and
its currency, delivery format, language of instruction, and the page URL as
provenance. No descriptions, learning outcomes, faculty copy or testimonials
are captured or reproduced. This is the same rule the earlier extraction used
(see `tools/llm-extract.py`), applied now to the schools' own pages, which
removes the aggregator database-right exposure entirely: each school
publishes its own programmes and an index citing those pages is ordinary
reference use.
