'use client';

import * as React from 'react';
import { Type, CheckCircle2, AlertTriangle, Cpu, Layers, XCircle } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { SubpathImportsDiagram } from './SubpathImportsDiagram';

const fontsCodeSnippet = `// app/layout.tsx (Next.js App Router)
import { Anek_Bangla, Hind_Siliguri } from 'next/font/google';

const anek = Anek_Bangla({
  subsets: ['bengali', 'latin'],
  variable: '--font-anek',
  display: 'swap',
});

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
});`;

export function TypographyAndBestPractices() {
  return (
    <div className="flex flex-col gap-8">
      {/* 4.A Typography Visual Before/After Pitfalls Checklist */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#006A4E]/10 dark:bg-[#008763]/20 text-[#006A4E] dark:text-[#00A377] flex items-center justify-center">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-[#14201B] dark:text-[#EDF5F1]">
              বাংলা টাইপোগ্রাফির ৪টি বিপজ্জনক ভুল ও সমাধান (Before / After Checklist)
            </h3>
            <p className="text-xs text-zinc-500 font-body">
              বাস্তব যুক্তাক্ষর (যেমন: ক্ষ, ন্ত, স্ত্র) দিয়ে ভিজ্যুয়াল ডেমো
            </p>
          </div>
        </div>

        {/* 4 Paired Renders (Before vs After) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pitfall 1: Line Height */}
          <div className="p-4 rounded-xl border border-[#D9E2DD] dark:border-[#20312B] bg-[#F4F7F5]/50 dark:bg-[#0C1512]/50 space-y-2">
            <span className="text-xs font-heading font-bold text-zinc-700 dark:text-zinc-300">
              ১. লাইন-হাইট (Line-height) মাত্রা ক্লিপিং
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Bad */}
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-400">
                  <XCircle className="w-3.5 h-3.5" /> খারাপ (leading-none)
                </span>
                <div className="font-body text-base leading-none overflow-hidden h-5 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black/40 px-1.5 py-0.5 rounded border border-rose-200/60">
                  ক্ষমা শান্ত স্ত্রৈণ
                </div>
                <p className="text-[10px] text-rose-600 dark:text-rose-400">হ্রস্বকার/মাত্রা কাটা পড়ে</p>
              </div>

              {/* Good */}
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006A4E] dark:text-[#00A377]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> সঠিক (leading-relaxed)
                </span>
                <div className="font-body text-base leading-relaxed text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black/40 px-1.5 py-0.5 rounded border border-emerald-200/60">
                  ক্ষমা শান্ত স্ত্রৈণ
                </div>
                <p className="text-[10px] text-[#006A4E] dark:text-[#00A377]">মাত্রা পূর্ণাঙ্গ ও স্পষ্ট</p>
              </div>
            </div>
          </div>

          {/* Pitfall 2: Tracking (Letter Spacing) */}
          <div className="p-4 rounded-xl border border-[#D9E2DD] dark:border-[#20312B] bg-[#F4F7F5]/50 dark:bg-[#0C1512]/50 space-y-2">
            <span className="text-xs font-heading font-bold text-zinc-700 dark:text-zinc-300">
              ২. নেগেটিভ ট্র্যাকিং (Letter Spacing)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Bad */}
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-400">
                  <XCircle className="w-3.5 h-3.5" /> খারাপ (tracking-tight)
                </span>
                <div className="font-body text-base tracking-[-0.08em] text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black/40 px-1.5 py-0.5 rounded border border-rose-200/60">
                  শাস্ত্র শিক্ষক দৃষ্টান্ত
                </div>
                <p className="text-[10px] text-rose-600 dark:text-rose-400">যুক্তবর্ণের গ্লিফ ভেঙে যায়</p>
              </div>

              {/* Good */}
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006A4E] dark:text-[#00A377]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> সঠিক (tracking-normal)
                </span>
                <div className="font-body text-base tracking-normal text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black/40 px-1.5 py-0.5 rounded border border-emerald-200/60">
                  শাস্ত্র শিক্ষক দৃষ্টান্ত
                </div>
                <p className="text-[10px] text-[#006A4E] dark:text-[#00A377]">যুক্তবর্ণ অক্ষত থাকে</p>
              </div>
            </div>
          </div>

          {/* Pitfall 3: CSS Uppercase */}
          <div className="p-4 rounded-xl border border-[#D9E2DD] dark:border-[#20312B] bg-[#F4F7F5]/50 dark:bg-[#0C1512]/50 space-y-2">
            <span className="text-xs font-heading font-bold text-zinc-700 dark:text-zinc-300">
              ৩. টেক্সট ট্রান্সফর্ম (CSS Uppercase)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Bad */}
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-400">
                  <XCircle className="w-3.5 h-3.5" /> খারাপ (uppercase)
                </span>
                <div className="font-body text-base uppercase text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black/40 px-1.5 py-0.5 rounded border border-rose-200/60">
                  বাংলা অক্ষর
                </div>
                <p className="text-[10px] text-rose-600 dark:text-rose-400">বাংলায় ক্যাপিটাল নেই</p>
              </div>

              {/* Good */}
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006A4E] dark:text-[#00A377]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> সঠিক (plain text)
                </span>
                <div className="font-body text-base normal-case text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black/40 px-1.5 py-0.5 rounded border border-emerald-200/60">
                  বাংলা অক্ষর
                </div>
                <p className="text-[10px] text-[#006A4E] dark:text-[#00A377]">প্রাকৃতিক অবিকৃত রূপ</p>
              </div>
            </div>
          </div>

          {/* Pitfall 4: Font Inheritance on Controls */}
          <div className="p-4 rounded-xl border border-[#D9E2DD] dark:border-[#20312B] bg-[#F4F7F5]/50 dark:bg-[#0C1512]/50 space-y-2">
            <span className="text-xs font-heading font-bold text-zinc-700 dark:text-zinc-300">
              ৪. ইনপুট ফর্ম কন্ট্রোলে Font Inheritance
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Bad */}
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-400">
                  <XCircle className="w-3.5 h-3.5" /> খারাপ (Default Browser Serif)
                </span>
                <div className="text-base text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black/40 px-1.5 py-0.5 rounded border border-rose-200/60 font-serif">
                  অনুসন্ধান করুন
                </div>
                <p className="text-[10px] text-rose-600 dark:text-rose-400">অসুন্দর ডিফল্ট সেরিফ</p>
              </div>

              {/* Good */}
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006A4E] dark:text-[#00A377]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> সঠিক (font-family: inherit)
                </span>
                <div className="text-base text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black/40 px-1.5 py-0.5 rounded border border-emerald-200/60 font-body">
                  অনুসন্ধান করুন
                </div>
                <p className="text-[10px] text-[#006A4E] dark:text-[#00A377]">যথাযথ Hind Siliguri ফন্ট</p>
              </div>
            </div>
          </div>
        </div>

        {/* Font Loading Snippet */}
        <CodeBlock code={fontsCodeSnippet} language="tsx" title="Google Fonts Setup (Next.js)" />
      </div>

      {/* 4.B Subpath Imports Diagram */}
      <SubpathImportsDiagram />
    </div>
  );
}
