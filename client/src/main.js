import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin.js";
import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";
import "./assets/styles/styles.scss";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(messagePlugin);
app.mount("#app");
