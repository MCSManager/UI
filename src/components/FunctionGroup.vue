<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div>
    <div v-if="!isPhone">
      <div class="function_group">
        <slot></slot>
      </div>
    </div>
    <div v-else>
      <el-button type="primary" size="small" @click="operationClickHandler">Operation</el-button>
    </div>
  </div>
  <Dialog v-model="dialogVisible" :cancel="() => (dialogVisible = false)">
    <template #title>Operation</template>
    <template #default>
      <slot></slot>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "./Dialog.vue";

export default {
  components: { Dialog },
  props: {
    style: {
      type: String,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      isPhone: false
    };
  },
  mounted() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    resizeHandler() {
      if (window.innerWidth <= 900) {
        this.isPhone = true;
      } else {
        this.isPhone = false;
      }
    },
    operationClickHandler() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.func {
  display: inline-block;
}
.function_group {
  margin: -6px;
}
</style>
