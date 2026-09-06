# Executive-Education Website Benchmark — Design & Conversion Reference

**Scope:** HBS Executive Education, Wharton Executive Education, INSEAD Executive Education, IMD, London Business School Executive Education, IESE, Stanford GSB Executive Education, MIT Sloan Executive Education.
**Date of capture:** 6 September 2026.
**Method:** Each site's exec-ed landing page and its catalogue/finder page were fetched live via a headless-browser crawl (the sandbox's own egress proxy blocks all eight domains, so pages were rendered through Apify's Website Content Crawler with the HTML→Markdown transformer disabled so nav, CTAs and filter facets survived). Copy quoted below is verbatim from the rendered pages. Typography/palette facts that cannot be read from crawled markup are taken from the schools' published identity guidelines (cited per school). Three requested catalogue URLs 404'd and were replaced with the real ones (`/course-finder`, `/programs/`, `/program-finder/`).

**Purpose:** reference for a bilingual (Arabic/English) course-marketplace targeting Saudi/Gulf executives first, global second.

---

## 1. Site-by-site findings

### 1.1 Harvard Business School Executive Education — https://www.exed.hbs.edu/

| Dimension | What the page actually does |
|---|---|
| **Hero** | Full-bleed muted **video** (fallback image alt: *"Aerial view of three executives sitting around a table outside on the HBS campus on a sunny day to review a case"*). H1 `Executive Education`, tagline **"Breakthrough Learning for Leaders"**. Below the fold the positioning line: *"We prepare and propel leaders to achieve the next elevation—for their organizations and for themselves."* |
| **Primary CTA** | **There is no button in the hero.** The first interactive element is a 4-card row: *Leadership Immersions · Topic-Focused Programs · Learning Tracks · Solutions for Organizations*. The first true CTA is the inline finder: **"Find Your Program — Explore our extensive offerings"** with two selects (`Any topic`, `Any format`) and a **`Browse Programs`** button, plus *"You can also view our Full Schedule."* |
| **Catalogue / browsing** | `/programs` = "Program Finder". Left-rail facets with counts: **Topics** (AI & Digital Transformation 6, Board Governance 7, Family Enterprise 4, Finance 5, General Management 9, "More"), **Formats** (Blended 7, In-Person 52, Virtual 8), **Program Types** (Leadership Immersions 7, Topic-Focused Programs 60), **Program Start Date** range picker. Result header *"Showing 67 programs"*, sort *Start Date / A–Z / Z–A*, paginated (3 pages). **No price facet, no career-level facet, no compare.** Program cards are JS-rendered (not captured in raw crawl). |
| **Trust signals** | **No rankings, no numbers at all** (HBS does not participate in FT exec-ed rankings). Trust is carried by brand + four value pillars: *Breakthrough learning · Holistic support · Powerful connections · Intentional diversity* (copy such as *"Premium amenities and purpose-built accommodations for all participants on the HBS campus. Astonishingly attentive staff."*). Two participant quotes with title/company: Dondi Gomez (CMO, Jollibee Group), Helen Vaid (Board Member, Foundry Brands and Abercrombie & Fitch). |
| **Typography** | Sans-led institutional system: **Trade Gothic** is the HBS web type family, wordmark in customised **Graphik**; exec-ed sub-brand uses the same (HBS identity guidelines: https://identity.hbs.edu/executive-education/style-guidelines/typography/ and https://www.hbs.edu/marketing/web-development/desktop/type.html). Feel: quiet, corporate-academic, generous white space; not editorial. |
| **Palette** | HBS crimson accents on white/charcoal; photography carries the colour. |
| **Imagery** | 100 % campus photography with unusually specific alt text naming buildings (Tata Hall, Chao Center, Baker Library, Klarman Hall): executives in conversation, professor at blackboard, sunlight lounges. Residential campus is the product. |
| **Fees / dates** | Neither on landing page. Dates only inside finder cards / program pages; fees on program pages. "Full Schedule" link is the date-first path. |
| **Mobile cues** | "Skip to Main Content", nav collapses into a `More` overflow, nested "Back" menus, cards stack. |
| **Lead capture** | Very light: `Contact Us`, `Subscribe to Our Emails`, `Log In` (participant portal). No brochure download, no chat, no advisor CTA on landing (advising is referenced only on Admissions pages). |
| **Distinctive** | *Learning Tracks* (curated multi-program paths that build "specific competencies"), *"Admitted? Plan Your Stay"* concierge section, video hero, deliberately minimal CTA density — the site behaves like a luxury brand that expects you to come already convinced. |

### 1.2 Wharton Executive Education — https://executiveeducation.wharton.upenn.edu/

| Dimension | What the page actually does |
|---|---|
| **Hero** | Text-led. H1 **"Your Partner in Progress"**; sub: *"Wharton empowers leaders to turn insight into action through best-in-class, practical learning…"*. A **chatbot opens on load**: *"Hi, I'm your Wharton Executive Education assistant. I'm an automated guide who can answer your questions. How can I help you?"* (Gravyty virtual assistant). |
| **Primary CTA** | **`View All Programs »`** (chevron-suffixed link style used site-wide: `View Program For Individuals »`, `Learn more »`). |
| **Catalogue / browsing** | Three-card split: *For Individuals (On-Campus and Online) · For Organizations (Customized Learning Solutions) · Online Learning (Digital Learning Solutions)*. Then an inline 3-select finder under **"Find the program that meets your professional goals."**: `Select a topic` (AI and Analytics, Comprehensive Executive Programs, Leadership and Management, Finance and Wealth Management, Marketing, Strategy and Innovation) · `Select a start date` (0–3 / 3–6 / 6+ months from now) · `Select a format` (In Person, Live Online, Self-Paced Online, Blended: Online + On Campus) → **`Search Programs`**. Escape hatches: *"View Full Program Schedule or contact Client Relations team"*. Topic tiles ("All Programs By Topic"). On `/for-individuals/`: a date-stamped **"Upcoming Wharton Programs"** list (`Oct 19 Leading AI and Digital Transformation · Nov 8 Venture Capital · Nov 10 NEW The Resilient Leader …`). Nav offers `Program Finder`, `Download Calendar`, `Find an Online Program`. |
| **Trust signals** | No rankings on page. **"Alumni Status"** badge on the spotlight card; *"All Comprehensive Executive Programs include complimentary end-to-end executive coaching, and upon successful completion, grant participants Wharton Alumni status."* Nav item literally titled **`Become a Wharton Alum`**. Faculty named in photo alts (Prof. Nancy Rothbard). *Wharton@Work* newsletter as thought-leadership proof. Phone numbers in footer (+1.800.255.3932). |
| **Typography** | **Acumin** (sans) + **Minion Pro** (serif) per Wharton standards (https://standards.wharton.upenn.edu/typography/). Feel: corporate, dense, slightly dated portal aesthetic. |
| **Palette** | Wharton blue **Pantone 288** dominant, Wharton red **Pantone 201** reserved for CTAs/accents, neutral greys (https://standards.wharton.upenn.edu/color/). |
| **Imagery** | Classroom/breakout photography ("Participants in classroom", "Participant in online program"), catalogue-cover thumbnail, 1:10 promo video *"It's time to be WHARTON READY."* |
| **Fees / dates** | Fees absent from landing/listing (gated behind program pages; brochure requires a short form). Dates prominent: spotlight card *"Advanced Management Program — Sep. 27 – Oct. 30, 2026 — Philadelphia, PA"*; upcoming list is date-first. Format is expressed as **duration descriptors**: "5-Week Immersion", "6 Programs within 2 Years", "3 In-Person Modules, Plus 3 Electives". |
| **Mobile cues** | "Mobile menu toggle", `BACK` labels in nested menus, "Back To Top". |
| **Lead capture** | Chatbot; **`Download Catalog` (PDF)** block repeated twice; `Custom Program Inquiry`; `Download Custom Brochure`; `Subscribe to Wharton@Work`; `contact Client Relations`; `Wharton Direct Login`. |
| **Distinctive** | Selling **alumni status as a product**; the AI chatbot; a printable catalogue as a first-class artefact; start-date-window selector (0–3/3–6/6+ months) — a pattern later copied by MIT and IMD. |

### 1.3 INSEAD Executive Education — https://www.insead.edu/executive-education

| Dimension | What the page actually does |
|---|---|
| **Hero** | H1 `Executive Education` above a **4-slide promotional carousel** (Prev/Next): *"Management Acceleration Programme — Starts 5 April 2027 — Learn more"*, *"Transition to General Management — Starts 5 Oct 2026"*, *"Upcoming Webinars & Info Sessions — Experience thought leadership content and a preview of our programmes — View Webinar Listings"*, *"INSEAD and Tech Mahindra — Win the 2026 EFMD Excellence in Practice Silver Award"*. Slide imagery = green-background circular participant headshots. |
| **Primary CTA** | `Learn more` on slides; then the fork **"Please select the type of programme that fits your needs."** → *For Individuals* ("60+ Open Programmes") / *For Organisations* → `Discover more`. |
| **Catalogue / browsing** | **Skills-based "Programme Finder" in mad-libs form:** *"I am a [Board Member / C-Level Executive / Chair of Board / Entrepreneur / General Manager / Director / Head of Function / Manager-Team Lead / Consultant / Specialist / Young Professional] with [0–2 … ≥21 years of experience] looking for a programme in [Master / Executive Education / Doctoral]"* plus industry (18 sectors), region (*Americas, Asia, Europe, Middle-east and Pacific, Online*), topic (15), sort Date / A–Z. On `/programmes`: category cards (Online, General Management, Leadership, Open Programmes "50+"), **Upcoming Sessions**, **Upcoming Online Programmes**. Programme cards are the richest in the set: image · title · format (*In-Person / Online / Blended In-Person*) · locations (*Fontainebleau, Singapore, Abu Dhabi*) · blurb · **session date dropdown with several future cohorts** (`7 Oct 2026 · 2 Dec 2026 · 24 Feb 2027 · 1 Jun 2027`) · duration (`8 days`, `2 + 2 weeks`, `10 + 5 + 5`) · `Application Deadline` for online · **Topic tags + Skill tags** (`Financial Acumen, Strategic Thinking and Execution, Leading Teams…`). |
| **Trust signals** | EFMD award slide; partner logos in footer (Sorbonne, Wharton, Tsinghua); *"The Business School for the World"*; **Certificate in Global Management** ("Formal recognition… with INSEAD alumni status" + `Try Our CGM Planner`); faculty-led info sessions (*"Join Professor Urs Peyer for the INSEAD Finance for Executives Information Session"*). No FT ranking shown on the landing page. |
| **Typography / palette** | 2024 brand evolution: "intelligent and contemporary typography", **primary green** ("communicates wealth, sustainability, growth and transformation"), "vibrant impact colours", localised logos per campus (https://www.insead.edu/news/inseads-brand-evolution-brings-transformation-good-life). Drupal/Acquia build with a 100+ component Storybook (https://www.acquia.com/resources/customer-stories/insead). Feel: modern, warm, editorial-leaning. |
| **Imagery** | Portrait-led: round headshots of named past participants on green (alt: *"…Anne North, Consultant at CARE International UK… past attendee of… Transition to General Management"*), campus pathway shots, tablet/chart stock for online. |
| **Fees / dates** | **Dates: excellent** (multi-cohort picker, deadlines). **Fees: not on cards**; each programme has a `dates-fees` sub-page (e.g. Executive Presence and Influence €2,050) — https://www.insead.edu/executive-education/dates-fees. |
| **Mobile cues** | "Back Menu ×" nested nav; the mega-menu is enormous (hundreds of links) — heavy on mobile. |
| **Lead capture** | **Stage-specific CTA sets on every card:** `Apply Now` · `Reserve a Seat` · `Download Brochure` · `Book a Call` · `Contact Programme Advisor` · `Enrol yourself` · `Enrol a group` · `Group enquiry`. Section *"Join us and start living the INSEAD experience"* → `Contact us` / `Subscribe to our Newsletter` (IN Focus). Webinar/info-session listings with agendas. |
| **Distinctive** | Abu Dhabi as a first-class delivery location on cards; skill taxonomy; multi-session selector; CTA vocabulary that changes with buyer intent (reserve vs apply vs call); CGM planner; "Enrol a group" for team buyers. |

### 1.4 IMD — https://www.imd.org/ (and https://www.imd.org/program-finder/)

| Dimension | What the page actually does |
|---|---|
| **Hero** | 4-slide carousel with labelled dots (*Leadership Program · World Competitiveness Summit · MBA · Workforce well-being*): **"Leading for High Impact — Strengthen the leadership muscles that matter most — [Redefine the leader you are]"**; "Competitiveness and prosperity — Summit report… [Access report]"; "Master of Business Administration — You bring the ambition, we build the leader — [Discover the MBA]"; "Performance versus well-being? — New report… [Explore report]". |
| **Primary CTA** | `Redefine the leader you are` (verb-led, not "Learn more"). Immediately under the hero a **career-stage ladder strip**: *Future Leaders → Foundations for Business Leadership → Advanced Management Program → Breakthrough Program for Senior Executives*, each with a one-line bold promise ("Become a master of the core skills", "Embrace a growth mindset, rethink your strategy, lead boldly"). |
| **Catalogue / browsing** | Nav promo tiles: *"Find your perfect program 🔎 Explore more than 80+ Executive Education programs"* / *"Join an upcoming event 📆"*. `/program-finder/` facets: **Topic** (Leadership, Digital Transformation & AI, Governance, General Management, Strategy, Sustainability, Innovation, Degree, Finance, Geopolitics, "Show more"), **Career level** (Senior executive, Middle manager, C-level, Entry level, Board member, Owner & Family Business), **Program type** (Open / Online / Degree), **Duration** (<1 week, 1–2, 2–4, >4 weeks), **Price with currency switcher (CHF / SGD / USD, min–max)**, **Format** (Face-to-face, Online, Blended, liVe virtual), **Start date** (0–3 / 3–6 / 6+ months), **Delivery location** (Switzerland, Singapore, **Saudi Arabia**, United States…). Counter "95 programs". Nav badges `New`, `Trending`. |
| **Trust signals** | **"145,000 executives who are IMD alumni"** (Alumni Directory tile); *"We're the trusted learning partner of choice… Swiss roots, global reach."*; *"Founded by business executives for business executives"*; FT news item *"IMD recognized among the world's top business schools for executive education in FT rankings"* (18 May 2026) — IMD was #1 FT Custom 2025 (https://poetsandquants.com/2025/06/01/…); **own research products as authority** (IMD World Competitiveness Ranking, Smart City Index, *I by IMD* magazine); alumni story with name and programme; three campus addresses (Lausanne, Singapore, Shenzhen in Chinese script). |
| **Typography / palette** | 2022 brand refresh: "digital-first", "more modern, warmer set of colors" (https://www.imd.org/annual-reports/annual-report/special-features/brand-refresh/); **IMD Blue** primary (styleguide.imd.org/identity/colors) with warm accents; modern grotesque sans. Feel: contemporary, energetic, bordering on consumer-tech. |
| **Imagery** | Mix of campus photography (*"IMD MBA students in a group study room"*, graduation), portrait headshots, report covers, and a homepage video. |
| **Fees / dates** | **Prices upfront on finder cards** in a spec line: *"Location: Lausanne · Starting date: 21 June 2027 · Duration: 5 days · Price: CHF 11,900"*; EMBA *"Duration: 20 months · Price: CHF 115,000"*. Price is also a filter. |
| **Mobile cues** | Carousel with named dots, "Press O for more options" video control, emoji in nav tiles (🔎 📆), nested mega-menus with promo blocks. |
| **Lead capture** | Newsletter form (country + US-state selects, honeypot, reCAPTCHA); "Join an upcoming event"; Book Club webinars; programme pages offer *"schedule a call with an IMD Program Advisor"*; sanctions-compliance disclaimer in footer (relevant for Gulf applicants). |
| **Distinctive** | Price filter with currency toggle; Saudi Arabia as a delivery-location facet; 30-day **Sprint** formats; Executive Certificates & Diplomas incl. *Board Director Diploma*; career-stage ladder; `New/Trending` merchandising badges. |

### 1.5 London Business School Executive Education — https://www.london.edu/executive-education

| Dimension | What the page actually does |
|---|---|
| **Hero** | Muted background **video** ("This video is playing in the background and is muted") over photo (*"Smiling attendees at a conference or meeting, with a man in white shirt and orange lanyard in the foreground"*). H1 **"Learn the invaluable"**. Sub: *"At London Business School, we believe business is about people, ideas and impact. Experience world‑class Executive Education, with open and custom programmes ranked #1 and #2 by the Financial Times."* In-page jump links *"Go to… Our offering · Our impact · Thought leadership"*. |
| **Primary CTA** | Two buttons: **`Upcoming courses`** and **`Download brochure`**. Plus a **`Save to my profile`** control (site has *Create a profile / Login*). |
| **Catalogue / browsing** | Four offer cards (*Our courses for individuals* → `Our courses` / `Course search`; *Our work with organisations*; *Online courses* — "three flexible… modes"; *Earn a certificate* — Certificate in Management / Finance, "your choice of four programmes"). Then an **on-page filterable grid of the entire open portfolio** under *"Explore our suite of Executive Education programmes… in London, Dubai, Saudi Arabia and online."*: **Topic** (AI, Digital Transformation, Finance, General Management, Human Resources, Leadership, Marketing, Strategy) · **Experience** (Early career, Mid career, Senior to C-suite) · **Location/Format** (In-person Dubai, In-person London, In-person Saudi Arabia, Online, Online & London). **"Select up to 4 to compare."** (`/executive-education/programmes` 404s — the grid on the landing page *is* the catalogue, plus `Course search` and `Programme calendar` in the mega-nav.) |
| **Trust signals** | **FT ranking in the hero sentence and again as a news card with the FT 2026 logo:** *"Proud to be ranked #1 in Open and #2 in Custom Executive Education by the Financial Times, again."* Impact stats strip: **"1,388 Companies worked with us"**, **">12,000 Participants on average… annually"**. Client success stories: Rolls-Royce, Nestlé, Bridgestone, Mölnlycke, Eurapco, *"How does a company help change a nation?"*. Contact block with real phone/email: *"EXECUTIVE EDUCATION ENQUIRIES +44 20 7000 7390 · execed@london.edu · Contact Form"*. |
| **Typography / palette** | Rebrand (Rose Design) with "modern, premium typeface", navy + red "red thread" and light-blue functional palette (https://www.rosedesign.co.uk/work/london-business-school/, https://www.redsaltdesign.co.uk/files/LBS_Brand_Guidelines_update_Mar_2020.pdf). Feel: premium-corporate, confident sans, short verb headlines ("Learn the invaluable", "Demystify finance."). |
| **Imagery** | Candid, warm people photography in classrooms ("Professionals in blue suits sharing a laugh, seated at wooden desks"); little architecture. |
| **Fees / dates** | **Best in class.** Every card shows *Next* date, *Duration*, *Location*, and **Fees in the delivery currency**: `£550.00` (8-hour online), `£2,450.00`, `£9,900.00`, `£41,900.00` (Senior Executive Programme, "2 x 2 weeks"), and **`US$13,200.00` for Dubai, `US$13,900.00` for Riyadh**. Dates carry cohort labels: *"05-09 October 2026: Middle East Cohort"*. Blended shown as *"London: 3 weeks, Online: 5 weeks"*. |
| **Mobile cues** | Very large mega-nav; on-page jump links; card grid stacks; per-card brochure buttons. |
| **Lead capture** | **62 `Download brochure` buttons on one page** (one per card + hero); `Find out more`; multi-select brochure request form (https://interact.london.edu/enquiry2.asp?typecode=execed); `Save to my profile`; phone/email; Client Relationship Manager referenced for fees on programme pages. |
| **Distinctive (and directly Gulf-relevant)** | **Saudi Arabia and Dubai are first-class product lines**, with dedicated programme variants: *"Strategy Implementation for Saudi Leaders – Saudi Arabia — Delivered in Riyadh… linking daily learning to leadership, accountability, and Vision 2030"*, *"Women in Leadership – Saudi Arabia"*, *"Finance for Non-finance Executives – Saudi Arabia"*, *"High Performance People Skills for Leaders – Saudi Arabia (Delivered in Riyadh)"*, plus *"Middle East Iterations in London"*. USD pricing for Gulf cohorts. Certificate stacking. Compare-4. |

### 1.6 IESE Business School Executive Education — https://www.iese.edu/executive-education/

| Dimension | What the page actually does |
|---|---|
| **Hero** | Static image; H1 **"IESE Executive Education"**; tagline **"Excellence is a mindset"**; paragraph (*"IESE offers an unparalleled choice of executive education programs… to empower leaders to deliver positive, immediate and lasting impact."*). Page `<title>` still says *"Executive Education 1st in world, FT 2015-2020"*. **No CTA in the hero.** |
| **Primary CTA** | First buttons are the two fork cards **`Programs for Individuals`** / **`Programs for Organizations`**; then *"Haven't found what you're looking for?… [Search Programs]"* and a footer-adjacent **`GET IN TOUCH WITH US`**. Mega-nav has a button bar: `CHOOSE YOUR MBA · IESE PORTFOLIO · PROGRAM FINDER`. |
| **Catalogue / browsing** | Landing page has no listing. `/programs/` is organised **by career stage** — *Programs for Young Professionals / Functional Managers / Senior Executives / C-suite Leaders* — each program with a **one-line spec** in a fixed grammar: *"Barcelona, Madrid & Munich / 7 months / Part-time / On campus — English / 15+ years of senior management experience"*, *"Barcelona, Madrid or others / 6-8 months / Part-time / On campus or Blended — Spanish / 5+ years of managerial experience"*. Program Finder exists as a separate tool. |
| **Trust signals** | **Rankings-heavy:** numbered pillar #5 *"Financial Times Ranking — 3rd in the world for Executive Education 2026"*; three badge images *"3 Executive Education Open programs by FT 2026"*, *"4 … Custom programs by FT 2026"*, *"1 … by FT 2015-20"*; *"Consistently ranked as one of the best in the world by the Financial Times"* repeated. Five campuses (Barcelona, Madrid, Munich, New York, São Paulo); joint programs (C-Suite Pathway with NYU Stern; Global CEO Program across three continents). Corroborated by https://www.iese.edu/stories/iese-ranks-among-worlds-top-3-in-executive-education-open-programs-according-to-the-financial-times/. |
| **Typography / palette** | Conservative corporate: IESE red logo on white, dark navy/grey text, mixed sans headings and uppercase program titles ("MASTER IN FINANCE"). Feel: institutional, slightly template-driven. (No public type spec found; Brandfetch lists assets: https://brandfetch.com/iese.edu.) |
| **Imagery** | Generic campus/people photography; badge graphics for rankings. |
| **Fees / dates** | Neither on landing or `/programs/`; fees on program pages. **Language and required experience are shown as spec fields** — a useful axis. |
| **Mobile cues** | **`EN | ES` toggle** in the header (full Spanish site). A CMS label leak — nav headings literally read *"Botonera programs"* ("button bar") — shows the bilingual build's seams. |
| **Lead capture** | `GET IN TOUCH WITH US`; Program Finder; newsletters; Open Days/events; no chat, no brochure buttons on landing. |
| **Distinctive** | The only fully **bilingual** site in the set (EN/ES with Spanish-language programs, "Choose between an English or a bilingual (Spanish and English) format"); **career-stage taxonomy**; **spec-line grammar** (city / length / part-time / format / language / experience). |

### 1.7 Stanford GSB Executive Education — https://www.gsb.stanford.edu/exec-ed

| Dimension | What the page actually does |
|---|---|
| **Hero** | **The finder is the hero.** First H1 is **"Find an Executive Education Program"** with three facet groups rendered as checkbox lists: **Topics** (16: Accounting, Corporate Governance, Design Thinking, Entrepreneurship, Finance, Fundamentals, General Management, Innovation, Marketing, Negotiation, Nonprofit, Organizational Leadership, Personal Leadership, Social Impact, Strategy, Technology & Operations) · **Format** (In-Person, Online) · **Career Level** (Senior Executive, Mid-Career Professional, Early Career, Student & Recent Graduate). Second H1 "Executive Education": *"Push the boundaries of knowledge beyond what is imaginable. Join Stanford Executive Education where we challenge ideas, take risks, encourage collaboration, and ultimately emerge as principled leaders."* |
| **Primary CTA** | The facet search itself; then three tiles `Programs for Individuals · Programs for Organizations · Online Programs`. Secondary lead magnet: **"Complimentary eBook — Download The Communication Edge."** |
| **Catalogue / browsing** | `/exec-ed/programs`: *Featured Programs* (Stanford Executive Program "In-Person and Online", Stanford LEAD "Online", Executive Program for Growing Companies "In-Person"), then **"All Upcoming Programs — Sort by: Title | Start Date"**, **`Compare Programs`**, same three facets. Cards: title · date line with **cohort qualifiers** (*"FY26 | Register Anytime"*, *"Public Board Cohort | 19 Oct 2026 – 23 Oct 2026"*, *"Flex | 24 Oct 2026 – 13 Feb 2027"*, *"Full-Time | 18 Jun 2027 – 31 Jul 2027"*, *"Dates to be Announced"*) · blurb · topic tags · `Compare` · **`Brochure`** · `Register Now`. |
| **Trust signals** | No rankings, no numbers. Silicon Valley proximity (*"experiencing Stanford GSB and Silicon Valley's culture of innovation"*); two flagship program videos (2:29, 2:11); two attributed testimonials (Brian Steinbrecher, Fannie Mae; Isabelle Meyer Stapf, AppFolio); nav sections *Faculty Spotlights / Participant Spotlights / Alumni Voices*; co-branded programs (with Harvard, with NUS). Phone in footer. |
| **Typography / palette** | Stanford system: **Source Sans Pro / Source Serif Pro** (Crimson Text secondary), **Cardinal red #8C1515** identity bar (https://identity.stanford.edu/design-elements/typography/system-fonts/). Feel: clean, utilitarian, academic. |
| **Imagery** | Video thumbnails and tile photography; sparse. |
| **Fees / dates** | Dates rich (with cohort labels and "Register Anytime" for on-demand). **Fees absent from list** (program pages state tuition, e.g. published fees around $19,200 for some programs; "Payment is due upon admission" — https://www.gsb.stanford.edu/exec-ed/admission/payment-cancellation). |
| **Mobile cues** | "Open Menu", "Back to top", **"Share this selection"** (share a filtered result set). |
| **Lead capture** | eBook download; per-program `Brochure`; newsletter subscribe; `Apply Online`; `International Participants` page; phone. No chat, no advisor CTA. |
| **Distinctive** | Finder-as-hero; **Career Level** facet; on-demand "Register Anytime"; compare; shareable selection; eBook as top-of-funnel bait. |

### 1.8 MIT Sloan Executive Education — https://executive.mit.edu/ (and https://executive.mit.edu/course-finder)

| Dimension | What the page actually does |
|---|---|
| **Hero** | A **promo bar precedes everything:** *"Register and pay for the Entrepreneurship Development Program by September 30th and save $1,500. [Learn More]"* (only discount/urgency device in the set). Then H2 **"MIT Sloan Executive Education Programs"** + *"Our programs offer hands-on learning experiences and cutting-edge research…"*; hero image is an **abstract illustration** ("illustration of multicolored maze"), not a photo. |
| **Primary CTA** | Two buttons **`For Individuals`** / **`For Organizations`**, then a two-facet finder **"Find Courses By"** (Topics × Format) → **`Find Courses`**, flanked by **`Chat With An Advisor`** and `View Course Calendar`. |
| **Catalogue / browsing** | `/course-finder` is a true e-commerce PLP (Salesforce Commerce Cloud — `x-dw-request-base-id` header): *"Displaying 85 results"*, **List / Calendar toggle**, sort *Start Date · Name · Newest · Course Topic*, facets with counts: **Format** (In Person 46, Live Online 10, Self-Paced Online 30, On-Demand Online 5) · **Certificate Track** · **Topic** (13) · **Certificate Credits – EEUs** (0.5–4.5 / 5–10 / 10–25) · **Duration** (1–3 Days 30, 4–6 Days 13, 1–3 Weeks 3, +4 Weeks 33) · **Start Date** (0–3 / 3–6 / 6+ months) · **Tuition** (Under $2,500 · $2,500–5,000 · $5,000–10,000 · Over $10,000). Card spec block: **`STARTING Start anytime · LOCATION Online · DURATION 30 Days · COMMITMENT 6 hours · TUITION $1,750`**, plus `EARN 2.0 EEUs`, a **review count** (TurnTo widget, e.g. "107"), `Compare`, `Explore`, and up to eight future session dates listed. Header shows **cart `[0]`**, `Login / Sign Up`, **Wishlist**, **Certificate Planner**, *Recently Viewed*, "Compare Courses — Add 2-4 courses". |
| **Trust signals** | MIT seal (*"Mens et Manus… 1861"*); EEU credit system; *"affiliate alumni status"* via the Advanced Certificate for Executives; three **Participant Viewpoints** with headshots and diversity cues (*"There were people from Japan, India, Spain, and South Africa at my table"*); FAQ literally asking **"How prestigious is MIT Sloan?"**; review counts on cards; faculty directory. |
| **Typography / palette** | Grotesque sans throughout; MIT red with **orange-teal gradient brochure covers**; illustration-led rather than photographic. Feel: product/e-commerce, least "prestige", most usable. |
| **Imagery** | Abstract illustrations (maze, "AI abstract"), participant headshots, brochure covers; minimal campus. |
| **Fees / dates** | **Tuition on every card and as a filter**; multiple future sessions; "Start anytime" for on-demand; commitment hours per week. Best-in-set for price transparency. |
| **Mobile cues** | `Back` in nested nav, cart icon, sticky "Stay In The Know!" popup, "Was this page helpful? Yes/No" feedback widget, "Copy Link" on section headers. |
| **Lead capture** | `Chat With An Advisor`; **Program Guide** ("Explore the Brochure") + **Custom brochure** ("Download the Brochure"); two email-capture forms (consent checkbox); account creation; wishlist; promo discount; webinars. |
| **Distinctive** | The only site run as a **store**: cart, tuition facets, promo codes, reviews, wishlist, certificate planner, list/calendar view, and an SEO explainer block ("What Is MIT Sloan Executive Education?"). |

---

## 2. Cross-site comparison

| | HBS | Wharton | INSEAD | IMD | LBS | IESE | Stanford | MIT Sloan |
|---|---|---|---|---|---|---|---|---|
| Hero type | video + tagline | text + chatbot | promo carousel | promo carousel | video + tagline | image + tagline | **finder** | promo bar + illustration |
| Hero CTA | none | View All Programs » | Learn more | Redefine the leader you are | Upcoming courses / Download brochure | none | (facets) | For Individuals / For Organizations |
| Finder facets | topic, format, type, date | topic, date-window, format | role, years, industry, region, topic | topic, level, type, duration, **price+currency**, format, date, **location** | topic, experience, **location/format** | (career-stage pages) | topic, format, **career level** | format, track, topic, EEU, duration, date, **tuition** |
| Fees on cards | no | no | no | **yes (CHF)** | **yes (£/US$)** | no | no | **yes ($) + filter** |
| Dates on cards | yes | yes | **multi-session** | yes | yes + cohort label | no | yes + cohort label | **multi-session** |
| Compare | no | no | no | no | **up to 4** | no | yes | **2–4** |
| Rankings shown | no | no | award only | FT (news) + own ranking | **FT #1/#2 in hero** | **FT badges ×3** | no | no |
| Numbers shown | no | no | 60+ programmes | 80+ programs, 145k alumni | 1,388 cos, 12k p.a. | 5 campuses | no | 85 results, review counts |
| Brochure | no | catalogue PDF | per card | program guide | **per card (62)** | no | per card | guide + custom |
| Advisor / call | (admissions) | Client Relations, chatbot | **Book a Call / Contact Programme Advisor** | Program Advisor (program pages) | phone/email/CRM | Get in touch | phone | **Chat With An Advisor** |
| Chat / bot | no | **yes** | no | no | no | no | no | **yes** |
| WhatsApp | no | no | no | no | no | no | no | no |
| Gulf delivery | no | no | **Abu Dhabi** | **Saudi Arabia (facet)** | **Dubai + Saudi (Riyadh) variants, USD pricing** | no | no | no |
| Bilingual UI | no | no | no | no | no | **EN/ES** | no | no |

**Notable absence:** none of the eight uses WhatsApp, and none shows Arabic. Both are open lanes for a Gulf-first marketplace.

---

## 3. Rankings

Scores are 1–5 per criterion; rationale in one line each.

### 3.1 Conversion clarity for a first-time visitor
1. **MIT Sloan** (5) — two-button fork, finder, advisor chat and price all above the fold; promo urgency.
2. **Stanford GSB** (4.5) — the finder *is* the hero; career-level facet answers "is this for me?" immediately.
3. **LBS** (4.5) — hero states the ranking, then exactly two CTAs (`Upcoming courses`, `Download brochure`); full priced catalogue on the same page.
4. **Wharton** (4) — clear fork + 3-select finder + chatbot, but the visual density and portal-style nav dilute it.
5. **IMD** (3.5) — verb CTA and career ladder are strong, but the 4-slide carousel splits attention across MBA, reports and exec-ed.
6. **INSEAD** (3) — good card CTAs, but the landing opens with a carousel and a 300-link mega-menu before the fork.
7. **HBS** (2.5) — no hero CTA; assumes intent; the finder is the fourth screen.
8. **IESE** (2) — no hero CTA, no listing, fork buried under a values block.

### 3.2 Catalogue usability
1. **MIT Sloan** (5) — tuition, duration, format, date, EEU facets with counts; list/calendar; compare; wishlist; multi-session.
2. **IMD** (4.5) — price with currency toggle, career level, duration, delivery location; spec-line pricing on cards.
3. **LBS** (4.5) — whole portfolio filterable on the landing page; fee + next date + location per card; compare-4; brochure per card.
4. **INSEAD** (4) — richest card metadata (skills, multi-cohort, deadlines) and the best "who am I" finder, but no fees on cards.
5. **Stanford** (3.5) — clean facets and cohort labels; no fees.
6. **HBS** (3) — solid facets with counts and date range; no price/level; cards JS-only.
7. **Wharton** (2.5) — finder is three dropdowns; results are a schedule page; relies on a PDF catalogue.
8. **IESE** (2) — career-stage pages with spec lines are good, but there is no filterable list or pricing.

### 3.3 Visual distinctiveness / prestige
1. **HBS** (5) — video of the campus, building-named alt text, no numbers: pure brand confidence.
2. **INSEAD** (4.5) — green identity, portrait-led cards, contemporary type; feels like a 2024 brand.
3. **LBS** (4.5) — "Learn the invaluable", navy/red, warm candid photography, premium tone.
4. **IMD** (4) — energetic, warm, product-like; the ladder strip is memorable.
5. **Stanford** (3.5) — clean and credible but utilitarian.
6. **Wharton** (3) — strong colours, dated layout.
7. **IESE** (2.5) — template feel, badge graphics.
8. **MIT Sloan** (2.5) — illustration-led store; usable, not prestigious.

### 3.4 Transferability to a bilingual aggregator / marketplace
1. **MIT Sloan** (5) — it already *is* a marketplace: PLP facets, price bands, compare, wishlist, reviews, planner, cart.
2. **LBS** (4.5) — multi-location/multi-currency cards, Gulf variants, compare, per-card brochure, ranking-as-proof.
3. **IMD** (4.5) — currency-switching price filter, delivery-location facet incl. Saudi Arabia, career ladder, New/Trending badges.
4. **IESE** (4) — the only working EN/ES pattern; career-stage taxonomy; spec-line grammar that slots into any card.
5. **INSEAD** (4) — role/years/industry/region finder and skill tags are ideal for an aggregator's cross-school taxonomy.
6. **Stanford** (3) — finder-as-hero and career level; little else.
7. **Wharton** (2.5) — chatbot and date-window selector; the rest is single-school.
8. **HBS** (1.5) — the brand does the work; nothing structural to reuse.

### 3.5 Overall top 3 (weighted equally)
1. **MIT Sloan Executive Education**
2. **London Business School Executive Education**
3. **IMD**
Honourable mentions: **INSEAD** (finder + skill taxonomy), **IESE** (bilingual UI + career-stage taxonomy), **Stanford** (finder-as-hero).

---

## 4. Patterns worth adopting — Gulf-first, global-second marketplace

### 4.1 From MIT Sloan (catalogue mechanics)
- **Tuition as a facet** (bands) and **tuition on every card**. For the Gulf: bands in SAR with a SAR/AED/USD toggle (borrowing IMD's currency switch), VAT-inclusive note.
- **Card spec block** with fixed labels — `STARTING · LOCATION · DURATION · COMMITMENT · TUITION`. This grammar localises cleanly to Arabic (`يبدأ · الموقع · المدة · الالتزام · الرسوم`) and survives RTL because it is label/value pairs, not prose.
- **Multi-session listing** on the card (next 3–8 cohorts) and **"Start anytime"** for on-demand.
- **List / Calendar toggle** and **sort by Newest** — aggregators add inventory constantly; "Newest" is a merchandising lever.
- **Compare 2–4**, **Wishlist**, **Recently Viewed** — cross-provider comparison is the core reason an aggregator exists.
- **Certificate Planner → "Learning path" builder**: let a user stack courses from several providers toward a goal (mirrors LBS "choice of four programmes" and INSEAD's CGM planner).
- **Review counts on cards** (TurnTo) — no school competitor shows Arabic-language reviews; a marketplace can.
- **`Chat With An Advisor`** as a peer of the search button, and a **promo bar** for early-bird deadlines (the only site using urgency).

### 4.2 From LBS (Gulf-specific commercial patterns)
- **Location/Format facet with Gulf cities as first-class values** (`In-person Riyadh · In-person Jeddah · In-person Dubai · Online · Blended`), not buried under "International".
- **Regional programme variants with local pricing**: LBS lists *"Finance for Non-finance Executives – Saudi Arabia · 13-17 December 2026 · In-person – Saudi Arabia"* at `US$…`; adopt **cohort labels** on dates (*"Middle East Cohort"*, *"Riyadh cohort"*, *"Ramadan-adjusted schedule"*).
- **Vision 2030 / national-agenda language** in programme blurbs (*"linking daily learning to leadership, accountability, and Vision 2030"*) — align copy with Vision 2030 sector programmes and HRDF/Hadaf funding eligibility as a filter or badge.
- **Women-in-Leadership Saudi variants** as a visible category.
- **Ranking-as-hero-proof**: put the provider's FT/QS rank in the card and the hero (aggregator angle: "*X* providers ranked in the FT top 50").
- **Impact stats strip** (`1,388 companies · 12,000 participants/yr`) → for a marketplace: providers listed, courses, Gulf cohorts delivered, corporate clients.
- **Brochure per card** (one click, no page change) and **"Save to my profile"** — shortlist behaviour for executives comparing with HR.
- **Two-CTA hero** (`Upcoming courses` + `Download brochure`) — date-first and document-first paths match how Gulf HR/L&D buyers work (they need a PDF to forward for approval).

### 4.3 From IMD (discovery and merchandising)
- **Price filter with currency switcher** (CHF/SGD/USD) → SAR/AED/USD/GBP; store prices in provider currency and show converted with a disclaimer.
- **Career-stage ladder strip** under the hero (*Future Leaders → Foundations → Advanced Management → Senior Executives*) — a self-segmentation device that works in a single glance in either language.
- **Delivery-location facet including "Saudi Arabia"** and **"liVe virtual"** as a distinct format from "Online" (synchronous vs asynchronous matters for executives).
- **`New` / `Trending` badges** in nav and cards; **nav promo tiles** ("Find your perfect program 🔎", "Join an upcoming event 📆").
- **Alumni/participant count** as a headline number; **own research as authority** (an aggregator can publish a Gulf exec-ed index/report the way IMD publishes its Competitiveness Ranking).
- **Short formats ("Sprints", 30 days)** surfaced as their own category — Gulf executives buy short, intensive blocks.
- **Program Advisor call** as the mid-funnel CTA on every programme page.

### 4.4 Secondary patterns (from the other five)
- **INSEAD**: the *"I am a [role] with [years] looking for [topic] in [region]"* finder; **skill tags** as a cross-provider taxonomy; **intent-graded CTAs** (`Reserve a Seat` → `Book a Call` → `Apply Now`; `Enrol a group` / `Group enquiry` for HR buyers); Abu Dhabi as a location value; **info sessions with a named professor** as events.
- **IESE**: the **EN/ES header toggle** as the model for AR/EN (full mirrored site, not a translated subset); **spec-line grammar** including **language of delivery** and **required experience** (`Riyadh / 5 days / In-person / Arabic & English / 10+ years`); **career-stage sections**.
- **Stanford**: **finder-as-hero**, **Career Level facet**, **"Share this selection"** (shareable filtered URL — lets a delegate forward a shortlist to a sponsor), **eBook lead magnet**.
- **Wharton**: **start-date window** selector (0–3 / 3–6 / 6+ months), **chatbot** for FAQs (make it bilingual), **"Alumni Status" badge** as a value attribute on cards, downloadable **calendar/catalogue PDF**.
- **HBS**: **"Plan Your Stay"** concierge content (visas, hotels, travel) — for Gulf executives travelling to London/Fontainebleau/Boston this is a genuine differentiator; **Learning Tracks** naming for curated paths; **building-named alt text** discipline for SEO and accessibility.

### 4.5 Gulf-first specifics none of the eight do (opportunities)
- **WhatsApp / call-back CTA** on every card and a floating button — absent from all eight; standard in Saudi B2B/B2C.
- **Arabic-first typography pairing** that respects the sans-led feel of the benchmark (e.g. IBM Plex Sans Arabic + IBM Plex Sans, or Noto Sans Arabic + Inter), with mirrored card grammar and RTL-safe spec blocks.
- **Hijri + Gregorian dates**, Ramadan/Eid-aware cohort labels, Sunday–Thursday week assumptions.
- **Funding/approval badges**: HRDF (Hadaf) eligible, corporate-sponsorship-ready, invoice in SAR with VAT.
- **Gender-inclusive delivery notes** where relevant (women's cohorts, mixed cohorts) — LBS's Saudi variants are the only precedent.
- **Employer flow**: "Enrol a group" / "Request corporate quote" (INSEAD/MIT small-team discounts) surfaced at card level, since many Gulf enrolments are employer-funded.

---

## 5. Source URLs

**Pages crawled (live, 6 Sep 2026)**
- https://www.exed.hbs.edu/ · https://www.exed.hbs.edu/programs
- https://executiveeducation.wharton.upenn.edu/ · https://executiveeducation.wharton.upenn.edu/for-individuals/
- https://www.insead.edu/executive-education · https://www.insead.edu/executive-education/programmes · https://www.insead.edu/programme_finder
- https://www.imd.org/ · https://www.imd.org/program-finder/
- https://www.london.edu/executive-education (the `/executive-education/programmes` URL returns 404; the catalogue grid lives on the landing page)
- https://www.iese.edu/executive-education/ · https://www.iese.edu/programs/ (`/executive-education/programs/` returns 404)
- https://www.gsb.stanford.edu/exec-ed · https://www.gsb.stanford.edu/exec-ed/programs
- https://executive.mit.edu/ · https://executive.mit.edu/course-finder (`/s/programs` returns 404)

**Brand / typography / palette references**
- HBS: https://identity.hbs.edu/executive-education/style-guidelines/typography/ ; https://www.hbs.edu/marketing/web-development/desktop/type.html ; https://www.hbs.edu/marketing/exed.html
- Wharton: https://standards.wharton.upenn.edu/typography/ ; https://standards.wharton.upenn.edu/color/
- INSEAD: https://www.insead.edu/news/inseads-brand-evolution-brings-transformation-good-life ; https://www.acquia.com/resources/customer-stories/insead ; https://www.insead.edu/about-insead/middle-east-campus
- IMD: https://www.imd.org/annual-reports/annual-report/special-features/brand-refresh/ ; http://styleguide.imd.org/identity/colors
- LBS: https://www.rosedesign.co.uk/work/london-business-school/ ; https://www.redsaltdesign.co.uk/files/LBS_Brand_Guidelines_update_Mar_2020.pdf ; https://interact.london.edu/enquiry2.asp?typecode=execed
- IESE: https://brandfetch.com/iese.edu ; https://www.iese.edu/rankings/
- Stanford: https://identity.stanford.edu/design-elements/typography/system-fonts/ ; https://www.gsb.stanford.edu/exec-ed/admission/payment-cancellation
- MIT Sloan: https://executive.mit.edu/earnanexecutivecertificate.html ; https://executive.mit.edu/faq

**Rankings context**
- FT 2025 exec-ed rankings summary: https://poetsandquants.com/2025/06/01/london-business-school-tops-2025-financial-times-open-enrollment-exec-ed-ranking-imd-claims-custom-program-crown/
- LBS 2025 announcement: https://www.london.edu/news/lbs-executive-open-custom-education-rankings-2025
- IESE FT open top-3: https://www.iese.edu/stories/iese-ranks-among-worlds-top-3-in-executive-education-open-programs-according-to-the-financial-times/
- INSEAD fees pages example: https://www.insead.edu/executive-education/dates-fees

**Caveats**
- Sandbox egress blocked direct fetches of all eight domains; content was rendered via a third-party headless crawler and is faithful to the DOM text but does not include computed CSS, so exact hex values/webfont files were not read from the sites themselves — typography/palette statements rely on the cited brand guidelines and on visible design cues (e.g. Wharton's `»` link style, IMD's emoji nav tiles).
- HBS Program Finder cards and IMD finder results are client-rendered; facet lists were captured, card-level fee display for HBS was not.
