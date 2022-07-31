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
    <template #title>{{ $t('userResources.userInfo') }}</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :md="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">UUID</p>
            <p class="overview-info-value" v-text="userInfo.uuid"></p>
          </div>
        </el-col>
        <el-col :md="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">{{ $t('userResources.name') }}</p>
            <p class="overview-info-value" v-text="userInfo.userName"></p>
          </div>
        </el-col>
        <el-col :md="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">{{ $t('userResources.regTime') }}</p>
            <p class="overview-info-value" v-text="userInfo.registerTime"></p>
          </div>
        </el-col>
        <el-col :md="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">{{ $t('userResources.length') }}</p>
            <p class="overview-info-value" v-text="userInfo.instances.length"></p>
          </div>
        </el-col>
      </el-row>
    </template>
  </Panel>
  <Panel v-loading="loading">
    <template #title>{{ $t('userResources.resourceManage') }}</template>
    <template #default>
      <div class="sub-title row-mt">
        <p class="sub-title-title">{{ $t('userResources.userExcel') }}</p>
        <p class="sub-title-info">
          {{ $t('userResources.userExcelInfo') }}
        </p>
      </div>

      <div>
        <p class="sub-title-title">{{ $t('userResources.rentRisk') }}</p>
        <p class="sub-title-info">
          <span v-html="$t('userResources.rentRiskInfo')"></span>
        </p>
      </div>
      <div class="row-mt">
        <ItemGroup>
          <el-button size="small" type="success" @click="openAddInstancePanel">
            <i class="el-icon-plus"></i> {{ $t('userResources.addInstance') }}
          </el-button>
          <el-button size="small" type="primary" @click="save">
            <i class="el-icon-document-checked"></i> {{ $t('userResources.saveData') }}
          </el-button>
          <el-button size="small" @click="refresh">
            <i class="el-icon-refresh"></i> {{ $t('general.refresh') }}
          </el-button>
        </ItemGroup>
      </div>
      <div class="row-mt">
        <el-table :data="userInfo.instances" stripe style="width: 100%" size="small">
          <el-table-column :label="$t('userResources.daemon')" width="140">
            <template #default="{ row }"> {{ row.hostIp }}（{{ row.remarks }}） </template>
          </el-table-column>
          <el-table-column prop="nickname" :label="$t('instances.instanceName')" width="240"></el-table-column>
          <el-table-column :label="$t('instances.endTime')">
            <template #default="scope">
              {{ String(scope.row.endTime || "").split("T")[0] }}
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('instances.status.title')">
            <template #default="scope">
              {{ statusToText(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('general.operate')" style="text-align: center">
            <template #default="scope">
              <el-button size="mini" @click="deleteInstance(scope.row)">{{ $t('general.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </Panel>

  <!-- 新增实例框 -->
  <Dialog v-model="isAddInstanceForUser">
    <template #title>{{ $t("userResources.addInstanceForUser") }}</template>
    <template #default>
      <div class="sub-title">
        <p class="sub-title-title">{{ $t("general.allocation") }}</p>
        <p class="sub-title-info">{{ $t("userResources.addInstanceInfo") }}</p>
      </div>
      <SelectInstance :callback="selectedInstance"></SelectInstance>
    </template>
  </Dialog>

  <BusinessWarning v-model:visible="businessWarning" />
</template>

<script>
import Panel from "../../components/Panel";
import Dialog from "../../components/Dialog";
import SelectInstance from "../../components/SelectInstance";
import { API_USER } from "../service/common";
import { request } from "../service/protocol";
import { statusCodeToText } from "../service/instance_tools";
import BusinessWarning from "../../components/BusinessWarning";

export default {
  components: { Panel, SelectInstance, Dialog, BusinessWarning },
  data() {
    return {
      userUuid: this.$route.params.userUuid,
      userInfo: {
        instances: []
      },
      isAddInstanceForUser: false,
      loading: true,

      businessWarning: false
    };
  },
  methods: {
    openAddInstancePanel() {
      this.isAddInstanceForUser = true;
    },
    selectedInstance(row) {
      this.userInfo.instances.push({
        instanceUuid: row.instanceUuid,
        serviceUuid: row.serviceUuid,
        nickname: row.nickname,
        status: row.status,
        hostIp: row.hostIp
      });
      this.isAddInstanceForUser = false;
    },
    deleteInstance(row) {
      this.userInfo.instances.forEach((v, index) => {
        if (v.instanceUuid === row.instanceUuid) {
          this.userInfo.instances.splice(index, 1);
        }
      });
    },
    statusToText(code) {
      return statusCodeToText(code);
    },
    async save() {
      try {
        await request({
          method: "PUT",
          url: API_USER,
          data: {
            uuid: this.userUuid,
            config: this.userInfo
          }
        });
        this.$message({ type: "success", message: this.$t("home.updateSuccess") });
      } catch (error) {
        this.$message({
          type: "error",
          message: `Error: ${error.message}`
        });
      }
    },
    // 用户数据渲染
    async render() {
      const result = await request({
        method: "GET",
        url: API_USER,
        params: {
          uuid: this.userUuid,
          advanced: true
        }
      });
      this.userInfo = result;
      this.loading = false;
    },
    async refresh() {
      await this.render();
      this.$message({ type: "info", message: this.$t("general.refreshFinish") });
    }
  },
  async mounted() {
    const isTip = localStorage.getItem("hasBusinessTip") ?? false;
    if (!isTip) {
      localStorage.setItem("hasBusinessTip", true);
      this.businessWarning = true;
    }

    await this.render();
  }
};
</script>
