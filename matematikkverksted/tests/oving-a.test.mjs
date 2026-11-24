import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { ferdigheterA } from '../dist/oving-a.js';
import { vurder } from '../dist/motor.js';

const katex = createRequire(import.meta.url)('../dist/vendor/katex/katex.min.js');
function formater(type, v) {
  switch(type) {
    case 'valg': return v;
    case 'polynom': return v.map((c,i)=>'('+c+')*x^'+i).join('+');
    case 'mengde': return '{'+[...v].reverse().join('; ')+'}';
    case 'intervall': return (v.lc?'[':'(')+v.lo+'; '+v.hi+(v.hc?']':')');
    default: return String(v);
  }
}
for (const skill of ferdigheterA) {
  test(skill.id + ' – 3 veier, validerte svar, hint og formler', () => {
    for (let level=0;level<3;level++) {
      const variants=new Set();
      for (let seed=0;seed<100;seed++) {
        const q=skill.lag(level,seed);
        assert.ok(q.sporsmal && q.losning && q.hint.length===2 && q.feil.length>0);
        assert.deepEqual(q,skill.lag(level,seed));
        assert.ok(vurder(q,formater(q.type,q.svar)).riktig, q.sporsmal);
        for (const f of q.feil) assert.equal(vurder(q,formater(q.type,f.verdi)).melding,f.tekst,q.sporsmal);
        variants.add(q.variant);
        if (seed%19===0) for(const s of [q.sporsmal,q.losning,...q.hint,...q.feil.map(f=>f.tekst),...(q.valg||[]),skill.stotte,skill.ord,skill.utforsk]) {
          const parts=s.split('$');
          assert.equal(parts.length%2,1);
          for(let i=1;i<parts.length;i+=2) katex.renderToString(parts[i],{throwOnError:true,strict:'error'});
        }
      }
      assert.ok(variants.size>=4,skill.id+' har for få konkrete oppgaver');
    }
  });
}

test('Røtter, asymptoter, modeller og endepunkter kontrolleres mot opprinnelige sammenhenger',() => {
  const get=(id,level,seed)=>ferdigheterA.find(f=>f.id===id).lag(level,seed);
  for(let seed=0;seed<192;seed++) {
    const a=2+seed%7,b=2+Math.floor(seed/7)%9,c=1+Math.floor(seed/13)%5,known=2+Math.floor(seed/3)%11;
    const x=get('likninger/1',1,seed).svar;
    assert.equal((a+c)*(x-b),c*x+a*known-(a+c)*b);
    const den=2+seed%11, s=1+Math.floor(seed/11)%7;
    for(const root of get('andregrad/1',1,seed).svar) assert.equal(root**2+(s-den)*root,den*s);

    const coeff=get('algebra/3',2,seed).svar;
    const aa=2+seed%13,bb=2+Math.floor(seed/13)%5;
    for(const t of [-3,0,2.5,5]) assert.equal(coeff[0]+coeff[1]*t,(bb*t+aa)**2-(bb*t-aa)**2);

    const r=2+Math.floor(seed/8)%10, hi=r+1+Math.floor(seed/3)%6;
    const v=get('likninger/3',2,seed).svar;
    for(const t of [r-1,r,r+0.5,hi-0.01,hi,hi+1]) {
      const inside=(t>v.lo || t===v.lo && v.lc) && (t<v.hi || t===v.hi && v.hc);
      assert.equal(inside,t!==hi && (t-r)/(t-hi)<=0);
    }
  }
});
