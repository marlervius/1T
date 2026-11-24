// Mobile number keyboards often omit the two signs needed for a negative fraction.
document.addEventListener('focusin', event => {
  const field = event.target;
  if (!matchMedia('(max-width: 720px), (pointer: coarse)').matches ||
      !field.matches('input.answer-input, #practice input[type="text"], #step input[type="text"]') ||
      field.dataset.matteknapper || field.disabled) return;
  field.dataset.matteknapper = 'vist';
  const keys = document.createElement('div');
  keys.className = 'matteknapper';
  keys.setAttribute('role','group');
  keys.setAttribute('aria-label','Tegn til svaret');
  for (const [value, name] of [['−','Sett inn minustegn'], ['/','Sett inn brøkstrek']]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = value;
    button.setAttribute('aria-label',name);
    button.addEventListener('pointerdown', e => e.preventDefault());
    button.addEventListener('click', () => {
      field.setRangeText(value, field.selectionStart, field.selectionEnd, 'end');
      field.dispatchEvent(new Event('input',{bubbles:true}));
      field.focus();
    });
    keys.append(button);
  }
  const label = field.closest('label');
  (label || field).after(keys);
});
