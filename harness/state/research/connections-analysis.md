# Connections of Iteration Theory to Analysis

How iterative functional equations — Schröder, Böttcher, Abel, and the conjugacy equation — become the organizing language of complex dynamics, smooth dynamical systems, continuous iteration, tetration, and operator theory. The unifying object throughout is the **conjugacy equation** $\psi\circ f = g\circ\psi$: solving an iterative functional equation = finding coordinates in which $f$ becomes a simple normal form $g$.

## The four canonical local functional equations

For a holomorphic germ $f$ fixing $0$ with multiplier $\lambda=f'(0)$, the local model is dictated by $\lambda$, and each model is encoded by one functional equation:

- **Schröder equation** (attracting/repelling, $0<|\lambda|\neq 1$): $\;\psi\circ f = \lambda\,\psi,\;$ with $\psi(0)=0,\ \psi'(0)\neq0$. Conjugates $f$ to the linear map $z\mapsto\lambda z$.
- **Böttcher equation** (superattracting, $f(z)=a z^{n}+\cdots$, $n\ge2$): $\;\varphi\circ f = (\varphi)^{n}.$ Conjugates $f$ to $z\mapsto z^{n}$. Its logarithm is a Schröder equation.
- **Abel equation** (parabolic, $\lambda$ a root of unity, and used for $\exp$): $\;\alpha\circ f = \alpha + 1.$ Conjugates $f$ to the translation $w\mapsto w+1$ (a Fatou coordinate).
- **Conjugacy / linearization equation** (neutral $|\lambda|=1$, irrational): $\;\psi\circ f=\lambda\psi$ again, but now solvability is an arithmetic (small-divisor) question.

These equations originate with **Niels Henrik Abel** (functional equation, 1826) and **Ernst Schröder**, "Ueber iterirte Functionen," *Math. Ann.* **3** (1871), 296–322.

## Complex / holomorphic dynamics

**Fatou and Julia sets.** For a rational map of the Riemann sphere, the **Fatou set** is the largest open set on which the family of iterates $\{f^{\circ n}\}$ is a **normal family**; the **Julia set** is its complement. Normality is governed by **Montel's theorem** (a family omitting three values is normal) and, via Arzelà–Ascoli, is equivalent to equicontinuity in the spherical metric. Reference: J. Milnor, *Dynamics in one complex variable* (arXiv:math/9201272).

**Koenigs (attracting/repelling).** Gabriel Koenigs, "Recherches sur les intégrales de certaines équations fonctionnelles," *Ann. Sci. ÉNS* (1884): if $0<|\lambda|<1$ or $|\lambda|>1$, the Schröder equation $\psi\circ f=\lambda\psi$ has a unique holomorphic solution with $\psi'(0)=1$. The eigenvalues of the associated composition operator are $\{\lambda^{k}\}_{k\ge0}$.

**Böttcher (superattracting).** Sketched by **Lucjan Emil Böttcher (1904)**; first complete proof by **Joseph Ritt (1920)**. Gives the Böttcher coordinate conjugating $f$ to $z^{n}$, unique up to an $(n-1)$th root of unity.

**Parabolic — Fatou coordinate / Abel.** When $\lambda$ is a root of unity (tangent-to-identity case), the **Leau–Fatou flower theorem** gives $n$ attracting and $n$ repelling petals. On each attracting petal there is a Fatou coordinate $\chi$ with $\chi\circ f(z)=\chi(z)+1$ (the Abel equation), conjugating $f$ to $w\mapsto w+1$. Survey: M. Abate, *Fatou flowers and parabolic curves*.

**Irrationally neutral — Siegel/Cremer, small divisors.** With $\lambda=e^{2\pi i\alpha}$, $\alpha$ irrational, the Schröder/linearization equation produces small divisors $\lambda^{n}-1$. Key chronology:
- **E. Kasner (1912)** conjectured linearization always holds; **G. A. Pfeiffer (1917)** gave the first non-linearizable example.
- **H. Cremer (1927, 1938)**: if $\limsup_n |\lambda^{n}-1|^{-1/n}=\infty$ (an arithmetic genericity condition), $f$ need not be linearizable; a non-linearizable irrationally indifferent fixed point is a **Cremer point**.
- **C. L. Siegel (1942)**: a **Diophantine** $\alpha$ forces linearizability (a **Siegel disk** — a domain on which $f$ is conjugate to rotation by $\lambda$).
- **A. D. Brjuno** sharpened the condition; **J.-C. Yoccoz (1988, 1995, "Théorème de Siegel, nombres de Bruno et polynômes quadratiques," *Astérisque* 231)** proved the **Brjuno condition** is *necessary and sufficient* for quadratic polynomials.

**Brjuno number.** With convergents $p_n/q_n$ of $\alpha$, $\alpha$ is Brjuno iff
$$B(\alpha)=\sum_{n\ge0}\frac{\log q_{n+1}}{q_n}<\infty.$$
Almost every real is Brjuno; all Diophantine numbers are Brjuno.

## Dynamical systems and ergodic theory

- **Topological linearization:** the **Hartman–Grobman theorem** — a $C^1$ diffeomorphism is $C^0$-conjugate (topologically) to its linear part $Df(0)$ near a hyperbolic fixed point.
- **Smooth linearization — Sternberg.** S. Sternberg (1950s): a $C^k$ germ is $C^r$-conjugate to its linear part provided the eigenvalues satisfy **non-resonance** $\lambda_j\neq\prod_i\lambda_i^{m_i}$ with $\sum m_i\ge2$ (Poincaré domain version). The conjugacy solves $\psi\circ f=Df(0)\,\psi$.
- **Poincaré–Dulac normal form.** Without non-resonance, one can only remove non-resonant terms; the formal normal form keeps **resonant monomials**. Analytic convergence in the Siegel domain requires a small-divisor (Brjuno/Siegel) hypothesis.
- **KAM theory.** Kolmogorov–Arnold–Moser: invariant tori with Diophantine frequency survive small perturbations; the homological equation has small divisors $\langle k,\omega\rangle$, the multidimensional analogue of $\lambda^n-1$.
- **Renormalization.** Feigenbaum universality (period doubling) and the renormalization of critical circle maps (Yoccoz, the Yoccoz puzzle) treat these as fixed points of a renormalization operator; "renormalization turns small divisors into large divisors."

## Continuous / fractional iteration, flows, generators

**The embedding problem.** Given $f$, find a one-parameter family $f^{t}$ (a flow) with $f^{1}=f$, $f^{s}\circ f^{t}=f^{s+t}$. Via an Abel function $\alpha$ (solving $\alpha\circ f=\alpha+1$):
$$f^{t}(z)=\alpha^{-1}\!\big(\alpha(z)+t\big),$$
which automatically satisfies the iteration-semigroup law. Equivalently via a Schröder function $\psi$: $f^{t}=\psi^{-1}(\lambda^{t}\psi)$.

**Regular iteration — Szekeres.** G. Szekeres, "Regular iteration of real and complex functions," *Acta Math.* **100** (1958), 203–258, and "Fractional iteration of exponentially growing functions," *J. Austral. Math. Soc.* (1962): constructs the principal/regular iterate and the **infinitesimal generator**.

**Infinitesimal generator / vector field (Lie viewpoint).** A continuous iteration semigroup $\{f^t\}$ is the flow of an autonomous ODE
$$\frac{\partial f^{t}(z)}{\partial t}=G\big(f^{t}(z)\big),\qquad G(z)=\left.\frac{\partial f^{t}(z)}{\partial t}\right|_{t=0},$$
with $G$ the holomorphic vector field (Lie infinitesimal generator). On the unit disk, **Berkson–Porta (1978)** characterize generators: $G(\xi)=(\xi-b)(\bar b\xi-1)\,p(\xi)$, $\mathrm{Re}\,p\ge0$ — necessary and sufficient for $G$ to generate a semigroup of holomorphic self-maps.

**Erdős–Jabotinsky / Zdun.** E. Jabotinsky, "Analytic iteration" (1963), and the Aczél–Jabotinsky functional-differential equation link the generator to the iterates. M. C. Zdun, *Continuous and Differentiable Iteration Semigroups*, develops embeddability criteria for one-dimensional diffeomorphisms into differentiable flows.

## Special functions, tetration, hyperoperations

- **Half-exponential / functional square root.** A half-exponential $f$ solves $f(f(x))=e^{x}$ (more generally $=ab^x$). It is provably **not** expressible by elementary operations (no Hardy $L$-function is half-exponential), so it is an inherently iteration-theoretic object.
- **Super-exponential / tetration.** $F$ is super-exponential to base $b$ if $F(z+1)=b^{F(z)}$ (a superfunction of $x\mapsto b^x$); tetration adds $F(0)=1$. Its inverse, the **super-logarithm**, is an **Abel function of $\exp$**: $A(b^{z})=A(z)+1$.
- **Kneser's real-analytic tetration.** Hellmuth Kneser (1950) constructed a real-analytic solution of $f(f(x))=e^x$ by building a real-analytic Abel function of $\exp$, exploiting the complex fixed points of $\exp$ and a Schröder/Riemann-mapping argument.
- **Uniqueness.** H. Trappmann & D. Kouznetsov, "Uniqueness of holomorphic Abel functions at a complex fixed point pair," *Aequationes Math.* **81** (2011), 65–76 (arXiv:1006.3981): a holomorphic-uniqueness criterion that Kneser's Abel function satisfies, addressing the conjecture that Kneser's tetration is the canonical one. Related survey: Trappmann–Kouznetsov, "5+ methods for real analytic tetration."

## Operator theory

- **Composition operator.** $C_\varphi f = f\circ\varphi$ on a space of analytic functions (Cowen–MacCluer, *Composition Operators on Spaces of Analytic Functions*; Shapiro). The **Königs eigenfunction** $\sigma$ is the Schröder solution: $\sigma\circ\varphi=\varphi'(a)\,\sigma$ — i.e. an eigenvector of $C_\varphi$ with eigenvalue $\varphi'(a)$. Koenigs' theorem gives the eigenvalue ladder $\{\varphi'(a)^k\}$. Cowen–MacCluer: the spectrum of a univalently-induced $C_\varphi$ on $H^2$ is the union of the Koenigs eigenvalues with a closed disk centered at $0$.
- **Koopman and transfer (Perron–Frobenius) operators.** The Koopman operator is the composition operator $U_f g=g\circ f$ acting on observables; the **transfer/Perron–Frobenius operator** is its adjoint, propagating densities. Eigenfunctions of the Koopman operator are exactly semiconjugacies $\lambda\circ f=\mu\,\lambda$ — the Schröder equation again — linking spectral (Koopman mode) analysis to linearization.

## Sources

- https://en.wikipedia.org/wiki/Schr%C3%B6der%27s_equation — Schröder equation $\psi\circ f=\lambda\psi$, Koenigs 1884.
- https://grokipedia.com/page/Schr%C3%B6der's_equation — Koenigs 1884 memoir; Abel 1826; Schröder 1870/1871 history.
- http://www.scholarpedia.org/article/Siegel_disks/Linearization — Siegel/Cremer/Brjuno/Yoccoz, Pfeiffer 1917, Kasner 1912.
- https://handwiki.org/wiki/B%C3%B6ttcher%27s_equation — Böttcher equation $F\circ h=F^n$; Böttcher 1904, Ritt 1920.
- https://arxiv.org/pdf/1307.7778 — Böttcher biography and history of his equation.
- https://arxiv.org/pdf/math/9201272 — Milnor, *Dynamics in one complex variable* (Fatou/Julia, normal families).
- https://en.wikibooks.org/wiki/Fractals/Iterations_in_the_complex_plane/Fatou_coordinate — Fatou coordinate / Abel equation $\chi\circ f=\chi+1$.
- https://pagine.dm.unipi.it/abate/articoli/artric/files/AbateParabolicCurvesSurvey.pdf — Abate, parabolic dynamics, Leau–Fatou flower.
- https://arxiv.org/pdf/math/0009232 — Marmi, *Introduction to small divisors*; Brjuno condition.
- https://arxiv.org/pdf/2111.13553 — Brjuno function $B(\alpha)=\sum \log q_{n+1}/q_n$.
- http://www.numdam.org/item/?id=AST_1995__231__1_0 — Yoccoz, *Astérisque* 231 (1995), Brjuno necessity.
- https://link.springer.com/article/10.1007/BF02559539 — Szekeres, *Acta Math.* 100 (1958), regular iteration / infinitesimal generator.
- https://www.cambridge.org/core/services/aop-cambridge-core/content/view/S1446788700026902 — Szekeres, fractional iteration of exponentially growing functions.
- http://eretrandre.org/rb/files/Jabotinsky1963_152.pdf — Jabotinsky, *Analytic Iteration* (1963).
- https://link.springer.com/article/BF02925242 — Zdun et al., iteration theory and functional equations / iteration semigroups.
- https://pagine.dm.unipi.it/abate/libri/libriric/files/IterationThTautMan1-4.pdf — Berkson–Porta generator formula, ODE $\dot{\varphi_t}=G(\varphi_t)$.
- https://en.wikipedia.org/wiki/Half-exponential_function — half-exponential, non-elementary.
- https://en.wikipedia.org/wiki/Functional_square_root — $f(f(x))=e^x$, Kneser 1950, Abel equation construction.
- https://en.wikipedia.org/wiki/Hellmuth_Kneser — Kneser 1950 real-analytic half-iterate of exp.
- https://arxiv.org/pdf/1006.3981 — Trappmann–Kouznetsov, uniqueness of holomorphic Abel functions (*Aequationes Math.* 81, 2011).
- https://www.researchgate.net/profile/Dmitrii-Kouznetsov/publication/265066072_5_methods_for_real_analytic_tetration — "5+ methods for real analytic tetration."
- https://users.math.msu.edu/users/shapiro/Pubvit/Downloads/RieszExpo/rieszexpo.pdf — Shapiro, composition operators & Schröder equation; Königs eigenfunction.
- https://arxiv.org/pdf/1903.04990 — "In Koenigs' footsteps: Diagonalization of composition operators."
- https://en.wikipedia.org/wiki/Composition_operator — Koopman operator = composition operator; transfer/Perron–Frobenius adjoint.
- https://encyclopediaofmath.org/wiki/Local_normal_forms_for_dynamical_systems — Poincaré–Dulac normal form, resonances.
- https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Arnold%E2%80%93Moser_theorem — KAM, small divisors, invariant tori.
- https://www.sciencedirect.com/science/article/pii/0022039690900898 — Sternberg-type smooth linearization, non-resonance.
- https://eudml.org/doc/156489 — Schröder, "Ueber iterirte Functionen," *Math. Ann.* 3 (1871), 296–322.

## Uncertainties

- The precise non-resonance exponent $r$ in Sternberg's theorem (the $r$ as a function of $k$) was not stated exactly in results; only the qualitative statement is confirmed.
- Exact page numbers / volume for Koenigs (1884) in *Ann. Sci. ÉNS* not confirmed by the searches (the supplement/volume number is uncertain).
- Cremer's exact 1927 vs 1938 paper titles and journals were not individually retrieved (cited as [Cre27], [Cre38] in Scholarpedia).
- The exact DOI/volume of Zdun's *Continuous and Differentiable Iteration Semigroups* and of Jabotinsky (1963 journal placement) was not pinned down.
- Berkson–Porta exact citation (journal/volume of the 1978 paper) not directly retrieved, only attributed.
- Whether the Trappmann–Kouznetsov result is best titled "Uniqueness of holomorphic Abel functions at a complex fixed point pair" vs the separate manuscript "Uniqueness of holomorphic superlogarithms" — both appear; the published *Aequationes Math.* 81 (2011) 65–76 version is the Abel-functions title.
