# Dictionary-free phonetic conversion

The default Avro conversion path on the `crossplatform` branch uses the phonetic pattern engine rather than requiring every word to exist in `BUILTIN_DICTIONARY`.

## Runtime behavior

- `parseAvroText(text)` / `convertToBangla(text)` use the phonetic parser and candidate generation.
- `toBangla(text)` defaults to dictionary-free conversion.
- `parse(text, { dictionary: true })` remains available for explicit legacy compatibility.
- `parse(text, { dictionary: customDictionary })` can still opt into an explicitly supplied dictionary.
- `setCachedWord(word, bangla)` stores an explicit user correction. Generated results are no longer automatically persisted as learned words.
- Smart-transliteration cache storage uses a new version so stale automatically generated values from v4 do not silently override rule-based output.

## Candidate generation

The engine produces a primary phonetic parse and additional candidates for common phonetic variations (including case-sensitive retroflex letters, s/sh, and ending-o alternatives). This is rule-driven; it does not scan a built-in wordlist for exact or prefix matches.

## Known limitation

Phonetic input can be ambiguous. A dictionary-free engine can convert unseen words using rules, but it cannot always infer the intended spelling when multiple Bangla words share the same phonetic input. Candidate selection and context can help, but are not a guarantee of perfect lexical disambiguation.

## Regression checks before release

Compare outputs with a verified Avro reference for common words, capitalization, punctuation, digits, conjuncts, and text edited in the middle of a word. Do not invent expected outputs: capture them from the reference implementation.
