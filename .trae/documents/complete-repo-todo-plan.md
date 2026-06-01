# Plan: Complete the Repo Todo

## Summary

Complete the visible repo todo by turning the three placeholder blog entries in `blog.html` into full article pages, cleaning up the blog page itself, and expanding the current solver into a stronger interactive calculator that covers both the existing composita workflow and a new analytic half-iterate workflow. The implementation stays within the repo's current lightweight static-site architecture: plain HTML pages, `js/engine.js`, `css/main.css`, MathJax, canvas/SVG-style graphics, and a small optional Manim asset loaded lazily.

## Current State Analysis

- The repo is a static multi-page site rooted at `/workspace` with no framework or build system. The main runtime logic is in `js/engine.js`, and shared styling is in `css/main.css`.
- The only actionable todo items currently present in the repo are the three `Coming soon` placeholders in `blog.html`.
- `blog.html` also contains a duplicate comments block that should be removed as part of the cleanup.
- `solver.html` currently solves only the truncated power-series half-iterate problem `A(A(x)) = F(x)` from coefficient inputs, displays formulas as plain text instead of MathJax-ready output, and does not expose the broader case structure requested by the user.
- `js/engine.js` already contains the composita recurrence, composition helpers, and a basic half-iterate solver, so it is the correct extension point for stronger paper-backed and analytic methods.
- `bibliography.html` and `resources/bibliography.md` already provide the core site references, especially the two Kruchinin papers. These should remain the primary anchors for the new articles and calculator notes.
- Local research material already exists in `resources/`, including the composita paper sources and the iterative-equation PDF, so implementation can cross-check the paper-backed formulas during execution.

## Proposed Changes

### 1. Finish the blog todo and clean up the blog index

#### `/workspace/blog.html`

- Replace the three placeholder list items with dated entries that link to full article pages.
- Add one-sentence abstracts under each title so the page reads like a real notes index instead of a placeholder.
- Keep the page lightweight by using the existing list layout, with only small structural CSS additions if needed.
- Remove the duplicated second comments section so the page has a single comments block.
- Add a short note near the article list pointing readers to the upgraded solver for interactive experimentation.

### 2. Add three full article pages

Create three new top-level HTML pages so the structure matches the current flat site layout.

#### `/workspace/post-fixed-points-functional-iteration.html`

- Topic: fixed points as the organizing principle of functional iteration.
- Structure:
  - Motivation and problem statement.
  - Formal definitions of iterates, half-iterates, fixed points, cycles, and local conjugacy.
  - Real-line solvable vs. unsolvable contrast, tied back to current theory content.
  - Worked examples that connect directly to the existing site examples.
  - Applications to local linearization, stability, and why fixed points matter before solving `f(f(x)) = F(x)`.
- Visuals:
  - Inline lightweight cobweb or fixed-point diagrams.
  - One optional lazy-loaded Manim animation showing orbit/fixed-point behavior.

#### `/workspace/post-composita-half-iterates.html`

- Topic: solving `A^{2^m}(x) = F(x)` by the composita recurrence, with `m=1` emphasized first and the paper’s general `2^m` structure made explicit.
- Structure:
  - Motivation from generating functions.
  - Formal setup using ordinary generating functions and composita notation.
  - Step-by-step derivation of the triangular coefficient system.
  - Explanation of the paper-backed generalization from half-iterate to repeated `2^m`-iterate roots.
  - Discussion of the integer-coefficient scaling observation from the paper.
  - Applications to symbolic/numeric experimentation in the site calculator.
- Visuals:
  - Coefficient-flow or recurrence-dependency diagram.
  - Small table or heatmap-style visual for composita growth, implemented with HTML/CSS or canvas.

#### `/workspace/post-numerical-half-iterate-methods.html`

- Topic: comparing numerical and local analytic approaches to half-iterates.
- Structure:
  - Motivation: when the power-series method is local, when it fails globally, and why fixed-point classification matters.
  - Formal explanation of local analytic approaches near a fixed point.
  - Comparison of composita/truncated-series approximation, local conjugacy methods, and direct composition checking.
  - Discussion of failure modes, convergence radius limits, and branch/normalization choices.
  - Applications to example families already present on the site.
- Visuals:
  - Error/comparison plot from sampled approximations.
  - One optional lazy-loaded Manim animation or a fallback static figure if asset size becomes too large.

### 3. Upgrade the existing solver into a multi-mode interactive calculator

#### `/workspace/solver.html`

- Keep `solver.html` as the main calculator page rather than creating a second tool page.
- Rework the content and controls into two explicit modes:
  - `Composita / Paper Mode`
  - `Analytic Fixed-Point Mode`
- Update the page copy so it begins with motivation, then explains what the calculator can and cannot guarantee.
- Replace plain-text formula output with MathJax-renderable LaTeX blocks so computed formulas display cleanly.
- Add layout protections for long formulas and tables:
  - formula containers with horizontal scroll where needed,
  - wrapped control rows on narrow screens,
  - bounded table areas to avoid overfull boxes.
- Expand presets so the page includes representative cases from the existing site and the paper-backed workflows.
- Add result panels that clearly separate:
  - input function,
  - computed candidate `f(x)` or `A(x)`,
  - verification residuals,
  - method notes and local-validity warnings.
- Preserve the existing grapher/orbit features, but align them with the selected method and the computed solution.

### 4. Extend the computation engine for both paper-backed and analytic workflows

#### `/workspace/js/engine.js`

- Refactor the current solver logic into named, reusable methods instead of one page-specific half-iterate routine.
- Keep the current composita recurrence functions, but add a clearer API surface:
  - `solveHalfIterateSeries(...)` for the current `A(A(x)) = F(x)` coefficient problem,
  - `solveIteratePowerSeries(...)` for the broader `A^{2^m}(x) = F(x)` workflow requested from the paper,
  - `formatPolynomialLatex(...)` or equivalent formatting helpers for MathJax output,
  - sampling/verification helpers that both solver modes can reuse.
- Add analytic fixed-point helpers for the new calculator mode:
  - fixed-point detection from either entered coefficients or chosen examples,
  - fixed-point classification (`superattracting`, `attracting/repelling`, `parabolic/neutral`, `unsupported/global-only warning`),
  - local conjugacy-based approximation routines for the supported analytic cases.
- Decision for implementation:
  - Use local fixed-point methods only where a local analytic construction is mathematically well-posed and numerically stable.
  - Expose unsupported or ambiguous cases as explanatory warnings rather than fabricating a global closed form.
- Add direct verification helpers that numerically compose the returned candidate with itself and compare against the target on a sampled interval or neighborhood.

### 5. Support hybrid visuals without making the site heavy

#### `/workspace/css/main.css`

- Add styles for:
  - article metadata/excerpts on the blog page,
  - formula display blocks with overflow protection,
  - lightweight diagram wrappers,
  - method badges or notices on the solver page,
  - responsive tables and horizontally scrollable math/result areas.
- Ensure article pages, solver panels, and visuals remain readable on small screens.

#### `/workspace/resources/manim_half_iterates.py`

- Add one Manim source file that can generate the strongest explanatory animation used across the articles, likely a fixed-point/cobweb or conjugacy visualization.
- Keep the source in `resources/` so the repo stays consistent with the existing research/support material layout.

#### `/workspace/resources/visuals/`

- Add the rendered asset(s) used by the articles, with an explicit lightweight rule during implementation:
  - default to inline diagrams first,
  - include at most one or two lazily loaded rendered animation assets,
  - avoid autoplay-heavy or large bundles that slow initial page load.

### 6. Expand references and site entry points

#### `/workspace/bibliography.html`

- Add a new subsection for fractional iteration / local analytic theory that complements the current composita references.
- Keep the Kruchinin papers as the primary references for the solver’s composita mode.
- Add references used to justify the analytic-mode exposition around fixed-point linearization and fractional iteration.
- Link these references from the new article pages so the articles clearly “refer to the bibliography materials,” per the user request.

#### `/workspace/resources/bibliography.md`

- Mirror the added bibliography entries in the markdown bibliography source so the repo’s reference notes stay in sync with `bibliography.html`.

#### `/workspace/index.html`

- Update the existing solver and blog card copy so they describe the expanded calculator and the now-complete article section.
- Do not add a framework, router, or new landing-page paradigm; keep the same lightweight card-grid homepage.

#### `/workspace/README.md`

- Update the page list and descriptions to include the three new article pages and the upgraded multi-mode solver behavior.

## Assumptions & Decisions

- The repo todo to complete is the three placeholder blog entries in `blog.html`, plus the directly related page cleanup required to make that area production-ready.
- The site remains a static HTML/CSS/JS project with no package manager, no build step, and no frontend framework added.
- The implementation should favor lightweight native browser primitives already used in the repo: MathJax, canvas, simple tables, and static pages.
- The solver upgrade must be interactive and must render formulas cleanly with MathJax.
- “Meet all cases mentioned in the paper” is implemented as follows:
  - the calculator will explicitly support the paper-backed composita/`A^{2^m}` workflow in the series mode,
  - the analytic generalization request is addressed by a separate local fixed-point mode with clear scope limits and warnings where only local theory applies.
- The analytic half-iterate generalization is a local analytic tool, not a promise of a global closed-form solution for every analytic `F`.
- Visuals will use a hybrid policy:
  - default to inline lightweight diagrams,
  - include at most one or two optional rendered animation assets produced from a checked-in Manim source file,
  - lazy-load the heavier asset(s) behind article interaction so the site stays fast.
- New article pages follow the user’s requested narrative order:
  - motivation,
  - formal definitions and theory,
  - worked solution,
  - applications,
  - references back to the bibliography.

## Verification Steps

### Content and navigation

- Confirm `blog.html` has no remaining placeholders, no duplicate comments section, and working links to all three article pages.
- Confirm each new article page has working navigation links, bibliography references, and a comments block consistent with the rest of the site.
- Confirm `index.html` and `README.md` reflect the new articles and updated solver accurately.

### Math rendering and layout

- Verify all new displayed formulas re-render through MathJax after solver interactions.
- Check that long formulas, tables, and result blocks do not overflow on both desktop-width and narrow mobile-width layouts.
- Check that article diagrams and any Manim-backed media load without blocking the initial page render.

### Solver correctness

- For composita mode, verify representative examples by recomposing the computed candidate and checking coefficient residuals.
- Add paper-backed examples that exercise the broader `A^{2^m}` workflow and ensure the UI exposes their assumptions clearly.
- For analytic fixed-point mode, verify:
  - fixed-point classification is correct,
  - local approximations satisfy `f(f(x)) ≈ F(x)` numerically near the chosen fixed point,
  - unsupported cases fail gracefully with explanatory warnings instead of invalid output.

### Lightweight behavior

- Ensure the final site still works as plain static files with no new runtime dependencies beyond the existing CDN-loaded libraries.
- Keep animation/media assets small and lazy-loaded so the homepage, blog index, and solver remain responsive.
