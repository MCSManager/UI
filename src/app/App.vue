<!--
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
-->
<template>
  <el-container>
    <!-- 管理用户 手机屏幕菜单栏 -->
    <el-drawer
      v-if="isTopPermission"
      size="240"
      v-model="drawer"
      :with-header="false"
      direction="ltr"
      style="padding: 0"
    >
      <el-aside width="240px" style="height: 100%">
        <Aside />
      </el-aside>
    </el-drawer>
    <!-- 管理用户 电脑屏幕菜单栏 -->
    <div v-if="isTopPermission" id="app-menu" class="only-pc-display">
      <el-aside width="240px" style="height: 100%">
        <Aside />
      </el-aside>
    </div>
    <el-container>
      <el-main>
        <el-row>
          <el-col>
            <Header v-bind:breadcrumbsList="breadCrumbs" :aside="toAside" />
          </el-col>
        </el-row>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "../components/Aside";
import Header from "../components/Header";
import { getPanelStatus, request, setupUserInfo } from "./service/protocol.js";
import router from "./router";
import { API_PANEL_STATUS } from "./service/common";
import store from "./store";

export default {
  name: "App",
  components: { Aside, Header },
  data: function () {
    return {
      breadCrumbs: [],
      mode: 1,
      drawer: false
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    isTopPermission() {
      return this.$store.state.userInfo.permission >= 10;
    }
  },
  methods: {
    toAside() {
      this.drawer = !this.drawer;
    },
    async getPanelStatus() {
      const statusInfo = await request({
        method: "GET",
        url: API_PANEL_STATUS
      });
      if (statusInfo?.isInstall === false) {
        return router.push({ path: "/install" });
      } else {
        store.commit("setPanelStatus", statusInfo);
      }
    }
  },
  async beforeCreate() {
    // 获取当前面板状态信息
    const statusInfo = await getPanelStatus();
    if (statusInfo?.isInstall === false) {
      return router.push({ path: "/install" });
    }
    // 第一次刷新后，尝试获取一次用户数据
    // 如果失败，则导航至 / 视图进一步决定跳转路由
    try {
      await setupUserInfo();
      const userInfo = this.$store.state.userInfo;
      if (!userInfo || !userInfo.uuid) throw new Error("userInfo.uuid is null");
    } catch (error) {
      router.push({ path: "/" });
    }
  },
  async mounted() {
    router.beforeEach((to, from, next) => {
      console.log("Router:", from, "->", to);
      // 设置在线信息全局状态
      this.$store.commit(
        "setOnlineNotice",
        window.onlineMCSManagerNotice ? window.onlineMCSManagerNotice() : null
      );
      this.breadCrumbs = [
        {
          title: to.name,
          path: to.fullPath
        }
      ];
      this.drawer = false;
      next();
    });
  }
};
</script>
