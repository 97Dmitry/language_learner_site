<template>
  <form>
    <div class="col s12">
      Input word that you want to add:
      <div class="input-field inline">
        <input
          id="learning_word"
          type="text"
          class="validate"
          v-model="learning_word"
        />
        <label for="learning_word">Word</label>
        <small class="helper-text invalid"></small>
      </div>
    </div>

    <div>
      <ExpansionWordsList_VerbTable />
      <ExpansionWordsList_NounTable />
      <ExpansionWordsList_GeneralTable />
    </div>

    <button class="btn" v-on:click.prevent="setData">Add to study</button>
  </form>
</template>

<script>
import ExpansionWordsList_VerbTable from "./ExpansionWordsListVerbTable.vue";
import ExpansionWordsList_GeneralTable from "./ExpansionWordsList_GeneralTable.vue";
import ExpansionWordsList_NounTable from "./ExpansionWordsList_NounTable";
export default {
  name: "ExpansionWordList_InterfaceElement",
  data() {
    return {
      learning_word: null,
    };
  },
  components: {
    ExpansionWordsList_VerbTable,
    ExpansionWordsList_NounTable,
    ExpansionWordsList_GeneralTable,
  },
  emits: ["allData"],
  methods: {
    setData() {
      const learning_word = this.learning_word;
      const verb = [];
      const noun = [];
      const general = [];
      for (const i of document.querySelectorAll(".verb_input")) {
        verb.push(i.value);
      }
      for (const i of document.querySelectorAll(".noun_input")) {
        noun.push(i.value);
      }
      for (const i of document.querySelectorAll(".general_input")) {
        general.push(i.value);
      }
      new Promise((resolve) =>
        resolve(this.$emit("allData", learning_word, verb, noun, general))
      ).then(document.querySelector("form").reset());
    },
  },
};
</script>

<style scoped></style>
