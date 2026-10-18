export type KeyboardMode = 'english' | 'jatiyo' | 'avro';

export type NavTab = 'writer' | 'guide' | 'dictionary';

export type KeyboardLayer = 'unshifted' | 'altgr';

export interface EditorStats {
  characters: number;
  words: number;
  lines: number;
}

export interface KeyCap {
  code: string;
  label?: string;
  width?: string;
  // Unshifted / Shifted values
  unshifted?: string;
  shifted?: string;
  // AltGr / AltGr+Shift values
  alt?: string;
  shiftAlt?: string;
  isSpecial?: boolean;
}

export interface PhoneticRule {
  id: string;
  category: 'vowel' | 'consonant' | 'conjunct' | 'digit';
  english: string;
  bangla: string;
  exampleEng?: string;
  exampleBan?: string;
}

export interface DictionaryEntry {
  word: string;
  phonetic: string;
  meaning: string;
  partOfSpeech: string;
  example?: string;
}
