<template>
  <span>
    {{ displayText }}
    <br />
    <button
      v-if="isTooLong && !isExpanded"
      @click="isExpanded = true"
      type="button"
      class="link"
    >
      read more
    </button>
    <button
      v-if="isTooLong && isExpanded"
      @click="isExpanded = false"
      type="button"
      class="link"
    >
      read less
    </button>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        isExpanded: false,
        chunks: [],
      };
    },
    props: {
      text: {
        type: String,
        required: true,
      },
      target: {
        type: Number,
        required: true,
      },
    },
    created() {
      this.chunks = this.getChunks();
    },
    computed: {
      isTooLong() {
        return this.chunks.length === 2;
      },
      displayText() {
        if (!this.isTooLong || this.isExpanded) return this.chunks.join(" ");
        return this.chunks[0] + "...";
      },
    },
    methods: {
      getChunks() {
        const position = this.text.indexOf(" ", this.target);

        if (position === -1 || this.text.length <= this.target) {
          return [this.text];
        }

        return [
          this.text.substring(0, position),
          this.text.substring(position),
        ];
      },
    },
  };
</script>

<style scoped>
  .link {
    color: blue;
    background-color: white;
    border: none;
    text-decoration: underline;
    cursor: pointer;
  }

  .link:focus {
    border: none;
    outline: none;
  }
</style>
