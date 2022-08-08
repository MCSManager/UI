<!--
Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
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
        <div v-loading="loading" style="min-height:50px">
          <router-view v-if="!loading"></router-view>
        </div>
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
      loading:true,
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
    try {
      // 获取当前面板状态信息
      const statusInfo = await getPanelStatus();
      if (statusInfo?.isInstall === false) {
        return router.push({ path: "/install" });
      }
      if (statusInfo.language) {
        this.$i18n.locale = statusInfo.language;
      } else {
        this.$i18n.locale = "en_us";
      }
      // 第一次刷新后，尝试获取一次用户数据
      // 如果失败，则导航至 / 视图进一步决定跳转路由
    
      await setupUserInfo();
      const userInfo = this.$store.state.userInfo;
      if (!userInfo || !userInfo.uuid) throw new Error("userInfo.uuid is null");
    } catch (error) {
      router.push({ path: "/" });
    }finally{
      this.loading = false
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
