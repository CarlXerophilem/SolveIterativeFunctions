# A History of Iterative Functional Equations and Iteration Theory

This brief traces the chronological development of the theory of **iterative functional equations** — equations in which the unknown function is composed with itself or with a known map — and the closely intertwined theory of **iteration of functions** (now part of holomorphic/complex dynamics). The central objects are a handful of canonical equations: the **Babbage**, **Abel**, **Schröder**, **Koenigs**, and **Böttcher** equations, plus the problems of **fractional/continuous iteration** and **iterative roots** (e.g. the "functional square root" of a function).

## The founding period: Babbage (1815)

The systematic study of functional equations in a single variable begins with **Charles Babbage** (1791–1871). His memoir **"An Essay towards the Calculus of Functions"** was read on 15 June 1815 (communicated by W. H. Wollaston) and published in *Philosophical Transactions of the Royal Society of London*, **Vol. 105 (1815), pp. 389–423**; a second part followed in 1816. Babbage (age 23) treated, more systematically than any predecessor, equations containing only one variable. He studied the **involutions** now called **Babbage's equation**:
$$\varphi(\varphi(x)) = x,$$
whose solutions are the "**roots of identity**" (functions equal to their own inverse). More generally he considered the **$n$-th order** equation $\varphi^{[n]}(x) = x$ (the iterate $\varphi$ composed $n$ times equals the identity), whose solutions are the **iterative roots of the identity** / periodic functions. The generalized form $\varphi(\varphi(x)) = f(x)$ defines a **functional ("compositional") square root** of $f$. Babbage observed that if $\varphi$ is a solution then so is any conjugate $\psi^{-1}\circ\varphi\circ\psi$.

## Abel (1820s, published posthumously 1881)

**Niels Henrik Abel** (1802–1829) introduced what is now the **Abel functional equation**,
$$\alpha(f(x)) = \alpha(x) + 1,$$
which conjugates iteration of $f$ to a **unit translation**: the $t$-th iterate is $f^{[t]}(x)=\alpha^{-1}(\alpha(x)+t)$. The relevant manuscript, *"Détermination d'une fonction au moyen d'une équation qui ne contient qu'une seule variable,"* appeared in Abel's posthumous **Œuvres complètes** (eds. Ludwig Sylow & Sophus Lie, Christiania/Oslo, 1881). Abel's equation is the additive (logarithmic) form of Schröder's multiplicative equation and is the natural normal form at **parabolic** fixed points (multiplier $=1$).

## Schröder (1870/1871) and Koenigs (1884)

**Ernst Schröder** (1841–1902) published **"Ueber iterirte Functionen"** in *Mathematische Annalen* **3 (1870), pp. 296–322**. He proposed studying iteration of a (meromorphic) function $f$ via the **Schröder equation**,
$$\Psi(f(x)) = s\,\Psi(x),\qquad \Psi(0)=0,\ \Psi'(0)\neq 0,$$
where $s$ is a constant (the **multiplier**). This **linearizes** the dynamics: the $n$-th iterate becomes $\Psi(f^{[n]}(x)) = s^n\Psi(x)$, conjugating $x\mapsto f(x)$ to the dilation $y\mapsto sy$.

**Gabriel Koenigs** (1858–1931) supplied the first rigorous analytic theory in **1884**. **Koenigs' theorem**: if $f$ is holomorphic near an attracting, non-superattracting fixed point (say $0$, with multiplier $s=f'(0)$ satisfying $0<|s|<1$), there is a unique holomorphic **Koenigs function** $\Psi$ with $\Psi(0)=0$, $\Psi'(0)=1$ solving Schröder's equation; thus $f$ is locally analytically conjugate to multiplication by $s$. Koenigs constructed $\Psi$ as the limit $\Psi=\lim_{n\to\infty} s^{-n} f^{[n]}$. (The repelling case $|s|>1$ is handled by passing to $f^{-1}$; **Poincaré linearizers** extend such conjugacies to entire functions.)

## Parabolic case: Leau, Grévy, Lémeray (1897–1898)

The **parabolic** case (multiplier a root of unity) resisted simple linearization. **Léopold Leau** treated it in his 1897 thesis *"Études sur les équations fonctionnelles à une ou à plusieurs variables,"* studying iteration near a rationally indifferent fixed point and obtaining the structure now called the **(Leau–)Fatou flower theorem**: at a fixed point of multiplicity $n+1\ge 2$ there are $n$ attracting and $n$ repelling **petals** whose union with the fixed point is a neighborhood. **A. Grévy** and **E.-M. Lémeray** (the latter's *"Sur quelques algorithmes généraux et sur l'itération,"* 1898) worked on related algorithms; the local normal form there is **Abel's equation** $\alpha(f)=\alpha+1$, with the analytic solutions later understood as **Fatou coordinates**.

## Böttcher (1904): superattracting fixed points

**Lucjan Emil Böttcher** (1872–1937), a Polish pioneer of holomorphic dynamics, treated the remaining **superattracting** case. **Böttcher's equation**,
$$F(h(z)) = F(z)^{n},$$
linearizes (to a power map) the iteration of a germ $h(z)=az^{k}+O(z^{k+1})$, $a\neq 0$, $k\ge 2$. Böttcher's theorem (1904): such a germ is analytically conjugate to $z\mapsto z^{k}$ by a holomorphic **Böttcher coordinate** tangent to the identity. Böttcher sketched the proof in 1904; a complete proof was given by **Joseph Fels Ritt**, *"On the Iteration of Rational Functions,"* *Transactions of the AMS* **21, no. 3 (July 1920), pp. 348–356** (Ritt was unaware of Böttcher's original Russian-language paper).

## Fatou and Julia (1918–1920): the global theory

The four local cases (attracting, repelling, parabolic, superattracting) became the foundation of the **global iteration theory of rational maps**, created almost simultaneously by **Pierre Fatou** (1878–1929) and **Gaston Julia** (1893–1978). In 1915 the Académie des Sciences announced a **Grand Prix des Sciences Mathématiques** to be awarded in 1918 for the iteration of rational substitutions. **Julia** won it; his **"Mémoire sur l'itération des fonctions rationnelles"** (199 pp.) appeared in the *Journal de Mathématiques Pures et Appliquées* (1918), written while hospitalized after WWI injuries. Fatou published comparably deep and incisive results. They introduced the dichotomy of the sphere into the **Fatou set** (where iterates form a normal family) and its complement, the **Julia set** (chaotic locus). **Samuel Lattès** (1873–1918), months before his death, published *"Sur l'itération des substitutions rationnelles et les fonctions de Poincaré,"* *Comptes Rendus Acad. Sci.* **166 (1918), pp. 26–28**, giving the **Lattès maps** $f=\Theta\circ L\circ\Theta^{-1}$ (torus endomorphisms semiconjugated to the sphere) whose Julia set is the whole sphere. Fatou also initiated (1926) the iteration of **transcendental entire** functions.

## Mid-20th century: real-analytic iteration

**Hellmuth Kneser** (1898–1973) solved a long-standing problem in **"Reelle analytische Lösungen der Gleichung $\varphi(\varphi(x)) = e^{x}$ und verwandter Funktionalgleichungen"** (*Crelle's Journal / J. reine angew. Math.*, 1950): a **real-analytic half-iterate of the exponential** (a "half-exponential" $\varphi$ with $\varphi(\varphi(x))=e^{x}$), constructed via complex/holomorphic methods (an Abel function at the fixed point). **George Szekeres** (1911–2005) systematized **regular (fractional) iteration** in **"Regular iteration of real and complex functions,"** *Acta Mathematica* **100 (1958), pp. 203–258**, and later studied *Fractional iteration of exponentially growing functions* (J. Austral. Math. Soc.). The **Aczél–Jabotinsky** line gave an algebraic/matrix approach: **Eri Jabotinsky** represented composition by infinite matrices (*C. R. Acad. Sci. Paris* **224 (1947), pp. 323–324**) and developed continuous iteration via the **Aczél–Jabotinsky differential equation** in *"Analytic Iteration,"* *Trans. AMS* **108 (1963), pp. 457–477**, named in recognition of related work by **János Aczél**.

## The Polish/Silesian school and the consolidation of the field

**Marek Kuczma** (1935–1991, University of Silesia, Katowice) created the modern systematic theory of **iterative functional equations**. His monograph **"Functional Equations in a Single Variable"** (PWN, Warsaw, 1968; *Monografie Matematyczne 46*) is foundational. With **Bogdan Choczewski** and **Roman Ger** he wrote the definitive **"Iterative Functional Equations"** (*Encyclopedia of Mathematics and its Applications* **32**, Cambridge University Press, 1990; 576 pp.). **János Aczél** (1924–2020) anchored the broader functional-equations community; his **"Lectures on Functional Equations and Their Applications"** (Academic Press, 1966; German original Birkhäuser 1961) is a standard reference, and he founded the journal *Aequationes Mathematicae*.

**György Targonski** organized the field's conferences and surveys: **"Topics in Iteration Theory"** (Vandenhoeck & Ruprecht, Göttingen, 1981). The **European Conference on Iteration Theory (ECIT)** series began in **1973 in Toulouse**, continued **1977 in Graz**, **1980 in Marburg**, and onward (still running, e.g. ECIT 2014, 2022). **I. N. Baker** (1932–2011) founded the modern theory of iteration of **transcendental entire functions** (1950s–1960s onward), including the celebrated discovery that entire functions can possess **wandering domains** (*An entire function which has wandering domains*, J. Austral. Math. Soc., 1976) — impossible for rational maps by Sullivan's later **no-wandering-domains theorem**.

## Modern revival: resurgence, complex dynamics, and physics

**Jean Écalle** developed **resurgence theory** and **mould calculus** (*Les fonctions résurgentes*, Publ. Math. d'Orsay 81-05 & 81-06, 1981), giving a complete account of divergent **Fatou coordinates** and reconstructing the **Écalle–Voronin moduli** that classify parabolic germs. The Mandelbrot-era boom (Douady, Hubbard, Sullivan, Milnor) revived complex dynamics, using **Böttcher** and **Koenigs** coordinates as core tools. In mathematical physics, **Thomas Curtright** and **Cosmas Zachos** cast **time evolution and renormalization-group flow** in terms of Schröder's equation (*"Evolution profiles and functional equations,"* J. Phys. A, 2009, arXiv:0909.2424; *"Renormalization Group Functional Equations,"* 2010, arXiv:1010.5174), building exact continuous iterations (e.g. of $2x(1+x)$) and approximate continuous iterates of $x e^{x}$.

## Compact timeline

- **1815** Babbage — *Essay towards the Calculus of Functions*; Babbage equation $\varphi(\varphi(x))=x$.
- **~1820s / 1881** Abel — Abel equation $\alpha(f(x))=\alpha(x)+1$ (posthumous *Œuvres*).
- **1870** Schröder — *Ueber iterirte Functionen*; Schröder equation $\Psi(f(x))=s\Psi(x)$.
- **1884** Koenigs — linearization at attracting (non-superattracting) fixed points.
- **1897–1898** Leau, Grévy, Lémeray — parabolic case; Leau–Fatou flower.
- **1904** Böttcher — $F(h(z))=F(z)^n$ at superattracting fixed points (full proof Ritt 1920).
- **1918** Fatou & Julia — global theory; Grand Prix to Julia; Lattès maps.
- **1947–1963** Jabotinsky (Aczél–Jabotinsky) — matrix/continuous iteration.
- **1950** Kneser — real-analytic $\varphi(\varphi(x))=e^x$.
- **1958** Szekeres — regular (fractional) iteration, *Acta Math.* 100.
- **1966** Aczél — *Lectures on Functional Equations*.
- **1968 / 1990** Kuczma (with Choczewski, Ger) — *Functional Equations in a Single Variable*; *Iterative Functional Equations*.
- **1973–** ECIT conference series (Toulouse 1973; Graz 1977; Marburg 1980; …).
- **1976** I. N. Baker — wandering domains for entire functions.
- **1981** Targonski — *Topics in Iteration Theory*; Écalle — *Les fonctions résurgentes*.
- **2009–2010** Curtright & Zachos — Schröder-equation methods in physics/RG.

## Sources

- https://en.wikipedia.org/wiki/Functional_square_root — Babbage equation $\varphi(\varphi(x))=x$, "roots of identity," compositional square roots.
- https://www.jstor.org/stable/107377 — Babbage, *An Essay towards the Calculus of Functions* (Phil. Trans. 1815).
- https://makingscience.royalsociety.org/items/pt_9_23/paper-an-essay-towards-the-calculus-of-functions-by-c-charles-babbage — Royal Society record: read 15 June 1815, Vol. 105 pp. 389–423.
- https://en.wikipedia.org/wiki/Abel_equation — Abel equation $\alpha(f(x))=\alpha(x)+1$; relation to Schröder.
- https://www.cambridge.org/core/books/oeuvres-completes-de-niels-henrik-abel/C19472FAF1FD6608B3B6B68337E74223 — Abel *Œuvres complètes* (Sylow & Lie, 1881).
- https://link.springer.com/article/10.1007/BF01443992 — Schröder, *Ueber iterirte Functionen*, Math. Ann. 3 (1870), 296–322.
- https://en.wikipedia.org/wiki/Schr%C3%B6der%27s_equation — Schröder equation $\Psi(h(x))=s\Psi(x)$, multiplier, linearization.
- https://en.wikipedia.org/wiki/Koenigs_function — Koenigs (1884) theorem, unique Koenigs function $h'(0)=1$.
- https://en.wikipedia.org/wiki/B%C3%B6ttcher%27s_equation — Böttcher equation $F(h(z))=F(z)^n$; 1904 sketch; Ritt 1920.
- https://arxiv.org/pdf/1307.7778 — "Lucjan Emil Böttcher (1872–1937)…Polish pioneer of holomorphic dynamics."
- https://www.ams.org/journals/tran/1920-021-03/S0002-9947-1920-1501149-6/S0002-9947-1920-1501149-6.pdf — Ritt, *On the Iteration of Rational Functions*, Trans. AMS 21(3) (1920), 348–356.
- https://en.wikipedia.org/wiki/L%C3%A9opold_Leau — Leau (1897), parabolic fixed points, Leau–Fatou flower; Lémeray 1898.
- https://arxiv.org/pdf/1501.02176 — Fatou flowers and parabolic curves (flower theorem statement).
- https://link.springer.com/book/10.1007/978-3-642-00446-9 — Audin, *Fatou, Julia, Montel: le grand prix des sciences mathématiques de 1918*.
- https://grokipedia.com/page/Gaston_Julia — Julia's 1918 Mémoire (199 pp., J. Math. Pures Appl.), Grand Prix.
- https://en.wikipedia.org/wiki/Latt%C3%A8s_map — Lattès (1918) C. R. Acad. Sci. 166, 26–28; Lattès maps.
- https://en.wikipedia.org/wiki/Half-exponential_function — Kneser (1950) real-analytic $\varphi(\varphi(x))=e^x$.
- https://mathshistory.st-andrews.ac.uk/Biographies/Kneser_Hellmuth/ — Kneser biography (1898–1973).
- https://projecteuclid.org/euclid.acta/1485889052 — Szekeres, *Regular iteration of real and complex functions*, Acta Math. 100 (1958), 203–258.
- https://archive.org/details/functionalequati0000kucz — Kuczma, *Functional Equations in a Single Variable* (PWN, 1968).
- https://www.cambridge.org/core/books/iterative-functional-equations/37D010F4F9B5FD44143F6F4EC8FD2807 — Kuczma, Choczewski, Ger, *Iterative Functional Equations* (Cambridge, 1990, EMA 32).
- https://www.scientificlib.com/en/Mathematics/Biographies/MarekKuczma.html — Kuczma (1935–1991), creator of iterative functional equations theory.
- https://www.scirp.org/reference/referencespapers?referenceid=1510029 — Targonski, *Topics in Iteration Theory* (Vandenhoeck & Ruprecht, 1981).
- http://www.ecit2014.wmie.uz.zgora.pl/about.php — ECIT history: Toulouse 1973, Graz 1977, Marburg 1980.
- https://link.springer.com/article/10.1007/s00010-021-00779-w — Eri Jabotinsky biography; 1947 C.R., 1963 *Analytic Iteration* (Trans. AMS 108, 457–477).
- https://www.scirp.org/reference/referencespapers?referenceid=942724 — Aczél, *Lectures on Functional Equations and Their Applications* (Academic Press, 1966).
- https://www.cambridge.org/core/services/aop-cambridge-core/content/view/46C3576B3EF8839363717E5379EABBA9/S1446788700015287a.pdf/an_entire_function_which_has_wandering_domains.pdf — Baker, entire function with wandering domains (1976).
- https://arxiv.org/pdf/1307.8093 — Resurgent character of Fatou coordinates; Écalle–Voronin invariants.
- https://www.numdam.org/item/RCP25_1984__34__105_0/ — Introduction to the work of J. Écalle (resurgence, *Les fonctions résurgentes* 1981).
- https://arxiv.org/abs/0909.2424 — Curtright & Zachos, *Evolution profiles and functional equations* (J. Phys. A, 2009).
- https://arxiv.org/abs/1010.5174 — Curtright & Zachos, *Renormalization Group Functional Equations* (2010).

## Uncertainties

- **Babbage exact equation glyph**: secondary sources write $\varphi(\varphi(x))=x$; Babbage's own notation differed. The "$n$-th order" framing ($f^{[n]}=\mathrm{Id}$) is from later summaries, not verified against the 1815 text directly.
- **Abel dating**: the Abel equation is attributed to the 1820s but the directly relevant manuscript was published posthumously (1881 *Œuvres*); I did not pin an exact composition year or confirm the precise title attached specifically to $\alpha(f)=\alpha+1$ vs. other Abel functional-equation work.
- **Schröder 1870 vs. 1871**: the paper is dated 1870 (Math. Ann. 3); some sources phrase the functional-equation proposal as "1871." Both years appear; the paper itself is 1870.
- **Böttcher's original 1904 paper**: published in Russian/Polish-area journals; exact title and venue not captured here. Some sources give Böttcher's equation with general exponent $n$; for a degree-$k$ superattracting germ the exponent equals the local degree $k$.
- **Targonski as ECIT "founder"**: he was a central organizer/editor and ran the 1980 Marburg ECIT, but I could not confirm sole "founder" status or his birth/death dates from these searches. The first ECIT (1973 Toulouse) predates his 1981 book.
- **Grévy / Lémeray exact contributions and dates**: confirmed Lémeray 1898 title and Leau 1897 thesis; Grévy's precise contribution (a 1894/1897 paper on Abel's equation in the real case appears in a Springer record) is not firmly pinned.
- **Poincaré**: his linearization ideas underpin the repelling case but I did not locate a single dated "Poincaré iteration equation" paper; "Poincaré functions/linearizers" is the standard later terminology.
- **Aczél–Jabotinsky naming**: the joint name and the differential ("infinitesimal-generator") equation form are well attested; the precise first appearance of the name is uncertain.
