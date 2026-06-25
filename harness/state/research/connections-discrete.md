# Iterative Functional Equations: Connections to Algebraic, Discrete and Applied Fields

Iterative functional equations — Schröder $\sigma(f(z)) = s\,\sigma(z)$, Abel $\alpha(f(z)) = \alpha(z)+1$, Böttcher, and the iteration problem $f^{\circ t}$ — are not isolated curiosities. They are the same structures that organize composition of generating functions, formal group laws, branching probability, renormalization in physics, and root-finding numerics. Below, each field is tied to its **precise** functional-equation / iteration link.

## 1. Combinatorics & Formal Power Series

**Composition and Bell matrices.** Composing formal power series $f\circ g$ is governed by the **partial (incomplete) exponential Bell polynomials** $B_{n,k}$,
$$B_{n,k}(x_1,\dots,x_{n-k+1}) = \sum \frac{n!}{m_1!\cdots m_{n-k+1}!}\prod_{j}\Big(\frac{x_j}{j!}\Big)^{m_j},\quad \sum m_j = k,\ \sum j\,m_j = n,$$
via **Faà di Bruno's formula**
$$\frac{d^n}{dx^n} f(g(x)) = \sum_{k=0}^{n} f^{(k)}(g(x))\, B_{n,k}\big(g'(x),g''(x),\dots,g^{(n-k+1)}(x)\big).$$

**Iteration / Bell / Jabotinsky matrices.** To a series $f$ with $f(0)=0$ one associates the infinite lower-triangular **iteration matrix** $B(f)$ with entries built from Bell polynomials. Its defining property is that composition becomes matrix product:
$$B(f\circ g) = B(g)\,B(f).$$
In Riordan-group language $B(f)$ is the Riordan array $(1, f)$, so this is the Fundamental Theorem of Riordan Arrays; the matrices $(g(x), x\,g(x))$ form the **Bell subgroup**. Comtet's *Advanced Combinatorics* popularized these as "iteration matrices"; Knuth calls them convolution matrices. Computing $f^{\circ t}$ reduces to the $t$-th power of the matrix. The **iterative logarithm** $\operatorname{itlog}(f) := \frac{d}{ds}f^{\circ s}\big|_{s=0}$ is the additive (composition-)logarithm; its expansion's first terms are due to Korkine, the case $f'(0)=1$ to **Jabotinsky**, and convergence of $\operatorname{itlog}(f)$ is equivalent to embeddability of $f$ in a flow. An Erdős–Jabotinsky + Baker–Szekeres result shows the only meromorphic $f$ for which it converges near $0$ are $f(z)=z/(1-cz)$, with $\operatorname{itlog}(f)(z)=cz^2$.

**Carleman matrices and fractional iteration.** The Carleman matrix $M(f)$ (also called an iteration matrix, per Knuth) linearizes composition; continuous/fractional iterates come from non-integer matrix powers $M^t(f) = U^{-1}\Lambda^t U$ via diagonalization, $(\Lambda^t)_{jj}=\lambda_j^t$. This is equivalent to solving Schröder/Abel: $u(f(x))=\lambda u(x)$. Half-iterates (functional square roots) and fractional iterates up to e.g. $1/64$ are computed this way (Carleman/Bell-matrix and perturbative methods).

**Composita (Kruchinin).** For $F(x)=\sum_{n>0} f_n x^n$, V. V. Kruchinin's **composita** is
$$F^{\Delta}(n,k) = \sum_{\lambda_1+\dots+\lambda_k = n} f_{\lambda_1}\cdots f_{\lambda_k},\qquad F(x)^k = \sum_{n\ge k} F^{\Delta}(n,k)\,x^n,$$
i.e. coefficients of powers of $F$ indexed by integer compositions; compositae multiply nicely under composition of generating functions ("Composita and its properties", arXiv:1103.2582).

**Lagrange inversion (Lagrange–Bürmann).** Solves the compositional-inverse problem. For $F$ with $F(0)=0$, $F'(0)\ne0$ and inverse $G$, and any formal Laurent $\varphi$:
$$[x^n]\,\varphi(G(x)) = \tfrac1n\,[x^{n-1}]\,\varphi'(x)\Big(\tfrac{x}{F(x)}\Big)^{n}=[x^{-1}]\,\frac{\varphi(x)F'(x)}{F(x)^{n+1}}.$$
It gives coefficients of $f$ solving $f(x)=x\,G(f(x))$ — the backbone of enumerative combinatorics.

## 2. Formal Groups & Number Theory

A (1-dim) **formal group law** $F(X,Y)\in R[[X,Y]]$ satisfies $F(X,0)=X$, associativity $F(F(X,Y),Z)=F(X,F(Y,Z))$. Over a $\mathbb{Q}$-algebra there is a **logarithm** $\log_F$, the unique series with $\log_F(X)\equiv X \pmod{X^2}$ and $F(X,Y)=\exp_F(\log_F X + \log_F Y)$, linearizing the group law — a Schröder/Abel-type conjugation. **Lubin–Tate** (Lubin & Tate, 1965) singles out the unique $F$ over $\mathbb{Z}_p$ for which $e(X)=pX+X^p$ is an endomorphism; then $[a]_F(X)=\exp_F(a\log_F X)$. **p-adic dynamics:** Lubin (*Non-Archimedean dynamical systems*, 1994) studied families of power series in $T\,\mathcal{O}_K[[T]]$ commuting under composition (analytic maps of the $p$-adic open unit disk) and conjectured that a noninvertible series commuting with an invertible one forces a formal group "in the background" whose endomorphisms they are. The **height-one** case over $\mathbb{Z}_p$ is now proved (Berger; Specter — crystalline-period methods in $p$-adic Hodge theory). The iterative structure (iterates' roots, $f'(0)$ a uniformizer) is exactly an iteration-theory condition.

## 3. Probability & Branching Processes

**Galton–Watson.** With offspring PGF $f(s)=\sum_k p_k s^k$, the $n$-th generation PGF is the $n$-fold composition $f_n = f^{\circ n}$. **Extinction probability** $q$ is the smallest fixed point of $f$ in $[0,1]$:
$$q = f(q),\qquad q=\lim_{n\to\infty} f^{\circ n}(0),$$
and $\lim_n f^{\circ n}(t)=q$ for $t\in[0,1)$. Criticality: $q=1 \iff m=f'(1)\le 1$; $q<1$ for $m>1$. This is iteration theory of a self-map of $[0,1]$ with the linearizing role played by Schröder/Koenigs.

**Koenigs function for PGFs (Goryainov).** V. V. Goryainov, "Koenigs function and fractional iterates of probability generating functions," *Sb. Math.* **193**:7 (2002), 1009–1025 (DOI 10.1070/SM2002V193N07ABEH000667), characterizes which PGFs are embeddable in a one-parameter (continuous) group of fractional iterates: the Koenigs function $\varphi$ (limit of normalized iterates, solving Schröder $\varphi(f(z))=f'(q)\,\varphi(z)$) must lie in a described class. This is a test for embedding a **Galton–Watson process into a homogeneous Markov branching process**.

**Karlin–McGregor / embedding.** S. Karlin and J. McGregor (*Trans. Amer. Math. Soc.* **132** (1968)): "Embedding iterates of analytic functions with two fixed points into continuous semigroups" (pp. 137–145) and "Embeddability of discrete-time branching processes into continuous-time branching processes" (pp. 115–136). Embeddability is governed by solvability of **Abel** and **Schröder** functional equations.

**Continuous-state branching (CSBP) / Lamperti.** CSBPs are the continuous-time, continuous-state analogue (Jiřina 1958; Lamperti). Their Laplace functionals satisfy a semigroup composition with branching mechanism $\Psi$ of Lévy–Khintchine type; the **Lamperti transformation** time-changes a spectrally positive Lévy process into a CSBP. This realizes the "fractional/continuous iterate" of the GW composition as a genuine flow (Athreya–Ney, *Branching Processes*, Springer 1972).

## 4. Physics & Renormalization

**Feigenbaum–Cvitanović.** Period-doubling universality is the fixed-point equation of the renormalization (doubling) operator $\mathcal{T}[g](x)=-\alpha\, g(g(-x/\alpha))$:
$$g(x) = -\alpha\, g\!\big(g(-x/\alpha)\big),\qquad g(0)=1,\ g'(0)=0,\ g''(0)<0,$$
equivalently $g(g(x/\alpha)) = -g(x)/\alpha$. The universal constants are $\alpha = 2.502907875\ldots$ and the bifurcation-rate constant $\delta = 4.669201609\ldots$. **Oscar Lanford** gave the first (computer-assisted) proof that an even analytic solution $g$ exists and is a hyperbolic fixed point with one-dimensional unstable manifold, explaining universality (Coullet–Tresser independently).

**RG as functional iteration (Curtright–Zachos–Jin).** T. L. Curtright & C. K. Zachos, "Renormalization Group Functional Equations," *Phys. Rev. D* **83** (2011) 065019 (arXiv:1010.5174): functional **conjugation** (Schröder/Abel) of step-scaling $\sigma$-functions produces continuous RG flows and exact relations for local $\beta$-functions; fixed points of $\sigma$ need not be true flow fixed points, and zeros of $\beta$ may be mere turning points. Related: Curtright, Jin, Zachos, "RG Flows, Cycles, and c-Theorem Folklore," *Phys. Rev. Lett.* **108** (2012) 131601, treating limit cycles via functional iteration.

## 5. Numerical Analysis & Computer Science

**Root-finding as iteration.** Newton's method is the fixed-point iteration $x_{n+1}=\varphi(x_n)$ with $\varphi(x)=x-f(x)/f'(x)$; the sought root is the fixed point $\varphi(x^\*)=x^\*$. Because $\varphi'(x^\*)=0$ at a simple root, convergence is **quadratic** (digits roughly double); a multiple root gives linear convergence. Steffensen's method (Aitken acceleration of a fixed-point iteration) restores quadratic order without derivatives. **Computing half-iterates / fractional iterates** numerically uses the same Carleman/Bell-matrix powers, Schröder/Abel solving, or Chebyshev-series fits (e.g. of the Feigenbaum function) — directly linking iteration-theory functional equations to constructive numerics (arXiv:2509.24049, "Analytical and Numerical Approaches for Finding Functional Iterates and Roots").

## Sources
- https://arxiv.org/pdf/1103.2582 — Kruchinin, "Composita and its properties"; definition of composita $F^\Delta(n,k)$ and $F^k$ expansion.
- https://www.academia.edu/19571162/Art_Composita_Kruchinin — Kruchinin composita exposition.
- https://en.wikipedia.org/wiki/Jabotinsky_matrix — Jabotinsky/iteration matrices, Comtet/Knuth naming, Bell-polynomial entries.
- https://arxiv.org/html/2409.09809 — Beauduin, "Explicit Expressions for Iterates of Power Series"; iterative logarithm $\operatorname{itlog}$, Korkine/Jabotinsky, Erdős.
- https://www.mat.univie.ac.at/~maschenbrenner/pdf/julia.pdf — Aschenbrenner, differential transcendence of iterative logarithms; itlog definition, embeddability.
- https://en.wikipedia.org/wiki/Bell_polynomials — partial Bell polynomials $B_{n,k}$ definition.
- https://en.wikipedia.org/wiki/Fa%C3%A0_di_Bruno's_formula — Faà di Bruno via Bell polynomials.
- https://en.wikipedia.org/wiki/Lagrange_inversion_theorem — Lagrange–Bürmann formula; coefficient of compositional inverse.
- https://en.wikipedia.org/wiki/Carleman_matrix — Carleman/iteration matrix, fractional iteration via matrix powers.
- https://arxiv.org/pdf/math-ph/0002044 — Carleman linearization, continuous iteration as $M^t$, link to $u(f(x))=\lambda u(x)$.
- https://arxiv.org/html/2509.24049v1 — numerical/analytical functional iterates and roots; half-iterates.
- https://arxiv.org/pdf/2105.07262 — Centralizers of the Riordan group; $B(f\circ g)=B(g)B(f)$, Riordan array $(1,f)$.
- https://en.wikipedia.org/wiki/Formal_group_law — formal group law, logarithm $\log_F$.
- https://en.wikipedia.org/wiki/Lubin%E2%80%93Tate_formal_group_law — Lubin–Tate (1965), $e(X)=pX+X^p$ endomorphism, $[a]_F=\exp_F(a\log_F)$.
- https://arxiv.org/pdf/1603.03631 — Berger, Lubin's conjecture for full $p$-adic dynamical systems; commuting series, formal group.
- https://math.jhu.edu/~jspecter/pAdicDynamics.pdf — Specter, crystalline period of height-one $p$-adic dynamical system.
- https://arxiv.org/pdf/1702.06037 — Nonarchimedean dynamical systems and formal groups (Lubin 1994 context).
- https://www.mathnet.ru/eng/sm667 — Goryainov, Sb. Math. 193:7 (2002) 1009–1025; Koenigs function & fractional iterates of PGFs.
- https://link.springer.com/article/10.1007/BF03321854 — Goryainov, fractional iteration & functional equations in the unit disk; Karlin–McGregor 1968 references.
- https://en.wikipedia.org/wiki/Schr%C3%B6der's_equation — Schröder's equation, Koenigs (1884) linearization, eigenvalue $s=h'(a)$.
- https://arxiv.org/pdf/1903.04990 — "In Koenigs' footsteps"; $\kappa=\lim \varphi_n/\lambda^n$.
- https://link.springer.com/chapter/10.1007/978-3-642-37632-0_12 — Continuous-state branching processes, Lamperti.
- https://arxiv.org/pdf/1901.03521 — CSBP / Lamperti representation; branching mechanism $\Psi$.
- https://en.wikipedia.org/wiki/Feigenbaum_function — Feigenbaum–Cvitanović equation $g(x)=-\alpha g(g(-x/\alpha))$, Lanford proof.
- https://en.wikipedia.org/wiki/Feigenbaum_constants — $\delta=4.6692016\ldots$, $\alpha=2.5029079\ldots$.
- https://arxiv.org/abs/1010.5174 — Curtright & Zachos, "Renormalization Group Functional Equations," PRD 83 (2011) 065019.
- https://link.aps.org/accepted/10.1103/PhysRevLett.108.131601 — Curtright, Jin, Zachos, RG flows/cycles/c-theorem, PRL 108 (2012) 131601.
- https://en.wikipedia.org/wiki/Newton's_method — Newton as fixed-point iteration, quadratic convergence.
- https://en.wikipedia.org/wiki/Fixed-point_iteration — $x_{n+1}=\varphi(x_n)$, convergence order, Steffensen/Aitken.
- https://arxiv.org/pdf/hep-ph/0008162 — Branching processes and Koenigs function (physics application).

## Uncertainties
- The exact normalization/sign convention of the Feigenbaum–Cvitanović equation varies by source: Wikipedia gives $g(x)=-\alpha g(g(-x/\alpha))$ with $g(0)=1$; the prompt's $g(g(x/\alpha))=-g(x)/\alpha$ is an algebraically equivalent rearrangement. I did not independently re-derive equivalence of all sign conventions.
- Karlin–McGregor 1968 TAMS page ranges (137–145 and 115–136) come from a secondary citation (Springer/Goryainov reference list), not the primary article pages; treat page numbers as likely-correct but secondhand.
- Goryainov DOI 10.1070/SM2002V193N07ABEH000667 was reported by a search summary, not directly verified on the publisher page.
- The precise first-order coefficients attributed to "Korkine" for the iterative logarithm rest on the Beauduin/Aschenbrenner accounts; original Korkine reference not located.
- Lamperti's original publication year/citation for the GW→CSBP scaling-limit result was not pinned to an exact title/year in these searches (Jiřina 1958 for introduction of CSBPs is stated by the source).
- Curtright–Zachos "RG Functional Equations": arXiv:1010.5174 vs. arXiv:1105.3664 both appeared; 1010.5174 is the one mapped by the search to PRD 83 (2011) 065019. I did not disambiguate whether 1105.3664 is a distinct companion paper.
