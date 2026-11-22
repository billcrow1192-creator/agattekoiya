// ハードモードの伝え方のテスト（人格を否定しない・危ない時は止まる）
import test from 'node:test';
import assert from 'node:assert/strict';
import { OPENERS, JABS, LOW_ENERGY, CLOSERS, DONE, SKIP, EASE, NG_WORDS, hardSelect, toneMood } from '../js/hard.js';
import { WORDS, CORPUS_INFO } from '../js/engine.js';

const ALL_LINES = [...Object.values(OPENERS).flat(), ...Object.values(JABS).flat(), ...LOW_ENERGY, ...CLOSERS, ...DONE, ...SKIP, EASE];

test('言葉は「落ちません。」と同じ1000語以上', () => {
  assert.ok(WORDS.length >= 1000, `今 ${WORDS.length}`);
  assert.equal(CORPUS_INFO.total, WORDS.length);
});

test('ハードモードの決まり文句に、人格否定・死を連想させる言葉がない', () => {
  for (const line of ALL_LINES) for (const ng of NG_WORDS) assert.ok(!line.includes(ng), `「${line}」に「${ng}」`);
});

test('どの気分・エネルギー・関心ごとでも、言葉と指令と締めが出る', () => {
  for (let mood = 1; mood <= 5; mood++) for (let energy = 1; energy <= 3; energy++) {
    for (const concern of ['none', 'work', 'people', 'money', 'health', 'self']) {
      const r = hardSelect({ mood, energy, concern }, {}, { seed: `t${mood}${energy}${concern}` });
      assert.equal(r.mode, 'normal');
      assert.ok(r.opener && r.order && r.closer && r.deadline, `${mood}/${energy}/${concern}`);
      assert.ok(r.word.text.length > 3);
      if (concern !== 'none') assert.ok(r.jab, `${concern} の一言`);
      if (energy === 1) assert.ok(LOW_ENERGY.includes(r.opener), 'ガス欠の日は量を絞る一言');
    }
  }
});

test('落ちている日（気分1〜2）に選ばれる言葉に「死」「殺」「甘え」が入らない', () => {
  for (let mood = 1; mood <= 2; mood++) for (let i = 0; i < 300; i++) {
    const r = hardSelect({ mood, energy: 1 + (i % 3), concern: ['none', 'work', 'self'][i % 3] }, {}, { seed: `w${mood}-${i}` });
    for (const ng of ['死', '殺', '甘え']) assert.ok(!r.word.text.includes(ng), `${r.word.id}`);
  }
});

test('命に関わる言葉を書いたら、ハードモードを止めて相談窓口へ', () => {
  for (const text of ['もう死にたい', '消えたい', '生きる意味がない']) {
    const r = hardSelect({ mood: 3, energy: 2, text }, {});
    assert.equal(r.mode, 'safety', text);
    assert.match(r.lead, /ハードモードを止める/);
    assert.equal(r.opener, undefined, '叩く言葉は出さない');
  }
});

test('落ちている日でも、背中を押す強すぎる言葉（push だけの言葉）は出さない', () => {
  assert.equal(toneMood(1), 3);
  assert.equal(toneMood(2), 3);
  for (let i = 0; i < 60; i++) {
    const r = hardSelect({ mood: 1, energy: 2 }, {}, { seed: `p${i}` });
    assert.ok(!(r.word.tone.length === 1 && r.word.tone[0] === 'push'), r.word.id);
  }
});

test('「きつすぎる」で外した言葉は、二度と選ばれない', () => {
  const first = hardSelect({ mood: 3, energy: 2 }, {}, { seed: 'x' });
  const again = hardSelect({ mood: 3, energy: 2 }, { disliked: [first.word.id] }, { seed: 'x' });
  assert.notEqual(again.word.id, first.word.id);
});
