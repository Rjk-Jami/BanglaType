# BanglaType (বাংলা টাইপ)

<p align="center">
  <strong>A drop-in Bengali typing engine for React and Next.js developers, with ready components, headless hooks, and server-safe pure functions.</strong>
</p>

<p align="center">
  <a href="#installation"><img src="https://img.shields.io/badge/npm-v0.1.0-emerald?style=flat-square" alt="npm version" /></a>
  <a href="#peer-dependencies"><img src="https://img.shields.io/badge/React-18_%7C_19-blue?style=flat-square" alt="React 18 and 19 Support" /></a>
  <a href="#features"><img src="https://img.shields.io/badge/TypeScript-Strict%20TypeSafe-3178C6?style=flat-square" alt="TypeScript" /></a>
  <a href="#features"><img src="https://img.shields.io/badge/Next.js-15_%7C_16_App_Router-black?style=flat-square" alt="Next.js" /></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License" /></a>
</p>

---

## Table of Contents

- [Overview & Design Philosophy](#overview--design-philosophy)
- [Key Features](#key-features)
- [Installation](#installation)
  - [Peer Dependencies](#peer-dependencies)
- [Quick Start: 1-Line Drop-in Components](#quick-start-1-line-drop-in-components)
  - [A. Single-Line Input (`<BanglaInput />`)](#a-single-line-input-banglainput-)
  - [B. Multiline Workspace (`<BanglaEditor />`)](#b-multiline-workspace-banglaeditor-)
- [Integration Patterns](#integration-patterns)
  - [Pattern 1: Controlled Form Input](#pattern-1-controlled-form-input)
  - [Pattern 2: Controlled Multiline Editor with External Mode State](#pattern-2-controlled-multiline-editor-with-external-mode-state)
  - [Pattern 3: "Bring Your Own UI" Headless Input (`useBanglaInput`)](#pattern-3-bring-your-own-ui-headless-input-usebanglainput)
  - [Pattern 4: Headless Textarea Hook (`useBanglaEditor`)](#pattern-4-headless-textarea-hook-usebanglaeditor)
  - [Pattern 5: Pure Engine Functions for Backend, Node.js & CLI](#pattern-5-pure-engine-functions-for-backend-nodejs--cli)
- [Subpath Imports & Modular Architecture](#subpath-imports--modular-architecture)
- [Typography & Bengali Rules Checklist](#typography--bengali-rules-checklist)
- [Keyboard Navigation & Shortcuts](#keyboard-navigation--shortcuts)
- [Honest Limits & Dictionary-Free Engine](#honest-limits--dictionary-free-engine)
- [Cross-Platform Input Considerations](#cross-platform-input-considerations)
- [API Reference](#api-reference)
- [Local Development Setup](#local-development-setup)
- [License](#license)

---

## Overview & Design Philosophy

BanglaType is engineered around **the live transliteration moment**: Latin keystrokes turning into Bengali directly at the caret, accompanied by a compact, high-precision candidate bar floating directly above the typing cursor without layout shifts.

- **Calm, Precise, Typographic**: Built like a well-crafted reading tool rather than a noisy dev-tool landing page.
- **Design Tokens**:
  - `--ink`: `#14201B` (Text)
  - `--paper`: `#F4F7F5` (Cool page surface)
  - `--surface`: `#FFFFFF` (Panels and editors)
  - `--line`: `#D9E2DD` (Subtle 1px borders)
  - `--green`: `#006A4E` (Primary accent: Bangladesh flag green)
  - `--red`: `#E5334B` (Rare accent)
  - **Dark mode**: Deep green-black background (`#0C1512`), surface (`#121E19`), border (`#20312B`), and `#008763` green accent.
- **Code-Split & Modular**: Cleanly organized into independent components and hooks, optimized for Turbopack, Partial Prefetching, and Server-Side Rendering (SSR).

---

## Key Features

- **Avro Phonetic Typing**: Live phonetics (`ami banglay gan gai` → `আমি বাংলায় গান গাই`).
- **Jatiyo Keyboard Layout**: Physical keystroke interception with Virama (`্` via <kbd>g</kbd>) for accurate conjuncts (যুক্তাক্ষর).
- **Caret-Anchored Suggestions**: Compact suggestion pill (`AvroCandidateBar`) portaled directly above the active caret, displaying the raw token, numbered candidate options, and keyboard shortcuts (`Tab`, `↵`, `Esc`).
- **Headless Flexibility**: `useBanglaInput` and `useBanglaEditor` allow complete freedom to style your own inputs (Shadcn UI, Radix, Tailwind, MUI, Chakra).
- **Bangla Numeral Counters**: Live word, character, and line counters in Bengali digits (`০১২৩৪৫৬৭৮৯`) with an instant toggle for English numerals (`123`).
- **Zero Runtime Dependencies**: Ultra-lightweight bundle without third-party keyboard bloat.
- **React 18 & 19 Ready**: Full SSR compatibility with zero hydration mismatch.

---

## Installation

Install `banglatype` into your project:

### Using npm:
```bash
npm install banglatype
```

### Using pnpm:
```bash
pnpm add banglatype
```

### Using yarn:
```bash
yarn add banglatype
```

### Using bun:
```bash
bun add banglatype
```

### Peer Dependencies
BanglaType works out of the box with React 18 and React 19:
```json
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

---

## Quick Start: 1-Line Drop-in Components

### A. Single-Line Input (`<BanglaInput />`)
Ideal for search bars, comment fields, and short forms. Includes phonetic transliteration, candidate dropdown, clear button, and clipboard copy:

```tsx
import { BanglaInput } from 'banglatype';

export default function SearchBar() {
  return (
    <BanglaInput 
      placeholder="বাংলায় খুঁজুন (যেমন: khobor → খবর)..." 
    />
  );
}
```

### B. Multiline Workspace (`<BanglaEditor />`)
A full-featured editor with mode switching (Avro / Jatiyo / English), live character and word counters in Bangla numerals, copy to clipboard, clear confirmation, and full-text conversion:

```tsx
import { BanglaEditor } from 'banglatype';

export default function NoteEditor() {
  return (
    <BanglaEditor 
      placeholder="এখানে বাংলায় বিস্তারিত লিখুন..." 
    />
  );
}
```

---

## Integration Patterns

### Pattern 1: Controlled Form Input
Seamlessly integrates with React state, React Hook Form, or Formik:

```tsx
'use client';

import { useState } from 'react';
import { BanglaInput } from 'banglatype';

export function CommentForm() {
  const [authorName, setAuthorName] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log(authorName); }}>
      <label className="block text-sm font-medium mb-1">আপনার নাম</label>
      <BanglaInput
        initialValue={authorName}
        onValueChange={setAuthorName}
        placeholder="যেমন: rohim → রহিম"
        className="max-w-md"
      />
      <button type="submit" className="mt-3 px-4 py-2 bg-[#006A4E] text-white rounded-lg">
        জমা দিন
      </button>
    </form>
  );
}
```

---

### Pattern 2: Controlled Multiline Editor with External Mode State
Synchronize keyboard mode with external navigation, radio groups, or global application state:

```tsx
'use client';

import { useState } from 'react';
import { BanglaEditor, KeyboardMode } from 'banglatype';

export function BlogPostWriter() {
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<KeyboardMode>('avro');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">নতুন পোস্ট লিখুন</h2>
        <span className="text-xs text-zinc-500">বর্তমান মোড: {mode}</span>
      </div>

      <BanglaEditor
        mode={mode}
        onModeChange={setMode}
        initialValue={content}
        onChange={setContent}
        showModeSelector={true}
      />
    </div>
  );
}
```

---

### Pattern 3: "Bring Your Own UI" Headless Input (`useBanglaInput`)
The headless `useBanglaInput` hook lets you power completely different interface skins with identical typing intelligence:

```tsx
'use client';

import { useBanglaInput, AvroCandidateBar } from 'banglatype';
import { Search } from 'lucide-react';

export function CustomSearchPill() {
  const {
    value,
    inputRef,
    handleKeyDown,
    handleChange,
    handleBlur,
    candidates,
    activeRaw,
    selectedCandidateIndex,
    selectCandidate,
    hasCandidateBar,
  } = useBanglaInput({ mode: 'avro' });

  return (
    <div className="relative w-full max-w-md">
      {/* Caret-Anchored Suggestions */}
      {hasCandidateBar && (
        <AvroCandidateBar
          targetRef={inputRef}
          rawWord={activeRaw}
          candidates={candidates}
          selectedIndex={selectedCandidateIndex}
          onSelect={selectCandidate}
        />
      )}

      {/* Custom Search Pill UI */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3" />
        <input
          ref={inputRef}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="বাংলায় অনুসন্ধান করুন..."
          className="w-full pl-9 pr-4 py-2 border rounded-full bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E]/30"
        />
      </div>
    </div>
  );
}
```

---

### Pattern 4: Headless Textarea Hook (`useBanglaEditor`)
Build customized document editors, chat composers, or CMS rich fields:

```tsx
'use client';

import { useBanglaEditor, AvroCandidateBar } from 'banglatype';

export function MinimalTextarea() {
  const {
    text,
    textareaRef,
    stats,
    handleKeyDown,
    handleChange,
    handleBlur,
    copyToClipboard,
    copied,
    candidates,
    activeRaw,
    selectedCandidateIndex,
    selectCandidate,
    hasCandidateBar,
  } = useBanglaEditor({ mode: 'avro' });

  return (
    <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 bg-white dark:bg-zinc-900">
      {hasCandidateBar && (
        <AvroCandidateBar
          targetRef={textareaRef}
          rawWord={activeRaw}
          candidates={candidates}
          selectedIndex={selectedCandidateIndex}
          onSelect={selectCandidate}
        />
      )}

      <textarea
        ref={textareaRef}
        value={text}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={5}
        className="w-full resize-none outline-none leading-relaxed bg-transparent"
        placeholder="ami banglay gan gai..."
      />

      <div className="flex justify-between items-center pt-3 border-t text-xs text-zinc-500">
        <span>{stats.words} শব্দ • {stats.characters} অক্ষর</span>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 bg-[#006A4E] text-white rounded-lg"
        >
          {copied ? 'কপি হয়েছে' : 'কপি করুন'}
        </button>
      </div>
    </div>
  );
}
```

---

### Pattern 5: Pure Engine Functions for Backend, Node.js & CLI
Run pure algorithms in server actions, API routes, workers, or command-line scripts without loading React:

```ts
import {
  parseAvroText,
  smartTransliterateFullText,
  getJatiyoChar,
  fetchWordSuggestions,
} from 'banglatype';

// 1. Instant synchronous phonetic transliteration
const bangla = parseAvroText('amar sonar bangla');
console.log(bangla); // "আমার সোনার বাংলা"

// 2. Full-text phonetic transliteration
const accurateBangla = await smartTransliterateFullText('ami bangladeshke bhalobashi');
console.log(accurateBangla); // "আমি বাংলাদেশকে ভালোবাসি"

// 3. Physical QWERTY-to-Jatiyo keystroke conversion
const char = getJatiyoChar({ key: 'd', shiftKey: false });
console.log(char); // "ি"

// 4. Generate phonetic candidates for an input word
const candidates = await fetchWordSuggestions('shadhinota');
console.log(candidates); // ["স্বাধীনতা", "স্বাধীনতার", ...]
```

---

## Subpath Imports & Modular Architecture

For optimal tree-shaking, import only the modules you need:

```ts
// 1. Main all-in-one package
import { BanglaInput, BanglaEditor } from 'banglatype';

// 2. UI Primitives only (Buttons, Badges, Modals, CandidateBar)
import { Button, Badge, Card, AvroCandidateBar } from 'banglatype/ui';

// 3. Headless Hooks only (Zero UI dependencies)
import { useBanglaInput, useBanglaEditor } from 'banglatype/hooks';

// 4. Pure typing engine & algorithms only (Node.js, Edge, Server Components)
import { parseAvroText, getJatiyoChar } from 'banglatype/lib';
```

---

## Typography & Bengali Rules Checklist

To ensure proper rendering of complex conjuncts (যুক্তাক্ষর) like `ক্ষ`, `ন্ত`, `স্ত্র`:

1. **Google Fonts Setup**: Use **Anek Bangla** for headings and **Hind Siliguri** for body text.
   ```tsx
   // Next.js App Router (app/layout.tsx)
   import { Anek_Bangla, Hind_Siliguri } from 'next/font/google';

   export const anek = Anek_Bangla({ subsets: ['bengali', 'latin'], variable: '--font-anek', display: 'swap' });
   export const hind = Hind_Siliguri({ subsets: ['bengali', 'latin'], weight: ['400', '500', '600', '700'], variable: '--font-hind', display: 'swap' });
   ```
2. **Body Line-Height**: Set line-height to at least `1.6` (`leading-relaxed`) to prevent upper and lower matra clipping.
3. **No Negative Tracking**: Never use `tracking-tight` on Bengali text; negative letter spacing breaks font ligatures.
4. **No CSS Uppercase**: Bengali has no capital letters; CSS `uppercase` causes glyph deformation.
5. **Form Font Inheritance**: Always ensure form controls inherit the Bengali font family:
   ```css
   input, textarea, button, select {
     font-family: inherit;
     text-transform: none !important;
   }
   ```

---

## Keyboard Navigation & Shortcuts

| Keycap | Context | Action |
| :--- | :--- | :--- |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Candidate Bar Open | Cycle between suggestion candidates |
| <kbd>Enter</kbd> | Candidate Bar Open | Commit highlighted suggestion |
| <kbd>1</kbd> &ndash; <kbd>7</kbd> | Candidate Bar Open | Directly select numbered candidate |
| <kbd>Esc</kbd> | Candidate Bar Open | Dismiss candidate bar and keep Latin buffer |
| <kbd>Space</kbd> | Input / Textarea | Transliterate and commit active phonetic word |
| <kbd>Backspace</kbd> | Input / Textarea | Undo character or revert candidate selection |
| <kbd>g</kbd> | Jatiyo Mode | Virama / Hasanta (`্`) for joining conjunct characters |
| <kbd>Shift</kbd> + <kbd>Key</kbd> | Jatiyo Mode | Access upper Bengali character |

---

## Honest Limits & Dictionary-Free Engine

BanglaType operates on pure algorithmic phonetic rules without shipping bloated multi-megabyte dictionaries:

- **Homophones & Ambiguities**: Letters with similar sounds (যেমন: শ/ষ/স, ণ/ন, ই/ঈ) cannot always be guessed unequivocally without context. The candidate bar allows the user to select the preferred spelling.
- **Custom Corrections**: Use `setCachedWord(raw, bangla)` to persist user-preferred spellings in the client cache without altering the library core.
- **Mobile Soft Keyboards**: Virtual keyboards on iOS and Android trigger input events differently than physical desktop keyboards. Always test custom hooks on real mobile devices.

---

## Cross-Platform Input Considerations

BanglaType relies on native browser DOM events rather than rendering a synthetic on-screen keyboard. Its hooks support both physical keyboard events and native `input` mutations to ensure reliable composition across desktop and mobile devices.

See [Cross-Platform Input Notes](docs/cross-platform-input.md) for detailed guidelines.

---

## API Reference

### `<BanglaInput />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'avro' \| 'jatiyo' \| 'english'` | `'avro'` | Active keyboard mode |
| `placeholder` | `string` | `'এক লাইনে বাংলায় লিখুন...'` | Placeholder text |
| `initialValue` | `string` | `''` | Initial text value |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback fired on text change |
| `showCopy` | `boolean` | `true` | Show inline copy button |
| `showClear` | `boolean` | `true` | Show inline clear button |
| `className` | `string` | `''` | Container class name |

### `<BanglaEditor />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'avro' \| 'jatiyo' \| 'english'` | `'avro'` | Controlled keyboard mode |
| `onModeChange` | `(mode: KeyboardMode) => void` | `undefined` | Mode change listener |
| `initialValue` | `string` | `''` | Initial text content |
| `onChange` | `(value: string) => void` | `undefined` | Text change listener |
| `placeholder` | `string` | `undefined` | Textarea placeholder |
| `showModeSelector`| `boolean` | `true` | Render mode segmented control |
| `className` | `string` | `''` | Container class name |

---

## Local Development Setup

To run the repository locally, including the interactive Studio and Documentation Showcase:

```bash
# 1. Clone repository
git clone https://github.com/Rjk-Jami/BanglaType.git
cd BanglaType

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Run tests
npm run test:avro

# 5. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) for the Interactive Studio, or [http://localhost:3000/docs](http://localhost:3000/docs) for the visual Library Integration Guide.

---

## License

MIT © [Rjk-Jami](https://github.com/Rjk-Jami/BanglaType)
