'use client';

import { NavTab } from '@/lib/keyboard/types';
import { motion } from 'framer-motion';
import { PenTool, BookOpen, Search } from 'lucide-react';

interface NavTabsProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  const tabs: { id: NavTab; label: string; icon: typeof PenTool }[] = [
    { id: 'writer', label: 'রাইটার', icon: PenTool },
    { id: 'guide', label: 'ধ্বনি নির্দেশিকা', icon: BookOpen },
    { id: 'dictionary', label: 'অভিধান', icon: Search },
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-2 p-1 rounded-xl bg-zinc-100/70 dark:bg-zinc-800/70 border border-zinc-200/50 dark:border-zinc-700/50">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all select-none cursor-pointer flex items-center gap-1.5 ${
              isActive
                ? 'text-zinc-950 dark:text-zinc-50 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/40 dark:hover:bg-zinc-700/40'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeNavTab"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/80 dark:border-zinc-700/80 -z-10"
              />
            )}
            <Icon className="w-3.5 h-3.5 opacity-70" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
