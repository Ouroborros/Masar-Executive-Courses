#!/usr/bin/env python3
"""Build the Masar site — nine documents per locale, from one shell.

THE LEDGER. Every page is a ruled ledger: a numbered chapter head, hairline
data rows, and a printed legend. The shell below assembles the masthead, the
chapter navigation and the colophon; the page bodies are the chapter content.
Everything the catalogue renders at runtime lives in assets/js/app.js.

Templating is deliberately dumb: placeholders are ``{{name}}`` and filled by
str.replace, so the HTML can carry braces without escaping games.

    python3 tools/build.py          # writes *.html and ar/*.html
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCALES = ("en", "ar")

# --------------------------------------------------------------------------
# Operator-set details. Anything left empty prints as an em dash against its
# printed label — never as a dead link, never invented.
# --------------------------------------------------------------------------
SITE = {
    "whatsapp": "",          # international format, digits only, e.g. 9665XXXXXXXX
    "phone": "",             # display form, e.g. +966 11 000 0000
    "email": "",
    "cr": "",                # commercial registration
    "vat": "",
    "maroof": "",
    "address": {"en": "", "ar": ""},
    "form_endpoint": "",
    "refreshed": {"en": "23 August 2026", "ar": "٢٣ أغسطس ٢٠٢٦"},
    "fx_date": {"en": "13 September 2026", "ar": "١٣ سبتمبر ٢٠٢٦"},
}

CHAPTERS = [
    ("index.html",    "§01", "Fields",    "الحقول"),
    ("courses.html",  "§02", "The index", "الفهرس"),
    ("schools.html",  "§03", "Schools",   "الكليات"),
    ("lists.html",    "§04", "Sets",      "المجموعات"),
    ("about.html",    "§05", "Method",    "المنهج"),
    ("contact.html",  "§06", "Contact",   "التواصل"),
]

# Square-Kufi route mark. Drawn right-to-left in both directions: an Arabic
# stroke is written RTL regardless of the page's direction.
KUFI = (
    '<svg class="wordmark__kufi" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
    '<rect x="0" y="1" width="24" height="3.4"/>'
    '<rect x="20.6" y="1" width="3.4" height="11"/>'
    '<rect x="8" y="8.6" width="16" height="3.4"/>'
    '<rect x="8" y="8.6" width="3.4" height="11"/>'
    '<rect x="0" y="16.2" width="11.4" height="3.4"/>'
    '</svg>'
)

ARROW = (
    '<svg class="go" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    'stroke-width="1.5" stroke-linecap="square" aria-hidden="true">'
    '<path d="M3 12h16M13 6l6 6-6 6"/></svg>'
)

T = {
    "skip":      {"en": "Skip to the index", "ar": "تخطَّ إلى الفهرس"},
    "menu":      {"en": "Chapters", "ar": "الفصول"},
    "lang":      {"en": "العربية", "ar": "English"},
    "lang_a11y": {"en": "اقرأ هذه الصفحة بالعربية", "ar": "Read this page in English"},
    "sar_orig":  {"en": "Fees as published", "ar": "الرسوم كما نُشرت"},
    "sar_sar":   {"en": "Fees in riyals", "ar": "الرسوم بالريال"},
    "shortlist": {"en": "Shortlist", "ar": "المختارة"},
    "theme":     {"en": "Ground", "ar": "الخلفية"},
    "close":     {"en": "Close", "ar": "إغلاق"},
    "record":    {"en": "The record", "ar": "السجل"},
    "record_note": {
        "en": "Printed by the same rule as the rest of the index: an em dash means we have "
              "not recorded it yet, not that it does not exist.",
        "ar": "يُطبَع بالقاعدة نفسها التي يُطبَع بها الفهرس: الشَّرطة تعني أننا لم نسجّله بعد، "
              "لا أنه غير موجود.",
    },
    "legend_dash": {"en": "— not recorded", "ar": "— غير مسجّل"},
    "legend_fee": {
        "en": "Every fee is the school's own published figure, in the school's own currency.",
        "ar": "كل رسم هو الرقم الذي نشرته الكلية نفسها، وبعملتها.",
    },
    "colo_state": {
        "en": "An independent index of open-enrolment executive programmes, built in Riyadh. "
              "We list. We do not sell.",
        "ar": "فهرس مستقل للبرامج التنفيذية مفتوحة التسجيل، بُني في الرياض. نحن نفهرس، ولا نبيع.",
    },
    "colo_ch":   {"en": "Chapters", "ar": "الفصول"},
    "colo_lang": {"en": "Language", "ar": "اللغة"},
}

RECORD_ROWS = [
    ("cr",       {"en": "Commercial registration", "ar": "السجل التجاري"}),
    ("vat",      {"en": "VAT number", "ar": "الرقم الضريبي"}),
    ("maroof",   {"en": "Maroof", "ar": "معروف"}),
    ("address",  {"en": "Address", "ar": "العنوان"}),
    ("phone",    {"en": "Telephone", "ar": "الهاتف"}),
    ("whatsapp", {"en": "WhatsApp", "ar": "واتساب"}),
    ("refreshed", {"en": "Last refreshed", "ar": "آخر تحديث"}),
]


def dash(value):
    """A value, or the printed dash that stands for an unrecorded one."""
    if value:
        return '<span dir="ltr">{}</span>'.format(value)
    return '<span class="dash" aria-hidden="true">—</span><span class="sr-only">not recorded</span>'


def record_block(lang, colophon=False):
    rows = []
    for key, label in RECORD_ROWS:
        raw = SITE[key]
        if isinstance(raw, dict):
            raw = raw.get(lang, "")
        if key == "whatsapp" and raw:
            raw = "+" + raw
        rows.append(
            '        <div class="record__r">\n'
            '          <span class="lbl">{l}</span>\n'
            '          <span class="record__v">{v}</span>\n'
            '        </div>'.format(l=label[lang], v=dash(raw))
        )
    return (
        '      <div class="record">\n{rows}\n'
        '        <p class="record__note">{note}</p>\n'
        '      </div>'.format(rows="\n".join(rows), note=T["record_note"][lang])
    )


def wa_button(lang, classes="btn btn--solid"):
    """A WhatsApp control, or nothing at all. Never a dead link."""
    if not SITE["whatsapp"]:
        return ""
    return '<a class="{c}" href="https://wa.me/{n}" rel="noopener">{t}</a>'.format(
        c=classes, n=SITE["whatsapp"], t="WhatsApp" if lang == "en" else "واتساب")


def shell(lang, page, title, description, body):
    is_ar = lang == "ar"
    a = "../assets/" if is_ar else "assets/"
    other = ("../" if is_ar else "ar/") + page
    root = "../" if is_ar else ""

    nav = "\n".join(
        '            <li><a href="{href}"{cur}><span class="sr-only">{num} </span>{label}</a></li>'.format(
            href=href, num=num, label=(ar if is_ar else en),
            cur=' aria-current="page"' if href == page else "")
        for href, num, en, ar in CHAPTERS)

    colo_ch = "\n".join(
        '            <li><a href="{href}">{label}</a></li>'.format(
            href=href, label=(ar if is_ar else en))
        for href, num, en, ar in CHAPTERS)

    # The lockup is Arabic-first in the Arabic build; the mark always leads.
    names = ('<span class="wordmark__ar" lang="ar">مسار</span>'
             '<span class="wordmark__bar" aria-hidden="true"></span>'
             '<span class="wordmark__la">Masar</span>') if is_ar else (
             '<span class="wordmark__la">Masar</span>'
             '<span class="wordmark__bar" aria-hidden="true"></span>'
             '<span class="wordmark__ar" lang="ar">مسار</span>')
    wordmark = KUFI + names

    html = TEMPLATE
    for key, val in {
        "lang": lang,
        "dir": "rtl" if is_ar else "ltr",
        "title": title,
        "description": description,
        "a": a,
        "root": root,
        "page": page,
        "other": other,
        "otherlang": "ar" if lang == "en" else "en",
        "skip": T["skip"][lang],
        "menu": T["menu"][lang],
        "navlabel": "الفصول" if is_ar else "Chapters",
        "nav": nav,
        "colo_ch": colo_ch,
        "wordmark": wordmark,
        "lang_other": T["lang"][lang],
        # A two-letter stand-in for the language control on very narrow screens;
        # the full name stays in aria-label, so nothing is lost to a reader.
        "lang_code": "EN" if is_ar else "AR",
        "lang_a11y": T["lang_a11y"][lang],
        "sar_orig": T["sar_orig"][lang],
        "sar_sar": T["sar_sar"][lang],
        "shortlist": T["shortlist"][lang],
        "close": T["close"][lang],
        "body": body,
        "colo_state": T["colo_state"][lang],
        "colo_ch_h": T["colo_ch"][lang],
        "colo_lang_h": T["colo_lang"][lang],
        "record_h": T["record"][lang],
        "record": record_block(lang, colophon=True),
        "legend_dash": T["legend_dash"][lang],
        "legend_fee": T["legend_fee"][lang],
        "wa_header": wa_button(lang, "ctl") or "",
    }.items():
        html = html.replace("{{%s}}" % key, val)
    return html


TEMPLATE = """<!DOCTYPE html>
<html lang="{{lang}}" dir="{{dir}}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{title}}</title>
  <meta name="description" content="{{description}}">
  <link rel="icon" href="{{a}}img/favicon.svg" type="image/svg+xml">
  <link rel="alternate" hreflang="en" href="{{root}}{{page}}">
  <link rel="alternate" hreflang="ar" href="{{root}}ar/{{page}}">
  <link rel="alternate" hreflang="x-default" href="{{root}}{{page}}">
  <script>
    /* Ground and script state before first paint: no flash, and nothing is
       hidden for readers without JS. */
    (function () {
      var r = document.documentElement;
      r.className += ' js';
      try {
        var t = localStorage.getItem('masar-theme');
        if (t === 'light' || t === 'dark') r.setAttribute('data-theme', t);
      } catch (e) {}
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Markazi+Text:wght@500;600&family=Newsreader:opsz,wght@6..72,300..500&display=swap">
  <link rel="stylesheet" href="{{a}}css/site.css">
</head>
<body>
  <a class="skip-link" href="#main">{{skip}}</a>

  <header class="masthead">
    <div class="sheet masthead__in">
      <a class="wordmark" href="index.html" aria-label="Masar">{{wordmark}}</a>

      <nav id="chapnav" class="chapnav" aria-label="{{navlabel}}">
        <ul>
{{nav}}
        </ul>
      </nav>

      <div class="tools">
        <button class="ctl" type="button" data-currency aria-pressed="false">{{sar_orig}}</button>
        <a class="ctl" href="{{other}}" data-lang-switch data-lang-code="{{lang_code}}" hreflang="{{otherlang}}" lang="{{otherlang}}" aria-label="{{lang_a11y}}">{{lang_other}}</a>
        {{wa_header}}
        <button class="ctl" type="button" data-drawer-open aria-label="{{shortlist}}"><span class="only-wide">{{shortlist}}</span><span data-shortlist-count>0</span></button>
        <button class="ctl nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="chapnav" aria-label="{{menu}}">{{menu}}</button>
      </div>
    </div>
  </header>

  <main id="main">
{{body}}
  </main>

  <footer class="colophon">
    <div class="sheet">
      <div class="colo-grid">
        <div>
          <span class="wordmark">{{wordmark}}</span>
          <p style="margin-block-start:var(--sp-4);max-inline-size:38ch">{{colo_state}}</p>
        </div>
        <div>
          <h3>{{colo_ch_h}}</h3>
          <ul>
{{colo_ch}}
          </ul>
        </div>
        <div>
          <h3>{{colo_lang_h}}</h3>
          <ul>
            <li><a href="{{other}}" data-lang-switch lang="{{otherlang}}">{{lang_other}}</a></li>
            <li><button class="ctl" type="button" data-theme-toggle style="margin-block-start:var(--sp-2)">Ground</button></li>
          </ul>
        </div>
        <div>
          <h3>{{record_h}}</h3>
{{record}}
        </div>
      </div>
      <div class="colo-base">
        <span>© <span data-year>2026</span> Masar</span>
        <span>{{legend_dash}}</span>
        <span>{{legend_fee}}</span>
      </div>
    </div>
  </footer>

  <div class="drawer-back" data-drawer-backdrop></div>
  <aside class="drawer" data-drawer role="dialog" aria-modal="true" aria-label="{{shortlist}}" aria-hidden="true" inert>
    <div class="drawer__h">
      <h2 style="font-size:var(--fs-500)">{{shortlist}}</h2>
      <button class="ctl" type="button" data-drawer-close>{{close}}</button>
    </div>
    <div class="drawer__b" data-drawer-body></div>
    <div class="drawer__f">
      <button class="btn btn--ghost btn--block" type="button" data-shortlist-copy></button>
      <button class="btn btn--ghost btn--block" type="button" data-shortlist-clear></button>
    </div>
  </aside>

  <script src="{{a}}js/data.js"></script>
  <script src="{{a}}js/i18n.js"></script>
  <script src="{{a}}js/app.js"></script>
</body>
</html>
"""


# ---------------------------------------------------------------------------
# Page bodies
# ---------------------------------------------------------------------------

def chapter(num, title, alt, note, body, band=False, cid=None):
    return (
        '    <section class="chapter{band}"{cid}>\n'
        '      <div class="sheet">\n'
        '        <div class="chap-head">\n'
        '          <span class="chap-num">{num}</span>\n'
        '          <h2 class="chap-title">{title}<span class="alt-run">{alt}</span></h2>\n'
        '          <p class="chap-note">{note}</p>\n'
        '        </div>\n'
        '        <div class="chap-body">\n{body}\n        </div>\n'
        '      </div>\n'
        '    </section>\n'
    ).format(band=" chapter--band" if band else "", num=num, title=title, alt=alt,
             note=note, body=body, cid=' id="%s"' % cid if cid else "")


HOME = {}

HOME["en"] = """
    <section class="hero">
      <div class="sheet">
        <p class="dateline lbl">
          <span>An independent index · Riyadh</span>
          <span class="dateline__sep" aria-hidden="true">/</span>
          <span data-today>—</span>
          <span class="dateline__sep" aria-hidden="true">/</span>
          <span class="hijri" lang="ar" data-today-hijri>—</span>
        </p>

        <div class="hero__grid">
          <div>
            <h1>
              <span class="ln" data-reveal style="--i:0">The fee.</span>
              <span class="ln" data-reveal style="--i:1">The city.</span>
              <span class="ln" data-reveal style="--i:2">The dates.</span>
            </h1>
            <span class="hero__echo alt-run" lang="ar">الرسوم. المدينة. التواريخ.</span>
            <p class="hero__stand">Masar lists open-enrolment executive programmes from the
              world's business schools — the fee each school publishes, the city it is taught in,
              the dates it runs and the number of teaching days. Nothing is ranked. Nothing is sold.</p>
            <div class="hero__acts">
              <a class="btn btn--solid" href="courses.html">Browse the index</a>
              <a class="btn btn--ghost" href="contact.html#teams">Enrol a team</a>
            </div>
          </div>

          <div class="totals">
            <a class="totals__it" href="courses.html">
              <span class="totals__n num" data-stat="programmes">189</span>
              <span class="totals__l lbl">Programmes</span>
            </a>
            <a class="totals__it" href="schools.html">
              <span class="totals__n num" data-stat="schools">16</span>
              <span class="totals__l lbl">Business schools</span>
            </a>
            <a class="totals__it" href="courses.html">
              <span class="totals__n num" data-stat="countries">6</span>
              <span class="totals__l lbl">Countries of delivery</span>
            </a>
          </div>
        </div>
      </div>
    </section>
"""

HOME["ar"] = """
    <section class="hero">
      <div class="sheet">
        <p class="dateline lbl">
          <span>فهرس مستقل · الرياض</span>
          <span class="dateline__sep" aria-hidden="true">/</span>
          <span data-today>—</span>
          <span class="dateline__sep" aria-hidden="true">/</span>
          <span class="hijri" data-today-hijri>—</span>
        </p>

        <div class="hero__grid">
          <div>
            <h1>
              <span class="ln" data-reveal style="--i:0">الرسوم.</span>
              <span class="ln" data-reveal style="--i:1">المدينة.</span>
              <span class="ln" data-reveal style="--i:2">التواريخ.</span>
            </h1>
            <span class="hero__echo alt-run" lang="en">The fee. The city. The dates.</span>
            <p class="hero__stand">يفهرس «مسار» البرامج التنفيذية مفتوحة التسجيل من كليات الأعمال
              حول العالم: الرسوم التي تنشرها كل كلية، والمدينة التي يُدرَّس فيها البرنامج، وتواريخه،
              وعدد أيام التدريس. لا تصنيف، ولا بيع.</p>
            <div class="hero__acts">
              <a class="btn btn--solid" href="courses.html">تصفَّح الفهرس</a>
              <a class="btn btn--ghost" href="contact.html#teams">سجّل فريقًا</a>
            </div>
          </div>

          <div class="totals">
            <a class="totals__it" href="courses.html">
              <span class="totals__n num" data-stat="programmes">189</span>
              <span class="totals__l lbl">برنامجًا</span>
            </a>
            <a class="totals__it" href="schools.html">
              <span class="totals__n num" data-stat="schools">16</span>
              <span class="totals__l lbl">كلية أعمال</span>
            </a>
            <a class="totals__it" href="courses.html">
              <span class="totals__n num" data-stat="countries">6</span>
              <span class="totals__l lbl">دولة تُقدَّم فيها</span>
            </a>
          </div>
        </div>
      </div>
    </section>
"""

# §02 Fields · §03 the ledger · §04 schools — rendered by app.js into these hooks.
HOME["en"] += chapter(
    "§01", "Fields", "الحقول",
    "Twelve fields run through the index. Choose one and the catalogue opens filtered to it.",
    '          <div class="fields" data-home-fields></div>')
HOME["en"] += chapter(
    "§02", "The next intakes", "أقرب الدفعات",
    "Grouped by start date, soonest first. Ten here; the rest are in the index.",
    '          <div class="ledger" data-home-ledger></div>\n'
    '          <div class="ledger-foot">\n'
    '            <a class="btn btn--ghost" href="courses.html" data-all-programmes>See the whole index</a>\n'
    '            <span class="lbl">— not recorded</span>\n'
    '          </div>')
HOME["en"] += chapter(
    "§03", "The schools", "الكليات",
    "Every institution with programmes in the index, named — no logos, no rankings.",
    '          <div data-home-schools></div>')

HOME["en"] += """
    <section class="chapter chapter--band" id="method">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§04</span>
          <h2 class="chap-title">Method<span class="alt-run" lang="ar">المنهج</span></h2>
          <p class="chap-note">How a programme gets into the index, and what we will not do to it.</p>
        </div>
        <div class="chap-body">
          <p class="creed">We list. We do not sell.</p>

          <div class="tenets">
            <div class="tenet">
              <span class="tenet__n">01</span>
              <h3>Source</h3>
              <p>Every record is taken from the school's own published programme page. If a school
                did not state it, this index does not state it either.</p>
            </div>
            <div class="tenet">
              <span class="tenet__n">02</span>
              <h3>Currency</h3>
              <p>The fee is the school's own, in the school's own currency. We do not convert the
                figure we publish.</p>
            </div>
            <div class="tenet">
              <span class="tenet__n">03</span>
              <h3>Silence</h3>
              <p>An unrecorded field prints an em dash. An index that fills its own gaps is not
                an index.</p>
            </div>
            <div class="tenet">
              <span class="tenet__n">04</span>
              <h3>Position</h3>
              <p>No rankings, no ratings, no featured slots, no paid placement. Order is by date,
                fee, teaching days or school — whichever you choose.</p>
            </div>
          </div>

          <div class="plate">
            <p class="plate__codes">USD&nbsp;&nbsp;CHF&nbsp;&nbsp;AUD&nbsp;&nbsp;CAD&nbsp;&nbsp;DKK</p>
            <div>
              <p>Five currencies appear in this index because five currencies appear on the
                schools' own pages. Converting them would be a guess printed as a fact.</p>
              <p>Beside every fee we also print an indicative riyal figure and the date of the
                rate we used. It is an indication for a budget line, not a quote.</p>
            </div>
          </div>

          <div class="alt-block">
            <span class="alt-run" lang="ar">الرقم كما نشرته الكلية. لا تحويل، ولا تقدير.</span>
          </div>
        </div>
      </div>
    </section>
"""

HOME["ar"] += chapter(
    "§01", "الحقول", "Fields",
    "اثنا عشر حقلًا تمرّ عبر الفهرس. اختر واحدًا ليُفتح الفهرس مصفّى عليه.",
    '          <div class="fields" data-home-fields></div>')
HOME["ar"] += chapter(
    "§02", "أقرب الدفعات", "The next intakes",
    "مجمّعة حسب تاريخ البدء، الأقرب أولًا. عشرة هنا، وبقيتها في الفهرس.",
    '          <div class="ledger" data-home-ledger></div>\n'
    '          <div class="ledger-foot">\n'
    '            <a class="btn btn--ghost" href="courses.html" data-all-programmes>اعرض الفهرس كاملًا</a>\n'
    '            <span class="lbl">— غير مسجّل</span>\n'
    '          </div>')
HOME["ar"] += chapter(
    "§03", "الكليات", "The schools",
    "كل مؤسسة لها برامج في الفهرس، باسمها — بلا شعارات وبلا تصنيفات.",
    '          <div data-home-schools></div>')

HOME["ar"] += """
    <section class="chapter chapter--band" id="method">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§04</span>
          <h2 class="chap-title">المنهج<span class="alt-run" lang="en">Method</span></h2>
          <p class="chap-note">كيف يدخل البرنامج إلى الفهرس، وما الذي لن نفعله به.</p>
        </div>
        <div class="chap-body">
          <p class="creed">نحن نفهرس، ولا نبيع.</p>

          <div class="tenets">
            <div class="tenet">
              <span class="tenet__n">٠١</span>
              <h3>المصدر</h3>
              <p>كل سجل مأخوذ من صفحة البرنامج التي تنشرها الكلية نفسها. وما لم تذكره الكلية
                لا يذكره هذا الفهرس.</p>
            </div>
            <div class="tenet">
              <span class="tenet__n">٠٢</span>
              <h3>العملة</h3>
              <p>الرسم رسم الكلية، وبعملتها. ولا نحوّل الرقم الذي ننشره.</p>
            </div>
            <div class="tenet">
              <span class="tenet__n">٠٣</span>
              <h3>الصمت</h3>
              <p>الحقل غير المسجّل تُطبَع مكانه شَرطة. والفهرس الذي يملأ فجواته بنفسه ليس فهرسًا.</p>
            </div>
            <div class="tenet">
              <span class="tenet__n">٠٤</span>
              <h3>الترتيب</h3>
              <p>لا تصنيفات ولا تقييمات ولا مواضع مميّزة ولا إدراج مدفوع. الترتيب بالتاريخ أو
                الرسوم أو أيام التدريس أو الكلية — كما تختار أنت.</p>
            </div>
          </div>

          <div class="plate">
            <p class="plate__codes">USD&nbsp;&nbsp;CHF&nbsp;&nbsp;AUD&nbsp;&nbsp;CAD&nbsp;&nbsp;DKK</p>
            <div>
              <p>تظهر خمس عملات في هذا الفهرس لأن خمس عملات تظهر في صفحات الكليات نفسها.
                وتحويلها سيكون تخمينًا يُطبَع بوصفه واقعة.</p>
              <p>وإلى جانب كل رسم نطبع أيضًا مبلغًا استرشاديًا بالريال وتاريخ سعر الصرف المستخدم.
                هو إشارة لبند في الميزانية، لا عرض سعر.</p>
            </div>
          </div>

          <div class="alt-block">
            <span class="alt-run" lang="en">The figure is the school's own. No conversion, no estimate.</span>
          </div>
        </div>
      </div>
    </section>
"""

HOME["en"] += chapter(
    "§05", "Enrolling a team", "تسجيل فريق",
    "Masar does not enrol on a school's behalf. It points you at the right intake and the right desk.",
    '          <div class="steps">\n'
    '            <div class="step"><span class="step__n">01</span><h3>Shortlist the intakes</h3>'
    '<p>Filter the index by field, city, month, teaching days or fee, and keep what fits.</p></div>\n'
    '            <div class="step"><span class="step__n">02</span><h3>Send it on</h3>'
    '<p>A filtered view is a link, and a shortlist copies as plain text — both forward to a sponsor intact.</p></div>\n'
    '            <div class="step"><span class="step__n">03</span><h3>Ask for a proposal</h3>'
    '<p>Tell us the seats and the quarter. Group terms and closed cohorts are agreed with the school, not with us.</p></div>\n'
    '          </div>\n'
    '          <div class="ledger-foot"><a class="btn btn--solid" href="contact.html#teams">Request a proposal</a></div>',
    cid="teams")

HOME["ar"] += chapter(
    "§05", "تسجيل فريق", "Enrolling a team",
    "لا يسجّل «مسار» نيابةً عن أي كلية. هو يدلّك على الدفعة الصحيحة وعلى الجهة الصحيحة.",
    '          <div class="steps">\n'
    '            <div class="step"><span class="step__n">٠١</span><h3>اختر الدفعات</h3>'
    '<p>صفِّ الفهرس حسب الحقل أو المدينة أو الشهر أو أيام التدريس أو الرسوم، واحتفظ بما يناسبك.</p></div>\n'
    '            <div class="step"><span class="step__n">٠٢</span><h3>مرّرها</h3>'
    '<p>أي نتيجة مصفّاة رابط، والقائمة المختارة تُنسَخ نصًّا — وكلاهما يصل إلى الجهة الداعمة كما هو.</p></div>\n'
    '            <div class="step"><span class="step__n">٠٣</span><h3>اطلب عرضًا</h3>'
    '<p>أخبرنا بعدد المقاعد والرُّبع المطلوب. وتُتَّفق شروط المجموعات والدفعات المغلقة مع الكلية، لا معنا.</p></div>\n'
    '          </div>\n'
    '          <div class="ledger-foot"><a class="btn btn--solid" href="contact.html#teams">اطلب عرضًا</a></div>',
    cid="teams")


COURSES = {}
COURSES["en"] = """
    <section class="chapter">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§02</span>
          <h2 class="chap-title">The index<span class="alt-run" lang="ar">الفهرس</span></h2>
          <p class="chap-note">Sort by the axis you compare on: date, fee, teaching days or school.</p>
        </div>

        <div class="count-hero">
          <span class="count-hero__n num" data-results-count>—</span>
          <span class="count-hero__l" data-results-label>programmes match.</span>
        </div>

        <div class="cat">
          <form class="facets" data-facets aria-label="Filters">
            <div data-facet-body></div>
            <button class="btn btn--solid facets__done" type="button" data-facets-close>Show results</button>
          </form>

          <div>
            <div class="toolbar">
              <div class="search">
                <label class="sr-only" for="q">Search the index</label>
                <input id="q" type="search" data-search placeholder="Programme, school or city">
              </div>
              <div class="sortgrp" data-sort role="group" aria-label="Sort"></div>
            </div>
            <div class="applied" data-applied></div>
            <div class="ledger" data-results></div>
            <div class="ledger-foot">
              <button class="btn btn--ghost" type="button" data-more hidden></button>
              <span class="lbl">— not recorded</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="filters-bar">
      <button class="ctl" type="button" data-facets-open>Filters</button>
      <span class="lbl" data-bar-count role="status"></span>
    </div>
"""

COURSES["ar"] = """
    <section class="chapter">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§02</span>
          <h2 class="chap-title">الفهرس<span class="alt-run" lang="en">The index</span></h2>
          <p class="chap-note">رتّب حسب المحور الذي تقارن به: التاريخ أو الرسوم أو أيام التدريس أو الكلية.</p>
        </div>

        <div class="count-hero">
          <span class="count-hero__n num" data-results-count>—</span>
          <span class="count-hero__l" data-results-label>برنامجًا مطابقًا.</span>
        </div>

        <div class="cat">
          <form class="facets" data-facets aria-label="أدوات التصفية">
            <div data-facet-body></div>
            <button class="btn btn--solid facets__done" type="button" data-facets-close>اعرض النتائج</button>
          </form>

          <div>
            <div class="toolbar">
              <div class="search">
                <label class="sr-only" for="q">ابحث في الفهرس</label>
                <input id="q" type="search" data-search placeholder="برنامج أو كلية أو مدينة">
              </div>
              <div class="sortgrp" data-sort role="group" aria-label="الترتيب"></div>
            </div>
            <div class="applied" data-applied></div>
            <div class="ledger" data-results></div>
            <div class="ledger-foot">
              <button class="btn btn--ghost" type="button" data-more hidden></button>
              <span class="lbl">— غير مسجّل</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="filters-bar">
      <button class="ctl" type="button" data-facets-open>التصفية</button>
      <span class="lbl" data-bar-count role="status"></span>
    </div>
"""

COURSE = {}
for _l, _idx, _sch, _prog in (("en", "Index", "School", "Programme"), ("ar", "الفهرس", "الكلية", "البرنامج")):
    COURSE[_l] = """
    <div class="sheet">
      <nav class="crumb lbl" aria-label="%s">
        <a href="courses.html">%s</a>
        <span aria-hidden="true">/</span>
        <span data-crumb-school>%s</span>
      </nav>
    </div>
    <div class="sheet" data-record></div>
""" % (_idx, _idx, _sch)

SCHOOLS = {}
SCHOOLS["en"] = """
    <section class="chapter">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§03</span>
          <h2 class="chap-title">The schools<span class="alt-run" lang="ar">الكليات</span></h2>
          <p class="chap-note">Sortable by name, country or number of programmes in the index.</p>
        </div>
        <div class="chap-body">
          <div class="toolbar"><div class="sortgrp" data-school-sort role="group" aria-label="Sort"></div></div>
          <div data-schools></div>
        </div>
      </div>
    </section>
"""
SCHOOLS["ar"] = """
    <section class="chapter">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§03</span>
          <h2 class="chap-title">الكليات<span class="alt-run" lang="en">The schools</span></h2>
          <p class="chap-note">يمكن ترتيبها بالاسم أو الدولة أو عدد البرامج في الفهرس.</p>
        </div>
        <div class="chap-body">
          <div class="toolbar"><div class="sortgrp" data-school-sort role="group" aria-label="الترتيب"></div></div>
          <div data-schools></div>
        </div>
      </div>
    </section>
"""

SCHOOL = {}
for _l, _idx, _s in (("en", "Index", "Schools"), ("ar", "الفهرس", "الكليات")):
    SCHOOL[_l] = """
    <div class="sheet">
      <nav class="crumb lbl" aria-label="%s">
        <a href="schools.html">%s</a>
        <span aria-hidden="true">/</span>
        <span data-crumb-school>—</span>
      </nav>
    </div>
    <div class="sheet" data-school-detail></div>
""" % (_idx, _s)

LISTS = {}
LISTS["en"] = """
    <section class="chapter">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§04</span>
          <h2 class="chap-title">Sets<span class="alt-run" lang="ar">المجموعات</span></h2>
          <p class="chap-note">Editorial cuts of the index. Each states who selected it and on what basis — they are selections, not rankings.</p>
        </div>
        <div class="chap-body"><div data-lists></div></div>
      </div>
    </section>
"""
LISTS["ar"] = """
    <section class="chapter">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§04</span>
          <h2 class="chap-title">المجموعات<span class="alt-run" lang="en">Sets</span></h2>
          <p class="chap-note">مقاطع تحريرية من الفهرس. تذكر كل مجموعة من اختارها وعلى أي أساس — فهي اختيارات لا تصنيفات.</p>
        </div>
        <div class="chap-body"><div data-lists></div></div>
      </div>
    </section>
"""

LIST = {}
for _l, _idx, _s in (("en", "Index", "Sets"), ("ar", "الفهرس", "المجموعات")):
    LIST[_l] = """
    <div class="sheet">
      <nav class="crumb lbl" aria-label="%s">
        <a href="lists.html">%s</a>
        <span aria-hidden="true">/</span>
        <span data-crumb-list>—</span>
      </nav>
    </div>
    <div class="sheet" data-list-detail></div>
""" % (_idx, _s)

ABOUT = {}
ABOUT["en"] = """
    <section class="chapter">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§05</span>
          <h2 class="chap-title">Method<span class="alt-run" lang="ar">المنهج</span></h2>
          <p class="chap-note">What this index is, where every figure comes from, and what it refuses to do.</p>
        </div>
        <div class="chap-body">
          <p class="creed">An index that fills its own gaps is not an index.</p>

          <div class="facts" style="margin-block-start:var(--sp-7)">
            <div class="facts__r"><span class="lbl">What it is</span><div class="facts__v">
              An independent, bilingual index of open-enrolment executive programmes from the
              world's business schools, built in Riyadh. It does not teach, it does not award
              certificates, and it does not enrol on a school's behalf.</div></div>
            <div class="facts__r"><span class="lbl">Where the data comes from</span><div class="facts__v">
              From each school's own published programme pages. Titles, dates, teaching days,
              format, language of instruction and fees are recorded as stated. Descriptions and
              marketing copy are never reproduced.</div></div>
            <div class="facts__r"><span class="lbl">Fees</span><div class="facts__v">
              Printed in the school's own currency, exactly as published. An indicative riyal
              figure is printed beside it with the date of the rate used. That line is an
              indication for a budget, not a quote.</div></div>
            <div class="facts__r"><span class="lbl">What is missing</span><div class="facts__v">
              Ratings, reviews, "what you will learn" and "who should attend" are absent because
              a factual record cannot supply them. They print as an em dash rather than as an
              invention.</div></div>
            <div class="facts__r"><span class="lbl">Order</span><div class="facts__v">
              No rankings, no featured slots, no paid placement. Sets are editorial selections and
              say so.</div></div>
            <div class="facts__r"><span class="lbl">Privacy</span><div class="facts__v">
              No tracking script and no analytics. A shortlist is held in your own browser and
              never leaves the device.</div></div>
          </div>

          <div class="alt-block">
            <span class="alt-run" lang="ar">مسار فهرس مستقل: لا يُدرّس ولا يمنح شهادات.</span>
          </div>
        </div>
      </div>
    </section>
"""
ABOUT["ar"] = """
    <section class="chapter">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§05</span>
          <h2 class="chap-title">المنهج<span class="alt-run" lang="en">Method</span></h2>
          <p class="chap-note">ما هذا الفهرس، ومن أين يأتي كل رقم فيه، وما الذي يرفض أن يفعله.</p>
        </div>
        <div class="chap-body">
          <p class="creed">الفهرس الذي يملأ فجواته بنفسه ليس فهرسًا.</p>

          <div class="facts" style="margin-block-start:var(--sp-7)">
            <div class="facts__r"><span class="lbl">ما هو</span><div class="facts__v">
              فهرس مستقل ثنائي اللغة للبرامج التنفيذية مفتوحة التسجيل من كليات الأعمال حول العالم،
              بُني في الرياض. لا يُدرّس، ولا يمنح شهادات، ولا يسجّل نيابةً عن أي كلية.</div></div>
            <div class="facts__r"><span class="lbl">من أين تأتي البيانات</span><div class="facts__v">
              من صفحات البرامج التي تنشرها كل كلية. تُسجَّل العناوين والتواريخ وأيام التدريس ونمط
              الدراسة ولغة التدريس والرسوم كما وردت. ولا يُعاد إنتاج أي وصف أو نص تسويقي.</div></div>
            <div class="facts__r"><span class="lbl">الرسوم</span><div class="facts__v">
              تُطبَع بعملة الكلية كما نُشرت تمامًا، ويُطبَع إلى جانبها مبلغ استرشادي بالريال مع
              تاريخ سعر الصرف المستخدم. هذا السطر إشارة لميزانية، لا عرض سعر.</div></div>
            <div class="facts__r"><span class="lbl">ما الذي ينقص</span><div class="facts__v">
              لا تقييمات ولا مراجعات ولا «ماذا ستتعلّم» ولا «لمن هذا البرنامج»، لأن السجل الواقعي
              لا يوفّرها. وتُطبَع شَرطة مكانها بدل أن تُختلَق.</div></div>
            <div class="facts__r"><span class="lbl">الترتيب</span><div class="facts__v">
              لا تصنيفات ولا مواضع مميّزة ولا إدراج مدفوع. والمجموعات اختيارات تحريرية تقول ذلك صراحة.</div></div>
            <div class="facts__r"><span class="lbl">الخصوصية</span><div class="facts__v">
              لا برامج تتبّع ولا تحليلات. وتُحفَظ القائمة المختارة في متصفّحك ولا تغادر جهازك.</div></div>
          </div>

          <div class="alt-block">
            <span class="alt-run" lang="en">Masar is an independent index. It does not teach and it does not certify.</span>
          </div>
        </div>
      </div>
    </section>
"""

CONTACT = {}


def contact_body(lang):
    is_ar = lang == "ar"
    endpoint = SITE["form_endpoint"]
    wa = wa_button(lang)

    if endpoint:
        status = ("<strong>Thank you.</strong> Your enquiry has been sent. We answer in Riyadh hours, Sunday to Thursday."
                  if not is_ar else
                  "<strong>شكرًا لك.</strong> وصلنا استفسارك. نردّ بتوقيت الرياض، من الأحد إلى الخميس.")
    elif SITE["email"]:
        status = ("<strong>Almost there.</strong> Your email app should now open with the enquiry drafted — send it to finish."
                  if not is_ar else
                  "<strong>خطوة أخيرة.</strong> سيفتح تطبيق البريد الآن وبه الاستفسار جاهزًا — أرسله لإتمام الطلب.")
    else:
        status = ("<strong>This form is not connected yet.</strong> The record below shows every channel we have published so far."
                  if not is_ar else
                  "<strong>لم يُربط هذا النموذج بعد.</strong> يعرض السجل أدناه كل قناة نشرناها حتى الآن.")

    action = ' action="%s" method="post" data-endpoint' % endpoint if endpoint else (
        ' data-mailto="%s"' % SITE["email"] if SITE["email"] else "")

    rows = []
    channels = [
        ("WhatsApp" if not is_ar else "واتساب",
         "The fastest way to reach us. Ask about an intake, a fee or a group booking."
         if not is_ar else "أسرع طريقة للوصول إلينا. اسأل عن دفعة أو رسوم أو حجز جماعي.",
         wa),
        ("Corporate desk" if not is_ar else "مكتب المنشآت",
         "Seats for a team, or a closed cohort built around your calendar."
         if not is_ar else "مقاعد لفريق، أو دفعة مغلقة تُبنى حول تقويم منشأتك.",
         '<a class="btn btn--ghost" href="#teams-form">%s</a>' % ("Request a proposal" if not is_ar else "اطلب عرضًا")),
        ("A correction" if not is_ar else "تصحيح",
         "A fee, a date or a name we have recorded wrongly. Corrections are made the same week."
         if not is_ar else "رسم أو تاريخ أو اسم سجّلناه خطأً. تُصحَّح الملاحظات في الأسبوع نفسه.",
         ('<a class="btn btn--ghost" href="mailto:%s">%s</a>' % (SITE["email"], "Write to us" if not is_ar else "راسلنا"))
         if SITE["email"] else '<span class="dash" aria-hidden="true">—</span>'),
    ]
    for h, p, act in channels:
        rows.append(
            '          <div class="contact-row">\n'
            '            <h3>{h}</h3>\n            <p>{p}</p>\n            <div>{act}</div>\n'
            '          </div>'.format(h=h, p=p, act=act or '<span class="dash" aria-hidden="true">—</span>'))

    labels = {
        "name": ("Your name", "الاسم"), "org": ("Organisation", "المنشأة"),
        "phone": ("Mobile", "الجوال"), "email": ("Email", "البريد الإلكتروني"),
        "prog": ("Programme", "البرنامج"), "seats": ("Seats", "عدد المقاعد"),
        "reply": ("Reply in", "لغة الردّ"), "msg": ("Your question", "سؤالك"),
        "send": ("Send enquiry", "أرسل الاستفسار"),
        "hours": ("Answered in Riyadh hours, Sunday to Thursday.",
                  "نردّ بتوقيت الرياض، من الأحد إلى الخميس."),
    }
    L = (lambda k: labels[k][1 if is_ar else 0])

    return """
    <section class="chapter">
      <div class="sheet">
        <div class="chap-head">
          <span class="chap-num">§06</span>
          <h2 class="chap-title">{title}<span class="alt-run" lang="{alt}">{altt}</span></h2>
          <p class="chap-note">{note}</p>
        </div>
        <div class="chap-body">
{rows}

          <div id="teams" class="chap-head" style="padding-block-end:0">
            <span class="chap-num">§06.1</span>
            <h2 class="chap-title" style="font-size:var(--fs-600)">{teams}</h2>
            <p class="chap-note">{teamsnote}</p>
          </div>

          <form id="teams-form" class="form" data-contact-form novalidate{action} style="margin-block-start:var(--sp-5)">
            <div class="fld"><label for="name">{name}</label><input id="name" name="name" type="text" autocomplete="name" required></div>
            <div class="fld"><label for="org">{org}</label><input id="org" name="organisation" type="text" autocomplete="organization"></div>
            <div class="fld"><label for="phone">{phone}</label><input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr" placeholder="+966"></div>
            <div class="fld"><label for="email">{email}</label><input id="email" name="email" type="email" autocomplete="email" required></div>
            <div class="fld fld--wide"><label for="course">{prog}</label><select id="course" name="course" data-course-select></select></div>
            <div class="fld"><label for="seats">{seats}</label><input id="seats" name="seats" type="number" min="1" step="1" value="1" dir="ltr"></div>
            <div class="fld"><label for="reply">{reply}</label><select id="reply" name="reply_language">{opts}</select></div>
            <div class="fld fld--wide"><label for="message">{msg}</label><textarea id="message" name="message" required></textarea></div>
            <div class="fld fld--wide">
              <button class="btn btn--solid" type="submit" style="justify-self:start">{send}</button>
              <p class="note" data-form-status tabindex="-1" hidden><span>{status}</span></p>
              <p class="note">{hours}</p>
            </div>
          </form>

          <div class="chap-head" style="padding-block-end:0;margin-block-start:var(--sp-7)">
            <span class="chap-num">§06.2</span>
            <h2 class="chap-title" style="font-size:var(--fs-600)">{recordh}</h2>
            <p class="chap-note">{recordnote}</p>
          </div>
{record}
        </div>
      </div>
    </section>
""".format(
        title="Contact" if not is_ar else "التواصل",
        alt="ar" if not is_ar else "en",
        altt="التواصل" if not is_ar else "Contact",
        note=("Three ways in. A channel we have not published yet prints as a dash, like every "
              "other unrecorded field in this index."
              if not is_ar else
              "ثلاث طرق للوصول. والقناة التي لم ننشرها بعد تُطبَع شَرطة، كأي حقل غير مسجّل في هذا الفهرس."),
        rows="\n".join(rows),
        teams="Enrolling a team" if not is_ar else "تسجيل فريق",
        teamsnote=("Masar does not enrol on a school's behalf; the contract, the classroom and the "
                   "certificate stay with the school."
                   if not is_ar else
                   "لا يسجّل «مسار» نيابةً عن أي كلية؛ فالعقد والقاعة والشهادة تبقى لدى الكلية."),
        action=action,
        name=L("name"), org=L("org"), phone=L("phone"), email=L("email"),
        prog=L("prog"), seats=L("seats"), reply=L("reply"), msg=L("msg"), send=L("send"),
        opts=('<option value="en">English</option><option value="ar">العربية</option>' if not is_ar
              else '<option value="ar">العربية</option><option value="en">English</option>'),
        status=status, hours=L("hours"),
        recordh="The record" if not is_ar else "السجل",
        recordnote=("Who is behind this index. Every line is printed whether or not we have filled it in."
                    if not is_ar else
                    "من يقف خلف هذا الفهرس. كل سطر مطبوع، سواء ملأناه أم لم نملأه بعد."),
        record=record_block(lang),
    )


PAGES = [
    {"file": "index.html", "body": HOME,
     "title": {"en": "Masar — an independent index of executive programmes",
               "ar": "مسار — فهرس مستقل للبرامج التنفيذية"},
     "desc": {"en": "The fee, the city and the dates for open-enrolment executive programmes from "
                    "MIT Sloan, IMD, Kellogg, Harvard Kennedy School and more. No rankings, no paid placement.",
              "ar": "الرسوم والمدينة والتواريخ للبرامج التنفيذية مفتوحة التسجيل من إم آي تي سلون وآي إم دي "
                    "وكيلوغ وكلية كينيدي في هارفارد وغيرها. بلا تصنيفات وبلا إدراج مدفوع."}},
    {"file": "courses.html", "body": COURSES,
     "title": {"en": "The index | Masar", "ar": "الفهرس | مسار"},
     "desc": {"en": "Filter executive programmes by field, format, city, month, teaching days and fee.",
              "ar": "صفِّ البرامج التنفيذية حسب الحقل ونمط الدراسة والمدينة والشهر وأيام التدريس والرسوم."}},
    {"file": "course.html", "body": COURSE,
     "title": {"en": "Programme | Masar", "ar": "البرنامج | مسار"},
     "desc": {"en": "The recorded facts for one executive programme: school, city, dates, teaching days and fee.",
              "ar": "الوقائع المسجّلة لبرنامج تنفيذي واحد: الكلية والمدينة والتواريخ وأيام التدريس والرسوم."}},
    {"file": "schools.html", "body": SCHOOLS,
     "title": {"en": "The schools | Masar", "ar": "الكليات | مسار"},
     "desc": {"en": "Every business school with programmes in the Masar index.",
              "ar": "كل كلية أعمال لها برامج في فهرس مسار."}},
    {"file": "school.html", "body": SCHOOL,
     "title": {"en": "School | Masar", "ar": "الكلية | مسار"},
     "desc": {"en": "A school and every programme it lists in the index.",
              "ar": "كلية وكل برامجها المدرجة في الفهرس."}},
    {"file": "lists.html", "body": LISTS,
     "title": {"en": "Sets | Masar", "ar": "المجموعات | مسار"},
     "desc": {"en": "Editorial cuts of the index, stated as selections rather than rankings.",
              "ar": "مقاطع تحريرية من الفهرس، موصوفة بأنها اختيارات لا تصنيفات."}},
    {"file": "list.html", "body": LIST,
     "title": {"en": "Set | Masar", "ar": "المجموعة | مسار"},
     "desc": {"en": "One editorial set of executive programmes.",
              "ar": "مجموعة تحريرية واحدة من البرامج التنفيذية."}},
    {"file": "about.html", "body": ABOUT,
     "title": {"en": "Method | Masar", "ar": "المنهج | مسار"},
     "desc": {"en": "What the index is, where every figure comes from, and what it refuses to do.",
              "ar": "ما هو الفهرس، ومن أين يأتي كل رقم فيه، وما الذي يرفض أن يفعله."}},
    {"file": "contact.html", "body": CONTACT,
     "title": {"en": "Contact | Masar", "ar": "التواصل | مسار"},
     "desc": {"en": "Ask about an intake, request a proposal for a team, or send a correction.",
              "ar": "اسأل عن دفعة، أو اطلب عرضًا لفريق، أو أرسل تصحيحًا."}},
]


def main():
    os.makedirs(os.path.join(HERE, "ar"), exist_ok=True)
    written, problems = [], []

    for page in PAGES:
        for lang in LOCALES:
            body = contact_body(lang) if page["body"] is CONTACT else page["body"][lang]
            html = shell(lang, page["file"], page["title"][lang], page["desc"][lang], body.rstrip("\n"))

            # No dead links and no bare wa.me may reach a shipped page.
            for bad, why in (('href="#"', 'a placeholder link'),
                             ('https://wa.me/"', 'a bare wa.me link')):
                if bad in html:
                    problems.append("{} ({}): {}".format(page["file"], lang, why))

            out = os.path.join(HERE, page["file"]) if lang == "en" \
                else os.path.join(HERE, "ar", page["file"])
            with open(out, "w", encoding="utf-8") as fh:
                fh.write(html)
            written.append(os.path.relpath(out, HERE))

    # Depth parity: the Arabic build must carry the same structure as the English.
    for page in PAGES:
        en = open(os.path.join(HERE, page["file"]), encoding="utf-8").read()
        ar = open(os.path.join(HERE, "ar", page["file"]), encoding="utf-8").read()
        for hook in set(re.findall(r'data-[a-z-]+', en)):
            if en.count(hook) != ar.count(hook):
                problems.append("{}: hook {} appears {}× in en, {}× in ar".format(
                    page["file"], hook, en.count(hook), ar.count(hook)))

    if problems:
        print("Build problems:", file=sys.stderr)
        for p in problems:
            print("  " + p, file=sys.stderr)
        sys.exit(1)

    print("Wrote {} pages.".format(len(written)))


if __name__ == "__main__":
    main()
