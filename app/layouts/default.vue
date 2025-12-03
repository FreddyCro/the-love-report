<template>
  <div class="l-default-layout">
    <slot />
  </div>
</template>

<style lang="scss">
/* 使用 Google Fonts 的範例：
   - body 使用 'Noto Sans TC'（Noto+Sans+TC）
   - 標題使用 'Noto Serif TC'（Noto+Serif+TC）
   注意：字體由 @nuxtjs/google-fonts 模組在 head 中載入，確保已在 nuxt.config.ts 設定 families。
*/

html,
body,
#__nuxt,
#app {
  height: 100%;
}

body {
  margin: 0;
  font-family: 'Noto Sans TC', system-ui, -apple-system, 'Segoe UI', Roboto,
    'Noto Sans', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
