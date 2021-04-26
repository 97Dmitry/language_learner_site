import store from "@/store/index";
import axios from "axios";

export default {
  state: {
    randomWord: [],
    word: [],
    words: [],
  },
  mutations: {
    SET_RANDOM_WORD: (state, randomWord) => {
      state.randomWord = randomWord;
    },
    CLEAR_RANDOM_WORD: (state) => {
      state.randomWord = [];
    },
    SET_WORD: (state, word) => {
      state.word = word;
    },
    CLEAR_WORD: (state) => {
      state.word = [];
    },
    SET_WORDS: (state, words) => {
      state.words = words;
    },
  },
  actions: {
    async GET_RANDOM_WORD({ commit }) {
      const server = store.getters.GET_SERVER_URL;
      await axios({
        method: "GET",
        url: `${server}/random_word`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => {
          commit("SET_RANDOM_WORD", response.data);
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
    async GET_WORD({ commit }, { request_word, word_id }) {
      const server = store.getters.GET_SERVER_URL;
      try {
        const data = {
          request_word,
          word_id,
        };
        await axios({
          method: "POST",
          url: `${server}/word`,
          data: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((response) => {
            commit("SET_WORD", response.data);
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
      } catch (e) {
        console.log(e);
      }
    },
    async GET_ALL_WORDS_OF_USER({ commit }) {
      const server = store.getters.GET_SERVER_URL;
      await axios({
        method: "GET",
        url: `${server}/words`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((response) => {
        commit("SET_WORDS", response.data);
      });
    },
  },
  getters: {
    RANDOM_WORD(state) {
      return state.randomWord;
    },
    WORD(state) {
      return state.word;
    },
    WORDS: (state) => {
      return state.words;
    },
  },
};
