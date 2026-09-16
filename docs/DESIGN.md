# Masar — visual identity and design rationale

Masar (مسار, "the path") indexes open-enrolment executive programmes for
leaders in Saudi Arabia first and the wider world second. This note records
the identity decisions in `assets/css/site.css`, `tools/build.py` and
`assets/js/app.js`, and why they were made, so later changes stay on the
same route.

The research behind it is in `docs/research/`:

- `exec-ed-school-sites.md` — benchmark of HBS, Wharton, INSEAD, IMD, LBS,
  IESE, Stanford GSB and MIT Sloan executive-education sites (rendered live).
- `exec-ed-marketplaces.md` — Emeritus, Coursera, GetSmarter, Class Central,
  findcourses and others: card grammar, facets, trust and the lead-gen
  anti-patterns to avoid.
- `ksa-market-and-brand.md` — how executive education is actually bought in
  the Kingdom, Saudi digital-design conventions, typefaces, palettes, tone.
- `premium-editorial-references.md` — Porto Business School (an Awwwards
  Honorable Mention in 2018, not a Site of the Day; the live 2025–26 rebuild
  was measured instead), MIT Sloan, MasterClass and recent award-winning
  editorial sites: ten buildable moves and five award-site habits to avoid.

## The idea: the warm gallery

The ledger (dark ground, no photography, numerals as the imagery) was built
first and rejected by the operator on 16 September 2026 as too austere. The
replacement keeps the ledger's substance and changes its surface:

> **The record stays. The room it sits in is warm, light and photographed.**

What is kept from the ledger, because it is the point of the site:

1. **The facts lead.** The fee, the city, the dates and the teaching days
   are set large on every row and every record page. Nothing about them is
   ever hidden, faded or animated.
2. **One component carries the catalogue.** `.row` renders a programme at
   every scale. It now carries a small photograph of the school beside the
   title, but it is still a ruled row, not a card.
3. **Silence is a value.** A field we have not recorded prints an em dash.
   No placeholder ratings, no invented "from" prices, no "most popular".

What changes:

- **Paper is the default ground.** Dark is the alternate, for readers who
  ask for it. Both are warm.
- **Photography, of the schools themselves.** Every school is shown by an
  openly licensed photograph of its own campus, fetched from Wikimedia
  Commons by `tools/fetch-images.py` on a GitHub Actions runner and
  credited in `assets/img/credits.json`. The home hero is Riyadh at dusk.
  No stock imagery, no people posed as "executives", no deserts.
- **Softer furniture.** Radii on photographs, panels and controls; pill
  buttons; a paper panel for the finder; a soft rise as blocks enter the
  viewport. Hairlines still structure the rows.
- **Fewer marks.** The section numbers (§01…) are gone, labels are set in
  the body sans rather than the mono, and the mono is kept for what is
  genuinely a code: currency codes and the record block.

The home page reads: photograph → the finder → four figures → fields → the
next intakes → the schools as cards → method on a sand band → the
colophon, the one dark surface.

## Colour

Paper is the default ground; dark is the alternate. Both are warm — the
reference set (IMD, INSEAD, MIT Sloan) sits on warm white and campus
photography, not on pure white or pure black.

| Role | Light (default) | Dark |
| --- | --- | --- |
| Ground / paper / wash | `#F4EEE4` / `#FBF8F2` / `#EADFCF` | `#1F1B17` / `#272219` / `#2E2820` |
| Ink / secondary / muted | `#221D18` / `#57504A` / `#6E6459` | `#F3EDE3` / `#C9BFAE` / `#A79E90` |
| Hairline / rule | `#DCD1BE` / `#B5A68E` | `#3D3630` / `#5A5045` |
| Clay — the one accent | `#A9502D` | `#D9764F` |
| Band (Method chapter) | `#EADFCF` sand | `#2A241D` |
| Colophon | `#241E18` on both themes | |

Two colours are **reserved roles**, not decoration, and must never be spent
on anything else:

- **Dusk `#2E4157` / `#8FB0CE`** — the Hijri date, and only the Hijri date.
- **Olive `#4F5F40` / `#93A67E`** — the "Online" format, and only that.

Clay is the single accent: the wordmark's Arabic half, the chapter's
opposite-language title, the current nav item's underline, a primary action,
a count above a title. One clay element per screen is the budget.

Photographs sit under a warm scrim only in the hero (`--scrim`), where text
runs over them. Elsewhere they are shown as they are, cropped to a 3:2 box
with `--radius`. A school without a photograph shows the sand wash, never a
logo and never a stock substitute.

## Type

- **Latin display and all numerals:** Newsreader (variable, `opsz 6..72`,
  weight 300–500). A reading serif, set light and large. Numerals stay
  Newsreader in both locales so a fee looks identical on the Arabic page.
- **Latin body and labels:** Archivo 400/500/600.
- **Labels:** Archivo 600 at 12px, tracked and uppercased in Latin.
- **Codes:** IBM Plex Mono 400/500 — currency codes and the record block
  only. Mono is for what is genuinely a code.
- **Arabic display:** Markazi Text 500/600.
- **Arabic reading text:** IBM Plex Sans Arabic 400/500/600. Mono never
  carries Arabic.

Arabic runs at 110% of the Latin size. The last rule in the stylesheet is a
backstop that forces `letter-spacing: 0` and `text-transform: none` on
anything inside `[lang="ar"]`, because a tracked or uppercased Arabic string
is a defect no matter which rule introduced it.

## Direction is a token block, not a second stylesheet

There is no RTL override file and no physical `left`/`right` anywhere in
`site.css` — a grep for them is part of the build check. The whole locale
difference is five custom properties re-declared under `:root[dir="rtl"]`:

| Token | LTR | RTL |
| --- | --- | --- |
| `--dirx` | `1` | `-1` |
| `--origin` | `left` | `right` |
| `--track` | `.12em` | `normal` |
| `--caps` | `uppercase` | `none` |
| `--font-display` / `--font-body` | Newsreader / Archivo | Markazi / Plex Arabic |

Everything else is logical properties, so the same grid, the same reveal and
the same row render both ways. Three elements opt out and are pinned
`direction: ltr; unicode-bidi: isolate` — the count above a title, the tenet
numbers and the step numbers — because a figure keeps its own direction in
both languages.

`tools/build.py` enforces a **locale depth-parity check**: it counts the
`data-*` hooks in each English page and the matching Arabic one and fails the
build if they differ. Arabic cannot quietly become the thinner locale.

## Layout and components

- **Hero:** a full-bleed photograph with a warm scrim, the dateline, a
  two-line headline and a stand-first over it; the finder (field, city,
  month, and a count that answers back) on a paper panel at the photograph's
  foot; four figures beneath. On a short laptop screen the whole of this is
  the first screen.
- **Masthead:** the Kufi mark, then the wordmark in the reading order of the
  page — `Masar | مسار` in English, `مسار | Masar` in Arabic. Chapter nav,
  then the currency control, language and shortlist. Below 900px the
  wide-only items fold away and the currency control is cloned into the nav
  panel, where it is the only visible copy.
- **Chapters:** each has a title, its opposite-language title in clay
  beneath, and a note in the outer column. No section numbers.
- **The row** (`.row`): on mobile a two-column grid of date and content with a
  footer band; from 900px it becomes seven columns — index, date, title,
  school, teaching days, fee, action — and `.row__foot` flattens to
  `display: contents` so the footer's children join the parent grid. The
  grid widens again at 1140px.
- **School cards:** a 3:2 photograph, the name, city and country, and the
  programme count. Three across from 1080px, two from 700px.
- **Date groups:** the index groups rows by start date under a sticky head
  carrying the Gregorian date, the Hijri date in dusk, and the intake count
  with correct Arabic number agreement (singular, dual, plural, accusative).
- **The fee lockup:** the figure is the school's published amount in the
  school's currency, large. Beneath it, small, the riyal equivalent with the
  rate date and the words "not a quote". Switching the currency control
  promotes the riyal and demotes the published figure to the small line —
  neither is ever hidden.
- **Facets:** nine of them with live counts. A facet at zero is disabled, not
  hidden, so the shape of the catalogue stays visible while filtering.
- **Motion:** blocks rise 14px and fade in as they enter the viewport, with
  a 70ms stagger; photographs scale by 3–4% on hover. Off under
  `prefers-reduced-motion`. Filtering never re-animates: `initReveal` marks
  the page booted after 2800ms and `settle()` stamps re-rendered rows as
  already in.
- **Photography:** the school's own campus, openly licensed, credited.
  `.photo` is the one image primitive: cropped, rounded, sand wash until it
  arrives. It appears at four sizes — the home hero (Riyadh), the school
  page's 21:9 figure, the 3:2 school card, and the 4:3 thumbnail on a row.
  Every photograph is listed with author, licence and source on the Method
  page, and the school and record pages carry a caption beside the figure.
  How they are fetched, reviewed and replaced is in
  `tools/fetch-images.py` and `.github/workflows/fetch-images.yml`.

## Tone

English: assured, specific, unhurried — numbers before adjectives; never
"unlock", "empower", "journey", "world-class". Arabic: الفصحى المعاصرة، رصينة
ودافئة، بلا مبالغة ولا علامات تعجّب ولا ترجمة حرفية؛ «برنامج تنفيذي» لا «دورة».
Both languages are authored, not translated, and carry equal depth. Arabic
copy that reads as a literal rendering of the English is a bug: "worth the
trip" became «يستحق عناء السفر», not «يستحق الرحلة».

## Data honesty rules the design serves

- Fees are stored in the school's own published currency. The riyal figure is
  computed for display only, from the dated snapshot in `tools/fx.py`, and is
  always labelled indicative and dated.
- `sourceUrl` is provenance held in the data and **never rendered**. Since
  2026-09-14 every record's source is the school's own programme page; see
  `docs/research/school-robots-2026-09-14.md` and the re-source section of
  `apify-actor/CRAWL-STATUS.md`. Nothing derives from an aggregator.
- A school with no programmes does not appear in the schools chapter.

## Not built yet, worth building next

- Side-by-side compare from the shortlist (FT / Class Central pattern).
- "Apply by" deadline state on rows, once deadlines are captured.
- Commitment line on record pages ("6 weeks · 6–8 hrs/week") from the
  schools' published commitment field.

## Operator checklist before launch

1. Fill `SITE` in `tools/build.py`: WhatsApp number, phone, email, address,
   CR and VAT numbers, Maroof, and a form endpoint (or the mailto fallback
   engages). Every unset field prints an em dash, by design.
2. Replace the indicative FX snapshot in `tools/fx.py` and `data.js`.
3. Re-crawl the schools' pages each intake season with the runbook in
   `apify-actor/CRAWL-STATUS.md`; the tools re-run end to end.
