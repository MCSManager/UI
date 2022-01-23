<!--
  Copyright (C) 2022 Suwings(https://github.com/Suwings)

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  
  According to the GPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。

  根据协议，您必须保留所有版权声明，如果修改源码则必须开源修改后的源码。
  前往 https://mcsmanager.com/ 申请闭源开发授权或了解更多。
-->

<template>
  <transition name="el-fade-in-linear">
    <div v-show="modelValue" class="component-dialog-wrapper" :style="style">
      <div class="component-dialog-overflow">
        <transition name="el-zoom-in-center">
          <Panel v-show="modelValue" style="margin-bottom: 0px">
            <template #title>
              <div class="flex flex-space-between flex-align-items-center" style="width: 100%">
                <slot name="title"></slot>
                <div class="component-dialog-close-button" @click="close">
                  <i class="el-icon-close"></i>
                </div>
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
    style: String
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
