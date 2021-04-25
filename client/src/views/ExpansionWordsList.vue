<template>
  <div class="expansionWordsList">
    <h1 class="center title_page">Add new word for study</h1>

    <ExpansionWordsList_InterfaceElement v-on:allData="saveData" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ExpansionWordsList_InterfaceElement from "@/components/ExpansionWordsList/ExpansionWordsList_InterfaceElement";

export default {
  name: "ExpansionWordsList",
  data() {
    return {};
  },
  components: {
    ExpansionWordsList_InterfaceElement,
  },
  computed: {
    ...mapGetters(["ERROR", "GET_CREATED_WORD"]),
  },
  methods: {
    ...mapActions([
      "ADD_LEARNING_WORD",
      "ADD_TRANSLATION_VERB",
      "ADD_TRANSLATION_NOUN",
      "ADD_TRANSLATION_GENERAL",
    ]),
    ...mapMutations(["CLEAR_CREATED_WORD"]),
    async saveData(learning_word, verb, noun, general) {
      console.log(learning_word, verb, noun, general);
      await this.ADD_LEARNING_WORD({ learning_word });
      if (this.ERROR) {
        this.$error(this.ERROR);
      }

      const word = this.GET_CREATED_WORD;

      verb.forEach(async (item) => {
        if (item.length > 2) {
          await this.ADD_TRANSLATION_VERB({
            word_id: word.id,
            translation_verb: item,
          });
          if (this.ERROR) {
            this.$error(this.ERROR);
          }
        }
      });
      noun.forEach(async (item) => {
        if (item.length > 2) {
          await this.ADD_TRANSLATION_NOUN({
            word_id: word.id,
            translation_noun: item,
          });
          if (this.ERROR) {
            this.$error(this.ERROR);
          }
        }
      });
      general.forEach(async (item) => {
        if (item.length > 2) {
          await this.ADD_TRANSLATION_GENERAL({
            word_id: word.id,
            translation_general: item,
          });
          if (this.ERROR) {
            this.$error(this.ERROR);
          }
        }
      });
      this.CLEAR_CREATED_WORD;
    },
  },
};
</script>

<style scoped></style>
