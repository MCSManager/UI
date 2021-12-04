<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-09-02 17:40:10
 * @Description: 
-->
<template>
  <div class="select-block" :style="style">
    <div>
      <p class="color-black" style="font-size: 14px; font-weight: 600; letter-spacing: -0.4px">
        <slot name="title"></slot>
      </p>
      <p>
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
</style>
