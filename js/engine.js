/**
 * SolveIterativeFunctions — Computation Engine
 * Implements composita recurrence, truncated series iteration, and
 * local analytic half-iterate approximations near real fixed points.
 */
const Engine = (() => {
  'use strict';

  const EPS = 1e-12;

  class Rational {
    constructor(num, den) {
      if (den === undefined) den = 1n;
      if (typeof num === 'number') {
        num = BigInt(Math.round(num * 1e15));
        den = 1000000000000000n;
      }
      if (typeof den === 'number') den = BigInt(den);
      if (den < 0n) {
        num = -num;
        den = -den;
      }
      const g = gcdBigInt(num, den);
      this.num = num / g;
      this.den = den / g;
    }
    add(other) { return new Rational(this.num * other.den + other.num * this.den, this.den * other.den); }
    sub(other) { return new Rational(this.num * other.den - other.num * this.den, this.den * other.den); }
    mul(other) { return new Rational(this.num * other.num, this.den * other.den); }
    div(other) { return new Rational(this.num * other.den, this.den * other.num); }
    toNumber() { return Number(this.num) / Number(this.den); }
    toString() { return this.den === 1n ? this.num.toString() : `${this.num}/${this.den}`; }
  }

  function gcdBigInt(a, b) {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b !== 0n) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  const factorialCache = [1, 1];
  function factorial(n) {
    if (n < 0) return NaN;
    if (n < factorialCache.length) return factorialCache[n];
    for (let i = factorialCache.length; i <= n; i += 1) {
      factorialCache[i] = factorialCache[i - 1] * i;
    }
    return factorialCache[n];
  }

  function binomial(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k > n / 2) k = n - k;
    let result = 1;
    for (let i = 1; i <= k; i += 1) {
      result = (result * (n - i + 1)) / i;
    }
    return result;
  }

  function stirlingFirst(n, k) {
    if (n === k) return 1;
    if (k === 0 || n === 0 || k > n) return 0;
    return stirlingFirst(n - 1, k - 1) - (n - 1) * stirlingFirst(n - 1, k);
  }

  function stirlingSecond(n, k) {
    if (n === k) return 1;
    if (k === 0 || n === 0 || k > n) return 0;
    return k * stirlingSecond(n - 1, k) + stirlingSecond(n - 1, k - 1);
  }

  function trimCoeffs(coeffs, maxDegree) {
    const end = typeof maxDegree === 'number' ? maxDegree : coeffs.length - 1;
    const result = coeffs.slice(0, end + 1);
    while (result.length > 1 && Math.abs(result[result.length - 1]) < EPS) {
      result.pop();
    }
    return result;
  }

  function padCoeffs(coeffs, degree) {
    const result = coeffs.slice();
    while (result.length <= degree) result.push(0);
    return result;
  }

  function normalizeInputCoeffs(coeffs, degree) {
    const result = new Array(degree + 1).fill(0);
    for (let i = 0; i <= degree; i += 1) {
      result[i] = Number(coeffs[i] || 0);
    }
    return result;
  }

  function addSeries(a, b, maxDegree) {
    const degree = Math.max(a.length, b.length, maxDegree !== undefined ? maxDegree + 1 : 0) - 1;
    const out = new Array(degree + 1).fill(0);
    for (let i = 0; i <= degree; i += 1) {
      out[i] = Number(a[i] || 0) + Number(b[i] || 0);
    }
    return trimCoeffs(out, maxDegree !== undefined ? maxDegree : degree);
  }

  function scaleSeries(a, scalar, maxDegree) {
    const degree = Math.min(a.length - 1, maxDegree !== undefined ? maxDegree : a.length - 1);
    const out = new Array(degree + 1).fill(0);
    for (let i = 0; i <= degree; i += 1) out[i] = Number(a[i] || 0) * scalar;
    return trimCoeffs(out, degree);
  }

  function multiplySeries(a, b, maxDegree) {
    const degree = maxDegree !== undefined ? maxDegree : (a.length - 1) + (b.length - 1);
    const out = new Array(degree + 1).fill(0);
    for (let i = 0; i < a.length; i += 1) {
      if (Math.abs(a[i]) < EPS) continue;
      for (let j = 0; j < b.length && i + j <= degree; j += 1) {
        if (Math.abs(b[j]) < EPS) continue;
        out[i + j] += a[i] * b[j];
      }
    }
    return trimCoeffs(out, degree);
  }

  function derivativeSeries(coeffs, maxDegree) {
    const degree = Math.min(coeffs.length - 1, maxDegree !== undefined ? maxDegree + 1 : coeffs.length - 1);
    if (degree <= 0) return [0];
    const out = new Array(Math.min(degree, maxDegree !== undefined ? maxDegree : degree) + 1).fill(0);
    for (let i = 1; i <= degree; i += 1) out[i - 1] = i * coeffs[i];
    return trimCoeffs(out, maxDegree !== undefined ? maxDegree : degree - 1);
  }

  function evalPolynomial(coeffs, x) {
    let result = 0;
    for (let i = coeffs.length - 1; i >= 0; i -= 1) {
      result = result * x + Number(coeffs[i] || 0);
    }
    return result;
  }

  function composeSeries(outer, inner, maxDegree) {
    const degree = maxDegree !== undefined ? maxDegree : (outer.length - 1) * Math.max(1, inner.length - 1);
    let result = [Number(outer[0] || 0)];
    let power = [1];
    for (let k = 1; k < outer.length; k += 1) {
      power = multiplySeries(power, inner, degree);
      if (Math.abs(outer[k]) >= EPS) {
        result = addSeries(result, scaleSeries(power, outer[k], degree), degree);
      }
    }
    return trimCoeffs(padCoeffs(result, degree), degree);
  }

  function seriesPower(base, exponent, maxDegree) {
    if (exponent === 0) return [1];
    let result = [1];
    for (let i = 0; i < exponent; i += 1) {
      result = multiplySeries(result, base, maxDegree);
    }
    return result;
  }

  function invertSeriesAroundZero(series, maxDegree) {
    if (series.length < 2 || Math.abs((series[1] || 0) - 1) > 1e-10 || Math.abs(series[0] || 0) > 1e-10) {
      return { error: 'Inverse series requires h(0)=0 and h\'(0)=1.' };
    }
    const inv = new Array(maxDegree + 1).fill(0);
    inv[1] = 1;
    for (let n = 2; n <= maxDegree; n += 1) {
      inv[n] = 0;
      const composed = composeSeries(series, inv, n);
      const coeffN = Number(composed[n] || 0);
      inv[n] = -coeffN;
    }
    return { coefficients: trimCoeffs(inv, maxDegree) };
  }

  function shiftPolynomial(coeffs, shift, maxDegree) {
    const degree = maxDegree !== undefined ? maxDegree : coeffs.length - 1;
    let result = [0];
    const base = [shift, 1];
    for (let n = 0; n < coeffs.length && n <= degree; n += 1) {
      if (Math.abs(coeffs[n]) < EPS) continue;
      const term = scaleSeries(seriesPower(base, n, degree), coeffs[n], degree);
      result = addSeries(result, term, degree);
    }
    return trimCoeffs(padCoeffs(result, degree), degree);
  }

  function buildShiftedModel(coeffs, fixedPoint, maxDegree) {
    const shifted = shiftPolynomial(coeffs, fixedPoint, maxDegree);
    const result = shifted.slice();
    result[0] = Number(result[0] || 0) - fixedPoint;
    return trimCoeffs(padCoeffs(result, maxDegree), maxDegree);
  }

  function unshiftLocalSeries(localSeries, fixedPoint, maxDegree) {
    const shifted = shiftPolynomial(localSeries, -fixedPoint, maxDegree);
    const result = shifted.slice();
    result[0] = Number(result[0] || 0) + fixedPoint;
    return trimCoeffs(padCoeffs(result, maxDegree), maxDegree);
  }

  function sampleFunction(fn, xMin, xMax, steps) {
    const points = [];
    const count = Math.max(2, steps || 25);
    for (let i = 0; i <= count; i += 1) {
      const t = i / count;
      const x = xMin + (xMax - xMin) * t;
      const y = fn(x);
      if (Number.isFinite(y)) points.push({ x, y });
    }
    return points;
  }

  function verifyCandidate(candidate, target, xMin, xMax, samples) {
    const pts = sampleFunction((x) => candidate(candidate(x)) - target(x), xMin, xMax, samples || 50);
    let maxError = 0;
    for (const pt of pts) maxError = Math.max(maxError, Math.abs(pt.y));
    return { maxError, samples: pts };
  }

  function polynomialFromRoots(roots) {
    let poly = [1];
    for (const root of roots) {
      poly = multiplySeries(poly, [-root, 1]);
    }
    return poly;
  }

  function approximateRealFixedPoints(coeffs, xMin, xMax) {
    const derivative = derivativeSeries(coeffs);
    const roots = [];
    const target = addSeries(coeffs, [0, -1], coeffs.length - 1);
    let previousX = xMin;
    let previousY = evalPolynomial(target, previousX);
    const steps = 400;
    for (let i = 1; i <= steps; i += 1) {
      const x = xMin + (xMax - xMin) * (i / steps);
      const y = evalPolynomial(target, x);
      if (Math.abs(y) < 1e-6) roots.push(x);
      if (previousY === 0 || y === 0 || previousY * y < 0) {
        let a = previousX;
        let b = x;
        for (let j = 0; j < 40; j += 1) {
          const m = 0.5 * (a + b);
          const ym = evalPolynomial(target, m);
          if (Math.abs(ym) < 1e-10) {
            a = m;
            b = m;
            break;
          }
          if (previousY * ym <= 0) {
            b = m;
            y;
          } else {
            a = m;
            previousY = ym;
          }
        }
        roots.push(0.5 * (a + b));
      }
      previousX = x;
      previousY = y;
    }
    const deduped = [];
    for (const root of roots) {
      if (!Number.isFinite(root)) continue;
      if (!deduped.some((candidate) => Math.abs(candidate - root) < 1e-4)) deduped.push(root);
    }
    return deduped.sort((a, b) => a - b).map((x) => ({ x, derivative: evalPolynomial(derivative, x) }));
  }

  // Classify a fixed point from its shifted local Taylor model
  // localG = [F(x0)-x0, F'(x0), F''(x0)/2, ...]. Works for any F (polynomial or
  // transcendental) once the local Taylor series is known.
  function classifyFromLocal(localG) {
    const lambda = Number(localG[1] || 0);
    const residual = Number(localG[0] || 0);
    let multiplicity = 1;
    for (let i = 1; i < localG.length; i += 1) {
      if (Math.abs(localG[i]) > 1e-10) { multiplicity = i; break; }
    }
    if (Math.abs(residual) > 1e-6) {
      return { supported: false, type: 'not_fixed', lambda, residual, multiplicity, label: 'Not a fixed point', note: 'Choose x0 so that F(x0)=x0.' };
    }
    if (Math.abs(lambda) < 1e-10) {
      return { supported: false, type: 'superattracting', lambda, residual, multiplicity, label: 'Superattracting fixed point', note: 'A real local half-iterate may require Böttcher-type coordinates or fractional powers; this lightweight calculator only classifies the case.' };
    }
    if (lambda <= 0) {
      return { supported: false, type: 'nonpositive_multiplier', lambda, residual, multiplicity, label: 'Non-positive multiplier', note: 'The current real-valued analytic mode only supports positive multipliers, so branch choices remain explicit and stable.' };
    }
    if (Math.abs(lambda - 1) < 1e-8) {
      return { supported: false, type: 'parabolic', lambda, residual, multiplicity, label: 'Parabolic / neutral fixed point', note: 'Parabolic fixed point: handled by the Fatou/Abel coordinate in analytic mode.' };
    }
    return { supported: true, type: lambda < 1 ? 'attracting' : 'repelling', lambda, residual, multiplicity, label: lambda < 1 ? 'Attracting fixed point' : 'Repelling fixed point', note: 'The calculator uses a truncated Schroeder-coordinate construction near the chosen fixed point.' };
  }

  function classifyFixedPoint(coeffs, fixedPoint) {
    const local = buildShiftedModel(coeffs, fixedPoint, Math.max(8, coeffs.length + 2));
    return classifyFromLocal(local);
  }

  // Find real solutions of F(x) = x on [a,b] for a numeric F (any elementary fn).
  function findFixedPointsNumeric(Ffn, a, b) {
    const g = (x) => Ffn(x) - x;
    const roots = [];
    const steps = 600;
    let px = a;
    let py = g(a);
    for (let i = 1; i <= steps; i += 1) {
      const x = a + (b - a) * (i / steps);
      const y = g(x);
      if (Number.isFinite(py) && Number.isFinite(y) && py * y <= 0 && py !== 0) {
        let lo = px;
        let hi = x;
        let flo = py;
        for (let j = 0; j < 60; j += 1) {
          const m = 0.5 * (lo + hi);
          const fm = g(m);
          if (Math.abs(fm) < 1e-13) { lo = m; hi = m; break; }
          if (flo * fm <= 0) hi = m; else { lo = m; flo = fm; }
        }
        const r = 0.5 * (lo + hi);
        if (roots.every((q) => Math.abs(q - r) > 1e-5)) roots.push(r);
      }
      px = x; py = y;
    }
    return roots.sort((u, v) => u - v).map((x) => ({ x, derivative: (Ffn(x + 1e-6) - Ffn(x - 1e-6)) / 2e-6 }));
  }

  function classifyFixedPointLegacy(coeffs, fixedPoint) {
    const derivative = derivativeSeries(coeffs);
    const lambda = evalPolynomial(derivative, fixedPoint);
    const residual = evalPolynomial(coeffs, fixedPoint) - fixedPoint;
    const local = buildShiftedModel(coeffs, fixedPoint, Math.max(8, coeffs.length + 2));
    let multiplicity = 1;
    for (let i = 1; i < local.length; i += 1) {
      if (Math.abs(local[i]) > 1e-10) {
        multiplicity = i;
        break;
      }
    }

    if (Math.abs(residual) > 1e-6) {
      return { supported: false, type: 'not_fixed', lambda, residual, multiplicity, label: 'Not a fixed point', note: 'Choose x0 so that F(x0)=x0.' };
    }
    if (Math.abs(lambda) < 1e-10) {
      return {
        supported: false,
        type: 'superattracting',
        lambda,
        residual,
        multiplicity,
        label: 'Superattracting fixed point',
        note: 'A real local half-iterate may require Böttcher-type coordinates or fractional powers; this lightweight calculator only classifies the case.'
      };
    }
    if (lambda <= 0) {
      return {
        supported: false,
        type: 'nonpositive_multiplier',
        lambda,
        residual,
        multiplicity,
        label: 'Non-positive multiplier',
        note: 'The current real-valued analytic mode only supports positive multipliers, so branch choices remain explicit and stable.'
      };
    }
    if (Math.abs(lambda - 1) < 1e-8) {
      return {
        supported: false,
        type: 'parabolic',
        lambda,
        residual,
        multiplicity,
        label: 'Parabolic / neutral fixed point',
        note: 'A parabolic Abel-function construction is discussed in the articles, but this calculator exposes the case as a warning rather than returning an unstable heuristic.'
      };
    }
    return {
      supported: true,
      type: lambda < 1 ? 'attracting' : 'repelling',
      lambda,
      residual,
      multiplicity,
      label: lambda < 1 ? 'Attracting fixed point' : 'Repelling fixed point',
      note: 'The calculator uses a truncated Schroeder-coordinate construction near the chosen fixed point.'
    };
  }

  function solveSchroederHalfIterate(coeffs, fixedPoint, order) {
    const classification = classifyFixedPoint(coeffs, fixedPoint);
    const degree = Math.max(3, order || 8);
    if (!classification.supported) {
      return {
        supported: false,
        classification,
        note: classification.note,
      };
    }

    const localF = buildShiftedModel(coeffs, fixedPoint, degree);
    const lambda = classification.lambda;
    const phi = new Array(degree + 1).fill(0);
    phi[1] = 1;

    for (let n = 2; n <= degree; n += 1) {
      const knownPhi = phi.slice();
      knownPhi[n] = 0;
      const composed = composeSeries(knownPhi, localF, n);
      const knownCoeff = Number(composed[n] || 0);
      const denom = lambda - Math.pow(lambda, n);
      if (Math.abs(denom) < 1e-12) {
        return {
          supported: false,
          classification,
          note: 'The truncated Schroeder series encountered a resonance and was not continued.'
        };
      }
      phi[n] = knownCoeff / denom;
    }

    const inversePhi = invertSeriesAroundZero(phi, degree);
    if (inversePhi.error) {
      return { supported: false, classification, note: inversePhi.error };
    }

    const scale = Math.sqrt(lambda);
    const scaledPhi = scaleSeries(phi, scale, degree);
    const localHalf = composeSeries(inversePhi.coefficients, scaledPhi, degree);
    const actualHalf = unshiftLocalSeries(localHalf, fixedPoint, degree);
    const candidate = (x) => fixedPoint + evalPolynomial(localHalf, x - fixedPoint);
    const target = (x) => evalPolynomial(coeffs, x);

    return {
      supported: true,
      classification,
      localFunctionCoeffs: trimCoeffs(localHalf, degree),
      actualFunctionCoeffs: trimCoeffs(actualHalf, degree),
      localModelCoeffs: trimCoeffs(localF, degree),
      koenigsCoeffs: trimCoeffs(phi, degree),
      inverseKoenigsCoeffs: trimCoeffs(inversePhi.coefficients, degree),
      note: classification.note,
      evaluator: candidate,
      target,
      verification: verifyCandidate(candidate, target, fixedPoint - 0.35, fixedPoint + 0.35, 48),
    };
  }

  // Half-iterate at a PARABOLIC fixed point (multiplier lambda = 1) via the
  // Fatou / Abel coordinate. Shift y = x - x0 so the germ g(y) = F(x0+y) - x0
  // is tangent to the identity, g(y) = y + c2 y^2 + c3 y^3 + ... Then the Fatou
  // coordinate Phi(g(y)) = Phi(y) + 1 has the asymptotic form
  //   Phi(y) = -1/(c2 y) + A ln|y| + sum_{k>=1} p_k y^k,  A = (c2^2 - c3)/c2^2,
  // and the half-iterate is f = Phi^{-1}(Phi + 1/2). It is evaluated
  // semi-analytically: iterate g (or g^{-1}) to push y into a small
  // neighbourhood where the truncated Phi is accurate, shift the coordinate by
  // 1/2, then pull back. Accuracy converges with the order (not capped like the
  // raw divergent Taylor half-iterate), reaching ~1e-15 near the fixed point.
  function solveParabolicHalfIterate(coeffs, fixedPoint, order) {
    const classification = classifyFixedPoint(coeffs, fixedPoint);
    const lambda = classification.lambda;
    if (classification.type === 'not_fixed') {
      return { supported: false, classification, note: classification.note };
    }
    if (Math.abs(lambda - 1) > 1e-6) {
      return { supported: false, classification, note: 'Parabolic mode expects multiplier lambda = 1; use Schroeder mode for this fixed point.' };
    }
    const M = Math.max(4, Math.min(order || 10, 16));
    const degree = M + 3;
    const gc = buildShiftedModel(coeffs, fixedPoint, degree);
    gc[0] = 0;
    gc[1] = 1; // tangent to identity
    const c2 = gc[2] || 0;
    if (Math.abs(c2) < 1e-12) {
      return { supported: false, classification, note: 'Degenerate parabolic point (vanishing quadratic term); higher-order parabolic case is not supported.' };
    }

    // --- local truncated power-series helpers (index = power) ---
    const N = M + 2;
    const mul = (a, b) => {
      const o = new Array(N + 1).fill(0);
      for (let i = 0; i <= N; i += 1) { if (!a[i]) continue; for (let j = 0; i + j <= N; j += 1) { if (!b[j]) continue; o[i + j] += a[i] * b[j]; } }
      return o;
    };
    const compose = (outer, inner) => {
      const res = new Array(N + 1).fill(0); res[0] = outer[0] || 0;
      let pw = new Array(N + 1).fill(0); pw[0] = 1;
      for (let k = 1; k < outer.length; k += 1) { pw = mul(pw, inner); if (outer[k]) for (let i = 0; i <= N; i += 1) res[i] += outer[k] * pw[i]; }
      return res;
    };
    const lnOnePlus = (uu) => {
      const out = new Array(N + 1).fill(0);
      let pw = new Array(N + 1).fill(0); pw[0] = 1;
      for (let m = 1; m <= N; m += 1) { pw = mul(pw, uu); const s = (m % 2 ? 1 : -1) / m; for (let i = 0; i <= N; i += 1) out[i] += s * pw[i]; }
      return out;
    };
    const divS = (num, den) => {
      const o = new Array(N + 1).fill(0);
      for (let n = 0; n <= N; n += 1) { let s = num[n] || 0; for (let k = 1; k <= n; k += 1) s -= (den[k] || 0) * o[n - k]; o[n] = s / den[0]; }
      return o;
    };

    // build the Fatou coordinate series
    const u = new Array(N + 1).fill(0);
    for (let k = 1; k <= N; k += 1) u[k] = gc[k + 1] || 0;
    const s2 = new Array(N + 1).fill(0);
    const t = new Array(N + 1).fill(0);
    for (let j = 0; j <= N; j += 1) { s2[j] = gc[j + 2] || 0; t[j] = gc[j + 1] || 0; }
    const P = divS(s2, t).map((v) => v / c2);
    const Lu = lnOnePlus(u);
    const A = -P[1] / Lu[1];
    const p = new Array(M + 2).fill(0);
    for (let n = 2; n <= M + 1; n += 1) {
      const psi2 = new Array(N + 1).fill(0);
      for (let k = 1; k <= n - 2; k += 1) psi2[k] = p[k];
      const psiG2 = compose(psi2, gc);
      const sKnown = psiG2[n] - psi2[n];
      const coeff = (n - 1) * c2;
      p[n - 1] = -(P[n] + A * Lu[n] + sKnown) / coeff;
    }

    const asymPhi = (z) => { let s = -1 / (c2 * z) + A * Math.log(Math.abs(z)); let zk = 1; for (let k = 1; k <= M; k += 1) { zk *= z; s += p[k] * zk; } return s; };
    const asymPhiP = (z) => { let s = 1 / (c2 * z * z) + A / z; let zk = 1; for (let k = 1; k <= M; k += 1) { s += k * p[k] * zk; zk *= z; } return s; };
    const invAsym = (targetVal, z0) => { let z = z0; for (let it = 0; it < 80; it += 1) { const e = asymPhi(z) - targetVal; if (Math.abs(e) < 1e-15) break; const d = asymPhiP(z) || 1; z -= e / d; } return z; };

    const dG = derivativeSeries(gc, degree);
    const g = (y) => evalPolynomial(gc, y);
    const gInv = (v) => { let w = v; for (let it = 0; it < 80; it += 1) { const fw = evalPolynomial(gc, w) - v; if (Math.abs(fw) < 1e-15) break; const d = evalPolynomial(dG, w) || 1; w -= fw / d; } return w; };
    const tau = 0.06;
    const halfGerm = (y) => {
      if (!Number.isFinite(y) || y === 0) return y;
      const useG = Math.abs(g(y)) < Math.abs(y); // iterate in the direction that approaches 0
      let z = y;
      let n = 0;
      while (Math.abs(z) >= tau) {
        const zn = useG ? g(z) : gInv(z);
        if (!Number.isFinite(zn) || Math.abs(zn) >= Math.abs(z) + 1e-15) break;
        z = zn; n += 1;
        if (n > 200000) break;
      }
      const zeta = invAsym(asymPhi(z) + 0.5, z);
      let w = zeta;
      for (let i = 0; i < n; i += 1) w = useG ? gInv(w) : g(w);
      return w;
    };

    const evaluator = (x) => fixedPoint + halfGerm(x - fixedPoint);
    const target = (x) => evalPolynomial(coeffs, x);
    const verification = verifyCandidate(evaluator, target, fixedPoint - 0.4, fixedPoint + 0.4, 60);

    // formal local Taylor half-iterate (asymptotic) for display alongside Phi
    const formal = solveHalfIterateSeries(gc, M);

    return {
      supported: true,
      parabolic: true,
      classification,
      fixedPoint,
      c2,
      fatouA: A,
      fatouCoeffs: trimCoeffs(p, M),
      localModelCoeffs: trimCoeffs(gc, M),
      localHalfCoeffs: formal && !formal.error ? trimCoeffs(formal.coefficients, M) : null,
      evaluator,
      target,
      note: 'Parabolic fixed point (lambda = 1): half-iterate via the Fatou/Abel coordinate, f = Phi^{-1}(Phi + 1/2). Semi-analytical and convergent near x0.',
      verification,
    };
  }

  // Dispatch: choose Schroeder (hyperbolic, lambda>0, lambda!=1) or the Fatou
  // parabolic method (lambda=1) for the chosen real fixed point.
  function solveHalfIterateAtFixedPoint(coeffs, fixedPoint, order) {
    const classification = classifyFixedPoint(coeffs, fixedPoint);
    if (classification.type === 'parabolic') {
      return solveParabolicHalfIterate(coeffs, fixedPoint, order);
    }
    return solveSchroederHalfIterate(coeffs, fixedPoint, order);
  }

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
      for (let i = 1; i <= maxI; i += 1) {
        const fi = (i < fCoeffs.length) ? fCoeffs[i] : 0;
        if (fi !== 0) result += fi * compositaRecurrence(fCoeffs, n - i, k - 1, memo);
      }
    }
    if (memo) memo.set(key, result);
    return result;
  }

  function compositaTable(fCoeffs, maxN) {
    const table = Array.from({ length: maxN + 1 }, () => []);
    for (let n = 1; n <= maxN; n += 1) {
      for (let k = 1; k <= n; k += 1) {
        if (k === 1) {
          table[n][k] = (n < fCoeffs.length) ? fCoeffs[n] : 0;
        } else if (k === n) {
          table[n][k] = Math.pow(fCoeffs[1] || 0, n);
        } else {
          let sum = 0;
          const maxI = n - k + 1;
          for (let i = 1; i <= maxI; i += 1) {
            const fi = (i < fCoeffs.length) ? fCoeffs[i] : 0;
            if (fi !== 0 && table[n - i][k - 1] !== undefined) sum += fi * table[n - i][k - 1];
          }
          table[n][k] = sum;
        }
      }
    }
    return table;
  }

  function compositionCoeffs(fTable, rCoeffs, maxN) {
    const a = new Array(maxN + 1).fill(0);
    a[0] = rCoeffs[0] || 0;
    for (let n = 1; n <= maxN; n += 1) {
      let sum = 0;
      for (let k = 1; k <= n; k += 1) sum += fTable[n][k] * (rCoeffs[k] || 0);
      a[n] = sum;
    }
    return a;
  }

  function compositaOfComposition(fTable, gTable, n, k) {
    let sum = 0;
    for (let m = k; m <= n; m += 1) {
      if (fTable[n] && fTable[n][m] && gTable[m] && gTable[m][k]) sum += fTable[n][m] * gTable[m][k];
    }
    return sum;
  }

  function solveHalfIterateSeries(coeffs, maxN) {
    const normalized = normalizeInputCoeffs(coeffs, maxN);
    if (Math.abs(normalized[0]) > EPS) {
      return { error: 'The series solver requires F(0)=0.' };
    }
    const f1 = normalized[1];
    if (f1 === undefined || f1 <= 0) {
      return { error: 'The paper-backed real series solver requires f_1 > 0.' };
    }

    const a1 = Math.sqrt(f1);
    const a = new Array(maxN + 1).fill(0);
    a[1] = a1;
    const aTable = Array.from({ length: maxN + 1 }, () => []);

    for (let n = 1; n <= maxN; n += 1) {
      for (let k = 1; k <= n; k += 1) {
        if (k === 1) {
          aTable[n][k] = a[n];
        } else if (k === n) {
          aTable[n][k] = Math.pow(a[1], n);
        } else {
          let sum = 0;
          const maxI = n - k + 1;
          for (let i = 1; i <= maxI; i += 1) {
            const ai = a[i] || 0;
            if (ai !== 0 && aTable[n - i] && aTable[n - i][k - 1] !== undefined) sum += ai * aTable[n - i][k - 1];
          }
          aTable[n][k] = sum;
        }
      }

      if (n >= 2) {
        const fn = normalized[n] || 0;
        let sumInner = 0;
        for (let m = 2; m <= n - 1; m += 1) {
          if (aTable[n][m] !== undefined && a[m] !== undefined) sumInner += aTable[n][m] * a[m];
        }
        const denom = a[1] + Math.pow(a[1], n);
        if (Math.abs(denom) < 1e-15) {
          return { error: `Division by zero at degree ${n}.` };
        }
        a[n] = (fn - sumInner) / denom;
        aTable[n][1] = a[n];
      }
    }

    const candidateCoeffs = trimCoeffs(a, maxN);
    const recomposed = iterateSeriesCoeffs(candidateCoeffs, 2, maxN);
    const residuals = [];
    for (let n = 1; n <= maxN; n += 1) residuals.push(Math.abs((recomposed[n] || 0) - (normalized[n] || 0)));

    return {
      coefficients: candidateCoeffs,
      compositaTable: aTable,
      residuals,
      maxResidual: Math.max(...residuals, 0),
      recomposed,
      depth: 1,
      note: 'Computed by the triangular composita recurrence for A(A(x)) = F(x).'
    };
  }

  function iterateSeriesCoeffs(coeffs, times, maxN) {
    let result = normalizeInputCoeffs(coeffs, maxN);
    const base = normalizeInputCoeffs(coeffs, maxN);
    if (times === 1) return result;
    for (let step = 1; step < times; step += 1) {
      result = composeSeries(base, result, maxN);
    }
    return trimCoeffs(result, maxN);
  }

  function solveIteratePowerSeries(coeffs, maxN, depth) {
    const normalized = normalizeInputCoeffs(coeffs, maxN);
    const stages = [];
    let current = normalized;
    const rounds = Math.max(1, depth || 1);
    for (let i = 0; i < rounds; i += 1) {
      const solved = solveHalfIterateSeries(current, maxN);
      if (solved.error) return solved;
      stages.push(solved);
      current = normalizeInputCoeffs(solved.coefficients, maxN);
    }
    const iterates = 2 ** rounds;
    const recomposed = iterateSeriesCoeffs(current, iterates, maxN);
    const residuals = [];
    for (let n = 1; n <= maxN; n += 1) residuals.push(Math.abs((recomposed[n] || 0) - (normalized[n] || 0)));
    return {
      coefficients: trimCoeffs(current, maxN),
      stages,
      depth: rounds,
      iterateCount: iterates,
      recomposed,
      residuals,
      maxResidual: Math.max(...residuals, 0),
      note: rounds === 1
        ? 'One paper-backed square-root step was applied.'
        : `Applied ${rounds} successive paper-backed square-root steps to model A^{2^${rounds}}(x) = F(x).`
    };
  }

  function computeOrbit(F, x0, steps) {
    const orbit = [x0];
    let x = x0;
    for (let i = 0; i < steps; i += 1) {
      x = F(x);
      orbit.push(x);
      if (!Number.isFinite(x)) break;
    }
    return orbit;
  }

  function formatNumber(value, precision) {
    if (!Number.isFinite(value)) return '∞';
    const digits = precision || 6;
    if (Math.abs(value) < 1e-12) return '0';
    const rounded = Number(value.toFixed(digits));
    return rounded.toString();
  }

  function formatPolynomialLatex(coeffs, options = {}) {
    const variable = options.variable || 'x';
    const maxDegree = options.maxDegree !== undefined ? options.maxDegree : coeffs.length - 1;
    const precision = options.precision || 6;
    const includeZero = !!options.includeZero;
    const parts = [];
    for (let i = 0; i <= maxDegree; i += 1) {
      const coeff = Number(coeffs[i] || 0);
      if (!includeZero && Math.abs(coeff) < 1e-12) continue;
      const absCoeff = Math.abs(coeff);
      let coeffText = formatNumber(absCoeff, precision);
      let term = '';
      if (i === 0) {
        term = coeffText;
      } else {
        if (Math.abs(absCoeff - 1) < 1e-12) coeffText = '';
        term = coeffText + variable;
        if (i > 1) term += `^{${i}}`;
      }
      if (parts.length === 0) {
        parts.push(coeff < 0 ? `-${term}` : term);
      } else {
        parts.push(coeff < 0 ? `- ${term}` : `+ ${term}`);
      }
    }
    return parts.length ? parts.join(' ') : '0';
  }

  function formatShiftedPolynomialLatex(coeffs, shift, options = {}) {
    const precision = options.precision || 6;
    const baseVariable = options.variable || 'x';
    const inner = `(${baseVariable} ${shift >= 0 ? '-' : '+'} ${formatNumber(Math.abs(shift), precision)})`;
    const parts = [];
    for (let i = 0; i < coeffs.length; i += 1) {
      const coeff = Number(coeffs[i] || 0);
      if (Math.abs(coeff) < 1e-12) continue;
      const absCoeff = Math.abs(coeff);
      let coeffText = formatNumber(absCoeff, precision);
      let term = '';
      if (i === 0) {
        term = coeffText;
      } else {
        if (Math.abs(absCoeff - 1) < 1e-12) coeffText = '';
        term = coeffText + inner;
        if (i > 1) term += `^{${i}}`;
      }
      if (parts.length === 0) {
        parts.push(coeff < 0 ? `-${term}` : term);
      } else {
        parts.push(coeff < 0 ? `- ${term}` : `+ ${term}`);
      }
    }
    return parts.length ? parts.join(' ') : '0';
  }

  const knownCompositae = {
    geometricSeries(n, k, a, b) {
      return binomial(n - 1, k - 1) * Math.pow(a, n - k) * Math.pow(b, k);
    },
    quadratic(n, k, a, b) {
      if (k > n || n - k > k) return 0;
      return binomial(k, n - k) * Math.pow(a, 2 * k - n) * Math.pow(b, n - k);
    },
    xExpX(n, k) {
      return Math.pow(k, n - k) / factorial(n - k);
    },
  };

  return {
    Rational,
    gcdBigInt,
    factorial,
    binomial,
    stirlingFirst,
    stirlingSecond,
    EPS,
    trimCoeffs,
    padCoeffs,
    normalizeInputCoeffs,
    addSeries,
    scaleSeries,
    multiplySeries,
    derivativeSeries,
    evalPolynomial,
    composeSeries,
    seriesPower,
    invertSeriesAroundZero,
    shiftPolynomial,
    buildShiftedModel,
    unshiftLocalSeries,
    sampleFunction,
    verifyCandidate,
    approximateRealFixedPoints,
    classifyFixedPoint,
    solveSchroederHalfIterate,
    solveParabolicHalfIterate,
    solveHalfIterateAtFixedPoint,
    compositaRecurrence,
    compositaTable,
    compositionCoeffs,
    compositaOfComposition,
    solveHalfIterateSeries,
    solveIteratePowerSeries,
    iterateSeriesCoeffs,
    computeOrbit,
    formatPolynomialLatex,
    formatShiftedPolynomialLatex,
    formatNumber,
    polynomialFromRoots,
    knownCompositae,
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Engine;
}
