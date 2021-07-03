<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-06-30 19:37:01
 * @Description: 
-->
<template>
  <div class="select-block">
    <slot></slot>
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
.select-block {
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  margin: 8px;
  padding: 4px;
  cursor: pointer;
  height: 200px;
  width: 200px;
  border-radius: 8px;

  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  transition: all 0.4s;
}

.select-block:hover {
  /* background-color: #d4d3d3; */
  border: 1px solid rgb(11, 78, 165);
}
</style>
