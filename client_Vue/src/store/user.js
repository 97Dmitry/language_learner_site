import store from "./index";
import axios from "axios";

export default {
  state: {},
  mutations: {},
  actions: {
    async AUTHORIZATION({ commit }, { username, user_password }) {
      try {
        const data = { username, user_password };
        const server = store.getters.GET_SERVER_URL;
        await axios({
          method: "POST",
          url: `${server}/authorization`,
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => {
            localStorage.setItem("userId", response.data.user.user_id);
            localStorage.setItem(
              "accessToken",
              response.data.tokens.accessToken
            );
            localStorage.setItem(
              "refreshToken",
              response.data.tokens.refreshToken
            );
            localStorage.setItem("username", response.data.user.username);
          })
          .catch((error) => {
            console.log(error);
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
    async REGISTRATION({ commit }, { username, user_password, user_email }) {
      try {
        const data = { username, user_password, user_email };
        const server = store.getters.GET_SERVER_URL;
        await axios.post(`${server}/registration`, data).catch((error) => {
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
        commit("SET_ERROR", e);
        throw e;
      }
    },
    LOGOUT() {
      localStorage.setItem("userId", "");
      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");
      localStorage.setItem("username", "");
    },
    IS_AUTHORIZED() {},
    async REFRESH_TOKEN({ commit }) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const data = { refreshToken: refreshToken };
        const server = store.getters.GET_SERVER_URL;
        await axios.post(`${server}/refresh-token`, data).then((response) => {
          localStorage.setItem("accessToken", response.data.tokens.accessToken);
          localStorage.setItem(
            "refreshToken",
            response.data.tokens.refreshToken
          );
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
