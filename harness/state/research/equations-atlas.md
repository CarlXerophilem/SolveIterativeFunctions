# Atlas of the Canonical Named Functional Equations of Iteration Theory

A precise catalog of the one-variable functional equations that govern iteration, continuous/fractional iteration, and local conjugacy near fixed points. Throughout, $F$ (or $h$, $f$) denotes a given map fixing a point $x^*$ with **multiplier** $\lambda = F'(x^*)$; the three classical linearization equations (Schröder, Böttcher, Abel) correspond to the multiplier regimes $|\lambda|\notin\{0,1\}$, $\lambda=0$, and $\lambda=1$ respectively. Conjugacy invariance of $\lambda$ under analytic change of coordinate is the organizing principle (Milnor, *Dynamics in one complex variable*).

## Fixed-point classification by multiplier $\lambda = F'(x^*)$

- **Attracting/repelling (hyperbolic):** $0<|\lambda|<1$ (attracting) or $|\lambda|>1$ (repelling) → **Schröder / Koenigs linearization**.
- **Superattracting:** $\lambda=0$, with local degree $n\ge 2$ → **Böttcher**.
- **Parabolic / rationally indifferent:** $\lambda$ a root of unity (canonically $\lambda=1$) → **Abel equation / Fatou coordinates / Leau–Fatou**.
- **Irrationally indifferent:** $|\lambda|=1$, $\lambda$ not a root of unity → Siegel (linearizable) vs. Cremer (non-linearizable) dichotomy; outside the classical Schröder/Abel/Böttcher trio.
(Source: Milnor arXiv:math/9201272; Scholarpedia *Siegel disks/Linearization*.)

## (1) Babbage's equation $F^{n}=\mathrm{id}$

$$F^{\circ n}(x)=x,\qquad F^{\circ n}=\underbrace{F\circ\cdots\circ F}_{n}.$$
Solutions are the **periodic (cyclic) functions of period dividing $n$**, i.e. the $n$-th **iterative roots of the identity**; for $n=2$ they are **involutions** ($F\circ F=\mathrm{id}$). Named for **Charles Babbage** (1791–1871), from his *Examples of the Solutions of Functional Equations* (Cambridge, 1820) and the earlier *Essay towards the Calculus of Functions* (Phil. Trans., 1815–1816). Classical fact: all solutions of $F^{n}=\mathrm{id}$ on $\mathbb{R},\mathbb{R}^2,S^1,S^2$ are linearizable (topologically conjugate to a linear map). A generalization is $F^{n}=F^{k}$ ($n>k$).

## (2) Iterative-root equation $F^{n}=G$ (functional $n$-th roots; half-iterate)

$$\underbrace{F\circ\cdots\circ F}_{n}=G.$$
A solution $F$ is an **iterative ($n$-th) root** of the given $G$; for $n=2$, $F$ is the **functional square root / half-iterate** of $G$ ($F(F(x))=G(x)$). For strictly monotone continuous self-maps of an interval, **M. Kuczma (1961)** gave a complete description of continuous iterative roots; the iterative-root problem is equivalent to a conjugacy problem (observed by **Bödewadt, 1944**). The canonical hard case is the **half-iterate of $\exp$**: $F(F(x))=e^x$; **Hellmuth Kneser (1950)** constructed a real-analytic half-iterate of $e^x$ via complex methods. No elementary closed form exists; the problem reduces to solving Abel's equation for $\exp$.

## (3) Abel's equation $\alpha(F(x))=\alpha(x)+1$ (parabolic, $\lambda=1$; flows)

$$\alpha\!\left(F(x)\right)=\alpha(x)+1.$$
Named for **N. H. Abel**. $\alpha$ is an **Abel function**; if $\alpha$ is bijective, it defines continuous iterates $F^{[t]}(x)=\alpha^{-1}\!\big(t+\alpha(x)\big)$, embedding $F$ in a flow. It is the additive normal form for the **parabolic** case $\lambda=1$. Analytic solutions are the **Fatou coordinates**; by the **Leau–Fatou flower theorem** a sectorial Fatou coordinate satisfies $\psi\circ F=\psi+1$ on each attracting/repelling petal (for a degenerate parabolic of multiplicity $p$, $\Phi\circ F=\Phi+1/p$). **Non-uniqueness:** near a fixed point there are infinitely many continuous (even smooth) solutions; analytic uniqueness is only sectorial. Relation to Schröder: the substitution $\alpha(x)=\log\Psi(x)/\log s$ (equivalently $\Psi=s^{\alpha}$) turns Schröder's equation into Abel's, so Abel = "Schröder at $s\to 1$ / logarithmic coordinate." (Source: Wikipedia *Abel equation*, *Schröder's equation*; arXiv:1710.01268.)

## (4) Schröder's equation $\sigma(F(x))=s\,\sigma(x)$, $s=F'(x^*)$ (hyperbolic; Koenigs)

$$\sigma\!\left(F(x)\right)=s\,\sigma(x),\qquad s=\lambda=F'(x^*).$$
Introduced by **Ernst Schröder**, *Ueber iterirte Functionen*, *Mathematische Annalen* **3** (1870), 296–322 (DOI 10.1007/BF01443992). $\sigma$ **linearizes** $F$ near a hyperbolic fixed point: in the coordinate $y=\sigma(x)$ the dynamics become $y\mapsto s\,y$, so $x_{n+1}=F(x_n)$ becomes $y_{n+1}=s\,y_n$. **Koenigs' theorem (Gabriel Koenigs, 1884**, *Recherches sur les intégrales de certaines équations fonctionnelles*, Ann. Sci. ÉNS (3) **1**, suppl. 1–41): if $F$ is holomorphic, $F(0)=0$, $0<|s|<1$, there is a **unique** holomorphic $\sigma$ with $\sigma(0)=0,\ \sigma'(0)=1$ solving $\sigma\circ F=s\,\sigma$ (the **Koenigs function**), given by $\sigma(z)=\lim_{n\to\infty} F^{\circ n}(z)/s^{n}$. Covers attracting ($0<|s|<1$) and, by passing to $F^{-1}$, repelling ($|s|>1$); excludes $s=0$ (Böttcher) and $|s|=1$. Fractional iterates: $F^{[t]}=\sigma^{-1}(s^{t}\sigma(\cdot))$.

## (5) Böttcher's equation $B(F(x))=B(x)^{n}$ (superattracting, $\lambda=0$, local degree $n$)

$$B\!\left(F(x)\right)=\big(B(x)\big)^{n},\qquad F(z)=a_n z^{n}+a_{n+1}z^{n+1}+\cdots,\ a_n\neq0,\ n\ge2.$$
$B$ (the **Böttcher coordinate**) conjugates a **superattracting** germ ($\lambda=0$, leading local degree $n$) to the pure power map $w\mapsto w^{n}$. **Böttcher's theorem:** for $F(z)=a_n z^n+\cdots$ with $n\ge2$ there is a local holomorphic change of coordinate $w=B(z)$, with $B(0)=0,\ B'(0)\neq0$ after normalization, conjugating $F$ to $w\mapsto w^n$; $B$ is **unique up to multiplication by an $(n-1)$-st root of unity**. Named for **Lucjan Emil Böttcher** (1872–1937), who sketched existence in **1904**; the first complete proof was given by **J. F. Ritt (1920)**. For polynomials it also gives a coordinate near $\infty$ encoding the escape-rate (Green's function) and external rays of the Julia set. (Sources: Wikipedia *Böttcher's equation*; Milnor; arXiv:1307.7778.)

## (6) Julia's equation $G(F(x))\,F'(x)=G(x)$ (infinitesimal generator, parabolic)

$$G\!\left(F(x)\right)\,F'(x)=G(x),\qquad\text{equivalently}\quad \frac{G\circ F}{G}=\frac{1}{F'}.$$
The differential/infinitesimal-generator equation: its solution $G=\mathrm{itlog}(F)$ is the **iterative logarithm** (term due to **Écalle**), the generator of the flow $F^{[t]}$, with $\tfrac{d}{dt}F^{[t]}\big|_{t=0}=G$. Found by **Aczél and Jabotinsky** (with the remark that **G. Frege** may have anticipated it). The general solution is $\varphi=c\cdot\mathrm{itlog}(F)$, $c\in\mathbb{C}$. **Erdős–Jabotinsky:** $F$ is (analytically) embeddable in a flow iff $\mathrm{itlog}(F)$ has positive radius of convergence; in general $\mathrm{itlog}(F)$ is divergent but **Borel summable** (Écalle). Aschenbrenner–van den Dries (Illinois J. Math., arXiv:1307.6381) proved $\mathrm{itlog}(F)$ of a non-linear entire $F$ is **differentially transcendental** over the entire functions. Differentiating Abel's equation $\alpha\circ F=\alpha+1$ gives $\alpha'(F)F'=\alpha'$, i.e. $G=1/\alpha'$ solves Julia's equation — the parabolic generator link.

## (7) Conjugacy equation $f\circ h=h\circ g$

$$f\circ h = h\circ g\quad\Longleftrightarrow\quad f=h\circ g\circ h^{-1}.$$
$h$ **conjugates** $g$ to $f$ (topological if $h$ is a homeomorphism, analytic if biholomorphic). Conjugacy preserves the orbit structure, fixed points, and the multiplier $\lambda$; Schröder ($g=$ linear $s\cdot$), Böttcher ($g=$ power map $w^n$), and Abel ($g=$ translation $+1$) are all the conjugacy equation against a fixed **normal form**. Foundational reference: **M. Kuczma, B. Choczewski, R. Ger, *Iterative Functional Equations*** (Encyclopedia of Mathematics and its Applications 32, Cambridge Univ. Press, 1990). Iterative roots reduce to conjugacy (Bödewadt 1944; Kuczma 1961).

## (8) Translation equation $F(F(x,s),t)=F(x,s+t)$ (Aczél; iteration groups/flows)

$$F\big(F(x,s),t\big)=F(x,s+t),\qquad F(x,0)=x.$$
The defining equation of a **one-parameter iteration group / flow** (continuous iteration). Writing $F_t(x)=F(x,t)$ it reads $F_t\circ F_s=F_{s+t}$, $F_0=\mathrm{id}$, with $F_1=$ the given map being embedded. Systematically studied by **J. Aczél** (and in *Lectures on Functional Equations and Their Applications*). It is the group law of a flow; embeddability asks whether a given $u=F_1$ extends to a solution.

## (9) Aczél–Jabotinsky differential equation (embedding into a flow)

Differentiating the translation/commutativity relation gives the **(third) Aczél–Jabotinsky equation**:
$$\big(H\circ\Phi\big)(x)=\Phi'(x)\,H(x),\qquad H(x)=\left.\frac{\partial F_t}{\partial t}(x)\right|_{t=0},$$
where $H$ is the **infinitesimal generator** and each $\Phi=F_{t_0}$ of the group is a solution. (Obtained from $F_{t_1+t_2}=F_{t_1}\circ F_{t_2}$ by setting $t_1=0$, $t_2=1$.) This is exactly Julia's equation with $H=G=\mathrm{itlog}$, viewed as the embedding condition: $F$ embeds in an analytic flow iff this ODE has an admissible $H$. Algebraic structure of its solution groups in $k[[x]]$ (char $0$): Jabłoński, arXiv:2304.06791 (2023); historical thread J. Aczél, *Some differential equations related to iteration theory* (Canad. J. Math.).

## (10) Commuting-functions equation $f\circ g=g\circ f$ (Ritt/Julia theory)

$$f\circ g = g\circ f.$$
**Permutable** maps. For polynomials, classified independently by **G. Julia**, *Mémoire sur la permutabilité des fractions rationnelles*, Ann. Sci. ÉNS (4) **39** (1922), 131–215, and **J. F. Ritt**, *Permutable rational functions*, Trans. AMS **25** (1923), 399–448. **Theorem (Ritt–Julia):** up to a common linear conjugacy, a pair of non-linear permutable polynomials either share a common iterate, or both arise from the **multiplication/addition formulas of $e^z$ (power and Chebyshev maps)** — i.e. they are (conjugates of) $z\mapsto z^m$, $\pm$Chebyshev polynomials $T_m$, or share iterates (Ritt's exceptional families). Commuting maps share Julia sets and invariant structures; revisited by Eremenko, Pakovich (arXiv:1808.02774).

## Cocycle / Lévy equation (note)

- **Cohomological (additive cocycle) equation:** $\psi(F(x))-\psi(x)=g(x)$ — the inhomogeneous Abel-type / coboundary equation; for $g\equiv1$ it is exactly Abel's equation. Central in ergodic theory (Livšic theory) as the obstruction to writing $g$ as a coboundary.
- **Lévy's limit formula** (Paul Lévy) for the regular Abel function in the parabolic case $\lambda=1$:
$$\alpha_u(z)=\lim_{n\to\infty}\frac{F^{[n]}(z)-F^{[n]}(u)}{F^{[n+1]}(u)-F^{[n]}(u)},$$
an explicit construction of the continuous-iteration normalizer (cf. Koenigs' limit $\sigma=\lim F^{\circ n}/s^n$ in the hyperbolic case).

## Cross-map summary

| Eq. | Form | Regime | Normal form | Key names |
|---|---|---|---|---|
| Babbage | $F^n=\mathrm{id}$ | periodic | $-$ | Babbage 1820 |
| Iter. root | $F^n=G$ | $n$-th root | $-$ | Kuczma 1961; Kneser 1950 |
| Abel | $\alpha\!\circ\!F=\alpha+1$ | $\lambda=1$ | $+1$ | Abel; Fatou/Leau |
| Schröder | $\sigma\!\circ\!F=s\,\sigma$ | $0<|\lambda|\neq1$ | $\times s$ | Schröder 1870; Koenigs 1884 |
| Böttcher | $B\!\circ\!F=B^n$ | $\lambda=0$ | $w^n$ | Böttcher 1904; Ritt 1920 |
| Julia | $G\!\circ\!F\cdot F'=G$ | generator | flow | Aczél–Jabotinsky; Écalle |
| Conjugacy | $f\circ h=h\circ g$ | all | $g$ | Kuczma et al. |
| Translation | $F(F(x,s),t)=F(x,s+t)$ | flow law | $+t$ | Aczél |
| Aczél–Jabot. | $H\!\circ\!\Phi=\Phi' H$ | embedding | $-$ | Aczél, Jabotinsky |
| Commuting | $f\circ g=g\circ f$ | symmetry | $-$ | Julia 1922; Ritt 1923 |

## Sources

- https://en.wikipedia.org/wiki/Schr%C3%B6der%27s_equation — Schröder eq., Koenigs 1884 statement, Abel↔Schröder change of variables.
- https://link.springer.com/article/10.1007/BF01443992 — Schröder, *Ueber iterirte Functionen*, Math. Ann. 3 (1870), 296–322 (DOI).
- https://en.wikipedia.org/wiki/Koenigs_function — Koenigs function: unique $\sigma$, $\sigma(0)=0,\sigma'(0)=1$, limit formula.
- https://en.wikipedia.org/wiki/Abel_equation — Abel eq., iterates via $\alpha^{-1}$, Fatou-coordinate / non-uniqueness.
- https://arxiv.org/pdf/1710.01268 — Fatou coordinate for parabolic germs satisfies $\psi\circ f=\psi+1$.
- https://en.wikipedia.org/wiki/B%C3%B6ttcher%27s_equation — Böttcher eq. $F(h(z))=F(z)^n$, Böttcher 1904 / Ritt 1920.
- https://people.math.harvard.edu/~kochs/bottcher.pdf — Böttcher coordinate, conjugacy to $w^n$, uniqueness up to $(n-1)$-st root of unity.
- https://arxiv.org/pdf/1307.7778 — Lucjan Emil Böttcher (1872–1937) biography, holomorphic dynamics pioneer.
- https://arxiv.org/pdf/math/9201272 — Milnor, *Dynamics in one complex variable*: multiplier classification, Böttcher/Koenigs.
- http://www.scholarpedia.org/article/Siegel_disks/Linearization — fixed-point classes (hyperbolic/parabolic/Siegel/Cremer).
- https://www.math.ucla.edu/~matthias/pdf/itlog-final.pdf — Julia's equation, iterative logarithm, Aczél–Jabotinsky, Écalle, Frege.
- https://arxiv.org/abs/1307.6381 — Aschenbrenner–van den Dries, *Julia's equation and differential transcendence*.
- https://arxiv.org/pdf/2304.06791 — third Aczél–Jabotinsky equation $H\circ\Phi=\Phi'H$, generator, formal-power-series solution groups.
- https://link.springer.com/article/10.1007/BF02925242 — *Iteration theory and its functional equations* (survey context).
- https://www.ams.org/journals/tran/1923-025-03/S0002-9947-1923-1501252-3/S0002-9947-1923-1501252-3.pdf — Ritt, *Permutable rational functions*, Trans. AMS 25 (1923).
- https://arxiv.org/pdf/1808.02774 — *Commuting rational functions revisited* (Julia 1922 cite, Ritt–Julia theory).
- https://arxiv.org/pdf/2001.04573 — *A generalisation of the Babbage functional equation* ($F^n=\mathrm{id}$, $F^n=F^k$).
- https://en.wikipedia.org/wiki/Functional_square_root — half-iterate, Kneser 1950, reduction to Abel.
- https://archive.org/details/bub_gb_bXy_2FpY23UC — Babbage, *Examples of the Solutions of Functional Equations* (1820).
- https://people.math.ethz.ch/~joergw/Papers/functequ.pdf — functional equations related to iteration (conjugacy/Kuczma context).
- https://books.google.com/books/about/Iterative_Functional_Equations.html?id=IM7cdgtodqUC — Kuczma–Choczewski–Ger, *Iterative Functional Equations* (CUP, 1990).
- https://arxiv.org/pdf/1105.4735 — Lévy limit formula for regular Abel function (multiplier 1).
- https://www.math.uchicago.edu/~wilkinso/papers/livsic.pdf — cohomological (coboundary) equation $\psi\circ F-\psi=g$ context.

## Uncertainties

- **Julia's equation exact original locus.** The form $G(F(x))F'(x)=G(x)$ and the name "iterative logarithm" are firmly sourced (Aschenbrenner–van den Dries; Écalle), but I did not pin a primary citation to G. Julia's own paper for *this* differential equation (as opposed to the 1922 permutability memoir). Treat "Julia's equation" naming as per the iteration-theory literature.
- **Aczél–Jabotinsky "first/second/third" numbering.** Only the **third** equation $H\circ\Phi=\Phi'H$ is precisely sourced here; the exact statements of the "first" and "second" Aczél–Jabotinsky equations were not separately verified.
- **Lévy attribution/date.** The limit formula is attributed to Paul Lévy in the regular-iteration literature, but I could not confirm the exact 1928 primary reference for it (Lévy's iteration work); date left unstated.
- **Babbage dates.** 1820 for *Examples of the Solutions of Functional Equations* and 1815–1816 for the *Calculus of Functions* essays are sourced; exact pagination/Phil. Trans. volume not separately verified.
- **Koenigs 1884 reference details** (volume/supplement pagination "1–41") came from a single secondary source; the journal (Ann. Sci. ÉNS, 3rd series) is consistent across sources but pagination is not double-confirmed.
- **Ritt 1923 vs Julia 1922 priority** on commuting polynomials: both papers are real and sourced; the precise division of the classification theorem between them is summarized, not quoted verbatim.
