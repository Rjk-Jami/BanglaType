'use client';

import { EditorStats } from '@/lib/keyboard/types';

interface CharacterCounterProps {
  stats: EditorStats;
}

export function CharacterCounter({ stats }: CharacterCounterProps) {
  return (
    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 select-none">
      <span className="flex items-center gap-1">
        <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
          {stats.characters}
        </strong>{' '}
        অক্ষর
      </span>
      <span className="text-zinc-300 dark:text-zinc-700">|</span>
      <span className="flex items-center gap-1">
        <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
          {stats.words}
        </strong>{' '}
        শব্দ
      </span>
      <span className="text-zinc-300 dark:text-zinc-700">|</span>
      <span className="flex items-center gap-1">
        <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
          {stats.lines}
        </strong>{' '}
        লাইন
      </span>
    </div>
  );
}
