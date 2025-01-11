import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Для бекенду
        ...globals.browser, // Додаємо середовище браузера
      },
    },
  },
  pluginJs.configs.recommended,
];
