import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {tariffResult,statistics,parseData} from '../dist/pfag/labs.js';

test('tariff crossing, parallel, identical and negative crossing',()=>{
  assert.deepEqual(tariffResult({fixed:99,rate:18},{fixed:199,rate:8}),{type:'cross',x:10,cost:279});
  assert.equal(tariffResult({fixed:99,rate:18},{fixed:199,rate:18}).type,'parallel');
  assert.equal(tariffResult({fixed:99,rate:18},{fixed:99,rate:18}).type,'same');
  assert.equal(tariffResult({fixed:199,rate:18},{fixed:99,rate:8}).type,'outside');
});
test('mean median and frequency for even sample with outlier',()=>{
  const a=statistics([5,4,5,6]);assert.equal(a.mean,5);assert.equal(a.median,5);
  assert.deepEqual(a.frequency,[{value:4,count:1},{value:5,count:2},{value:6,count:1}]);
  const b=statistics([4,5,5,6,50]);assert.equal(b.mean,14);assert.equal(b.median,5);
  assert.throws(()=>statistics([]));
});
test('dataset accepts Norwegian decimal commas and unambiguous separators',()=>{
  assert.deepEqual(parseData('2,5  3,5; 4'),[2.5,3.5,4]);
  assert.deepEqual(parseData('-0,5\n1.25'),[-.5,1.25]);
  assert.throws(()=>parseData('2,5, 3,5'));
  assert.throws(()=>parseData('1,2,3'));
});
