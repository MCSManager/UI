/*
 * @Author: Copyright(c) 2021 Suwings
 * @Date: 2021-05-08 10:07:55
 * @LastEditTime: 2021-07-19 16:43:20
 * @Description: 入口文件
 */

import { createApp } from "vue";

const app = createApp(App);

// 装载 Vuex https://next.vuex.vuejs.org/zh/
import store from "./store";
app.use(store);

// 装载 Vue-Router
import router from "./router";
app.use(router);

import installElementPlus from "../plugins/element";
installElementPlus(app);
app.mount("#app");

// 导入全局 CSS 文件
import "../assets/css/common.css";
import "../assets/css/tools.css";
import "../assets/css/responsive.css";
import "../assets/css/action.css";

// 初始化协议框架
import "./service/protocol";

// 导入主应用组件
import App from "./App.vue";
