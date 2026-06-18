// Flat ESLint config (ESLint v9+). Build-less vanilla browser JS.
// Engine.js is loaded as a plain <script> (IIFE, not an ES module),
// so sourceType is 'script' and browser globals are assumed.
const js = require('@eslint/js');
const globals = require('globals');
const prettier = require('eslint-config-prettier');

module.exports = [
  { ignores: ['node_modules/**', 'resources/**', 'visuals/**'] },
  js.configs.recommended,
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022, // BigInt literals (1n) are used in Rational
      sourceType: 'script',
      globals: {
        ...globals.browser,
        MathJax: 'readonly',
        // engine.js has a CommonJS export fallback (typeof module guard)
        module: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },
  prettier, // turn off rules that conflict with Prettier formatting
];
