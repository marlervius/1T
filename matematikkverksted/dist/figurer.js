// Coordinate diagrams used on the overview. Each graphic links to its chapter.
const s = (x1,y1,x2,y2,more='') => '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" '+more+'/>';
const point = (x,y) => '<circle cx="'+x+'" cy="'+y+'" r="3.2" fill="var(--art-dot)" stroke="currentColor" stroke-width="1.5"/>';
const label = (x,y,v,size=12) => '<text x="'+x+'" y="'+y+'" font-size="'+size+'" fill="currentColor" stroke="none">'+v+'</text>';
const axes=s(16,69,228,69)+s(61,12,61,89);
const mini = [
  '<g stroke="currentColor" stroke-width="1.4"><path d="M69 18h66v66H69z" fill="var(--art-fill)"/><path d="M114 18v66M69 63h66" fill="none"/><path d="M114 63h21v21h-21z" fill="var(--art-dot)"/></g>'+label(88,49,'a²',17)+label(117,78,'b²',10)+label(78,80,'ab')+label(116,44,'ab',11),
  '<path d="M36 48h140M104 48l-8 25h16zM70 48V29h28v19zm34 0V29h28v19z" fill="var(--art-fill)" stroke="currentColor" stroke-width="1.7"/>'+label(80,43,'x')+label(114,43,'3')+s(145,23,168,23)+s(145,29,168,29)+label(182,37,'7',20),
  '<g opacity=".48">'+axes+'</g><path d="M33 8Q112 158 191 8" fill="none" stroke="currentColor" stroke-width="2.7"/>'+point(78,69)+point(146,69)+point(112,83),
  '<g opacity=".45">'+axes+'</g><path d="M30 78C68 76 104 70 132 57S177 27 191 8" stroke="currentColor" stroke-width="2.8" fill="none"/>'+point(110,65)+point(156,44),
  '<g>'+label(42,57,'P(x)',27)+label(102,54,'=',20)+label(131,57,'DQ',26)+label(183,54,'+ R',18)+'</g>',
  '<g opacity=".43">'+axes+'</g><path d="M31 14Q115 146 199 8" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M90 94L204 25" stroke="currentColor" stroke-dasharray="5 3" stroke-width="1.6"/>'+point(150,58),
  '<path d="M49 76L181 76L181 15Z" stroke="currentColor" fill="var(--art-fill)" stroke-width="2"/><path d="M171 76v-10h10M77 76Q78 70 75 64" stroke="currentColor" fill="none"/>'+label(83,72,'v',13)+label(111,41,'c',16)+label(188,49,'a',16),
  '<g opacity=".45">'+axes+'</g>'+s(36,82,201,22,'stroke-dasharray="5 3"')+[[47,78],[69,68],[90,67],[112,51],[133,44],[157,43],[180,28],[198,22]].map(p=>point(...p)).join('')
];
export function chapterFigure(index) {
  return '<svg viewBox="0 0 242 96" preserveAspectRatio="xMidYMid meet" aria-hidden="true" fill="none" stroke="currentColor" font-family="Georgia,serif">'+mini[index]+'</svg>';
}

export function coverFigure(){
  // x ∈ [-3.1,3.1], y=x². One unit is 34 px horizontally and 20 px vertically.
  const X=x=>174+34*x, Y=y=>168-20*y;
  const curve = Array.from({length:129},(_,i)=>{
    const x=-2.84+i*5.68/128;
    return (i?'L':'M')+X(x).toFixed(2)+' '+Y(x*x).toFixed(2);
  }).join(' ');
  let grid='';
  for(let i=-8;i<=8;i++)grid+=s(X(i),0,X(i),202);
  for(let i=-1;i<=9;i++)grid+=s(0,Y(i),360,Y(i));
  return '<svg viewBox="0 0 360 202" role="img" aria-label="Parabelen y er x i andre, med punktene (1, 1) og (2, 4). En sekant går gjennom de to punktene.">'+
    '<g stroke="#a49ac9" opacity=".22" stroke-width=".8">'+grid+'</g>'+
    '<g stroke="#c4bed7" opacity=".75">'+s(6,Y(0),345,Y(0))+s(X(0),4,X(0),197)+'</g>'+
    '<path d="'+curve+'" fill="none" stroke="#c2adff" stroke-width="3.5" stroke-linecap="round"/>'+
    '<path d="M'+X(.45)+' '+Y(3*.45-2)+'L'+X(3.3)+' '+Y(3*3.3-2)+'" stroke="#d9f68c" stroke-width="2"/>'+
    '<path d="M208 148H242V88" stroke="#e1f1b6" stroke-width="1.2" opacity=".65" stroke-dasharray="3 4" fill="none"/>'+
    '<g fill="#e1f6ae" stroke="#29214e" stroke-width="2"><circle cx="208" cy="148" r="4.7"/><circle cx="242" cy="88" r="4.7"/></g>'+
    '<g fill="#efe9ff" font-family="Georgia,serif" font-style="italic" font-size="13"><text x="343" y="162">x</text><text x="181" y="16">y</text><text x="233" y="34">f(x) = x²</text></g>'+
    '<g fill="#e2f9a7" font-family="system-ui,sans-serif" font-size="11"><text x="249" y="93">(2, 4)</text><text x="197" y="132">(1, 1)</text></g>'+
    '<g fill="#c1bbd3" font-family="system-ui,sans-serif" font-size="10"><text x="162" y="182">0</text><text x="103" y="182">−2</text><text x="238" y="182">2</text></g></svg>';
}
