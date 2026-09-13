/* ==========================================================================
   Masar — catalogue data
   --------------------------------------------------------------------------
   Every human-readable string is stored as { en, ar } so both locales render
   from one source of truth. Plain JS (not JSON) so the site works from
   file:// without a server — fetch() would be blocked there.

   Schools, programmes, dates and fees below are real listings, written by
   tools/merge-catalogue.py from the crawl pipeline. Fees are stored in the
   school's own published currency; the riyal figure is computed for display
   only, from the snapshot in tools/fx.py. Nothing here is invented: a field
   we have not recorded is empty, and the site prints an em dash for it.
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
    { id: 'de', en: 'German',  ar: 'الألمانية' }
  ];

  const schools = [
{
      id: 's-harvard-kennedy-school',
      name: { en: 'Harvard Kennedy School', ar: 'كلية كينيدي بجامعة هارفارد' },
      city: { en: 'Cambridge', ar: 'كامبريدج' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
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
      city: { en: '', ar: '' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
      region: 'americas', founded: 0, accreditation: [],
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
      id: 's-stanford-graduate-school-of-business',
      name: { en: 'Stanford Graduate School of Business', ar: 'كلية ستانفورد للدراسات العليا في الأعمال' },
      city: { en: 'Stanford', ar: 'ستانفورد' },
      country: { en: 'United States', ar: 'الولايات المتحدة' },
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
      id: 's-center-for-creative-leadership-singapo',
      name: { en: 'Center for Creative Leadership – Singapore', ar: 'مركز القيادة الإبداعية – سنغافورة' },
      city: { en: 'Singapore', ar: 'سنغافورة' },
      country: { en: 'Singapore', ar: 'سنغافورة' },
      region: 'asia', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
{
      id: 's-copenhagen-business-school',
      name: { en: 'Copenhagen Business School', ar: 'كلية كوبنهاغن للأعمال' },
      city: { en: 'Copenhagen', ar: 'كوبنهاغن' },
      country: { en: 'Denmark', ar: 'الدنمارك' },
      region: 'europe', founded: 0, accreditation: [],
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
      id: 's-nus-business-school',
      name: { en: 'NUS Business School', ar: 'كلية الأعمال بجامعة سنغافورة الوطنية' },
      city: { en: 'Singapore', ar: 'سنغافورة' },
      country: { en: 'Singapore', ar: 'سنغافورة' },
      region: 'asia', founded: 0, accreditation: [],
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
      id: 's-ubc-sauder-school-of-business',
      name: { en: 'UBC Sauder School of Business', ar: 'كلية سودر للأعمال بجامعة كولومبيا البريطانية' },
      city: { en: '', ar: '' },
      country: { en: 'Canada', ar: 'كندا' },
      region: 'americas', founded: 0, accreditation: [],
      about: { en: '', ar: '' }
    },
{
      id: 's-uct-graduate-school-of-business',
      name: { en: 'UCT Graduate School of Business', ar: 'كلية الدراسات العليا في الأعمال بجامعة كيب تاون' },
      city: { en: 'Cape Town', ar: 'كيب تاون' },
      country: { en: 'South Africa', ar: 'جنوب أفريقيا' },
      region: 'africa', founded: 0, accreditation: [],
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
      id: 'c-leadership-for-the-21st-century', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-13', days: 6, price: 12900, langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
      title: { en: 'Leadership for the 21st Century', ar: 'القيادة للقرن الحادي والعشرين' },
      summary: {
        en: 'A 6-day on-campus program from Harvard Kennedy School, running 13 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية كينيدي بجامعة هارفارد، من 13 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-climate-change-policy-economics-and-po', school: 's-harvard-kennedy-school', subject: 'sustainability', format: 'online',
      start: '2026-09-14', days: 5, price: 5100, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
      title: { en: 'Climate Change Policy: Economics and Politics', ar: 'سياسات تغيّر المناخ: الاقتصاد والسياسة' },
      summary: {
        en: 'A 5-day online program from Harvard Kennedy School, running 14 September 2026 to 18 September 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية كينيدي بجامعة هارفارد، من 14 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-management-of-regulatory-and', school: 's-harvard-kennedy-school', subject: 'strategy', format: 'in-person',
      start: '2026-09-20', days: 6, price: 11300, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
      title: {
        en: 'Strategic Management of Regulatory and Enforcement Agencies',
        ar: 'الإدارة الاستراتيجية للهيئات التنظيمية وهيئات إنفاذ القانون'
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
      id: 'c-executive-leaders-and-government', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2026-10-18', days: 13, price: 18900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
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
      id: 'c-investment-decisions-and-behavioral-fi', school: 's-harvard-kennedy-school', subject: 'finance', format: 'in-person',
      start: '2026-11-04', days: 3, price: 6100, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
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
      start: '2026-11-30', days: 6, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
      title: {
        en: 'Senior Executives in National and International Security',
        ar: 'كبار المديرين التنفيذيين في الأمن الوطني والدولي'
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
      id: 'c-leadership-decision-making', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'online',
      start: '2027-01-11', days: 12, price: 6600, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
      title: { en: 'Leadership Decision Making', ar: 'اتخاذ القرارات القيادية' },
      summary: {
        en: 'A 12-day online program from Harvard Kennedy School, running 11 January 2027 to 22 January 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 12 يومًا من كلية كينيدي بجامعة هارفارد، من 11 يناير 2027 إلى 22 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-crisis-leadership-in-higher-education', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-02-09', days: 4, price: 6100, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
      title: { en: 'Crisis Leadership in Higher Education', ar: 'قيادة الأزمات في التعليم العالي' },
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
      id: 'c-behavioral-insights-and-public-policy', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'online',
      start: '2027-02-22', days: 19, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
      title: { en: 'Behavioral Insights and Public Policy', ar: 'الرؤى السلوكية والسياسات العامة' },
      summary: {
        en: 'A 19-day online program from Harvard Kennedy School, running 22 February 2027 to 12 March 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 19 يومًا من كلية كينيدي بجامعة هارفارد، من 22 فبراير 2027 إلى 12 مارس 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-negotiation-strategies-building-agreem', school: 's-harvard-kennedy-school', subject: 'negotiation', format: 'online',
      start: '2027-03-22', days: 5, price: 5100, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
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
      start: '2027-04-04', days: 6, price: 10900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
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
      start: '2027-04-11', days: 6, price: 10900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
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
      id: 'c-infrastructure-financing-regulation-an', school: 's-harvard-kennedy-school', subject: 'finance', format: 'in-person',
      start: '2027-05-02', days: 6, price: 10600, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
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
      start: '2027-05-02', days: 6, price: 11200, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
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
      id: 'c-strategic-leadership-enhancing-your-pe', school: 's-harvard-kennedy-school', subject: 'strategy', format: 'online',
      start: '2027-05-03', days: 5, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
      title: {
        en: 'Strategic Leadership: Enhancing Your Personal Effectiveness',
        ar: 'القيادة الاستراتيجية: تعزيز فعاليتك الشخصية'
      },
      summary: {
        en: 'A 5-day online program from Harvard Kennedy School, running 3 May 2027 to 7 May 2027.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية كينيدي بجامعة هارفارد، من 3 مايو 2027 إلى 7 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-major-events-navigating-opportunities', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-05-10', days: 4, price: 7100, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
      title: {
        en: 'Major Events: Navigating Opportunities and Challenges',
        ar: 'الفعاليات الكبرى: استكشاف الفرص ومواجهة التحديات'
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
      id: 'c-art-and-practice-of-leadership-develop', school: 's-harvard-kennedy-school', subject: 'leadership', format: 'in-person',
      start: '2027-06-06', days: 6, price: 11300, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/harvard-university-kennedy-school-of-government-executive-education',
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
      id: 'c-competitive-strategy', school: 's-kellogg-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-09-14', days: 5, price: 9950, langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
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
      id: 'c-leading-with-ai', school: 's-kellogg-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-09-14', days: 4, price: 12500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
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
      start: '2026-09-21', days: 3, price: 8950, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Operations Strategy', ar: 'استراتيجية العمليات' },
      summary: {
        en: 'A 3-day on-campus program from Kellogg School of Management, running 21 September 2026 to 23 September 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كيلوغ للإدارة، من 21 سبتمبر 2026 إلى 23 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-leader-within', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-09-21', days: 5, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'The Leader Within', ar: 'القائد في داخلك' },
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
      id: 'c-creating-and-managing-strategic-allian', school: 's-kellogg-school-of-management', subject: 'strategy', format: 'online',
      start: '2026-09-28', days: 5, price: 4950, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Creating and Managing Strategic Alliances', ar: 'إنشاء التحالفات الاستراتيجية وإدارتها' },
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
      start: '2026-09-29', days: 11, price: 12000, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Governing Family Enterprises', ar: 'حوكمة الشركات العائلية' },
      summary: {
        en: 'A 11-day hybrid program from Kellogg School of Management, running 29 September 2026 to 9 October 2026.',
        ar: 'برنامج مدمج لمدة 11 يومًا من كلية كيلوغ للإدارة، من 29 سبتمبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-and-sustaining-a-culture-of-in', school: 's-kellogg-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-10-05', days: 4, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Leading and Sustaining a Culture of Innovation', ar: 'قيادة ثقافة الابتكار وإدامتها' },
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
      id: 'c-executive-development-program', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-10-11', days: 20, price: 39500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Executive Development Program', ar: 'برنامج التطوير التنفيذي' },
      summary: {
        en: 'A 20-day on-campus program from Kellogg School of Management, running 11 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 20 يومًا من كلية كيلوغ للإدارة، من 11 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-mergers-acquisitions', school: 's-kellogg-school-of-management', subject: 'finance', format: 'in-person',
      start: '2026-10-11', days: 6, price: 13100, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
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
      start: '2026-10-12', days: 5, price: 6500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
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
      start: '2026-10-19', days: 5, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Business Marketing Strategy', ar: 'استراتيجية تسويق الأعمال' },
      summary: {
        en: 'A 5-day on-campus program from Kellogg School of Management, running 19 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية كيلوغ للإدارة، من 19 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-b2b-sales-force-strategy-effectiveness', school: 's-kellogg-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-10-25', days: 5, price: 9950, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: {
        en: 'B2B Sales Force Strategy & Effectiveness in the Digital Age',
        ar: 'استراتيجية وفعالية فرق مبيعات B2B في العصر الرقمي'
      },
      summary: {
        en: 'A 5-day on-campus program from Kellogg School of Management, running 25 October 2026 to 29 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية كيلوغ للإدارة، من 25 أكتوبر 2026 إلى 29 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-delivering-business-growth', school: 's-kellogg-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-10-26', days: 4, price: 9950, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
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
      id: 'c-leading-high-impact-teams', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'online',
      start: '2026-10-26', days: 5, price: 6500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Leading High-Impact Teams', ar: 'قيادة الفرق عالية التأثير' },
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
      id: 'c-family-enterprise-boards', school: 's-kellogg-school-of-management', subject: 'leadership', format: 'blended',
      start: '2026-10-27', days: 11, price: 12000, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Family Enterprise Boards', ar: 'مجالس إدارة الشركات العائلية' },
      summary: {
        en: 'A 11-day hybrid program from Kellogg School of Management, running 27 October 2026 to 6 November 2026.',
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
      start: '2026-11-01', days: 6, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Finance for Executives', ar: 'المالية للمديرين التنفيذيين' },
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
      start: '2026-11-02', days: 4, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
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
      start: '2026-11-09', days: 4, price: 8950, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Energizing People for Performance', ar: 'تحفيز الأفراد لتحقيق الأداء' },
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
      id: 'c-the-strategy-of-leadership', school: 's-kellogg-school-of-management', subject: 'strategy', format: 'in-person',
      start: '2026-11-09', days: 3, price: 10450, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
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
      start: '2026-11-16', days: 5, price: 9950, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Advanced Marketing Management', ar: 'الإدارة المتقدمة للتسويق' },
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
      start: '2026-11-16', days: 4, price: 8950, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
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
      start: '2026-11-30', days: 12, price: 6900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Negotiation Master Class', ar: 'ماستر كلاس في التفاوض' },
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
      id: 'c-growth-marketing', school: 's-kellogg-school-of-management', subject: 'marketing', format: 'in-person',
      start: '2026-12-07', days: 4, price: 8950, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/illinois/northwestern-university-kellogg-school-of-management-executive-education',
      title: { en: 'Growth Marketing', ar: 'تسويق النمو' },
      summary: {
        en: 'A 4-day on-campus program from Kellogg School of Management, running 7 December 2026 to 10 December 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية كيلوغ للإدارة، من 7 ديسمبر 2026 إلى 10 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-high-performing-teams', school: 's-michigan-ross-executive-education', subject: 'leadership', format: 'in-person',
      start: '2026-09-15', days: 4, price: 8900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/michigan/michigan-ross-executive-education-university-of-michigan',
      title: { en: 'Leading High-Performing Teams', ar: 'قيادة الفرق ذات الأداء العالي' },
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
      id: 'c-emerging-leaders-program-becoming-a-tr', school: 's-michigan-ross-executive-education', subject: 'leadership', format: 'in-person',
      start: '2026-09-28', days: 5, price: 10700, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/michigan/michigan-ross-executive-education-university-of-michigan',
      title: {
        en: 'Emerging Leaders Program: Becoming a Transformational Leader',
        ar: 'برنامج القادة الصاعدين: كيف تصبح قائداً تحويلياً'
      },
      summary: {
        en: 'A 5-day on-campus program from Michigan Ross Executive Education, running 28 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من التعليم التنفيذي في كلية روس بجامعة ميشيغان، من 28 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-leaders-program-vision-strat', school: 's-michigan-ross-executive-education', subject: 'strategy', format: 'in-person',
      start: '2026-10-26', days: 5, price: 11500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/michigan/michigan-ross-executive-education-university-of-michigan',
      title: {
        en: 'Strategic Leaders Program: Vision, Strategy, and Managing the Organization to Drive Results',
        ar: 'برنامج القادة الاستراتيجيين: الرؤية والاستراتيجية وإدارة المؤسسة لتحقيق النتائج'
      },
      summary: {
        en: 'A 5-day on-campus program from Michigan Ross Executive Education, running 26 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من التعليم التنفيذي في كلية روس بجامعة ميشيغان، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-executive-presence-through-strategic-c', school: 's-michigan-ross-executive-education', subject: 'people', format: 'in-person',
      start: '2026-10-27', days: 3, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/michigan/michigan-ross-executive-education-university-of-michigan',
      title: {
        en: 'Executive Presence Through Strategic Communication',
        ar: 'الحضور التنفيذي من خلال التواصل الاستراتيجي'
      },
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
      id: 'c-advanced-human-resource-executive--2', school: 's-michigan-ross-executive-education', subject: 'people', format: 'blended',
      start: '2027-04-05', days: 12, price: 25800, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/michigan/michigan-ross-executive-education-university-of-michigan',
      title: {
        en: 'Advanced Human Resource Executive Program (Blended)',
        ar: 'البرنامج التنفيذي المتقدم للموارد البشرية (مدمج)'
      },
      summary: {
        en: 'A 12-day hybrid program from Michigan Ross Executive Education, running 5 April 2027 to 16 April 2027.',
        ar: 'برنامج مدمج لمدة 12 يومًا من التعليم التنفيذي في كلية روس بجامعة ميشيغان، من 5 أبريل 2027 إلى 16 أبريل 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-the-ai-driven-organization', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-09-14', days: 5, price: 12900, langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/massachusetts-institute-of-technology-mit-sloan-school-of-management-executive-education',
      title: { en: 'Leading the AI-Driven Organization', ar: 'قيادة المؤسسة المدفوعة بالذكاء الاصطناعي' },
      summary: {
        en: 'A 5-day on-campus program from MIT Sloan School of Management, running 14 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية سلون للإدارة بمعهد ماساتشوستس للتكنولوجيا، من 14 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-frontiers-of-generative-ai-in-business', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'in-person',
      start: '2026-09-22', days: 2, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/massachusetts-institute-of-technology-mit-sloan-school-of-management-executive-education',
      title: { en: 'Frontiers of Generative AI in Business', ar: 'آفاق الذكاء الاصطناعي التوليدي في الأعمال' },
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
      start: '2026-09-24', days: 2, price: 5700, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/massachusetts-institute-of-technology-mit-sloan-school-of-management-executive-education',
      title: {
        en: 'AI Essentials: Accelerating Impactful Adoption',
        ar: 'أساسيات الذكاء الاصطناعي: تسريع التبنّي المؤثر'
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
      id: 'c-understanding-and-solving-complex-busi', school: 's-mit-sloan-school-of-management', subject: 'leadership', format: 'in-person',
      start: '2026-10-15', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/massachusetts-institute-of-technology-mit-sloan-school-of-management-executive-education',
      title: { en: 'Understanding and Solving Complex Business Problems', ar: 'فهم مشكلات الأعمال المعقدة وحلها' },
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
      id: 'c-negotiation-for-executives', school: 's-mit-sloan-school-of-management', subject: 'negotiation', format: 'in-person',
      start: '2026-11-17', days: 2, price: 5300, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/massachusetts-institute-of-technology-mit-sloan-school-of-management-executive-education',
      title: { en: 'Negotiation for Executives', ar: 'التفاوض للمديرين التنفيذيين' },
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
      id: 'c-communication-and-persuasion-in-the-di', school: 's-mit-sloan-school-of-management', subject: 'digital', format: 'online',
      start: '2026-12-08', days: 2, price: 4900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/massachusetts/massachusetts-institute-of-technology-mit-sloan-school-of-management-executive-education',
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
      id: 'c-leadership-training-for-high-potential', school: 's-nyu-stern-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-10', days: 2, price: 3344, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/new-york/new-york-university-nyu-stern-school-of-business-executive-education',
      title: { en: 'Leadership Training for High Potentials', ar: 'تدريب قيادي لأصحاب الإمكانات العالية' },
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
      id: 'c-design-thinking-bootcamp-make-impact-a', school: 's-stanford-graduate-school-of-business', subject: 'marketing', format: 'in-person',
      start: '2026-09-07', days: 5, price: 14000, langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/stanford-university-stanford-graduate-school-of-business-executive-education',
      title: {
        en: 'Design Thinking Bootcamp: Make Impact and Drive Growth in Your Organization',
        ar: 'معسكر التفكير التصميمي: اصنع الأثر وادفع عجلة النمو في مؤسستك'
      },
      summary: {
        en: 'A 5-day on-campus program from Stanford Graduate School of Business, running 7 September 2026 to 11 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 7 سبتمبر 2026 إلى 11 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-change-and-organizational-rene', school: 's-stanford-graduate-school-of-business', subject: 'strategy', format: 'in-person',
      start: '2026-09-13', days: 6, price: 17000, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/stanford-university-stanford-graduate-school-of-business-executive-education',
      title: { en: 'Leading Change and Organizational Renewal', ar: 'قيادة التغيير والتجديد المؤسسي' },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 13 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 13 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-black-leadership-program', school: 's-stanford-graduate-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-09-20', days: 6, price: 15000, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/stanford-university-stanford-graduate-school-of-business-executive-education',
      title: { en: 'Black Leadership Program', ar: 'برنامج القيادة للقادة السود' },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 20 September 2026 to 25 September 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 20 سبتمبر 2026 إلى 25 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-harnessing-ai-for-breakthrough-innovat', school: 's-stanford-graduate-school-of-business', subject: 'digital', format: 'in-person',
      start: '2026-10-18', days: 6, price: 17500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/stanford-university-stanford-graduate-school-of-business-executive-education',
      title: {
        en: 'Harnessing AI for Breakthrough Innovation and Strategic Impact',
        ar: 'تسخير الذكاء الاصطناعي للابتكار والأثر الاستراتيجي'
      },
      summary: {
        en: 'A 6-day on-campus program from Stanford Graduate School of Business, running 18 October 2026 to 23 October 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية ستانفورد للدراسات العليا في الأعمال، من 18 أكتوبر 2026 إلى 23 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-directors-consortium', school: 's-stanford-graduate-school-of-business', subject: 'finance', format: 'in-person',
      start: '2026-10-19', days: 5, price: 16000, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/stanford-university-stanford-graduate-school-of-business-executive-education',
      title: { en: 'Directors’ Consortium', ar: 'ملتقى أعضاء مجالس الإدارة' },
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
      id: 'c-executive-program-in-leadership-the-ef', school: 's-stanford-graduate-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-15', days: 6, price: 16000, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/stanford-university-stanford-graduate-school-of-business-executive-education',
      title: {
        en: 'Executive Program in Leadership: The Effective Use of Power',
        ar: 'البرنامج التنفيذي في القيادة: الاستخدام الفعّال للسلطة'
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
      id: 'c-women-s-executive-leadership-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-09-22', days: 4, price: 6900, langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
      title: { en: "Women's Executive Leadership Program", ar: 'برنامج القيادة التنفيذية للمرأة' },
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
      id: 'c-product-management-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-09-28', days: 5, price: 7900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
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
      id: 'c-advanced-executive-presence-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'people', format: 'in-person',
      start: '2026-09-30', days: 3, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
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
      id: 'c-financial-data-analysis-for-leaders', school: 's-uc-berkeley-haas-school-of-business', subject: 'finance', format: 'in-person',
      start: '2026-10-05', days: 5, price: 7500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
      title: { en: 'Financial Data Analysis for Leaders', ar: 'تحليل البيانات المالية للقادة' },
      summary: {
        en: 'A 5-day on-campus program from UC Berkeley Haas School of Business, running 5 October 2026 to 9 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية هاس للأعمال بجامعة كاليفورنيا في بيركلي، من 5 أكتوبر 2026 إلى 9 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-communications-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'people', format: 'in-person',
      start: '2026-10-14', days: 3, price: 5600, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
      title: { en: 'Leadership Communications Program', ar: 'برنامج الاتصال القيادي' },
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
      start: '2026-10-26', days: 5, price: 9900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
      title: { en: 'The Berkeley Executive Leadership Program', ar: 'برنامج بيركلي للقيادة التنفيذية' },
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
      id: 'c-venture-capital-executive-program', school: 's-uc-berkeley-haas-school-of-business', subject: 'entrepreneurship', format: 'in-person',
      start: '2026-11-02', days: 5, price: 8700, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
      title: { en: 'Venture Capital Executive Program', ar: 'البرنامج التنفيذي لرأس المال الجريء' },
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
      start: '2026-11-04', days: 3, price: 5900, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
      title: { en: 'High-Impact Leadership Program', ar: 'برنامج القيادة عالية التأثير' },
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
      start: '2026-11-04', days: 3, price: 3400, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
      title: {
        en: 'Leading Strategy Execution through Culture Program',
        ar: 'برنامج قيادة تنفيذ الاستراتيجية من خلال الثقافة'
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
      id: 'c-new-manager-boot-camp', school: 's-uc-berkeley-haas-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-04', days: 3, price: 5400, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
      title: { en: 'New Manager Boot Camp', ar: 'معسكر المدير الجديد' },
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
      id: 'c-negotiation-and-influence', school: 's-uc-berkeley-haas-school-of-business', subject: 'negotiation', format: 'in-person',
      start: '2026-11-18', days: 3, price: 5100, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
      title: { en: 'Negotiation and Influence', ar: 'التفاوض والتأثير' },
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
      start: '2026-12-09', days: 3, price: 4500, langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/usa/california/university-of-california-uc-berkeley-haas-school-of-business-center-for-executive-education',
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
      id: 'c-building-an-ai-strategy', school: 's-agsm-university-of-new-south-wales', subject: 'digital', format: 'in-person',
      start: '2026-09-01', days: 3, price: 5150, currency: 'AUD', langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Building an AI Strategy', ar: 'بناء استراتيجية للذكاء الاصطناعي' },
      summary: {
        en: 'A 3-day on-campus program from AGSM, University of New South Wales, running 1 September 2026 to 3 September 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 1 سبتمبر 2026 إلى 3 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leader-as-coach', school: 's-agsm-university-of-new-south-wales', subject: 'people', format: 'in-person',
      start: '2026-09-01', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Leader as Coach', ar: 'القائد كمدرب (كوتش)' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 1 September 2026 to 2 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 1 سبتمبر 2026 إلى 2 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-for-organisational-innovation', school: 's-agsm-university-of-new-south-wales', subject: 'digital', format: 'in-person',
      start: '2026-09-08', days: 2, price: 2300, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'AI for Organisational Innovation', ar: 'الذكاء الاصطناعي للابتكار المؤسسي' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 8 September 2026 to 9 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 8 سبتمبر 2026 إلى 9 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-authentic-communicator-activating-pres', school: 's-agsm-university-of-new-south-wales', subject: 'people', format: 'in-person',
      start: '2026-09-08', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Authentic Communicator: Activating Presence', ar: 'المتواصل الأصيل: تفعيل الحضور' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 8 September 2026 to 9 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 8 سبتمبر 2026 إلى 9 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-general-manager-program', school: 's-agsm-university-of-new-south-wales', subject: 'people', format: 'in-person',
      start: '2026-09-14', days: 5, price: 14990, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'General Manager Program', ar: 'برنامج المدير العام' },
      summary: {
        en: 'A 5-day on-campus program from AGSM, University of New South Wales, running 14 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 14 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-adaptive-leadership', school: 's-agsm-university-of-new-south-wales', subject: 'strategy', format: 'in-person',
      start: '2026-09-16', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Strategic & Adaptive Leadership', ar: 'القيادة الاستراتيجية والتكيفية' },
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
      start: '2026-09-22', days: 4, price: 7150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
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
      id: 'c-design-thinking-experimentation', school: 's-agsm-university-of-new-south-wales', subject: 'digital', format: 'in-person',
      start: '2026-10-13', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
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
      id: 'c-project-management-excellence', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-10-19', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Project Management Excellence', ar: 'التميز في إدارة المشاريع' },
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
      start: '2026-10-21', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Tackling Complexity through Leadership', ar: 'مواجهة التعقيد من خلال القيادة' },
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
      id: 'c-ai-for-business-leaders', school: 's-agsm-university-of-new-south-wales', subject: 'digital', format: 'online',
      start: '2026-10-28', days: 16, price: 3200, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'AI for Business Leaders', ar: 'الذكاء الاصطناعي لقادة الأعمال' },
      summary: {
        en: 'A 16-day online program from AGSM, University of New South Wales, running 28 October 2026 to 12 November 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 16 يومًا من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 28 أكتوبر 2026 إلى 12 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-with-emotional-intelligence', school: 's-agsm-university-of-new-south-wales', subject: 'people', format: 'in-person',
      start: '2026-10-29', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Leading with Emotional Intelligence', ar: 'القيادة بالذكاء العاطفي' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 29 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 29 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-essentials-of-finance-for-non-finance', school: 's-agsm-university-of-new-south-wales', subject: 'finance', format: 'in-person',
      start: '2026-11-04', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
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
      start: '2026-11-05', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
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
      id: 'c-data-driven-leadership', school: 's-agsm-university-of-new-south-wales', subject: 'data', format: 'in-person',
      start: '2026-11-09', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Data Driven Leadership', ar: 'القيادة المدفوعة بالبيانات' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 9 November 2026 to 10 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 9 نوفمبر 2026 إلى 10 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-for-high-performance', school: 's-agsm-university-of-new-south-wales', subject: 'people', format: 'in-person',
      start: '2026-11-10', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Leading for High Performance', ar: 'القيادة من أجل الأداء العالي' },
      summary: {
        en: 'A 2-day on-campus program from AGSM, University of New South Wales, running 10 November 2026 to 11 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية الدراسات العليا الأسترالية للإدارة (AGSM)، من 10 نوفمبر 2026 إلى 11 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-data-governance-for-leaders', school: 's-agsm-university-of-new-south-wales', subject: 'data', format: 'in-person',
      start: '2026-11-12', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
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
      start: '2026-11-16', days: 5, price: 8990, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
      title: { en: 'Accelerated Leadership Program', ar: 'برنامج القيادة المعجّل' },
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
      start: '2026-11-16', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
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
      id: 'c-adaptive-leadership-program', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-11-23', days: 4, price: 7950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
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
      start: '2026-11-23', days: 3, price: 5150, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
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
      id: 'c-project-governance-for-leaders', school: 's-agsm-university-of-new-south-wales', subject: 'leadership', format: 'in-person',
      start: '2026-11-26', days: 2, price: 3950, currency: 'AUD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/australia-nz/australia/university-of-new-south-wales-australian-school-of-business-agsm-executive-education',
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
      id: 'c-brsens-bestyrelsesuddannelse-september', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2026-09-02', days: 8, price: 69999, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'Børsens Bestyrelsesuddannelse September 2026',
        ar: 'برنامج Børsen لتأهيل أعضاء مجالس الإدارة سبتمبر 2026'
      },
      summary: {
        en: 'A 8-day on-campus program from CBS Executive, Copenhagen Business School, running 2 September 2026 to 2 December 2026.',
        ar: 'برنامج حضوري لمدة 8 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 2 سبتمبر 2026 إلى 2 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-blue-board-leadership-2026', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2026-09-07', days: 8, price: 78225, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: { en: 'Blue Board Leadership 2026', ar: 'برنامج Blue Board لقيادة مجالس الإدارة 2026' },
      summary: {
        en: 'A 8-day on-campus program from CBS Executive, Copenhagen Business School, running 7 September 2026 to 12 November 2026.',
        ar: 'برنامج حضوري لمدة 8 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 7 سبتمبر 2026 إلى 12 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-cbs-executive-bestyrelsesuddannelsen-s', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2026-09-07', days: 16, price: 120000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'CBS Executive Bestyrelsesuddannelsen September 2026',
        ar: 'برنامج CBS Executive لتأهيل أعضاء مجالس الإدارة سبتمبر 2026'
      },
      summary: {
        en: 'A 16-day on-campus program from CBS Executive, Copenhagen Business School, running 7 September 2026 to 30 January 2027.',
        ar: 'برنامج حضوري لمدة 16 يومًا من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 7 سبتمبر 2026 إلى 30 يناير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-lobbyistens-vej-til-magten', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2026-09-10', days: 2, price: 13500, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: { en: 'Lobbyistens vej til Magten', ar: 'طريق جماعات الضغط إلى السلطة' },
      summary: {
        en: 'A 2-day on-campus program from CBS Executive, Copenhagen Business School, running 10 September 2026 to 17 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 10 سبتمبر 2026 إلى 17 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-bestyrelsesarbejde-i-pension-forsikrin', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2026-09-23', days: 5, price: 41600, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'Bestyrelsesarbejde i Pension & Forsikring 2026',
        ar: 'العمل في مجالس إدارة شركات التقاعد والتأمين 2026'
      },
      summary: {
        en: 'A 5-day on-campus program from CBS Executive, Copenhagen Business School, running 23 September 2026 to 29 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 23 سبتمبر 2026 إلى 29 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-bestyrelsesarbejde-i-bank-realkredit-2', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2026-10-28', days: 5, price: 41600, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'Bestyrelsesarbejde i Bank & Realkredit 2026',
        ar: 'العمل في مجالس إدارة البنوك والائتمان العقاري 2026'
      },
      summary: {
        en: 'A 5-day on-campus program from CBS Executive, Copenhagen Business School, running 28 October 2026 to 3 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 28 أكتوبر 2026 إلى 3 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-bestyrelsesuddannelse-i-esg-bredygtigh', school: 's-cbs-executive-copenhagen-business-scho', subject: 'sustainability', format: 'in-person',
      start: '2026-11-02', days: 3, price: 29000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'Bestyrelsesuddannelse i ESG & Bæredygtighed 2026',
        ar: 'برنامج تأهيل أعضاء مجالس الإدارة في ESG والاستدامة 2026'
      },
      summary: {
        en: 'A 3-day on-campus program from CBS Executive, Copenhagen Business School, running 2 November 2026 to 4 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 2 نوفمبر 2026 إلى 4 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leadership-for-the-future-2026', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2026-11-16', days: 9, price: 79950, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: { en: 'Leadership for the Future 2026', ar: 'القيادة من أجل المستقبل 2026' },
      summary: {
        en: 'A 9-day on-campus program from CBS Executive, Copenhagen Business School, running 16 November 2026 to 27 May 2027.',
        ar: 'برنامج حضوري لمدة 9 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 16 نوفمبر 2026 إلى 27 مايو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-masterclass-business-innovation-in-lif', school: 's-cbs-executive-copenhagen-business-scho', subject: 'healthcare', format: 'in-person',
      start: '2026-12-01', days: 3, price: 20000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'Masterclass: Business Innovation in Life Science 2025',
        ar: 'ماستركلاس: ابتكار الأعمال في علوم الحياة 2025'
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
      start: '2026-12-08', days: 3, price: 22500, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: { en: 'Sustainability Transformation Accelerator', ar: 'مسرّع التحول نحو الاستدامة' },
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
      id: 'c-professional-negotiation', school: 's-cbs-executive-copenhagen-business-scho', subject: 'negotiation', format: 'in-person',
      start: '2027-01-18', days: 4, price: 25000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
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
      id: 'c-cbs-executive-bestyrelsesuddannelsen-f', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2027-02-01', days: 16, price: 120000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'CBS Executive Bestyrelsesuddannelsen Februar 2027',
        ar: 'برنامج CBS Executive لتأهيل أعضاء مجالس الإدارة فبراير 2027'
      },
      summary: {
        en: 'A 16-day on-campus program from CBS Executive, Copenhagen Business School, running 1 February 2027 to 5 June 2027.',
        ar: 'برنامج حضوري لمدة 16 يومًا من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 1 فبراير 2027 إلى 5 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-grundlggende-bestyrelsesuddannelse-feb', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2027-02-25', days: 3, price: 26800, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'Grundlæggende Bestyrelsesuddannelse Februar 2027',
        ar: 'التأهيل الأساسي لعضوية مجالس الإدارة - فبراير 2027'
      },
      summary: {
        en: 'A 3-day on-campus program from CBS Executive, Copenhagen Business School, running 25 February 2027 to 28 February 2027.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال – التعليم التنفيذي، من 25 فبراير 2027 إلى 28 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-grundlggende-bestyrelsesuddannelse-apr', school: 's-cbs-executive-copenhagen-business-scho', subject: 'leadership', format: 'in-person',
      start: '2027-04-26', days: 3, price: 26800, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'Grundlæggende Bestyrelsesuddannelse April 2027',
        ar: 'التأهيل الأساسي لعضوية مجالس الإدارة - أبريل 2027'
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
      start: '2027-08-23', days: 3, price: 26800, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs-cbs-executive',
      title: {
        en: 'Grundlæggende Bestyrelsesuddannelse August 2027',
        ar: 'التأهيل الأساسي لعضوية مجالس الإدارة - أغسطس 2027'
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
      id: 'c-leadership-development-program-ldp', school: 's-center-for-creative-leadership-singapo', subject: 'leadership', format: 'in-person',
      start: '2026-09-28', days: 5, price: 11500, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/asia/singapore/center-for-creative-leadership-singapore-campus',
      title: { en: 'Leadership Development Program (LDP)®', ar: 'برنامج تطوير القيادة (LDP)®' },
      summary: {
        en: 'A 5-day on-campus program from Center for Creative Leadership – Singapore, running 28 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من مركز القيادة الإبداعية – سنغافورة، من 28 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-senior-leadership-training-leading-for', school: 's-center-for-creative-leadership-singapo', subject: 'leadership', format: 'in-person',
      start: '2026-11-23', days: 5, price: 14500, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/asia/singapore/center-for-creative-leadership-singapore-campus',
      title: {
        en: 'Senior Leadership Training: Leading for Organizational Impact',
        ar: 'تدريب القيادات العليا: القيادة لتحقيق الأثر المؤسسي'
      },
      summary: {
        en: 'A 5-day on-campus program from Center for Creative Leadership – Singapore, running 23 November 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من مركز القيادة الإبداعية – سنغافورة، من 23 نوفمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-brsens-bestyrelsesuddannelse', school: 's-copenhagen-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-02', days: 10, price: 69999, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs',
      title: { en: 'Børsens Bestyrelsesuddannelse', ar: 'برنامج Børsen لتأهيل أعضاء مجالس الإدارة' },
      summary: {
        en: 'A 10-day on-campus program from Copenhagen Business School, running 2 September 2026 to 11 September 2026.',
        ar: 'برنامج حضوري لمدة 10 أيام من كلية كوبنهاغن للأعمال، من 2 سبتمبر 2026 إلى 11 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-bestyrelsesarbejde-i-bank-realkredit', school: 's-copenhagen-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-10-28', days: 7, price: 41600, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs',
      title: { en: 'Bestyrelsesarbejde i Bank & Realkredit', ar: 'العمل في مجالس إدارة البنوك والائتمان العقاري' },
      summary: {
        en: 'A 7-day on-campus program from Copenhagen Business School, running 28 October 2026 to 3 November 2026.',
        ar: 'برنامج حضوري لمدة 7 أيام من كلية كوبنهاغن للأعمال، من 28 أكتوبر 2026 إلى 3 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-bestyrelsesuddannelse-i-esg-bredyg-2', school: 's-copenhagen-business-school', subject: 'sustainability', format: 'in-person',
      start: '2026-11-02', days: 3, price: 29000, currency: 'DKK', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/denmark/copenhagen-business-school-cbs',
      title: {
        en: 'Bestyrelsesuddannelse i ESG & Bæredygtighed',
        ar: 'برنامج تأهيل أعضاء مجالس الإدارة في ESG والاستدامة'
      },
      summary: {
        en: 'A 3-day on-campus program from Copenhagen Business School, running 2 November 2026 to 4 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية كوبنهاغن للأعمال، من 2 نوفمبر 2026 إلى 4 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-high-performance-leadership', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-06', days: 6, price: 14900, currency: 'CHF', langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'High Performance Leadership', ar: 'القيادة عالية الأداء' },
      summary: {
        en: 'A 6-day on-campus program from IMD Business School, running 6 September 2026 to 11 September 2026.',
        ar: 'برنامج حضوري لمدة 6 أيام من كلية IMD للأعمال، من 6 سبتمبر 2026 إلى 11 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-digital-execution', school: 's-imd-business-school', subject: 'digital', format: 'in-person',
      start: '2026-09-07', days: 5, price: 10900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Leading Digital Execution', ar: 'قيادة التنفيذ الرقمي' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 7 September 2026 to 11 September 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 7 سبتمبر 2026 إلى 11 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-breakthrough-program-for-senior-execut', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-08', days: 10, price: 25500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Breakthrough Program for Senior Executives', ar: 'برنامج الانطلاقة النوعية لكبار التنفيذيين' },
      summary: {
        en: 'A 10-day on-campus program from IMD Business School, running 8 September 2026 to 17 September 2026.',
        ar: 'برنامج حضوري لمدة 10 أيام من كلية IMD للأعمال، من 8 سبتمبر 2026 إلى 17 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-high-performance-teams', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-08', days: 4, price: 7900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Leading High-Performance Teams', ar: 'قيادة الفرق عالية الأداء' },
      summary: {
        en: 'A 4-day on-campus program from IMD Business School, running 8 September 2026 to 11 September 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية IMD للأعمال، من 8 سبتمبر 2026 إلى 11 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-global-management-foundations', school: 's-imd-business-school', subject: 'leadership', format: 'blended',
      start: '2026-09-11', days: 9, price: 25000, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Global Management Foundations', ar: 'أساسيات الإدارة العالمية' },
      summary: {
        en: 'A 9-day hybrid program from IMD Business School, running 11 September 2026 to 15 December 2026.',
        ar: 'برنامج مدمج لمدة 9 أيام من كلية IMD للأعمال، من 11 سبتمبر 2026 إلى 15 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-strategy-and-implementation', school: 's-imd-business-school', subject: 'digital', format: 'in-person',
      start: '2026-09-14', days: 5, price: 10900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
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
      id: 'c-leading-your-family-business', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-09-14', days: 5, price: 11900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Leading your Family Business', ar: 'قيادة شركتك العائلية' },
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
      id: 'c-strategies-for-leadership', school: 's-imd-business-school', subject: 'strategy', format: 'in-person',
      start: '2026-09-15', days: 4, price: 10900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Strategies for Leadership', ar: 'استراتيجيات القيادة' },
      summary: {
        en: 'A 4-day on-campus program from IMD Business School, running 15 September 2026 to 18 September 2026.',
        ar: 'برنامج حضوري لمدة 4 أيام من كلية IMD للأعمال، من 15 سبتمبر 2026 إلى 18 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-the-first-90-days', school: 's-imd-business-school', subject: 'strategy', format: 'online',
      start: '2026-09-15', days: 3, price: 3900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'The First 90 Days®', ar: 'الأيام التسعون الأولى' },
      summary: {
        en: 'A 3-day online program from IMD Business School, running 15 September 2026 to 17 September 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 3 أيام من كلية IMD للأعمال، من 15 سبتمبر 2026 إلى 17 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-digital-and-ai-transformation', school: 's-imd-business-school', subject: 'digital', format: 'in-person',
      start: '2026-09-28', days: 5, price: 10900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Leading Digital and AI Transformation', ar: 'قيادة التحول الرقمي وتحول الذكاء الاصطناعي' },
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
      id: 'c-innovate-with-ai-and-tech', school: 's-imd-business-school', subject: 'digital', format: 'in-person',
      start: '2026-10-04', days: 5, price: 10900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Innovate with AI and Tech', ar: 'الابتكار بالذكاء الاصطناعي والتقنية' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 4 October 2026 to 8 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 4 أكتوبر 2026 إلى 8 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-advanced-management-program', school: 's-imd-business-school', subject: 'leadership', format: 'blended',
      start: '2026-10-05', days: 15, price: 32500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Advanced Management Program', ar: 'برنامج الإدارة المتقدم' },
      summary: {
        en: 'A 15-day hybrid program from IMD Business School, running 5 October 2026 to 25 November 2026.',
        ar: 'برنامج مدمج لمدة 15 يومًا من كلية IMD للأعمال، من 5 أكتوبر 2026 إلى 25 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-generative-ai-for-business-sprint', school: 's-imd-business-school', subject: 'digital', format: 'online',
      start: '2026-10-05', days: 5, price: 950, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Generative AI for Business Sprint', ar: 'سباق الذكاء الاصطناعي التوليدي للأعمال' },
      summary: {
        en: 'A 5-day online program from IMD Business School, running 5 October 2026 to 12 October 2026.',
        ar: 'برنامج عبر الإنترنت لمدة 5 أيام من كلية IMD للأعمال، من 5 أكتوبر 2026 إلى 12 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-mobilizing-people', school: 's-imd-business-school', subject: 'people', format: 'in-person',
      start: '2026-10-15', days: 9, price: 23000, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Mobilizing People', ar: 'حشد الأفراد وتعبئتهم' },
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
      start: '2026-10-19', days: 5, price: 9500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
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
      id: 'c-orchestrating-winning-performance', school: 's-imd-business-school', subject: 'sustainability', format: 'in-person',
      start: '2026-10-19', days: 5, price: 15600, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Orchestrating Winning Performance', ar: 'تنسيق الأداء الرابح' },
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
      id: 'c-negotiating-for-value-creation', school: 's-imd-business-school', subject: 'negotiation', format: 'in-person',
      start: '2026-10-20', days: 3, price: 6900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Negotiating for Value Creation', ar: 'التفاوض لخلق القيمة' },
      summary: {
        en: 'A 3-day on-campus program from IMD Business School, running 20 October 2026 to 22 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية IMD للأعمال، من 20 أكتوبر 2026 إلى 22 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-finance', school: 's-imd-business-school', subject: 'finance', format: 'in-person',
      start: '2026-10-26', days: 5, price: 10900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Strategic Finance', ar: 'المالية الاستراتيجية' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 26 October 2026 to 30 October 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 26 أكتوبر 2026 إلى 30 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-supply-chain-leadership', school: 's-imd-business-school', subject: 'operations', format: 'blended',
      start: '2026-10-30', days: 3, price: 7900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Strategic Supply Chain Leadership', ar: 'القيادة الاستراتيجية لسلسلة الإمداد' },
      summary: {
        en: 'A 3-day hybrid program from IMD Business School, running 30 October 2026 to 11 November 2026.',
        ar: 'برنامج مدمج لمدة 3 أيام من كلية IMD للأعمال، من 30 أكتوبر 2026 إلى 11 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-organizational-learning-in-action', school: 's-imd-business-school', subject: 'people', format: 'blended',
      start: '2026-11-02', days: 4, price: 9000, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Organizational Learning in Action', ar: 'التعلم المؤسسي في التطبيق العملي' },
      summary: {
        en: 'A 4-day hybrid program from IMD Business School, running 2 November 2026 to 4 December 2026.',
        ar: 'برنامج مدمج لمدة 4 أيام من كلية IMD للأعمال، من 2 نوفمبر 2026 إلى 4 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-reinventing-luxury-lab', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-11-05', days: 2, price: 3500, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Reinventing Luxury Lab', ar: 'مختبر إعادة ابتكار قطاع الفخامة' },
      summary: {
        en: 'A 2-day on-campus program from IMD Business School, running 5 November 2026 to 6 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية IMD للأعمال، من 5 نوفمبر 2026 إلى 6 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-foundations-for-business-leadership', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2026-11-08', days: 15, price: 25000, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Foundations for Business Leadership', ar: 'أسس قيادة الأعمال' },
      summary: {
        en: 'A 15-day on-campus program from IMD Business School, running 8 November 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة 15 يومًا من كلية IMD للأعمال، من 8 نوفمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-digital-and-ai-accelerator', school: 's-imd-business-school', subject: 'digital', format: 'in-person',
      start: '2026-11-16', days: 5, price: 13900, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Digital and AI Accelerator', ar: 'مسرّعة التحول الرقمي والذكاء الاصطناعي' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 16 November 2026 to 20 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 16 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-digital-ecosystems', school: 's-imd-business-school', subject: 'digital', format: 'in-person',
      start: '2026-11-23', days: 5, price: 10900, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Building Digital Ecosystems', ar: 'بناء المنظومات الرقمية' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 23 November 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 23 نوفمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-leading-your-family-office', school: 's-imd-business-school', subject: 'leadership', format: 'in-person',
      start: '2027-05-31', days: 5, price: 12400, currency: 'CHF', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/imd-international-executive-education',
      title: { en: 'Leading your Family Office', ar: 'قيادة مكتبك العائلي' },
      summary: {
        en: 'A 5-day on-campus program from IMD Business School, running 31 May 2027 to 4 June 2027.',
        ar: 'برنامج حضوري لمدة 5 أيام من كلية IMD للأعمال، من 31 مايو 2027 إلى 4 يونيو 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-labour-and-employment-law-classroom-sy', school: 's-nus-business-school', subject: 'leadership', format: 'blended',
      start: '2026-10-05', days: 8, price: 2943, currency: 'SGD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/asia/singapore/national-university-of-singapore-nus-business-school-executive-education',
      title: {
        en: 'LABOUR AND EMPLOYMENT LAW (CLASSROOM & SYNCHRONOUS E-LEARNING)',
        ar: 'قانون العمل والتوظيف (حضوري وتعلم إلكتروني متزامن)'
      },
      summary: {
        en: 'A 8-day hybrid program from NUS Business School, running 5 October 2026 to 12 October 2026.',
        ar: 'برنامج مدمج لمدة 8 أيام من كلية الأعمال بجامعة سنغافورة الوطنية، من 5 أكتوبر 2026 إلى 12 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-developing-your-leadership-presence-vi', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'online',
      start: '2026-09-22', days: 9, price: 3300, currency: 'CAD', langs: ['en'], featured: true, popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Developing Your Leadership Presence - Virtual', ar: 'تطوير حضورك القيادي - عن بُعد' },
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
      start: '2026-09-24', days: 9, price: 2000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Learning to Lead - Virtual', ar: 'تعلم القيادة - عن بُعد' },
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
      start: '2026-09-29', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      start: '2026-10-01', days: 2, price: 3900, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      start: '2026-10-05', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Accounting and Finance Fundamentals', ar: 'أساسيات المحاسبة والمالية' },
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
      id: 'c-emotional-intelligence-for-leaders', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-10-07', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Emotional Intelligence for Leaders', ar: 'الذكاء العاطفي للقادة' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 7 October 2026 to 8 October 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 7 أكتوبر 2026 إلى 8 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-closing-the-strategy-execution-gap-vir', school: 's-smith-school-of-business-queen-s-unive', subject: 'strategy', format: 'online',
      start: '2026-10-08', days: 9, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Closing the Strategy-Execution Gap - Virtual', ar: 'سد الفجوة بين الاستراتيجية والتنفيذ - عن بُعد' },
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
      start: '2026-10-08', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      id: 'c-coaching-for-high-performance', school: 's-smith-school-of-business-queen-s-unive', subject: 'people', format: 'in-person',
      start: '2026-10-14', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Coaching for High Performance', ar: 'التوجيه لتحقيق الأداء العالي' },
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
      start: '2026-10-19', days: 5, price: 11000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      id: 'c-communicating-with-impact-virtual', school: 's-smith-school-of-business-queen-s-unive', subject: 'people', format: 'online',
      start: '2026-10-22', days: 9, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Communicating With Impact - Virtual', ar: 'التواصل المؤثر - عن بُعد' },
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
      start: '2026-10-22', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      start: '2026-10-26', days: 5, price: 11000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      start: '2026-11-02', days: 2, price: 2700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Learning to Lead', ar: 'تعلم القيادة' },
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
      start: '2026-11-02', days: 5, price: 11000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      start: '2026-11-09', days: 5, price: 11000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      id: 'c-project-leadership', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-11-09', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      start: '2026-11-11', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      id: 'c-strategic-planning-and-leading-cha-2', school: 's-smith-school-of-business-queen-s-unive', subject: 'strategy', format: 'online',
      start: '2026-11-12', days: 9, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: {
        en: 'Strategic Planning and Leading Change - Virtual',
        ar: 'التخطيط الاستراتيجي وقيادة التغيير - افتراضي'
      },
      summary: {
        en: "A 9-day online program from Smith School of Business, Queen's University, running 12 November 2026 to 20 November 2026.",
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية سميث للأعمال بجامعة كوينز، من 12 نوفمبر 2026 إلى 20 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-accounting-and-finance-fundamentals-vi', school: 's-smith-school-of-business-queen-s-unive', subject: 'finance', format: 'online',
      start: '2026-11-16', days: 9, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Accounting and Finance Fundamentals - Virtual', ar: 'أساسيات المحاسبة والمالية - عن بُعد' },
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
      id: 'c-organizational-structure-and-culture', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-11-16', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      id: 'c-closing-the-strategy-execution-gap', school: 's-smith-school-of-business-queen-s-unive', subject: 'strategy', format: 'in-person',
      start: '2026-11-18', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Closing the Strategy-Execution Gap', ar: 'سد الفجوة بين الاستراتيجية والتنفيذ' },
      summary: {
        en: "A 2-day on-campus program from Smith School of Business, Queen's University, running 18 November 2026 to 19 November 2026.",
        ar: 'برنامج حضوري لمدة يومين من كلية سميث للأعمال بجامعة كوينز، من 18 نوفمبر 2026 إلى 19 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-coaching-for-high-performance-virtual', school: 's-smith-school-of-business-queen-s-unive', subject: 'people', format: 'online',
      start: '2026-11-18', days: 15, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Coaching for High Performance - Virtual', ar: 'التوجيه لتحقيق الأداء العالي - عن بُعد' },
      summary: {
        en: "A 15-day online program from Smith School of Business, Queen's University, running 18 November 2026 to 2 December 2026.",
        ar: 'برنامج عبر الإنترنت لمدة 15 يومًا من كلية سميث للأعمال بجامعة كوينز، من 18 نوفمبر 2026 إلى 2 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-communicating-with-impact', school: 's-smith-school-of-business-queen-s-unive', subject: 'people', format: 'in-person',
      start: '2026-11-23', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      id: 'c-conflict-management', school: 's-smith-school-of-business-queen-s-unive', subject: 'leadership', format: 'in-person',
      start: '2026-11-25', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      start: '2026-11-30', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Leading Digital Transformation', ar: 'قيادة التحوّل الرقمي' },
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
      id: 'c-strategic-thinking-turning-complex-2', school: 's-smith-school-of-business-queen-s-unive', subject: 'strategy', format: 'online',
      start: '2026-11-30', days: 9, price: 3000, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: {
        en: 'Strategic Thinking: Turning Complexity into Clarity - Virtual',
        ar: 'التفكير الاستراتيجي: تحويل التعقيد إلى وضوح - افتراضي'
      },
      summary: {
        en: "A 9-day online program from Smith School of Business, Queen's University, running 30 November 2026 to 8 December 2026.",
        ar: 'برنامج عبر الإنترنت لمدة 9 أيام من كلية سميث للأعمال بجامعة كوينز، من 30 نوفمبر 2026 إلى 8 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-an-ai-powered-organization-st', school: 's-smith-school-of-business-queen-s-unive', subject: 'digital', format: 'in-person',
      start: '2026-12-09', days: 2, price: 3700, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
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
      id: 'c-building-your-productivity-edge-with-a', school: 's-smith-school-of-business-queen-s-unive', subject: 'digital', format: 'in-person',
      start: '2026-12-14', days: 2, price: 4300, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/queens-university-queens-school-of-business-executive-education',
      title: { en: 'Building Your Productivity Edge with AI', ar: 'بناء تفوقك الإنتاجي بالذكاء الاصطناعي' },
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
      id: 'c-certified-scrummaster', school: 's-ubc-sauder-school-of-business', subject: 'operations', format: 'online',
      start: '2026-09-09', days: 2, price: 1250, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: { en: 'Certified ScrumMaster', ar: 'سكرم ماستر معتمد (Certified ScrumMaster)' },
      summary: {
        en: 'A 2-day online program from UBC Sauder School of Business, running 9 September 2026 to 10 September 2026.',
        ar: 'برنامج عبر الإنترنت لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 9 سبتمبر 2026 إلى 10 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-building-an-effective-strategy', school: 's-ubc-sauder-school-of-business', subject: 'strategy', format: 'in-person',
      start: '2026-09-10', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: { en: 'Building an Effective Strategy', ar: 'بناء استراتيجية فعالة' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 10 September 2026 to 11 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 10 سبتمبر 2026 إلى 11 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-conflict-management-strategies', school: 's-ubc-sauder-school-of-business', subject: 'strategy', format: 'in-person',
      start: '2026-09-16', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
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
      id: 'c-financial-statement-analysis-for-non-f', school: 's-ubc-sauder-school-of-business', subject: 'finance', format: 'in-person',
      start: '2026-09-24', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
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
      id: 'c-coaching-and-mentoring', school: 's-ubc-sauder-school-of-business', subject: 'people', format: 'in-person',
      start: '2026-10-14', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: { en: 'Coaching and Mentoring', ar: 'التوجيه والإرشاد' },
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
      id: 'c-high-performance-people-skills', school: 's-ubc-sauder-school-of-business', subject: 'people', format: 'in-person',
      start: '2026-10-15', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: { en: 'High-Performance People Skills', ar: 'مهارات التعامل مع الأفراد بأداء عالٍ' },
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
      id: 'c-advanced-leadership-program', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-10-26', days: 5, price: 5650, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
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
      id: 'c-employment-law-essentials', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-10-28', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
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
      id: 'c-communication-and-emotional-intelligen', school: 's-ubc-sauder-school-of-business', subject: 'people', format: 'in-person',
      start: '2026-11-03', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: { en: 'Communication and Emotional Intelligence for Managers', ar: 'التواصل والذكاء العاطفي للمديرين' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 3 November 2026 to 4 November 2026.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 3 نوفمبر 2026 إلى 4 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-ai-advantage-ai-strategies-for-busines', school: 's-ubc-sauder-school-of-business', subject: 'digital', format: 'in-person',
      start: '2026-11-16', days: 3, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: {
        en: 'AI Advantage - AI Strategies for Business Leaders',
        ar: 'AI Advantage - استراتيجيات الذكاء الاصطناعي لقادة الأعمال'
      },
      summary: {
        en: 'A 3-day on-campus program from UBC Sauder School of Business, running 16 November 2026 to 17 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 16 نوفمبر 2026 إلى 17 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-essentials-in-supervisory-skills', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-11-26', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
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
      id: 'c-essential-management-skills', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2026-12-07', days: 5, price: 4390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: { en: 'Essential Management Skills', ar: 'مهارات الإدارة الأساسية' },
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
      start: '2026-12-07', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: { en: 'Leadership Excellence for Administrative Professionals', ar: 'التميز القيادي للمهنيين الإداريين' },
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
      id: 'c-developing-successful-partnerships', school: 's-ubc-sauder-school-of-business', subject: 'leadership', format: 'in-person',
      start: '2027-02-08', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: { en: 'Developing Successful Partnerships', ar: 'بناء شراكات ناجحة' },
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
      id: 'c-leading-people-through-change', school: 's-ubc-sauder-school-of-business', subject: 'people', format: 'in-person',
      start: '2027-02-10', days: 2, price: 2390, currency: 'CAD', langs: ['en'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/canada/university-of-british-columbia-sauder-school-of-business-executive-education',
      title: { en: 'Leading People Through Change', ar: 'قيادة الأفراد خلال التغيير' },
      summary: {
        en: 'A 2-day on-campus program from UBC Sauder School of Business, running 10 February 2027 to 11 February 2027.',
        ar: 'برنامج حضوري لمدة يومين من كلية سودر للأعمال بجامعة كولومبيا البريطانية، من 10 فبراير 2027 إلى 11 فبراير 2027.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-strategic-performance-management', school: 's-university-of-st-gallen-executive-scho', subject: 'strategy', format: 'in-person',
      start: '2026-09-10', days: 2, price: 2250, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/university-of-st-gallen-executive-school-of-management-technology-and-law-es-hsg',
      title: { en: 'Strategic Performance Management', ar: 'الإدارة الاستراتيجية للأداء' },
      summary: {
        en: 'A 2-day on-campus program from University of St. Gallen Executive School, starting 10 September 2026.',
        ar: 'برنامج حضوري لمدة يومين من المدرسة التنفيذية بجامعة سانت غالن، يبدأ في 10 سبتمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-data-protection-officer-dpo-hsg', school: 's-university-of-st-gallen-executive-scho', subject: 'data', format: 'in-person',
      start: '2026-09-14', days: 15, price: 13500, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/university-of-st-gallen-executive-school-of-management-technology-and-law-es-hsg',
      title: { en: 'Data Protection Officer (DPO HSG)', ar: 'مسؤول حماية البيانات (DPO HSG)' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 14 September 2026 to 2 October 2026.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 14 سبتمبر 2026 إلى 2 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-management-for-the-legal-profession-ca', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2026-09-28', days: 15, price: 13500, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/university-of-st-gallen-executive-school-of-management-technology-and-law-es-hsg',
      title: { en: 'Management for the Legal Profession CAS-HSG', ar: 'الإدارة للمهن القانونية CAS-HSG' },
      summary: {
        en: 'A 15-day on-campus program from University of St. Gallen Executive School, running 28 September 2026 to 16 October 2026.',
        ar: 'برنامج حضوري لمدة 15 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 28 سبتمبر 2026 إلى 16 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-finanzbewusst-managen', school: 's-university-of-st-gallen-executive-scho', subject: 'finance', format: 'in-person',
      start: '2026-10-20', days: 3, price: 4900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/university-of-st-gallen-executive-school-of-management-technology-and-law-es-hsg',
      title: { en: 'Finanzbewusst managen', ar: 'الإدارة بوعي مالي' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, starting 20 October 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، يبدأ في 20 أكتوبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-erfolgreich-verhandeln-cas-hsg', school: 's-university-of-st-gallen-executive-scho', subject: 'negotiation', format: 'in-person',
      start: '2026-11-02', days: 20, price: 19500, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/university-of-st-gallen-executive-school-of-management-technology-and-law-es-hsg',
      title: { en: 'Erfolgreich verhandeln CAS-HSG', ar: 'التفاوض الناجح CAS-HSG' },
      summary: {
        en: 'A 20-day on-campus program from University of St. Gallen Executive School, running 2 November 2026 to 27 November 2026.',
        ar: 'برنامج حضوري لمدة 20 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 2 نوفمبر 2026 إلى 27 نوفمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-st-galler-management-seminar-fur-kmu-c', school: 's-university-of-st-gallen-executive-scho', subject: 'leadership', format: 'in-person',
      start: '2026-11-12', days: 20, price: 14900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/university-of-st-gallen-executive-school-of-management-technology-and-law-es-hsg',
      title: {
        en: 'St.Galler Management Seminar für KMU (CAS)',
        ar: 'ندوة سانت غالن في الإدارة للشركات الصغيرة والمتوسطة (CAS)'
      },
      summary: {
        en: 'A 20-day on-campus program from University of St. Gallen Executive School, running 12 November 2026 to 1 December 2026.',
        ar: 'برنامج حضوري لمدة 20 يومًا من المدرسة التنفيذية بجامعة سانت غالن، من 12 نوفمبر 2026 إلى 1 ديسمبر 2026.'
      },
      highlights: {
        en: [],
        ar: []
      },
      audience: { en: '', ar: '' }
    },
    {
      id: 'c-gesprachsfuhrung-und-verhandlungstechn', school: 's-university-of-st-gallen-executive-scho', subject: 'negotiation', format: 'in-person',
      start: '2026-11-17', days: 3, price: 3900, currency: 'CHF', langs: ['de'], popularity: 50, sourceUrl: 'https://executivecourses.com/schools/europe/switzerland/university-of-st-gallen-executive-school-of-management-technology-and-law-es-hsg',
      title: { en: 'Gesprächsführung und Verhandlungstechnik', ar: 'إدارة الحوار وتقنيات التفاوض' },
      summary: {
        en: 'A 3-day on-campus program from University of St. Gallen Executive School, starting 17 November 2026.',
        ar: 'برنامج حضوري لمدة 3 أيام من المدرسة التنفيذية بجامعة سانت غالن، يبدأ في 17 نوفمبر 2026.'
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
      courses: ['c-building-an-ai-strategy', 'c-ai-for-organisational-innovation', 'c-leading-with-ai', 'c-leading-the-ai-driven-organization', 'c-ai-strategy-and-implementation', 'c-frontiers-of-generative-ai-in-business', 'c-ai-essentials-accelerating-impactful-a', 'c-leading-digital-and-ai-transformation']
    },
{
      id: 'l-week',
      title: { en: 'Serious programmes you can finish in a week', ar: 'برامج جادّة يمكن إنهاؤها في أسبوع' },
      blurb: {
        en: 'Five days or fewer, for people who cannot disappear for a month.',
        ar: 'خمسة أيام أو أقل، لمن لا يستطيع الغياب شهرًا كاملًا.'
      },
      courses: ['c-building-an-ai-strategy', 'c-leader-as-coach', 'c-design-thinking-bootcamp-make-impact-a', 'c-leading-digital-execution', 'c-ai-for-organisational-innovation', 'c-authentic-communicator-activating-pres', 'c-leading-high-performance-teams', 'c-lobbyistens-vej-til-magten']
    },
{
      id: 'l-firsttime',
      title: { en: 'Best courses for first-time leaders', ar: 'أفضل البرامج للقادة الجدد' },
      blurb: {
        en: 'The transition into managing people, taught by people who remember it.',
        ar: 'الانتقال إلى إدارة الأشخاص، على يد من يتذكّرون صعوبة هذا الانتقال.'
      },
      courses: ['c-the-first-90-days', 'c-emerging-leader-program', 'c-emerging-leaders-program-becoming-a-tr', 'c-new-manager-boot-camp', 'c-leadership-training-for-high-potential']
    },
{
      id: 'l-online',
      title: { en: 'Best online executive courses', ar: 'أفضل البرامج التنفيذية عن بُعد' },
      blurb: {
        en: 'Live cohorts and real feedback, not a video library with a certificate at the end.',
        ar: 'دفعات مباشرة وتغذية راجعة حقيقية، لا مكتبة فيديو تنتهي بشهادة.'
      },
      courses: ['c-certified-scrummaster', 'c-climate-change-policy-economics-and-po', 'c-the-first-90-days', 'c-developing-your-leadership-presence-vi', 'c-learning-to-lead-virtual', 'c-creating-and-managing-strategic-allian', 'c-generative-ai-for-business-sprint', 'c-closing-the-strategy-execution-gap-vir']
    },
{
      id: 'l-finance',
      title: { en: 'Best finance courses for non-financial executives', ar: 'أفضل برامج التمويل للتنفيذيين من غير الماليين' },
      blurb: {
        en: 'Enough finance to challenge the numbers you are handed.',
        ar: 'قدر من المعرفة المالية يكفي لمساءلة الأرقام التي تُقدَّم إليك.'
      },
      courses: ['c-financial-statement-analysis-for-non-f', 'c-financial-data-analysis-for-leaders', 'c-accounting-and-finance-fundamentals', 'c-mergers-acquisitions', 'c-directors-consortium', 'c-finanzbewusst-managen', 'c-strategic-finance', 'c-finance-for-executives']
    },
{
      id: 'l-negotiation',
      title: { en: 'Best negotiation programmes', ar: 'أفضل برامج التفاوض' },
      blurb: {
        en: 'Programmes where you negotiate for most of the week, rather than hear about negotiating.',
        ar: 'برامج تتفاوض فيها معظم الوقت، بدل أن تستمع إلى محاضرات عن التفاوض.'
      },
      courses: ['c-negotiating-for-value-creation', 'c-erfolgreich-verhandeln-cas-hsg', 'c-negotiating-and-consensus-building', 'c-negotiation-for-executives', 'c-gesprachsfuhrung-und-verhandlungstechn', 'c-negotiation-and-influence', 'c-strategic-negotiation-influence', 'c-negotiation-master-class']
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
