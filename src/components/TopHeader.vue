<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-09-02 17:40:24
 * @Description: 
-->
<template>
  <div>
    <div class="logo-wrapper2">
      <el-image :src="require('../assets/logo.png')" fit="contain"></el-image>
    </div>
  </div>
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

<style scoped>
.logo-wrapper2 {
  display: inline-block;
  margin: 14px 0px;
  text-align: center;
}
</style>
