<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>{{ $t("imageManager.remoteImageManage") }}</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <ItemGroup>
            <el-button type="success" size="small" @click="toNewImage">
              {{ $t("imageManager.newImage") }}
            </el-button>
            <el-button type="" size="small" @click="refresh">
              {{ $t("general.refresh") }}
            </el-button>
            <el-button type="" size="small" @click="back">
              {{ $t("instancesDetail.back") }}
            </el-button>
          </ItemGroup>
        </div>
        <span class="color-gray hidden-md-and-down"
          >{{ $t("imageManager.needTime") }}&nbsp;&nbsp;</span
        >
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
        <el-table-column
          prop="RepoTags"
          :label="$t('userResources.name')"
          width="120px"
        ></el-table-column>

        <el-table-column :label="$t('imageManager.storage')" width="100px">
          <template #default="scope">
            <span>{{ parseInt(scope.row.Size / 1024 / 1024) }}MB</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('general.operate')" style="text-align: center" width="160px">
          <template #default="scope">
            <el-button size="mini" @click="toDetail(scope.row)">{{
              $t("imageManager.details")
            }}</el-button>
            <el-button type="danger" size="mini" @click="deleteImage(scope.row)">{{
              $t("general.delete")
            }}</el-button>
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
            <el-button size="mini" @click="toDetail(scope.row)">{{
              $t("imageManager.details")
            }}</el-button>
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
          message: this.$t("imageManager.waitForDel")
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
