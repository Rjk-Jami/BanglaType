'use client';

import { useState } from 'react';
import Link from 'next/link';
import { KeyboardMode } from '@/lib/keyboard/types';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BanglaEditor } from '@/components/editor/BanglaEditor';
import { BanglaInput } from '@/components/editor/BanglaInput';
import { KeyboardModeSelector } from '@/components/keyboard/KeyboardModeSelector';
import { Badge } from '@/components/ui/badge';
import { TextCursorInput, FileText, Sparkles, Info } from 'lucide-react';

export default function Home() {
  const [mode, setMode] = useState<KeyboardMode>('avro');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-zinc-50 via-zinc-100/60 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950">
      {/* Ambient background decoration */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar />

      {/* Main Workspace Showcase */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-20 pb-16 w-full max-w-5xl mx-auto">
        <div className="w-full flex flex-col gap-6">
          
          {/* Hero Section */}
          <div className="text-center pt-2 pb-4 sm:pt-4 sm:pb-6 space-y-3 select-none flex flex-col items-center">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-body font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all shadow-xs group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>লাইব্রেরি ইন্টিগ্রেশন গাইড ও ৫টি লাইভ ডেমো দেখুন</span>
              <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform font-bold">→</span>
            </Link>

            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50">
              বাংলা লিখুন, যেকোনো ইনপুটে।
            </h1>
            <p className="font-body text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              অভ্র ফোনেটিক ও জাতীয় কিবোর্ড মোডে সহজেই ব্রাউজারে বাংলা টাইপ করুন।
            </p>
          </div>

          {/* 1. Global Mode Switcher Header Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/60 dark:border-zinc-800/80 shadow-lg ring-1 ring-black/5 dark:ring-white/5">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <KeyboardModeSelector mode={mode} onModeChange={setMode} />
            </div>

            {/* Contextual Mode Badge */}
            <div className="flex items-center gap-2 text-xs font-body">
              {mode === 'avro' && (
                <Badge variant="emerald" size="sm" className="text-[11px] font-normal py-1 px-3 font-body">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>অভ্র ফোনেটিক মোড (যেমন: ami banglay likhi → আমি বাংলায় লিখি)</span>
                </Badge>
              )}
              {mode === 'jatiyo' && (
                <Badge variant="blue" size="sm" className="text-[11px] font-normal py-1 px-3 font-body">
                  <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>জাতীয় কীবোর্ড মোড (যুক্তবর্ণের জন্য &apos;্&apos; (g) চাপুন)</span>
                </Badge>
              )}
              {mode === 'english' && (
                <Badge variant="secondary" size="sm" className="text-[11px] font-normal py-1 px-3 font-body">
                  <span>ইংরেজি মোড সক্রিয়</span>
                </Badge>
              )}
            </div>
          </div>

          {/* 2. Single-Line Input Showcase Card */}
          <div className="flex flex-col gap-3 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-xl ring-1 ring-black/5 dark:ring-white/5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-2 font-body">
                <TextCursorInput className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-heading text-sm text-zinc-800 dark:text-zinc-200">ইনপুট ফিল্ড (Single-line Input Component)</span>
              </label>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-body">
                সার্চবার বা ফর্ম ফিল্ডের জন্য
              </span>
            </div>

            {/* The Reusable BanglaInput Component */}
            <BanglaInput
              mode={mode}
              placeholder="এক লাইনে বাংলায় লিখুন (যেমন: amar nam → আমার নাম)..."
            />
          </div>

          {/* 3. Multiline Textarea Editor Showcase Card (The Full BanglaEditor Component) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-2 font-body">
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-heading text-sm text-zinc-800 dark:text-zinc-200">টেক্সট এরিয়া এডিটর (Multiline BanglaEditor Component)</span>
              </label>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-body">
                বড় টেক্সট ও প্রবন্ধ লেখার জন্য
              </span>
            </div>

            {/* The Preserved, Clean BanglaEditor Component */}
            <BanglaEditor
              mode={mode}
              onModeChange={setMode}
              showModeSelector={false}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
