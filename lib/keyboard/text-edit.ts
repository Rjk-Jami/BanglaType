/**
 * Describes a single contiguous edit between two input values.
 *
 * The offsets use JavaScript string indices, matching DOM selectionStart /
 * selectionEnd (UTF-16 code units).
 */
export interface TextEdit {
  start: number;
  removedText: string;
  insertedText: string;
}

/**
 * Finds the smallest contiguous edit that transforms previousValue into nextValue.
 * Returns null when the values are identical.
 *
 * This is useful for browser input paths where mobile keyboards or IMEs update
 * the input value without producing a usable physical-keyboard event.
 */
export function getTextEdit(
  previousValue: string,
  nextValue: string
): TextEdit | null {
  if (previousValue === nextValue) {
    return null;
  }

  let start = 0;
  const maxPrefixLength = Math.min(previousValue.length, nextValue.length);

  while (
    start < maxPrefixLength &&
    previousValue[start] === nextValue[start]
  ) {
    start += 1;
  }

  let previousEnd = previousValue.length;
  let nextEnd = nextValue.length;

  while (
    previousEnd > start &&
    nextEnd > start &&
    previousValue[previousEnd - 1] === nextValue[nextEnd - 1]
  ) {
    previousEnd -= 1;
    nextEnd -= 1;
  }

  return {
    start,
    removedText: previousValue.slice(start, previousEnd),
    insertedText: nextValue.slice(start, nextEnd),
  };
}
