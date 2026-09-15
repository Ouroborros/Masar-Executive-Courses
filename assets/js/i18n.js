/* ==========================================================================
   Masar — locale runtime

   Every string the JS renders, in both languages, plus the formatters the
   ledger depends on: dual dating (Gregorian + Umm al-Qura), the fee lockup,
   Arabic number agreement, and the search normaliser. Locale comes from
   <html lang>, so nothing here needs configuring per page.
   ========================================================================== */

window.MASAR_I18N = (function () {
  const LANG = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const IS_RTL = LANG === 'ar';
  const AR = IS_RTL;

  const strings = {
    en: {
      'spec.starts': 'Starts',
      'spec.school': 'School',
      'spec.city': 'City',
      'spec.country': 'Country',
      'spec.days': 'Teaching days',
      'spec.fee': 'Fee',
      'spec.format': 'Format',
      'spec.language': 'Language of delivery',
      'spec.ends': 'Ends',
      'spec.subject': 'Field',
      'spec.programmes': 'Programmes',

      'sort.date': 'Date',
      'sort.fee': 'Fee',
      'sort.days': 'Days',
      'sort.school': 'School',
      'sort.name': 'Name',
      'sort.count': 'Programmes',

      'form.nocourse': 'Not decided yet',
      'facet.subject': 'Field',
      'facet.format': 'Format',
      'facet.city': 'City',
      'facet.country': 'Country',
      'facet.month': 'Month',
      'facet.days': 'Teaching days',
      'facet.fee': 'Fee band',
      'facet.language': 'Language of delivery',
      'facet.school': 'School',
      'facet.clear': 'Clear all',
      'facet.filters': 'Filters',
      'facet.show': 'Show results',
      'facet.remove': 'Remove filter',

      'days.1': '1–3 days',
      'days.2': '4–6 days',
      'days.3': '1–3 weeks',
      'days.4': '4 weeks or more',

      'results.match': 'programmes match.',
      'results.none': 'Nothing here matches that.',
      'results.noneBody': 'The full index holds {n} across {s} — a wider search will find them.',
      'results.widen': 'Clear the filters',
      'results.more': 'Show {n} more',
      'results.showing': 'Showing {a} of {b}',

      'card.save': 'Save',
      'card.saved': 'Saved',
      'card.saveA11y': 'Save {title} to your shortlist',
      'card.rowA11y': '{title} — {school}, {city}, starts {date}, {days}, {fee}',

      'shortlist.empty': 'Nothing saved yet. The heart on any row keeps it here.',
      'shortlist.remove': 'Remove',
      'shortlist.clear': 'Empty the shortlist',
      'shortlist.copy': 'Copy as text',
      'shortlist.copied': 'Copied',

      'fee.indicative': '≈ {sar} · indicative, rate of {date} · not a quote',
      'fee.published': 'as published',

      'rec.enrol': 'Enrol with the school.',
      'rec.enrolBody': 'Masar points you at the intake. The contract, the classroom and the certificate stay with the school.',
      'rec.proposal': 'Request a proposal',
      'rec.hours': 'Answered in Riyadh hours, Sunday to Thursday.',
      'rec.other': 'Other programmes at this school',
      'rec.similar': 'Other programmes in this field',
      'rec.notFound': 'No such programme in the index.',
      'rec.back': 'Back to the index',

      'school.notFound': 'No such school in the index.',
      'school.back': 'Back to the schools',
      'set.notFound': 'No such set in the index.',
      'set.back': 'Back to the sets',
      'set.basis': 'Selected by the editors on the basis stated here. A selection, not a ranking.',

      'hero.anyField': 'Any field',
      'hero.anyCity': 'Any city',
      'hero.anyMonth': 'Any month',
      'hero.see': 'See {n}',
      'hero.none': 'Nothing matches — widen it',

      'misc.online': 'Online',
      'misc.and': 'and',
      'currency.orig': 'Fees as published',
      'currency.sar': 'Fees in riyals',
      'theme.label': 'Ground',
    },
    ar: {
      'spec.starts': 'يبدأ',
      'spec.school': 'الكلية',
      'spec.city': 'المدينة',
      'spec.country': 'الدولة',
      'spec.days': 'أيام التدريس',
      'spec.fee': 'الرسوم',
      'spec.format': 'نمط الدراسة',
      'spec.language': 'لغة التدريس',
      'spec.ends': 'ينتهي',
      'spec.subject': 'الحقل',
      'spec.programmes': 'البرامج',

      'sort.date': 'التاريخ',
      'sort.fee': 'الرسوم',
      'sort.days': 'الأيام',
      'sort.school': 'الكلية',
      'sort.name': 'الاسم',
      'sort.count': 'عدد البرامج',

      'form.nocourse': 'لم أُحدِّد بعد',
      'facet.subject': 'الحقل',
      'facet.format': 'نمط الدراسة',
      'facet.city': 'المدينة',
      'facet.country': 'الدولة',
      'facet.month': 'الشهر',
      'facet.days': 'أيام التدريس',
      'facet.fee': 'شريحة الرسوم',
      'facet.language': 'لغة التدريس',
      'facet.school': 'الكلية',
      'facet.clear': 'امسح الكل',
      'facet.filters': 'التصفية',
      'facet.show': 'اعرض النتائج',
      'facet.remove': 'أزل المرشّح',

      'days.1': '١–٣ أيام',
      'days.2': '٤–٦ أيام',
      'days.3': 'أسبوع إلى ٣ أسابيع',
      'days.4': '٤ أسابيع فأكثر',

      'results.match': 'مطابقة للبحث.',
      'results.none': 'لا شيء هنا يطابق ذلك.',
      'results.noneBody': 'يضمّ الفهرس كاملًا {n} من {s} — وبحث أوسع سيجدها.',
      'results.widen': 'امسح المرشّحات',
      'results.more': 'اعرض {n} إضافية',
      'results.showing': 'معروض {a} من {b}',

      'card.save': 'احفظ',
      'card.saved': 'محفوظ',
      'card.saveA11y': 'احفظ {title} في قائمتك',
      'card.rowA11y': '{title} — {school}، {city}، يبدأ {date}، {days}، {fee}',

      'shortlist.empty': 'لم تحفظ شيئًا بعد. زرّ الحفظ في أي سطر يبقيه هنا.',
      'shortlist.remove': 'أزل',
      'shortlist.clear': 'أفرغ القائمة',
      'shortlist.copy': 'انسخ نصًّا',
      'shortlist.copied': 'نُسخ',

      'fee.indicative': '≈ {sar} · استرشادي، بسعر {date} · ليس عرض سعر',
      'fee.published': 'كما نُشرت',

      'rec.enrol': 'سجّل لدى الكلية.',
      'rec.enrolBody': 'يدلّك «مسار» على الدفعة. أما العقد والقاعة والشهادة فتبقى لدى الكلية.',
      'rec.proposal': 'اطلب عرضًا',
      'rec.hours': 'نردّ بتوقيت الرياض، من الأحد إلى الخميس.',
      'rec.other': 'برامج أخرى في هذه الكلية',
      'rec.similar': 'برامج أخرى في هذا الحقل',
      'rec.notFound': 'لا يوجد برنامج بهذا الاسم في الفهرس.',
      'rec.back': 'العودة إلى الفهرس',

      'school.notFound': 'لا توجد كلية بهذا الاسم في الفهرس.',
      'school.back': 'العودة إلى الكليات',
      'set.notFound': 'لا توجد مجموعة بهذا الاسم في الفهرس.',
      'set.back': 'العودة إلى المجموعات',
      'set.basis': 'اختارها فريق التحرير على الأساس المذكور هنا. اختيار، لا تصنيف.',

      'hero.anyField': 'كل الحقول',
      'hero.anyCity': 'كل المدن',
      'hero.anyMonth': 'كل الأشهر',
      'hero.see': 'اعرض {n}',
      'hero.none': 'لا شيء يطابق — وسّع البحث',

      'misc.online': 'عن بُعد',
      'misc.and': 'و',
      'currency.orig': 'الرسوم كما نُشرت',
      'currency.sar': 'الرسوم بالريال',
      'theme.label': 'الخلفية',
    }
  };

  function t(key, vars) {
    let out = (strings[LANG] && strings[LANG][key]) || strings.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { out = out.replace('{' + k + '}', vars[k]); });
    return out;
  }

  function pick(pair) {
    if (pair == null) return '';
    if (typeof pair === 'string') return pair;
    return pair[LANG] != null && pair[LANG] !== '' ? pair[LANG] : pair.en;
  }

  const numLocale = AR ? 'ar-u-nu-latn' : 'en';

  function num(n) {
    try { return new Intl.NumberFormat(numLocale).format(n); } catch (e) { return String(n); }
  }

  /* --- Arabic number agreement ------------------------------------------- */
  /* 1 → singular, 2 → dual, 3–10 → plural, 11+ → singular accusative. */
  function agree(n, forms) {
    if (!AR) return n === 1 ? '1 ' + forms.en1 : num(n) + ' ' + forms.en;
    if (n === 0) return forms.zero;
    if (n === 1) return forms.one;
    if (n === 2) return forms.two;
    if (n <= 10) return num(n) + ' ' + forms.few;
    return num(n) + ' ' + forms.many;
  }

  const programmeCount = (n) => agree(n, {
    en1: 'programme', en: 'programmes',
    zero: 'لا برامج', one: 'برنامج واحد', two: 'برنامجان', few: 'برامج', many: 'برنامجًا'
  });
  const schoolCount = (n) => agree(n, {
    en1: 'school', en: 'schools',
    zero: 'لا كليات', one: 'كلية واحدة', two: 'كليتان', few: 'كليات', many: 'كلية'
  });
  const intakeCount = (n) => agree(n, {
    en1: 'intake', en: 'intakes',
    zero: 'لا دفعات', one: 'دفعة واحدة', two: 'دفعتان', few: 'دفعات', many: 'دفعةً'
  });
  const dayCount = (n) => agree(n, {
    en1: 'day', en: 'days',
    zero: 'لا أيام', one: 'يوم واحد', two: 'يومان', few: 'أيام', many: 'يومًا'
  });

  /* --- Dates -------------------------------------------------------------- */
  /* Anchored at midday UTC so a timezone never shifts the calendar day. */
  const at = (iso) => new Date(iso + 'T12:00:00Z');

  function fmt(iso, opts, locale) {
    try { return new Intl.DateTimeFormat(locale || numLocale, opts).format(at(iso)); }
    catch (e) { return iso; }
  }

  const shortDate = (iso) => fmt(iso, { day: 'numeric', month: 'short', year: 'numeric' });
  const longDate  = (iso) => fmt(iso, { day: 'numeric', month: 'long', year: 'numeric' });
  const dayNum    = (iso) => fmt(iso, { day: 'numeric' });
  const monthAbbr = (iso) => fmt(iso, { month: 'short' });
  const monthLabel = (iso) => fmt(iso, { month: 'long', year: 'numeric' });

  /* The Hijri date is rendered in Arabic script with هـ in BOTH locales — a
     Latin transliteration of an Umm al-Qura month is nobody's convention. */
  function hijri(iso) {
    try {
      return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn',
        { day: 'numeric', month: 'long', year: 'numeric' }).format(at(iso)) + 'هـ';
    } catch (e) { return ''; }
  }

  function todayISO() {
    const d = new Date();
    return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'),
            String(d.getDate()).padStart(2, '0')].join('-');
  }

  /* --- Money -------------------------------------------------------------- */
  const CURRENCY_KEY = 'masar-currency';

  function getCurrency() {
    try { return localStorage.getItem(CURRENCY_KEY) === 'sar' ? 'sar' : 'orig'; }
    catch (e) { return 'orig'; }
  }
  function setCurrency(v) {
    try { localStorage.setItem(CURRENCY_KEY, v === 'sar' ? 'sar' : 'orig'); } catch (e) {}
  }

  const fx = () => (window.MASAR_DATA && window.MASAR_DATA.fx) || { sarPerUsd: 3.75, usdPer: { USD: 1 }, asOf: '' };

  function toUsd(value, currency) {
    const r = fx().usdPer[currency || 'USD'];
    return value * (r == null ? 1 : r);
  }
  const toSar = (value, currency) => Math.round(toUsd(value, currency) * fx().sarPerUsd);

  /* Amount without a symbol — the currency code is set separately in the
     fee lockup, tracked, in the index track. */
  function amount(n) {
    try { return new Intl.NumberFormat(numLocale, { maximumFractionDigits: 0 }).format(n); }
    catch (e) { return String(n); }
  }

  /* The pair a fee is printed as: a primary figure and the line beneath it.
     Default keeps the school's own currency; the toggle promotes the riyal. */
  function fee(price, currency) {
    const code = currency || 'USD';
    const sar = toSar(price, code);
    if (getCurrency() === 'sar') {
      return { code: 'SAR', amount: amount(sar),
               sub: code + ' ' + amount(price) + ' · ' + t('fee.published') };
    }
    return { code: code, amount: amount(price),
             sub: t('fee.indicative', { sar: 'SAR ' + amount(sar), date: fxDate() }) };
  }

  function fxDate() {
    const a = fx().asOf;
    if (!a) return '';
    const parts = String(a).split('-');
    if (parts.length < 2) return a;
    try {
      return new Intl.DateTimeFormat(numLocale, { month: 'long', year: 'numeric' })
        .format(new Date(Date.UTC(+parts[0], +parts[1] - 1, 1)));
    } catch (e) { return a; }
  }

  /* A compact one-line fee, for the drawer and the mobile bar. */
  const feeLine = (price, currency) => {
    const f = fee(price, currency);
    return f.code + ' ' + f.amount;
  };

  /* --- Text --------------------------------------------------------------- */
  /* Arabic search has to survive alef and taa-marbuta variants on both the
     index and the query, or a search for لوزان misses لوزان. */
  function normalise(s) {
    return String(s || '').toLowerCase()
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[ً-ْـ]/g, '')
      .trim();
  }

  const collator = (() => {
    try { return new Intl.Collator(AR ? 'ar' : 'en', { sensitivity: 'base', numeric: true }); }
    catch (e) { return { compare: (a, b) => String(a).localeCompare(String(b)) }; }
  })();

  return {
    LANG, IS_RTL, t, pick, num,
    programmeCount, schoolCount, intakeCount, dayCount,
    shortDate, longDate, dayNum, monthAbbr, monthLabel, hijri, todayISO,
    getCurrency, setCurrency, toUsd, toSar, amount, fee, feeLine, fxDate,
    normalise, collator
  };
})();
