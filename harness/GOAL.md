# GOAL — SolveIterativeFunctions pilot (engineering mode)

**Statement:** Finish generalizing the half-iterate solver so the target F can be any combination of elementary functions, end to end (engine + UI).

**Mode hint:** engineering

## Success criteria
- `js/engine.js` exposes the *FromLocal* refactor — `classifyFromLocal`, `solveSchroederFromLocal`, `solveParabolicFromLocal`, `solveHalfIterateAtFixedPointLocal`, `findFixedPointsNumeric` — with the orphaned `classifyFixedPointLegacy` removed and all new functions exported.
- Node tests reproduce: `x^2 - x + 1`@1 parabolic (~2.4e-14), `x^2 - 2`@2 Schröder, `exp(x) - 1`@0 parabolic transcendental, and series for `sin(x)` / `exp(x) - 1`.
- `solver.html` replaces the coefficient grid with a text `#expr-input` (live KaTeX preview + parse-error display) wired to `Expr` (`js/expr.js`) for both series and analytic modes; presets become expression strings; grapher/orbit use the numeric `targetFn`.
- `npm run lint` clean; Playwright UI smoke passes.

## Constraints
- Exact `Rational` (BigInt) arithmetic in the symbolic/coefficient paths — **no floats** there.
- Match the existing vanilla-JS style in `engine.js`; no new runtime dependencies; KaTeX (not MathJax).
- This is the autonomous backlog for the auto-dev pilot — see `TODO.md` for the decomposed items.
