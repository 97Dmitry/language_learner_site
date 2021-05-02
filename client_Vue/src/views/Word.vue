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
      <i class="material-icons" v-on:click="deleteWord()">delete </i>
      <i class="material-icons" v-on:click="changeWord()">edit </i>
    </div>
    <div class="word__translations">
      <div class="word__translations">
        <i class="material-icons" v-on:click="addNewVerb">add_box </i>
        <h3>Verb translations:</h3>
        <ol v-for="i in WORD.verb" :key="i.id">
          <li>
            {{ i.translation_verb }}
            <i
              class="material-icons"
              v-on:click="deleteVerb(WORD.word.id, i.id, i.translation_verb)"
              >delete
            </i>
            <i
              class="material-icons"
              v-on:click="editVerb(i.id, i.translation_verb)"
            >
              edit
            </i>
          </li>
        </ol>
      </div>

      <div class="word__translations">
        <i class="material-icons" v-on:click="addNewNoun">add_box </i>
        <h3>Noun translations:</h3>
        <ol v-for="i in WORD.noun" :key="i.id">
          <li>
            {{ i.translation_noun }}
            <i
              class="material-icons"
              v-on:click="deleteNoun(WORD.word.id, i.id, i.translation_noun)"
            >
              delete
            </i>
            <i
              class="material-icons"
              v-on:click="editNoun(i.id, i.translation_noun)"
            >
              edit
            </i>
          </li>
        </ol>
      </div>

      <div class="word__translations">
        <i class="material-icons" v-on:click="addNewGeneral">add_box </i>
        <h3>General translations:</h3>
        <ol v-for="i in WORD.general" :key="i.id">
          <li>
            {{ i.translation_general }}
            <i
              class="material-icons"
              v-on:click="
                deleteGeneral(WORD.word.id, i.id, i.translation_general)
              "
              >delete
            </i>
            <i
              class="material-icons"
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
      activeEvent: null,
      idTool: null,
      receivedWord: [],
    };
  },
  computed: {
    ...mapGetters(["WORD"]),
  },
  methods: {
    ...mapActions([
      "GET_WORD",
      "CHANGE_VERB_VALUE",
      "CHANGE_NOUN_VALUE",
      "CHANGE_GENERAL_VALUE",
      "ADD_TRANSLATION_VERB",
      "ADD_TRANSLATION_NOUN",
      "ADD_TRANSLATION_GENERAL",
      "DELETE_VERB",
      "DELETE_NOUN",
      "DELETE_GENERAL",
    ]),
    ...mapMutations(["CLEAR_WORD"]),

    deleteWord() {
      this.$message("Not working");
    },

    changeWord() {
      this.$message("Not working");
    },

    async deleteVerb(word_id, verb_id, word) {
      const answer = window.confirm(`Do you want to delete ${word}`);
      if (answer) {
        this.Loading = true;
        await this.CLEAR_WORD;
        await this.DELETE_VERB({ word_id, verb_id });
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
        this.Loading = false;
        this.$message(`${word} was deleted`);
      }
    },
    async deleteNoun(word_id, noun_id, word) {
      const answer = window.confirm(`Do you want to delete ${word}`);
      if (answer) {
        this.Loading = true;
        await this.CLEAR_WORD;
        await this.DELETE_NOUN({ word_id, noun_id });
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
        this.Loading = false;
        this.$message(`${word} was deleted`);
      }
    },
    async deleteGeneral(word_id, general_id, word) {
      const answer = window.confirm(`Do you want to delete ${word}`);
      if (answer) {
        this.Loading = true;
        await this.CLEAR_WORD;
        await this.DELETE_GENERAL({ word_id, general_id });
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
        this.Loading = false;
        this.$message(`${word} was deleted`);
      }
    },

    async sendData() {
      if (this.activeEvent === "Verb") {
        this.Loading = true;
        await this.CLEAR_WORD;
        // Отправить this.idTool и this.$refs.input.value в store action
        this.CHANGE_VERB_VALUE({
          word_id: this.WORD.word.id,
          id: this.idTool,
          new_value: this.$refs.input.value,
        });
        // Обнулить значения
        this.activeEvent = null;
        this.idTool = null;
        this.isModal = false;
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
        this.Loading = false;
      }

      if (this.activeEvent === "Noun") {
        this.Loading = true;
        await this.CLEAR_WORD;
        // Отправить this.idTool и this.$refs.input.value в store action
        this.CHANGE_NOUN_VALUE({
          word_id: this.WORD.word.id,
          id: this.idTool,
          new_value: this.$refs.input.value,
        });
        // Обнулить значения
        this.activeEvent = null;
        this.idTool = null;
        this.isModal = false;
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
        this.Loading = false;
      }

      if (this.activeEvent === "General") {
        this.Loading = true;
        this.CLEAR_WORD;
        // Отправить this.idTool и this.$refs.input.value в store action
        this.CHANGE_GENERAL_VALUE({
          word_id: this.WORD.word.id,
          id: this.idTool,
          new_value: this.$refs.input.value,
        });
        // Обнулить значения
        this.activeEvent = null;
        this.idTool = null;
        this.isModal = false;
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
        this.Loading = false;
      }

      if (this.activeEvent === "NewVerb") {
        this.Loading = true;
        this.CLEAR_WORD;
        this.ADD_TRANSLATION_VERB({
          word_id: this.WORD.word.id,
          translation_verb: this.$refs.input.value,
        });
        this.activeEvent = null;
        this.idTool = null;
        this.isModal = false;
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
        this.Loading = false;
      }

      if (this.activeEvent === "NewNoun") {
        this.Loading = true;
        this.CLEAR_WORD;
        this.ADD_TRANSLATION_NOUN({
          word_id: this.WORD.word.id,
          translation_noun: this.$refs.input.value,
        });
        this.activeEvent = null;
        this.idTool = null;
        this.isModal = false;
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
        this.Loading = false;
      }

      if (this.activeEvent === "NewGeneral") {
        this.Loading = true;
        this.CLEAR_WORD;
        this.ADD_TRANSLATION_GENERAL({
          word_id: this.WORD.word.id,
          translation_general: this.$refs.input.value,
        });
        this.activeEvent = null;
        this.idTool = null;
        this.isModal = false;
        await this.GET_WORD({
          request_word: this.$route.query.word,
          word_id: this.$route.query.id,
        });
        this.Loading = false;
      }
    },

    editVerb(id, word) {
      this.modalTitle = `Input new value for verb translation: ${word}`;
      this.activeEvent = "Verb";
      this.idTool = id;
      this.isModal = true;
    },
    editNoun(id, word) {
      this.modalTitle = `Input new value for noun translation: ${word}`;
      this.activeEvent = "Noun";
      this.idTool = id;
      this.isModal = true;
    },
    editGeneral(id, word) {
      this.modalTitle = `Input new value for general translation: ${word}`;
      this.activeEvent = "General";
      this.idTool = id;
      this.isModal = true;
    },

    addNewVerb() {
      this.modalTitle = `Input new verb for: ${this.WORD.word.learning_word}`;
      this.activeEvent = "NewVerb";
      this.isModal = true;
    },
    addNewNoun() {
      this.modalTitle = `Input new noun for: ${this.WORD.word.learning_word}`;
      this.activeEvent = "NewNoun";
      this.isModal = true;
    },
    addNewGeneral() {
      this.modalTitle = `Input new general for: ${this.WORD.word.learning_word}`;
      this.activeEvent = "NewGeneral";
      this.isModal = true;
    },

    closeModal() {
      this.activeEvent = null;
      this.idTool = null;
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

<style scoped></style>
