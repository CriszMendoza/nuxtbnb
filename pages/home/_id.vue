<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        width="200"
        height="150"
      />
    </div>
    {{ home.title }} <br />
    ${{ home.pricePerNight }} / night<br />
    <img src="/images/marker.svg" width="20" height="20" />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ home.location.country }} <br />
    <img src="/images/star.svg" width="20" height="20" />{{ home.reviewValue }}
    <br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} bathrooms <br />
    <div ref="map" style="height: 800px; width: 800px"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" :alt="review.reviewer.name" /><br />
      {{ review.reviewer.name }} <br />
      {{ formatDate(review.date) }} <br />
      <short-text :text="review.comment" :target="150" />
      <br />
    </div>
    <img :src="user.image" :alt="user.name" /><br />
    {{ user.name }}<br />
    {{ formatDate(user.joined) }}<br />
    {{ user.reviewCount }}<br />
    {{ user.description }}<br />
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: this.home.title,
      };
    },
    async asyncData({ params, $dataApi, error }) {
      const id = params.id;

      const responses = await Promise.all([
        $dataApi.getHome(id),
        $dataApi.getReviewsByHomeId(id),
        $dataApi.getUserByHomeId(id),
      ]);

      responses.forEach((response) => {
        if (!response.ok) return error(response);
      });

      const [homes, reviews, user] = responses;

      return {
        home: homes.json,
        reviews: reviews.json.hits,
        user: user.json.hits[0],
      };
    },
    mounted() {
      const { lat, lng } = this.home._geoloc;
      const canvas = this.$refs.map;
      this.$maps.showMap(canvas, lat, lng);
    },
    methods: {
      formatDate(dateStr) {
        const date = new Date(dateStr);

        return date.toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        });
      },
    },
  };
</script>

<style></style>
