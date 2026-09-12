# Premium reference study — executive-programme marketplace (Masar)

Date: 2026-09-12. Method: direct fetch was egress-blocked, so pages were rendered through Apify (website-content-crawler, playwright:firefox) and a Playwright scraper that read *computed* styles in a 1440×900 viewport (font faces, heading sizes, first-screen elements, CTA styling, motion libraries, sticky/clip-path/blend counts, card geometry). Awwwards/CSSDA detail pages supplied tags, palettes, "element" lists and jury scores. Screenshots could not be downloaded (api.apify.com blocked for curl), so "first screen" descriptions come from measured element positions (y < 900px) and page text, not pixels.

Correction to the brief: Porto Business School's Awwwards recognition is an **Honorable Mention, 21 Feb 2018** (agency Fullsix Portugal / Foan82), not a Site of the Day. Tags on record: Business & Corporate, Culture & Education, Big Background Images, Unusual Navigation, Web Fonts; built with jQuery/SVG/Snap.svg. The 2018 build is gone; what is live now is a 2025–26 WordPress rebuild, which is what is described below.
Source: https://www.awwwards.com/sites/porto-business-school

---

## 1. Porto Business School — https://www.pbs.up.pt/en/

**Type.** One family only: **TWK Everett** (Weltkern grotesk), body 16px, headings weight 400. Hero h2 **64px / 76.8 lh**, sub-line 21.6px / 32.4. Section h2 **57.6px / 400**. Body ink `#101820`, ground **`#FCFCFA` warm off-white** (not pure white).

**First screen (1440 wide).** Top bar: "Companies / Innovation X Hub / Career Services / Access" + EN|PT switch; main nav Programs / Faculty & Research / Students / Insights / About PBS. Then a **full-bleed photo carousel, 1440×779, object-fit: cover, 6 slides** (class `gc-hero__container--carousel-split`), each slide = short 64px headline + 21.6px line + one pill CTA: "Scholarships / Talent is everywhere. Opportunity should be too. — Know More", "Your MBA matters, More than ever. — Know More", "Applications / This is where your next chapter begins. Applications until September 15. — Apply Now!", "#6 in the world / FT Online MBA Ranking 2026". Under the first slide, a **stat strip: `1.9M` in scholarships awarded in 2025 · `+5` diversity scholarships · `+50%` students with scholarships** — numerals set at display size.

**CTA.** Pill, **radius 48px, bg `#EFEADF` (sand) on dark ink, 16px/500, padding 8×24**: "Know More", "Apply Now!". Section CTAs invert to dark pill (`#101820` on off-white): "More events", "Insights", "Scholarships". Footer/portal uses an outlined uppercase 14px pill "SCHEDULE A MEETING".

**Grid.** Containers 1360 / 1312 / 1280; 3-col 416px cards; 2-col 776/408 splits. Cards have **no radius, no shadow; 1px hairline `#D3CABF`** dividers.

**Cards.** Events: `17:00` · `15` · `September` (numerals large) → title 28.8px → "Location Porto Business School · Value Free". Articles: label "Article" → title 28.8px → author/date line → one-line standfirst. Rankings section is a **list of ordinals as the image**: "6th FT Online MBA Ranking / 25th European Business School Ranking [Open] / 31st …".

**Motion.** No GSAP/Lenis. 303 CSS transitions, keyframes `fadeIn`, 6 clip-path elements, `mix-blend-mode: multiply` on one layer, navbar gets `--scrolled` state. No sticky elements. Photography: full-bleed, natural colour, cover-cropped; no duotone.

### Executive Education — https://www.pbs.up.pt/en/executive-education/

**First screen.** Breadcrumb "Start / Executive Education"; **h1 "Executive Education" 72px / 86.4 lh / weight 500 / letter-spacing −2.16px (−3%)** over a full-bleed 1440×800 photo; h2 21.6px "At PBS, everything starts with You!"; two paragraphs; no CTA in the hero.

**Then.** "Why PBS Executive Education?" = six reasons where the **numerals `1`–`6` are set as h3 at 57.6px** (the number *is* the visual), 3-col 416px. Split panel "FOR INDIVIDUALS / FOR COMPANIES" (2×592px). Then **h1 "Search" 72px** and a filter bar: Course · Area · Duration · Language · Mode of study → "Clear all" / **"See Results (40)"**.

**Programme rows (not cards).** "Showing results 1-8 to 40." Each row ≈291px tall, hairline separated:
`23 of september, 2026` → `Open Executive Program` → **title 28.8px** ("Leader Coach") → area ("Talent, Leadership and Personal Development") → `Mode of study On campus/Online` · `Language Portuguese` · `Duration 16 hours` → one-line description. **Fee is not shown.** Pagination = circular numbered buttons (radius 50%, dark fill). Advisor cards at the bottom: bg `#EBF4FF`, radius 12px, name / phone / email / "Contact" pill / "SCHEDULE A MEETING" outline.

---

## 2. MIT Sloan Executive Education — https://executive.mit.edu/ and https://executive.mit.edu/course

**Type.** **Futura LT Pro 800** for headings (tracked *positive*, +0.02em) + **Open Sans** body 14px. Ink `#222930`, white ground. Hero h2 **56px / 67.2 / 800 / ls 1.12px** "MIT Sloan Executive Education Programs". Section h2 40–48px 800. Sub-labels "Course Topics / Featured Courses" are 20px Open Sans 400.

**First screen.** Promo bar "Seats fill quickly — register now for Systematic Innovation… View Course". Mega-nav: For Individuals → Course Finder · Course Calendar · Courses by Format (**In Person / Live Online / Self-Paced Online / On-Demand Online / Executive Academies**, each with a one-line descriptor) · Courses by Topic · New Courses · Executive Certificates; For Organizations; Insights; About; Login/Sign Up; wishlist counter "0". Hero copy + **two 20px/700 buttons: "For Individuals" (filled MIT red `#A31F34`, radius 1.5px, padding 25×32) and "For Organizations" (outlined white)**. Measured first-screen media: cropped portraits 340×440 and 368×368 squares, object-fit cover (participant photos, natural colour). A cookie dialog ("Privacy Promise") occupied y≈792–860 on load.

**Hero-as-finder.** Block "Find Courses By": Topics dropdown (13 topics) + Format dropdown ("Format 4") + **"Find Courses"** red button + "Chat With An Advisor" + "View Course Calendar".

**Course card (featured + list page).** Certificate track label ("Digital Business") · tag "AI-FOCUSED" · title · topic chips · "EARN 2.0 EEUs" · a count (17) · format ("In Person") · **dates "Sep 22–23, 2026 + More Dates"** · "Explore". On /course the card carries a **label-value grid in uppercase micro-labels: STARTING / LOCATION / DURATION / COMMITMENT / TUITION** → "Sep 14–18, 2026 / Cambridge, MA / 5 days / 8 hours/day / $12,900", **repeated as one row per session** (Sep 14–18 · Nov 9–13), plus "Compare" and "Explore". Tray: "Add 2-4 courses to compare", "Recently Viewed Courses", Wishlist.

**Filters with counts.** "Displaying 91 results"; List / Calendar toggle; Sort by Start Date / Name / Newest / Topic; facets Format (In Person 46, Live Online 10, Self-Paced 30, On-Demand 5), Certificate Track, Topic, EEUs, Duration (1-3 Days 29 · 4-6 Days 13 · 1-3 Weeks 3 · +4 Weeks 33), Start Date (0-3 / 3-6 / 6+ months), **Tuition (Under $2,500 13 · $2,500–5,000 49 · $5,000–10,000 15 · Over $10,000 13)**.

**Grid/motion.** 3-col 458px in 1440; 383 CSS transitions; keyframes fadeIn / slideInFromBottom / pulsing; **sticky header that re-appears on scroll-up** (`js-sticky-on-scroll-up`) and a **sticky search button**. No GSAP. Note the DOM repeats the mega-nav three times (desktop, mobile, account) — bloat to avoid.

---

## 3. MasterClass — https://www.masterclass.com/

(Text render only; computed styles did not return before the time cap.)

**First screen.** Product-line bar **MasterClass · Certificates · On Call · Executive · At Work**; nav "Browse", search field placeholder **"What do you want to learn today?"**, "Gifts", "View Plans", "Log In", primary "Get MasterClass". Hero headline **"Learn from the best, be your best."** sub "Get unlimited access to thousands of bite-sized lessons." Immediately below: an **intent quiz as the hero — "What brings you to MasterClass today?"** with 8 radio options ("Develop my career or leadership skills", "Learn about AI and how to leverage it", "Become a better actor, musician, or writer", … "Something else") + **"Continue"**.

**Then.** Membership checklist (6 bullets, "30-day money back guarantee"). "Meet the world's best. New classes added every month." **Category chip rail (horizontal scroll): Trending · Acting & Performing Arts · Art & Design · Business & Entrepreneurship · … · Writing.** "Popular now — See all" rail of class tiles: `new` tag · title · **"With Dr. Alison Wood Brooks" · "54 minutes"** · "Watch Trailer". Pricing block "Starting at $10/month, billed annually." + "Get MasterClass" / "Explore Classes". Certificates block ("Proof you've trained with the world's best — Try Certificates"), B2B block ("Level Up Your Team — Contact Sales"), testimonial carousel (quote · first name · role, country), FAQ accordion, email capture.

**Transferable pattern.** Dark cinematic tiles are photo-dependent, but the *structure* is not: intent-first hero, one horizontal category rail, tiles that lead with a person + a duration numeral, and a single repeated primary CTA.

---

## 4. Award winners (2025–26) whose language transfers to a course marketplace

### 4.1 Sharplink — Studio Freight · Awwwards SOTD 27 Aug 2026 (7.38; design 7.44 / usability 7.25) · Business & Corporate, Institutions · GSAP, Three.js, Vue
https://www.awwwards.com/sites/sharplink · https://www.sharplink.com/
- Fonts **Archivo + Archivo Narrow**, body 16px; ground **`#F7F7F5`**, ink black; palette `#0E76FF` / `#F3F3F3`.
- **h2 68px / 72 lh / weight 400 / ls −1.36px (−2%)**; h3 32px/500; small h3 16px/500 in list items.
- **12-col grid of 89.66px columns, container 1384 in 1440**; content columns 1000 / 726.
- Cards = **full-width rows 1384×154, transparent, no radius, no border**, image at left — the "list row" card.
- Motion: Lenis smooth scroll; classes `stagger-item`, `text-reveal`, `animated-mask`; 2 canvases (3D page headers); 1 sticky element; videos are click-to-play, not autoplay.
- Awwwards elements: 3D Page Headers, Home Page Scroll, Footer Animation, Team Modal.

### 4.2 Dropbox Brand — Daybreak Studio · Awwwards SOTD 12 Feb 2025 (7.67) · CSSDA Website of the Year 2025 (9.03) + Best UX
https://www.awwwards.com/sites/dropbox-brand · https://brand.dropbox.com/ · https://www.cssdesignawards.com/blog/2025-website-of-the-year-winners/430/
- Fonts **Atlas Grotesk** (body 14px) + **Dropbox Sharp Grotesk Variable** (h3 30px/700, ls −0.6); palette `#0061FE` / `#1A1918`.
- **12-col grid of 78px columns in 1440.** Webflow + Rive.
- **Chapter index as colour tiles:** Framework / Voice & Tone / Logo / Typography / Iconography / Color / Imagery / Motion — each a full-bleed colour block with its own text/bg pair (e.g. `#FAD24B` on `#684505`, `#FA551E` on `#4E0119`), 8px radius only on the outer corners of the group. No photography needed to feel rich.
- `mix-blend-mode: difference` overlays, 10 clip-path elements, keyframe `drawIn`, **`cursortag` cursor-following labels**, `nav-scroll-indicator`, `scroll-chevrons`.
- Elements: Typography Widgets, Motion Easing Demo, Iconography Slot Machine, Motion Timeline, Typography Cursors, Color System Showcase, Nav Menu.

### 4.3 AI in Design Report 2026 — ++hellohello · Awwwards SOTD 26 Aug 2026 (7.4; design 7.66) · Magazine / Business & Corporate · Data Visualization · Framer
https://www.awwwards.com/sites/ai-in-design-report-2026 · https://stateofaidesign.com/
- "A research report transformed into an editorial digital experience, where data, analysis, and motion speak in a single visual language."
- Elements: **Editorial Charts (stats as typography)**, **Chapters + Chapters Header Animation**, Menu, Case Studies Menu, Intro, Footer Hover Interaction. The numerals (91%, 54%) are the imagery.

### 4.4 Aardvark Book Club — FUTURE THREE · Awwwards SOTD 30 Aug 2026 (7.2) · Culture & Education / E-commerce · GSAP, Barba, Webflow
https://www.awwwards.com/sites/aardvark-book-club · https://aardvarkbookclub.com/
- Fonts **Champ** (display) + **Degular** (body 12px) + a handwriting accent; palette `#FFFFFF` / `#FAED8F`.
- **h1 "Unbox stories worth talking about" 120px / 96 lh (0.8!) / 700 / ls −1.2**; h2 78px / 62.4; item titles 30px.
- Catalogue = `article` cards **327×540, transparent, no border** (cover image + title + one-paragraph blurb + "Read more"); 8 per rail; **`cursor: grab`** drag rails.
- GSAP + ScrollTrigger + Lenis; `split-char` / `split-word` reveals; `box__sticky`; `genre__link-hover`; 16 clip-path + 13 filter elements; hero is a full-viewport SVG + canvas (3D book).
- Elements: Jiggly CTA, Scroll-driven 3D book reveal, **Genre discovery through hover**, Ear-popping button hover, Intro Animation, Page Transition, FAQ.

### 4.5 ERA Residence — The First The Last · Awwwards SOTD 31 Aug 2026 (7.61; design 7.81 / usability 7.3) · Architecture / Real Estate / Luxury · GSAP, Webflow
https://www.awwwards.com/sites/era-residence
- Palette **`#B5CEDB` / `#F8BBCB`** (pale blue / pink) driven by a **Day/Night theme on the hero**.
- Elements: **Listing page, Property card, Key features, Horizontal scroll**, Gallery, Pre-loader, Contact, 404. A luxury *inventory* site — the closest structural analogue to programme intakes (units with price/size/date = programmes with fee/days/date).

### 4.6 Illoca — Unseen Studio · Awwwards SOTD 4 Sep 2026 (7.44) · Culture & Education / Startups · WebGL
https://www.awwwards.com/sites/illoca
- Palette **`#3B60C5` on `#FDF2DE`** (saturated blue on cream). Elements: Feature Demo Pullout, Interactive Blocks, **Overlapping Sections (footer)**, Homepage Scrolling Motion, Reveal Interaction. Unseen is cited by an Awwwards juror as "type-led motion… restraint reads as premium" (https://www.hontran.dev/blog/best-award-winning-websites-2026).

### 4.7 By-Kin — Awwwards SOTD + Developer Award, FWA, CSSDA WOTD (per hontran.dev)
https://by-kin.com/
- **Apercu Pro** statement h1 **27px/500** ("'kin are a creative commercial interiors, branding and graphic design studio.") beside **Apercu Mono Pro 9px uppercase index labels: "LAYOUT", "FEATURED WORKS", "01 / 02 / 03", "2025", "SAYHI@BY-KIN.COM"**.
- Ground **`#F4F2ED` paper**, ink `#111214`; full-bleed 1440×900 cover images; `mix-blend-mode: difference`; 6- and 4-col grids; the whole home page is a single 900px viewport (index-style, nothing below the fold).

### Also on record
- CSSDA WOTY 2025 top 10: Dropbox Brand 9.03 · The Symphony Of Vines (Unseen) 8.88 · Charles Leclerc 8.85 · The Monolith Project 8.85 · Bruno Simon 8.84 · Exat Typeface (Best UI) 8.83 · Merouane Bali 8.82 · Lacoste Members 8.75 · ComPsych Brand Hub 8.74 · We are Büro (Bürocratik, Porto — Best Agency) 8.73. https://www.cssdesignawards.com/woty2025/
- Awwwards SOTD run 13 Aug–12 Sep 2026 (for context): Warm & Fuzzy, White Desert, Cerebrium, USAvionix, Seasats, Why Zero, United Carriers, Illoca, Trevor Noah, Paul Kalkbrenner, Squarespace Foundations, ERA Residence (also SOTM Aug), Aardvark Book Club, Sharplink, AI in Design Report, MIU MIU, Kononenko Architectural Bureau, LIKOVA, The Watch… https://www.awwwards.com/websites/sites_of_the_day/
- Juror criteria (Hon Tran): art direction with a point of view; *directed* motion; 60fps on mid-range mobile; a real `prefers-reduced-motion` path. "Screenshot the hero — is the static frame still strong?"
- Business-school UX (OHO): Duke's homepage search + program finder, Georgetown's *comparative* program finder (length, format, experience), Kellogg's "first-time visitor" path. https://www.oho.com/blog/business-school-website-examples

---

## 5. Ten buildable moves for Masar (bilingual AR/EN, real data, no photography)

**★ = top 3 impact-to-effort**

1. **★ Oversized numerals as the image.** PBS sets `1`–`6`, `1.9M`, `6th` at 57–64px; AI-in-Design's "editorial charts" are numerals. Masar has better numerals than any of them: **days (5), fee (SAR 24,500), start date (14 Oct), city**. Set the *lead* numeral of each card and the page hero at 72–120px, weight 400–500, tracking −2/−3%, with the label in a mono/condensed uppercase track. Provide an Arabic-Indic digits toggle (`font-variant-numeric` + locale formatting). Pure CSS.
2. **★ Hairline list rows, not boxed cards, with sticky group labels.** Sharplink (1384×154 rows), PBS results (291px rows), Aardvark (no bg/border/shadow). Rows separated by 1px hairlines on a warm paper ground; a **`position: sticky` month or school label** ("October", "INSEAD") rides along as rows scroll (MIT's sticky-on-scroll-up header + sticky search button, Aardvark `box__sticky`). No JS.
3. **★ Mask-reveal on scroll with ~80ms stagger.** Sharplink `text-reveal` / `animated-mask` / `stagger-item`; Aardvark `split-word`. Implement as IntersectionObserver + CSS `clip-path: inset(0 0 100% 0)` → `inset(0)` with `transition-delay: calc(var(--i) * 80ms)`; never animate the data itself, only its container; honour `prefers-reduced-motion`.
4. **Label-value data grid on every programme card.** MIT's uppercase micro-labels STARTING / LOCATION / DURATION / COMMITMENT / TUITION → Masar: **SCHOOL · CITY · DATES · DAYS · FEE**, 10–11px uppercase tracked labels over 16–20px values; one row per intake when a programme has several (MIT lists Sep 14–18 and Nov 9–13 under one course; PBS "+ More Dates"). Label column mirrors under `dir="rtl"`.
5. **Type system = one display grotesk + one mono index track, mirrored in Arabic.** By-Kin (Apercu 27px + Apercu Mono 9px uppercase "01 02 03"), Sharplink (Archivo 68px/400 + narrow), PBS (Everett 72px/500, −3%). For Masar pair a grotesk (e.g. Inter Tight / Archivo / Everett-class) with a matched Arabic sans of similar x-height (IBM Plex Sans Arabic, Noto Kufi, or 29LT Bukra) and a mono/condensed for labels; Arabic label size floor 12px, body floor 15px.
6. **Chapter-style navigation.** Dropbox's coloured chapter tiles, AI-in-Design "Chapters" with animated headers, By-Kin's "01 / 02 / 03" index. A sticky side rail (left in LTR, right in RTL) listing **01 Upcoming intakes · 02 By school · 03 By city · 04 By fee**, current chapter highlighted via IntersectionObserver; the chapter header itself is set at display size.
7. **Horizontal drag rail of intakes by month.** ERA "Horizontal scroll" + "Property card"; MasterClass category chips + "Popular now" rail; Aardvark `cursor: grab`. Use native `overflow-x: auto` + `scroll-snap-type: x mandatory`, month headers as snap points, `cursor: grab` on desktop; RTL works for free with logical properties. Keep vertical page scroll untouched.
8. **Colour-block panels per school stand in for photography.** Dropbox chapter tiles (each its own bg/ink pair), Illoca `#3B60C5` on `#FDF2DE`, ERA pale blue/pink, Aardvark white/`#FAED8F`, PBS `#FCFCFA` + sand pill `#EFEADF`. Give each school a two-colour pair (bg + ink) from a warm-paper family; the school wordmark or initials set at display size becomes the "image". Optional ERA-style day/night switch = swap two token sets.
9. **Cursor-following hover tag on rows.** Dropbox `cursortag` / "Typography Cursors". A small pill ("View programme →" / "عرض البرنامج ←") follows the pointer over a row via one `pointermove` listener on the list; hidden on touch and reduced-motion; row itself only tints its background and slides its arrow 4px.
10. **Intent-first hero that is the filter.** MasterClass "What brings you to MasterClass today?" (8 options + Continue); MIT "Find Courses By" (Topic + Format + Find Courses) in the hero; PBS "See Results (40)". Masar's hero: three typographic selects — **topic · city · month** — and a count-updating button "See 23 programmes"; facets show counts like MIT (Duration 1-3 Days 29). Add MIT's "Compare 2–4" tray and a "recently viewed" strip.

Runners-up: PBS pill CTAs (radius 48px, sand on ink); MIT's calendar view toggle; Georgetown-style comparative finder (length × format × experience).

---

## 6. Five award-site habits that would HURT a course marketplace

1. **Preloaders and intro sequences** (Aardvark "Intro Animation", ERA "Pre-loader", Sharplink 3D headers). Users arrive to compare dates and fees; every second before the first row is visible is lost. Jury data already shows the cost: usability trails design on ERA (7.3 vs 7.81) and Sharplink (7.25 vs 7.44).
2. **Smooth-scroll/scroll-hijack libraries and horizontal-scroll main content** (Lenis on Sharplink and Aardvark; ERA horizontal listing). They break find-in-page, keyboard paging, anchor links, screen readers and RTL assumptions; use native scrolling and reserve horizontal motion for one opt-in rail.
3. **Micro type**: 9px mono labels (By-Kin), 12px body (Aardvark, By-Kin), 14px body (MIT, Dropbox). Arabic needs larger sizes to resolve dots and diacritics — set floors of 12px labels / 15–16px body, and never rely on uppercase (Arabic has none) to make a label read as a label; use weight, colour and tracking instead.
4. **Display line-height below 1.0 and heavy negative tracking** (Aardvark 120px/96px = 0.8; PBS −3% is the sane limit). Arabic ascenders/descenders and marks collide; keep Arabic display at 1.15–1.3 lh and tracking ≥ −1%. Bilingual pages need two sets of type tokens, not one.
5. **WebGL/3D/autoplay-video heroes, page transitions and custom cursors** (Sharplink Three.js, Aardvark 3D book + Barba transitions, Illoca WebGL, MasterClass trailers, Dropbox difference-blend). They cost frame rate on mid-range Android, page transitions drop filter state and scroll position, blend-mode text fails contrast checks, and hidden native cursors hurt precision on data-dense rows. Also avoid PBS's 6-slide hero carousel (slides 2–6 are rarely seen) and MIT's consent dialog covering the first screen.

---

## Sources
- https://www.pbs.up.pt/en/ · https://www.pbs.up.pt/en/executive-education/ · https://www.awwwards.com/sites/porto-business-school
- https://executive.mit.edu/ · https://executive.mit.edu/course
- https://www.masterclass.com/
- https://www.awwwards.com/websites/sites_of_the_day/ · https://www.awwwards.com/sites/sharplink · https://www.sharplink.com/ · https://www.awwwards.com/sites/dropbox-brand · https://brand.dropbox.com/ · https://www.awwwards.com/sites/ai-in-design-report-2026 · https://stateofaidesign.com/ · https://www.awwwards.com/sites/aardvark-book-club · https://aardvarkbookclub.com/ · https://www.awwwards.com/sites/era-residence · https://www.awwwards.com/sites/illoca · https://by-kin.com/
- https://www.cssdesignawards.com/woty2025/ · https://www.cssdesignawards.com/blog/2025-website-of-the-year-winners/430/
- https://www.hontran.dev/blog/best-award-winning-websites-2026 · https://www.oho.com/blog/business-school-website-examples · https://www.daybreak.studio/work/dropbox · https://rive.app/blog/dropbox-launches-interactive-brand-guidelines-site-using-rive
