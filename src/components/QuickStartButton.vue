<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="wrapper">
    <el-card class="box-card">
      <slot></slot>
    </el-card>
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

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
