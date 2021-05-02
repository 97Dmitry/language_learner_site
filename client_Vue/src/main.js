import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "./store/index";
import axios from "axios";
import messagePlugin from "@/utils/message.plugin.js";
import Loader from "@/components/App/Loader";
import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";
import "./assets/css/styles.scss";

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
    return Promise.reject(error);
  }
);

app.use(store);
app.use(router);
app.use(messagePlugin);
app.component("Loader", Loader);
app.mount("#app");
