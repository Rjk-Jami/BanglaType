import { toBangla, getAvroCandidates } from './avro-phonetic-engine';
import { getCachedWord } from './smart-translit';

export interface AvroTypingState {
  rawBuffer: string;
  lastConvertedLength: number;
}

export function createInitialAvroState(): AvroTypingState {
  return {
    rawBuffer: '',
    lastConvertedLength: 0,
  };
}

export function convertToBangla(text: string): string {
  if (!text) return '';
  return toBangla(text);
}

/**
 * Public API alias for converting phonetic text to Bangla synchronously.
 */
export const parseAvroText = convertToBangla;

const IGNORED_KEYS = new Set([
  'Shift',
  'Control',
  'Alt',
  'Meta',
  'CapsLock',
  'NumLock',
  'ScrollLock',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6',
  'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'Insert', 'Delete', 'PrintScreen', 'Pause',
  'ContextMenu',
  'OS', 'Win',
  'Dead',
  'Unidentified',
  'Process',
  'AudioVolumeMute', 'AudioVolumeDown', 'AudioVolumeUp',
  'MediaPlayPause', 'MediaStop', 'MediaTrackPrevious', 'MediaTrackNext',
  'LaunchMail', 'LaunchApp1', 'LaunchApp2',
  'BrowserSearch', 'BrowserHome', 'BrowserBack', 'BrowserForward',
  'BrowserStop', 'BrowserRefresh', 'BrowserFavorites',
]);

export function isPhoneticChar(char: string): boolean {
  if (!char || char.length !== 1) return false;
  return /^[a-zA-Z0-9`~^:]$/.test(char);
}

export function isIgnoredKey(key: string): boolean {
  return IGNORED_KEYS.has(key);
}

export function getConvertedToken(raw: string): string {
  if (!raw) return '';
  // Explicit user corrections may override generated phonetic output.
  const cached = getCachedWord(raw);
  if (cached) return cached;
  const candidates = getAvroCandidates(raw);
  if (candidates.length > 0) return candidates[0];
  return toBangla(raw);
}

export function processAvroKeystroke(
  key: string,
  currentText: string,
  selectionStart: number,
  selectionEnd: number,
  state: AvroTypingState
): {
  newText: string;
  newCaret: number;
  newState: AvroTypingState;
  handled: boolean;
  committedWord?: {
    raw: string;
    bangla: string;
    startPos: number;
    endPos: number;
  };
} {
  if (isIgnoredKey(key)) {
    return {
      newText: currentText,
      newCaret: selectionStart,
      newState: state,
      handled: false,
    };
  }

  // Handle text selection replacement
  if (selectionStart !== selectionEnd) {
    const textBefore = currentText.slice(0, selectionStart);
    const textAfter = currentText.slice(selectionEnd);

    if (key === 'Backspace' || key === 'Delete') {
      return {
        newText: textBefore + textAfter,
        newCaret: textBefore.length,
        newState: createInitialAvroState(),
        handled: true,
      };
    }

    if (isPhoneticChar(key)) {
      const newRaw = key;
      const converted = getConvertedToken(newRaw);
      const newText = textBefore + converted + textAfter;
      const newCaret = textBefore.length + converted.length;
      return {
        newText,
        newCaret,
        newState: {
          rawBuffer: newRaw,
          lastConvertedLength: converted.length,
        },
        handled: true,
      };
    } else {
      let insert = '';
      if (key === 'Enter') {
        insert = '\n';
      } else if (key === '$') {
        insert = '৳';
      } else if (key.length === 1) {
        insert = key;
      } else {
        return {
          newText: currentText,
          newCaret: selectionStart,
          newState: createInitialAvroState(),
          handled: false,
        };
      }

      const newText = textBefore + insert + textAfter;
      const newCaret = textBefore.length + insert.length;
      return {
        newText,
        newCaret,
        newState: createInitialAvroState(),
        handled: true,
      };
    }
  }

  // Handle Backspace inside current phonetic token
  if (key === 'Backspace' && state.rawBuffer.length > 0) {
    const newRaw = state.rawBuffer.slice(0, -1);
    const textBeforeToken = currentText.slice(
      0,
      Math.max(0, selectionStart - state.lastConvertedLength)
    );
    const textAfter = currentText.slice(selectionStart);

    if (newRaw.length > 0) {
      const converted = getConvertedToken(newRaw);
      const newText = textBeforeToken + converted + textAfter;
      const newCaret = textBeforeToken.length + converted.length;
      return {
        newText,
        newCaret,
        newState: {
          rawBuffer: newRaw,
          lastConvertedLength: converted.length,
        },
        handled: true,
      };
    } else {
      const newText = textBeforeToken + textAfter;
      const newCaret = textBeforeToken.length;
      return {
        newText,
        newCaret,
        newState: createInitialAvroState(),
        handled: true,
      };
    }
  }

  // Handle Phonetic character input
  if (isPhoneticChar(key)) {
    const newRaw = state.rawBuffer + key;
    const textBeforeToken = currentText.slice(
      0,
      Math.max(0, selectionStart - state.lastConvertedLength)
    );
    const textAfter = currentText.slice(selectionStart);

    const converted = getConvertedToken(newRaw);
    const newText = textBeforeToken + converted + textAfter;
    const newCaret = textBeforeToken.length + converted.length;

    return {
      newText,
      newCaret,
      newState: {
        rawBuffer: newRaw,
        lastConvertedLength: converted.length,
      },
      handled: true,
    };
  }

  // Handle Delimiters (Space, Enter, Punctuation)
  if (
    state.rawBuffer.length > 0 ||
    key === ' ' ||
    key === 'Enter' ||
    key === '.' ||
    key === ',' ||
    key === '?' ||
    key === '!' ||
    key === ';' ||
    key === '$'
  ) {
    let insertChar = key === 'Enter' ? '\n' : key;
    if (key === '$') {
      insertChar = '৳';
    } else if (key === '.') {
      // In Bengali, full stop is Dari (।) when after a non-digit
      const charBefore = selectionStart > 0 ? currentText[selectionStart - 1] : '';
      if (!/^[0-9০-৯]$/.test(charBefore)) {
        insertChar = '।';
      }
    }

    const textBefore = currentText.slice(0, selectionStart);
    const textAfter = currentText.slice(selectionStart);
    const newText = textBefore + insertChar + textAfter;
    const newCaret = textBefore.length + insertChar.length;

    let committedWord:
      | { raw: string; bangla: string; startPos: number; endPos: number }
      | undefined;

    if (state.rawBuffer.length > 0) {
      const wordStart = selectionStart - state.lastConvertedLength;
      committedWord = {
        raw: state.rawBuffer,
        bangla: currentText.slice(wordStart, selectionStart),
        startPos: wordStart,
        endPos: selectionStart,
      };
    }

    return {
      newText,
      newCaret,
      newState: createInitialAvroState(),
      handled: true,
      committedWord,
    };
  }

  return {
    newText: currentText,
    newCaret: selectionStart,
    newState: state,
    handled: false,
  };
}

export function applyAvroCandidate(
  chosenBangla: string,
  currentText: string,
  selectionStart: number,
  state: AvroTypingState
): {
  newText: string;
  newCaret: number;
  newState: AvroTypingState;
} {
  const wordStart = Math.max(0, selectionStart - state.lastConvertedLength);
  const before = currentText.slice(0, wordStart);
  const after = currentText.slice(selectionStart);
  const newText = before + chosenBangla + after;
  const newCaret = before.length + chosenBangla.length;

  return {
    newText,
    newCaret,
    newState: createInitialAvroState(),
  };
}
