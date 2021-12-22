<!--
 * @Author: Copyright(c) 2021 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-12-22 21:58:06
 * @Description: 
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
      <div class="logo-wrapper">
        <el-image :src="require('../assets/logo.png')" fit="contain"> </el-image>
      </div>
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
        <el-menu-item key="/home" index="/home">
          <i class="el-icon-pie-chart"></i>
          <template #title>信息总览</template>
        </el-menu-item>
        <el-menu-item key="/users" index="/users">
          <i class="el-icon-user"></i>
          <template #title>用户管理</template>
        </el-menu-item>
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

export default {
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
