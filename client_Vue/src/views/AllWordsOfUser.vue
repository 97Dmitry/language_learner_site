<template>
  <div class="allWordsOfUser">
    <h1 class="center title_page">All your study words</h1>
    <loader v-if="Loading" />
    <AllWordsOfUser_Pagination
      v-model:wordsList="WORDS"
      v-on:wordData="openWord"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AllWordsOfUser_Pagination from "@/components/AllWordsOfUser_Pagination";

export default {
  name: "AllWordsOfUser",
  components: { AllWordsOfUser_Pagination },
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
