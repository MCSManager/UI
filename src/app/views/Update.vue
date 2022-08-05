<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>版本管理</template>
    <template #default>
      <p></p>
    </template>
  </Panel>
  <Panel>
    <template #title>分布式服务版本列表 </template>
    <template #default>
      <el-table :data="services" stripe style="width: 100%" size="small">
        <el-table-column prop="ip" label="地址" width="140px"></el-table-column>
        <el-table-column prop="port" label="端口" width="140px"></el-table-column>
        <el-table-column label="状态" width="120px">
          <template #default="scope">
            <span>{{ scope.row.available ? "在线" : "离线" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="180px"></el-table-column>
        <el-table-column label="软件版本">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template #default="scope">
            <el-tag type="info" size="small" effect="plain"> 1.0.0 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align: center" width="240px">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template #default="scope">
            <el-button size="mini" type="warning" plain>更新版本</el-button>
            <el-button size="mini" type="danger" plain>重启</el-button>
            <el-button size="mini" type="danger" plain>重装</el-button>
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
