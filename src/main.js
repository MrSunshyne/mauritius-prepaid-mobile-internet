import { createApp } from "vue";

import Highcharts from "highcharts";
import VueHighcharts from "vue-highcharts";

import App from "./App.vue";
import "@/assets/styles/main.css";

const app = createApp(App);
app.mount("#app");
app.use(VueHighcharts, { Highcharts });
