<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <!-- Admin Navigation Bar -->
  <el-card
    v-if="isTopPermission"
    class="box-card"
    body-style="padding: 12px;"
    style="margin-bottom: 20px; border-radius: 4px"
  >
    <el-row>
      <el-col :span="12">
        <div class="only-phone-display header-left-button" @click="toAside">
          <i class="el-icon-s-operation"></i>
        </div>
        <div
          style="font-size: 14px; font-weight: 700; line-height: 28px"
          v-for="(item, index) in breadcrumbsList"
          :to="{ path: item.path }"
          :key="index"
        >
          <span class="only-pc-display">
            {{ $t("router.panel") }}&nbsp;/&nbsp;{{ $t("router." + item.title) }}
          </span>
        </div>
      </el-col>
      <el-col :span="12" style="text-align: right; line-height: 28px; color: #409eff">
        <headerItems></headerItems>
      </el-col>
    </el-row>
  </el-card>

  <!-- User Navigation Bar -->
  <el-card
    v-if="!isTopPermission"
    class="box-card page-header-img"
    body-style="padding: 12px;"
    style="margin-bottom: 20px; border-radius: 4px; color: white"
  >
    <div class="flex flex-space-between">
      <router-link to="/home">
        <div style="height: 36px; line-height: 36px">
          <div>
            <Logo style="vertical-align: text-top" margin="0px"></Logo>
          </div>
        </div>
      </router-link>

      <div style="height: 36px; line-height: 36px">
        <headerItems></headerItems>
      </div>
    </div>
  </el-card>
</template>

<script>
import router from "@/app/router";
import { API_USER_LOGOUT } from "@/app/service/common";
import { request } from "@/app/service/protocol";
import Logo from "../Logo";
import headerItems from "./HeaderItems";

export default {
  components: { Logo, headerItems },
  props: {
    breadcrumbsList: Array,
    breadcrumbs: String,
    aside: Function
  },
  data: function () {
    return {};
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
    setTheme(v = "") {
      localStorage.setItem("theme", v);
      document.body.setAttribute("class", v);
      this.$message({ message: this.$t("fileManager.setSuccess"), type: "success" });
    },
    async refresh() {
      await this.render();
      this.$message({ message: this.$t("general.refreshFinish"), type: "success" });
    },
    toAside() {
      this.$props.aside();
    },
    toPrivate() {
      router.push({ path: "/private" });
    },
    async logout() {
      try {
        await request({
          method: "GET",
          url: API_USER_LOGOUT
        });
        window.location.href = "/";
        this.$notify({
          title: this.$t("root.logoutSuccess"),
          message: this.$t("root.logoutSuccessInfo"),
          type: "success"
        });
      } catch (error) {
        this.$notify({
          title: this.$t("root.logoutError"),
          message: error.message,
          type: "error",
          duration: 0
        });
      }
    }
  }
};
</script>

<style scoped>
.box-card {
  transition: all 0.4s;
}
.box-card:hover {
  transform: scale(1.01);
}

.header-left-button {
  line-height: 28px;
  font-size: 22px;
  cursor: pointer;
}

.page-header-img {
  background: url("../../assets/side.png");
  background-position-y: 40px;
  transition: all 1s;
}

.page-header-img:hover {
  background-position-y: 100px;
}

.header-a {
  color: rgb(235, 235, 235);
  font-weight: 400;
}
</style>
