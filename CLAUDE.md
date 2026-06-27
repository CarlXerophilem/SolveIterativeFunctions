# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An interactive educational website — a reference **"shelf" for the whole field of iterative functional equations**. It pairs interactive tools for \(f(f(x)) = F(x)\) (functional square roots / half-iterates, via the composita method and local analytic Schröder coordinates) with a set of standalone **reference pages** that broaden the scope to the entire subject: `shelf.html` (a field map), `history.html` (Babbage → modern), `equations.html` (an atlas of the canonical named equations), `connections.html` (links to complex dynamics, flows, tetration, combinatorics, probability, operators, physics), and a greatly expanded `bibliography.html`. Deployed as a static site on GitHub Pages (https://carlxerophilem.github.io/SolveIterativeFunctions/). Content is in English; the repo lives under a Chinese-named parent path (公众号文章 = WeChat article).

The reading-order spine (fixed-bar prev/next) is: `index → shelf → history → theory → equations → connections → solver → composita → bibliography → blog`. The prose/reference pages are **web-sourced and fact-checked**; the sourced research corpus and verified-citation notes live under `harness/state/research/` (see e.g. `canonical-citations.md`). When editing these pages, keep dates/attributions/equation statements consistent with that corpus and hedge anything it flags as uncertain rather than asserting a possibly-wrong fact.

## Build & run

There is **no build step or bundler** — the site is served as-is and edits are live on reload. The only tooling is linting/formatting (added for editor feedback; not required to run the site):

- `npm run lint` / `npm run lint:fix` — ESLint over `js/` (flat config in `eslint.config.js`)
- `npm run format` / `npm run format:check` — Prettier over JS/CSS/HTML/JSON/MD

Style is 2-space indent, single quotes, semicolons (see `.prettierrc.json`), matching `engine.js`.

Preview locally with a static server (don't open via `file://` — Giscus comments and some CDN behavior need `http://`):
- `python -m http.server 8000` then open http://localhost:8000/index.html
- Or use the `/preview` skill.

Deployment is automatic: pushing to the default branch publishes via GitHub Pages.

## Architecture

- `js/engine.js` — the entire computation engine, loaded as a plain `<script>` (not an ES module) by `solver.html` and `composita.html`. Key pieces:
  - `Rational` class: **exact** arithmetic over BigInt. Series/composita coefficients must stay exact — do not introduce floating-point into the symbolic paths or coefficients drift.
  - Composita recurrence (Kruchinin \(F^\Delta(n,k)\)), power-series ops (compose/invert/multiply/derivative), fixed-point finding & classification, and `solveSchroederHalfIterate` for local analytic half-iterates near non-parabolic fixed points.
  - Two complementary solver modes are exposed in the UI: paper-based composita and local analytic Schroeder coordinates.
  - **`…FromLocal` API** (`classifyFromLocal`, `solveSchroederFromLocal`, `solveParabolicFromLocal`, `solveHalfIterateAtFixedPointLocal`) drives the analytic solver from a **local Taylor jet `[F(x0)-x0, F'(x0), F''(x0)/2, …]` + an optional true-`F` callback**, so it works for *any* elementary `F`, not just polynomials. The classic `coeffs`-based functions are thin wrappers over these (preserving exact prior behaviour/residuals). `findFixedPointsNumeric(Ffn,a,b)` locates real fixed points of a numeric `F`.
- `js/expr.js` — elementary-expression parser/evaluator (global `Expr`; plain `<script>`, no deps), loaded by `solver.html`. `Expr.parse / evalNumber / taylor(node,center,order) / toLatex / compile`. The `taylor` jet (truncated-power-series AD) is what feeds the engine's `…FromLocal` API; `toLatex` drives the live KaTeX. **`solver.html`'s `F(x)` input is a free-form elementary-function box** (no longer a coefficient grid) wired through `Expr`.
- `*.html` — each page is standalone; shared look comes from `css/main.css` (CSS variables, light/dark theme). Math is rendered by **KaTeX** (`js/katex-init.js` + CDN auto-render), so any new math must use TeX delimiters KaTeX understands.
- `resources/` — reference papers (Kruchinin 2013/2014), `bibliography.md`, and standalone Python helpers (`manim_half_iterates.py`, composita calculators). The Python is reference/authoring only — **not** part of the site build.

## Conventions

- Match the existing vanilla-JS style in `engine.js` (no frameworks, no new dependencies unless asked).
- Keep new pages consistent with the existing HTML structure and `css/main.css` classes rather than adding inline styles.
- LaTeX output for display is built by helpers like `formatPolynomialLatex` / `formatNumber` — reuse them instead of hand-formatting.
