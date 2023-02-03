<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>{{ $t("container.remoteList") }}</template>
    <template #default>
      <p>
        {{ $t("Container.info") }}
        <br />
        {{ $t("Container.notSupportWindowsTip") }}
      </p>

      <SelectDaemon @selected="toImagesPanel"></SelectDaemon>

      <p v-iszh>
        {{ $t("container.relevantInfo") }}
        <br />

        <el-button type="text" size="small" @click="selectLink(1)">
          {{ $t("container.links[0].title") }}
        </el-button>

        <el-button type="text" size="small" @click="selectLink(2)">
          {{ $t("container.links[1].title") }}
        </el-button>
      </p>
    </template>
  </Panel>
</template>

<script>
import router from "../router";
import Panel from "../../components/Panel";
import { API_SERVICE_LIST } from "../service/common";
import { request } from "../service/protocol";
import SelectDaemon from "@/components/SelectDaemon.vue";

export default {
  components: { Panel, SelectDaemon },
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
        window.open("https://docs.mcsmanager.com/");
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
