import {
  SORTED_PATTERNS,
  AVRO_VOWELS,
  AVRO_CONSONANTS,
  AVRO_CASESENSITIVE,
  type PatternRule,
  type Scope,
} from './avro-patterns';

export function fixString(input: string): string {
  let fixed = '';
  for (let i = 0; i < input.length; ++i) {
    const c = input.charAt(i);
    if (AVRO_CASESENSITIVE.indexOf(c.toLowerCase()) >= 0) {
      fixed += c;
    } else {
      fixed += c.toLowerCase();
    }
  }
  return fixed;
}

export function isVowel(c: string): boolean {
  if (!c) return false;
  return AVRO_VOWELS.indexOf(c.toLowerCase()) >= 0;
}

export function isConsonant(c: string): boolean {
  if (!c) return false;
  return AVRO_CONSONANTS.indexOf(c.toLowerCase()) >= 0;
}

export function isPunctuation(c: string): boolean {
  return !(isVowel(c) || isConsonant(c));
}

export function isExact(
  needle: string,
  haystack: string,
  start: number,
  end: number,
  not?: boolean
): boolean {
  const matched =
    start >= 0 &&
    end <= haystack.length &&
    haystack.substring(start, end) === needle;
  return not ? !matched : matched;
}

function evaluateRule(
  rule: PatternRule,
  fixed: string,
  start: number,
  end: number,
  prev: number
): boolean {
  for (let k = 0; k < rule.matches.length; ++k) {
    const match = rule.matches[k];
    const chk = match.type === 'suffix' ? end : prev;
    const isNegative = match.negative ?? (match.scope.charAt(0) === '!');
    const scope = (
      match.scope.charAt(0) === '!'
        ? match.scope.substring(1)
        : match.scope
    ) as Scope;
    const value = match.value ?? '';

    if (scope === 'punctuation') {
      const isPunc =
        (chk < 0 && match.type === 'prefix') ||
        (chk >= fixed.length && match.type === 'suffix') ||
        isPunctuation(fixed.charAt(chk));
      if (!(isPunc !== isNegative)) {
        return false;
      }
    } else if (scope === 'vowel') {
      const isVow =
        ((chk >= 0 && match.type === 'prefix') ||
          (chk < fixed.length && match.type === 'suffix')) &&
        isVowel(fixed.charAt(chk));
      if (!(isVow !== isNegative)) {
        return false;
      }
    } else if (scope === 'consonant') {
      const isCon =
        ((chk >= 0 && match.type === 'prefix') ||
          (chk < fixed.length && match.type === 'suffix')) &&
        isConsonant(fixed.charAt(chk));
      if (!(isCon !== isNegative)) {
        return false;
      }
    } else if (scope === 'exact') {
      let s: number;
      let e: number;
      if (match.type === 'suffix') {
        s = end;
        e = end + value.length;
      } else {
        s = start - value.length;
        e = start;
      }
      if (!isExact(value, fixed, s, e, isNegative)) {
        return false;
      }
    }
  }
  return true;
}

export function phoneticParse(input: string): string {
  if (!input) return '';
  const fixed = fixString(input);
  let output = '';

  for (let cur = 0; cur < fixed.length; ++cur) {
    const start = cur;
    let end = cur + 1;
    let prev = start - 1;
    let matched = false;

    for (let i = 0; i < SORTED_PATTERNS.length; ++i) {
      const pattern = SORTED_PATTERNS[i];
      end = cur + pattern.find.length;

      if (end <= fixed.length && fixed.substring(start, end) === pattern.find) {
        prev = start - 1;
        if (pattern.rules && pattern.rules.length > 0) {
          let ruleMatched = false;
          for (let j = 0; j < pattern.rules.length; ++j) {
            const rule = pattern.rules[j];
            if (evaluateRule(rule, fixed, start, end, prev)) {
              output += rule.replace;
              cur = end - 1;
              matched = true;
              ruleMatched = true;
              break;
            }
          }
          if (ruleMatched) break;
        }

        output += pattern.replace;
        cur = end - 1;
        matched = true;
        break;
      }
    }

    if (!matched) {
      output += fixed.charAt(cur);
    }
  }

  return output;
}

export type BanglishDictionary = Readonly<Record<string, string>>;

export const BUILTIN_DICTIONARY: BanglishDictionary = Object.freeze({
  "ami": "আমি",
  "amra": "আমরা",
  "amader": "আমাদের",
  "amaderke": "আমাদেরকে",
  "amar": "আমার",
  "amake": "আমাকে",
  "apni": "আপনি",
  "apnar": "আপনার",
  "apnara": "আপনারা",
  "apnader": "আপনাদের",
  "apnake": "আপনাকে",
  "tumi": "তুমি",
  "tomar": "তোমার",
  "tomra": "তোমরা",
  "tomader": "তোমাদের",
  "tomake": "তোমাকে",
  "tui": "তুই",
  "tor": "তোর",
  "tora": "তোরা",
  "toder": "তোদের",
  "toke": "তোকে",
  "se": "সে",
  "tar": "তার",
  "tara": "তারা",
  "tader": "তাদের",
  "take": "তাকে",
  "tini": "তিনি",
  "tahar": "তাহার",
  "tahader": "তাহাদের",
  "tahake": "তাহাকে",
  "ini": "ইনি",
  "uni": "উনি",
  "ora": "ওরা",
  "oder": "ওদের",
  "oke": "ওকে",
  "era": "এরা",
  "eder": "এদের",
  "eke": "একে",
  "e": "এ",
  "o": "ও",
  "ke": "কে",
  "kara": "কারা",
  "kader": "কাদের",
  "kake": "কাকে",
  "shobai": "সবাই",
  "shobaik": "সবাইকে",
  "shobaike": "সবাইকে",
  "sobাই": "সবাই",
  "sob": "সব",
  "shob": "সব",
  "shokol": "সকল",
  "shokole": "সকলে",
  "shokolke": "সকলকে",
  "onno": "অন্য",
  "onnyo": "অন্য",
  "onnora": "অন্যরা",
  "onnoder": "অন্যদের",
  "keu": "কেউ",
  "kichu": "কিছু",
  "kise": "কিসে",
  "kisher": "কিসের",
  "ki": "কী",
  "kie": "কি",
  "keno": "কেন",
  "kobe": "কবে",
  "kothay": "কোথায়",
  "kothao": "কোথাও",
  "koto": "কত",
  "kototuku": "কতটুকু",
  "kokhon": "কখন",
  "kokhono": "কখনো",
  "kemon": "কেমন",
  "kemone": "কেমনে",
  "kon": "কোন",
  "kono": "কোনো",
  "konTi": "কোনটি",
  "konti": "কোনটি",
  "jemon": "যেমন",
  "jemone": "যেমনে",
  "jototuku": "যতটুকু",
  "joto": "যত",
  "jokhon": "যখন",
  "jokhor": "যখন",
  "jethay": "যেথায়",
  "jetha": "যেথা",
  "jekhane": "যেখানে",
  "jekhano": "যেখানে",
  "je": "যে",
  "jara": "যারা",
  "jader": "যাদের",
  "jake": "যাকে",
  "jar": "যার",
  "jami": "জামি",
  "jamir": "জামির",
  "jomi": "জমি",
  "jomir": "জমির",
  "tokhon": "তখন",
  "tokhoni": "তখনই",
  "tothay": "তথায়",
  "toto": "তত",
  "sekhane": "সেখানে",
  "shekhane": "সেখানে",
  "ekhane": "এখানে",
  "okhane": "ওখানে",
  "akhon": "এখন",
  "ekhon": "এখন",
  "ekhoni": "এখনই",
  "ache": "আছে",
  "achen": "আছেন",
  "achi": "আছি",
  "acho": "আছো",
  "achhe": "আছে",
  "achhen": "আছেন",
  "achhi": "আছি",
  "achho": "আছো",
  "thake": "থাকে",
  "thaken": "থাকেন",
  "thaki": "থাকি",
  "thako": "থাকো",
  "thakbo": "থাকবো",
  "thakbe": "থাকবে",
  "thakte": "থাকতে",
  "thakle": "থাকলে",
  "thakun": "থাকুন",
  "thakuk": "থাকুক",
  "thaka": "থাকা",
  "theke": "থেকে",
  "chilo": "ছিল",
  "chilen": "ছিলেন",
  "chilam": "ছিলাম",
  "chile": "ছিলে",
  "hobe": "হবে",
  "hoben": "হবেন",
  "hobo": "হবো",
  "hoba": "হবা",
  "hoy": "হয়",
  "hoye": "হয়ে",
  "hoyeche": "হয়েছে",
  "hocche": "হচ্ছে",
  "hoto": "হতো",
  "holen": "হলেন",
  "holam": "হলাম",
  "hole": "হলে",
  "hou": "হও",
  "houn": "হউন",
  "hobar": "হবার",
  "howar": "হওয়ার",
  "kore": "করে",
  "kori": "করি",
  "korche": "করছে",
  "korchi": "করছি",
  "korcho": "করছো",
  "korchhen": "করছেন",
  "korbo": "করবো",
  "korte": "করতে",
  "korle": "করলে",
  "korben": "করবেন",
  "koro": "করো",
  "koren": "করেন",
  "koreche": "করেছে",
  "korechen": "করেছেন",
  "korechilam": "করেছিলাম",
  "korechile": "করেছিলে",
  "korun": "করুন",
  "koruk": "করুক",
  "kora": "করা",
  "bole": "বলে",
  "boli": "বলি",
  "bolche": "বলছে",
  "bolchi": "বলছি",
  "bolcho": "বলছো",
  "bolbo": "বলবো",
  "bolte": "বলতে",
  "bolle": "বললে",
  "bollen": "বললেন",
  "bolo": "বলো",
  "bolen": "বলেন",
  "boleche": "বলেছে",
  "bolechen": "বলেছেন",
  "bolechilam": "বলেছিলাম",
  "bolun": "বলুন",
  "bola": "বলা",
  "jani": "জানি",
  "jane": "জানে",
  "jano": "জানো",
  "janen": "জানেন",
  "jante": "জানতে",
  "janle": "জানলে",
  "janbo": "জানবো",
  "janbe": "জানবে",
  "janun": "জানুন",
  "janan": "জানান",
  "jana": "জানা",
  "jai": "যাই",
  "jay": "যায়",
  "jabe": "যাবে",
  "jabo": "যাবো",
  "jete": "যেতে",
  "jele": "গেলে",
  "jan": "যান",
  "jao": "যাও",
  "gelo": "গেল",
  "gelen": "গেলেন",
  "geche": "গেছে",
  "gechen": "গেছেন",
  "gelam": "গেলাম",
  "gecho": "গেছো",
  "giye": "গিয়ে",
  "jaoa": "যাওয়া",
  "jawa": "যাওয়া",
  "ashe": "আসে",
  "ashi": "আসি",
  "ashbe": "আসবে",
  "ashbo": "আসবো",
  "ashte": "আসতে",
  "ashle": "আসলে",
  "asho": "আসো",
  "ashen": "আসেন",
  "ashun": "আসুন",
  "eshe": "এসে",
  "eseche": "এসেছে",
  "esheche": "এসেছে",
  "ashche": "আসছে",
  "asha": "আসা",
  "dekhte": "দেখতে",
  "dekhe": "দেখে",
  "dekhi": "দেখি",
  "dekhbo": "দেখবো",
  "dekhbe": "দেখবে",
  "dekheche": "দেখেছে",
  "dekhechen": "দেখেছেন",
  "dekho": "দেখো",
  "dekhen": "দেখেন",
  "dekhun": "দেখুন",
  "dekhlam": "দেখলাম",
  "dekha": "দেখা",
  "dekhache": "দেখাচ্ছে",
  "dite": "দিতে",
  "diye": "দিয়ে",
  "diyeche": "দিয়েছে",
  "diyechen": "দিয়েছেন",
  "dibo": "দিবো",
  "dibe": "দেবে",
  "debe": "দেবে",
  "dei": "দেই",
  "dao": "দাও",
  "din": "দিন",
  "dilen": "দিলেন",
  "dilam": "দিলাম",
  "dile": "দিলে",
  "dewa": "দেওয়া",
  "nite": "নিতে",
  "niye": "নিয়ে",
  "niyeche": "নিয়েছে",
  "niyechen": "নিয়েছেন",
  "nebo": "নেবো",
  "nebe": "নেবে",
  "nei": "নেই",
  "nao": "নাও",
  "nin": "নিন",
  "nilen": "নিলেন",
  "nilam": "নিলাম",
  "nile": "নিলে",
  "neya": "নেওয়া",
  "pete": "পেতে",
  "peye": "পেয়ে",
  "peyeche": "পেয়েছে",
  "peyechen": "পেয়েছেন",
  "pabo": "পাবো",
  "pabe": "পাবে",
  "pai": "পাই",
  "pao": "পাও",
  "pan": "পান",
  "pelam": "পেলাম",
  "pelen": "পেলেন",
  "pele": "পেলে",
  "khabe": "খাবে",
  "khabo": "খাবো",
  "khete": "খেতে",
  "kheye": "খেয়ে",
  "kheyeche": "খেয়েছে",
  "khai": "খাই",
  "khao": "খাও",
  "khan": "খান",
  "khelo": "খেল",
  "khelam": "খেলাম",
  "likhte": "লিখতে",
  "likhe": "লিখে",
  "likhbo": "লিখবো",
  "likhbe": "লিখবে",
  "likhchi": "লিখছি",
  "likhche": "লিখছে",
  "likhi": "লিখি",
  "likho": "লিখো",
  "likhun": "লিখুন",
  "likha": "লেখা",
  "lekha": "লেখা",
  "porte": "পড়তে",
  "pore": "পরে",
  "porche": "পড়ছে",
  "porchi": "পড়ছি",
  "porbo": "পড়বো",
  "porbe": "পড়বে",
  "pori": "পড়ি",
  "poro": "পড়ো",
  "porun": "পড়ুন",
  "pora": "পড়া",
  "shunte": "শুনতে",
  "shune": "শুনে",
  "shuni": "শুনি",
  "shunbo": "শুনবো",
  "shunbe": "শুনবে",
  "shunun": "শুনুন",
  "shono": "শোনো",
  "shona": "শোনা",
  "shuna": "শোনা",
  "bujhte": "বুঝতে",
  "bujhi": "বুঝি",
  "bujhe": "বুঝে",
  "bujhlen": "বুঝলেন",
  "bujhlam": "বুঝলাম",
  "bujhun": "বুঝুন",
  "bujho": "বুঝছো",
  "shikhte": "শিখতে",
  "shikhi": "শিখি",
  "shikhe": "শিখে",
  "shekha": "শেখা",
  "shikhun": "শিখুন",
  "chole": "চলে",
  "choli": "চলি",
  "cholche": "চলছে",
  "cholo": "চলো",
  "cholun": "চলুন",
  "cholbo": "চলবো",
  "chola": "চলা",
  "boshte": "বসতে",
  "boshe": "বসে",
  "boshi": "বসি",
  "bosho": "বসো",
  "boshun": "বসুন",
  "boshlam": "বসলাম",
  "uthte": "উঠতে",
  "uthe": "উঠে",
  "uthi": "উঠি",
  "utho": "উঠো",
  "uthun": "উঠুন",
  "uthlam": " উঠলাম",
  "hashte": "হাসতে",
  "hashe": "হাসে",
  "hashi": "হাসি",
  "dourate": "দৌড়াতে",
  "dour": "দৌড়",
  "ghumate": "ঘুমাতে",
  "ghumiye": "ঘুমিয়ে",
  "ghum": "ঘুম",
  "dakche": "ডাকছে",
  "dakbo": "ডাকবো",
  "daka": "ডাকা",
  "manush": "মানুষ",
  "manusher": "মানুষের",
  "lok": "লোক",
  "lokjon": "লোকজন",
  "chele": "ছেলে",
  "chhele": "ছেলে",
  "chhelemeye": "ছেলেমেয়ে",
  "meye": "মেয়ে",
  "meyera": "মেয়েরা",
  "meyeder": "মেয়েদের",
  "baba": "বাবা",
  "ma": "মা",
  "bhai": "ভাই",
  "bon": "বোন",
  "bondhu": "বন্ধু",
  "bondhura": "বন্ধুরা",
  "shontan": "সন্তান",
  "poribar": "পরিবার",
  "desh": "দেশ",
  "deshe": "দেশে",
  "desher": "দেশের",
  "shohor": "শহর",
  "shohore": "শহরে",
  "gram": "গ্রাম",
  "grame": "গ্রামে",
  "rasta": "রাস্তা",
  "rastay": "রাস্তায়",
  "bari": "বাড়ি",
  "barite": "বাড়িতে",
  "ghor": "ঘর",
  "ghore": "ঘরে",
  "pani": "পানি",
  "jol": "জল",
  "khabar": "খাবার",
  "bhat": "ভাত",
  "mach": "মাছ",
  "mangsho": "মাংস",
  "dudh": "দুধ",
  "cha": "চা",
  "shobji": "সবজি",
  "sobji": "সবজি",
  "phul": "ফুল",
  "fol": "ফল",
  "gach": "গাছ",
  "pakhi": "পাখি",
  "nodi": "নদী",
  "shaghor": "সাগর",
  "shagor": "সাগর",
  "akash": "আকাশ",
  "batash": "বাতাস",
  "surjo": "সূর্য",
  "shurjo": "সূর্য",
  "chand": "চাঁদ",
  "matir": "মাটির",
  "mati": "মাটি",
  "boi": "বই",
  "khata": "খাতা",
  "kolom": "কলম",
  "chobi": "ছবি",
  "chithi": "চিঠি",
  "golpo": "গল্প",
  "kobita": "কবিতা",
  "gaan": "গান",
  "natok": "নাটক",
  "shahitto": "সাহিত্য",
  "sahityo": "সাহিত্য",
  "mon": "মন",
  "mone": "মনে",
  "chokh": "চোখ",
  "chokhe": "চোখে",
  "mukh": "মুখ",
  "mukhe": "মুখে",
  "matha": "মাথা",
  "haat": "হাত",
  "hate": "হাতে",
  "pa": "পা",
  "kan": "কান",
  "nak": "নাক",
  "raat": "রাত",
  "rate": "রাতে",
  "shokal": "সকাল",
  "shokale": "সকালে",
  "dupur": "দুপুর",
  "bikal": "বিকাল",
  "shondha": "সন্ধ্যা",
  "shomoy": "সময়",
  "bochor": "বছর",
  "mash": "মাস",
  "shoptaho": "সপ্তাহ",
  "kotha": "কথা",
  "kothar": "কথার",
  "kaj": "কাজ",
  "kaje": "কাজে",
  "khobor": "খবর",
  "shobdo": "শব্দ",
  "ortho": "অর্থ",
  "bhabna": "ভাবনা",
  "chinta": "চিন্তা",
  "sopno": "স্বপ্ন",
  "shopno": "স্বপ্ন",
  "anondo": "আনন্দ",
  "kosto": "কষ্ট",
  "noshto": "নষ্ট",
  "sposhto": "স্পষ্ট",
  "brishti": "বৃষ্টি",
  "drishti": "দৃষ্টি",
  "srishti": "সৃষ্টি",
  "shanti": "শান্তি",
  "mukti": "মুক্তি",
  "shadhinota": "স্বাধীনতা",
  "porikkha": "পরীক্ষা",
  "porikha": "পরীক্ষা",
  "shikkha": "শিক্ষা",
  "gyan": "জ্ঞান",
  "biddan": "বিদ্বান",
  "bikkhato": "বিখ্যাত",
  "biggapon": "বিজ্ঞাপন",
  "biggan": "বিজ্ঞান",
  "dhormo": "ধর্ম",
  "kormo": "কর্ম",
  "borno": "বর্ণ",
  "sorbo": "সর্ব",
  "shomporko": "সম্পর্ক",
  "shompurno": "সম্পূর্ণ",
  "shomosto": "সমস্ত",
  "shotti": "সত্যি",
  "mitthe": "মিথ্যে",
  "mithya": "মিথ্যা",
  "bhalobasha": "ভালোবাসা",
  "dhonnobad": "ধন্যবাদ",
  "shagotom": "স্বাগতম",
  "biday": "বিদায়",
  "ekta": "একটা",
  "ekti": "একটি",
  "duto": "দুটো",
  "tinTi": "তিনটি",
  "tinti": "তিনটি",
  "shongkhya": "সংখ্যা",
  "somoshya": "সমস্যা",
  "shomossha": "সমস্যা",
  "shomadhan": "সমাধান",
  "bidesh": "বিদেশ",
  "shorkar": "সরকার",
  "shobhar": "সভার",
  "shobha": "সভা",
  "dal": "দল",
  "deshbashi": "দেশবাসী",
  "bhalo": "ভালো",
  "kharap": "খারাপ",
  "shundor": "সুন্দর",
  "sundor": "সুন্দর",
  "boro": "বড়",
  "choto": "ছোট",
  "chhoto": "ছোট",
  "notun": "নতুন",
  "purano": "পুরানো",
  "shohoj": "সহজ",
  "kothin": "কঠিন",
  "shustho": "সুস্থ",
  "oshustho": "অসুস্থ",
  "dhoni": "ধনী",
  "gorib": "গরিব",
  "shukhi": "সুখী",
  "dukkhi": "দুঃখী",
  "dukkho": "দুঃখ",
  "ashol": "আসল",
  "nokli": "নকল",
  "priyo": "প্রিয়",
  "misti": "মিষ্টি",
  "tita": "তিতা",
  "jhal": "ঝাল",
  "gorom": "গরম",
  "thanda": "ঠান্ডা",
  "alo": "আলো",
  "ondhokar": "অন্ধকার",
  "shada": "সাদা",
  "kalo": "কালো",
  "lal": "লাল",
  "neel": "নীল",
  "shobuj": "সবুজ",
  "holud": "হলুদ",
  "shantosh": "সন্তোষ",
  "prothom": "প্রথম",
  "ditio": "দ্বিতীয়",
  "tritio": "তৃতীয়",
  "ebong": "এবং",
  "ar": "আর",
  "ba": "বা",
  "kintu": "কিন্তু",
  "tobe": "তবে",
  "jodi": "যদি",
  "tahole": "তাহলে",
  "karon": "কারণ",
  "shudhu": "শুধু",
  "majhe": "মাঝে",
  "por": "পর",
  "age": "আগে",
  "jonno": "জন্য",
  "shathe": "সাথে",
  "sathe": "সাথে",
  "kache": "কাছে",
  "bhetore": "ভেতরে",
  "baire": "বাইরে",
  "upore": "উপরে",
  "niche": "নিচে",
  "khub": "খুব",
  "khhub": "খুব",
  "onek": "অনেক",
  "ektu": "একটু",
  "ekdom": "একদম",
  "shobshomoy": "সবসময়",
  "sobshomoy": "সবসময়",
  "ha": "হ্যাঁ",
  "na": "না",
  "thik": "ঠিক",
  "bhul": "ভুল",
  "proyojon": "প্রয়োজন",
  "shobcheye": "সবচেয়ে",
  "sobcheye": "সবচেয়ে",
  "motamuti": "মোটামুটি",
  "jothestho": "যথেষ্ট",
  "othoba": "অথবা",
  "kinba": "কিংবা",
  "tai": "তাই",
  "jemonki": "যেমনকী",
  "bangladesh": "বাংলাদেশ",
  "bangla": "বাংলা",
  "banglay": "বাংলায়",
  "banglar": "বাংলার",
  "dhaka": "ঢাকা",
  "dhakar": "ঢাকার",
  "chittagong": "চট্টগ্রাম",
  "ctg": "চট্টগ্রাম",
  "sylhet": "সিলেট",
  "rajshahi": "রাজশাহী",
  "khulna": "খুলনা",
  "barisal": "বরিশাল",
  "borishal": "বরিশাল",
  "rongpur": "রংপুর",
  "rangpur": "রংপুর",
  "mymensingh": "ময়মনসিংহ",
  "comilla": "কুমিল্লা",
  "cumilla": "কুমিল্লা",
  "bogura": "বগুড়া",
  "bogra": "বগুড়া",
  "coxsbazar": "কক্সবাজার",
  "gazipur": "গাজীপুর",
  "narayanganj": "নারায়ণগঞ্জ",
  "kolkata": "কলকাতা",
  "calcutta": "কলকাতা",
  "india": "ভারত",
  "bharat": "ভারত",
  "america": "আমেরিকা",
  "ek": "এক",
  "dui": "দুই",
  "tin": "তিন",
  "char": "চার",
  "pach": "পাঁচ",
  "choy": "ছয়",
  "shat": "সাত",
  "aat": "আট",
  "noy": "নয়",
  "dosh": "দশ",
  "egaro": "এগারো",
  "baro": "বারো",
  "tero": "তেরো",
  "chouddo": "চৌদ্দ",
  "ponero": "পনেরো",
  "sholo": "ষোলো",
  "shotero": "সতেরো",
  "atharo": "আঠারো",
  "unish": "উনিশ",
  "bish": "বিশ",
  "kuri": "কুড়ি",
  "shohosro": "সহস্র",
  "hajar": "হাজার",
  "lakh": "লাখ",
  "koti": "কোটি",
  "computer": "কম্পিউটার",
  "software": "সফটওয়্যার",
  "hardware": "হার্ডওয়্যার",
  "internet": "ইন্টারনেট",
  "website": "ওয়েবসাইট",
  "web": "ওয়েব",
  "facebook": "ফেসবুক",
  "google": "গুগল",
  "youtube": "ইউটিউব",
  "online": "অনলাইন",
  "offline": "অফলাইন",
  "mobile": "মোবাইল",
  "phone": "ফোন",
  "keyboard": "কীবোর্ড",
  "key": "কী",
  "avro": "অভ্র",
  "bijoy": "বিজয়",
  "jatiyo": "জাতীয়",
  "editor": "এডিটর",
  "screen": "স্ক্রিন",
  "display": "ডিসপ্লে",
  "message": "মেসেজ",
  "call": "কল",
  "video": "ভিডিও",
  "audio": "অডিও",
  "link": "লিংক",
  "post": "পোস্ট",
  "share": "শেয়ার",
  "like": "লাইক",
  "comment": "কমেন্ট",
  "account": "অ্যাকাউন্ট",
  "password": "পাসওয়ার্ড",
  "profile": "প্রোফাইল",
  "setting": "সেটিংস",
  "settings": "সেটিংস",
  "file": "ফাইল",
  "folder": "ফোল্ডার",
  "image": "ছবি",
  "photo": "ছবি",
  "camera": "ক্যামেরা",
  "doctor": "ডাক্তার",
  "hospital": "হাসপাতাল",
  "school": "স্কুল",
  "college": "কলেজ",
  "university": "বিশ্ববিদ্যালয়",
  "versity": "ভার্সিটি",
  "office": "অফিস",
  "bank": "ব্যাংক",
  "police": "পুলিশ",
  "station": "স্টেশন",
  "ticket": "টিকিট",
  "bus": "বাস",
  "train": "ট্রেন",
  "car": "গাড়ি",
  "bike": "বাইক",
  "hotel": "হোটেল",
  "restaurant": "রেস্তোরাঁ",
  "market": "মার্কেট",
  "shop": "দোকান",
  "news": "সংবাদ",
  "paper": "কাগজ",
  "report": "রিপোর্ট",
  "service": "সার্ভিস",
  "center": "সেন্টার",
  "manager": "ম্যানেজার",
  "system": "সিস্টেম",
  "data": "ডেটা",
  "digital": "ডিজিটাল",
  "technology": "প্রযুক্তি",
  "tech": "টেক",
  "user": "ব্যবহারকারী",
  "admin": "অ্যাডমিন",
  "login": "লগইন",
  "logout": "লগআউট",
  "app": "অ্যাপ",
  "update": "আপডেট",
  "download": "ডাউনলোড",
  "upload": "আপলোড",
  "copy": "কপি",
  "paste": "পেস্ট",
  "delete": "ডিলিট",
  "save": "সেভ",
  "search": "অনুসন্ধান",
  "click": "ক্লিক",
  "type": "টাইপ"
});

export interface ParseOptions {
  banglaDigits?: boolean;
  banglaFullStop?: boolean;
  dictionary?: boolean | BanglishDictionary;
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
    dictionary: options?.dictionary ?? false,
  };

  let dict: BanglishDictionary | null = null;
  if (opts.dictionary === true) {
    dict = BUILTIN_DICTIONARY;
  } else if (opts.dictionary && typeof opts.dictionary === 'object') {
    dict = opts.dictionary;
  }

  // Tokenize: split into words (letters) and delimiters
  const tokens = input.split(/([a-zA-Z]+)/);
  let bangla = '';

  for (const token of tokens) {
    if (!token) continue;

    if (/^[a-zA-Z]+$/.test(token)) {
      const lower = token.toLowerCase();
      if (dict && Object.hasOwn(dict, lower)) {
        bangla += dict[lower];
      } else {
        bangla += phoneticParse(token);
      }
    } else {
      let processed = token;

      if (opts.banglaDigits) {
        processed = processed.replace(/[0-9]/g, (d) => {
          const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
          return banglaDigits[parseInt(d, 10)];
        });
      }

      if (opts.banglaFullStop) {
        processed = processed.replace(/\.(?=\s|$)/g, '।');
      }

      bangla += processed;
    }
  }

  return { bangla, english: input };
}

export function toBangla(input: string, options?: ParseOptions): string {
  return parse(input, options).bangla;
}

export function isBangla(text: string): boolean {
  return /[\u0980-\u09FF]/.test(text);
}

export function getAvroCandidates(rawWord: string): string[] {
  const word = rawWord.trim();
  if (!word) return [];
  const lower = word.toLowerCase();

  const results = new Set<string>();

  // 1. Standard Avro parse
  const primaryParse = phoneticParse(word);
  if (primaryParse) {
    results.add(primaryParse);
  }

  // 2. Lowercase Avro parse (if different)
  if (lower !== word) {
    const lowerParse = phoneticParse(lower);
    if (lowerParse) results.add(lowerParse);
  }

  // 3. Common phonetic variation rules:
  // (a) t -> T variation for words like 'ekta' -> 'একটা', 'choto' -> 'ছোট', 'taka' -> 'টাকা'
  if (lower.includes('t')) {
    const withRetroflexT = lower.replace(/t/g, 'T');
    const cand = phoneticParse(withRetroflexT);
    if (cand && !results.has(cand)) results.add(cand);
  }

  // (b) d -> D variation for words like 'doctor' -> 'ডাক্তার', 'daktar' -> 'ডাক্তার'
  if (lower.includes('d')) {
    const withRetroflexD = lower.replace(/d/g, 'D');
    const cand = phoneticParse(withRetroflexD);
    if (cand && !results.has(cand)) results.add(cand);
  }

  // (c) r -> R (ড়) variation for words like 'bari' -> 'বাড়ি', 'gari' -> 'গাড়ি', 'boro' -> 'বড়'
  if (lower.includes('r')) {
    const withFlapR = lower.replace(/r/g, 'R');
    const cand = phoneticParse(withFlapR);
    if (cand && !results.has(cand)) results.add(cand);
  }

  // (d) s <-> sh variation for words like 'shomoy' -> 'সময়', 'shundor' -> 'সুন্দর'
  if (lower.startsWith('sh')) {
    const withS = lower.replace(/^sh/, 's');
    const cand = phoneticParse(withS);
    if (cand && !results.has(cand)) results.add(cand);
  } else if (lower.startsWith('s')) {
    const withSh = lower.replace(/^s/, 'sh');
    const cand = phoneticParse(withSh);
    if (cand && !results.has(cand)) results.add(cand);
  }

  // (e) o-kar ending variation: if word ends in 'o', try with 'O' and without 'o'
  if (lower.endsWith('o') && lower.length > 2) {
    const withCapitalO = lower.slice(0, -1) + 'O';
    const cand2 = phoneticParse(withCapitalO);
    if (cand2 && !results.has(cand2)) results.add(cand2);

    const withoutO = lower.slice(0, -1);
    const cand1 = phoneticParse(withoutO);
    if (cand1 && !results.has(cand1)) results.add(cand1);
  }

  return Array.from(results).slice(0, 5);
}
