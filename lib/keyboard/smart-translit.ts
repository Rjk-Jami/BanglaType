'use client';

import {
  toBangla,
  isBangla,
  getAvroCandidates,
} from './avro-phonetic-engine';

const STORAGE_CACHE_KEY = 'banglatype_smart_cache_v5';
const translitCache = new Map<string, string>();
const candidateCache = new Map<string, string[]>();

// Load user customizations from localStorage & clean up obsolete caches
if (typeof window !== 'undefined') {
  try {
    // Clean up older buggy cache keys
    localStorage.removeItem('banglatype_smart_cache_v1');
    localStorage.removeItem('banglatype_smart_cache_v2');
    localStorage.removeItem('banglatype_smart_cache_v3');
    // v4 cached automatic transliterations, not just explicit user corrections.
    localStorage.removeItem('banglatype_smart_cache_v4');

    const saved = localStorage.getItem(STORAGE_CACHE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      for (const [k, v] of Object.entries(parsed)) {
        const lowerKey = k.toLowerCase();
        // Cache contains only explicit user corrections, never generated defaults.
        if (typeof v === 'string') {
          translitCache.set(lowerKey, v);
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
      obj[k] = v;
      count++;
      if (count > 2000) break;
    }
    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(obj));
  } catch {}
}

export function getCachedWord(word: string): string | null {
  if (!word) return null;
  return translitCache.get(word.toLowerCase().trim()) || null;
}

export function setCachedWord(word: string, bangla: string) {
  if (!word || !bangla) return;
  const lower = word.toLowerCase().trim();
  translitCache.set(lower, bangla);
  persistCacheToStorage();
}

/**
 * Fetch candidate suggestions for an in-progress word.
 * 100% Native Avro phonetic intelligence, dictionary prefix matching, and spelling variations.
 */
export async function fetchWordSuggestions(rawWord: string): Promise<string[]> {
  const word = rawWord.trim();
  if (!word) return [];
  const lower = word.toLowerCase();

  // Check cache
  if (candidateCache.has(lower)) {
    return candidateCache.get(lower)!;
  }

  // 1. Get immediate candidates from native phonetic engine & dictionary
  const candidates: string[] = getAvroCandidates(word);

  // If user has a cached custom translation, prioritize it
  const cached = translitCache.get(lower);
  if (cached && !candidates.includes(cached)) {
    candidates.unshift(cached);
  }

  candidateCache.set(lower, candidates);
  return candidates;
}

export async function fetchSmartWord(rawWord: string): Promise<string> {
  const word = rawWord.trim();
  if (!word) return '';

  const lower = word.toLowerCase();
  if (translitCache.has(lower)) {
    return translitCache.get(lower)!;
  }

  const suggestions = await fetchWordSuggestions(word);
  if (suggestions.length > 0) {
    return suggestions[0];
  }

  return toBangla(word);
}

export async function smartTransliterateFullText(text: string): Promise<string> {
  if (!text) return '';

  const tokens = text.split(/(\s+|[.,!?;:()\[\]{}'"\-]+)/);

  const convertedTokens = await Promise.all(
    tokens.map(async (tok) => {
      if (
        !tok ||
        /^\s+$/.test(tok) ||
        /^[.,!?;:()\[\]{}'"\-]+$/.test(tok) ||
        isBangla(tok)
      ) {
        return tok;
      }
      return await fetchSmartWord(tok);
    })
  );

  return convertedTokens.join('');
}
