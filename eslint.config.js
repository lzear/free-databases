import js from '@eslint/js'
import eslintTypescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import n from 'eslint-plugin-n'
import nodeImport from 'eslint-plugin-node-import'
import preferArrow from 'eslint-plugin-prefer-arrow'
import prettier from 'eslint-plugin-prettier'
// import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwindcss from 'eslint-plugin-tailwindcss'
import testingLibrary from 'eslint-plugin-testing-library'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

const configs = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '.git/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },

    plugins: {
      'prefer-arrow': preferArrow,
      'node-import': nodeImport,
      // import: eslintImport,
      // promise,
      // sonarjs,
      unicorn,
      n,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      // ...eslintImport.configs.recommended.rules,

      ...n.configs.recommended.rules,

      'node-import/prefer-node-protocol': 2,

      'prefer-arrow/prefer-arrow-functions': [
        2,
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],

      // ...promise.configs.recommended.rules,

      'simple-import-sort/imports': 2,
      'simple-import-sort/exports': 2,

      // ...sonarjs.configs.recommended.rules,

      ...unicorn.configs.recommended.rules,
    },
  },
  {
    rules: {
      'n/no-missing-import': 0, // false positives
      'n/hashbang': [2, { additionalExecutables: ['migrate.ts'] }],
      'prefer-const': 2,
      'unicorn/no-abusive-eslint-disable': 0,
      'unicorn/no-null': 0,
      'unicorn/number-literal-case': 0, // conflicts with prettier
      'unicorn/prevent-abbreviations': [0, { checkProperties: true }],
    },
  },
  {
    plugins: { prettier },
    // @ts-expect-error - no types
    rules: prettier.configs.recommended.rules,
  },

  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': eslintTypescript,
    },

    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
    rules: eslintTypescript.configs.recommended.rules,
  },
  {
    files: ['**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'],

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      // react,
      tailwindcss,
    },

    rules: {
      // ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...tailwindcss.configs.recommended.rules,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: [
      '**/test/*.js',
      '**/test/*.ts',
      '**/test/*.jsx',
      '**/test/*.tsx',
      '**/*.test.js',
      '**/*.test.ts',
      '**/*.test.jsx',
      '**/*.test.tsx',
    ],

    plugins: {
      'testing-library': testingLibrary,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },

    rules: testingLibrary.configs.react.rules,
  },
]

export default configs
