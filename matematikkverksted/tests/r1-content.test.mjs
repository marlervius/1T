import { test } from 'node:test';
import assert from 'node:assert/strict';
import { course } from '../dist/pfag/r1.js';

test('R1 has complete assessed content and valid generated numeric tasks', () => {
  assert.equal(course.title, 'R1');
  assert.match(course.source, /mat03-02.*kv293/);
  assert.ok(course.chapters.length >= 8);
  const ids = new Set();
  for (const chapter of course.chapters) {
    assert.ok(!ids.has(chapter.id)); ids.add(chapter.id);
    for (const key of ['title', 'summary', 'activity', 'model', 'teacher']) assert.ok(chapter[key]?.length > 5, `${chapter.id}: ${key}`);
    for (const key of ['theory', 'example', 'criteria', 'goals']) assert.ok(chapter[key]?.length >= 1, `${chapter.id}: ${key}`);
    for (let level = 0; level < 3; level++) for (let seed = 0; seed < 40; seed++) {
      const task = chapter.task(level, seed);
      for (const key of ['q', 'hint', 'solution', 'feedback']) assert.ok(task[key]?.length > 0, `${chapter.id}: ${key}`);
      assert.ok(Number.isFinite(task.answer), chapter.id);
      assert.ok(task.wrong === null || Number.isFinite(task.wrong), chapter.id);
    }
  }
});

test('representative results cover distinct R1 operations', () => {
  const chapter = id => course.chapters.find(item => item.id === id);
  assert.equal(chapter('grenser').task(1, 0).answer, 4);
  assert.equal(chapter('derivert').task(2, 0).answer, -4);
  assert.equal(chapter('analyse').task(2, 0).answer, 8);
  assert.equal(chapter('logaritmer').task(2, 0).answer, 2);
  assert.equal(chapter('vekstmodeller').task(2, 0).answer, 100);
  assert.equal(chapter('vektorer').task(2, 0).answer, -2);
  assert.equal(chapter('parameter').task(2, 0).answer, 1);
});
