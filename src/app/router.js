// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

import {createRouter, createWebHashHistory} from "vue-router";

import Overview from "./views/Overview";
import Instances from "./views/Instances";
import Services from "./views/Services";
import Users from "./views/Users";
import UserDetail from "./views/UserDetail";
import Analysis from "./views/Analysis";
import GlobalFileManager from "./views/GlobalFileManager";
import GlobalTerminalEntry from "./views/GlobalTerminal";
import FileManagerCopy from "./views/GlobalFileManager/copy";
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
import Register from "./views/Register";
import Trigger from "./views/Trigger";
import Root from "./views/Root";
import UserResources from "./views/UserResources";
import ProcessConfig from "./views/ProcessConfig";
import ProcessConfigFile from "./views/ProcessConfigFile";
import Schedule from "./views/Schedule";
import Update from "./views/Update";
import Quickstart from "./views/quickstart";
import Install from "./views/Install";
import UnavailableTerminal from "./views/Terminal/UnavailableTerminal";

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
        meta: {activeMenu: "/container"}
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
        meta: {activeMenu: "/container"}
    },
    {
        path: "/terminal/:serviceUuid/:instanceUuid",
        name: "terminal",
        component: Terminal,
        meta: {activeMenu: "/instances"}
    },
    {
        path: "/terminal_error",
        name: "terminalError",
        component: UnavailableTerminal,
        meta: {activeMenu: "/instances"}
    },
    {
        path: "/process_config_file/:serviceUuid/:instanceUuid/",
        name: "processConfigFile",
        component: ProcessConfigFile,
        meta: {activeMenu: "/instances"}
    },
    {
        path: "/process_config/:serviceUuid/:instanceUuid/",
        name: "processConfig",
        component: ProcessConfig,
        meta: {activeMenu: "/instances"}
    },
    {
        path: "/file/:serviceUuid/:instanceUuid",
        name: "fileManager",
        component: FileManager,
        meta: {activeMenu: "/instances"}
    },
    {
        path: "/file_editor/:serviceUuid/:instanceUuid/",
        name: "fileManagerEditor",
        component: FileManagerEditor,
        meta: {activeMenu: "/instances"}
    },
    {
        path: "/instance_detail/:serviceUuid/:instanceUuid",
        name: "instanceDetail",
        component: InstanceDetail,
        meta: {activeMenu: "/instances"}
    },
    {
        path: "/user_resources/:userUuid",
        name: "userResources",
        component: UserResources,
        meta: {activeMenu: "/users"}
    },
    {
        path: "/schedule/:serviceUuid/:instanceUuid",
        name: "schedule",
        component: Schedule,
        meta: {activeMenu: "/instances"}
    },
    {
        path: "/new_instance/:serviceUuid",
        name: "newInstance",
        component: NewInstance,
        meta: {activeMenu: "/instances"}
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
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
    {
        path: "/global_file_manager_entry",
        name: "globalFileManagerEntry",
        component: GlobalFileManager
    },
    {
        path: "/global_files/:serviceUuid/:instanceUuid",
        name: "globalFileManager",
        component: FileManagerCopy,
        meta: {activeMenu: "/global_file_manager_entry"}
    },
    {
        path: "/global_terminal_entry",
        name: "globalTerminalEntry",
        component: GlobalTerminalEntry
    },
    {
        path: "/global_terminal/:serviceUuid/:instanceUuid",
        name: "globalTerminal",
        component: Terminal,
        meta: {activeMenu: "/global_terminal_entry"}
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
