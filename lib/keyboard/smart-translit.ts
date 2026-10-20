'use client';

import { toBangla, isBangla, getAvroCandidates } from './avro-phonetic-engine';

/**
 * Only explicit user corrections belong in this cache.
 * Generated transliterations are never persisted as if they were verified words.
 * v5 intentionally ignores the old v4 cache, which was prefilled with dictionary
 * translations and automatic guesses.
 */
const STORAGE_CACHE_KEY = 'banglatype_user_corrections_v5';
const translitCache = new Map<string, string>();
const candidateCache = new Map<string, string[]>();

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_CACHE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        for (const [key, value] of Object.entries(parsed)) {
          const normalizedKey = key.toLowerCase().trim();
          if (normalizedKey && typeof value === 'string' && value.trim()) {
            translitCache.set(normalizedKey, value);
          }
        }
      }
    }
  } catch {
    // Ignore malformed or unavailable local storage.
  }
}

function persistCacheToStorage() {
  if (typeof window === 'undefined') return;
  try {
    const obj: Record<string, string> = {};
    for (const [key, value] of translitCache.entries()) {
      obj[key] = value;
    }
    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(obj));
  } catch {
    // Storage may be unavailable in private browsing or restricted contexts.
  }
}

/** Return a user-saved correction, or null when none exists. */
export function getCachedWord(word: string): string | null {
  if (!word) return null;
  return translitCache.get(word.toLowerCase().trim()) || null;
}

/** Explicitly save a user's chosen transliteration. */
export function setCachedWord(word: string, bangla: string) {
  if (!word.trim() || !bangla.trim()) return;
  const lower = word.toLowerCase().trim();
  translitCache.set(lower, bangla);
  candidateCache.delete(lower);
  persistCacheToStorage();
}

/**
 * Generate suggestions from phonetic rules and spelling variants.
 * No built-in wordlist or dictionary prefix scan is used.
 */
export async function fetchWordSuggestions(rawWord: string): Promise<string[]> {
  const word = rawWord.trim();
  if (!word) return [];
  const lower = word.toLowerCase();

  if (candidateCache.has(lower)) {
    return [...candidateCache.get(lower)!];
  }

  const candidates = getAvroCandidates(word);
  const custom = translitCache.get(lower);
  if (custom) {
    const withoutDuplicate = candidates.filter((candidate) => candidate !== custom);
    withoutDuplicate.unshift(custom);
    candidateCache.set(lower, withoutDuplicate);
    return [...withoutDuplicate];
  }

  candidateCache.set(lower, candidates);
  return [...candidates];
}

/** Convert a word using an explicit correction when available, otherwise phonetic rules. */
export async function fetchSmartWord(rawWord: string): Promise<string> {
  const word = rawWord.trim();
  if (!word) return '';

  const custom = getCachedWord(word);
  if (custom) return custom;

  const suggestions = await fetchWordSuggestions(word);
  return suggestions[0] ?? toBangla(word);
}

export async function smartTransliterateFullText(text: string): Promise<string> {
  if (!text) return '';

  const tokens = text.split(/(\s+|[.,!?;:()\[\]{}'"\-]+)/);

  const convertedTokens = await Promise.all(
    tokens.map(async (token) => {
      if (
        !token ||
        /^\s+$/.test(token) ||
        /^[.,!?;:()\[\]{}'"\-]+$/.test(token) ||
        isBangla(token)
      ) {
        return token;
      }
      return fetchSmartWord(token);
    })
  );

  return convertedTokens.join('');
}
