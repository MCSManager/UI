// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

// 此文件为程序入口文件

import { createApp } from "vue";
import { createI18n } from 'vue-i18n'
import elementPlus from "element-plus";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import "../assets/css/element-variables.scss";
import "../assets/css/common.css";
import "../assets/css/tools.css";
import "../assets/css/responsive.css";
import "../assets/css/action.css";

import App from "./App.vue";
import "./service/protocol";

import zh_cn from "../language/zh_cn"
import en_us from "../language/en_us"

const i18n = createI18n({
  locale: 'zh_cn',
  fallbackLocale: 'en_us',
  messages: {
    zh_cn,
    en_us
  },
})


const app = createApp(App);

// Vuex https://next.vuex.vuejs.org/zh/
import store from "./store";
app.use(store);
app.use(i18n)

// Vue-Router
import router from "./router";
app.use(router);

// Install element-plus
app.use(elementPlus);

// 全局组件
import ItemGroup from "../components/ItemGroup";
app.component("ItemGroup", ItemGroup);
app.mount("#app");
