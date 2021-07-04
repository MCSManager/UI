<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-07-03 20:39:03
 * @Description: 
-->
<template>
  <div class="line-label-wrapper">
    <div class="line-label-title">
      <slot name="title"></slot>
    </div>
    <div class="line-label-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style>
.line-label-wrapper {
  line-height: 14px;
  font-size: 14px;
  margin: 24px 0px;
  overflow: hidden;
}

.line-label-title {
  display: inline-block;
  width: 120px;
  color: rgb(117, 117, 117);
}

.line-label-text {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}
</style>
