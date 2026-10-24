# BanglaType (বাংলা টাইপ)

<p align="center">
  <strong>Production-ready, zero-dependency Bengali typing engine, UI components, and headless hooks for React, Next.js, Vite, Remix, and Node.js.</strong>
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

- [Features](#features)
- [Cross-Platform Browser Input](#cross-platform-browser-input)
- [Installation (Using as a Library)](#installation-using-as-a-library)
  - [Peer Dependencies](#peer-dependencies)
- [Quick Start: 1-Line Drop-in Components](#quick-start-1-line-drop-in-components)
  - [A. Single-Line Input (`<BanglaInput />`)](#a-single-line-input-banglainput-)
  - [B. Full Multiline Workspace (`<BanglaEditor />`)](#b-full-multiline-workspace-banglaeditor-)
- [Integration Patterns](#integration-patterns)
  - [Pattern 1: Controlled Form Input](#pattern-1-controlled-form-input)
  - [Pattern 2: Controlled Multiline Editor with External Mode State](#pattern-2-controlled-multiline-editor-with-external-mode-state)
  - [Pattern 3: Headless Single-Line Input (`useBanglaInput`)](#pattern-3-headless-single-line-input-usebanglainput)
  - [Pattern 4: Headless Textarea Hook (`useBanglaEditor`)](#pattern-4-headless-textarea-hook-usebanglaeditor)
  - [Pattern 5: Pure Functions for Backend, Node.js & CLI](#pattern-5-pure-functions-for-backend-nodejs--cli)
- [Typography & Bengali Rendering Checklist](#typography--bengali-rendering-checklist)
- [Keyboard Navigation & Shortcuts](#keyboard-navigation--shortcuts)
- [Local Development & Repository Setup](#local-development--repository-setup)
- [Subpath Imports & Tree Shaking](#subpath-imports--tree-shaking)
- [API Reference](#api-reference)
- [License](#license)

---

## Features

- **Avro Phonetic Typing**: Instant transliteration (`ami banglay gan gai` → `আমি বাংলায় গান গাই`).
- **Jatiyo Keyboard Layout**: Standard National Bengali keyboard mapping with physical keystroke interception and Virama (`্`) conjunct creation.
- **Caret-Anchored Suggestions**: High-precision floating candidate bar portaled cleanly above the typing cursor without layout shifts.
- **Headless Hooks**: `useBanglaInput` and `useBanglaEditor` let you bring your own custom UI (Shadcn UI, Radix, MUI, Chakra, Tailwind).
- **Pure Algorithms**: Zero-DOM transliteration functions (`parseAvroText`, `smartTransliterateFullText`, `getJatiyoChar`, `fetchWordSuggestions`) for backend API routes, CLIs, or server runtimes.
- **Zero Runtime Dependencies**: Ultra-lightweight bundle without bloated third-party keyboard scripts.
- **React 18 & 19 Ready**: Server-Side Rendering (SSR) safe and Next.js App Router compatible.

---

## Installation (Using as a Library)

Install `banglatype` into your existing React, Next.js, Vite, Remix, or Node.js project:

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
`banglatype` is compatible with both React 18 and React 19:
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
Ideal for search bars, comment fields, and short inputs. Provides automatic phonetic transliteration, candidate suggestions, inline clear, and clipboard copy:

```tsx
import { BanglaInput } from 'banglatype';

export default function SearchBar() {
  return (
    <BanglaInput 
      placeholder="বাংলায় খুঁজুন (যেমন: khobor → খবর)..." 
    />
  );
}
```

### B. Full Multiline Workspace (`<BanglaEditor />`)
A complete glassmorphic workspace with mode switching (Avro / Jatiyo / English), live character and word counters, clipboard copy, and full-text transliteration:

```tsx
import { BanglaEditor } from 'banglatype';

export default function NoteEditor() {
  return (
    <BanglaEditor 
      placeholder="এখানে বাংলায় বিস্তারিত লিখুন..." 
    />
  );
}
```

---

## Integration Patterns

### Pattern 1: Controlled Form Input
Plug directly into standard React state, React Hook Form, or Formik:

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
      <button type="submit" className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg">
        জমা দিন
      </button>
    </form>
  );
}
```

---

### Pattern 2: Controlled Multiline Editor with External Mode State
Synchronize keyboard mode with your application's global navigation or state:

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

### Pattern 3: Headless Single-Line Input (`useBanglaInput`)
Attach full Avro intelligence to your own custom input markup (such as Shadcn UI):

```tsx
'use client';

import { useBanglaInput, AvroCandidateBar } from 'banglatype';

export function CustomSearchBox() {
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
    <div className="relative w-full max-w-sm">
      {/* Floating Suggestions Portaled Above Caret */}
      {hasCandidateBar && (
        <AvroCandidateBar
          targetRef={inputRef}
          rawWord={activeRaw}
          candidates={candidates}
          selectedIndex={selectedCandidateIndex}
          onSelect={selectCandidate}
        />
      )}

      {/* Your Own Custom Input */}
      <input
        ref={inputRef}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="খুঁজুন..."
        className="w-full px-4 py-2 border rounded-xl shadow-sm"
      />
    </div>
  );
}
```

---

### Pattern 4: Headless Textarea Hook (`useBanglaEditor`)
Build customized document editors, chatboxes, or CMS fields with your own styling:

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
    <div className="flex flex-col border rounded-2xl p-4 bg-white shadow-sm">
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
        className="w-full resize-none outline-none leading-relaxed"
        placeholder="ami banglay gan gai..."
      />

      <div className="flex justify-between items-center pt-2 border-t text-xs text-zinc-500">
        <span>{stats.words} শব্দ • {stats.characters} অক্ষর</span>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 bg-zinc-900 text-white rounded-md"
        >
          {copied ? 'কপি হয়েছে' : 'কপি করুন'}
        </button>
      </div>
    </div>
  );
}
```

---

### Pattern 5: Pure Functions for Backend, Node.js & CLI
Use pure algorithms in API routes, serverless functions, or CLI scripts without loading React:

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

// 2. Dictionary-free full-text phonetic transliteration
const accurateBangla = await smartTransliterateFullText('ami bangladeshke bhalobashi');
console.log(accurateBangla); // "আমি বাংলাদেশকে ভালোবাসি"

// 3. Physical QWERTY-to-Jatiyo keyboard keystroke conversion
const char = getJatiyoChar({ key: 'd', shiftKey: false });
console.log(char); // "ি"

// 4. Generate phonetic candidates for a word
const candidates = await fetchWordSuggestions('shadhinota');
console.log(candidates); // ["স্বাধীনতা", "স্বাধীনতার", ...]
```

---

## Dictionary-Free Phonetic Conversion

The default Avro conversion path uses phonetic rules and spelling-variant candidates; it does not require adding each new word to a built-in wordlist. User corrections are optional and stored separately from generated conversions.

- `parseAvroText(text)` uses phonetic rules by default.
- `fetchWordSuggestions(word)` generates candidates from the phonetic engine and spelling variants; it does not scan built-in dictionary prefixes.
- `setCachedWord(raw, bangla)` is optional and intended for an explicit user correction, not for seeding a required wordlist.
- Legacy dictionary-based parsing remains available only when explicitly requested through `parse(text, { dictionary: true })` or by passing a custom dictionary.

Dictionary-free conversion cannot always resolve homophones or ambiguous spellings. Candidate quality and compatibility must be checked against verified Avro reference outputs before claiming full Avro equivalence.

---

## Cross-Platform Browser Input

BanglaType uses native browser inputs; it does not render a separate on-screen keyboard. Its input hooks support both desktop keyboard events and native text changes, which is important because mobile browsers do not always expose the same keyboard events as desktop browsers.

See [Cross-Platform Input Notes](docs/cross-platform-input.md) for the input strategy and real-device verification checklist.

**Compatibility note:** desktop behavior and native mobile keyboard behavior must be verified separately. In particular, Jatiyo mapping depends on the key values exposed by the native keyboard and may vary with keyboard layout, autocorrect, and composition behavior.

---

## Typography & Bengali Rendering Checklist

To guarantee crisp conjuncts (যুক্তাক্ষর) like `ক্ষ`, `ন্ত`, `স্ত্র` and prevent font clipping in your app:

1. **Load Google Fonts**: Use **Anek Bangla** for headings and **Hind Siliguri** for body text.
   ```tsx
   // Next.js App Router (app/layout.tsx)
   import { Anek_Bangla, Hind_Siliguri } from 'next/font/google';

   const anek = Anek_Bangla({ subsets: ['bengali', 'latin'], variable: '--font-anek', display: 'swap' });
   const hind = Hind_Siliguri({ subsets: ['bengali', 'latin'], weight: ['400', '500', '600', '700'], variable: '--font-hind', display: 'swap' });
   ```
2. **Body Line-Height**: Set line-height to at least `1.5` (`line-height: 1.625` / Tailwind `leading-relaxed`) to prevent matra clipping.
3. **No Negative Tracking**: Avoid `tracking-tight` on Bengali text; negative letter spacing breaks complex conjunct ligatures.
4. **No Uppercase**: Bengali has no uppercase characters; CSS `uppercase` causes glyph deformation.
5. **Form Font Inheritance**:
   ```css
   input, textarea, button, select {
     font-family: inherit;
   }
   ```

---

## Keyboard Navigation & Shortcuts

| Key / Action | Context | Result |
| :--- | :--- | :--- |
| <kbd>Tab</kbd> | Suggestion Dropdown Open | Commit the currently highlighted candidate |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Suggestion Dropdown Open | Commit the currently highlighted candidate; focus does not move to an off-screen option |
| <kbd>Enter</kbd> | Suggestion Dropdown Open | Confirm and insert highlighted suggestion |
| <kbd>Space</kbd> | Suggestion Dropdown Open | Confirm suggestion and insert trailing space |
| <kbd>Escape</kbd> | Suggestion Dropdown Open | Dismiss candidate suggestion dropdown |
| <kbd>ArrowDown</kbd> / <kbd>ArrowRight</kbd> | Suggestion Dropdown Open | Navigate to next candidate |
| <kbd>ArrowUp</kbd> / <kbd>ArrowLeft</kbd> | Suggestion Dropdown Open | Navigate to previous candidate |
| <kbd>Ctrl</kbd> + <kbd>A</kbd> | Textarea / Input | Select all text without ghost characters |
| <kbd>g</kbd> (in Jatiyo mode) | Textarea / Input | Inserts Hasant (`্`) for joining conjunct characters |

---

## Local Development & Repository Setup

To run this repository locally, including the interactive Studio and Documentation Showcase:

### 1. Clone the repository:
```bash
git clone https://github.com/Rjk-Jami/BanglaType.git
cd BanglaType
```

### 2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Start development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the Interactive Studio, or [http://localhost:3000/docs](http://localhost:3000/docs) for the visual Library Integration Guide.

### 4. Build for production:
```bash
npm run build
```

### 5. Start production server:
```bash
npm start
```

---

## Subpath Imports & Tree Shaking

For lightweight bundles, you can import only the specific modules you need:

```ts
// 1. Full bundle (All-in-one)
import { BanglaInput, BanglaEditor } from 'banglatype';

// 2. UI Primitives only (Buttons, Badges, Modals)
import { Button, Badge, Card } from 'banglatype/ui';

// 3. Headless hooks only (No UI dependencies)
import { useBanglaInput, useBanglaEditor } from 'banglatype/hooks';

// 4. Pure typing engine & algorithms only (Node.js & server safe)
import { parseAvroText, getJatiyoChar } from 'banglatype/lib';
```

---

## API Reference

### `<BanglaInput />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'avro' \| 'jatiyo' \| 'english'` | `'avro'` | Active keyboard mode |
| `placeholder` | `string` | `'এক লাইনে বাংলায় লিখুন...'` | Input placeholder |
| `initialValue` | `string` | `''` | Initial text value |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback fired on every text change |
| `showCopy` | `boolean` | `true` | Show inline copy to clipboard button |
| `showClear` | `boolean` | `true` | Show inline clear button when text is present |
| `className` | `string` | `''` | Extra CSS container classes |

### `<BanglaEditor />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'avro' \| 'jatiyo' \| 'english'` | `'avro'` | Controlled keyboard mode |
| `onModeChange` | `(mode: KeyboardMode) => void` | `undefined` | Callback when mode changes |
| `initialValue` | `string` | `''` | Initial text content |
| `onChange` | `(value: string) => void` | `undefined` | Callback on text change |
| `placeholder` | `string` | `undefined` | Custom textarea placeholder |
| `showModeSelector`| `boolean` | `true` | Render top segmented mode pill |
| `className` | `string` | `''` | Extra CSS container classes |

---

## License

MIT © [Rjk-Jami](https://github.com/Rjk-Jami/BanglaType)
