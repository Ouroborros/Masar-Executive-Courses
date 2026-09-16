/* ==========================================================================
   Masar — app.js

   The ledger, rendered. One component does most of the work: `.row`, a ruled
   hairline record whose date, teaching days and fee are set as numerals and
   are the page's only imagery. The same row serves the home ledger, the
   catalogue, a school's page and a set.

   Two rules govern everything below:
     1. The data never animates. Rows are ruled from the first paint; the
        reveal draws a heavier rule on top and disarms itself after 2.8s, so
        filtering and sorting never re-animate.
     2. Nothing is invented. An unrecorded field prints an em dash with a
        visually-hidden "not recorded", and a control with no destination is
        not rendered at all.
   ========================================================================== */
(function () {
  'use strict';

  const D = window.MASAR_DATA;
  const I = window.MASAR_I18N;
  const t = I.t, pick = I.pick;

  const byId = (arr) => arr.reduce((m, x) => (m[x.id] = x, m), {});
  const SCHOOL = byId(D.schools);
  const SUBJECT = byId(D.subjects);
  const FORMAT = byId(D.formats);
  const LANGUAGE = byId(D.languages);
  const COURSE = byId(D.courses);
  const LIST = byId(D.lists);

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const SEP = I.LANG === 'ar' ? '، ' : ', ';
  const schoolOf = (c) => SCHOOL[c.school] || {};
  const subjectLabel = (id) => pick(SUBJECT[id]);
  const formatLabel = (id) => pick(FORMAT[id]);
  const langLabel = (id) => pick(LANGUAGE[id]);

  /* An unrecorded value is printed, never dropped. */
  const DASH = '<span class="dash" aria-hidden="true">—</span><span class="sr-only">not recorded</span>';
  const val = (s) => (s ? esc(s) : DASH);

  function cityCountry(s) {
    const city = pick(s.city), country = pick(s.country);
    if (!city && !country) return '';
    if (!city) return country;
    if (!country || city === country) return city;
    return city + SEP + country;
  }
  const placeOf = (c) => (c.format === 'online' ? t('misc.online') : cityCountry(schoolOf(c)));

  /* --- The school's photograph -------------------------------------------- */
  /* Each school is shown by an openly licensed photograph of its own campus,
     fetched by tools/fetch-images.py and credited in assets/img/credits.json.
     Paths resolve against the asset base the builder stamps on <html>; the
     single-file bundle supplies the bytes as data URIs in window.__masarImg
     instead. A school without a photograph simply shows none. */
  const ASSETS = document.documentElement.getAttribute('data-assets') || 'assets/';
  const IMG = {
    's-agsm-university-of-new-south-wales': 'school-agsm',
    's-cbs-executive-copenhagen-business-scho': 'school-cbs',
    's-center-for-creative-leadership': 'school-ccl',
    's-harvard-kennedy-school': 'school-hks',
    's-imd-business-school': 'school-imd',
    's-kellogg-school-of-management': 'school-kellogg',
    's-mit-sloan-school-of-management': 'school-mit',
    's-michigan-ross-executive-education': 'school-ross',
    's-nus-business-school': 'school-nus',
    's-nyu-stern-school-of-business': 'school-stern',
    's-smith-school-of-business-queen-s-unive': 'school-smith',
    's-stanford-graduate-school-of-business': 'school-stanford',
    's-ubc-sauder-school-of-business': 'school-sauder',
    's-uc-berkeley-haas-school-of-business': 'school-haas',
    's-university-of-st-gallen-executive-scho': 'school-stgallen'
  };
  const CREDITS = window.MASAR_CREDITS || {};
  function imgSrc(key, small) {
    if (!key) return '';
    const name = key + (small ? '-s' : '') + '.jpg';
    if (window.__masarImg) return window.__masarImg[name] || window.__masarImg[key + '-s.jpg'] || '';
    return CREDITS[key] ? ASSETS + 'img/' + name : '';
  }
  function photo(s, opts) {
    opts = opts || {};
    const key = s && IMG[s.id];
    const src = imgSrc(key, opts.small);
    if (!src) return '';
    const big = opts.small ? '' : imgSrc(key, true);
    return '<span class="photo' + (opts.cls ? ' ' + opts.cls : '') + '">' +
      '<img src="' + src + '"' + (big ? ' srcset="' + big + ' 900w, ' + src + ' 1800w" sizes="' + (opts.sizes || '100vw') + '"' : '') +
      ' alt="" loading="' + (opts.eager ? 'eager' : 'lazy') + '" decoding="async"></span>';
  }
  function credit(s) {
    const c = s && CREDITS[IMG[s.id]];
    if (!c) return '';
    return '<figcaption class="credit">' + esc(t('img.credit')) + ' ' + esc(c.author || '—') +
      ' · <a href="' + esc(c.page) + '" rel="noopener">' + esc(c.licence) + '</a></figcaption>';
  }

  const ARROW = '<svg class="go" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M3 12h16M13 6l6 6-6 6"/></svg>';
  const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7"><path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6c0 5.8-8.5 11.3-8.5 11.3Z"/></svg>';

  /* --- Shortlist ---------------------------------------------------------- */
  const STORE = 'masar:shortlist';
  const Shortlist = {
    read() {
      try {
        const raw = JSON.parse(localStorage.getItem(STORE));
        return Array.isArray(raw) ? raw.filter((x) => typeof x === 'string') : [];
      } catch (e) { return []; }
    },
    write(ids) {
      try { localStorage.setItem(STORE, JSON.stringify(ids)); } catch (e) {}
      Shortlist.sync();
    },
    has(id) { return Shortlist.read().indexOf(id) !== -1; },
    toggle(id) {
      const ids = Shortlist.read(), i = ids.indexOf(id);
      if (i === -1) ids.push(id); else ids.splice(i, 1);
      Shortlist.write(ids);
    },
    clear() { Shortlist.write([]); },
    sync() {
      const ids = Shortlist.read();
      document.querySelectorAll('[data-shortlist-count]').forEach((el) => { el.textContent = I.num(ids.length); });
      document.querySelectorAll('.save[data-course]').forEach((b) => {
        const on = ids.indexOf(b.getAttribute('data-course')) !== -1;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.title = on ? t('card.saved') : t('card.save');
      });
      renderDrawer();
    }
  };

  function saveButton(c) {
    return '<button class="ctl save" type="button" data-course="' + c.id + '" aria-pressed="false" ' +
      'aria-label="' + esc(t('card.saveA11y', { title: pick(c.title) })) + '">' + HEART + '</button>';
  }

  /* --- The row ------------------------------------------------------------ */
  /* opts.i     stagger index (capped by the caller)
     opts.n     lot number shown in the index track
     opts.alt   print the opposite-language title (home page only)         */
  function row(c, opts) {
    opts = opts || {};
    const s = schoolOf(c);
    const f = I.fee(c.price, c.currency);
    const meta = [placeOf(c), formatLabel(c.format), subjectLabel(c.subject)].filter(Boolean);
    const label = t('card.rowA11y', {
      title: pick(c.title), school: pick(s.name), city: placeOf(c),
      date: I.longDate(c.start), days: I.dayCount(c.days), fee: f.code + ' ' + f.amount
    });
    const altTitle = I.LANG === 'ar' ? (c.title && c.title.en) : (c.title && c.title.ar);

    return '' +
      '<article class="row" data-reveal style="--i:' + (opts.i || 0) + '">' +
        '<span class="row__idx lbl" aria-hidden="true">' + (opts.n != null ? String(opts.n).padStart(2, '0') : '') + '</span>' +
        '<span class="row__date">' +
          '<span class="row__d num">' + esc(I.dayNum(c.start)) + '</span>' +
          '<span class="row__m lbl">' + esc(I.monthAbbr(c.start)) + '</span>' +
        '</span>' +
        '<div class="row__main">' +
          '<h3 class="row__t"><a href="course.html?id=' + c.id + '" aria-label="' + esc(label) + '">' +
            esc(pick(c.title)) + '</a></h3>' +
          (opts.alt && altTitle
            ? '<span class="row__alt alt-run" lang="' + (I.LANG === 'ar' ? 'en' : 'ar') + '" aria-hidden="true">' +
              esc(altTitle) + '</span>'
            : '') +
        '</div>' +
        (opts.thumb === false ? '' : photo(s, { small: true, cls: 'row__thumb' })) +
        '<div class="row__org" aria-hidden="true">' +
          '<span class="row__orgtxt">' +
            '<span class="row__school">' + val(pick(s.name)) + '</span>' +
            '<span class="row__meta lbl">' +
              meta.map((m, k) => (k === 0 && c.format === 'online'
                ? '<span class="online">' + esc(m) + '</span>' : esc(m))).join(' / ') +
            '</span>' +
          '</span>' +
        '</div>' +
        /* The printed columns repeat what the link's aria-label already says
           as one sentence, so they are hidden from the accessibility tree —
           but the save button is focusable and must stay out of that, or it
           would be a tab stop with no accessible name. */
        '<div class="row__foot">' +
          '<div class="row__days" aria-hidden="true">' +
            '<span class="lbl">' + esc(t('spec.days')) + '</span>' +
            '<span class="row__n num">' + esc(I.num(c.days)) + '</span>' +
          '</div>' +
          '<div class="row__fee" aria-hidden="true">' +
            '<span class="lbl">' + esc(t('spec.fee')) + ' · ' + esc(f.code) + '</span>' +
            '<span class="row__fee-n num">' + esc(f.amount) + '</span>' +
            '<span class="row__sar">' + esc(f.sub) + '</span>' +
          '</div>' +
          '<span class="row__go">' + saveButton(c) + ARROW + '</span>' +
        '</div>' +
      '</article>';
  }

  /* Rows grouped under a sticky start-date head. */
  function ledger(courses, opts) {
    opts = opts || {};
    const groups = [];
    courses.forEach((c) => {
      const last = groups[groups.length - 1];
      if (last && last.key === c.start) last.items.push(c);
      else groups.push({ key: c.start, items: [c] });
    });
    let n = 0;
    return groups.map((g) => {
      const head = '<div class="grp-head">' +
        '<span class="grp-head__g">' + esc(I.longDate(g.key)) + '</span>' +
        '<span class="grp-head__h" lang="ar">' + esc(I.hijri(g.key)) + '</span>' +
        '<span class="grp-head__c">' + esc(I.intakeCount(g.items.length)) + '</span>' +
        '</div>';
      const body = g.items.map((c) => row(c, { i: Math.min(n, 6), n: ++n, alt: opts.alt, thumb: opts.thumb })).join('');
      return head + body;
    }).join('');
  }

  /* --- Chrome ------------------------------------------------------------- */
  function initChrome() {
    /* The sticky offsets are measured, not assumed: Arabic nav labels are a
       different width, and the faces land after first paint. */
    const masthead = document.querySelector('.masthead');
    const nav = document.getElementById('chapnav');
    function measure() {
      if (masthead) document.documentElement.style.setProperty('--hdr-h', masthead.offsetHeight + 'px');
    }
    measure();
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

    const navBtn = document.querySelector('[data-nav-toggle]');
    if (navBtn && nav) {
      navBtn.addEventListener('click', function () {
        const open = nav.hasAttribute('data-open');
        if (open) nav.removeAttribute('data-open'); else nav.setAttribute('data-open', '');
        navBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    }

    /* Fees keep the school's currency by default; the toggle promotes the
       riyal and demotes the published figure to the line beneath. */
    const cur = document.querySelector('[data-currency]');
    if (cur) {
      const paint = () => {
        const sar = I.getCurrency() === 'sar';
        cur.textContent = sar ? t('currency.sar') : t('currency.orig');
        cur.setAttribute('aria-pressed', sar ? 'true' : 'false');
      };
      paint();
      const flip = function () {
        I.setCurrency(I.getCurrency() === 'sar' ? 'orig' : 'sar');
        location.reload();
      };
      cur.addEventListener('click', flip);
      /* The phone header has no room for it, so a twin lives in the panel. */
      const list = nav && nav.querySelector('ul');
      if (list) {
        const li = document.createElement('li');
        li.className = 'nav-currency';
        const twin = cur.cloneNode(true);
        twin.classList.add('currency-in-nav');
        twin.addEventListener('click', flip);
        li.appendChild(twin);
        list.appendChild(li);
      }
    }

    const theme = document.querySelector('[data-theme-toggle]');
    if (theme) {
      const read = () => { try { return localStorage.getItem('masar-theme') || 'system'; } catch (e) { return 'system'; } };
      const names = { system: I.LANG === 'ar' ? 'تلقائي' : 'System',
                      light:  I.LANG === 'ar' ? 'فاتحة' : 'Light',
                      dark:   I.LANG === 'ar' ? 'داكنة' : 'Dark' };
      const paint = () => { theme.textContent = t('theme.label') + ' · ' + names[read()]; };
      paint();
      theme.addEventListener('click', function () {
        const next = { system: 'light', light: 'dark', dark: 'system' }[read()];
        try {
          if (next === 'system') localStorage.removeItem('masar-theme');
          else localStorage.setItem('masar-theme', next);
        } catch (e) {}
        if (next === 'system') document.documentElement.removeAttribute('data-theme');
        else document.documentElement.setAttribute('data-theme', next);
        paint();
      });
    }

    /* Save buttons are delegated: rows are re-rendered constantly. */
    document.addEventListener('click', function (e) {
      const b = e.target.closest && e.target.closest('.save[data-course]');
      if (!b) return;
      e.preventDefault();
      Shortlist.toggle(b.getAttribute('data-course'));
    });

    initDrawer();
    document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

    const today = I.todayISO();
    document.querySelectorAll('[data-today]').forEach((el) => { el.textContent = I.longDate(today); });
    document.querySelectorAll('[data-today-hijri]').forEach((el) => { el.textContent = I.hijri(today); });

    Shortlist.sync();
  }

  function initDrawer() {
    const drawer = document.querySelector('[data-drawer]');
    const back = document.querySelector('[data-drawer-backdrop]');
    if (!drawer) return;
    const open = (on) => {
      if (on) { drawer.setAttribute('data-open', ''); back.setAttribute('data-open', ''); drawer.removeAttribute('inert'); drawer.setAttribute('aria-hidden', 'false'); }
      else { drawer.removeAttribute('data-open'); back.removeAttribute('data-open'); drawer.setAttribute('inert', ''); drawer.setAttribute('aria-hidden', 'true'); }
    };
    document.querySelectorAll('[data-drawer-open]').forEach((b) => b.addEventListener('click', () => open(true)));
    document.querySelectorAll('[data-drawer-close]').forEach((b) => b.addEventListener('click', () => open(false)));
    if (back) back.addEventListener('click', () => open(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') open(false); });

    const clear = document.querySelector('[data-shortlist-clear]');
    if (clear) { clear.textContent = t('shortlist.clear'); clear.addEventListener('click', () => Shortlist.clear()); }

    const copy = document.querySelector('[data-shortlist-copy]');
    if (copy) {
      copy.textContent = t('shortlist.copy');
      copy.addEventListener('click', function () {
        const text = Shortlist.read().map((id) => COURSE[id]).filter(Boolean).map((c) => {
          const f = I.fee(c.price, c.currency);
          return [pick(c.title), pick(schoolOf(c).name), I.longDate(c.start),
                  I.dayCount(c.days), f.code + ' ' + f.amount].join(' · ');
        }).join('\n');
        if (navigator.clipboard && text) {
          navigator.clipboard.writeText(text).then(() => {
            copy.textContent = t('shortlist.copied');
            setTimeout(() => { copy.textContent = t('shortlist.copy'); }, 1600);
          }).catch(() => {});
        }
      });
    }
  }

  function renderDrawer() {
    const body = document.querySelector('[data-drawer-body]');
    if (!body) return;
    const ids = Shortlist.read().filter((id) => COURSE[id]);
    if (!ids.length) {
      body.innerHTML = '<p class="note note--bare">' + esc(t('shortlist.empty')) + '</p>';
      return;
    }
    body.innerHTML = ids.map((id) => {
      const c = COURSE[id], f = I.fee(c.price, c.currency);
      return '<div class="school-row school-row--saved">' +
        '<div><a class="school-row__name" href="course.html?id=' + c.id + '">' +
          esc(pick(c.title)) + '</a>' +
        '<span class="row__meta lbl">' + esc(pick(schoolOf(c).name)) + ' / ' + esc(I.shortDate(c.start)) +
        ' / ' + esc(f.code + ' ' + f.amount) + '</span></div>' +
        '<button class="ctl" type="button" data-remove="' + c.id + '">' + esc(t('shortlist.remove')) + '</button>' +
        '</div>';
    }).join('');
    body.querySelectorAll('[data-remove]').forEach((b) =>
      b.addEventListener('click', () => Shortlist.toggle(b.getAttribute('data-remove'))));
  }

  /* --- Home --------------------------------------------------------------- */
  function initHome() {
    const fields = document.querySelector('[data-home-fields]');
    const led = document.querySelector('[data-home-ledger]');
    const schools = document.querySelector('[data-home-schools]');
    if (!fields && !led && !schools) return;

    const counts = {};
    D.courses.forEach((c) => { counts[c.subject] = (counts[c.subject] || 0) + 1; });

    if (fields) {
      fields.innerHTML = D.subjects.map(function (s, i) {
        const n = counts[s.id] || 0;
        const inner =
          '<span class="field__n" aria-hidden="true">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="field__name">' + esc(pick(s)) + '</span>' +
          '<span class="field__c">' + esc(I.num(n)) + '</span>' + ARROW;
        return n
          ? '<a class="field" href="courses.html?subject=' + s.id + '">' + inner + '</a>'
          : '<div class="field" aria-disabled="true">' + inner + '</div>';
      }).join('');
    }

    if (led) {
      const today = I.todayISO();
      const next = D.courses.filter((c) => c.start >= today)
        .sort((a, b) => a.start.localeCompare(b.start)).slice(0, 10);
      led.innerHTML = ledger(next, { alt: true });
    }

    const all = document.querySelector('[data-all-programmes]');
    if (all) all.textContent = all.textContent.replace(/\d+/, I.num(D.courses.length));

    const finder = document.querySelector('[data-home-finder]');
    if (finder) initFinder(finder);

    if (schools) {
      const list = D.schools.map((s) => ({ s: s, n: D.courses.filter((c) => c.school === s.id).length }))
        .filter((x) => x.n > 0)
        .sort((a, b) => b.n - a.n || I.collator.compare(pick(a.s.name), pick(b.s.name)));
      schools.innerHTML = '<div class="scards">' + list.map((x, i) => schoolCard(x.s, x.n, Math.min(i, 8))).join('') + '</div>';
    }

    document.querySelectorAll('[data-stat]').forEach(function (el) {
      const withCourses = D.schools.filter((s) => D.courses.some((c) => c.school === s.id));
      const v = {
        programmes: D.courses.length,
        schools: withCourses.length,
        countries: new Set(withCourses.map((s) => pick(s.country)).filter(Boolean)).size
      }[el.getAttribute('data-stat')];
      if (v != null) el.textContent = I.num(v);
    });
  }

  /* --- The hero is the filter --------------------------------------------- */
  /* Field · city · month, and a count that answers as you choose. The three
     axes are the catalogue's own facets under the same keys, so the button
     is a plain link into the index with the selection already applied. */
  function initFinder(box) {
    const sel = {
      subject: box.querySelector('[data-finder="subject"]'),
      city: box.querySelector('[data-finder="city"]'),
      month: box.querySelector('[data-finder="month"]')
    };
    const go = document.querySelector('[data-finder-go]');
    if (!sel.subject || !sel.city || !sel.month || !go) return;

    const cityOf = (c) => pick(schoolOf(c).city) || '';
    const monthOf = (c) => c.start.slice(0, 7);
    const months = [];
    D.courses.map(monthOf).sort().forEach((m) => { if (months.indexOf(m) === -1) months.push(m); });
    const cities = [];
    D.courses.map(cityOf).filter(Boolean).forEach((x) => { if (cities.indexOf(x) === -1) cities.push(x); });
    cities.sort(I.collator.compare);

    const DIM = {
      subject: { of: (c) => c.subject, any: 'hero.anyField',
                 opts: D.subjects.map((s) => ({ id: s.id, name: pick(s) })) },
      city:    { of: cityOf, any: 'hero.anyCity',
                 opts: cities.map((x) => ({ id: x, name: x })) },
      month:   { of: monthOf, any: 'hero.anyMonth',
                 opts: months.map((m) => ({ id: m, name: I.monthLabel(m + '-01') })) }
    };
    const KEYS = Object.keys(DIM);
    const state = { subject: '', city: '', month: '' };

    function matches(c, skip) {
      return KEYS.every((k) => k === skip || !state[k] || DIM[k].of(c) === state[k]);
    }

    function paint() {
      KEYS.forEach(function (k) {
        const d = DIM[k];
        sel[k].innerHTML = '<option value="">' + esc(t(d.any)) + '</option>' +
          d.opts.map(function (o) {
            const n = D.courses.filter((c) => matches(c, k) && d.of(c) === o.id).length;
            return '<option value="' + esc(o.id) + '"' +
              (o.id === state[k] ? ' selected' : '') + (n ? '' : ' disabled') + '>' +
              esc(o.name) + ' · ' + esc(I.num(n)) + '</option>';
          }).join('');
      });
      const n = D.courses.filter((c) => matches(c)).length;
      const p = new URLSearchParams();
      KEYS.forEach((k) => { if (state[k]) p.set(k, state[k]); });
      const qs = p.toString();
      go.setAttribute('href', 'courses.html' + (qs ? '?' + qs : ''));
      go.textContent = n ? t('hero.see', { n: I.programmeCount(n) }) : t('hero.none');
    }

    KEYS.forEach((k) => sel[k].addEventListener('change', function () {
      state[k] = sel[k].value; paint();
    }));
    paint();
  }

  function schoolCard(s, n, i) {
    const pic = photo(s, { small: true, cls: 'scard__photo', sizes: '(min-width: 1080px) 33vw, (min-width: 700px) 50vw, 100vw' }) ||
      '<span class="photo scard__photo photo--empty" aria-hidden="true"></span>';
    return '<article class="scard" data-reveal style="--i:' + i + '">' +
      pic +
      '<div class="scard__body">' +
        '<h3 class="scard__name"><a href="school.html?id=' + s.id + '">' + esc(pick(s.name)) + '</a></h3>' +
        '<span class="scard__meta">' + val(cityCountry(s)) + '</span>' +
        '<span class="scard__count"><span class="num">' + esc(I.num(n)) + '</span> ' +
          '<span class="lbl">' + esc(t('spec.programmes')) + '</span></span>' +
      '</div>' +
      '</article>';
  }

  /* --- Catalogue ---------------------------------------------------------- */
  const FEE_BANDS = [
    { id: 'a', max: 3000 }, { id: 'b', min: 3000, max: 6000 },
    { id: 'c', min: 6000, max: 12000 }, { id: 'd', min: 12000 }
  ];
  const DAY_BANDS = [
    { id: '1', lo: 1, hi: 3 }, { id: '2', lo: 4, hi: 6 },
    { id: '3', lo: 7, hi: 21 }, { id: '4', lo: 22, hi: 9999 }
  ];

  function initCatalogue() {
    const mount = document.querySelector('[data-results]');
    if (!mount) return;

    const params = new URLSearchParams(location.search);
    const state = {
      q: params.get('q') || '',
      sort: params.get('sort') || 'date',
      page: 1,
      f: {}
    };
    ['subject', 'format', 'city', 'country', 'month', 'days', 'fee', 'language', 'school']
      .forEach((k) => { state.f[k] = (params.get(k) || '').split(',').filter(Boolean); });

    const search = document.querySelector('[data-search]');
    if (search) search.value = state.q;

    /* Facet vocabulary, built from the data so it can never drift. */
    const months = [];
    D.courses.map((c) => c.start.slice(0, 7)).sort().forEach((m) => { if (months.indexOf(m) === -1) months.push(m); });

    const FACETS = [
      { key: 'subject', label: 'facet.subject',
        opts: () => D.subjects.map((s) => ({ id: s.id, name: pick(s) })),
        of: (c) => [c.subject] },
      { key: 'format', label: 'facet.format',
        opts: () => D.formats.map((f) => ({ id: f.id, name: pick(f) })),
        of: (c) => [c.format] },
      { key: 'city', label: 'facet.city',
        opts: () => uniq(D.courses.map((c) => pick(schoolOf(c).city)).filter(Boolean)).map((x) => ({ id: x, name: x })),
        of: (c) => [pick(schoolOf(c).city)].filter(Boolean) },
      { key: 'country', label: 'facet.country',
        opts: () => uniq(D.courses.map((c) => pick(schoolOf(c).country)).filter(Boolean)).map((x) => ({ id: x, name: x })),
        of: (c) => [pick(schoolOf(c).country)].filter(Boolean) },
      { key: 'month', label: 'facet.month',
        opts: () => months.map((m) => ({ id: m, name: I.monthLabel(m + '-01') })),
        of: (c) => [c.start.slice(0, 7)] },
      { key: 'days', label: 'facet.days',
        opts: () => DAY_BANDS.map((b) => ({ id: b.id, name: t('days.' + b.id) })),
        of: (c) => DAY_BANDS.filter((b) => c.days >= b.lo && c.days <= b.hi).map((b) => b.id) },
      { key: 'fee', label: 'facet.fee',
        opts: () => FEE_BANDS.map((b) => ({ id: b.id, name: feeBandName(b) })),
        of: (c) => {
          const u = I.toUsd(c.price, c.currency);
          return FEE_BANDS.filter((b) => (b.min == null || u >= b.min) && (b.max == null || u < b.max)).map((b) => b.id);
        } },
      { key: 'language', label: 'facet.language',
        opts: () => D.languages.map((l) => ({ id: l.id, name: pick(l) })),
        of: (c) => c.langs || [] },
      { key: 'school', label: 'facet.school',
        opts: () => D.schools.filter((s) => D.courses.some((c) => c.school === s.id))
          .map((s) => ({ id: s.id, name: pick(s.name) })),
        of: (c) => [c.school] }
    ];

    function uniq(a) { const o = []; a.forEach((x) => { if (o.indexOf(x) === -1) o.push(x); }); return o.sort(I.collator.compare); }
    function feeBandName(b) {
      const f = (n) => 'USD ' + I.amount(n);
      if (b.min == null) return (I.LANG === 'ar' ? 'أقل من ' : 'Under ') + f(b.max);
      if (b.max == null) return f(b.min) + (I.LANG === 'ar' ? ' فأكثر' : ' and over');
      return f(b.min) + ' – ' + f(b.max);
    }

    const haystack = {};
    D.courses.forEach((c) => {
      const s = schoolOf(c);
      haystack[c.id] = I.normalise([
        c.title && c.title.en, c.title && c.title.ar,
        s.name && s.name.en, s.name && s.name.ar,
        s.city && s.city.en, s.city && s.city.ar,
        s.country && s.country.en, s.country && s.country.ar,
        subjectLabel(c.subject)
      ].filter(Boolean).join(' '));
    });

    function matches(c, skip) {
      if (state.q) {
        const q = I.normalise(state.q);
        if (q && haystack[c.id].indexOf(q) === -1) return false;
      }
      for (let i = 0; i < FACETS.length; i++) {
        const f = FACETS[i];
        if (f.key === skip) continue;
        const sel = state.f[f.key];
        if (!sel.length) continue;
        const vals = f.of(c);
        if (!vals.some((v) => sel.indexOf(v) !== -1)) return false;
      }
      return true;
    }

    const SORTERS = {
      date:  (a, b) => a.start.localeCompare(b.start),
      fee:   (a, b) => I.toUsd(a.price, a.currency) - I.toUsd(b.price, b.currency),
      days:  (a, b) => a.days - b.days,
      school: (a, b) => I.collator.compare(pick(schoolOf(a).name), pick(schoolOf(b).name)) ||
                        a.start.localeCompare(b.start)
    };

    const sortBox = document.querySelector('[data-sort]');
    if (sortBox) {
      sortBox.innerHTML = ['date', 'fee', 'days', 'school'].map((k) =>
        '<button class="ctl" type="button" data-sortkey="' + k + '" aria-pressed="false">' +
        esc(t('sort.' + k)) + '</button>').join('');
      sortBox.querySelectorAll('[data-sortkey]').forEach((b) =>
        b.addEventListener('click', function () { state.sort = b.getAttribute('data-sortkey'); state.page = 1; update(); }));
    }

    function renderFacets() {
      const box = document.querySelector('[data-facet-body]');
      if (!box) return;
      box.innerHTML = FACETS.map(function (f) {
        const sel = state.f[f.key];
        const opts = f.opts().map(function (o) {
          const n = D.courses.filter((c) => matches(c, f.key) && f.of(c).indexOf(o.id) !== -1).length;
          const on = sel.indexOf(o.id) !== -1;
          const dis = n === 0 && !on;
          return '<label class="facet-opt"' + (dis ? ' aria-disabled="true"' : '') + '>' +
            '<input type="checkbox" data-facet="' + f.key + '" value="' + esc(o.id) + '"' +
              (on ? ' checked' : '') + (dis ? ' disabled' : '') + '>' +
            '<span>' + esc(o.name) + '</span><span class="c">' + esc(I.num(n)) + '</span></label>';
        }).join('');
        return '<fieldset class="facet"><legend>' + esc(t(f.label)) + '</legend>' + opts + '</fieldset>';
      }).join('');

      box.querySelectorAll('[data-facet]').forEach((input) =>
        input.addEventListener('change', function () {
          const k = input.getAttribute('data-facet'), v = input.value;
          const i = state.f[k].indexOf(v);
          if (input.checked && i === -1) state.f[k].push(v);
          if (!input.checked && i !== -1) state.f[k].splice(i, 1);
          state.page = 1;
          update();
        }));
    }

    function renderApplied(total) {
      const box = document.querySelector('[data-applied]');
      if (!box) return;
      const chips = [];
      FACETS.forEach((f) => state.f[f.key].forEach((v) => {
        const o = f.opts().filter((x) => x.id === v)[0];
        chips.push({ k: f.key, v: v, label: o ? o.name : v });
      }));
      if (state.q) chips.push({ k: 'q', v: '', label: '“' + state.q + '”' });
      box.innerHTML = chips.length
        ? chips.map((c) => '<span class="pill">' + esc(c.label) +
            '<button type="button" data-drop="' + c.k + '" data-val="' + esc(c.v) + '" ' +
            'aria-label="' + esc(t('facet.remove')) + '">×</button></span>').join('') +
          '<button class="ctl" type="button" data-clear>' + esc(t('facet.clear')) + '</button>'
        : '';
      box.querySelectorAll('[data-drop]').forEach((b) => b.addEventListener('click', function () {
        const k = b.getAttribute('data-drop');
        if (k === 'q') { state.q = ''; if (search) search.value = ''; }
        else state.f[k] = state.f[k].filter((x) => x !== b.getAttribute('data-val'));
        state.page = 1; update();
      }));
      const clr = box.querySelector('[data-clear]');
      if (clr) clr.addEventListener('click', function () {
        Object.keys(state.f).forEach((k) => { state.f[k] = []; });
        state.q = ''; if (search) search.value = '';
        state.page = 1; update();
      });
    }

    function syncUrl() {
      const p = new URLSearchParams();
      if (state.q) p.set('q', state.q);
      Object.keys(state.f).forEach((k) => { if (state.f[k].length) p.set(k, state.f[k].join(',')); });
      if (state.sort !== 'date') p.set('sort', state.sort);
      const qs = p.toString();
      history.replaceState(null, '', qs ? '?' + qs : location.pathname);
    }

    const PAGE = 24;
    function update() {
      const found = D.courses.filter((c) => matches(c)).sort(SORTERS[state.sort] || SORTERS.date);
      const shown = found.slice(0, state.page * PAGE);

      const countEl = document.querySelector('[data-results-count]');
      const labelEl = document.querySelector('[data-results-label]');
      if (countEl) countEl.textContent = I.num(found.length);
      if (labelEl) labelEl.textContent = t('results.match');
      const bar = document.querySelector('[data-bar-count]');
      if (bar) bar.textContent = I.programmeCount(found.length);

      if (!found.length) {
        mount.innerHTML = '<div class="empty"><h3>' + esc(t('results.none')) + '</h3><p>' +
          esc(t('results.noneBody', {
            n: I.programmeCount(D.courses.length),
            s: I.schoolCount(D.schools.filter((s) => D.courses.some((c) => c.school === s.id)).length)
          })) + '</p><button class="btn btn--solid" type="button" data-widen>' +
          esc(t('results.widen')) + '</button></div>';
        const w = mount.querySelector('[data-widen]');
        if (w) w.addEventListener('click', function () {
          Object.keys(state.f).forEach((k) => { state.f[k] = []; });
          state.q = ''; if (search) search.value = ''; state.page = 1; update();
        });
      } else {
        mount.innerHTML = state.sort === 'date'
          ? ledger(shown)
          : shown.map((c, i) => row(c, { i: Math.min(i, 6), n: i + 1 })).join('');
      }

      const more = document.querySelector('[data-more]');
      if (more) {
        const left = found.length - shown.length;
        more.hidden = left <= 0;
        more.textContent = t('results.more', { n: I.num(Math.min(left, PAGE)) });
      }

      if (sortBox) sortBox.querySelectorAll('[data-sortkey]').forEach((b) =>
        b.setAttribute('aria-pressed', b.getAttribute('data-sortkey') === state.sort ? 'true' : 'false'));

      renderFacets();
      renderApplied(found.length);
      syncUrl();
      Shortlist.sync();
      settle(mount);
    }

    const more = document.querySelector('[data-more]');
    if (more) more.addEventListener('click', function () { state.page += 1; update(); });

    if (search) {
      let timer = null;
      search.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () { state.q = search.value; state.page = 1; update(); }, 140);
      });
    }

    /* Mobile: the facet sheet. */
    const sheet = document.querySelector('[data-facets]');
    document.querySelectorAll('[data-facets-open]').forEach((b) =>
      b.addEventListener('click', () => sheet && sheet.setAttribute('data-open', '')));
    document.querySelectorAll('[data-facets-close]').forEach((b) =>
      b.addEventListener('click', () => sheet && sheet.removeAttribute('data-open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sheet) sheet.removeAttribute('data-open'); });

    update();
  }

  /* --- Programme record --------------------------------------------------- */
  function initRecord() {
    const mount = document.querySelector('[data-record]');
    if (!mount) return;
    const c = COURSE[new URLSearchParams(location.search).get('id')];

    if (!c) {
      mount.innerHTML = '<div class="empty"><h3>' + esc(t('rec.notFound')) + '</h3>' +
        '<p><a class="btn btn--ghost" href="courses.html">' + esc(t('rec.back')) + '</a></p></div>';
      return;
    }

    const s = schoolOf(c);
    const f = I.fee(c.price, c.currency);
    const altTitle = I.LANG === 'ar' ? (c.title && c.title.en) : (c.title && c.title.ar);
    document.title = pick(c.title) + ' — ' + pick(s.name) + ' | Masar';
    const crumb = document.querySelector('[data-crumb-school]');
    if (crumb) crumb.textContent = pick(s.name);

    const fact = (k, v, sub) => '<div class="facts__r"><span class="lbl">' + esc(k) + '</span>' +
      '<div class="facts__v">' + v + (sub ? '<span class="hijri" lang="ar">' + esc(sub) + '</span>' : '') + '</div></div>';

    const wa = SITE_WA ? '<a class="btn btn--solid btn--block" rel="noopener" href="https://wa.me/' + SITE_WA +
      '?text=' + encodeURIComponent(pick(c.title) + ' — ' + I.longDate(c.start)) + '">WhatsApp</a>' : '';

    mount.innerHTML = '' +
      '<div class="rec-head">' +
        '<a class="rec-head__school" href="school.html?id=' + s.id + '">' + esc(pick(s.name)) + '</a>' +
        '<h1>' + esc(pick(c.title)) + '</h1>' +
        (altTitle ? '<span class="rec-head__alt alt-run" lang="' + (I.LANG === 'ar' ? 'en' : 'ar') + '">' +
          esc(altTitle) + '</span>' : '') +
      '</div>' +
      '<div class="rec">' +
        '<div>' +
          '<div class="facts">' +
            fact(t('spec.school'), esc(pick(s.name))) +
            fact(t('spec.city'), val(placeOf(c))) +
            fact(t('spec.format'), esc(formatLabel(c.format))) +
            fact(t('spec.language'), esc((c.langs || []).map(langLabel).join(' / '))) +
            fact(t('spec.starts'), esc(I.longDate(c.start)), I.hijri(c.start)) +
            fact(t('spec.days'), esc(I.dayCount(c.days))) +
            fact(t('spec.subject'), esc(subjectLabel(c.subject))) +
          '</div>' +

          '<div class="fee-lockup">' +
            '<span class="fee-lockup__cur">' + esc(t('spec.fee')) + ' · ' + esc(f.code) + '</span>' +
            '<span class="fee-lockup__n num">' + esc(f.amount) + '</span>' +
            '<span class="fee-lockup__sar">' + esc(f.sub) + '</span>' +
          '</div>' +
        '</div>' +

        '<aside class="enquiry">' +
          (function () { const pic = photo(s, { small: true, cls: 'enquiry__photo' });
            return pic ? '<figure class="enquiry__fig">' + pic + credit(s) + '</figure>' : ''; })() +
          '<h2>' + esc(t('rec.enrol')) + '</h2>' +
          '<p>' + esc(t('rec.enrolBody')) + '</p>' +
          wa +
          '<a class="btn btn--ghost btn--block" href="contact.html?course=' + c.id + '#teams-form">' +
            esc(t('rec.proposal')) + '</a>' +
          '<button class="ctl save btn--block enquiry__save" type="button" data-course="' + c.id + '" ' +
            'aria-pressed="false">' + HEART + ' ' + esc(t('card.save')) + '</button>' +
          '<p>' + esc(t('rec.hours')) + '</p>' +
        '</aside>' +
      '</div>';

    const others = D.courses.filter((x) => x.id !== c.id && x.school === c.school)
      .sort((a, b) => a.start.localeCompare(b.start)).slice(0, 4);
    const similar = D.courses.filter((x) => x.id !== c.id && x.school !== c.school && x.subject === c.subject)
      .sort((a, b) => a.start.localeCompare(b.start)).slice(0, 4);
    let tail = '';
    if (others.length) tail += '<div class="mini"><h2>' + esc(t('rec.other')) + '</h2>' +
      others.map((x, i) => row(x, { i: Math.min(i, 6), n: i + 1 })).join('') + '</div>';
    if (similar.length) tail += '<div class="mini"><h2>' + esc(t('rec.similar')) + '</h2>' +
      similar.map((x, i) => row(x, { i: Math.min(i, 6), n: i + 1 })).join('') + '</div>';
    if (tail) mount.insertAdjacentHTML('beforeend', tail);

    /* The mobile action bar repeats the fee and the primary action. */
    const bar = document.createElement('div');
    bar.className = 'rec-bar';
    bar.innerHTML = '<span class="rec-bar__fee num">' + esc(f.code + ' ' + f.amount) + '</span>' +
      (SITE_WA
        ? '<a class="btn btn--solid" rel="noopener" href="https://wa.me/' + SITE_WA + '">WhatsApp</a>'
        : '<a class="btn btn--solid" href="contact.html?course=' + c.id + '#teams-form">' + esc(t('rec.proposal')) + '</a>');
    document.body.appendChild(bar);

    Shortlist.sync();
    settle(mount);
  }

  /* The builder writes the operator's WhatsApp number into the masthead when
     it is set; the record page reads it from there rather than duplicating it. */
  const SITE_WA = (function () {
    const a = document.querySelector('.tools a[href^="https://wa.me/"]');
    return a ? a.getAttribute('href').split('wa.me/')[1].split('?')[0] : '';
  })();

  /* --- Schools ------------------------------------------------------------ */
  function initSchools() {
    const mount = document.querySelector('[data-schools]');
    if (!mount) return;
    let sort = 'count';
    const box = document.querySelector('[data-school-sort]');
    if (box) {
      box.innerHTML = ['count', 'name', 'country'].map((k) =>
        '<button class="ctl" type="button" data-k="' + k + '" aria-pressed="false">' +
        esc(t(k === 'country' ? 'spec.country' : 'sort.' + k)) + '</button>').join('');
      box.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('click', function () {
        sort = b.getAttribute('data-k'); paint();
      }));
    }
    function paint() {
      const rows = D.schools.map((s) => ({ s: s, n: D.courses.filter((c) => c.school === s.id).length }))
        .filter((x) => x.n > 0);
      rows.sort((a, b) => sort === 'name' ? I.collator.compare(pick(a.s.name), pick(b.s.name))
        : sort === 'country' ? I.collator.compare(pick(a.s.country), pick(b.s.country))
        : b.n - a.n);
      mount.innerHTML = '<div class="scards">' + rows.map((x, i) => schoolCard(x.s, x.n, Math.min(i, 8))).join('') + '</div>';
      if (box) box.querySelectorAll('[data-k]').forEach((b) =>
        b.setAttribute('aria-pressed', b.getAttribute('data-k') === sort ? 'true' : 'false'));
      settle(mount);
    }
    paint();
  }

  function initSchoolDetail() {
    const mount = document.querySelector('[data-school-detail]');
    if (!mount) return;
    const s = SCHOOL[new URLSearchParams(location.search).get('id')];
    if (!s) {
      mount.innerHTML = '<div class="empty"><h3>' + esc(t('school.notFound')) + '</h3>' +
        '<p><a class="btn btn--ghost" href="schools.html">' + esc(t('school.back')) + '</a></p></div>';
      return;
    }
    document.title = pick(s.name) + ' | Masar';
    const crumb = document.querySelector('[data-crumb-school]');
    if (crumb) crumb.textContent = pick(s.name);

    const courses = D.courses.filter((c) => c.school === s.id).sort((a, b) => a.start.localeCompare(b.start));
    const pic = photo(s, { cls: 'hero-fig__photo', eager: true });
    mount.innerHTML =
      (pic ? '<figure class="hero-fig">' + pic + credit(s) + '</figure>' : '') +
      '<div class="chap-head">' +
        '<span class="chap-num num">' + esc(I.num(courses.length)) + '</span>' +
        '<h1 class="chap-title">' + esc(pick(s.name)) + '</h1>' +
        '<p class="chap-note">' + val(cityCountry(s)) + '</p>' +
      '</div>' +
      '<div class="ledger">' + ledger(courses, { thumb: false }) + '</div>';
    Shortlist.sync();
    settle(mount);
  }

  /* --- Sets --------------------------------------------------------------- */
  function initLists() {
    const mount = document.querySelector('[data-lists]');
    if (!mount) return;
    mount.innerHTML = D.lists.map(function (l, i) {
      const alt = I.LANG === 'ar' ? (l.title && l.title.en) : (l.title && l.title.ar);
      return '<article class="coll-row" data-reveal style="--i:' + Math.min(i, 6) + '">' +
        '<span class="school-row__n" aria-hidden="true">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<div><h3 class="coll-row__t"><a href="list.html?id=' + l.id + '">' + esc(pick(l.title)) + '</a></h3>' +
        (alt ? '<span class="row__alt alt-run" lang="' + (I.LANG === 'ar' ? 'en' : 'ar') + '">' + esc(alt) + '</span>' : '') +
        '<p class="coll-row__b">' + esc(pick(l.blurb)) + '</p></div>' +
        '<span class="coll-row__c"><span class="num">' + esc(I.num(l.courses.length)) + '</span>' +
        '<span class="lbl">' + esc(t('spec.programmes')) + '</span></span>' +
        '</article>';
    }).join('');
    settle(mount);
  }

  function initListDetail() {
    const mount = document.querySelector('[data-list-detail]');
    if (!mount) return;
    const l = LIST[new URLSearchParams(location.search).get('id')];
    if (!l) {
      mount.innerHTML = '<div class="empty"><h3>' + esc(t('set.notFound')) + '</h3>' +
        '<p><a class="btn btn--ghost" href="lists.html">' + esc(t('set.back')) + '</a></p></div>';
      return;
    }
    document.title = pick(l.title) + ' | Masar';
    const crumb = document.querySelector('[data-crumb-list]');
    if (crumb) crumb.textContent = pick(l.title);
    const courses = l.courses.map((id) => COURSE[id]).filter(Boolean)
      .sort((a, b) => a.start.localeCompare(b.start));
    mount.innerHTML =
      '<div class="chap-head">' +
        '<span class="chap-num num">' + esc(I.num(courses.length)) + '</span>' +
        '<h1 class="chap-title">' + esc(pick(l.title)) + '</h1>' +
        '<p class="chap-note">' + esc(pick(l.blurb)) + ' ' + esc(t('set.basis')) + '</p>' +
      '</div>' +
      '<div class="ledger">' + ledger(courses) + '</div>';
    Shortlist.sync();
    settle(mount);
  }

  /* --- Contact ------------------------------------------------------------ */
  function initContact() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;
    const sel = form.querySelector('[data-course-select]');
    if (sel) {
      const preset = new URLSearchParams(location.search).get('course');
      sel.innerHTML = '<option value="">' + esc(t('form.nocourse')) + '</option>' + D.courses.slice()
        .sort((a, b) => I.collator.compare(pick(a.title), pick(b.title)))
        .map((c) => '<option value="' + c.id + '"' + (c.id === preset ? ' selected' : '') + '>' +
          esc(pick(c.title)) + ' — ' + esc(pick(schoolOf(c).name)) + '</option>').join('');
    }
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) { e.preventDefault(); form.reportValidity(); return; }
      if (form.hasAttribute('data-endpoint')) return;
      e.preventDefault();
      const note = form.querySelector('[data-form-status]');
      const mailto = form.getAttribute('data-mailto');
      if (mailto) {
        const d = new FormData(form);
        const body = ['Name: ' + d.get('name'), 'Organisation: ' + (d.get('organisation') || '-'),
          'Mobile: ' + (d.get('phone') || '-'), 'Email: ' + d.get('email'),
          'Programme: ' + (sel && sel.selectedOptions[0] ? sel.selectedOptions[0].textContent : '-'),
          'Seats: ' + (d.get('seats') || '1'), 'Reply in: ' + d.get('reply_language'),
          '', d.get('message')].join('\n');
        location.href = 'mailto:' + mailto + '?subject=' + encodeURIComponent('Masar enquiry') +
          '&body=' + encodeURIComponent(body);
      }
      if (note) { note.hidden = false; note.focus(); }
    });
  }

  /* --- Motion ------------------------------------------------------------- */
  /* Blocks rise softly into place as they enter the viewport. A block the
     script never reaches is never hidden: the opacity rule only applies once
     the html root is marked .js, and the observer is the only thing that
     removes it. */
  let booted = false;
  let io = null;

  function arm(el) { io.observe(el); }

  function initReveal() {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
      booted = true;
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(arm);
    setTimeout(function () { booted = true; }, 2800);
  }

  /* Nodes rendered after the opening sequence are shown at once — filtering
     and sorting must never re-animate the table. */
  function settle(scope) {
    const els = (scope || document).querySelectorAll('[data-reveal]:not(.is-in)');
    if (booted || !io) { els.forEach((el) => el.classList.add('is-in')); return; }
    els.forEach(arm);
  }

  function boot() {
    initChrome();
    initHome();
    initCatalogue();
    initRecord();
    initSchools();
    initSchoolDetail();
    initLists();
    initListDetail();
    initContact();
    initReveal();
  }

  /* The multi-page site boots once per document. The single-file bundle
     (tools/bundle.py) swaps the <main> body on hash routes and re-mounts
     through this handle; nothing else uses it. */
  window.MASAR_APP = { mount: boot };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
