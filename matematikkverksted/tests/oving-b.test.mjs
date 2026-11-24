import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {ferdigheterB} from '../dist/oving-b.js';
import {vurder} from '../dist/motor.js';

const katex=createRequire(import.meta.url)('../dist/vendor/katex/katex.min.js');
const texSeen=new Set();
function checkMath(text) {
  assert.equal(typeof text,'string');
  assert.ok(!/NaN|undefined/.test(text),text);
  const parts=text.split('$');
  assert.equal(parts.length%2,1,text);
  for(let i=1;i<parts.length;i+=2) {
    if(!texSeen.has(parts[i])) {
      katex.renderToString(parts[i],{throwOnError:true,strict:'error'});
      texSeen.add(parts[i]);
    }
  }
}
function input(type,v) {
  if(type==='mengde') return '{'+[...v].reverse().join(';')+'}';
  if(type==='polynom') return v.map((c,i)=>'('+c+')*x^'+i).join('+');
  if(type==='intervall') return (v.lc?'[':'(')+v.lo+';'+v.hi+(v.hc?']':')');
  return String(v);
}
for(const skill of ferdigheterB) {
  test(skill.id+' har gyldige svar og formler på alle veier',()=>{
    for(const text of [skill.ord,skill.utforsk,skill.stotte]) checkMath(text);
    for(let level=0;level<3;level++) {
      const variants=new Map();
      for(let seed=0;seed<128;seed++) {
        const q=skill.lag(level,seed);
        assert.ok(q.sporsmal&&q.losning&&q.hint.length===2);
        assert.deepEqual(q,skill.lag(level,seed));
        assert.equal(vurder(q,input(q.type,q.svar)).riktig,true,q.sporsmal);
        for(const f of q.feil) {
          const res=vurder(q,input(q.type,f.verdi));
          assert.ok(res.gyldig&&!res.riktig,q.sporsmal);
          assert.equal(res.melding,f.tekst);
        }
        if(variants.has(q.variant)) assert.equal(q.sporsmal,variants.get(q.variant));
        variants.set(q.variant,q.sporsmal);
        [q.sporsmal,q.losning,...q.hint,...q.feil.map(f=>f.tekst)].forEach(checkMath);
      }
      assert.ok(variants.size>=4,skill.id+' har for få distinkte varianter');
    }
  });
}

const item=(id,level,seed)=>ferdigheterB.find(s=>s.id===id).lag(level,seed);
const evalPol=(coeff,x)=>coeff.reduceRight((v,c)=>v*x+c,0);

test('Divisjon og nullpunkter består tilbakeganging og innsetting',()=>{
  for(let seed=0;seed<128;seed++) {
    const a=2+seed%7,b=1+Math.floor(seed/7)%4,r=1+seed%4,c=a+b+1;
    const q=item('polynomdivisjon/1',0,seed).svar;
    const R=item('polynomdivisjon/1',2,seed).svar;
    for(const x of [-5,-2,0,1,4]) {
      assert.ok((x+a)*evalPol(q,x)===x*x+(a+b)*x+a*b);
      assert.equal((x*x+a)*(x*x+b*x)+evalPol(R,x),x**4+b*x**3+a*x*x+(b+r)*x+a*b+r);
    }
    for(const x of item('polynomdivisjon/2',1,seed).svar)
      assert.equal(x**3+(b-a-c)*x*x+(a*c-b*(a+c))*x+a*b*c,0);
  }
});

test('Gjennomsnittsfart, tangent og optimering bekreftes uavhengig',()=>{
  for(let seed=0;seed<128;seed++) {
    const a=2+seed%8,h=2+Math.floor(seed/8)%4,pos=t=>t*t+h*t;
    const t=item('derivasjon/1',2,seed).svar;
    assert.equal(2*t+h,(pos(a+2*h)-pos(a))/(2*h));
    const p=2+seed%6,k=1+Math.floor(seed/6)%5,tangent=item('derivasjon/2',1,seed).svar;
    assert.equal(evalPol(tangent,p),p*p+k);
    assert.equal(evalPol(tangent,p+1)-evalPol(tangent,p),2*p);
    const length=4*(3+seed%8),areas=Array.from({length:length/2+1},(_,w)=>w*(length-2*w));
    assert.equal(item('derivasjon/3',1,seed).svar,Math.max(...areas));
  }
});

test('Trekantantall, intervallhalvering og strengt stoppvilkår kontrolleres',()=>{
  for(let seed=0;seed<128;seed++) {
    const b=8+2*(Math.floor(seed/4)%6), a=[b/2-1,b/2,b/2+1,b+1][seed%4];
    const sinB=b/(2*a);
    let number=0;
    if(sinB<=1) {
      const angle=Math.asin(sinB)*180/Math.PI;
      number=[...new Set([angle,180-angle])].filter(B=>B+30<180).length;
    }
    assert.equal(item('trigonometri/3',2,seed).svar,number);
    const lo=1+seed%6, root=lo+(seed%2===0?0.7:0.3), c=Math.round(root*root*100+2)/100;
    const interval=item('modellering/3',1,seed).svar;
    assert.equal(interval.hi-interval.lo,0.5);
    assert.ok(interval.lo**2<c && c<interval.hi**2);
    const initial=50*(1+seed%6),limit=initial*2**(3+Math.floor(seed/6)%5);
    let v=initial,days=0;
    while(v<=limit){v*=2;days++;}
    assert.equal(item('modellering/3',2,seed).svar,days);
  }
});

