'use client';

import { EditorStats, KeyboardMode } from '@/lib/keyboard/types';
import { CharacterCounter } from './CharacterCounter';
import { CopyButton } from './CopyButton';
import { ClearButton } from './ClearButton';
import { ConvertButton } from './ConvertButton';

interface EditorToolbarProps {
  stats: EditorStats;
  mode?: KeyboardMode;
  copied: boolean;
  onCopy: () => void;
  onClear: () => void;
  onConvert?: () => Promise<void>;
  hasText: boolean;
}

export function EditorToolbar({
  stats,
  copied,
  onCopy,
  onClear,
  onConvert,
  hasText,
}: EditorToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-zinc-200/80 dark:border-zinc-800/80 rounded-b-2xl">
      {/* Left: Stats */}
      <CharacterCounter stats={stats} />

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {onConvert && (
          <ConvertButton onConvert={onConvert} disabled={!hasText} />
        )}
        <CopyButton copied={copied} onCopy={onCopy} disabled={!hasText} />
        <ClearButton
          onClear={onClear}
          disabled={!hasText}
          hasSubstantialText={stats.characters > 20}
        />
      </div>
    </div>
  );
}
