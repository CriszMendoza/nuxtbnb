<template>
  <div>
    <div v-for="home in homes" :key="home.objectID">
      <nuxt-link :to="`/home/${home.objectID}`"
        ><HomeCard :home="home"
      /></nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Home Page",
      meta: [
        {
          name: "description",
          content: "This is a homepage!",
          hid: "description",
        },
      ],
    };
  },
  async asyncData({ $dataApi: { getHomes }, error }) {
    const { json, ok, statusCode, message } = await getHomes();

    if (!ok) return error({ statusCode, message });

    return {
      homes: json.hits.slice(0, 3),
    };
  },
};
</script>
