'use client';

import { useState } from 'react';
import { KeyboardMode } from '@/lib/keyboard/types';
import { useBanglaInput } from '@/hooks/useBanglaInput';
import { AvroCandidateBar } from './AvroCandidateBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check, X } from 'lucide-react';

export interface BanglaInputProps {
  mode?: KeyboardMode;
  placeholder?: string;
  initialValue?: string;
  onValueChange?: (val: string) => void;
  className?: string;
  showCopy?: boolean;
  showClear?: boolean;
}

/**
 * Reusable single-line Bangla input component with built-in Avro transliteration,
 * caret-aware suggestions, Jatiyo mapping, copy, and clear functionality.
 */
export function BanglaInput({
  mode = 'avro',
  placeholder = 'এক লাইনে বাংলায় লিখুন (যেমন: bangla → বাংলা)...',
  initialValue = '',
  onValueChange,
  className = '',
  showCopy = true,
  showClear = true,
}: BanglaInputProps = {}) {
  const [copied, setCopied] = useState(false);

  const {
    value,
    inputRef,
    handleKeyDown,
    handleChange,
    handleBlur,
    clearValue,
    candidates,
    activeRaw,
    selectedCandidateIndex,
    selectCandidate,
    hasCandidateBar,
  } = useBanglaInput({ mode, initialValue, onValueChange });

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Floating suggestion bar positioned directly above current caret */}
      {hasCandidateBar && (
        <AvroCandidateBar
          targetRef={inputRef}
          rawWord={activeRaw}
          candidates={candidates}
          selectedIndex={selectedCandidateIndex}
          onSelect={selectCandidate}
        />
      )}

      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="pr-20 h-11 text-base font-body"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {showClear && value && (
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              onClick={clearValue}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              title="Clear"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
          {showCopy && (
            <Button
              size="icon-xs"
              variant="ghost"
              onClick={handleCopy}
              disabled={!value}
              title="Copy"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
