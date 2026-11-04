'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Sparkles,
  Terminal,
  Code2,
  Keyboard as KeyboardIcon,
  ShieldCheck,
  Info,
  BookOpen,
  Compass,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

export interface DocNavItem {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DOC_NAV_ITEMS: DocNavItem[] = [
  { id: 'quick-start', label: '১ লাইনে কুইক স্টার্ট', sublabel: 'Quick Start', icon: Sparkles },
  { id: 'installation', label: 'ইনস্টলেশন ও ডিপেনডেন্সি', sublabel: 'Installation', icon: Terminal },
  { id: 'patterns', label: '৫টি ইন্টিগ্রেশন প্যাটার্ন', sublabel: 'Live Demos', icon: Code2 },
  { id: 'keyboard-shortcuts', label: 'কীবোর্ড শর্টকাট', sublabel: 'Shortcuts', icon: KeyboardIcon },
  { id: 'best-practices', label: 'টাইপোগ্রাফি ও চেকলিস্ট', sublabel: 'Typography', icon: ShieldCheck },
  { id: 'limits', label: 'বাস্তব সীমাবদ্ধতার নোট', sublabel: 'Honest Limits', icon: Info },
  { id: 'api-reference', label: 'পাবলিক API রেফারেন্স', sublabel: 'API Reference', icon: BookOpen },
];

export interface DocTOCProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function DocTOC({ variant = 'desktop', className = '' }: DocTOCProps) {
  const [activeId, setActiveId] = useState('quick-start');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = DOC_NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = DOC_NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // offset for fixed header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCopyCmd = async () => {
    try {
      await navigator.clipboard.writeText('npm install banglatype');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Mobile horizontal bar
  if (variant === 'mobile') {
    return (
      <div className={`w-full overflow-x-auto scrollbar-none py-1 flex items-center gap-2 ${className}`}>
        {DOC_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#006A4E] dark:bg-[#008763] text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-[#121E19] text-zinc-600 dark:text-zinc-400 hover:text-[#14201B] dark:hover:text-[#EDF5F1] hover:bg-[#F4F7F5] dark:hover:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Desktop vertical left-side sidebar (with increased height on 2xl)
  return (
    <div
      className={`w-full flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] shadow-xs select-none transition-all 2xl:h-full 2xl:min-h-[calc(100vh-7rem)] ${className}`}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#D9E2DD] dark:border-[#20312B]">
          <div className="w-8 h-8 rounded-lg bg-[#006A4E]/10 dark:bg-[#008763]/20 text-[#006A4E] dark:text-[#00A377] flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xs uppercase tracking-wider text-[#14201B] dark:text-[#EDF5F1]">
              সূচিপত্র (TOC)
            </h2>
            <p className="text-[10px] text-zinc-500 font-body">ডকুমেন্টেশনের সেকশনসমূহ</p>
          </div>
        </div>

        {/* Nav List */}
        <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-16rem)] 2xl:max-h-none scrollbar-none" aria-label="Documentation Table of Contents">
          {DOC_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-start gap-2.5 px-3 py-2 rounded-xl text-left transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-[#EBF3EF] dark:bg-[#142821] text-[#006A4E] dark:text-[#00A377] font-semibold border-l-2 border-[#006A4E] dark:border-[#008763] shadow-2xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-[#14201B] dark:hover:text-[#EDF5F1] hover:bg-[#F4F7F5] dark:hover:bg-[#0C1512]'
                }`}
              >
                <div
                  className={`mt-0.5 transition-colors ${
                    isActive
                      ? 'text-[#006A4E] dark:text-[#00A377]'
                      : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-body leading-tight truncate">
                    {item.label}
                  </div>
                  {item.sublabel && (
                    <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                      {item.sublabel}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Quick-Action Box - Pins to bottom on 2xl */}
      <div className="pt-4 border-t border-[#D9E2DD] dark:border-[#20312B] space-y-2 mt-4 2xl:mt-auto">
        <button
          onClick={handleCopyCmd}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-mono bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-900 transition-colors cursor-pointer group"
          title="ক্লিক করে কমান্ড কপি করুন"
        >
          <div className="flex items-center gap-1.5 truncate">
            <Terminal className="w-3 h-3 text-[#006A4E] dark:text-[#008763] shrink-0" />
            <span className="truncate">npm i banglatype</span>
          </div>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[#006A4E] dark:text-[#008763] shrink-0" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 shrink-0" />
          )}
        </button>

        <a
          href="https://github.com/Rjk-Jami/BanglaType"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body text-zinc-500 hover:text-[#006A4E] dark:hover:text-[#008763] transition-colors"
        >
          <span>GitHub রেপো দেখুন</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
