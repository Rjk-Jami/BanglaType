'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { KeyboardMode } from '@/lib/keyboard/types';
import { getJatiyoChar } from '@/lib/keyboard/jatiyo-map';
import {
  createInitialAvroState,
  processAvroKeystroke,
  applyAvroCandidate,
  isIgnoredKey,
  AvroTypingState,
} from '@/lib/keyboard/avro-engine';
import {
  fetchWordSuggestions,
  setCachedWord,
} from '@/lib/keyboard/smart-translit';

interface UseBanglaInputProps {
  mode?: KeyboardMode;
  initialValue?: string;
  onValueChange?: (val: string) => void;
}

export function useBanglaInput({
  mode = 'avro',
  initialValue = '',
  onValueChange,
}: UseBanglaInputProps = {}) {
  const [value, setValue] = useState<string>(initialValue);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [activeRaw, setActiveRaw] = useState<string>('');
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const avroStateRef = useRef<AvroTypingState>(createInitialAvroState());
  const pendingCaretRef = useRef<number | null>(null);
  const activeSuggestionsReqRef = useRef<number>(0);

  useEffect(() => {
    // Mode changes invalidate suggestions requested by the previous keyboard mode.
    activeSuggestionsReqRef.current += 1;
    avroStateRef.current = createInitialAvroState();
    const timer = setTimeout(() => {
      setCandidates([]);
      setActiveRaw('');
      setSelectedCandidateIndex(0);
    }, 0);
    return () => clearTimeout(timer);
  }, [mode]);

  useEffect(() => {
    if (pendingCaretRef.current !== null && inputRef.current) {
      const pos = pendingCaretRef.current;
      inputRef.current.setSelectionRange(pos, pos);
      pendingCaretRef.current = null;
    }
  }, [value]);

  const commitAvroBuffer = useCallback(() => {
    // Invalidate any in-flight lookup so an old response cannot reopen the bar.
    activeSuggestionsReqRef.current += 1;
    avroStateRef.current = createInitialAvroState();
    setCandidates([]);
    setActiveRaw('');
    setSelectedCandidateIndex(0);
  }, []);

  const selectCandidate = useCallback(
    (index: number, appendSpace = false) => {
      const input = inputRef.current;
      if (!input || candidates.length === 0 || !candidates[index]) {
        commitAvroBuffer();
        return;
      }

      const chosen = candidates[index];
      const toInsert = appendSpace ? chosen + ' ' : chosen;
      const start = input.selectionStart ?? value.length;
      const res = applyAvroCandidate(
        toInsert,
        value,
        start,
        avroStateRef.current
      );

      if (activeRaw) {
        setCachedWord(activeRaw, chosen);
      }

      avroStateRef.current = res.newState;
      pendingCaretRef.current = res.newCaret;
      setValue(res.newText);
      onValueChange?.(res.newText);
      setCandidates([]);
      setActiveRaw('');
      setSelectedCandidateIndex(0);
      input.focus();
    },
    [candidates, value, activeRaw, commitAvroBuffer, onValueChange]
  );

  const updateSuggestionsForBuffer = useCallback((raw: string) => {
    if (!raw) {
      activeSuggestionsReqRef.current += 1;
      setCandidates([]);
      setActiveRaw('');
      setSelectedCandidateIndex(0);
      return;
    }

    setActiveRaw(raw);
    setSelectedCandidateIndex(0);
    const reqId = ++activeSuggestionsReqRef.current;

    fetchWordSuggestions(raw).then((suggs) => {
      if (reqId === activeSuggestionsReqRef.current) {
        setCandidates(suggs);
      }
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isIgnoredKey(e.key)) return;

      if ((e.ctrlKey || e.metaKey) && !e.altKey) {
        commitAvroBuffer();
        return;
      }

      // Handle keyboard navigation for Avro candidate suggestions
      if (mode === 'avro' && candidates.length > 0) {
        // Tab (and Shift+Tab) switches / cycles through the available candidate options
        if (e.key === 'Tab') {
          e.preventDefault();
          if (e.shiftKey) {
            setSelectedCandidateIndex(
              (prev) => (prev - 1 + candidates.length) % candidates.length
            );
          } else {
            setSelectedCandidateIndex((prev) => (prev + 1) % candidates.length);
          }
          return;
        }

        // Enter inserts the currently highlighted suggestion
        if (e.key === 'Enter') {
          e.preventDefault();
          const targetIdx =
            selectedCandidateIndex >= 0 && selectedCandidateIndex < candidates.length
              ? selectedCandidateIndex
              : 0;
          selectCandidate(targetIdx, false);
          return;
        }

        // Space with a non-first candidate selected commits it and appends a space
        if (e.key === ' ' && selectedCandidateIndex > 0) {
          e.preventDefault();
          selectCandidate(selectedCandidateIndex, true);
          return;
        }

        // Arrow keys cycle through suggestions when the dropdown is open
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          setSelectedCandidateIndex((prev) => (prev + 1) % candidates.length);
          return;
        }

        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          setSelectedCandidateIndex(
            (prev) => (prev - 1 + candidates.length) % candidates.length
          );
          return;
        }

        // Escape closes the suggestion dropdown
        if (e.key === 'Escape') {
          e.preventDefault();
          commitAvroBuffer();
          return;
        }
      }

      if (
        ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(
          e.key
        )
      ) {
        commitAvroBuffer();
        return;
      }

      if (e.key === 'Escape') {
        commitAvroBuffer();
        return;
      }

      const input = inputRef.current;
      if (!input) return;

      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;

      if (mode === 'english') {
        return;
      }

      if (mode === 'jatiyo') {
        if (['Backspace', 'Delete', 'Enter', 'Tab'].includes(e.key)) {
          return;
        }

        const mappedChar = getJatiyoChar({
          key: e.key,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
          ctrlKey: e.ctrlKey,
        });

        if (mappedChar !== null) {
          e.preventDefault();
          const before = value.slice(0, start);
          const after = value.slice(end);
          const newText = before + mappedChar + after;
          pendingCaretRef.current = start + mappedChar.length;
          setValue(newText);
          onValueChange?.(newText);
        } else if (/^[a-zA-Z]$/.test(e.key)) {
          e.preventDefault();
        }
        return;
      }

      if (mode === 'avro') {
        if (e.altKey) {
          commitAvroBuffer();
          return;
        }

        const res = processAvroKeystroke(
          e.key,
          value,
          start,
          end,
          avroStateRef.current
        );

        if (res.handled) {
          e.preventDefault();
          avroStateRef.current = res.newState;
          pendingCaretRef.current = res.newCaret;
          setValue(res.newText);
          onValueChange?.(res.newText);

          updateSuggestionsForBuffer(res.newState.rawBuffer);
        } else {
          commitAvroBuffer();
        }
      }
    },
    [
      mode,
      value,
      candidates,
      selectedCandidateIndex,
      commitAvroBuffer,
      selectCandidate,
      updateSuggestionsForBuffer,
      onValueChange,
    ]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Native edits (paste, autofill, IME, undo) supersede phonetic key handling.
      activeSuggestionsReqRef.current += 1;
      setCandidates([]);
      setActiveRaw('');
      setSelectedCandidateIndex(0);
      setValue(e.target.value);
      onValueChange?.(e.target.value);
      if (mode === 'avro' && avroStateRef.current.rawBuffer) {
        commitAvroBuffer();
      }
    },
    [mode, commitAvroBuffer, onValueChange]
  );

  const handleBlur = useCallback(() => {
    commitAvroBuffer();
  }, [commitAvroBuffer]);

  const clearValue = useCallback(() => {
    setValue('');
    onValueChange?.('');
    commitAvroBuffer();
    inputRef.current?.focus();
  }, [commitAvroBuffer, onValueChange]);

  const hasCandidateBar = Boolean(
    mode === 'avro' && activeRaw && candidates.length > 0
  );

  return {
    value,
    setValue,
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
  };
}
