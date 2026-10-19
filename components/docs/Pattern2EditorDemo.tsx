'use client';

import * as React from 'react';
import { useState } from 'react';
import { BanglaEditor } from '@/components/editor/BanglaEditor';
import { KeyboardMode } from '@/lib/keyboard/types';
import { CodeBlock } from './CodeBlock';
import { Play, Code, Sparkles, Check } from 'lucide-react';

const codeSnippet = `'use client';

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
}`;

export function Pattern2EditorDemo() {
  const [tab, setTab] = useState<'demo' | 'code'>('demo');
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<KeyboardMode>('avro');

  return (
    <div className="flex flex-col rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
      {/* Pattern Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300">
              প্যাটার্ন ২
            </span>
            <h4 className="font-heading font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
              কন্ট্রোল্ড মাল্টিলাইন এডিটর (Controlled Multiline Editor)
            </h4>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body mt-1">
            অ্যাপ্লিকেশনের গ্লোবাল মোড ও ন্যাভিগেশনের সাথে কিবোর্ড মোড সিঙ্ক্রোনাইজ করুন
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
            <Play className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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
          <div className="space-y-4">
            {/* External Mode State Indicator & Quick Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 text-xs font-body">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>বাহ্যিক স্টেট থেকে নিয়ন্ত্রিত মোড: <strong className="font-mono uppercase text-emerald-600 dark:text-emerald-400">{mode}</strong></span>
              </div>

              <div className="flex items-center gap-1.5">
                {(['avro', 'jatiyo', 'english'] as KeyboardMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      mode === m
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-xs'
                        : 'bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* The Controlled Editor */}
            <BanglaEditor
              mode={mode}
              onModeChange={setMode}
              initialValue={content}
              onChange={setContent}
              showModeSelector={true}
              placeholder="এখানে বাংলায় ব্লগ পোস্ট বা দীর্ঘ লেখা লিখুন..."
            />

            {/* External Content Sync Monitor */}
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-body flex items-center justify-between">
              <span>সিঙ্ক মনিটর: {content.length} অক্ষর টাইপ করা হয়েছে</span>
              {content.length > 0 && (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> সিঙ্ক হয়েছে
                </span>
              )}
            </div>
          </div>
        ) : (
          <CodeBlock code={codeSnippet} language="tsx" title="BlogPostWriter.tsx" />
        )}
      </div>
    </div>
  );
}
