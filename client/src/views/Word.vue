<template>
  <loader v-if="Loading" />
  <div class="word" style="" v-else>
    <div class="word__word">
      <p>Word: {{ WORD.word }}</p>
    </div>
    <div class="word__translations" style="display: flex; flex-direction: row">
      <div class="word__translations">
        <h3>Verb translations:</h3>
        <ol v-for="i in WORD.verb" :key="i.id">
          <li>
            {{ i.translation_verb }}
            <i class="material-icons" style="font-size: 20px; cursor: pointer"
              >delete</i
            >
          </li>
        </ol>
      </div>

      <div class="word__translations">
        <h3>Noun translations:</h3>
        <ol v-for="i in WORD.noun" :key="i.id">
          <li>
            {{ i.translation_noun }}
            <i class="material-icons" style="font-size: 20px; cursor: pointer"
              >delete</i
            >
          </li>
        </ol>
      </div>

      <div class="word__translations">
        <h3>General translations:</h3>
        <ol v-for="i in WORD.verb" :key="i.id">
          <li>
            {{ i.translation_general }}
            <i class="material-icons" style="font-size: 20px; cursor: pointer"
              >delete</i
            >
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Word",
  data() {
    return {
      Loading: true,
      receivedWord: [],
    };
  },
  computed: {
    ...mapGetters(["WORD"]),
  },
  methods: {
    ...mapActions(["GET_WORD"]),
  },
  async mounted() {
    await this.GET_WORD({
      request_word: this.$route.query.word,
      word_id: this.$route.query.id,
    });
    this.Loading = false;
  },
};
</script>

<style scoped>
.word__translations {
  padding: 20px;
}
</style>
