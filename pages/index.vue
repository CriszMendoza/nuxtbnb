<template>
  <div>
    <div
      v-for="home in homes"
      :key="home.objectID"
      style="float: left; margin: 10px"
    >
      <nuxt-link :to="`/home/${home.objectID}`" prefetch>
        <home-card :home="home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: "Homepage",
        meta: [
          {
            name: "description",
            content: "This is a hompage!",
            id: "description",
          },
        ],
      };
    },
    async asyncData({ $dataApi, error }) {
      const response = await $dataApi.getHomes();

      if (!response.ok) return error(response);

      return {
        homes: response.json.hits,
      };
    },
  };
</script>

<style></style>
