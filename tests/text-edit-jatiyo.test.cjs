const test = require('node:test');
const assert = require('node:assert/strict');

const { getJatiyoChar } = require('../.test-build/jatiyo-map.js');
const { getTextEdit } = require('../.test-build/text-edit.js');

test('text edit returns null for unchanged input', () => {
  assert.equal(getTextEdit('বাংলা', 'বাংলা'), null);
});

test('text edit describes insertion at the caret', () => {
  assert.deepEqual(getTextEdit('ab', 'aXb'), {
    start: 1,
    removedText: '',
    insertedText: 'X',
  });
});

test('text edit describes replacement and deletion', () => {
  assert.deepEqual(getTextEdit('abcde', 'abXYe'), {
    start: 2,
    removedText: 'cd',
    insertedText: 'XY',
  });
  assert.deepEqual(getTextEdit('abc', 'ac'), {
    start: 1,
    removedText: 'b',
    insertedText: '',
  });
});

test('text edit handles UTF-16 indices consistently with DOM selections', () => {
  assert.deepEqual(getTextEdit('a😀b', 'a😀Xb'), {
    start: 3,
    removedText: '',
    insertedText: 'X',
  });
});

test('Jatiyo mapping resolves default and shifted keys', () => {
  assert.equal(getJatiyoChar({ key: 'q' }), 'ঙ');
  assert.equal(getJatiyoChar({ key: 'Q', shiftKey: true }), 'ং');
  assert.equal(getJatiyoChar({ key: 'A', shiftKey: true }), 'ৗ');
});

test('Jatiyo mapping resolves AltGr and shift+AltGr keys', () => {
  assert.equal(getJatiyoChar({ key: 'w', altKey: true }), '্য');
  assert.equal(getJatiyoChar({ key: 'v', altKey: true, shiftKey: true }), 'র্');
});

test('Jatiyo mapping never intercepts ordinary control shortcuts', () => {
  assert.equal(getJatiyoChar({ key: 'c', ctrlKey: true }), null);
  assert.equal(getJatiyoChar({ key: 'v', ctrlKey: true }), null);
});
