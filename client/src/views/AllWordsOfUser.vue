<template>
  <div class="allWordsOfUser">
    <h1 class="center title_page">All your study words</h1>
    <loader v-if="Loading" />
    <div v-for="(word, index) in WORDS" :key="word.id">
      <div class="allWordsOfUser__word" style="padding: 5px">
        {{ index + 1 }}. {{ word.learning_word }}
        <i
          class="material-icons"
          style="font-size: 20px; cursor: pointer"
          v-on:click="openWord(word.learning_word, word.id)"
          >open_in_browser</i
        >
      </div>
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
  methods: {
    openWord(word, id) {
      this.$router.push({
        name: "Word",
        path: `/word/`,
        query: { word: word, id: id },
      });
    },
  },
  mounted() {
    new Promise((resolve) => resolve(this.GET_ALL_WORDS_OF_USER)).then(() => {
      this.Loading = false;
    });
  },
};
</script>

<style scoped></style>
