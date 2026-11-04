'use client';

import { Sparkles, Info, Globe, Keyboard as KeyboardIcon } from 'lucide-react';
import { KeyboardMode } from '@/lib/keyboard/types';
import { KeyboardModeSelector } from '@/components/keyboard/KeyboardModeSelector';

interface HomeModeControlProps {
  mode: KeyboardMode;
  onModeChange: (mode: KeyboardMode) => void;
}

export function HomeModeControl({ mode, onModeChange }: HomeModeControlProps) {
  return (
    <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <KeyboardModeSelector mode={mode} onModeChange={onModeChange} />
        </div>

        {/* Mode Description & Teaching Hint */}
        <div className="flex items-center text-xs font-body">
          {mode === 'avro' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EBF3EF] dark:bg-[#142821] text-[#006A4E] dark:text-[#00A377] border border-[#006A4E]/20">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>অভ্র ফোনেটিক মোড — যেমন: ami banglay gan gai → আমি বাংলায় গান গাই</span>
            </div>
          )}

          {mode === 'jatiyo' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>জাতীয় কীবোর্ড মোড সক্রিয় — রেফারেন্স: k=ক, Shift+k=খ, g=্ (যুক্তবর্ণ)</span>
            </div>
          )}

          {mode === 'english' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>ইংরেজি মোড সক্রিয় — Direct English pass-through</span>
            </div>
          )}
        </div>
      </div>

      {/* Jatiyo Keymap Reference (illustrated only when in Jatiyo mode) */}
      {mode === 'jatiyo' && (
        <div className="pt-2 border-t border-[#D9E2DD] dark:border-[#20312B] flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
          <span className="font-body text-zinc-500 flex items-center gap-1">
            <KeyboardIcon className="w-3.5 h-3.5" />
            <span>কীম্যাপ নমুনা:</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B]">
            j → ক
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B]">
            d → ি
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B]">
            f → া
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B]">
            g → ্ (হসন্ত)
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B]">
            Shift+k → ত্থ
          </span>
        </div>
      )}
    </div>
  );
}
