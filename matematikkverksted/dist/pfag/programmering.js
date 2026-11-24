(function () {
'use strict';

const examples = {
  rekursjon: `# a₀ = 100, aₖ₊₁ = 0.8*aₖ + 10
start = 100
r = 0.8
b = 10
n = 12
a = start
skriv 0, a
for k = 1 til n
  a = r*a + b
  skriv k, a
slutt`,
  trapes: `# Tilnærm integralet av x² på [0, 2]
a = 0
b = 2
n = 8
f(x) = x^2
h = (b - a)/n
sum = 0
for k = 1 til n
  v = a + (k - 1)*h
  u = a + k*h
  sum = sum + h*(f(v) + f(u))/2
slutt
skriv n, sum`
};

function fail(line, message) {
  throw new Error(`Linje ${line}: ${message}`);
}

function readExpression(source, line) {
  const tokens = source.match(/[A-Za-z_][A-Za-z_0-9]*|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[^\s]/g) || [];
  if (tokens.length > 200) fail(line, 'Uttrykket er for langt.');
  let cursor = 0;
  function atom() {
    const token = tokens[cursor++];
    if (token === '(') {
      const value = expression(0);
      if (tokens[cursor++] !== ')') fail(line, 'Mangler sluttparentes.');
      return value;
    }
    if (token === '+' || token === '-') return ['unary', token, expression(3)];
    if (token && /^(?:\d|\.\d)/.test(token)) return ['number', Number(token)];
    if (token && /^[A-Za-z_]/.test(token)) {
      if (tokens[cursor] !== '(') return ['name', token];
      cursor++;
      const argument = expression(0);
      if (tokens[cursor++] !== ')') fail(line, 'Mangler sluttparentes.');
      return ['call', token, argument];
    }
    fail(line, 'Forventet et tall, et navn eller en parentes.');
  }
  function expression(minimum) {
    let value = atom();
    const priorities = new Map([['+', 1], ['-', 1], ['*', 2], ['/', 2], ['^', 4]]);
    while ((priorities.get(tokens[cursor]) || 0) > minimum) {
      const operator = tokens[cursor++];
      value = ['binary', operator, value, expression(priorities.get(operator) - (operator === '^' ? 1 : 0))];
    }
    return value;
  }
  const result = expression(0);
  if (cursor !== tokens.length) fail(line, `Uventet tegn «${tokens[cursor]}».`);
  return result;
}

function runProgram(source, subdivisions) {
  if (source.length > 14000) throw new Error('Programmet er for langt (maksimalt 14 000 tegn).');
  const names = new Map();
  const formulas = new Map();
  const output = [];
  const root = [];
  const blocks = [root];
  let steps = 0;
  const identifier = '[A-Za-z_][A-Za-z_0-9]*';
  const repeatPattern = new RegExp(`^for\\s+(${identifier})\\s*=\\s*(.+?)\\s+til\\s+(.+)$`);
  const assignmentPattern = new RegExp(`^(${identifier})(?:\\((${identifier})\\))?\\s*=\\s*(.+)$`);
  for (const [index, raw] of source.split('\n').entries()) {
    const line = index + 1;
    const statement = raw.split('#', 1)[0].trim();
    const block = blocks.at(-1);
    if (!statement) continue;
    if (statement === 'slutt') {
      if (blocks.length === 1) fail(line, '«slutt» mangler en tilhørende løkke.');
      blocks.pop();
      continue;
    }
    const repeat = statement.match(repeatPattern);
    if (repeat) {
      if (blocks.length > 8) fail(line, 'For mange løkker inni hverandre.');
      const [, name, first, last] = repeat;
      const body = [];
      block.push({ kind: 'loop', name, first: readExpression(first, line), last: readExpression(last, line), body, line });
      blocks.push(body);
      continue;
    }
    if (/^skriv\s+/.test(statement)) {
      const parts = statement.replace(/^skriv\s+/, '').split(',');
      if (parts.length !== 2) fail(line, 'Skriv to verdier med komma mellom.');
      block.push({ kind: 'print', parts: parts.map(part => readExpression(part, line)), line });
      continue;
    }
    const assignment = statement.match(assignmentPattern);
    if (!assignment) fail(line, 'Ukjent instruksjon.');
    const [, name, parameter, value] = assignment;
    block.push({ kind: parameter ? 'function' : 'set', name, parameter, value: readExpression(value, line), line });
  }
  if (blocks.length > 1) throw new Error('En løkke mangler «slutt».');

  function evaluate(node, line, local, depth = 0) {
    if (++steps > 100000) fail(line, 'Programmet overskred grensen på 100 000 beregningstrinn.');
    if (depth > 150) fail(line, 'Beregningen er for dypt nøstet.');
    const [kind, name, left, right] = node;
    const read = child => evaluate(child, line, local, depth + 1);
    let value;
    if (kind === 'number') value = name;
    if (kind === 'name') {
      value = local?.has(name) ? local.get(name) : names.get(name);
      if (value === undefined) fail(line, `Ukjent variabel «${name}».`);
    }
    if (kind === 'unary') value = name === '-' ? -read(left) : read(left);
    if (kind === 'call') {
      const formula = formulas.get(name);
      if (!formula) fail(line, `Ukjent funksjon «${name}».`);
      value = evaluate(formula.value, formula.line, new Map([[formula.parameter, read(left)]]), depth + 1);
    }
    if (kind === 'binary') {
      const lhs = read(left);
      const rhs = read(right);
      if (name === '+') value = lhs + rhs;
      if (name === '-') value = lhs - rhs;
      if (name === '*') value = lhs * rhs;
      if (name === '/') value = lhs / rhs;
      if (name === '^') value = lhs ** rhs;
    }
    if (!Number.isFinite(value)) fail(line, 'Beregningen ga en verdi som ikke er et endelig tall.');
    return value;
  }

  function execute(block) {
    for (const command of block) {
      const { kind, name, line } = command;
      if (++steps > 100000) fail(line, 'Programmet overskred grensen på 100 000 beregningstrinn.');
      if (kind === 'set') names.set(name, name === 'n' && subdivisions !== undefined ? subdivisions : evaluate(command.value, line));
      if (kind === 'function') formulas.set(name, command);
      if (kind === 'print') {
        if (output.length >= 501) fail(line, 'Programmet prøver å skrive mer enn 501 rader.');
        output.push(command.parts.map(part => evaluate(part, line)));
      }
      if (kind === 'loop') {
        const first = evaluate(command.first, line);
        const last = evaluate(command.last, line);
        if (!Number.isSafeInteger(first) || !Number.isSafeInteger(last) || last - first >= 500) {
          fail(line, 'Løkkegrenser må være heltall. En løkke kan gå inntil 500 ganger.');
        }
        for (let index = first; index <= last; index++) {
          if (++steps > 100000) fail(line, 'Programmet overskred grensen på 100 000 beregningstrinn.');
          names.set(name, index);
          execute(command.body);
        }
      }
    }
  }
  execute(root);
  if (!output.length) throw new Error('Programmet skrev ingen rader. Legg til en «skriv»-instruksjon.');
  return { names, output };
}

function recurrenceExact(index, start, ratio, addition) {
  if (!Number.isSafeInteger(index) || index < 0 || ![start, ratio, addition].every(Number.isFinite)) return null;
  if (index === 0) return start;
  if (ratio === 1) return start + index * addition;
  const power = ratio ** index;
  const sum = ratio > 0
    ? Math.expm1(index * Math.log(ratio)) / (ratio - 1)
    : (power - 1) / (ratio - 1);
  return power * start + addition * sum;
}

if (typeof module !== 'undefined') module.exports = { examples, runProgram, recurrenceExact };
if (typeof document === 'undefined') return;

const format = new Intl.NumberFormat('nb-NO', { maximumSignificantDigits: 10 });
const show = number => Number.isFinite(number) ? format.format(number) : '—';

function makeRow(values) {
  const row = document.createElement('tr');
  values.forEach(value => {
    const cell = document.createElement('td');
    cell.textContent = show(value);
    row.append(cell);
  });
  return row;
}

function appendRun(section, rows, names, exact) {
  const result = section.querySelector('.program-result');
  const target = result.querySelector('tbody');
  const isRecurrence = section.id === 'rekursjon';
  const comparison = rows.map(([index, value]) => {
    const reference = isRecurrence ? recurrenceExact(index, names.get('start'), names.get('r'), names.get('b')) : exact;
    const error = Number.isFinite(reference) ? value - reference : null;
    return [index, value, reference, error];
  });
  target.replaceChildren(...comparison.map(makeRow));
  result.hidden = false;
  if (isRecurrence) drawGraph(result.querySelector('canvas'), rows);
}

function drawGraph(canvas, rows) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const width = canvas.width;
  const height = canvas.height;
  context.clearRect(0, 0, width, height);
  const xs = rows.map(([x]) => x);
  const ys = rows.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  function position(value, low, high) {
    if (low === high) return 0.5;
    const span = high - low;
    if (Number.isFinite(span)) return (value - low) / span;
    const scale = Math.max(Math.abs(low), Math.abs(high));
    return (value / scale - low / scale) / (high / scale - low / scale);
  }
  context.strokeStyle = '#8293a9';
  context.lineWidth = 1;
  context.strokeRect(95, 24, width - 133, height - 77);
  context.fillStyle = '#333f58';
  context.font = '15px system-ui';
  context.fillText(show(maxY), 6, 30);
  if (minY !== maxY) context.fillText(show(minY), 6, height - 49);
  context.fillText(show(minX), 95, height - 27);
  if (minX !== maxX) {
    const label = show(maxX);
    context.fillText(label, width - 38 - context.measureText(label).width, height - 27);
  }
  context.fillText('k', width - 21, height - 3);
  for (const [x, y] of rows) {
    context.beginPath();
    context.arc(95 + position(x, minX, maxX) * (width - 133), height - 53 - position(y, minY, maxY) * (height - 77), 3.2, 0, 2 * Math.PI);
    context.fill();
  }
}

for (const section of document.querySelectorAll('.program-lab')) {
  const editor = section.querySelector('.program-code');
  const status = section.querySelector('[role="status"]');
  const output = section.querySelector('.program-result');
  const exactField = section.querySelector('.program-exact');
  const notes = section.querySelector('.program-notes');

  function restore(field, fallback) {
    if (!field) return;
    try {
      field.value = localStorage.getItem(field.id) ?? fallback;
    } catch {
      field.value = fallback;
    }
    field.addEventListener('input', () => {
      try {
        localStorage.setItem(field.id, field.value);
      } catch {
        // Editing and execution also work when local storage is unavailable.
      }
    });
  }

  restore(editor, examples[section.id]);
  restore(notes, '');
  restore(exactField, '8/3');

  section.querySelector('.program-reset').addEventListener('click', () => {
    editor.value = examples[section.id];
    editor.dispatchEvent(new Event('input'));
    if (exactField) {
      exactField.value = '8/3';
      exactField.dispatchEvent(new Event('input'));
    }
    output.hidden = true;
    status.textContent = 'Startkoden er gjenopprettet.';
  });

  section.querySelector('.program-form').addEventListener('submit', event => {
    event.preventDefault();
    const batch = event.submitter?.value === 'batch';
    output.hidden = true;
    try {
      const exact = exactField && exactField.value.trim()
        ? runProgram(`skriv 0, ${exactField.value.trim()}`).output[0][1]
        : null;
      if (batch) {
        const rows = [1, 2, 4, 8].map(n => {
          const run = runProgram(editor.value, n);
          if (run.output.length !== 1 || run.output[0][0] !== n) {
            throw new Error('For sammenligning skal hver kjøring skrive én rad med n først.');
          }
          return run.output[0];
        });
        appendRun(section, rows, new Map(), exact);
        status.textContent = 'Kjørte fire tester med n = 1, 2, 4 og 8.';
      } else {
        const { names, output: rows } = runProgram(editor.value);
        appendRun(section, rows, names, exact);
        status.textContent = rows.length === 1 ? 'Kjørte programmet og skrev én rad.' : `Kjørte programmet og skrev ${rows.length} rader.`;
      }
    } catch (error) {
      status.textContent = error.message;
    }
  });
}
}());
