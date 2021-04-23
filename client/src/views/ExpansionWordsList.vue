<template>
  <div class="expansionWordsList">
    <h1 class="center title_page">Add new word for study</h1>
    <form>
      <div class="col s12">
        Input word that you want to add:
        <div class="input-field inline">
          <input id="learning_word_inline" type="text" class="validate" />
          <label for="learning_word_inline">Word</label>
          <small class="helper-text invalid"></small>
        </div>
      </div>
      <ExpansionWordList_InterfaceElement />
      <button>Add to study</button>
    </form>
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
