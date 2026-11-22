// ハードモードの伝え方のテスト（人格を否定しない・危ない時は止まる）
import test from 'node:test';
import assert from 'node:assert/strict';
import { OPENERS, JABS, LOW_ENERGY, CLOSERS, CLOSERS_HARD, DONE, SKIP, EASE, NG_WORDS, hardSelect, toneMood } from '../js/hard.js';
import { WORDS, CORPUS_INFO } from '../js/engine.js';

const ALL_LINES = [...Object.values(OPENERS).flat(), ...Object.values(JABS).flat(), ...LOW_ENERGY, ...CLOSERS, ...CLOSERS_HARD, ...DONE, ...SKIP, EASE];

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

test('いちばん厳しい締めは、落ちている日（気分1〜2）には出さない', () => {
  for (const mood of [1, 2]) for (let i = 0; i < 200; i++) {
    const r = hardSelect({ mood, energy: 2 }, {}, { seed: `h${mood}-${i}` });
    assert.ok(!CLOSERS_HARD.includes(r.closer), r.closer);
  }
});

test('「きつすぎる」で外した言葉は、二度と選ばれない', () => {
  const first = hardSelect({ mood: 3, energy: 2 }, {}, { seed: 'x' });
  const again = hardSelect({ mood: 3, energy: 2 }, { disliked: [first.word.id] }, { seed: 'x' });
  assert.notEqual(again.word.id, first.word.id);
});

import { EPISODES } from '../js/data/episodes.js';
import { pickEpisode } from '../js/hard.js';

test('先人の戦歴：全部に出典URLがあり、決まり文句にNG語がない', () => {
  assert.ok(EPISODES.length >= 10);
  const ids = new Set();
  for (const e of EPISODES) {
    assert.ok(!ids.has(e.id), e.id); ids.add(e.id);
    for (const k of ['who', 'role', 'story', 'fire', 'source']) assert.ok(e[k], `${e.id} の ${k}`);
    if (!e.heard) assert.match(e.url, /^https:\/\//, e.id);
    assert.ok(['comeback', 'grind', 'start'].includes(e.kind), e.id);
    for (const ng of NG_WORDS) assert.ok(!e.fire.includes(ng) && !e.story.includes(ng), `${e.id} に「${ng}」`);
  }
});

test('落ちている日（気分1〜2）の戦歴は「失敗からの逆転」だけ', () => {
  for (const mood of [1, 2]) for (let i = 0; i < 50; i++) {
    for (const concern of [null, 'work', 'money', 'self', 'people', 'health']) {
      assert.equal(pickEpisode(mood, concern, `s${i}`).kind, 'comeback');
    }
  }
  const r = hardSelect({ mood: 4, energy: 2, concern: 'work' }, {}, { seed: 'e' });
  assert.ok(r.episode && r.episode.who);
});

import { fitsHard, CONTRADICTS_HARD } from '../js/hard.js';

test('言葉の精査：ハードモードと真逆の言葉・なぐさめだけの言葉は出ない', () => {
  const seen = new Set();
  for (let mood = 1; mood <= 5; mood++) for (let energy = 1; energy <= 3; energy++) for (let i = 0; i < 60; i++) {
    const concern = ['none', 'work', 'people', 'money', 'health', 'self'][i % 6];
    const r = hardSelect({ mood, energy, concern }, {}, { seed: `f${mood}${energy}-${i}` });
    assert.ok(!CONTRADICTS_HARD.test(r.word.text), `${r.word.id}：${r.word.text}`);
    assert.ok(fitsHard(r.word, energy), `${r.word.id} はハードモードに合わない`);
    seen.add(r.word.id);
  }
  assert.ok(seen.size >= 120, `出る言葉の種類が少なすぎる（${seen.size}）`);
});

test('言葉の精査：ハードモードで使える言葉は700語以上ある', () => {
  assert.ok(WORDS.filter((w) => fitsHard(w, 2)).length >= 700);
  assert.ok(!fitsHard(WORDS.find((w) => w.id === 'o-manten'), 1), '「上がらなくていい」は出さない');
});

import { COACHES, REACTIONS } from '../js/coaches.js';

test('教官：男性・女性のどちらの口調にも、人格否定・NG語がない', () => {
  for (const c of Object.values(COACHES)) {
    const lines = [c.intro, c.sample, ...Object.values(c.openers).flat(), ...Object.values(c.jabs).flat(), ...c.lowEnergy, ...c.closers, ...c.closersHard, ...c.done, ...c.skip, c.ease, ...c.agree, ...c.disagree];
    for (const line of lines) for (const ng of NG_WORDS) assert.ok(!line.includes(ng), `${c.id}「${line}」に「${ng}」`);
    for (let m = 1; m <= 5; m++) assert.ok(c.openers[m].length >= 3, `${c.id} 気分${m}`);
    for (const k of ['work', 'people', 'money', 'health', 'self']) assert.ok(c.jabs[k].length >= 2, `${c.id} ${k}`);
  }
  assert.equal(REACTIONS.agree, 'その通りっす');
  assert.equal(REACTIONS.disagree, 'なんか違うっす');
});

test('教官：選んだ教官の口調で出る。危ない時の言葉は教官に関係なく同じ', () => {
  for (const id of ['male', 'female']) {
    const r = hardSelect({ mood: 3, energy: 2, concern: 'work' }, {}, { seed: 'c', coach: id });
    assert.equal(r.coach, id);
    assert.ok(Object.values(COACHES[id].openers).flat().includes(r.opener));
    assert.ok([...COACHES[id].closers, ...COACHES[id].closersHard].includes(r.closer));
    const s = hardSelect({ mood: 3, energy: 2, text: '消えたい' }, {}, { coach: id });
    assert.equal(s.mode, 'safety');
    assert.match(s.lead, /ハードモードを止める/);
  }
  // 落ちている日は、どちらの教官でもいちばん厳しい締めを出さない
  for (const id of ['male', 'female']) for (let i = 0; i < 100; i++) {
    const r = hardSelect({ mood: 1, energy: 2 }, {}, { seed: `l${i}`, coach: id });
    assert.ok(!COACHES[id].closersHard.includes(r.closer), r.closer);
  }
});
