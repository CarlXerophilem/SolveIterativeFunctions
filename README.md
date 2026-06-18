# Solve Iterative Functions

An interactive exploration of iterative functional equations — functional square roots, the Composita method, fixed-point linearization, and the mathematical structure of equations like \(f(f(x)) = F(x)\).

**Live site:** [carlxerophilem.github.io/SolveIterativeFunctions](https://carlxerophilem.github.io/SolveIterativeFunctions/)

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Navigation hub — overview of all sections |
| `theory.html` | Fixed points, conjugacy, solvable vs. unsolvable cases |
| `solver.html` | Multi-mode solver for \(f(f(x)) = F(x)\): composita / paper mode and local analytic fixed-point mode |
| `composita.html` | Composita \(F^\Delta(n,k)\) calculator based on Kruchinin (2013) |
| `bibliography.html` | References, papers, external resources, and credits |
| `blog.html` | Notes index linking to the finished article pages |
| `post-fixed-points-functional-iteration.html` | Motivation, fixed points, local multipliers, and solvability |
| `post-composita-half-iterates.html` | Formal derivation of the composita recurrence for iterative roots |
| `post-numerical-half-iterate-methods.html` | Comparison of series, conjugacy, and verification workflows |

## Mathematics

The site now exposes two complementary computational viewpoints.

### 1. Composita / paper mode

The core series algorithm still implements the **Composita recurrence** from:

> V.V. Kruchinin & D.V. Kruchinin, *"Composita and its Properties"* (arXiv:1103.2582)

Given a generating function \(F(x) = \sum_{n>0} f(n)x^n\), the composita \(F^\Delta(n,k)\) satisfies:
\[
F^\Delta(n,k) = [x^n] F(x)^k
\]
with the recurrence \(F^\Delta(n,k) = f(n)\) for \(k=1\), and
\[
F^\Delta(n,k) = \sum_{i=1}^{n-k+1} f(i) F^\Delta(n-i, k-1)
\]
for \(k \leq n\).

The upgraded solver also uses the iterative-equation paper

> D.V. Kruchinin & V.V. Kruchinin, *"Method for solving an iterative functional equation \(A^{2^n}(x)=F(x)\)"* (arXiv:1302.1986)

for repeated square-root extraction in the series setting.

### 2. Analytic fixed-point mode

The new local analytic mode studies \(f(f(x)) = F(x)\) near a real fixed point \(x_0\). When \(F'(x_0)\) is positive and non-parabolic, the solver uses a truncated Schr\u00f6der-coordinate construction to produce a local half-iterate and then verifies it numerically.

## License

[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

## Credits

- **CarlXerophilem** — site design and implementation
- **V.V. Kruchinin & D.V. Kruchinin** — composita framework and iterative-equation method
- **Gabriel Koenigs, Hellmuth Kneser, Marek Kuczma and collaborators** — local and global theory of fractional iteration
- **Lars Regl\u00f8s** — [ffx.html](https://reglos.de/lars/ffx.html) interactive visualization
- Page format adapted from [complex-analysis.com](https://complex-analysis.com/) by Juan Carlos Ponce Campuzano
