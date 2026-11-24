import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {matrise, oppdragSide, arkSide, laererSide, monterLaerer} from '../dist/laerer.js';
import {kapitler} from '../dist/innhold.js';

const require = createRequire(import.meta.url);
const katex = require('../dist/vendor/katex/katex.min.js');
globalThis.window = {katex};
const ids = kapitler.flatMap(k=>k.leksjoner.map((_,i)=>k.id+'/'+(i+1)));
const ferdigheter = ids.map(id=>({
  id, kort:id, utforsk:'Utforsk et eksempel.', maal:[1],
  lag(nivaa,seed){return {sporsmal:'Regn ut $2+'+seed+'$.', losning:'Summen er '+(2+seed)+'.', variant:seed};}
}));

test('Alle læreplanrader lenker til eksisterende leksjoner og faglig vurderbare oppdrag',()=>{
  const html = matrise();
  assert.equal((html.match(/<th scope="row">/g)||[]).length,14);
  for (const [,id] of html.matchAll(/href="#leksjon\/([^"]+)"/g)) assert.ok(ids.includes(id),id);
  const oppdragIds = [...new Set([...html.matchAll(/href="#oppdrag\/([^"]+)"/g)].map(([,id])=>id))];
  assert.equal(oppdragIds.length,9);
  for (const id of oppdragIds) {
    const arc = oppdragSide(id);
    assert.match(arc,/<h1>/);
    assert.match(arc,/Se etter dette i besvarelsen/);
    assert.match(arc,/Se løsningsforslag/);
    assert.doesNotMatch(arc,/katex-error|Ukjent oppdrag|undefined/);
  }
});

test('Kontroll av numeriske resultater i tverrfaglige oppdrag',()=>{
  const plasser = n=>n*(2*12+(n-1)*3)/2;
  assert.equal(plasser(8),180);
  assert.equal(plasser(9),216);
  const s = v=>Math.sin(v*Math.PI/180);
  const diagonal2 = 30**2+40**2-2*30*40*Math.cos(Math.PI/3);
  const area = (30*40*s(60)+diagonal2*s(75)*s(45)/s(60))/2;
  assert.equal(Math.round(area),1032);
  for (const x of [-3,-1,0,2,3,4]) assert.ok((x-2)*(x**2-2*x-3) === x**3-4*x**2+x+6);
});

test('Delte ark gir samme oppgaver på nytt, med tre ulike oppgaver og åpne oppfølgingsspørsmål',()=>{
  const t = 'o~1~7~likninger-1';
  const a = arkSide(t,ferdigheter);
  assert.equal(a,arkSide(t,ferdigheter));
  assert.match(a,/Summen er 9\./);
  assert.match(a,/Summen er 10\./);
  assert.match(a,/Summen er 11\./);
  assert.match(a,/Utforsk et eksempel/);
  const k = arkSide('k~2~3~likninger-1.derivasjon-1.algebra-2',ferdigheter);
  for (const id of ['likninger/1','derivasjon/1','algebra/2']) assert.ok(k.includes(id));
  assert.match(k,/Egenvurdering/);
  assert.doesNotMatch(k,/Ukjent/);
});

test('Ukjente ark, gjentatte ferdigheter, prototypenavn og HTML håndteres',()=>{
  for (const token of ['o~0~-1~algebra-1','o~7~0~algebra-1','k~1~2~algebra-1.algebra-1.algebra-2','o~0~1~nei','<script>','o~1~2~algebra-1~']) {
    assert.match(arkSide(token,ferdigheter), /Ukjent arbeidsark/);
  }
  for (const id of ['constructor','__proto__','<script>']) assert.match(oppdragSide(id),/Ukjent oppdrag/);
});

test('Lærerrom viser reell lokal aktivitet og avgrenser klassedemo',()=>{
  const html = laererSide({ferdigheter, logg:[
    {id:'algebra/2',riktig:true,hint:0,forsok:1}, {id:'likninger/1',riktig:false,hint:0,forsok:1,feil:'<b>Feil</b>'}
  ], veiledning:false});
  assert.match(html,/Fiktive klassedata/);
  assert.match(html,/&lt;b&gt;Feil&lt;\/b&gt;/);
  assert.match(html,/Aktivitet fordelt på kompetansemål/);
  assert.match(html,/ved første forsøk uten hint/);
  assert.doesNotMatch(html,/data-lp-guide checked/);
});

test('Øktbygger gir validerte lenker og kan styre lokal veiledning',()=>{
  class Element {
    constructor(){this.handlers = {}; this.innerHTML = ''; this.hidden = false;}
    addEventListener(event,fn){this.handlers[event]=fn;}
  }
  const elements = Object.fromEntries(['form','links','message','board','extra','guide'].map(k=>[k,new Element()]));
  const form = elements.form;
  form.elements = Object.fromEntries(Object.entries({modus:'o',ferdighet:'likninger/1',to:'algebra/2',tre:'funksjoner/1',nivaa:'0'}).map(([k,v])=>[k,{value:v}]));
  const root = {querySelector:selector=>elements[selector.match(/data-lp-([a-z]+)/)[1]]};
  let av = false;
  monterLaerer(root,{ferdigheter,settVeiledning:v=>{av=!v;}});
  assert.match(elements.links.innerHTML,/#tren\/likninger\/1\/0/);
  assert.match(elements.links.innerHTML,/#ark\/o~0~1~likninger-1/);
  form.elements.modus.value='k';
  form.handlers.change();
  assert.match(elements.links.innerHTML,/#ark\/k~0~1~likninger-1.algebra-2.funksjoner-1/);
  form.elements.to.value='likninger/1';
  form.handlers.change();
  assert.equal(elements.links.innerHTML,'');
  elements.guide.handlers.change({target:{checked:false}});
  assert.equal(av,true);
});
