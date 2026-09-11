# Masar — visual identity and design rationale

Masar (مسار, "the path") indexes open-enrolment executive programmes for
leaders in Saudi Arabia first and the wider world second. This note records
the identity decisions in `assets/css/site.css` and `tools/build.py`, and why
they were made, so later changes stay on the same route.

The research behind it is in `docs/research/`:

- `exec-ed-school-sites.md` — benchmark of HBS, Wharton, INSEAD, IMD, LBS,
  IESE, Stanford GSB and MIT Sloan executive-education sites (rendered live).
- `exec-ed-marketplaces.md` — Emeritus, Coursera, GetSmarter, Class Central,
  findcourses and others: card grammar, facets, trust and the lead-gen
  anti-patterns to avoid.
- `ksa-market-and-brand.md` — how executive education is actually bought in
  the Kingdom, Saudi digital-design conventions, typefaces, palettes, tone.

## The idea

**Direction C — Contemporary Saudi.** Three directions were drafted and
compared on a canvas (A "The Index", B "Majlis", C "Contemporary Saudi");
the operator chose C and asked for it pushed toward a premium
executive-learning brand rather than a training-provider look. The Kufi
wordmark leads even on the English page; the front door has energy (violet
and peach tiles, oversized type, an "explore by ambition" row), and the pages
where the decision is made — programme and school pages — go quiet: white,
ink, hard rules, the school's name doing the work.

## Colour

| Role | Light | Dark |
| --- | --- | --- |
| Ink: text, hard 2px rules, footer, "for teams" tile | `#16132B` | `#0F0D1C` ground / `#F1EFF9` text |
| Violet: wordmark, primary actions, the "next start" tile, one accent per screen | `#4B3AD9` | `#8F80FF` |
| Peach: the second colour, one tile per screen, collection hover | `#FFD7C2` | `#FFC9AD` |
| Ground / surface | `#F6F5F8` / `#FFFFFF` | `#0F0D1C` / `#17142A` |
| Muted text, soft dividers | `#6D6A80` / `#DCD9E6` | `#A09CB8` / `#2E2A4A` |

Rules: no radius anywhere; 2px ink borders instead of shadows; violet is
capped at one primary tile or button per screen, peach is the only second
colour; everything else is white with black rules. Green appears only on
the WhatsApp control (a brand colour, not ours).

## Type

- **Latin, every size:** Bricolage Grotesque — variable optical size and
  width; headlines at `opsz 96 / wdth 92 / 800`, body at 400–600.
- **Arabic headlines and the wordmark:** Reem Kufi 700 (geometric Kufi,
  the register of contemporary Saudi institutional branding).
- **Arabic reading text:** IBM Plex Sans Arabic.
- Arabic runs ~1.05× the Latin size with looser leading; never letter-spaced,
  never faux-bold; numerals Western and tabular; fees, dates and acronyms
  inside Arabic text are isolated LTR.

## Layout and components

- **Hero:** an offset headline with one tinted phrase; a side column with the
  proposition and the other language's tagline; a hard-bordered search bar;
  an **explore-by-ambition** row (become a better leader · master AI strategy
  · move into the C-suite · understand finance · build a new venture ·
  negotiate better) that maps to subject filters.
- **Tiles:** the live *next start* (violet), two editors' picks (white,
  peach), three small picks, and the *for teams* tile (ink). Each carries
  Starts · Days · Fee.
- **Action bar:** the reply promise with WhatsApp and call-back (WhatsApp
  renders only once `SITE` in `tools/build.py` has a number).
- **Cards:** white, 2px ink border, fixed-label spec block (Starts with the
  Hijri date · Location · Duration · Fee); hover fills violet-soft.
- **Motion:** one move only — a reveal on scroll with an 80ms stagger across
  the tiles; off under `prefers-reduced-motion`.
- **Photography:** none yet. The tile system takes a full-bleed image in the
  large tiles without layout change; use real Saudi executives in Riyadh or
  Jeddah interiors, never stock deserts or generic "Gulf" attire.

## Tone

English: assured, specific, unhurried — numbers before adjectives; never
"unlock", "empower", "journey", "world-class". Arabic: الفصحى المعاصرة، رصينة
ودافئة، بلا مبالغة ولا علامات تعجّب ولا ترجمة حرفية؛ «برنامج تنفيذي» لا «دورة».
Both languages are authored, not translated, and carry equal depth.

## Not built yet, worth building next

- Side-by-side compare from the shortlist (FT / Class Central pattern).
- "Apply by" deadline state on cards, once deadlines are captured.
- Commitment line on detail pages ("6 weeks · 6–8 hrs/week") from the
  schools' published commitment field.

## Operator checklist before launch

1. Fill `SITE` in `tools/build.py`: WhatsApp number, phone, email, address,
   CR and VAT numbers, and a form endpoint (or the mailto fallback engages).
2. Replace the indicative FX snapshot in `tools/fx.py` and `data.js`.
3. Photography, if added: Saudi executives in Riyadh/Jeddah interiors — never
   stock deserts, never generic "Gulf" attire.
