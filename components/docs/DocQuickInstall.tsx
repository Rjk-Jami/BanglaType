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
    <div className="flex flex-col gap-3 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#006A4E]/10 dark:bg-[#008763]/20 text-[#006A4E] dark:text-[#00A377] flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#14201B] dark:text-[#EDF5F1]">
              প্যাকেজ ইনস্টলেশন (Installation)
            </h3>
            <p className="text-xs text-zinc-500 font-body">
              আপনার পছন্দের প্যাকেজ ম্যানেজারের মাধ্যমে যুক্ত করুন
            </p>
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="emerald" size="sm" className="font-body text-[11px] bg-[#EBF3EF] dark:bg-[#142821] text-[#006A4E] dark:text-[#00A377] border-0">
            <Zap className="w-3 h-3 text-[#006A4E] dark:text-[#00A377]" />
            <span>React 18 & 19 Ready</span>
          </Badge>
          <Badge variant="secondary" size="sm" className="font-body text-[11px]">
            <ShieldCheck className="w-3 h-3 text-zinc-500" />
            <span>Zero Runtime Dependencies</span>
          </Badge>
        </div>
      </div>

      {/* Package manager tabs & command bar */}
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 bg-[#0C1512] p-2 sm:p-2.5 rounded-xl border border-[#20312B] text-zinc-100">
        {/* PM Selector */}
        <div className="flex items-center gap-1 bg-[#14201B] p-1 rounded-lg shrink-0">
          {(['npm', 'pnpm', 'yarn', 'bun'] as PackageManager[]).map((manager) => (
            <button
              key={manager}
              onClick={() => setPm(manager)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                pm === manager
                  ? 'bg-[#006A4E] text-white font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {manager}
            </button>
          ))}
        </div>

        {/* Command string */}
        <div className="flex-1 px-3 py-1 font-mono text-xs sm:text-sm text-zinc-300 select-all overflow-x-auto whitespace-nowrap">
          <span className="text-[#00A377] mr-2 select-none">$</span>
          {command}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors shrink-0 cursor-pointer"
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

      {/* Peer Dependencies info - Prominently shown directly beneath */}
      <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-[#D9E2DD]/70 dark:border-[#20312B]/70 font-body">
        <span className="flex items-center gap-1.5">
          <span>পিয়ার ডিপেনডেন্সি:</span>
          <code className="font-mono text-[#006A4E] dark:text-[#00A377] bg-[#EBF3EF] dark:bg-[#142821] px-1.5 py-0.5 rounded font-semibold">
            React 18 &amp; 19 (react &gt;= 18.0.0)
          </code>
        </span>
        <span className="text-[11px] text-zinc-400">
          App Router • Vite • Remix • Node.js
        </span>
      </div>
    </div>
  );
}
