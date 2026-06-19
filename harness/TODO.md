# TODO seed (pilot backlog — scout refines this into state/backlog.jsonl)

- **[T-engine-fromlocal]** Refactor `engine.js`: add the *FromLocal* variants + `classifyFromLocal` + `findFixedPointsNumeric`; remove the orphaned `classifyFixedPointLegacy`. _(value 3, near dep-free, feasible — the pattern already exists in the file)_
- **[T-engine-export]** Export the new functions + add Node tests for `x^2-x+1`@1, `x^2-2`@2, `exp(x)-1`@0, `sin(x)`, `exp(x)-1`. _(depends: T-engine-fromlocal)_
- **[T-solver-input]** Replace the coef-grid with `#expr-input` + live KaTeX preview + parse-error display; wire series & analytic modes to `Expr`. _(depends: T-engine-export)_
- **[T-solver-presets]** Update presets to expression strings; grapher/orbit/fixed-points use `solverState.targetFn`. _(depends: T-solver-input)_
- **[T-verify]** `npm run lint` + Playwright UI smoke. _(depends: T-solver-presets)_

> Dependency chain is mostly linear, so expect a thin frontier (one or two T0 items unblocked at a time) — a good stress test for the automatic re-plan (plan §8).
