// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

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
import "../assets/css/dark-mode.scss";

import App from "./App.vue";
import "./service/protocol";
import directive from "./directive"

// PWA
import '../registerServiceWorker'

const app = createApp(App);

// Vuex 
import store from "./store";
app.use(store);
app.use(i18n)


// custom directive
directive(app)


// Vue-Router
import router from "./router";
app.use(router);

// Install element-plus
app.use(elementPlus);

// global component
import ItemGroup from "../components/ItemGroup";
import FunctionGroup from "../components/FunctionGroup.vue";
import FunctionGroupComponent from "../components/FunctionGroupComponent.vue";
import Panel from "../components/Panel.vue";

app.component("Panel", Panel);
app.component("ItemGroup", ItemGroup);
app.component("FunctionGroup", FunctionGroup);
app.component("FunctionComponent", FunctionGroupComponent);
app.mount("#app");

if ((localStorage.getItem("theme"))) {
    document.body.setAttribute("class", localStorage.getItem("theme"));
}
