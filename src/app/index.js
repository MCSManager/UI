/*
  Copyright (C) 2022 Suwings <Suwings@outlook.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  According to the AGPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings <Suwings@outlook.com>

  该程序是免费软件，您可以重新分发和/或修改据 GNU Affero 通用公共许可证的条款，
  由自由软件基金会，许可证的第 3 版，或（由您选择）任何更高版本。

  根据 AGPL 与用户协议，您必须保留所有版权声明，如果修改源代码则必须开源修改后的源代码。
  可以前往 https://mcsmanager.com/ 阅读用户协议，申请闭源开发授权等。
*/

// 此文件为程序入口文件

import { createApp } from "vue";
import elementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as elementIcons from "@element-plus/icons";

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

// Vue-Router
import router from "./router";
app.use(router);

// Install element-plus
app.use(elementPlus, { locale: zhCn });
app.use(elementIcons);

// 全局组件
import ItemGroup from "../components/ItemGroup";
app.component("ItemGroup", ItemGroup);
app.mount("#app");
