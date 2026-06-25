# GOAL — SolveIterativeFunctions · "The Shelf" (engineering / content mode)

**Statement:** Increase the site's *generality*: broaden it from a half-iterate / composita
calculator into a comprehensive **shelf** (reference library) for the whole field of
**iterative functional equations (IFE)** — covering its **history**, its **connections to other
fields**, and the body of **studies / literature** — while preserving the existing static-site
stack (KaTeX, `css/main.css`, vanilla JS, no build step).

**Mode hint:** engineering

## Success criteria
- New pages, each matching `theory.html`'s structure / CSS / KaTeX conventions
  (`.fixed-bar` nav, `.toc-chapter`, `.definition/.theorem/.keypoint/.practice`, footer, dark-mode):
  - `shelf.html` — a **map of the field** (the generality hub: families of equations, central
    problems, eras/schools, the web of connections; links into every other page).
  - `history.html` — chronological **history** (Babbage 1815 → Abel → Schröder → Koenigs → Böttcher
    → Fatou/Julia → Kneser → the Kuczma/Targoński school → modern), with a timeline and key figures.
  - `equations.html` — an **atlas** of the canonical named equations (Babbage, Abel, Schröder,
    Böttcher, Julia, translation/Lévy, conjugacy, Aczél–Jabotinsky, iterative-root, commuting),
    each with precise statement, normal form, the fixed-point type it linearizes, existence/
    uniqueness facts, and references.
  - `connections.html` — **connections to other fields** (complex dynamics; dynamical systems &
    ergodic theory; continuous iteration / iteration semigroups / embedding flows & Lie theory;
    special functions, tetration & hyperoperations; combinatorics, formal power series & formal
    groups; probability & branching processes; operator theory; numerical analysis & CS;
    physics & renormalization).
- `bibliography.html` greatly **expanded & sectioned**, with real links (arXiv / DOI / MacTutor / alphaXiv).
- `index.html` hub + the prev/next nav chain updated to surface the shelf; all internal links valid.
- Content is **factually sourced** (web research via Chrome / alphaXiv / WebSearch); key dates,
  attributions, and equation statements are **fact-checked**.
- `npm run format` / `lint` clean; KaTeX delimiters render; no console errors.

## Constraints
- Static site, **no build/bundler**; **KaTeX** (not MathJax); reuse `css/main.css` classes; match the
  `theory.html` template (don't add inline-style sprawl or new runtime deps).
- English content. Do **not** break existing pages, the solver, or the composita engine.
- Reference work — **no fabricated** dates / names / titles / arXiv IDs; mark anything unverified.

> Supersedes the prior engineering pilot goal (engine *FromLocal* refactor) and the generative demo
> seed. This run is the content/shelf build. See `state/research/` for the sourced corpus and
> `TODO.md` for the decomposed backlog.
