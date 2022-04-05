
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
import Transmission from "./views/Transmission";
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

const routes = [
  {
    path: "/",
    name: "加载中",
    component: Root
  },
  {
    path: "/overview",
    name: "数据监控",
    component: Overview
  },
  {
    path: "/home",
    name: "信息总览",
    component: Home
  },
  {
    path: "/instances",
    name: "应用实例",
    component: Instances
  },
  {
    path: "/services",
    name: "守护进程管理",
    component: Services
  },
  {
    path: "/private",
    name: "个人信息",
    component: UserDetail
  },
  {
    path: "/users",
    name: "用户管理",
    component: Users
  },
  {
    path: "/analysis",
    name: "面板数据分析",
    component: Analysis
  },
  {
    path: "/news",
    name: "更新与通知",
    component: News
  },
  {
    path: "/container",
    name: "镜像与容器",
    component: Container
  },
  {
    path: "/image/:serviceUuid",
    name: "镜像管理",
    component: ImageManager
  },
  {
    path: "/trigger",
    name: "面板触发器",
    component: Trigger
  },
  {
    path: "/extension",
    name: "面板扩展",
    component: Extension
  },
  {
    path: "/settings",
    name: "面板设置",
    component: Settings
  },
  {
    path: "/transmission",
    name: "通讯模块",
    component: Transmission
  },
  {
    path: "/new_image/:serviceUuid",
    name: "创建镜像",
    component: NewImage
  },
  {
    path: "/terminal/:serviceUuid/:instanceUuid",
    name: "实例控制台",
    component: Terminal
  },
  {
    path: "/process_config_file/:serviceUuid/:instanceUuid/",
    name: "实例配置文件",
    component: ProcessConfigFile
  },
  {
    path: "/process_config/:serviceUuid/:instanceUuid/",
    name: "实例特定配置",
    component: ProcessConfig
  },
  {
    path: "/file/:serviceUuid/:instanceUuid",
    name: "实例文件管理",
    component: FileManager
  },
  {
    path: "/file_editor/:serviceUuid/:instanceUuid/",
    name: "实例文件编辑",
    component: FileManagerEditor
  },
  {
    path: "/instance_detail/:serviceUuid/:instanceUuid",
    name: "实例配置详情",
    component: InstanceDetail
  },
  {
    path: "/user_resources/:userUuid",
    name: "用户资源",
    component: UserResources
  },
  {
    path: "/schedule/:serviceUuid/:instanceUuid",
    name: "计划任务",
    component: Schedule
  },
  {
    path: "/new_instace/:serviceUuid",
    name: "新增实例",
    component: NewInstance
  },
  {
    path: "/login",
    name: "登录",
    component: Login
  },
  {
    path: "/update",
    name: "版本控制",
    component: Update
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
