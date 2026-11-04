'use client';

import { useState } from 'react';
import { EditorStats } from '@/lib/keyboard/types';

export interface CharacterCounterProps {
  stats: EditorStats;
}

const toBanglaDigits = (num: number): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => banglaDigits[Number(d)]);
};

export function CharacterCounter({ stats }: CharacterCounterProps) {
  const [useBanglaNumerals, setUseBanglaNumerals] = useState(true);

  const formatNum = (num: number) => {
    return useBanglaNumerals ? toBanglaDigits(num) : String(num);
  };

  return (
    <div
      role="status"
      aria-label="Text statistics"
      className="flex items-center gap-2.5 text-xs font-body text-zinc-500 dark:text-zinc-400 select-none"
    >
      <span className="flex items-center gap-1">
        <strong className="font-semibold text-[#14201B] dark:text-[#EDF5F1]">
          {formatNum(stats.characters)}
        </strong>{' '}
        অক্ষর
      </span>
      <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
        •
      </span>
      <span className="flex items-center gap-1">
        <strong className="font-semibold text-[#14201B] dark:text-[#EDF5F1]">
          {formatNum(stats.words)}
        </strong>{' '}
        শব্দ
      </span>
      <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
        •
      </span>
      <span className="flex items-center gap-1">
        <strong className="font-semibold text-[#14201B] dark:text-[#EDF5F1]">
          {formatNum(stats.lines)}
        </strong>{' '}
        লাইন
      </span>

      {/* Numeral toggle button */}
      <button
        type="button"
        onClick={() => setUseBanglaNumerals(!useBanglaNumerals)}
        className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-400 dark:text-zinc-500 hover:text-[#006A4E] dark:hover:text-[#00A377] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        title={useBanglaNumerals ? 'ইংরেজি সংখ্যায় দেখুন (123)' : 'বাংলা সংখ্যায় দেখুন (১২৩)'}
      >
        {useBanglaNumerals ? '১২৩' : '123'}
      </button>
    </div>
  );
}
