import test from 'node:test';
import assert from 'node:assert/strict';
import {classify,outside} from '../dist/andregrad-svar.js';
test('four required responses have distinct routes',()=>{
  assert.equal(classify('−3 og 2'),'roots');
  assert.equal(classify('−3 ≤ x ≤ 2'),'endpoints');
  assert.equal(classify('−3 < x < 2'),'correct');
  assert.equal(classify('x = 2'),'unknown');
});
test('equivalent open interval forms',()=>{
  assert.equal(classify('(-3; 2)'),'correct');
  assert.equal(classify(']−3; 2['),'correct');
  assert.equal(classify('[-3; 2]'),'endpoints');
});
test('union solutions accepted and impossible conjunction rejected',()=>{
 assert.equal(outside('x < −4 eller x > 1'),true);
 assert.equal(outside('x < −4 og x > 1'),false);
 assert.equal(outside('(-∞;−4) ∪ (1;∞)'),true);
 assert.equal(outside('(1,∞) ∪ (-∞,-4)'),true);
});
