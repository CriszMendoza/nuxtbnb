export default {
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  components: true,
  head: {
    titleTemplate: "Mastering Nuxt: %s",
    head: [
      {
        charser: "utf-8",
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
  plugins: ["~/plugins/maps.client", "~/plugins/dataApi"],
  buildModules: ["@nuxtjs/dotenv"],
};
