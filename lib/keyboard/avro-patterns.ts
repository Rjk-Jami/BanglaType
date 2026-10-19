// Official Avro Phonetic patterns ported from OmicronLab (jsAvroPhonetic)
// Augmented with essential colloquial Banglish transliteration patterns.

export type Scope =
  | 'vowel'
  | 'consonant'
  | 'punctuation'
  | 'exact'
  | '!vowel'
  | '!consonant'
  | '!punctuation'
  | '!exact';
export type MatchType = 'prefix' | 'suffix';

export interface MatchCondition {
  type: MatchType;
  scope: Scope;
  value?: string;
  negative?: boolean;
}

export interface PatternRule {
  matches: MatchCondition[];
  replace: string;
}

export interface PatternEntry {
  find: string;
  replace: string;
  rules?: PatternRule[];
}

export const AVRO_VOWELS = 'aeiou';
export const AVRO_CONSONANTS = 'bcdfghjklmnpqrstvwxyz';
export const AVRO_CASESENSITIVE = 'oiudgjnrstyz';

export const PATTERNS: PatternEntry[] = [
  {
    "find": "NgkSh",
    "replace": "ঙ্ক্ষ"
  },
  {
    "find": "Ngkkh",
    "replace": "ঙ্ক্ষ"
  },
  {
    "find": "shch",
    "replace": "শ্ছ"
  },
  {
    "find": "kkhN",
    "replace": "ক্ষ্ণ"
  },
  {
    "find": "kShN",
    "replace": "ক্ষ্ণ"
  },
  {
    "find": "kkhm",
    "replace": "ক্ষ্ম"
  },
  {
    "find": "kShm",
    "replace": "ক্ষ্ম"
  },
  {
    "find": "NGch",
    "replace": "ঞ্ছ"
  },
  {
    "find": "Nggh",
    "replace": "ঙ্ঘ"
  },
  {
    "find": "Ngkh",
    "replace": "ঙ্খ"
  },
  {
    "find": "NGjh",
    "replace": "ঞ্ঝ"
  },
  {
    "find": "ngOU",
    "replace": "ঙ্গৌ"
  },
  {
    "find": "ngOI",
    "replace": "ঙ্গৈ"
  },
  {
    "find": "Ngkx",
    "replace": "ঙ্ক্ষ"
  },
  {
    "find": "rri`",
    "replace": "ৃ"
  },
  {
    "find": "shch",
    "replace": "শ্ছ"
  },
  {
    "find": "ShTh",
    "replace": "ষ্ঠ"
  },
  {
    "find": "Shph",
    "replace": "ষ্ফ"
  },
  {
    "find": "ksh",
    "replace": "ক্ষ"
  },
  {
    "find": "kkh",
    "replace": "ক্ষ"
  },
  {
    "find": "chh",
    "replace": "ছ"
  },
  {
    "find": "bhl",
    "replace": "ভ্ল"
  },
  {
    "find": "psh",
    "replace": "পশ"
  },
  {
    "find": "bdh",
    "replace": "ব্ধ"
  },
  {
    "find": "cNG",
    "replace": "চ্ঞ"
  },
  {
    "find": "cch",
    "replace": "চ্ছ"
  },
  {
    "find": "dhn",
    "replace": "ধ্ন"
  },
  {
    "find": "dhm",
    "replace": "ধ্ম"
  },
  {
    "find": "dgh",
    "replace": "দ্ঘ"
  },
  {
    "find": "ddh",
    "replace": "দ্ধ"
  },
  {
    "find": "dbh",
    "replace": "দ্ভ"
  },
  {
    "find": "...",
    "replace": "..."
  },
  {
    "find": "ghn",
    "replace": "ঘ্ন"
  },
  {
    "find": "Ghn",
    "replace": "ঘ্ন"
  },
  {
    "find": "gdh",
    "replace": "গ্ধ"
  },
  {
    "find": "Gdh",
    "replace": "গ্ধ"
  },
  {
    "find": "jjh",
    "replace": "জ্ঝ"
  },
  {
    "find": "jNG",
    "replace": "জ্ঞ"
  },
  {
    "find": "kxN",
    "replace": "ক্ষ্ণ"
  },
  {
    "find": "kxm",
    "replace": "ক্ষ্ম"
  },
  {
    "find": "kkh",
    "replace": "ক্ষ"
  },
  {
    "find": "kSh",
    "replace": "ক্ষ"
  },
  {
    "find": "ksh",
    "replace": "কশ"
  },
  {
    "find": "lbh",
    "replace": "ল্ভ"
  },
  {
    "find": "ldh",
    "replace": "ল্ধ"
  },
  {
    "find": "lkh",
    "replace": "লখ"
  },
  {
    "find": "lgh",
    "replace": "লঘ"
  },
  {
    "find": "lph",
    "replace": "লফ"
  },
  {
    "find": "mth",
    "replace": "ম্থ"
  },
  {
    "find": "mph",
    "replace": "ম্ফ"
  },
  {
    "find": "mbh",
    "replace": "ম্ভ"
  },
  {
    "find": "mpl",
    "replace": "মপ্ল"
  },
  {
    "find": "NGc",
    "replace": "ঞ্চ"
  },
  {
    "find": "nch",
    "replace": "ঞ্ছ"
  },
  {
    "find": "njh",
    "replace": "ঞ্ঝ"
  },
  {
    "find": "ngh",
    "replace": "ঙ্ঘ"
  },
  {
    "find": "Ngk",
    "replace": "ঙ্ক"
  },
  {
    "find": "Ngx",
    "replace": "ঙ্ষ"
  },
  {
    "find": "Ngg",
    "replace": "ঙ্গ"
  },
  {
    "find": "Ngm",
    "replace": "ঙ্ম"
  },
  {
    "find": "NGj",
    "replace": "ঞ্জ"
  },
  {
    "find": "ndh",
    "replace": "ন্ধ"
  },
  {
    "find": "nTh",
    "replace": "ন্ঠ"
  },
  {
    "find": "NTh",
    "replace": "ণ্ঠ"
  },
  {
    "find": "nth",
    "replace": "ন্থ"
  },
  {
    "find": "nkh",
    "replace": "ঙ্খ"
  },
  {
    "find": "ngo",
    "replace": "ঙ্গ"
  },
  {
    "find": "nga",
    "replace": "ঙ্গা"
  },
  {
    "find": "ngi",
    "replace": "ঙ্গি"
  },
  {
    "find": "ngI",
    "replace": "ঙ্গী"
  },
  {
    "find": "ngu",
    "replace": "ঙ্গু"
  },
  {
    "find": "ngU",
    "replace": "ঙ্গূ"
  },
  {
    "find": "nge",
    "replace": "ঙ্গে"
  },
  {
    "find": "ngO",
    "replace": "ঙ্গো"
  },
  {
    "find": "NDh",
    "replace": "ণ্ঢ"
  },
  {
    "find": "nsh",
    "replace": "নশ"
  },
  {
    "find": "Ngr",
    "replace": "ঙর"
  },
  {
    "find": "NGr",
    "replace": "ঞর"
  },
  {
    "find": "ngr",
    "replace": "ংর"
  },
  {
    "find": "OI`",
    "replace": "ৈ"
  },
  {
    "find": "OU`",
    "replace": "ৌ"
  },
  {
    "find": "phl",
    "replace": "ফ্ল"
  },
  {
    "find": "rri",
    "replace": "ৃ",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          }
        ],
        "replace": "ঋ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          }
        ],
        "replace": "ঋ"
      }
    ]
  },
  {
    "find": "rrZ",
    "replace": "রর‍্য"
  },
  {
    "find": "rry",
    "replace": "রর‍্য"
  },
  {
    "find": "Sch",
    "replace": "শ্ছ"
  },
  {
    "find": "skl",
    "replace": "স্ক্ল"
  },
  {
    "find": "skh",
    "replace": "স্খ"
  },
  {
    "find": "sth",
    "replace": "স্থ"
  },
  {
    "find": "sph",
    "replace": "স্ফ"
  },
  {
    "find": "shc",
    "replace": "শ্চ"
  },
  {
    "find": "sht",
    "replace": "শ্ত"
  },
  {
    "find": "shn",
    "replace": "শ্ন"
  },
  {
    "find": "shm",
    "replace": "শ্ম"
  },
  {
    "find": "shl",
    "replace": "শ্ল"
  },
  {
    "find": "Shk",
    "replace": "ষ্ক"
  },
  {
    "find": "ShT",
    "replace": "ষ্ট"
  },
  {
    "find": "ShN",
    "replace": "ষ্ণ"
  },
  {
    "find": "Shp",
    "replace": "ষ্প"
  },
  {
    "find": "Shf",
    "replace": "ষ্ফ"
  },
  {
    "find": "Shm",
    "replace": "ষ্ম"
  },
  {
    "find": "spl",
    "replace": "স্প্ল"
  },
  {
    "find": "oo`",
    "replace": "ু"
  },
  {
    "find": "tth",
    "replace": "ত্থ"
  },
  {
    "find": "t``",
    "replace": "ৎ"
  },
  {
    "find": "ee`",
    "replace": "ী"
  },
  {
    "find": "bj",
    "replace": "ব্জ"
  },
  {
    "find": "bd",
    "replace": "ব্দ"
  },
  {
    "find": "bb",
    "replace": "ব্ব"
  },
  {
    "find": "bl",
    "replace": "ব্ল"
  },
  {
    "find": "bh",
    "replace": "ভ"
  },
  {
    "find": "vl",
    "replace": "ভ্ল"
  },
  {
    "find": "cc",
    "replace": "চ্চ"
  },
  {
    "find": "ch",
    "replace": "ছ"
  },
  {
    "find": "dv",
    "replace": "দ্ভ"
  },
  {
    "find": "dm",
    "replace": "দ্ম"
  },
  {
    "find": "DD",
    "replace": "ড্ড"
  },
  {
    "find": "Dh",
    "replace": "ঢ"
  },
  {
    "find": "dh",
    "replace": "ধ"
  },
  {
    "find": "dg",
    "replace": "দ্গ"
  },
  {
    "find": "dd",
    "replace": "দ্দ"
  },
  {
    "find": ".`",
    "replace": "."
  },
  {
    "find": "..",
    "replace": "।।"
  },
  {
    "find": "gN",
    "replace": "গ্ণ"
  },
  {
    "find": "GN",
    "replace": "গ্ণ"
  },
  {
    "find": "gn",
    "replace": "গ্ন"
  },
  {
    "find": "Gn",
    "replace": "গ্ন"
  },
  {
    "find": "gm",
    "replace": "গ্ম"
  },
  {
    "find": "Gm",
    "replace": "গ্ম"
  },
  {
    "find": "gl",
    "replace": "গ্ল"
  },
  {
    "find": "Gl",
    "replace": "গ্ল"
  },
  {
    "find": "gg",
    "replace": "জ্ঞ"
  },
  {
    "find": "GG",
    "replace": "জ্ঞ"
  },
  {
    "find": "Gg",
    "replace": "জ্ঞ"
  },
  {
    "find": "gG",
    "replace": "জ্ঞ"
  },
  {
    "find": "gh",
    "replace": "ঘ"
  },
  {
    "find": "Gh",
    "replace": "ঘ"
  },
  {
    "find": "hN",
    "replace": "হ্ণ"
  },
  {
    "find": "hn",
    "replace": "হ্ন"
  },
  {
    "find": "hm",
    "replace": "হ্ম"
  },
  {
    "find": "hl",
    "replace": "হ্ল"
  },
  {
    "find": "jh",
    "replace": "ঝ"
  },
  {
    "find": "jj",
    "replace": "জ্জ"
  },
  {
    "find": "kx",
    "replace": "ক্ষ"
  },
  {
    "find": "kk",
    "replace": "ক্ক"
  },
  {
    "find": "kT",
    "replace": "ক্ট"
  },
  {
    "find": "kt",
    "replace": "ক্ত"
  },
  {
    "find": "kl",
    "replace": "ক্ল"
  },
  {
    "find": "ks",
    "replace": "ক্স"
  },
  {
    "find": "kh",
    "replace": "খ"
  },
  {
    "find": "lk",
    "replace": "ল্ক"
  },
  {
    "find": "lg",
    "replace": "ল্গ"
  },
  {
    "find": "lT",
    "replace": "ল্ট"
  },
  {
    "find": "lD",
    "replace": "ল্ড"
  },
  {
    "find": "lp",
    "replace": "ল্প"
  },
  {
    "find": "lv",
    "replace": "ল্ভ"
  },
  {
    "find": "lm",
    "replace": "ল্ম"
  },
  {
    "find": "ll",
    "replace": "ল্ল"
  },
  {
    "find": "lb",
    "replace": "ল্ব"
  },
  {
    "find": "mn",
    "replace": "ম্ন"
  },
  {
    "find": "mp",
    "replace": "ম্প"
  },
  {
    "find": "mv",
    "replace": "ম্ভ"
  },
  {
    "find": "mm",
    "replace": "ম্ম"
  },
  {
    "find": "ml",
    "replace": "ম্ল"
  },
  {
    "find": "mb",
    "replace": "ম্ব"
  },
  {
    "find": "mf",
    "replace": "ম্ফ"
  },
  {
    "find": "nj",
    "replace": "ঞ্জ"
  },
  {
    "find": "Ng",
    "replace": "ঙ"
  },
  {
    "find": "NG",
    "replace": "ঞ"
  },
  {
    "find": "nk",
    "replace": "ঙ্ক"
  },
  {
    "find": "ng",
    "replace": "ং"
  },
  {
    "find": "nn",
    "replace": "ন্ন"
  },
  {
    "find": "NN",
    "replace": "ণ্ণ"
  },
  {
    "find": "Nn",
    "replace": "ণ্ন"
  },
  {
    "find": "nm",
    "replace": "ন্ম"
  },
  {
    "find": "Nm",
    "replace": "ণ্ম"
  },
  {
    "find": "nd",
    "replace": "ন্দ"
  },
  {
    "find": "nT",
    "replace": "ন্ট"
  },
  {
    "find": "NT",
    "replace": "ণ্ট"
  },
  {
    "find": "nD",
    "replace": "ন্ড"
  },
  {
    "find": "ND",
    "replace": "ণ্ড"
  },
  {
    "find": "nt",
    "replace": "ন্ত"
  },
  {
    "find": "ns",
    "replace": "ন্স"
  },
  {
    "find": "nc",
    "replace": "ঞ্চ"
  },
  {
    "find": "O`",
    "replace": "ো"
  },
  {
    "find": "OI",
    "replace": "ৈ",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          }
        ],
        "replace": "ঐ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          }
        ],
        "replace": "ঐ"
      }
    ]
  },
  {
    "find": "OU",
    "replace": "ৌ",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          }
        ],
        "replace": "ঔ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          }
        ],
        "replace": "ঔ"
      }
    ]
  },
  {
    "find": "pT",
    "replace": "প্ট"
  },
  {
    "find": "pt",
    "replace": "প্ত"
  },
  {
    "find": "pn",
    "replace": "প্ন"
  },
  {
    "find": "pp",
    "replace": "প্প"
  },
  {
    "find": "pl",
    "replace": "প্ল"
  },
  {
    "find": "ps",
    "replace": "প্স"
  },
  {
    "find": "ph",
    "replace": "ফ"
  },
  {
    "find": "fl",
    "replace": "ফ্ল"
  },
  {
    "find": "rZ",
    "replace": "র‍্য",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "consonant"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "r"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "y"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "w"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "x"
          }
        ],
        "replace": "্র্য"
      }
    ]
  },
  {
    "find": "ry",
    "replace": "র‍্য",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "consonant"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "r"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "y"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "w"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "x"
          }
        ],
        "replace": "্র্য"
      }
    ]
  },
  {
    "find": "rr",
    "replace": "রর",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "suffix",
            "scope": "!vowel"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "r"
          },
          {
            "type": "suffix",
            "scope": "!punctuation"
          }
        ],
        "replace": "র্"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "consonant"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "r"
          }
        ],
        "replace": "্রর"
      }
    ]
  },
  {
    "find": "Rg",
    "replace": "ড়্গ"
  },
  {
    "find": "Rh",
    "replace": "ঢ়"
  },
  {
    "find": "sk",
    "replace": "স্ক"
  },
  {
    "find": "Sc",
    "replace": "শ্চ"
  },
  {
    "find": "sT",
    "replace": "স্ট"
  },
  {
    "find": "st",
    "replace": "স্ত"
  },
  {
    "find": "sn",
    "replace": "স্ন"
  },
  {
    "find": "sp",
    "replace": "স্প"
  },
  {
    "find": "sf",
    "replace": "স্ফ"
  },
  {
    "find": "sm",
    "replace": "স্ম"
  },
  {
    "find": "sl",
    "replace": "স্ল"
  },
  {
    "find": "sh",
    "replace": "শ"
  },
  {
    "find": "Sc",
    "replace": "শ্চ"
  },
  {
    "find": "St",
    "replace": "শ্ত"
  },
  {
    "find": "Sn",
    "replace": "শ্ন"
  },
  {
    "find": "Sm",
    "replace": "শ্ম"
  },
  {
    "find": "Sl",
    "replace": "শ্ল"
  },
  {
    "find": "Sh",
    "replace": "ষ"
  },
  {
    "find": "oo",
    "replace": "ু",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "উ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "উ"
      }
    ]
  },
  {
    "find": "o`",
    "replace": ""
  },
  {
    "find": "oZ",
    "replace": "অ্য"
  },
  {
    "find": "TT",
    "replace": "ট্ট"
  },
  {
    "find": "Tm",
    "replace": "ট্ম"
  },
  {
    "find": "Th",
    "replace": "ঠ"
  },
  {
    "find": "tn",
    "replace": "ত্ন"
  },
  {
    "find": "tm",
    "replace": "ত্ম"
  },
  {
    "find": "th",
    "replace": "থ"
  },
  {
    "find": "tt",
    "replace": "ত্ত"
  },
  {
    "find": "aZ",
    "replace": "অ্যা"
  },
  {
    "find": "AZ",
    "replace": "অ্যা"
  },
  {
    "find": "a`",
    "replace": "া"
  },
  {
    "find": "A`",
    "replace": "া"
  },
  {
    "find": "i`",
    "replace": "ি"
  },
  {
    "find": "I`",
    "replace": "ী"
  },
  {
    "find": "u`",
    "replace": "ু"
  },
  {
    "find": "U`",
    "replace": "ূ"
  },
  {
    "find": "ee",
    "replace": "ী",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "ঈ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "ঈ"
      }
    ]
  },
  {
    "find": "e`",
    "replace": "ে"
  },
  {
    "find": ":`",
    "replace": ":"
  },
  {
    "find": "^`",
    "replace": "^"
  },
  {
    "find": ",,",
    "replace": "্‌"
  },
  {
    "find": "b",
    "replace": "ব"
  },
  {
    "find": "v",
    "replace": "ভ"
  },
  {
    "find": "c",
    "replace": "চ"
  },
  {
    "find": "D",
    "replace": "ড"
  },
  {
    "find": "d",
    "replace": "দ"
  },
  {
    "find": ".",
    "replace": "।"
  },
  {
    "find": "g",
    "replace": "গ"
  },
  {
    "find": "G",
    "replace": "গ"
  },
  {
    "find": "h",
    "replace": "হ"
  },
  {
    "find": "j",
    "replace": "জ"
  },
  {
    "find": "J",
    "replace": "জ"
  },
  {
    "find": "k",
    "replace": "ক"
  },
  {
    "find": "l",
    "replace": "ল"
  },
  {
    "find": "m",
    "replace": "ম"
  },
  {
    "find": "0",
    "replace": "০"
  },
  {
    "find": "1",
    "replace": "১"
  },
  {
    "find": "2",
    "replace": "২"
  },
  {
    "find": "3",
    "replace": "৩"
  },
  {
    "find": "4",
    "replace": "৪"
  },
  {
    "find": "5",
    "replace": "৫"
  },
  {
    "find": "6",
    "replace": "৬"
  },
  {
    "find": "7",
    "replace": "৭"
  },
  {
    "find": "8",
    "replace": "৮"
  },
  {
    "find": "9",
    "replace": "৯"
  },
  {
    "find": "n",
    "replace": "ন"
  },
  {
    "find": "N",
    "replace": "ণ"
  },
  {
    "find": "O",
    "replace": "ো",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          }
        ],
        "replace": "ও"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          }
        ],
        "replace": "ও"
      }
    ]
  },
  {
    "find": "f",
    "replace": "ফ"
  },
  {
    "find": "p",
    "replace": "প"
  },
  {
    "find": "R",
    "replace": "ড়"
  },
  {
    "find": "r",
    "replace": "র",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "consonant"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "r"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "y"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "w"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "x"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "Z"
          }
        ],
        "replace": "্র"
      }
    ]
  },
  {
    "find": "s",
    "replace": "স"
  },
  {
    "find": "S",
    "replace": "শ"
  },
  {
    "find": "o",
    "replace": "",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "vowel"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "o"
          }
        ],
        "replace": "ও"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "vowel"
          },
          {
            "type": "prefix",
            "scope": "exact",
            "value": "o"
          }
        ],
        "replace": "অ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          }
        ],
        "replace": "অ"
      }
    ]
  },
  {
    "find": "T",
    "replace": "ট"
  },
  {
    "find": "t",
    "replace": "ত"
  },
  {
    "find": "a",
    "replace": "া",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "আ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "prefix",
            "scope": "!exact",
            "value": "a"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "য়া"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "exact",
            "value": "a"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "আ"
      }
    ]
  },
  {
    "find": "i",
    "replace": "ি",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "ই"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "ই"
      }
    ]
  },
  {
    "find": "I",
    "replace": "ী",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "ঈ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "ঈ"
      }
    ]
  },
  {
    "find": "u",
    "replace": "ু",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "উ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "উ"
      }
    ]
  },
  {
    "find": "U",
    "replace": "ূ",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "ঊ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "ঊ"
      }
    ]
  },
  {
    "find": "e",
    "replace": "ে",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "এ"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          },
          {
            "type": "suffix",
            "scope": "!exact",
            "value": "`"
          }
        ],
        "replace": "এ"
      }
    ]
  },
  {
    "find": "z",
    "replace": "য"
  },
  {
    "find": "Z",
    "replace": "্য"
  },
  {
    "find": "y",
    "replace": "্য",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "!consonant"
          },
          {
            "type": "prefix",
            "scope": "!punctuation"
          }
        ],
        "replace": "য়"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          }
        ],
        "replace": "ইয়"
      }
    ]
  },
  {
    "find": "Y",
    "replace": "য়"
  },
  {
    "find": "q",
    "replace": "ক"
  },
  {
    "find": "w",
    "replace": "ও",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          },
          {
            "type": "suffix",
            "scope": "vowel"
          }
        ],
        "replace": "ওয়"
      },
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "consonant"
          }
        ],
        "replace": "্ব"
      }
    ]
  },
  {
    "find": "x",
    "replace": "ক্স",
    "rules": [
      {
        "matches": [
          {
            "type": "prefix",
            "scope": "punctuation"
          }
        ],
        "replace": "এক্স"
      }
    ]
  },
  {
    "find": ":",
    "replace": "ঃ"
  },
  {
    "find": "^",
    "replace": "ঁ"
  },
  {
    "find": ",",
    "replace": ","
  },
  {
    "find": "$",
    "replace": "৳"
  },
  {
    "find": "`",
    "replace": ""
  }
];

export const SORTED_PATTERNS: PatternEntry[] = [...PATTERNS].sort(
  (a, b) => b.find.length - a.find.length
);
