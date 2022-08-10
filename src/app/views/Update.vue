<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>Version Management</template>
    <template #default>
      <p></p>
    </template>
  </Panel>
  <Panel>
    <template #title>Distributed service version list </template>
    <template #default>
      <el-table :data="services" stripe style="width: 100%" size="small">
        <el-table-column prop="ip" label="address" width="140px"></el-table-column>
        <el-table-column prop="port" label="port" width="140px"></el-table-column>
        <el-table-column label="status" width="120px">
          <template #default="scope">
            <span>{{ scope.row.available ? "online" : "offline" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="Remarks" width="180px"></el-table-column>
        <el-table-column label="software version">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template #default="scope">
            <el-tag type="info" size="small" effect="plain"> 1.0.0 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="action" style="text-align: center" width="240px">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template #default="scope">
            <el-button size="mini" type="warning" plain>Updated version</el-button>
            <el-button size="mini" type="danger" plain>Restart</el-button>
            <el-button size="mini" type="danger" plain>Reload</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>
</template>

<script>
import Panel from "../../components/Panel";
import { API_SERVICE_LIST } from "../service/common";
import { request } from "../service/protocol";

export default {
  components: { Panel },
  data: function () {
    return {
      services: []
    };
  },
  async mounted() {
    await this.render();
  },
  methods: {
    async render() {
      this.services = await request({
        method: "GET",
        url: API_SERVICE_LIST
      });
    }
  }
};
</script>

<style></style>
