'use client';

import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  copied: boolean;
  onCopy: () => void;
  disabled?: boolean;
}

export function CopyButton({ copied, onCopy, disabled }: CopyButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onCopy}
      disabled={disabled}
      title="লেখা কপি করুন"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold"
          >
            <Check className="w-4 h-4" />
            <span>কপি হয়েছে!</span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <Copy className="w-4 h-4" />
            <span>কপি করুন</span>
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
