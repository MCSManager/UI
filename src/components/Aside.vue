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
  

  版权所有 (C) 2021 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。
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
          <template #title>分布式服务</template>
        </el-menu-item>
        <el-menu-item key="/container" index="/container">
          <i class="el-icon-copy-document"></i>
          <template #title>服务环境</template>
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
