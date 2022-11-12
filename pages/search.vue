<template>
  <div>
    Results for {{ label }}
    <div style="height: 800px; width: 800px; float: right" ref="map"></div>
    <div v-if="homes.length > 0">
      <nuxt-link
        v-for="home in homes"
        :key="home.objectID"
        :to="`/home/${home.objectID}`"
      >
        <home-row
          :home="home"
          @mouseover.native="highlightMarker(home.objectID, true)"
          @mouseout.native="highlightMarker(home.objectID, false)"
        />
      </nuxt-link>
    </div>
    <div v-else>No results found</div>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: `Homes around ${this.label}`,
      };
    },
    async asyncData({ query: { lat, lng, label }, $dataApi }) {
      const response = await $dataApi.getHomeByLocation(lat, lng);

      if (!response.ok) return error(response);

      return {
        lat,
        lng,
        label,
        homes: response.json.hits,
      };
    },
    async beforeRouteUpdate(to, from, next) {
      const response = await this.$dataApi.getHomeByLocation(
        to.query.lat,
        to.query.lng
      );

      if (!response.ok) return this.error(response);

      this.lat = to.query.lat;
      this.lng = to.query.lng;
      this.label = to.query.label;
      this.homes = response.json.hits;

      this.updateMap();
      next();
    },
    methods: {
      updateMap() {
        const canvas = this.$refs.map;
        this.$maps.showMap(canvas, this.lat, this.lng, this.getHomeMarkers());
      },
      getHomeMarkers() {
        return this.homes.map(({ _geoloc, pricePerNight, objectID }) => {
          return {
            ..._geoloc,
            pricePerNight,
            id: objectID,
          };
        });
      },
      highlightMarker(homeID, isHighlighted) {
        document
          .getElementsByClassName(`home-${homeID}`)[0]
          ?.classList?.toggle("maker-highlight", isHighlighted);
      },
    },
    mounted() {
      this.updateMap();
    },
  };
</script>

<style>
  .marker {
    background-color: white;
    border: 1px solid lightgray;
    font-weight: bold;
    border-radius: 20px;
    padding: 5px 8px;
  }

  .maker-highlight {
    color: white !important;
    background-color: black;
    border-color: black;
  }
</style>
