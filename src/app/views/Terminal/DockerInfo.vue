<template>
  <Dialog v-model="v" :cancel="close">
    <template #title>容器资源限制信息</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :md="12" :offset="0"> </el-col>
      </el-row>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { TERMINAL_CODE } from "../../service/common";
export default {
  components: {
    Dialog
  },
  props: {
    dockerInfo: {
      type: Object
    }
  },
  data() {
    return {
      TERMINAL_CODE,
      v: false,
      options: {}
    };
  },

  methods: {
    open() {
      this.v = true;
    },
    close() {
      this.v = false;
    }
  }
};
</script>

<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<style scoped>
.btn-area {
  margin-top: 8px;
}
</style>
