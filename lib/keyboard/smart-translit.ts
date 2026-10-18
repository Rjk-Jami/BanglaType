'use client';

import { toBangla, isBangla, BUILTIN_DICTIONARY } from './avro-phonetic-engine';

const STORAGE_CACHE_KEY = 'banglatype_smart_cache_v2';
const translitCache = new Map<string, string>();

for (const [key, val] of Object.entries(BUILTIN_DICTIONARY)) {
  translitCache.set(key.toLowerCase(), val);
}

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_CACHE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'string') {
          translitCache.set(k.toLowerCase(), v);
        }
      }
    }
  } catch {}
}

function persistCacheToStorage() {
  if (typeof window === 'undefined') return;
  try {
    const obj: Record<string, string> = {};
    let count = 0;
    for (const [k, v] of translitCache.entries()) {
      if (!Object.hasOwn(BUILTIN_DICTIONARY, k)) {
        obj[k] = v;
        count++;
        if (count > 2000) break;
      }
    }
    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(obj));
  } catch {}
}

export function getCachedWord(word: string): string | null {
  if (!word) return null;
  return translitCache.get(word.toLowerCase().trim()) || null;
}

export async function fetchSmartWord(rawWord: string): Promise<string> {
  const word = rawWord.trim();
  if (!word) return '';

  const lower = word.toLowerCase();

  if (translitCache.has(lower)) {
    return translitCache.get(lower)!;
  }

  try {
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(
      word
    )}&itc=bn-t-i0-und&num=3`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (
        data &&
        data[0] === 'SUCCESS' &&
        data[1] &&
        data[1][0] &&
        Array.isArray(data[1][0][1]) &&
        data[1][0][1].length > 0
      ) {
        const bestMatch: string = data[1][0][1][0];
        translitCache.set(lower, bestMatch);
        persistCacheToStorage();
        return bestMatch;
      }
    }
  } catch {}

  const fallback = toBangla(word);
  translitCache.set(lower, fallback);
  return fallback;
}

export async function smartTransliterateFullText(text: string): Promise<string> {
  if (!text) return '';

  const tokens = text.split(/(\s+|[.,!?;:()\[\]{}'"\-]+)/);

  const convertedTokens = await Promise.all(
    tokens.map(async (tok) => {
      if (!tok || /^\s+$/.test(tok) || /^[.,!?;:()\[\]{}'"\-]+$/.test(tok) || isBangla(tok)) {
        return tok;
      }
      return await fetchSmartWord(tok);
    })
  );

  return convertedTokens.join('');
}
