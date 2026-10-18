export type Scope = 'vowel' | 'consonant' | 'punctuation' | 'exact';
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

// Helper to build conditions concisely
function pre(scope: Scope, value?: string, negative?: boolean): MatchCondition {
  return { type: 'prefix', scope, value, negative };
}
function suf(scope: Scope, value?: string, negative?: boolean): MatchCondition {
  return { type: 'suffix', scope, value, negative };
}

export const PATTERNS: PatternEntry[] = [
  // === CONJUNCTS & MULTI-CHAR (longest first) ===
  { find: 'bhl', replace: 'ভ্ল' },
  { find: 'phl', replace: 'ফ্ল' },
  { find: 'shl', replace: 'শ্ল' },
  { find: 'nkh', replace: 'ঙ্খ' },
  { find: 'ngh', replace: 'ঙ্ঘ' },
  { find: 'ndh', replace: 'ন্ধ' },
  { find: 'nTh', replace: 'ণ্ঠ' },
  { find: 'NTh', replace: 'ণ্ঠ' },
  { find: 'nDh', replace: 'ন্ঢ' },
  { find: 'NDh', replace: 'ণ্ঢ' },
  { find: 'shch', replace: 'শ্ছ' },
  { find: 'ShTh', replace: 'ষ্ঠ' },
  { find: 'Shph', replace: 'ষ্ফ' },
  { find: 'Sch', replace: 'শ্ছ' },
  { find: 'skl', replace: 'স্ক্ল' },
  { find: 'skh', replace: 'স্খ' },
  { find: 'sth', replace: 'স্থ' },
  { find: 'sph', replace: 'স্ফ' },
  { find: 'shm', replace: 'শ্ম' },
  { find: 'shn', replace: 'শ্ন' },
  { find: 'cch', replace: 'চ্ছ' },
  { find: 'cch', replace: 'চ্ছ' },
  { find: 'kkh', replace: 'ক্ষ', rules: [
    { matches: [suf('exact', 'o')], replace: 'ক্ষ' },
    { matches: [suf('vowel')], replace: 'ক্ষ' },
    { matches: [suf('consonant')], replace: 'ক্ষ' },
    { matches: [suf('punctuation')], replace: 'ক্ষ' },
  ]},
  { find: 'ksh', replace: 'ক্ষ' },

  // 3-letter combos
  { find: 'rri', replace: 'ঋ', rules: [
    { matches: [pre('consonant')], replace: 'ৃ' },
  ]},
  { find: 'cng', replace: 'চ্ঞ' },
  { find: 'jng', replace: 'জ্ঞ' },
  
  // OI / OU
  { find: 'OI', replace: 'ঐ', rules: [
    { matches: [pre('consonant')], replace: 'ৈ' },
  ]},
  { find: 'OU', replace: 'ঔ', rules: [
    { matches: [pre('consonant')], replace: 'ৌ' },
  ]},

  // Common 2-letter patterns
  { find: 'oi', replace: 'ঐ', rules: [
    { matches: [pre('consonant')], replace: 'ৈ' },
  ]},
  { find: 'ou', replace: 'ঔ', rules: [
    { matches: [pre('consonant')], replace: 'ৌ' },
  ]},
  { find: 'ee', replace: 'ঈ', rules: [
    { matches: [pre('consonant')], replace: 'ী' },
  ]},
  { find: 'oo', replace: 'ঊ', rules: [
    { matches: [pre('consonant')], replace: 'ূ' },
  ]},
  { find: 'aa', replace: 'আ', rules: [
    { matches: [pre('consonant')], replace: 'া' },
  ]},
  
  // Consonant clusters (2-char)
  { find: 'kh', replace: 'খ' },
  { find: 'gh', replace: 'ঘ' },
  { find: 'Ng', replace: 'ঙ' },
  { find: 'ng', replace: 'ং', rules: [
    { matches: [suf('vowel')], replace: 'ঙ' },
    { matches: [suf('exact', 'g')], replace: 'ঙ্' },
  ]},
  { find: 'ch', replace: 'ছ', rules: [
    { matches: [pre('punctuation')], replace: 'চ' },
    { matches: [suf('exact', 'h')], replace: 'চ্' },
  ]},
  { find: 'Ch', replace: 'ছ' },
  { find: 'jh', replace: 'ঝ' },
  { find: 'Th', replace: 'ঠ' },
  { find: 'th', replace: 'থ' },
  { find: 'Dh', replace: 'ঢ' },
  { find: 'dh', replace: 'ধ' },
  { find: 'ph', replace: 'ফ' },
  { find: 'bh', replace: 'ভ' },
  { find: 'sh', replace: 'শ', rules: [
    { matches: [suf('exact', 'h')], replace: 'শ্' },
  ]},
  { find: 'Sh', replace: 'ষ' },
  { find: 'Rh', replace: 'ঢ়' },
  
  // W-vowel compounds
  { find: 'wa', replace: 'ওয়া', rules: [
    { matches: [pre('consonant')], replace: '্বা' },
  ]},
  { find: 'Wa', replace: 'ওয়া', rules: [
    { matches: [pre('consonant')], replace: '্বা' },
  ]},
  { find: 'wo', replace: 'ও', rules: [
    { matches: [pre('consonant')], replace: '্ব' },
  ]},
  { find: 'Wo', replace: 'ও', rules: [
    { matches: [pre('consonant')], replace: '্ব' },
  ]},
  { find: 'we', replace: 'ওয়ে', rules: [
    { matches: [pre('consonant')], replace: '্বে' },
  ]},
  { find: 'We', replace: 'ওয়ে', rules: [
    { matches: [pre('consonant')], replace: '্বে' },
  ]},
  { find: 'wi', replace: 'উই', rules: [
    { matches: [pre('consonant')], replace: '্বি' },
  ]},
  { find: 'Wi', replace: 'উই', rules: [
    { matches: [pre('consonant')], replace: '্বি' },
  ]},
  
  // nk, nj, etc. (nasal + stop clusters)
  { find: 'nk', replace: 'ঙ্ক' },
  { find: 'nj', replace: 'ঞ্জ' },
  { find: 'nc', replace: 'ঞ্চ' },
  { find: 'nd', replace: 'ন্দ' },
  { find: 'nt', replace: 'ন্ত' },
  { find: 'nn', replace: 'ন্ন' },
  { find: 'mm', replace: 'ম্ম' },
  { find: 'll', replace: 'ল্ল' },
  { find: 'tt', replace: 'ত্ত' },
  { find: 'dd', replace: 'দ্দ' },
  { find: 'pp', replace: 'প্প' },
  { find: 'kk', replace: 'ক্ক' },
  { find: 'gg', replace: 'গ্গ' },
  { find: 'bb', replace: 'ব্ব' },
  { find: 'ss', replace: 'স্স' },
  
  // Special
  { find: 'nT', replace: 'ণ্ট' },
  { find: 'NT', replace: 'ণ্ট' },
  { find: 'nD', replace: 'ণ্ড' },
  { find: 'ND', replace: 'ণ্ড' },
  { find: 'Sh', replace: 'ষ' },
  { find: 'sn', replace: 'স্ন' },
  { find: 'sp', replace: 'স্প' },
  { find: 'sk', replace: 'স্ক' },
  { find: 'st', replace: 'স্ত' },
  { find: 'sw', replace: 'স্ব' },
  { find: 'sm', replace: 'স্ম' },
  { find: 'sl', replace: 'স্ল' },
  { find: 'sr', replace: 'স্র' },
  
  { find: 'mb', replace: 'ম্ব' },
  { find: 'mp', replace: 'ম্প' },
  { find: 'mn', replace: 'ম্ন' },
  { find: 'ml', replace: 'ম্ল' },
  
  { find: 'kr', replace: 'ক্র' },
  { find: 'gr', replace: 'গ্র' },
  { find: 'tr', replace: 'ত্র' },
  { find: 'dr', replace: 'দ্র' },
  { find: 'pr', replace: 'প্র' },
  { find: 'br', replace: 'ব্র' },
  { find: 'fr', replace: 'ফ্র' },
  { find: 'sr', replace: 'স্র' },
  { find: 'hr', replace: 'হ্র' },
  
  { find: 'kl', replace: 'ক্ল' },
  { find: 'gl', replace: 'গ্ল' },
  { find: 'pl', replace: 'প্ল' },
  { find: 'bl', replace: 'ব্ল' },
  { find: 'fl', replace: 'ফ্ল' },
  
  { find: 'km', replace: 'ক্ম' },
  { find: 'gm', replace: 'গ্ম' },
  { find: 'tm', replace: 'ত্ম' },
  { find: 'dm', replace: 'দ্ম' },
  { find: 'nm', replace: 'ন্ম' },
  { find: 'pm', replace: 'প্ম' },
  { find: 'bm', replace: 'ব্ম' },
  
  { find: 'gn', replace: 'গ্ন' },
  { find: 'tn', replace: 'ত্ন' },
  { find: 'dn', replace: 'দ্ন' },
  { find: 'pn', replace: 'প্ন' },
  { find: 'bn', replace: 'ব্ন' },
  { find: 'hn', replace: 'হ্ন' },
  
  { find: 'db', replace: 'দ্ব' },
  { find: 'tb', replace: 'ত্ব' },
  
  { find: 'nch', replace: 'ঞ্ছ' },
  { find: 'njh', replace: 'ঞ্ঝ' },
  
  // RA fola (consonant + r = consonant + ্র)
  // YA fola (consonant + y = consonant + ্য)
  // ky, gy, ty, dy, etc.
  { find: 'ky', replace: 'ক্য' },
  { find: 'gy', replace: 'গ্য' },
  { find: 'ty', replace: 'ত্য' },
  { find: 'dy', replace: 'দ্য' },
  { find: 'ny', replace: 'ন্য' },
  { find: 'py', replace: 'প্য' },
  { find: 'by', replace: 'ব্য' },
  { find: 'my', replace: 'ম্য' },
  { find: 'sy', replace: 'স্য' },
  { find: 'hy', replace: 'হ্য' },
  { find: 'ry', replace: 'র্য' },
  { find: 'ly', replace: 'ল্য' },
  { find: 'vy', replace: 'ভ্য' },
  { find: 'jy', replace: 'জ্য' },
  
  // === SINGLE CHARACTERS ===
  
  // Vowels  
  { find: 'o', replace: 'অ', rules: [
    { matches: [pre('consonant')], replace: 'ো' },
    { matches: [pre('exact', 'o')], replace: '' }, // double o
  ]},
  { find: 'a', replace: 'আ', rules: [
    { matches: [pre('consonant')], replace: 'া' },
    { matches: [pre('exact', 'a')], replace: '' },
  ]},
  { find: 'i', replace: 'ই', rules: [
    { matches: [pre('consonant')], replace: 'ি' },
    { matches: [pre('exact', 'i')], replace: '' },
  ]},
  { find: 'I', replace: 'ঈ', rules: [
    { matches: [pre('consonant')], replace: 'ী' },
  ]},
  { find: 'u', replace: 'উ', rules: [
    { matches: [pre('consonant')], replace: 'ু' },
    { matches: [pre('exact', 'u')], replace: '' },
  ]},
  { find: 'U', replace: 'ঊ', rules: [
    { matches: [pre('consonant')], replace: 'ূ' },
  ]},
  { find: 'e', replace: 'এ', rules: [
    { matches: [pre('consonant')], replace: 'ে' },
    { matches: [pre('exact', 'e')], replace: '' },
  ]},
  { find: 'O', replace: 'ও', rules: [
    { matches: [pre('consonant')], replace: 'ো' },
  ]},
  { find: 'A', replace: 'আ', rules: [
    { matches: [pre('consonant')], replace: 'া' },
  ]},
  { find: 'E', replace: 'এ', rules: [
    { matches: [pre('consonant')], replace: 'ে' },
  ]},
  
  // Consonants
  { find: 'k', replace: 'ক', rules: [
    { matches: [suf('vowel', undefined, true), suf('punctuation', undefined, true)], replace: 'ক্' },
  ]},
  { find: 'K', replace: 'খ' },
  { find: 'g', replace: 'গ', rules: [
    { matches: [suf('vowel', undefined, true), suf('punctuation', undefined, true)], replace: 'গ্' },
  ]},
  { find: 'G', replace: 'ঘ' },
  { find: 'c', replace: 'চ' },
  { find: 'C', replace: 'ছ' },
  { find: 'j', replace: 'জ' },
  { find: 'J', replace: 'ঝ' },
  { find: 'T', replace: 'ট' },
  { find: 'D', replace: 'ড' },
  { find: 'N', replace: 'ণ' },
  { find: 't', replace: 'ত' },
  { find: 'd', replace: 'দ' },
  { find: 'n', replace: 'ন' },
  { find: 'p', replace: 'প' },
  { find: 'P', replace: 'প' },
  { find: 'f', replace: 'ফ' },
  { find: 'F', replace: 'ফ' },
  { find: 'b', replace: 'ব' },
  { find: 'B', replace: 'ভ' },
  { find: 'v', replace: 'ভ' },
  { find: 'V', replace: 'ভ' },
  { find: 'm', replace: 'ম' },
  { find: 'M', replace: 'ম' },
  { find: 'z', replace: 'য' },
  { find: 'Z', replace: 'য' },
  { find: 'r', replace: 'র' },
  { find: 'l', replace: 'ল' },
  { find: 'L', replace: 'ল' },
  { find: 'S', replace: 'ষ' },
  { find: 's', replace: 'স' },
  { find: 'h', replace: 'হ' },
  { find: 'H', replace: 'হ' },
  { find: 'R', replace: 'ড়' },
  { find: 'y', replace: 'য়', rules: [
    { matches: [pre('punctuation')], replace: 'ইয়' },
  ]},
  { find: 'Y', replace: 'য়' },
  { find: 'w', replace: 'ও', rules: [
    { matches: [pre('consonant')], replace: '্ব' },
  ]},
  { find: 'W', replace: 'ও', rules: [
    { matches: [pre('consonant')], replace: '্ব' },
  ]},
  { find: 'x', replace: 'ক্স' },
  { find: 'X', replace: 'ক্স' },
  { find: 'q', replace: 'ক' },
  { find: 'Q', replace: 'ক' },
  
  // Special symbols & modifiers
  { find: '``', replace: 'ৎ' },
  { find: '`', replace: '' },  // separator to prevent conjuncts
  { find: '~', replace: 'ঁ' },
  { find: '^', replace: 'ঁ' },
  { find: ':', replace: 'ঃ' },
  { find: '.', replace: '।' },
  { find: ',,', replace: '‌' }, // zero-width non-joiner
  
  // Digits
  { find: '0', replace: '০' },
  { find: '1', replace: '১' },
  { find: '2', replace: '২' },
  { find: '3', replace: '৩' },
  { find: '4', replace: '৪' },
  { find: '5', replace: '৫' },
  { find: '6', replace: '৬' },
  { find: '7', replace: '৭' },
  { find: '8', replace: '৮' },
  { find: '9', replace: '৯' },
];

/**
 * Patterns sorted by `find` length descending for longest-match-first matching.
 */
export const SORTED_PATTERNS: PatternEntry[] = [...PATTERNS].sort(
  (a, b) => b.find.length - a.find.length
);
