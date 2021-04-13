import store from "@/store/index";
import axios from "axios";

export default {
  state: {},
  mutations: {},
  actions: {
    async LOGIN({ commit }, { username, user_password }) {
      try {
        const data = { username, user_password };
        const server = store.getters.GET_SERVER_URL;
        await axios
          .post(`${server}/authorization`, data)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            error.response.data.message;
            commit("SET_ERROR", error.response.data.message);
            setTimeout(() => {
              commit("CLEAR_ERROR");
            }, 0);
          });
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    async REGISTRATION({ commit }, { username, user_password, user_email }) {
      try {
        const data = { username, user_password, user_email };
        const server = store.getters.GET_SERVER_URL;
        await axios
          .post(`${server}/registration`, data)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            error.response.data.message;
            commit("SET_ERROR", error.response.data.message);
            setTimeout(() => {
              commit("CLEAR_ERROR");
            }, 0);
          });
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
  },
  modules: {},
  getters: {},
};
