'use client';

import { Keyboard } from 'lucide-react';

interface LayoutPreviewTriggerProps {
  onOpen: () => void;
}

export function LayoutPreviewTrigger({ onOpen }: LayoutPreviewTriggerProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-700 text-zinc-700 hover:text-emerald-700 dark:text-zinc-200 dark:hover:text-emerald-400 shadow-sm transition-all cursor-pointer active:scale-95"
      title="কীবোর্ড লেআউট দেখুন"
    >
      <Keyboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      <span>কীবোর্ড ম্যাপ</span>
    </button>
  );
}
