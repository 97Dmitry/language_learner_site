import store from "@/store/index";
import axios from "axios";

export default {
  state: {
    words: [],
  },
  mutations: {
    SET_WORDS: (state, words) => {
      state.words = words;
    },
  },
  actions: {
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
  modules: {},
  getters: {
    WORDS: (state) => {
      return state.words;
    },
  },
};
