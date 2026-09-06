# Masar — visual identity and design rationale

Masar (مسار, "the path") indexes open-enrolment executive programmes for
leaders in Saudi Arabia first and the wider world second. This note records
the identity decisions in `assets/css/site.css` and `tools/build.py`, and why
they were made, so later changes stay on the same route.

The research behind it is in `docs/research/`:

- `exec-ed-school-sites.md` — benchmark of HBS, Wharton, INSEAD, IMD, LBS,
  IESE, Stanford GSB and MIT Sloan executive-education sites (rendered live).
- `ksa-market-and-brand.md` — how executive education is actually bought in
  the Kingdom, Saudi digital-design conventions, typefaces, palettes, tone.

## The idea

**The considered route.** Not a catalogue that shouts, but the confident
single line of a path — the visual motif is one stroke (`BRAND_MARK`, the
hero `.hero-path`), which also echoes the kashida of Arabic calligraphy.
Authority is carried the way the schools carry it: named institutions,
specific numbers, restraint.

## Colour

| Role | Name | Light | Dark |
| --- | --- | --- | --- |
| Ink, dark surfaces (hero, footer, KSA block) | Deep Sea | `#0F3642` | `#0B1B21` |
| Interactive: links, buttons, focus, chips | Rawashin teal | `#1C7C86` | `#4FB3BC` |
| Scarce warm accent: saved state, "new", focus ring | Coral stone | `#D9775F` | `#F0957E` |
| Ground | Salt | `#F3F4F2` | `#0E1F25` |
| Surface | — | `#FFFFFF` | `#132A31` |
| Text / muted | — | `#142A31` / `#5A6B70` | `#E4ECED` / `#94A8AC` |

Why this and not the usual: Saudi-green-and-gold, Arabesque overlays and
warm-cream-with-terracotta are the three looks a Saudi executive reads as
template. Teal is credible and rare in the category; it is rooted in the
painted lattice balconies (rawashin) of Jeddah's Al-Balad, and it travels
globally. The coral is kept under ten per cent of any screen. The ground is a
cool salt-white, deliberately not cream.

## Type

- **UI and body, both scripts:** IBM Plex Sans / IBM Plex Sans Arabic — the
  face of the national Digital Government Authority design system, so it reads
  "official" to Saudi users and is superbly hinted for Arabic UI.
- **Headlines, Latin:** IBM Plex Serif 600 — engineered, institutional; the
  same family as the body, so the bilingual system is one voice.
- **Headlines, Arabic:** Markazi Text 600 — a refined Naskh that gives the
  "school, not startup" register the benchmark sites carry.
- Rules: Arabic runs ~1.1× the Latin size with looser leading; Arabic is never
  letter-spaced and never faux-bold; numerals are Western and tabular; prices,
  dates and acronyms inside Arabic text are isolated LTR.

## Layout and components

- **Finder as hero** (Stanford/MIT pattern) on a Deep Sea band: search,
  subject, format, then quick-filter chips. Two paths for two buyers — browse
  by date, or talk to an advisor.
- **Proof strip** with live numbers, including the next start date.
- **Fixed-label spec block** on every card — *Starts · Location · Duration ·
  Fee* — MIT Sloan's card grammar, which localises cleanly and survives RTL
  because it is label/value pairs, not prose.
- **Hijri alongside Gregorian** (Umm al-Qura via `Intl`) on cards and detail
  pages, so a cohort can be checked against Ramadan and the Eids.
- **Fees in the school's currency, or SAR** — stored as published, converted
  only for display (`tools/fx.py`, `data.js` `fx`). Non-USD dollars keep their
  qualifier (A$, CA$) so nothing reads as US dollars by accident.
- **KSA trust block**, corporate/group enquiry path, WhatsApp and call-back
  channels (rendered only when `SITE` in `tools/build.py` is filled in), a
  legal footer line (CR/VAT/address) from the same config.
- Square 4–8px radii, hairline rules, no accent rails, no centred hero, no
  emoji, no invented ratings or testimonials.

## Tone

English: assured, specific, unhurried — numbers before adjectives; never
"unlock", "empower", "journey", "world-class". Arabic: الفصحى المعاصرة، رصينة
ودافئة، بلا مبالغة ولا علامات تعجّب ولا ترجمة حرفية؛ «برنامج تنفيذي» لا «دورة».
Both languages are authored, not translated, and carry equal depth.

## Operator checklist before launch

1. Fill `SITE` in `tools/build.py`: WhatsApp number, phone, email, address,
   CR and VAT numbers, and a form endpoint (or the mailto fallback engages).
2. Replace the indicative FX snapshot in `tools/fx.py` and `data.js`.
3. Photography, if added: Saudi executives in Riyadh/Jeddah interiors — never
   stock deserts, never generic "Gulf" attire.
