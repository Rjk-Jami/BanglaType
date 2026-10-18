import {
  SORTED_PATTERNS,
  type PatternEntry,
  type PatternRule,
  type MatchCondition,
} from './avro-patterns';

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

function isVowel(ch: string): boolean {
  return VOWELS.has(ch);
}

function isConsonant(ch: string): boolean {
  return /^[a-zA-Z]$/.test(ch) && !VOWELS.has(ch);
}

function isPunctuation(ch: string): boolean {
  return ch === '' || !/^[a-zA-Z]$/.test(ch);
}

const CHAR_FALLBACK: Record<string, string> = {
  a: 'আ', b: 'ব', c: 'চ', d: 'দ', e: 'এ', f: 'ফ', g: 'গ', h: 'হ',
  i: 'ই', j: 'জ', k: 'ক', l: 'ল', m: 'ম', n: 'ন', o: 'অ', p: 'প',
  q: 'ক', r: 'র', s: 'স', t: 'ত', u: 'উ', v: 'ভ', w: 'ও', x: 'ক্স',
  y: 'য়', z: 'য',
  A: 'আ', B: 'ভ', C: 'ছ', D: 'ড', E: 'এ', F: 'ফ', G: 'ঘ', H: 'হ',
  I: 'ঈ', J: 'ঝ', K: 'খ', L: 'ল', M: 'ম', N: 'ণ', O: 'ও', P: 'প',
  Q: 'ক', R: 'ড়', S: 'ষ', T: 'ট', U: 'ঊ', V: 'ভ', W: 'ও', X: 'ক্স',
  Y: 'য়', Z: 'য',
};

// ─── Condition evaluator ──────────────────────────────────────────

function evaluateCondition(
  cond: MatchCondition,
  input: string,
  matchStart: number,
  matchEnd: number
): boolean {
  let result: boolean;

  if (cond.type === 'prefix') {
    const prevChar = matchStart > 0 ? input[matchStart - 1] : '';
    switch (cond.scope) {
      case 'vowel':
        result = isVowel(prevChar);
        break;
      case 'consonant':
        result = isConsonant(prevChar);
        break;
      case 'punctuation':
        result = isPunctuation(prevChar);
        break;
      case 'exact':
        if (cond.value) {
          const startIdx = matchStart - cond.value.length;
          result =
            startIdx >= 0 &&
            input.substring(startIdx, matchStart) === cond.value;
        } else {
          result = matchStart === 0;
        }
        break;
      default:
        result = false;
    }
  } else {
    // suffix
    const nextChar = matchEnd < input.length ? input[matchEnd] : '';
    switch (cond.scope) {
      case 'vowel':
        result = isVowel(nextChar);
        break;
      case 'consonant':
        result = isConsonant(nextChar);
        break;
      case 'punctuation':
        result = isPunctuation(nextChar);
        break;
      case 'exact':
        if (cond.value) {
          result =
            matchEnd + cond.value.length <= input.length &&
            input.substring(matchEnd, matchEnd + cond.value.length) ===
              cond.value;
        } else {
          result = matchEnd === input.length;
        }
        break;
      default:
        result = false;
    }
  }

  return cond.negative ? !result : result;
}

function evaluateRule(
  rule: PatternRule,
  input: string,
  matchStart: number,
  matchEnd: number
): boolean {
  return rule.matches.every((cond) =>
    evaluateCondition(cond, input, matchStart, matchEnd)
  );
}

export function phoneticParse(input: string): string {
  if (!input) return '';

  let output = '';
  let cursor = 0;

  while (cursor < input.length) {
    let matched = false;

    for (const pattern of SORTED_PATTERNS) {
      const { find } = pattern;
      if (cursor + find.length > input.length) continue;

      const slice = input.substring(cursor, cursor + find.length);
      if (slice !== find) continue;

      const matchEnd = cursor + find.length;
      let replacement = pattern.replace;

      if (pattern.rules) {
        for (const rule of pattern.rules) {
          if (evaluateRule(rule, input, cursor, matchEnd)) {
            replacement = rule.replace;
            break;
          }
        }
      }

      output += replacement;
      cursor = matchEnd;
      matched = true;
      break;
    }

    if (!matched) {
      const ch = input[cursor];
      if (/^[a-zA-Z]$/.test(ch)) {
        output += CHAR_FALLBACK[ch] || '';
      } else {
        output += ch;
      }
      cursor++;
    }
  }

  return output;
}

export type BanglishDictionary = Readonly<Record<string, string>>;

export const BUILTIN_DICTIONARY: BanglishDictionary = Object.freeze({
  // Very common words where phonetic != canonical spelling
  ami: 'আমি',
  amra: 'আমরা',
  amader: 'আমাদের',
  amar: 'আমার',
  apni: 'আপনি',
  apnar: 'আপনার',
  apnara: 'আপনারা',
  tumi: 'তুমি',
  tomar: 'তোমার',
  tomra: 'তোমরা',
  tomader: 'তোমাদের',
  se: 'সে',
  tar: 'তার',
  tara: 'তারা',
  tader: 'তাদের',
  ini: 'ইনি',
  uni: 'উনি',
  ora: 'ওরা',
  oder: 'ওদের',
  
  // Essential verbs
  ache: 'আছে',
  achen: 'আছেন',
  achi: 'আছি',
  acho: 'আছো',
  chilo: 'ছিল',
  chilen: 'ছিলেন',
  chilam: 'ছিলাম',
  chile: 'ছিলে',
  hobe: 'হবে',
  hoben: 'হবেন',
  hoy: 'হয়',
  hoye: 'হয়ে',
  hoyeche: 'হয়েছে',
  kore: 'করে',
  kori: 'করি',
  korche: 'করছে',
  korbo: 'করবো',
  korte: 'করতে',
  korle: 'করলে',
  korben: 'করবেন',
  koreche: 'করেছে',
  korechilam: 'করেছিলাম',
  bole: 'বলে',
  boli: 'বলি',
  bolche: 'বলছে',
  bolbo: 'বলবো',
  bolte: 'বলতে',
  bolle: 'বললে',
  bollen: 'বললেন',
  jani: 'জানি',
  jane: 'জানে',
  jano: 'জানো',
  jante: 'জানতে',
  jai: 'যাই',
  jay: 'যায়',
  jabe: 'যাবে',
  jabo: 'যাবো',
  jete: 'যেতে',
  gelo: 'গেল',
  gelen: 'গেলেন',
  geche: 'গেছে',
  gelam: 'গেলাম',
  ashe: 'আসে',
  ashi: 'আসি',
  ashbe: 'আসবে',
  ashbo: 'আসবো',
  ashte: 'আসতে',
  eshe: 'এসে',
  eseche: 'এসেছে',
  dekhte: 'দেখতে',
  dekhe: 'দেখে',
  dekhi: 'দেখি',
  dekhbo: 'দেখবো',
  dekhbe: 'দেখবে',
  dekheche: 'দেখেছে',
  dite: 'দিতে',
  diye: 'দিয়ে',
  diyeche: 'দিয়েছে',
  dibo: 'দিবো',
  debe: 'দেবে',
  nite: 'নিতে',
  niye: 'নিয়ে',
  niyeche: 'নিয়েছে',
  nebo: 'নেবো',
  nebe: 'নেবে',
  pete: 'পেতে',
  peye: 'পেয়ে',
  peyeche: 'পেয়েছে',
  pabo: 'পাবো',
  pabe: 'পাবে',
  khabe: 'খাবে',
  khabo: 'খাবো',
  khete: 'খেতে',
  kheye: 'খেয়ে',
  likhte: 'লিখতে',
  likhe: 'লিখে',
  likhbo: 'লিখবো',
  likhbe: 'লিখবে',
  likhchi: 'লিখছি',
  likhche: 'লিখছে',
  likhi: 'লিখি',
  porche: 'পড়ছে',
  porbo: 'পড়বো',
  porbe: 'পড়বে',
  shune: 'শুনে',
  shuni: 'শুনি',
  
  // Common nouns
  manush: 'মানুষ',
  lok: 'লোক',
  chele: 'ছেলে',
  meye: 'মেয়ে',
  baba: 'বাবা',
  ma: 'মা',
  bhai: 'ভাই',
  bon: 'বোন',
  bondhu: 'বন্ধু',
  desh: 'দেশ',
  deshe: 'দেশে',
  desher: 'দেশের',
  shomoy: 'সময়',
  din: 'দিন',
  raat: 'রাত',
  bari: 'বাড়ি',
  ghor: 'ঘর',
  ghore: 'ঘরে',
  rastay: 'রাস্তায়',
  rasta: 'রাস্তা',
  pani: 'পানি',
  khabar: 'খাবার',
  bhat: 'ভাত',
  mach: 'মাছ',
  gach: 'গাছ',
  phul: 'ফুল',
  pakhi: 'পাখি',
  boi: 'বই',
  chobi: 'ছবি',
  golpo: 'গল্প',
  gaan: 'গান',
  kotha: 'কথা',
  kothay: 'কোথায়',
  keno: 'কেন',
  kobe: 'কবে',
  koto: 'কত',
  kichu: 'কিছু',
  sob: 'সব',
  shob: 'সব',
  shokal: 'সকাল',
  bikal: 'বিকাল',
  shondha: 'সন্ধ্যা',
  
  // Common adjectives  
  bhalo: 'ভালো',
  kharap: 'খারাপ',
  sundor: 'সুন্দর',
  boro: 'বড়',
  choto: 'ছোট',
  notun: 'নতুন',
  purano: 'পুরানো',
  
  // Common adverbs & particles
  khhub: 'খুব',
  khub: 'খুব',
  onek: 'অনেক',
  ar: 'আর',
  ebong: 'এবং',
  ba: 'বা',
  kintu: 'কিন্তু',
  tobe: 'তবে',
  jodi: 'যদি',
  tahole: 'তাহলে',
  karon: 'কারণ',
  jekhane: 'যেখানে',
  sekhane: 'সেখানে',
  jokhon: 'যখন',
  tokhon: 'তখন',
  akhon: 'এখন',
  ekhane: 'এখানে',
  okhane: 'ওখানে',
  shudhu: 'শুধু',
  majhe: 'মাঝে',
  por: 'পর',
  pore: 'পরে',
  age: 'আগে',
  theke: 'থেকে',
  jonno: 'জন্য',
  shathe: 'সাথে',
  
  // Locations
  bangladesh: 'বাংলাদেশ',
  bangla: 'বাংলা',
  banglay: 'বাংলায়',
  banglar: 'বাংলার',
  dhaka: 'ঢাকা',
  
  // Numbers
  ek: 'এক',
  dui: 'দুই',
  tin: 'তিন',
  char: 'চার',
  pach: 'পাঁচ',
  choy: 'ছয়',
  shat: 'সাত',
  aat: 'আট',
  noy: 'নয়',
  dosh: 'দশ',

  // Common English loanwords, academic & technical terms (canonical transliteration)
  the: 'দ্য',
  old: 'ওল্ড',
  new: 'নিউ',
  great: 'গ্রেট',
  time: 'টাইম',
  university: 'ইউনিভার্সিটি',
  professor: 'প্রফেসর',
  carefully: 'কেয়ারফুলি',
  careful: 'কেয়ারফুল',
  explained: 'এক্সপ্লেইন্ড',
  explain: 'এক্সপ্লেইন',
  complicated: 'কমপ্লিকেটেড',
  socio: 'সোশিও',
  economic: 'ইকোনমিক',
  economy: 'ইকোনমি',
  situation: 'সিচুয়েশন',
  of: 'অব',
  country: 'কান্ট্রি',
  during: 'ডিউরিং',
  autumn: 'অটম',
  spring: 'স্প্রিং',
  summer: 'সামার',
  winter: 'উইন্টার',
  seminar: 'সেমিনার',
  lecture: 'লেকচার',
  lecturer: 'লেকচারার',
  conscientious: 'কনসায়েনশাস',
  administrators: 'অ্যাডমিনিস্ট্রেটরস',
  administrator: 'অ্যাডমিনিস্ট্রেটর',
  administration: 'অ্যাডমিনিস্ট্রেশন',
  instructed: 'ইনস্ট্রাক্টেড',
  instruct: 'ইনস্ট্রাক্ট',
  extraordinary: 'এক্সট্রাঅর্ডিনারি',
  infrastructure: 'ইনফ্রাস্ট্রাকচার',
  construction: 'কনস্ট্রাকশন',
  across: 'অ্যাক্রস',
  metropolitan: 'মেট্রোপলিটন',
  district: 'ডিস্ট্রিক্ট',
  rabindranath: 'রবীন্দ্রনাথ',
  tagore: 'ঠাকুর',
  tegore: 'টেগোর',
  kazi: 'কাজী',
  nazrul: 'নজরুল',
  islam: 'ইসলাম',
  wrote: 'রোট',
  magnificent: 'ম্যাগনিফিসেন্ট',
  literature: 'লিটারেচার',
  that: 'দ্যাট',
  profoundly: 'প্রোফাউন্ডলি',
  influences: 'ইনফ্লুয়েন্সেস',
  influence: 'ইনফ্লুয়েন্স',
  bengali: 'বাঙালি',
  culture: 'কালচার',
  in: 'ইন',
  west: 'ওয়েস্ট',
  bengal: 'বেঙ্গল',
  telecommunication: 'টেলিকমিউনিকেশন',
  communication: 'কমিউনিকেশন',
  artificial: 'আর্টিফিশিয়াল',
  intelligence: 'ইন্টেলিজেন্স',
  algorithms: 'অ্যালগরিদমস',
  algorithm: 'অ্যালগরিদম',
  are: 'আর',
  is: 'ইজ',
  to: 'টু',
  for: 'ফর',
  with: 'উইথ',
  without: 'উইদাউট',
  on: 'অন',
  at: 'অ্যাট',
  by: 'বাই',
  from: 'ফ্রম',
  and: 'অ্যান্ড',
  revolutionizing: 'রেভল্যুশনাইজিং',
  revolution: 'রেভল্যুশন',
  modern: 'মডার্ন',
  technological: 'টেকনোলজিক্যাল',
  advancement: 'অ্যাডভান্সমেন্ট',
  advance: 'অ্যাডভান্স',
  globally: 'গ্লোবালি',
  global: 'গ্লোবাল',
  computer: 'কম্পিউটার',
  computers: 'কম্পিউটারস',
  engineer: 'ইঞ্জিনিয়ার',
  engineers: 'ইঞ্জিনিয়ার্স',
  engineering: 'ইঞ্জিনিয়ারিং',
  software: 'সফটওয়্যার',
  hardware: 'হার্ডওয়্যার',
  internet: 'ইন্টারনেট',
  mobile: 'মোবাইল',
  phone: 'ফোন',
  technology: 'টেকনোলজি',
  science: 'সায়েন্স',
  scientific: 'সায়েন্টিফিক',
  system: 'সিস্টেম',
  systems: 'সিস্টেমস',
  network: 'নেটওয়ার্ক',
  digital: 'ডিজিটাল',
  data: 'ডেটা',
  database: 'ডেটাবেস',
  developer: 'ডেভেলপার',
  development: 'ডেভেলপমেন্ট',
  programming: 'প্রোগ্রামিং',
  program: 'প্রোগ্রাম',
  project: 'প্রজেক্ট',
  projects: 'প্রজেক্টস',
  website: 'ওয়েবসাইট',
  web: 'ওয়েব',
  app: 'অ্যাপ',
  apps: 'অ্যাপস',
  application: 'অ্যাপ্লিকেশন',
  online: 'অনলাইন',
  offline: 'অফলাইন',
  google: 'গুগল',
  facebook: 'ফেসবুক',
  youtube: 'ইউটিউব',
  bank: 'ব্যাংক',
  office: 'অফিস',
  officer: 'অফিসার',
  school: 'স্কুল',
  college: 'কলেজ',
  hospital: 'হাসপাতাল',
  doctor: 'ডাক্তার',
  doctors: 'ডাক্তাররা',
  patient: 'পেশেন্ট',
  medicine: 'মেডিসিন',
  student: 'স্টুডেন্ট',
  students: 'স্টুডেন্টস',
  teacher: 'টিচার',
  teachers: 'টিচার্স',
  police: 'পুলিশ',
  government: 'সরকার',
  business: 'বিজনেস',
  company: 'কোম্পানি',
  manager: 'ম্যানেজার',
  management: 'ম্যানেজমেন্ট',
  report: 'রিপোর্ট',
  market: 'মার্কেট',
  center: 'সেন্টার',
  centre: 'সেন্টার',
  service: 'সার্ভিস',
  policy: 'পলিসি',
  department: 'ডিপার্টমেন্ট',
  campus: 'ক্যাম্পাস',
  library: 'লাইব্রেরি',
  education: 'এডুকেশন',
  academy: 'একাডেমি',
  academic: 'অ্যাকাডেমিক',
  institute: 'ইনস্টিটিউট',
  institution: 'ইনস্টিটিউশন',
});

// ─── Public API ───────────────────────────────────────────────────

export interface ParseOptions {
  banglaDigits?: boolean;     // default: true
  banglaFullStop?: boolean;   // default: true
  dictionary?: boolean | BanglishDictionary; // default: true (uses BUILTIN_DICTIONARY)
}

export interface ParseResult {
  bangla: string;
  english: string;
}

export function parse(input: string, options?: ParseOptions): ParseResult {
  if (!input) return { bangla: '', english: input };

  const opts = {
    banglaDigits: options?.banglaDigits ?? true,
    banglaFullStop: options?.banglaFullStop ?? true,
    dictionary: options?.dictionary ?? true,
  };

  // Determine the dictionary to use
  let dict: BanglishDictionary | null = null;
  if (opts.dictionary === true) {
    dict = BUILTIN_DICTIONARY;
  } else if (opts.dictionary && typeof opts.dictionary === 'object') {
    dict = opts.dictionary;
  }

  // Tokenize: split into letter-runs and non-letter-runs
  const tokens = input.split(/([a-zA-Z]+)/);
  let bangla = '';

  for (const token of tokens) {
    if (!token) continue;

    // Check if this token is all ASCII letters
    if (/^[a-zA-Z]+$/.test(token)) {
      // Dictionary lookup first (case-insensitive)
      const lower = token.toLowerCase();
      if (dict && Object.hasOwn(dict, lower)) {
        bangla += dict[lower];
      } else {
        // Phonetic engine
        bangla += phoneticParse(token);
      }
    } else {
      // Non-letter run — handle digit conversion and full stop
      let processed = token;
      
      if (opts.banglaDigits) {
        processed = processed.replace(/[0-9]/g, (d) => {
          const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
          return banglaDigits[parseInt(d)];
        });
      }
      
      if (opts.banglaFullStop) {
        // Replace period followed by space/end-of-string with daari
        processed = processed.replace(/\.(?=\s|$)/g, '।');
      }
      
      bangla += processed;
    }
  }

  return { bangla, english: input };
}

/**
 * Convenience wrapper that returns only the Bangla string.
 */
export function toBangla(input: string, options?: ParseOptions): string {
  return parse(input, options).bangla;
}

/**
 * Returns true if the string contains at least one Bangla character.
 */
export function isBangla(text: string): boolean {
  return /[\u0980-\u09FF]/.test(text);
}
