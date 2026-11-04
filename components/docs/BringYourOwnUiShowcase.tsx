'use client';

import * as React from 'react';
import { useBanglaInput } from '@/hooks/useBanglaInput';
import { AvroCandidateBar } from '@/components/editor/AvroCandidateBar';
import { Search, Send, Paperclip, Sparkles } from 'lucide-react';

export function BringYourOwnUiShowcase() {
  // Skin 1: Plain Minimalist Bordered Input
  const skin1 = useBanglaInput({ mode: 'avro' });

  // Skin 2: Rounded Search Pill with Icon
  const skin2 = useBanglaInput({ mode: 'avro' });

  // Skin 3: Chat Composer Bubble
  const skin3 = useBanglaInput({ mode: 'avro' });

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h3 className="font-heading font-bold text-lg text-[#14201B] dark:text-[#EDF5F1] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#006A4E] dark:text-[#008763]" />
          <span>&quot;Bring Your Own UI&quot; — সম্পূর্ণ হেডলেস ব্যবহারের ৩টি ভিন্ন রূপ</span>
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-body leading-relaxed">
          একটিই হুক — <code className="font-mono text-[#006A4E] dark:text-[#00A377] bg-[#EBF3EF] dark:bg-[#142821] px-1 py-0.5 rounded">useBanglaInput</code>। কিন্তু তিনটি সম্পূর্ণ আলাদা ইন্টারফেসে কোনো লাইব্রেরি UI ডিপেনডেন্সি ছাড়াই কাজ করছে:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Skin 1: Plain Minimalist Bordered Input */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] flex flex-col justify-between gap-3 shadow-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
              ১. সাধারণ ফর্ম ইনপুট
            </span>
            <p className="text-xs text-zinc-500 font-body">Sharp radius, standard density</p>
          </div>

          <div className="relative">
            {skin1.hasCandidateBar && (
              <AvroCandidateBar
                targetRef={skin1.inputRef}
                rawWord={skin1.activeRaw}
                candidates={skin1.candidates}
                selectedIndex={skin1.selectedCandidateIndex}
                onSelect={skin1.selectCandidate}
              />
            )}
            <input
              ref={skin1.inputRef}
              value={skin1.value}
              onChange={skin1.handleChange}
              onKeyDown={skin1.handleKeyDown}
              placeholder="নাম লিখুন (যেমন: rohim)..."
              className="w-full px-3 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-[#14201B] dark:text-[#EDF5F1] focus:outline-none focus:border-[#006A4E] font-body"
            />
          </div>
        </div>

        {/* Skin 2: Rounded Search Bar */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] flex flex-col justify-between gap-3 shadow-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-semibold text-[#006A4E] dark:text-[#00A377] uppercase tracking-wider">
              ২. সার্চবার পিল
            </span>
            <p className="text-xs text-zinc-500 font-body">Pill radius, search icon, soft surface</p>
          </div>

          <div className="relative">
            {skin2.hasCandidateBar && (
              <AvroCandidateBar
                targetRef={skin2.inputRef}
                rawWord={skin2.activeRaw}
                candidates={skin2.candidates}
                selectedIndex={skin2.selectedCandidateIndex}
                onSelect={skin2.selectCandidate}
              />
            )}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
              <input
                ref={skin2.inputRef}
                value={skin2.value}
                onChange={skin2.handleChange}
                onKeyDown={skin2.handleKeyDown}
                placeholder="বাংলায় খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-full bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B] text-[#14201B] dark:text-[#EDF5F1] focus:outline-none focus:ring-2 focus:ring-[#006A4E]/30 font-body"
              />
            </div>
          </div>
        </div>

        {/* Skin 3: Chat Composer */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] flex flex-col justify-between gap-3 shadow-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              ৩. চ্যাট কম্পোজার
            </span>
            <p className="text-xs text-zinc-500 font-body">Floating bubble, send button</p>
          </div>

          <div className="relative">
            {skin3.hasCandidateBar && (
              <AvroCandidateBar
                targetRef={skin3.inputRef}
                rawWord={skin3.activeRaw}
                candidates={skin3.candidates}
                selectedIndex={skin3.selectedCandidateIndex}
                onSelect={skin3.selectCandidate}
              />
            )}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <button
                type="button"
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                title="Attach"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                ref={skin3.inputRef}
                value={skin3.value}
                onChange={skin3.handleChange}
                onKeyDown={skin3.handleKeyDown}
                placeholder="মেসেজ লিখুন..."
                className="w-full bg-transparent text-sm text-[#14201B] dark:text-[#EDF5F1] focus:outline-none font-body px-1"
              />
              <button
                type="button"
                className="p-1.5 rounded-xl bg-[#006A4E] text-white hover:bg-[#00553E] transition-colors"
                title="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

