/**
 * Shared KaTeX bootstrap for the whole site.
 *
 * Loaded after katex.min.js and contrib/auto-render.min.js (both deferred), this
 * auto-renders all TeX written with the site's \( \) / \[ \] / $$ delimiters and
 * exposes window.katexRender(root) so interactive pages (e.g. the solver) can
 * re-typeset a subtree after a dynamic update — synchronously and fast, unlike
 * MathJax's full-document typesetPromise().
 */
(function () {
  'use strict';

  var OPTIONS = {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '$$', right: '$$', display: true },
      { left: '\\(', right: '\\)', display: false },
    ],
    throwOnError: false,
    errorColor: '#e74c3c',
  };

  function renderAll(root) {
    if (window.renderMathInElement) {
      window.renderMathInElement(root || document.body, OPTIONS);
    }
  }

  // Re-render a freshly updated subtree (used by the interactive solver).
  window.katexRender = renderAll;

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', function () {
      renderAll(document.body);
    });
  } else {
    renderAll(document.body);
  }
})();
