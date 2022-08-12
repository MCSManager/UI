<!--
Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->
<template>
  <el-container>
    <!-- Manage users phone screen menu bar -->
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
    <!-- Manage users Computer screen menu bar -->
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
        <div v-loading="loading" style="min-height: 50px">
          <router-view v-if="!loading"></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "../components/Aside";
import Header from "../components/Header";
import { requestPanelStatus, setupUserInfo } from "./service/protocol.js";
import router from "./router";

export default {
  name: "App",
  components: { Aside, Header },
  data: function () {
    return {
      loading: true,
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
      return this.$store.state.userInfo?.permission >= 10;
    }
  },
  methods: {
    toAside() {
      this.drawer = !this.drawer;
    }
  },

  async created() {
    let needToRoot = false;
    let needInstall = false;

    try {
      // After the first refresh, try to get user data once
      // If it fails, navigate to / view to further decide the jump route
      await setupUserInfo();
      const userInfo = this.$store.state.userInfo;
      if (!userInfo || !userInfo.uuid) throw new Error("userInfo.uuid is null");
    } catch (error) {
      console.log(error);
      needToRoot = true;
    }

    try {
      // Get current panel status information
      const statusInfo = await requestPanelStatus();
      if (statusInfo.language) {
        console.log("SET_LANGUAGE:", statusInfo.language);
        this.$i18n.locale = statusInfo.language;
      } else {
        this.$i18n.locale = "en_us";
      }
      // If not installed, must route to /install
      if (statusInfo?.isInstall === false) needInstall = true;
    } catch (error) {
      alert(error + " Please refresh!");
    }

    this.loading = false;
    if (needInstall) return router.push({ path: "/install" });
    if (needToRoot) return router.push({ path: "/" });
  },

  async mounted() {
    router.beforeEach((to, from, next) => {
      console.log("Router:", from, "->", to);
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
