<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="select-block" :style="style">
    <div>
      <p class="color-black block-title">
        <slot name="title"></slot>
      </p>
      <p class="sub-title">
        <slot name="info"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    style: String
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.block-title {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.4px;
  margin: 10px 0px !important;
}
.select-block {
  border: 1px solid #dcdfe6;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.4s;
  padding: 4px 14px;
}

.select-block:hover {
  border: 1px solid #409eff;
}

.sub-title {
  color: gray;
  font-size: 13px;
}
</style>
