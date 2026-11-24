import {escapeHtml, mathHtml} from './matematikk.js';

const cases = {
  'algebra/3': {
    title:'Bevis den første kvadratsetningen',
    start:'La $a$ og $b$ være reelle tall. Start med $(a+b)^2$, og bygg en sammenhengende utregning fram til $a^2+2ab+b^2$.',
    steps:[
      {text:'Skriv potensen som et produkt av to like faktorer. Vi får $(a+b)(a+b)$.',hint:'Hva betyr det å opphøye summen i andre potens?'},
      {text:'Fordel den første summen over den andre parentesen. Produktet blir $a(a+b)+b(a+b)$.',hint:'Begge faktorene er nå synlige. Hvordan kan du bruke den distributive loven én gang og fortsatt beholde to parenteser?'},
      {text:'Multipliser inn i de to gjenværende parentesene. Det gir $a^2+ab+ba+b^2$.',hint:'Hva blir hvert av de to produktene når du multipliserer inn i parentesene?'},
      {text:'Bruk $ba=ab$ og samle kryssleddene. Uttrykket blir $a^2+2ab+b^2$.',hint:'Hvilke to ledd kan du samle ved å bytte rekkefølgen på faktorene?'}
    ],
    reflection:'Forklar for en medelev hvor begge kryssleddene kommer fra. Hva endres i beviset dersom du bytter ut b med −b?'
  },
  'trigonometri/2': {
    title:'Bevis cosinussetningen',
    start:'I trekanten $ABC$ er $BC=a$, $AC=b$ og $AB=c$. Plasser $C=(0,0)$ og $A=(b,0)$, med $B$ over førsteaksen. Utled et uttrykk for $c^2$ som inneholder vinkelen $C$.',
    steps:[
      {text:'Projiser siden $CB$ på aksene. Punktet $B$ har koordinatene $(a\\cos C,\\;a\\sin C)$.',hint:'Begynn med å finne koordinatene til punktet som ennå ikke er plassert.'},
      {text:'Bruk avstandsformelen på $A$ og $B$. Da er $c^2=(b-a\\cos C)^2+(a\\sin C)^2$.',hint:'Du kjenner koordinatene til begge endepunktene på AB. Hvordan finner du kvadratet av avstanden?'},
      {text:'Utvid kvadratet og samle ledd med $a^2$. Høyresiden blir $b^2-2ab\\cos C+a^2(\\cos^2 C+\\sin^2 C)$.',hint:'Multipliser ut parentesene i avstandsformelen. Hvilke to ledd har en felles faktor?'},
      {text:'Bruk $\\cos^2 C+\\sin^2 C=1$. Da får vi $c^2=a^2+b^2-2ab\\cos C$.',hint:'Hvilken identitet kan du bruke for å forenkle parentesen som multipliseres med a²?'}
    ],
    reflection:'Forklar hvorfor koordinatbeviset også gjelder når C er stump. Hva blir igjen av formelen når C er rett?'
  }
};

function scramble(length, previous=[]) {
  const order=Array.from({length},(_,i)=>i);
  for (let i=length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [order[i],order[j]]=[order[j],order[i]];
  }
  while (order.every((v,i)=>v===i) || order.every((v,i)=>v===previous[i])) {
    order.push(order.shift());
  }
  return order;
}

function card(step,id,position,size) {
  return `<li class="proof-card" data-step="${id}">
    <span class="proof-handle" aria-hidden="true" title="Dra steget">⠿</span>
    <div class="proof-text">${mathHtml(step.text)}</div>
    <div class="proof-controls"><button type="button" data-shift="-1" aria-label="Flytt steg ${position+1} opp"${position===0?' disabled':''}>Opp</button>
      <button type="button" data-shift="1" aria-label="Flytt steg ${position+1} ned"${position===size-1?' disabled':''}>Ned</button></div></li>`;
}

export function bevisMarkup(lessonKey) {
  const paper=cases[lessonKey];
  if (!paper) return '';
  const id='proof-'+lessonKey.replace('/','-');
  const order=scramble(paper.steps.length);
  return `<section class="pane proof-lab" data-proof="${lessonKey}" aria-labelledby="${id}"><h2 id="${id}">${escapeHtml(paper.title)}</h2>
    <p>${mathHtml(paper.start)}</p><p class="proof-instruction">Sett stegene i rekkefølge. Dra i håndtakene eller bruk Opp og Ned.</p>
    <ol class="proof-list">${order.map((v,i)=>card(paper.steps[v],v,i,order.length)).join('')}</ol>
    <div class="actions"><button class="button solid" type="button" data-check>Sjekk rekkefølgen</button><button class="button outline" type="button" data-scramble>Bland stegene</button></div>
    <p class="proof-status" role="status"></p><p class="proof-reflect" hidden><strong>Begrunn muntlig</strong> ${mathHtml(paper.reflection)}</p></section>`;
}

function attach(element) {
  if (element.dataset.proofReady) return;
  element.dataset.proofReady='true';
  const paper=cases[element.dataset.proof], list=element.querySelector('.proof-list');
  const status=element.querySelector('.proof-status'), reflection=element.querySelector('.proof-reflect');
  const ids=()=>[...list.children].map(el=>Number(el.dataset.step));
  let drag=null;
  function refresh(order,message) {
    list.innerHTML=order.map((v,i)=>card(paper.steps[v],v,i,order.length)).join('');
    reflection.hidden=true;
    status.textContent=message;
  }
  function reorder(id,slot,focusDirection) {
    const current=ids();
    const from=current.indexOf(id);
    if (from<0 || slot<0 || slot>=current.length || slot===from) return;
    current.splice(from,1);
    current.splice(slot,0,id);
    refresh(current,'Steget er flyttet til plass '+(slot+1)+' av '+current.length+'.');
    if (focusDirection) {
      const row=list.children[slot];
      const button=row.querySelector('[data-shift="'+focusDirection+'"]');
      (button.disabled ? row.querySelector('button:not(:disabled)') : button).focus();
    }
  }
  function clearMarkers() {
    list.querySelectorAll('.proof-before,.proof-after').forEach(el=>el.classList.remove('proof-before','proof-after'));
  }
  function dropPosition(y,id) {
    const others=[...list.children].filter(row=>Number(row.dataset.step)!==id);
    const before=others.findIndex(row=>{const box=row.getBoundingClientRect();return y<box.top+box.height/2;});
    return {others,slot:before<0?others.length:before};
  }
  function insideList(e) {
    const box=list.getBoundingClientRect();
    return e.clientX>=box.left-8 && e.clientX<=box.right+8 && e.clientY>=box.top-16 && e.clientY<=box.bottom+16;
  }
  function endDrag(e,dropped) {
    if (!drag || drag.pointer!==e.pointerId) return;
    const {id,handle}=drag;
    drag=null;
    if (handle.hasPointerCapture(e.pointerId)) handle.releasePointerCapture(e.pointerId);
    list.classList.remove('proof-dragging');
    clearMarkers();
    if (dropped && insideList(e)) reorder(id,dropPosition(e.clientY,id).slot);
  }
  element.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-shift')) {
      const id=Number(button.closest('li').dataset.step);
      const delta=Number(button.dataset.shift);
      reorder(id,ids().indexOf(id)+delta,delta);
    } else if (button.hasAttribute('data-scramble')) {
      refresh(scramble(paper.steps.length,ids()),'Stegene er blandet.');
    } else if (button.hasAttribute('data-check')) {
      const order=ids(), mismatch=order.findIndex((id,index)=>id!==index);
      list.querySelectorAll('.proof-error').forEach(el=>el.classList.remove('proof-error'));
      reflection.hidden=mismatch!==-1;
      if (mismatch===-1) {
        status.textContent='Stegene danner en sammenhengende utledning. Prøv å forklare hvorfor hver overgang gjelder.';
      } else {
        list.children[mismatch].classList.add('proof-error');
        const prefix=mismatch===0?'Se på startsteget. ':'Se på overgangen fra steg '+mismatch+' til steg '+(mismatch+1)+'. ';
        status.textContent=prefix+paper.steps[mismatch].hint;
      }
    }
  });
  list.addEventListener('pointerdown',e=>{
    const handle=e.target.closest('.proof-handle');
    if (!handle || drag || !e.isPrimary || e.button!==0) return;
    e.preventDefault();
    const id=Number(handle.closest('li').dataset.step);
    drag={handle,id,pointer:e.pointerId};
    handle.setPointerCapture(e.pointerId);
    list.classList.add('proof-dragging');
  });
  list.addEventListener('pointermove',e=>{
    if (!drag || e.pointerId!==drag.pointer) return;
    clearMarkers();
    if (!insideList(e)) return;
    const {others,slot}=dropPosition(e.clientY,drag.id);
    const marker=others[slot] || others.at(-1);
    marker.classList.add(slot===others.length?'proof-after':'proof-before');
  });
  list.addEventListener('pointerup',e=>endDrag(e,true));
  list.addEventListener('pointercancel',e=>endDrag(e,false));
  list.addEventListener('lostpointercapture',e=>endDrag(e,false));
}

export function monterBevis(root) {
  root.querySelectorAll('[data-proof]').forEach(attach);
}
