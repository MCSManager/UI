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
  
  According to the GPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。

  根据协议，您必须保留所有版权声明，如果修改源码则必须开源修改后的源码。
  前往 https://mcsmanager.com/ 申请闭源开发授权或了解更多。
-->

<template>
  <Panel>
    <template #title>远程守护进程列表</template>
    <template #default>
      <el-table :data="services" stripe style="width: 100%" size="small">
        <el-table-column prop="ip" label="地址"></el-table-column>
        <el-table-column prop="port" label="端口"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <span>{{ scope.row.available ? "在线" : "离线" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column label="操作" style="text-align: center" width="140px">
          <template #default="scope">
            <el-button
              size="mini"
              @click="toImagesPanel(scope.row)"
              :disabled="!scope.row.available"
              >环境镜像管理</el-button
            >
            <!-- <el-button size="mini" @click="deleteImage(scope.row)" :disabled="!scope.row.available">主机本地环境</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Panel>
    <template #title>相关资料</template>
    <template #default>
      <el-row :gutter="10">
        <el-col :md="6" :offset="0">
          <ItemGroup>
            <SelectBlock style="min-height: 100px" @click="selectLink(1)">
              <template #title>检查本地环境</template>
              <template #info>学习如何在系统上知晓您当前的一些常用运行时环境</template>
            </SelectBlock>
          </ItemGroup>
        </el-col>
        <el-col :md="6" :offset="0">
          <ItemGroup>
            <SelectBlock style="min-height: 100px" @click="selectLink(2)">
              <template #title>安装 Docker 软件</template>
              <template #info>学习如何在常见 Linux 发行版系统上安装 Docker 软件</template>
            </SelectBlock>
          </ItemGroup>
        </el-col>
        <el-col :md="6" :offset="0"> </el-col>
        <el-col :md="6" :offset="0"> </el-col>
      </el-row>
    </template>
  </Panel>
</template>

<script>
import router from "../router";
import Panel from "../../components/Panel";
import { API_SERVICE_LIST } from "../service/common";
import { request } from "../service/protocol";
import SelectBlock from "../../components/SelectBlock";

export default {
  components: { Panel, SelectBlock },
  data: function () {
    return {
      services: []
    };
  },
  async mounted() {
    await this.render();
  },
  methods: {
    selectLink(type) {
      if (type === 1) {
        window.open(
          "https://github.com/Suwings/MCSManager/wiki/%E6%A3%80%E6%9F%A5%E4%B8%BB%E6%9C%BA%E6%9C%AC%E5%9C%B0%E7%8E%AF%E5%A2%83"
        );
      }
      if (type === 2) {
        window.open("https://www.runoob.com/docker/ubuntu-docker-install.html");
      }
    },
    async render() {
      this.services = await request({
        method: "GET",
        url: API_SERVICE_LIST
      });
    },
    toImagesPanel(row) {
      router.push({ path: `/image/${row.uuid}` });
    }
  }
};
</script>

<style></style>
