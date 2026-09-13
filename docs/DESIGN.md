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

## The idea: the ledger

Five directions were drafted on a canvas and compared. The operator chose the
**ledger** structure rendered in the **gallery** palette, and that pairing is
what is built.

A ledger, not a catalogue. The competition sells courses through hero
imagery, benefit copy and card grids; Masar publishes a record and lets the
numbers argue. The governing rule is:

> **The largest thing on every page is a number, not a headline.**

189 programmes matched. 16 schools. A fee of 12,900. The typography spends
its scale budget on figures because a fee and a date are what the reader came
to compare, and because no competitor does it — a page whose biggest mark is
a number cannot be mistaken for a landing page.

Three consequences follow, and they are the reason the site does not look
generated:

1. **One component carries the catalogue.** `.row` renders a programme at
   every scale — eight on the home page, 189 in the index, four in the "other
   programmes" strip. It never becomes a card. A card grid looks arbitrary at
   189 items; a ruled row does not.
2. **Data never animates.** Motion is a single hairline drawing itself across
   the row's top edge, staggered 55ms. Figures, titles and fees appear at full
   opacity immediately. Nothing about a price ever fades in.
3. **Silence is a value.** A field we have not recorded prints an em dash.
   The site says so in the footer, in both languages. No placeholder ratings,
   no invented "from" prices, no "most popular" badges.

## Colour

Dark is the default ground; light is the alternate. Both are warm — an ink
black would read as a developer theme, and the reference set (Porto, MIT
Sloan) sits on paper, not on pure white or pure black.

| Role | Dark (default) | Light |
| --- | --- | --- |
| Ground / paper / wash | `#1F1B17` / `#272219` / `#2E2820` | `#F3EDE3` / `#FAF6EE` / `#E9E0D2` |
| Ink / secondary / muted | `#F3EDE3` / `#C9BFAE` / `#A79E90` | `#1F1B17` / `#56504A` / `#6B6257` |
| Hairline / rule | `#3D3630` / `#5A5045` | `#B9A98F` / `#8E8271` |
| Clay — the one accent | `#D9764F` | `#A64B2A` |
| Band (inverted chapters, colophon) | `#16130F` on both themes | |

Two colours are **reserved roles**, not decoration, and must never be spent
on anything else:

- **Dusk `#8FB0CE`** — the Hijri date, and only the Hijri date. Wherever a
  reader sees dusk blue, they are looking at the Islamic calendar track.
- **Olive `#93A67E`** — the "Online" format, and only that.

Clay is the single accent: the wordmark's Arabic half, the current nav item's
underline, a primary action. One clay element per screen is the budget.

Rules: no radius anywhere, no shadows, no gradients. Structure is hairlines.
The band chapters invert to `--band` on both themes, so controls inside them
are scoped to band tokens — on a light page the page ink is dark and would
vanish against the band.

## Type

- **Latin display and all numerals:** Newsreader (variable, `opsz 6..72`,
  weight 300–500). A reading serif, set light and large. Numerals stay
  Newsreader in both locales so a fee looks identical on the Arabic page.
- **Latin body and labels:** Archivo 400/500/600.
- **Labels and indices:** IBM Plex Mono 400/500 — the `§02`, the row numbers,
  the field labels. The mono face is what makes it read as a record.
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
`direction: ltr; unicode-bidi: isolate` — the `§` chapter numbers, the tenet
numbers and the step numbers — because a section mark belongs before its
digits in both languages.

`tools/build.py` enforces a **locale depth-parity check**: it counts the
`data-*` hooks in each English page and the matching Arabic one and fails the
build if they differ. Arabic cannot quietly become the thinner locale.

## Layout and components

- **Masthead:** the Kufi mark, then the wordmark in the reading order of the
  page — `Masar | مسار` in English, `مسار | Masar` in Arabic. Chapter nav,
  then the currency control, language and shortlist. Below 900px the
  wide-only items fold away and the currency control is cloned into the nav
  panel, where it is the only visible copy.
- **Chapters:** the page is `§01 … §06`, each with a Latin and an Arabic
  title, a mono chapter number, and a note in the outer column.
- **The row** (`.row`): on mobile a two-column grid of date and content with a
  footer band; from 900px it becomes seven columns — index, date, title,
  school, teaching days, fee, action — and `.row__foot` flattens to
  `display: contents` so the footer's children join the parent grid. The
  grid widens again at 1140px.
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
- **Motion:** one move only, the hairline draw described above, off under
  `prefers-reduced-motion`. Filtering never re-animates: `initReveal` marks
  the page booted after 2800ms and `settle()` stamps re-rendered rows as
  already in.
- **Photography:** none. The ledger does not have a slot for it, and stock
  imagery would undercut the record. If images are ever added they belong on
  school pages as the school's own campus, credited.

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
- `sourceUrl` is provenance held in the data and **never rendered**. See
  `docs/research/source-site-legal-position.md` and the correction in
  `apify-actor/CRAWL-STATUS.md` — the catalogue should be re-sourced from the
  schools' own pages before this is published.
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
3. Re-source the catalogue from the schools' own pages before publishing —
   see the legal note above.
