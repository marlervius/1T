import test from 'node:test';
import assert from 'node:assert/strict';
const storage=new Map();
global.localStorage={getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)};
global.location={hash:'',href:'https://example.test/andregrad.html'};
const listeners={};
let fields={};
const app={innerHTML:'',addEventListener:(event,callback)=>listeners[event]=callback,querySelector:selector=>({value:fields[selector]||''})};
global.document={querySelector:selector=>selector==='#app'?app:{focus(){}}};
const url=new URL('../dist/andregrad.js',import.meta.url);
async function reload(){await import(url.href+'?run='+Math.random())}
function click(name,value=''){listeners.click({target:{closest:()=>({dataset:{[name]:value},hasAttribute:attribute=>attribute===`data-${name}`})}})}
function submit(id,value,reason=''){fields={'#value':value,'#reason':reason,'#challenge-answer':value};listeners.submit({preventDefault(){},target:{id}})}
function state(){return JSON.parse(storage.get('matematikkverksted-1t-andregrad-v1'))}
await reload();
test('four requested paths and a reload',async()=>{
  click('stage','practice');
  submit('answer','−3 og 2');
  assert.match(app.innerHTML,/Du fant nullpunktene/);
  await reload();
  assert.match(app.innerHTML,/Du fant nullpunktene/);
  submit('answer','−3 ≤ x ≤ 2');
  assert.match(app.innerHTML,/Sett inn x = 2/);
  submit('answer','−3 < x < 2','negative');
  assert.equal(state().stage,'challenge');
  assert.match(app.innerHTML,/Løs −\(x − 1\)/);
  submit('challenge','x < −4 og x > 1');
  assert.equal(state().done,false);
  submit('challenge','x < −4 eller x > 1');
  assert.equal(state().done,true);
  click('stage','practice');
  click('stage','practice');
  click('example');
  assert.match(app.innerHTML,/Fortegn trinn for trinn/);
  const worked=JSON.parse(storage.get('matematikkverksted-1t-oving-v1')).logg.find(r=>r.ref==='pilot-andregrad-prototype');
  assert.equal(worked.hint>0,true);
  assert.equal(worked.forsok,3); // Å vise løsningen bevarer de tre tidligere forsøkene.
  click('stage','challenge');
  assert.match(app.innerHTML,/Ny oppgave på egen hånd/);
  submit('challenge','−4 < x < 1');
  assert.equal(state().done,true);
  assert.match(app.innerHTML,/mestringssjekk/);
  assert.ok(JSON.parse(storage.get('matematikkverksted-1t-oving-v1')).logg.some(r=>r.id==='andregrad/3'));
  click('reset');
  assert.equal(state().stage,'intro');
  assert.equal(JSON.parse(storage.get('matematikkverksted-1t-oving-v1')).logg.length,0);
});
