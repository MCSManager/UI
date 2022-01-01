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
  

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。
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
