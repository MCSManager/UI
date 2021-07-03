<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-05-25 13:45:38
 * @Description: 
-->
<template>
  <div class="line-info-warpper">
    <div class="line-info">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style>
.line-info-warpper {
  text-align: left;
  margin-bottom: 10px;
}

.line-info {
  /* background-color: #eeeeee; */
  font-size: 12px;
  padding: 2px 0px;
  overflow: hidden;
  display: block;
  cursor: pointer;
  color: #333;
  /* user-select: none; */
  transition: all 0.4s;
}

.line-button:hover {
  color: rgb(73, 73, 73);
}
</style>
