
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
