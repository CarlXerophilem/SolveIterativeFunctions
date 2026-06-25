# Annotated Literature: Iterative Functional Equations

Scope: foundational books, classical papers, the modern iterative-roots research stream (Zhang Weinian school and collaborators), tetration / half-exponential, the Kruchinin composita line, and survey/web resources. Each entry gives authors, year, exact title, venue, and a working URL. Verified arXiv IDs are flagged. Corrections to the brief's tentative attributions are noted inline.

The central objects are the conjugacy equations of one-dimensional iteration. For a map $f$ with fixed point and multiplier $s=f'(0)$:

- **Schröder's equation**: $\Psi(f(x)) = s\,\Psi(x)$ (linearization; $0<|s|\neq 1$).
- **Abel's equation**: $\alpha(f(x)) = \alpha(x) + 1$ (parabolic/translation normal form).
- **Böttcher's equation**: $B(f(z)) = B(z)^k$ (superattracting case, $f(z)=a_k z^k + \cdots$, $k\ge 2$).
- **Iterative root / functional square root**: solve $g^{n}=f$ (so $g\circ\cdots\circ g = f$); $n=2$ gives the square root $g\circ g = f$.
- **Babbage equation**: $f^{n}=\mathrm{Id}$ (and the generalization $f^n=f^k$).
A change of variables sends Abel $\to$ Schröder $\to$ Böttcher.

## (a) Foundational books

- **Marek Kuczma**, *Functional Equations in a Single Variable*, Monografie Matematyczne, Tom 46, PWN — Państwowe Wydawnictwo Naukowe, Warsaw, **1968** (English, ~383 pp.). The first systematic monograph on one-variable functional equations; foundational for Schröder/Abel theory, iterative roots, and linearization. Archive copy: https://archive.org/details/functionalequati0000kucz
- **Marek Kuczma, Bogdan Choczewski, Roman Ger**, *Iterative Functional Equations*, Encyclopedia of Mathematics and its Applications, Vol. 32, Cambridge University Press, **1990** (ISBN 9780521355612; ~576 pp.). The standard exhaustive reference for the modern theory. Publisher: https://www.cambridge.org/core/books/iterative-functional-equations/37D010F4F9B5FD44143F6F4EC8FD2807 ; archive: https://archive.org/details/iterativefunctio0000kucz
- **György Targoński (Targonski)**, *Topics in Iteration Theory*, Studia Mathematica Skript, Vol. 6, Vandenhoeck & Ruprecht, Göttingen, **1981**. Influential survey of abstract iteration theory (iteration groups/semigroups, embeddings). Open Library: https://openlibrary.org/books/OL21839648M/Topics_in_iteration_theory
- **János Aczél**, *Lectures on Functional Equations and Their Applications*, Mathematics in Science and Engineering, Vol. 19, Academic Press, New York, **1966** (~510 pp.); Dover reprint 2006 (ISBN 9780486445236). Broad classic on functional equations. Publisher: https://shop.elsevier.com/books/lectures-on-functional-equations-and-their-applications/aczel/978-0-12-043750-4
- **John Milnor**, *Dynamics in One Complex Variable*, 3rd edition, Annals of Mathematics Studies 160, Princeton University Press, **2006** (ISBN 9780691124889). Standard text on iteration of rational maps; covers Koenigs, Böttcher, Écalle–Voronin parabolic theory. An introductory-lectures version is on arXiv: https://arxiv.org/abs/math/9201272 (publisher: https://press.princeton.edu/)
- **Lennart Carleson, Theodore W. Gamelin**, *Complex Dynamics*, Universitext, Springer-Verlag, New York, **1993** (ISBN 9780387979427; ~201 pp.). Analytic introduction to complex dynamics, Julia/Fatou sets, the Mandelbrot set. Springer: https://link.springer.com/book/10.1007/978-1-4612-4364-9

## (b) Classical papers

- **Ernst Schröder**, *Ueber iterirte Functionen*, Mathematische Annalen **3** (1870), pp. 296–322. Origin of Schröder's equation $\Psi(f(x))=s\,\Psi(x)$. Springer: https://link.springer.com/article/10.1007/BF01443992 ; EUDML: https://eudml.org/doc/156489 . Biography (MacTutor): https://mathshistory.st-andrews.ac.uk/Biographies/Schroder/
- **Charles Babbage**, *An Essay towards the Calculus of Functions*, Philosophical Transactions of the Royal Society of London **105** (1815), pp. 389–423 (Part I; Part II in vol. 106, 1816, DOI 10.1098/rstl.1816.0012). Early study of $f^n=\mathrm{Id}$ and functional equations. JSTOR: https://www.jstor.org/stable/107377
- **Gabriel Koenigs**, *Recherches sur les intégrales de certaines équations fonctionnelles*, Annales scientifiques de l'École Normale Supérieure, **1884**. Rigorous linearization at an attracting/repelling fixed point ($0<|s|<1$): a holomorphic $\varphi$ conjugates $f$ to $w\mapsto s w$. Biography (MacTutor): https://mathshistory.st-andrews.ac.uk/Biographies/Koenigs/
- **Lucjan Emil Böttcher**, **1904** result: near a superattracting fixed point $f(z)=a_k z^k + o(z^k)$, $k\ge 2$, $f$ is holomorphically conjugate to $w\mapsto w^k$ (Böttcher coordinate). Treated in Milnor and Carleson–Gamelin above; overview: https://en.wikipedia.org/wiki/B%C3%B6ttcher%27s_equation
- **Gaston Julia**, *Mémoire sur l'itération des fonctions rationnelles*, Journal de Mathématiques Pures et Appliquées, sér. 8, **1** (1918), pp. 47–245. Global theory of iteration of rational maps. Numdam: https://www.numdam.org/item/JMPA_1918_8_1__47_0.pdf
- **Pierre Fatou**, *Sur les équations fonctionnelles*, Bulletin de la Société Mathématique de France **47** (1919), pp. 161–271 (continued in vols. 48, 1920). Founding the Fatou/Julia set dichotomy. Biography: https://en.wikipedia.org/wiki/Pierre_Fatou
- **Hellmuth Kneser**, *Reelle analytische Lösungen der Gleichung $\varphi(\varphi(x))=e^{x}$ und verwandter Funktionalgleichungen*, Journal für die reine und angewandte Mathematik (Crelle) **187** (1950), pp. 56–67. First real-analytic half-iterate of $\exp$; basis for analytic tetration. Biography: https://en.wikipedia.org/wiki/Hellmuth_Kneser
- **George Szekeres**, *Regular iteration of real and complex functions*, Acta Mathematica **100** (1958), pp. 203–258. Abel-function approach to regular (fractional) iteration. Springer: https://link.springer.com/article/10.1007/BF02559539 ; Project Euclid: https://projecteuclid.org/euclid.acta/1485889052
- **I. N. Baker**, work on embeddability / fractional iteration of analytic functions and formal power series; the classic non-embeddability example is $f(t)=e^{t}-1$ (no real-analytic fractional iterate flow). Related work appeared in J. Australian Math. Soc. and Aequationes Mathematicae (1960s). Survey context: https://reglos.de/lars/ffx.html

## (c) Iterative-roots research stream (Zhang Weinian school and collaborators)

- **Jingzhong Zhang & Lu Yang** (1983): introduced the *characteristic-interval* method for iterative roots of PM (piecewise-monotone) functions (originally in Chinese). Refined by **Weinian Zhang**, *PM functions, their characteristic intervals and iterative roots*, Annales Polonici Mathematici **65** (1997), no. 2, pp. 119–128. EUDML: https://eudml.org/doc/269950 . Key idea: the maximal interval $K(F)\supseteq F([a,b])$ on which $F$ is monotone (the characteristic interval) reduces the PM problem to the monotone case.
- **B. V. Rajarama Bhat & Chaitanya Gopalakrishna**, *Iterative square roots of functions*, Ergodic Theory and Dynamical Systems **43** (2023), no. 7, pp. 2201–2227. arXiv: **2105.02171** (verified) — https://arxiv.org/abs/2105.02171 ; journal: https://www.cambridge.org/core/journals/ergodic-theory-and-dynamical-systems/article/iterative-square-roots-of-functions/F82D948C755B4698F419716EF6256A3F . NOTE: this paper is by Bhat & Gopalakrishna, **not** Zhang; it proves continuous self-maps with no square root are dense for spaces homeomorphic to the unit cube / all of $\mathbb{R}^m$. (Gopalakrishna has separate joint work with Veerapazham and W. Zhang on iteration operators.)
- **B. V. Rajarama Bhat & Chaitanya Gopalakrishna**, *Iterative Roots of Multifunctions*, arXiv: **2212.05305** (verified, submitted 10 Dec 2022) — https://arxiv.org/abs/2212.05305 (Fundamenta Mathematicae). Sufficient conditions for nonexistence of iterative roots of set-valued maps via graph "in-degree"; applied to nonexistence of roots of some complex polynomials.
- **Liu Liu & Lin Li**, *Iterative roots of exclusive multifunctions*, arXiv: **2011.13543** (verified, submitted 7 Dec 2020) — https://arxiv.org/abs/2011.13543 . Studies strictly monotone u.s.c. multifunctions with finitely many jumps; introduces "intensity" of jumps and constructs order-$n$ roots.
- **Xiao Tang & Lin Li**, *A sufficient condition for existence of iterative roots of PM functions without the characteristic endpoints condition*, arXiv: **2109.12747** (verified) — https://arxiv.org/abs/2109.12747 . Order-2, height-2 case when number of forts exceeds the order; partial answer to the characteristic-endpoints problem.
- **Liu Liu & Weinian Zhang**, *Genetics of iterative roots for PM functions*, Discrete and Continuous Dynamical Systems (Series A) **41** (2021), no. 5, pp. 2391–2409, DOI 10.3934/dcds.2020369. https://www.aimsciences.org/article/doi/10.3934/dcds.2020369 . "Genetic" = root topologically conjugate to its parent; shows PM functions of height $>1$ have no genetic root.
- **Marc Homs-Dones**, *A generalisation of the Babbage functional equation*, arXiv: **2001.04573** (verified, submitted 14 Jan 2020) — https://arxiv.org/abs/2001.04573 (published in DCDS, DOI 10.3934/dcds.2020303). Shows in $\mathbb{R}$ and $\mathbb{R}^2$ that $C^l$-solutions of $f^n=\mathrm{Id}$ are $C^l$-linearizable for $l\in\{0,1,\dots,\infty\}$; counterexamples for $l=0$ and for $f^n=f^k$ with $n>k\ge 2$. NOTE: author is Homs-Dones, **not** Zhang.
- Survey of the stream: **Witold Jarczyk**, *Recent results on iterative roots*, ESAIM: Proceedings and Surveys **46** (2014), pp. 47–62. https://www.esaim-proc.org/articles/proc/pdf/2014/03/proc144605.pdf — conjugacy of PM functions and their roots, stability, set-valued generalizations, "phantom roots" (Targonski/Schwaiger/Kurepa).

## (d) Tetration / half-exponential

- **Dmitrii Kouznetsov**, *Solution of $F(z+1)=\exp(F(z))$ in complex $z$-plane*, Mathematics of Computation **78** (2009), no. 267, pp. 1647–1670. AMS: https://www.ams.org/journals/mcom/2009-78-267/S0025-5718-09-02188-7/S0025-5718-09-02188-7.pdf — analytic tetration $F$ with $F(0)=1$, growing on $\mathbb{R}$, approaching the fixed point $L$ along the imaginary axis.
- **Henryk Trappmann & Dmitrii Kouznetsov**, *Uniqueness of Holomorphic Abel Functions at a Complex Fixed Point Pair*, Aequationes Mathematicae (2011); preprint arXiv:1006.3981 — https://arxiv.org/pdf/1006.3981 . Uniqueness criterion satisfied by Kneser's real-analytic Abel function of $\exp$.
- **William Paulsen & Samuel Cowgill**, *Solving $F(z+1)=b^{F(z)}$ in the complex plane*, Advances in Computational Mathematics **43** (2017), no. 6, pp. 1261–1282. https://link.springer.com/article/10.1007/s10444-017-9524-1 — extends Kneser's construction to bases $b>e^{1/e}$ and gives a high-precision numerical method; with conditions forcing Kneser's solution to be unique (answering a Trappmann–Kouznetsov conjecture).
- Encyclopedic entry on the half-exponential: https://en.wikipedia.org/wiki/Functional_square_root (Kneser 1950 half-iterate of $\exp$).

## (e) Kruchinin "composita" line

- **Vladimir V. Kruchinin & Dmitry V. Kruchinin**, *Composita and its properties*, arXiv: **1103.2582** (verified) — https://arxiv.org/abs/1103.2582 . Coefficients of powers of an ordinary generating function; via the composita, solves $B(x)=H(xB(x)^m)$.
- **Dmitry V. Kruchinin & Vladimir V. Kruchinin**, *Method for solving an iterative functional equation $A^{2^{n}}(x)=F(x)$*, arXiv: **1302.1986** (verified, Feb 2013) — https://arxiv.org/abs/1302.1986 . Uses composita to solve $A^{2^n}=F$ for formal power series $F(x)=\sum_{n>0} f(n)x^n$, $f(1)\neq 0$; proves integrality of $A$ obtained from $4A(A(x))=F(4x)$ when $F$ has integer coefficients.

## (f) Surveys & web resources

- **Lars/Henryk Trappmann**, *Iterative Roots and Fractional Iteration*, https://reglos.de/lars/ffx.html — accessible overview of half-iterates of $\exp$, Abel/Schröder methods, Kneser, Kouznetsov–Trappmann.
- Wikipedia: *Iterated function* https://en.wikipedia.org/wiki/Iterated_function ; *Functional square root* https://en.wikipedia.org/wiki/Functional_square_root ; *Schröder's equation* https://en.wikipedia.org/wiki/Schr%C3%B6der%27s_equation ; *Abel equation* https://en.wikipedia.org/wiki/Abel_equation ; *Tetration* https://en.wikipedia.org/wiki/Tetration ; *Half-exponential function* https://en.wikipedia.org/wiki/Half-exponential_function
- MacTutor biographies (history): Schröder https://mathshistory.st-andrews.ac.uk/Biographies/Schroder/ ; Koenigs https://mathshistory.st-andrews.ac.uk/Biographies/Koenigs/

## Sources

- https://www.cambridge.org/core/books/iterative-functional-equations/37D010F4F9B5FD44143F6F4EC8FD2807 — Kuczma–Choczewski–Ger 1990 publisher page.
- https://archive.org/details/iterativefunctio0000kucz — Kuczma–Choczewski–Ger scan.
- https://archive.org/details/functionalequati0000kucz — Kuczma 1968 scan.
- https://openlibrary.org/books/OL21839648M/Topics_in_iteration_theory — Targonski 1981.
- https://shop.elsevier.com/books/lectures-on-functional-equations-and-their-applications/aczel/978-0-12-043750-4 — Aczél 1966.
- https://arxiv.org/abs/math/9201272 — Milnor, Dynamics in one complex variable (lectures).
- https://link.springer.com/book/10.1007/978-1-4612-4364-9 — Carleson–Gamelin, Complex Dynamics (Springer).
- https://link.springer.com/article/10.1007/BF01443992 — Schröder 1870, Ueber iterirte Functionen.
- https://eudml.org/doc/156489 — Schröder 1870 (EUDML).
- https://www.jstor.org/stable/107377 — Babbage 1815, Essay towards the Calculus of Functions.
- https://mathshistory.st-andrews.ac.uk/Biographies/Koenigs/ — Koenigs biography (1884 linearization context).
- https://en.wikipedia.org/wiki/B%C3%B6ttcher%27s_equation — Böttcher 1904 equation.
- https://www.numdam.org/item/JMPA_1918_8_1__47_0.pdf — Julia 1918 memoir.
- https://en.wikipedia.org/wiki/Pierre_Fatou — Fatou 1919 functional-equations memoir.
- https://en.wikipedia.org/wiki/Hellmuth_Kneser — Kneser 1950 half-iterate of exp.
- https://link.springer.com/article/10.1007/BF02559539 — Szekeres 1958, Regular iteration.
- https://projecteuclid.org/euclid.acta/1485889052 — Szekeres 1958 (Project Euclid).
- https://eudml.org/doc/269950 — W. Zhang 1997, PM functions and characteristic intervals.
- https://arxiv.org/abs/2105.02171 — Bhat & Gopalakrishna, Iterative square roots of functions (ETDS 2023).
- https://www.cambridge.org/core/journals/ergodic-theory-and-dynamical-systems/article/iterative-square-roots-of-functions/F82D948C755B4698F419716EF6256A3F — ETDS journal page.
- https://arxiv.org/abs/2212.05305 — Bhat & Gopalakrishna, Iterative Roots of Multifunctions.
- https://arxiv.org/abs/2011.13543 — Liu & Li, Iterative roots of exclusive multifunctions.
- https://arxiv.org/abs/2109.12747 — Tang & Li, PM iterative roots without characteristic endpoints.
- https://www.aimsciences.org/article/doi/10.3934/dcds.2020369 — Liu & Zhang, Genetics of iterative roots (DCDS).
- https://arxiv.org/abs/2001.04573 — Homs-Dones, Generalisation of the Babbage functional equation.
- https://www.esaim-proc.org/articles/proc/pdf/2014/03/proc144605.pdf — Jarczyk, Recent results on iterative roots (survey).
- https://www.ams.org/journals/mcom/2009-78-267/S0025-5718-09-02188-7/S0025-5718-09-02188-7.pdf — Kouznetsov 2009 tetration (Math. Comp.).
- https://arxiv.org/pdf/1006.3981 — Trappmann & Kouznetsov, Uniqueness of Holomorphic Abel Functions.
- https://link.springer.com/article/10.1007/s10444-017-9524-1 — Paulsen & Cowgill 2017 tetration.
- https://arxiv.org/abs/1103.2582 — Kruchinin & Kruchinin, Composita and its properties.
- https://arxiv.org/abs/1302.1986 — Kruchinin & Kruchinin, Method for solving $A^{2^n}(x)=F(x)$.
- https://reglos.de/lars/ffx.html — Trappmann, Iterative Roots and Fractional Iteration.
- https://en.wikipedia.org/wiki/Functional_square_root — Functional square root.
- https://en.wikipedia.org/wiki/Iterated_function — Iterated function.
- https://en.wikipedia.org/wiki/Schr%C3%B6der%27s_equation — Schröder's equation.
- https://en.wikipedia.org/wiki/Abel_equation — Abel equation.
- https://en.wikipedia.org/wiki/Tetration — Tetration.
- https://en.wikipedia.org/wiki/Half-exponential_function — Half-exponential function.
- https://mathshistory.st-andrews.ac.uk/Biographies/Schroder/ — Schröder biography.

## Uncertainties

- **Schröder 1870 vs 1871 / pagination**: Math. Ann. vol. 3 is firmly attributed; pages 296–322 reported but some sources cite slightly different ranges. The "1871" appearing in some sources conflates it with another Schröder paper; treat 1870 (vol. 3) as the iterated-functions paper.
- **Koenigs 1884 exact title/pagination**: Annales sci. ENS, 1884; the exact title (*Recherches sur les intégrales de certaines équations fonctionnelles*) and supplement (1885) and page numbers were not fully confirmed from a primary source in these searches.
- **Böttcher 1904 original citation**: the original venue (Polish/Russian journals, *Izv. Kazan. Fiz.-Mat. Obshch.*) and exact title were not retrieved; cited here via secondary literature (Milnor, Wikipedia).
- **Julia 1918 page range**: given as pp. 47–245 (JMPA sér. 8, t. 1); some indices show 47–245 split across installments — verify exact span.
- **Fatou 1919/1920**: "Sur les équations fonctionnelles" spans Bull. SMF vols. 47 (1919) and 48 (1920); part numbering (I, II, III) and exact pages should be checked per part.
- **Kneser 1950 venue/pages**: title confirmed; Crelle (J. reine angew. Math.) vol. 187, pp. 56–67 is the commonly cited locus but was not confirmed from a primary page in these searches.
- **Baker fractional-iteration paper**: exact title, journal, volume, and year for the canonical non-embeddability result ($e^t-1$) were not pinned to a single citation; multiple Baker papers (1960s, J. Austral. Math. Soc. / Aequationes / Math. Z.) are relevant.
- **Trappmann–Kouznetsov "Uniqueness"**: the journal version title may read "Uniqueness of Holomorphic Abel Functions at a Complex Fixed Point Pair" (Aequationes Math. 2011); the related "Uniqueness of holomorphic superlogarithms" is a separate manuscript (eretrandre.org). Confirm which is the published article.
- **Targonski 1981 series**: "Studia Mathematica Skript, Vol. 6" reported but not independently confirmed for exact series numbering.
- arXiv IDs 2105.02171, 2212.05305, 2011.13543, 2109.12747, 2001.04573, 1103.2582, 1302.1986 were all verified by search to resolve to the stated titles.
