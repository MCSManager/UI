<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="quick-btn-wrapper">
    <el-card class="box-card" :style="style">
      <p class="title">
        <slot name="title"></slot>
      </p>
      <p class="body">
        <slot name="info"></slot>
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    size: String,
    space: String,
    style: Object
  }
};
</script>

<style lang="scss" scoped>
.quick-btn-wrapper {
  .box-card {
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.4s;
  }

  .box-card:hover {
    transform: scale(1.04);
    filter: brightness(0.89);
    border: 1px solid rgb(12, 88, 174);
  }

  .title {
    font-weight: 600;
    margin: 0px;
    margin-bottom: 8px;
  }
  .body {
    margin: 0px;
    font-size: 13px;
  }
}
</style>
