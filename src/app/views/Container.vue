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
    <template #title>{{ $t("container.remoteList") }}</template>
    <template #default>
      <el-table :data="services" stripe style="width: 100%" size="small">
        <el-table-column prop="ip" :label="$t('overview.addr')"></el-table-column>
        <el-table-column prop="port" :label="$t('overview.port')"></el-table-column>
        <el-table-column :label="$t('container.status')">
          <template #default="scope">
            <span>{{ scope.row.available ? this.$t("overview.online") : this.$t("overview.offline") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" :label="$t('overview.remarks')"></el-table-column>
        <el-table-column :label="$t('general.operate')" style="text-align: center" width="140px">
          <template #default="scope">
            <el-button
              size="mini"
              @click="toImagesPanel(scope.row)"
              :disabled="!scope.row.available"
              >{{ $t("container.imagesManage") }}</el-button
            >
            <!-- <el-button size="mini" @click="deleteImage(scope.row)" :disabled="!scope.row.available">主机本地环境</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Panel>
    <template #title>{{ $t("container.relevantInfo") }}</template>
    <template #default>
      <el-row :gutter="10">
        <el-col :md="6" :offset="0">
          <ItemGroup>
            <SelectBlock style="min-height: 100px" @click="selectLink(1)">
              <template #title>{{ $t("container.links[0].title") }}</template>
              <template #info>{{ $t("container.links[0].info") }}</template>
            </SelectBlock>
          </ItemGroup>
        </el-col>
        <el-col :md="6" :offset="0">
          <ItemGroup>
            <SelectBlock style="min-height: 100px" @click="selectLink(2)">
              <template #title>{{ $t("container.links[1].title") }}</template>
              <template #info>{{ $t("container.links[1].title") }}</template>
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
