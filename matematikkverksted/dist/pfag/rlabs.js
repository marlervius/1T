const fmt = new Intl.NumberFormat('nb-NO', {maximumFractionDigits: 3});
const no = value => fmt.format(value === 0 ? 0 : value);

export function differenceQuotient(b, h) {
  return h === 0 ? undefined : Math.sign(h) + b;
}

export function accumulation(c, x) {
  const primitive = t => t*t/2 - c*t;
  const signed = primitive(x);
  const area = x > c ? Math.abs(primitive(c)) + Math.abs(signed - primitive(c)) : Math.abs(signed);
  return {signed, area, slope: x-c};
}

function table(headings, rows, caption) {
  return `<div class="pl-tablewrap"><table class="data-table">
    <caption>${caption}</caption><thead><tr>${headings.map(name => `<th scope="col">${name}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(([label, ...cells]) => `<tr><th scope="row">${label}</th>${cells.map(value => `<td>${no(value)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

function controls(inputs) {
  return `<fieldset class="rl-controls"><legend>Endre verdiene</legend>${inputs.map(([key, title, value, min, max, step]) =>
    `<label><span>${title} <output data-value="${key}">${no(value)}</output></span>
      <input name="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`).join('')}</fieldset>`;
}

function graph({label, ymin, ymax, xmin, xmax, xticks, yticks, content}) {
  const X = x => 40 + (x-xmin)*416/(xmax-xmin);
  const Y = y => 226 - (y-ymin)*210/(ymax-ymin);
  const line = (x1,y1,x2,y2,cls) => `<line class="${cls}" x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}"/>`;
  return `<svg class="rl-graph" viewBox="0 0 480 254" role="img" aria-label="${label}">
    ${xticks.map(x => `${line(x,ymin,x,ymax,'rl-grid')}<text x="${X(x)}" y="245" text-anchor="middle">${no(x)}</text>`).join('')}
    ${yticks.map(y => `${line(xmin,y,xmax,y,'rl-grid')}<text x="32" y="${Y(y)+4}" text-anchor="end">${no(y)}</text>`).join('')}
    ${line(xmin,0,xmax,0,'rl-axis')}${line(0,ymin,0,ymax,'rl-axis')}
    <text x="461" y="${Y(0)-5}">x</text><text x="${X(0)+7}" y="14">y</text>
    ${content(X,Y,line)}
  </svg>`;
}

const differentiation = {
  title: 'Deriverbar i knekkpunktet?',
  intro: 'Vi undersøker f(x) = |x − a| + b(x − a) rundt x = a. Absoluttverdien kan gi et knekkpunkt.',
  prediction: 'Kan du gjøre funksjonen deriverbar i x = a ved å velge en bestemt verdi av b?',
  options: ['Ja, for minst én verdi av b.', 'Nei, uansett hvilken b jeg velger.'],
  followup: 'Sammenlign kvotientene på hver side når h nærmer seg 0. Hva skjer med differansen mellom dem når du endrer b? Hva endrer a?',
  answer: 'For h < 0 er |h|/h = −1, slik at kvotienten er b − 1. For h > 0 er |h|/h = 1, slik at kvotienten er b + 1. De to ensidige grensene skiller seg alltid med 2. Funksjonen er derfor ikke deriverbar i x = a for noen verdi av b. Parameteren a flytter knekkpunktet.',
  inputs: [['a','Knekkpunkt a',1,-2,2,.5],['b','Parameter b',.5,-2,2,.5],['h','Avstand |h|',1,.05,2,.05]],
  draw({a,b,h}) {
    const f = x => Math.abs(x-a)+b*(x-a);
    const picture = graph({label:`Graf for f med knekkpunkt (${no(a)}, 0) og to markerte punkter ved avstand ${no(h)} fra knekkpunktet`,
      ymin:-10,ymax:22,xmin:-5,xmax:5,xticks:[-4,-2,0,2,4],yticks:[-10,-5,0,5,10,15,20],
      content: (X,Y,line) => `<polyline class="rl-function" points="${X(-5)},${Y(f(-5))} ${X(a)},${Y(0)} ${X(5)},${Y(f(5))}"/>
        ${line(a-h,0,a-h,f(a-h),'rl-guide')}${line(a+h,0,a+h,f(a+h),'rl-guide')}
        ${[a-h,a,a+h].map(x=>`<circle class="rl-point" cx="${X(x)}" cy="${Y(f(x))}" r="5"/>`).join('')}`});
    const rows = [-h,-h/2,h/2,h].map(delta => [no(delta),a+delta,Math.abs(delta)+b*delta,differenceQuotient(b,delta)]);
    return picture + table(['h','a + h','f(a + h)','(f(a + h) − f(a))/h'], rows, 'Differansekvotienter rundt x = a');
  }
};

const integral = {
  title: 'Integral, areal og akkumulering',
  intro: 'Flytt øvre grense x for A(x) = ∫₀ˣ f(t) dt, der f(t) = t − c. Sammenlign A(x) med det samlede geometriske arealet mellom grafen og aksen.',
  prediction: 'Kan A(x) være negativ når x > 0?',
  options: ['Ja, integralet kan være negativt.', 'Nei, integralet er alltid minst null.'],
  followup: 'Sett c = 2 og prøv x = 1, 2 og 4. Når er A(x) minst? Forklar hvordan fortegnet til f(x) påvirker A(x), og finn x der A(x) = 0 med x > 0. Hva er det geometriske arealet der?',
  answer: 'Med c = 2 har A(x) = x²/2 − 2x minimum ved x = 2. Analysens fundamentalteorem gir A′(x) = f(x) = x − 2. A avtar før x = 2 og øker etterpå. Ved x = 4 opphever bidragene −2 og +2 hverandre, slik at integralet er 0. Det geometriske arealet er 2 + 2 = 4.',
  inputs: [['c','Nullpunkt c',2,1,3,.25],['x','Øvre grense x',3,0,6,.25]],
  draw({c,x}) {
    const f = t => t-c;
    const picture = graph({label:`Graf for f med nullpunkt ${no(c)} og markert areal fra 0 til ${no(x)}`,
      ymin:-3,ymax:5,xmin:0,xmax:6,xticks:[0,1,2,3,4,5,6],yticks:[-3,-2,-1,0,1,2,3,4,5],
      content: (X,Y,line) => {
        const area = (left,right,cls) => `<polygon class="${cls}" points="${X(left)},${Y(0)} ${X(left)},${Y(f(left))} ${X(right)},${Y(f(right))} ${X(right)},${Y(0)}"/>`;
        return `${area(0,Math.min(x,c),'rl-negative')}${x>c ? area(c,x,'rl-positive') : ''}
          ${line(0,f(0),6,f(6),'rl-function')}${line(x,0,x,f(x),'rl-guide')}
          <circle class="rl-point" cx="${X(x)}" cy="${Y(f(x))}" r="5"/>`;
      }});
    const {signed, area, slope} = accumulation(c,x);
    const rows = [...new Set([0,c,x,2*c])].sort((a,b)=>a-b).map(t => {
      const values = accumulation(c,t);
      return [t===x ? `${no(t)} (valgt)` : no(t), values.signed, values.area, values.slope];
    });
    return picture + '<p class="rl-legend"><span>Under aksen (−)</span><span>Over aksen (+)</span></p>' +
      `<p>A(${no(x)}) = ${no(signed)}. Geometrisk areal = ${no(area)}. A′(${no(x)}) = f(${no(x)}) = ${no(slope)}.</p>` +
      table(['x','Integral A(x)','Geometrisk areal','A′(x) = f(x)'], rows, 'Akkumulering fram til øvre grense x');
  }
};

export function mountRealLab(root, fag) {
  const lab = fag === 'R1' ? differentiation : fag === 'R2' ? integral : undefined;
  if (!lab) return false;
  root.innerHTML = `<section class="pl-lab rl-lab"><h3>${lab.title}</h3><p>${lab.intro}</p>
    <form><label><span>${lab.prediction}</span><select name="prediction" required>
      <option value="">Velg en hypotese</option>${lab.options.map((option,index)=>`<option value="${index}">${option}</option>`).join('')}
    </select></label><button type="submit">Undersøk hypotesen</button></form>
    <div class="pl-result" hidden>
      <p data-hypothesis></p>${controls(lab.inputs)}
      <div data-graph></div>
      <h4>Forklar det du ser</h4><p>${lab.followup}</p>
      <details><summary>Se forklaring</summary><p>${lab.answer}</p></details>
    </div></section>`;
  const form = root.querySelector('form');
  const result = root.querySelector('.pl-result');
  const fieldset = result.querySelector('fieldset');
  const output = result.querySelector('[data-graph]');
  const values = {};
  function redraw() {
    for(const input of fieldset.querySelectorAll('input')) {
      values[input.name] = input.valueAsNumber;
      fieldset.querySelector(`[data-value="${input.name}"]`).value = no(input.valueAsNumber);
      input.setAttribute('aria-valuetext', no(input.valueAsNumber));
    }
    output.innerHTML = lab.draw(values);
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    result.querySelector('[data-hypothesis]').textContent = `Din hypotese: ${lab.options[Number(form.elements.prediction.value)]}`;
    result.hidden = false;
    redraw();
    fieldset.querySelector('input').focus();
  });
  fieldset.addEventListener('input', redraw);
  return true;
}
