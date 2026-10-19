'use client';

import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full mt-auto py-6 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
          <span className="font-heading font-semibold text-zinc-800 dark:text-zinc-200">
            BanglaType
          </span>
          <span>·</span>
          <span>Owned by <span className="font-semibold text-zinc-800 dark:text-zinc-200">KhanDevs</span></span>
        </div>
        <div className="flex items-center gap-1">
          Made with{' '}
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />{' '}
          for Bangla writers
        </div>
      </div>
    </footer>
  );
}
