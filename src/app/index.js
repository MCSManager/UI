/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 10:07:55
 * @LastEditTime: 2021-07-04 13:46:10
 * @Description:
 */

import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "../plugins/element";
import "../assets/common.css";
import "../assets/tools.css";

// eslint-disable-next-line no-unused-vars
import socket from "./service/socket";

import router from "./router";

const app = createApp(App);
app.use(router);
installElementPlus(app);
app.mount("#app");
