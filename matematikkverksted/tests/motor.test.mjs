import assert from 'node:assert/strict';
import test from 'node:test';
import {vurder, statusFor, anbefal} from '../dist/motor.js';

const sjekk = (type, svar, input) => vurder({type,svar}, input);
test('desimalkomma, fortegn, prioritet og eksakt brøkregning', () => {
  for (const [svar,input] of [[0.3,'0,1+0,2'],[1/3,'1/3'],[9,'(−3)²'],[-9,'−3²'],[0.25,'2⁻²'],[3,'6÷2'],[512,'2^3^2'],[1e6,'1 000 000'],[0,'10000000000000001-10000000000000001'],[0.001,'1e-3']]) {
    assert.equal(sjekk('tall',svar,input).riktig,true,input);
  }
  assert.equal(sjekk('tall',1,'1+1/100000000000000000000').riktig,false);
});
test('grenser, syntaks og udefinerte operasjoner', () => {
  for(const s of ['','0/0','1/(2-2)','0⁰','2^1,2','2 3','2^999999','2+','(3','1,2,3','alert(12)','1e999','∀','1234567890'.repeat(30)]){
    assert.equal(sjekk('tall',0,s).gyldig,false,s);
  }
  assert.equal(sjekk('tall',3,'1+1').gyldig,true);
});
test('en riktig verdi godtas og forkorting vises for en uforkortet brøk', () => {
  for (const [svar,input,fasit] of [
    [-3/2,'−9/6',String.raw`-\frac{3}{2}`],
    [-3/2,'9 ÷ −6',String.raw`-\frac{3}{2}`],
    [3,'9/3','3'],[0,'0/7','0']
  ]) {
    const check=sjekk('tall',svar,input);
    assert.equal(check.riktig,true);
    assert.match(check.melding,/Forkort brøken/);
    assert.ok(check.melding.includes('$'+fasit+'$'));
  }
  assert.doesNotMatch(sjekk('tall',-3/2,'−3/2').melding,/Forkort/);
  assert.doesNotMatch(sjekk('tall',-3/2,'−9/12').melding,/Riktig verdi/);
});
test('polynomlikhet, distribusjon, hull og domene', () => {
  for(const s of ['(x+1)(x-1)','x²−1','(2x^2-2)/2','x*x+2-3'])
    assert.equal(sjekk('polynom',[-1,0,1],s).riktig,true,s);
  assert.equal(sjekk('polynom',[2,1],'(x^2-4)/(x-2)').gyldig,false);
  assert.match(sjekk('polynom',[1],'x/x').melding,/definisjonsmengden/);
  assert.equal(sjekk('polynom',[1],'(x-1)^-1').gyldig,false);
  assert.equal(sjekk('polynom',[0,0,1],'x').riktig,false);
  assert.equal(sjekk('polynom',[0,0,0],'x-x').riktig,true);
});
test('mengder er uordnede, gjentakelser har ingen betydning', () => {
  for(const s of ['{4; -2; 4}','-2 og 4','x = 4 eller x = -2','{4, -2}'])
    assert.equal(sjekk('mengde',[-2,4],s).riktig,true,s);
  assert.equal(sjekk('mengde',[0.5,-0.25],'{1/2; -0,25}').riktig,true);
  assert.equal(sjekk('mengde',[0.5],'{0,5}').riktig,true);
  assert.equal(sjekk('mengde',[1,2],'{1; 2; 3}').riktig,false);
  assert.equal(sjekk('mengde',[],'∅').riktig,true);
  assert.equal(sjekk('mengde',[0],'{}').riktig,false);
});
test('intervaller, norske klammer, åpne og lukkede grenser', () => {
  const v={lo:-1,hi:2.5,lc:false,hc:true};
  for(const s of ['(-1; 2,5]',']-1; 5/2]','−1 < x ≤ 2,5','2,5>=x>−1','x∈⟨−1;2,5]'])
    assert.equal(sjekk('intervall',v,s).riktig,true,s);
  assert.equal(sjekk('intervall',v,'[-1;2,5]').riktig,false);
  assert.equal(sjekk('intervall',{lo:0,hi:Infinity,lc:true,hc:false},'x>=0').riktig,true);
  assert.equal(sjekk('intervall',{lo:-Infinity,hi:3,lc:false,hc:false},']-∞;3[').riktig,true);
  assert.equal(sjekk('intervall',v,'[-∞;3]').gyldig,false);
  assert.equal(sjekk('intervall',v,'3 < x < 1').gyldig,false);
});
test('spesifikk feiltilbakemelding på matematisk ekvivalente feilsvar', () => {
  const o={type:'polynom',svar:[9,6,1],feil:[{verdi:[9,0,1],tekst:'Hva skjer med kryssleddene?'}]};
  assert.deepEqual(vurder(o,'x*x+3²'),{riktig:false,gyldig:true,melding:'Hva skjer med kryssleddene?'});
  assert.equal(vurder({type:'valg',svar:'A',valg:['A','B']},'C').gyldig,false);
  assert.equal(vurder({type:'valg',svar:'A',valg:['A','B']},'B').gyldig,true);
});

const dag=86400000;
const opp=(variant,tid,nivaa=1,ekstra={})=>({id:'s',variant,tid,nivaa,riktig:true,hint:0,forsok:1,...ekstra});
test('nye varianter og senere selvstendig kontroll kreves', () => {
  const logg=[opp('A',100),opp('A',101)];
  assert.equal(statusFor('s',logg,200).trinn,1);
  logg.push(opp('B',200));
  assert.deepEqual(statusFor('s',logg,200),{navn:'På vei mot sikker mestring',trinn:2,forfalt:false,antall:3});
  logg.push(opp('C',dag+199));
  assert.equal(statusFor('s',logg,dag+200).forfalt,true);
  logg.push(opp('A',dag+201));
  assert.equal(statusFor('s',logg,dag+201).trinn,2);
  logg.push(opp('D',dag+202));
  assert.equal(statusFor('s',logg,dag+202).trinn,3);
  assert.equal(statusFor('s',logg,8*dag+202).forfalt,true);
  const vedlikehold=[...logg,opp('B',8*dag+202)];
  assert.equal(statusFor('s',vedlikehold,8*dag+202).forfalt,false);
  logg.push(opp('E',8*dag+202,1,{riktig:false}));
  assert.equal(statusFor('s',logg,8*dag+202).trinn,2);
  logg.push(opp('F',8*dag+203,1,{hint:1}));
  assert.equal(statusFor('s',logg,8*dag+203).trinn,1);
});
test('støtte og gjentatte forsøk teller som aktivitet, én fasit gir aldri mestring', () => {
  const logg=[opp('a',0,1,{hint:1}),opp('a',dag),opp('b',2*dag,1,{forsok:3}),opp('c',3*dag,0),opp('d',4*dag,0)];
  assert.equal(statusFor('s',logg,5*dag).trinn,1);
  assert.equal(statusFor('s',logg,5*dag).antall,5);
  assert.equal(statusFor('s',logg.reverse(),1).antall,1);
  const lest = opp('lest',10,1,{riktig:false,hint:3,forsok:0});
  assert.equal(statusFor('s',[lest],20).trinn,1);
  assert.equal(statusFor('s',[null,{},opp('q',90000)],100).trinn,0);
});
test('simulerte elever får hjelp, fri overstyring, fordypning og repetisjon', () => {
  const ferd=[{id:'grunnlag/1',kort:'Brøk',krav:[]},{id:'s',kort:'Rasjonale uttrykk',krav:['grunnlag/1']},{id:'n',kort:'Neste',krav:['s']}];
  assert.equal(anbefal(ferd,[],1).id,'s');
  const feil=[opp('A',1,1,{riktig:false})];
  assert.equal(anbefal(ferd,feil,2).id,'grunnlag/1');
  assert.equal(anbefal(ferd,feil,2).nivaa,0);
  assert.equal(anbefal(ferd,feil,2,'s').id,'s');
  assert.equal(anbefal(ferd,feil,2,'s').nivaa,0);
  const rep=[...feil,opp('B',2,0,{id:'grunnlag/1'}),opp('C',3,1,{id:'grunnlag/1'})];
  assert.equal(anbefal(ferd,rep,4).id,'s');
  assert.equal(anbefal(ferd,rep,4).nivaa,1);
  const annenFeil=[{...feil[0],feilKrav:'s'}];
  assert.equal(anbefal(ferd,annenFeil,2).id,'s');
  assert.equal(anbefal(ferd,[{...feil[0],feilKrav:'ukjent'}],2).id,'grunnlag/1');
  const dyktig=[opp('A',0),opp('B',100,2)];
  assert.equal(anbefal(ferd,dyktig,101,'s').nivaa,2);
  assert.equal(anbefal(ferd,dyktig,100+dag).id,'s');
  assert.equal(anbefal(ferd,dyktig,100+dag).nivaa,1);
  assert.equal(anbefal(ferd,dyktig,100+dag,'n').id,'n');
});
