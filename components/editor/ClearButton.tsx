'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { GlassModal } from '@/components/ui/GlassModal';

interface ClearButtonProps {
  onClear: () => void;
  disabled?: boolean;
  hasSubstantialText: boolean;
}

export function ClearButton({
  onClear,
  disabled,
  hasSubstantialText,
}: ClearButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (hasSubstantialText) {
      setShowConfirm(true);
    } else {
      onClear();
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onClear();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-200 dark:hover:border-rose-800 text-zinc-600 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
        title="সব লেখা মুছুন"
      >
        <Trash2 className="w-4 h-4" />
        মুছুন
      </button>

      <GlassModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="লেখা মুছে ফেলতে চান?"
        maxWidth="max-w-md"
      >
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            আপনার লেখাগুলো মুছে যাবে। আপনি কি নিশ্চিত যে পুরো লেখাটি মুছে ফেলতে চান?
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium shadow transition-colors cursor-pointer"
            >
              হ্যাঁ, মুছে ফেলুন
            </button>
          </div>
        </div>
      </GlassModal>
    </>
  );
}
