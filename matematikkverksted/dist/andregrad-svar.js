import { vurder } from './motor.js';

export function interval(raw, lo, hi, lc=false, hc=false) {
  const input = String(raw).replace(/,\s*(?=[+−-]?\d+\s*[)\[\]]$)/, match => raw.includes(';') ? match : ';');
  return vurder({type:'intervall', svar:{lo,hi,lc,hc}},input).riktig;
}

export function classify(raw) {
  if (interval(raw,-3,2)) return 'correct';
  if (interval(raw,-3,2,true,true) || interval(raw,-3,2,true,false) || interval(raw,-3,2,false,true)) return 'endpoints';
  if (vurder({type:'mengde',svar:[-3,2]},raw).riktig) return 'roots';
  return 'unknown';
}

export function outside(raw) {
  const parts = raw.toLowerCase().split(/eller|∪/).map(s => s.trim().replace(/,\s*([+−-]?∞)/,';$1'));
  if (parts.length !== 2) return false;
  return [parts,[parts[1],parts[0]]].some(([left,right]) =>
    interval(left,-Infinity,-4) && interval(right,1,Infinity));
}
