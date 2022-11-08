<template>
  <div style="text-align: center">
    <img
      src="https://i.pinimg.com/originals/c5/21/64/c52164749f7460c1ededf8992cd9a6ec.jpg"
    />
    <br /><br /><br />
    <h1>Error!</h1>
    {{ error.message }} {{ error.statusCode }}
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: "BIG PROBLEMS",
    };
  },
};
</script>

<style></style>
