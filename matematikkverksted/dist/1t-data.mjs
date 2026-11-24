import {ferdigheterA} from './oving-a.js';
import {ferdigheterB} from './oving-b.js';
import {grunnlag} from './grunnlag.js';
import {statusFor} from './motor.js';

const rapportFormat = 'matematikkverksted-1t-elevrapport';
const kopiFormat = 'matematikkverksted-1t-sikkerhetskopi';
export const klasseNokkel = 'matematikkverksted-1t-klasse-v1';
export const nokler = {
  lesing: 'matematikkverksted-1t-v1',
  oving: 'matematikkverksted-1t-oving-v1',
  pilot: 'matematikkverksted-1t-andregrad-v1'
};
export const ferdigheter = [...grunnlag, ...ferdigheterA, ...ferdigheterB];
const skillIds = new Set(ferdigheter.map(f => f.id));
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const count = value => Number.isSafeInteger(value) && value >= 0;
const level = value => [0, 1, 2].includes(value);
const isBoolean = value => typeof value === 'boolean';
const string = value => typeof value === 'string';
const read = (storage, key) => JSON.parse(storage.getItem(key) ?? 'null');

export function normaliserKode(value) {
  const code = string(value) ? value.trim().toUpperCase() : '';
  if (!/^[A-Z0-9-]{2,24}$/.test(code)) throw new Error('Bruk 2–24 tegn i klassekoden. Du kan bruke A–Z, tall og bindestrek.');
  return code;
}

function normaliserNavn(value) {
  const name = string(value) ? value.normalize('NFKC').trim() : '';
  if (!/^[\p{L}\p{N}_-]{2,24}$/u.test(name)) throw new Error('Bruk et kort, avtalt kallenavn på 2–24 tegn uten mellomrom.');
  return name;
}

function gyldigObservasjon(row) {
  return record(row) && skillIds.has(row.id) && string(row.ref) && row.ref.length > 0 &&
    string(row.variant) && row.variant.length > 0 && level(row.nivaa) &&
    isBoolean(row.riktig) && count(row.hint) && count(row.forsok) && count(row.tid);
}

export function byggElevrapport(storage, klassekode, kallenavn, now = Date.now()) {
  klassekode = normaliserKode(klassekode);
  kallenavn = normaliserNavn(kallenavn);
  const data = read(storage, nokler.oving);
  const logg = new Map();
  for (const row of Array.isArray(data?.logg) ? data.logg : []) {
    if (gyldigObservasjon(row) && row.tid <= now &&
      (row.forsok > 0 || (!row.riktig && row.hint > 0)) &&
      (!logg.has(row.ref) || logg.get(row.ref).tid <= row.tid)) logg.set(row.ref, row);
  }
  const grupper = new Map();
  for (const row of logg.values()) {
    if (!grupper.has(row.id)) grupper.set(row.id, []);
    grupper.get(row.id).push(row);
  }
  const resultat = [];
  for (const [id, funn] of grupper) {
    const status = statusFor(id, funn, now);
    const oppsummering = {
      id, antall: status.antall, selvstendig: 0, medStotte: 0, nyeForsok: 0, ulost: 0,
      varianter: new Set(funn.map(row => row.variant)).size,
      trinn: status.trinn, repetisjon: status.forfalt
    };
    for (const row of funn) {
      if (!row.riktig) oppsummering.ulost++;
      else if (row.hint > 0) oppsummering.medStotte++;
      else if (row.forsok === 1) oppsummering.selvstendig++;
      else oppsummering.nyeForsok++;
    }
    resultat.push(oppsummering);
  }
  return {format: rapportFormat, version: 1, klassekode, kallenavn, tid: now, ferdigheter: resultat};
}

export function validerElevrapport(value) {
  if (!record(value) || value.format !== rapportFormat || value.version !== 1 || !count(value.tid) ||
    value.tid > Date.now() + 86400000 || !Array.isArray(value.ferdigheter) || value.ferdigheter.length > skillIds.size) {
    throw new Error('Velg en gyldig 1T-elevrapport.');
  }
  const ids = new Set();
  const resultat = value.ferdigheter.map(row => {
    if (!record(row)) throw new Error('Rapporten har ugyldige ferdighetsdata.');
    const {id, antall, selvstendig, medStotte, nyeForsok, ulost, varianter, trinn, repetisjon} = row;
    if (!skillIds.has(id) || ids.has(id) || ![antall, selvstendig, medStotte, nyeForsok, ulost, varianter].every(count) ||
      antall < 1 || antall !== selvstendig + medStotte + nyeForsok + ulost || varianter < 1 || varianter > antall ||
      ![1, 2, 3].includes(trinn) || !isBoolean(repetisjon) || (trinn === 1 && repetisjon) ||
      (trinn > 1 && (varianter < trinn || selvstendig < trinn))) {
      throw new Error('Rapporten har ugyldige ferdighetsdata.');
    }
    ids.add(id);
    return {id, antall, selvstendig, medStotte, nyeForsok, ulost, varianter, trinn, repetisjon};
  });
  return {format: rapportFormat, version: 1, klassekode: normaliserKode(value.klassekode),
    kallenavn: normaliserNavn(value.kallenavn), tid: value.tid, ferdigheter: resultat};
}

export function oppdaterKlasse(rapporter, value, kode) {
  const ny = validerElevrapport(value);
  if (ny.klassekode !== normaliserKode(kode)) throw new Error('Rapporten har en annen klassekode.');
  const index = rapporter.findIndex(r => r.klassekode === ny.klassekode && r.kallenavn.toLowerCase() === ny.kallenavn.toLowerCase());
  if (index < 0) return {rapporter: [...rapporter, ny], endring: 'Lagt til'};
  if (rapporter[index].tid >= ny.tid) return {rapporter, endring: 'Allerede importert eller eldre'};
  return {rapporter: rapporter.map((r, i) => i === index ? ny : r), endring: 'Oppdatert'};
}

function gyldigKart(value, check) {
  return record(value) && Object.entries(value).every(([key, item]) => /^[a-z]+\/\d+(?:\/\d+)?$/.test(key) && check(item));
}

function gyldigAktiv(data) {
  if (!record(data)) return false;
  const {opp} = data;
  return skillIds.has(data.id) && level(data.nivaa) && count(data.hint) && count(data.forsok) &&
    isBoolean(data.ferdig) && [data.ref, data.grunn, data.variant, data.raw, data.feedback].every(string) &&
    record(opp) && ['tall', 'polynom', 'mengde', 'intervall', 'valg'].includes(opp.type) &&
    string(opp.sporsmal) && string(opp.losning) && Array.isArray(opp.hint) && opp.hint.every(string) &&
    (opp.format === undefined || string(opp.format)) && (opp.feil === undefined ||
      (Array.isArray(opp.feil) && opp.feil.every(row => record(row) && string(row.tekst)))) &&
    (opp.type !== 'valg' || Array.isArray(opp.valg) && opp.valg.every(string));
}

function sikkerPilot(value) {
  return record(value) && ['intro', 'diagnostic', 'explore', 'practice', 'challenge', 'check'].includes(value.stage) &&
    Array.isArray(value.history) && value.history.every(row => record(row) && string(row.route)) &&
    (value.raw === undefined || string(value.raw)) &&
    ['diagFeedback', 'probeFeedback', 'challengeFeedback'].every(key => value[key] === undefined ||
      (string(value[key]) && !/[<>]/.test(value[key])));
}

export function validerKopi(value) {
  const {data} = value ?? {};
  if (!record(value) || value.format !== kopiFormat || value.version !== 1 || !count(value.tid) || value.tid > 8.64e15 || !record(data)) {
    throw new Error('Velg en gyldig privat 1T-sikkerhetskopi.');
  }
  const {lesing, oving, pilot} = data;
  if (
    (lesing !== null && !(record(lesing) && gyldigKart(lesing.done, isBoolean) &&
      gyldigKart(lesing.solved, isBoolean) && gyldigKart(lesing.notes, string) &&
      string(lesing.last))) ||
    (oving !== null && !(record(oving) && Array.isArray(oving.logg) && oving.logg.every(gyldigObservasjon) &&
      (oving.active == null || gyldigAktiv(oving.active)))) ||
    (pilot !== null && !sikkerPilot(pilot))
  ) throw new Error('Sikkerhetskopien har ugyldige progresjonsdata.');
  return {format: kopiFormat, version: 1, tid: value.tid, data: {lesing, oving, pilot}};
}

export function byggKopi(storage, now = Date.now()) {
  const data = Object.fromEntries(Object.entries(nokler).map(([type, key]) => [type, read(storage, key)]));
  return validerKopi({format: kopiFormat, version: 1, tid: now, data});
}

export function gjenopprettKopi(storage, value) {
  const {data} = validerKopi(value);
  const operasjoner = Object.entries(nokler).map(([type, key]) => ({
    key, forrige: storage.getItem(key), neste: data[type] === null ? null : JSON.stringify(data[type])
  }));
  const skriv = (key, v) => v === null ? storage.removeItem(key) : storage.setItem(key, v);
  const utfort = [];
  try {
    for (const {key, forrige, neste} of operasjoner) {
      skriv(key, neste);
      utfort.push({key, forrige});
    }
  } catch {
    let komplett = true;
    for (const {key, forrige} of utfort.reverse()) {
      try { skriv(key, forrige); } catch { komplett = false; }
    }
    throw new Error(komplett ? 'Nettleseren kunne ikke gjenopprette kopien. Eksisterende data ble beholdt.' :
      'Nettleseren avbrøt gjenopprettingen. Behold sikkerhetskopien og prøv på nytt.');
  }
}
