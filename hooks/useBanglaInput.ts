'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { KeyboardMode } from '@/lib/keyboard/types';
import { getJatiyoChar } from '@/lib/keyboard/jatiyo-map';
import { getTextEdit } from '@/lib/keyboard/text-edit';
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
  const [value, setValueState] = useState<string>(initialValue);
  const onValueChangeRef = useRef(onValueChange);
  const previousInitialValueRef = useRef(initialValue);
  const previousNotifiedValueRef = useRef(initialValue);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [activeRaw, setActiveRaw] = useState<string>('');
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setValue = useCallback((nextValue: string | ((previous: string) => string)) => {
    setValueState(nextValue);
  }, []);

  useEffect(() => {
    onValueChangeRef.current = onValueChange;
  }, [onValueChange]);

  useEffect(() => {
    if (previousNotifiedValueRef.current !== value) {
      previousNotifiedValueRef.current = value;
      onValueChangeRef.current?.(value);
    }
  }, [value]);

  useEffect(() => {
    if (previousInitialValueRef.current !== initialValue) {
      previousInitialValueRef.current = initialValue;
      setValue(initialValue);
      avroStateRef.current = createInitialAvroState();
      activeSuggestionsReqRef.current += 1;
      setCandidates([]);
      setActiveRaw('');
      setSelectedCandidateIndex(0);
    }
  }, [initialValue, setValue]);

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
      setCandidates([]);
      setActiveRaw('');
      setSelectedCandidateIndex(0);
      input.focus();
    },
    [candidates, value, activeRaw, commitAvroBuffer]
  );

  const updateSuggestionsForBuffer = useCallback((raw: string) => {
    if (!raw) {
      activeSuggestionsReqRef.current += 1;
      avroStateRef.current = createInitialAvroState();
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
        // Tab commits the currently highlighted candidate.
        if (e.key === 'Tab') {
          e.preventDefault();
          selectCandidate(selectedCandidateIndex, false);
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
    ]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.currentTarget.value;
      const nativeEvent = e.nativeEvent as InputEvent;
      const edit = getTextEdit(value, nextValue);

      // Let the browser/OS finish active IME composition without interfering.
      if (nativeEvent.isComposing) {
        activeSuggestionsReqRef.current += 1;
        setCandidates([]);
        setActiveRaw('');
        setSelectedCandidateIndex(0);
        setValue(nextValue);
        commitAvroBuffer();
        return;
      }

      // Native input events are the fallback for mobile keyboards that do not
      // provide a useful keydown event. Only transform a single ASCII insertion;
      // paste, autocorrect, and multi-character edits must remain intact.
      if (
        edit &&
        edit.insertedText.length === 1 &&
        /^[a-zA-Z0-9`~^:]$/.test(edit.insertedText) &&
        mode !== 'english'
      ) {
        const key = edit.insertedText;
        const selectionEnd = edit.start + edit.removedText.length;

        if (mode === 'jatiyo') {
          const mappedChar = getJatiyoChar({
            key,
            shiftKey: key !== key.toLowerCase(),
            altKey: false,
            ctrlKey: false,
          });

          if (mappedChar !== null) {
            const newText =
              value.slice(0, edit.start) +
              mappedChar +
              value.slice(selectionEnd);
            const newCaret = edit.start + mappedChar.length;
            pendingCaretRef.current = newCaret;
            setValue(newText);
            commitAvroBuffer();
            return;
          }
        } else if (mode === 'avro') {
          const result = processAvroKeystroke(
            key,
            value,
            edit.start,
            selectionEnd,
            avroStateRef.current
          );

          if (result.handled) {
            avroStateRef.current = result.newState;
            pendingCaretRef.current = result.newCaret;
            setValue(result.newText);
            updateSuggestionsForBuffer(result.newState.rawBuffer);

            if (result.committedWord) {
              setCachedWord(result.committedWord.raw, result.committedWord.bangla);
            }
            return;
          }
        }
      }

      // Deletions, paste, autocorrect, non-Latin input, and ordinary English
      // input follow the native browser result and reset stale phonetic state.
      activeSuggestionsReqRef.current += 1;
      setCandidates([]);
      setActiveRaw('');
      setSelectedCandidateIndex(0);
      setValue(nextValue);
      if (mode === 'avro' && avroStateRef.current.rawBuffer) {
        commitAvroBuffer();
      } else if (mode !== 'avro') {
        avroStateRef.current = createInitialAvroState();
      }
    },
    [
      value,
      mode,
      commitAvroBuffer,
      updateSuggestionsForBuffer,
    ]
  );

  const handleBlur = useCallback(() => {
    commitAvroBuffer();
  }, [commitAvroBuffer]);

  const clearValue = useCallback(() => {
    setValue('');
    commitAvroBuffer();
    inputRef.current?.focus();
  }, [commitAvroBuffer]);

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
