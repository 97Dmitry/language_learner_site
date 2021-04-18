import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "./store";
import axios from "axios";
import messagePlugin from "@/utils/message.plugin.js";
import "./store/index";
import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";
import "./assets/styles/styles.scss";

const app = createApp(App);

let isRefreshing = false;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      response: { status, data },
    } = error;

    if (status === 401 && data.message === "Token expired") {
      if (!isRefreshing) {
        isRefreshing = true;
        store
          .dispatch("REFRESH_TOKEN")
          .then((status) => {
            if (status === 200 || status === 204) {
              isRefreshing = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
);

app.use(store);
app.use(router);
app.use(messagePlugin);
app.mount("#app");
