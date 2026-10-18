'use client';

import { useState } from 'react';
import { KeyboardMode } from '@/lib/keyboard/types';
import { useBanglaEditor } from '@/hooks/useBanglaEditor';
import { KeyboardModeSelector } from '../keyboard/KeyboardModeSelector';
import { EditorTextarea } from './EditorTextarea';
import { EditorToolbar } from './EditorToolbar';
import { VirtualKeyboardModal } from '../keyboard/VirtualKeyboardModal';
import { Sparkles, Info } from 'lucide-react';

interface BanglaEditorProps {
  mode: KeyboardMode;
  onModeChange: (mode: KeyboardMode) => void;
}

export function BanglaEditor({ mode, onModeChange }: BanglaEditorProps) {
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);

  const {
    text,
    stats,
    textareaRef,
    handleKeyDown,
    handleChange,
    handleClick,
    handleBlur,
    copyToClipboard,
    copied,
    clearText,
    insertTextAtCursor,
    handlePaste,
    convertCurrentTextToBangla,
  } = useBanglaEditor({ mode });

  const handleVirtualKeyClick = (char: string) => {
    insertTextAtCursor(char);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
      {/* Editor Main Glass Container */}
      <div className="relative flex flex-col rounded-3xl bg-white/75 dark:bg-zinc-900/75 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-2xl transition-all overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
        {/* Top Header Bar: Mode Switcher & Contextual Hint */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/30">
          <KeyboardModeSelector mode={mode} onModeChange={onModeChange} />

          {/* Quick Helper Badge */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            {mode === 'avro' && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>যেমন: amar nam → আমার নাম</span>
              </span>
            )}
            {mode === 'jatiyo' && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Info className="w-3.5 h-3.5" />
                <span>যেকোনো যুক্তবর্ণের জন্য '্' (g) চাপুন</span>
              </span>
            )}
            {mode === 'english' && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                <span>Standard English mode</span>
              </span>
            )}
          </div>
        </div>

        {/* Text Area */}
        <EditorTextarea
          textareaRef={textareaRef}
          text={text}
          mode={mode}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onClick={handleClick}
          onBlur={handleBlur}
          onPaste={handlePaste}
        />

        {/* Bottom Toolbar */}
        <EditorToolbar
          stats={stats}
          mode={mode}
          copied={copied}
          onCopy={copyToClipboard}
          onClear={clearText}
          onOpenKeyboard={() => setIsKeyboardModalOpen(true)}
          onConvert={convertCurrentTextToBangla}
          hasText={text.length > 0}
        />
      </div>

      {/* Virtual Keyboard Modal */}
      <VirtualKeyboardModal
        isOpen={isKeyboardModalOpen}
        onClose={() => setIsKeyboardModalOpen(false)}
        onKeyClick={handleVirtualKeyClick}
      />
    </div>
  );
}
