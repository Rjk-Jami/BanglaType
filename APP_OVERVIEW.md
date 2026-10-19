# BanglaType — Application UI & Architecture Documentation

> **A modern, lightweight, production-ready, library-first web application and component library for writing Bangla with Avro Phonetic, Jatiyo keyboard layout, and English.**

---

## 1. Executive Summary

**BanglaType** is a modern web application and reusable component library designed to make Bengali typing seamless, fast, and accessible directly in the browser without installing external software. Built with **Next.js 16 (Turbopack)**, **React 19**, **TypeScript 5**, and **Tailwind CSS v4**, it features:

- **Zero-Boilerplate Drop-in Components**: `<BanglaInput />` and `<BanglaEditor />` work out of the box with zero configuration.
- **Dual-Engine Typing**: Seamless Avro Phonetic transliteration and physical Jatiyo (Bijoy) keyboard mapping.
- **Dynamic Caret-Anchored Suggestions**: High-precision DOM mirror algorithm positioning suggestions directly at the cursor in real time.
- **Clean Headless Hooks**: `useBanglaInput` and `useBanglaEditor` for integrating into existing design systems, forms, or custom UI elements.
- **Harmonious Typography**: Dual Google Fonts pairing **Anek Bangla** for headings and **Hind Siliguri** for body text.

---

## 2. User Interface Architecture

The application layout is organized into focused visual sections:

```text
┌─────────────────────────────────────────────────────────────┐
│ Navbar: Brand Wordmark (BanglaType), GitHub Repository Link │
├─────────────────────────────────────────────────────────────┤
│ Hero Section: Heading (Anek Bangla) & Subtitle (Hind Siliguri)│
├─────────────────────────────────────────────────────────────┤
│ Global Mode Control: Segmented Pill (Avro | Jatiyo | EN)    │
│ Contextual Helper Badge (live pattern hints)                │
├─────────────────────────────────────────────────────────────┤
│ Single-Line Input Showcase (<BanglaInput />):               │
│  ├── Built-in Caret-Anchored Avro Suggestions               │
│  ├── Copy to Clipboard & One-Click Clear                    │
│  └── Ideal for Search bars, Forms, Chat inputs              │
├─────────────────────────────────────────────────────────────┤
│ Multiline Editor Showcase (<BanglaEditor />):               │
│  ├── Responsive Controlled Textarea (Hind Siliguri)         │
│  ├── Portaled Floating Avro Candidate Bar (Z-Index 9999)    │
│  ├── Live Word, Character & Line Count Metrics              │
│  └── Editor Actions: Convert English to Bangla, Copy, Clear │
├─────────────────────────────────────────────────────────────┤
│ Footer: Brand information & Credits                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Core Features & Capabilities

### 3.1. Keyboard Input Modes

Users can switch between three distinct input modes:

| Mode | Label | Identifier | Description |
| :--- | :--- | :--- | :--- |
| **Avro Phonetic** | `অভ্র (Avro)` | `avro` | Types phonetically in Latin characters and converts them in real time into Bengali (e.g., `amar` → `আমার`, `bangla` → `বাংলা`). |
| **Jatiyo / Bijoy** | `জাতীয় (Jatiyo)` | `jatiyo` | Physical Bengali layout where QWERTY keys map directly to specific Bengali characters and matras (e.g., `d` → `ি`, `g` → `্`). |
| **English** | `English (EN)` | `english` | Standard QWERTY pass-through without transliteration. |

---

### 3.2. Caret-Anchored Transliteration Suggestion Bar

When typing in **Avro Phonetic** mode, an intelligent floating candidate bar dynamically tracks the text caret:

- **Viewport-Relative DOM Mirroring**: Automatically calculates the exact `(top, left)` coordinate of the text caret for both multiline `<textarea>` and single-line `<input>` fields using a high-precision DOM mirror algorithm (`getCaretCoordinates`).
- **React Portal Stacking (Z-Index 9999)**: Rendered into `document.body` via React Portals, ensuring suggestions always float above cards, headers, and modal stacking contexts without clipping by `overflow: hidden` parents.
- **Dynamic Boundary Flipping**:
  - Preferentially renders directly above the caret.
  - Automatically flips **below the caret** when space above is constrained near viewport boundaries or the top navigation bar.
- **Fluid Keyboard Navigation**:
  - <kbd>Tab</kbd>: Cycles forward to the next candidate option.
  - <kbd>Shift</kbd> + <kbd>Tab</kbd>: Cycles backward to the previous candidate option.
  - <kbd>Enter</kbd>: Inserts and confirms the currently highlighted candidate.
  - <kbd>Space</kbd>: Inserts the candidate and appends a trailing space.
  - <kbd>Escape</kbd>: Dismisses suggestions.
  - **Click / Tap**: Immediately selects any candidate pill with active touch support.
- **Horizontal Overflow Scroll**: Automatically scrolls the active candidate pill into view if suggestions exceed the bar's width.

---

### 3.3. Main Bangla Editor (`<BanglaEditor />`)

- **Typography**: Uses **Hind Siliguri** for body text with fallbacks to *Noto Sans Bengali*, *SolaimanLipi*, and *Kalpurush*.
- **Real-Time Word & Character Statistics**:
  - Live counter display tracking total characters, words, and line count with accessible `role="status"` markup.
- **Editor Actions**:
  - **Copy Button**: Copies formatted text to clipboard with instant visual checkmark feedback and a 2-second auto-reset.
  - **Clear Button**: Resets editor content with an accessible confirmation dialog.
  - **Convert Button**: Parses and converts existing English text in the editor into phonetic Bangla using the smart transliteration pipeline.

---

### 3.4. Single-Line Input (`<BanglaInput />`)

Demonstrates how the Avro transliteration engine integrates into single-line form inputs:
- Built-in Avro transliteration and caret-anchored suggestions.
- Built-in copy-to-clipboard and clear-field actions.
- Fully compatible with standard React form inputs, React Hook Form, and Tailwind CSS.

---

## 4. UI Design System & Component Library

All reusable primitives adhere to a unified design token system:

### 4.1. Centralized Primitives (`components/ui/`)

| Component | File | Description & Capabilities |
| :--- | :--- | :--- |
| **`Button`** | [`button.tsx`](file:///d:/comeBack/2026/banglatype/components/ui/button.tsx) | Canonical button supporting 10 variants (`default`, `primary`, `emerald`, `emerald-soft`, `secondary`, `outline`, `ghost`, `destructive`, `destructive-outline`, `link`), 8 sizes, loading spinner, and icon slots. |
| **`Input`** | [`input.tsx`](file:///d:/comeBack/2026/banglatype/components/ui/input.tsx) | Accessible single-line input with glassmorphism backdrop and focus rings. |
| **`Badge`** | [`badge.tsx`](file:///d:/comeBack/2026/banglatype/components/ui/badge.tsx) | Status and tag pills (`default`, `emerald`, `blue`, `secondary`, `outline`, `destructive`). |
| **`Card`** | [`card.tsx`](file:///d:/comeBack/2026/banglatype/components/ui/card.tsx) | Compound layout cards (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`). |
| **`GlassModal`** | [`GlassModal.tsx`](file:///d:/comeBack/2026/banglatype/components/ui/GlassModal.tsx) | High-elevation frosted glass modal container. |

---

## 5. Typography Standards

The project strictly follows Bengali typography best practices:

- **Headings**: **Anek Bangla** (`--font-heading`), modern geometric variable font.
- **Body Text**: **Hind Siliguri** (`--font-body`), high-legibility font with clean conjuncts.
- **Rules for Bangla Text**:
  - Minimum body line-height of `1.5` (or `leading-relaxed`).
  - No negative letter spacing (`tracking-tight` prohibited on Bangla to prevent broken conjuncts).
  - No CSS `uppercase` on Bangla glyphs.
  - Self-hosted via Next.js Google Fonts (`next/font/google`) with zero external CDN calls.

---

## 6. Library Export Barrels

The project can be consumed as an application or imported as a component library via standard TypeScript entry points:

- **Root Barrel**: [`index.ts`](file:///d:/comeBack/2026/banglatype/index.ts)
- **UI Primitives**: [`components/ui/index.ts`](file:///d:/comeBack/2026/banglatype/components/ui/index.ts)
- **Hooks**: [`hooks/index.ts`](file:///d:/comeBack/2026/banglatype/hooks/index.ts)
- **Typing Engine & Utilities**: [`lib/index.ts`](file:///d:/comeBack/2026/banglatype/lib/index.ts)

---

## 7. Accessibility & Keyboard Shortcuts Summary

| Key / Action | Context | Result |
| :--- | :--- | :--- |
| <kbd>Tab</kbd> | Suggestion Dropdown Open | Cycle to next suggestion option |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Suggestion Dropdown Open | Cycle to previous suggestion option |
| <kbd>Enter</kbd> | Suggestion Dropdown Open | Confirm and insert highlighted suggestion |
| <kbd>Space</kbd> | Suggestion Dropdown Open | Confirm highlighted suggestion + append space |
| <kbd>Escape</kbd> | Suggestion Dropdown Open | Dismiss suggestion box |
| <kbd>ArrowDown</kbd> / <kbd>ArrowRight</kbd> | Suggestion Dropdown Open | Navigate to next candidate |
| <kbd>ArrowUp</kbd> / <kbd>ArrowLeft</kbd> | Suggestion Dropdown Open | Navigate to previous candidate |
| <kbd>Ctrl</kbd> + <kbd>A</kbd> | Textarea / Input | Select all text without ghost characters |
| <kbd>Backspace</kbd> | Textarea with selection | Clears selection cleanly |
