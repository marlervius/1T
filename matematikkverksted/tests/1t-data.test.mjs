import test from 'node:test';
import assert from 'node:assert/strict';
import {byggElevrapport, validerElevrapport, oppdaterKlasse, byggKopi, validerKopi, gjenopprettKopi, ferdigheter, nokler, klasseNokkel} from '../dist/1t-data.mjs';

function storage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: key => data.delete(key)
  };
}

const id = 'andregrad/3';
const row = (ref, variant, patch = {}) => ({
  id, ref, variant, nivaa:1, riktig:true, hint:0, forsok:1, tid:1000,
  raw:'privat elevtekst', feil:'privat tilbakemelding', ...patch
});

test('eksport begrenses til summerte øvingsdata per ferdighet', () => {
  const logg = [
    row('a', 'første'), row('b', 'andre', {hint:2}), row('c','tredje',{forsok:2}),
    row('d','fjerde',{forsok:0,hint:3,riktig:false}), row('e','femte',{forsok:1,riktig:false}),
    row('e','femte',{forsok:1,riktig:true,tid:1500}),
    row('f','sjette',{tid:2500}), row('g','sjuende',{id:'ukjent'})
  ];
  const data = storage({[nokler.oving]:JSON.stringify({logg, active:{raw:'privat utkast'}}),
    [nokler.lesing]:JSON.stringify({notes:{'andregrad/1/1':'privat notat'}})});
  const resultat = byggElevrapport(data, ' 1t-b ', 'Falk_7', 2000);
  assert.equal(resultat.klassekode,'1T-B');
  assert.deepEqual(resultat.ferdigheter,[{id,antall:5,selvstendig:2,medStotte:1,nyeForsok:1,ulost:1,varianter:5,trinn:1,repetisjon:false}]);
  assert.doesNotMatch(JSON.stringify(resultat), /privat|første/);
  assert.deepEqual(validerElevrapport(resultat), resultat);
});

test('nyere elevrapport erstatter tidligere rapport i samme klasse', () => {
  const data = storage();
  const original = byggElevrapport(data, '1T-A', 'Falk', 1);
  const ny = byggElevrapport(data, '1T-A', 'falk', 2);
  const annen = byggElevrapport(data, '1T-B', 'Falk', 3);
  const lagtTil = oppdaterKlasse([annen], original, '1T-A');
  assert.equal(lagtTil.endring, 'Lagt til');
  const oppdatert = oppdaterKlasse(lagtTil.rapporter, ny, '1T-A');
  assert.deepEqual(oppdatert.rapporter, [annen, ny]);
  assert.strictEqual(oppdaterKlasse(oppdatert.rapporter, original, '1T-A').rapporter, oppdatert.rapporter);
  assert.strictEqual(oppdaterKlasse(oppdatert.rapporter, ny, '1T-A').rapporter, oppdatert.rapporter);
  assert.throws(() => oppdaterKlasse(oppdatert.rapporter, annen, '1T-A'), /annen klassekode/);
  assert.throws(() => validerElevrapport({...ny,kallenavn:'Fullt Navn'}), /kallenavn/);
});

test('privat sikkerhetskopi flytter lesing, påbegynt øving og pilot, men ingen klasseoversikt', () => {
  const f = ferdigheter.find(item => item.id === id);
  const active = {id, nivaa:1, ref:'test', grunn:'Anbefalt', opp:f.lag(1,5), variant:'a',
    hint:1, forsok:0, ferdig:false, raw:'[-2; 3]', feedback:''};
  const data = {lesing:{done:{'algebra/1':true},solved:{'algebra/1/1':false},notes:{'algebra/1/1':'<min private tekst>'},last:'algebra/1'},
    oving:{logg:[row('a','a')],active,veiledning:false},pilot:{stage:'check',history:[{route:'success'}],done:true}};
  const original = storage({...Object.fromEntries(Object.entries(nokler).map(([key,value]) => [value,JSON.stringify(data[key])])),
    [klasseNokkel]:'["eksempel"]'});
  const kopi = byggKopi(original, 1000);
  assert.deepEqual(kopi.data, JSON.parse(JSON.stringify(data)));
  const dest = storage({[klasseNokkel]:'["behold"]','annet-fag':'behold'});
  gjenopprettKopi(dest, kopi);
  assert.deepEqual(byggKopi(dest, 1000), kopi);
  assert.equal(dest.getItem(klasseNokkel),'["behold"]');
  assert.equal(dest.getItem('annet-fag'),'behold');
  assert.throws(() => validerKopi({...kopi, data:{...kopi.data,
    pilot:{...kopi.data.pilot, diagFeedback:'<img src=x onerror=alert(1)>'}}}), /ugyldige/);
  assert.throws(() => gjenopprettKopi(dest, byggElevrapport(original,'1T-A','Falk')), /privat/);
  gjenopprettKopi(dest, byggKopi(storage()));
  assert.deepEqual(byggKopi(dest, 1000).data,{lesing:null,oving:null,pilot:null});
});

test('bekrefter at alle generatortyper kan ligge i en sikkerhetskopi', () => {
  for (const f of ferdigheter) {
    for (const nivaa of [0,1,2]) {
      const opp = f.lag(nivaa, 111);
      const active = {id:f.id,nivaa,opp,ref:'test',grunn:'Anbefalt',variant:'a',hint:0,forsok:0,ferdig:false,raw:'',feedback:''};
      assert.doesNotThrow(() => byggKopi(storage({[nokler.oving]:JSON.stringify({logg:[],active})})), f.id);
    }
  }
});

test('gjenoppretting ruller tilbake ved en avbrutt lagring', () => {
  const utgangspunkt = {done:{},solved:{},notes:{},last:''};
  const dest = storage({[nokler.lesing]:JSON.stringify(utgangspunkt)});
  const save = dest.setItem;
  dest.setItem = (key,val) => {
    if (key === nokler.pilot) throw new Error('Fullt');
    save(key,val);
  };
  const kopi = byggKopi(storage({[nokler.pilot]:JSON.stringify({stage:'check',history:[]})}));
  assert.throws(() => gjenopprettKopi(dest,kopi), /beholdt/);
  assert.deepEqual(JSON.parse(dest.getItem(nokler.lesing)),utgangspunkt);
});
