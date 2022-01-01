<!--
  Copyright (C) 2022 Suwings(https://github.com/Suwings)

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。
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
import { setupUserInfo } from "./service/protocol.js";
import router from "./router";

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
    nav() {
      // 若用户地址本身不为根目录，则不管
      console.log("路由地址:", this.$route.path);
      if (this.$route.path != "/") return;
      // 根据不同的用户类型进行跳转
      const userInfo = this.$store.state.userInfo;
      if (userInfo && userInfo.permission >= 10) {
        console.log("导航至管理界面");
        router.push({ path: "/overview" });
      } else {
        console.log("导航至普通界面");
        router.push({ path: "/home" });
      }
    }
  },
  async beforeCreate() {
    try {
      await setupUserInfo();
      this.nav();
    } catch (error) {
      console.log("App.vue setupUserInfo():", error);
      router.push({ path: "/login" });
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
