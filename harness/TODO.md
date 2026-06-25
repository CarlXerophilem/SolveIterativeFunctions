# TODO backlog — "The Shelf" content build (supersedes the engine-refactor pilot backlog)

Tiering: T0 = core shelf pages (must ship); T1 = integration + bibliography; T2 = polish/extras.

- **[S-research]** Web-research the field into sourced briefs in `state/research/` (history, equations
  atlas, connections×2, literature, landscape) + Chrome/alphaXiv deep extracts. _(T0 — DONE: WF
  `ife-shelf-research` + host Chrome fetches)_
- **[S-shelf]** `shelf.html` — map of the field (generality hub): families of equations, the central
  problems, eras/schools, the web of connections, a visual field-map, links into every page. _(T0)_
- **[S-history]** `history.html` — chronological history Babbage 1815 → modern, timeline + figures. _(T0)_
- **[S-equations]** `equations.html` — atlas of the canonical named equations (Babbage, iterative-root,
  Abel, Schröder, Böttcher, Julia, conjugacy, translation/Lévy, Aczél–Jabotinsky, commuting). _(T0)_
- **[S-connections]** `connections.html` — connections to other fields (complex dynamics, dynamical
  systems, continuous iteration/flows & Lie, tetration, combinatorics/formal groups, probability/
  branching, operator theory, numerics, physics/RG). _(T0)_
- **[S-biblio]** Expand `bibliography.html` into a sectioned, link-rich annotated bibliography. _(T1)_
- **[S-index]** Update `index.html` hub cards + hero copy to surface the shelf and reframe the site
  around the whole field (generality), not only half-iterates. _(T1)_
- **[S-nav]** Update the prev/next fixed-bar chain on existing pages (index, theory, solver) to the new
  reading order. _(T1)_
- **[S-verify]** Adversarial fact-check of key dates/attributions/equation statements; fix flagged
  errors. `npm run format`; spot-check KaTeX render + internal links in Chrome. _(T1)_
- **[S-docs]** Refresh `README.md` + `CLAUDE.md` to describe the broadened scope. _(T2)_
- **[S-blog]** (optional) Add 1–2 new blog notes tying the shelf back to the solver. _(T2 — defer)_

> Dependency: S-research → {S-shelf, S-history, S-equations, S-connections, S-biblio} (parallel writers)
> → S-index/S-nav/S-verify (host integration) → S-docs. Shelf writer consumes the FULL corpus.
