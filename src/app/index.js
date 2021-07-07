/*
 * @Author: Copyright(c) 2021 Suwings
 * @Date: 2021-05-08 10:07:55
 * @LastEditTime: 2021-07-06 21:23:14
 * @Description: 入口文件
 */

import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "../plugins/element";
import "../assets/css/common.css";
import "../assets/css/tools.css";
import "../assets/css/responsive.css";

// eslint-disable-next-line no-unused-vars
import socket from "./service/socket";

import router from "./router";

const app = createApp(App);
app.use(router);
installElementPlus(app);
app.mount("#app");
