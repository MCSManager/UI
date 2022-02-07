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
          "https://github.com/MCSManager/MCSManager/wiki/%E6%A3%80%E6%9F%A5%E4%B8%BB%E6%9C%BA%E6%9C%AC%E5%9C%B0%E7%8E%AF%E5%A2%83"
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
