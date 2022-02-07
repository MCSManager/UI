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
  <el-menu
    class="page-el-menu"
    mode="vertical"
    :router="true"
    :uniqueOpened="false"
    background-color="#30313300"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height: 100%; padding: 0px 8px"
    :default-active="$route.path"
  >
    <el-scrollbar>
      <Logo></Logo>
      <el-menu-item-group>
        <template #title>基础功能</template>
        <el-menu-item key="/overview" index="/overview">
          <i class="el-icon-pie-chart"></i>
          <template #title>数据监控</template>
        </el-menu-item>
        <el-menu-item key="/instances" index="/instances">
          <i class="el-icon-coin"></i>
          <template #title>应用实例</template>
        </el-menu-item>
        <el-menu-item key="/users" index="/users">
          <i class="el-icon-user"></i>
          <template #title>用户管理</template>
        </el-menu-item>
        <!-- <el-menu-item key="/home" index="/home">
          <i class="el-icon-pie-chart"></i>
          <template #title>个人简报</template>
        </el-menu-item> -->
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>高级功能</template>
        <el-menu-item key="/services" index="/services">
          <i class="el-icon-connection"></i>
          <template #title>守护进程管理</template>
        </el-menu-item>
        <el-menu-item key="/container" index="/container">
          <i class="el-icon-copy-document"></i>
          <template #title>镜像与容器</template>
        </el-menu-item>
        <!-- <el-menu-item key="/update" index="/update">
          <i class="el-icon-guide"></i>
          <template #title>版本控制</template>
        </el-menu-item> -->
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>扩展功能</template>
        <el-menu-item key="/news" index="/news">
          <i class="el-icon-news"></i>
          <template #title>更新与通知</template>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>更多</template>
        <el-menu-item key="/settings" index="/settings">
          <i class="el-icon-setting"></i>
          <template #title>设置</template>
        </el-menu-item>
      </el-menu-item-group>

      <!-- <el-menu-item-group> -->
      <!-- <el-menu-item index="/extension">
          <i class="el-icon-cpu"></i>
          <template #title>程序接口</template>
        </el-menu-item> -->
      <!-- <el-menu-item index="/trigger">
          <i class="el-icon-document"></i>
          <template #title>触发器</template>
        </el-menu-item> -->
      <!-- <el-menu-item index="/analysis">
          <i class="el-icon-document"></i>
          <template #title>数据分析</template>
        </el-menu-item> -->
      <!-- </el-menu-item-group> -->
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
