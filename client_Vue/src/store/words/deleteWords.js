import store from "@/store/index";
import axios from "axios";

export default {
  state: {},
  mutations: {},
  actions: {
    async DELETE_VERB({ dispatch }, { word_id, verb_id }) {
      const server = store.getters.GET_SERVER_URL;
      const data = { word_id, verb_id };
      await axios({
        method: "DELETE",
        url: `${server}/word_delete-verb`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).catch((error) => {
        dispatch("LOG_AND_MESSAGE", error);
      });
    },
    async DELETE_NOUN({ dispatch }, { word_id, noun_id }) {
      const server = store.getters.GET_SERVER_URL;
      const data = { word_id, noun_id };
      await axios({
        method: "DELETE",
        url: `${server}/word_delete-noun`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).catch((error) => {
        dispatch("LOG_AND_MESSAGE", error);
      });
    },
    async DELETE_GENERAL({ dispatch }, { word_id, general_id }) {
      const server = store.getters.GET_SERVER_URL;
      const data = { word_id, general_id };
      await axios({
        method: "DELETE",
        url: `${server}/word_delete-general`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).catch((error) => {
        dispatch("LOG_AND_MESSAGE", error);
      });
    },
  },
  getters: {},
};
