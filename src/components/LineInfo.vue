<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-09-02 17:39:39
 * @Description: 
-->
<template>
  <div class="line-info-warpper">
    <div class="line-info" :class="{ 'line-info-button': isButton }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isButton: Boolean
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.line-info-warpper {
  text-align: left;
  margin-bottom: 10px;
}

.line-info {
  /* background-color: #eeeeee; */
  font-size: 13px;
  padding: 2px 0px;
  overflow: hidden;
  display: block;

  color: #333;
  /* user-select: none; */
  transition: all 0.4s;
}
.line-info-button {
  cursor: pointer;
}
.line-info-button:hover {
  color: rgb(126, 123, 123);
}
</style>
