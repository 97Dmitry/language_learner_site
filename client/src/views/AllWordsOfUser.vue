<template>
  <div class="allWordsOfUser">
    <h1 class="center title_page">All your study words</h1>
    <loader v-if="Loading" />
    <div v-for="(i, index) in WORDS" :key="i.id">
      {{ index + 1 }}. {{ i.learning_word }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllWordsOfUser",
  data() {
    return {
      Loading: true,
    };
  },
  computed: {
    ...mapActions(["GET_ALL_WORDS_OF_USER"]),
    ...mapGetters(["WORDS"]),
  },
  methods: {},
  mounted() {
    new Promise((resolve) => resolve(this.GET_ALL_WORDS_OF_USER)).then(() => {
      this.Loading = false;
    });
  },
};
</script>

<style scoped></style>
