<template>
  <div class="example_table">
    <div class="example">
      <p>Пример глагола на русском:</p>
      <div v-for="verb in wordObject.verb" :key="verb.id">
        {{ verb.translation_verb }}
      </div>
    </div>
    <div class="example">
      <p>Пример существительного на русском:</p>
      <div v-for="verb in wordObject.noun" :key="verb.id">
        {{ verb.translation_noun }}
      </div>
    </div>
    <div class="example">
      <p>Пример основного перевода на русском:</p>
      <div v-for="verb in wordObject.general" :key="verb.id">
        {{ verb.translation_general }}
      </div>
    </div>
  </div>
  <div class="practice_input">
    <p>Введите перевод на английском</p>
    <div class="input-field col s6">
      <input
        id="answer"
        type="text"
        class="validate"
        v-model="answer"
        autocomplete="off"
      />
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
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "Practice_InterfaceElement",
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    wordObject: {
      type: Object,
      required: true,
    },
  },
  emits: ["checkAnswer"],
  data() {
    return {
      answer: null,
    };
  },
  methods: {
    checkWord() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }
      this.$emit("checkAnswer", this.answer);
      this.answer = null;
      this.v$.$reset();
    },
    printError($name) {
      if ($name === "required") {
        return "Field cannot be empty";
      }
    },
  },
  validations() {
    return {
      answer: { required },
    };
  },
};
</script>

<style scoped></style>
