import { defineConfig } from '@eslint/config-helpers';

import globals from 'globals';
import js from '@   eslint/js';
import prettyImport from '@kamiya4047/eslint-plugin-pretty-import';
import react from 'eslint-plugin-react';
import stylistic from '@stylistic/eslint-plugin';
import tailwind from 'eslint-plugin-better-tailwindcss';
import ts from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';

import * as tsParser from '@typescript-eslint/parser';

export default defineConfig(
  {
    name: 'parser',
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  js.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  stylistic.configs.customize({
    arrowParens: true,
    semi: true,
    severity: 'warn',
  }),
  prettyImport.configs.warn,
  unicorn.configs.recommended,
  ...(react.configs.flat.recommended ? [react.configs.flat.recommended] : []),
  ...(react.configs.flat['jsx-runtime'] ? [react.configs.flat['jsx-runtime']] : []),
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    name: 'better-tailwindcss',
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'better-tailwindcss': tailwind,
    },
    rules: tailwind.configs['recommended-warn']?.rules ?? {},
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
      },
    },
  },
  {
    name: 'disable',
    rules: {
      'sort-imports': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-keyword-prefix': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-global-this': 'off',
      'react/prop-types': 'off',
      'better-tailwindcss/no-unregistered-classes': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-unresolved': 'off',
    },
  },
);
