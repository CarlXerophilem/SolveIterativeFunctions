# Web extract — Wikipedia "Iterated function" (full text, lightly cleaned)

Source: https://en.wikipedia.org/wiki/Iterated_function (fetched via Chrome, 2026-06-22)

> Authoritative organized overview. LaTeX appears inline as `{\displaystyle ...}`. Mine for the
> shelf / equations / connections pages. Cross-check specifics against the WebSearch briefs.

In mathematics, an iterated function is obtained by composing a function with itself. Studied in computer science, fractals, dynamical systems, mathematics and renormalization-group physics.

## Notation history
- Compositional power notation f^n traced to **John Frederick William Herschel (1813)**; Herschel credited **Hans Heinrich Bürmann** (work undiscovered).
- Alternatives: f^[n] (Benjamin Peirce); prefixed ^n f(x) (Alfred Pringsheim & Jules Molk, 1907). Tetration prefix ^n x (Maurer 1901, Goodstein 1947, Rucker 1982).

## Translation functional equation & Abelian property
- f^m ∘ f^n = f^{m+n} (semigroup law; structurally like a^m a^n = a^{m+n}).
- For arbitrary (negative/non-integer) indices this is the **translation functional equation**, cf. Schröder's equation and Abel equation.
- On a log scale reduces to the Chebyshev nesting T_m(T_n(x)) = T_{mn}(x), since T_n(x)=cos(n arccos x).
- Sequence of iterates f^n is a **Picard sequence** (after Charles Émile Picard); {f^n(x)} is the **orbit** of x.

## Fixed points / limiting behaviour
- Fix(f); Banach & Brouwer fixed-point theorems. Aitken acceleration on a fixed point = Steffensen's method (quadratic convergence).
- Attractive vs unstable fixed points; ω-limit set; wandering points.

## Invariant measure / operators
- Density evolution governed by the **invariant measure** = eigenstate (eigenvalue 1) of the **Ruelle–Frobenius–Perron operator (transfer operator)**.
- Iteration = shift ⇒ transfer operator and its adjoint the **Koopman operator** are shift operators on a shift space; subshifts of finite type → chaos.

## Fractional iterates and flows
- f^{1/n} non-unique when g^n = f has multiple solutions — "Babbage's equation of the functional roots of the identity map." E.g. f(x)=4x−6, n=2 has g(x)=6−2x and g(x)=2x−2.
- **half-iterate**: g(g(x))=f(x), written f^{1/2}. Continuous iteration index n → a **flow**.
- Negative iterates = inverse compositions (needs bijectivity).

### Series formula for fractional iteration via a fixed point f(a)=a
- Set f^n(a)=a for all real n; Taylor-expand around a.
- f^n(x) = a + (x−a) f'(a)^n + ((x−a)^2/2)(f''(a) f'(a)^{n−1})·(f'(a)^n − 1)/(f'(a) − 1) + ...
- Special case f'(a)=1: f^n(x) = x + ((x−a)^2/2)(n f''(a)) + ((x−a)^3/6)((3/2)n(n−1)f''(a)^2 + n f'''(a)) + ...
- Example f(x)=Cx+D: fixed point a=D/(1−C); f^n(x) = C^n x + (1−C^n)/(1−C) D.
- Example f(x)=√2^x: fixed point a=2; relates to **tetration** and the infinite power tower.
- Example f(x)=x^b: f^n(x) = Taylor series of x^{(b^n)} around 1.

## Conjugacy
- f, g **topologically conjugate** if ∃ homeomorphism h with g = h^{-1} ∘ f ∘ h; then g^n = h^{-1} ∘ f^n ∘ h. (tent map ~ logistic map.)
- Near a fixed point at 0, solve **Schröder's equation** for Ψ making f locally conjugate to the dilation g(x)=f'(0)x: iteration reduced to multiplication; exponent n becomes continuous "time" ⇒ continuous group. (Perturbative principal eigenfunction Ψ = **Jabotinsky matrix** method.)

## Schröder's 1870 worked examples (logistic map)
- Chaotic case f(x)=4x(1−x): Ψ(x)=arcsin(√x)^2, so f^n(x)=sin(2^n arcsin√x)^2.
- Nonchaotic f(x)=2x(1−x): Ψ(x)=−(1/2)ln(1−2x), so f^n(x)=−(1/2)((1−2x)^{2^n} − 1).
- Only ax^2+bx+c cases with closed-form n-th iterate are b=2=−a and b=4=−a (reduce to logistic).

## Lie's data-transport / beta function
- Iteration velocity / **beta function** v(x); for continuous index t, f_t = exp(t v ∂/∂x) realization (Lie exponential of a continuous group), solving the translation functional equation.
- Conversely v(x) recovered from f via the generic **Abel equation**.

## See also (the site's atlas list)
Schröder's equation, Functional square root, Abel equation, Böttcher's equation, Infinite compositions of analytic functions, Flow (mathematics), Tetration, Functional equation, Half-exponential function, Iterated function system, Sarkovskii's theorem, Rotation number.
