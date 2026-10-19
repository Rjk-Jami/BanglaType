'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, BookOpen, Sparkles, Terminal, Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText('npm install banglatype');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 select-none group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-base shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Languages className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading font-bold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
              BanglaType
            </span>
            <span className="font-heading text-[11px] text-zinc-400 font-normal">
              বাংলা টাইপ
            </span>
          </div>
        </Link>

        {/* Center / Nav Links */}
        <nav className="flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 text-xs font-body font-medium">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              pathname === '/'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>প্লেগ্রাউন্ড</span>
          </Link>

          <Link
            href="/docs"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              pathname === '/docs'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>লাইব্রেরি ডক্স</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Quick npm install copy pill on sm+ screens */}
          <button
            onClick={handleCopyInstall}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
            title="ইনস্টলেশন কমান্ড কপি করুন"
          >
            <Terminal className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>npm i banglatype</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-500 ml-0.5" />
            ) : (
              <Copy className="w-3 h-3 text-zinc-400 ml-0.5" />
            )}
          </button>

          <a
            href="https://github.com/Rjk-Jami/BanglaType"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
