'use client';

import { motion } from 'framer-motion';
import { KeyboardMode } from '@/lib/keyboard/types';
import { Keyboard, Globe, Sparkles } from 'lucide-react';

interface KeyboardModeSelectorProps {
  mode: KeyboardMode;
  onModeChange: (mode: KeyboardMode) => void;
  className?: string;
}

export function KeyboardModeSelector({
  mode,
  onModeChange,
  className = '',
}: KeyboardModeSelectorProps) {
  const modes: {
    id: KeyboardMode;
    label: string;
    englishTag: string;
    icon: typeof Keyboard;
  }[] = [
    { id: 'avro', label: 'অভ্র', englishTag: 'Avro', icon: Sparkles },
    { id: 'jatiyo', label: 'জাতীয়', englishTag: 'Jatiyo', icon: Keyboard },
    { id: 'english', label: 'English', englishTag: 'EN', icon: Globe },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Keyboard input mode"
      className={`inline-flex items-center p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/90 backdrop-blur-md border border-zinc-200/70 dark:border-zinc-700/70 shadow-xs font-body ${className}`}
    >
      {modes.map((item) => {
        const isActive = mode === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onModeChange(item.id)}
            className={`relative flex items-center justify-center gap-1.5 py-1 px-2.5 sm:px-3 rounded-lg text-xs font-body transition-colors select-none cursor-pointer z-10 ${
              isActive
                ? 'text-zinc-950 dark:text-zinc-50 font-semibold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeKeyboardModePill"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-xs border border-zinc-200/80 dark:border-zinc-700/80 -z-10"
              />
            )}
            <Icon
              className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-zinc-400 dark:text-zinc-500'
              }`}
            />
            <span className="leading-none whitespace-nowrap">{item.label}</span>
            <span
              className={`text-[10px] font-mono leading-none transition-opacity ${
                isActive
                  ? 'text-emerald-700/80 dark:text-emerald-300/80 font-medium'
                  : 'text-zinc-400 dark:text-zinc-500 opacity-70'
              }`}
            >
              ({item.englishTag})
            </span>
          </button>
        );
      })}
    </div>
  );
}
