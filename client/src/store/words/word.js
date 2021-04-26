import store from "@/store/index";
import axios from "axios";

export default {
  state: {
    randomWord: [],
    word: [],
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
    // type принимает значение minus или plus
    async CHANGE_WORD_KNOWLEDGE_VALUE({ commit }, { word, type }) {
      try {
        const server = store.getters.GET_SERVER_URL;
        if (word.knowledge < 5 && type === "plus") {
          const data = {
            newValueKnowledge: word.knowledge + 1,
            word_id: word.id,
          };
          await axios({
            method: "POST",
            url: `${server}/word_update-knowledge-value`,
            data: data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }).catch((error) => {
            console.log(error.response.data);
            commit(
              "SET_ERROR",
              error.response.data.message || error.response.data.errors[0].msg
            );
            setTimeout(() => {
              commit("CLEAR_ERROR");
            }, 0);
          });
        } else if (word.knowledge >= 0 && type === "minus") {
          const data = {
            newValueKnowledge: word.knowledge - 1,
            word_id: word.id,
          };
          await axios({
            method: "POST",
            url: `${server}/word_update-knowledge-value`,
            data: data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }).catch((error) => {
            console.log(error.response.data);
            commit(
              "SET_ERROR",
              error.response.data.message || error.response.data.errors[0].msg
            );
            setTimeout(() => {
              commit("CLEAR_ERROR");
            }, 0);
          });
        }
      } catch (e) {
        console.log(e);
      }
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
  },
  getters: {
    RANDOM_WORD(state) {
      return state.randomWord;
    },
    WORD(state) {
      return state.word;
    },
  },
};
