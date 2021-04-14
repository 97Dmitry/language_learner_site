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
            const userId = JSON.stringify(response.data.user.id);
            const username = JSON.stringify(response.data.user.username);
            const token = JSON.stringify(response.data.token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
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
            commit(
              "SET_ERROR",
              error.response.data.message || error.response.data.errors[0].msg
            );
            setTimeout(() => {
              commit("CLEAR_ERROR");
            }, 0);
          });
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    LOGOUT() {
      localStorage.setItem("userId", "");
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
    },
    IS_AUTHORIZED() {},
  },
  modules: {},
  getters: {},
};
