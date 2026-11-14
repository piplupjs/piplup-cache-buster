import { combine, presets, rules } from '@piplup/code-infra/oxlint';

export default combine(presets.recommended, presets.spec, {
  overrides: [
    {
      // Node.js command-line scripts.
      files: ['scripts/**', 'packages/*/bin/**'],
      rules: rules({
        '@typescript-eslint/no-require-imports': 'off',
        'compat/compat': 'off',
        'no-console': 'off',
      }),
    },
  ],
});
