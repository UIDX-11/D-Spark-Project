import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import { createApp } from "vue";
import "../../../.design-spec/tokens/dist/tokens.css";
import App from "./App.vue";
import router from "./router";
import "./styles/arco-theme.css";
import "./styles/main.css";

const app = createApp(App);
app.use(ArcoVue);
app.use(router);
app.mount("#app");
