import test from 'node:test';
import assert from 'node:assert/strict';
import { mountPractice, progress, resumeId, resetPractice } from '../dist/pfag/practice.js';

class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.events = {}; this.value = ''; this.open = false; }
  append(child) { this.children.push(child); }
  replaceChildren(...children) { this.children = children; }
  addEventListener(name, handler) { this.events[name] = handler; }
  setAttribute(name, value) { this[name] = value; }
  focus() { this.focused = true; }
  querySelector(selector) { return this.find(node => node.tag === selector); }
  find(predicate) {
    if (predicate(this)) return this;
    for (const child of this.children) { const found = child.find(predicate); if (found) return found; }
  }
  get text() { return [this.textContent || '', ...this.children.map(child => child.text)].join(' '); }
}
globalThis.document = { createElement: tag => new Element(tag) };
Math.random = () => 0;
const store = new Map();
globalThis.localStorage = {
  getItem: key => store.get(key) ?? null,
  setItem: (key, value) => store.set(key, value),
  removeItem: key => store.delete(key)
};
const key = title => `matematikkverksted-${title.toLowerCase()}-practice-v1`;
const chapter = {
  id: 'tall', title: 'Tall', example: ['Et eksempel'],
  task(level, seed) {
    return { q: `Nivå ${level}: ${seed % 3} + 2`, answer: seed % 3 + 2, unit: 'kr', hint: 'Legg sammen',
      solution: `${seed % 3} + 2 = ${seed % 3 + 2}`, wrong: 99, feedback: 'Kontroller addisjonen.' };
  }
};
const one = { title: '1P', chapters: [chapter] }, two = { title: '2P', chapters: [chapter] };
function fixture(course = one, diagnostic = false) {
  const root = new Element('root'); mountPractice(root, course, chapter, diagnostic); return root;
}
function click(root, label) {
  const node = root.find(n => n.tag === 'button' && n.textContent?.startsWith(label));
  assert.ok(node, `Fant ikke knappen ${label}`); node.events.click();
}
function answer(root, value) {
  const input = root.querySelector('input'); input.value = value; input.events.input();
  root.querySelector('form').events.submit({ preventDefault() {} });
}
function correct(root) {
  const active = JSON.parse(store.get(key('1P'))).chapters.tall.active;
  answer(root, String(chapter.task(active.level, active.seed).answer));
}

test('tallvurdering, feiloppfatning og svarfelt overlever omlasting', () => {
  store.clear(); const root = fixture();
  answer(root, '99');
  assert.match(root.text, /Kontroller addisjonen/);
  assert.equal(root.querySelector('input').focused, true);
  assert.equal(progress(one)[0].attempts, 1);
  root.querySelector('input').value = '2/1'; root.querySelector('input').events.input();
  fixture(); const resumed = fixture();
  assert.equal(resumed.querySelector('input').value, '2/1');
  assert.equal(resumeId(one), 'tall');
  answer(resumed, '2/1');
  assert.equal(resumed.querySelector('input').value, '2/1');
  assert.equal(progress(one)[0].attempts, 2);
  assert.equal(progress(two)[0].attempts, 0);
  resetPractice(one); assert.equal(resumeId(one), '');
});

test('neste variant følger evidens og nivåvalg kan overstyres', () => {
  store.clear(); const root = fixture();
  correct(root); click(root, 'Ny variant');
  assert.match(root.text, /Øving/);
  correct(root);
  assert.match(root.text, /To ulike varianter/);
  click(root, 'Ny variant');
  assert.equal(JSON.parse(store.get(key('1P'))).chapters.tall.active.level, 2);
  const select = root.querySelector('select'); select.value = '0'; select.events.change();
  assert.equal(JSON.parse(store.get(key('1P'))).chapters.tall.active.level, 0);
  click(root, 'Vis hint'); correct(root);
  assert.match(root.text, /samme nivå uten hjelp/i);
  click(root, 'Ny variant');
  assert.equal(JSON.parse(store.get(key('1P'))).chapters.tall.active.level, 0);
  const details = root.querySelector('details'); details.open = true; details.events.toggle();
  correct(root);
  assert.equal(JSON.parse(store.get(key('1P'))).chapters.tall.history.at(-1).example, true);
});

test('varianter vurderes etter spørsmål, ikke bare frø; uavsluttede forsøk telles', () => {
  store.clear(); const root = fixture();
  answer(root, '99');
  assert.equal(progress(one)[0].attempts, 1);
  const select = root.querySelector('select'); select.value = '1'; select.events.change();
  const data = JSON.parse(store.get(key('1P'))).chapters.tall;
  assert.equal(data.history.at(-1).tries, 1);
  assert.notEqual(data.history.at(-1).variant, data.active.variant);
  assert.equal(progress(one)[0].attempts, 1);
});

test('lik oppgavetekst fra ulike frø teller bare som én variant, og kontroll forfaller', () => {
  store.clear(); const old = Date.now() - 2 * 24 * 60 * 60 * 1000;
  const history = [0, 3].map(seed => ({ seed, level: 1, variant: '1/Nivå 1: 0 + 2', time: old,
    tries: 1, correct: true, hint: false, example: false, solution: false, review: false }));
  store.set(key('1P'), JSON.stringify({ chapters: { tall: { history, level: 1, active: null } }, resume: 'tall' }));
  assert.equal(progress(one)[0].status, 'Under øving');
  history[1].variant = '1/Nivå 1: 1 + 2';
  store.set(key('1P'), JSON.stringify({ chapters: { tall: { history, level: 1, active: null } }, resume: 'tall' }));
  assert.equal(progress(one)[0].due, true);
  const root = fixture();
  assert.match(root.text, /Tid for en ny kontrollvariant/);
});

test('gjentatte feil senker anbefalt nivå når eleven velger ny variant', () => {
  store.clear(); const root = fixture();
  answer(root, '99'); answer(root, '99'); click(root, 'Prøv en ny variant');
  assert.equal(JSON.parse(store.get(key('1P'))).chapters.tall.active.level, 0);
});

test('kartlegging holder egen oppgave og svar atskilt fra ordinær øving', () => {
  store.clear(); const practice = fixture();
  practice.querySelector('input').value = 'kladdeutkast'; practice.querySelector('input').events.input();
  const before = JSON.parse(store.get(key('1P'))).chapters.tall.active;
  const diag = fixture(one, true);
  assert.match(diag.text, /spørsmål 1 av 3/);
  answer(diag, '99'); click(diag, 'Neste spørsmål');
  const reloaded = fixture(one, true);
  assert.match(reloaded.text, /spørsmål 2 av 3/);
  assert.equal(fixture().querySelector('input').value, 'kladdeutkast');
  const data = JSON.parse(store.get(key('1P')));
  assert.deepEqual(data.chapters.tall.active, before);
  assert.equal(data.chapters.tall.history.length, 0);
  assert.equal(data.diagnostic.results.length, 1);
});
