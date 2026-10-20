const test = require('node:test');
const assert = require('node:assert/strict');

const {
  BUILTIN_DICTIONARY,
  getAvroCandidates,
  parse,
  phoneticParse,
  toBangla,
} = require('../.test-build/avro-phonetic-engine.js');

test('empty input stays empty', () => {
  assert.deepEqual(parse(''), { bangla: '', english: '' });
  assert.equal(toBangla(''), '');
  assert.deepEqual(getAvroCandidates(''), []);
});

test('default parsing uses phonetic rules instead of the built-in dictionary', () => {
  for (const input of ['ami', 'shikkha', 'unseenphoneme', 'Bangla']) {
    assert.equal(parse(input).bangla, phoneticParse(input), input);
    assert.equal(parse(input, { dictionary: false }).bangla, phoneticParse(input), input);
  }
});

test('a caller-supplied dictionary remains an explicit opt-in', () => {
  assert.equal(parse('ami', { dictionary: { ami: 'পরীক্ষা' } }).bangla, 'পরীক্ষা');
  assert.equal(parse('ami', { dictionary: false }).bangla, phoneticParse('ami'));
  assert.ok(Object.hasOwn(BUILTIN_DICTIONARY, 'ami'));
});

test('dictionary-free conversion still processes mixed text and preserves delimiters', () => {
  const result = toBangla('ami, tumi! 123', {
    banglaDigits: false,
    banglaFullStop: false,
  });
  assert.ok(result.includes(','));
  assert.ok(result.includes('!'));
  assert.ok(result.includes('123'));
  assert.ok(result.includes('আমি') || result.includes(phoneticParse('ami')));
});

test('candidate generation is bounded, unique, and starts with the direct phonetic parse', () => {
  for (const input of ['ami', 'shikkha', 'bari', 'unseenphoneme', 'Bangla']) {
    const candidates = getAvroCandidates(input);
    assert.ok(candidates.length > 0, input);
    assert.ok(candidates.length <= 5, input);
    assert.equal(candidates[0], phoneticParse(input), input);
    assert.equal(new Set(candidates).size, candidates.length, input);
  }
});

test('phonetic conversion can process an unlisted token without a dictionary entry', () => {
  const input = 'qzxv';
  assert.equal(Object.hasOwn(BUILTIN_DICTIONARY, input), false);
  assert.equal(parse(input, { dictionary: false }).bangla, phoneticParse(input));
  assert.notEqual(parse(input, { dictionary: false }).bangla, input);
});
