# Cross-platform browser input

BanglaType uses the browser's native `input` and `textarea` elements. It does not render or control the operating system's on-screen keyboard.

## Input handling strategy

- Desktop physical keyboards continue to use the existing `keydown` path.
- The input hooks also inspect the smallest edit between the previous controlled value and the new native input value. This is a fallback for mobile browser input paths that do not provide a usable key event.
- The fallback transforms only a single ASCII character insertion in Avro or Jatiyo mode.
- Multi-character edits, deletion, autocorrect, paste, and non-ASCII text are preserved as native edits. Active Avro state and suggestions are reset when those edits invalidate the current phonetic buffer.
- Intermediate IME composition is not transliterated.

## Mode behavior

### English

Input is passed through without transliteration or Jatiyo mapping.

### Avro

Single-character native input is sent through the same Avro keystroke engine used by the desktop path. Caret position and candidate suggestions are updated from the engine result.

### Jatiyo

Single-character native input is mapped using the existing Jatiyo layout. On mobile, this assumes the native keyboard emits the expected Latin key value. Keyboard layouts, autocorrect, and OS-level text composition can vary, so exact behavior must be verified on each supported browser and keyboard.

## Verification checklist

Before declaring a browser/platform combination supported, test with its real native keyboard:

- Android Chrome with Gboard
- iOS Safari with the default iOS keyboard
- macOS Safari and a Chromium browser
- Windows/Linux desktop Chromium and Firefox

For each environment, test all modes, typing at the beginning/middle/end, selection replacement, backspace/delete, word boundaries, paste, autocorrect, composition, and mode switching.

Desktop emulation is not a substitute for testing native mobile keyboard behavior. Record the exact device, OS, browser, and keyboard used for verification.
