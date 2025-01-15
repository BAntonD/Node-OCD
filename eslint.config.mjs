import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // зберігаємо підтримку для Node.js
        ...globals.browser, // додаємо підтримку для браузерних глобальних змінних
        ...globals.mocha, // додаємо підтримку для глобальних змінних Mocha
      },
    },
    rules: {
      'no-unused-vars': 'warn', // Попередження для невикористаних змінних
    },
  },
  pluginJs.configs.recommended,
];
