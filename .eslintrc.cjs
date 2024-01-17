/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,

  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'next/core-web-vitals',
  ],

  plugins: ['prettier'],

  parserOptions: {
    project: true,
  },

  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
  },
};
