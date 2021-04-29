import { createStore } from "vuex";
import authorization from "@/store/user";
import word from "@/store/words/getWords";
import addWord from "@/store/words/addWord";
import changeWords from "@/store/words/changeWords";
import deleteWords from "@/store/words/deleteWords";

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
  actions: {
    LOG_AND_MESSAGE({ commit }, error) {
      console.log(error.response.data);
      commit(
        "SET_ERROR",
        error.response.data.message || error.response.data.errors[0].msg
      );
      setTimeout(() => {
        commit("CLEAR_ERROR");
      }, 0);
    },
  },
  getters: {
    GET_SERVER_URL: (state) => {
      return state.backendUrl;
    },
    ERROR: (state) => state.error,
  },
  modules: {
    authorization,
    word,
    addWord,
    changeWords,
    deleteWords,
  },
});
