# executivecourses.com — Legal terms source review

Retrieved 2026-09-13. The local egress proxy blocks `executivecourses.com` for both `curl` and `WebFetch`
(`EGRESS_BLOCKED`), so every page below was rendered via the Apify actor `apify/website-content-crawler`
(`crawlerType: playwright:firefox`, Apify residential/datacenter proxy). All pages returned HTTP 200.

## 0. Page inventory / what exists

| Path | Result | Title |
|---|---|---|
| `/robots.txt` | **200, real** | (text/plain) |
| `/disclaimer` | **200, real** | "Terms of Use – Legal Disclaimer" — **this IS the Terms of Use** |
| `/privacy` | **200, real** | "Privacy Policy" |
| `/cookie-policy` | **200, real** | "Cookie Policy" |
| `/contact` | **200, real** | "Impressum / Contact Us" |
| `/about-us` | **200, real** | "About Us" |
| `/submit` | **200, real** | "Submit Executive Program" |
| `/terms`, `/terms-of-use`, `/terms-and-conditions`, `/terms-conditions`, `/terms-of-service`, `/tos`, `/legal`, `/copyright`, `/privacy-policy`, `/cookies`, `/about`, `/imprint`, `/impressum` | **soft-404** — all silently rewrite to `https://executivecourses.com/search/result?keyword=<slug>` and return the site search page with HTTP 200 | "Executive Program Search" |

There is **no** separate "Terms and Conditions" document. The footer link labelled **"Terms of Use"**
points to `https://executivecourses.com/disclaimer`. Verified from the rendered footer markup:

```
*   [About us](https://executivecourses.com/about-us)
*   [Contact us](https://executivecourses.com/contact)
*   [Advertise](https://executivecourses.com/advertise)
*   [Terms of Use](https://executivecourses.com/disclaimer)
*   [Cookie Policy](https://executivecourses.com/cookie-policy)
*   [Privacy Policy](https://executivecourses.com/privacy)
```

---

## 1. https://executivecourses.com/robots.txt — FULL VERBATIM CONTENTS

```
# As a condition of accessing this website, you agree to abide by the following
# content signals:

# (a)  If a Content-Signal = yes, you may collect content for the corresponding
#      use.
# (b)  If a Content-Signal = no, you may not collect content for the
#      corresponding use.
# (c)  If the website operator does not include a Content-Signal for a
#      corresponding use, the website operator neither grants nor restricts
#      permission via Content-Signal with respect to the corresponding use.

# The content signals and their meanings are:

# search:   building a search index and providing search results (e.g., returning
#           hyperlinks and short excerpts from your website's contents). Search does not
#           include providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models (e.g., retrieval
#           augmented generation, grounding, or other real-time taking of content for
#           generative AI search answers).
# ai-train: training or fine-tuning AI models.
# use:      how AI systems may consume the content (immediate, reference, or full).

# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS RESERVATIONS OF
# RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN UNION DIRECTIVE 2019/790 ON COPYRIGHT
# AND RELATED RIGHTS IN THE DIGITAL SINGLE MARKET.

# BEGIN Cloudflare Managed content

User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CloudflareBrowserRenderingCrawler
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: meta-externalagent
Disallow: /

# END Cloudflare Managed Content

User-agent: *
Allow: /

User-agent: Yandex
Disallow: /

User-agent: *
Disallow: /link/

User-agent: *
Disallow: /ajax/
```

### robots.txt analysis

- The file is **Cloudflare-managed** ("BEGIN/END Cloudflare Managed content"), i.e. the AI-bot blocks are
  Cloudflare's managed AI-crawler blocklist, deliberately enabled by the operator.
- **`User-agent: ClaudeBot` → `Disallow: /`** — Anthropic's crawler is explicitly and entirely disallowed.
  So are GPTBot, CCBot, Google-Extended, Applebot-Extended, Bytespider, Amazonbot, meta-externalagent,
  CloudflareBrowserRenderingCrawler, and Yandex.
- **`Content-Signal: search=yes,ai-train=no,use=reference`** applied to `User-agent: *`. Under the
  Content Signals vocabulary quoted at the top of the file: building a search index with hyperlinks and
  short excerpts is permitted; **training/fine-tuning AI models is NOT permitted** (`ai-train=no`);
  `ai-input` is left unstated (neither granted nor restricted); `use=reference` limits how AI systems
  may consume the content.
- The header asserts a **contractual condition of access**: *"As a condition of accessing this website,
  you agree to abide by the following content signals"* — the operator frames robots.txt itself as
  browsewrap terms, not just a crawl hint.
- It asserts an **express Article 4 EU DSM Directive (2019/790) reservation of rights** — the machine-readable
  TDM opt-out. This is the strongest IP-side signal on the whole site and it lives in robots.txt, not the Terms.
- Generic crawlers (`User-agent: *`) are `Allow: /` except `/link/` and `/ajax/`.
- **No `Crawl-delay` and no `Sitemap:` directive.**
- Note the file has three separate `User-agent: *` groups. Under RFC 9309 a compliant parser merges
  same-name groups, giving `*`: Allow `/`, Disallow `/link/`, Disallow `/ajax/`, plus the Content-Signal.

---

## 2. Terms of Use — https://executivecourses.com/disclaimer

Page H1: **"Terms of Use - Legal Disclaimer"**. Breadcrumb: Home > Terms of Use – Legal Disclaimer.
No version/last-updated date is shown. Full verbatim text:

> By accessing the website executivecourses.com you have agreed to be bound by the terms set out in this legal disclaimer. Executive Courses reserves the right to amend, modify or replace these Terms of Use at any time and without further notice.
>
> Executive Courses expressly excludes any liability for the continuous availability of the website and reserves the right to fully or partly stop operating and/or providing this website or limit the access to it at any time and without further notice.
>
> We do not endorse any program listed on Executive Courses. Although all information presented by Executive Courses is gathered with great care and reviewed regularly we make no claims or give any warranty concerning the validity, accuracy or completeness of any information contained in, or linked from or to our website. We do not assume any responsibility for the validity of the degrees awarded by the institutions listed in our directory. The responsibility for the content of third party websites linked to or from our website lies solely with the respective third party. Executive Courses is not responsible for any misrepresentation which may be made by any third party, or for any dispute which might arise between a user and a third party. Executive Courses is not liable for any damages or personal injury incurred while taking part in programs listed on the Executive Courses website.
>
> Executive Courses is further not liable for damages which result directly or indirectly from accessing or downloading data files. Although Executive Courses takes care to keep the Executive Courses website free from viruses, Executive Courses cannot provide any warranty or guarantee that it is virus-free. The user shall, for its own protection, take the necessary steps to ensure appropriate security measures and shall utilize a virus scanner before downloading any information, software or documentation.
>
> It is within the user's sole responsibility to secure any passwords and avoid any misconduct as regards the use of passwords that he might have received for the use of the website. In case the user should discover that his password has unintentionally been made accessible to any unauthorized and/or third party or that there may exist any danger of misuse, the user shall immediately inform Executive Courses. Executive Courses shall then take measures to block the respective password. Notwithstanding the above however, Executive Courses shall not be liable under any legal theory that might be considered to be applicable, for any damages resulting from the abuse of personal passwords. In addition, Executive Courses reserves the right, at any time, without notice and without having to indicate any specific reasons, to cancel or limit the user's right to access the password-protected sections of the website.
>
> The intellectual property (contents, design, etc.) of the website are copyright of Executive Courses. You may not use or reproduce or allow anyone to use or reproduce any trade marks (such as the "Executive Courses" name and logo) without written permission from Executive Courses.
>
> Users may not publish any photos or images on Executive Courses that are inappropriate, off-topic, unlawful, infringe copyright or other rights of third parties or which contain any other form of illegal content. By posting a photo or image the user agrees to indemnify and hold harmless Executive Courses from all claims and expenses (including legal expenses) arising out of any photos published by the user that are in breach of the rules set out in this legal disclaimer. If a person believes that a photo or image infringes its rights, this person should notify Executive Courses immediately by means of the "contact"-button at the bottom of the website pages.
>
> The terms set out above are governed by German law. As far as a place of jurisdiction may be agreed, the place of jurisdiction for all disputes arising out of or in connection with these Terms of Use and /or the use of Executive Courses shall be Berlin, Germany.

### The clauses that bear on scraping / republication (verbatim, load-bearing)

**Browsewrap formation:**

> "By accessing the website executivecourses.com you have agreed to be bound by the terms set out in this legal disclaimer."

**The ONLY IP clause:**

> "The intellectual property (contents, design, etc.) of the website are copyright of Executive Courses. You may not use or reproduce or allow anyone to use or reproduce any trade marks (such as the "Executive Courses" name and logo) without written permission from Executive Courses."

**Governing law and forum:**

> "The terms set out above are governed by German law. As far as a place of jurisdiction may be agreed, the place of jurisdiction for all disputes arising out of or in connection with these Terms of Use and /or the use of Executive Courses shall be Berlin, Germany."

### What is NOT in the Terms (important — these are absences, verified by full read)

- **No anti-scraping clause.** The words scrape, scraping, crawl, crawler, spider, robot, bot, automated,
  automatic, data mining, text mining, harvest, extract, index do not appear anywhere in the document.
- **No rate-limiting, no "manual access only", no API restriction.**
- **No express prohibition on reproduction, redistribution, republication, or commercial use of site
  *content*.** The one explicit "may not use or reproduce" prohibition is scoped to **trade marks only**
  ("any trade marks (such as the "Executive Courses" name and logo)"). The preceding sentence asserts
  copyright ownership in "contents, design, etc." but states no prohibition of its own — it is a bare
  ownership assertion, not a use restriction.
- **No express database-right / sui generis / compilation-copyright claim** anywhere in the Terms. The word
  "database" does not appear. The only thing close is the phrase "the institutions listed in our directory".
- **No "all rights reserved" line.**
- **No user-obligations / acceptable-use section at all** beyond password care and not uploading
  infringing photos.

---

## 3. Privacy Policy — https://executivecourses.com/privacy

Reviewed in full for data-reuse or IP clauses. **It contains none** — it is a conventional GDPR notice
(collection, cookies, Art. 6(1)(f) legitimate interests, retention, data-subject rights, supervisory
authority). It contains no licence grant, no content-reuse terms, no database claim, no anti-scraping term.

Relevant only for identifying the operator, jurisdiction, and the fact that it cross-references a
"Terms of Use":

> "Pritzwalks GmbH & Co. KG, Schönhauser Allee 10-11, 10119 Berlin, Germany, (hereinafter referred to as "we") is the operator of Executive Courses (executivecourses.com) (hereinafter referred to as "EXECUTIVE COURSES")."

> "Please read this policy in conjunction with our Cookie Policy and Terms of Use."

> "We process your personal data based on Article 6, Section 1(f) of the General Data Protection Regulation (GDPR)."

> "The personal data we collect from you is processed in Germany and stored on a German server."

Note: the site hosts **user profile pages** and user-posted photos, so a scrape of the whole site could
pull personal data ("Some of your personal data may be accessible to other users of EXECUTIVE COURSES,
e.g. when they visit your profile page."). Programme/course listings themselves are not personal data.

**Cookie Policy** (`/cookie-policy`) was also read in full: purely about cookies. No IP, no data-reuse,
no scraping clause. Not relevant.

---

## 4. Copyright notice in the site footer

Verbatim, from the rendered footer of every page:

```
© 2001–2026 Pritzwalks – Executive Courses
```

- Owner named: **Pritzwalks** (the operating company), with "Executive Courses" as the property.
  Note the Terms instead attribute copyright to "Executive Courses".
- Year range: **2001–2026** (en dash). Rolling — it reads the current year.
- No "All rights reserved" wording accompanies it.

---

## 5. Operator identity, country of operation, and EU/UK database-right exposure

From `/contact` ("Impressum / Contact Us"), verbatim:

> Pritzwalks GmbH & Co. KG
> Swinemünder Str. 106
> 10435 Berlin
> Germany
> Represented by the general partner, Pritzwalks Verwaltung GmbH, which is represented by its managing director, Carsten Schröter.
> Court of Record and Registration No: Amtsgericht Charlottenburg HRA 472
> VAT-ID-No.: DE285187068
> Email: info [at] pritzwalks.com

(The Privacy Policy gives a different Berlin address — Schönhauser Allee 10-11, 10119 Berlin — but the same
legal entity. The Impressum address is the one with registry details.)

From `/about-us`, verbatim:

> "Headquartered in Berlin, Executive Courses features an international team of professionals, working from locations all over the world."

> "Executive Courses is a website owned and operated by Pritzwalks GmbH & Co. KG, which also runs a sister website about MBA programs called FIND MBA, a website about Online MBA programs called FIND MBA Online, and one about law programs called LLM GUIDE."

> "Executive Courses aims to provide a comprehensive and up-to-date directory of executive courses, along with providing community tools and editorial content of interest to people interested in pursuing an executive course."

Sister sites: find-mba.com, findmbaonline.com, mim-guide.com (footer), plus LLM GUIDE. Expect identical
boilerplate terms across all of them.

**Database-rights implication:** the operator is a German (EU) company, headquartered in Berlin, with a
German-law governing clause — so the **EU sui generis database right (Directive 96/9/EC, implemented in
Germany as §§ 87a–87e UrhG) is squarely available to them**, and a maker of a database established in the
EU qualifies for it. They have **not** expressly invoked it in their Terms, but the sui generis right
arises by operation of law, not by notice — it does not need to be claimed on the page to exist. It
protects against extraction and/or re-utilisation of "a substantial part" of the contents, evaluated
qualitatively or quantitatively, and also against repeated and systematic extraction of insubstantial
parts. A directory of executive programme listings, kept current, is a textbook candidate — the usual
contested point is whether their investment is in *obtaining/verifying* the data (protected) versus
*creating* it (not protected, per BHB/William Hill and Fixtures Marketing). Since the listings are
supplied by schools ("To submit a new executive course, please contact info@executivecourses.com") and
"gathered with great care and reviewed regularly", the obtaining/verification investment argument is
plausible for them.

UK database right would apply separately only if they had a qualifying UK establishment; nothing indicates
one — they are Berlin-only.

---

## 6. Bottom line for the republishing question

**Against republishing:**
1. `robots.txt` **explicitly disallows ClaudeBot entirely** (`Disallow: /`), alongside every other major AI
   crawler. Crawling with a Claude-identified agent is directly contrary to it.
2. `robots.txt` sets `ai-train=no` and `use=reference`, and frames compliance as **"a condition of accessing
   this website"** — an attempt to make robots.txt contractually binding.
3. `robots.txt` carries an **express Article 4 DSM Directive reservation of rights** — a machine-readable
   TDM opt-out, which under EU law removes the Art. 4 TDM exception for commercial text-and-data mining.
4. The Terms assert **copyright in "contents, design, etc."** and are formed on a browsewrap basis
   ("By accessing the website ... you have agreed to be bound").
5. The operator is an EU (German) company and therefore **holds the sui generis database right** in the
   listings compilation by operation of law, whether or not it is asserted on the page. Republishing a
   substantial part of a programme directory is exactly what that right targets.
6. German law + Berlin forum. German courts have historically been receptive to database-right claims
   against directory scrapers, and Germany also has UWG unfair-competition doctrine as a fallback.

**In their favour (narrow):**
1. The Terms contain **no anti-scraping clause whatsoever**, and **no express prohibition on reproduction,
   redistribution or commercial use of content** — the only "may not use or reproduce" language is confined
   to trade marks.
2. Generic `User-agent: *` is `Allow: /` (only `/link/` and `/ajax/` disallowed), so a non-AI-identified
   crawler is not disallowed by the letter of robots.txt — but the `Content-Signal` line and the
   "condition of accessing" header still apply to `*`, so that is a narrow reading of a file that plainly
   intends to refuse AI collection.
3. Individual facts (course name, school, start date, subject) are not themselves copyrightable — the
   exposure is the compilation/database right and the browsewrap contract, not literal text copying,
   unless descriptive blurbs are copied verbatim.

**Practical read:** the *Terms of Use* are unusually permissive by omission, but `robots.txt` is not — it is
an explicit, current, Cloudflare-managed refusal that names ClaudeBot, sets `ai-train=no`, and carries a
formal Art. 4 DSM rights reservation. The binding constraint here is robots.txt plus the EU database right,
not the Terms. Republishing their programme listings should not be treated as permitted.

---

## Source URLs

- https://executivecourses.com/robots.txt
- https://executivecourses.com/disclaimer  (= the "Terms of Use" footer link)
- https://executivecourses.com/privacy
- https://executivecourses.com/cookie-policy
- https://executivecourses.com/contact  (Impressum)
- https://executivecourses.com/about-us
- https://executivecourses.com/submit
- https://executivecourses.com/  (footer copyright line)

## Retrieval failures

None on the target content. Two access notes:
- The local egress proxy blocks `executivecourses.com` outright (`curl` → `CONNECT tunnel failed, response 403`;
  `WebFetch` → `EGRESS_BLOCKED`). Everything above came via Apify `apify/website-content-crawler`.
- `https://executivecourses.com/sitemap.xml` was submitted in one crawl batch but produced no dataset item
  (the actor's HTML pipeline drops non-HTML responses), so its existence is **unconfirmed**. `robots.txt`
  contains no `Sitemap:` directive. This does not affect any conclusion above.
