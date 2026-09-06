#!/usr/bin/env python3
"""Render Masar's HTML pages for both locales from one source.

The site itself has no build step — it is plain HTML/CSS/JS that runs from
file:// — but the English and Arabic shells must stay structurally identical,
and hand-maintaining eighteen files guarantees drift. So the page shells and
their translated copy live here, and this script writes them out:

    python3 tools/build.py          # from the masar/ directory

English pages land in ./, Arabic in ./ar/. Course, school and collection
content is not here: that comes from assets/js/data.js at runtime, in both
languages, from a single record per course.
"""

import os
import re

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LOCALES = ("en", "ar")

NAV = [
    ("courses.html", "Courses", "البرامج"),
    ("schools.html", "Schools", "الكليات"),
    ("lists.html", "Collections", "المجموعات"),
    ("about.html", "About", "عن مسار"),
    ("contact.html", "Contact", "تواصل معنا"),
]

FONTS = {
    "en": (
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
        'family=IBM+Plex+Sans:wght@400;500;600&'
        'family=IBM+Plex+Serif:wght@500;600&display=swap">'
    ),
    "ar": (
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
        'family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&'
        'family=Markazi+Text:wght@500;600;700&display=swap">'
    ),
}

# Operator-set contact and legal details. Anything left empty is simply not
# rendered — the site never shows a placeholder number or a made-up CR.
SITE = {
    "whatsapp": "",          # international format without +, e.g. "9665XXXXXXXX"
    "phone": "",             # display form, e.g. "+966 11 000 0000"
    "email": "",
    "address": {"en": "", "ar": ""},
    "cr": "",                # commercial registration number
    "vat": "",               # VAT registration number
    "form_endpoint": "",     # e.g. a Formspree/Basin URL; empty falls back to mailto: when email is set
}

BRAND_MARK = (
    '<svg class="brand-mark" viewBox="0 0 40 32" aria-hidden="true">'
    '<path class="brand-mark__path" d="M2 26 C 10 26, 12 8, 20 8 S 30 24, 38 6" fill="none" '
    'stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
    '<circle cx="38" cy="6" r="3" fill="currentColor"/>'
    '</svg>'
)

SUN_MOON = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" '
    'stroke-linecap="round" aria-hidden="true">'
    '<path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z"/></svg>'
)

BOOKMARK = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" '
    'stroke-linejoin="round" aria-hidden="true">'
    '<path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1Z"/></svg>'
)

T = {
    "tagline": {"en": "Executive programmes", "ar": "البرامج التنفيذية"},
    "skip": {"en": "Skip to content", "ar": "تخطَّ إلى المحتوى"},
    "menu": {"en": "Menu", "ar": "القائمة"},
    "theme": {"en": "Switch theme", "ar": "تبديل مظهر الموقع"},
    "shortlist": {"en": "Shortlist", "ar": "قائمتي"},
    "shortlist_title": {"en": "Your shortlist", "ar": "قائمتك المختارة"},
    "shortlist_clear": {"en": "Clear shortlist", "ar": "إفراغ القائمة"},
    "close": {"en": "Close", "ar": "إغلاق"},
    "home": {"en": "Home", "ar": "الرئيسية"},
    "lang_other": {"en": "العربية", "ar": "English"},
    "lang_a11y": {"en": "اقرأ هذه الصفحة بالعربية", "ar": "Read this page in English"},
    "f_browse": {"en": "Browse", "ar": "تصفّح"},
    "f_subjects": {"en": "Popular subjects", "ar": "تخصّصات مطلوبة"},
    "f_site": {"en": "Masar", "ar": "مسار"},
    "f_blurb": {
        "en": "An independent, bilingual index of open-enrolment executive programmes from "
              "the world's business schools, built in Riyadh for leaders in the Kingdom and beyond.",
        "ar": "دليل مستقل ثنائي اللغة للبرامج التنفيذية مفتوحة التسجيل من كليات الأعمال حول العالم، "
              "بُني في الرياض لقيادات المملكة ومن حولها.",
    },
    "f_source": {
        "en": "Listings are taken from the schools' published programme pages and refreshed regularly. "
              "Fees are shown as published; riyal amounts are indicative conversions.",
        "ar": "تُؤخذ البرامج من الصفحات المنشورة للكليات وتُحدَّث دوريًا. "
              "تُعرض الرسوم كما نُشرت، ومبالغ الريال تحويلات استرشادية.",
    },
    "f_advisor": {"en": "Talk to an advisor", "ar": "تحدّث مع مستشار"},
    "f_whatsapp": {"en": "WhatsApp", "ar": "واتساب"},
    "f_call": {"en": "Request a call", "ar": "اطلب اتصالًا"},
    "f_cr": {"en": "CR", "ar": "س.ت"},
    "f_vat": {"en": "VAT", "ar": "الرقم الضريبي"},
    "f_hours": {"en": "Sunday to Thursday, Riyadh time", "ar": "من الأحد إلى الخميس بتوقيت الرياض"},
}

FOOTER_SUBJECTS = [
    ("leadership", "Leadership", "القيادة"),
    ("finance", "Finance", "التمويل"),
    ("digital", "AI & digital", "الذكاء الاصطناعي"),
    ("strategy", "Strategy", "الاستراتيجية"),
]


def shell(lang, page, title, description, body, extra_head=""):
    """Assemble one page. `page` is the file name shared by both locales."""
    is_ar = lang == "ar"
    a = "../assets/" if is_ar else "assets/"
    other = ("../" if is_ar else "ar/") + page
    root = "../" if is_ar else ""

    nav = "\n".join(
        '          <li><a href="{href}"{cur}>{label}</a></li>'.format(
            href=href,
            label=(ar if is_ar else en),
            cur=' aria-current="page"' if href == page else "",
        )
        for href, en, ar in NAV
    )

    wa = SITE["whatsapp"]
    contact_rows = []
    if wa:
        contact_rows.append(
            '            <li><a class="contact-row" href="https://wa.me/{n}" rel="noopener">'
            '<span class="contact-row__k">{k}</span><span class="contact-row__v" dir="ltr">+{n}</span></a></li>'
            .format(n=wa, k=T["f_whatsapp"][lang]))
    if SITE["phone"]:
        contact_rows.append(
            '            <li><a class="contact-row" href="tel:{raw}">'
            '<span class="contact-row__k">{k}</span><span class="contact-row__v" dir="ltr">{p}</span></a></li>'
            .format(raw=SITE["phone"].replace(" ", ""), p=SITE["phone"], k="Phone" if lang == "en" else "هاتف"))
    if SITE["email"]:
        contact_rows.append(
            '            <li><a class="contact-row" href="mailto:{e}">'
            '<span class="contact-row__k">{k}</span><span class="contact-row__v" dir="ltr">{e}</span></a></li>'
            .format(e=SITE["email"], k="Email" if lang == "en" else "البريد"))
    advisor = ""
    if contact_rows:
        advisor = ('          <h3 class="footer-advisor__h">{h}</h3>\n          <ul class="footer-advisor">\n{rows}\n          </ul>\n'
                   '          <p class="footer-hours">{hours}</p>').format(
            h=T["f_advisor"][lang], rows="\n".join(contact_rows), hours=T["f_hours"][lang])

    legal_bits = []
    if SITE["address"][lang]:
        legal_bits.append(SITE["address"][lang])
    if SITE["cr"]:
        legal_bits.append("{} {}".format(T["f_cr"][lang], SITE["cr"]))
    if SITE["vat"]:
        legal_bits.append("{} {}".format(T["f_vat"][lang], SITE["vat"]))
    legal = (" · " + " · ".join(legal_bits)) if legal_bits else ""

    float_cta = ""
    if wa:
        float_cta = (
            '  <a class="wa-float" href="https://wa.me/{n}" rel="noopener" aria-label="{l}">'
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4.1c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>'
            '<span>{t}</span></a>\n'
        ).format(n=wa, l=T["f_advisor"][lang], t=T["f_whatsapp"][lang])

    footer_subjects = "\n".join(
        '            <li><a href="courses.html?subject={sid}">{label}</a></li>'.format(
            sid=sid, label=(ar if is_ar else en)
        )
        for sid, en, ar in FOOTER_SUBJECTS
    )

    return """<!DOCTYPE html>
<html lang="{lang}" dir="{dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="icon" href="{a}img/favicon.svg" type="image/svg+xml">
  <link rel="alternate" hreflang="en" href="{root}{page}">
  <link rel="alternate" hreflang="ar" href="{root}ar/{page}">
  <link rel="alternate" hreflang="x-default" href="{root}{page}">
  <script>
    /* Set the theme before first paint so the page never flashes light. */
    (function () {{
      try {{
        var saved = localStorage.getItem('masar:theme');
        if (!saved) saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', saved);
      }} catch (e) {{}}
    }})();
  </script>
  {fonts}
  <link rel="stylesheet" href="{a}css/site.css">{extra_head}
</head>
<body>
  <a class="skip-link" href="#main">{skip}</a>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html">
        {mark}
        <span class="brand-name">{brandname}<small>{tagline}</small></span>
      </a>

      <nav id="main-nav" class="main-nav" aria-label="{navlabel}">
        <ul>
{nav}
        </ul>
      </nav>

      <div class="header-tools">
        <a class="lang-switch" href="{other}" data-lang-switch hreflang="{otherlang}" lang="{otherlang}"
           aria-label="{lang_a11y}">{lang_other}</a>
        <button class="icon-btn shortlist-btn" type="button" data-drawer-open aria-label="{shortlist}">
          {bookmark}<span class="shortlist-count" data-shortlist-count>0</span>
        </button>
        <button class="icon-btn" type="button" data-theme-toggle aria-label="{theme}">{sunmoon}</button>
        <button class="icon-btn nav-toggle" type="button" data-nav-toggle aria-expanded="false"
                aria-controls="main-nav" aria-label="{menu}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <main id="main">
{body}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html">{mark}<span class="brand-name">{brandname}</span></a>
          <p class="footer-blurb">{f_blurb}</p>
{advisor}
        </div>
        <div>
          <h3>{f_browse}</h3>
          <ul>
            <li><a href="courses.html">{n_courses}</a></li>
            <li><a href="courses.html?sort=date">{n_calendar}</a></li>
            <li><a href="schools.html">{n_schools}</a></li>
            <li><a href="lists.html">{n_lists}</a></li>
          </ul>
        </div>
        <div>
          <h3>{f_subjects}</h3>
          <ul>
{footer_subjects}
          </ul>
        </div>
        <div>
          <h3>{f_site}</h3>
          <ul>
            <li><a href="about.html">{n_about}</a></li>
            <li><a href="contact.html">{n_contact}</a></li>
            <li><a href="contact.html#corporate">{n_corporate}</a></li>
            <li><a href="{other}" data-lang-switch>{lang_other}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>2026</span> {brandname}{legal}</span>
        <span class="footer-source">{f_source}</span>
      </div>
    </div>
  </footer>
{float_cta}
  <div class="drawer-backdrop" data-drawer-backdrop></div>
  <aside class="drawer" data-drawer role="dialog" aria-modal="true"
         aria-label="{shortlist_title}" aria-hidden="true" inert>
    <div class="drawer__head">
      <h2 class="h3">{shortlist_title}</h2>
      <button class="icon-btn" type="button" data-drawer-close aria-label="{close}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18"/>
        </svg>
      </button>
    </div>
    <div class="drawer__body" data-drawer-body></div>
    <div class="drawer__foot">
      <button class="btn btn--ghost btn--block" type="button" data-shortlist-clear>{shortlist_clear}</button>
    </div>
  </aside>

  <script src="{a}js/data.js"></script>
  <script src="{a}js/i18n.js"></script>
  <script src="{a}js/app.js"></script>
</body>
</html>
""".format(
        lang=lang,
        dir="rtl" if is_ar else "ltr",
        title=title,
        description=description,
        a=a,
        root=root,
        page=page,
        fonts=FONTS[lang],
        extra_head=extra_head,
        skip=T["skip"][lang],
        mark=BRAND_MARK,
        brandname="مسار" if is_ar else "Masar",
        tagline=T["tagline"][lang],
        navlabel="التنقّل الرئيسي" if is_ar else "Primary",
        nav=nav,
        other=other,
        otherlang="ar" if lang == "en" else "en",
        lang_other=T["lang_other"][lang],
        lang_a11y=T["lang_a11y"][lang],
        shortlist=T["shortlist"][lang],
        shortlist_title=T["shortlist_title"][lang],
        shortlist_clear=T["shortlist_clear"][lang],
        close=T["close"][lang],
        theme=T["theme"][lang],
        menu=T["menu"][lang],
        bookmark=BOOKMARK,
        sunmoon=SUN_MOON,
        body=body,
        f_blurb=T["f_blurb"][lang],
        f_browse=T["f_browse"][lang],
        f_subjects=T["f_subjects"][lang],
        f_site=T["f_site"][lang],
        f_source=T["f_source"][lang],
        advisor=advisor,
        legal=legal,
        float_cta=float_cta,
        footer_subjects=footer_subjects,
        n_calendar="مواعيد البدء" if is_ar else "Start dates",
        n_corporate="للمنشآت" if is_ar else "For organisations",
        n_courses="البرامج" if is_ar else "Courses",
        n_schools="الكليات" if is_ar else "Schools",
        n_lists="المجموعات" if is_ar else "Collections",
        n_about="عن مسار" if is_ar else "About",
        n_contact="تواصل معنا" if is_ar else "Contact",
    )


# ---------------------------------------------------------------------------
# Page bodies
# ---------------------------------------------------------------------------

HOME = {}

HOME["en"] = """
    <section class="hero">
        <svg class="hero-path" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true"><path d="M0 190 C 220 190, 300 60, 480 60 S 760 200, 940 120 S 1120 20, 1200 30" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      <div class="container hero-inner">
        <p class="eyebrow">Open-enrolment executive programmes</p>
        <h1>Short programmes worth leaving the office for.</h1>
        <p class="lede"><span data-stat="courses">189</span> programmes from <span data-stat="schools">17</span>
          business schools — MIT Sloan, IMD, Kellogg, Harvard Kennedy School, Berkeley Haas — with dates,
          teaching days and fees on every card. In the school's currency, or in riyals.</p>

        <form class="hero-search" action="courses.html" method="get" role="search">
          <div class="field">
            <label for="q">Search</label>
            <input id="q" name="q" type="search" placeholder="Programme, subject or school" autocomplete="off">
          </div>
          <div class="field">
            <label for="subject">Subject</label>
            <select id="subject" name="subject" data-hero-subject></select>
          </div>
          <div class="field">
            <label for="format">Format</label>
            <select id="format" name="format" data-hero-format></select>
          </div>
          <button class="btn btn--primary" type="submit">Find programmes</button>
        </form>

        <div class="hero-chips" aria-label="Quick filters">
          <a class="chip-link" href="courses.html?sort=date">Starting soonest</a>
          <a class="chip-link" href="courses.html?duration=short,mid">Up to a week</a>
          <a class="chip-link" href="courses.html?format=online">Online</a>
          <a class="chip-link" href="courses.html?subject=leadership">Leadership</a>
          <a class="chip-link" href="courses.html?subject=digital">AI &amp; digital</a>
          <a class="chip-link" href="courses.html?subject=finance">Finance</a>
        </div>
      </div>
    </section>

    <section class="proof">
      <div class="container proof-grid">
        <div class="proof-item"><div class="n" data-stat="courses">—</div><div class="l">Programmes indexed</div></div>
        <div class="proof-item"><div class="n" data-stat="schools">—</div><div class="l">Business schools</div></div>
        <div class="proof-item"><div class="n" data-stat="countries">—</div><div class="l">Countries of delivery</div></div>
        <div class="proof-item"><div class="n" data-stat="next">—</div><div class="l">Next start date</div></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Next intakes</span>
            <h2 class="h2">Starting soonest</h2>
            <p>Sorted by start date. Each card carries the fee, the teaching days and the language of instruction.</p>
          </div>
          <a class="link-arrow" href="courses.html?sort=date">Full calendar <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-upcoming></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container split split--wide">
        <div>
          <span class="eyebrow">By subject</span>
          <h2 class="h2">Start from what you need to lead.</h2>
          <p class="lede" style="margin-block-start:14px">Twelve subject areas, from board governance to AI. Counts are live.</p>
        </div>
        <div class="subject-list" data-home-subjects></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Selected</span>
            <h2 class="h2">Eight programmes to start with</h2>
            <p>One programme from each of eight leading schools in the index, chosen by the editors — never for a placement fee.</p>
          </div>
          <a class="link-arrow" href="courses.html">All programmes <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-featured></div>
      </div>
    </section>

    <section class="section section--sea">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">For buyers in the Kingdom</span>
            <h2 class="h2">Built for how executive education is actually bought here.</h2>
          </div>
        </div>
        <div class="feature-grid">
          <div class="feature">
            <h3>Riyals, or the school's own currency</h3>
            <p>Every fee is shown exactly as the school publishes it, and switches to riyals in one click. No hidden pricing, no account to open.</p>
          </div>
          <div class="feature">
            <h3>Hijri and Gregorian dates</h3>
            <p>Start dates on every programme in both calendars, so a cohort can be checked against Ramadan, Eid and the fiscal year at a glance.</p>
          </div>
          <div class="feature">
            <h3>An advisor, not a lead form</h3>
            <p>Ask in Arabic or English and get a reply within two working days, Sunday to Thursday. Your details go to the school you choose, and nowhere else.</p>
            <a class="link-arrow link-arrow--light" href="contact.html">Talk to an advisor <span class="arw" aria-hidden="true">→</span></a>
          </div>
          <div class="feature">
            <h3>Cohorts for organisations</h3>
            <p>Enrolling a team or a leadership bench? Request a proposal for a group booking or a closed cohort delivered to your calendar.</p>
            <a class="link-arrow link-arrow--light" href="contact.html#corporate">Request a proposal <span class="arw" aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">The schools</span>
            <h2 class="h2">Named, not "world-class".</h2>
            <p>Every institution in the index, with the city it teaches from and the number of programmes listed.</p>
          </div>
          <a class="link-arrow" href="schools.html">All schools <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="school-strip-grid" data-home-schools></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Collections</span>
            <h2 class="h2">Answers to the questions people arrive with</h2>
            <p>Editorial selections, not rankings. Nobody scored anything out of a hundred.</p>
          </div>
          <a class="link-arrow" href="lists.html">All collections <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-lists></div>
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div>
          <span class="eyebrow">How programmes get here</span>
          <h2 class="h2">Facts from the schools. Nothing invented.</h2>
          <p class="lede" style="margin-block-start:14px">Masar reads the programme pages the schools publish and records what they say — title, dates, teaching days, format, language and fee. That is all a card shows, and all it claims.</p>
        </div>
        <ol class="step-list">
          <li><div><h3>Taken from the source</h3><p>Listings come from each school's own published calendar and are refreshed regularly.</p></div></li>
          <li><div><h3>No ratings we did not earn</h3><p>Imported programmes carry no star ratings, testimonials or marketing copy. If a school did not state it, the card does not either.</p></div></li>
          <li><div><h3>No paid placement</h3><p>Position on this site is not for sale. Collections are editorial, and say so.</p></div></li>
          <li><div><h3>Straight to the school</h3><p>An enquiry goes to the institution running the programme. Your details are not resold.</p></div></li>
        </ol>
      </div>
    </section>
"""

HOME["ar"] = """
    <section class="hero">
        <svg class="hero-path" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true"><path d="M0 190 C 220 190, 300 60, 480 60 S 760 200, 940 120 S 1120 20, 1200 30" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      <div class="container hero-inner">
        <p class="eyebrow">برامج تنفيذية مفتوحة التسجيل</p>
        <h1>برامج قصيرة تستحق أن تغادر مكتبك من أجلها.</h1>
        <p class="lede"><span data-stat="courses">189</span> برنامجًا من <span data-stat="schools">17</span> كلية أعمال —
          إم آي تي سلون، وآي إم دي، وكيلوغ، وكلية كينيدي في هارفارد، وهاس في بيركلي — مع التواريخ وأيام التدريس
          والرسوم على كل بطاقة، بعملة الكلية أو بالريال السعودي.</p>

        <form class="hero-search" action="courses.html" method="get" role="search">
          <div class="field">
            <label for="q">البحث</label>
            <input id="q" name="q" type="search" placeholder="برنامج أو تخصّص أو كلية" autocomplete="off">
          </div>
          <div class="field">
            <label for="subject">التخصّص</label>
            <select id="subject" name="subject" data-hero-subject></select>
          </div>
          <div class="field">
            <label for="format">نمط الدراسة</label>
            <select id="format" name="format" data-hero-format></select>
          </div>
          <button class="btn btn--primary" type="submit">ابحث عن برنامج</button>
        </form>

        <div class="hero-chips" aria-label="تصفية سريعة">
          <a class="chip-link" href="courses.html?sort=date">الأقرب بدءًا</a>
          <a class="chip-link" href="courses.html?duration=short,mid">أسبوع أو أقل</a>
          <a class="chip-link" href="courses.html?format=online">عن بُعد</a>
          <a class="chip-link" href="courses.html?subject=leadership">القيادة</a>
          <a class="chip-link" href="courses.html?subject=digital">الذكاء الاصطناعي والتحوّل الرقمي</a>
          <a class="chip-link" href="courses.html?subject=finance">التمويل</a>
        </div>
      </div>
    </section>

    <section class="proof">
      <div class="container proof-grid">
        <div class="proof-item"><div class="n" data-stat="courses">—</div><div class="l">برنامجًا مفهرسًا</div></div>
        <div class="proof-item"><div class="n" data-stat="schools">—</div><div class="l">كلية أعمال</div></div>
        <div class="proof-item"><div class="n" data-stat="countries">—</div><div class="l">دولة تُقدَّم فيها البرامج</div></div>
        <div class="proof-item"><div class="n" data-stat="next">—</div><div class="l">أقرب موعد بدء</div></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">أقرب الدفعات</span>
            <h2 class="h2">الأقرب بدءًا</h2>
            <p>مرتّبة حسب تاريخ البدء. تحمل كل بطاقة الرسوم وعدد أيام التدريس ولغة التدريس.</p>
          </div>
          <a class="link-arrow" href="courses.html?sort=date">التقويم الكامل <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-upcoming></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container split split--wide">
        <div>
          <span class="eyebrow">حسب التخصّص</span>
          <h2 class="h2">ابدأ ممّا تحتاج إليه لتقود.</h2>
          <p class="lede" style="margin-block-start:14px">اثنا عشر مجالًا، من حوكمة مجالس الإدارة إلى الذكاء الاصطناعي. الأعداد محدّثة باستمرار.</p>
        </div>
        <div class="subject-list" data-home-subjects></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">مختارات</span>
            <h2 class="h2">ثمانية برامج تبدأ منها</h2>
            <p>برنامج واحد من كلٍّ من ثماني كليات رائدة في الدليل، اختاره فريق التحرير — ولا مقابل رسوم إدراج.</p>
          </div>
          <a class="link-arrow" href="courses.html">كل البرامج <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-featured></div>
      </div>
    </section>

    <section class="section section--sea">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">لمن يشتري في المملكة</span>
            <h2 class="h2">مبني على الطريقة التي يُشترى بها التعليم التنفيذي فعلًا.</h2>
          </div>
        </div>
        <div class="feature-grid">
          <div class="feature">
            <h3>بالريال، أو بعملة الكلية</h3>
            <p>تُعرض كل الرسوم كما تنشرها الكلية تمامًا، وتتحوّل إلى الريال بنقرة واحدة. لا أسعار مخفية، ولا حساب يلزم فتحه.</p>
          </div>
          <div class="feature">
            <h3>التاريخان الهجري والميلادي</h3>
            <p>مواعيد البدء على كل برنامج بالتقويمين، ليسهل التحقّق من موقع الدفعة من رمضان والأعياد والسنة المالية بنظرة واحدة.</p>
          </div>
          <div class="feature">
            <h3>مستشار، لا نموذج لجمع البيانات</h3>
            <p>اسأل بالعربية أو الإنجليزية وستصلك الإجابة خلال يومَي عمل، من الأحد إلى الخميس. تذهب بياناتك إلى الكلية التي تختارها، ولا إلى أي جهة أخرى.</p>
            <a class="link-arrow link-arrow--light" href="contact.html">تحدّث مع مستشار <span class="arw" aria-hidden="true">→</span></a>
          </div>
          <div class="feature">
            <h3>دفعات للمنشآت</h3>
            <p>تسجّل فريقًا أو صفًّا قياديًا كاملًا؟ اطلب عرضًا لحجز جماعي أو لدفعة مغلقة تُقدَّم وفق تقويم منشأتك.</p>
            <a class="link-arrow link-arrow--light" href="contact.html#corporate">اطلب عرضًا <span class="arw" aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">الكليات</span>
            <h2 class="h2">بأسمائها، لا بعبارات التفخيم.</h2>
            <p>كل مؤسسة في الدليل، مع المدينة التي تدرّس منها وعدد برامجها المدرجة.</p>
          </div>
          <a class="link-arrow" href="schools.html">كل الكليات <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="school-strip-grid" data-home-schools></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">مجموعات</span>
            <h2 class="h2">إجابات عن الأسئلة التي يأتي بها الزوّار</h2>
            <p>اختيارات تحريرية لا تصنيفات. لم يُمنح أي برنامج درجة من مئة.</p>
          </div>
          <a class="link-arrow" href="lists.html">كل المجموعات <span class="arw" aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid" data-home-lists></div>
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div>
          <span class="eyebrow">كيف تصل البرامج إلى هنا</span>
          <h2 class="h2">وقائع من الكليات. لا شيء مختلَق.</h2>
          <p class="lede" style="margin-block-start:14px">يقرأ «مسار» صفحات البرامج التي تنشرها الكليات ويسجّل ما تقوله: العنوان والتواريخ وأيام التدريس ونمط الدراسة واللغة والرسوم. هذا كل ما تعرضه البطاقة، وكل ما تدّعيه.</p>
        </div>
        <ol class="step-list">
          <li><div><h3>من المصدر مباشرة</h3><p>تُؤخذ البرامج من التقويم المنشور لكل كلية وتُحدَّث دوريًا.</p></div></li>
          <li><div><h3>لا تقييمات لم نستحقّها</h3><p>لا تحمل البرامج المستوردة نجومًا ولا شهادات ولا نصوصًا تسويقية. ما لم تذكره الكلية لا تذكره البطاقة.</p></div></li>
          <li><div><h3>لا إدراج مدفوع</h3><p>الموضع في هذا الموقع غير معروض للبيع. والمجموعات تحريرية، وتقول ذلك صراحة.</p></div></li>
          <li><div><h3>إلى الكلية مباشرة</h3><p>يذهب الاستفسار إلى المؤسسة التي تقدّم البرنامج، ولا يُعاد بيع بياناتك.</p></div></li>
        </ol>
      </div>
    </section>
"""

COURSES = {}

COURSES["en"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">The index</span>
        <h1 class="h2" style="margin-block:10px 12px">Executive programmes</h1>
        <p class="lede">Every programme in the index, with the fee, teaching days, start date and language of
          instruction on the card. Filters live in the address bar, so a shortlist is a link you can forward
          for approval.</p>

        <form role="search" style="margin-block-start:24px;max-width:560px">
          <label class="sr-only" for="cat-q">Search programmes</label>
          <input id="cat-q" type="search" data-catalogue-search placeholder="Programme, subject or school"
                 style="width:100%;padding:14px 18px;border-radius:999px;border:1px solid var(--line-firm);background:var(--surface)">
        </form>
      </div>
    </section>

    <section class="section--tight" style="padding-block-start:8px">
      <div class="container catalogue">
        <aside class="filters" data-filters aria-label="Filters">
          <div class="filters__head">
            <h2>Refine</h2>
            <button class="btn btn--sm btn--ghost" type="button" data-filters-close>Done</button>
          </div>
          <div data-filter-body></div>
          <button class="btn btn--primary btn--block filters__done" type="button" data-filters-close>Show results</button>
        </aside>

        <div>
          <div class="results-bar">
            <p class="results-count" data-results-count aria-live="polite">—</p>
            <div class="results-tools">
              <button class="btn btn--ghost btn--sm filters-toggle" type="button" data-filters-open>Filters</button>
              <label class="sr-only" for="sort">Sort by</label>
              <select class="select" id="sort" data-sort>
                <option value="date">Starting soonest</option>
                <option value="popular">Most popular</option>
                <option value="rating">Highest rated</option>
                <option value="priceAsc">Fee: low to high</option>
                <option value="priceDesc">Fee: high to low</option>
              </select>
            </div>
          </div>
          <div class="active-filters" data-active-filters></div>
          <div class="card-grid" data-results></div>
        </div>
      </div>
    </section>
"""

COURSES["ar"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">الدليل</span>
        <h1 class="h2" style="margin-block:10px 12px">البرامج التنفيذية</h1>
        <p class="lede">كل برنامج في الدليل، ومعه الرسوم وأيام التدريس وتاريخ البدء ولغة التدريس على البطاقة نفسها.
          تعيش أدوات التصفية في عنوان الصفحة، فتصبح قائمتك المختصرة رابطًا يمكن تمريره لاعتماده.</p>

        <form role="search" style="margin-block-start:24px;max-width:560px">
          <label class="sr-only" for="cat-q">ابحث في البرامج</label>
          <input id="cat-q" type="search" data-catalogue-search placeholder="برنامج أو تخصّص أو كلية"
                 style="width:100%;padding:14px 18px;border-radius:999px;border:1px solid var(--line-firm);background:var(--surface)">
        </form>
      </div>
    </section>

    <section class="section--tight" style="padding-block-start:8px">
      <div class="container catalogue">
        <aside class="filters" data-filters aria-label="أدوات التصفية">
          <div class="filters__head">
            <h2>تصفية النتائج</h2>
            <button class="btn btn--sm btn--ghost" type="button" data-filters-close>تم</button>
          </div>
          <div data-filter-body></div>
          <button class="btn btn--primary btn--block filters__done" type="button" data-filters-close>اعرض النتائج</button>
        </aside>

        <div>
          <div class="results-bar">
            <p class="results-count" data-results-count aria-live="polite">—</p>
            <div class="results-tools">
              <button class="btn btn--ghost btn--sm filters-toggle" type="button" data-filters-open>التصفية</button>
              <label class="sr-only" for="sort">ترتيب النتائج</label>
              <select class="select" id="sort" data-sort>
                <option value="date">الأقرب بدءًا</option>
                <option value="popular">الأكثر رواجًا</option>
                <option value="rating">الأعلى تقييمًا</option>
                <option value="priceAsc">الرسوم: من الأقل</option>
                <option value="priceDesc">الرسوم: من الأعلى</option>
              </select>
            </div>
          </div>
          <div class="active-filters" data-active-filters></div>
          <div class="card-grid" data-results></div>
        </div>
      </div>
    </section>
"""

COURSE = {}

COURSE["en"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li><a href="courses.html">Courses</a></li>
          <li aria-current="page" data-course-crumb>Course</li>
        </ol>
      </nav>
    </div>

    <div class="container" data-course-detail></div>

    <section class="section">
      <div class="container">
        <div class="section-head"><h2 class="h2">Similar programmes</h2></div>
        <div class="card-grid" data-similar></div>
      </div>
    </section>
"""

COURSE["ar"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="مسار التنقّل">
        <ol>
          <li><a href="index.html">الرئيسية</a></li>
          <li><a href="courses.html">البرامج</a></li>
          <li aria-current="page" data-course-crumb>البرنامج</li>
        </ol>
      </nav>
    </div>

    <div class="container" data-course-detail></div>

    <section class="section">
      <div class="container">
        <div class="section-head"><h2 class="h2">برامج مشابهة</h2></div>
        <div class="card-grid" data-similar></div>
      </div>
    </section>
"""

SCHOOLS = {}

SCHOOLS["en"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">Institutions</span>
        <h1 class="h2" style="margin-block:10px 12px">Business schools</h1>
        <p class="lede">Every institution with programmes in the index, with the city it teaches from and
          what it lists — not a paragraph of marketing copy.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-block-start:22px" data-region-filter></div>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="card-grid" data-schools></div>
      </div>
    </section>
"""

SCHOOLS["ar"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">المؤسسات</span>
        <h1 class="h2" style="margin-block:10px 12px">كليات إدارة الأعمال</h1>
        <p class="lede">كل كلية لها برامج في الدليل، ومعها ما تشتهر به فعلًا — لا فقرة من العبارات التسويقية.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-block-start:22px" data-region-filter></div>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="card-grid" data-schools></div>
      </div>
    </section>
"""

SCHOOL = {}

SCHOOL["en"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li><a href="schools.html">Schools</a></li>
          <li aria-current="page" data-school-crumb>School</li>
        </ol>
      </nav>
    </div>

    <section class="section--tight">
      <div class="container" data-school-detail></div>
    </section>
"""

SCHOOL["ar"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="مسار التنقّل">
        <ol>
          <li><a href="index.html">الرئيسية</a></li>
          <li><a href="schools.html">الكليات</a></li>
          <li aria-current="page" data-school-crumb>الكلية</li>
        </ol>
      </nav>
    </div>

    <section class="section--tight">
      <div class="container" data-school-detail></div>
    </section>
"""

LISTS = {}

LISTS["en"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">Collections</span>
        <h1 class="h2" style="margin-block:10px 12px">Editors' shortlists</h1>
        <p class="lede">The questions people arrive with, each answered with a handful of programmes.
          Editorial selections, not a ranking — nobody scored anything out of a hundred.</p>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="card-grid" data-lists></div>
      </div>
    </section>
"""

LISTS["ar"] = """
    <section class="section--tight" style="padding-block-start:34px">
      <div class="container">
        <span class="eyebrow">مجموعات</span>
        <h1 class="h2" style="margin-block:10px 12px">اختيارات فريق التحرير</h1>
        <p class="lede">الأسئلة التي يأتي بها الزوّار عادةً، يجيب عن كلٍّ منها عدد محدود من البرامج.
          اختيارات تحريرية لا تصنيفات — لم يُمنح أي برنامج درجة من مئة.</p>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="card-grid" data-lists></div>
      </div>
    </section>
"""

LIST = {}

LIST["en"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li><a href="lists.html">Collections</a></li>
          <li aria-current="page" data-list-crumb>Collection</li>
        </ol>
      </nav>
    </div>

    <section class="section--tight">
      <div class="container" data-list-detail></div>
    </section>
"""

LIST["ar"] = """
    <div class="container">
      <nav class="breadcrumbs" aria-label="مسار التنقّل">
        <ol>
          <li><a href="index.html">الرئيسية</a></li>
          <li><a href="lists.html">المجموعات</a></li>
          <li aria-current="page" data-list-crumb>المجموعة</li>
        </ol>
      </nav>
    </div>

    <section class="section--tight">
      <div class="container" data-list-detail></div>
    </section>
"""

ABOUT = {}

ABOUT["en"] = """
    <section class="section">
      <div class="container" style="max-width:760px">
        <span class="eyebrow">About Masar</span>
        <h1 class="display" style="margin-block:12px 18px">An index of executive programmes, built the honest way round.</h1>
        <p class="lede">Choosing an executive programme usually means directories that rank whoever paid most,
          hide the fee until you hand over a phone number, and have no Arabic version worth the name.
          Masar (<span lang="ar">مسار</span>, "the path") was built in Riyadh to be the opposite.</p>

        <div class="prose" style="margin-block-start:32px">
          <h2 class="h3" style="margin-block:28px 10px">What is here</h2>
          <p class="muted">Open-enrolment executive programmes from business schools around the world —
            MIT Sloan, IMD, Kellogg, Harvard Kennedy School, Berkeley Haas, Queen's Smith, UBC Sauder, AGSM,
            Copenhagen Business School, St. Gallen and others — each with its dates, teaching days, format,
            language of instruction and fee. Everything is visible without an account, and any filtered view
            is a link you can forward.</p>

          <h2 class="h3" style="margin-block:28px 10px">Where the data comes from</h2>
          <p class="muted">From the schools themselves. Masar reads each institution's published programme
            pages and records the facts they state. Nothing is paraphrased from a school's marketing copy,
            no rating is invented, and a programme with no published fee is left out rather than guessed.
            Fees appear in the currency the school publishes; the riyal figure is an indicative conversion
            with the rate date shown.</p>

          <h2 class="h3" style="margin-block:28px 10px">How programmes are selected</h2>
          <p class="muted">Editorially. Position in the index or in a collection is never for sale and there
            is no paid tier. Collections are labelled as editorial selections rather than rankings, because
            scoring a four-day negotiation programme out of a hundred would be an invention.</p>

          <h2 class="h3" style="margin-block:28px 10px">Arabic, properly</h2>
          <p class="muted">The Arabic site is not the English site passed through a translation engine.
            It is written copy, a right-to-left layout built from the same stylesheet, correct Arabic plural
            forms, Hijri dates alongside Gregorian, and localised numbers. Both languages read from one
            catalogue, so a programme cannot exist in one and quietly vanish in the other.</p>

          <h2 class="h3" style="margin-block:28px 10px">Privacy</h2>
          <p class="muted">No tracking script, no analytics. Your shortlist lives in your own browser and
            never leaves it. An enquiry goes to the school running the programme and is not resold.</p>
        </div>

        <div style="margin-block-start:34px;display:flex;gap:12px;flex-wrap:wrap">
          <a class="btn btn--primary" href="courses.html">Browse the index</a>
          <a class="btn btn--ghost" href="contact.html">Talk to an advisor</a>
        </div>
      </div>
    </section>
"""

ABOUT["ar"] = """
    <section class="section">
      <div class="container" style="max-width:760px">
        <span class="eyebrow">عن مسار</span>
        <h1 class="display" style="margin-block:12px 18px">دليل للبرامج التنفيذية، مبني بالطريقة الصادقة.</h1>
        <p class="lede">اختيار برنامج تنفيذي يعني عادةً أدلّة تُصدِّر من يدفع أكثر، وتُخفي الرسوم حتى تترك رقم هاتفك،
          وليس لها نسخة عربية تستحق هذا الاسم. بُني «مسار» في الرياض ليكون النقيض.</p>

        <div class="prose" style="margin-block-start:32px">
          <h2 class="h3" style="margin-block:28px 10px">ما الذي تجده هنا</h2>
          <p class="muted">برامج تنفيذية مفتوحة التسجيل من كليات الأعمال حول العالم — إم آي تي سلون، وآي إم دي، وكيلوغ،
            وكلية كينيدي في هارفارد، وهاس في بيركلي، وسميث في جامعة كوينز، وساودر في جامعة بريتيش كولومبيا،
            وكلية كوبنهاغن للأعمال، وسانت غالن وغيرها — لكلٍّ منها تواريخه وأيام تدريسه ونمط دراسته ولغة التدريس والرسوم.
            كل شيء ظاهر دون حساب، وأي نتيجة مصفّاة رابط يمكن تمريره.</p>

          <h2 class="h3" style="margin-block:28px 10px">من أين تأتي البيانات</h2>
          <p class="muted">من الكليات نفسها. يقرأ «مسار» صفحات البرامج المنشورة لكل مؤسسة ويسجّل الوقائع التي تذكرها.
            لا يُعاد صياغة أي نص تسويقي، ولا يُختلق أي تقييم، والبرنامج الذي لم تُنشر رسومه يُستبعد ولا يُخمَّن.
            تظهر الرسوم بالعملة التي تنشرها الكلية، ومبلغ الريال تحويل استرشادي مع تاريخ سعر الصرف.</p>

          <h2 class="h3" style="margin-block:28px 10px">كيف تُختار البرامج</h2>
          <p class="muted">تحريريًا. الموضع في الدليل أو في أي مجموعة غير معروض للبيع، ولا توجد فئة مدفوعة.
            وُصفت المجموعات بأنها اختيارات تحريرية لا تصنيفات، لأن منح برنامج تفاوض مدّته أربعة أيام درجةً من مئة سيكون اختلاقًا.</p>

          <h2 class="h3" style="margin-block:28px 10px">العربية كما ينبغي</h2>
          <p class="muted">النسخة العربية ليست النسخة الإنجليزية بعد تمريرها على محرّك ترجمة. هي نصوص مكتوبة، وتخطيط
            من اليمين إلى اليسار مبني من ملف التنسيق نفسه، وصيغ جمع عربية صحيحة، وتواريخ هجرية إلى جانب الميلادية، وأرقام موطّنة.
            تقرأ اللغتان من دليل واحد، فلا يمكن أن يوجد برنامج بلغة ويختفي بهدوء في الأخرى.</p>

          <h2 class="h3" style="margin-block:28px 10px">الخصوصية</h2>
          <p class="muted">لا برامج تتبّع ولا تحليلات. تعيش قائمتك المختارة في متصفّحك ولا تغادره.
            يذهب الاستفسار إلى الكلية التي تقدّم البرنامج ولا يُعاد بيعه.</p>
        </div>

        <div style="margin-block-start:34px;display:flex;gap:12px;flex-wrap:wrap">
          <a class="btn btn--primary" href="courses.html">تصفّح الدليل</a>
          <a class="btn btn--ghost" href="contact.html">تحدّث مع مستشار</a>
        </div>
      </div>
    </section>
"""

CONTACT = {}

def contact_channels(lang):
    """Direct channels, rendered only when the operator has set them."""
    rows = []
    if SITE["whatsapp"]:
        rows.append('<a class="btn btn--primary" href="https://wa.me/{n}" rel="noopener">{t}</a>'.format(
            n=SITE["whatsapp"], t="Message us on WhatsApp" if lang == "en" else "راسلنا عبر واتساب"))
    if SITE["phone"]:
        rows.append('<a class="btn btn--ghost" href="tel:{raw}" dir="ltr">{p}</a>'.format(
            raw=SITE["phone"].replace(" ", ""), p=SITE["phone"]))
    if SITE["email"]:
        rows.append('<a class="btn btn--ghost" href="mailto:{e}">{e}</a>'.format(e=SITE["email"]))
    if not rows:
        return ""
    return '<div class="channel-row">' + "".join(rows) + "</div>"

CONTACT["en"] = """
    <section class="section">
      <div class="container split" style="align-items:start">
        <div>
          <span class="eyebrow">Contact</span>
          <h1 class="h2" style="margin-block:12px 16px">Talk to an advisor</h1>
          <p class="lede">Tell us which programme you are weighing and what you need to know — dates,
            fees, whether it suits your level, how to get it approved. We reply within two working days,
            Sunday to Thursday, in Arabic or English. Your details go to the school you choose and nowhere else.</p>
          {channels}

          <h2 class="h3" id="corporate" style="margin-block:34px 12px">For organisations</h2>
          <p class="muted">Enrolling a team, a leadership bench or a full closed cohort? Say how many people
            and which subjects, and we will come back with options, group terms and a proposal you can
            forward internally.</p>

          <h2 class="h3" style="margin-block:34px 12px">Listing a programme</h2>
          <p class="muted">Schools can propose a programme for the index at no cost. Inclusion is an editorial
            decision and position is never for sale.</p>
        </div>

        <form class="form-grid form-card" data-contact-form novalidate{action}>
          <div class="field-block">
            <label for="name">Your name</label>
            <input id="name" name="name" type="text" autocomplete="name" required>
          </div>
          <div class="field-block">
            <label for="org">Organisation</label>
            <input id="org" name="organisation" type="text" autocomplete="organization">
          </div>
          <div class="field-block">
            <label for="phone">Mobile</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr" placeholder="+966">
          </div>
          <div class="field-block">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field-block field-block--wide">
            <label for="course">Programme you are asking about</label>
            <select id="course" name="course" data-course-select></select>
          </div>
          <div class="field-block">
            <label for="size">Who is enrolling</label>
            <select id="size" name="group">
              <option value="1">Just me</option>
              <option value="2-5">A team of 2–5</option>
              <option value="6+">6 or more / closed cohort</option>
            </select>
          </div>
          <div class="field-block">
            <label for="lang">Reply in</label>
            <select id="lang" name="reply_language">
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <div class="field-block field-block--wide">
            <label for="message">Your question</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <div class="field-block field-block--wide">
            <button class="btn btn--primary" type="submit">Send enquiry</button>
            <p class="form-note" style="margin-block-start:10px">Two working days, Sunday to Thursday, Riyadh time.</p>
            <p class="notice" data-form-status tabindex="-1" hidden style="margin-block-start:14px">
              <span>{status}</span>
            </p>
          </div>
        </form>
      </div>
    </section>
"""

CONTACT["ar"] = """
    <section class="section">
      <div class="container split" style="align-items:start">
        <div>
          <span class="eyebrow">تواصل معنا</span>
          <h1 class="h2" style="margin-block:12px 16px">تحدّث مع مستشار</h1>
          <p class="lede">أخبرنا بالبرنامج الذي تفاضل بينه وبين غيره وبما تريد معرفته — المواعيد والرسوم ومدى ملاءمته
            لمستواك وكيفية اعتماده. نردّ خلال يومَي عمل، من الأحد إلى الخميس، بالعربية أو الإنجليزية.
            تذهب بياناتك إلى الكلية التي تختارها ولا إلى أي جهة أخرى.</p>
          {channels}

          <h2 class="h3" id="corporate" style="margin-block:34px 12px">للمنشآت</h2>
          <p class="muted">تسجّل فريقًا أو صفًّا قياديًا أو دفعة مغلقة كاملة؟ اذكر عدد المشاركين والمجالات المطلوبة،
            وسنعود إليك بالخيارات وشروط الحجز الجماعي وعرض يمكن تمريره داخل منشأتك.</p>

          <h2 class="h3" style="margin-block:34px 12px">إدراج برنامج</h2>
          <p class="muted">يمكن للكليات اقتراح برنامج لإدراجه في الدليل مجانًا. الإدراج قرار تحريري، والموضع غير معروض للبيع.</p>
        </div>

        <form class="form-grid form-card" data-contact-form novalidate{action}>
          <div class="field-block">
            <label for="name">الاسم</label>
            <input id="name" name="name" type="text" autocomplete="name" required>
          </div>
          <div class="field-block">
            <label for="org">المنشأة</label>
            <input id="org" name="organisation" type="text" autocomplete="organization">
          </div>
          <div class="field-block">
            <label for="phone">الجوال</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr" placeholder="+966">
          </div>
          <div class="field-block">
            <label for="email">البريد الإلكتروني</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="field-block field-block--wide">
            <label for="course">البرنامج محلّ الاستفسار</label>
            <select id="course" name="course" data-course-select></select>
          </div>
          <div class="field-block">
            <label for="size">من سيلتحق</label>
            <select id="size" name="group">
              <option value="1">أنا فقط</option>
              <option value="2-5">فريق من 2 إلى 5</option>
              <option value="6+">6 فأكثر / دفعة مغلقة</option>
            </select>
          </div>
          <div class="field-block">
            <label for="lang">لغة الردّ</label>
            <select id="lang" name="reply_language">
              <option value="ar">العربية</option>
              <option value="en">الإنجليزية</option>
            </select>
          </div>
          <div class="field-block field-block--wide">
            <label for="message">سؤالك</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <div class="field-block field-block--wide">
            <button class="btn btn--primary" type="submit">أرسل الاستفسار</button>
            <p class="form-note" style="margin-block-start:10px">خلال يومَي عمل، من الأحد إلى الخميس، بتوقيت الرياض.</p>
            <p class="notice" data-form-status tabindex="-1" hidden style="margin-block-start:14px">
              <span>{status}</span>
            </p>
          </div>
        </form>
      </div>
    </section>
"""

def contact_body(lang):
    endpoint = SITE.get("form_endpoint", "")
    if endpoint:
        status = ("<strong>Thank you.</strong> Your enquiry has been sent; we reply within two working days."
                  if lang == "en" else
                  "<strong>شكرًا لك.</strong> وصلنا استفسارك، ونردّ خلال يومَي عمل.")
    elif SITE["email"]:
        status = ("<strong>Almost there.</strong> Your email app should now open with the enquiry drafted; send it to finish."
                  if lang == "en" else
                  "<strong>خطوة أخيرة.</strong> سيفتح تطبيق البريد الآن وبه الاستفسار جاهزًا؛ أرسله لإتمام الطلب.")
    else:
        status = ("<strong>This form is not connected yet.</strong> Please use the contact channels on this page."
                  if lang == "en" else
                  "<strong>لم يُربط هذا النموذج بعد.</strong> يُرجى استخدام قنوات التواصل في هذه الصفحة.")
    return CONTACT[lang].replace("{channels}", contact_channels(lang)) \
                        .replace("{action}", ' action="{}" method="post" data-endpoint'.format(endpoint) if endpoint
                                 else (' data-mailto="{}"'.format(SITE["email"]) if SITE["email"] else "")) \
                        .replace("{status}", status)

PAGES = [
    {
        "file": "index.html", "body": HOME,
        "title": {"en": "Masar — executive programmes from the world's business schools",
                  "ar": "مسار — البرامج التنفيذية من كليات الأعمال حول العالم"},
        "desc": {"en": "Compare open-enrolment executive programmes from MIT Sloan, IMD, Kellogg, Harvard "
                       "Kennedy School and more — dates, teaching days and fees in the school's currency or "
                       "in Saudi riyals. Bilingual, free to use, no paid placement.",
                 "ar": "ابحث في برامج التعليم التنفيذي من كليات إدارة الأعمال حول العالم حسب التخصّص "
                       "والمنطقة ونمط الدراسة واللغة والرسوم. مجاني وثنائي اللغة وبلا إدراج مدفوع."},
    },
    {
        "file": "courses.html", "body": COURSES,
        "title": {"en": "Executive programmes | Masar", "ar": "البرامج التنفيذية | مسار"},
        "desc": {"en": "Filter executive programmes by subject, region, format, language of instruction, "
                       "duration and fee.",
                 "ar": "صفِّ البرامج التنفيذية حسب التخصّص والمنطقة ونمط الدراسة ولغة التدريس والمدّة والرسوم."},
    },
    {
        "file": "course.html", "body": COURSE,
        "title": {"en": "Programme | Masar", "ar": "البرنامج | مسار"},
        "desc": {"en": "Programme details, fee, dates and the school behind it.",
                 "ar": "تفاصيل البرنامج والرسوم والمواعيد والكلية التي تقدّمه."},
    },
    {
        "file": "schools.html", "body": SCHOOLS,
        "title": {"en": "Business schools | Masar", "ar": "كليات إدارة الأعمال | مسار"},
        "desc": {"en": "The business schools with executive programmes in the Masar index.",
                 "ar": "كليات إدارة الأعمال التي لها برامج تنفيذية في دليل مسار."},
    },
    {
        "file": "school.html", "body": SCHOOL,
        "title": {"en": "School | Masar", "ar": "الكلية | مسار"},
        "desc": {"en": "School profile and every programme it offers in the index.",
                 "ar": "ملف الكلية وكل برامجها المدرجة في الدليل."},
    },
    {
        "file": "lists.html", "body": LISTS,
        "title": {"en": "Collections | Masar", "ar": "المجموعات | مسار"},
        "desc": {"en": "Editorial shortlists of executive programmes, grouped by what people are actually asking.",
                 "ar": "اختيارات تحريرية للبرامج التنفيذية، مجمّعة حسب ما يبحث عنه الناس فعلًا."},
    },
    {
        "file": "list.html", "body": LIST,
        "title": {"en": "Collection | Masar", "ar": "المجموعة | مسار"},
        "desc": {"en": "An editorial shortlist of executive programmes.",
                 "ar": "قائمة تحريرية مختارة من البرامج التنفيذية."},
    },
    {
        "file": "about.html", "body": ABOUT,
        "title": {"en": "About Masar", "ar": "عن مسار"},
        "desc": {"en": "Why Masar exists, how listings are chosen, and what the Arabic site actually is.",
                 "ar": "لماذا وُجد «مسار»، وكيف تُختار البرامج، وما هي النسخة العربية فعلًا."},
    },
    {
        "file": "contact.html", "body": CONTACT,
        "title": {"en": "Contact | Masar", "ar": "تواصل معنا | مسار"},
        "desc": {"en": "Ask about a programme or suggest a course for the index.",
                 "ar": "اسأل عن برنامج أو اقترح إضافة برنامج إلى الدليل."},
    },
]


def main():
    os.makedirs(os.path.join(HERE, "ar"), exist_ok=True)
    written = []
    for page in PAGES:
        for lang in LOCALES:
            html = shell(
                lang=lang,
                page=page["file"],
                title=page["title"][lang],
                description=page["desc"][lang],
                body=(contact_body(lang) if page["body"] is CONTACT else page["body"][lang]).rstrip("\n"),
            )
            out = os.path.join(HERE, page["file"]) if lang == "en" \
                else os.path.join(HERE, "ar", page["file"])
            with open(out, "w", encoding="utf-8") as fh:
                fh.write(html)
            written.append(os.path.relpath(out, HERE))
    print("Wrote {} pages:".format(len(written)))
    for path in written:
        print("  " + path)


if __name__ == "__main__":
    main()
