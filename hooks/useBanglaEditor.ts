'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { KeyboardMode, EditorStats } from '@/lib/keyboard/types';
import { getJatiyoChar } from '@/lib/keyboard/jatiyo-map';
import { getTextEdit } from '@/lib/keyboard/text-edit';
import {
  createInitialAvroState,
  processAvroKeystroke,
  applyAvroCandidate,
  convertToBangla,
  isIgnoredKey,
  AvroTypingState,
} from '@/lib/keyboard/avro-engine';
import {
  fetchWordSuggestions,
  setCachedWord,
  smartTransliterateFullText,
} from '@/lib/keyboard/smart-translit';

export interface UseBanglaEditorProps {
  mode?: KeyboardMode;
  initialValue?: string;
  onValueChange?: (val: string) => void;
}

export function useBanglaEditor({
  mode = 'avro',
  initialValue = '',
  onValueChange,
}: UseBanglaEditorProps = {}) {
  const [text, setTextState] = useState<string>(initialValue);
  const onValueChangeRef = useRef(onValueChange);
  useEffect(() => {
    onValueChangeRef.current = onValueChange;
  }, [onValueChange]);

  const setText = useCallback((newVal: string | ((prev: string) => string)) => {
    setTextState((prev) => {
      const resolved = typeof newVal === 'function' ? newVal(prev) : newVal;
      onValueChangeRef.current?.(resolved);
      return resolved;
    });
  }, []);

  const [copied, setCopied] = useState(false);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [activeRaw, setActiveRaw] = useState<string>('');
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
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
    if (pendingCaretRef.current !== null && textareaRef.current) {
      const pos = pendingCaretRef.current;
      textareaRef.current.setSelectionRange(pos, pos);
      pendingCaretRef.current = null;
    }
  }, [text]);

  const stats: EditorStats = useMemo(() => {
    const chars = text.length;
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const lines = text ? text.split('\n').length : 1;
    return { characters: chars, words, lines };
  }, [text]);

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
      const textarea = textareaRef.current;
      if (!textarea || candidates.length === 0 || !candidates[index]) {
        commitAvroBuffer();
        return;
      }

      const chosen = candidates[index];
      const toInsert = appendSpace ? chosen + ' ' : chosen;
      const start = textarea.selectionStart;
      const res = applyAvroCandidate(
        toInsert,
        text,
        start,
        avroStateRef.current
      );

      if (activeRaw) {
        setCachedWord(activeRaw, chosen);
      }

      avroStateRef.current = res.newState;
      pendingCaretRef.current = res.newCaret;
      setText(res.newText);
      setCandidates([]);
      setActiveRaw('');
      setSelectedCandidateIndex(0);
      textarea.focus();
    },
    [candidates, text, activeRaw, commitAvroBuffer, setText]
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
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (isIgnoredKey(e.key)) {
        return;
      }

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

      // Navigation / Escape when candidate bar is not active
      if (
        [
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Home',
          'End',
          'PageUp',
          'PageDown',
        ].includes(e.key)
      ) {
        commitAvroBuffer();
        return;
      }

      if (e.key === 'Escape') {
        commitAvroBuffer();
        return;
      }

      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

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
          const before = text.slice(0, start);
          const after = text.slice(end);
          const newText = before + mappedChar + after;
          pendingCaretRef.current = start + mappedChar.length;
          setText(newText);
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
          text,
          start,
          end,
          avroStateRef.current
        );

        if (res.handled) {
          e.preventDefault();
          avroStateRef.current = res.newState;
          pendingCaretRef.current = res.newCaret;
          setText(res.newText);

          if (res.newState.rawBuffer) {
            updateSuggestionsForBuffer(res.newState.rawBuffer);
          } else {
            setCandidates([]);
            setActiveRaw('');
            setSelectedCandidateIndex(0);
          }

          if (res.committedWord) {
            const { raw, bangla } = res.committedWord;
            setCachedWord(raw, bangla);
          }
        } else {
          commitAvroBuffer();
          if (/^[a-zA-Z]$/.test(e.key)) {
            e.preventDefault();
          }
        }
      }
    },
    [
      mode,
      text,
      candidates,
      selectedCandidateIndex,
      commitAvroBuffer,
      selectCandidate,
      updateSuggestionsForBuffer,
      setText,
    ]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = e.currentTarget.value;
      const nativeEvent = e.nativeEvent as InputEvent;
      const edit = getTextEdit(text, nextValue);

      // Do not transform intermediate IME composition values.
      if (nativeEvent.isComposing) {
        activeSuggestionsReqRef.current += 1;
        setCandidates([]);
        setActiveRaw('');
        setSelectedCandidateIndex(0);
        setText(nextValue);
        commitAvroBuffer();
        return;
      }

      // Mobile browsers may emit text input without a useful keydown event.
      // Use the smallest text diff as a fallback, but never reinterpret paste,
      // autocorrect, or multi-character insertions as individual key presses.
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
              text.slice(0, edit.start) +
              mappedChar +
              text.slice(selectionEnd);
            pendingCaretRef.current = edit.start + mappedChar.length;
            setText(newText);
            commitAvroBuffer();
            return;
          }
        } else if (mode === 'avro') {
          const result = processAvroKeystroke(
            key,
            text,
            edit.start,
            selectionEnd,
            avroStateRef.current
          );

          if (result.handled) {
            avroStateRef.current = result.newState;
            pendingCaretRef.current = result.newCaret;
            setText(result.newText);

            if (result.newState.rawBuffer) {
              updateSuggestionsForBuffer(result.newState.rawBuffer);
            } else {
              setCandidates([]);
              setActiveRaw('');
              setSelectedCandidateIndex(0);
            }

            if (result.committedWord) {
              setCachedWord(result.committedWord.raw, result.committedWord.bangla);
            }
            return;
          }
        }
      }

      // Deletion, paste, autocorrect, non-Latin input, and English mode should
      // preserve the browser's result and invalidate any stale Avro buffer.
      activeSuggestionsReqRef.current += 1;
      setCandidates([]);
      setActiveRaw('');
      setSelectedCandidateIndex(0);
      setText(nextValue);
      commitAvroBuffer();
    },
    [text, mode, setText, commitAvroBuffer, updateSuggestionsForBuffer]
  );

  const handleClick = useCallback(() => {
    commitAvroBuffer();
  }, [commitAvroBuffer]);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      commitAvroBuffer();
      if (mode === 'avro') {
        const pastedText = e.clipboardData.getData('text');
        if (pastedText) {
          e.preventDefault();
          const textarea = textareaRef.current;
          if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const before = text.slice(0, start);
            const after = text.slice(end);

            const fastConverted = convertToBangla(pastedText);
            const newText = before + fastConverted + after;
            pendingCaretRef.current = start + fastConverted.length;
            setText(newText);

            smartTransliterateFullText(pastedText).then((refined) => {
              if (refined && refined !== fastConverted) {
                setText((curr) => {
                  if (
                    curr.slice(start, start + fastConverted.length) ===
                    fastConverted
                  ) {
                    const diff = refined.length - fastConverted.length;
                    if (
                      pendingCaretRef.current !== null &&
                      pendingCaretRef.current >= start + fastConverted.length
                    ) {
                      pendingCaretRef.current += diff;
                    }
                    return (
                      curr.slice(0, start) +
                      refined +
                      curr.slice(start + fastConverted.length)
                    );
                  }
                  return curr;
                });
              }
            });
          }
        }
      }
    },
    [mode, text, commitAvroBuffer, setText]
  );

  const convertCurrentTextToBangla = useCallback(async () => {
    if (!text.trim()) return;
    commitAvroBuffer();
    const fast = convertToBangla(text);
    setText(fast);
    const refined = await smartTransliterateFullText(text);
    if (refined && refined !== fast) {
      setText(refined);
    }
  }, [text, commitAvroBuffer, setText]);

  const handleBlur = useCallback(() => {
    commitAvroBuffer();
  }, [commitAvroBuffer]);

  const copyToClipboard = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const clearText = useCallback(() => {
    setText('');
    commitAvroBuffer();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [commitAvroBuffer, setText]);

  const insertTextAtCursor = useCallback(
    (insertedText: string) => {
      const textarea = textareaRef.current;
      if (!textarea) {
        setText((prev) => prev + insertedText);
        return;
      }
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = text.slice(0, start);
      const after = text.slice(end);
      const newText = before + insertedText + after;

      pendingCaretRef.current = start + insertedText.length;
      setText(newText);
      textarea.focus();
    },
    [text, setText]
  );

  const hasCandidateBar = Boolean(mode === 'avro' && activeRaw && candidates.length > 0);

  return {
    text,
    setText,
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
    candidates,
    activeRaw,
    selectedCandidateIndex,
    selectCandidate,
    hasCandidateBar,
  };
}
