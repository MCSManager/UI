/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 22:54:31
 * @LastEditTime: 2021-07-14 14:22:46
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";

import Overview from "./views/Overview";
import Instances from "./views/Instances";
// import About from "./views/About";
import Services from "./views/Services";
// import Users from "./views/Users";
import UserDetail from "./views/UserDetail";

import Analysis from "./views/Analysis";
import News from "./views/News";
import Container from "./views/Container";
import Extension from "./views/Extension";
import Setting from "./views/Setting";
import Terminal from "./views/Terminal";
import InstanceDetail from "./views/InstanceDetail";
import NewInstance from "./views/NewInstance";
import NewImage from "./views/NewImage";
import FileManager from "./views/FileManager";

const routes = [
  {
    path: "/",
    name: "数据监控",
    component: Overview
  },
  {
    path: "/overview",
    name: "数据监控 ",
    component: Overview
  },
  {
    path: "/instances",
    name: "应用实例",
    component: Instances
  },
  {
    path: "/services",
    name: "分布式服务",
    component: Services
  },
  {
    path: "/private",
    name: "个人信息",
    component: UserDetail
  },
  {
    path: "/analysis",
    name: "分析",
    component: Analysis
  },
  {
    path: "/news",
    name: "新闻",
    component: News
  },
  {
    path: "/container",
    name: "容器",
    component: Container
  },
  {
    path: "/extension",
    name: "面板扩展",
    component: Extension
  },
  {
    path: "/Setting",
    name: "设置",
    component: Setting
  },
  {
    path: "/new_image",
    name: "创建镜像",
    component: NewImage
  },
  {
    path: "/terminal/:serviceUuid/:instanceUuid",
    name: "终端",
    component: Terminal
  },
  {
    path: "/file/:serviceUuid/:instanceUuid",
    name: "文件管理",
    component: FileManager
  },
  {
    path: "/instance_detail/:serviceUuid/:instanceUuid",
    name: "实例详情",
    component: InstanceDetail
  },
  {
    path: "/new_instace/",
    name: "新增实例",
    component: NewInstance
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
