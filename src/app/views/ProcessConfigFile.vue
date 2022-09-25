<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>{{ $t("processConfigFile.title") }}</template>
    <template #default>
      <div v-if="!failure" v-loading="loading" style="min-height: 600px">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <div class="row-mb">
              <ItemGroup>
                <el-button type="success" size="small" @click="save">{{
                  $t("instancesDetail.saveSet")
                }}</el-button>
                <el-button type="danger" size="small" @click="rf">{{
                  $t("processConfigFile.reload")
                }}</el-button>
                <el-button size="small" @click="back">{{ $t("processConfigFile.back") }}</el-button>
              </ItemGroup>
            </div>
          </el-col>
          <el-col :span="12" :offset="0" style="text-align: right">
            <div class="row-mb" style="text">
              <ItemGroup>
                <el-button type="primary" plain size="small" @click="toEdit">
                  {{ $t("processConfigFile.editOriginal") }}
                </el-button>
              </ItemGroup>
            </div>
          </el-col>
        </el-row>
        <!-- {{ config }} -->

        <component v-model="config" :is="configName"></component>
      </div>
      <div v-if="failure">
        <div class="text-center row-mb">
          <h3>
            <p>
              {{ $t("processConfigFile.noFile") }}
            </p>
          </h3>
          <el-button class="row-mt" size="small" @click="back">{{
            $t("processConfigFile.back")
          }}</el-button>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable no-unused-vars */

import Panel from "../../components/Panel";
import { request } from "../service/protocol";
import { API_PROCESS_CONFIG_FILE, toUnicode } from "../service/common";

import serverProperties from "../../components/mc_process_config/server.properties";
import spigotYml from "../../components/mc_process_config/spigot.yml";
import bukkitYml from "../../components/mc_process_config/bukkit.yml";
import eulaTxt from "../../components/mc_process_config/eula.txt";
import configYml from "../../components/mc_process_config/config.yml";
import bdsServerProperties from "../../components/mc_process_config/bds_server.properties";
import mohistYml from "../../components/mc_process_config/mohist.yml";
import paperYml from "../../components/mc_process_config/paper.yml";
import paperGlobalYml from "../../components/mc_process_config/paper-global.yml";
import paperWorldDefaultsYml from "../../components/mc_process_config/paper-world-defaults.yml";
import geyserYml from "../../components/mc_process_config/geyser.yml";
import mcdrConfigYml from "../../components/mc_process_config/mcdr_config.yml";
import permissionYml from "../../components/mc_process_config/permission.yml";

export default {
  components: {
    Panel,
    "common/server.properties": serverProperties,
    "common/eula.txt": eulaTxt,
    "bukkit/spigot.yml": spigotYml,
    "bukkit/bukkit.yml": bukkitYml,
    "bungeecord/config.yml": configYml,
    "bds/server.properties": bdsServerProperties,
    "mohist/mohist.yml": mohistYml,
    "paper/paper.yml": paperYml,
    "paper/paper-global.yml": paperGlobalYml,
    "paper/paper-world-defaults.yml": paperWorldDefaultsYml,
    "geyser/config.yml": geyserYml,
    "mcdr/config.yml": mcdrConfigYml,
    "mcdr/permission.yml": permissionYml
  },
  data: function () {
    return {
      type: this.$route.query.type,
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      configName: null,
      configPath: this.$route.query.configPath,
      config: null,
      loading: true,
      failure: false
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
    toEdit() {
      console.log(`Go to Edit:${this.configPath}`);
      this.$router.push({
        path: `/file_editor/${this.serviceUuid}/${this.instanceUuid}/`,
        query: {
          target: this.configPath,
          backType: 1
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    async save() {
      try {
        const config = { ...this.config };
        if (
          this.configPath == "server.properties" &&
          this.type &&
          this.type.startsWith("minecraft/java")
        ) {
          for (const key in config) {
            const value = config[key];
            if (value && typeof value == "string") {
              config[key] = toUnicode(value);
            }
          }
        }
        await request({
          method: "PUT",
          url: API_PROCESS_CONFIG_FILE,
          params: {
            uuid: this.instanceUuid,
            remote_uuid: this.serviceUuid,
            fileName: this.configPath,
            type: this.$route.query.extName
          },
          data: config
        });
        this.$message({ message: this.$t("home.updateSuccess"), type: "success" });
      } catch (err) {
        this.$message({ message: this.$t("processConfigFile.updateFailed"), type: "success" });
      }
    },
    async render() {
      const configName = this.$route.query.configName;
      try {
        const info = await request({
          method: "GET",
          url: API_PROCESS_CONFIG_FILE,
          params: {
            uuid: this.instanceUuid,
            remote_uuid: this.serviceUuid,
            fileName: this.configPath,
            type: this.$route.query.extName
          }
        });
        console.log(info);
        this.config = info;
        this.configName = configName;
      } catch {
        this.failure = true;
      }
    }
  },
  async mounted() {
    await this.render();
    this.loading = false;
  }
};
</script>
