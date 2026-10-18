'use client';

import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full mt-auto py-8 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span>© 2026 BanglaType</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Bangla writers
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>English</span>
          <span>·</span>
          <span>জাতীয় (Jatiyo)</span>
          <span>·</span>
          <span>অভ্র (Avro Phonetic)</span>
        </div>
      </div>
    </footer>
  );
}
