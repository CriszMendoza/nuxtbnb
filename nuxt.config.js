export default {
  components: true,
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  head: {
    titleTemplate: "%s - Nuxt",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    script: [
      {
        crossorigin: "anonymous",
        src: "https://polyfill.io/v3/polyfill.min.js?features=Intl%2Cblissfuljs%2Ces2015",
      },
    ],
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      class: ["my-style"],
    },
  },
  router: {
    prefetchLinks: false,
  },
  plugins: ["~/plugins/maps.client.js", "~/plugins/dataApi.js"],
};
