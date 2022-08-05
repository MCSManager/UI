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
  <Panel v-if="configs">
    <template #title>{{ $t("processConfig.title") }}</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <ItemGroup class="row-mb">
            <el-button type="primary" size="small" @click="rf">{{ $t("general.refresh") }}</el-button>
            <el-button size="small" @click="back">{{ $t("schedule.backToConsole") }}</el-button>
          </ItemGroup>
          <div class="sub-title">
            <div class="sub-title">{{ $t("processConfig.aboutConfig") }}</div>
            <div class="sub-title-info">
              {{ $t("processConfig.aboutConfigInfo") }}
            </div>
          </div>
        </el-col>
      </el-row>
      <div v-if="isNotConfig">
        <el-alert
          :title="$t('processConfig.noConfigFile')"
          type="info"
          :description="$t('processConfig.noConfigFileInfo', {type})"
          show-icon
        >
        </el-alert>
      </div>
      <div v-for="(item, index) in configs" :key="index" class="row-mb">
        <BlockButton v-if="item.check" style="padding: 8px 0px">
          <template #title
            >{{ item.fileName }}
            <el-tag size="mini" type="warning" v-if="item.conflict">{{ $t("processConfig.sameFile") }}</el-tag>
          </template>
          <template #default>
            <div>
              {{ $t("processConfig.author") }}：<a class="alink" target="_black" :href="item.github">{{ item.author }}</a>
            </div>
            <div class="row-mt">
              <span>{{ item.info }}</span>
              <br />
              <span class="color-red" v-if="item.conflict"
                >{{ $t("processConfig.unknownCompatible") }}</span
              >
            </div>
          </template>
          <template #link>
            <el-button
              type="text"
              icon="el-icon-right"
              @click="toProcessConfig(item.redirect, item.path, item.type)"
              >{{ $t("processConfig.browse") }}</el-button
            >
          </template>
        </BlockButton>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "../../components/Panel";
import BlockButton from "../../components/BlockButton";
import { getInstanceConfigByType } from "../service/process_config";
import { request } from "../service/protocol";
import { API_PROCESS_CONFIG_LIST } from "../service/common";

export default {
  components: { Panel, BlockButton },
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      type: this.$route.query.type,
      configs: [],
      isNotConfig: false
    };
  },
  methods: {
    toProcessConfig(configName, configPath, extName) {
      this.$router.push({
        path: `/process_config_file/${this.serviceUuid}/${this.instanceUuid}/`,
        query: {
          type: this.type,
          configName,
          configPath,
          extName
        }
      });
    },
    async rf() {
      await this.render();
      this.$message({ message: this.$t("general.refreshFinish"), type: "info" });
    },
    back() {
      this.$router.push({ path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    async render() {
      const configFiles = getInstanceConfigByType(this.type);
      const files = [];
      configFiles.forEach((v) => {
        files.push(v.path);
      });
      const realFiles = await request({
        method: "POST",
        url: API_PROCESS_CONFIG_LIST,
        params: {
          uuid: this.instanceUuid,
          remote_uuid: this.serviceUuid
        },
        data: {
          files
        }
      });
      this.configs = [];
      this.isNotConfig = true;
      // 通过实际文件名和特定类型的配置列表进行比较
      realFiles.forEach((v) => {
        configFiles.forEach((z) => {
          if (z.path === v.file) {
            this.isNotConfig = false;
            // 检查是否已存在同名配置文件，存在则显示冲突
            configFiles.forEach((p) => {
              if (p.path == z.path && p.check) z.conflict = true;
            });
            z.check = true;
          }
        });
      });
      this.configs = configFiles;
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>
