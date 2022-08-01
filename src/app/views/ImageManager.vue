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
    <template #title>{{ $t("imageManager.remoteImageManage") }}</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <ItemGroup>
            <el-button type="success" size="small" @click="toNewImage"> {{ $t("imageManager.newImage") }} </el-button>
            <el-button type="" size="small" @click="refresh"> {{ $t("general.refresh") }} </el-button>
            <el-button type="" size="small" @click="back"> {{ $t("instancesDetail.back") }} </el-button>
          </ItemGroup>
        </div>
        <span class="color-gray hidden-md-and-down">{{ $t("imageManager.needTime") }}&nbsp;&nbsp;</span>
      </div>
    </template>
  </Panel>

  <Panel>
    <template #title>{{ $t("imageManager.remoteImageList") }}</template>
    <template #default>
      <p>{{ $t("imageManager.remoteImageListInfo") }}</p>
      <el-table :data="images" stripe style="width: 100%" size="small">
        <el-table-column label="ID">
          <template #default="scope">
            <span class="text-overflow-ellipsis">{{ scope.row.Id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="RepoTags" :label="$t('userResources.name')" width="120px"></el-table-column>

        <el-table-column :label="$t('imageManager.storage')" width="100px">
          <template #default="scope">
            <span>{{ parseInt(scope.row.Size / 1024 / 1024) }}MB</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('general.operate')" style="text-align: center" width="160px">
          <template #default="scope">
            <el-button size="mini" @click="toDetail(scope.row)">{{ $t("imageManager.details") }}</el-button>
            <el-button type="danger" size="mini" @click="deleteImage(scope.row)">{{ $t("general.delete") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Panel>
    <template #title>{{ $t("imageManager.remoteContainerList") }}</template>
    <template #default>
      <p>{{ $t("imageManager.remoteContainerListInfo") }}</p>
      <el-table :data="containers" stripe style="width: 100%" size="small">
        <el-table-column prop="Command" label="ID">
          <template #default="scope">
            <div class="text-overflow-ellipsis" style="max-width: 120px">{{ scope.row.Id }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Command" :label="$t('newInstances.launchCmd')">
          <template #default="scope">
            <div class="text-overflow-ellipsis" style="max-width: 120px">
              {{ scope.row.Command }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Image" :label="$t('imageManager.useImage')"></el-table-column>
        <!-- <el-table-column prop="Ports" label="端口开放">
          <template #default="scope">
            <div v-if="scope.row.Ports">
              <span v-for="(item,index) in scope.row.Ports" :key="index">
                {{item.PublicPort}}:{{item.PrivatePort}}&nbsp;
              </span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column prop="State" :label="$t('imageManager.status')"></el-table-column>
        <el-table-column prop="Status" :label="$t('imageManager.situation')"></el-table-column>
        <el-table-column :label="$t('general.operate')" style="text-align: center" width="90px">
          <template #default="scope">
            <el-button size="mini" @click="toDetail(scope.row)">{{ $t("imageManager.details") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Dialog v-model="dialog">
    <template #title>{{ $t("imageManager.infoDetail") }}</template>
    <template #default>
      <div class="sub-title">
        <p class="sub-title-title">{{ $t("imageManager.aboutDetail") }}</p>
        <p class="sub-title-info">
          {{ $t("imageManager.aboutDetailInfo") }}
        </p>
      </div>
      <pre style="max-height: 460px; overflow-y: auto">{{ detail }}</pre>
    </template>
  </Dialog>
</template>

<script>
import Panel from "../../components/Panel";
import { API_CONTAINERS, API_IMAGES } from "../service/common";
import { request } from "../service/protocol";
import Dialog from "../../components/Dialog";

export default {
  components: { Panel, Dialog },
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      images: [],
      containers: [],
      loading: true,
      dialog: false,
      detail: "",
      unsupported: false
    };
  },
  async mounted() {
    await this.render();
  },
  methods: {
    async refresh() {
      await this.render();
      this.$message({ type: "info", message: this.$t("general.refreshFinish") });
    },
    back() {
      this.$router.push({
        path: "/container"
      });
    },
    toNewImage() {
      this.$router.push({ path: `/new_image/${this.serviceUuid}` });
    },
    toDetail(row) {
      this.detail = JSON.stringify(row, null, 4);
      this.dialog = true;
    },
    async render() {
      try {
        this.images = await request({
          method: "GET",
          url: API_IMAGES,
          params: {
            remote_uuid: this.serviceUuid
          }
        });
        this.containers = await request({
          method: "GET",
          url: API_CONTAINERS,
          params: {
            remote_uuid: this.serviceUuid
          }
        });
        this.loading = false;
      } catch (error) {
        if (error.toString().includes("Unsupported")) {
          return (this.unsupported = true);
        }
        this.$notify({
          title: this.$t("imageManager.dataLoadError"),
          message: error.toString(),
          type: "error"
        });
      }
    },
    async deleteImage(row) {
      await this.$confirm(this.$t("imageManager.foreverDeleteImage"), this.$t("imageManager.tip"), {
        confirmButtonText: this.$t("general.confirm"),
        cancelButtonText: this.$t("general.confirm"),
        type: "warning"
      });
      try {
        await request({
          method: "DELETE",
          url: API_IMAGES,
          params: {
            remote_uuid: this.serviceUuid,
            imageId: String(row.RepoTags[0])
          }
        });
        this.$notify({
          title: this.$t("imageManager.sendDelCmd"),
          message: this.$t("imageManager.waitForDel"),
        });
      } catch (error) {
        this.$notify({
          title: this.$t("imageManager.delImageFailed"),
          message: error.toString(),
          type: "error"
        });
      }
    }
  }
};
</script>
