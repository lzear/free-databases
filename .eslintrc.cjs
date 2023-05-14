module.exports = {
  extends: [
    'plugin:markdown/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'import/order': 0,
    'jsx-quotes': 2,
    'object-shorthand': 2,
    'react/jsx-curly-brace-presence': [2, 'never'],
    'react/self-closing-comp': 2,
    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,
    'unicorn/no-null': 0,
    'unicorn/prevent-abbreviations': [
      2,
      {
        allowList: {
          dev: true,
          env: true,
          props: true,
          Props: true,
          e2e: true,
        },
      },
    ],
  },
}
