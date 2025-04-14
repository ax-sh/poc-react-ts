import antfu from '@antfu/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import storybook from 'eslint-plugin-storybook'

const reactQueryLinter = {
  plugins: {
    '@tanstack/query': pluginQuery,
  },
  rules: {
    '@tanstack/query/exhaustive-deps': 'error',
  },
}

const consoleLinter = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    'no-console': ['warn', { allow: ['debug', 'warn', 'critical'] }],
  },
}

const defaultTsConfigForEslint = {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.node.json', // Specify your tsconfig.json if needed
      allowDefaultProject: true, // Allow default project configuration
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    // Your rules here
  },
}

const linterIgnore = { ignores: ['dist', '**/public/*', '!.storybook'] }

export default antfu(
  {
    test: true,
    react: true,
    typescript: { tsconfigPath: './tsconfig.node.json' },
  },
  reactQueryLinter,
  linterIgnore,
  consoleLinter,
  defaultTsConfigForEslint,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {
      // example of overriding a rule
      'storybook/hierarchy-separator': 'error',
      // example of disabling a rule
      'storybook/default-exports': 'off',
    },
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
)

// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'
//
// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )
