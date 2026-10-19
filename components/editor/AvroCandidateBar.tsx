'use client';

import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
  useSyncExternalStore,
  RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, CornerDownLeft } from 'lucide-react';
import { getCaretCoordinates } from '@/lib/dom/caret-coordinates';
import { Badge } from '@/components/ui/badge';

interface AvroCandidateBarProps {
  targetRef?: RefObject<HTMLElement | null>;
  rawWord: string;
  candidates: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const emptySubscribe = () => () => {};

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function AvroCandidateBar({
  targetRef,
  rawWord,
  candidates,
  selectedIndex,
  onSelect,
}: AvroCandidateBarProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const barRef = useRef<HTMLDivElement | null>(null);
  const selectedPillRef = useRef<HTMLButtonElement | null>(null);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    maxWidth: number;
  } | null>(null);

  const updatePosition = useCallback(() => {
    // Safely retrieve target via targetRef or fallback to active input/textarea
    const target =
      targetRef?.current ||
      (typeof document !== 'undefined' &&
      document.activeElement instanceof HTMLElement &&
      (document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.tagName === 'INPUT')
        ? document.activeElement
        : null);

    if (!target) {
      setCoords(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    // Hide if the input/textarea is completely outside the viewport
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
      setCoords(null);
      return;
    }

    // Calculate precise caret coordinates for input/textarea
    const caret = getCaretCoordinates(target);

    const barEl = barRef.current;
    const barHeight = barEl ? barEl.offsetHeight : 36;
    const barWidth = barEl ? barEl.offsetWidth : 280;
    const gap = 8; // Spacing directly above or below the caret

    // Requirement 1 & 5: Position suggestions directly above the current caret
    let top = caret.top - barHeight - gap;

    // Viewport handling: If not enough room above caret, place directly below caret
    if (top < 10) {
      top = caret.bottom + gap;
    }
    // Prevent overflowing beyond bottom of viewport
    if (top > window.innerHeight - barHeight - 8) {
      top = Math.max(8, window.innerHeight - barHeight - 8);
    }

    // Horizontal positioning: Align with caret position
    let left = caret.left - 8;

    // Viewport boundary handling: Prevent overflowing right or left screen edges
    const maxLeft = window.innerWidth - barWidth - 12;
    if (left > maxLeft) {
      left = Math.max(8, maxLeft);
    }
    if (left < 8) {
      left = 8;
    }

    // Requirement 2: Dynamic suggestion width based on content and available space
    const maxWidth = Math.min(540, window.innerWidth - 16);

    setCoords({
      top,
      left,
      maxWidth,
    });
  }, [targetRef]);

  // Synchronize dynamic position on typing, scroll, resize, or candidate changes before paint
  useIsomorphicLayoutEffect(() => {
    if (!mounted || !rawWord || candidates.length === 0) return;

    updatePosition();

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    const targetEl = targetRef?.current;
    if (targetEl) {
      targetEl.addEventListener('scroll', updatePosition, { passive: true });
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && targetEl) {
      resizeObserver = new ResizeObserver(() => {
        updatePosition();
      });
      resizeObserver.observe(targetEl);
      if (barRef.current) {
        resizeObserver.observe(barRef.current);
      }
    }

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
      if (targetEl) {
        targetEl.removeEventListener('scroll', updatePosition);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [mounted, rawWord, candidates, updatePosition, targetRef]);

  // Keep highlighted candidate visible within internal horizontal scroll
  useEffect(() => {
    if (selectedPillRef.current) {
      selectedPillRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [selectedIndex]);

  // Never render until coordinates are calculated to prevent top-right snap/fly-in artifact
  if (!mounted || !rawWord || candidates.length === 0 || !coords) return null;

  const content = (
    <div
      ref={barRef}
      role="toolbar"
      aria-label="Avro candidate suggestions"
      style={{
        position: 'fixed',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        maxWidth: `${coords.maxWidth}px`,
        zIndex: 9999, // Highest visual priority, above modals, stacking contexts & headers
      }}
      className="w-max max-w-[min(540px,calc(100vw-16px))] inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-emerald-500/35 dark:border-emerald-500/40 rounded-full shadow-2xl shadow-black/15 dark:shadow-black/50 select-none animate-in fade-in zoom-in-95 duration-150 pointer-events-auto"
    >
      {/* Raw Latin Token Badge */}
      <Badge
        variant="emerald"
        size="sm"
        className="shrink-0 font-mono font-medium px-1.5 py-0.5"
      >
        <Sparkles className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
        <span className="max-w-[70px] truncate">{rawWord}</span>
      </Badge>

      <div className="h-3 w-px bg-zinc-200 dark:bg-zinc-800 shrink-0" />

      {/* Candidate Pills - Dynamic sizing & Horizontally Scrollable when items overflow */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 touch-pan-x max-w-[340px] sm:max-w-[420px]">
        {candidates.slice(0, 7).map((cand, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={`${cand}-${idx}`}
              ref={isSelected ? selectedPillRef : null}
              type="button"
              // Prevent stealing focus from textarea on tap/click
              onMouseDown={(e) => e.preventDefault()}
              onTouchEnd={(e) => {
                e.preventDefault();
                onSelect(idx);
              }}
              onClick={() => onSelect(idx)}
              className={`group shrink-0 flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium transition-all cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs'
                  : 'bg-zinc-100/90 dark:bg-zinc-800/90 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <span
                className={`text-[9px] font-mono px-1 py-0.1 rounded-full ${
                  isSelected
                    ? 'bg-emerald-700/70 text-emerald-100'
                    : 'bg-zinc-200/80 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {idx + 1}
              </span>
              <span className="font-body text-xs leading-none whitespace-nowrap">{cand}</span>
              {isSelected && (
                <CornerDownLeft className="w-2.5 h-2.5 text-emerald-100 opacity-80" />
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop Keyboard Helper */}
      <span className="hidden md:inline-flex items-center gap-1.5 pl-1 pr-1 text-[10px] text-zinc-400 dark:text-zinc-500 shrink-0">
        <span className="inline-flex items-center gap-0.5">
          <kbd className="px-1 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[9px]">
            Tab
          </kbd>
          <span className="text-[9px]">switch</span>
        </span>
        <span className="inline-flex items-center gap-0.5">
          <kbd className="px-1 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[9px]">
            ↵
          </kbd>
          <span className="text-[9px]">select</span>
        </span>
      </span>
    </div>
  );

  return createPortal(content, document.body);
}
