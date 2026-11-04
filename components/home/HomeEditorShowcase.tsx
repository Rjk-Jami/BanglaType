'use client';

import { FileText } from 'lucide-react';
import { KeyboardMode } from '@/lib/keyboard/types';
import { BanglaEditor } from '@/components/editor/BanglaEditor';

interface HomeEditorShowcaseProps {
  mode: KeyboardMode;
  onModeChange: (mode: KeyboardMode) => void;
}

export function HomeEditorShowcase({ mode, onModeChange }: HomeEditorShowcaseProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-2 font-body">
          <FileText className="w-4 h-4 text-[#006A4E] dark:text-[#008763]" />
          <span className="font-heading text-sm text-[#14201B] dark:text-[#EDF5F1]">
            স্টুডিও এডিটর ওয়ার্কস্পেস (&lt;BanglaEditor /&gt;)
          </span>
        </label>
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-body">
          বড় লেখা, প্রবন্ধ ও কনটেন্টের জন্য
        </span>
      </div>

      {/* The Clean BanglaEditor Component */}
      <BanglaEditor
        mode={mode}
        onModeChange={onModeChange}
        showModeSelector={false}
      />
    </section>
  );
}
