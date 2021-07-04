<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-03 21:29:11
 * @LastEditTime: 2021-07-04 15:31:25
 * @Description: Index 系统预览框
-->

<template>
  <div class="component-system-wrapper">
    <div class="component-system-img-wrapper">
      <div class="component-system-img"></div>
    </div>
    <div class="component-system-content">
      <p class="component-system-title">MCSManager</p>
      <p class="component-system-subtitle color-gray">Windows 10 build 21h2</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style>
.component-system-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.component-system-img-wrapper {
  margin: 0px;
  overflow: hidden;
  border-radius: 2px;
}
.component-system-img {
  background: url("/static/images/index.png") no-repeat;
  background-size: cover;
  background-position: center;
  height: 80px;
  width: 120px;
}
.component-system-content {
  margin-left: 18px;
}
.component-system-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0px;
}
.component-system-subtitle {
  font-size: 12px;
}
</style>
