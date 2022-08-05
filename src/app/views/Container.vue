<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
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
