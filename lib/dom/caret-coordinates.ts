/**
 * Caret Coordinates Utility
 * Accurately measures the viewport-relative coordinates of the caret/cursor
 * in HTMLInputElement and HTMLTextAreaElement.
 */

export interface CaretCoordinates {
  top: number;
  bottom: number;
  left: number;
  height: number;
}

const PROPERTIES_TO_COPY = [
  'direction',
  'boxSizing',
  'width',
  'height',
  'overflowX',
  'overflowY',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',
  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',
  'letterSpacing',
  'wordSpacing',
  'tabSize',
  'whiteSpace',
  'wordBreak',
  'overflowWrap',
] as const;

let mirrorDiv: HTMLDivElement | null = null;

function getMirrorDiv(): HTMLDivElement {
  if (!mirrorDiv && typeof document !== 'undefined') {
    mirrorDiv = document.createElement('div');
    mirrorDiv.id = '__bangla_caret_mirror__';
    mirrorDiv.setAttribute('aria-hidden', 'true');
    // Must be position: absolute (NOT fixed) so marker.offsetTop/offsetLeft have a valid offsetParent
    mirrorDiv.style.position = 'absolute';
    mirrorDiv.style.top = '0px';
    mirrorDiv.style.left = '-9999px';
    mirrorDiv.style.visibility = 'hidden';
    mirrorDiv.style.pointerEvents = 'none';
    mirrorDiv.style.zIndex = '-9999';
    document.body.appendChild(mirrorDiv);
  }
  return mirrorDiv!;
}

export function getCaretCoordinates(
  element: HTMLElement,
  customPosition?: number
): CaretCoordinates {
  const isInput = element.tagName === 'INPUT';
  const isTextarea = element.tagName === 'TEXTAREA';

  const rect = element.getBoundingClientRect();

  if (!isInput && !isTextarea) {
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      height: 24,
    };
  }

  const inputElement = element as HTMLInputElement | HTMLTextAreaElement;
  const position =
    typeof customPosition === 'number'
      ? customPosition
      : inputElement.selectionStart ?? inputElement.value.length;

  const computed = window.getComputedStyle(element);
  const mirror = getMirrorDiv();

  // Reset styles
  mirror.className = '';
  mirror.style.cssText =
    'position: absolute; top: 0px; left: -9999px; visibility: hidden; pointer-events: none; z-index: -9999;';

  // Copy geometry & typography styles
  for (const prop of PROPERTIES_TO_COPY) {
    if (isInput && prop === 'lineHeight') {
      mirror.style.lineHeight = computed.height;
    } else {
      mirror.style[prop] = computed[prop];
    }
  }

  if (isInput) {
    mirror.style.whiteSpace = 'pre';
    mirror.style.overflow = 'hidden';
  } else {
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.style.wordWrap = 'break-word';
    mirror.style.overflowWrap = 'break-word';
    mirror.style.overflow = 'hidden';
  }

  const text = inputElement.value;
  let textBefore = text.substring(0, position);
  if (isInput) {
    textBefore = textBefore.replace(/\s/g, '\u00a0');
  }

  // Clear previous mirror content
  mirror.textContent = textBefore;

  // Insert marker span at current caret position
  const marker = document.createElement('span');
  marker.textContent = text.substring(position) || '.';
  mirror.appendChild(marker);

  const borderTop = parseInt(computed.borderTopWidth, 10) || 0;
  const borderLeft = parseInt(computed.borderLeftWidth, 10) || 0;
  const parsedLineHeight = parseFloat(computed.lineHeight);
  const parsedFontSize = parseFloat(computed.fontSize);
  // The marker contains the text after the caret to preserve wrapping. Its
  // offsetHeight can therefore span many lines; use one line's height instead.
  const height =
    Number.isFinite(parsedLineHeight) && parsedLineHeight > 0
      ? parsedLineHeight
      : Number.isFinite(parsedFontSize) && parsedFontSize > 0
        ? parsedFontSize * 1.3
        : 24;

  // Translate relative offset within element to viewport coordinates
  const caretX = rect.left + marker.offsetLeft + borderLeft - inputElement.scrollLeft;
  const caretY = rect.top + marker.offsetTop + borderTop - inputElement.scrollTop;

  // Clamp within the element's visible bounding box
  const clampedX = Math.min(Math.max(caretX, rect.left), rect.right);
  const clampedY = Math.min(Math.max(caretY, rect.top), rect.bottom);

  return {
    top: clampedY,
    bottom: clampedY + height,
    left: clampedX,
    height,
  };
}
