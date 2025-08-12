import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    files: ['src/**/*.{ts,vue}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'arrow-body-style': 'off',
      'no-return-assign': 'off',
      'no-unused-vars': 'off',
      'no-console': ['warn'],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/no-multi-spaces': ['warn', { ignoreEOLComments: true }],
      '@stylistic/no-multiple-empty-lines': ['warn', { 'max': 1 }],
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/indent': ['warn', 2],
      '@stylistic/no-trailing-spaces': ['warn'],
      '@stylistic/arrow-spacing': ['warn'],
      '@stylistic/array-bracket-spacing': ['warn'],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/member-delimiter-style': ['warn', {
        "multiline": {
          "delimiter": "none",
        },
      }],

      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-indent': ['warn', 2],
      'vue/max-attributes-per-line': ['warn', {
        singleline: 2,
      }],
      'vue/html-self-closing': ['warn', {
        html: {
          void: 'always',
        },
      }],
      'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside',
        multiline: 'below',
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    },
  },
)
