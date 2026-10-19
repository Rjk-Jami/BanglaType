'use client';

import * as React from 'react';
import { useState } from 'react';
import { BanglaInput } from '@/components/editor/BanglaInput';
import { CodeBlock } from './CodeBlock';
import { Send, CheckCircle2, Play, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const codeSnippet = `'use client';

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
}`;

export function Pattern1FormDemo() {
  const [tab, setTab] = useState<'demo' | 'code'>('demo');
  const [authorName, setAuthorName] = useState('');
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedName(authorName || 'নাম খালি ছিল');
    setTimeout(() => setSubmittedName(null), 4000);
  };

  return (
    <div className="flex flex-col rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
      {/* Pattern Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
              প্যাটার্ন ১
            </span>
            <h4 className="font-heading font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
              কন্ট্রোল্ড ফর্ম ইনপুট (Controlled Form Input)
            </h4>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body mt-1">
            React Hook Form বা সাধারণ state এর সাথে সরাসরি প্লাগ করুন
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
            <Play className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
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

      {/* Tab Contents */}
      <div className="p-5 sm:p-6">
        {tab === 'demo' ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-body">
                আপনার নাম (যেমন: rohim → রহিম)
              </label>
              <BanglaInput
                initialValue={authorName}
                onValueChange={setAuthorName}
                placeholder="নাম লিখুন (যেমন: rohim → রহিম)..."
              />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" variant="emerald" size="sm">
                <Send className="w-3.5 h-3.5" />
                <span>জমা দিন (Submit Form)</span>
              </Button>

              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-body">
                লাইভ স্টেট ভ্যালু: <code className="font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{authorName || '""'}</code>
              </span>
            </div>

            {submittedName !== null && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-body">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ফর্ম সফলভাবে সাবমিট হয়েছে! সাবমিটেড টেক্সট: <strong>&ldquo;{submittedName}&rdquo;</strong></span>
              </div>
            )}
          </form>
        ) : (
          <CodeBlock code={codeSnippet} language="tsx" title="CommentForm.tsx" />
        )}
      </div>
    </div>
  );
}
