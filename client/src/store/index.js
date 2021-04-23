import { createStore } from "vuex";
import authorization from "@/store/user";
import words from "@/store/words/words";
import word from "@/store/words/word";
import addWord from "@/store/words/addWord";

export default createStore({
  state: {
    backendUrl: "http://127.0.0.1:8001/api",
    error: null,
  },
  mutations: {
    SET_ERROR: (state, error) => {
      state.error = error;
    },
    CLEAR_ERROR: (state) => {
      state.error = null;
    },
  },
  actions: {},
  getters: {
    GET_SERVER_URL: (state) => {
      return state.backendUrl;
    },
    ERROR: (state) => state.error,
  },
  modules: {
    authorization,
    words,
    word,
    addWord,
  },
});
