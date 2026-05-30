# Solve Iterative Functions

An interactive exploration of iterative functional equations — functional square roots, the Composita method, and the mathematical structure of equations like \(f(f(x)) = F(x)\).

**Live site:** [carlxerophilem.github.io/SolveIterativeFunctions](https://carlxerophilem.github.io/SolveIterativeFunctions/)

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Navigation hub — overview of all sections |
| `theory.html` | Fixed points, conjugacy, solvable vs. unsolvable cases |
| `solver.html` | Interactive solver for \(A(A(x)) = F(x)\) with function grapher |
| `composita.html` | Composita \(F^\Delta(n,k)\) calculator based on Kruchinin (2013) |
| `bibliography.html` | References, papers, external resources, and credits |
| `blog.html` | Blog notes and explorations |

## Mathematics

The core algorithm implements the **Composita recurrence** from:

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

## License

[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

## Credits

- **CarlXerophilem** — site design and implementation
- **V.V. Kruchinin & D.V. Kruchinin** — composita framework
- **Lars Regløs** — [ffx.html](https://reglos.de/lars/ffx.html) interactive visualization
- Page format adapted from [complex-analysis.com](https://complex-analysis.com/) by Juan Carlos Ponce Campuzano
