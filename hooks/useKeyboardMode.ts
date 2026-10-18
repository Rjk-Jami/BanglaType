'use client';

import { useState, useCallback } from 'react';
import { KeyboardMode } from '@/lib/keyboard/types';

export function useKeyboardMode(initialMode: KeyboardMode = 'avro') {
  const [mode, setMode] = useState<KeyboardMode>(initialMode);

  const switchMode = useCallback((newMode: KeyboardMode) => {
    setMode(newMode);
  }, []);

  return {
    mode,
    switchMode,
  };
}
