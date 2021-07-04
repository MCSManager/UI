<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-07-03 20:22:50
 * @Description: 
-->
<template>
  <el-menu
    mode="vertical"
    :uniqueOpened="false"
    :router="true"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#303133"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height: 100%"
  >
    <el-scrollbar>
      <div class="logo-wrapper">
        <el-image :src="require('../assets/logo.png')" fit="contain"></el-image>
      </div>
      <el-menu-item-group>
        <template #title>基础功能</template>
        <el-menu-item index="/">
          <i class="el-icon-pie-chart"></i>
          <template #title>数据监控</template>
        </el-menu-item>
        <el-menu-item index="/instances">
          <i class="el-icon-coin"></i>
          <template #title>应用实例</template>
        </el-menu-item>
        <el-menu-item index="/private">
          <i class="el-icon-user"></i>
          <template #title>个人信息</template>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>高级功能</template>
        <el-menu-item index="/services">
          <i class="el-icon-connection"></i>
          <template #title>分布式服务</template>
        </el-menu-item>
        <el-menu-item index="/container">
          <i class="el-icon-copy-document"></i>
          <template #title>容器化</template>
        </el-menu-item>
        <el-menu-item index="/analysis">
          <i class="el-icon-document"></i>
          <template #title>数据分析</template>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>扩展功能</template>
        <el-menu-item index="/news">
          <i class="el-icon-news"></i>
          <template #title>新闻</template>
        </el-menu-item>
        <el-menu-item index="/extension">
          <i class="el-icon-cpu"></i>
          <template #title>面板扩展</template>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>其他</template>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <template #title>设置</template>
        </el-menu-item>
      </el-menu-item-group>
    </el-scrollbar>
  </el-menu>
</template>

<script>
import router from "../app/router";

export default {
  data: function () {
    return {
      url: "'require(../../assets/logo.png)'"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toRouter(path) {
      router.push({ path });
    }
  }
};
</script>

<style>
.logo-wrapper {
  margin: 14px 0px;
  text-align: center;
}
</style>
