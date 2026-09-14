/* ==========================================================================
   Masar — catalogue data
   --------------------------------------------------------------------------
   Every human-readable string is stored as { en, ar } so both locales render
   from one source of truth. Plain JS (not JSON) so the site works from
   file:// without a server — fetch() would be blocked there.

   Schools, programmes, dates and fees below are real listings read from each
   school's own programme pages (sourceUrl is that page), written by
   tools/merge-catalogue.py from import/batch-school.json. Fees are stored in
   the school's own published currency; the riyal figure is computed for
   display only, from the snapshot in tools/fx.py. Nothing here is invented:
   a field we have not recorded is empty, and the site prints an em dash for it.
   ========================================================================== */

window.MASAR_DATA = (function () {
  const subjects = [
    { id: 'leadership',      en: 'Leadership & General Management', ar: 'القيادة والإدارة العامة' },
    { id: 'finance',         en: 'Finance & Accounting',            ar: 'التمويل والمحاسبة' },
    { id: 'strategy',        en: 'Strategy & Innovation',           ar: 'الاستراتيجية والابتكار' },
    { id: 'digital',         en: 'Digital Transformation & AI',     ar: 'التحول الرقمي والذكاء الاصطناعي' },
    { id: 'data',            en: 'Data & Analytics',                ar: 'البيانات والتحليلات' },
    { id: 'marketing',       en: 'Marketing & Sales',               ar: 'التسويق والمبيعات' },
    { id: 'operations',      en: 'Operations & Supply Chain',       ar: 'العمليات وسلاسل الإمداد' },
    { id: 'people',          en: 'People & Talent',                 ar: 'الموارد البشرية والمواهب' },
    { id: 'sustainability',  en: 'Sustainability & ESG',            ar: 'الاستدامة والحوكمة البيئية' },
    { id: 'negotiation',     en: 'Negotiation & Influence',         ar: 'التفاوض والتأثير' },
    { id: 'entrepreneurship',en: 'Entrepreneurship & Growth',       ar: 'ريادة الأعمال والنمو' },
    { id: 'healthcare',      en: 'Healthcare Management',           ar: 'إدارة الرعاية الصحية' }
  ];

  const formats = [
    { id: 'in-person', en: 'In person', ar: 'حضوري' },
    { id: 'online',    en: 'Online',    ar: 'عن بُعد' },
    { id: 'blended',   en: 'Blended',   ar: 'مدمج' }
  ];

  const languages = [
    { id: 'en', en: 'English', ar: 'الإنجليزية' },
    { id: 'ar', en: 'Arabic',  ar: 'العربية' },
    { id: 'fr', en: 'French',  ar: 'الفرنسية' },
    { id: 'es', en: 'Spanish', ar: 'الإسبانية' },
    { id: 'de', en: 'German',  ar: 'الألمانية' },
    { id: 'da', en: 'Danish',  ar: 'الدنماركية' }
  ];

  const schools = [
    {
      id: 's-agsm-university-of-new-south-wales',
      name: { en: 'AGSM, University of New South Wales', ar: 'كلية الدراسات العليا الأسترالية للإدارة (AGSM)' },
      city: { en: 'Sydney', ar: 'سيدني' },
      country: { en: 'Australia', ar: 'أستراليا' },
      region: 'oceania', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-cbs-executive-copenhagen-business-scho',
      name: { en: 'CBS Executive, Copenhagen Business School', ar: 'كلية كوبنهاغن للأعمال – التعليم التنفيذي' },
      city: { en: 'Copenhagen', ar: 'كوبنهاغن' },
      country: { en: 'Denmark', ar: 'الدنمارك' },
      region: 'europe', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-center-for-creative-leadership',
      name: { en: 'Center for Creative Leadership', ar: 'Center for Creative Leadership' },
      city: { en: 'Greensboro', ar: 'غرينزبورو' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-harvard-kennedy-school',
      name: { en: 'Harvard Kennedy School', ar: 'كلية كينيدي بجامعة هارفارد' },
      city: { en: 'Cambridge', ar: 'كامبريدج' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-imd-business-school',
      name: { en: 'IMD Business School', ar: 'كلية IMD للأعمال' },
      city: { en: 'Lausanne', ar: 'لوزان' },
      country: { en: 'Switzerland', ar: 'سويسرا' },
      region: 'europe', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-kellogg-school-of-management',
      name: { en: 'Kellogg School of Management', ar: 'كلية كيلوغ للإدارة' },
      city: { en: 'Evanston', ar: 'إيفانستون' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-mit-sloan-school-of-management',
      name: { en: 'MIT Sloan School of Management', ar: 'كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا' },
      city: { en: 'Cambridge', ar: 'كامبريدج' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-michigan-ross-executive-education',
      name: { en: 'Michigan Ross Executive Education', ar: 'التعليم التنفيذي في كلية روس بجامعة ميشيغان' },
      city: { en: 'Ann Arbor', ar: 'آن آربر' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-nus-business-school',
      name: { en: 'NUS Business School', ar: 'كلية الأعمال بجامعة سنغافورة الوطنية' },
      city: { en: 'Singapore', ar: 'سنغافورة' },
      country: { en: 'Singapore', ar: 'سنغافورة' },
      region: 'asia', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-nyu-stern-school-of-business',
      name: { en: 'NYU Stern School of Business', ar: 'كلية شتيرن للأعمال بجامعة نيويورك' },
      city: { en: 'New York', ar: 'نيويورك' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-smith-school-of-business-queen-s-unive',
      name: { en: "Smith School of Business, Queen's University", ar: 'كلية سميث للأعمال بجامعة كوينز' },
      city: { en: 'Kingston', ar: 'كينغستون' },
      country: { en: 'Canada', ar: 'كندا' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-stanford-graduate-school-of-business',
      name: { en: 'Stanford Graduate School of Business', ar: 'كلية ستانفورد للدراسات العليا في الأعمال' },
      city: { en: 'Stanford', ar: 'ستانفورد' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-ubc-sauder-school-of-business',
      name: { en: 'UBC Sauder School of Business', ar: 'كلية سودر للأعمال بجامعة كولومبيا البريطانية' },
      city: { en: 'Vancouver', ar: 'فانكوفر' },
      country: { en: 'Canada', ar: 'كندا' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-uc-berkeley-haas-school-of-business',
      name: { en: 'UC Berkeley Haas School of Business', ar: 'كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي' },
      city: { en: 'Berkeley', ar: 'بيركلي' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
    {
      id: 's-university-of-st-gallen-executive-scho',
      name: { en: 'University of St. Gallen Executive School', ar: 'المدرسة التنفيذية بجامعة سانت غالن' },
      city: { en: 'St. Gallen', ar: 'سانت غالن' },
      country: { en: 'Switzerland', ar: 'سويسرا' },
      region: 'europe', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    }
  ];

  /* start: ISO date · days: teaching days · price + currency: the school's own
     published figure · sourceUrl: internal provenance, never rendered */
  const courses = [
    {
      id: 'c-strategic-adaptive-leadership', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-09-16', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/strategic-adaptive-leadership',
      title: { en: 'Strategic & Adaptive Leadership', ar: 'القيادة الاستراتيجية والتكيّفية' },
      summary: {
        en: 'A 3-day on-campus program from AGSM, University of New South Wales, running 16 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 16 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-emerging-leader-program', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-09-22', days: 4, price: 7150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/emerging-leader-program',
      title: { en: 'Emerging Leader Program', ar: 'برنامج القائد الصاعد' },
      summary: {
        en: 'A 4-day on-campus program from AGSM, University of New South Wales, running 22 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 22 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-for-board-directors', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-09-24', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/ai-for-board-directors',
      title: { en: 'AI for Board Directors', ar: 'الذكاء الاصطناعي لأعضاء مجالس الإدارة' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 24 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 24 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-design-thinking-experimentation', school: 's-agsm-university-of-new-south-wales', subject: 'entrepreneurship', format: 'in-person',
      start: '2026-10-13', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/design-thinking-experimentation',
      title: { en: 'Design Thinking & Experimentation', ar: 'التفكير التصميمي والتجريب' },
      summary: {
        en: 'A 3-day on-campus program from AGSM, University of New South Wales, running 13 October 2026 to 15 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 13 أكتوبر 2026 إلى 15 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-authentic-communicator-activating', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-10-13', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/the-authentic-communicator-activating-presence',
      title: { en: 'The Authentic Communicator: Activating Presence', ar: 'المتواصل الأصيل: تفعيل الحضور' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 13 October 2026 to 14 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 13 أكتوبر 2026 إلى 14 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-project-management-excellence', school: 's-agsm-university-of-new-south-wales', subject: 'operations', format: 'in-person',
      start: '2026-10-19', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/project-management-excellence',
      title: { en: 'Project Management Excellence', ar: 'التميّز في إدارة المشاريع' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 19 October 2026 to 20 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 19 أكتوبر 2026 إلى 20 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-tackling-complexity-through-leadership', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-10-21', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/tackling-complexity-through-leadership',
      title: { en: 'Tackling Complexity through Leadership', ar: 'مواجهة التعقيد بالقيادة' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 21 October 2026 to 22 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 21 أكتوبر 2026 إلى 22 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-general-manager-program', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-10-26', days: 5, price: 14990, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/general-manager-program',
      title: { en: 'General Manager Program', ar: 'برنامج المدير العام' },
      summary: {
        en: 'A 5-day on-campus program from AGSM, University of New South Wales, running 26 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-essentials-of-finance-for-non-finance', school: 's-agsm-university-of-new-south-wales', subject: 'finance', format: 'in-person',
      start: '2026-11-04', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/essentials-of-finance-for-non-finance-managers',
      title: { en: 'Essentials of Finance for Non-Finance Managers', ar: 'أساسيات المالية للمديرين غير الماليين' },
      summary: {
        en: 'A 3-day on-campus program from AGSM, University of New South Wales, running 4 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 4 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executing-strategy-for-results', school: 's-agsm-university-of-new-south-wales', subject: 'strategy', format: 'in-person',
      start: '2026-11-05', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/executing-strategy-for-results',
      title: { en: 'Executing Strategy for Results', ar: 'تنفيذ الاستراتيجية لتحقيق النتائج' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 5 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 5 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-data-governance-for-leaders', school: 's-agsm-university-of-new-south-wales', subject: 'data', format: 'in-person',
      start: '2026-11-12', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/data-governance-for-leaders',
      title: { en: 'Data Governance for Leaders', ar: 'حوكمة البيانات للقادة' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 12 November 2026 to 13 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 12 نوفمبر 2026 إلى 13 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-accelerated-leadership-program', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-11-16', days: 5, price: 8990, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/accelerated-leadership-program',
      title: { en: 'Accelerated Leadership Program', ar: 'البرنامج المُعجّل للقيادة' },
      summary: {
        en: 'A 5-day on-campus program from AGSM, University of New South Wales, running 16 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 16 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-shaping-strategy-to-create-value', school: 's-agsm-university-of-new-south-wales', subject: 'strategy', format: 'in-person',
      start: '2026-11-16', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/shaping-strategy-to-create-value',
      title: { en: 'Shaping Strategy to Create Value', ar: 'صياغة الاستراتيجية لخلق القيمة' },
      summary: {
        en: 'A 3-day on-campus program from AGSM, University of New South Wales, running 16 November 2026 to 18 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 16 نوفمبر 2026 إلى 18 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-an-ai-strategy', school: 's-agsm-university-of-new-south-wales', subject: 'digital', format: 'in-person',
      start: '2026-11-17', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/building-an-ai-strategy',
      title: { en: 'Building an AI Strategy', ar: 'بناء استراتيجية للذكاء الاصطناعي' },
      summary: {
        en: 'A 3-day on-campus program from AGSM, University of New South Wales, running 17 November 2026 to 19 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 17 نوفمبر 2026 إلى 19 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-adaptive-leadership-program', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-11-23', days: 4, price: 7950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/adaptive-leadership-program',
      title: { en: 'Adaptive Leadership Program', ar: 'برنامج القيادة التكيفية' },
      summary: {
        en: 'A 4-day on-campus program from AGSM, University of New South Wales, running 23 November 2026 to 26 November 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 23 نوفمبر 2026 إلى 26 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-negotiation-influence', school: 's-agsm-university-of-new-south-wales', subject: 'negotiation', format: 'in-person',
      start: '2026-11-23', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/strategic-negotiation-and-influence',
      title: { en: 'Strategic Negotiation & Influence', ar: 'التفاوض الاستراتيجي والتأثير' },
      summary: {
        en: 'A 3-day on-campus program from AGSM, University of New South Wales, running 23 November 2026 to 25 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 23 نوفمبر 2026 إلى 25 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-project-governance-for-leaders', school: 's-agsm-university-of-new-south-wales', subject: 'operations', format: 'in-person',
      start: '2026-11-26', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.unsw.edu.au/study/professional-development/course/project-governance-for-leaders',
      title: { en: 'Project Governance for Leaders', ar: 'حوكمة المشاريع للقادة' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 26 November 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 26 نوفمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-masterclass-business-innovation-in-lif', school: 's-cbs-executive-copenhagen-business-scho', subject: 'strategy', format: 'in-person',
      start: '2026-12-01', days: 3, price: 20000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/masterclass-business-innovation-in-life-science-2026',
      title: {
        en: 'Masterclass: Business Innovation in Life Science 2026',
        ar: 'برنامج متقدم: الابتكار في قطاع علوم الحياة 2026'
      },
      summary: {
        en: 'A 3-day on-campus program from CBS Executive, Copenhagen Business School, running 1 December 2026 to 3 December 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 1 ديسمبر 2026 إلى 3 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-sustainability-transformation-accelera', school: 's-cbs-executive-copenhagen-business-scho', subject: 'sustainability', format: 'in-person',
      start: '2026-12-08', days: 3, price: 22500, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/sustainability-transformation-accelerator',
      title: { en: 'Sustainability Transformation Accelerator', ar: 'مسرّع التحوّل نحو الاستدامة' },
      summary: {
        en: 'A 3-day on-campus program from CBS Executive, Copenhagen Business School, running 8 December 2026 to 10 December 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 8 ديسمبر 2026 إلى 10 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-digital-sovereignty-resilience-cyberse', school: 's-cbs-executive-copenhagen-business-scho', subject: 'digital', format: 'in-person',
      start: '2027-01-18', days: 3, price: 20000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/digital-sovereignty-resilience-cybersecurity-in-organizations',
      title: {
        en: 'Digital Sovereignty, Resilience & Cybersecurity in Organizations',
        ar: 'السيادة الرقمية والمرونة والأمن السيبراني في المؤسسات'
      },
      summary: {
        en: 'A 3-day on-campus program from CBS Executive, Copenhagen Business School, running 18 January 2027 to 20 January 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 18 يناير 2027 إلى 20 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-professional-negotiation', school: 's-cbs-executive-copenhagen-business-scho', subject: 'negotiation', format: 'in-person',
      start: '2027-01-18', days: 4, price: 25000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/professional-negotiation',
      title: { en: 'Professional Negotiation', ar: 'التفاوض الاحترافي' },
      summary: {
        en: 'A 4-day on-campus program from CBS Executive, Copenhagen Business School, running 18 January 2027 to 21 January 2027.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 18 يناير 2027 إلى 21 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-unlocking-growth-through-corporate-ven', school: 's-cbs-executive-copenhagen-business-scho', subject: 'entrepreneurship', format: 'in-person',
      start: '2027-01-26', days: 3, price: 20000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/unlocking-growth-through-corporate-venturing',
      title: { en: 'Unlocking Growth through Corporate Venturing', ar: 'إطلاق النمو عبر ريادة الأعمال المؤسسية' },
      summary: {
        en: 'A 3-day on-campus program from CBS Executive, Copenhagen Business School, running 26 January 2027 to 28 January 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 26 يناير 2027 إلى 28 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executive-special-advanced-negotiation', school: 's-cbs-executive-copenhagen-business-scho', subject: 'negotiation', format: 'in-person',
      start: '2027-02-03', days: 2, price: 14500, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/executive-special-advanced-negotiation-techniques',
      title: {
        en: 'Executive Special: Advanced Negotiation Techniques',
        ar: 'برنامج تنفيذي خاص: تقنيات التفاوض المتقدمة'
      },
      summary: {
        en: 'A 2-day on-campus program from CBS Executive, Copenhagen Business School, running 3 February 2027 to 4 February 2027.',
        ar: 'برنامج حضوري لمدة يومين من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 3 فبراير 2027 إلى 4 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-pragmatic-innovation-management', school: 's-cbs-executive-copenhagen-business-scho', subject: 'strategy', format: 'in-person',
      start: '2027-02-10', days: 3, price: 18000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/pragmatic-innovation-management',
      title: { en: 'Pragmatic Innovation Management', ar: 'إدارة الابتكار العملي' },
      summary: {
        en: 'A 3-day on-campus program from CBS Executive, Copenhagen Business School, running 10 February 2027 to 12 February 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 10 فبراير 2027 إلى 12 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-brsens-bestyrelsesuddannelse-marts-202', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2027-03-03', days: 8, price: 69999, currency: 'DKK', langs: ['da'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/borsens-bestyrelsesuddannelse-marts-2027',
      title: { en: 'Børsens Bestyrelsesuddannelse Marts 2027', ar: 'برنامج Børsen لعضوية مجالس الإدارة - مارس 2027' },
      summary: {
        en: 'A 8-day on-campus program from CBS Executive, Copenhagen Business School, running 3 March 2027 to 10 March 2027.',
        ar: 'برنامج حضوري لمدة 8 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 3 مارس 2027 إلى 10 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-strategic-business-resilience', school: 's-cbs-executive-copenhagen-business-scho', subject: 'strategy', format: 'in-person',
      start: '2027-03-17', days: 8, price: 95000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/leading-strategic-business-resilience',
      title: { en: 'Leading Strategic Business Resilience', ar: 'قيادة المرونة الاستراتيجية للأعمال' },
      summary: {
        en: 'A 8-day on-campus program from CBS Executive, Copenhagen Business School, running 17 March 2027 to 24 March 2027.',
        ar: 'برنامج حضوري لمدة 8 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 17 مارس 2027 إلى 24 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cbs-executive-bestyrelsesuddannelsen-a', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2027-04-15', days: 16, price: 120000, currency: 'DKK', langs: ['da'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/cbs-executive-bestyrelsesuddannelsen-april-2027',
      title: {
        en: 'CBS Executive Bestyrelsesuddannelsen April 2027',
        ar: 'برنامج CBS Executive لعضوية مجالس الإدارة - أبريل 2027'
      },
      summary: {
        en: 'A 16-day on-campus program from CBS Executive, Copenhagen Business School, running 15 April 2027 to 30 April 2027.',
        ar: 'برنامج حضوري لمدة 16 يومًا من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 15 أبريل 2027 إلى 30 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-grundlggende-bestyrelsesuddannelse-apr', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2027-04-26', days: 3, price: 26800, currency: 'DKK', langs: ['da'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/grundlaeggende-bestyrelsesuddannelse-april-2027',
      title: {
        en: 'Grundlæggende Bestyrelsesuddannelse April 2027',
        ar: 'البرنامج التأسيسي لعضوية مجالس الإدارة - أبريل 2027'
      },
      summary: {
        en: 'A 3-day on-campus program from CBS Executive, Copenhagen Business School, running 26 April 2027 to 28 April 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 26 أبريل 2027 إلى 28 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-grundlggende-bestyrelsesuddannelse-aug', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2027-08-23', days: 3, price: 26800, currency: 'DKK', langs: ['da'], popularity: 50, sourceUrl: 'https://cbs-executive.dk/en/program/grundlaeggende-bestyrelsesuddannelse-august-2027',
      title: {
        en: 'Grundlæggende Bestyrelsesuddannelse August 2027',
        ar: 'البرنامج التأسيسي لعضوية مجالس الإدارة - أغسطس 2027'
      },
      summary: {
        en: 'A 3-day on-campus program from CBS Executive, Copenhagen Business School, running 23 August 2027 to 25 August 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 23 أغسطس 2027 إلى 25 أغسطس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-lead-4-success', school: 's-center-for-creative-leadership', subject: 'leadership', format: 'online',
      start: '2026-10-05', days: 5, price: 1850, langs: ['en'], popularity: 50, sourceUrl: 'https://www.ccl.org/leadership-programs/fundamental-leadership-skills-training/',
      title: { en: 'Lead 4 Success®', ar: 'القيادة نحو النجاح (Lead 4 Success®)' },
      summary: {
        en: 'A 5-day online program from Center for Creative Leadership, running 5 October 2026 to 9 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من Center for Creative Leadership، من 5 أكتوبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-maximizing-your-leadership-potential', school: 's-center-for-creative-leadership', subject: 'leadership', format: 'in-person',
      start: '2026-10-07', days: 3, price: 4400, langs: ['en'], popularity: 50, sourceUrl: 'https://www.ccl.org/leadership-programs/maximizing-leadership-potential-new-manager-training/',
      title: { en: 'Maximizing Your Leadership Potential', ar: 'تعظيم إمكاناتك القيادية' },
      summary: {
        en: 'A 3-day on-campus program from Center for Creative Leadership, running 7 October 2026 to 9 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من Center for Creative Leadership، من 7 أكتوبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-development-program-ldp', school: 's-center-for-creative-leadership', subject: 'leadership', format: 'in-person',
      start: '2026-10-12', days: 5, price: 8250, langs: ['en'], popularity: 50, sourceUrl: 'https://www.ccl.org/leadership-programs/leadership-development-program/',
      title: { en: 'Leadership Development Program (LDP)®', ar: 'برنامج تطوير القيادات (LDP®)' },
      summary: {
        en: 'A 5-day on-campus program from Center for Creative Leadership, running 12 October 2026 to 16 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من Center for Creative Leadership، من 12 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-better-conversations-every-daytm', school: 's-center-for-creative-leadership', subject: 'people', format: 'online',
      start: '2026-10-14', days: 3, price: 1350, langs: ['en'], popularity: 50, sourceUrl: 'https://www.ccl.org/leadership-programs/better-conversations-every-day-coaching-culture/',
      title: { en: 'Better Conversations Every Day™', ar: 'محادثات أفضل كل يوم (Better Conversations Every Day™)' },
      summary: {
        en: 'A 3-day online program from Center for Creative Leadership, running 14 October 2026 to 16 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 3 أيام من Center for Creative Leadership، من 14 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-at-the-peak', school: 's-center-for-creative-leadership', subject: 'leadership', format: 'in-person',
      start: '2026-10-26', days: 5, price: 18250, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.ccl.org/leadership-programs/leadership-at-the-peak-training-for-senior-executives/',
      title: { en: 'Leadership at the Peak', ar: 'القيادة في القمة' },
      summary: {
        en: 'A 5-day on-campus program from Center for Creative Leadership, running 26 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من Center for Creative Leadership، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-for-organizational-impact', school: 's-center-for-creative-leadership', subject: 'leadership', format: 'in-person',
      start: '2026-10-26', days: 5, price: 10950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.ccl.org/leadership-programs/leading-organizational-impact-executive-training/',
      title: { en: 'Leading for Organizational Impact', ar: 'القيادة من أجل الأثر المؤسسي' },
      summary: {
        en: 'A 5-day on-campus program from Center for Creative Leadership, running 26 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من Center for Creative Leadership، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-leader-program', school: 's-center-for-creative-leadership', subject: 'strategy', format: 'in-person',
      start: '2026-11-09', days: 5, price: 10500, currency: 'EUR', langs: ['en'], popularity: 50, sourceUrl: 'https://www.ccl.org/leadership-programs/strategic-leader/',
      title: { en: 'Strategic Leader Program', ar: 'برنامج القائد الاستراتيجي' },
      summary: {
        en: 'A 5-day on-campus program from Center for Creative Leadership, running 9 November 2026 to 13 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من Center for Creative Leadership، من 9 نوفمبر 2026 إلى 13 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-succession-reimagined', school: 's-center-for-creative-leadership', subject: 'leadership', format: 'in-person',
      start: '2027-01-26', days: 3, price: 5950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.ccl.org/leadership-programs/succession-planning-training/',
      title: { en: 'Succession Reimagined', ar: 'إعادة تصوّر التعاقب الوظيفي' },
      summary: {
        en: 'A 3-day on-campus program from Center for Creative Leadership, running 26 January 2027 to 28 January 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من Center for Creative Leadership، من 26 يناير 2027 إلى 28 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-management-of-regulatory-and', school: 's-harvard-kennedy-school', subject: 'operations', format: 'in-person',
      start: '2026-09-20', days: 6, price: 11300, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/strategic-management-regulatory-and-enforcement-agencies',
      title: {
        en: 'Strategic Management of Regulatory and Enforcement Agencies',
        ar: 'الإدارة الاستراتيجية للجهات التنظيمية والرقابية'
      },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 20 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 20 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-decision-making', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-27', days: 6, price: 11300, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/leadership-decision-making',
      title: { en: 'Leadership Decision Making', ar: 'صنع القرار القيادي' },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 27 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 27 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executive-leaders-and-government', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2026-10-18', days: 13, price: 18900, langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/executive-leaders-government',
      title: { en: 'Executive Leaders and Government', ar: 'القادة التنفيذيون والحكومة' },
      summary: {
        en: 'A 13-day on-campus program from Harvard Kennedy School, running 18 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 13 يومًا من كلية كينيدي بجامعة هارفارد، من 18 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-in-action-organizational-strategy-f', school: 's-harvard-kennedy-school', subject: 'digital', format: 'online',
      start: '2026-10-26', days: 12, price: 2495, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/ai-action',
      title: {
        en: 'AI in Action: Organizational Strategy for the Responsible Adoption of AI',
        ar: 'الذكاء الاصطناعي في الممارسة: استراتيجية تنظيمية للتبني المسؤول للذكاء الاصطناعي'
      },
      summary: {
        en: 'A 12-day online program from Harvard Kennedy School, running 26 October 2026 to 6 November 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 12 يومًا من كلية كينيدي بجامعة هارفارد، من 26 أكتوبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-leadership-enhancing-your-pe', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'online',
      start: '2026-11-02', days: 5, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/strategic-leadership-enhancing-your-personal-effectiveness',
      title: {
        en: 'Strategic Leadership: Enhancing Your Personal Effectiveness',
        ar: 'القيادة الاستراتيجية: تعزيز فاعليتك الشخصية'
      },
      summary: {
        en: 'A 5-day online program from Harvard Kennedy School, running 2 November 2026 to 6 November 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية كينيدي بجامعة هارفارد، من 2 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-investment-decisions-and-behavioral-fi', school: 's-harvard-kennedy-school', subject: 'finance', format: 'in-person',
      start: '2026-11-04', days: 3, price: 6100, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/investment-decisions-and-behavioral-finance',
      title: { en: 'Investment Decisions and Behavioral Finance', ar: 'قرارات الاستثمار والتمويل السلوكي' },
      summary: {
        en: 'A 3-day on-campus program from Harvard Kennedy School, running 4 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كينيدي بجامعة هارفارد، من 4 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-senior-executives-in-national-and-inte', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2026-11-30', days: 6, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/senior-executives-national-and-international-security',
      title: {
        en: 'Senior Executives in National and International Security',
        ar: 'كبار التنفيذيين في الأمن الوطني والدولي'
      },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 30 November 2026 to 5 December 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 30 نوفمبر 2026 إلى 5 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-emerging-leaders', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2026-12-06', days: 6, price: 11300, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/emerging-leaders',
      title: { en: 'Emerging Leaders', ar: 'القادة الصاعدون' },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 6 December 2026 to 11 December 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 6 ديسمبر 2026 إلى 11 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-for-the-21st-century', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-01-24', days: 6, price: 12900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/leadership-21st-century',
      title: { en: 'Leadership for the 21st Century', ar: 'القيادة في القرن الحادي والعشرين' },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 24 January 2027 to 29 January 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 24 يناير 2027 إلى 29 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-message-media-and-leadership-in-the-ag', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'online',
      start: '2027-02-01', days: 12, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/message-media-leadership-ai',
      title: {
        en: 'Message, Media and Leadership in the Age of AI',
        ar: 'الرسالة والإعلام والقيادة في عصر الذكاء الاصطناعي'
      },
      summary: {
        en: 'A 12-day online program from Harvard Kennedy School, running 1 February 2027 to 12 February 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 12 يومًا من كلية كينيدي بجامعة هارفارد، من 1 فبراير 2027 إلى 12 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-crisis-leadership-in-higher-education', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-02-09', days: 4, price: 6100, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/crisis-leadership-higher-education',
      title: { en: 'Crisis Leadership in Higher Education', ar: 'القيادة في الأزمات بمؤسسات التعليم العالي' },
      summary: {
        en: 'A 4-day on-campus program from Harvard Kennedy School, running 9 February 2027 to 12 February 2027.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كينيدي بجامعة هارفارد، من 9 فبراير 2027 إلى 12 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-behavioral-insights-and-public-policy', school: 's-harvard-kennedy-school', subject: 'strategy', format: 'online',
      start: '2027-02-22', days: 18, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/behavioral-insights-and-public-policy',
      title: { en: 'Behavioral Insights and Public Policy', ar: 'الرؤى السلوكية والسياسات العامة' },
      summary: {
        en: 'A 18-day online program from Harvard Kennedy School, running 22 February 2027 to 11 March 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 18 يومًا من كلية كينيدي بجامعة هارفارد، من 22 فبراير 2027 إلى 11 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-for-social-impact', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-03-15', days: 4, price: 7100, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/leadership-social-impact',
      title: { en: 'Leadership for Social Impact', ar: 'القيادة من أجل الأثر الاجتماعي' },
      summary: {
        en: 'A 4-day on-campus program from Harvard Kennedy School, running 15 March 2027 to 18 March 2027.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كينيدي بجامعة هارفارد، من 15 مارس 2027 إلى 18 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-negotiation-strategies-building-agreem', school: 's-harvard-kennedy-school', subject: 'negotiation', format: 'online',
      start: '2027-03-22', days: 5, price: 5100, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/negotiation-strategies',
      title: {
        en: 'Negotiation Strategies: Building Agreement Across Boundaries',
        ar: 'استراتيجيات التفاوض: بناء الاتفاق عبر الحدود'
      },
      summary: {
        en: 'A 5-day online program from Harvard Kennedy School, running 22 March 2027 to 26 March 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية كينيدي بجامعة هارفارد، من 22 مارس 2027 إلى 26 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-in-crises', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-04-04', days: 6, price: 10900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/leadership-crises',
      title: { en: 'Leadership in Crises', ar: 'القيادة في الأزمات' },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 4 April 2027 to 9 April 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 4 أبريل 2027 إلى 9 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-women-and-power', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-04-11', days: 6, price: 10900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/women-and-power',
      title: { en: 'Women and Power', ar: 'المرأة والسلطة' },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 11 April 2027 to 16 April 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 11 أبريل 2027 إلى 16 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-driving-nonprofit-performance-and-inno', school: 's-harvard-kennedy-school', subject: 'operations', format: 'online',
      start: '2027-04-15', days: 9, price: 4400, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/driving-nonprofit-performance-and-innovation',
      title: { en: 'Driving Nonprofit Performance and Innovation', ar: 'تعزيز الأداء والابتكار في القطاع غير الربحي' },
      summary: {
        en: 'A 9-day online program from Harvard Kennedy School, running 15 April 2027 to 23 April 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية كينيدي بجامعة هارفارد، من 15 أبريل 2027 إلى 23 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategies-for-inclusive-growth', school: 's-harvard-kennedy-school', subject: 'strategy', format: 'in-person',
      start: '2027-04-25', days: 6, price: 10600, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/strategies-inclusive-growth',
      title: { en: 'Strategies for Inclusive Growth', ar: 'استراتيجيات النمو الشامل' },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 25 April 2027 to 30 April 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 25 أبريل 2027 إلى 30 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-infrastructure-financing-regulation-an', school: 's-harvard-kennedy-school', subject: 'finance', format: 'in-person',
      start: '2027-05-02', days: 6, price: 10600, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/infrastructure-financing-regulation-and-management',
      title: {
        en: 'Infrastructure Financing, Regulation, and Management',
        ar: 'تمويل البنية التحتية وتنظيمها وإدارتها'
      },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 2 May 2027 to 7 May 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 2 مايو 2027 إلى 7 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-in-emerging-technology-secu', school: 's-harvard-kennedy-school', subject: 'digital', format: 'in-person',
      start: '2027-05-02', days: 6, price: 11200, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/leadership-emerging-technology-security-strategy-risk',
      title: {
        en: 'Leadership in Emerging Technology: Security, Strategy & Risk',
        ar: 'القيادة في التقنيات الناشئة: الأمن والاستراتيجية والمخاطر'
      },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 2 May 2027 to 7 May 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 2 مايو 2027 إلى 7 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-major-events-navigating-opportunities', school: 's-harvard-kennedy-school', subject: 'operations', format: 'in-person',
      start: '2027-05-10', days: 4, price: 7100, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/major-events-navigating-opportunities-and-challenges',
      title: {
        en: 'Major Events: Navigating Opportunities and Challenges',
        ar: 'الفعاليات الكبرى: استثمار الفرص ومواجهة التحديات'
      },
      summary: {
        en: 'A 4-day on-campus program from Harvard Kennedy School, running 10 May 2027 to 13 May 2027.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كينيدي بجامعة هارفارد، من 10 مايو 2027 إلى 13 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-persuasive-communication-narrative-evi', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'online',
      start: '2027-05-10', days: 12, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/persuasive-communication-narrative-evidence-and-impact',
      title: {
        en: 'Persuasive Communication: Narrative, Evidence, and Impact',
        ar: 'التواصل الإقناعي: السرد والبراهين والأثر'
      },
      summary: {
        en: 'A 12-day online program from Harvard Kennedy School, running 10 May 2027 to 21 May 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 12 يومًا من كلية كينيدي بجامعة هارفارد، من 10 مايو 2027 إلى 21 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-green-growth-economic-strategi', school: 's-harvard-kennedy-school', subject: 'sustainability', format: 'in-person',
      start: '2027-05-16', days: 6, price: 10600, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/leading-green-growth-economic-strategies-low-carbon-world',
      title: {
        en: 'Leading Green Growth: Economic Strategies for a Low-Carbon World',
        ar: 'قيادة النمو الأخضر: استراتيجيات اقتصادية لعالم منخفض الكربون'
      },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 16 May 2027 to 21 May 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 16 مايو 2027 إلى 21 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-art-and-practice-of-leadership-develop', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-06-06', days: 6, price: 11300, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/art-and-practice-leadership-development',
      title: { en: 'Art and Practice of Leadership Development', ar: 'فن وممارسة تطوير القيادة' },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 6 June 2027 to 11 June 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 6 يونيو 2027 إلى 11 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-senior-executives-in-state-and-local-g', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-06-07', days: 19, price: 17900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/senior-executives-state-and-local-government',
      title: {
        en: 'Senior Executives in State and Local Government',
        ar: 'كبار التنفيذيين في الحكومات الإقليمية والمحلية'
      },
      summary: {
        en: 'A 19-day on-campus program from Harvard Kennedy School, running 7 June 2027 to 25 June 2027.',
        ar: 'برنامج حضوري لمدة 19 يومًا من كلية كينيدي بجامعة هارفارد، من 7 يونيو 2027 إلى 25 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-how-to-empower-black-leaders-strategie', school: 's-harvard-kennedy-school', subject: 'people', format: 'in-person',
      start: '2027-06-22', days: 4, price: 7100, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/empowering-black-leaders',
      title: {
        en: 'How to Empower Black Leaders: Strategies for Personal and Professional Success',
        ar: 'تمكين القادة السود: استراتيجيات للنجاح الشخصي والمهني'
      },
      summary: {
        en: 'A 4-day on-campus program from Harvard Kennedy School, running 22 June 2027 to 25 June 2027.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كينيدي بجامعة هارفارد، من 22 يونيو 2027 إلى 25 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-in-artificial-intelligence-exp', school: 's-harvard-kennedy-school', subject: 'digital', format: 'in-person',
      start: '2027-07-11', days: 6, price: 11700, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/leading-artificial-intelligence',
      title: {
        en: 'Leading in Artificial Intelligence: Exploring Technology and Policy',
        ar: 'القيادة في الذكاء الاصطناعي: استكشاف التقنية والسياسات'
      },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 11 July 2027 to 16 July 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 11 يوليو 2027 إلى 16 يوليو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-successful-programs-using-evid', school: 's-harvard-kennedy-school', subject: 'operations', format: 'in-person',
      start: '2027-07-18', days: 6, price: 10900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/leading-successful-programs',
      title: {
        en: 'Leading Successful Programs: Using Evidence to Assess Effectiveness',
        ar: 'قيادة البرامج الناجحة: توظيف الأدلة لتقييم الفعالية'
      },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 18 July 2027 to 23 July 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 18 يوليو 2027 إلى 23 يوليو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cybersecurity-the-intersection-of-poli', school: 's-harvard-kennedy-school', subject: 'digital', format: 'in-person',
      start: '2027-07-25', days: 6, price: 11300, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/cybersecurity',
      title: {
        en: 'Cybersecurity: The Intersection of Policy and Technology',
        ar: 'الأمن السيبراني: تقاطع السياسات والتقنية'
      },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 25 July 2027 to 30 July 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 25 يوليو 2027 إلى 30 يوليو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-comparative-tax-policy-and-administrat', school: 's-harvard-kennedy-school', subject: 'finance', format: 'in-person',
      start: '2027-08-16', days: 12, price: 13900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.hks.harvard.edu/educational-programs/executive-education/comparative-tax-policy-and-administration',
      title: { en: 'Comparative Tax Policy and Administration', ar: 'السياسات الضريبية المقارنة وإدارتها' },
      summary: {
        en: 'A 12-day on-campus program from Harvard Kennedy School, running 16 August 2027 to 27 August 2027.',
        ar: 'برنامج حضوري لمدة 12 يومًا من كلية كينيدي بجامعة هارفارد، من 16 أغسطس 2027 إلى 27 أغسطس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-strategy-and-implementation', school: 's-imd-business-school', subject: 'digital', format: 'in-person',
      start: '2026-09-14', days: 5, price: 10900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/digital-transformation/aisi/ai-strategy-and-implementation/',
      title: { en: 'AI Strategy and Implementation', ar: 'استراتيجية الذكاء الاصطناعي وتطبيقها' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 14 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 14 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-digital-and-ai-transformation', school: 's-imd-business-school', subject: 'digital', format: 'in-person',
      start: '2026-09-28', days: 5, price: 10900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/digital-transformation/ldait/leading-digital-ai-transformation/',
      title: { en: 'Leading Digital and AI Transformation', ar: 'قيادة التحول الرقمي والذكاء الاصطناعي' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 28 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 28 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-teams-in-the-ai-era-sprint', school: 's-imd-business-school', subject: 'leadership', format: 'online',
      start: '2026-09-28', days: 5, price: 950, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/sprint/leadership-ai/',
      title: { en: 'Leading Teams in the AI Era Sprint', ar: 'قيادة الفرق في عصر الذكاء الاصطناعي: برنامج مكثف' },
      summary: {
        en: 'A 5-day online program from IMD Business School, starting 28 September 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية IMD للأعمال، يبدأ في 28 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-transition-to-business-leadership', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-28', days: 20, price: 32500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/management/tbl/business-leadership-training/',
      title: { en: 'Transition to Business Leadership', ar: 'الانتقال إلى قيادة الأعمال' },
      summary: {
        en: 'A 20-day on-campus program from IMD Business School, running 28 September 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة 20 يومًا من كلية IMD للأعمال، من 28 سبتمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-high-performance-leadership', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-10-04', days: 6, price: 14900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/leadership/hpl/leadership-training/',
      title: { en: 'High Performance Leadership', ar: 'القيادة عالية الأداء' },
      summary: {
        en: 'A 6-day on-campus program from IMD Business School, running 4 October 2026 to 9 October 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية IMD للأعمال، من 4 أكتوبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-sustainable-business-transform', school: 's-imd-business-school', subject: 'sustainability', format: 'blended',
      start: '2026-10-05', days: 6, price: 9900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/sustainability/lsbt/leading-sustainable-business-transformation/',
      title: { en: 'Leading Sustainable Business Transformation', ar: 'قيادة التحول المستدام في الأعمال' },
      summary: {
        en: 'A 6-day blended program from IMD Business School, running 5 October 2026 to 18 November 2026.',
        ar: 'برنامج مدمج لمدة 6 أيام من كلية IMD للأعمال، من 5 أكتوبر 2026 إلى 18 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-mobilizing-people', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-10-15', days: 9, price: 23000, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/leadership/mp/team-leadership-program/',
      title: { en: 'Mobilizing People', ar: 'تعبئة الطاقات البشرية' },
      summary: {
        en: 'A 9-day on-campus program from IMD Business School, running 15 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة 9 أيام من كلية IMD للأعمال، من 15 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-advanced-high-performance-leadership', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-10-19', days: 5, price: 9500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/leadership/ahpl/advanced-leadership-training/',
      title: { en: 'Advanced High Performance Leadership', ar: 'القيادة عالية الأداء المتقدمة' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 19 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 19 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-orchestrating-winning-performance', school: 's-imd-business-school', subject: 'strategy', format: 'in-person',
      start: '2026-10-19', days: 5, price: 16900, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/owp/sessions/singapore-2026/',
      title: { en: 'Orchestrating Winning Performance', ar: 'تنسيق الأداء الرابح (Orchestrating Winning Performance)' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 19 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 19 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-for-high-impact', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-11-02', days: 5, price: 17900, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/leadership/lhi/leading-for-high-impact/',
      title: { en: 'Leading for High Impact', ar: 'القيادة لتحقيق أثر عالٍ' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 2 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 2 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-organizational-learning-in-action', school: 's-imd-business-school', subject: 'people', format: 'blended',
      start: '2026-11-02', days: 4, price: 9000, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/human-resources/ola/organizational-learning/',
      title: { en: 'Organizational Learning in Action', ar: 'التعلّم المؤسسي موضع التطبيق' },
      summary: {
        en: 'A 4-day blended program from IMD Business School, running 2 November 2026 to 4 December 2026.',
        ar: 'برنامج مدمج لمدة 4 أيام من كلية IMD للأعمال، من 2 نوفمبر 2026 إلى 4 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-future-leaders', school: 's-imd-business-school', subject: 'leadership', format: 'blended',
      start: '2026-11-03', days: 12, price: 19900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/management/fl/future-leaders-program/',
      title: { en: 'Future Leaders', ar: 'قادة المستقبل' },
      summary: {
        en: 'A 12-day blended program from IMD Business School, running 3 November 2026 to 4 March 2027.',
        ar: 'برنامج مدمج لمدة 12 يومًا من كلية IMD للأعمال، من 3 نوفمبر 2026 إلى 4 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-high-performance-teams', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-11-03', days: 4, price: 7900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/leadership/lhpt/leading-high-performance-teams/',
      title: { en: 'Leading High-Performance Teams', ar: 'قيادة الفرق عالية الأداء' },
      summary: {
        en: 'A 4-day on-campus program from IMD Business School, running 3 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية IMD للأعمال، من 3 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-forum-for-senior-executives', school: 's-imd-business-school', subject: 'strategy', format: 'in-person',
      start: '2026-11-09', days: 3, price: 6900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/management/sfse/executive-leadership-forum/',
      title: { en: 'Strategic Forum for Senior Executives', ar: 'المنتدى الاستراتيجي لكبار التنفيذيين' },
      summary: {
        en: 'A 3-day on-campus program from IMD Business School, running 9 November 2026 to 11 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية IMD للأعمال، من 9 نوفمبر 2026 إلى 11 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-first-90-days', school: 's-imd-business-school', subject: 'leadership', format: 'online',
      start: '2026-12-08', days: 3, price: 3900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://www.imd.org/leadership/f90d/the-first-90-days/',
      title: { en: 'The First 90 Days®', ar: 'الأيام التسعون الأولى®' },
      summary: {
        en: 'A 3-day online program from IMD Business School, running 8 December 2026 to 10 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 3 أيام من كلية IMD للأعمال، من 8 ديسمبر 2026 إلى 10 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-competitive-strategy', school: 's-kellogg-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-09-14', days: 5, price: 9950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/compete.aspx',
      title: { en: 'Competitive Strategy', ar: 'الاستراتيجية التنافسية' },
      summary: {
        en: 'A 5-day on-campus program from Kellogg School of Management, running 14 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية كيلوغ للإدارة، من 14 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-with-ai', school: 's-kellogg-school-of-management', subject: 'data', format: 'in-person',
      start: '2026-09-14', days: 4, price: 12500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/leadai.aspx',
      title: { en: 'Leading with AI', ar: 'القيادة بالذكاء الاصطناعي' },
      summary: {
        en: 'A 4-day on-campus program from Kellogg School of Management, running 14 September 2026 to 17 September 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كيلوغ للإدارة، من 14 سبتمبر 2026 إلى 17 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-operations-strategy', school: 's-kellogg-school-of-management', subject: 'operations', format: 'in-person',
      start: '2026-09-14', days: 3, price: 8950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/opstrat.aspx',
      title: { en: 'Operations Strategy', ar: 'استراتيجية العمليات' },
      summary: {
        en: 'A 3-day on-campus program from Kellogg School of Management, running 14 September 2026 to 16 September 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كيلوغ للإدارة، من 14 سبتمبر 2026 إلى 16 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-leader-within', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-09-21', days: 5, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/lsphere.aspx',
      title: { en: 'The Leader Within', ar: 'القائد الكامن بداخلك' },
      summary: {
        en: 'A 5-day on-campus program from Kellogg School of Management, running 21 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية كيلوغ للإدارة، من 21 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-strong-brands', school: 's-kellogg-school-of-management', subject: 'marketing', format: 'in-person',
      start: '2026-09-28', days: 5, price: 9450, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/brand.aspx',
      title: { en: 'Building Strong Brands', ar: 'بناء العلامات التجارية القوية' },
      summary: {
        en: 'A 5-day on-campus program from Kellogg School of Management, running 28 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية كيلوغ للإدارة، من 28 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-creating-and-managing-strategic-allian', school: 's-kellogg-school-of-management', subject: 'strategy', format: 'online',
      start: '2026-09-28', days: 5, price: 4950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/cmsa.aspx',
      title: { en: 'Creating and Managing Strategic Alliances', ar: 'بناء التحالفات الاستراتيجية وإدارتها' },
      summary: {
        en: 'A 5-day online program from Kellogg School of Management, running 28 September 2026 to 2 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية كيلوغ للإدارة، من 28 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-governing-family-enterprises', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'blended',
      start: '2026-09-29', days: 11, price: 12000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/family.aspx',
      title: { en: 'Governing Family Enterprises', ar: 'حوكمة المنشآت العائلية' },
      summary: {
        en: 'A 11-day blended program from Kellogg School of Management, running 29 September 2026 to 9 October 2026.',
        ar: 'برنامج مدمج لمدة 11 يومًا من كلية كيلوغ للإدارة، من 29 سبتمبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-customer-focused-organization', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-09-29', days: 4, price: 9950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/focus.aspx',
      title: { en: 'The Customer-Focused Organization', ar: 'المؤسسة المرتكزة على العميل' },
      summary: {
        en: 'A 4-day on-campus program from Kellogg School of Management, running 29 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كيلوغ للإدارة، من 29 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-innovation-to-drive-growth', school: 's-kellogg-school-of-management', subject: 'entrepreneurship', format: 'in-person',
      start: '2026-10-05', days: 4, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/innovate.aspx',
      title: { en: 'Innovation to Drive Growth', ar: 'الابتكار محركاً للنمو' },
      summary: {
        en: 'A 4-day on-campus program from Kellogg School of Management, running 5 October 2026 to 8 October 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كيلوغ للإدارة، من 5 أكتوبر 2026 إلى 8 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executive-development-program', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'blended',
      start: '2026-10-11', days: 20, price: 39500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/edp.aspx',
      title: { en: 'Executive Development Program', ar: 'البرنامج التنفيذي للتطوير القيادي' },
      summary: {
        en: 'A 20-day blended program from Kellogg School of Management, running 11 October 2026 to 30 October 2026.',
        ar: 'برنامج مدمج لمدة 20 يومًا من كلية كيلوغ للإدارة، من 11 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-mergers-acquisitions', school: 's-kellogg-school-of-management', subject: 'finance', format: 'in-person',
      start: '2026-10-11', days: 6, price: 13100, langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/mw.aspx',
      title: { en: 'Mergers + Acquisitions', ar: 'الاندماج والاستحواذ' },
      summary: {
        en: 'A 6-day on-campus program from Kellogg School of Management, running 11 October 2026 to 16 October 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كيلوغ للإدارة، من 11 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-constructive-collaboration', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'online',
      start: '2026-10-12', days: 5, price: 6500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/collaborate.aspx',
      title: { en: 'Constructive Collaboration', ar: 'التعاون البنّاء' },
      summary: {
        en: 'A 5-day online program from Kellogg School of Management, running 12 October 2026 to 16 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية كيلوغ للإدارة، من 12 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-business-marketing-strategy', school: 's-kellogg-school-of-management', subject: 'marketing', format: 'in-person',
      start: '2026-10-19', days: 4, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/btob.aspx',
      title: { en: 'Business Marketing Strategy', ar: 'استراتيجية التسويق للأعمال' },
      summary: {
        en: 'A 4-day on-campus program from Kellogg School of Management, running 19 October 2026 to 22 October 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كيلوغ للإدارة، من 19 أكتوبر 2026 إلى 22 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-b2b-sales-force-strategy-effectiveness', school: 's-kellogg-school-of-management', subject: 'marketing', format: 'in-person',
      start: '2026-10-26', days: 5, price: 9950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/sales.aspx',
      title: {
        en: 'B2B Sales Force Strategy & Effectiveness in the Digital Age',
        ar: 'استراتيجية وفعالية فرق المبيعات بين الشركات (B2B) في العصر الرقمي'
      },
      summary: {
        en: 'A 5-day on-campus program from Kellogg School of Management, running 26 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية كيلوغ للإدارة، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-leading-effective-teams', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'online',
      start: '2026-10-26', days: 5, price: 6500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/team.aspx',
      title: { en: 'Building & Leading Effective Teams', ar: 'بناء الفرق الفعالة وقيادتها' },
      summary: {
        en: 'A 5-day online program from Kellogg School of Management, running 26 October 2026 to 30 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية كيلوغ للإدارة، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-delivering-business-growth', school: 's-kellogg-school-of-management', subject: 'entrepreneurship', format: 'in-person',
      start: '2026-10-26', days: 4, price: 9950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/bizgrowth.aspx',
      title: { en: 'Delivering Business Growth', ar: 'تحقيق نمو الأعمال' },
      summary: {
        en: 'A 4-day on-campus program from Kellogg School of Management, running 26 October 2026 to 29 October 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كيلوغ للإدارة، من 26 أكتوبر 2026 إلى 29 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-family-enterprise-boards', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'blended',
      start: '2026-10-27', days: 11, price: 12000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/famboard.aspx',
      title: { en: 'Family Enterprise Boards', ar: 'مجالس إدارة المنشآت العائلية' },
      summary: {
        en: 'A 11-day blended program from Kellogg School of Management, running 27 October 2026 to 6 November 2026.',
        ar: 'برنامج مدمج لمدة 11 يومًا من كلية كيلوغ للإدارة، من 27 أكتوبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-finance-for-executives', school: 's-kellogg-school-of-management', subject: 'finance', format: 'in-person',
      start: '2026-11-01', days: 6, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/finexec.aspx',
      title: { en: 'Finance for Executives', ar: 'المالية للتنفيذيين' },
      summary: {
        en: 'A 6-day on-campus program from Kellogg School of Management, running 1 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كيلوغ للإدارة، من 1 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-corporate-governance', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-11-02', days: 4, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/director.aspx',
      title: { en: 'Corporate Governance', ar: 'حوكمة الشركات' },
      summary: {
        en: 'A 4-day on-campus program from Kellogg School of Management, running 2 November 2026 to 5 November 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كيلوغ للإدارة، من 2 نوفمبر 2026 إلى 5 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-energizing-people-for-performance', school: 's-kellogg-school-of-management', subject: 'people', format: 'in-person',
      start: '2026-11-09', days: 4, price: 9950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/people.aspx',
      title: { en: 'Energizing People for Performance', ar: 'تنشيط طاقات الأفراد لرفع الأداء' },
      summary: {
        en: 'A 4-day on-campus program from Kellogg School of Management, running 9 November 2026 to 12 November 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كيلوغ للإدارة، من 9 نوفمبر 2026 إلى 12 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-lean-operations', school: 's-kellogg-school-of-management', subject: 'operations', format: 'in-person',
      start: '2026-11-09', days: 3, price: 8950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/lean.aspx',
      title: { en: 'Lean Operations', ar: 'العمليات وفق منهجية لين (Lean)' },
      summary: {
        en: 'A 3-day on-campus program from Kellogg School of Management, running 9 November 2026 to 11 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كيلوغ للإدارة، من 9 نوفمبر 2026 إلى 11 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-strategy-of-leadership', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-11-09', days: 3, price: 10450, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/newscience.aspx',
      title: { en: 'The Strategy of Leadership', ar: 'استراتيجية القيادة' },
      summary: {
        en: 'A 3-day on-campus program from Kellogg School of Management, running 9 November 2026 to 11 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كيلوغ للإدارة، من 9 نوفمبر 2026 إلى 11 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-advanced-marketing-management', school: 's-kellogg-school-of-management', subject: 'marketing', format: 'in-person',
      start: '2026-11-16', days: 5, price: 9950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/admark.aspx',
      title: { en: 'Advanced Marketing Management', ar: 'الإدارة التسويقية المتقدمة' },
      summary: {
        en: 'A 5-day on-campus program from Kellogg School of Management, running 16 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية كيلوغ للإدارة، من 16 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-driving-organizational-change', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-11-16', days: 4, price: 8950, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/orgchange.aspx',
      title: { en: 'Driving Organizational Change', ar: 'قيادة التغيير المؤسسي' },
      summary: {
        en: 'A 4-day on-campus program from Kellogg School of Management, running 16 November 2026 to 19 November 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كيلوغ للإدارة، من 16 نوفمبر 2026 إلى 19 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-negotiation-master-class', school: 's-kellogg-school-of-management', subject: 'negotiation', format: 'online',
      start: '2026-11-30', days: 12, price: 6900, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/mneg.aspx',
      title: { en: 'Negotiation Master Class', ar: 'برنامج متقدم في التفاوض' },
      summary: {
        en: 'A 12-day online program from Kellogg School of Management, running 30 November 2026 to 11 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 12 يومًا من كلية كيلوغ للإدارة، من 30 نوفمبر 2026 إلى 11 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-governing-for-generational-growth', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'blended',
      start: '2027-02-16', days: 11, price: 12000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/fameg.aspx',
      title: { en: 'Governing for Generational Growth', ar: 'الحوكمة من أجل النمو عبر الأجيال' },
      summary: {
        en: 'A 11-day blended program from Kellogg School of Management, running 16 February 2027 to 26 February 2027.',
        ar: 'برنامج مدمج لمدة 11 يومًا من كلية كيلوغ للإدارة، من 16 فبراير 2027 إلى 26 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-single-family-office', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2027-06-08', days: 3, price: 7000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/famoff.aspx',
      title: { en: 'The Single Family Office', ar: 'مكتب العائلة الواحدة' },
      summary: {
        en: 'A 3-day on-campus program from Kellogg School of Management, running 8 June 2027 to 10 June 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كيلوغ للإدارة، من 8 يونيو 2027 إلى 10 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-frontiers-of-generative-ai-in-business', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-09-22', days: 2, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/frontiers-of-generative-ai-in-business/a05U1000002xz4jIAA.html',
      title: { en: 'Frontiers of Generative AI in Business', ar: 'آفاق الذكاء الاصطناعي التوليدي في قطاع الأعمال' },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 22 September 2026 to 23 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 22 سبتمبر 2026 إلى 23 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-essentials-accelerating-impactful-a', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-09-24', days: 2, price: 5700, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/ai-essentials/a05U1000009xGLJIA2.html',
      title: {
        en: 'AI Essentials: Accelerating Impactful Adoption',
        ar: 'أساسيات الذكاء الاصطناعي: تسريع التبني الفعّال'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 24 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 24 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-artificial-intelligence-for-financial', school: 's-mit-sloan-school-of-management', subject: 'finance', format: 'in-person',
      start: '2026-10-01', days: 2, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/artificial-intelligence-for-financial-services/a05U100000BIm1RIAT.html',
      title: {
        en: 'Artificial Intelligence for Financial Services: Tools, Opportunities, and Challenges',
        ar: 'الذكاء الاصطناعي في الخدمات المالية: الأدوات والفرص والتحديات'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 1 October 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 1 أكتوبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-driving-strategic-innovation-achieving', school: 's-mit-sloan-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-10-04', days: 6, price: 12900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/driving-strategic-innovation/a056g00000URaMqAAL.html',
      title: {
        en: 'Driving Strategic Innovation: Achieving High Performance Throughout the Value Chain',
        ar: 'قيادة الابتكار الاستراتيجي: تحقيق الأداء المتفوق عبر سلسلة القيمة'
      },
      summary: {
        en: 'A 6-day on-campus program from MIT Sloan School of Management, running 4 October 2026 to 9 October 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 4 أكتوبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-visual-management-for-competitive-adva', school: 's-mit-sloan-school-of-management', subject: 'operations', format: 'in-person',
      start: '2026-10-06', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/visual-management-for-competitive-advantage/a056g00000URaMuAAL.html',
      title: {
        en: "Visual Management for Competitive Advantage: MIT's Approach to Efficient and Agile Work",
        ar: 'الإدارة البصرية لتحقيق الميزة التنافسية: منهج معهد MIT للعمل الكفؤ والرشيق'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 6 October 2026 to 7 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 6 أكتوبر 2026 إلى 7 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-risk-and-readiness-from-governance', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-10-08', days: 2, price: 5700, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/ai-risk-and-readiness/a05U100000E3vJRIAZ.html',
      title: {
        en: 'AI Risk and Readiness: From Governance to Growth',
        ar: 'مخاطر الذكاء الاصطناعي والتأهب لها: من الحوكمة إلى النمو'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 8 October 2026 to 9 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 8 أكتوبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-implementing-agentic-ai-building-your', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'online',
      start: '2026-10-12', days: 15, price: 1900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/implementing-agentic-ai/a05U100000CvoPOIAZ.html',
      title: {
        en: 'Implementing Agentic AI: Building Your Organizational Playbook',
        ar: 'تطبيق الذكاء الاصطناعي الوكيل: بناء دليل عمل مؤسستكم'
      },
      summary: {
        en: 'A 15-day online program from MIT Sloan School of Management, running 12 October 2026 to 3 November 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 15 يومًا من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 12 أكتوبر 2026 إلى 3 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-developing-a-leading-edge-operations-s', school: 's-mit-sloan-school-of-management', subject: 'operations', format: 'in-person',
      start: '2026-10-13', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/developing-a-leading-edge-operations-strategy/a056g00000URaMoAAL.html',
      title: { en: 'Developing a Leading Edge Operations Strategy', ar: 'بناء استراتيجية تشغيلية ريادية' },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 13 October 2026 to 14 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 13 أكتوبر 2026 إلى 14 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-technical-professionals-and-te', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-10-13', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/leading-technical-professionals-and-teams/a05U1000006sQeoIAE.html',
      title: { en: 'Leading Technical Professionals and Teams', ar: 'قيادة المختصين التقنيين وفرقهم' },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 13 October 2026 to 14 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 13 أكتوبر 2026 إلى 14 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-through-storytelling-the-human', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-10-15', days: 2, price: 5300, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/leading-through-storytelling/a05U100000FS8urIAD.html',
      title: {
        en: 'Leading Through Storytelling: The Human Advantage in the Age of AI',
        ar: 'القيادة عبر السرد القصصي: الميزة الإنسانية في عصر الذكاء الاصطناعي'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 15 October 2026 to 16 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 15 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-supply-chain-strategy-and-management', school: 's-mit-sloan-school-of-management', subject: 'operations', format: 'in-person',
      start: '2026-10-15', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/supply-chain-strategy-and-management/a056g00000URaN6AAL.html',
      title: { en: 'Supply Chain Strategy and Management', ar: 'استراتيجية سلسلة الإمداد وإدارتها' },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 15 October 2026 to 16 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 15 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-understanding-and-solving-complex-busi', school: 's-mit-sloan-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-10-15', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/understanding-and-solving-complex-business-problems/a056g00000URaNBAA1.html',
      title: { en: 'Understanding and Solving Complex Business Problems', ar: 'فهم المشكلات التجارية المعقدة وحلها' },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 15 October 2026 to 16 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 15 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-future-family-enterprise-sustaining-mu', school: 's-mit-sloan-school-of-management', subject: 'entrepreneurship', format: 'in-person',
      start: '2026-10-18', days: 6, price: 13900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/future-family-enterprise/a056g00000URaa8AAD.html',
      title: {
        en: 'Future Family Enterprise: Sustaining Multigenerational Success',
        ar: 'مستقبل المنشأة العائلية: استدامة النجاح عبر الأجيال'
      },
      summary: {
        en: 'A 6-day on-campus program from MIT Sloan School of Management, running 18 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 18 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-questions-are-the-answer-a-creative-ap', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-10-20', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/questions-are-the-answer/a056g00000URaaHAAT.html',
      title: {
        en: 'Questions Are the Answer: A Creative Approach to AI-Enhanced Inquiry, Insight, and Impact',
        ar: 'الأسئلة هي الإجابة: منهج إبداعي للاستقصاء والبصيرة والأثر المعزَّز بالذكاء الاصطناعي'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 20 October 2026 to 21 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 20 أكتوبر 2026 إلى 21 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-navigating-transitions-during-ai-drive', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-10-22', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/navigating-transitions-during-ai-driven-change/a056g00000URaaWAAT.html',
      title: {
        en: 'Navigating Transitions During AI-Driven Change',
        ar: 'إدارة مراحل الانتقال في ظل التغيير المدفوع بالذكاء الاصطناعي'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 22 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 22 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-agentic-ai-business-implications-and-a', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-11-02', days: 3, price: 7900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/agentic-ai/a05U100000D0sLtIAJ.html',
      title: {
        en: 'Agentic AI: Business Implications and Applications',
        ar: 'الذكاء الاصطناعي الوكيل: تطبيقاته وانعكاساته على الأعمال'
      },
      summary: {
        en: 'A 3-day on-campus program from MIT Sloan School of Management, running 2 November 2026 to 4 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 2 نوفمبر 2026 إلى 4 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-understanding-global-markets-macroecon', school: 's-mit-sloan-school-of-management', subject: 'finance', format: 'in-person',
      start: '2026-11-02', days: 3, price: 5500, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/understanding-global-markets/a056g00000URaZRAA1.html',
      title: {
        en: 'Understanding Global Markets: Macroeconomics for Executives',
        ar: 'فهم الأسواق العالمية: الاقتصاد الكلي للتنفيذيين'
      },
      summary: {
        en: 'A 3-day on-campus program from MIT Sloan School of Management, running 2 November 2026 to 4 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 2 نوفمبر 2026 إلى 4 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-evolving-as-a-leader-in-turbulent-time', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-11-03', days: 2, price: 5300, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/evolving-as-a-leader-in-turbulent-times/a056g00000URaNAAA1.html',
      title: { en: 'Evolving as a Leader in Turbulent Times', ar: 'التطور القيادي في أوقات الاضطراب' },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 3 November 2026 to 4 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 3 نوفمبر 2026 إلى 4 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-organizational-resilience-a-s', school: 's-mit-sloan-school-of-management', subject: 'operations', format: 'in-person',
      start: '2026-11-05', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/building-organizational-resilience/a056g00000URaadAAD.html',
      title: {
        en: 'Building Organizational Resilience: A System Approach to Mitigating Risk and Uncertainty',
        ar: 'بناء المرونة المؤسسية: نهج منظومي للحد من المخاطر وعدم اليقين'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 5 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 5 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-creative-transformation-amid-rapid-cha', school: 's-mit-sloan-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-11-05', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/creative-transformation-amid-rapid-change/a054v00000rgRvwAAE.html',
      title: {
        en: 'Creative Transformation Amid Rapid Change: Embracing the Unexpected',
        ar: 'التحول الإبداعي في خضم التغيير المتسارع: استيعاب المفاجآت'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 5 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 5 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-unlocking-the-power-of-perspectives-pr', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-11-05', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/unlocking-the-power-of-perspectives/a056g00000URqsrAAD.html',
      title: {
        en: 'Unlocking the Power of Perspectives: Problem Solving with Clarity, Creativity, and Collaboration',
        ar: 'إطلاق قوة وجهات النظر: حل المشكلات بوضوح وإبداع وتعاون'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 5 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 5 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-shaping-the-future-of-real-estate-huma', school: 's-mit-sloan-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-11-08', days: 6, price: 12500, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/shaping-the-future-of-real-estate/a05U1000008AVXOIA4.html',
      title: {
        en: 'Shaping the Future of Real Estate: Human, Digital, and Physical Innovation Strategy',
        ar: 'صياغة مستقبل القطاع العقاري: استراتيجية الابتكار البشري والرقمي والمادي'
      },
      summary: {
        en: 'A 6-day on-campus program from MIT Sloan School of Management, running 8 November 2026 to 13 November 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 8 نوفمبر 2026 إلى 13 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-the-ai-driven-organization', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-11-09', days: 5, price: 12900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/leading-the-ai-driven-organization/a054v00000r9U5cAAE.html',
      title: { en: 'Leading the AI-Driven Organization', ar: 'قيادة المؤسسة القائمة على الذكاء الاصطناعي' },
      summary: {
        en: 'A 5-day on-campus program from MIT Sloan School of Management, running 9 November 2026 to 13 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 9 نوفمبر 2026 إلى 13 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-systematic-innovation-of-products-proc', school: 's-mit-sloan-school-of-management', subject: 'operations', format: 'in-person',
      start: '2026-11-09', days: 5, price: 11100, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/systematic-innovation-of-products--processes--and-services/a056g00000URaN2AAL.html',
      title: {
        en: 'Systematic Innovation of Products, Processes, and Services',
        ar: 'الابتكار المنهجي للمنتجات والعمليات والخدمات'
      },
      summary: {
        en: 'A 5-day on-campus program from MIT Sloan School of Management, running 9 November 2026 to 13 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 9 نوفمبر 2026 إلى 13 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-developing-and-managing-a-successful-t', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-11-10', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/developing-and-managing-a-successful-technology-strategy/a056g00000URaMpAAL.html',
      title: {
        en: 'Developing and Managing a Successful Technology Strategy',
        ar: 'صياغة استراتيجية تقنية ناجحة وإدارتها'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 10 November 2026 to 11 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 10 نوفمبر 2026 إلى 11 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-fundamentals-of-finance-for-the-techni', school: 's-mit-sloan-school-of-management', subject: 'finance', format: 'in-person',
      start: '2026-11-10', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/fundamentals-of-finance-for-the-technical-executive/a056g00000URaMtAAL.html',
      title: { en: 'Fundamentals of Finance for the Technical Executive', ar: 'أساسيات المالية للتنفيذي التقني' },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 10 November 2026 to 11 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 10 نوفمبر 2026 إلى 11 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-persuading-with-data', school: 's-mit-sloan-school-of-management', subject: 'data', format: 'in-person',
      start: '2026-11-12', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/persuading-with-data/a056g00000YHYWsAAP.html',
      title: { en: 'Persuading with Data', ar: 'الإقناع بالبيانات' },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 12 November 2026 to 13 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 12 نوفمبر 2026 إلى 13 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-business-model-innovation-for-organiza', school: 's-mit-sloan-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-11-17', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/business-model-innovation-for-organizational-transformation/a056g00000URaabAAD.html',
      title: {
        en: 'Business Model Innovation for Organizational Transformation',
        ar: 'ابتكار نماذج الأعمال لتحقيق التحول المؤسسي'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 17 November 2026 to 18 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 17 نوفمبر 2026 إلى 18 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-crisis-leadership-strategies-for-high', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-11-17', days: 2, price: 5500, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/crisis-leadership/a05U100000F9TN8IAN.html',
      title: {
        en: 'Crisis Leadership: Strategies for High-Stakes Decision-Making',
        ar: 'القيادة في الأزمات: استراتيجيات اتخاذ القرار في المواقف الحرجة'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 17 November 2026 to 18 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 17 نوفمبر 2026 إلى 18 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-negotiation-for-executives', school: 's-mit-sloan-school-of-management', subject: 'negotiation', format: 'in-person',
      start: '2026-11-17', days: 2, price: 5300, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/negotiation-for-executives/a056g00000URaZHAA1.html',
      title: { en: 'Negotiation for Executives', ar: 'التفاوض للتنفيذيين' },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 17 November 2026 to 18 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 17 نوفمبر 2026 إلى 18 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-by-design-innovation-proces', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-11-19', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/leadership-by-design/a056g00000URaZqAAL.html',
      title: {
        en: 'Leadership by Design: Innovation Process and Culture',
        ar: 'القيادة بالتصميم: عملية الابتكار وثقافته'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 19 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 19 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-personal-productivity-in-an-ai-enabled', school: 's-mit-sloan-school-of-management', subject: 'people', format: 'in-person',
      start: '2026-11-19', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/personal-productivity-in-an-ai-enabled-workplace/a056g00000URaZTAA1.html',
      title: {
        en: 'Personal Productivity in an AI-Enabled Workplace',
        ar: 'الإنتاجية الشخصية في بيئة عمل مدعومة بالذكاء الاصطناعي'
      },
      summary: {
        en: 'A 2-day on-campus program from MIT Sloan School of Management, running 19 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 19 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-breakthrough-customer-experience-cx-st', school: 's-mit-sloan-school-of-management', subject: 'marketing', format: 'online',
      start: '2026-11-30', days: 3, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/breakthrough-customer-experience-cx-strategy/a056g00000URaahAAD.html',
      title: { en: 'Breakthrough Customer Experience (CX) Strategy', ar: 'استراتيجية نوعية لتجربة العميل (CX)' },
      summary: {
        en: 'A 3-day online program from MIT Sloan School of Management, running 30 November 2026 to 2 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 3 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 30 نوفمبر 2026 إلى 2 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-managing-product-platforms-delivering', school: 's-mit-sloan-school-of-management', subject: 'operations', format: 'online',
      start: '2026-11-30', days: 4, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/managing-product-platforms/a056g00000URaZcAAL.html',
      title: {
        en: 'Managing Product Platforms: Delivering Variety and Realizing Synergies',
        ar: 'إدارة منصات المنتجات: تحقيق التنوع واستثمار أوجه التكامل'
      },
      summary: {
        en: 'A 4-day online program from MIT Sloan School of Management, running 30 November 2026 to 3 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 4 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 30 نوفمبر 2026 إلى 3 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-innovation-in-the-age-of-ai', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-12-01', days: 4, price: 9800, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/innovation-in-the-age-of-ai/a05U100000Fkn57IAB.html',
      title: { en: 'Innovation in the Age of AI', ar: 'الابتكار في عصر الذكاء الاصطناعي' },
      summary: {
        en: 'A 4-day on-campus program from MIT Sloan School of Management, running 1 December 2026 to 4 December 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 1 ديسمبر 2026 إلى 4 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-managing-complex-technical-projects', school: 's-mit-sloan-school-of-management', subject: 'operations', format: 'online',
      start: '2026-12-02', days: 3, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/managing-complex-technical-projects/a056g00000URaMzAAL.html',
      title: { en: 'Managing Complex Technical Projects', ar: 'إدارة المشاريع التقنية المعقدة' },
      summary: {
        en: 'A 3-day online program from MIT Sloan School of Management, running 2 December 2026 to 4 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 3 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 2 ديسمبر 2026 إلى 4 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-communication-and-persuasion-in-the-di', school: 's-mit-sloan-school-of-management', subject: 'marketing', format: 'online',
      start: '2026-12-08', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/communication-and-persuasion-in-the-digital-age/a056g00000URaZWAA1.html',
      title: { en: 'Communication and Persuasion in the Digital Age', ar: 'التواصل والإقناع في العصر الرقمي' },
      summary: {
        en: 'A 2-day online program from MIT Sloan School of Management, running 8 December 2026 to 9 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة يومين من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 8 ديسمبر 2026 إلى 9 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-disciplined-entrepreneurship-a-systema', school: 's-mit-sloan-school-of-management', subject: 'entrepreneurship', format: 'online',
      start: '2026-12-08', days: 4, price: 5300, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/disciplined-entrepreneurship/a056g00000URaagAAD.html',
      title: {
        en: 'Disciplined Entrepreneurship: A Systematic Approach for Building Innovative Products and Ventures',
        ar: 'ريادة الأعمال المنضبطة: منهج منهجي لبناء منتجات ومشاريع ابتكارية'
      },
      summary: {
        en: 'A 4-day online program from MIT Sloan School of Management, running 8 December 2026 to 11 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 4 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 8 ديسمبر 2026 إلى 11 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-platform-strategy-designing-for-humans', school: 's-mit-sloan-school-of-management', subject: 'strategy', format: 'online',
      start: '2026-12-08', days: 4, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/platform-strategy/a056g00000URaZVAA1.html',
      title: {
        en: 'Platform Strategy: Designing for Humans and AI Agents',
        ar: 'استراتيجية المنصات: التصميم للبشر والوكلاء الأذكياء'
      },
      summary: {
        en: 'A 4-day online program from MIT Sloan School of Management, running 8 December 2026 to 11 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 4 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 8 ديسمبر 2026 إلى 11 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-entrepreneurship-development-program', school: 's-mit-sloan-school-of-management', subject: 'entrepreneurship', format: 'in-person',
      start: '2027-01-17', days: 6, price: 13300, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/entrepreneurship-development-program/a056g00000URaMsAAL.html',
      title: { en: 'Entrepreneurship Development Program', ar: 'برنامج تطوير ريادة الأعمال' },
      summary: {
        en: 'A 6-day on-campus program from MIT Sloan School of Management, running 17 January 2027 to 22 January 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 17 يناير 2027 إلى 22 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-executive-academy', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'in-person',
      start: '2027-01-18', days: 10, price: 24500, langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executive.mit.edu/course/ai-executive-academy/a05U1000002o7uoIAA.html',
      title: { en: 'AI Executive Academy', ar: 'أكاديمية الذكاء الاصطناعي التنفيذية' },
      summary: {
        en: 'A 10-day on-campus program from MIT Sloan School of Management, running 18 January 2027 to 29 January 2027.',
        ar: 'برنامج حضوري لمدة 10 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 18 يناير 2027 إلى 29 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-strategic-change-how-to-really', school: 's-mit-sloan-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2027-06-14', days: 5, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/leading-strategic-change/a054v00000rfYrsAAE.html',
      title: {
        en: 'Leading Strategic Change: How to Really Deliver the Shift Your Organization Needs',
        ar: 'قيادة التغيير الاستراتيجي: كيف تحقق فعليًا التحول الذي تحتاجه مؤسستك'
      },
      summary: {
        en: 'A 5-day on-campus program from MIT Sloan School of Management, running 14 June 2027 to 18 June 2027.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 14 يونيو 2027 إلى 18 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-business-dynamics-mit-s-approach-to-di', school: 's-mit-sloan-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2027-06-21', days: 5, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/business-dynamics/a056g00000URaMkAAL.html',
      title: {
        en: "Business Dynamics: MIT's Approach to Diagnosing and Solving Complex Business Problems",
        ar: 'ديناميكيات الأعمال: منهج معهد MIT في تشخيص المشكلات التجارية المعقدة وحلها'
      },
      summary: {
        en: 'A 5-day on-campus program from MIT Sloan School of Management, running 21 June 2027 to 25 June 2027.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 21 يونيو 2027 إلى 25 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-women-s-leadership-program', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2027-06-21', days: 4, price: 9300, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/women-s-leadership-program/a054v00000rfdVZAAY.html',
      title: { en: "Women's Leadership Program", ar: 'برنامج القيادة النسائية' },
      summary: {
        en: 'A 4-day on-campus program from MIT Sloan School of Management, running 21 June 2027 to 24 June 2027.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 21 يونيو 2027 إلى 24 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-global-executive-academy', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2027-07-13', days: 8, price: 21000, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.mit.edu/course/global-executive-academy/a056g00000URaZQAA1.html',
      title: { en: 'Global Executive Academy', ar: 'الأكاديمية التنفيذية العالمية' },
      summary: {
        en: 'A 8-day on-campus program from MIT Sloan School of Management, running 13 July 2027 to 22 July 2027.',
        ar: 'برنامج حضوري لمدة 8 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 13 يوليو 2027 إلى 22 يوليو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-high-performing-teams', school: 's-michigan-ross-executive-education', subject: 'leadership', format: 'in-person',
      start: '2026-09-15', days: 4, price: 8900, langs: ['en'], popularity: 50, sourceUrl: 'https://michiganross.umich.edu/programs/executive-education/leading-high-performing-teams-0?event=13907',
      title: { en: 'Leading High-Performing Teams', ar: 'قيادة الفرق عالية الأداء' },
      summary: {
        en: 'A 4-day on-campus program from Michigan Ross Executive Education, running 15 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من التعليم التنفيذي في كلية روس بجامعة ميشيغان، من 15 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executive-presence-through-strategic-c', school: 's-michigan-ross-executive-education', subject: 'leadership', format: 'in-person',
      start: '2026-10-27', days: 3, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://michiganross.umich.edu/programs/executive-education/executive-presence-through-strategic-communication?event=13980',
      title: { en: 'Executive Presence Through Strategic Communication', ar: 'الحضور التنفيذي عبر التواصل الاستراتيجي' },
      summary: {
        en: 'A 3-day on-campus program from Michigan Ross Executive Education, running 27 October 2026 to 29 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من التعليم التنفيذي في كلية روس بجامعة ميشيغان، من 27 أكتوبر 2026 إلى 29 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-enabled-management-and-decision-mak', school: 's-michigan-ross-executive-education', subject: 'data', format: 'blended',
      start: '2026-11-04', days: 10, price: 7000, langs: ['en'], popularity: 50, sourceUrl: 'https://michiganross.umich.edu/programs/executive-education/ai-enabled-management-and-decision-making?event=13981',
      title: { en: 'AI-Enabled Management and Decision-Making', ar: 'الإدارة واتخاذ القرار بدعم الذكاء الاصطناعي' },
      summary: {
        en: 'A 10-day blended program from Michigan Ross Executive Education, running 4 November 2026 to 18 November 2026.',
        ar: 'برنامج مدمج لمدة 10 أيام من التعليم التنفيذي في كلية روس بجامعة ميشيغان، من 4 نوفمبر 2026 إلى 18 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-emerging-leaders-program-becoming-a-tr', school: 's-michigan-ross-executive-education', subject: 'leadership', format: 'in-person',
      start: '2027-04-26', days: 5, price: 10700, langs: ['en'], popularity: 50, sourceUrl: 'https://michiganross.umich.edu/programs/executive-education/emerging-leaders-program-becoming-transformational-leader?event=14173',
      title: {
        en: 'Emerging Leaders Program: Becoming a Transformational Leader',
        ar: 'برنامج القادة الصاعدين: نحو قيادة تحويلية'
      },
      summary: {
        en: 'A 5-day on-campus program from Michigan Ross Executive Education, running 26 April 2027 to 30 April 2027.',
        ar: 'برنامج حضوري لمدة 5 أيام من التعليم التنفيذي في كلية روس بجامعة ميشيغان، من 26 أبريل 2027 إلى 30 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-leaders-program-vision-strat', school: 's-michigan-ross-executive-education', subject: 'leadership', format: 'in-person',
      start: '2027-05-24', days: 5, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://michiganross.umich.edu/programs/executive-education/strategic-leaders-program-vision-strategy-and-managing-organization?event=14167',
      title: {
        en: 'Strategic Leaders Program: Vision, Strategy, and Managing the Organization to Drive Results',
        ar: 'برنامج القادة الاستراتيجيين: الرؤية والاستراتيجية وإدارة المؤسسة لتحقيق النتائج'
      },
      summary: {
        en: 'A 5-day on-campus program from Michigan Ross Executive Education, running 24 May 2027 to 28 May 2027.',
        ar: 'برنامج حضوري لمدة 5 أيام من التعليم التنفيذي في كلية روس بجامعة ميشيغان، من 24 مايو 2027 إلى 28 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-advanced-human-resource-executive--2', school: 's-michigan-ross-executive-education', subject: 'people', format: 'in-person',
      start: '2027-07-12', days: 10, price: 25800, langs: ['en'], popularity: 50, sourceUrl: 'https://michiganross.umich.edu/programs/executive-education/advanced-human-resource-executive-program?event=14354',
      title: { en: 'Advanced Human Resource Executive Program', ar: 'البرنامج التنفيذي المتقدم للموارد البشرية' },
      summary: {
        en: 'A 10-day on-campus program from Michigan Ross Executive Education, running 12 July 2027 to 23 July 2027.',
        ar: 'برنامج حضوري لمدة 10 أيام من التعليم التنفيذي في كلية روس بجامعة ميشيغان، من 12 يوليو 2027 إلى 23 يوليو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-development-programme', school: 's-nus-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-21', days: 5, price: 8990, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/leadership-development-programme/',
      title: { en: 'Leadership Development Programme', ar: 'برنامج تطوير القيادات' },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 21 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 21 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-general-management-programme', school: 's-nus-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-22', days: 8, price: 13290, currency: 'SGD', langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/general-management-programme/',
      title: { en: 'General Management Programme', ar: 'برنامج الإدارة العامة' },
      summary: {
        en: 'A 8-day on-campus program from NUS Business School, running 22 September 2026 to 1 October 2026.',
        ar: 'برنامج حضوري لمدة 8 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 22 سبتمبر 2026 إلى 1 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-marketing-strategy-in-a-digital-world', school: 's-nus-business-school', subject: 'marketing', format: 'in-person',
      start: '2026-09-28', days: 5, price: 5722, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/marketing-strategy-in-a-digital-world/',
      title: { en: 'Marketing Strategy in a Digital World', ar: 'الاستراتيجية التسويقية في عالم رقمي' },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 28 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 28 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-singapore-corporate-income-tax', school: 's-nus-business-school', subject: 'finance', format: 'blended',
      start: '2026-09-28', days: 12, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/singapore-corporate-income-tax-frc/',
      title: { en: 'Singapore Corporate Income Tax', ar: 'ضريبة الدخل على الشركات في سنغافورة' },
      summary: {
        en: 'A 12-day blended program from NUS Business School, running 28 September 2026 to 9 October 2026.',
        ar: 'برنامج مدمج لمدة 12 يومًا من كلية الأعمال بجامعة سنغافورة الوطنية، من 28 سبتمبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-digital-business-transformation', school: 's-nus-business-school', subject: 'digital', format: 'blended',
      start: '2026-10-05', days: 10, price: 5886, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/digital-business-transformation/',
      title: { en: 'Digital Business Transformation', ar: 'التحول الرقمي للأعمال' },
      summary: {
        en: 'A 10-day blended program from NUS Business School, running 5 October 2026 to 15 October 2026.',
        ar: 'برنامج مدمج لمدة 10 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 5 أكتوبر 2026 إلى 15 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-labour-and-employment-law', school: 's-nus-business-school', subject: 'people', format: 'blended',
      start: '2026-10-05', days: 10, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/labour-and-employment-law/',
      title: { en: 'Labour and Employment Law', ar: 'قانون العمل والتوظيف' },
      summary: {
        en: 'A 10-day blended program from NUS Business School, running 5 October 2026 to 12 October 2026.',
        ar: 'برنامج مدمج لمدة 10 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 5 أكتوبر 2026 إلى 12 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-and-motivating-difficult-emplo', school: 's-nus-business-school', subject: 'people', format: 'blended',
      start: '2026-10-12', days: 5, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/leading-and-motivating-difficult-employees-frc/',
      title: { en: 'Leading and Motivating Difficult Employees', ar: 'قيادة الموظفين صعبي التعامل وتحفيزهم' },
      summary: {
        en: 'A 5-day blended program from NUS Business School, running 12 October 2026 to 16 October 2026.',
        ar: 'برنامج مدمج لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 12 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-transformational-change-for-ag', school: 's-nus-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-10-19', days: 5, price: 5722, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/leading-transformational-change-for-agility-and-sustainability/',
      title: {
        en: 'Leading Transformational Change for Agility and Sustainability',
        ar: 'قيادة التغيير التحويلي لتحقيق المرونة والاستدامة'
      },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 19 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 19 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-marketing-in-the-digital-age', school: 's-nus-business-school', subject: 'marketing', format: 'blended',
      start: '2026-10-19', days: 10, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/marketing-in-the-digital-age/',
      title: { en: 'Marketing in the Digital AGE', ar: 'التسويق في العصر الرقمي' },
      summary: {
        en: 'A 10-day blended program from NUS Business School, running 19 October 2026 to 30 October 2026.',
        ar: 'برنامج مدمج لمدة 10 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 19 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-carbon-management-for-corporate-sustai', school: 's-nus-business-school', subject: 'sustainability', format: 'in-person',
      start: '2026-10-28', days: 3, price: 3434, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/carbon-management-for-corporate-sustainability-key-skill-for-leaders/',
      title: {
        en: 'Carbon Management for Corporate Sustainability : the Key Skill for Leaders',
        ar: 'إدارة الكربون من أجل الاستدامة المؤسسية: المهارة الأساسية للقادة'
      },
      summary: {
        en: 'A 3-day on-campus program from NUS Business School, running 28 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 28 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-emerging-leaders-programme', school: 's-nus-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-11-11', days: 5, price: 5722, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/emerging-leaders-programme/',
      title: { en: 'Emerging Leaders Programme', ar: 'برنامج القادة الصاعدين' },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 11 November 2026 to 17 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 11 نوفمبر 2026 إلى 17 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-negotiations-and-conflict-management', school: 's-nus-business-school', subject: 'negotiation', format: 'blended',
      start: '2026-11-12', days: 8, price: 5886, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/negotiations-and-conflict-management/',
      title: { en: 'Negotiations and Conflict Management', ar: 'التفاوض وإدارة النزاعات' },
      summary: {
        en: 'A 8-day blended program from NUS Business School, running 12 November 2026 to 19 November 2026.',
        ar: 'برنامج مدمج لمدة 8 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 12 نوفمبر 2026 إلى 19 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-accounting-finance-for-non-financial-m', school: 's-nus-business-school', subject: 'finance', format: 'in-person',
      start: '2026-11-16', days: 5, price: 5722, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/accounting-finance-for-non-financial-managers/',
      title: { en: 'Accounting & Finance for Non-Financial Managers', ar: 'المحاسبة والتمويل للمديرين غير الماليين' },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 16 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 16 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-driving-strategic-innovation-2', school: 's-nus-business-school', subject: 'strategy', format: 'in-person',
      start: '2026-11-16', days: 5, price: 7074, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/driving-strategic-innovation/',
      title: { en: 'Driving Strategic Innovation', ar: 'قيادة الابتكار الاستراتيجي' },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 16 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 16 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-python-for-business-analytics', school: 's-nus-business-school', subject: 'data', format: 'in-person',
      start: '2026-11-16', days: 3, price: 3270, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/python-for-business-analytics/',
      title: { en: 'Python for Business Analytics', ar: 'بايثون لتحليلات الأعمال' },
      summary: {
        en: 'A 3-day on-campus program from NUS Business School, running 16 November 2026 to 18 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 16 نوفمبر 2026 إلى 18 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-for-leaders-leveraging-data-analyti', school: 's-nus-business-school', subject: 'data', format: 'in-person',
      start: '2026-11-23', days: 5, price: 6529, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/ai-for-leaders-leveraging-data-analytics-for-business/',
      title: {
        en: 'AI for Leaders: Leveraging Data Analytics for Business',
        ar: 'الذكاء الاصطناعي للقادة: توظيف تحليلات البيانات في الأعمال'
      },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 23 November 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 23 نوفمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-management-in-disruptive-tim', school: 's-nus-business-school', subject: 'strategy', format: 'in-person',
      start: '2026-11-23', days: 5, price: 7590, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/strategic-management-in-disruptive-times/',
      title: { en: 'Strategic Management in Disruptive Times', ar: 'الإدارة الاستراتيجية في أوقات التحوّلات الجذرية' },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 23 November 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 23 نوفمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-for-finance-leaders-strategy-perfor', school: 's-nus-business-school', subject: 'finance', format: 'in-person',
      start: '2026-12-01', days: 4, price: 4578, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/ai-agent-for-finance/',
      title: {
        en: 'AI for Finance Leaders – Strategy, Performance, and Control',
        ar: 'الذكاء الاصطناعي لقادة التمويل: الاستراتيجية والأداء والرقابة'
      },
      summary: {
        en: 'A 4-day on-campus program from NUS Business School, running 1 December 2026 to 4 December 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 1 ديسمبر 2026 إلى 4 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-social-and-sustainable-investing', school: 's-nus-business-school', subject: 'sustainability', format: 'in-person',
      start: '2026-12-02', days: 2, price: 2180, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/social-and-sustainable-investing/',
      title: { en: 'Social and Sustainable Investing', ar: 'الاستثمار الاجتماعي والمستدام' },
      summary: {
        en: 'A 2-day on-campus program from NUS Business School, running 2 December 2026 to 3 December 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الأعمال بجامعة سنغافورة الوطنية، من 2 ديسمبر 2026 إلى 3 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-agentic-enterprises-leveraging-ai-agen', school: 's-nus-business-school', subject: 'digital', format: 'in-person',
      start: '2026-12-07', days: 5, price: 5722, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/agentic-enterprises-leveraging-ai-agents-for-business/',
      title: {
        en: 'Agentic Enterprises – Leveraging AI Agents for Business',
        ar: 'المؤسسات المعتمدة على الوكلاء الاصطناعيين: توظيف وكلاء الذكاء الاصطناعي في الأعمال'
      },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 7 December 2026 to 11 December 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 7 ديسمبر 2026 إلى 11 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-human-resource-management', school: 's-nus-business-school', subject: 'people', format: 'in-person',
      start: '2026-12-07', days: 5, price: 5722, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/strategic-human-resource-management/',
      title: { en: 'Strategic Human Resource Management', ar: 'الإدارة الاستراتيجية للموارد البشرية' },
      summary: {
        en: 'A 5-day on-campus program from NUS Business School, running 7 December 2026 to 11 December 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 7 ديسمبر 2026 إلى 11 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-enhancing-banking-finance-with-ai-tool', school: 's-nus-business-school', subject: 'finance', format: 'in-person',
      start: '2026-12-14', days: 3, price: 3106, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/enhancing-banking-finance-with-ai-tools-risk-management-for-executives/',
      title: {
        en: 'Enhancing Banking & Finance with AI : Tools & Risk Management for Executives',
        ar: 'تعزيز الخدمات المصرفية والمالية بالذكاء الاصطناعي: الأدوات وإدارة المخاطر للتنفيذيين'
      },
      summary: {
        en: 'A 3-day on-campus program from NUS Business School, running 14 December 2026 to 16 December 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 14 ديسمبر 2026 إلى 16 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-human-resource-law', school: 's-nus-business-school', subject: 'people', format: 'in-person',
      start: '2027-01-07', days: 2, price: 2180, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/human-resource-law/',
      title: { en: 'Human Resource Law', ar: 'قانون الموارد البشرية' },
      summary: {
        en: 'A 2-day on-campus program from NUS Business School, running 7 January 2027 to 8 January 2027.',
        ar: 'برنامج حضوري لمدة يومين من كلية الأعمال بجامعة سنغافورة الوطنية، من 7 يناير 2027 إلى 8 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-sustainability-reporting-and-analysis', school: 's-nus-business-school', subject: 'sustainability', format: 'blended',
      start: '2027-01-07', days: 10, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/sustainability-reporting-and-analysis/',
      title: { en: 'Sustainability Reporting and Analysis', ar: 'إعداد تقارير الاستدامة وتحليلها' },
      summary: {
        en: 'A 10-day blended program from NUS Business School, running 7 January 2027 to 16 January 2027.',
        ar: 'برنامج مدمج لمدة 10 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 7 يناير 2027 إلى 16 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-analytics-for-leaders', school: 's-nus-business-school', subject: 'data', format: 'blended',
      start: '2027-01-08', days: 10, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/analytics-for-leaders-classroom-synchronous-e-learning/',
      title: { en: 'Analytics for Leaders', ar: 'تحليل البيانات للقادة' },
      summary: {
        en: 'A 10-day blended program from NUS Business School, running 8 January 2027 to 22 January 2027.',
        ar: 'برنامج مدمج لمدة 10 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 8 يناير 2027 إلى 22 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-in-supply-chain-operations', school: 's-nus-business-school', subject: 'operations', format: 'blended',
      start: '2027-01-11', days: 15, price: 5886, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/leadership-in-supply-chain-operations-sustainability/',
      title: {
        en: 'Leadership in Supply Chain , Operations & Sustainability',
        ar: 'القيادة في سلسلة الإمداد والعمليات والاستدامة'
      },
      summary: {
        en: 'A 15-day blended program from NUS Business School, running 11 January 2027 to 2 February 2027.',
        ar: 'برنامج مدمج لمدة 15 يومًا من كلية الأعمال بجامعة سنغافورة الوطنية، من 11 يناير 2027 إلى 2 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-artificial-intelligence-for-leaders-hr', school: 's-nus-business-school', subject: 'people', format: 'in-person',
      start: '2027-01-13', days: 3, price: 3434, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/ailhr/',
      title: {
        en: 'Artificial Intelligence for Leaders: HR Transformation with Generative AI',
        ar: 'الذكاء الاصطناعي للقادة: تحويل الموارد البشرية بالذكاء الاصطناعي التوليدي'
      },
      summary: {
        en: 'A 3-day on-campus program from NUS Business School, running 13 January 2027 to 15 January 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 13 يناير 2027 إلى 15 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-managing-change', school: 's-nus-business-school', subject: 'leadership', format: 'blended',
      start: '2027-01-19', days: 10, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/managing-change-synchronous-e-learning/',
      title: { en: 'Managing Change', ar: 'إدارة التغيير' },
      summary: {
        en: 'A 10-day blended program from NUS Business School, running 19 January 2027 to 27 January 2027.',
        ar: 'برنامج مدمج لمدة 10 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 19 يناير 2027 إلى 27 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-business-contracts', school: 's-nus-business-school', subject: 'negotiation', format: 'blended',
      start: '2027-03-01', days: 10, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/business-contracts-classroom/',
      title: { en: 'Business Contracts', ar: 'العقود التجارية' },
      summary: {
        en: 'A 10-day blended program from NUS Business School, running 1 March 2027 to 8 March 2027.',
        ar: 'برنامج مدمج لمدة 10 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 1 مارس 2027 إلى 8 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-managing-people-with-data', school: 's-nus-business-school', subject: 'data', format: 'blended',
      start: '2027-05-05', days: 10, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executive-education.nus.edu.sg/programmes/managing-people-with-data/',
      title: { en: 'Managing People with Data', ar: 'إدارة الأفراد بالاستناد إلى البيانات' },
      summary: {
        en: 'A 10-day blended program from NUS Business School, running 5 May 2027 to 12 May 2027.',
        ar: 'برنامج مدمج لمدة 10 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 5 مايو 2027 إلى 12 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-entrepreneurship-through-acquisition-a', school: 's-nyu-stern-school-of-business', subject: 'entrepreneurship', format: 'in-person',
      start: '2026-10-16', days: 2, price: 3500, langs: ['en'], popularity: 50, sourceUrl: 'https://execed.stern.nyu.edu/products/entrepreneurship-through-acquisition-a-proven-path-to-ownership',
      title: {
        en: 'Entrepreneurship Through Acquisition: A Proven Path to Ownership',
        ar: 'ريادة الأعمال عبر الاستحواذ: مسار مثبت نحو الملكية'
      },
      summary: {
        en: 'A 2-day on-campus program from NYU Stern School of Business, running 16 October 2026 to 17 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية شتيرن للأعمال بجامعة نيويورك، من 16 أكتوبر 2026 إلى 17 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-driving-roi-with-ai-powered-marketing', school: 's-nyu-stern-school-of-business', subject: 'marketing', format: 'in-person',
      start: '2026-11-04', days: 3, price: 4752, langs: ['en'], popularity: 50, sourceUrl: 'https://execed.stern.nyu.edu/products/roi-ai-marketing',
      title: {
        en: 'Driving ROI with AI-Powered Marketing',
        ar: 'تعزيز العائد على الاستثمار عبر التسويق المدعوم بالذكاء الاصطناعي'
      },
      summary: {
        en: 'A 3-day on-campus program from NYU Stern School of Business, running 4 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية شتيرن للأعمال بجامعة نيويورك، من 4 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-bundle-leading-business-transformation', school: 's-nyu-stern-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-09', days: 4, price: 6460, langs: ['en'], popularity: 50, sourceUrl: 'https://execed.stern.nyu.edu/products/bundle-leading-business-transformation-leading-in-the-age-of-ai',
      title: {
        en: 'BUNDLE: Leading Business Transformation & Leading in the Age of AI',
        ar: 'حزمة برامج: قيادة التحول المؤسسي وقيادة عصر الذكاء الاصطناعي'
      },
      summary: {
        en: 'A 4-day on-campus program from NYU Stern School of Business, running 9 November 2026 to 12 November 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية شتيرن للأعمال بجامعة نيويورك، من 9 نوفمبر 2026 إلى 12 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-in-the-age-of-ai', school: 's-nyu-stern-school-of-business', subject: 'digital', format: 'in-person',
      start: '2026-11-09', days: 2, price: 3344, langs: ['en'], popularity: 50, sourceUrl: 'https://execed.stern.nyu.edu/products/leading-in-the-age-of-ai',
      title: { en: 'Leading in the Age of AI', ar: 'القيادة في عصر الذكاء الاصطناعي' },
      summary: {
        en: 'A 2-day on-campus program from NYU Stern School of Business, running 9 November 2026 to 10 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية شتيرن للأعمال بجامعة نيويورك، من 9 نوفمبر 2026 إلى 10 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-training-for-high-potential', school: 's-nyu-stern-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-10', days: 2, price: 3344, langs: ['en'], popularity: 50, sourceUrl: 'https://execed.stern.nyu.edu/products/leadership-training-for-high-potentials',
      title: { en: 'Leadership Training for High Potentials', ar: 'التأهيل القيادي للكفاءات الواعدة' },
      summary: {
        en: 'A 2-day on-campus program from NYU Stern School of Business, running 10 November 2026 to 11 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية شتيرن للأعمال بجامعة نيويورك، من 10 نوفمبر 2026 إلى 11 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-business-transformation', school: 's-nyu-stern-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-11', days: 2, price: 3344, langs: ['en'], popularity: 50, sourceUrl: 'https://execed.stern.nyu.edu/products/leading-business-transformation',
      title: { en: 'Leading Business Transformation', ar: 'قيادة التحول المؤسسي' },
      summary: {
        en: 'A 2-day on-campus program from NYU Stern School of Business, running 11 November 2026 to 12 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية شتيرن للأعمال بجامعة نيويورك، من 11 نوفمبر 2026 إلى 12 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-developing-your-leadership-presence-vi', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'online',
      start: '2026-09-22', days: 9, price: 3300, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/leadership_presence-virtual.php',
      title: { en: 'Developing Your Leadership Presence - Virtual', ar: 'تطوير حضورك القيادي (عن بُعد)' },
      summary: {
        en: "A 9-day online program from Smith School of Business, Queen's University, running 22 September 2026 to 30 September 2026.",
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية سميث للأعمال بجامعة كوينز، من 22 سبتمبر 2026 إلى 30 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-learning-to-lead-virtual', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'online',
      start: '2026-09-24', days: 9, price: 2000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/learning-to-lead-virtual.php',
      title: { en: 'Learning to Lead - Virtual', ar: 'تعلّم القيادة (عن بُعد)' },
      summary: {
        en: "A 9-day online program from Smith School of Business, Queen's University, running 24 September 2026 to 2 October 2026.",
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية سميث للأعمال بجامعة كوينز، من 24 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-an-ai-ready-organization-found', school: 's-smith-school-of-business-queen-s-unive', subject: 'digital', format: 'in-person',
      start: '2026-09-29', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/intro-to-ai.php',
      title: {
        en: 'Leading an AI-Ready Organization: Foundations for Business Leaders',
        ar: 'قيادة مؤسسة جاهزة للذكاء الاصطناعي: أساسيات لقادة الأعمال'
      },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 29 September 2026 to 30 September 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 29 سبتمبر 2026 إلى 30 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-developing-your-leadership-presence', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-10-01', days: 2, price: 3900, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/leadership_presence.php',
      title: { en: 'Developing Your Leadership Presence', ar: 'تطوير حضورك القيادي' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 1 October 2026 to 2 October 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 1 أكتوبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-accounting-and-finance-fundamentals', school: 's-smith-school-of-business-queen-s-unive', subject: 'finance', format: 'in-person',
      start: '2026-10-05', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/principles_accounting.php',
      title: { en: 'Accounting and Finance Fundamentals', ar: 'أساسيات المحاسبة والتمويل' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 5 October 2026 to 6 October 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 5 أكتوبر 2026 إلى 6 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-closing-the-strategy-execution-gap', school: 's-smith-school-of-business-queen-s-unive', subject: 'strategy', format: 'online',
      start: '2026-10-08', days: 9, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/execution-gap-virtual.php',
      title: { en: 'Closing the Strategy-Execution Gap', ar: 'سد الفجوة بين الاستراتيجية والتنفيذ' },
      summary: {
        en: "A 9-day online program from Smith School of Business, Queen's University, running 8 October 2026 to 16 October 2026.",
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية سميث للأعمال بجامعة كوينز، من 8 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-thinking-turning-complexity', school: 's-smith-school-of-business-queen-s-unive', subject: 'strategy', format: 'in-person',
      start: '2026-10-08', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/competitive-strategy.php',
      title: {
        en: 'Strategic Thinking: Turning Complexity into Clarity',
        ar: 'التفكير الاستراتيجي: تحويل التعقيد إلى وضوح'
      },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 8 October 2026 to 9 October 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 8 أكتوبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-coaching-for-high-performance', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-10-14', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/coaching-high-performance.php',
      title: { en: 'Coaching for High Performance', ar: 'التدريب لتحقيق الأداء العالي' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 14 October 2026 to 15 October 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 14 أكتوبر 2026 إلى 15 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-public-executive-program', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-10-19', days: 5, price: 11000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/public_policy.php',
      title: { en: 'Public Executive Program', ar: 'البرنامج التنفيذي للقطاع العام' },
      summary: {
        en: "A 5-day on-campus program from Smith School of Business, Queen's University, running 19 October 2026 to 23 October 2026.",
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سميث للأعمال بجامعة كوينز، من 19 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-communicating-with-impact-virtual', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'online',
      start: '2026-10-22', days: 9, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/communicating-with-impact-virtual.php',
      title: { en: 'Communicating With Impact - Virtual', ar: 'التواصل المؤثر (عن بُعد)' },
      summary: {
        en: "A 9-day online program from Smith School of Business, Queen's University, running 22 October 2026 to 30 October 2026.",
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية سميث للأعمال بجامعة كوينز، من 22 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-planning-and-leading-change', school: 's-smith-school-of-business-queen-s-unive', subject: 'strategy', format: 'in-person',
      start: '2026-10-22', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/organizational_change.php',
      title: { en: 'Strategic Planning and Leading Change', ar: 'التخطيط الاستراتيجي وقيادة التغيير' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 22 October 2026 to 23 October 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 22 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-for-leaders', school: 's-smith-school-of-business-queen-s-unive', subject: 'digital', format: 'in-person',
      start: '2026-10-26', days: 5, price: 11000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/ai-for-leaders.php',
      title: { en: 'AI for Leaders', ar: 'الذكاء الاصطناعي للقادة' },
      summary: {
        en: "A 5-day on-campus program from Smith School of Business, Queen's University, running 26 October 2026 to 30 October 2026.",
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سميث للأعمال بجامعة كوينز، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-learning-to-lead', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-11-02', days: 2, price: 2700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/learning-to-lead.php',
      title: { en: 'Learning to Lead', ar: 'تعلّم القيادة' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 2 November 2026 to 3 November 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 2 نوفمبر 2026 إلى 3 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-execution', school: 's-smith-school-of-business-queen-s-unive', subject: 'strategy', format: 'in-person',
      start: '2026-11-02', days: 5, price: 11000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/strategic-execution.php',
      title: { en: 'Strategic Execution', ar: 'التنفيذ الاستراتيجي' },
      summary: {
        en: "A 5-day on-campus program from Smith School of Business, Queen's University, running 2 November 2026 to 6 November 2026.",
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سميث للأعمال بجامعة كوينز، من 2 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-11-09', days: 5, price: 11000, currency: 'CAD', langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/leadership.php',
      title: { en: 'Leadership', ar: 'القيادة' },
      summary: {
        en: "A 5-day on-campus program from Smith School of Business, Queen's University, running 9 November 2026 to 13 November 2026.",
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سميث للأعمال بجامعة كوينز، من 9 نوفمبر 2026 إلى 13 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-project-leadership', school: 's-smith-school-of-business-queen-s-unive', subject: 'operations', format: 'in-person',
      start: '2026-11-09', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/project_leadership.php',
      title: { en: 'Project Leadership', ar: 'قيادة المشاريع' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 9 November 2026 to 10 November 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 9 نوفمبر 2026 إلى 10 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-negotiating-and-consensus-building', school: 's-smith-school-of-business-queen-s-unive', subject: 'negotiation', format: 'in-person',
      start: '2026-11-11', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/negotiating.php',
      title: { en: 'Negotiating and Consensus Building', ar: 'التفاوض وبناء التوافق' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 11 November 2026 to 12 November 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 11 نوفمبر 2026 إلى 12 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-accounting-and-finance-fundamentals-vi', school: 's-smith-school-of-business-queen-s-unive', subject: 'finance', format: 'online',
      start: '2026-11-16', days: 9, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/principles_accounting-virtual.php',
      title: { en: 'Accounting and Finance Fundamentals - Virtual', ar: 'أساسيات المحاسبة والتمويل (عن بُعد)' },
      summary: {
        en: "A 9-day online program from Smith School of Business, Queen's University, running 16 November 2026 to 24 November 2026.",
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية سميث للأعمال بجامعة كوينز، من 16 نوفمبر 2026 إلى 24 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-empowering-women-to-succeed-in-negotia', school: 's-smith-school-of-business-queen-s-unive', subject: 'negotiation', format: 'in-person',
      start: '2026-11-16', days: 3, price: 6600, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/empowering-women.php',
      title: { en: 'Empowering Women to Succeed in Negotiations', ar: 'تمكين المرأة للتفوق في التفاوض' },
      summary: {
        en: "A 3-day on-campus program from Smith School of Business, Queen's University, running 16 November 2026 to 18 November 2026.",
        ar: 'برنامج حضوري لمدة 3 أيام من كلية سميث للأعمال بجامعة كوينز، من 16 نوفمبر 2026 إلى 18 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-organizational-structure-and-culture', school: 's-smith-school-of-business-queen-s-unive', subject: 'people', format: 'in-person',
      start: '2026-11-16', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/organizational-structure.php',
      title: { en: 'Organizational Structure and Culture', ar: 'الهيكل التنظيمي والثقافة المؤسسية' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 16 November 2026 to 17 November 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 16 نوفمبر 2026 إلى 17 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-communicating-with-impact', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-11-23', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/communicating-with-impact.php',
      title: { en: 'Communicating With Impact', ar: 'التواصل المؤثر' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 23 November 2026 to 24 November 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 23 نوفمبر 2026 إلى 24 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-conflict-management', school: 's-smith-school-of-business-queen-s-unive', subject: 'negotiation', format: 'in-person',
      start: '2026-11-25', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/conflict-management.php',
      title: { en: 'Conflict Management', ar: 'إدارة النزاعات' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 25 November 2026 to 26 November 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 25 نوفمبر 2026 إلى 26 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-digital-transformation', school: 's-smith-school-of-business-queen-s-unive', subject: 'digital', format: 'in-person',
      start: '2026-11-30', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/leading-digital-transformation.php',
      title: { en: 'Leading Digital Transformation', ar: 'قيادة التحول الرقمي' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 30 November 2026 to 1 December 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 30 نوفمبر 2026 إلى 1 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-an-ai-powered-organization-st', school: 's-smith-school-of-business-queen-s-unive', subject: 'digital', format: 'in-person',
      start: '2026-12-09', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/ai-powered-organization.php',
      title: {
        en: 'Building an AI-Powered Organization: Strategy, Governance, and Transformation',
        ar: 'بناء مؤسسة مدعومة بالذكاء الاصطناعي: الاستراتيجية والحوكمة والتحول'
      },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 9 December 2026 to 10 December 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 9 ديسمبر 2026 إلى 10 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-emotional-intelligence-for-leaders', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-12-10', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/emotional-intelligence.php',
      title: { en: 'Emotional Intelligence for Leaders', ar: 'الذكاء العاطفي للقادة' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 10 December 2026 to 11 December 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 10 ديسمبر 2026 إلى 11 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-your-productivity-edge-with-a', school: 's-smith-school-of-business-queen-s-unive', subject: 'digital', format: 'in-person',
      start: '2026-12-14', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/building-productivity-ai.php',
      title: { en: 'Building Your Productivity Edge with AI', ar: 'تعزيز إنتاجيتك بالذكاء الاصطناعي' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 14 December 2026 to 15 December 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 14 ديسمبر 2026 إلى 15 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-project-leadership-virtual', school: 's-smith-school-of-business-queen-s-unive', subject: 'operations', format: 'online',
      start: '2027-02-03', days: 9, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://smith.queensu.ca/executiveeducation/programs/project_leadership-virtual.php',
      title: { en: 'Project Leadership - Virtual', ar: 'قيادة المشاريع (عن بُعد)' },
      summary: {
        en: "A 9-day online program from Smith School of Business, Queen's University, running 3 February 2027 to 11 February 2027.",
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية سميث للأعمال بجامعة كوينز، من 3 فبراير 2027 إلى 11 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-directors-consortium', school: 's-stanford-graduate-school-of-business', subject: 'finance', format: 'in-person',
      start: '2026-10-19', days: 5, price: 17000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/directors-consortium',
      title: { en: "Directors' Consortium", ar: 'ملتقى أعضاء مجالس الإدارة' },
      summary: {
        en: 'A 5-day on-campus program from Stanford Graduate School of Business, running 19 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 19 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-harnessing-ai-for-breakthrough-innovat', school: 's-stanford-graduate-school-of-business', subject: 'digital', format: 'in-person',
      start: '2026-11-08', days: 6, price: 18500, langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/harnessing-ai-breakthrough-innovation-strategic-impact',
      title: {
        en: 'Harnessing AI for Breakthrough Innovation and Strategic Impact',
        ar: 'توظيف الذكاء الاصطناعي لتحقيق ابتكار نوعي وأثر استراتيجي'
      },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 8 November 2026 to 13 November 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 8 نوفمبر 2026 إلى 13 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executive-program-in-leadership-the-ef', school: 's-stanford-graduate-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-15', days: 6, price: 17000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/executive-program-leadership',
      title: {
        en: 'Executive Program in Leadership: The Effective Use of Power',
        ar: 'البرنامج التنفيذي في القيادة: الاستخدام الفعال للسلطة'
      },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 15 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 15 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-finance-and-accounting-for-the-nonfina', school: 's-stanford-graduate-school-of-business', subject: 'finance', format: 'in-person',
      start: '2027-01-24', days: 6, price: 16000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/finance-accounting-nonfinancial-executive',
      title: {
        en: 'Finance and Accounting for the Nonfinancial Executive',
        ar: 'المالية والمحاسبة للتنفيذي غير المالي'
      },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 24 January 2027 to 29 January 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 24 يناير 2027 إلى 29 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-digital-transformation-leading-organiz', school: 's-stanford-graduate-school-of-business', subject: 'digital', format: 'in-person',
      start: '2027-02-14', days: 6, price: 18000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/digital-transformation',
      title: {
        en: 'Digital Transformation: Leading Organizational Change in the Age of AI',
        ar: 'التحول الرقمي: قيادة التغيير المؤسسي في عصر الذكاء الاصطناعي'
      },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 14 February 2027 to 19 February 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 14 فبراير 2027 إلى 19 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-ai-powered-organization', school: 's-stanford-graduate-school-of-business', subject: 'digital', format: 'in-person',
      start: '2027-03-21', days: 6, price: 18500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/ai-powered-organization',
      title: { en: 'The AI-Powered Organization', ar: 'المؤسسة المدعومة بالذكاء الاصطناعي' },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 21 March 2027 to 26 March 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 21 مارس 2027 إلى 26 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-design-thinking-bootcamp-make-impact-a', school: 's-stanford-graduate-school-of-business', subject: 'marketing', format: 'in-person',
      start: '2027-03-23', days: 4, price: 14000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/design-thinking-bootcamp',
      title: {
        en: 'Design Thinking Bootcamp: Make Impact and Drive Growth in Your Organization',
        ar: 'معسكر التفكير التصميمي: تحقيق الأثر ودفع النمو في مؤسستك'
      },
      summary: {
        en: 'A 4-day on-campus program from Stanford Graduate School of Business, running 23 March 2027 to 26 March 2027.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 23 مارس 2027 إلى 26 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executive-leadership-development', school: 's-stanford-graduate-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2027-03-28', days: 6, price: 18000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/executive-leadership-development',
      title: { en: 'Executive Leadership Development', ar: 'تطوير القيادة التنفيذية' },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 28 March 2027 to 2 April 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 28 مارس 2027 إلى 2 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-driving-innovation-and-new-ventures-in', school: 's-stanford-graduate-school-of-business', subject: 'entrepreneurship', format: 'in-person',
      start: '2027-04-11', days: 6, price: 16000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/driving-innovation-new-ventures-established-organizations',
      title: {
        en: 'Driving Innovation and New Ventures in Established Organizations',
        ar: 'قيادة الابتكار والمشاريع الجديدة في المؤسسات الراسخة'
      },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 11 April 2027 to 16 April 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 11 أبريل 2027 إلى 16 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-interpersonal-dynamics-for-high-perfor', school: 's-stanford-graduate-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2027-06-20', days: 6, price: 17500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/interpersonal-dynamics-high-performance-executives',
      title: {
        en: 'Interpersonal Dynamics for High-Performance Executives',
        ar: 'ديناميكيات العلاقات الشخصية للتنفيذيين عالي الأداء'
      },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 20 June 2027 to 25 June 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 20 يونيو 2027 إلى 25 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-stanford-ignite-full-time', school: 's-stanford-graduate-school-of-business', subject: 'entrepreneurship', format: 'in-person',
      start: '2027-06-20', days: 20, price: 19500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/stanford-ignite-full-time',
      title: { en: 'Stanford Ignite – Full-Time', ar: 'برنامج ستانفورد إيغنايت (Stanford Ignite) – بدوام كامل' },
      summary: {
        en: 'A 20-day on-campus program from Stanford Graduate School of Business, running 20 June 2027 to 14 July 2027.',
        ar: 'برنامج حضوري لمدة 20 يومًا من كلية ستانفورد للدراسات العليا في الأعمال، من 20 يونيو 2027 إلى 14 يوليو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-mergers-and-acquisitions', school: 's-stanford-graduate-school-of-business', subject: 'finance', format: 'in-person',
      start: '2027-07-11', days: 6, price: 17500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/mergers-acquisitions',
      title: { en: 'Mergers and Acquisitions', ar: 'الاندماج والاستحواذ' },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 11 July 2027 to 16 July 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 11 يوليو 2027 إلى 16 يوليو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executive-program-for-growing-companie', school: 's-stanford-graduate-school-of-business', subject: 'entrepreneurship', format: 'in-person',
      start: '2027-08-01', days: 13, price: 29500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/executive-program-growing-companies',
      title: { en: 'Executive Program for Growing Companies', ar: 'البرنامج التنفيذي للشركات النامية' },
      summary: {
        en: 'A 13-day on-campus program from Stanford Graduate School of Business, running 1 August 2027 to 13 August 2027.',
        ar: 'برنامج حضوري لمدة 13 يومًا من كلية ستانفورد للدراسات العليا في الأعمال، من 1 أغسطس 2027 إلى 13 أغسطس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-culture-as-a-competitive-advantage', school: 's-stanford-graduate-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2027-08-08', days: 6, price: 10000, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/culture-competitive-advantage',
      title: { en: 'Culture as a Competitive Advantage', ar: 'الثقافة المؤسسية كميزة تنافسية' },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 8 August 2027 to 13 August 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 8 أغسطس 2027 إلى 13 أغسطس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executive-program-in-strategy-and-orga', school: 's-stanford-graduate-school-of-business', subject: 'strategy', format: 'in-person',
      start: '2027-08-08', days: 13, price: 29500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/executive-program-strategy-organization',
      title: { en: 'Executive Program in Strategy and Organization', ar: 'البرنامج التنفيذي في الاستراتيجية والتنظيم' },
      summary: {
        en: 'A 13-day on-campus program from Stanford Graduate School of Business, running 8 August 2027 to 20 August 2027.',
        ar: 'برنامج حضوري لمدة 13 يومًا من كلية ستانفورد للدراسات العليا في الأعمال، من 8 أغسطس 2027 إلى 20 أغسطس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-stanford-nus-executive-program-in-inte', school: 's-stanford-graduate-school-of-business', subject: 'strategy', format: 'in-person',
      start: '2027-08-14', days: 10, price: 26150, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/stanford-nus-executive-program',
      title: {
        en: 'Stanford-NUS Executive Program in International Management',
        ar: 'البرنامج التنفيذي المشترك بين جامعة ستانفورد وجامعة سنغافورة الوطنية في الإدارة الدولية'
      },
      summary: {
        en: 'A 10-day on-campus program from Stanford Graduate School of Business, running 14 August 2027 to 28 August 2027.',
        ar: 'برنامج حضوري لمدة 10 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 14 أغسطس 2027 إلى 28 أغسطس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-emerging-cmo-strategic-marketing-l', school: 's-stanford-graduate-school-of-business', subject: 'marketing', format: 'in-person',
      start: '2027-08-15', days: 6, price: 17500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/emerging-cmo',
      title: {
        en: 'The Emerging CMO: Strategic Marketing Leadership',
        ar: 'المدير التسويقي الصاعد: القيادة التسويقية الاستراتيجية'
      },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 15 August 2027 to 20 August 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 15 أغسطس 2027 إلى 20 أغسطس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-innovative-product-leadership-the-emer', school: 's-stanford-graduate-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2027-08-22', days: 6, price: 17500, langs: ['en'], popularity: 50, sourceUrl: 'https://www.gsb.stanford.edu/exec-ed/programs/innovative-product-leadership',
      title: {
        en: 'Innovative Product Leadership: The Emerging Chief Product Officer',
        ar: 'القيادة الابتكارية للمنتجات: نحو مدير منتجات تنفيذي (Chief Product Officer)'
      },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 22 August 2027 to 27 August 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 22 أغسطس 2027 إلى 27 أغسطس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-project-management-for-administrative', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'in-person',
      start: '2026-09-15', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/project-management-administrative-professionals',
      title: { en: 'Project Management for Administrative Professionals', ar: 'إدارة المشاريع للمتخصصين الإداريين' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 15 September 2026 to 16 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 15 سبتمبر 2026 إلى 16 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-conflict-management-strategies', school: 's-ubc-sauder-school-of-business', subject: 'negotiation', format: 'in-person',
      start: '2026-09-16', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/conflict-management-strategies',
      title: { en: 'Conflict Management Strategies', ar: 'استراتيجيات إدارة النزاعات' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 16 September 2026 to 17 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 16 سبتمبر 2026 إلى 17 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-business-analysis-3-course-pack-1', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'online',
      start: '2026-09-21', days: 12, price: 3495, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/business-analysis-3-course-pack-1',
      title: { en: 'Business Analysis 3 Course Pack - 1', ar: 'حزمة تحليل الأعمال المكونة من 3 مقررات - 1' },
      summary: {
        en: 'A 12-day online program from UBC Sauder School of Business, running 21 September 2026 to 13 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 12 يومًا من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 21 سبتمبر 2026 إلى 13 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-business-analysis-3-course-pack-2', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'online',
      start: '2026-09-21', days: 12, price: 3495, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/business-analysis-3-course-pack-2',
      title: { en: 'Business Analysis 3 Course Pack - 2', ar: 'حزمة تحليل الأعمال المكونة من 3 مقررات - 2' },
      summary: {
        en: 'A 12-day online program from UBC Sauder School of Business, running 21 September 2026 to 13 December 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 12 يومًا من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 21 سبتمبر 2026 إلى 13 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-business-analysis-strategic-analysis-a', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'online',
      start: '2026-09-21', days: 4, price: 1250, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/business-analysis-strategic-analysis-and-elicitation',
      title: {
        en: 'Business Analysis Strategic Analysis and Elicitation',
        ar: 'التحليل الاستراتيجي واستخلاص المتطلبات في تحليل الأعمال'
      },
      summary: {
        en: 'A 4-day online program from UBC Sauder School of Business, running 21 September 2026 to 18 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 4 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 21 سبتمبر 2026 إلى 18 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-digital-asset-rights-risk-management-f', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'online',
      start: '2026-09-21', days: 4, price: 995, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/digital-asset-rights-risk-management-fundamentals',
      title: {
        en: 'Digital Asset, Rights & Risk Management Fundamentals',
        ar: 'أساسيات إدارة الأصول الرقمية والحقوق والمخاطر'
      },
      summary: {
        en: 'A 4-day online program from UBC Sauder School of Business, running 21 September 2026 to 18 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 4 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 21 سبتمبر 2026 إلى 18 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-financial-statement-analysis-for-non-f', school: 's-ubc-sauder-school-of-business', subject: 'finance', format: 'in-person',
      start: '2026-09-24', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/financial-statement-analysis-non-financial-managers',
      title: {
        en: 'Financial Statement Analysis for Non-Financial Managers',
        ar: 'تحليل القوائم المالية للمديرين غير الماليين'
      },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 24 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 24 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-decision-making', school: 's-ubc-sauder-school-of-business', subject: 'strategy', format: 'in-person',
      start: '2026-10-01', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/strategic-decision-making',
      title: { en: 'Strategic Decision Making', ar: 'صنع القرار الاستراتيجي' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 1 October 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 1 أكتوبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-transform-your-innovation-game', school: 's-ubc-sauder-school-of-business', subject: 'strategy', format: 'online',
      start: '2026-10-05', days: 7, price: 3685, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/transform-your-innovation-game',
      title: { en: 'Transform Your Innovation Game', ar: 'حوّل نهجك في الابتكار' },
      summary: {
        en: 'A 7-day online program from UBC Sauder School of Business, running 5 October 2026 to 30 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 7 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 5 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-lean-six-sigma-yellow-belt', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'in-person',
      start: '2026-10-06', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/lean-six-sigma-yellow-belt',
      title: { en: 'Lean Six Sigma Yellow Belt', ar: 'الحزام الأصفر في لين ستة سيغما (Lean Six Sigma)' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 6 October 2026 to 7 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 6 أكتوبر 2026 إلى 7 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-next-level-leadership', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-10-07', days: 3, price: 2990, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/next-level-leadership',
      title: { en: 'Next Level Leadership', ar: 'القيادة إلى المستوى التالي' },
      summary: {
        en: 'A 3-day on-campus program from UBC Sauder School of Business, running 7 October 2026 to 9 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 7 أكتوبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-coaching-and-mentoring', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-10-14', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/coaching-and-mentoring',
      title: { en: 'Coaching and Mentoring', ar: 'التدريب والإرشاد' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 14 October 2026 to 15 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 14 أكتوبر 2026 إلى 15 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-high-performance-people-skills', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-10-15', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/high-performance-people-skills',
      title: { en: 'High-Performance People Skills', ar: 'مهارات التعامل مع الأفراد لتحقيق الأداء المتميز' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 15 October 2026 to 16 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 15 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-lean-green-belt', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'in-person',
      start: '2026-10-19', days: 5, price: 3995, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/lean-green-belt',
      title: { en: 'Lean Green Belt', ar: 'الحزام الأخضر في منهجية لين (Lean)' },
      summary: {
        en: 'A 5-day on-campus program from UBC Sauder School of Business, running 19 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 19 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-product-management-essentials', school: 's-ubc-sauder-school-of-business', subject: 'strategy', format: 'online',
      start: '2026-10-19', days: 3, price: 995, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/product-management-essentials',
      title: { en: 'Product Management Essentials', ar: 'أساسيات إدارة المنتجات' },
      summary: {
        en: 'A 3-day online program from UBC Sauder School of Business, running 19 October 2026 to 8 November 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 3 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 19 أكتوبر 2026 إلى 8 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-advanced-leadership-program', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-10-26', days: 5, price: 5650, currency: 'CAD', langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/advanced-leadership-program',
      title: { en: 'Advanced Leadership Program', ar: 'برنامج القيادة المتقدم' },
      summary: {
        en: 'A 5-day on-campus program from UBC Sauder School of Business, running 26 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-employment-law-essentials', school: 's-ubc-sauder-school-of-business', subject: 'people', format: 'in-person',
      start: '2026-10-28', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/employment-law-essentials',
      title: { en: 'Employment Law Essentials', ar: 'أساسيات قانون العمل' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 28 October 2026 to 29 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 28 أكتوبر 2026 إلى 29 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-risk-management-for-business-leaders', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'in-person',
      start: '2026-11-04', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/risk-management-business-leaders',
      title: { en: 'Risk Management for Business Leaders', ar: 'إدارة المخاطر لقادة الأعمال' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 4 November 2026 to 5 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 4 نوفمبر 2026 إلى 5 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-fundamentals-of-accounting-for-non-fin', school: 's-ubc-sauder-school-of-business', subject: 'finance', format: 'in-person',
      start: '2026-11-05', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/fundamentals-accounting-non-financial-managers',
      title: {
        en: 'Fundamentals of Accounting for Non-Financial Managers',
        ar: 'أساسيات المحاسبة للمديرين غير الماليين'
      },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 5 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 5 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-people-through-change', school: 's-ubc-sauder-school-of-business', subject: 'people', format: 'in-person',
      start: '2026-11-09', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/leading-people-through-change',
      title: { en: 'Leading People Through Change', ar: 'قيادة الأفراد خلال التغيير' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 9 November 2026 to 10 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 9 نوفمبر 2026 إلى 10 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-advantage-ai-strategies-for-busines', school: 's-ubc-sauder-school-of-business', subject: 'digital', format: 'in-person',
      start: '2026-11-16', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/ai-advantage-ai-strategies-business-leaders',
      title: {
        en: 'AI Advantage - AI Strategies for Business Leaders',
        ar: 'ميزة الذكاء الاصطناعي: استراتيجيات الذكاء الاصطناعي لقادة الأعمال'
      },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 16 November 2026 to 17 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 16 نوفمبر 2026 إلى 17 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategies-and-skills-of-effective-neg', school: 's-ubc-sauder-school-of-business', subject: 'negotiation', format: 'in-person',
      start: '2026-11-17', days: 3, price: 2990, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/strategies-and-skills-effective-negotiation',
      title: { en: 'Strategies and Skills of Effective Negotiation', ar: 'استراتيجيات ومهارات التفاوض الفعّال' },
      summary: {
        en: 'A 3-day on-campus program from UBC Sauder School of Business, running 17 November 2026 to 19 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 17 نوفمبر 2026 إلى 19 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-persuasion-and-influence', school: 's-ubc-sauder-school-of-business', subject: 'negotiation', format: 'in-person',
      start: '2026-11-23', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/persuasion-and-influence',
      title: { en: 'Persuasion and Influence', ar: 'الإقناع والتأثير' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 23 November 2026 to 24 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 23 نوفمبر 2026 إلى 24 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-essentials-in-supervisory-skills', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-26', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/essentials-supervisory-skills',
      title: { en: 'Essentials in Supervisory Skills', ar: 'أساسيات المهارات الإشرافية' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 26 November 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 26 نوفمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-influence-without-authority', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-12-02', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/influence-without-authority',
      title: { en: 'Influence Without Authority', ar: 'التأثير بلا سلطة رسمية' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 2 December 2026 to 3 December 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 2 ديسمبر 2026 إلى 3 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-communication-strategies-for-english-a', school: 's-ubc-sauder-school-of-business', subject: 'people', format: 'in-person',
      start: '2026-12-03', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/communication-strategies-english-additional-language-professionals',
      title: {
        en: 'Communication Strategies for English as Additional Language Professionals',
        ar: 'استراتيجيات التواصل للمهنيين الناطقين بالإنجليزية كلغة إضافية'
      },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 3 December 2026 to 4 December 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 3 ديسمبر 2026 إلى 4 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategy-implementation-that-works', school: 's-ubc-sauder-school-of-business', subject: 'strategy', format: 'in-person',
      start: '2026-12-03', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/strategy-implementation-works',
      title: { en: 'Strategy Implementation that Works', ar: 'تنفيذ الاستراتيجية بفاعلية' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 3 December 2026 to 4 December 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 3 ديسمبر 2026 إلى 4 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-essential-management-skills', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-12-07', days: 5, price: 4390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/essential-management-skills',
      title: { en: 'Essential Management Skills', ar: 'المهارات الإدارية الأساسية' },
      summary: {
        en: 'A 5-day on-campus program from UBC Sauder School of Business, running 7 December 2026 to 11 December 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 7 ديسمبر 2026 إلى 11 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-excellence-for-administrati', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-12-07', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/leadership-excellence-administrative-professionals',
      title: {
        en: 'Leadership Excellence for Administrative Professionals',
        ar: 'التميز القيادي للعاملين في الشؤون الإدارية'
      },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 7 December 2026 to 8 December 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 7 ديسمبر 2026 إلى 8 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-applying-behavioural-science-for-organ', school: 's-ubc-sauder-school-of-business', subject: 'people', format: 'in-person',
      start: '2027-01-19', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/applying-behavioural-science-organizational-and-social-impact',
      title: {
        en: 'Applying Behavioural Science for Organizational and Social Impact',
        ar: 'توظيف علم السلوك لتحقيق الأثر التنظيمي والمجتمعي'
      },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 19 January 2027 to 20 January 2027.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 19 يناير 2027 إلى 20 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-an-effective-strategy', school: 's-ubc-sauder-school-of-business', subject: 'strategy', format: 'in-person',
      start: '2027-01-28', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/building-effective-strategy',
      title: { en: 'Building an Effective Strategy', ar: 'بناء استراتيجية فعالة' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 28 January 2027 to 29 January 2027.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 28 يناير 2027 إلى 29 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-smartsheet-for-project-managers', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'online',
      start: '2027-02-03', days: 2, price: 995, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/smartsheet-project-managers',
      title: { en: 'Smartsheet for Project Managers', ar: 'Smartsheet لمديري المشاريع' },
      summary: {
        en: 'A 2-day online program from UBC Sauder School of Business, running 3 February 2027 to 24 February 2027.',
        ar: 'برنامج عبر الإنترنت لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 3 فبراير 2027 إلى 24 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-planning-for-non-profit-lead', school: 's-ubc-sauder-school-of-business', subject: 'strategy', format: 'in-person',
      start: '2027-02-03', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/strategic-planning-non-profit-leaders',
      title: { en: 'Strategic Planning for Non-Profit Leaders', ar: 'التخطيط الاستراتيجي لقادة القطاع غير الربحي' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 3 February 2027 to 4 February 2027.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 3 فبراير 2027 إلى 4 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-stakeholder-engagement', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2027-02-08', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/strategic-stakeholder-engagement',
      title: { en: 'Strategic Stakeholder Engagement', ar: 'التواصل الاستراتيجي مع أصحاب المصلحة' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 8 February 2027 to 9 February 2027.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 8 فبراير 2027 إلى 9 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-digital-asset-rights-risk-management-b', school: 's-ubc-sauder-school-of-business', subject: 'digital', format: 'online',
      start: '2027-02-15', days: 9, price: 3495, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/digital-asset-rights-risk-management-bootcamp',
      title: {
        en: 'Digital Asset, Rights & Risk Management Bootcamp',
        ar: 'إدارة الأصول الرقمية والحقوق والمخاطر: برنامج مكثف'
      },
      summary: {
        en: 'A 9-day online program from UBC Sauder School of Business, running 15 February 2027 to 18 April 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 15 فبراير 2027 إلى 18 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-mini-mba-essential-business-skills', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'online',
      start: '2027-02-16', days: 11, price: 5650, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/mini-mba-essential-business-skills',
      title: {
        en: 'Mini-MBA: Essential Business Skills',
        ar: 'برنامج الماجستير المصغّر في إدارة الأعمال: المهارات الأساسية'
      },
      summary: {
        en: 'A 11-day online program from UBC Sauder School of Business, running 16 February 2027 to 12 March 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 11 يومًا من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 16 فبراير 2027 إلى 12 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-project-management-essentials', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'in-person',
      start: '2027-03-08', days: 3, price: 2990, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://growth.sauder.ubc.ca/courses/project-management-essentials',
      title: { en: 'Project Management Essentials', ar: 'أساسيات إدارة المشاريع' },
      summary: {
        en: 'A 3-day on-campus program from UBC Sauder School of Business, running 8 March 2027 to 10 March 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 8 مارس 2027 إلى 10 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-women-s-executive-leadership-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-09-22', days: 4, price: 6900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/womens-executive-leadership-program',
      title: { en: "Women's Executive Leadership Program", ar: 'البرنامج التنفيذي للقيادة النسائية' },
      summary: {
        en: 'A 4-day on-campus program from UC Berkeley Haas School of Business, running 22 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 22 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-product-management-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'operations', format: 'in-person',
      start: '2026-09-28', days: 5, price: 7900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/product-management-program',
      title: { en: 'Product Management Program', ar: 'برنامج إدارة المنتجات' },
      summary: {
        en: 'A 5-day on-campus program from UC Berkeley Haas School of Business, running 28 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 28 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-advanced-executive-presence-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-09-30', days: 3, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/advanced-executive-presence-program',
      title: { en: 'Advanced Executive Presence Program', ar: 'البرنامج المتقدم للحضور القيادي' },
      summary: {
        en: 'A 3-day on-campus program from UC Berkeley Haas School of Business, running 30 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 30 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-financial-data-analysis-for-leaders-pr', school: 's-uc-berkeley-haas-school-of-business', subject: 'finance', format: 'online',
      start: '2026-10-05', days: 5, price: 5800, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/financial-data-analysis-leaders-program',
      title: { en: 'Financial Data Analysis for Leaders Program', ar: 'برنامج تحليل البيانات المالية للقادة' },
      summary: {
        en: 'A 5-day online program from UC Berkeley Haas School of Business, running 5 October 2026 to 9 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 5 أكتوبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-communications-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-10-14', days: 3, price: 5600, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/leadership-communications-program',
      title: { en: 'Leadership Communications Program', ar: 'برنامج التواصل القيادي' },
      summary: {
        en: 'A 3-day on-campus program from UC Berkeley Haas School of Business, running 14 October 2026 to 16 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 14 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-berkeley-executive-leadership-prog', school: 's-uc-berkeley-haas-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-10-26', days: 5, price: 9900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/berkeley-executive-leadership-program',
      title: { en: 'The Berkeley Executive Leadership Program', ar: 'البرنامج التنفيذي للقيادة في بيركلي' },
      summary: {
        en: 'A 5-day on-campus program from UC Berkeley Haas School of Business, running 26 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-venture-capital-executive-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'finance', format: 'in-person',
      start: '2026-11-02', days: 5, price: 8700, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/venture-capital-executive-program',
      title: { en: 'Venture Capital Executive Program', ar: 'البرنامج التنفيذي في رأس المال الجريء' },
      summary: {
        en: 'A 5-day on-campus program from UC Berkeley Haas School of Business, running 2 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 2 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-high-impact-leadership-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-04', days: 3, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/high-impact-leadership-program',
      title: { en: 'High-Impact Leadership Program', ar: 'برنامج القيادة عالية الأثر' },
      summary: {
        en: 'A 3-day on-campus program from UC Berkeley Haas School of Business, running 4 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 4 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-strategy-execution-through-cul', school: 's-uc-berkeley-haas-school-of-business', subject: 'strategy', format: 'online',
      start: '2026-11-04', days: 3, price: 3400, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/leading-strategy-execution-through-culture-program',
      title: {
        en: 'Leading Strategy Execution through Culture Program',
        ar: 'برنامج قيادة تنفيذ الاستراتيجية عبر الثقافة المؤسسية'
      },
      summary: {
        en: 'A 3-day online program from UC Berkeley Haas School of Business, running 4 November 2026 to 6 November 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 3 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 4 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-new-manager-boot-camp', school: 's-uc-berkeley-haas-school-of-business', subject: 'people', format: 'in-person',
      start: '2026-11-04', days: 3, price: 5400, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/new-manager-boot-camp',
      title: { en: 'New Manager Boot Camp', ar: 'برنامج تأهيل المدراء الجدد المكثّف' },
      summary: {
        en: 'A 3-day on-campus program from UC Berkeley Haas School of Business, running 4 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 4 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-negotiation-and-influence-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'negotiation', format: 'in-person',
      start: '2026-11-18', days: 3, price: 5100, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/negotiation-and-influence-program',
      title: { en: 'Negotiation and Influence Program', ar: 'برنامج التفاوض والتأثير' },
      summary: {
        en: 'A 3-day on-campus program from UC Berkeley Haas School of Business, running 18 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 18 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-berkeley-changemaker-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-12-09', days: 3, price: 4500, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/berkeley-changemaker-program',
      title: { en: 'The Berkeley Changemaker Program', ar: 'برنامج بيركلي لصنّاع التغيير' },
      summary: {
        en: 'A 3-day on-campus program from UC Berkeley Haas School of Business, running 9 December 2026 to 11 December 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 9 ديسمبر 2026 إلى 11 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-for-executives-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'digital', format: 'in-person',
      start: '2027-03-29', days: 3, price: 6500, langs: ['en'], popularity: 50, sourceUrl: 'https://executive.berkeley.edu/programs/ai-executives-program',
      title: { en: 'AI for Executives Program', ar: 'برنامج الذكاء الاصطناعي للتنفيذيين' },
      summary: {
        en: 'A 3-day on-campus program from UC Berkeley Haas School of Business, running 29 March 2027 to 31 March 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 29 مارس 2027 إلى 31 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-data-protection-officer-dpo-hsg', school: 's-university-of-st-gallen-executive-scho', subject: 'data', format: 'blended',
      start: '2026-09-14', days: 15, price: 13500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/data-protection-officer-dpo-hsg/',
      title: { en: 'Data Protection Officer (DPO HSG)', ar: 'مسؤول حماية البيانات (DPO HSG)' },
      summary: {
        en: 'A 15-day blended program from University of St. Gallen Executive School, starting 14 September 2026.',
        ar: 'برنامج مدمج لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، يبدأ في 14 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-hsg-intensivstudium-fur-kommunikation', school: 's-university-of-st-gallen-executive-scho', subject: 'marketing', format: 'in-person',
      start: '2026-09-14', days: 20, price: 18750, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/hsg-intensivstudium-fuer-kommunikation-und-management-cas/',
      title: {
        en: 'HSG-Intensivstudium für Kommunikation und Management (CAS)',
        ar: 'CAS HSG دراسة مكثفة في الاتصال والإدارة'
      },
      summary: {
        en: 'A 20-day on-campus program from University of St. Gallen Executive School, running 14 September 2026 to 3 October 2026.',
        ar: 'برنامج حضوري لمدة 20 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 14 سبتمبر 2026 إلى 3 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-mindset-matters-selbstmanagement-fur-n', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2026-09-15', days: 3, price: 3450, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/mindset-matters-selbstmanagement-fuer-nachhaltigen-erfolg/',
      title: {
        en: 'Mindset Matters – Selbstmanagement für nachhaltigen Erfolg',
        ar: 'العقلية أساس النجاح – إدارة الذات لتحقيق نجاح مستدام'
      },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 15 September 2026 to 17 September 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 15 سبتمبر 2026 إلى 17 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-st-galler-seminar-fur-familienunterneh', school: 's-university-of-st-gallen-executive-scho', subject: 'entrepreneurship', format: 'in-person',
      start: '2026-09-15', days: 4, price: 3800, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/st-galler-seminar-fuer-familienunternehmen-kmu/',
      title: {
        en: 'St.Galler Seminar für Familienunternehmen und inhabergeführte Unternehmen',
        ar: 'برنامج سانت غالن للشركات العائلية والشركات التي يديرها ملاكها'
      },
      summary: {
        en: 'A 4-day on-campus program from University of St. Gallen Executive School, running 15 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 15 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-transformation-erfolgreich-gestalten', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2026-09-16', days: 4, price: 4700, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/transformation-erfolgreich-gestalten/',
      title: { en: 'Transformation erfolgreich gestalten', ar: 'تحقيق التحول بنجاح' },
      summary: {
        en: 'A 4-day on-campus program from University of St. Gallen Executive School, running 16 September 2026 to 19 September 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 16 سبتمبر 2026 إلى 19 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-financial-performance-management', school: 's-university-of-st-gallen-executive-scho', subject: 'finance', format: 'in-person',
      start: '2026-09-17', days: 2, price: 2250, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/financial-performance-management/',
      title: { en: 'Financial Performance Management', ar: 'إدارة الأداء المالي' },
      summary: {
        en: 'A 2-day on-campus program from University of St. Gallen Executive School, running 17 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من المدرسة التنفيذية بجامعة سانت غالن، من 17 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-risk-management-online-seminar', school: 's-university-of-st-gallen-executive-scho', subject: 'finance', format: 'online',
      start: '2026-09-18', days: 5, price: 1900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/risk-management-online-seminar/',
      title: { en: 'Risk Management Online Seminar', ar: 'إدارة المخاطر – برنامج عبر الإنترنت' },
      summary: {
        en: 'A 5-day online program from University of St. Gallen Executive School, starting 18 September 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من المدرسة التنفيذية بجامعة سانت غالن، يبدأ في 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cas-leading-sustainable-business-innov', school: 's-university-of-st-gallen-executive-scho', subject: 'sustainability', format: 'in-person',
      start: '2026-09-21', days: 15, price: 13800, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-leading-sustainable-business-innovation/',
      title: { en: 'CAS Leading Sustainable Business Innovation', ar: 'CAS قيادة الابتكار المستدام في الأعمال' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 21 September 2026 to 5 October 2026.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 21 سبتمبر 2026 إلى 5 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-sustainable-business-model-innovation', school: 's-university-of-st-gallen-executive-scho', subject: 'sustainability', format: 'in-person',
      start: '2026-09-21', days: 5, price: 4500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-leading-sustainable-business-innovation-m3/',
      title: { en: 'Sustainable Business Model Innovation', ar: 'ابتكار نماذج الأعمال المستدامة' },
      summary: {
        en: 'A 5-day on-campus program from University of St. Gallen Executive School, running 21 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 21 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategische-organisationsentwicklung', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2026-09-28', days: 4, price: 4900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/strategische-organisationsentwicklung-und-restrukturierung/',
      title: {
        en: 'Strategische Organisationsentwicklung und Restrukturierung',
        ar: 'التطوير التنظيمي الاستراتيجي وإعادة الهيكلة'
      },
      summary: {
        en: 'A 4-day on-campus program from University of St. Gallen Executive School, running 28 September 2026 to 1 October 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 28 سبتمبر 2026 إلى 1 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-weiterbildung-fur-politik-cas-kommunik', school: 's-university-of-st-gallen-executive-scho', subject: 'negotiation', format: 'in-person',
      start: '2026-10-01', days: 17, price: 11500, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/weiterbildung-fuer-politik-cas-kommunikation-und-verhandlung-in-der-politik-public-affairs/',
      title: {
        en: 'Weiterbildung für Politik – CAS Kommunikation und Politik',
        ar: 'التطوير المهني للعمل السياسي – CAS الاتصال والسياسة'
      },
      summary: {
        en: 'A 17-day on-campus program from University of St. Gallen Executive School, running 1 October 2026 to 17 October 2026.',
        ar: 'برنامج حضوري لمدة 17 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 1 أكتوبر 2026 إلى 17 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-your-path-to-a-board-seat', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'online',
      start: '2026-10-06', days: 2, price: 595, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/your-path-to-a-board-seat/',
      title: { en: 'Your Path to a Board Seat', ar: 'طريقك إلى مقعد في مجلس الإدارة' },
      summary: {
        en: 'A 2-day online program from University of St. Gallen Executive School, starting 6 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة يومين من المدرسة التنفيذية بجامعة سانت غالن، يبدأ في 6 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cas-hsg-innovation-durch-it', school: 's-university-of-st-gallen-executive-scho', subject: 'digital', format: 'in-person',
      start: '2026-10-14', days: 18, price: 16900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-hsg-innovation-durch-it/',
      title: { en: 'CAS HSG Innovation durch IT', ar: 'CAS HSG الابتكار عبر تقنية المعلومات' },
      summary: {
        en: 'A 18-day on-campus program from University of St. Gallen Executive School, running 14 October 2026 to 31 October 2026.',
        ar: 'برنامج حضوري لمدة 18 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 14 أكتوبر 2026 إلى 31 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-change-the-real-estate-industry', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2026-10-14', days: 3, price: 3960, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/change-the-real-estate-industry/',
      title: { en: 'Change the Real Estate Industry', ar: 'إعادة تشكيل صناعة العقار' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 14 October 2026 to 16 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 14 أكتوبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-senior-management-programm-cas-hsg', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2026-10-20', days: 16, price: 20200, currency: 'CHF', langs: ['de'], featured: true, popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/senior-management-programm-cas-hsg/',
      title: { en: 'Senior Management Programm CAS HSG', ar: 'برنامج الإدارة العليا CAS HSG' },
      summary: {
        en: 'A 16-day on-campus program from University of St. Gallen Executive School, running 20 October 2026 to 4 November 2026.',
        ar: 'برنامج حضوري لمدة 16 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 20 أكتوبر 2026 إلى 4 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-board-essentials', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2026-10-23', days: 8, price: 12500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/board-essentials/',
      title: { en: 'Board Essentials', ar: 'أساسيات مجالس الإدارة' },
      summary: {
        en: 'A 8-day on-campus program from University of St. Gallen Executive School, running 23 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 8 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 23 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-marketing-bootcamp', school: 's-university-of-st-gallen-executive-scho', subject: 'marketing', format: 'in-person',
      start: '2026-10-27', days: 4, price: 4950, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/marketing-bootcamp/',
      title: { en: 'Marketing Bootcamp', ar: 'برنامج تسويق مكثف' },
      summary: {
        en: 'A 4-day on-campus program from University of St. Gallen Executive School, running 27 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 27 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-erfolgreich-verhandeln-cas-hsg', school: 's-university-of-st-gallen-executive-scho', subject: 'negotiation', format: 'in-person',
      start: '2026-11-02', days: 20, price: 19500, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/erfolgreich-verhandeln-cas/',
      title: { en: 'Erfolgreich verhandeln CAS HSG', ar: 'CAS HSG التفاوض الناجح' },
      summary: {
        en: 'A 20-day on-campus program from University of St. Gallen Executive School, running 2 November 2026 to 21 November 2026.',
        ar: 'برنامج حضوري لمدة 20 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 2 نوفمبر 2026 إلى 21 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-finanzielle-unternehmensfuhrung-munche', school: 's-university-of-st-gallen-executive-scho', subject: 'finance', format: 'in-person',
      start: '2026-11-02', days: 5, price: 4900, currency: 'EUR', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/finanzielle-unternehmensfuehrung/',
      title: { en: 'Finanzielle Unternehmensführung | München', ar: 'الإدارة المالية للمؤسسات | ميونخ' },
      summary: {
        en: 'A 5-day on-campus program from University of St. Gallen Executive School, running 2 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 2 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategisches-management-cas-hsg', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2026-11-02', days: 16, price: 18400, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/strategisches-management-cas-hsg/',
      title: { en: 'Strategisches Management CAS HSG', ar: 'الإدارة الاستراتيجية CAS HSG' },
      summary: {
        en: 'A 16-day on-campus program from University of St. Gallen Executive School, running 2 November 2026 to 17 November 2026.',
        ar: 'برنامج حضوري لمدة 16 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 2 نوفمبر 2026 إلى 17 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-management-von-nachhaltigkeit-und-esg', school: 's-university-of-st-gallen-executive-scho', subject: 'sustainability', format: 'in-person',
      start: '2026-11-17', days: 4, price: 3900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/nachhaltigkeitsmanagement/',
      title: {
        en: 'Management von Nachhaltigkeit und ESG in Unternehmen',
        ar: 'إدارة الاستدامة ومعايير ESG في المؤسسات'
      },
      summary: {
        en: 'A 4-day on-campus program from University of St. Gallen Executive School, running 17 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 17 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-die-kunst-der-selbstentwicklung', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2026-11-24', days: 3, price: 2900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/die-kunst-der-selbstentwicklung/',
      title: { en: 'Die Kunst der Selbstentwicklung', ar: 'فن تطوير الذات' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 24 November 2026 to 26 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 24 نوفمبر 2026 إلى 26 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-designing-capital-for-impact-innovatio', school: 's-university-of-st-gallen-executive-scho', subject: 'finance', format: 'in-person',
      start: '2026-11-25', days: 3, price: 3950, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/designing-capital-for-impact-innovations-incentives-blended-finance/',
      title: {
        en: 'Designing Capital for Impact: Innovations, Incentives & Blended Finance',
        ar: 'تصميم رأس المال ذي الأثر: الابتكار والحوافز والتمويل المدمج'
      },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 25 November 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 25 نوفمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-seminar-responsible-leadership-hsg', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2027-01-14', days: 6, price: 7500, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/responsible-leadership-2/',
      title: { en: 'Seminar RESPONSIBLE LEADERSHIP – HSG', ar: 'القيادة المسؤولة – HSG' },
      summary: {
        en: 'A 6-day on-campus program from University of St. Gallen Executive School, running 14 January 2027 to 19 January 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 14 يناير 2027 إلى 19 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-hsg-intensivstudium-marketing-manageme', school: 's-university-of-st-gallen-executive-scho', subject: 'marketing', format: 'in-person',
      start: '2027-01-26', days: 18, price: 18750, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/hsg-intensivstudium-marketing-management-cas/',
      title: { en: 'HSG-Intensivstudium Marketing Management (CAS)', ar: 'CAS HSG دراسة مكثفة في إدارة التسويق' },
      summary: {
        en: 'A 18-day on-campus program from University of St. Gallen Executive School, running 26 January 2027 to 12 February 2027.',
        ar: 'برنامج حضوري لمدة 18 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 26 يناير 2027 إلى 12 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-performance-management', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2027-01-28', days: 2, price: 2250, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/strategic-performance-management/',
      title: { en: 'Strategic Performance Management', ar: 'إدارة الأداء الاستراتيجي' },
      summary: {
        en: 'A 2-day on-campus program from University of St. Gallen Executive School, running 28 January 2027 to 29 January 2027.',
        ar: 'برنامج حضوري لمدة يومين من المدرسة التنفيذية بجامعة سانت غالن، من 28 يناير 2027 إلى 29 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-intensivseminar-systemisches-change-ma', school: 's-university-of-st-gallen-executive-scho', subject: 'healthcare', format: 'in-person',
      start: '2027-02-03', days: 3, price: 2600, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/intensivseminar-systemisches-change-management/',
      title: { en: 'Intensivseminar Systemisches Change Management', ar: 'برنامج مكثف في إدارة التغيير المنهجي' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 3 February 2027 to 5 February 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 3 فبراير 2027 إلى 5 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-enterprise-risk-management', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2027-02-03', days: 3, price: 3000, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/leading-enterprise-risk-management/',
      title: { en: 'Leading Enterprise Risk Management', ar: 'قيادة إدارة المخاطر المؤسسية' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 3 February 2027 to 5 February 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 3 فبراير 2027 إلى 5 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-finanzielle-unternehmensfuhrung', school: 's-university-of-st-gallen-executive-scho', subject: 'finance', format: 'in-person',
      start: '2027-02-15', days: 5, price: 4900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/finanzielle-unternehmensfuehrung-zuerich/',
      title: { en: 'Finanzielle Unternehmensführung', ar: 'الإدارة المالية للمؤسسات' },
      summary: {
        en: 'A 5-day on-campus program from University of St. Gallen Executive School, running 15 February 2027 to 19 February 2027.',
        ar: 'برنامج حضوري لمدة 5 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 15 فبراير 2027 إلى 19 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-international-retail-management-cas-hs', school: 's-university-of-st-gallen-executive-scho', subject: 'marketing', format: 'in-person',
      start: '2027-02-17', days: 15, price: 17900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/international-retail-management-cas-hsg/',
      title: { en: 'International Retail Management (CAS-HSG)', ar: 'إدارة التجزئة الدولية (CAS-HSG)' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 17 February 2027 to 3 March 2027.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 17 فبراير 2027 إلى 3 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cas-change-innovation-management', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2027-02-22', days: 17, price: 14950, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-change-innovation-management/',
      title: { en: 'CAS Change & Innovation Management', ar: 'CAS إدارة التغيير والابتكار' },
      summary: {
        en: 'A 17-day on-campus program from University of St. Gallen Executive School, running 22 February 2027 to 10 March 2027.',
        ar: 'برنامج حضوري لمدة 17 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 22 فبراير 2027 إلى 10 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategien-nachhaltig-verwirklichen', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2027-02-24', days: 3, price: 3900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/strategien-nachhaltig-verwirklichen/',
      title: { en: 'Strategien nachhaltig verwirklichen', ar: 'تحقيق الاستراتيجيات بشكل مستدام' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 24 February 2027 to 26 February 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 24 فبراير 2027 إلى 26 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-generalagentur-und-vertriebsmanagement', school: 's-university-of-st-gallen-executive-scho', subject: 'marketing', format: 'in-person',
      start: '2027-03-02', days: 9, price: 7900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/generalagentur-management/',
      title: { en: 'Generalagentur- und Vertriebsmanagement', ar: 'إدارة الوكالات العامة والمبيعات' },
      summary: {
        en: 'A 9-day on-campus program from University of St. Gallen Executive School, running 2 March 2027 to 10 March 2027.',
        ar: 'برنامج حضوري لمدة 9 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 2 مارس 2027 إلى 10 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-st-galler-leadership-zertifikat', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2027-03-02', days: 15, price: 19800, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/st-galler-leadership-zertifikat/',
      title: { en: 'St.Galler Leadership-Zertifikat', ar: 'شهادة القيادة من سانت غالن' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 2 March 2027 to 16 March 2027.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 2 مارس 2027 إلى 16 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-st-gallen-board-certificate-cas-hsg', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2027-03-05', days: 15, price: 24500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/st-gallen-board-certificate-cas-hsg/',
      title: { en: 'St.Gallen Board Certificate CAS HSG', ar: 'شهادة مجالس الإدارة من سانت غالن CAS HSG' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 5 March 2027 to 19 March 2027.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 5 مارس 2027 إلى 19 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-change-with-confidence', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'blended',
      start: '2027-03-08', days: 3, price: 3500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/leading-change-with-confidence/',
      title: { en: 'Leading Change with Confidence', ar: 'قيادة التغيير بثقة' },
      summary: {
        en: 'A 3-day blended program from University of St. Gallen Executive School, starting 8 March 2027.',
        ar: 'برنامج مدمج لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، يبدأ في 8 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-essentials-in-general-management-cas-h', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2027-03-09', days: 14, price: 16900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/essentials-in-general-management-cas-hsg/',
      title: { en: 'Essentials in General Management CAS HSG', ar: 'CAS HSG أساسيات الإدارة العامة' },
      summary: {
        en: 'A 14-day on-campus program from University of St. Gallen Executive School, running 9 March 2027 to 22 March 2027.',
        ar: 'برنامج حضوري لمدة 14 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 9 مارس 2027 إلى 22 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-post-merger-integration-and-carve-outs', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2027-03-16', days: 3, price: 3900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/post-merger-integration-and-carve-outs/',
      title: { en: 'Post-Merger Integration and Carve-Outs', ar: 'التكامل بعد الاندماج وعمليات الفصل' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 16 March 2027 to 18 March 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 16 مارس 2027 إلى 18 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cas-smart-mobility-management', school: 's-university-of-st-gallen-executive-scho', subject: 'operations', format: 'in-person',
      start: '2027-04-05', days: 15, price: 14950, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-smart-mobility-management/',
      title: { en: 'CAS SMART Mobility Management', ar: 'CAS إدارة التنقل الذكي' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 5 April 2027 to 19 April 2027.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 5 أبريل 2027 إلى 19 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-digital-insurance-ai-transformation-ca', school: 's-university-of-st-gallen-executive-scho', subject: 'digital', format: 'in-person',
      start: '2027-04-06', days: 18, price: 15900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-digital-insurance-transformation/',
      title: {
        en: 'Digital Insurance & AI Transformation (CAS HSG)',
        ar: 'CAS HSG التحول الرقمي والذكاء الاصطناعي في التأمين'
      },
      summary: {
        en: 'A 18-day on-campus program from University of St. Gallen Executive School, running 6 April 2027 to 23 April 2027.',
        ar: 'برنامج حضوري لمدة 18 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 6 أبريل 2027 إلى 23 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-hsg-intensivseminar-strategisches-prod', school: 's-university-of-st-gallen-executive-scho', subject: 'marketing', format: 'in-person',
      start: '2027-04-13', days: 3, price: 3900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/intensivseminar-product-management/',
      title: {
        en: 'HSG-Intensivseminar Strategisches Produkt- und Preismanagement',
        ar: 'ندوة HSG المكثفة في إدارة المنتجات والتسعير الاستراتيجي'
      },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 13 April 2027 to 15 April 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 13 أبريل 2027 إلى 15 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cas-hsg-management-fur-it-fuhrungskraf', school: 's-university-of-st-gallen-executive-scho', subject: 'digital', format: 'in-person',
      start: '2027-04-20', days: 18, price: 16900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-hsg-management-fuer-it-fuehrungskraefte/',
      title: { en: 'CAS HSG Management für IT-Führungskräfte', ar: 'CAS HSG الإدارة لقادة تقنية المعلومات' },
      summary: {
        en: 'A 18-day on-campus program from University of St. Gallen Executive School, running 20 April 2027 to 7 May 2027.',
        ar: 'برنامج حضوري لمدة 18 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 20 أبريل 2027 إلى 7 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-insurance-business-for-future-leaders', school: 's-university-of-st-gallen-executive-scho', subject: 'finance', format: 'in-person',
      start: '2027-04-26', days: 15, price: 14500, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/insurance-business-for-future-leaders-cas-hsg/',
      title: { en: 'Insurance Business for Future Leaders (CAS HSG)', ar: 'CAS HSG أعمال التأمين لقادة المستقبل' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 26 April 2027 to 10 May 2027.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 26 أبريل 2027 إلى 10 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-selbstkompetenz-und-unternehmenskultur', school: 's-university-of-st-gallen-executive-scho', subject: 'people', format: 'in-person',
      start: '2027-04-26', days: 3, price: 3000, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/selbstkompetenz-und-unternehmenskultur/',
      title: { en: 'Selbstkompetenz und Unternehmenskultur', ar: 'الكفاءة الذاتية وثقافة المؤسسة' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 26 April 2027 to 28 April 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 26 أبريل 2027 إلى 28 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-fuhrung-mit-energie-und-fokus', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2027-04-27', days: 4, price: 4850, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/fuehrung-mit-energie-und-fokus/',
      title: { en: 'Führung mit Energie und Fokus', ar: 'القيادة بطاقة وتركيز' },
      summary: {
        en: 'A 4-day on-campus program from University of St. Gallen Executive School, running 27 April 2027 to 30 April 2027.',
        ar: 'برنامج حضوري لمدة 4 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 27 أبريل 2027 إلى 30 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cas-berufliche-vorsorge', school: 's-university-of-st-gallen-executive-scho', subject: 'finance', format: 'in-person',
      start: '2027-05-24', days: 15, price: 14000, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-berufliche-vorsorge/',
      title: { en: 'CAS Berufliche Vorsorge', ar: 'CAS نظام التقاعد المهني' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 24 May 2027 to 7 June 2027.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 24 مايو 2027 إلى 7 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-performance-turning-regulation-stakeho', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'online',
      start: '2027-06-01', days: 2, price: 1900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-leading-sustainable-business-innovation-m2/',
      title: {
        en: 'Performance: Turning Regulation & Stakeholder Expectations into Profitable Growth',
        ar: 'الأداء: تحويل المتطلبات التنظيمية وتوقعات أصحاب المصلحة إلى نمو مربح'
      },
      summary: {
        en: 'A 2-day online program from University of St. Gallen Executive School, starting 1 June 2027.',
        ar: 'برنامج عبر الإنترنت لمدة يومين من المدرسة التنفيذية بجامعة سانت غالن، يبدأ في 1 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-risikomanagement-online-seminar', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'online',
      start: '2027-06-02', days: 5, price: 1900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/risikomanagement-online-seminar/',
      title: { en: 'Risikomanagement Online-Seminar', ar: 'إدارة المخاطر – برنامج عبر الإنترنت' },
      summary: {
        en: 'A 5-day online program from University of St. Gallen Executive School, starting 2 June 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من المدرسة التنفيذية بجامعة سانت غالن، يبدأ في 2 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-customer-distribution-management-in-in', school: 's-university-of-st-gallen-executive-scho', subject: 'marketing', format: 'in-person',
      start: '2027-06-14', days: 18, price: 15900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-customer-and-distribution-management/',
      title: {
        en: 'Customer & Distribution Management in Insurance (CAS HSG)',
        ar: 'CAS HSG إدارة العملاء والتوزيع في قطاع التأمين'
      },
      summary: {
        en: 'A 18-day on-campus program from University of St. Gallen Executive School, running 14 June 2027 to 1 July 2027.',
        ar: 'برنامج حضوري لمدة 18 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 14 يونيو 2027 إلى 1 يوليو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cas-prozessfuhrung-civil-litigation', school: 's-university-of-st-gallen-executive-scho', subject: 'negotiation', format: 'in-person',
      start: '2027-06-17', days: 15, price: 13200, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/cas-prozessfuehrung-civil-litigation/',
      title: { en: 'CAS Prozessführung – Civil Litigation', ar: 'CAS إدارة التقاضي – الدعاوى المدنية' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 17 June 2027 to 1 July 2027.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 17 يونيو 2027 إلى 1 يوليو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-resilienz-in-der-fuhrung', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2027-06-21', days: 3, price: 3000, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/resilienz-in-der-fuehrung/',
      title: { en: 'Resilienz in der Führung', ar: 'المرونة في القيادة' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 21 June 2027 to 23 June 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 21 يونيو 2027 إلى 23 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-self-management-and-resilience', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2027-06-22', days: 3, price: 3900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/self-management-and-resilience/',
      title: { en: 'Self-Management and Resilience', ar: 'إدارة الذات والمرونة' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, running 22 June 2027 to 24 June 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 22 يونيو 2027 إلى 24 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-politische-verhandlungsfuhrung', school: 's-university-of-st-gallen-executive-scho', subject: 'negotiation', format: 'in-person',
      start: '2027-08-26', days: 6, price: 4600, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://es.unisg.ch/en/executive-programme/politische-verhandlungsfuehrung/',
      title: { en: 'Politische Verhandlungsführung', ar: 'التفاوض السياسي' },
      summary: {
        en: 'A 6-day on-campus program from University of St. Gallen Executive School, running 26 August 2027 to 31 August 2027.',
        ar: 'برنامج حضوري لمدة 6 أيام من المدرسة التنفيذية بجامعة سانت غالن، من 26 أغسطس 2027 إلى 31 أغسطس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    }
  ];

  /* Editorial collections — the "Top 10 lists" idea, kept honest by being
     explicitly editorial rather than pretending to be a ranking. */
  const lists = [
{
      id: 'l-ai',
      title: { en: 'Best executive courses on AI', ar: 'أفضل البرامج التنفيذية في الذكاء الاصطناعي' },
      blurb: {
        en: 'Programmes that treat AI as an operating decision rather than a technology demo.',
        ar: 'برامج تتعامل مع الذكاء الاصطناعي كقرار تشغيلي لا كعرض تقني.'
      },
      courses: ['c-ai-strategy-and-implementation', 'c-leading-with-ai', 'c-frontiers-of-generative-ai-in-business', 'c-ai-essentials-accelerating-impactful-a', 'c-ai-for-board-directors', 'c-leading-digital-and-ai-transformation', 'c-leading-an-ai-ready-organization-found', 'c-digital-business-transformation']
    },
{
      id: 'l-week',
      title: { en: 'Serious programmes you can finish in a week', ar: 'برامج جادّة يمكن إنهاؤها في أسبوع' },
      blurb: {
        en: 'Five days or fewer, for people who cannot disappear for a month.',
        ar: 'خمسة أيام أو أقل، لمن لا يستطيع الغياب شهرًا كاملًا.'
      },
      courses: ['c-ai-strategy-and-implementation', 'c-competitive-strategy', 'c-leading-with-ai', 'c-leading-high-performing-teams', 'c-mindset-matters-selbstmanagement-fur-n', 'c-project-management-for-administrative', 'c-st-galler-seminar-fur-familienunterneh', 'c-conflict-management-strategies']
    },
{
      id: 'l-firsttime',
      title: { en: 'Best courses for first-time leaders', ar: 'أفضل البرامج للقادة الجدد' },
      blurb: {
        en: 'The transition into managing people, taught by people who remember it.',
        ar: 'الانتقال إلى إدارة الأشخاص، على يد من يتذكّرون صعوبة هذا الانتقال.'
      },
      courses: ['c-emerging-leader-program', 'c-new-manager-boot-camp', 'c-emerging-leaders-programme', 'c-emerging-leaders', 'c-driving-innovation-and-new-ventures-in', 'c-emerging-leaders-program-becoming-a-tr', 'c-leadership-in-emerging-technology-secu', 'c-the-emerging-cmo-strategic-marketing-l']
    },
{
      id: 'l-online',
      title: { en: 'Best online executive courses', ar: 'أفضل البرامج التنفيذية عن بُعد' },
      blurb: {
        en: 'Live cohorts and real feedback, not a video library with a certificate at the end.',
        ar: 'دفعات مباشرة وتغذية راجعة حقيقية، لا مكتبة فيديو تنتهي بشهادة.'
      },
      courses: ['c-risk-management-online-seminar', 'c-business-analysis-3-course-pack-1', 'c-business-analysis-3-course-pack-2', 'c-developing-your-leadership-presence-vi', 'c-learning-to-lead-virtual', 'c-creating-and-managing-strategic-allian', 'c-leading-teams-in-the-ai-era-sprint', 'c-financial-data-analysis-for-leaders-pr']
    },
{
      id: 'l-finance',
      title: { en: 'Best finance courses for non-financial executives', ar: 'أفضل برامج التمويل للتنفيذيين من غير الماليين' },
      blurb: {
        en: 'Enough finance to challenge the numbers you are handed.',
        ar: 'قدر من المعرفة المالية يكفي لمساءلة الأرقام التي تُقدَّم إليك.'
      },
      courses: ['c-financial-performance-management', 'c-risk-management-online-seminar', 'c-financial-statement-analysis-for-non-f', 'c-singapore-corporate-income-tax', 'c-artificial-intelligence-for-financial', 'c-accounting-and-finance-fundamentals', 'c-financial-data-analysis-for-leaders-pr', 'c-mergers-acquisitions']
    },
{
      id: 'l-negotiation',
      title: { en: 'Best negotiation programmes', ar: 'أفضل برامج التفاوض' },
      blurb: {
        en: 'Programmes where you negotiate for most of the week, rather than hear about negotiating.',
        ar: 'برامج تتفاوض فيها معظم الوقت، بدل أن تستمع إلى محاضرات عن التفاوض.'
      },
      courses: ['c-conflict-management-strategies', 'c-weiterbildung-fur-politik-cas-kommunik', 'c-erfolgreich-verhandeln-cas-hsg', 'c-negotiating-and-consensus-building', 'c-negotiations-and-conflict-management', 'c-empowering-women-to-succeed-in-negotia', 'c-negotiation-for-executives', 'c-strategies-and-skills-of-effective-neg']
    }
  ];

  const regions = [
    { id: 'mena',     en: 'Middle East & North Africa', ar: 'الشرق الأوسط وشمال أفريقيا' },
    { id: 'europe',   en: 'Europe',                     ar: 'أوروبا' },
    { id: 'americas', en: 'Americas',                   ar: 'الأمريكتان' },
    { id: 'asia',     en: 'Asia',                       ar: 'آسيا' },
    { id: 'africa',   en: 'Africa',                     ar: 'أفريقيا' },
    { id: 'oceania',  en: 'Oceania',                    ar: 'أوقيانوسيا' }
  ];

  /* FX display table. Fees are stored in each course's original currency
     (`currency` field; absent = USD). The UI's SAR display option converts
     with these rates — SAR is pegged to the dollar at 3.75, the floating
     rates are a dated snapshot for display only. Keep in sync with
     tools/fx.py when updating. */
  const fx = {
    asOf: '2026-01',
    sarPerUsd: 3.75,
    usdPer: {
      USD: 1, CHF: 1.25, EUR: 1.17, GBP: 1.34, CAD: 0.72,
      AUD: 0.66, DKK: 0.157, SGD: 0.78, INR: 0.0112, SAR: 1 / 3.75
    }
  };

  return { subjects, formats, languages, schools, courses, lists, regions, fx };
})();
