/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 10:07:55
 * @LastEditTime: 2021-05-18 18:36:58
 * @Description:
 */

import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "../plugins/element";
import "../assets/common.css";

// eslint-disable-next-line no-unused-vars
import socket from "./service/socket";

import router from "./router";

const app = createApp(App);
app.use(router);
installElementPlus(app);
app.mount("#app");
