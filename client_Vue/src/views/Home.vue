<template>
  <div>
    <h1 class="center title_page">Choice what do you want to do</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {},
  async mounted() {
    await this.GET_ALL_WORDS_OF_USER;
  },
  methods: {},
};
</script>

<style></style>
