import { mathHtml } from '../matematikk.js';
import { vurder } from '../motor.js';

// One local ledger per course. It contains no name or account; typed answers stay on this device.
const day = 24 * 60 * 60 * 1000;
const key = course => `matematikkverksted-${String(course.title).toLowerCase().replace(/[^a-z0-9]/g, '')}-practice-v1`;
const chapters = course => Array.isArray(course.chapters) ? course.chapters : [];
const empty = () => ({ chapters: {}, resume: '', diagnostic: null });

function read(course) {
  try {
    const data = JSON.parse(localStorage.getItem(key(course)) || 'null');
    if (data && typeof data === 'object' && data.chapters && typeof data.chapters === 'object')
      return { ...empty(), ...data };
  } catch { /* Private browsing and disabled storage still allow this session. */ }
  return empty();
}
function write(course, data) {
  try { localStorage.setItem(key(course), JSON.stringify(data)); return true; }
  catch { return false; }
}
function record(data, id) {
  if (!data.chapters[id] || typeof data.chapters[id] !== 'object') data.chapters[id] = { history: [], active: null, level: 1 };
  const r = data.chapters[id];
  if (!Array.isArray(r.history)) r.history = [];
  if (![0, 1, 2].includes(r.level)) r.level = 1;
  return r;
}
function randomSeed() { return Math.floor(Math.random() * 1001); }
function newTask(r, chapter, level) {
  const used = new Set((r.history || r.results || []).map(x => x.variant).filter(Boolean));
  if (r.active?.variant) used.add(r.active.variant);
  let seed = randomSeed();
  let variant = '';
  for (let i = 0; i < 1001; i++) {
    variant = `${level}/${chapter.task(level, seed).q}`;
    if (!used.has(variant)) break;
    seed = (seed + 1) % 1001;
  }
  r.active = { seed, level, variant, tries: 0, hint: false, example: false, solution: false, complete: false, message: '', raw: '' };
  r.level = level;
  return r.active;
}
function observations(r) {
  return r.history.filter(x => x && Number.isFinite(x.time) && [0, 1, 2].includes(x.level));
}
function standing(r, now = Date.now()) {
  const history = observations(r);
  const clean = history.filter(x => x.correct && !x.hint && !x.example && !x.solution && x.tries === 1);
  const variants = new Set(clean.map(x => x.variant || `${x.seed}/${x.level}`));
  const latest = history.at(-1);
  const distinct = clean.filter((x, i) => clean.findIndex(y => (y.variant || `${y.seed}/${y.level}`) === (x.variant || `${x.seed}/${x.level}`)) === i);
  const readyAt = distinct[1]?.time;
  const followup = clean.find(x => x.review && readyAt !== undefined && x.time >= readyAt + day);
  let status = 'Ikke prøvd', due = false;
  if (history.length) status = history.length === 1 ? 'For lite grunnlag' : 'Under øving';
  if (variants.size >= 2 && clean.some(x => x.level >= 1)) {
    status = followup ? 'Bekreftet ved repetisjon' : 'Klar for repetisjon';
    const base = followup || { time: readyAt };
    due = now - base.time >= (followup ? 7 * day : day);
  }
  // Later supported attempts call for renewed independent practice.
  if (latest && latest.time > (clean.at(-1)?.time || 0) && (!latest.correct || latest.hint || latest.example || latest.solution || latest.tries > 1)) {
    status = 'Under øving'; due = false;
  }
  return { status, due, attempts: history.reduce((n, x) => n + (x.tries || 0), 0) + (r.active && !r.active.complete ? Number(r.active.tries) || 0 : 0) };
}

export function noteExample(course, chapter) {
  const data = read(course), r = record(data, chapter.id);
  if (!r.active || r.active.complete) newTask(r, chapter, r.level);
  r.active.example = true;
  write(course, data);
}
export function progress(course) {
  const data = read(course);
  return chapters(course).map(chapter => ({ id: chapter.id, title: chapter.title, ...standing(record(data, chapter.id)) }));
}
export function resumeId(course) {
  const data = read(course);
  return chapters(course).some(c => c.id === data.resume) ? data.resume : '';
}
export function resetPractice(course) {
  try { localStorage.removeItem(key(course)); } catch { /* No persistent store to clear. */ }
}

const levelNames = ['Støtte', 'Øving', 'Utfordring'];
function recommendation(r) {
  const history = observations(r), last = history.at(-1), current = r.level;
  if (!last) return { level: current, why: 'Start på valgt nivå og prøv selv.' };
  if (standing(r).due) return { level: Math.max(1, Math.min(current, 2)), why: 'Repetisjon er forfalt. Kontroller ferdigheten med en ny variant uten støtte.' };
  if (!last.correct) return { level: Math.max(0, current - (last.tries >= 2 ? 1 : 0)), why: 'Forrige variant ble ikke løst. Begynn på samme eller et lettere nivå og prøv igjen.' };
  if (last.hint || last.example || last.solution || last.tries > 1)
    return { level: current, why: 'Forrige svar trengte støtte eller flere forsøk. Kontroller metoden på samme nivå uten hjelp.' };
  const streak = history.slice(-2);
  if (current < 2 && streak.length === 2 && streak.every(x => x.correct && !x.hint && !x.example && !x.solution && x.tries === 1 && x.level === current) && streak[0].variant !== streak[1].variant)
    return { level: current + 1, why: 'To ulike varianter ble løst selvstendig på første forsøk. Prøv neste nivå.' };
  return { level: current, why: 'Løs en annen variant selvstendig for å bekrefte metoden.' };
}

function el(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (typeof value === 'string' && value.includes('$') && globalThis.window?.katex) node.innerHTML = mathHtml(value);
  else if (value !== undefined) node.textContent = String(value);
  return node;
}
function add(parent, tag, className, value) {
  const child = el(tag, className, value);
  parent.append(child);
  return child;
}
function button(parent, label, className, action) {
  const b = add(parent, 'button', className, label);
  b.type = 'button'; b.addEventListener('click', action); return b;
}
function taskShape(chapter, active) {
  const task = chapter.task(active.level, active.seed);
  const valid = task?.type === 'polynom' ? Array.isArray(task.answer) && task.answer.length > 0 && task.answer.every(Number.isFinite) : Number.isFinite(task?.answer);
  if (!valid) throw new Error(`Ugyldig fasit i ${chapter.id}`);
  return task;
}

export function mountPractice(root, course, chapter, diagnostic = false) {
  if (!root || !chapter || typeof chapter.task !== 'function') throw new TypeError('Kapittel med task-funksjon er påkrevd');
  const data = read(course), r = record(data, chapter.id);
  data.resume = chapter.id;
  let stored = write(course, data);
  let mode = diagnostic ? 'diagnostic' : 'practice';
  const diag = data.diagnostic?.id === chapter.id ? data.diagnostic : null;
  if (mode === 'diagnostic') data.diagnostic = diag || { id: chapter.id, index: 0, results: [], done: false, active: null };
  if (!r.active || ![0, 1, 2].includes(r.active.level) || !Number.isInteger(r.active.seed) || r.active.seed < 0 || r.active.seed > 1000)
    newTask(r, chapter, r.level);
  if (mode === 'diagnostic' && !data.diagnostic.done && (!data.diagnostic.active || data.diagnostic.active.level !== data.diagnostic.index))
    newTask(data.diagnostic, chapter, data.diagnostic.index);
  save(); render();

  function save() { stored = write(course, data); return stored; }
  function active() { return mode === 'diagnostic' ? data.diagnostic.active : r.active; }
  function openTask(level) {
    // Changing level or requesting a variant also records an unfinished attempt.
    if (mode === 'practice' && r.active && !r.active.complete && (r.active.tries || r.active.hint || r.active.example || r.active.solution))
      archive(false);
    newTask(r, chapter, level); save(); render();
  }
  function startDiagnostic() {
    mode = 'diagnostic'; data.diagnostic = { id: chapter.id, index: 0, results: [], done: false, active: null };
    newTask(data.diagnostic, chapter, 0); save(); render();
  }
  function archive(correct) {
    const a = active();
    a.complete = true;
    const s = standing(r);
    const result = { seed: a.seed, level: a.level, variant: a.variant, time: Date.now(), tries: a.tries,
      correct, hint: a.hint, example: a.example, solution: a.solution, review: s.due };
    if (mode === 'diagnostic') {
      data.diagnostic.results.push({ seed: a.seed, level: a.level, variant: a.variant, correct: correct && !a.hint && !a.solution && a.tries === 1 });
    } else {
      r.history.push(result);
      if (r.history.length > 300) r.history.splice(0, r.history.length - 300);
    }
    save();
  }
  function finishTask(correct) {
    archive(correct); render();
  }
  function render() {
    root.replaceChildren();
    const wrapper = add(root, 'section', 'panel practice-panel');
    add(wrapper, 'p', 'eyebrow', `${course.title} · ${chapter.title}`);
    if (mode === 'diagnostic' && data.diagnostic.done) { renderRecommendation(wrapper); return; }
    const isDiag = mode === 'diagnostic';
    const a = active(), task = taskShape(chapter, a);
    add(wrapper, 'h2', '', isDiag ? `Kartlegging · spørsmål ${data.diagnostic.index + 1} av 3` : 'Øv på kapitlet');
    add(wrapper, 'p', 'muted', isDiag ? 'Tre korte spørsmål gir et forslag til startnivå. Det er ikke en vurdering av kompetansen din.' : 'Løs en ny variant på egen hånd. Hint og løsning er tilgjengelig underveis.');
    if (!stored) add(wrapper, 'p', 'feedback', 'Nettleseren tillater ikke lokal lagring. Økta varer til siden lukkes.');
    if (!isDiag) {
      const row = add(wrapper, 'div', 'form-row');
      const label = add(row, 'label', '', 'Velg nivå');
      const select = add(label, 'select');
      levelNames.forEach((name, level) => {
        const option = add(select, 'option', '', name); option.value = String(level);
        option.selected = a.level === level;
      });
      select.addEventListener('change', () => openTask(Number(select.value)));
      const st = standing(r);
      add(row, 'span', 'muted', st.due ? 'Tid for en ny kontrollvariant' : st.status);
    }
    const box = add(wrapper, 'div', 'panel practice-question');
    add(box, 'p', 'eyebrow', levelNames[a.level]);
    add(box, 'h3', '', task.q);
    const form = add(box, 'form', 'form-row');
    const label = add(form, 'label', '', `Ditt svar${task.unit ? ` (${task.unit})` : ''}`);
    const input = add(label, 'input');
    input.type = 'text'; input.inputMode = task.type === 'polynom' ? 'text' : 'decimal'; input.autocomplete = 'off';
    input.placeholder = task.type === 'polynom' ? 'Bruk x, for eksempel 2x^2 + 3' : 'For eksempel 2,5 eller 5/2'; input.value = a.raw || '';
    input.disabled = a.complete;
    input.addEventListener('input', () => { a.raw = input.value; save(); });
    const submit = add(form, 'button', 'primary', 'Sjekk svar'); submit.type = 'submit'; submit.disabled = a.complete;
    form.addEventListener('submit', event => {
      event.preventDefault(); if (a.complete) return;
      a.raw = input.value;
      const check = vurder({ type: task.type || 'tall', svar: task.answer }, input.value);
      if (!check.gyldig) { a.message = check.melding; save(); render(); root.querySelector?.('input')?.focus(); return; }
      a.tries++;
      if (check.riktig) {
        a.message = a.example || a.hint || a.solution || a.tries > 1 ? 'Riktig. Prøv en ny variant uten støtte for å kontrollere om metoden sitter.' : 'Riktig, løst selvstendig på første forsøk.';
        finishTask(true);
      } else {
        const known = task.wrong != null && vurder({ type: task.type || 'tall', svar: task.wrong }, input.value).riktig;
        a.message = known && task.feedback ? task.feedback : 'Svaret stemmer ikke. Kontroller oppsettet og prøv igjen.';
        if (isDiag) finishTask(false);
        else { save(); render(); root.querySelector?.('input')?.focus(); }
      }
    });
    if (a.message) { const feedback = add(box, 'p', 'feedback', a.message); feedback.setAttribute('role', 'status'); }
    if (!isDiag && !a.complete) {
      const actions = add(box, 'div', 'form-row');
      if (!a.hint) button(actions, 'Vis hint', 'secondary', () => { a.hint = true; save(); render(); });
      if (a.hint) add(box, 'p', 'feedback', task.hint);
      if (a.tries || a.hint) button(actions, 'Se gjennom løsningen', 'secondary', () => { a.solution = true; save(); render(); });
      if (a.solution) {
        add(box, 'p', 'feedback', task.solution);
        button(actions, 'Prøv en ny variant', 'primary', () => { archive(false); openTask(recommendation(r).level); });
      }
      if (a.tries >= 2 && !a.solution) button(actions, 'Prøv en ny variant', 'secondary', () => { archive(false); openTask(recommendation(r).level); });
    }
    if (a.complete) {
      add(box, 'p', 'muted', `Løsning: ${task.solution}`);
      if (isDiag) button(box, data.diagnostic.index < 2 ? 'Neste spørsmål' : 'Se anbefaling', 'primary', () => {
        data.diagnostic.index++;
        if (data.diagnostic.index >= 3) data.diagnostic.done = true;
        else newTask(data.diagnostic, chapter, data.diagnostic.index);
        save(); render();
      });
      else {
        const next = recommendation(r);
        add(box, 'p', 'muted', `${next.why} Anbefalt nivå: ${levelNames[next.level]}.`);
        button(box, `Ny variant · ${levelNames[next.level]}`, 'primary', () => openTask(next.level));
      }
    }
    if (isDiag && !a.complete) button(wrapper, 'Hopp over spørsmålet', 'secondary', () => finishTask(false));
    if (!isDiag) renderNext(wrapper);
    add(wrapper, 'p', 'muted', `Fremdrift og eventuelle innskrevne svar lagres lokalt i denne nettleseren for ${course.title}. På en delt maskin kan andre se dem. Du kan nullstille dem i kursoversikten.`);
  }
  function renderRecommendation(wrapper) {
    add(wrapper, 'h2', '', 'Forslag til neste steg');
    const results = data.diagnostic.results;
    const firstMiss = results.find(x => !x.correct);
    const level = firstMiss ? firstMiss.level : 2;
    const basis = firstMiss ? `Spørsmålet på nivå ${firstMiss.level + 1} ble ikke løst selvstendig på første forsøk.` : 'Alle tre spørsmålene ble løst selvstendig på første forsøk.';
    add(wrapper, 'p', '', `${basis} Begynn med ${['støtte', 'øving', 'utfordring'][level]}, og juster nivået når du ønsker.`);
    button(wrapper, `Start ${['med støtte', 'på øvingsnivå', 'med utfordring'][level]}`, 'primary', () => { mode = 'practice'; openTask(level); });
    button(wrapper, 'Ta kartleggingen på nytt', 'secondary', startDiagnostic);
    add(wrapper, 'p', 'muted', 'Tre svar gir bare et foreløpig forslag. Nye selvstendige forsøk og repetisjon gir bedre grunnlag.');
  }
  function renderNext(wrapper) {
    const s = standing(r);
    const heading = add(wrapper, 'h3', '', 'Neste steg');
    heading.id = 'practice-next';
    const history = observations(r), last = history.at(-1);
    const message = s.due ? 'Tid for repetisjon: løs en ny variant uten hint.' :
      !history.length ? 'Prøv oppgaven og velg hint ved behov.' :
      last && (!last.correct || last.hint || last.solution || last.tries > 1) ? 'Arbeid med feilen i tilbakemeldingen, og løs en ny variant selvstendig.' :
      s.status === 'Klar for repetisjon' ? 'Kom tilbake tidligst i morgen for en kontrollvariant.' :
      s.status === 'Bekreftet ved repetisjon' ? 'Vedlikehold ferdigheten med en ny variant om en uke.' :
      'Løs en annen variant på øvingsnivå eller høyere for å kontrollere metoden.';
    add(wrapper, 'p', '', message);
    if (Array.isArray(chapter.example) && chapter.example.length) {
      const details = add(wrapper, 'details'); add(details, 'summary', '', 'Se gjennomgåtte eksempler');
      const list = add(details, 'ol');
      chapter.example.forEach(example => add(list, 'li', '', example));
      details.addEventListener('toggle', () => { if (details.open && !r.active.complete) { r.active.example = true; save(); } });
    }
  }
  return { render, startDiagnostic };
}
