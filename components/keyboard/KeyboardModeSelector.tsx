'use client';

import { motion } from 'framer-motion';
import { KeyboardMode } from '@/lib/keyboard/types';
import { Keyboard, Globe, Sparkles } from 'lucide-react';

interface KeyboardModeSelectorProps {
  mode: KeyboardMode;
  onModeChange: (mode: KeyboardMode) => void;
}

export function KeyboardModeSelector({
  mode,
  onModeChange,
}: KeyboardModeSelectorProps) {
  const modes: { id: KeyboardMode; label: string; sub: string; icon: typeof Keyboard }[] = [
    { id: 'avro', label: 'অভ্র ফোনেটিক', sub: 'Avro Phonetic', icon: Sparkles },
    { id: 'jatiyo', label: 'জাতীয়', sub: 'Jatiyo Layout', icon: Keyboard },
    { id: 'english', label: 'English', sub: 'Normal Input', icon: Globe },
  ];

  return (
    <div className="flex items-center p-1.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/80 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-inner max-w-md w-full">
      {modes.map((item) => {
        const isActive = mode === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onModeChange(item.id)}
            className={`relative flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-xl text-sm font-medium transition-colors select-none cursor-pointer z-10 ${
              isActive
                ? 'text-zinc-950 dark:text-zinc-50 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeModePill"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-900 shadow-md border border-zinc-200/80 dark:border-zinc-700/80 -z-10"
              />
            )}
            <div className="flex items-center gap-1.5 leading-tight">
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'opacity-60'}`} />
              <span>{item.label}</span>
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 opacity-80 font-normal">
              {item.sub}
            </span>
          </button>
        );
      })}
    </div>
  );
}
