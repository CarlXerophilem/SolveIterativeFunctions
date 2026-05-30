/**
 * SolveIterativeFunctions — Computation Engine
 * Implements composita recurrence, composition, and functional equation solvers
 * based on V.V. Kruchinin & D.V. Kruchinin, "Composita and its Properties" (arXiv:1103.2582)
 */
const Engine = (() => {
  'use strict';

  // ----- Arbitrary-precision rational arithmetic -----
  // Uses BigInt numerator/denominator to avoid floating-point error in composita.
  // But for performance we also provide a Number-based fast path.

  /**
   * Greatest common divisor (Euclidean algorithm) for BigInt.
   */
  function gcdBigInt(a, b) {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b !== 0n) { const t = b; b = a % b; a = t; }
    return a;
  }

  class Rational {
    constructor(num, den) {
      if (den === undefined) { den = 1n; }
      if (typeof num === 'number') { num = BigInt(Math.round(num * 1e15)); den = 1000000000000000n; }
      if (typeof den === 'number') { den = BigInt(den); }
      if (den < 0n) { num = -num; den = -den; }
      const g = gcdBigInt(num, den);
      this.num = num / g;
      this.den = den / g;
    }
    add(other) {
      return new Rational(this.num * other.den + other.num * this.den, this.den * other.den);
    }
    sub(other) {
      return new Rational(this.num * other.den - other.num * this.den, this.den * other.den);
    }
    mul(other) {
      return new Rational(this.num * other.num, this.den * other.den);
    }
    div(other) {
      return new Rational(this.num * other.den, this.den * other.num);
    }
    toNumber() {
      return Number(this.num) / Number(this.den);
    }
    toString() {
      if (this.den === 1n) return this.num.toString();
      return `${this.num}/${this.den}`;
    }
  }

  // ----- Utility: factorial (Number, for small n) -----
  const factorialCache = [1, 1];
  function factorial(n) {
    if (n < 0) return NaN;
    if (n < factorialCache.length) return factorialCache[n];
    for (let i = factorialCache.length; i <= n; i++) {
      factorialCache[i] = factorialCache[i - 1] * i;
    }
    return factorialCache[n];
  }

  // ----- Utility: binomial coefficient (Number, for small n) -----
  function binomial(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k > n / 2) k = n - k;
    let result = 1;
    for (let i = 1; i <= k; i++) {
      result = (result * (n - i + 1)) / i;
    }
    return result;
  }

  // ----- Composita Recurrence (§2, Theorem) -----
  // F^Δ(n,k): coefficient of x^n in F(x)^k
  // fCoeffs[i] = coefficient of x^i in F(x), i >= 1 (f(0)=0 required)
  //
  // Uses floating-point for speed. For exact rational, use compositaRecurrenceBigInt.
  function compositaRecurrence(fCoeffs, n, k, memo) {
    if (k > n) return 0;
    const key = n * 10000 + k;
    if (memo && memo.has(key)) return memo.get(key);

    let result;
    if (k === 1) {
      result = (n < fCoeffs.length) ? fCoeffs[n] : 0;
    } else {
      result = 0;
      const maxI = n - k + 1;
      for (let i = 1; i <= maxI; i++) {
        const fi = (i < fCoeffs.length) ? fCoeffs[i] : 0;
        if (fi !== 0) {
          result += fi * compositaRecurrence(fCoeffs, n - i, k - 1, memo);
        }
      }
    }
    if (memo) memo.set(key, result);
    return result;
  }

  /**
   * Compute full composita table F^Δ(n,k) for 1<=k<=n<=maxN.
   * Returns 2D array: table[n][k] = F^Δ(n,k) for n,k >= 1.
   * Uses dynamic programming for O(N^3) time.
   */
  function compositaTable(fCoeffs, maxN) {
    // table[n] will be an array indexed by k, with table[n][0] unused
    const table = Array.from({ length: maxN + 1 }, () => []);
    for (let n = 1; n <= maxN; n++) {
      for (let k = 1; k <= n; k++) {
        if (k === 1) {
          table[n][k] = (n < fCoeffs.length) ? fCoeffs[n] : 0;
        } else if (k === n) {
          table[n][k] = Math.pow(fCoeffs[1] || 0, n);
        } else {
          let sum = 0;
          const maxI = n - k + 1;
          for (let i = 1; i <= maxI; i++) {
            const fi = (i < fCoeffs.length) ? fCoeffs[i] : 0;
            if (fi !== 0 && table[n - i][k - 1] !== undefined) {
              sum += fi * table[n - i][k - 1];
            }
          }
          table[n][k] = sum;
        }
      }
    }
    return table;
  }

  // ----- Composition: A(x) = R(F(x)) (§4, Theorem) -----
  // a(n) = Σ_{k=1}^n F^Δ(n,k) * r(k)
  //ANALYTIC OR FLOAT _INT128 APPROX

  function compositionCoeffs(fCompositaTable, rCoeffs, maxN) {
    const a = new Array(maxN + 1).fill(0);
    a[0] = rCoeffs[0] || 0;
    for (let n = 1; n <= maxN; n++) {
      let sum = 0;
      for (let k = 1; k <= n; k++) {
        sum += fCompositaTable[n][k] * (rCoeffs[k] || 0);
      }
      a[n] = sum;
    }
    return a;
  }

  // ----- Composita of composition: A(x) = G(F(x)) (§4, Theorem) -----
  // A^Δ(n,k) = Σ_{m=k}^n F^Δ(n,m) * G^Δ(m,k)
  function compositaOfComposition(fTable, gTable, n, k) {
    let sum = 0;
    for (let m = k; m <= n; m++) {
      if (fTable[n] && fTable[n][m] && gTable[m] && gTable[m][k]) {
        sum += fTable[n][m] * gTable[m][k];
      }
    }
    return sum;
  }



  // ----- Solver: A(A(x)) = F(x) -----
  // Given F(x) coefficients fCoeffs[1..maxN], find A(x) coefficients aCoeffs[1..maxN].
  //
  // The key equation: Σ_{m=k}^n A^Δ(n,m) * A^Δ(m,k) = F^Δ(n,k)
  // For k=1: Σ_{m=1}^n A^Δ(n,m) * a(m) = f(n)
  //
  // Since A^Δ(n,n) = a(1)^n and A^Δ(n,1) = a(n):
  //   a(n)*(a(1) + a(1)^n) + Σ_{m=2}^{n-1} A^Δ(n,m)*a(m) = f(n)
  //   a(n) = (f(n) - Σ_{m=2}^{n-1} A^Δ(n,m)*a(m)) / (a(1) + a(1)^n)
  //
  // This is triangular: A^Δ(n,m) for m<n depends only on a(1)...a(n-1).
  function solveHalfIterate(fCoeffs, maxN) {
    if (maxN < 1) return [];
    const f1 = fCoeffs[1];
    if (f1 === undefined || f1 <= 0) {
      // f(1) must be positive for real a(1)
      return { error: 'f(1) must be positive for a real solution.' };
    }

    const a1 = Math.sqrt(f1);
    const a = new Array(maxN + 1).fill(0);
    a[1] = a1;

    // We'll maintain A^Δ table up to current n
    const aTable = Array.from({ length: maxN + 1 }, () => []);

    for (let n = 1; n <= maxN; n++) {
      // Compute A^Δ(n,k) for k=1..n using current a[1..n]
      for (let k = 1; k <= n; k++) {
        if (k === 1) {
          aTable[n][k] = a[n];
        } else if (k === n) {
          aTable[n][k] = Math.pow(a[1], n);
        } else {
          let sum = 0;
          const maxI = n - k + 1;
          for (let i = 1; i <= maxI; i++) {
            const ai = a[i] || 0;
            if (ai !== 0 && aTable[n - i] && aTable[n - i][k - 1] !== undefined) {
              sum += ai * aTable[n - i][k - 1];
            }
          }
          aTable[n][k] = sum;
        }
      }

      // For n >= 2, solve for a(n) using the composition equation
      // MUST READ NOTES FROM PDF MANUAL
//
///////////////////////////////////////////////////

      if (n >= 2) {
        const fn = (n < fCoeffs.length) ? fCoeffs[n] : 0;
        let sumInner = 0;
        for (let m = 2; m <= n - 1; m++) {
          if (aTable[n][m] !== undefined && a[m] !== undefined) {
            sumInner += aTable[n][m] * a[m];
          }
        }
        const denom = a[1] + Math.pow(a[1], n);
        if (Math.abs(denom) < 1e-15) {
          return { error: `Division by zero at n=${n}: a(1) + a(1)^n ≈ 0.` };
        }
        a[n] = (fn - sumInner) / denom;
        // Update A^Δ(n,1) to the newly computed value
        aTable[n][1] = a[n];
      }
    }

    // Verify: compute F^Δ from A^Δ via composition and check against fCoeffs
    const residuals = [];
    for (let n = 1; n <= maxN; n++) {
      let computed = 0;
      for (let m = 1; m <= n; m++) {
        if (aTable[n][m] !== undefined && a[m] !== undefined) {
          computed += aTable[n][m] * a[m];
        }
      }
      const actual = (n < fCoeffs.length) ? fCoeffs[n] : 0;
      residuals.push(Math.abs(computed - actual));
    }

    return {
      coefficients: a.slice(1), // a[1]..a[maxN]
      compositaTable: aTable,
      residuals: residuals,
      maxResidual: Math.max(...residuals),
    };
  }

  /**
   * Evaluate polynomial given coefficients a[1..N] where poly(x) = Σ a[i]*x^i.
   */
  function evalPolynomial(coeffs, x) {
    // coeffs[0] corresponds to x^1, coeffs[1] to x^2, etc.
    let result = 0;
    let xPow = x;
    for (let i = 0; i < coeffs.length; i++) {
      result += coeffs[i] * xPow;
      xPow *= x;
    }
    return result;
  }

  /**
   * Compose A(A(x)) using the composita table and evaluate at x.
   * F(x) = A(A(x)): F(x) = Σ_{n=1}^N (Σ_{m=1}^n A^Δ(n,m)*a(m)) * x^n
   */
  function evalComposition(aCoeffs, aCompositaTable, x) {
    let result = 0;
    let xPow = x;
    const maxN = aCoeffs.length;
    for (let n = 1; n <= maxN; n++) {
      let coeff = 0;
      for (let m = 1; m <= n; m++) {
        if (aCompositaTable[n] && aCompositaTable[n][m] !== undefined) {
          coeff += aCompositaTable[n][m] * aCoeffs[m - 1];
        }
      }
      result += coeff * xPow;
      xPow *= x;
    }
    return result;
  }

  /**
   * Compute orbit: x_{k+1} = F(x_k) for steps iterations.
   */
  function computeOrbit(F, x0, steps) {
    const orbit = [x0];
    let x = x0;
    for (let i = 0; i < steps; i++) {
      x = F(x);
      orbit.push(x);
      if (!isFinite(x)) break;
    }
    return orbit;
  }

  // ----- Known compositae (Table 1 from paper) -----
  // Used for verification
  const knownCompositae = {
    // F(x) = bx/(1-ax): composita = C(n-1,k-1) * a^(n-k) * b^k
    geometricSeries(n, k, a, b) {
      return binomial(n - 1, k - 1) * Math.pow(a, n - k) * Math.pow(b, k);
    },
    // F(x) = ax + bx^2: composita = C(k, n-k) * a^(2k-n) * b^(n-k)
    quadratic(n, k, a, b) {
      if (k > n || n - k > k) return 0;
      return binomial(k, n - k) * Math.pow(a, 2 * k - n) * Math.pow(b, n - k);
    },
    // F(x) = x*e^x: composita = k^(n-k) / (n-k)!
    xExpX(n, k) {
      return Math.pow(k, n - k) / factorial(n - k);
    },
  };

  // ----- Stirling numbers (used in composita tables) -----
  function stirlingFirst(n, k) {
    if (n === k) return 1;
    if (k === 0 || n === 0) return 0;
    if (k > n) return 0;
    // s(n,k) = s(n-1,k-1) - (n-1)*s(n-1,k)
    return stirlingFirst(n - 1, k - 1) - (n - 1) * stirlingFirst(n - 1, k);
  }

  function stirlingSecond(n, k) {
    if (n === k) return 1;
    if (k === 0 || n === 0) return 0;
    if (k > n) return 0;
    // S(n,k) = k*S(n-1,k) + S(n-1,k-1)
    return k * stirlingSecond(n - 1, k) + stirlingSecond(n - 1, k - 1);
  }

  // ----- Public API -----
  return {
    // Types
    Rational,

    // Utilities
    factorial,
    binomial,
    gcdBigInt,

    // Composita
    compositaRecurrence,
    compositaTable,
    compositionCoeffs,
    compositaOfComposition,

    // Solver
    solveHalfIterate,
    evalPolynomial,
    evalComposition,
    computeOrbit,

    // Known compositae (for verification)
    knownCompositae,
    stirlingFirst,
    stirlingSecond,
  };
})();

// Export for module use; also available as window.Engine
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Engine;
}
