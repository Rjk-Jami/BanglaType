'use client';

import { useTypewriter } from '@/hooks/useTypewriter';

export function TypewriterHeading() {
  const { text } = useTypewriter({
    words: [
      'Write Bangla, your way.',
      'বাংলা লিখুন আপনার মতো করে।',
      'সহজে, দ্রুত এবং নির্ভুলভাবে।',
    ],
    typingSpeed: 75,
    deletingSpeed: 35,
    pauseTime: 2200,
  });

  return (
    <div className="flex items-center justify-center min-h-[4rem] sm:min-h-[5rem]">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 text-center">
        <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 dark:from-emerald-400 dark:via-teal-400 dark:to-indigo-400 bg-clip-text text-transparent">
          {text}
        </span>
        <span className="inline-block w-1 sm:w-1.5 h-8 sm:h-12 ml-1 bg-emerald-500 animate-pulse align-middle" />
      </h1>
    </div>
  );
}
