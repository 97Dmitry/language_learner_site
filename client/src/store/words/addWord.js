import store from "@/store/index";
import axios from "axios";

export default {
  state: { createdWord: null },
  mutations: {
    SET_CREATED_WORD: (state, wordData) => {
      state.createdWord = wordData;
    },
    CLEAR_CREATED_WORD: (state) => {
      state.createdWord = null;
    },
  },
  actions: {
    async ADD_LEARNING_WORD({ commit }, { learning_word }) {
      const server = store.getters.GET_SERVER_URL;
      const data = { learning_word };
      await axios({
        method: "POST",
        url: `${server}/word_add-learning-word`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => {
          commit("SET_CREATED_WORD", response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          commit(
            "SET_ERROR",
            error.response.data.message || error.response.data.errors[0].msg
          );
          setTimeout(() => {
            commit("CLEAR_ERROR");
          }, 0);
        });
    },
    async ADD_TRANSLATION_VERB({ commit }, { word_id, translation_verb }) {
      const server = store.getters.GET_SERVER_URL;
      const data = { word_id, translation_verb };
      await axios({
        method: "POST",
        url: `${server}/word_add-translation-verb`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => {
          return response.data.message;
        })
        .catch((error) => {
          console.log(error.response.data);
          commit(
            "SET_ERROR",
            error.response.data.message || error.response.data.errors[0].msg
          );
          setTimeout(() => {
            commit("CLEAR_ERROR");
          }, 0);
        });
    },
    async ADD_TRANSLATION_NOUN({ commit }, { word_id, translation_noun }) {
      const server = store.getters.GET_SERVER_URL;
      const data = { word_id, translation_noun };
      await axios({
        method: "POST",
        url: `${server}/word_add-translation-noun`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => {
          return response.data.message;
        })
        .catch((error) => {
          console.log(error.response.data);
          commit(
            "SET_ERROR",
            error.response.data.message || error.response.data.errors[0].msg
          );
          setTimeout(() => {
            commit("CLEAR_ERROR");
          }, 0);
        });
    },
    async ADD_TRANSLATION_GENERAL(
      { commit },
      { word_id, translation_general }
    ) {
      const server = store.getters.GET_SERVER_URL;
      const data = { word_id, translation_general };
      await axios({
        method: "POST",
        url: `${server}/word_add-translation-general`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => {
          return response.data.message;
        })
        .catch((error) => {
          console.log(error.response.data);
          commit(
            "SET_ERROR",
            error.response.data.message || error.response.data.errors[0].msg
          );
          setTimeout(() => {
            commit("CLEAR_ERROR");
          }, 0);
        });
    },
  },
  getters: {
    GET_CREATED_WORD(state) {
      return state.createdWord;
    },
  },
};
