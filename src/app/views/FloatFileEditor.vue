<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="visible">
    <template #title>文件编辑</template>
    <template #default>
      <FileManagerEditor
        v-if="visible"
        :target="target"
        :serviceUuid="serviceUuid"
        :instanceUuid="instanceUuid"
      ></FileManagerEditor>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import FileManagerEditor from "./FileManagerEditor.vue";

export default {
  components: {
    Dialog,
    FileManagerEditor
  },
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      target: "",
      visible: false
    };
  },

  methods: {
    open(row, target) {
      this.target = target;
      this.visible = true;
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.component-dialog-overflow {
  max-height: 90%;
  max-width: 90%;
  overflow-y: auto;
}
.component-dialog-wrapper {
  text-align: left;
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
