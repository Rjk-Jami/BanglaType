'use client';

import * as React from 'react';
import { useState } from 'react';
import { Keyboard as KeyboardIcon, Sparkles } from 'lucide-react';

interface ShortcutRow {
  context: string;
  keys: string[];
  action: string;
  banglaAction: string;
  highlightKey?: string;
}

const SHORTCUTS: ShortcutRow[] = [
  // 1. Suggestion dropdown
  {
    context: 'সাজেশন ড্রপডাউন খোলা অবস্থায়',
    keys: ['Tab'],
    action: 'Cycle to next suggestion candidate',
    banglaAction: 'পরবর্তী সাজেশন ক্যান্ডিডেটে যাওয়া',
    highlightKey: 'Tab',
  },
  {
    context: 'সাজেশন ড্রপডাউন খোলা অবস্থায়',
    keys: ['Shift', 'Tab'],
    action: 'Cycle to previous candidate',
    banglaAction: 'পূর্ববর্তী সাজেশন ক্যান্ডিডেটে যাওয়া',
    highlightKey: 'Tab',
  },
  {
    context: 'সাজেশন ড্রপডাউন খোলা অবস্থায়',
    keys: ['Enter'],
    action: 'Commit selected suggestion candidate',
    banglaAction: 'নির্বাচিত শব্দটি গ্রহণ করা',
    highlightKey: 'Enter',
  },
  {
    context: 'সাজেশন ড্রপডাউন খোলা অবস্থায়',
    keys: ['1', '–', '7'],
    action: 'Directly select numbered candidate',
    banglaAction: 'সরাসরি নম্বরের শব্দ নির্বাচন',
    highlightKey: '1',
  },
  {
    context: 'সাজেশন ড্রপডাউন খোলা অবস্থায়',
    keys: ['Esc'],
    action: 'Dismiss candidate bar and retain Latin buffer',
    banglaAction: 'সাজেশন বন্ধ করে ইংরেজি বাফার রাখা',
    highlightKey: 'Esc',
  },

  // 2. Input / Textarea
  {
    context: 'ইনপুট ও টেক্সট এরিয়া',
    keys: ['Space'],
    action: 'Transliterate and commit active word',
    banglaAction: 'শব্দটি স্বয়ংক্রিয়ভাবে বাংলায় রূপান্তর করে স্পেস দেওয়া',
    highlightKey: 'Space',
  },
  {
    context: 'ইনপুট ও টেক্সট এরিয়া',
    keys: ['Backspace'],
    action: 'Undo last character or revert word',
    banglaAction: 'অক্ষর মোছা বা পূর্বের অবস্থায় ফেরা',
    highlightKey: 'Backspace',
  },

  // 3. Jatiyo mode
  {
    context: 'জাতীয় (Jatiyo) কীবোর্ড মোড',
    keys: ['g'],
    action: 'Hasanta / Virama (্) connector for conjuncts',
    banglaAction: 'যুক্তবর্ণ তৈরির জন্য হসন্ত (্)',
    highlightKey: 'g',
  },
  {
    context: 'জাতীয় (Jatiyo) কীবোর্ড মোড',
    keys: ['Shift', 'Key'],
    action: 'Access shifted Bengali letter',
    banglaAction: 'কীবোর্ডের উপরের সারির বর্ণ টাইপ করা',
    highlightKey: 'Shift',
  },
];

export function KeyboardShortcutsTable() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <section id="keyboard-shortcuts" className="space-y-4 scroll-mt-24">
      <div className="flex items-center gap-2 pb-2 border-b border-[#D9E2DD] dark:border-[#20312B]">
        <div className="w-7 h-7 rounded-lg bg-[#006A4E] text-white flex items-center justify-center font-bold text-xs">
          <KeyboardIcon className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#14201B] dark:text-[#EDF5F1]">
            কীবোর্ড শর্টকাট গাইড (Keyboard Shortcuts)
          </h2>
          <p className="text-xs text-zinc-500 font-body">
            দ্রুত বাংলা টাইপিং ও সাজেশন নিয়ন্ত্রণের শর্টকাট তালিকা
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#D9E2DD] dark:border-[#20312B] bg-white dark:bg-[#121E19] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead>
              <tr className="border-b border-[#D9E2DD] dark:border-[#20312B] bg-[#F4F7F5]/80 dark:bg-[#0C1512]/80 text-zinc-600 dark:text-zinc-400">
                <th className="py-3 px-4 font-semibold">কন্টেক্সট (Context)</th>
                <th className="py-3 px-4 font-semibold">শর্টকাট কীক্যাপ (Keycaps)</th>
                <th className="py-3 px-4 font-semibold">কার্যপ্রণালী (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E2DD]/70 dark:divide-[#20312B]/70">
              {SHORTCUTS.map((row, idx) => (
                <tr
                  key={idx}
                  onMouseEnter={() => setActiveKey(row.highlightKey || null)}
                  onMouseLeave={() => setActiveKey(null)}
                  className="hover:bg-[#F4F7F5]/60 dark:hover:bg-[#0C1512]/60 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    {row.context}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      {row.keys.map((k, i) => (
                        <kbd
                          key={i}
                          className={`px-2 py-1 rounded-md text-[11px] font-mono border shadow-2xs transition-all ${
                            activeKey === k
                              ? 'bg-[#006A4E] text-white border-[#006A4E] scale-105'
                              : 'bg-[#F4F7F5] dark:bg-[#0C1512] text-zinc-800 dark:text-zinc-200 border-[#D9E2DD] dark:border-[#20312B]'
                          }`}
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                    <div>{row.banglaAction}</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{row.action}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

