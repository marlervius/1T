export function escapeHtml(value) {
  const entities = {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'};
  return String(value).replace(/[&<>"']/g, character => entities[character]);
}

// Content marks inline mathematical notation with dollar delimiters.
export function mathHtml(text, displayMode = false) {
  return text.split('$').map((part, index) => {
    if (index % 2 === 0 || !window.katex) return escapeHtml(part);
    return window.katex.renderToString(part, {
      displayMode,
      output: 'htmlAndMathml',
      throwOnError: false,
      trust: false
    });
  }).join('');
}

export function texNumber(value) {
  return String(value).replaceAll(',', '{,}').replaceAll(/[\u00a0\u202f ]/g, '\\,');
}
