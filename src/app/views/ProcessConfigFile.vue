<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-30 17:05:22
 * @LastEditTime: 2021-08-07 12:45:56
 * @Description: 
-->
<template>

  <Panel>
    <template #title>配置文件</template>
    <template #default>
      <div v-loading="loading" style="min-height:600px" element-loading-text="加载中">
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <div class="row-mb">
              <el-button type="success" size="small" @click="save">保存配置</el-button>
              <el-button type="danger" size="small" @click="rf">放弃并刷新</el-button>
              <el-button size="small" @click="back">回到配置文件列表</el-button>
            </div>
          </el-col>
        </el-row>
        {{config}}
        <component v-model="config" :is="configName"></component>
      </div>
    </template>
  </Panel>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable no-unused-vars */

import Panel from "../../components/Panel";
import { request } from "../service/protocol";
import { API_PROCESS_CONFIG_FILE } from "../service/common";

import serverProperties from "../../components/mc_process_config/server.properties";
import spigotYml from "../../components/mc_process_config/spigot.yml";

export default {
  components: {
    Panel,
    "server.properties": serverProperties,
    "spigot.yml": spigotYml
  },
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      configName: null,
      config: null,
      loading: true
    };
  },
  methods: {
    async rf() {
      this.configName = null;
      this.loading = true;
      this.config = null;
      await this.render();
      this.loading = false;
    },
    back() {
      this.$router.push({
        path: `/process_config/${this.serviceUuid}/${this.instanceUuid}/`
      });
    },
    async save() {
      const configName = this.$route.params.configName;
      console.log(this.config);
      try {
        await request({
          method: "PUT",
          url: API_PROCESS_CONFIG_FILE,
          params: {
            uuid: this.instanceUuid,
            remote_uuid: this.serviceUuid,
            fileName: configName
          },
          data: this.config
        });
        this.$message({ message: "更新成功", type: "success" });
      } catch (err) {
        this.$message({ message: "更新失败", type: "success" });
      }
    },
    async render() {
      const configName = this.$route.params.configName;
      const info = await request({
        method: "GET",
        url: API_PROCESS_CONFIG_FILE,
        params: {
          uuid: this.instanceUuid,
          remote_uuid: this.serviceUuid,
          fileName: configName
        }
      });
      if (info.config) this.config = info.config;
      this.configName = configName;
    }
  },
  async mounted() {
    await this.render();
    this.loading = false;
  }
};
</script>
