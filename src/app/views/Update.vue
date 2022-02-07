<!--
  Copyright (C) 2022 Suwings <Suwings@outlook.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  According to the AGPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings <Suwings@outlook.com>

  该程序是免费软件，您可以重新分发和/或修改据 GNU Affero 通用公共许可证的条款，
  由自由软件基金会，许可证的第 3 版，或（由您选择）任何更高版本。

  根据 AGPL 与用户协议，您必须保留所有版权声明，如果修改源代码则必须开源修改后的源代码。
  可以前往 https://mcsmanager.com/ 阅读用户协议，申请闭源开发授权等。
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
