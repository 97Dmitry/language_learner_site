<template>
  <div>
    <h1 class="center title_page">Input translation on english</h1>
    Пример глагола на русском:
    <div v-for="verb in RANDOM_WORD.verb" :key="verb.id">
      {{ verb.translation_verb }}
    </div>
    <div>
      <div class="input-field col s6">
        <input id="last_name" type="text" class="validate" />
        <label for="last_name">Input</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Practice",
  computed: {
    ...mapActions(["GET_RANDOM_WORD"]),
    ...mapGetters(["RANDOM_WORD"]),
  },
  methods: {},
  async mounted() {
    await this.GET_RANDOM_WORD;
  },
};
</script>

<style scoped></style>
