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
};
