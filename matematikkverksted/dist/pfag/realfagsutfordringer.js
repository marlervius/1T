// Suppler talloppgavene med oppgaver der eleven må levere hele funksjonsuttrykket.
const generators = {
  'R1/analyse'(a) {
    return {
      q: `Deriver f(x) = (x² + ${a})². Skriv hele f′(x) som et uttrykk i x.`,
      answer: [0, 4*a, 0, 4], wrong: [2*a, 0, 2],
      hint: 'Bruk kjerneregelen, eller kvadrer parentesen før du deriverer.',
      solution: `Kjerneregelen gir 2(x² + ${a}) · 2x = 4x³ + ${4*a}x.`,
      feedback: 'Du har derivert den ytre funksjonen. Hva er den deriverte av x² pluss en konstant?'
    };
  },
  'R1/derivert'(a) {
    return {
      q: `Finn uttrykket for tangenten til f(x) = x² ved x = ${a}. Skriv høyresiden i y = …`,
      answer: [-a*a, 2*a], wrong: [0,2*a],
      hint: 'Bruk punktet på grafen og stigningstallet i ettpunktsformelen.',
      solution: `Tangenten går gjennom (${a}, ${a*a}) med stigningstall ${2*a}. Dermed er y = ${a*a} + ${2*a}(x − ${a}) = ${2*a}x − ${a*a}.`,
      feedback: `Du har funnet stigningstallet. Går linja di gjennom (${a}, ${a*a})?`
    };
  },
  'R2/fundamentalteorem'(a) {
    return {
      q: `La F(x) være integralet av 3t² fra t = ${a} til t = x. Skriv et uttrykk for F(x).`,
      answer: [-(a**3),0,0,1], wrong: [0,0,0,1],
      hint: 'Finn en antiderivert og sett inn begge grensene.',
      solution: `En antiderivert er t³. Dermed blir F(x) = x³ − ${a**3}, og F(${a}) = 0.`,
      feedback: `Du har funnet en antiderivert. Hvilken verdi skal integralet ha når x = ${a}?`
    };
  },
  'R2/parameter'(a) {
    return {
      q: `En partikkel har posisjon r(t) = (t², ${a}t³). Finn uttrykket for kvadratet av farten. Bruk x som variabel for tiden i svarfeltet.`,
      answer: [0,0,4,0,9*a*a], wrong: [0,0,1,0,0,0,a*a],
      hint: 'Deriver begge koordinatene og ta skalarproduktet av hastighetsvektoren med seg selv.',
      solution: `v(t) = (2t, ${3*a}t²), så |v(t)|² = (2t)² + (${3*a}t²)² = 4t² + ${9*a*a}t⁴.`,
      feedback: 'Dette er kvadratet av avstanden fra origo. Hvilken vektor beskriver hastigheten?'
    };
  }
};
export function addExpressionTasks(course) {
  for (const chapter of course.chapters) {
    const generate = generators[course.title + '/' + chapter.id];
    if (!generate) continue;
    const standard = chapter.task;
    chapter.task = (level, seed) => level === 2 && seed % 2 === 1
      ? {type:'polynom', ...generate(2 + Math.floor(seed/2) % 12)}
      : standard(level,seed);
  }
}
