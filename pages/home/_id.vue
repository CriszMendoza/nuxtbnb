<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :src="image"
        :key="image"
        alt="Somethong descriptive..."
        width="200"
        height="150"
      />
    </div>
    {{ home.title }} <br />
    ${{ home.pricePerNight }} / night <br />
    <img src="/images/marker.svg" alt="Marker icon" width="20" height="20" />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ home.location.country }} <br />
    <img src="/images/star.svg" alt="Star icon" width="20" height="20" />{{
      home.reviewValue
    }}
    <br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} bath <br />

    <div style="height: 800px; width: 800px" ref="map"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" />
      <br />
      {{ review.reviewer.name }}
      <br />
      {{ formatDate(review.date) }}
      <br />
      <short-text :text="review.comment" :target="150" />
      <br />
    </div>
    <img :src="user.image" />
    {{ user.name }} <br />
    {{ formatDate(user.joined) }} <br />
    {{ user.reviewCount }} <br />
    {{ user.description }} <br />
  </div>
</template>

<script>
  export default {
    // 1. Obtiene los datos de la API y se define el "home"
    async asyncData({ $dataApi, params: { id }, error }) {
      const responses = await Promise.all([
        $dataApi.getHome(id),
        $dataApi.getReviewsByHomeId(id),
        $dataApi.getUserByHomeId(id),
      ]);

      for (const { ok, ...rest } of responses) {
        if (!ok) return error(rest);
      }

      return {
        home: responses[0].json,
        reviews: responses[1].json.hits,
        user: responses[2].json.hits[0],
      };
    },
    // 2. Se actualiza el head con los datos del "home"
    head() {
      return {
        title: this.home.title,
      };
    },
    // 3. Una vez se monta la página se muestra el mapa con los datos del home
    mounted() {
      const { lat, lng } = this.home._geoloc;
      this.$maps.showMaps(this.$refs.map, lat, lng);
    },
    methods: {
      formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        });
      },
    },
  };
</script>

<style></style>
