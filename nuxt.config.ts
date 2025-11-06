// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Enable server-side rendering and use Nitro prerendering for static sites (replace `generate.fallback`)
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },

  // Public runtime configuration available on the client
  runtimeConfig: {
    public: {
      APP_MODE: '',
      APP_URL: '',
      APP_ASSETS_PATH: '',
    },
  },

  // add google fonts module
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    'nuxt-jsonld',
    'lenis/nuxt',
  ],

  css: ['normalize.css', '~/assets/styles/main.css'],

  // Google Fonts configuration
  googleFonts: {
    families: {
      'Noto+Sans+TC': [300, 400],
      'Noto+Serif+TC': [600, 700],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
  },

  // Pre-bundle CJS-only dependency in dev to avoid ESM default export issues
  vite: {
    optimizeDeps: {
      include: ['vue-scrollto'],
    },
  },
});
