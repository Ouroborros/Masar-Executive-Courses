# Executive-education marketplaces & aggregators — UX reference research

Prepared for: bilingual (Arabic/English) executive-course marketplace (Masar Executive Courses)
Date of capture: 6–7 September 2026
Method: live page captures via a headless-browser crawler (Apify Website Content Crawler, Firefox/Chrome), rendered to markdown and read in full; supplemented by web search where a page could not be rendered. Quotes are verbatim from the captured pages. Where a page could not be captured, that is stated explicitly.

Coverage: Emeritus, GetSmarter (2U/edX), edX Executive Education + edX For Business, Coursera (Business / Professional Certificates), executivecourses.com, findcourses.com (Keystone), Class Central, Poets&Quants for Execs, FT Executive Education rankings (partial), plus notes on the mba.com program finder (page moved) and school-owned catalogues as a foil.

---

## 0. One-paragraph read

Two very different models are visible. **Operator-marketplaces** (Emeritus, GetSmarter, edX ExecEd, Coursera) sell a small curated catalogue under one brand, lean entirely on partner-university logos for trust, show *duration + format + next start/“Last Date to Apply”* on every card, and convert via **“Download Brochure” / “Get more information” / “Request a call” → phone-heavy lead forms** and instalment plans. **Directory-aggregators** (executivecourses.com, findcourses.com, Class Central) sell breadth (“6,000+ providers”, “46,525 courses”), expose *location / subject / language / program type / price* facets, and convert via **“Request Info” / “Learn more” outbound links**, with credibility coming from editorial content, verified reviews and explicit “Promoted”/“featured” labelling. The credible ones label paid placement and show real dates, prices and cohort facts; the spammy tells are unlabelled sponsored rows, infinite country dropdowns, aggressive multi-channel consent (“Email/Call/WhatsApp/SMS”), and repeated urgency badges (“Last chance”, “Late registrations close soon!”) on every single card.

---

## 1. Emeritus (emeritus.org)

Source pages: https://emeritus.org/ (captured), https://emeritus.org/online-certificate-courses/ (captured, 425 cards), https://emeritus.org/programs/ (captured; largely a topic hub), https://emeritus.org/all-courses/ (404 — no “all courses” index exists).

**First screen sells:** the university brands, not the courses. H1 “Learn. From the world’s best.” Sub: “Emeritus collaborates with more than 80 top-tier universities to make high-quality education accessible and affordable worldwide.” Two CTAs side by side: **“Programs for Individuals” | “Programs for Teams”**. Immediately below: a row of university logos and “View all universities”. A rotating placeholder in the search box cycles “artificial intelligence / leadership / business management / digital marketing / data science”.

**Browse / filter design:** no faceted search on the public site. Navigation is by **Topics** (AI & ML, Coding, Data Science…, Leadership — “View All Topics”), **Universities**, and by **program type** rows on the homepage: “Senior Executive Programs” (C-suite), “Emerging Executive Programs”, “Certificate Programs”, “Professional Certificates”, “Learning Journeys”, plus a “Trending Topics” tab strip. Topic tiles show counts (“Leadership — 102 Programs”, “AI and Machine Learning — 73 Programs”). The certificate index page is grouped “Online Courses by University” with 425 cards and *no filter or sort controls at all* (keyword scan: “Filter” 0, “Sort” 0, “Fee” 0).

**Card design (exact field order):**
1. University image/thumbnail
2. `#### University name` (e.g. “Wharton Executive Education”, “MIT xPRO”, “Cambridge Judge Business School Executive Education”)
3. `### Program title`
4. Duration (“6 Weeks”, “9 to 12 Months”)
5. Format (“Online” / “Blended”)
6. Date line — one of two states: **“Starts on: 16 Sep 2026”** or **“Last Date to Apply: 10 Sep 2026”** (deadline replaces start date when close)
7. Two CTAs: **“Download Brochure”** (primary, opens a modal: “Download brochure for … Duration: 24 Weeks | Modality: Online”) and **“View Program”**.

Price is **never shown on a card**. No ratings, no learner counts per course.

**Trust as middleman:** “80+ Universities Worldwide”, “500K Learners Globally”, “700+ Cutting-Edge Programs”; “The Emeritus Impact” block with sourced claims (“Nine out of ten Emeritus learners reported a positive impact… Source: Emeritus Impact Survey, 2023”, completion “over 80%”); press-release strip (“Imperial Executive Education launches the Chief Data and AI Officer Programme in collaboration with Emeritus”); regulator line in footer: “Committee for Private Education Registration Number 201510637C | Period: 29 March 2022 to 28 March 2026”; an “Academic And Examination Boards” page. The phrase “in collaboration with” is the consistent partnership wording.

**Lead capture / conversion:** “Download Brochure” on every card (gated PDF), “Program Information Sessions”, “Course Preview”, “Microlearning Videos”, phone number in footer (“US +1-606-268-4575”), “Financing” page, newsletter “Let’s Stay in Touch!” with mandatory consent “I agree to receive communications via Email/Call/WhatsApp/SMS from Emeritus.” Enterprise path: “Group enrollments / Private cohorts / Tailored content”.

**Credible vs spammy:** Credible — consistent card grammar, real dates, named partner units (“Kellogg Executive Education”, not just “Kellogg”), regulator ID, sourced statistics. Spammy — hidden pricing (you must give a phone number to learn the fee), WhatsApp/SMS/Call consent bundled into one checkbox, “Last Date to Apply: 10 Sep 2026” appears on almost every card (evergreen urgency), homepage repeats the same 3–4 programs across many sections.

---

## 2. GetSmarter (getsmarter.com, a 2U/edX brand)

Source pages: https://www.getsmarter.com/ (captured), https://www.getsmarter.com/courses (captured, “Showing 9 results of 222”), https://www.getsmarter.com/products/oxford-executive-leadership-programme (captured).

**First screen sells:** “Join **600,000+ professionals** worldwide — Thrive in an ever-changing world — With certified online short courses from the world’s leading universities.” Search box “What would you like to learn?” with two toggles **[Universities] [Categories]**, then a university-logo row and “Explore Categories” chips (“Trending, Artificial Intelligence, Business Management, Leadership, Health Sciences, Operations and Supply Chain, Marketing”). A **currency switcher** in the header: “USD GBP ZAR EUR AED SGD HKD SAR INR CAD CHF AUD” (AED and SAR present — relevant for Gulf audiences).

**Browse / filter design (courses page):** left rail with exactly two facets — **University** (15 values: Bocconi, Deepak Chopra, Harvard, HEC Paris, MIT, Rice, Stanford, LSE, UC Davis, Cambridge, UCT, UCT GSB, Oxford, Toronto, Yale) and **Course category** (26 values). Sort options: **“Courses A to Z | Courses Z to A | Newest courses | Starting soon | Most popular”**. Results counter “Showing 9 results of 222”. No price, duration, or date facets even though every card carries them.

**Card design (exact field order):**
1. University/school name (“Saïd Business School, University of Oxford”; “MIT Sloan and MIT CSAIL”)
2. Title
3. Type badge: “Short course” / “Micro course” / “Course stack”
4. Urgency badges (conditional): “Last chance”, “Starting soon”, “Late registrations close soon!”, “Course starts in 10 days”
5. **“Next start date: 7 Oct 26”** or **“Started: 2 Sep 26 — Last chance to register”** or **“Start date to be confirmed”**
6. **“94% Student satisfaction”** (per-course, most cards)
7. Duration (“6 weeks”)
8. Effort: **“Cohort learning, 6–8 hours per week”**
9. CTA **“View course”**

Price is not on the card; it is on the product page.

**Product page (lead capture):** above the fold: school name, H1, three benefit bullets, “Start date 02 September 2026”, **“Price $2,508 USD”** with **“Installment Plan”** link, “97% Student Satisfaction”, then four CTAs in order: **“Register now”** (primary) → **“Get more information”** → **“Request a call”** → **“Get for your team”**. Fact strip: “Cohort-based learning · 8 weeks (Excluding orientation) · English · 7–10 hours per week · Self-paced learning online · Watch trailer”. Instalment table shows two dated amounts (“1st installment Sep 6, 2026 $1,254.00 (USD) / 2nd installment Oct 6, 2026 $1,254.00”). “Get more information” form fields: First name, Last name, Email, then consent split by channel — “Please contact me: By email: Yes/No · By phone: Yes/No”, Phone (country-code picker), and an opt-in for “edX, and its parent company, 2U, Inc.” marketing. FAQ answers name a human role: “contact an Enrollment Specialist”, “Your Success Adviser”. Certificate wording is precise: “official certificate of attendance from Saïd Business School, University of Oxford”, “certified by the United Kingdom CPD Certification Service… estimated 80 hours of learning”.

**Trust as middleman:** “Join 600,000+ GetSmarter learners — working at [logo wall]”, per-course satisfaction %, named Programme Director with title (“Tim Morris, Emeritus Professor, Saïd Business School”), two named testimonial quotes with employer and role, explicit partner wording “in collaboration with the world’s leading universities”. Footer/FAQ declares the relationship: “GetSmarter, powered by 2U”.

**Credible vs spammy:** Credible — price shown in local currency with instalments, effort hours, exactly what the certificate is, channel-specific consent. Spammy — the DOM renders every urgency variant on every card (“Last chance / Starting soon / Late registrations close soon! / Course starts in 3 weeks / Course starts in 4 weeks”), so the badge language is boilerplate rather than data-driven; the “Deepak Chopra” entry sitting in the University facet undermines the “leading universities” framing.

---

## 3. edX Executive Education (edx.org/executive-education) and edX For Business (business.edx.org)

Source pages: https://www.edx.org/executive-education (captured), https://business.edx.org/ (captured). https://www.edx.org/learn/executive-education is a 404.

**edX exec-ed first screen:** H1 “Executive education programs — Level up your leadership skills with programs from top universities around the world.” Single CTA **“Find your program”** (anchor-jumps to the subject index). Logo carousel. Three stat tiles: **“100M learners worldwide…”, “580K professionals have had their lives changed through executive education programs”, “6-20+ week programs from top institutions”**. A promo banner: “Save up to 20% with code ACTION2026”.

**Browse design:** no facets; a **“Jump to a subject area”** link list (36 subjects: Artificial intelligence … Sustainability) followed by curated 4-card rows per subject group (“AI and machine learning”, “Business management, strategy, innovation and entrepreneurship”…) each with “Show More”. Page ends with an FAQ that reveals the fulfilment partner: “What is GetSmarter? GetSmarter, powered by 2U…”.

**Card design (exact order):** 1) badge **“Executive Education”**, 2) title, 3) school short name (“MIT Sloan School of Management”, “Oxford Saïd”, “LSE”, “CISL”), 4) **“6 weeks to complete”**. No price, no date, no rating on the card. Closing CTA: “Find the right executive education program for you”.

**edX For Business first screen:** “Enterprise learning with impact — Drive organizational success with smart, scalable, and credential-granting learning solutions.” CTAs **“Chat with us” | “View Plans”**. Logo wall captioned **“Content from 260+ world-class university and industry partners”**. Nav exposes the plan ladder: **“Compare Plans | Essentials Plan | Team Plan | Enterprise Plan”** and two product lines “edX Courses” (self-paced, stackable) vs “edX ExecEd” (“Cohort-based leadership training programs”). Curated “edX Academies” (AI, Sustainability, Tech & digital transformation, Data, Management, Leadership, Supply chain, Communication). One customer quote with name, title, employer. Contact form: **First Name, Last Name, Work Email, Phone, Company Name, Country** — “Not sure where to start? Complete the form below to be connected with a member of our team”.

**Trust:** partner count, learner count, customer testimonial with role, case-study library. **Credible vs spammy:** the B2B page repeats the hero block five times in the DOM (carousel) and uses a generic country dropdown, but plan names, a “Compare Plans” page and “Work Email” (not personal email) signal a serious B2B funnel.

---

## 4. Coursera — Business category & Professional Certificates (coursera.org)

Source pages: https://www.coursera.org/browse/business (captured), https://www.coursera.org/courses?query=leadership&productTypeDescription=Professional%20Certificates (captured).

**First screen sells:** category framing plus volume: “Business — Explore business courses on Coursera and build leadership, financial management, marketing, and entrepreneurship skills.” Stat strip **“1113 credentials · 14 online degrees · 6156 courses”**. Then “Most popular” with level tabs **“All | Beginner | Intermediate | Advanced”**. Header CTAs: “Join for Free”, plus audience switch “For Individuals / For Businesses / For Universities / For Governments”.

**Filter design (left rail, each facet shows counts):**
- **Language** (English 7,107; Spanish 3,038; **Arabic 2,743**; French 2,602; “Show 51 more”) — Arabic is the third-largest language.
- **Learning Product** with one-line definitions under each option: “Guided Projects (697) — Build job-relevant skills in under 2 hours…”, “Courses (6,156)”, “Specializations (1,026)”, “Professional Certificates (87) — Earn career credentials from industry leaders…”, “MasterTrack® Certificates (2)”, “Degrees (14)”, “Graduate Certificates (16)”, “University Certificates (2)”.
- **Level**: Beginner / Intermediate / Advanced / Mixed.
- **Duration** buckets: “Less Than 2 Hours · 1-4 Weeks · 1-3 Months · 3-6 Months · 6-12 Months · 1-4 Years”.
- **Skills** (996 more), **Subtitles**, **Educator**, **Hands-on Learning**, **Tools**.
- Default sort **“Sort by: Best Match”**. On the search page facets collapse to chips: “Topic · Duration · Professional Certificates · Language · Level · Clear all”.

**Card design (exact order):**
1. Partner logo + partner name (“Google”, “University of Pennsylvania”, “Microsoft”)
2. Title
3. “Skills you’ll gain: …” (long comma list, search results only)
4. Meta line: **“★ 4.8 (145K) · Beginner · Professional Certificate · 3 - 6 Months”**
5. Status chips: “Trending right now”, “Free trial”, “Top AI program”, “Job ready”, “Build toward a degree”, “New”, “Preview”

Price is never on the card (subscription model); conversion is “Free trial”/“Join for Free”, Coursera Plus upsell tiles (“Start learning with big savings — Get Coursera Plus”, “Save as your team builds skills — Save 30% today”). Mid-results intent survey: “What brings you to Coursera today? Start my career / Change my career / Grow in my current role / Explore topics outside of work”.

**Trust:** rating + review count on every card (the single strongest per-item trust cue in the set), partner logos, “91% of Coursera learners report a positive career outcome” (in ads placed on Class Central). **Credible vs spammy:** credible because every claim on a card is a number; slightly spammy because a “Professional Certificates + leadership” query returns IBM Scrum Master and SAP Consultant — relevance is loose and Microsoft/IBM “New” badges crowd out universities.

---

## 5. executivecourses.com (Pritzwalks; est. 2001)

Source pages: https://executivecourses.com/ (captured), https://executivecourses.com/search (captured), https://executivecourses.com/subjects/leadership (captured, “1-8 of 430 Results”), https://executivecourses.com/most-popular-executive-courses (captured), plus a school profile page https://executivecourses.com/schools/europe/belgium/vlerick-business-school (captured).

**First screen sells:** the directory itself — “Find Executive Education Worldwide” with two giant selects (“All Countries …” listing every country and every US state; “All Subjects …” ~55 subjects) and a **“Courses near me: 100 miles / 500 miles / 2500 miles / Show All Courses”** control. Then editorial (“Featured” articles dated Aug/Jul/May 2026), “Top 10 Lists” (“Top 10 Business Schools Worldwide for Executive Education”, “Top 10 Executive Courses in Finance”), two “Featured Courses” boxes (“Learn More”), and a **calendar table “Upcoming Courses”** grouped by date with columns **Start Date | Course | Business School | Subject**, rows tagged “Featured”, and “Show more for this date”.

**Advanced search form fields (exact):** KEYWORDS (optional) · COUNTRY / REGION (regions + countries + US states, plus “Online” as a location) · SUBJECT · **LANGUAGE (English, Spanish, German, French, Chinese, … Arabic …)** · **PROGRAM TYPE: “Short program · Full-time program · Modular program (in blocks) · Certificate Program · Online · Blended · Executive Master’s”** · **TUITION** (range control) · “Start Search”. On subject listing pages the same appear as two chip filters (Program Types, Locations) with **Sort by: Featured | Date | Popularity | Name** (default **Featured**).

**Card design on listing pages (exact order):**
1. Rank number + “featured” tag (when paid)
2. Title (link)
3. One-line teaser, truncated with “[More]” (e.g. “Length: 6 days plus post-program coaching. Location: Lausanne. …”)
4. Date range **“Sep 06, 2026 - Sep 11, 2026”**
5. School short name **[IMD]**
6. Program type “Full-time program” / “Short program” / “Online”

On school profile pages the card gains a **price number** (“3,995”, “5,995” — currency implied by school) as the first field, then Title, “Location: Brussels. Duration: 3 days.”, dates, subject tags (“General Management/ Leadership”), language (“English”), CTA **“Learn More”**. School pages have a single CTA **“Request Info”** at top and tabs “Overview | Past Courses | Articles”, plus address and website. The “Most Popular” page is a **ranked school table** (“Rank | Full Profile | School | Activity”, “based on unique profile views and community activity”).

**Trust:** longevity (“© 2001–2026 Pritzwalks”), editorial by named journalists (“By Seb Murray”), “Top 10” lists, popularity ranking with method sentence, school-owned profiles. No reviews, no ratings, no learner counts.

**Lead capture:** “Request Info” (school page), “Learn More” (outbound), “Submit Executive Course” (supply side), newsletter “Subscribe”, “Login / Register”, “Advertise”. A footer carousel of paying schools with taglines (“IMD — Grow as a leader, make an impact.”).

**Credible vs spammy:** Credible — real dates, real prices on school pages, program-type taxonomy that matches how exec-ed is actually sold, language facet, explicit “featured” labelling, editorial voice. Spammy — country dropdown with 100+ entries including every US state, “Featured” as default sort (pay-to-rank), cards missing school names for featured rows (“[]”), 2001-era visual density, no reviews.

---

## 6. findcourses.com (Keystone Education Group)

Source pages: https://www.findcourses.com/ (captured in full). Search/listing pages (`/search/executive-education-programs`, `/search/online-executive-education`, `/search/leadership-management-training`) returned empty/blocked bodies from three crawler engines (bot protection); the 404 template did expose the search widget. Supplemented by https://www.findcourses.com/review-policy-24133 and https://www.findcourses.com/who-we-are-14099 via search.

**First screen sells:** volume and comparison — H1 **“Looking to find the perfect course? You’ve come to the right place”**, sub “Whether it’s a nearby seminar, an online course that fits your busy schedule, or custom training delivered at your company headquarters - we’ve got you covered. Search and compare top professional training courses from **6,000+ providers!**” Search widget facets (from the 404 template): **“Search courses 👉 Category · Format · Place · Delivery”**. Category mega-menu shows counts at every level (“Leadership & Management (2439)”, “IT & Computer Skills (3698)”, “Finance For Non Finance Managers (36)”). Footer lists **“Course formats: Virtual Classroom · Self-paced Online · Online · Live Classroom · On-site / Company-specific”** and “Top locations: Chicago, San Francisco…”. Header: “Create account — Save your favorite programs and get personalized suggestions, completely free. Become a member.”

**Card design (homepage “Most Popular Courses” — every card is labelled):**
1. **“Promoted”** label
2. Provider name (“ADVISA”, “Association for Talent Development (ATD)”, “B2T Training”)
3. Title
4. One-sentence benefit copy
5. CTA **“Learn more”**

Listing cards (per site help/search results) additionally carry length, location/format, price “From …”, next start, and a star rating; conversion is a per-course **“Request information”** form — “Users can express their interest by filling out a short form with their contact details and any questions they have. The inquiry goes directly to the training provider, who will typically respond within a few business days.”

**Trust:** a **“New Course Reviews”** stream on the homepage with initials, job title, date, “5/5”, review text, course link, and the line **“Reviews are published according to our review policy.”**; provider counts; Keystone group footer listing ~20 sister sites (studentum.se, educations.com, findcourses.co.uk…); “Who we are” page. Editorial: “Top 10 Course Lists”, “Editorial Picks”, “White Papers and Reports”, “Webinars”.

**Credible vs spammy:** Credible — every paid row says “Promoted”; a published review policy; reviewer role instead of a fake full name; membership with a real benefit (save/compare). Spammy — the homepage is a wall of ~600 category links with counts (SEO farm feel), a literal “Ads” heading and “Advertise Your Courses” in the main nav, emoji in the search prompt, and the whole business model is “Request information” lead resale.

---

## 7. Class Central (classcentral.com)

Source pages: https://www.classcentral.com/ (captured), https://www.classcentral.com/subject/business (captured, “Showing 46,525 courses”), https://www.classcentral.com/search?q=leadership (captured, “12,254 courses”).

**First screen sells:** neutrality + scale — “Find your next course.” search with “Most common: harvard, web development, machine learning”, “Popular subjects” with counts (“Artificial Intelligence 32,636 courses”), and the tagline **“Find the best courses, wherever they exist”** over three count tiles **“1300+ Universities · 100 Providers · 1700+ Institutions”** with logo lists. Then “Rankings — Over 250,000 reviews written by Class Central users help you pick the best course.” and live community stats (“100M visitors · 5M sign-ups · 10,769 sign ups in the past 7 days · 42,509 courses bookmarked in the past 7 days”).

**Filter design (left rail with counts, default sort “Relevancy”):**
- Quick toggles: **“Free course (23,305) · With certificate (17,215) · Career certificates (1,972) · From universities (6,025)”**
- **Level**: Beginner / Intermediate / Advanced
- **Duration**: “< 30 mins · 30 - 60 mins · 1 - 2 hours · 2 - 5 hours · 5 - 10 hours · 10+ hours”
- **Subject** (on search): Business (7,058), Technology, Conference Talks…
- **Language**: English (32,094), **Arabic (356)**, … 40 languages, “See all”
- Sort: **“Relevancy | Highest rated | Lowest rated | Most recently added”**; apply button reads **“Show 20,000 courses”**; “Clear Filters”.

**Card design (exact order):**
1. Thumbnail
2. Institution logo + badges (“HRCI”, “Career Certificate”, “Degree”)
3. Title
4. **“3441 ratings at Coursera”** / “91 ratings at Noble Desktop” (rating source named)
5. One-sentence description
6. “Add to list” action
7. Meta bullets: provider (“Coursera”), duration (“20 weeks, 6 hours a week” / “12 hours”), pace (“Self-Paced”), price (**“Free Online Course” / “Paid Course” / “$549.00” / “$5,940.00”**), composition (“5 courses”), award (“Best of All Time”)

Sponsored slots are visually distinct promo cards (“Learn AI, Data Science & Business — Earn Certificates That Get You Hired … Coursera · Flexible”; “PowerBI Data Analyst… DataCamp · Flexible”) interleaved at positions 1 and 9.

**Trust:** independent editorial (“The Report”, named authors, dated), rankings “Best of All Time”, review counts with the *source* named, follower counts per subject (“Follow 643.9K”), About text “Class Central aggregates courses from many providers to help you find the best courses on almost any subject, wherever they exist.”

**Conversion:** outbound “Go to class” (on detail pages), “Add to list”, free account (“Get personalized course recommendations, track subjects and courses with reminders”), newsletter. No lead forms.

**Credible vs spammy:** the most credible aggregator in the set — price is always stated (even as “Free/Paid”), rating provenance is explicit, sponsored cards are unmistakably different. Weakness for our purpose: it is MOOC-scale (duration buckets in minutes), not exec-ed cohort scale.

---

## 8. Poets&Quants for Execs (poetsandquantsforexecs.com)

Source pages: https://poetsandquantsforexecs.com/ (captured). https://poetsandquants.com/category/executive-education/ is a 404; the exec-ed vertical lives on the sister site. Supplemented by https://poetsandquantsforexecs.com/rankings/guide-to-emba-ranking-methodology/ and https://poetsandquantsforexecs.com/school-profiles/ via search.

**First screen sells:** journalism, not a catalogue. Nav: “News · Rankings · Metro EMBAs (New York City, Chicago, Washington D.C., Los Angeles, San Francisco (Coming Soon)) · Schools (Executive MBA School Profiles) · Online MBA · Students · Admissions · Part Time · Exec Ed · Directories (MBA Admissions Consulting Directory, Specialized Master’s Program Directory, Online MBA Directory)”. Top of page: **“Featured Schools / Today’s Featured Schools”** logo strip (paid), three lead stories, “Featured Video”, “Editor’s Picks”, “Top Stories — Today’s Must Reads” (numbered).

**Comparison artefact worth copying:** a small data table “Back of the Envelope — The Priciest EMBAs” with columns **School | Cost** (“Kellogg $187,290 … Duke $166,000”) and “Read More”. Also an **“On the Horizon — Upcoming Events”** list (date + event title, e.g. “September 23, 2026 — Application Deep Dive: MBA For Executives”) which is school-sponsored webinars — the lead-gen surface.

**Trust:** methodology page (“composite ranking gives equal weight to the four most influential lists… U.S. News, Bloomberg BusinessWeek, The Financial Times, The Economist”), named editors, view counts on stories (“194 views”). **Lead capture:** “Stay informed. Sign Up!”, event registrations, school profile pages, sponsored “Featured Schools”. **Credible vs spammy:** editorial depth is real, but Google display ads in the sidebar, “sponsored” articles mixed into the feed, and an admissions-consultant directory make the surface feel monetised; the parent site’s 404 also showed a “Handicapping Your MBA Odds” ticker with GMAT/GPA — audience-inappropriate for exec-ed.

---

## 9. Financial Times Executive Education rankings (rankings.ft.com) — partial

Source: https://rankings.ft.com/rankings/2986/executive-education-open-2025 returned HTTP 500 / reCAPTCHA on two rendered attempts; the direct fetch was also blocked. Methodology facts below are from secondary sources (LBS, IE, POLIMI press pages) and are reliable; UI details are from prior knowledge of the FT rankings interface and are flagged as **unverified**.

**What the ranking measures (verified):** 85 schools evaluated; “80% of the final score based on direct feedback from participants and 20% derived from school-reported data”; criteria columns include **Quality of participants · New skills and learning · Teaching methods and materials · Course design · Faculty · Aims achieved · Follow-up · International participants · International location · Repeat business** etc. (“14 categories”). Sources: https://www.london.edu/news/lbs-executive-open-custom-education-rankings-2025 ; https://www.ie.edu/business-school/news-and-events/whats-going-on/ie-business-school-ranks-10-globally-financial-times-2025-executive-education-ranking/ ; https://www.gsom.polimi.it/en/knowledge/ft-executive-education-ranking-2025/

**Compare experience (unverified UI, from prior knowledge):** a wide sortable table with **rank, 3-year rank trend, school, country**, then one column per criterion each independently sortable; a checkbox per row to **“Compare”** selected schools side by side; filters by region/country; a “Methodology” panel adjacent to the table; each school name links to a profile with the school’s own contact/website. The pattern to borrow is *sort-by-any-criterion + multi-select compare + methodology one click away*, not the FT’s specific criteria.

---

## 10. Other compare tools checked

- **mba.com “Find Programs” (GMAC)**: https://www.mba.com/explore-programs/find-programs has moved (“The Page You Are Trying to View No Longer Exists”). Nav still exposes the structure worth noting: “Match with Programs → Find MBA Programs / Find Master’s Programs / **Find Executive Programs** / Find Online Programs”, plus “MBA ROI Calculator” and “Estimate Your Salary” as decision tools, and “Connect with Schools (GradSelect)” as opt-in lead sharing.
- **School-owned catalogues** (captured in the same scratchpad from a sibling task: LBS, MIT Sloan, HBS, Wharton, Stanford GSB, IMD, IESE) all standardise on **Dates · Location/Format · Duration · Fee · Language** as the fixed fact strip on a program card, with “Apply” / “Download brochure” / “Talk to us” as the CTA trio — this is the vocabulary exec buyers already know.

---

## 11. Cross-site comparison matrix

| Site | Model | Facets exposed | Card fields (order) | Price on card | Trust device | Primary CTA wording |
|---|---|---|---|---|---|---|
| Emeritus | Operator | none (topic/university nav only) | School › Title › Duration › Format › “Starts on/Last Date to Apply” | No | 80+ universities, 500K learners, regulator ID | “Download Brochure” / “View Program” |
| GetSmarter | Operator | University, Category; sort A-Z/Newest/Starting soon/Most popular | School › Title › Type › urgency › “Next start date” › “% Student satisfaction” › weeks › “Cohort learning, X hrs/wk” | No (detail page: “$2,508 USD” + Installment Plan) | 600,000+ learners, per-course satisfaction, named director | “Register now” › “Get more information” › “Request a call” › “Get for your team” |
| edX ExecEd | Operator | none (jump links) | “Executive Education” › Title › School › “6 weeks to complete” | No | 100M learners, 580K exec-ed pros | “Find your program” |
| edX For Business | B2B | plan ladder | n/a | Plans page | “260+ partners”, case studies | “Chat with us” / “View Plans” |
| Coursera | Operator/marketplace | Language, Learning Product, Level, Duration, Skills, Subtitles, Educator, Hands-on, Tools; sort Best Match | Partner › Title › Skills › ★rating (n) · Level · Type · Duration › status chips | No (subscription) | rating + review count | “Free trial” / “Join for Free” |
| executivecourses.com | Directory | Country/Region (incl. Online), Subject, Language, Program Type, Tuition; sort Featured/Date/Popularity/Name | rank › “featured” › Title › teaser › date range › [School] › Program type (+price on school pages) | On school pages | Est. 2001, editorial, Top-10 lists | “Learn More” / “Request Info” |
| findcourses.com | Directory | Category, Format, Place, Delivery (+price, start, rating on results) | “Promoted” › Provider › Title › blurb | Yes on results (“From”) | 6,000+ providers, verified reviews + review policy | “Request information” / “Learn more” |
| Class Central | Aggregator | Free/With certificate/Career cert/From universities, Level, Duration, Subject, Language; sort Relevancy/Highest rated | Logo+badges › Title › “n ratings at Provider” › blurb › Add to list › provider · duration · pace · price | Yes (“Free/Paid/$549”) | 250,000 reviews, independent editorial | “Go to class” / “Add to list” |
| P&Q for Execs | Editorial | none | story cards; cost table School|Cost | In tables | methodology page, named editors | “Sign Up!”, event registration |
| FT rankings | Rankings | region/country; sort any criterion; compare | rank › trend › school › country › criteria… | No | 80% participant survey, methodology | (school website) |

---

## 12. The 10 patterns to adopt (with field orders, wording, defaults)

1. **Fixed “fact strip” on every card, in this order:** *Provider (school/institute logo + name) → Title → Format (In-person · Online · Blended) → Duration (“3 days” / “6 weeks”) → Next start date or “Applications close [date]” → Price (with currency) → Language.* Every operator site leads with school then title (Emeritus, GetSmarter, edX); the directories that omit price on cards feel like lead-gen. Class Central and findcourses prove price on the card is expected; school-owned sites prove “Dates · Location · Duration · Fee · Language” is the exec-ed vocabulary. Arabic version: same order, RTL, dates in both Hijri-free Gregorian with Arabic month names.

2. **Facets tuned to exec-ed, not MOOCs** (from executivecourses.com + Coursera): *Topic · Format (In-person / Online live / Online self-paced / Blended) · Location (City; “Online” as a location value) · Duration buckets (“1 day · 2–5 days · 1–4 weeks · 1–3 months · 3–6 months · 6+ months”) · Language (Arabic / English / Bilingual) · Program type (Short program · Certificate · Modular · Executive Master’s) · Price range · Start date (Next 30 / 90 days) · Provider.* Show counts next to every option (Coursera, Class Central, findcourses all do). Default sort **“Starting soon”** for a dated inventory (GetSmarter offers it; executivecourses defaults to paid “Featured” — avoid). Offer “Most popular”, “Price: low to high”, “Newest”.

3. **Deadline logic on cards** (Emeritus): show **“Starts 16 Sep 2026”** normally; when a registration deadline is inside ~10 days switch the same slot to **“Apply by 10 Sep 2026”**. One slot, two states, data-driven — never both, never boilerplate.

4. **Effort and cohort facts** (GetSmarter): “Cohort-based · 6 weeks · 6–8 hours per week · English” as a secondary line on the detail page and as a hover/expanded row on cards. Buyers of exec-ed are time-poor; hours/week is a decision variable.

5. **Trust bar with sourced numbers** (Emeritus, Class Central, GetSmarter): a homepage strip like **“48 providers · 620 programs · 12 cities · 3,200 professionals enrolled via Masar”** where each number is a live count, plus one dated source line for any survey claim (“Source: Masar learner survey, Q2 2026”). Label the partner relationship precisely — **“Official partner”** only where a contract exists, otherwise “Listed program”; Emeritus’s “in collaboration with” and GetSmarter’s “powered by 2U” disclosure are the honest wording models.

6. **Review provenance** (Class Central, findcourses): show “★ 4.7 · 38 reviews” and *where the reviews came from* (“38 reviews from Masar participants”); publish a one-page **review policy** and link it under the review stream (“Reviews are published according to our review policy”). Show reviewer as role + company size, not a full name (findcourses: “PM · Project Manager · 5/5”).

7. **Tiered CTAs, in this order and wording** (GetSmarter’s detail page is the best model): primary **“Register / Enroll”** (or “Apply” when the school gates admission) → secondary **“Get the brochure”** (email only) → tertiary **“Request a call”** (phone only here) → **“Enroll my team”** (B2B). On cards, one CTA only: **“View program”**. Never make phone number mandatory for the brochure — split channels with explicit “Contact me by email: Yes/No · by phone: Yes/No” (GetSmarter), not a single bundled “Email/Call/WhatsApp/SMS” consent (Emeritus).

8. **Price transparency with instalments** (GetSmarter): show price on the card and detail page in the viewer’s currency (header switcher; GetSmarter already lists **SAR and AED**), and an “Installment plan” disclosure table with dated amounts. If a provider refuses to publish price, show **“Price on request — typically SAR 8,000–15,000 for this format”** rather than nothing.

9. **Compare shortlist** (FT rankings, Class Central “Add to list”): a checkbox on every card → sticky “Compare (3)” bar → side-by-side table with rows *School · Format · Location · Duration · Hours/week · Start · Deadline · Price · Language · Certificate type · Reviews.* Any column sortable; “Methodology” or “How we list programs” one click away.

10. **Editorial and curated lists as the non-spam layer** (executivecourses “Top 10”, Class Central “Best of”, P&Q “Priciest EMBAs” table, findcourses “Editorial Picks”): dated, bylined guides (“Best leadership programs in Riyadh, Q4 2026”), a calendar view grouped by date (executivecourses “Upcoming Courses: Start Date | Course | Business School | Subject”), and small comparison tables (“School | Fee | Days”) — these earn SEO and trust simultaneously and give the homepage something other than cards.

Bonus (bilingual specifics): Coursera shows **Arabic as the #3 language with 2,743 business courses**, Class Central lists Arabic with counts, executivecourses includes Arabic in its language facet — make *Language of instruction* a first-class facet and card field, and add “Bilingual (AR/EN)” as a value since Gulf providers often teach mixed.

---

## 13. Five anti-patterns to avoid (they read as lead-gen spam)

1. **Unlabelled or default-on paid placement.** executivecourses.com defaults sort to “Featured” and some featured rows lose their school name; P&Q’s “Today’s Featured Schools” strip sits above content. If a slot is paid, label it **“Sponsored”** (findcourses’ “Promoted”, Class Central’s visually distinct promo cards) and never make paid the default sort.

2. **Boilerplate urgency.** GetSmarter renders “Last chance · Starting soon · Late registrations close soon! · Course starts in 3 weeks · Course starts in 4 weeks” on every card; Emeritus shows “Last Date to Apply: 10 Sep 2026” on nearly all 425 cards. Show at most one urgency chip, only when computed from a real deadline within a real window.

3. **Hidden price behind a phone number.** Emeritus and edX ExecEd never show fees; the brochure modal is the price gate. Exec buyers (and their L&D approvers) interpret this as a sales funnel. Publish price or a stated range.

4. **Bundled multi-channel consent and phone-mandatory forms.** “I agree to receive communications via Email/Call/WhatsApp/SMS” (Emeritus) and country-code phone pickers with 200 entries (GetSmarter, edX For Business) are the strongest spam signals in the set. Ask for email first; phone optional; one checkbox per channel; state who will contact (“a Masar programme adviser, not the school’s sales team”).

5. **Directory sprawl as the homepage.** findcourses’ ~600 category links with counts, executivecourses’ dropdown of every US state, mba.com’s ad-laden 404 — breadth without curation reads as an SEO farm. Keep the first screen to search + 6–8 topic tiles + trust bar + 6 curated cards; put the taxonomy behind “All topics”.

---

## 14. Source URLs (captured or consulted)

Captured (rendered and read):
- https://emeritus.org/
- https://emeritus.org/online-certificate-courses/
- https://emeritus.org/programs/
- https://www.getsmarter.com/
- https://www.getsmarter.com/courses
- https://www.getsmarter.com/products/oxford-executive-leadership-programme
- https://www.edx.org/executive-education
- https://business.edx.org/
- https://www.coursera.org/browse/business
- https://www.coursera.org/courses?query=leadership&productTypeDescription=Professional%20Certificates
- https://executivecourses.com/
- https://executivecourses.com/search
- https://executivecourses.com/subjects/leadership
- https://executivecourses.com/most-popular-executive-courses
- https://executivecourses.com/schools/europe/belgium/vlerick-business-school
- https://www.findcourses.com/
- https://www.classcentral.com/
- https://www.classcentral.com/subject/business
- https://www.classcentral.com/search?q=leadership
- https://poetsandquantsforexecs.com/

Attempted, not renderable (noted in text): https://rankings.ft.com/rankings/2986/executive-education-open-2025 (HTTP 500/reCAPTCHA); https://www.findcourses.com/search/executive-education-programs and /search/online-executive-education (bot-blocked, empty body); https://emeritus.org/all-courses/ (404); https://poetsandquants.com/category/executive-education/ (404); https://www.edx.org/learn/executive-education (404); https://www.mba.com/explore-programs/find-programs (moved).

Consulted via search:
- https://www.findcourses.com/review-policy-24133
- https://www.findcourses.com/who-we-are-14099
- https://www.london.edu/news/lbs-executive-open-custom-education-rankings-2025
- https://www.ie.edu/business-school/news-and-events/whats-going-on/ie-business-school-ranks-10-globally-financial-times-2025-executive-education-ranking/
- https://www.gsom.polimi.it/en/knowledge/ft-executive-education-ranking-2025/
- https://poetsandquantsforexecs.com/rankings/guide-to-emba-ranking-methodology/
- https://poetsandquantsforexecs.com/school-profiles/
- https://executivecourses.com/what-is-executive-education
- https://emeritus.org/universities/
