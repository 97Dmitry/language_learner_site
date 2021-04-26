<template>
  <loader v-if="Loading" />
  <div v-else-if="WORD.length < 1" class="center">You have no this word</div>
  <div class="word" style="" v-else>
    <Word_ModalWindow
      v-if="isModal"
      v-on:closeModal="closeModal"
      v-on:sendData="sendData"
      v-model:modalTitle="modalTitle"
    >
      <input type="text" ref="input" />
    </Word_ModalWindow>
    <div class="word__word">
      <p>Word: {{ WORD.word.learning_word }}</p>
      <i
        class="material-icons"
        style="font-size: 20px; cursor: pointer"
        v-on:click="deleteWord(WORD.word.id, WORD.word.learning_word)"
        >delete
      </i>
      <i
        class="material-icons"
        style="font-size: 20px; margin-left: 5px; cursor: pointer"
        v-on:click="changeWord(WORD.word.id, WORD.word.learning_word)"
        >edit
      </i>
    </div>
    <div
      class="word__translations"
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <div class="word__translations">
        <h3>Verb translations:</h3>
        <ol v-for="i in WORD.verb" :key="i.id">
          <li>
            {{ i.translation_verb }}
            <i
              class="material-icons"
              style="font-size: 20px; cursor: pointer"
              v-on:click="deleteItem(i)"
              >delete
            </i>
            <i
              class="material-icons"
              style="font-size: 20px; margin-left: 5px; cursor: pointer"
              v-on:click="editVerb(i.id, i.translation_verb)"
            >
              edit
            </i>
          </li>
        </ol>
      </div>

      <div class="word__translations">
        <h3>Noun translations:</h3>
        <ol v-for="i in WORD.noun" :key="i.id">
          <li>
            {{ i.translation_noun }}
            <i
              class="material-icons"
              style="font-size: 20px; cursor: pointer"
              v-on:click="deleteItem(i)"
            >
              delete
            </i>
            <i
              class="material-icons"
              style="font-size: 20px; margin-left: 5px; cursor: pointer"
              v-on:click="editNoun(i.id, i.translation_noun)"
            >
              edit
            </i>
          </li>
        </ol>
      </div>

      <div class="word__translations">
        <h3>General translations:</h3>
        <ol v-for="i in WORD.general" :key="i.id">
          <li>
            {{ i.translation_general }}
            <i
              class="material-icons"
              style="font-size: 20px; cursor: pointer"
              v-on:click="deleteItem(i)"
              >delete
            </i>
            <i
              class="material-icons"
              style="font-size: 20px; margin-left: 5px; cursor: pointer"
              v-on:click="editGeneral(i.id, i.translation_general)"
            >
              edit
            </i>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Word_ModalWindow from "@/components/Word_ModalWindow";

export default {
  name: "Word",
  components: { Word_ModalWindow },
  data() {
    return {
      Loading: true,
      isModal: false,
      modalTitle: "",
      activeEdit: null,
      editId: null,
      receivedWord: [],
    };
  },
  computed: {
    ...mapGetters(["WORD"]),
  },
  methods: {
    ...mapActions(["GET_WORD", "CHANGE_VERB_VALUE"]),
    ...mapMutations(["CLEAR_WORD"]),

    deleteWord() {
      this.$message("Not working");
    },

    changeWord() {
      this.$message("Not working");
    },

    deleteItem(i) {
      console.log(i.id);
    },

    async sendData() {
      if (this.activeEdit === "Verb") {
        // Отправить this.editID и this.$refs.input.value в store action
        this.CHANGE_VERB_VALUE({
          word_id: this.WORD.word.id,
          id: this.editId,
          new_value: this.$refs.input.value,
        });
        // Обнулить значения
        this.activeEdit = null;
        this.editId = null;
        this.isModal = false;
        this.CLEAR_WORD;
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
      }
      if (this.activeEdit === "Noun") {
        // Отправить this.editID и this.$refs.input.value в store action
        // Обнулить значения
        // this.activeEdit = null;
        // this.editId = null;
        // this.isModal = false;
      }
      if (this.activeEdit === "General") {
        // Отправить this.editID и this.$refs.input.value в store action
        // Обнулить значения
        // this.activeEdit = null;
        // this.editId = null;
        // this.isModal = false;
      }
    },

    editVerb(id, word) {
      this.modalTitle = `Input new value for verb translation: ${word}`;
      this.activeEdit = "Verb";
      this.editId = id;
      this.isModal = true;
    },
    editNoun(id, word) {
      this.modalTitle = `Input new value for noun translation: ${word}`;
      this.activeEdit = "Noun";
      this.editId = id;
      this.isModal = true;
    },
    editGeneral(id, word) {
      this.modalTitle = `Input new value for general translation: ${word}`;
      this.activeEdit = "General";
      this.editId = id;
      this.isModal = true;
    },

    closeModal() {
      this.activeEdit = null;
      this.editId = null;
      this.isModal = false;
    },
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
