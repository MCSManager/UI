<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-03 21:29:11
 * @LastEditTime: 2021-07-03 21:39:51
 * @Description: 基于 Element UI 的对话框
-->

<template>
  <div class="app-dialog-wrapper">
    <div class="app-dialog-panel">
      <Panel>
        <template #title>
          <slot name="title"></slot>
        </template>
        <template #default>
          <slot></slot>
        </template>
      </Panel>
    </div>
  </div>
</template>

<script>
import Panel from "./Panel";

export default {
  data: function () {
    return {};
  },
  methods: {},
  components: { Panel }
};
</script>

<style>
.app-dialog-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
