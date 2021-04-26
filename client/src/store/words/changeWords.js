import store from "@/store/index";
import axios from "axios";

export default {
  state: {},
  mutations: {},
  actions: {
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
    async CHANGE_VERB_VALUE({ commit }, { word_id, id, new_value }) {
      try {
        const server = store.getters.GET_SERVER_URL;
        const data = { word_id, id, new_value };
        await axios({
          method: "PUT",
          url: `${server}/word_change-verb`,
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
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {},
};
