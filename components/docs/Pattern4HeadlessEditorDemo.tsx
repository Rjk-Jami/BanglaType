'use client';

import * as React from 'react';
import { useState } from 'react';
import { useBanglaEditor } from '@/hooks/useBanglaEditor';
import { AvroCandidateBar } from '@/components/editor/AvroCandidateBar';
import { CodeBlock } from './CodeBlock';
import { Play, Code, Check, Copy, Trash2 } from 'lucide-react';

const codeSnippet = `'use client';

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
}`;

export function Pattern4HeadlessEditorDemo() {
  const [tab, setTab] = useState<'demo' | 'code'>('demo');

  const {
    text,
    textareaRef,
    stats,
    handleKeyDown,
    handleChange,
    handleBlur,
    copyToClipboard,
    copied,
    clearText,
    candidates,
    activeRaw,
    selectedCandidateIndex,
    selectCandidate,
    hasCandidateBar,
  } = useBanglaEditor({ mode: 'avro' });

  return (
    <div className="flex flex-col rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
              প্যাটার্ন ৪
            </span>
            <h4 className="font-heading font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
              হেডলেস টেক্সটএরিয়া হুক (Headless Textarea Hook)
            </h4>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body mt-1">
            কাস্টম CMS, চ্যাটবক্স বা ডকুমেন্ট এডিটরের জন্য সম্পূর্ণ লজিক এবং স্টেট হুক
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
            <Play className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
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
          <div className="space-y-4 max-w-2xl">
            {/* Custom Headless Textarea Box */}
            <div className="flex flex-col border-2 border-amber-500/30 focus-within:border-amber-500 rounded-2xl p-4 bg-zinc-50/70 dark:bg-zinc-950/70 shadow-sm transition-all">
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
                rows={4}
                className="w-full resize-none outline-none leading-relaxed bg-transparent font-body text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                placeholder="ami banglay gan gai, ami banglar gan gai... (টাইপ করে দেখুন)"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs font-body text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <span>{stats.words} শব্দ</span>
                  <span>•</span>
                  <span>{stats.characters} অক্ষর</span>
                  <span>•</span>
                  <span>{stats.lines} লাইন</span>
                </div>

                <div className="flex items-center gap-2">
                  {text && (
                    <button
                      onClick={clearText}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>মুছুন</span>
                    </button>
                  )}
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <CodeBlock code={codeSnippet} language="tsx" title="MinimalTextarea.tsx" />
        )}
      </div>
    </div>
  );
}
