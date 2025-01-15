import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // зберігаємо підтримку для Node.js
        ...globals.browser, // додаємо підтримку для браузерних глобальних змінних
      },
    },
    plugins: {
      prettier: prettierPlugin, // Підключення плагіна Prettier
    },
    rules: {
      'prettier/prettier': 'error', // Вмикає перевірку Prettier через ESLint
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
  pluginJs.configs.recommended,
  prettierConfig,
];
