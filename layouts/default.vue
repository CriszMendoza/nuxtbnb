<template>
  <div class="app">
    <!-- <header class="app-header">
      <div class="app-logo">
        <img src="/images/logo.svg" />
      </div>
      <div class="app-search">
        <input
          type="text"
          ref="citySearch"
          @changed="changed"
          placeholder="Enter your address"
        />
        <input type="text" class="datepicker" placeholder="check in" />
        <input type="text" class="datepicker" placeholder="check out" />
        <button>
          <img src="/images/icons/search.svg" />
        </button>
      </div>
    </header> -->

    <header style="background-color: #eee">
      <nuxt-link to="/">Home</nuxt-link>
      <input type="text" ref="citySearch" @changed="changed" />
    </header>
    <nuxt />
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$maps.makeAutoComplete(this.$refs.citySearch);
    },
    methods: {
      changed(event) {
        const place = event.detail;

        if (!place.geometry) return;

        this.$router.push({
          name: "search",
          query: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            label: this.$refs.citySearch.value,
          },
        });
      },
    },
  };
</script>

<style></style>
