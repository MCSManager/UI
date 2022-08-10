<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <el-row :gutter="20">
    <!-- User data column on the left -->
    <el-col :md="16" :offset="0">
      <el-row :gutter="20">
        <el-col :xs="12" :md="6" :offset="0">
          <ValueCard
            :title="$t('home.totalInstance')"
            :sub-title="$t('home.totalInstanceCount')"
            :value="this.info.total"
            style="height: 260px"
            font-class="el-icon-s-data"
          >
          </ValueCard>
        </el-col>
        <el-col :xs="12" :md="6" :offset="0">
          <ValueCard
            :title="$t('home.running')"
            :sub-title="$t('home.runCount')"
            :value="this.info.running"
            style="height: 260px"
            font-class="el-icon-s-promotion"
          >
          </ValueCard>
        </el-col>
        <el-col :xs="12" :md="6" :offset="0">
          <ValueCard
            :title="$t('home.outOfRunning')"
            :sub-title="$t('home.outOfRunningCount')"
            :value="this.info.stopped"
            style="height: 260px"
            font-class="el-icon-s-flag"
          >
          </ValueCard>
        </el-col>
        <el-col :xs="12" :md="6" :offset="0">
          <ValueCard
            :title="$t('home.maintaining')"
            :sub-title="$t('home.maintainingInfo')"
            :value="this.info.unknown"
            style="height: 260px"
            font-class="el-icon-s-opportunity"
          >
          </ValueCard>
        </el-col>
      </el-row>
    </el-col>

    <!-- User information bar on the right -->
    <el-col :md="8" :offset="0">
      <Panel style="height: 260px">
        <template #title>{{ $t("home.personalInfo") }}</template>
        <template #default>
          <LineLabel space="small">
            <template #title>UID</template>
            <template #default>{{ userInfo.uuid }}</template>
          </LineLabel>
          <LineLabel space="small">
            <template #title>{{ $t("home.userName") }}</template>
            <template #default>{{ userInfo.userName }}</template>
          </LineLabel>
          <LineLabel space="small">
            <template #title>{{ $t("home.registerTime") }}</template>
            <template #default>{{ userInfo.registerTime }}</template>
          </LineLabel>
          <LineLabel space="small">
            <template #title>{{ $t("home.loginTime") }}</template>
            <template #default>{{ userInfo.loginTime }}</template>
          </LineLabel>
          <LineLabel space="small">
            <template #title>{{ $t("home.permission") }}</template>
            <template #default>{{
              userInfo.permission >= 10 ? $t("home.admin") : $t("home.user")
            }}</template>
          </LineLabel>
        </template>
      </Panel>
    </el-col>
  </el-row>

  <Panel>
    <template #title>{{ $t("instances.instanceName") }}</template>
    <template #default>
      <el-table
        :data="userInfo.instances"
        stripe
        style="width: 100%"
        size="mini"
        v-loading="info.loading"
      >
        <el-table-column
          prop="nickname"
          :label="$t('instances.instanceName')"
          min-width="240"
        ></el-table-column>
        <el-table-column :label="$t('instances.status.runStatus')">
          <template #default="scope">
            {{ statusToText(scope.row.status) }}
          </template>
        </el-table-column>

        <el-table-column :label="$t('instances.table.byteStreamCode')">
          <template #default="scope"> {{ scope.row.ie }}/{{ scope.row.oe }} </template>
        </el-table-column>
        <el-table-column
          prop="lastDatetime"
          :label="$t('instances.table.lastDatetime')"
        ></el-table-column>
        <el-table-column :label="$t('instances.endTime')">
          <template #default="scope">
            {{ String(scope.row.endTime || "").split("T")[0] }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('instances.table.operate')"
          style="text-align: center"
          width="180"
        >
          <template #default="scope">
            <el-button
              size="small"
              @click="toEditInstance(scope.row)"
              :disabled="scope.row.status == -1"
            >
              {{ $t("general.edit") }}
            </el-button>
            <el-button
              size="small"
              @click="toInstance(scope.row.serviceUuid, scope.row.instanceUuid)"
              :disabled="scope.row.status == -1"
            >
              {{ $t("general.manage") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <div
    class="flex flex-space-center flex-align-items-center"
    style="font-size: 12px; color: #cdcdcd; text-align: center; margin-top: 40px"
  >
    <div>
      <span
        >Powered by
        <a
          style="color: #cdcdcd; text-decoration: underline"
          target="black"
          href="https://github.com/MCSManager"
          >MCSManager</a
        >, Released under the Apache-2.0 License</span
      >
    </div>
  </div>

  <!-- Instance details dialog -->
  <Dialog v-model="editInstance.is">
    <template #title>{{ $t("instance.Dialog.instanceParameterEdit") }}</template>
    <template #default>
      <div>
        <div class="sub-title">
          <p class="sub-title-title">{{ $t("instances.dialog.commandClose") }}</p>
          <p class="sub-title-info"></p>
          {{ $t("instance.dialog.commandCloseIndo") }}
        </div>
        <div class="flex">
          <el-input v-model="editInstance.instance.stopCommand" size="small"></el-input>
        </div>
        <div class="sub-title row-mt">
          <p class="sub-title-title">{{ $t("instances.dialog.inputOrOutputCode") }}</p>
          <p class="sub-title-info">{{ $t("instances.dialog.inputOrOutputCodeInfo") }}</p>
        </div>
        <div class="flex">
          <ItemGroup :lr="true">
            <el-input v-model="editInstance.instance.ie" size="small" style="width: 40%"></el-input>
            <el-input v-model="editInstance.instance.oe" size="small" style="width: 40%"></el-input>
          </ItemGroup>
        </div>
        <div class="row-mt">
          <el-button type="success" size="small" @click="saveInstance">{{
            $t("instances.dialog.update")
          }}</el-button>
          <el-button @click="editInstance.is = !editInstance.is" size="small">{{
            $t("instances.dialog.close")
          }}</el-button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style></style>

<script>
import Dialog from "../../components/Dialog";
import Panel from "../../components/Panel";
import ValueCard from "../../components/ValueCard";
import LineLabel from "../../components/LineLabel";
import { request, requestUserInfo } from "../service/protocol";
import { API_INSTANCE_LOW_PERMISSION_PUT } from "../service/common";
import { statusCodeToText } from "../service/instance_tools";
export default {
  components: { Panel, LineLabel, Dialog, ValueCard },
  data: function () {
    return {
      editInstance: {
        is: false,
        instance: {}
      },
      info: {
        loading: true,
        total: 0,
        running: 0,
        stopped: 0,
        unknown: 0
      },
      userInfo: {}
    };
  },
  methods: {
    async render() {
      try {
        this.info.loading = true;
        const data = await requestUserInfo(true);
        this.userInfo = data;
        await this.loadInfoPanel();
      } catch (error) {
        this.$notify({
          title: this.$t("notify.dateLoadError"),
          message: error.toString(),
          type: "error"
        });
      } finally {
        this.info.loading = false;
      }
    },
    async loadInfoPanel() {
      this.info = { total: 0, running: 0, stopped: 0, unknown: 0 };
      const instance = this.userInfo.instances;
      for (const iterator of instance) {
        this.info.total++;
        if (iterator.status === -1) this.info.unknown++;
        if (iterator.status === 0) this.info.stopped++;
      }
      this.info.running = this.info.total - this.info.unknown - this.info.stopped;
    },
    statusToText(code) {
      return statusCodeToText(code);
    },
    toInstance(serviceUuid, instanceUuid) {
      console.log("View instance:", serviceUuid, instanceUuid);
      this.$router.push({ path: `/terminal/${serviceUuid}/${instanceUuid}/` });
    },
    toEditInstance(row) {
      this.editInstance.is = true;
      this.editInstance.instance = JSON.parse(JSON.stringify(row));
    },
    async saveInstance() {
      const row = this.editInstance.instance;
      try {
        await request({
          method: "PUT",
          url: API_INSTANCE_LOW_PERMISSION_PUT,
          params: {
            remote_uuid: row.serviceUuid,
            uuid: row.instanceUuid
          },
          data: row
        });
        this.$message({ type: "success", message: this.$t("home.updateSuccess") });
      } catch (error) {
        this.$message({ type: "error", message: `error:${error.message}` });
      }
      this.editInstance.is = false;
      await this.render();
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>
