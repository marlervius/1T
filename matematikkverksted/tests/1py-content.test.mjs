import test from 'node:test';
import assert from 'node:assert/strict';
import {course as ho} from '../dist/pfag/1py-ho.js';
import {course as elektro} from '../dist/pfag/1py-elektro.js';
import {budget,triangle} from '../dist/pfag/ylabs.js';
import {vurder} from '../dist/motor.js';
for(const course of [ho,elektro])test(`${course.title}: komplett kapittelstruktur og svar`,()=>{
 assert.ok(course.chapters.length>=7);
 assert.match(course.source,/mat08-01/);
 assert.equal(new Set(course.chapters.map(c=>c.id)).size,course.chapters.length);
 for(const ch of course.chapters){
  for(const field of ['title','summary','theory','example','activity','criteria','model','teacher','goals'])assert.ok(ch[field]?.length,`${ch.id}: ${field}`);
  for(let level=0;level<3;level++)for(let seed=0;seed<=1000;seed++){
   const t=ch.task(level,seed);assert.ok(t.q&&t.solution&&t.hint,`${ch.id}/${level}/${seed}`);assert.ok(Number.isFinite(t.answer));
   assert.equal(vurder({type:'tall',svar:t.answer},String(t.answer)).riktig,true);
  }
 }
});
test('Budsjettlaboratoriet summerer faktiske kostnadsposter',()=>assert.deepEqual(budget({units:10,price:1500,service:250,months:12,discount:10}),{purchase:13500,operating:3000,total:16500}));
test('Trigonometrilaboratoriet gir korrekt trekant',()=>{const t=triangle(4,45);assert.ok(Math.abs(t.height-4)<1e-10);assert.ok(Math.abs(t.hypotenuse-4*Math.SQRT2)<1e-10);assert.ok(Math.abs(t.area-8)<1e-10);});
