<!--
  Copyright (C) 2023 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div>
    <Panel>
      <template #title>进入远程节点</template>
      <template #default>
        <SelectDaemon @selected="selectDaemon"></SelectDaemon>
      </template>
    </Panel>
  </div>
</template>

<script>
import SelectDaemon from "@/components/SelectDaemon.vue";
import { GLOBAL_INSTANCE_UUID } from "../../service/common";
export default {
  components: { SelectDaemon },
  data: function () {
    return {};
  },
  methods: {
    selectDaemon(daemon) {
      console.log("选择:", daemon);
      this.$router.push({ path: `/global_files/${daemon?.uuid}/${GLOBAL_INSTANCE_UUID}/` });
    }
  }
};
</script>

<style></style>
