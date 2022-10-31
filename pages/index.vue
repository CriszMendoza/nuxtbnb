<template>
  <div>
    <HomeCard v-for="home in homes" :key="home.objectID" :home="home" />
  </div>
</template>

<script>
import homes from "~/homes";

export default {
  data() {
    return {
      homes: homes.slice(0, 3),
    };
  },
};
</script>
