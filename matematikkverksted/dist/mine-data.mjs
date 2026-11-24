import {byggElevrapport, byggKopi, gjenopprettKopi, normaliserKode, validerKopi} from './1t-data.mjs';

const $ = id => document.getElementById(id);
const formatDato = new Intl.DateTimeFormat('nb-NO', {dateStyle:'medium', timeStyle:'short'});
let kopi = null;
let valg = 0;
const klasse = new URLSearchParams(location.search).get('klasse');
if (klasse) {
  try { $('klassekode').value = normaliserKode(klasse); } catch { /* La eleven skrive koden. */ }
}

function lastNed(filename, data) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

$('elevrapport').addEventListener('submit', event => {
  event.preventDefault();
  const status = $('rapport-status');
  try {
    const rapport = byggElevrapport(localStorage, $('klassekode').value, $('kallenavn').value);
    lastNed('1t-elevrapport-' + rapport.kallenavn + '.json', rapport);
    status.textContent = rapport.ferdigheter.length
      ? 'Elevrapporten er lastet ned. Du velger selv om du vil sende filen til læreren.'
      : 'Elevrapporten er lastet ned. Den har ingen registrerte øvingsresultater ennå.';
  } catch (error) { status.textContent = error.message; }
});

$('last-ned-kopi').addEventListener('click', () => {
  try {
    lastNed('1t-privat-sikkerhetskopi.json', byggKopi(localStorage));
    $('kopi-status').textContent = 'Den private sikkerhetskopien er lastet ned.';
  } catch (error) { $('kopi-status').textContent = error.message; }
});

$('kopifil').addEventListener('change', async event => {
  const nummer = ++valg;
  const file = event.target.files[0];
  kopi = null;
  $('gjenopprett').disabled = true;
  $('kopi-status').textContent = '';
  if (!file) return;
  try {
    if (file.size > 20_000_000) throw new Error('Kopifilen er for stor.');
    const kandidat = validerKopi(JSON.parse(await file.text()));
    if (nummer !== valg) return;
    $('kopi-status').textContent = 'Kopi fra ' + formatDato.format(kandidat.tid) + ' er klar til gjenoppretting.';
    kopi = kandidat;
    $('gjenopprett').disabled = false;
  } catch (error) {
    if (nummer === valg) $('kopi-status').textContent = error instanceof SyntaxError ? 'Filen kunne ikke leses som JSON.' : error.message;
  }
});

$('gjenopprett').addEventListener('click', () => {
  if (!kopi || !confirm('Erstatt progresjonen i denne nettleseren med den valgte kopien?')) return;
  try {
    gjenopprettKopi(localStorage, kopi);
    try { localStorage.setItem('matematikkverksted-1t-gjenopprettet', String(Date.now())); } catch { /* Progresjonen er allerede lagret. */ }
    $('gjenopprett').disabled = true;
    $('kopifil').value = '';
    kopi = null;
    $('kopi-status').textContent = 'Progresjonen er gjenopprettet. Du kan nå gå tilbake til 1T.';
  } catch (error) { $('kopi-status').textContent = error.message; }
});
