import test from 'node:test';
import assert from 'node:assert/strict';
import { course as R1 } from '../dist/pfag/r1.js';
import { course as R2 } from '../dist/pfag/r2.js';
import { addExpressionTasks } from '../dist/pfag/realfagsutfordringer.js';
import { vurder } from '../dist/motor.js';

function asInput(value) {
  if (!Array.isArray(value)) return String(value).replace('.',',');
  return value.map((c,i) => `(${c})*x^${i}`).join('+');
}
for(const course of [R1,R2]){
  test(course.title+' vurderer fasit og registrerte feilsvar for alle tillatte frø og nivåer',()=>{
    addExpressionTasks(course);
    for(const chapter of course.chapters) for(let level=0;level<3;level++) for(let seed=0;seed<=1000;seed++){
      const t=chapter.task(level,seed);
      const check=raw=>vurder({type:t.type||'tall',svar:t.answer},asInput(raw)).riktig;
      assert.ok(check(t.answer),t.q);
      if(t.wrong !== null) assert.ok(!check(t.wrong),t.q);
    }
  });
}
test('kjerneregelen godtar faktorisert svar og oppdager glemt indre derivert',()=>{
  const t=R1.chapters.find(c=>c.id==='analyse').task(2,1);
  assert.ok(vurder({type:t.type,svar:t.answer},'4x(x²+2)').riktig);
  assert.ok(!vurder({type:t.type,svar:t.answer},'2(x²+2)').riktig);
});
