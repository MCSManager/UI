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

import { createRouter, createWebHashHistory } from "vue-router";

import Overview from "./views/Overview";
import Instances from "./views/Instances";
import Services from "./views/Services";
import Users from "./views/Users";
import UserDetail from "./views/UserDetail";
import Analysis from "./views/Analysis";
import News from "./views/News";
import Container from "./views/Container";
import ImageManager from "./views/ImageManager";
import Extension from "./views/Extension";
import Settings from "./views/Settings";
import Terminal from "./views/Terminal";
import InstanceDetail from "./views/InstanceDetail";
import NewInstance from "./views/NewInstance";
import NewImage from "./views/NewImage";
import FileManager from "./views/FileManager";
import FileManagerEditor from "./views/FileManagerEditor";
import Home from "./views/Home";
import Login from "./views/Login";
import Trigger from "./views/Trigger";
import Root from "./views/Root";
import UserResources from "./views/UserResources";
import ProcessConfig from "./views/ProcessConfig";
import ProcessConfigFile from "./views/ProcessConfigFile";
import Schedule from "./views/Schedule";
import Update from "./views/Update";
import Quickstart from "./views/quickstart";
import Install from "./views/Install";

const routes = [
  {
    path: "/",
    name: "loading",
    component: Root
  },
  {
    path: "/overview",
    name: "overview",
    component: Overview
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/instances",
    name: "instances",
    component: Instances
  },
  {
    path: "/services",
    name: "services",
    component: Services
  },
  {
    path: "/private",
    name: "private",
    component: UserDetail
  },
  {
    path: "/users",
    name: "users",
    component: Users
  },
  {
    path: "/analysis",
    name: "analysis",
    component: Analysis
  },
  {
    path: "/news",
    name: "news",
    component: News
  },
  {
    path: "/container",
    name: "container",
    component: Container
  },
  {
    path: "/image/:serviceUuid",
    name: "imageManager",
    component: ImageManager,
    meta: { activeMenu: "/container" }
  },
  {
    path: "/trigger",
    name: "trigger",
    component: Trigger
  },
  {
    path: "/extension",
    name: "extension",
    component: Extension
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/new_image/:serviceUuid",
    name: "newImage",
    component: NewImage,
    meta: { activeMenu: "/container" }
  },
  {
    path: "/terminal/:serviceUuid/:instanceUuid",
    name: "terminal",
    component: Terminal,
    meta: { activeMenu: "/instances" }
  },
  {
    path: "/process_config_file/:serviceUuid/:instanceUuid/",
    name: "processConfigFile",
    component: ProcessConfigFile,
    meta: { activeMenu: "/instances" }
  },
  {
    path: "/process_config/:serviceUuid/:instanceUuid/",
    name: "processConfig",
    component: ProcessConfig,
    meta: { activeMenu: "/instances" }
  },
  {
    path: "/file/:serviceUuid/:instanceUuid",
    name: "fileManager",
    component: FileManager,
    meta: { activeMenu: "/instances" }
  },
  {
    path: "/file_editor/:serviceUuid/:instanceUuid/",
    name: "fileManagerEditor",
    component: FileManagerEditor,
    meta: { activeMenu: "/instances" }
  },
  {
    path: "/instance_detail/:serviceUuid/:instanceUuid",
    name: "instanceDetail",
    component: InstanceDetail,
    meta: { activeMenu: "/instances" }
  },
  {
    path: "/user_resources/:userUuid",
    name: "userResources",
    component: UserResources,
    meta: { activeMenu: "/users" }
  },
  {
    path: "/schedule/:serviceUuid/:instanceUuid",
    name: "schedule",
    component: Schedule,
    meta: { activeMenu: "/instances" }
  },
  {
    path: "/new_instace/:serviceUuid",
    name: "newInstance",
    component: NewInstance,
    meta: { activeMenu: "/instances" }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/quickstart",
    name: "quickStart",
    component: Quickstart
  },
  {
    path: "/update",
    name: "update",
    component: Update
  },
  {
    path: "/install",
    name: "install",
    component: Install
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
