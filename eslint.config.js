// @ts-check
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import unicorn from 'eslint-plugin-unicorn';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginImport from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // для recommended
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts'], // добавляем ограничение
  })),

  // для stylistic
  ...tseslint.configs.stylistic.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),

  // для angular tsRecommended
  ...angular.configs.tsRecommended.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),

  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
    },
    plugins: {
      unicorn,
      perfectionist,
      import: eslintPluginImport,
    },
    rules: {
      // Angular-specific
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      // TS
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          arrayLiteralTypeAssertions: 'never',
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [0, -1, 1],
          ignoreArrayIndexes: true,
          ignoreClassFieldInitialValues: true,
        },
      ],
      // Unicorn
      'unicorn/prevent-abbreviations': ['error', { allowList: { env: true } }],
      'unicorn/no-null': 'off',
      // Import
      'import/no-cycle': 'error',
      'import/named': 'off',
      // Perfectionist
      'perfectionist/sort-objects': 'error',
      // Misc
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      'max-lines-per-function': [
        'error',
        { max: 40, skipBlankLines: true, skipComments: true },
      ],
    },
  },

  ...angular.configs.templateRecommended.map((config) => ({
    ...config,
    files: ['**/*.html'],
  })),
  ...angular.configs.templateAccessibility.map((config) => ({
    ...config,
    files: ['**/*.html'],
  })),

  // Ignore & options
  {
    ignores: ['dist', 'node_modules', '**/*.config.js', '**/global.d.ts'],
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
  },

  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      'max-lines-per-function': 'off',
      'no-console': 'off',
    },
  },

  // Prettier
  eslintConfigPrettier,
];
