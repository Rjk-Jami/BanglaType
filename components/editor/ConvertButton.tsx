'use client';

import { useState } from 'react';
import { ArrowRightLeft, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConvertButtonProps {
  onConvert: () => Promise<void>;
  disabled?: boolean;
}

export function ConvertButton({ onConvert, disabled }: ConvertButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
      await onConvert();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-emerald-200 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
      title="ইংরেজি লেখাকে অভ্র ফোনেটিকে বাংলায় রূপান্তর করুন"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
      ) : (
        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      )}
      <span>বাংলায় রূপান্তর</span>
    </button>
  );
}
