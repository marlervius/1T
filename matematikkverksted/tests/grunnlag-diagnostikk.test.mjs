import {test} from 'node:test';
import assert from 'node:assert/strict';
import {grunnlag} from '../dist/grunnlag.js';
import {vurder} from '../dist/motor.js';
const form=(t,v)=>t==='polynom'?v.map((c,i)=>`(${c})*x^${i}`).join('+'):t==='mengde'?`{${v.join(';')}}`:String(v);
test('diagnostiske svar er forskjellige fra fasit og gir egne tilbakemeldinger',()=>{
 for(const s of grunnlag) for(let n=0;n<3;n++) for(let seed=0;seed<500;seed++) {
  const q=s.lag(n,seed);
  assert.ok(q.feil.length>=3 && q.feil.length<=5,`${s.id} ${n} ${seed}: ${q.feil.length}`);
  assert.ok(vurder(q,form(q.type,q.svar)).riktig);
  for(const f of q.feil) {
   const v=vurder(q,form(q.type,f.verdi));
   assert.equal(v.riktig,false,`${s.id} ${n} ${seed} ${form(q.type,f.verdi)}`);
   assert.equal(v.melding,f.tekst,`${s.id} ${n} ${seed}`);
  }
 }
});

test('eldre brøkoppgave oppdager addisjon av nevnere',async()=>{
 const {supplerEldreGrunnlag}=await import('../dist/grunnlag.js');
 const q={type:'tall',sporsmal:String.raw`Regn ut $-\frac{3}{6}-\frac{6}{6}$.`,svar:-1.5,feil:[]};
 supplerEldreGrunnlag(q);
 assert.match(vurder(q,'-9/12').melding,/nevneren/);
});
