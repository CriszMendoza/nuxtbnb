<template>
  <div style="text-align: center">
    <h1>{{ error.message }} {{ error.statusCode }}</h1>
    <img
      src="https://acegif.com/wp-content/uploads/funny-falling-4.gif"
      alt="Error funny"
    />
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: this.error.message,
      };
    },
    props: {
      error: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style></style>
