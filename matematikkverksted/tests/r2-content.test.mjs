import test from 'node:test';
import assert from 'node:assert/strict';
import { course } from '../dist/pfag/r2.js';

test('R2 dekker alle tolv kompetansemål med åpne oppgaver og vurdering', () => {
  assert.equal(course.title, 'R2');
  assert.match(course.source, /mat03-02\/kompetansemaal-og-vurdering\/kv294/);
  assert.equal(course.chapters.length, 12);
  assert.equal(new Set(course.chapters.map(c => c.id)).size, 12);
  assert.deepEqual(course.chapters.map(c => c.id), ['rekker', 'rekursjon', 'integral', 'fundamentalteorem', 'numerisk', 'modeller', 'modellendring', 'omdreining', 'parameter', 'romvektorer', 'trigonometri', 'bevis']);
  for (const c of course.chapters) {
    assert.ok(c.theory.length >= 3 && c.example.length >= 3, c.id);
    assert.ok(c.activity && c.criteria.length >= 2 && c.model && c.teacher && c.goals.length, c.id);
    for (let level = 0; level < 3; level++) for (let seed = 0; seed < 20; seed++) {
      const t = c.task(level, seed);
      assert.ok(Number.isFinite(t.answer), `${c.id} ${level} ${seed}`);
      assert.ok(t.q && t.hint && t.solution && t.feedback, c.id);
      assert.notEqual(t.answer, t.wrong, `${c.id} ${level} ${seed}`);
    }
  }
});

test('beregninger i sentrale utfordringer stemmer', () => {
  const task = (id, level, seed = 0) => course.chapters.find(c => c.id === id).task(level, seed).answer;
  assert.equal(task('rekker', 2), 4);
  assert.equal(task('rekursjon', 2), 2);
  assert.equal(task('integral', 2), 0);
  assert.equal(task('fundamentalteorem', 2), 8);
  assert.equal(task('numerisk', 2), 4);
  assert.equal(task('modeller', 2), 21);
  assert.equal(task('modellendring', 2), 2);
  assert.equal(task('omdreining', 2), 0.33);
  assert.equal(task('parameter', 2), 2);
  assert.equal(task('romvektorer', 2), 2);
  assert.equal(task('trigonometri', 2), 8);
  assert.equal(task('bevis', 2), 3);
});
