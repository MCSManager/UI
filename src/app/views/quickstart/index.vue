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
  <div class="quick-container">
    <Panel style="max-width: 1200px">
      <template #title>{{ title }}</template>
      <template #default>
        <div v-show="step == 0">
          <!-- <span>欢迎您访问“快速开始”，我们将尽可能的降低使用门槛并帮助您使用面板！</span> -->
          <el-row :gutter="10" justify="left" class="">
            <el-col
              :md="6"
              :offset="0"
              v-for="(item, index) in quickItems"
              :key="index"
              @click="selectQuickStartType(item.value)"
            >
              <ItemGroup>
                <SelectBlock style="height: 120px; background-color: white">
                  <template #title>{{ item.title }}</template>
                  <template #info>{{ item.subTitle }}</template>
                </SelectBlock>
              </ItemGroup>
            </el-col>
          </el-row>
        </div>

        <div v-if="step == 1">
          <el-row :gutter="10" justify="left">
            <template v-for="(item, index) in remoteObjects" :key="index">
              <el-col :md="6" :offset="0" @click="selectHost(item.uuid)" v-if="item.available">
                <ItemGroup>
                  <SelectBlock style="height: 120px; background-color: white">
                    <template #title>{{ item.ip }}:{{ item.port }}</template>
                    <template #info>{{ item.remarks }}</template>
                  </SelectBlock>
                </ItemGroup>
              </el-col>
            </template>
          </el-row>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import SelectBlock from "@/components/SelectBlock";
import { request } from "@/app/service/protocol";
import { API_SERVICE } from "../../service/common";
import Panel from "@/components/Panel";
export default {
  components: { SelectBlock, Panel },
  data: function () {
    return {
      title: this.$t("quickStart.title"),
      remoteObjects: [],
      quickStartType: 0,
      step: 0,
      quickItems: [
        {
          title: this.$t("quickStart.quickItems[0].title"),
          subTitle: this.$t("quickStart.quickItems[0].subTitle"),
          value: 1
        },
        {
          title: this.$t("quickStart.quickItems[1].title"),
          subTitle: this.$t("quickStart.quickItems[1].subTitle"),
          value: 2
        },
        {
          title: this.$t("quickStart.quickItems[2].title"),
          subTitle: this.$t("quickStart.quickItems[2].subTitle"),
          value: 3
        },
        {
          title: this.$t("quickStart.quickItems[3].title"),
          subTitle: this.$t("quickStart.quickItems[3].subTitle"),
          value: 4
        }
      ]
    };
  },
  async mounted() {
    await this.initRemoteHost();
  },
  methods: {
    async initRemoteHost() {
      this.remoteObjects = await request({
        method: "GET",
        url: API_SERVICE
      });
    },
    selectQuickStartType(v) {
      if (v === 4) {
        return window.open("https://docs.mcsmanager.com/");
      }
      this.quickStartType = v;
      this.title = this.$t("quickStart.whichServer");
      this.step = 1;
    },
    selectHost(uuid) {
      this.$router.push({
        path: `/new_instace/${uuid}`,
        query: {
          type: this.quickStartType
        }
      });
    }
  }
};
</script>

<style scoped></style>
