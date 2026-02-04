(() => {
  const algorithmRegistry = new Map();

  const registerAlgorithm = (name, handler, metadata = {}) => {
    if (!name || typeof name !== 'string') {
      throw new Error('Algorithm name must be a non-empty string.');
    }
    algorithmRegistry.set(name, { handler, metadata });
  };

  const getAlgorithm = (name) => algorithmRegistry.get(name)?.handler;

  const listAlgorithms = () => Array.from(algorithmRegistry.keys());

  const numericalHalfIterate = (() => {
    const memo = new Map();

    const computeF = (x, iterations) => {
      const key = `${x}-${iterations}`;
      if (memo.has(key)) {
        return memo.get(key);
      }

      if (iterations <= 0) {
        const baseValue = Math.pow(Math.abs(x), Math.sqrt(2));
        memo.set(key, baseValue);
        return baseValue;
      }

      const nextX = x * x + 1;
      const fOfNext = computeF(nextX, iterations - 1);
      const resultSquared = fOfNext - 1;
      if (resultSquared < 0) {
        memo.set(key, NaN);
        return NaN;
      }
      const result = Math.sqrt(resultSquared);
      memo.set(key, result);
      return result;
    };

    const createSeries = (xValues, iterations) => {
      memo.clear();
      return xValues.map((x) => computeF(x, iterations));
    };

    return {
      computeF,
      createSeries,
      reset: () => memo.clear(),
    };
  })();

  const compositaSolver = (() => {
    const memoComposita = new Map();

    const factorial = (num) => {
      if (num < 0) return NaN;
      if (num === 0) return 1;
      let result = 1;
      for (let i = 2; i <= num; i += 1) {
        result *= i;
      }
      return result;
    };

    const combination = (n, k) => {
      if (k < 0 || k > n) return 0;
      if (k === 0 || k === n) return 1;
      let safeK = k;
      if (safeK > n / 2) safeK = n - safeK;
      let res = 1;
      for (let i = 1; i <= safeK; i += 1) {
        res = (res * (n - i + 1)) / i;
      }
      return res;
    };

    const FComposita = (n, k, a, b) => {
      if (k > n) return 0;
      const coeff = combination(k, n - k);
      return coeff * Math.pow(a, 2 * k - n) * Math.pow(b, n - k);
    };

    const computeAComposita = (n, k, f1, a, b) => {
      const key = `${n},${k}`;
      if (memoComposita.has(key)) return memoComposita.get(key);

      if (n === k) {
        const baseValue = Math.pow(f1, n / 2);
        memoComposita.set(key, baseValue);
        return baseValue;
      }
      if (n < k) {
        memoComposita.set(key, 0);
        return 0;
      }

      let sumTerm = 0;
      for (let m = k + 1; m < n; m += 1) {
        sumTerm +=
          computeAComposita(n, m, f1, a, b) *
          computeAComposita(m, k, f1, a, b);
      }

      const denominator = Math.pow(f1, n / 2) + Math.pow(f1, k / 2);
      const result = (FComposita(n, k, a, b) - sumTerm) / denominator;
      memoComposita.set(key, result);
      return result;
    };

    const computeCoefficients = (maxDegree, f1, a, b) => {
      memoComposita.clear();
      const coefficients = [];
      for (let n = 1; n <= maxDegree; n += 1) {
        coefficients.push(computeAComposita(n, 1, f1, a, b));
      }
      return coefficients;
    };

    const evaluatePolynomial = (coefficients, x) =>
      coefficients.reduce((sum, coeff, index) => sum + coeff * Math.pow(x, index + 1), 0);

    return {
      factorial,
      computeCoefficients,
      evaluatePolynomial,
      reset: () => memoComposita.clear(),
    };
  })();

  registerAlgorithm('numericalHalfIterate', numericalHalfIterate, {
    description: 'Numerical approximation for f(f(x)) = x^2 + 1.',
    inputs: ['xValues', 'iterations'],
  });

  registerAlgorithm('compositaSolver', compositaSolver, {
    description: "Composita calculator for A(A(x)) = ax^2 + bx.",
    inputs: ['f1', 'a', 'b', 'maxDegree'],
  });

  registerAlgorithm('futureSolverTemplate', () => ({}), {
    description: 'Placeholder for future equation solvers.',
    inputs: [],
  });

  window.CalculatorEngine = {
    registerAlgorithm,
    getAlgorithm,
    listAlgorithms,
  };
})();
