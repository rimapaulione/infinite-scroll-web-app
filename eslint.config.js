import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist'],
  },

  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettier.configs.recommended.rules,

      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'react/react-in-jsx-scope': 'off',
    },
  },

  configPrettier,
];
