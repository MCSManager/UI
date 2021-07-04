<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-07-04 13:09:01
 * @Description: 
-->
<template>
  <div
    class="line-label-wrapper"
    v-bind:class="{
      'line-label-margin-24': !size,
      'line-label-margin-12': size == 'small',
      'line-label-margin-4': size == 'mini'
    }"
  >
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
  props: {
    size: String
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style>
.line-label-margin-24 {
  margin: 24px 0px;
}

.line-label-margin-12 {
  margin: 12px 0px;
}

.line-label-margin-4 {
  margin: 4px 0px;
}

.line-label-wrapper {
  line-height: 14px;
  font-size: 14px;
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
