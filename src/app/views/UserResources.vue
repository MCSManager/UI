<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>{{ $t("userResources.userInfo") }}</template>
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
            <p class="overview-info-title">{{ $t("userResources.name") }}</p>
            <p class="overview-info-value" v-text="userInfo.userName"></p>
          </div>
        </el-col>
        <el-col :md="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">{{ $t("userResources.regTime") }}</p>
            <p class="overview-info-value" v-text="userInfo.registerTime"></p>
          </div>
        </el-col>
        <el-col :md="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">{{ $t("userResources.length") }}</p>
            <p class="overview-info-value" v-text="userInfo.instances.length"></p>
          </div>
        </el-col>
      </el-row>
    </template>
  </Panel>
  <Panel v-loading="loading">
    <template #title>{{ $t("userResources.resourceManage") }}</template>
    <template #default>
      <div class="sub-title row-mt">
        <p class="sub-title-title">{{ $t("userResources.userExcel") }}</p>
        <p class="sub-title-info">
          {{ $t("userResources.userExcelInfo") }}
        </p>
      </div>

      <div>
        <p class="sub-title-title">{{ $t("userResources.rentRisk") }}</p>
        <p class="sub-title-info">
          <span v-html="$t('userResources.rentRiskInfo')"></span>
        </p>
      </div>
      <div class="row-mt">
        <ItemGroup>
          <el-button size="small" type="success" @click="openAddInstancePanel">
            <i class="el-icon-plus"></i> {{ $t("userResources.addInstance") }}
          </el-button>
          <el-button size="small" type="primary" @click="save">
            <i class="el-icon-document-checked"></i> {{ $t("userResources.saveData") }}
          </el-button>
          <el-button size="small" @click="refresh">
            <i class="el-icon-refresh"></i> {{ $t("general.refresh") }}
          </el-button>
        </ItemGroup>
      </div>
      <div class="row-mt">
        <el-table :data="userInfo.instances" stripe style="width: 100%" size="small">
          <el-table-column :label="$t('userResources.daemon')" width="280">
            <template #default="{ row }"> {{ row.hostIp }}（{{ row.remarks }}） </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            :label="$t('instances.instanceName')"
            width="280"
          ></el-table-column>
          <el-table-column :label="$t('instances.endTime')" width="140">
            <template #default="scope">
              {{ String(scope.row.endTime || "").split("T")[0] }}
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('instances.status.title')" width="140">
            <template #default="scope">
              {{ statusToText(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('general.operate')" style="text-align: center">
            <template #default="scope">
              <el-button size="mini" @click="deleteInstance(scope.row)">{{
                $t("general.delete")
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </Panel>

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
