import store from "@/store/index";
import axios from "axios";

export default {
  state: {
    randomWord: [],
  },
  mutations: {
    SET_RANDOM_WORD: (state, randomWord) => {
      state.randomWord = randomWord;
    },
    CLEAR_RANDOM_WORD: (state) => {
      state.randomWord = [];
    },
  },
  actions: {
    async GET_RANDOM_WORD({ commit }) {
      const server = store.getters.GET_SERVER_URL;
      await axios({
        method: "GET",
        url: `${server}/random-word`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((response) => {
        commit("SET_RANDOM_WORD", response.data);
      });
    },
  },
  getters: {
    RANDOM_WORD(state) {
      return state.randomWord;
    },
  },
};
