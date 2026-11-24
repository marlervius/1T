import test from 'node:test';
import assert from 'node:assert/strict';

const stored = new Map();
global.localStorage = {
  getItem:key => stored.get(key) ?? null,
  setItem:(key,value) => stored.set(key,value),
  removeItem:key => stored.delete(key)
};
global.window = {addEventListener(){}};
const key = 'matematikkverksted-1t-oving-v1';
const load = async () => import('../dist/oving.js?reload=' + Math.random());
const state = () => JSON.parse(stored.get(key));

function practice(page) {
  const listeners = new Map();
  const input = {value:'',addEventListener:(event,callback)=>listeners.set('#oving-svar'+event,callback)};
  const root = {
    querySelector(selector) {
      if (selector==='#oving-svar') return input;
      if (selector.startsWith('[') && !html().includes(selector.slice(1,-1))) return null;
      return {addEventListener:(event,callback)=>listeners.set(selector+event,callback),focus(){}};
    },
    querySelectorAll(){return [];}
  };
  const html = () => page.trenSide();
  const render = () => {
    listeners.clear();
    page.bindOving(root,'tren','',null,render);
  };
  render();
  return {
    html,
    submit(raw) {
      input.value=raw;
      listeners.get('#oving-svarinput')();
      listeners.get('#sjekk-ovingsubmit')({preventDefault(){}});
    },
    click(selector) {listeners.get(selector+'click')();}
  };
}

test('påbegynt øving overlever sideinnlasting og nullstilling rydder den', async () => {
  const first = await load();
  first.seRute('tren','andregrad/3',1);
  const saved = JSON.parse(stored.get(key));
  assert.equal(saved.active.id,'andregrad/3');
  assert.equal(saved.active.nivaa,1);
  const next = await load();
  next.seRute('tren','andregrad/3',1);
  assert.equal(JSON.parse(stored.get(key)).active.ref,saved.active.ref);
  next.nullstillOving();
  assert.equal(stored.has(key),false);
  const afterReset = await load();
  afterReset.seRute('tren','andregrad/3',1);
  assert.notEqual(JSON.parse(stored.get(key)).active.ref,saved.active.ref);
});

test('første feil krever et hint eller et nytt gyldig svar før neste oppgave', async () => {
  stored.clear();
  const page=await load();
  page.seRute('tren','grunnlag/1',0);
  const step=practice(page);
  step.submit('0');
  assert.equal(state().active.forsok,1);
  assert.doesNotMatch(step.html(),/data-next|data-fasit/);
  step.submit('0/7');
  assert.equal(state().active.forsok,1);
  assert.match(step.html(),/samme verdi/);
  step.submit('0/0');
  assert.doesNotMatch(step.html(),/data-next/);
  step.click('[data-hint]');
  assert.match(step.html(),/data-next/);
  assert.equal(state().logg[0].hint,1);

  page.seRute('tren','grunnlag/4',0);
  page.seRute('tren','grunnlag/1',0);
  const next=practice(page);
  next.submit('0');
  next.submit('4');
  assert.equal(state().active.forsok,2);
  assert.match(next.html(),/data-next/);
});

test('venter på ny versjon ved urørt oppgave, bevarer svar og uendelighet etter gjenåpning', async () => {
  stored.clear();
  const original=await load();
  original.seRute('tren','likninger/3',0);
  const old=state();
  delete old.active.versjon;
  stored.set(key,JSON.stringify(old));
  const fresh=await load();
  fresh.seRute('tren','likninger/3',0);
  assert.notEqual(state().active.ref,old.active.ref);
  old.active.raw='(-inf; 0]';
  stored.set(key,JSON.stringify(old));
  const resumed=await load();
  resumed.seRute('tren','likninger/3',0);
  assert.equal(state().active.ref,old.active.ref);
  practice(resumed).submit(`(-inf; ${old.active.opp.svar.hi}]`);
  assert.equal(state().active.riktig,true);
});

test('angir hva alle lenkede forkunnskaper brukes til', async () => {
  const page=await load();
  for (const f of page.ferdigheter) for (const id of f.krav)
    assert.ok(f.kravGrunn[id],`${f.id} → ${id}`);
});
