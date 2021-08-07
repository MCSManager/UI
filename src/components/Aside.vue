<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-08-07 13:14:41
 * @Description: 
-->
<template>
  <el-menu mode="vertical" :uniqueOpened="false" :router="true" @open="handleOpen" @close="handleClose" background-color="#303133" text-color="#fff" active-text-color="#ffd04b" style="height: 100%">
    <el-scrollbar>
      <div class="logo-wrapper">
        <el-image :src="require('../assets/logo.png')" fit="contain"></el-image>
      </div>
      <el-menu-item-group>
        <template #title>基础功能</template>
        <el-menu-item index="/overview" v-if="isTopPermission">
          <i class="el-icon-pie-chart"></i>
          <template #title>数据监控</template>
        </el-menu-item>
        <el-menu-item index="/instances" v-if="isTopPermission">
          <i class="el-icon-coin"></i>
          <template #title>应用实例</template>
        </el-menu-item>
        <el-menu-item index="/home" v-if="!isTopPermission">
          <i class="el-icon-pie-chart"></i>
          <template #title>信息总览</template>
        </el-menu-item>

      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>高级功能</template>
        <el-menu-item index="/services" v-if="isTopPermission">
          <i class="el-icon-connection"></i>
          <template #title>分布式服务</template>
        </el-menu-item>
        <el-menu-item index="/container2" v-if="isTopPermission">
          <i class="el-icon-copy-document"></i>
          <template #title>镜像管理</template>
        </el-menu-item>
        <el-menu-item index="/trigger" v-if="isTopPermission">
          <i class="el-icon-document"></i>
          <template #title>触发器</template>
        </el-menu-item>
        <!-- <el-menu-item index="/analysis" v-if="isTopPermission">
          <i class="el-icon-document"></i>
          <template #title>数据分析</template>
        </el-menu-item> -->
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>扩展功能</template>
        <el-menu-item index="/news" v-if="isTopPermission">
          <i class="el-icon-news"></i>
          <template #title>更新动态</template>
        </el-menu-item>
        <el-menu-item index="/extension" v-if="isTopPermission">
          <i class="el-icon-cpu"></i>
          <template #title>程序接口</template>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title>更多</template>
        <el-menu-item index="/setting" v-if="isTopPermission">
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toRouter(path) {
      router.push({ path });
    }
  },
  mounted() {}
};
</script>

<style>
.logo-wrapper {
  margin: 14px 0px;
  text-align: center;
}
</style>
