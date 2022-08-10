// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

// 此文件为程序入口文件

import { createApp } from "vue";
import i18n from "./i18n"
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



const app = createApp(App);

// Vuex https://next.vuex.vuejs.org/zh/
import store from "./store";
app.use(store);
app.use(i18n)

app.directive("iszh", {
    // eslint-disable-next-line no-unused-vars
    mounted(el, binding, vnode) {
        const language = i18n.global.locale
        if (language != "zh_cn") el.style.display = 'none'
    }
})

// Vue-Router
import router from "./router";
app.use(router);

// Install element-plus
app.use(elementPlus);

// 全局组件
import ItemGroup from "../components/ItemGroup";

app.component("ItemGroup", ItemGroup);
app.mount("#app");

