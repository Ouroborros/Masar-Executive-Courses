# Which providers the index is missing — checked 2026-10-23

Purpose: answer "what universities are missing here?" for the live index,
which holds fifteen providers and 817 programmes (St. Gallen, MIT Sloan,
UBC Sauder, IMD, CBS Executive, NUS, Kellogg, Harvard Kennedy School,
Stanford GSB, Berkeley Haas, Smith/Queen's, AGSM UNSW, NYU Stern, Michigan
Ross, Center for Creative Leadership).

Method and limits: eight research agents ran web searches (the sandbox blocks
direct page fetches, so every fact below comes from search-result snippets and
schools' own press releases, not from reading the programme pages). FT 2025
open-enrolment ranks are the schools' own announcements or a Spanish secondary
roundup (mastermania) unless marked; the FT table itself could not be opened.
Fees and dates quoted are snippet-level and must be re-read on the school's
page before anything is crawled or published. "Publishes dates/fees" means a
snippet showed them on the school's own site; "unknown" means not seen, not
"no". No robots.txt has been reviewed for any school named here; that review
(as in `school-robots-2026-09-14.md`) must precede any crawl.

## A. On the aggregator's own list but never in the index

The executivecourses.com school list the project started from had 21
schools. Five never reached the index:

| School | Why it is absent |
| --- | --- |
| INSEAD (Fontainebleau / Singapore / Abu Dhabi) | Its aggregator rows yielded no admitted course in the 2026-08 import, and the 2026-09 school-domain crawl covered only schools already in the index. FT 2025 open rank 7 (secondary source). Publishes per-programme dates-and-fees pages in EUR, including Abu Dhabi sessions. |
| Vlerick Business School (Belgium) | Fees printed with no currency marker; 80 rows rejected as unpriceable (with IMI). FT 2025 open rank 25 (school release). |
| Irish Management Institute (Dublin) | Same bare-fee problem as Vlerick. |
| ETH Zurich (School for Continuing Education) | No admitted rows from the aggregator page; never crawled on its own domain. |
| UCT Graduate School of Business (Cape Town) | Fees suffixed INR at the aggregator source, failed the plausibility floor; school record removed 2026-09. Its own site lists an Executive Development Programme and short courses. |

## B. FT 2025 open-enrolment ranking: schools in the table but not in the index

Ranks confirmed from a school release or two sources are plain; a single
secondary source is marked (s); "top N" is the school's own wording.

| FT 2025 open rank | School | Country | Publishes fees on site | Gulf link seen |
| --- | --- | --- | --- | --- |
| 1 | London Business School | UK | yes on its Saudi pages (USD, ex-VAT) | Riyadh executive office (Diriyah, Nov 2025) with open programmes in the Kingdom; Dubai centre |
| 2 | HEC Paris | France | yes (EUR, topic pages) | Doha campus (EMBA); Riyadh EMBA track with Altamayyuz (degree) |
| 3 | IESE | Spain | partly | — |
| 4 (s) | Fundação Dom Cabral | Brazil | unknown | — |
| 5 | Esade | Spain | yes (EUR; 52-programme open catalogue) | delivers Misk 2030 Leaders (closed cohort) |
| 6 | Saïd Business School, Oxford | UK | unknown (portfolio brochure PDF) | — |
| 7 (s) | INSEAD | France / Singapore / UAE | yes (EUR dates-fees pages) | Abu Dhabi campus runs open programmes |
| 8 | EDHEC | France | unknown | — |
| 9 | IMD | — | already in the index | |
| 10 | IE Business School | Spain | partly | — |
| 11 | ESSEC | France | unknown | — |
| top 20 | Stockholm School of Economics | Sweden | partly (SEK) | — |
| top 20 (17th in 2024) | ESMT Berlin | Germany | unknown | — |
| 11–20 (10th in 2024) | SDA Bocconi | Italy | yes (EUR + VAT) | — |
| 17 (s) | Insper | Brazil | unknown | — |
| 19 | EADA | Spain | unknown | — |
| joint 19 | Warwick Business School | UK | unknown | — |
| 22 | emlyon | France | unknown | — |
| 23 | Universidad de los Andes | Colombia | partly (COP) | — |
| 24 (s) | ESCP | France (multi-campus) | unknown | — |
| 25 | Vlerick | Belgium | no currency marker | — |
| top 25 | Henley Business School | UK | partly (Henley Africa, ZAR) | — |
| 30 | Nova SBE | Portugal | unknown | — |
| 30 | HEC Montréal | Canada | unknown | — |
| 32 | Ivey Business School | Canada | partly (CAD) | — |
| 34 | Schulich (York) | Canada | unknown | — |
| 35 | IIM Ahmedabad | India | yes (INR + GST; current calendar to 2027) | — |
| 37 | Católica Lisbon | Portugal | unknown | — |
| 49 (29 in 2026) | Cranfield | UK | unknown | says it delivered executive development in Madinah (HRDF-funded) |

Unresolved 2025 places: 12–14, 16, 18, 20–21, 26–29, 31, 33, 36, 38–40.
Michigan Ross (already in) was reported at 15 by one noisy snippet.

## C. Major US schools that do not take part in the FT lists

Harvard Business School, Wharton, Columbia, Chicago Booth, MIT Sloan and
Stanford GSB do not participate in the FT exec-ed rankings (Poets&Quants,
2024 and 2026), so their absence from table B means nothing. The ones missing
from the index, all of which print USD fees on their own pages:

| School | What the snippets showed | Gulf link seen |
| --- | --- | --- |
| Harvard Business School Executive Education | full programme schedule PDF; AMP, GMP, PLD, OPM, short programmes with USD fees | Senior Executive Leadership Program–Middle East (Boston + Dubai, 2017 launch) |
| Wharton Executive Education | program finder; 30+ open programmes plus online | C-Suite Leaders Program–Middle East (Dubai); Global Modular Courses in Al Khobar/Riyadh (per `ksa-market-and-brand.md`); PIF Academy partner |
| Columbia Business School Executive Education | all-programs listing; EDP and Senior Executive Program fees | — |
| Chicago Booth Executive Education | AMP and open programmes with fees | — |
| Yale School of Management | short leadership and negotiation courses with fees | — |
| Duke Fuqua | monthly open-programme calendar with fees | — |
| UVA Darden | filterable finder with per-course prices | past Gulf banking cohorts with the Saudi Institute of Banking |
| Dartmouth Tuck | program calendar, all-inclusive pricing | — |
| Cornell / eCornell | large online and in-person catalogue | — |
| UCLA Anderson | open-enrollment page; board director programme | — |
| Georgetown McDonough | open-enrollment page (fees not seen) | Dubai EMBA at DIFC; Georgetown Qatar executive courses; Qiyadat Global |
| USC Marshall, CMU Tepper, Texas McCombs, Emory Goizueta, Babson, Thunderbird (ASU) | priced open catalogues | Babson Global is MBSC's founding partner; Thunderbird ran SABIC/Aramco programmes and has a Dubai centre |
| Notre Dame Mendoza | small open offering | — |

## D. Other European schools not in the index

Cambridge Judge (GBP fees published; past GCC programme with the Pearl
Initiative), Imperial College Business School (fees in its online store; FT
open 55 in 2024), Rotterdam School of Management (EUR fees, number one in the
Netherlands), Mannheim (fixed EUR fees), WHU, Aalto EE (fees in brochures; FT
open 54 in 2026), Nyenrode (120+ open programmes, fees unknown), BI Norwegian,
POLIMI GSoM (43 in 2026), Porto Business School (no listing URL verified).

## E. Saudi Arabia

Open to individual enrolment, as far as the snippets show:

| Provider | City | Dates / fees on site | Note |
| --- | --- | --- | --- |
| Prince Mohammad bin Salman College (MBSC) Executive Education | KAEC | yes / yes (2026 portfolio and calendar PDFs) | Built with Babson Global; the most complete Saudi-based open calendar found |
| London Business School, Riyadh executive office | Riyadh (Diriyah) | unknown / yes (USD ex-VAT on the Saudi pages) | Same crawl as LBS above |
| Alfaisal University Centre of Executive Education & Development | Riyadh | unknown / unknown | Exam-prep and certificate heavy (PMP, CFA, FRM) plus an ASPIRE senior-leader programme |
| Tuwaiq Academy, Tuwaiq Executives | Riyadh | partly / unknown | Technology-leadership programmes for CEOs, Jul–Dec 2026, online registration |
| Institute of Public Administration (IPA) | Riyadh + branches | unknown / unknown | Government training body; access likely by entity nomination |
| SIDF Academy | Riyadh | unknown / unknown | Industrial-sector academy; appears entity-oriented |
| Imam Abdulrahman Bin Faisal University, CBA | Dammam | unknown / unknown | Publishes an executive-education brochure, no calendar seen |

Not index candidates on present evidence: KAUST KSLP/LEAP (nominated
cohorts), Misk 2030 Leaders and Qiyadat (selective, Saudi nationals,
delivered by Esade), PIF Academy (portfolio staff only), KFUPM Business
School (EMBA only), King Saud University CBA and Prince Sultan University
(degree or staff training), HEC Paris Riyadh track (EMBA with Altamayyuz),
Saudi Digital Academy (bootcamps), Effat (only a dated master's), SEU's
one-off Digital Transformation Leaders fellowship.

## F. Rest of the GCC

| Provider | City | Dates / fees on site | Note |
| --- | --- | --- | --- |
| INSEAD Middle East campus | Abu Dhabi | yes / yes (EUR, ex-tax) | Strongest regional addition; same crawl as INSEAD |
| Mohammed Bin Rashid School of Government | Dubai | partly / unknown | Arabic-language professional diplomas for public-sector leaders; some programmes with HKS and LKY School |
| SP Jain School of Global Management | Dubai | unknown / unknown | Dedicated open-programmes site |
| Alliance Manchester Business School, Middle East Centre | Dubai | unknown / unknown | Four-day short courses, stackable to a diploma |
| Georgetown University in Qatar, Executive and Professional Education | Doha | unknown / unknown | Open and certificate courses |
| Hamad Bin Khalifa University, Executive Education Center | Doha | unknown / unknown | Only an about page seen |
| American University of Sharjah | Sharjah | unknown / unknown | Executive certificates; openness unconfirmed |
| Emirates Institute of Finance; Bahrain Institute of Banking and Finance | Abu Dhabi; Manama | unknown | Banking-sector training; openness unconfirmed |
| MBZUAI Executive Program | Abu Dhabi | unknown | Only a registration headline seen |

Degree-only or no open catalogue found: Hult Dubai, Strathclyde Dubai,
Zayed University, Qatar University, Khalifa University, HEC Paris Doha (EMBA),
Bayes Dubai (EMBA; Bayes's priced open calendar is London-based).

## G. Asia-Pacific and Africa

| Provider | Dates / fees on site | Note |
| --- | --- | --- |
| Melbourne Business School | yes / yes | Dated, priced short-course calendar (AMP 11 days, GMP 5 days) |
| Indian School of Business | yes / yes | Published fees, durations, start dates |
| IIM Ahmedabad | yes / yes | FT 2025 open 35; current calendar into 2027 |
| IIM Bangalore; IIM Calcutta | partly / partly | Calendars seen only to early 2026 or 2024–25 |
| HKUST Business School; HKU Business School | partly / unknown | English or Mandarin open programmes |
| CEIBS | partly / unknown | AMP, ODP, WELA in Shanghai, Accra, Lagos; months conflict across pages |
| Nanyang Business School; SMU Executive Development | partly / partly | Singapore; SMU fees tied to SkillsFuture tiers |
| Lagos Business School | yes / partly | Full 2026 calendar PDF |
| UCT GSB; GIBS (Pretoria); Stellenbosch; Wits | partly / unknown–partly | 2026 dates seen only via aggregators or older PDFs |
| Strathmore Business School (Nairobi) | partly / unknown | Open programmes with Lagos BS and IESE links |
| Keio, Hitotsubashi ICS, KAIST, SNU, Macquarie | unknown | English availability, dates and fees unconfirmed |

## Recommended next additions

Ordered by (a) weight with a Saudi executive audience and (b) whether the
school itself prints dates and fees, which the index requires:

1. **INSEAD** (one crawl covers Fontainebleau, Singapore and Abu Dhabi
   sessions; dates-and-fees pages in EUR).
2. **London Business School** (FT open number one; Riyadh pages with USD
   fees; Dubai).
3. **Harvard Business School** and **Wharton** (USD fees on site; Middle
   East programmes; HBS schedule is a PDF, so the crawl must read programme
   pages instead).
4. **HEC Paris**, **IESE**, **Esade**, **Oxford Saïd**, **Cambridge Judge**
   (European top tier; HEC and Esade print EUR fees, Judge prints GBP; Saïd
   and IESE need a page read first).
5. **MBSC** (the only Saudi provider with a printed open calendar and fees;
   the facts live in portfolio PDFs, so extraction differs from the HTML
   crawls).
6. **Columbia** and **Chicago Booth** (USD fees; finance-heavy audiences).
7. **Melbourne Business School**, **ISB**, **IIM Ahmedabad** (Asia-Pacific
   depth beyond NUS and AGSM; all print dates and fees).
8. **MBRSG Dubai** (the one Arabic-taught option found; dates partial).

Before any of these is crawled: read its robots.txt in full through the
crawler (as for the current fifteen), confirm the programme-page URL pattern
and which facts the pages print, and record both in `CRAWL-STATUS.md`.

## Sources seen in search results

FT 2025 open ranking coverage: london.edu/news (LBS release),
poetsandquants.com 2025-06-01 and 2026-05-17, iese.edu/stories, ie.edu news,
essec.edu news, sbs.ox.ac.uk/news, mastermania.com 2025 roundup, EADA,
Warwick, emlyon, Vlerick, Nova SBE, Cranfield and IIMA releases, Academica
(Canadian ranks). Non-participation of US schools:
poetsandquantsforexecs.com "Elite U.S. programs missing from global lists"
(2024). Saudi and GCC: mbsc.edu.sa portfolio and calendar PDFs,
london.edu/executive-education/courses-in-saudi-arabia, ee.alfaisal.edu,
executives.tuwaiq.edu.sa (via Arab News and Sabq), insead.edu dates-fees
pages, mbrsg.ae, executive-education.spjain.ae, manchester.ac.ae,
epe.qatar.georgetown.edu, hbku.edu.qa/eec. Asia-Pacific and Africa:
mbs.edu short-course calendar, execed.isb.edu, exed.iima.ac.in calendar,
execed.hkust.edu.hk, execed.hkubs.hku.hk, ceibs.edu, lbs.edu.ng 2026
calendar PDF, gsb.uct.ac.za/short-courses, sbs.strathmore.edu.
