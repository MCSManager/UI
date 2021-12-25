<!--
 * @Author: Suwings
 * @Date: 2021-12-25 10:51:46
 * @LastEditTime: 2021-12-25 11:40:51
-->
<template>
  <div>
    <div class="logo-wrapper" :style="{ margin }">
      <img class="logo-img" :src="require('../assets/logo.png')" width="180" />
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
