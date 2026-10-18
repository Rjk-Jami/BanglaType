export const JATIYO_DEFAULT_MAP: Record<string, string> = {
  // Digits
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
  '0': '০',

  // Row 1 (QWERTY)
  'q': 'ঙ',
  'w': 'য',
  'e': 'ড',
  'r': 'প',
  't': 'ট',
  'y': 'চ',
  'u': 'জ',
  'i': 'হ',
  'o': 'গ',
  'p': 'ড়',

  // Row 2 (ASDF)
  'a': 'ৃ',
  's': 'ু',
  'd': 'ি',
  'f': 'ব',
  'g': '্', // Hasant / Virama
  'h': 'া',
  'j': 'ক',
  'k': 'ত',
  'l': 'দ',

  // Row 3 (ZXCV)
  'z': 'ঁ',
  'x': 'ো',
  'c': 'ে',
  'v': 'র',
  'b': 'ন',
  'n': 'স',
  'm': 'ম',
};

export const JATIYO_SHIFT_MAP: Record<string, string> = {
  // Row 1 (QWERTY shifted)
  'Q': 'ং',
  'W': 'য়',
  'E': 'ঢ',
  'R': 'ফ',
  'T': 'ঠ',
  'Y': 'ছ',
  'U': 'ঝ',
  'I': 'ঞ',
  'O': 'ঘ',
  'P': 'ঢ়',

  // Row 2 (ASDF shifted)
  'A': 'ৗ',
  'S': 'ূ',
  'D': 'ী',
  'F': 'ভ',
  'G': '৷',
  'H': 'অ',
  'J': 'খ',
  'K': 'থ',
  'L': 'ধ',

  // Row 3 (ZXCV shifted)
  'Z': 'ঃ',
  'X': 'ৌ',
  'C': 'ৈ',
  'V': 'ল',
  'B': 'ণ',
  'N': 'ষ',
  'M': 'শ',
};

export const JATIYO_ALT_MAP: Record<string, string> = {
  // Currency & numbers
  '1': '৴',
  '2': '৵',
  '3': '৶',
  '4': '৳',
  '5': '৷',
  '6': '৸',
  '7': '৹',
  '0': '৽',

  // Letters
  'q': '৽',
  'w': '্য', // Ja-fala
  'e': 'ৄ',
  'a': 'ঋ',
  's': 'উ',
  'd': 'ই',
  'f': 'ৰ',
  'g': '৷',
  'h': 'আ',
  'j': 'ক্ষ',
  'k': 'ৎ',
  'l': 'ঌ',
  'z': '৺',
  'x': 'ও',
  'c': 'এ',
  'v': '্র', // Ra-fala
  '.': '়', // Nukta
};

export const JATIYO_SHIFT_ALT_MAP: Record<string, string> = {
  '4': '৲',
  'q': 'ৡ',
  'a': 'ৠ',
  's': 'ঊ',
  'd': 'ঈ',
  'f': 'ৱ',
  'l': 'ৡ',
  'x': 'ঔ',
  'c': 'ঐ',
  'v': 'র্', // Reph
};

/**
 * Resolves a physical keyboard event to its corresponding Jatiyo character.
 * Handles Shift, AltGr (or Ctrl+Alt), and combinations.
 */
export function getJatiyoChar(e: {
  key: string;
  shiftKey: boolean;
  altKey: boolean;
  ctrlKey: boolean;
}): string | null {
  // Do not intercept browser/system shortcuts (e.g. Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+Z, Meta/Cmd)
  if (e.ctrlKey && !e.altKey) {
    return null;
  }

  const isAltGr = (e.ctrlKey && e.altKey) || e.altKey;
  const keyLower = e.key.toLowerCase();

  if (isAltGr) {
    if (e.shiftKey) {
      return JATIYO_SHIFT_ALT_MAP[keyLower] || JATIYO_SHIFT_ALT_MAP[e.key] || null;
    }
    return JATIYO_ALT_MAP[keyLower] || JATIYO_ALT_MAP[e.key] || null;
  }

  if (e.shiftKey) {
    return JATIYO_SHIFT_MAP[e.key] || null;
  }

  return JATIYO_DEFAULT_MAP[e.key] || null;
}
