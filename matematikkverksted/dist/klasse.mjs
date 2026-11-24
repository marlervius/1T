import {escapeHtml as e} from './matematikk.js';
import {ferdigheter, klasseNokkel, normaliserKode, oppdaterKlasse, validerElevrapport} from './1t-data.mjs';

const $ = id => document.getElementById(id);
const formatDato = new Intl.DateTimeFormat('nb-NO', {dateStyle:'short', timeStyle:'short'});
const ferdighetsvalg = $('ferdighet');
let rapporter = [];
let aktiv = '';
let demo = false;
let valg = 0;

function hent() {
  const data = JSON.parse(localStorage.getItem(klasseNokkel) ?? '[]');
  if (!Array.isArray(data)) throw new Error('Den lokale klasseoversikten kunne ikke leses.');
  return data.map(validerElevrapport);
}
function lagre(data) {
  if (data.length) localStorage.setItem(klasseNokkel, JSON.stringify(data));
  else localStorage.removeItem(klasseNokkel);
  rapporter = data;
}
function status(message) { $('klasse-status').textContent = message; }
try { rapporter = hent(); } catch { status('Den lokale klasseoversikten kunne ikke leses. Du kan nullstille den etter å ha valgt en klassekode.'); }

const eksempel = [
  {kallenavn:'Demo-Falk', ferdigheter:[{id:'andregrad/3', antall:3, selvstendig:2, medStotte:1, nyeForsok:0, ulost:0, varianter:3, trinn:2, repetisjon:false}]},
  {kallenavn:'Demo-Bjørk', ferdigheter:[{id:'andregrad/3', antall:1, selvstendig:0, medStotte:0, nyeForsok:0, ulost:1, varianter:1, trinn:1, repetisjon:false}]},
  {kallenavn:'Demo-Lyn', ferdigheter:[]}
].map(row => ({...row, tid:Date.now()}));

ferdighetsvalg.innerHTML = ferdigheter.map(f => '<option value="' + e(f.id) + '">' + e(f.kort) + '</option>').join('');

function rad(r, id) {
  const f = r.ferdigheter.find(row => row.id === id);
  const vurdering = !f ? 'Ingen registreringer' : f.varianter < 2 || f.selvstendig < 2 ? 'For lite grunnlag' :
    f.trinn === 3 ? 'Bekreftet ved repetisjon' : f.trinn === 2 ? 'På vei mot sikker mestring' : 'Under øving';
  const td = value => '<td>' + e(value) + '</td>';
  const tall = f ? [f.varianter, f.selvstendig, f.medStotte, f.nyeForsok, f.ulost] : ['–','–','–','–','–'];
  const slett = demo ? '' : '<td><button class="button outline" data-slett="' + e(r.kallenavn) +
    '" aria-label="Slett rapporten til ' + e(r.kallenavn) + '">Slett</button></td>';
  return '<tr><th scope="row">' + e(r.kallenavn) + '</th>' + tall.map(td).join('') +
    td(vurdering + (f?.repetisjon ? ' · Repetisjon foreslått' : '')) +
    td(demo ? 'Eksempel' : formatDato.format(r.tid)) + slett + '</tr>';
}

function vis() {
  const klasser = [...new Set(rapporter.map(r => r.klassekode))].sort();
  $('klasser').innerHTML = klasser.map(kode => '<option value="' + e(kode) + '"></option>').join('');
  $('importgruppe').hidden = demo || !aktiv;
  $('klasseoversikt').hidden = !demo && !aktiv;
  $('slett-klasse').hidden = demo;
  $('slett-alt').hidden = demo;
  if (!demo && !aktiv) return;
  if (!demo) $('elevlenke').href = './mine-data.html?klasse=' + encodeURIComponent(aktiv) + '#del';
  const utvalg = demo ? eksempel : rapporter.filter(r => r.klassekode === aktiv);
  const id = ferdighetsvalg.value;
  $('oversikt-heading').textContent = demo ? 'Eksempel med fiktive elevrapporter' : 'Klasse ' + aktiv;
  $('klassestatus').textContent = demo ? 'Øv på å lese oversikten med tre fiktive rapporter. Eksemplet lagres ikke.'
    : utvalg.length ? utvalg.length + (utvalg.length === 1 ? ' importert elevrapport' : ' importerte elevrapporter')
      : 'Klassen har ingen importerte rapporter ennå.';
  if (!utvalg.length) {
    $('tabell').innerHTML = '';
    return;
  }
  const caption = ferdigheter.find(f => f.id === id)?.kort ?? '';
  $('tabell').innerHTML = '<table class="data-table"><caption>' + e(caption) +
    '</caption><thead><tr><th scope="col">Kallenavn</th><th scope="col">Ulike oppgaver</th><th scope="col">Selvstendig</th>' +
    '<th scope="col">Riktig med støtte</th><th scope="col">Riktig etter nytt forsøk</th><th scope="col">Uløst</th>' +
    '<th scope="col">Faglig grunnlag</th><th scope="col">Rapport fra</th>' + (demo ? '' : '<th scope="col">Handling</th>') +
    '</tr></thead><tbody>' + [...utvalg].sort((a,b) => a.kallenavn.localeCompare(b.kallenavn,'nb')).map(r => rad(r,id)).join('') +
    '</tbody></table>';
}

$('klassevalg').addEventListener('submit', event => {
  event.preventDefault();
  try {
    aktiv = normaliserKode($('klassekode').value);
    $('klassekode').value = aktiv;
    valg++;
    demo = false;
    $('vis-demo').textContent = 'Prøv med fiktive rapporter';
    $('importmeldinger').replaceChildren();
    status('Klasse ' + aktiv + ' er valgt.');
    vis();
  } catch (error) { status(error.message); }
});

$('vis-demo').addEventListener('click', () => {
  valg++;
  demo = !demo;
  $('vis-demo').textContent = demo ? 'Avslutt eksempel' : 'Prøv med fiktive rapporter';
  if (demo) ferdighetsvalg.value = 'andregrad/3';
  vis();
  if (demo) $('oversikt-heading').focus();
});

ferdighetsvalg.addEventListener('change', vis);
$('rapporter').addEventListener('change', async event => {
  const filer = [...event.target.files];
  event.target.value = '';
  if (!filer.length) return;
  const kode = aktiv, nummer = ++valg;
  const lest = await Promise.all(filer.map(async file => {
    try {
      if (file.size > 100_000) throw new Error('Filen er for stor til å være en elevrapport.');
      return {navn:file.name, data:JSON.parse(await file.text())};
    } catch (error) {
      return {navn:file.name, feil:error instanceof SyntaxError ? 'Filen kunne ikke leses som JSON.' : error.message};
    }
  }));
  if (nummer !== valg) return;
  try {
    let neste = hent();
    const meldinger = [];
    for (const {navn, data, feil} of lest) {
      try {
        if (feil) throw new Error(feil);
        const resultat = oppdaterKlasse(neste, data, kode);
        neste = resultat.rapporter;
        meldinger.push({navn, tekst:resultat.endring});
      } catch (error) { meldinger.push({navn, tekst:error.message}); }
    }
    lagre(neste);
    $('importmeldinger').replaceChildren(...meldinger.map(({navn,tekst}) => {
      const li = document.createElement('li');
      li.textContent = navn + ' — ' + tekst;
      return li;
    }));
    status('Behandlet ' + filer.length + (filer.length === 1 ? ' fil.' : ' filer.'));
    vis();
  } catch { status('Kunne ikke lagre rapportene i denne nettleseren.'); }
});

$('tabell').addEventListener('click', event => {
  const button = event.target.closest('[data-slett]');
  if (!button || demo || !aktiv) return;
  const kallenavn = button.dataset.slett;
  if (!confirm('Slett rapporten til ' + kallenavn + ' fra denne nettleseren?')) return;
  try {
    valg++;
    lagre(hent().filter(r => r.klassekode !== aktiv || r.kallenavn !== kallenavn));
    status('Rapporten er slettet.');
    vis();
    $('oversikt-heading').focus();
  } catch { status('Kunne ikke slette rapporten.'); }
});
$('slett-klasse').addEventListener('click', () => {
  if (demo || !aktiv || !confirm('Slett alle importerte rapporter for klasse ' + aktiv + '?')) return;
  try {
    valg++;
    lagre(hent().filter(r => r.klassekode !== aktiv));
    $('importmeldinger').replaceChildren();
    status('Rapportene for klassen er slettet.');
    vis();
  } catch { status('Kunne ikke slette klassen.'); }
});
$('slett-alt').addEventListener('click', () => {
  if (demo || !confirm('Slett alle importerte rapporter for alle klasser?')) return;
  try {
    valg++;
    lagre([]);
    $('importmeldinger').replaceChildren();
    status('Klasseoversikten er nullstilt.');
    vis();
  } catch { status('Kunne ikke nullstille klasseoversikten.'); }
});
window.addEventListener('storage', event => {
  if (event.key !== klasseNokkel && event.key !== null) return;
  try {
    rapporter = hent();
    vis();
  } catch { status('Den lokale klasseoversikten kunne ikke leses.'); }
});
vis();

import('./klassesynk-konfig.mjs').then(({KLASSESYNK_AKTIV}) => {
  if (KLASSESYNK_AKTIV) $('synk-lenke').hidden = false;
}).catch(() => { /* Klasseoversikten fungerer uten synk. */ });
