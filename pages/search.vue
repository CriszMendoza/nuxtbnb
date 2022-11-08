<template>
  <div>
    <div>{{ lng }}{{ lat }}{{ label }}</div>
    <div v-if="homes.length > 0">
      <div v-for="home in homes" :key="home.objectID">{{ home.title }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    watchQuery: ["lat"],
    async asyncData({ query, $dataApi: { getUserByLocation } }) {
      const data = await getUserByLocation(query.lat, query.lng);

      console.log(data);

      return {
        ...query,
        homes: data.json.hits,
      };
    },
  };
</script>
