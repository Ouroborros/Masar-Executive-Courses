# School sites — robots.txt review before adding thirteen schools (checked 2026-10-23)

Purpose: thirteen more schools are being sourced from their own published
programme pages (INSEAD, London Business School, Harvard Business School,
Wharton, HEC Paris, IESE, Esade, Oxford Saïd, Cambridge Judge, MBSC,
Columbia, Chicago Booth, Melbourne Business School). Before any programme
page was fetched, each host's `robots.txt` was read in full through
`apify/website-content-crawler` (the sandbox's egress proxy blocks the school
domains directly). The HTTP client discards `text/plain` bodies, so the files
were read with the actor's Firefox engine: run `SqzqNB6B892t9SPcJ`
(12 hosts). `www.mbsc.edu.sa` refused the connection from Apify's
datacenter proxy twice (CONNECT 590 / proxy connection refused); see the
MBSC row for the outcome.

## Result

None of the twelve hosts read names an AI crawler (ClaudeBot, GPTBot,
CCBot, anthropic-ai, Google-Extended) in a Disallow group and none carries
an Article 4 DSM text-and-data-mining reservation in `robots.txt`. One host,
IESE, carries a `Content-Signal` line: `search=yes, ai-input=yes,
ai-train=no`. This index is a search use (facts and a link back to the
school's page; nothing is trained on), which the signal permits. All
programme listing and programme detail paths are allowed for
`User-agent: *`. Constraints that do bind, and how the crawl honours them:

| Host | Binding rules for this crawl | Handling |
| --- | --- | --- |
| www.insead.edu | **Crawl-delay: 10**; `Disallow: /*?*`, `/*&*` (any query string), `/node`, `/node/*`, `/*.pdf$`, `/print`, `/taxonomy`, `/ajax`; search and user paths | Concurrency 1, bounded page budget; programme pages and their `-dates-fees` siblings only; no query strings, no PDFs |
| www.london.edu | `Disallow: /download-a-brochure`, `/request-a-call`, `/events/calendar`, `/event/calendar`, `/-/media`, `/login`, `/create-a-profile`, `/submit-cv`, six degree "welcome" pages, `/alumni/news-and-stories`, `/faculty-and-research/academic-research`; msnbot gets `Crawl-delay: 1` (not `*`) | Programme pages under `/programmes/executive-education/` and `/executive-education/courses-in-saudi-arabia/` only; no brochure, call or media paths |
| www.exed.hbs.edu | `Allow: /`; `Disallow: /*brochure.pdf`, `/admin`, `/api/auth`, `/test`, `/example`, `/experiments`, `/contentful-*`, `/check` | Programme pages only; no PDFs |
| executiveeducation.wharton.upenn.edu | `Disallow:` (empty — everything allowed); sitemap index published | None needed; still throttled |
| www.hec.edu | Drupal defaults (`/admin/`, `/search/`, `/user/*`, `/node/add/`, `/media/oembed`, `/core/`, `/profiles/`) | None needed; English pages only, no query strings |
| www.iese.edu | `Content-Signal: search=yes, ai-input=yes, ai-train=no`; `Disallow: /search`, `/?s=*`, facet query strings (`?areas=`, `?program_type=`, `?locations=`, `?lang=`, `?q=` …), `/*.pdf$` (research PDFs allowed), `/author/`, `/teacher/`, `/cat/`; sitemaps published for `/executive-education/` and `/focused/` | Sitemap-driven crawl of those two paths; no query strings, no PDFs |
| www.esade.edu | **Crawl-Delay: 8**; `Disallow: /*?` (any query string), `/faculty/cv/`, `/taxonomy/`, `/crm/`, legacy paths; sitemap for `/executive-education/` | Concurrency 1, bounded page budget; no query strings |
| www.sbs.ox.ac.uk | Drupal defaults plus search-filter query strings (`?f[`, `?field`, `?category_name`, `?overridden_year`), `/oxford-experience/blogs?*`, `/fb-search` | Programme pages only; no query strings |
| www.jbs.cam.ac.uk | `disallow: /executive-education/learn-more/`, `/*forms/`, `/*campaigns`, `/*reusable-elements`, `/*/feed/`, `/programmes/prospectus-information/`, `/brand/`, `/via/` | Open-programme pages only; no learn-more, forms or campaign paths |
| execed.business.columbia.edu | Long list of landing, download and thank-you pages (`/landing-*`, `/download-*`, `/upcoming-programs`, `/upcoming-online-programs`, `/c-suite-general-management` …), `/_next/data/`, `/api/`, `/search`, `/cart`, `/checkout`, `/account`, `/emba/*`, `/tokyo` | Programme pages from the `/all-programs` listing only; the disallowed calendar and landing pages are not fetched |
| www.chicagobooth.edu | `Disallow: /*.pdf`, `/landing/`, `/smlanding/`, `/topic/`, `/en/`, `/?source=`, `/?utm_source=`, `/executiveeducation/back-to-booth`, **`/executiveeducation/programs/leadership/organizational-resilience`**, `/masterclass-experience/`, admissions and internal paths | Programme pages only; the one disallowed programme page is excluded by glob; no PDFs |
| mbs.edu | `User-Agent: *` with no Disallow; sitemap `googlesitemap.xml` | None needed; still throttled |
| www.mbsc.edu.sa | Unreachable from Apify's datacenter proxy (CONNECT 590, then `NS_ERROR_PROXY_CONNECTION_REFUSED`); re-tried through a residential proxy group, see `CRAWL-STATUS.md` for the outcome | No page fetched until the file is read |

`apify/website-content-crawler` does not implement `Crawl-delay`, so for
INSEAD and Esade the run is pinned to one concurrent request and a bounded
page count instead. `respectRobotsTxtFile: true` is set on every content
crawl so the Disallow rules above are enforced by the crawler as well as by
the URL globs.

## What is and is not taken

Unchanged from `school-robots-2026-09-14.md`: facts only (programme title,
school, city, start date, teaching days or the school's own duration line,
fee and its currency as printed, delivery format, language of instruction,
and the page URL as provenance). No descriptions, learning outcomes, faculty
copy or testimonials are captured or reproduced.
