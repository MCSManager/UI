<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-07 10:33:37
 * @LastEditTime: 2021-09-07 11:21:55
 * @Description: 
-->

<template>
  <el-drawer :title="title" v-model="openDrawer" :direction="direction" destroy-on-close :size="width">
    <div class="component-drawer-body">
      <slot></slot>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    </div>
  </el-drawer>
</template>

<script>
// import Panel from "./Panel";

export default {
  props: {
    title: String
  },
  data: function () {
    return {
      openDrawer: false,
      width: "40%"
    };
  },
  methods: {
    open() {
      const w = document.documentElement.clientWidth;
      if (w > 900) {
        this.width = "40%";
      } else if (w > 720) {
        this.width = "50%";
      } else {
        this.width = "100%";
      }
      this.openDrawer = true;
    },
    close() {
      this.openDrawer = false;
    }
  },
  components: {}
};
</script>

<style scoped>
.component-drawer-body {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding: 20px;
}
</style>
