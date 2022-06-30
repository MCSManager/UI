<!--
  Copyright (C) 2022 Suwings <Suwings@outlook.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  According to the AGPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings <Suwings@outlook.com>

  该程序是免费软件，您可以重新分发和/或修改据 GNU Affero 通用公共许可证的条款，
  由自由软件基金会，许可证的第 3 版，或（由您选择）任何更高版本。

  根据 AGPL 与用户协议，您必须保留所有版权声明，如果修改源代码则必须开源修改后的源代码。
  可以前往 https://mcsmanager.com/ 阅读用户协议，申请闭源开发授权等。
-->

<template>
  <transition name="el-fade-in-linear">
    <div v-show="modelValue" class="component-dialog-wrapper" :style="style">
      <div class="component-dialog-overflow">
        <transition name="el-zoom-in-center">
          <Panel v-show="modelValue" style="margin-bottom: 0px">
            <template #title>
              <slot name="title"></slot>
            </template>
            <template #rtitle>
              <div class="component-dialog-close-button" @click="close" v-if="canClose">
                <i class="el-icon-close"></i>
              </div>
            </template>
            <template #default>
              <div class="component-dialog-body">
                <slot></slot>
              </div>
            </template>
          </Panel>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import Panel from "./Panel";
// 使用 v-model 指令实现双向数据传递
export default {
  props: {
    modelValue: Boolean,
    cancel: Function,
    style: String,
    canClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue"],
  data: function () {
    return {
      visible: false
    };
  },
  methods: {
    close() {
      if (this.cancel) this.cancel();
      this.$emit("update:modelValue", false);
    }
  },
  components: { Panel }
};
</script>

<style scoped>
.component-dialog-overflow {
  max-height: 90%;
  max-width: 90%;
  overflow-y: auto;
}
.component-dialog-wrapper {
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
  transition: all 0.4s;
}
.component-dialog-body {
  word-break: break-all;
  overflow: hidden;
  width: 100%;
}
.component-dialog-close-button {
  cursor: pointer;
  font-size: 18px;
}
@media (max-width: 860px) {
  .component-dialog-overflow {
    max-height: 100%;
    max-width: 100%;
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }
}
</style>
