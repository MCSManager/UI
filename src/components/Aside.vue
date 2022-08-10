<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <el-menu
    class="page-el-menu"
    mode="vertical"
    :router="true"
    :uniqueOpened="false"
    background-color="#30313300"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height: 100%; padding: 0px 8px"
    :default-active="$route.meta.activeMenu || $route.path"
  >
    <el-scrollbar>
      <Logo></Logo>
      <el-menu-item-group>
        <template #title>{{ $t("aside.basic") }}</template>
        <el-menu-item key="/overview" index="/overview">
          <i class="el-icon-pie-chart"></i>
          <template #title>{{ $t("router.overview") }}</template>
        </el-menu-item>
        <el-menu-item key="/instances" index="/instances">
          <i class="el-icon-coin"></i>
          <template #title>{{ $t("router.instances") }}</template>
        </el-menu-item>
        <el-menu-item key="/users" index="/users">
          <i class="el-icon-user"></i>
          <template #title>{{ $t("aside.user") }}</template>
        </el-menu-item>
        <el-menu-item key="/quickstart" index="/quickstart">
          <i class="el-icon-circle-plus-outline"></i>
          <template #title>{{ $t("router.quickStart") }}</template>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>{{ $t("aside.advanced") }}</template>
        <el-menu-item key="/services" index="/services">
          <i class="el-icon-connection"></i>
          <template #title>{{ $t("aside.node") }}</template>
        </el-menu-item>
        <el-menu-item key="/container" index="/container">
          <i class="el-icon-takeaway-box"></i>
          <template #title>{{ $t("router.container") }}</template>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>{{ $t("aside.more") }}</template>
        <el-menu-item key="/settings" index="/settings">
          <i class="el-icon-setting"></i>
          <template #title>{{ $t("router.settings") }}</template>
        </el-menu-item>
      </el-menu-item-group>
    </el-scrollbar>
  </el-menu>
</template>

<script>
import router from "../app/router";
import Logo from "../components/Logo.vue";

export default {
  components: { Logo },
  data: function () {
    return {};
  },
  watch: {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    isTopPermission() {
      return this.$store.state.userInfo.permission >= 10;
    }
  },
  methods: {
    toRouter(path) {
      router.push({ path });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.logo-wrapper {
  margin: 22px 0px;
  text-align: center;
}
.page-el-menu {
  background: url("../assets/side.png");
  transition: all 1s;
}

.page-el-menu:hover {
  background-position-x: 50px;
}
</style>
