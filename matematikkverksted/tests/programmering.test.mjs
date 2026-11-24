import test from 'node:test';
import assert from 'node:assert/strict';
import workspace from '../dist/pfag/programmering.js';

const { examples, runProgram, recurrenceExact } = workspace;

test('Recurrence runs from the initial value and responds to editing', () => {
  const { output } = runProgram(examples.rekursjon);
  assert.deepEqual(output.slice(0, 3), [[0, 100], [1, 90], [2, 82]]);
  assert.equal(output.length, 13);
  const edited = runProgram(examples.rekursjon.replace('start = 100', 'start = 20'));
  assert.deepEqual(edited.output.slice(0, 3), [[0, 20], [1, 26], [2, 30.8]]);
  for (const [index, value] of output) {
    assert.ok(Math.abs(value - recurrenceExact(index, 100, 0.8, 10)) < 1e-12);
  }
  assert.equal(recurrenceExact(10, 2, 1, 3), 32);
  assert.equal(recurrenceExact(2, 2, -1, 3), 2);
});

test('Trapezoids use the function and interval from the editable code', () => {
  const subdivisions = [1, 2, 4, 8];
  assert.deepEqual(subdivisions.map(n => runProgram(examples.trapes, n).output[0]), [
    [1, 4], [2, 3], [4, 2.75], [8, 2.6875],
  ]);
  const edited = examples.trapes.replace('x^2', 'x').replace('a = 0', 'a = 1');
  assert.ok(subdivisions.every(n => runProgram(edited, n).output[0][1] === 1.5));
});

test('Validates expressions, loop bounds, and the computation budget', () => {
  assert.deepEqual(runProgram('skriv -2^2, 2^-3^2').output, [[-4, 1/512]]);
  assert.throws(() => runProgram('a = 4\nskriv a, b'), /Linje 2:.*b/);
  assert.throws(() => runProgram('skriv 1, globalThis.alert(1)'), /Uventet tegn/);
  assert.throws(() => runProgram('for k = 1 til 501\nslutt'), /inntil 500/);
  assert.throws(() => runProgram('for k = 1 til 3\n  skriv k, k'), /mangler «slutt»/);
  assert.throws(() => runProgram('for k = 1 til 500\nfor j = 1 til 500\nslutt\nslutt'), /100 000/);
  assert.throws(() => runProgram('f(x) = f(x)\nskriv 0, f(1)'), /dypt nøstet/);
  assert.throws(() => runProgram('skriv 1, 1/0'), /endelig tall/);
});
