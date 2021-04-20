<template>
  <div>
    <h1 class="center title_page">Input translation on english</h1>
    <div class="example_table">
      <div class="example">
        <p style="font-weight: 700">Пример глагола на русском:</p>
        <div v-for="verb in RANDOM_WORD.verb" :key="verb.id">
          {{ verb.translation_verb }}
        </div>
      </div>
      <div class="example">
        <p style="font-weight: 700">Пример существительного на русском:</p>
        <div v-for="verb in RANDOM_WORD.noun" :key="verb.id">
          {{ verb.translation_noun }}
        </div>
      </div>
      <div class="example">
        <p style="font-weight: 700">Пример основного перевода на русском:</p>
        <div v-for="verb in RANDOM_WORD.general" :key="verb.id">
          {{ verb.translation_general }}
        </div>
      </div>
    </div>
    <div class="practice_input">
      <p>Введите перевод на английском</p>
      <div class="input-field col s6">
        <input id="answer" type="text" class="validate" v-model="answer" />
        <label for="answer">Input</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.answer.$errors"
          :key="index"
        >
          {{ printError(error.$validator) }}</small
        >
      </div>
      <button
        class="btn waves-effect waves-light auth-submit"
        type="submit"
        v-on:click="checkWord"
      >
        Check
        <i class="material-icons right">send</i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "Practice",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      answer: null,
    };
  },
  computed: {
    ...mapGetters(["RANDOM_WORD"]),
    ...mapActions(["GET_RANDOM_WORD"]),
  },
  methods: {
    ...mapMutations(["CLEAR_RANDOM_WORD"]),
    ...mapActions(["GET_RANDOM_WORD", "CHANGE_WORD_KNOWLEDGE_VALUE"]),
    async checkWord() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }

      if (
        this.answer &&
        this.answer.toLowerCase() ===
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

      this.CLEAR_RANDOM_WORD;
      await this.GET_RANDOM_WORD;
      this.answer = null;
      this.v$.$reset();
    },
    printError($name) {
      if ($name === "required") {
        return "Field cannot be empty";
      }
    },
  },

  async mounted() {
    await this.GET_RANDOM_WORD;
  },
  validations() {
    return {
      answer: { required },
    };
  },
};
</script>

<style scoped></style>
