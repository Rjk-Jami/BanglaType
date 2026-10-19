'use client';

import { KeyboardMode } from '@/lib/keyboard/types';
import { useBanglaEditor } from '@/hooks/useBanglaEditor';
import { KeyboardModeSelector } from '../keyboard/KeyboardModeSelector';
import { EditorTextarea } from './EditorTextarea';
import { EditorToolbar } from './EditorToolbar';
import { AvroCandidateBar } from './AvroCandidateBar';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Info } from 'lucide-react';

import { useState } from 'react';

export interface BanglaEditorProps {
  mode?: KeyboardMode;
  onModeChange?: (mode: KeyboardMode) => void;
  showModeSelector?: boolean;
  className?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

/**
 * Full-featured Bangla Textarea Editor component.
 * Includes built-in Avro candidate suggestion dropdown positioned dynamically above the caret,
 * Jatiyo keyboard layout support, live character and word counters,
 * instant clipboard copy, clear dialog, and text conversion.
 */
export function BanglaEditor({
  mode: controlledMode,
  onModeChange,
  showModeSelector = true,
  className = '',
  initialValue = '',
  onChange,
  placeholder,
}: BanglaEditorProps = {}) {
  const [internalMode, setInternalMode] = useState<KeyboardMode>('avro');
  const mode = controlledMode ?? internalMode;
  const handleModeChange = onModeChange ?? setInternalMode;

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
    handlePaste,
    convertCurrentTextToBangla,
    candidates,
    activeRaw,
    selectedCandidateIndex,
    selectCandidate,
  } = useBanglaEditor({ mode, initialValue, onValueChange: onChange });

  const hasCandidateBar = Boolean(mode === 'avro' && activeRaw && candidates.length > 0);

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {/* Editor Main Glass Container */}
      <div className="relative flex flex-col rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-2xl transition-all overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
        
        {/* Top Header Bar: Mode Switcher & Contextual Hint (optional / when enabled) */}
        {showModeSelector && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/40">
            <KeyboardModeSelector mode={mode} onModeChange={handleModeChange} />

            {/* Quick Helper Badge */}
            <div className="flex items-center gap-2 text-xs font-body text-zinc-500 dark:text-zinc-400">
              {mode === 'avro' && (
                <Badge variant="emerald" size="sm" className="text-[11px] font-normal py-1 px-2.5">
                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>যেমন: kemon achhen → কেমন আছেন</span>
                </Badge>
              )}
              {mode === 'jatiyo' && (
                <Badge variant="blue" size="sm" className="text-[11px] font-normal py-1 px-2.5">
                  <Info className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span>যেকোনো যুক্তবর্ণের জন্য &apos;্&apos; (g) চাপুন</span>
                </Badge>
              )}
              {mode === 'english' && (
                <Badge variant="secondary" size="sm" className="text-[11px] font-normal py-1 px-2.5">
                  <span>Standard English mode</span>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Suggestion Bar Portaled above typing caret */}
        {hasCandidateBar && (
          <AvroCandidateBar
            targetRef={textareaRef}
            rawWord={activeRaw}
            candidates={candidates}
            selectedIndex={selectedCandidateIndex}
            onSelect={selectCandidate}
          />
        )}

        {/* Text Area */}
        <EditorTextarea
          textareaRef={textareaRef}
          text={text}
          mode={mode}
          hasCandidateBar={hasCandidateBar}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onClick={handleClick}
          onBlur={handleBlur}
          onPaste={handlePaste}
          placeholder={placeholder}
        />

        {/* Bottom Toolbar */}
        <EditorToolbar
          stats={stats}
          mode={mode}
          copied={copied}
          onCopy={copyToClipboard}
          onClear={clearText}
          onConvert={convertCurrentTextToBangla}
          hasText={text.length > 0}
        />
      </div>
    </div>
  );
}
