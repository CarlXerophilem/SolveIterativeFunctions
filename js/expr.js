/**
 * Elementary-expression parser + evaluator for the solver.
 *
 * Parses a single-variable expression in x (e.g. "x^2 - x + 1", "sin(x)",
 * "exp(x)-1", "x/(1-x)", "2x(1-x)") and evaluates it either
 *   - numerically:            Expr.evalNumber(node, x)
 *   - as a truncated Taylor:  Expr.taylor(node, center, order)   // jet AD
 *   - as KaTeX:               Expr.toLatex(node)
 *
 * The Taylor evaluation runs the expression in the ring of truncated power
 * series R[t]/(t^{order+1}) with x = center + t, which gives the Taylor
 * coefficients of F at `center` directly — exactly what the half-iterate
 * engine consumes (Taylor at 0 for paper mode, Taylor at x0 for analytic mode).
 *
 * Loaded as a plain <script> exposing the global `Expr` (and module.exports
 * for Node tests). No dependencies.
 */
const Expr = (() => {
  'use strict';

  const FUNCS = {
    sin: 1, cos: 1, tan: 1, asin: 1, acos: 1, atan: 1,
    sinh: 1, cosh: 1, tanh: 1, exp: 1, ln: 1, log: 1, log10: 1,
    sqrt: 1, cbrt: 1, abs: 1,
  };
  const CONSTS = { pi: Math.PI, e: Math.E, tau: 2 * Math.PI };

  // ---------------- Tokenizer ----------------
  function tokenize(str) {
    const tokens = [];
    let i = 0;
    const s = str;
    const isDigit = (c) => c >= '0' && c <= '9';
    const isAlpha = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
    while (i < s.length) {
      const c = s[i];
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r') { i += 1; continue; }
      if (isDigit(c) || (c === '.' && isDigit(s[i + 1]))) {
        let j = i + 1;
        while (j < s.length && (isDigit(s[j]) || s[j] === '.')) j += 1;
        if (s[j] === 'e' || s[j] === 'E') { j += 1; if (s[j] === '+' || s[j] === '-') j += 1; while (j < s.length && isDigit(s[j])) j += 1; }
        tokens.push({ t: 'num', v: parseFloat(s.slice(i, j)) });
        i = j;
        continue;
      }
      if (isAlpha(c)) {
        let j = i + 1;
        while (j < s.length && (isAlpha(s[j]) || isDigit(s[j]))) j += 1;
        const name = s.slice(i, j).toLowerCase();
        if (FUNCS[name]) tokens.push({ t: 'func', v: name });
        else if (name === 'x') tokens.push({ t: 'var' });
        else if (CONSTS[name] !== undefined) tokens.push({ t: 'const', v: name });
        else throw new Error('Unknown name: ' + name);
        i = j;
        continue;
      }
      if ('+-*/^(),'.indexOf(c) >= 0) { tokens.push({ t: c }); i += 1; continue; }
      throw new Error('Unexpected character: ' + c);
    }
    tokens.push({ t: 'eof' });
    return tokens;
  }

  // ---------------- Parser (recursive descent, implicit multiplication) ----------------
  function parse(str) {
    let toks;
    try { toks = tokenize(str); } catch (e) { return { error: e.message }; }
    let pos = 0;
    const peek = () => toks[pos];
    const next = () => toks[pos++];
    const startsPrimary = (tk) => tk.t === 'num' || tk.t === 'var' || tk.t === 'const' || tk.t === 'func' || tk.t === '(';

    function parseExpr() { // + -
      let node = parseTerm();
      while (peek().t === '+' || peek().t === '-') { const op = next().t; node = { type: 'bin', op, l: node, r: parseTerm() }; }
      return node;
    }
    function parseTerm() { // * / and implicit multiplication
      let node = parseUnary();
      for (;;) {
        const tk = peek();
        if (tk.t === '*' || tk.t === '/') { const op = next().t; node = { type: 'bin', op, l: node, r: parseUnary() }; }
        else if (startsPrimary(tk)) { node = { type: 'bin', op: '*', l: node, r: parseUnary() }; } // juxtaposition
        else break;
      }
      return node;
    }
    function parseUnary() {
      if (peek().t === '-') { next(); return { type: 'neg', x: parseUnary() }; }
      if (peek().t === '+') { next(); return parseUnary(); }
      return parsePow();
    }
    function parsePow() { // right associative; exponent allows unary
      const base = parsePrimary();
      if (peek().t === '^') { next(); return { type: 'bin', op: '^', l: base, r: parseUnary() }; }
      return base;
    }
    function parsePrimary() {
      const tk = next();
      if (tk.t === 'num') return { type: 'num', v: tk.v };
      if (tk.t === 'var') return { type: 'var' };
      if (tk.t === 'const') return { type: 'const', v: tk.v };
      if (tk.t === 'func') {
        if (peek().t !== '(') throw new Error('Expected ( after ' + tk.v);
        next();
        const arg = parseExpr();
        if (peek().t !== ')') throw new Error('Expected ) in ' + tk.v + '()');
        next();
        return { type: 'call', name: tk.v, arg };
      }
      if (tk.t === '(') {
        const e = parseExpr();
        if (peek().t !== ')') throw new Error('Expected )');
        next();
        return e;
      }
      throw new Error('Unexpected token: ' + (tk.t === 'eof' ? 'end of input' : tk.t));
    }

    try {
      const node = parseExpr();
      if (peek().t !== 'eof') return { error: 'Unexpected trailing input' };
      return { node };
    } catch (e) {
      return { error: e.message };
    }
  }

  // ---------------- Numeric evaluation ----------------
  const NUMFN = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan,
    sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh, exp: Math.exp,
    ln: Math.log, log: Math.log, log10: Math.log10, sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs,
  };
  function evalNumber(node, x) {
    switch (node.type) {
      case 'num': return node.v;
      case 'const': return CONSTS[node.v];
      case 'var': return x;
      case 'neg': return -evalNumber(node.x, x);
      case 'call': return NUMFN[node.name](evalNumber(node.arg, x));
      case 'bin': {
        const a = evalNumber(node.l, x);
        const b = evalNumber(node.r, x);
        switch (node.op) { case '+': return a + b; case '-': return a - b; case '*': return a * b; case '/': return a / b; case '^': return Math.pow(a, b); default: return NaN; }
      }
      default: return NaN;
    }
  }

  // ---------------- Truncated power-series (jet) evaluation ----------------
  function sConst(c, N) { const a = new Array(N + 1).fill(0); a[0] = c; return a; }
  function sAddSub(a, b, sign) { const N = a.length - 1; const o = new Array(N + 1); for (let i = 0; i <= N; i += 1) o[i] = a[i] + sign * b[i]; return o; }
  function sMul(a, b) { const N = a.length - 1; const o = new Array(N + 1).fill(0); for (let i = 0; i <= N; i += 1) { if (!a[i]) continue; for (let j = 0; i + j <= N; j += 1) { if (!b[j]) continue; o[i + j] += a[i] * b[j]; } } return o; }
  function sDiv(a, b) { const N = a.length - 1; if (Math.abs(b[0]) < 1e-300) throw new Error('Division by zero in series (constant term 0)'); const o = new Array(N + 1).fill(0); for (let n = 0; n <= N; n += 1) { let s = a[n]; for (let k = 1; k <= n; k += 1) s -= b[k] * o[n - k]; o[n] = s / b[0]; } return o; }
  function sExp(a) { const N = a.length - 1; const e = new Array(N + 1).fill(0); e[0] = Math.exp(a[0]); for (let n = 1; n <= N; n += 1) { let s = 0; for (let k = 1; k <= n; k += 1) s += k * a[k] * e[n - k]; e[n] = s / n; } return e; }
  function sLog(a) { const N = a.length - 1; if (a[0] <= 0) throw new Error('log of a series with non-positive constant term'); const l = new Array(N + 1).fill(0); l[0] = Math.log(a[0]); for (let n = 1; n <= N; n += 1) { let s = n * a[n]; for (let k = 1; k <= n - 1; k += 1) s -= k * l[k] * a[n - k]; l[n] = s / (n * a[0]); } return l; }
  function sSinCos(a) { const N = a.length - 1; const s = new Array(N + 1).fill(0); const c = new Array(N + 1).fill(0); s[0] = Math.sin(a[0]); c[0] = Math.cos(a[0]); for (let n = 1; n <= N; n += 1) { let ss = 0; let cc = 0; for (let k = 1; k <= n; k += 1) { ss += k * a[k] * c[n - k]; cc += k * a[k] * s[n - k]; } s[n] = ss / n; c[n] = -cc / n; } return { s, c }; }
  function sSqrt(a) { const N = a.length - 1; if (a[0] <= 0) throw new Error('sqrt of a series with non-positive constant term'); const r = new Array(N + 1).fill(0); r[0] = Math.sqrt(a[0]); for (let n = 1; n <= N; n += 1) { let s = a[n]; for (let k = 1; k <= n - 1; k += 1) s -= r[k] * r[n - k]; r[n] = s / (2 * r[0]); } return r; }
  function sPowInt(a, p) { let r = sConst(1, a.length - 1); let base = a; let e = p; while (e > 0) { if (e & 1) r = sMul(r, base); e >>= 1; if (e) base = sMul(base, base); } return r; }
  function sPow(a, pSeries) {
    // exponent must be x-independent for a closed series power
    const N = a.length - 1;
    const constExp = pSeries.every((v, idx) => idx === 0 || Math.abs(v) < 1e-14);
    if (!constExp) { return sExp(sMul(pSeries, sLog(a))); } // general a^b, needs a[0]>0
    const p = pSeries[0];
    if (Number.isInteger(p) && p >= 0) return sPowInt(a, p);
    if (Number.isInteger(p) && p < 0) return sDiv(sConst(1, N), sPowInt(a, -p));
    return sExp(sMul(sConst(p, N), sLog(a))); // fractional power, needs a[0]>0
  }
  function sFunc(name, a) {
    switch (name) {
      case 'exp': return sExp(a);
      case 'ln': case 'log': return sLog(a);
      case 'log10': return sLog(a).map((v) => v / Math.LN10);
      case 'sqrt': return sSqrt(a);
      case 'sin': return sSinCos(a).s;
      case 'cos': return sSinCos(a).c;
      case 'tan': { const sc = sSinCos(a); return sDiv(sc.s, sc.c); }
      case 'sinh': { const ep = sExp(a); const em = sExp(a.map((v) => -v)); return sAddSub(ep, em, -1).map((v) => v / 2); }
      case 'cosh': { const ep = sExp(a); const em = sExp(a.map((v) => -v)); return sAddSub(ep, em, 1).map((v) => v / 2); }
      case 'tanh': { const ep = sExp(a); const em = sExp(a.map((v) => -v)); return sDiv(sAddSub(ep, em, -1), sAddSub(ep, em, 1)); }
      case 'atan': { // d/dt atan(u) = u'/(1+u^2) ; integrate
        const N = a.length - 1; const denom = sAddSub(sConst(1, N), sMul(a, a), 1); const da = deriv(a); const q = sDiv(da, denom); const out = integrate(q); out[0] = Math.atan(a[0]); return out;
      }
      case 'asin': { const N = a.length - 1; const denom = sSqrt(sAddSub(sConst(1, N), sMul(a, a), -1)); const q = sDiv(deriv(a), denom); const out = integrate(q); out[0] = Math.asin(a[0]); return out; }
      case 'acos': { const N = a.length - 1; const denom = sSqrt(sAddSub(sConst(1, N), sMul(a, a), -1)); const q = sDiv(deriv(a), denom).map((v) => -v); const out = integrate(q); out[0] = Math.acos(a[0]); return out; }
      case 'cbrt': { if (Math.abs(a[0]) < 1e-300) throw new Error('cbrt of a series with zero constant term'); return sExp(sMul(sConst(1 / 3, a.length - 1), sLog(a.map((v, i) => (i === 0 ? Math.abs(v) : v))))).map((v, i) => (a[0] < 0 && i === 0 ? -v : a[0] < 0 ? v : v)); }
      case 'abs': { if (Math.abs(a[0]) < 1e-300) throw new Error('abs is not differentiable at 0'); return a[0] < 0 ? a.map((v) => -v) : a.slice(); }
      default: throw new Error('Function not supported in series mode: ' + name);
    }
  }
  function deriv(a) { const N = a.length - 1; const o = new Array(N + 1).fill(0); for (let i = 1; i <= N; i += 1) o[i - 1] = i * a[i]; return o; }
  function integrate(a) { const N = a.length - 1; const o = new Array(N + 1).fill(0); for (let i = 0; i < N; i += 1) o[i + 1] = a[i] / (i + 1); return o; }

  function evalSeries(node, N, center) {
    switch (node.type) {
      case 'num': return sConst(node.v, N);
      case 'const': return sConst(CONSTS[node.v], N);
      case 'var': { const a = sConst(center, N); if (N >= 1) a[1] = 1; return a; }
      case 'neg': return evalSeries(node.x, N, center).map((v) => -v);
      case 'call': return sFunc(node.name, evalSeries(node.arg, N, center));
      case 'bin': {
        const a = evalSeries(node.l, N, center);
        const b = evalSeries(node.r, N, center);
        switch (node.op) {
          case '+': return sAddSub(a, b, 1);
          case '-': return sAddSub(a, b, -1);
          case '*': return sMul(a, b);
          case '/': return sDiv(a, b);
          case '^': return sPow(a, b);
          default: throw new Error('bad operator');
        }
      }
      default: throw new Error('bad node');
    }
  }

  // Taylor coefficients [c0..cOrder] of F at `center`: F(center+t)=sum c_k t^k
  function taylor(node, center, order) {
    return evalSeries(node, order, center);
  }

  // ---------------- LaTeX ----------------
  const FUNCTEX = { sin: '\\sin', cos: '\\cos', tan: '\\tan', asin: '\\arcsin', acos: '\\arccos', atan: '\\arctan', sinh: '\\sinh', cosh: '\\cosh', tanh: '\\tanh', ln: '\\ln', log: '\\ln', log10: '\\log_{10}', sqrt: 'sqrt', cbrt: 'cbrt', abs: 'abs', exp: 'exp' };
  const PREC = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 4, neg: 3 };
  function nodePrec(n) { if (n.type === 'bin') return PREC[n.op]; if (n.type === 'neg') return PREC.neg; return 10; }
  function num2tex(v) { if (v === Math.PI) return '\\pi'; const r = Number(v.toPrecision(12)); return String(r); }
  function toLatex(node) {
    switch (node.type) {
      case 'num': return num2tex(node.v);
      case 'const': return node.v === 'pi' ? '\\pi' : node.v === 'tau' ? '\\tau' : node.v;
      case 'var': return 'x';
      case 'neg': { const inner = toLatex(node.x); return '-' + (nodePrec(node.x) < PREC.neg ? '(' + inner + ')' : inner); }
      case 'call': {
        const inner = toLatex(node.arg);
        if (node.name === 'sqrt') return '\\sqrt{' + inner + '}';
        if (node.name === 'cbrt') return '\\sqrt[3]{' + inner + '}';
        if (node.name === 'exp') return 'e^{' + inner + '}';
        if (node.name === 'abs') return '\\left|' + inner + '\\right|';
        return FUNCTEX[node.name] + '\\!\\left(' + inner + '\\right)';
      }
      case 'bin': {
        if (node.op === '/') return '\\dfrac{' + toLatex(node.l) + '}{' + toLatex(node.r) + '}';
        if (node.op === '^') {
          const b = toLatex(node.l);
          const wrap = nodePrec(node.l) < PREC['^'] || node.l.type === 'num' && node.l.v < 0;
          return (wrap ? '\\left(' + b + '\\right)' : b) + '^{' + toLatex(node.r) + '}';
        }
        const opTex = node.op === '*' ? ' \\cdot ' : ' ' + node.op + ' ';
        const lt = toLatex(node.l);
        const rt = toLatex(node.r);
        const lw = nodePrec(node.l) < nodePrec(node) ? '\\left(' + lt + '\\right)' : lt;
        const rw = nodePrec(node.r) < nodePrec(node) || (node.op === '-' && nodePrec(node.r) === nodePrec(node)) ? '\\left(' + rt + '\\right)' : rt;
        return lw + opTex + rw;
      }
      default: return '';
    }
  }

  // convenience: parse once, return helpers
  function compile(str) {
    const r = parse(str);
    if (r.error) return { error: r.error };
    const node = r.node;
    return {
      node,
      fn: (x) => evalNumber(node, x),
      taylor: (center, order) => taylor(node, center, order),
      latex: toLatex(node),
    };
  }

  return { parse, evalNumber, taylor, toLatex, compile, FUNCS, CONSTS };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Expr;
}
