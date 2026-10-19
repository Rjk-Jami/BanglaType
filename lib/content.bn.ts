// content.bn.ts — BanglaType: সম্পূর্ণ বাংলা কনটেন্ট
// নোট: হিরো সেকশনের typewriter `words` অ্যারে এখানে ইচ্ছাকৃতভাবে বাদ দেওয়া হয়েছে।

export const content = {
  brand: {
    name: 'BanglaType',
    nameBn: 'বাংলা টাইপ',
    tagline: 'যেকোনো টেক্সট ইনপুটে বাংলা লেখার লাইব্রেরি',
    status: 'শীঘ্রই আসছে',
  },

  // ───────────── নেভবার ─────────────
  navbar: {
    links: [
      { label: 'লেখক', href: '#writer' },
      { label: 'নির্দেশিকা', href: '#guide' },
      { label: 'অভিধান', href: '#dictionary' },
      { label: 'লাইব্রেরি', href: '#library' },
      { label: 'প্রশ্নোত্তর', href: '#faq' },
    ],
    github: 'গিটহাব',
    cta: 'আপডেট পেতে চাই',
    themeToggle: { light: 'দিনের মোড', dark: 'রাতের মোড' },
    menuOpen: 'মেনু খুলুন',
    menuClose: 'মেনু বন্ধ করুন',
  },

  // ───────────── হিরো (typewriter বাদে) ─────────────
  hero: {
    badge: 'নতুন · ওপেন সোর্স লাইব্রেরি শীঘ্রই আসছে',
    subtitle:
      'কোনো সফটওয়্যার ইনস্টল ছাড়াই ব্রাউজারে লিখুন বাংলা। অভ্র ফোনেটিক, জাতীয় কিবোর্ড ও ইংরেজি — সবই এক জায়গায়, আর ভবিষ্যতে আপনার যেকোনো ইনপুট ফিল্ডে।',
    primaryCta: 'এখনই লিখে দেখুন',
    secondaryCta: 'লাইব্রেরি সম্পর্কে জানুন',
    highlights: [
      { value: '৩', label: 'কিবোর্ড মোড' },
      { value: '৫০+', label: 'ফোনেটিক নিয়ম' },
      { value: '০', label: 'ইনস্টলেশন লাগে না' },
    ],
  },

  // ───────────── এডিটর ─────────────
  editor: {
    title: 'বাংলা লেখক',
    description: 'নিচের ঘরে লিখুন — প্রতিটি শব্দ লেখার সাথে সাথেই বাংলায় রূপান্তর হবে।',
    placeholder: 'এখানে লেখা শুরু করুন… যেমন: ami banglay gan gai',
    modes: {
      avro: { label: 'অভ্র', sub: 'ফোনেটিক', helper: 'ইংরেজি অক্ষরে লিখুন, বাংলা পান। যেমন: kemon achhen → কেমন আছেন' },
      jatiyo: { label: 'জাতীয়', sub: 'বিজয় লেআউট', helper: 'বাংলা কিবোর্ডের মতো সরাসরি টাইপ করুন। যেমন: d → ি, g → ্' },
      english: { label: 'ইংরেজি', sub: 'EN', helper: 'কোনো রূপান্তর ছাড়াই সাধারণ ইংরেজি টাইপিং।' },
    },
    suggestionBar: {
      ariaLabel: 'শব্দের প্রস্তাবনা',
      hint: 'Tab চাপলে পরের প্রস্তাবনা, Space বা Enter চাপলে নির্বাচন',
      empty: 'কোনো প্রস্তাবনা নেই',
    },
    toolbar: {
      characters: 'অক্ষর',
      words: 'শব্দ',
      lines: 'লাইন',
      copy: 'কপি',
      copied: 'কপি হয়েছে!',
      clear: 'মুছে ফেলুন',
      clearConfirm: 'আপনি কি সব লেখা মুছে ফেলতে চান?',
      convert: 'বাংলায় রূপান্তর',
      keyboard: 'ভার্চুয়াল কিবোর্ড',
    },
  },

  // ───────────── মোডাল: ভার্চুয়াল কিবোর্ড ─────────────
  virtualKeyboard: {
    title: 'ভার্চুয়াল কিবোর্ড',
    description: 'যেকোনো কী ক্লিক বা ট্যাপ করলে অক্ষরটি কার্সরের জায়গায় বসবে।',
    layers: { normal: 'সাধারণ', shift: 'শিফট' },
    close: 'বন্ধ করুন',
  },

  // ───────────── মোডাল: ফোনেটিক নির্দেশিকা ─────────────
  guide: {
    title: 'ফোনেটিক নির্দেশিকা',
    description: 'অভ্র ফোনেটিক কীভাবে কাজ করে — নিয়ম ও উদাহরণসহ।',
    searchPlaceholder: 'নিয়ম খুঁজুন… যেমন: ksh, ng',
    categories: ['স্বরবর্ণ', 'ব্যঞ্জনবর্ণ', 'যুক্তাক্ষর', 'যতিচিহ্ন'],
    card: { trigger: 'টাইপ করুন', result: 'ফলাফল', example: 'উদাহরণ', copyExample: 'উদাহরণ কপি করুন' },
    empty: { title: 'কিছু পাওয়া যায়নি', description: 'অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।' },
  },

  // ───────────── মোডাল: অভিধান ─────────────
  dictionary: {
    title: 'বাংলা–ইংরেজি অভিধান',
    description: 'বাংলা বা ইংরেজি — যেকোনো ভাষায় শব্দ খুঁজুন।',
    searchPlaceholder: 'শব্দ খুঁজুন… যেমন: আকাশ, book',
    partsOfSpeech: { noun: 'বিশেষ্য', verb: 'ক্রিয়া', adjective: 'বিশেষণ', pronoun: 'সর্বনাম' },
    labels: { pronunciation: 'উচ্চারণ', example: 'বাক্যে ব্যবহার', translation: 'ইংরেজি অনুবাদ' },
    empty: { title: 'শব্দটি পাওয়া যায়নি', description: 'বানান যাচাই করুন অথবা অন্য শব্দ চেষ্টা করুন।' },
  },

  // ───────────── ইনপুট শোকেস ─────────────
  inputShowcase: {
    eyebrow: 'যেকোনো ইনপুটে',
    title: 'একটি সাধারণ ইনপুটেও বাংলা',
    description:
      'শুধু একটি হুক যোগ করুন — আপনার ফর্ম, সার্চ বক্স বা চ্যাট ইনপুট সাথে সাথেই বাংলা লিখতে শিখে যাবে।',
    search: { label: 'অনুসন্ধান', placeholder: 'বাংলায় খুঁজুন…' },
    name: { label: 'নাম / শিরোনাম', placeholder: 'আপনার নাম লিখুন…' },
    note: '`useBanglaInput` হুক দ্বারা চালিত',
  },

  // ───────────── লাইব্রেরি (শীঘ্রই আসছে) ─────────────
  library: {
    eyebrow: 'শীঘ্রই আসছে',
    title: 'আপনার অ্যাপে বাংলা টাইপিং, মাত্র কয়েক লাইনে',
    description:
      'BanglaType শুধু একটি ওয়েব অ্যাপ নয় — এটি একটি হালকা, টাইপস্ক্রিপ্ট-ফার্স্ট লাইব্রেরি, যা যেকোনো `<input>`, `<textarea>` বা কাস্টম টেক্সট ফিল্ডে বাংলা লেখার সুবিধা যোগ করে।',
    install: { label: 'ইনস্টল', code: 'npm install banglatype' },
    usage: {
      label: 'ব্যবহার',
      code: `import { useBanglaInput } from 'banglatype';

export function NameField() {
  const { inputProps, suggestions } = useBanglaInput({ mode: 'avro' });
  return <input {...inputProps} placeholder="আপনার নাম" />;
}`,
    },
    features: [
      { icon: 'plug', title: 'যেকোনো ইনপুটে কাজ করে', description: '`input`, `textarea` কিংবা কাস্টম কম্পোনেন্ট — সবখানেই এক হুক।' },
      { icon: 'zap', title: 'হালকা ও দ্রুত', description: 'ছোট বান্ডেল সাইজ, ট্রি-শেকেবল এক্সপোর্ট এবং শূন্য নির্ভরতার লক্ষ্য।' },
      { icon: 'type', title: 'কার্সর-অনুসারী প্রস্তাবনা', description: 'লেখার জায়গার ঠিক পাশেই ভাসমান শব্দ-প্রস্তাবনা, যা স্ক্রিনের প্রান্তে গিয়ে নিজেই দিক বদলায়।' },
      { icon: 'keyboard', title: 'তিনটি কিবোর্ড মোড', description: 'অভ্র ফোনেটিক, জাতীয় লেআউট ও ইংরেজি — এক ক্লিকেই বদল।' },
      { icon: 'accessibility', title: 'সবার জন্য ব্যবহারযোগ্য', description: 'পূর্ণ কিবোর্ড নেভিগেশন, স্ক্রিন-রিডার সাপোর্ট ও টাচ-বান্ধব ডিজাইন।' },
      { icon: 'palette', title: 'নিজের মতো সাজান', description: 'ডিজাইন টোকেন ও Tailwind ক্লাস দিয়ে আপনার ব্র্যান্ডের সাথে মিলিয়ে নিন।' },
    ],
    exports: [
      { name: 'banglatype', description: 'মূল এন্ট্রি পয়েন্ট' },
      { name: 'banglatype/ui', description: 'বাটন, ইনপুট, ব্যাজ, কার্ড ও মোডাল' },
      { name: 'banglatype/hooks', description: '`useBanglaInput` ও সহায়ক হুক' },
      { name: 'banglatype/lib', description: 'টাইপিং ইঞ্জিন ও ইউটিলিটি' },
    ],
    cta: { primary: 'গিটহাবে স্টার দিন', secondary: 'লঞ্চের খবর পান' },
  },

  // ───────────── রোডম্যাপ ─────────────
  roadmap: {
    title: 'আমরা কোথায় যাচ্ছি',
    items: [
      { status: 'done', title: 'ওয়েব অ্যাপ', description: 'লেখক, গাইড, অভিধান ও ভার্চুয়াল কিবোর্ড।' },
      { status: 'progress', title: 'কোর লাইব্রেরি', description: '`useBanglaInput` হুক ও টাইপিং ইঞ্জিন প্যাকেজ।' },
      { status: 'next', title: 'রিচ এডিটর সাপোর্ট', description: 'Tiptap, Slate ও contenteditable ইন্টিগ্রেশন।' },
      { status: 'next', title: 'ভ্যানিলা JS ও অন্যান্য ফ্রেমওয়ার্ক', description: 'Vue, Svelte ও প্লেইন JavaScript অ্যাডাপ্টার।' },
    ],
    statusLabels: { done: 'সম্পন্ন', progress: 'চলছে', next: 'আসছে' },
  },

  // ───────────── অ্যাক্সেসিবিলিটি ও শর্টকাট ─────────────
  shortcuts: {
    title: 'কিবোর্ড শর্টকাট',
    description: 'মাউস ছাড়াই দ্রুত লিখুন।',
    items: [
      { keys: ['Tab'], action: 'পরের প্রস্তাবনায় যান' },
      { keys: ['Shift', 'Tab'], action: 'আগের প্রস্তাবনায় ফিরুন' },
      { keys: ['Enter'], action: 'নির্বাচিত প্রস্তাবনা বসান' },
      { keys: ['Space'], action: 'প্রস্তাবনা বসিয়ে স্পেস দিন' },
      { keys: ['Esc'], action: 'প্রস্তাবনা বন্ধ করুন' },
      { keys: ['↓', '→'], action: 'পরের প্রস্তাবনা' },
      { keys: ['↑', '←'], action: 'আগের প্রস্তাবনা' },
      { keys: ['Ctrl', 'A'], action: 'সব লেখা নির্বাচন করুন' },
    ],
  },

  // ───────────── প্রশ্নোত্তর ─────────────
  faq: {
    title: 'সচরাচর জিজ্ঞাসা',
    items: [
      { q: 'BanglaType কি বিনামূল্যে?', a: 'হ্যাঁ। ওয়েব অ্যাপ ব্যবহার সম্পূর্ণ বিনামূল্যে, এবং লাইব্রেরিটি ওপেন সোর্স হিসেবে প্রকাশের পরিকল্পনা রয়েছে।' },
      { q: 'কিছু ইনস্টল করতে হবে কি?', a: 'না। সবকিছু সরাসরি ব্রাউজারে চলে, কোনো সফটওয়্যার বা এক্সটেনশন লাগে না।' },
      { q: 'লাইব্রেরি কখন পাওয়া যাবে?', a: 'কোর প্যাকেজ নিয়ে কাজ চলছে। গিটহাবে স্টার দিয়ে রাখুন, প্রকাশ হলেই জানতে পারবেন।' },
      { q: 'কোন কোন ফ্রেমওয়ার্কে চলবে?', a: 'প্রথমে React ও Next.js, পরে Vue, Svelte ও ভ্যানিলা JavaScript-এ সাপোর্ট আসবে।' },
      { q: 'মোবাইলে কি কাজ করে?', a: 'হ্যাঁ। প্রস্তাবনা বারে ট্যাপ সাপোর্ট আছে এবং পুরো ইন্টারফেস রেসপনসিভ।' },
    ],
  },

  // ───────────── ফুটার ─────────────
  footer: {
    description: 'বাংলা ভাষাকে প্রতিটি ডিজিটাল ইনপুটে সহজলভ্য করার একটি ছোট্ট প্রয়াস।',
    columns: [
      { title: 'প্রোডাক্ট', links: ['লেখক', 'নির্দেশিকা', 'অভিধান', 'ভার্চুয়াল কিবোর্ড'] },
      { title: 'লাইব্রেরি', links: ['শুরু করুন', 'ডকুমেন্টেশন', 'রোডম্যাপ', 'গিটহাব'] },
      { title: 'মোড', links: ['অভ্র ফোনেটিক', 'জাতীয় কিবোর্ড', 'ইংরেজি'] },
    ],
    copyright: '© ২০২৬ BanglaType। ভালোবাসা দিয়ে তৈরি।',
  },
} as const;

// ───────────── মডার্ন UI ডিজাইন টোকেন (Tailwind-এ ব্যবহারের জন্য) ─────────────
export const designTokens = {
  font: { heading: 'var(--font-heading)', body: 'var(--font-body)' },
  radius: { card: '1.25rem', pill: '9999px', input: '0.875rem' },
  glass: 'bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl shadow-emerald-500/5',
  gradient: {
    hero: 'bg-gradient-to-b from-emerald-50 via-white to-transparent dark:from-emerald-950/30 dark:via-transparent',
    accent: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    text: 'bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent',
  },
  motion: { base: 'transition-all duration-200 ease-out', lift: 'hover:-translate-y-0.5 hover:shadow-lg' },
} as const;

export type Content = typeof content;
