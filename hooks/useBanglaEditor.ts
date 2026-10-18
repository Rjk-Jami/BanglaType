'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { KeyboardMode, EditorStats } from '@/lib/keyboard/types';
import { getJatiyoChar } from '@/lib/keyboard/jatiyo-map';
import {
  createInitialAvroState,
  processAvroKeystroke,
  convertToBangla,
  isIgnoredKey,
  AvroTypingState,
} from '@/lib/keyboard/avro-engine';
import {
  fetchSmartWord,
  smartTransliterateFullText,
} from '@/lib/keyboard/smart-translit';

interface UseBanglaEditorProps {
  mode: KeyboardMode;
}

export function useBanglaEditor({ mode }: UseBanglaEditorProps) {
  const [text, setText] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const avroStateRef = useRef<AvroTypingState>(createInitialAvroState());
  const pendingCaretRef = useRef<number | null>(null);

  useEffect(() => {
    avroStateRef.current = createInitialAvroState();
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
    avroStateRef.current = createInitialAvroState();
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

      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', 'Escape'].includes(e.key)) {
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

          if (res.committedWord) {
            const { raw, bangla, startPos, endPos } = res.committedWord;
            fetchSmartWord(raw).then((betterBangla) => {
              if (betterBangla && betterBangla !== bangla) {
                setText((current) => {
                  if (current.slice(startPos, endPos) === bangla) {
                    const before = current.slice(0, startPos);
                    const after = current.slice(endPos);
                    const diff = betterBangla.length - bangla.length;
                    if (
                      pendingCaretRef.current !== null &&
                      pendingCaretRef.current >= endPos
                    ) {
                      pendingCaretRef.current += diff;
                    }
                    return before + betterBangla + after;
                  }
                  return current;
                });
              }
            });
          }
        } else {
          commitAvroBuffer();
          if (/^[a-zA-Z]$/.test(e.key)) {
            e.preventDefault();
          }
        }
      }
    },
    [mode, text, commitAvroBuffer]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

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
                  if (curr.slice(start, start + fastConverted.length) === fastConverted) {
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
    [mode, text, commitAvroBuffer]
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
  }, [text, commitAvroBuffer]);

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
  }, [commitAvroBuffer]);

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
    [text]
  );

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
  };
}
