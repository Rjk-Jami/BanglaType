'use client';

import * as React from 'react';
import { useState } from 'react';
import { Check, Copy, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

const commands: Record<PackageManager, string> = {
  npm: 'npm install banglatype',
  pnpm: 'pnpm add banglatype',
  yarn: 'yarn add banglatype',
  bun: 'bun add banglatype',
};

export function DocQuickInstall() {
  const [pm, setPm] = useState<PackageManager>('npm');
  const [copied, setCopied] = useState(false);

  const command = commands[pm];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = command;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl ring-1 ring-black/5 dark:ring-white/5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-zinc-100">
              প্যাকেজ ইনস্টলেশন (Installation)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body">
              আপনার পছন্দের প্যাকেজ ম্যানেজারের মাধ্যমে যুক্ত করুন
            </p>
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="emerald" size="sm" className="font-body text-[11px]">
            <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>React 18 & 19 Ready</span>
          </Badge>
          <Badge variant="secondary" size="sm" className="font-body text-[11px]">
            <ShieldCheck className="w-3 h-3 text-zinc-500" />
            <span>Zero Runtime Dependencies</span>
          </Badge>
        </div>
      </div>

      {/* Package manager tabs & command bar */}
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 bg-zinc-950 p-2 sm:p-2.5 rounded-2xl border border-zinc-800 text-zinc-100 shadow-inner">
        {/* PM Selector */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl shrink-0">
          {(['npm', 'pnpm', 'yarn', 'bun'] as PackageManager[]).map((manager) => (
            <button
              key={manager}
              onClick={() => setPm(manager)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                pm === manager
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {manager}
            </button>
          ))}
        </div>

        {/* Command string */}
        <div className="flex-1 px-3 py-1 font-mono text-xs sm:text-sm text-zinc-300 select-all overflow-x-auto whitespace-nowrap">
          <span className="text-emerald-400 mr-2 select-none">$</span>
          {command}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors shrink-0 cursor-pointer"
          title="কমান্ড কপি করুন"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-body">কপি হয়েছে</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="font-body">কপি করুন</span>
            </>
          )}
        </button>
      </div>

      {/* Peer Dependencies info */}
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-1 font-body">
        <span>
          পিয়ার ডিপেনডেন্সি: <code className="font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">react &gt;= 18.0.0</code>
        </span>
        <span className="text-[11px] text-zinc-400">
          App Router • Vite • Remix • Pure Node.js
        </span>
      </div>
    </div>
  );
}
