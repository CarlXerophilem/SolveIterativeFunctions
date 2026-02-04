document.addEventListener('DOMContentLoaded', () => {
  const renderKatex = () => {
    document.querySelectorAll('.katex-inline, .katex-display').forEach((el) => {
      katex.render(el.getAttribute('data-expr'), el, {
        throwOnError: false,
        displayMode: el.classList.contains('katex-display'),
      });
    });
  };

  renderKatex();

  const numericalAlgorithm = window.CalculatorEngine.getAlgorithm('numericalHalfIterate');
  const compositaAlgorithm = window.CalculatorEngine.getAlgorithm('compositaSolver');

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'x' },
      },
      y: {
        title: { display: true, text: 'y' },
      },
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `(${context.parsed.x.toFixed(2)}, ${context.parsed.y.toFixed(2)})`;
            }
            return label;
          },
        },
      },
    },
  };

  const xValues = Array.from({ length: 101 }, (_, i) => (i - 50) * 0.1);

  const x0Input = document.getElementById('x0_input');
  const orbitTable = document.getElementById('orbit-table');

  const updateOrbitTable = () => {
    let x = parseFloat(x0Input.value);
    if (Number.isNaN(x)) return;

    orbitTable.innerHTML = '';
    for (let i = 0; i <= 5; i += 1) {
      const row = document.createElement('tr');
      row.className = 'border-b';
      const cell1 = document.createElement('td');
      cell1.className = 'py-2';
      cell1.textContent = i;
      const cell2 = document.createElement('td');
      cell2.className = 'py-2';
      cell2.textContent = x.toExponential(4);
      row.appendChild(cell1);
      row.appendChild(cell2);
      orbitTable.appendChild(row);
      x = x * x + 1;
    }
  };

  x0Input.addEventListener('input', updateOrbitTable);
  updateOrbitTable();

  const iterationsSlider = document.getElementById('iterations-slider');
  const iterationsLabel = document.getElementById('iterations-label');
  const numericalCtx = document.getElementById('numericalSolutionChart').getContext('2d');
  let numericalChart;

  const updateNumericalChart = () => {
    const iterations = parseInt(iterationsSlider.value, 10);
    iterationsLabel.textContent = iterations;

    const fData = numericalAlgorithm.createSeries(xValues, iterations);

    if (numericalChart) {
      numericalChart.data.datasets[1].data = fData;
      numericalChart.update();
    } else {
      numericalChart = new Chart(numericalCtx, {
        type: 'line',
        data: {
          labels: xValues.map((x) => x.toFixed(1)),
          datasets: [
            {
              label: 'F(x) = x² + 1',
              data: xValues.map((x) => x * x + 1),
              borderColor: 'rgb(249, 115, 22)',
              tension: 0.1,
              pointRadius: 0,
            },
            {
              label: 'Approximated f(x)',
              data: fData,
              borderColor: 'rgb(22, 163, 74)',
              tension: 0.1,
              pointRadius: 0,
            },
          ],
        },
        options: chartOptions,
      });
    }
  };

  iterationsSlider.addEventListener('input', updateNumericalChart);
  updateNumericalChart();

  let compositaChart;
  const compositaXValues = Array.from({ length: 101 }, (_, i) => (i - 50) * 0.1);

  const plotCompositaChart = (coefficients, a, b) => {
    const inputYValues = compositaXValues.map((x) => a * x * x + b * x);
    const solutionYValues = compositaXValues.map((x) =>
      compositaAlgorithm.evaluatePolynomial(coefficients, x)
    );

    const compositaCtx = document.getElementById('compositaChart').getContext('2d');
    if (compositaChart) {
      compositaChart.data.datasets[0].data = inputYValues;
      compositaChart.data.datasets[1].data = solutionYValues;
      compositaChart.update();
    } else {
      compositaChart = new Chart(compositaCtx, {
        type: 'line',
        data: {
          labels: compositaXValues.map((x) => x.toFixed(1)),
          datasets: [
            {
              label: 'F(x) = ax² + bx',
              data: inputYValues,
              borderColor: 'rgb(59, 130, 246)',
              tension: 0.1,
              pointRadius: 0,
            },
            {
              label: 'Solution A(x)',
              data: solutionYValues,
              borderColor: 'rgb(22, 163, 74)',
              tension: 0.1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...chartOptions,
          scales: {
            x: { title: { display: true, text: 'x' } },
            y: { title: { display: true, text: 'y' } },
          },
        },
      });
    }
  };

  window.calculateComposita = () => {
    const input = document.getElementById('compositaInput').value;
    const [f1, a, b, maxDegree] = input.split(',').map(Number);

    const inputLatexEl = document.getElementById('inputLatex');
    const solutionLatexEl = document.getElementById('solutionLatex');

    if (Number.isNaN(f1) || Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(maxDegree) || maxDegree <= 0) {
      inputLatexEl.textContent = '';
      solutionLatexEl.textContent =
        'Invalid input. Please use valid numbers and a positive integer for maxDegree.';
      return;
    }

    inputLatexEl.setAttribute('data-expr', `F(x) = ${a}x^2 + ${b}x`);

    const coefficients = compositaAlgorithm.computeCoefficients(maxDegree, f1, a, b);

    let solutionLatex = 'A(x) = ';
    if (coefficients.length > 0) {
      solutionLatex += coefficients
        .map((c, i) => `${c.toFixed(4)}x^{${i + 1}}`)
        .join(' + ');
    } else {
      solutionLatex += 'Coefficients could not be calculated.';
    }

    solutionLatexEl.setAttribute('data-expr', solutionLatex);
    renderKatex();
    plotCompositaChart(coefficients, a, b);
  };

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const headerHeight = document.getElementById('header').offsetHeight;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 20;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});
