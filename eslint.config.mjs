// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    // Turn off explicit-any rule for TypeScript where you intentionally want to allow `any`.
    // Adjust to 'warn' if you prefer soft warnings instead of disabling.
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow usage of `v-html` in Vue templates (disable the rule that forbids it)
      'vue/no-v-html': 'off',
    },
  }
)
