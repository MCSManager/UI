<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-09-01 15:57:14
 * @Description: 
-->
<template>
  <el-card class="box-card-shadow" :body-style="bodyStyle || 'padding:12px;'" :style="style">
    <div class="box-card-title" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div class="box-card-content">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    style: String,
    bodyStyle: String
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.box-card-title {
  font-weight: 800;
  margin-bottom: 12px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card-content {
  font-size: 12px;
  font-weight: 400;
}

.box-card-shadow {
  border-radius: 4px;
}
</style>
