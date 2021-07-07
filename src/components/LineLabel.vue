<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-03 20:25:22
 * @LastEditTime: 2021-07-05 17:04:47
 * @Description: 标题定宽标签组件
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
    <div
      class="line-label-title"
      v-bind:class="{
        'line-label-title-120px': !space,
        'line-label-title-80px': space == 'small',
        'line-label-title-40px': space == 'mini'
      }"
    >
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
    size: String,
    space: String
  }
};
</script>

<style>
.line-label-wrapper {
  line-height: 14px;
  font-size: 14px;
  overflow: hidden;
}

.line-label-margin-24 {
  margin: 24px 0px;
}

.line-label-margin-12 {
  margin: 12px 0px;
}

.line-label-margin-4 {
  margin: 4px 0px;
}

.line-label-title-120px {
  width: 120px;
}

.line-label-title-80px {
  width: 80px;
}

.line-label-title-40px {
  width: 40px;
}

.line-label-title {
  display: inline-block;

  color: rgb(117, 117, 117);
}

.line-label-text {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}

.line-label-link {
  font-size: 14px;
  color: #348de6;
}
</style>
