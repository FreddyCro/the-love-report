// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
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
      APP_MODE: "",
      APP_URL: "",
      APP_ASSETS_PATH: "",
    },
  },

  // Base URL for the application (extracts path from NUXT_URL or defaults to '/')
  app: {
    // baseURL: process.env.NUXT_URL,
    baseURL: (() => {
      const nuxtUrl = process.env.NUXT_URL;
      if (!nuxtUrl) return "/";
      try {
        return new URL(nuxtUrl).pathname;
      } catch {
        return "/";
      }
    })(),
  },

  // add google fonts module
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "nuxt-jsonld",
    "lenis/nuxt",
  ],

  css: [
    "normalize.css",
    "~/assets/styles/base.css",
    "~/assets/styles/main.scss",
  ],

  // Google Fonts configuration
  googleFonts: {
    families: {
      "Noto+Sans+TC": [300, 400],
      "Noto+Serif+TC": [600, 700],
    },
    display: "swap",
    preconnect: true,
    preload: true,
    outputDir: "public/_fonts",
    stylePath: "css/fonts.css",
    fontsDir: "_fonts",
    fontsPath: (() => {
      const nuxtUrl = process.env.NUXT_URL;
      if (!nuxtUrl) return "/_fonts";
      try {
        const baseURL = new URL(nuxtUrl).pathname;
        return `${baseURL}_fonts`.replace("//", "/");
      } catch {
        return "/_fonts";
      }
    })(),
  },

  // Pre-bundle CJS-only dependency in dev to avoid ESM default export issues
  vite: {
    optimizeDeps: {
      include: ["vue-scrollto"],
    },
  },
});
