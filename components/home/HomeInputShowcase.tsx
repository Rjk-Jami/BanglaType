'use client';

import { TextCursorInput } from 'lucide-react';
import { KeyboardMode } from '@/lib/keyboard/types';
import { BanglaInput } from '@/components/editor/BanglaInput';

interface HomeInputShowcaseProps {
  mode: KeyboardMode;
}

export function HomeInputShowcase({ mode }: HomeInputShowcaseProps) {
  return (
    <section className="flex flex-col gap-3 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] shadow-xs">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-2 font-body">
          <TextCursorInput className="w-4 h-4 text-[#006A4E] dark:text-[#008763]" />
          <span className="font-heading text-sm text-[#14201B] dark:text-[#EDF5F1]">
            ইনপুট ফিল্ড (&lt;BanglaInput /&gt;)
          </span>
        </label>
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-body">
          সার্চবার ও ফর্ম ফিল্ডের জন্য
        </span>
      </div>

      {/* The Reusable BanglaInput Component */}
      <BanglaInput
        mode={mode}
        placeholder="এক লাইনে বাংলায় লিখুন (যেমন: amar nam → আমার নাম)..."
      />
    </section>
  );
}
