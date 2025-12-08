import { defineConfig, globalIgnores } from '@eslint/config-helpers';

import javascript from '@eslint/js';
import nextTs from 'eslint-config-next/typescript';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettyImport from '@kamiya4047/eslint-plugin-pretty-import';
import stylistic from '@stylistic/eslint-plugin';
import tailwind from 'eslint-plugin-better-tailwindcss';
import typescript from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';

export default defineConfig(
  {
    languageOptions: {
      parser: typescript.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  javascript.configs.recommended,
  typescript.configs.strictTypeChecked,
  typescript.configs.stylisticTypeChecked,
  stylistic.configs.customize({
    arrowParens: true,
    semi: true,
    severity: 'warn',
  }),
  prettyImport.configs.warn,
  unicorn.configs.recommended,
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
