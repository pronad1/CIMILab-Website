/* ─── BibTeX Copy-to-Clipboard ─────────────────────────────── */
(function () {
  'use strict';

  // Trigger: buttons with [data-bibtex] attribute containing the BibTeX string.
  // Click copies to clipboard and briefly shows a "Copied!" state.

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for older browsers
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.top = '-9999px';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-bibtex]');
    if (!btn) return;

    var bibtex   = btn.getAttribute('data-bibtex');
    var original = btn.innerHTML;
    copyToClipboard(bibtex).then(function () {
      btn.textContent = '✓ Copied!';
      btn.style.color     = '#34D399';
      btn.style.borderColor = '#34D399';
      setTimeout(function () {
        btn.innerHTML     = original;
        btn.style.color   = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  });
})();
