<template>
  <div>
    <h1 class="center title_page">Input translation on english</h1>
    <Loader v-if="isLoading" />
    <Practice_InterfaceElement
      v-else
      v-model:wordObject="RANDOM_WORD"
      wordObject
      @checkAnswer="checkAnswer"
    />
  </div>
</template>

<script>
import Practice_InterfaceElement from "@/components/Practice_InterfaceElement";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Practice",
  components: { Practice_InterfaceElement },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(["RANDOM_WORD"]),
  },
  methods: {
    ...mapActions(["GET_RANDOM_WORD", "CHANGE_WORD_KNOWLEDGE_VALUE"]),
    ...mapMutations(["CLEAR_RANDOM_WORD"]),
    async checkAnswer(answer) {
      // this.isLoading = true;
      if (
        answer &&
        answer.toLowerCase() ===
          this.RANDOM_WORD.word.learning_word.toLowerCase()
      ) {
        await this.CHANGE_WORD_KNOWLEDGE_VALUE({
          word: this.RANDOM_WORD.word,
          type: "plus",
        });
        this.$message("It's true");
      } else {
        await this.CHANGE_WORD_KNOWLEDGE_VALUE({
          word: this.RANDOM_WORD.word,
          type: "minus",
        });
        this.$message(`True option is ${this.RANDOM_WORD.word.learning_word}`);
      }
      await this.CLEAR_RANDOM_WORD();
      await this.GET_RANDOM_WORD();
      // this.isLoading = false;
    },
  },

  async mounted() {
    await this.GET_RANDOM_WORD();
    this.isLoading = false;
  },
};
</script>

<style scoped></style>
