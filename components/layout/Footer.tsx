'use client';

export function Footer() {
  "1"
  return (
    <footer className="w-full mt-auto py-6 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
          <span>&copy; 2026</span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">KhanDevs</span>
        </div>
        <div className="flex items-center gap-1">
          <span>by</span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">KhanDevs</span>
        </div>
      </div>
    </footer>
  );
}

