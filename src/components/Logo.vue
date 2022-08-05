<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div>
    <div class="logo-wrapper" :style="{ margin }">
      <img class="logo-img" :src="require('../assets/logo.png')" width="172" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    style: String,
    margin: String
  },
  data: function () {
    return {};
  }
};
</script>

<style scoped>
.logo-img {
  vertical-align: middle;
}
.logo-wrapper {
  margin: 22px 0px;
  text-align: center;
}
</style>
