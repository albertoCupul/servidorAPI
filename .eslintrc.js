module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
  },
  rules: {
    strict: 0,
    'eslint no-underscore-dangle': 'off',
    'no-underscore-dangle': 'off',
  },
};
