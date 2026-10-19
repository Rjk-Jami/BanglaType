'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Sparkles, Terminal, Code2, ShieldCheck, BookOpen } from 'lucide-react';

const navItems = [
  { id: 'quick-start', label: '১ লাইনে কুইক স্টার্ট', icon: Sparkles },
  { id: 'installation', label: 'ইনস্টলেশন', icon: Terminal },
  { id: 'patterns', label: '৫টি ইন্টিগ্রেশন প্যাটার্ন', icon: Code2 },
  { id: 'best-practices', label: 'টাইপোগ্রাফি ও প্রোডাকশন চেকলিস্ট', icon: ShieldCheck },
  { id: 'api-reference', label: 'API রেফারেন্স', icon: BookOpen },
];

export function DocTOC() {
  const [activeId, setActiveId] = useState('quick-start');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-16 z-30 w-full py-2 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
