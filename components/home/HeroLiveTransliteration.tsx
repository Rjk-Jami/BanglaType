'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, Copy, Check, ArrowRight, Sparkles, CornerDownLeft } from 'lucide-react';
import { parseAvroText } from '@/lib/keyboard/avro-engine';

const DEMO_KEYS = [
  'a', 'm', 'i', ' ',
  'b', 'a', 'n', 'g', 'l', 'a', 'y', ' ',
  'g', 'a', 'n', ' ',
  'g', 'a', 'i',
];

export function HeroLiveTransliteration() {
  const [copied, setCopied] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [text, setText] = useState('');
  const [currentBuffer, setCurrentBuffer] = useState('');
  const [activeCandidates, setActiveCandidates] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText('npm install banglatype');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Typed-in animation for initial load (signature live transliteration moment)
  useEffect(() => {
    if (userInteracted) return;

    let keyIndex = 0;
    let accumulatedText = '';
    let buffer = '';
    let timer: NodeJS.Timeout | null = null;

    const step = () => {
      if (userInteracted || keyIndex >= DEMO_KEYS.length) return;

      const char = DEMO_KEYS[keyIndex];
      keyIndex++;

      if (char === ' ') {
        if (buffer) {
          const parsed = parseAvroText(buffer);
          accumulatedText += (accumulatedText ? ' ' : '') + parsed;
          buffer = '';
          setCurrentBuffer('');
          setActiveCandidates([]);
        } else {
          accumulatedText += ' ';
        }
      } else {
        buffer += char;
        setCurrentBuffer(buffer);
        const parsed = parseAvroText(buffer);
        setActiveCandidates([parsed, buffer]);
      }

      setText(accumulatedText + (buffer ? (accumulatedText ? ' ' : '') + buffer : ''));

      const delay = char === ' ' ? 280 : 110 + Math.random() * 40;
      timer = setTimeout(step, delay);
    };

    timer = setTimeout(step, 600);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [userInteracted]);

  const handleUserFocus = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      setActiveCandidates([]);
      setCurrentBuffer('');
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInteracted(true);
    setText(e.target.value);
  };

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

          {/* Secondary Action: Open Studio / Docs */}
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
      <div className="lg:col-span-6 w-full">
        <div className="relative rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] focus-within:border-[#006A4E] dark:focus-within:border-[#008763] focus-within:ring-2 focus-within:ring-[#006A4E]/15 shadow-sm transition-all overflow-hidden">
          {/* Top subtle bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#D9E2DD] dark:border-[#20312B] bg-[#F4F7F5]/60 dark:bg-[#0C1512]/60 text-xs font-body">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">লাইভ অভ্র ডেমো</span>
              <span className="text-[11px] text-zinc-400 font-mono">(&lt;BanglaEditor /&gt;)</span>
            </div>
            <span className="text-[11px] text-[#006A4E] dark:text-[#00A377] font-medium font-body">
              {userInteracted ? 'ইউজার টাইপিং মোড' : 'স্বয়ংক্রিয় প্রিভিউ'}
            </span>
          </div>

          {/* Candidate Bar Simulation during demo */}
          {activeCandidates.length > 0 && currentBuffer && (
            <div className="absolute top-14 left-6 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#121E19] border border-[#006A4E]/40 dark:border-[#008763]/50 shadow-md">
              <span className="text-[11px] font-mono text-[#006A4E] dark:text-[#00A377] font-bold">
                {currentBuffer}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <div className="flex items-center gap-1">
                {activeCandidates.map((cand, idx) => (
                  <span
                    key={cand}
                    className={`px-2 py-0.5 rounded-full text-[16px] font-body leading-tight ${
                      idx === 0
                        ? 'bg-[#006A4E] text-white font-semibold'
                        : 'text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    {cand}
                    {idx === 0 && <CornerDownLeft className="inline w-2.5 h-2.5 ml-1 text-white/90" />}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Editor Body */}
          <div className="p-4 sm:p-6 min-h-[220px] flex flex-col justify-between">
            <textarea
              ref={textareaRef}
              value={text}
              onFocus={handleUserFocus}
              onClick={handleUserFocus}
              onChange={handleUserChange}
              placeholder="এখানে ইংরেজিতে লিখুন (যেমন: ami banglay likhi → আমি বাংলায় লিখি)..."
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
