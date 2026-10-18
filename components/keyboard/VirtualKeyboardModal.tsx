'use client';

import { useState } from 'react';
import { GlassModal } from '@/components/ui/GlassModal';
import { KEYBOARD_ROWS } from '@/lib/keyboard/layout-data';
import { KeyboardLayer } from '@/lib/keyboard/types';
import { VirtualKey } from './VirtualKey';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VirtualKeyboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyClick?: (char: string) => void;
}

export function VirtualKeyboardModal({
  isOpen,
  onClose,
  onKeyClick,
}: VirtualKeyboardModalProps) {
  const [layer, setLayer] = useState<KeyboardLayer>('unshifted');

  const toggleLayer = () => {
    setLayer((prev) => (prev === 'unshifted' ? 'altgr' : 'unshifted'));
  };

  const title = (
    <div className="flex items-center justify-center gap-3">
      <span className="font-serif text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 font-semibold tracking-wide">
        {layer === 'unshifted'
          ? 'Unshifted & Shifted'
          : 'Option/AltGr & Option/AltGr+Shift'}
      </span>
    </div>
  );

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-5xl">
      <div className="flex flex-col items-center">
        {/* Keyboard Frame */}
        <div className="relative w-full p-2 sm:p-4 rounded-2xl bg-zinc-100/90 dark:bg-zinc-950/80 border-2 border-zinc-300 dark:border-zinc-700 shadow-inner overflow-x-auto">
          {/* Left Arrow Toggle Button */}
          <button
            type="button"
            onClick={toggleLayer}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-12 sm:w-10 sm:h-16 flex items-center justify-center bg-white/90 dark:bg-zinc-800/90 rounded-md shadow-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all active:scale-95"
            title="পূর্ববর্তী লেয়ার"
            aria-label="Previous layer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Toggle Button */}
          <button
            type="button"
            onClick={toggleLayer}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-12 sm:w-10 sm:h-16 flex items-center justify-center bg-white/90 dark:bg-zinc-800/90 rounded-md shadow-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all active:scale-95"
            title="পরবর্তী লেয়ার"
            aria-label="Next layer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Key Rows */}
          <div className="flex flex-col gap-1 items-center min-w-[700px] px-8">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center w-full">
                {row.map((keyCap) => (
                  <VirtualKey
                    key={keyCap.code}
                    keyCap={keyCap}
                    layer={layer}
                    onKeyClick={onKeyClick}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend / Indicator */}
        <div className="flex items-center justify-between w-full mt-3 px-2 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              স্বাভাবিক / শিফট লেআউট
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              AltGr বিশেষ রূপ ও চিহ্ন
            </span>
          </div>
          <button
            type="button"
            onClick={toggleLayer}
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline cursor-pointer"
          >
            লেয়ার পরিবর্তন করুন (Shift / AltGr)
          </button>
        </div>

        {/* Close Button: Matches screenshot "বন্ধ করুন" */}
        <div className="w-full mt-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-800/90 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-100 font-medium text-base shadow-sm hover:shadow transition-all active:scale-[0.99] cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </GlassModal>
  );
}
