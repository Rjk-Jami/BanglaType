'use client';

import * as React from 'react';
import { useState } from 'react';
import { useBanglaInput } from '@/hooks/useBanglaInput';
import { AvroCandidateBar } from '@/components/editor/AvroCandidateBar';
import { CodeBlock } from './CodeBlock';
import { Search, Play, Code, X, Sparkles } from 'lucide-react';

const codeSnippet = `'use client';

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
        className="w-full px-4 py-2 border rounded-xl shadow-xs"
      />
    </div>
  );
}`;

export function Pattern3HeadlessInputDemo() {
  const [tab, setTab] = useState<'demo' | 'code'>('demo');

  const {
    value,
    inputRef,
    handleKeyDown,
    handleChange,
    handleBlur,
    clearValue,
    candidates,
    activeRaw,
    selectedCandidateIndex,
    selectCandidate,
    hasCandidateBar,
  } = useBanglaInput({ mode: 'avro' });

  return (
    <div className="flex flex-col rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300">
              প্যাটার্ন ৩
            </span>
            <h4 className="font-heading font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
              হেডলেস সিঙ্গেল-লাইন ইনপুট হুক (Headless Single-Line Hook)
            </h4>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body mt-1">
            <code className="font-mono text-purple-600 dark:text-purple-400">useBanglaInput()</code> হুক ব্যবহার করে আপনার নিজস্ব Shadcn UI বা কাস্টম সার্চবক্সে Avro যুক্ত করুন
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center p-1 bg-zinc-200/60 dark:bg-zinc-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setTab('demo')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-body font-medium transition-colors cursor-pointer ${
              tab === 'demo'
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>লাইভ ডেমো</span>
          </button>
          <button
            onClick={() => setTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-body font-medium transition-colors cursor-pointer ${
              tab === 'code'
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>কোড</span>
          </button>
        </div>
      </div>

      {/* Contents */}
      <div className="p-5 sm:p-6">
        {tab === 'demo' ? (
          <div className="space-y-4 max-w-lg">
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-body">
              নিচের সার্চবারটি সম্পূর্ণ কাস্টম স্টাইল্ড—কোনো রেডিমেড র‍্যাপার ছাড়াই শুধু <code className="font-mono text-zinc-800 dark:text-zinc-200">useBanglaInput</code> দিয়ে তৈরি:
            </div>

            {/* Custom Search Box Styled Element */}
            <div className="relative w-full">
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

              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
                <input
                  ref={inputRef}
                  value={value}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="পণ্য বা খবর খুঁজুন (যেমন: boi, kolam, khobor)..."
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border-2 border-purple-500/30 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm font-body text-zinc-900 dark:text-zinc-100 shadow-sm"
                />
                {value && (
                  <button
                    onClick={clearValue}
                    className="absolute right-3 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="ক্লিয়ার করুন"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-body">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>অ্যাক্টিভ বাফার: <strong className="font-mono text-purple-600 dark:text-purple-400">{activeRaw || 'কোনোটি নেই'}</strong></span>
              </span>
              <span>পরামর্শ সংখ্যা: {candidates.length}</span>
            </div>
          </div>
        ) : (
          <CodeBlock code={codeSnippet} language="tsx" title="CustomSearchBox.tsx" />
        )}
      </div>
    </div>
  );
}
