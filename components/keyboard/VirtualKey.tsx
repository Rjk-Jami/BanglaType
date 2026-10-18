'use client';

import { KeyCap, KeyboardLayer } from '@/lib/keyboard/types';

interface VirtualKeyProps {
  keyCap: KeyCap;
  layer: KeyboardLayer;
  onKeyClick?: (char: string) => void;
}

export function VirtualKey({ keyCap, layer, onKeyClick }: VirtualKeyProps) {
  const isAltLayer = layer === 'altgr';

  // Characters to display based on active layer
  const topChar = isAltLayer ? keyCap.shiftAlt : keyCap.shifted;
  const bottomChar = isAltLayer ? keyCap.alt : keyCap.unshifted;

  // Determine key width
  const widthClass = keyCap.width || 'w-10 sm:w-12';

  const handleClick = () => {
    if (keyCap.isSpecial || !onKeyClick) return;
    const charToInsert = bottomChar || topChar;
    if (charToInsert) {
      onKeyClick(charToInsert);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={keyCap.isSpecial}
      className={`relative h-12 sm:h-14 ${widthClass} m-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-800/90 shadow-sm hover:shadow transition-all flex flex-col justify-between p-1 sm:p-1.5 select-none active:scale-95 disabled:hover:shadow-none disabled:active:scale-100 ${
        keyCap.isSpecial
          ? 'bg-zinc-100/90 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 font-medium text-xs sm:text-sm items-center justify-center'
          : 'cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-500'
      }`}
    >
      {keyCap.isSpecial ? (
        <span>{keyCap.label}</span>
      ) : (
        <>
          {/* Top shifted character & English label */}
          <div className="flex items-center justify-between w-full leading-none">
            <span
              className={`text-xs sm:text-sm font-semibold ${
                isAltLayer
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {topChar || ''}
            </span>
            <span className="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-mono">
              {keyCap.label}
            </span>
          </div>

          {/* Bottom unshifted / AltGr character */}
          <div className="flex items-center justify-end w-full leading-none">
            <span
              className={`text-xs sm:text-sm font-bold ${
                isAltLayer
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {bottomChar || ''}
            </span>
          </div>
        </>
      )}
    </button>
  );
}
