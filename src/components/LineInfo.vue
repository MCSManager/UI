<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="line-info-wrapper">
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
.line-info-wrapper {
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
