<template>
  <div class="expansionWordsList">
    <h1 class="center title_page">Add new word for study</h1>

    <ExpansionWordList_InterfaceElement v-on:allData="saveData" />
  </div>
</template>

<script>
import ExpansionWordList_InterfaceElement from "@/components/ExpansionWordList_InterfaceElement";

export default {
  name: "ExpansionWordsList",
  data() {
    return {};
  },
  components: {
    ExpansionWordList_InterfaceElement,
  },
  methods: {
    async saveData(learning_word, verb, noun, general) {
      console.log(learning_word, verb, noun, general);
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: none; /* Убираем маркеры */
}
ul {
  margin-left: 0; /* Отступ слева в браузере IE и Opera */
  padding-left: 0; /* Отступ слева в браузере Firefox, Safari, Chrome */
}
</style>
