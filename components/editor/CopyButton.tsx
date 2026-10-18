'use client';

import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyButtonProps {
  copied: boolean;
  onCopy: () => void;
  disabled?: boolean;
}

export function CopyButton({ copied, onCopy, disabled }: CopyButtonProps) {
  return (
    <button
      type="button"
      onClick={onCopy}
      disabled={disabled}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
      title="লেখা কপি করুন"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold"
          >
            <Check className="w-4 h-4" />
            কপি হয়েছে!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1"
          >
            <Copy className="w-4 h-4" />
            কপি করুন
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
