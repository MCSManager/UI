<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>{{ $t("services.remoteDaemonManage") }}</template>
    <template #default>
      <div class="flex flex-space-between">
        <ItemGroup>
          <el-button type="success" size="small" @click="openNewServiceDialog">
            {{ $t("services.addDaemon") }}
          </el-button>
          <el-button size="small" @click="refresh">{{ $t("general.refresh") }}</el-button>
        </ItemGroup>
        <ItemGroup>
          <el-button size="small" @click="openPrinciplePanel">{{
            $t("services.learnHowItWork")
          }}</el-button>
        </ItemGroup>
      </div>
    </template>
  </Panel>
  <Panel>
    <template #title>{{ $t("services.Daemons") }}</template>
    <template #default>
      <p v-html="$t('services.remoteInfo', { specifiedDaemonVersion })"></p>
      <el-table :data="services" style="width: 100%" size="small">
        <el-table-column :label="$t('overview.addr')" width="170">
          <template #default="scope">
            <el-input
              size="small"
              v-model="scope.row.ip"
              :placeholder="$t('general.required')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column :label="$t('overview.port')" width="110">
          <template #default="scope">
            <el-input
              size="small"
              v-model="scope.row.port"
              :placeholder="$t('general.required')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column :label="$t('overview.remarks')" width="210">
          <template #default="scope">
            <span
              >{{ scope.row.remarks }}
              <i style="cursor: pointer" class="el-icon-edit" @click="updateRemarks(scope.row)"></i
            ></span>
            <!-- <el-input size="small" v-model="scope.row.remarks"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column :label="$t('services.platform')" width="100">
          <template #default="scope">
            <div v-if="scope.row.system">{{ scope.row.system.platform }}</div>
          </template>
        </el-table-column>
        <el-table-column label="CPU">
          <template #default="scope">
            <div v-if="scope.row.system">
              {{ Number(scope.row.system.cpuUsage * 100).toFixed(1) }}%
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('overview.mem')" width="160">
          <template #default="scope">
            <div v-if="scope.row.system">{{ scope.row.system.memText }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('services.instanceStatus')">
          <template #default="scope">
            <div v-if="scope.row.instance">
              {{ scope.row.instance.running }}/{{ scope.row.instance.total }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('services.version')">
          <template #default="scope">
            <span
              class="color-green"
              v-if="scope.row.version && scope.row.version === specifiedDaemonVersion"
            >
              <i class="el-icon-circle-check"></i> {{ scope.row.version }}
            </span>
            <span class="color-red">
              <el-tooltip
                effect="dark"
                v-if="scope.row.version !== specifiedDaemonVersion"
                placement="top"
                :content="$t('overview.lowDaemonVersion')"
              >
                <span><i class="el-icon-warning-outline"></i> {{ scope.row.version }}</span>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('overview.connectStatus')">
          <template #default="scope">
            <span class="color-green" v-if="scope.row.available">
              <i class="el-icon-circle-check"></i> {{ $t("overview.online") }}
            </span>
            <span class="color-red" v-if="!scope.row.available">
              <el-tooltip effect="dark" :content="$t('overview.errorConnect')" placement="top">
                <span><i class="el-icon-warning-outline"></i> {{ $t("overview.offline") }}</span>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('general.operate')" style="text-align: center" width="260px">
          <template #default="scope">
            <el-button size="mini" @click="linkService(scope.row, true)">
              {{ scope.row.available ? $t("services.update") : $t("services.connect") }}
            </el-button>
            <el-button size="mini" @click="updateKey(scope.row, true)">{{
              $t("services.changeKey")
            }}</el-button>
            <el-button size="mini" type="danger" plain @click="deleteService(scope.row.uuid)">{{
              $t("general.delete")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Dialog v-model="isNewService">
    <template #title>{{ $t("services.addDaemon") }}</template>
    <template #default>
      <div>
        <div class="sub-title">{{ $t("services.remarks") }}</div>
        <el-input
          v-model="newServiceInfo.remarks"
          :placeholder="$t('services.remarksInfo')"
          size="small"
        ></el-input>
        <div class="sub-title row-mt">
          <div class="sub-title-title">{{ $t("services.remoteIP") }}</div>
          <div class="sub-title-info">
            <span v-html="$t('services.remoteIPSub')"></span>
          </div>
        </div>
        <el-input
          v-model="newServiceInfo.ip"
          :placeholder="$t('services.remoteIPInfo')"
          size="small"
        ></el-input>
        <div class="sub-title row-mt">{{ $t("services.daemonPort") }}</div>
        <el-input
          v-model="newServiceInfo.port"
          :placeholder="$t('services.daemonPortInfo')"
          size="small"
        ></el-input>
        <div class="sub-title row-mt">
          <div class="sub-title-title">{{ $t("services.verifyKey") }}</div>
          <div class="sub-title-info">
            {{ $t("services.keySub") }}
            <br />
            <a href="https://docs.mcsmanager.com/" class="color-blue">
              {{ $t("services.getKey") }}
            </a>
          </div>
        </div>
        <el-input
          v-model="newServiceInfo.apiKey"
          :placeholder="$t('services.keyInfo')"
          size="small"
        ></el-input>
        <div class="row-mt">
          <ItemGroup>
            <el-button type="success" size="small" @click="toNewService(false)">{{
              $t("general.add")
            }}</el-button>
            <el-button @click="isNewService = !isNewService" size="small">{{
              $t("general.cancel")
            }}</el-button>
          </ItemGroup>
        </div>
      </div>
    </template>
  </Dialog>

  <Dialog v-model="isNewServiceWarning">
    <template #title>{{ $t("services.addNewWarn.title") }}</template>
    <template #default>
      <div class="sub-title">
        <div class="sub-title-title">
          <span v-html="$t('services.addNewWarn.ip', { newServiceInfo: newServiceInfo.ip })">
          </span>
        </div>
        <div class="sub-title-info">
          {{ $t("services.addNewWarn.outerNet") }}
        </div>
      </div>
      <div class="sub-title">
        <div class="sub-title-title">{{ $t("services.addNewWarn.whyOuterNet") }}</div>
        <div class="sub-title-info">
          <span v-html="$t('services.addNewWarn.because')"></span>
        </div>
      </div>
      <div class="sub-title">{{ $t("services.addNewWarn.workingPrinciple") }}</div>
      <div style="text-align: center">
        <img :src="require('../../assets/connect.png')" alt="" srcset="" style="height: 230px" />
      </div>
      <div class="sub-title row-mt">
        <div class="sub-title-title">{{ $t("services.addNewWarn.KeepIntranet") }}</div>
        <div class="sub-title-info">{{ $t("services.addNewWarn.ifTrueThen") }}</div>
      </div>
      <div class="row-mt">
        <ItemGroup>
          <el-button type="danger" size="small" @click="toNewService(true)">{{
            $t("services.addNewWarn.yeah")
          }}</el-button>
          <el-button @click="isNewServiceWarning = !isNewServiceWarning" size="small">{{
            $t("services.addNewWarn.cancel")
          }}</el-button>
        </ItemGroup>
      </div>
    </template>
  </Dialog>

  <Dialog v-model="isOpenPrinciplePanel">
    <template #title>{{ $t("services.principlePanel.title") }}</template>
    <template #default>
      <div class="sub-title">
        <div class="sub-title-info">
          <span v-html="$t('services.principlePanel.desc')"></span>
        </div>
      </div>
      <div class="sub-title">{{ $t("services.principlePanel.principleImage") }}</div>
      <div style="text-align: center">
        <img :src="require('../../assets/principle.png')" alt="" srcset="" style="height: 460px" />
      </div>

      <div class="sub-title">
        <div class="sub-title-info">
          {{ $t("services.principlePanel.onlyOne") }}
        </div>
      </div>
      <div class="row-mt">
        <ItemGroup>
          <el-button type="success" size="small" @click="isOpenPrinciplePanel = false">
            {{ $t("general.confirm") }}
          </el-button>
        </ItemGroup>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Panel from "../../components/Panel";
import Dialog from "../../components/Dialog";
import axios from "axios";
import { API_OVERVIEW, API_SERVICE_CURD, API_SERVICE_URL } from "../service/common";
import { ERROR_TEXT, OK_TEXT } from "../service/text";
import { request } from "../service/protocol";

export default {
  components: { Panel, Dialog },
  data() {
    return {
      newServiceInfo: {
        ip: "",
        port: "",
        apiKey: "",
        remarks: ""
      },
      services: [],
      drawer: false,
      selectRow: null,
      isNewService: false,
      isNewServiceWarning: false,
      isOpenPrinciplePanel: false,

      panelVersion: null,
      specifiedDaemonVersion: null
    };
  },
  methods: {
    // 刷新按钮
    async refresh() {
      await this.render();
      this.$message({ type: "info", message: this.$t("general.refreshFinish"), duration: 400 });
    },
    // 渲染数据方法
    async render() {
      const result = await request({
        method: "GET",
        url: API_OVERVIEW
      });
      result.remote.forEach((element) => {
        if (element.system) {
          // 计算内存
          const free = Number(element.system.freemem / 1024 / 1024 / 1024).toFixed(1);
          const total = Number(element.system.totalmem / 1024 / 1024 / 1024).toFixed(1);
          const used = Number(total - free).toFixed(1);
          element.system.memText = `${used}G/${total}G`;
        }
      });
      this.services = result.remote;
      // 版本相关数据渲染
      this.specifiedDaemonVersion = result.specifiedDaemonVersion;
      this.panelVersion = result.version;
    },
    // 新增服务
    async toNewService(enforce = false) {
      const addr = this.newServiceInfo.ip;
      if (addr.indexOf("192.168") === 0 || addr.indexOf("10.") === 0) {
        if (!enforce) {
          this.isNewServiceWarning = true;
          return;
        } else {
          this.isNewServiceWarning = false;
        }
      }
      try {
        if (this.newServiceInfo.remarks === "") this.newServiceInfo.remarks = "Remote Host";
        await request({
          method: "POST",
          url: API_SERVICE_CURD,
          data: this.newServiceInfo
        });
        this.isNewService = false;
        this.$message({ type: "success", message: OK_TEXT });
        this.render();
      } catch (err) {
        this.$message({ type: "error", message: ERROR_TEXT });
      }
    },
    // 打开新增服务面板
    openNewServiceDialog() {
      this.isNewService = true;
    },
    // 连接服务
    async linkService(row, isNeedSave) {
      try {
        if (isNeedSave) await this.updateService(row);
        await request({
          url: `${API_SERVICE_URL}/link_remote_service`,
          method: "GET",
          params: { uuid: row.uuid }
        });
        setTimeout(this.refresh, 500);
        this.$message({ type: "success", message: OK_TEXT });
      } catch (error) {
        this.$message({ type: "error", message: error.message });
      }
    },
    // 更新服务
    async updateService(row) {
      await axios.put(
        API_SERVICE_CURD,
        { ip: row.ip, port: row.port, remarks: row.remarks || "Remote Host" },
        {
          params: { uuid: row.uuid }
        }
      );
    },
    // 删除服务
    async deleteService(uuid) {
      await this.$confirm(this.$t("services.delDaemonWarn"), this.$t("general.warn"), {
        confirmButtonText: this.$t("general.delete"),
        cancelButtonText: this.$t("general.cancel"),
        type: "warning"
      });
      try {
        axios.delete(API_SERVICE_CURD, { params: { uuid } });
        this.$message({ type: "success", message: OK_TEXT });
        this.render();
      } catch (err) {
        this.$message({ type: "error", message: ERROR_TEXT });
      }
    },
    // 修改备注信息
    async updateRemarks(row) {
      const text = await this.$prompt(
        this.$t("services.inputNewRemark"),
        this.$t("overview.remarks"),
        {
          confirmButtonText: this.$t("general.confirm"),
          cancelButtonText: this.$t("general.cancel")
        }
      );
      row.remarks = text.value;
      try {
        await this.updateService(row);
        this.$message({ type: "success", message: this.$t("services.updateRemarkSuccess") });
      } catch (error) {
        this.$message({ type: "error", message: error });
      }
    },
    // 修改密钥信息
    async updateKey(row) {
      let text = await this.$prompt(this.$t("services.inputNewKey"), this.$t("services.key"), {
        confirmButtonText: this.$t("general.confirm"),
        cancelButtonText: this.$t("general.cancel")
      });
      text = String(text.value);
      text = text.trim();
      try {
        await axios.put(
          API_SERVICE_CURD,
          {
            apiKey: text
          },
          {
            params: { uuid: row.uuid }
          }
        );
        // this.$message({ type: "success", message: "更新密钥成功" });
        await this.linkService(row, false);
      } catch (error) {
        this.$message({ type: "error", message: error });
      } finally {
        setTimeout(() => this.refresh(), 1000);
      }
    },
    openPrinciplePanel() {
      this.isOpenPrinciplePanel = true;
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>

<style scoped>
.collapse-item-title-table {
  width: 100%;
}

.service-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
