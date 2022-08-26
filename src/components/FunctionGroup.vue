<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div v-if="!isPhone || container" :class="classConfig">
    <slot></slot>
  </div>
  <div v-else class="phone-operation-btn">
    <el-button type="primary" size="small" @click="operationClickHandler" plain>
      <i class="el-icon-s-operation"></i> {{ $t("general.moreOperation") }}
    </el-button>
  </div>
  <Dialog v-model="dialogVisible" :cancel="() => (dialogVisible = false)">
    <template #title>
      <i class="el-icon-s-operation"></i> {{ $t("general.moreOperation") }}
    </template>
    <template #default>
      <div class="phone-group">
        <slot></slot>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "./Dialog.vue";

export default {
  components: { Dialog },
  props: {
    container: {
      type: Boolean,
      default: false
    },
    style: {
      type: String,
      default: () => {}
    },
    class: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {
      classConfig: {
        "function-group": true
      },
      dialogVisible: false,
      isPhone: false
    };
  },
  mounted() {
    this.classConfig = {
      "function-group": true,
      "function-group-container": this.container,
      "float-right": this.align == "right",
      [this.class]: true
    };
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
.float-right {
  float: right;
}
.phone-operation-btn {
  overflow: hidden;
  display: block;

  margin: 0px 5px;
}

.phone-operation-btn button {
  width: 100% !important;
}

.function-group {
  margin: 0px;
  display: inline-block;
}
.function-group-container {
  overflow: hidden;
  display: block !important;
  margin: -5px;
}
.phone-group {
  margin: -5px;
}
</style>
