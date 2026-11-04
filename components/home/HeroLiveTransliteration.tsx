'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, Copy, Check, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { AvroCandidateBar } from '@/components/editor/AvroCandidateBar';
import {
  processAvroKeystroke,
  createInitialAvroState,
  AvroTypingState,
  parseAvroText,
} from '@/lib/keyboard/avro-engine';
import { getAvroCandidates } from '@/lib/keyboard/avro-phonetic-engine';

interface Step {
  text: string;
  caret: number;
  raw: string;
  candidates: string[];
  delay: number;
}

const ANIMATION_STEPS: Step[] = [
  // 1. Amar -> আমার
  { text: 'অ', caret: 1, raw: 'A', candidates: ['আমার', 'অমর', 'আমর'], delay: 130 },
  { text: 'আম', caret: 2, raw: 'Am', candidates: ['আমার', 'অমর', 'আম'], delay: 120 },
  { text: 'আমা', caret: 3, raw: 'Ama', candidates: ['আমার', 'অমর', 'আমা'], delay: 110 },
  { text: 'আমার', caret: 4, raw: 'Amar', candidates: ['আমার', 'অমর', 'আমর'], delay: 240 },
  { text: 'আমার ', caret: 5, raw: '', candidates: [], delay: 190 },

  // 2. sonar -> সোনার
  { text: 'আমার স', caret: 6, raw: 's', candidates: ['সোনার', 'সনার'], delay: 130 },
  { text: 'আমার সো', caret: 7, raw: 'so', candidates: ['সোনার', 'সোনা', 'স'], delay: 120 },
  { text: 'আমার সোন', caret: 8, raw: 'son', candidates: ['সোনার', 'সোনা'], delay: 110 },
  { text: 'আমার সোনা', caret: 9, raw: 'sona', candidates: ['সোনার', 'সোনা'], delay: 110 },
  { text: 'আমার সোনার', caret: 10, raw: 'sonar', candidates: ['সোনার', 'সনার'], delay: 250 },
  { text: 'আমার সোনার ', caret: 11, raw: '', candidates: [], delay: 190 },

  // 3. bangla / bangal -> বাংলা
  { text: 'আমার সোনার ব', caret: 12, raw: 'b', candidates: ['বাংলা', 'বাঙলা'], delay: 130 },
  { text: 'আমার সোনার বা', caret: 13, raw: 'ba', candidates: ['বাংলা', 'বাঙলা'], delay: 110 },
  { text: 'আমার সোনার বান', caret: 14, raw: 'ban', candidates: ['বাংলা', 'বাঙলা'], delay: 110 },
  { text: 'আমার সোনার বাং', caret: 15, raw: 'bang', candidates: ['বাংলা', 'বাঙলা'], delay: 110 },
  { text: 'আমার সোনার বাংল', caret: 16, raw: 'bangl', candidates: ['বাংলা', 'বাঙলা'], delay: 110 },
  { text: 'আমার সোনার বাংলা', caret: 17, raw: 'bangla', candidates: ['বাংলা', 'বাঙলা'], delay: 250 },
  { text: 'আমার সোনার বাংলা ', caret: 18, raw: '', candidates: [], delay: 190 },

  // 4. ami -> আমি
  { text: 'আমার সোনার বাংলা অ', caret: 19, raw: 'a', candidates: ['আমি', 'অমি'], delay: 130 },
  { text: 'আমার সোনার বাংলা আম', caret: 20, raw: 'am', candidates: ['আমি', 'অমি'], delay: 110 },
  { text: 'আমার সোনার বাংলা আমি', caret: 21, raw: 'ami', candidates: ['আমি', 'অমি'], delay: 230 },
  { text: 'আমার সোনার বাংলা আমি ', caret: 22, raw: '', candidates: [], delay: 190 },

  // 5. tomai -> তোমায়
  { text: 'আমার সোনার বাংলা আমি ত', caret: 23, raw: 't', candidates: ['তোমায়', 'তোমাই'], delay: 130 },
  { text: 'আমার সোনার বাংলা আমি তো', caret: 24, raw: 'to', candidates: ['তোমায়', 'তোমাই'], delay: 110 },
  { text: 'আমার সোনার বাংলা আমি তোম', caret: 25, raw: 'tom', candidates: ['তোমায়', 'তোমাই'], delay: 110 },
  { text: 'আমার সোনার বাংলা আমি তোমা', caret: 26, raw: 'toma', candidates: ['তোমায়', 'তোমাই'], delay: 110 },
  { text: 'আমার সোনার বাংলা আমি তোমায়', caret: 27, raw: 'tomai', candidates: ['তোমায়', 'তোমাই'], delay: 250 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ', caret: 28, raw: '', candidates: [], delay: 190 },

  // 6. valobashi -> ভালোবাসি
  { text: 'আমার সোনার বাংলা আমি তোমায় ভ', caret: 29, raw: 'v', candidates: ['ভালোবাসি', 'ভালবাসি'], delay: 130 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ভা', caret: 30, raw: 'va', candidates: ['ভালোবাসি', 'ভালবাসি'], delay: 110 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ভাল', caret: 31, raw: 'val', candidates: ['ভালোবাসি', 'ভালবাসি'], delay: 110 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ভালো', caret: 32, raw: 'valo', candidates: ['ভালোবাসি', 'ভালবাসি'], delay: 110 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ভালোব', caret: 33, raw: 'valob', candidates: ['ভালোবাসি', 'ভালবাসি'], delay: 110 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ভালোবাসা', caret: 34, raw: 'valoba', candidates: ['ভালোবাসি', 'ভালবাসি'], delay: 110 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ভালোবাস', caret: 35, raw: 'valobas', candidates: ['ভালোবাসি', 'ভালবাসি'], delay: 100 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ভালোবাস', caret: 36, raw: 'valobash', candidates: ['ভালোবাসি', 'ভালবাসি'], delay: 100 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ভালোবাসি', caret: 37, raw: 'valobashi', candidates: ['ভালোবাসি', 'ভালবাসি'], delay: 280 },
  { text: 'আমার সোনার বাংলা আমি তোমায় ভালোবাসি', caret: 37, raw: '', candidates: [], delay: 2600 },
];

export function HeroLiveTransliteration() {
  const [copied, setCopied] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [text, setText] = useState('');
  const [activeRaw, setActiveRaw] = useState('');
  const [candidates, setCandidates] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const avroStateRef = useRef<AvroTypingState>(createInitialAvroState());

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText('npm install banglatype');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Continuous live transliteration animation loop
  useEffect(() => {
    if (userInteracted) return;

    let isMounted = true;
    let stepIndex = 0;
    let timer: NodeJS.Timeout | null = null;

    const runStep = () => {
      if (!isMounted || userInteracted) return;

      const currentStep = ANIMATION_STEPS[stepIndex];
      setText(currentStep.text);
      setActiveRaw(currentStep.raw);
      setCandidates(currentStep.candidates);
      setSelectedIndex(0);

      if (textareaRef.current) {
        textareaRef.current.selectionStart = currentStep.caret;
        textareaRef.current.selectionEnd = currentStep.caret;
      }

      stepIndex = (stepIndex + 1) % ANIMATION_STEPS.length;
      timer = setTimeout(runStep, currentStep.delay);
    };

    timer = setTimeout(runStep, 450);

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [userInteracted]);

  const handleUserFocus = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      setActiveRaw('');
      setCandidates([]);
    }
  };

  const handleUserKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setUserInteracted(true);
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Handle suggestion candidate selection with Tab or Enter
    if (candidates.length > 0) {
      if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        const chosen = candidates[selectedIndex] || candidates[0];
        const before = text.slice(0, textarea.selectionStart - avroStateRef.current.lastConvertedLength);
        const after = text.slice(textarea.selectionStart);
        const nextText = before + chosen + after;
        setText(nextText);
        avroStateRef.current = createInitialAvroState();
        setActiveRaw('');
        setCandidates([]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        avroStateRef.current = createInitialAvroState();
        setActiveRaw('');
        setCandidates([]);
        return;
      }
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const res = processAvroKeystroke(e.key, text, start, end, avroStateRef.current);

    if (res.handled) {
      e.preventDefault();
      avroStateRef.current = res.newState;
      setText(res.newText);

      // Caret sync
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = res.newCaret;
          textareaRef.current.selectionEnd = res.newCaret;
        }
      }, 0);

      if (res.newState.rawBuffer) {
        setActiveRaw(res.newState.rawBuffer);
        const suggs = getAvroCandidates(res.newState.rawBuffer);
        setCandidates(suggs.length > 0 ? suggs : [parseAvroText(res.newState.rawBuffer)]);
      } else {
        setActiveRaw('');
        setCandidates([]);
      }
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInteracted(true);
    setText(e.target.value);
  };

  const handleSelectCandidate = (index: number) => {
    const chosen = candidates[index];
    if (!chosen) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const before = text.slice(0, Math.max(0, textarea.selectionStart - avroStateRef.current.lastConvertedLength));
    const after = text.slice(textarea.selectionStart);
    const nextText = before + chosen + ' ' + after;
    setText(nextText);
    avroStateRef.current = createInitialAvroState();
    setActiveRaw('');
    setCandidates([]);
    textarea.focus();
  };

  const handleRestartAnimation = () => {
    setUserInteracted(false);
    setText('');
    setActiveRaw('');
    setCandidates([]);
    avroStateRef.current = createInitialAvroState();
  };

  const hasCandidateBar = Boolean(activeRaw && candidates.length > 0);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-10">
      {/* Left: Short headline, one-line promise, primary action */}
      <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium bg-[#EBF3EF] dark:bg-[#142821] text-[#006A4E] dark:text-[#00A377] border border-[#006A4E]/20">
          <span className="w-2 h-2 rounded-full bg-[#006A4E] dark:bg-[#008763] animate-pulse" />
          <span>Zero dependencies • SSR safe • React 18 & 19</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-[46px] font-bold text-[#14201B] dark:text-[#EDF5F1] leading-[1.25]">
            বাংলা লিখুন, যেকোনো ইনপুটে।
          </h1>
          <p className="font-body text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
            A drop-in Bengali typing engine for React and Next.js developers, with ready components, headless hooks, and server-safe pure functions.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {/* Primary Action: Copy npm install */}
          <button
            onClick={handleCopyInstall}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006A4E] dark:bg-[#008763] text-white font-mono text-xs sm:text-sm font-medium hover:bg-[#00553E] dark:hover:bg-[#00A377] transition-all shadow-xs cursor-pointer active:scale-95"
            title="ইনস্টলেশন কমান্ড কপি করুন"
          >
            <Terminal className="w-4 h-4" />
            <span>npm i banglatype</span>
            {copied ? (
              <Check className="w-4 h-4 ml-1 text-emerald-200" />
            ) : (
              <Copy className="w-4 h-4 ml-1 opacity-70" />
            )}
          </button>

          {/* Secondary Action: Open Docs */}
          <Link
            href="/docs"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#121E19] text-[#14201B] dark:text-[#EDF5F1] border border-[#D9E2DD] dark:border-[#20312B] font-body text-xs sm:text-sm font-semibold hover:border-[#006A4E] dark:hover:border-[#008763] transition-colors shadow-xs"
          >
            <span>ইন্টিগ্রেশন গাইড দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Micro-hint */}
        <p className="text-xs text-zinc-500 font-body">
          ডানদিকের এডিটরে ক্লিক করে সরাসরি বাংলায় লিখে পরীক্ষা করুন।
        </p>
      </div>

      {/* Right: Real working editor with the signature transliteration moment */}
      <div className="lg:col-span-6 w-full relative">
        <div className="relative rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] focus-within:border-[#006A4E] dark:focus-within:border-[#008763] focus-within:ring-2 focus-within:ring-[#006A4E]/15 shadow-sm transition-all overflow-hidden">
          {/* Top subtle bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#D9E2DD] dark:border-[#20312B] bg-[#F4F7F5]/60 dark:bg-[#0C1512]/60 text-xs font-body">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">লাইভ অভ্র ডেমো</span>
              <span className="text-[11px] text-zinc-400 font-mono">(&lt;BanglaEditor /&gt;)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#006A4E] dark:text-[#00A377] font-medium font-body flex items-center gap-1.5">
                {!userInteracted && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006A4E] dark:bg-[#00A377] animate-ping" />
                )}
                {userInteracted ? 'ইউজার টাইপিং মোড' : 'অবিরাম লাইভ অ্যানিমেশন'}
              </span>

              {userInteracted && (
                <button
                  type="button"
                  onClick={handleRestartAnimation}
                  className="inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-[#006A4E] dark:hover:text-[#00A377] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 transition-colors cursor-pointer"
                  title="পুনরায় অটো অ্যানিমেশন চালান"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>রিস্টার্ট</span>
                </button>
              )}
            </div>
          </div>

          {/* Real Caret-Anchored AvroCandidateBar */}
          {hasCandidateBar && (
            <AvroCandidateBar
              targetRef={textareaRef}
              rawWord={activeRaw}
              candidates={candidates}
              selectedIndex={selectedIndex}
              onSelect={handleSelectCandidate}
            />
          )}

          {/* Editor Body */}
          <div className="p-4 sm:p-6 min-h-[220px] flex flex-col justify-between">
            <textarea
              ref={textareaRef}
              value={text}
              onFocus={handleUserFocus}
              onClick={handleUserFocus}
              onChange={handleUserChange}
              onKeyDown={handleUserKeyDown}
              placeholder="এখানে ইংরেজিতে লিখুন (যেমন: Amar sonar bangal ami tomai valobashi)..."
              spellCheck={false}
              className="w-full flex-1 bg-transparent resize-none text-lg sm:text-xl text-[#14201B] dark:text-[#EDF5F1] placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none leading-relaxed font-body"
              rows={4}
            />

            {/* Bottom mini counter */}
            <div className="flex items-center justify-between pt-3 border-t border-[#D9E2DD]/70 dark:border-[#20312B]/70 text-xs font-body text-zinc-500">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#006A4E] dark:text-[#008763]" />
                <span>ফোনেটিক ক্যারেট ট্রান্সলিটারেশন</span>
              </div>
              <span className="font-mono text-[11px] text-zinc-400">
                {text.length} অক্ষর
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
