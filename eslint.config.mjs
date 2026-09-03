import path from 'node:path';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import markdown from '@eslint/markdown';
import typescriptParser from '@typescript-eslint/parser';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import jestFormatting from 'eslint-plugin-jest-formatting';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import tailwindcss from 'eslint-plugin-tailwindcss';
import testingLibrary from 'eslint-plugin-testing-library';
import unusedImports from 'eslint-plugin-unused-imports';

import prettierOptions from './prettier.config.js';

const testFiles = ['**/*.test.{ts,tsx}', '**/{__tests__,__mocks__}/**/*.{js,mjs,ts,tsx}'];
const typeScriptFiles = ['**/*.ts', '**/*.tsx'];
const storyFiles = ['**/*.stories.*'];
const codeFiles = ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'];

const nextConfig = fixupConfigRules(nextCoreWebVitals).map(configItem =>
  configItem.ignores || configItem.files ? configItem : { ...configItem, files: codeFiles }
);
const jestRecommended = jest.configs['flat/recommended'];
const jestDomRecommended = jestDom.configs['flat/recommended'];
const testingLibraryReact = testingLibrary.configs['flat/react'];
const playwrightRecommended = playwright.configs['flat/recommended'];
const jestFormattingRules = jestFormatting.configs.recommended.overrides[0].rules;
const compatibleJestFormatting = fixupPluginRules(jestFormatting);

const config = [
  {
    ignores: [
      '**/node_modules/**',
      '.next/**',
      '.swc/**',
      '.turbo/**',
      'build/**',
      'coverage/**',
      'out/**',
      'storybook-static/**',
      'junit.xml',
      'next-env.d.ts',
      'typings/global.d.ts',
    ],
  },
  ...nextConfig,
  tailwindcss.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    files: codeFiles,
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
      tailwindcss,
      'unused-imports': unusedImports,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': ['warn', prettierOptions],
      'import/extensions': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'react/destructuring-assignment': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/enforces-negative-arbitrary-values': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
      },
      tailwindcss: {
        cssConfigPath: 'src/styles/globals.css',
      },
    },
  },
  {
    files: typeScriptFiles,
    languageOptions: {
      parserOptions: {
        project: path.join(import.meta.dirname, 'tsconfig.json'),
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'class-methods-use-this': 'off',
      'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: testFiles,
    languageOptions: jestRecommended.languageOptions,
    plugins: {
      ...jestRecommended.plugins,
      ...jestDomRecommended.plugins,
      ...testingLibraryReact.plugins,
      'jest-formatting': compatibleJestFormatting,
    },
    rules: {
      ...jestRecommended.rules,
      ...jestDomRecommended.rules,
      ...testingLibraryReact.rules,
      ...jestFormattingRules,
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
  {
    ...playwrightRecommended,
    files: ['**/*.spec.ts'],
  },
  {
    files: storyFiles,
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
  ...markdown.configs.recommended,
  {
    files: ['**/*.md'],
    rules: {
      'markdown/no-html': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/no-unescaped-entities': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
          message:
            'Default React import is unnecessary with the TypeScript JSX transform. Use named imports instead.',
        },
        {
          selector: "ImportDeclaration[source.value='react'] :matches(ImportNamespaceSpecifier)",
          message: 'Import the specific React exports that are needed instead of the namespace.',
        },
      ],
    },
  },
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': 'off',
      'react/function-component-definition': 'off',
      'simple-import-sort/exports': 'off',
      'simple-import-sort/imports': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/enforces-canonical-classname': 'off',
    },
  },
];

export default config;
