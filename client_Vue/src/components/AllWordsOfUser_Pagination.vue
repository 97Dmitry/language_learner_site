<template>
  <div>
    <ul>
      <li v-for="(word, index) in paginatedData" :key="word.id">
        <div class="allWordsOfUser__word">
          {{ index + 1 }}. {{ word.learning_word }}
          <i
            class="material-icons"
            v-on:click="openWord(word.learning_word, word.id)"
            >open_in_browser</i
          >
        </div>
      </li>
    </ul>
    <button
      class="waves-effect btn"
      :disabled="pageNumber === 0"
      @click="prevPage"
    >
      Previous
    </button>
    <button
      class="waves-effect btn"
      :disabled="pageNumber >= pageCount - 1"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "AllWorldsOfUser_Pagination",
  data() {
    return {
      pageNumber: this.$route.query.page - 1 || 0,
    };
  },
  props: {
    wordsList: {
      type: Array,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  emits: ["wordData"],
  computed: {
    pageCount() {
      let l = this.wordsList.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.wordsList.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      this.pageNumber++;
      this.$router.replace({
        name: "AllWordsOfUser",
        query: { page: this.pageNumber + 1 },
      });
    },
    prevPage() {
      this.pageNumber--;
      this.$router.replace({
        name: "AllWordsOfUser",
        query: { page: this.pageNumber + 1 },
      });
    },
    openWord(word, id) {
      this.$emit("wordData", word, id);
    },
  },
};
</script>

<style scoped></style>
