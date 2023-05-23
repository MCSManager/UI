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
      <div>
        <p v-html="$t('services.remoteInfo', { specifiedDaemonVersion })"></p>
      </div>
    </template>
  </Panel>

  <div>
    <el-row :gutter="20">
      <el-col
        :md="12"
        :lg="12"
        :xl="6"
        :offset="0"
        v-for="(node, index) in services"
        :key="node.uuid"
      >
        <Panel :tipType="1">
          <template #title>
            <span>{{ node.remarks || `${node.ip}:${node.port}` }}</span>
          </template>
          <template #default>
            <div class="daemonInfoArea">
              <div class="daemonValueArea">
                <el-row :gutter="20">
                  <el-col :span="6" :offset="0">
                    <p>
                      {{ $t("services.platform") }}
                    </p>
                    <div>
                      {{
                        node?.system?.platform == "win32"
                          ? "windows"
                          : node?.system?.platform || "--"
                      }}
                    </div>
                  </el-col>
                  <el-col :span="6" :offset="0">
                    <p>
                      {{ $t("overview.mem") }}
                    </p>
                    <div>
                      {{ node?.system?.memText || "--" }}
                    </div>
                  </el-col>
                  <el-col :span="6" :offset="0">
                    <p>CPU</p>
                    <div v-if="node.system">
                      {{ Number(node.system.cpuUsage * 100).toFixed(1) }}%
                    </div>
                    <div v-else>--</div>
                  </el-col>
                  <el-col :span="6" :offset="0">
                    <p>{{ $t("services.instanceStatus") }}</p>
                    <div v-if="node.instance">
                      {{ node.instance.running }}/{{ node.instance.total }}
                    </div>
                    <div v-else>--</div>
                  </el-col>
                  <el-col :span="6" :offset="0">
                    <p>{{ $t("overview.connectStatus") }}</p>
                    <div>
                      <span class="color-green" v-if="node.available">
                        <i class="el-icon-circle-check"></i> {{ $t("overview.online") }}
                      </span>
                      <span class="color-red" v-else>
                        <el-tooltip
                          effect="dark"
                          :content="$t('overview.errorConnect')"
                          placement="top"
                        >
                          <span>
                            <i class="el-icon-warning-outline"></i>
                            {{ $t("overview.offline") }}
                          </span>
                        </el-tooltip>
                      </span>
                    </div>
                  </el-col>
                  <el-col :span="6" :offset="0">
                    <p>{{ $t("services.version") }}</p>
                    <div v-if="node.instance">
                      <span
                        class="color-green"
                        v-if="isCorrectDaemonVersion(node.version, specifiedDaemonVersion)"
                      >
                        <i class="el-icon-circle-check"></i> {{ node.version }}
                      </span>
                      <span class="color-red" v-else>
                        <el-tooltip
                          effect="dark"
                          placement="top"
                          :content="$t('overview.lowDaemonVersion')"
                        >
                          <span><i class="el-icon-warning-outline"></i> {{ node.version }}</span>
                        </el-tooltip>
                      </span>
                    </div>
                    <div v-else>--</div>
                  </el-col>
                  <el-col :span="6" :offset="0">
                    <p>Daemon ID</p>
                    <div>
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="node.uuid + $t('services.copyId')"
                        placement="top"
                      >
                        <i class="pointer el-icon-document-copy" @click="copyText(node.uuid)"></i>
                      </el-tooltip>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="daemonChartArea">
                <el-row :gutter="20">
                  <el-col :md="12" :offset="0">
                    <p>CPU</p>
                    <div
                      class="daemon-chart"
                      :id="'echart-wrapper-daemon-cpu-' + index"
                      style="width: 100%; height: 40px"
                    ></div>
                  </el-col>
                  <el-col :md="12" :offset="0">
                    <p>{{ $t("overview.mem") }}</p>
                    <div
                      class="daemon-chart"
                      :id="'echart-wrapper-daemon-mem-' + index"
                      style="width: 100%; height: 40px"
                    ></div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div>
              <el-row :gutter="0" justify="space-between">
                <el-col :md="12" :xl="24" :offset="0">
                  <div class="">
                    <el-input
                      size="mini"
                      v-model="node.ip"
                      :placeholder="$t('overview.addr')"
                      style="max-width: 120px"
                    ></el-input>
                    &nbsp;
                    <el-input
                      size="mini"
                      v-model="node.port"
                      :placeholder="$t('overview.port')"
                      style="max-width: 70px"
                    ></el-input>
                    &nbsp;
                    <el-button size="mini" @click="linkService(node, true)">{{
                      node.available ? $t("services.update") : $t("services.connect")
                    }}</el-button>
                  </div>
                </el-col>
                <el-col :md="12" :xl="24" :offset="0">
                  <div style="text-align: right">
                    <template v-if="node.available">
                      <el-button type="text" size="small" @click="deleteService(node.uuid)">
                        <span class="color-black">{{ $t("services.toTerminal") }}</span>
                      </el-button>
                      <el-button type="text" size="small" @click="deleteService(node.uuid)">
                        <span class="color-black">{{ $t("services.toFileManager") }}</span>
                      </el-button>
                      <el-button type="text" size="small" @click="deleteService(node.uuid)">
                        <span class="color-black">{{ $t("services.toDocker") }}</span>
                      </el-button>
                    </template>
                    <span class="color-gray"> | </span>

                    <el-button type="text" size="small" @click="updateKey(node, true)">{{
                      $t("services.changeKey")
                    }}</el-button>
                    <el-button type="text" size="small" @click="deleteService(node.uuid)">
                      <span class="color-red">
                        {{ $t("general.delete") }}
                      </span>
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
        </Panel>
      </el-col>
    </el-row>
  </div>

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
            {{ $t("services.keySub2") }}
            <br />
            <a href="https://docs.mcsmanager.com/" target="_blank" class="color-blue" v-iszh>
              {{ $t("services.getKey") }}
            </a>
            <a
              href="   https://github.com/MCSManager/MCSManager/wiki/Connect-to-a-Remote-Daemon"
              target="_blank"
              class="color-blue"
              v-isen
            >
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
        <img
          :src="require('../../assets/principle.png')"
          alt=""
          srcset=""
          style="max-height: 460px; width: 100%"
        />
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
import * as echarts from "echarts";
import Panel from "../../components/Panel";
import Dialog from "../../components/Dialog";
import axios from "axios";
import { API_OVERVIEW, API_SERVICE_CURD, API_SERVICE_URL } from "../service/common";
import { request } from "../service/protocol";
import { copyText } from "../utils/index";
import { getDaemonMemChartOption } from "../service/chart_option";

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
      specifiedDaemonVersion: null,

      daemonCharts: {}
    };
  },
  methods: {
    copyText,
    // refresh button
    async refresh() {
      await this.render();
      this.$message({ type: "info", message: this.$t("general.refreshFinish"), duration: 400 });
    },
    // render data method
    async render() {
      const result = await request({
        method: "GET",
        url: API_OVERVIEW
      });
      result.remote.forEach((element) => {
        if (element.system) {
          // compute memory
          const free = Number(element.system.freemem / 1024 / 1024 / 1024).toFixed(1);
          const total = Number(element.system.totalmem / 1024 / 1024 / 1024).toFixed(1);
          const used = Number(total - free).toFixed(1);
          element.system.memText = `${used}G/${total}G`;
        }
      });
      this.services = result.remote;
      // Version related data rendering
      this.specifiedDaemonVersion = result.specifiedDaemonVersion;
      this.panelVersion = result.version;

      if (Object.keys(this.daemonCharts).length != 0) {
        for (const key in this.daemonCharts) {
          const chart1 = this.daemonCharts[key]?.cpuChartInstance;
          const chart2 = this.daemonCharts[key]?.memChartInstance;
          chart1?.dispose();
          chart2?.dispose();
          delete this.daemonCharts[key];
        }
      }
      this.$nextTick(() => {
        for (let i = 0; i < this.services.length; i++) {
          const element = this.services[i];
          if (element.available && element.cpuMemChart) {
            const echartCpuDom = echarts.init(
              document.querySelector("#echart-wrapper-daemon-cpu-" + i)
            );
            const echartMemDom = echarts.init(
              document.querySelector("#echart-wrapper-daemon-mem-" + i)
            );
            const cpuChartData = element?.cpuMemChart.map((v) => v.cpu);
            const memChartData = element?.cpuMemChart.map((v) => v.mem);
            echartCpuDom.setOption(getDaemonMemChartOption(cpuChartData));
            echartMemDom.setOption(getDaemonMemChartOption(memChartData));
            this.daemonCharts[element.uuid] = {
              cpu: echartCpuDom,
              mem: echartMemDom,
              cpuChartInstance: echartCpuDom,
              memChartInstance: echartMemDom
            };
          }
        }
      });
    },
    // add service
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
        this.$message({ type: "success", message: this.$t("general.success") });
        this.render();
      } catch (err) {
        this.$message({ type: "error", message: this.$t("general.error") });
      }
    },
    // Open the new service panel
    openNewServiceDialog() {
      this.isNewService = true;
    },
    // connect to the service
    async linkService(row, isNeedSave) {
      try {
        if (isNeedSave) await this.updateService(row);
        await request({
          url: `${API_SERVICE_URL}/link_remote_service`,
          method: "GET",
          params: { uuid: row.uuid }
        });
        setTimeout(this.refresh, 500);
        this.$message({ type: "success", message: this.$t("general.success") });
      } catch (error) {
        this.$message({ type: "error", message: error.message });
      }
    },
    // update service
    async updateService(row) {
      await axios.put(
        API_SERVICE_CURD,
        { ip: row.ip, port: row.port, remarks: row.remarks || "Remote Host" },
        {
          params: { uuid: row.uuid }
        }
      );
    },
    // delete service
    async deleteService(uuid) {
      await this.$confirm(this.$t("services.delDaemonWarn"), this.$t("general.warn"), {
        confirmButtonText: this.$t("general.delete"),
        cancelButtonText: this.$t("general.cancel"),
        type: "warning"
      });
      try {
        axios.delete(API_SERVICE_CURD, { params: { uuid } });
        this.$message({ type: "success", message: this.$t("general.success") });
        this.render();
      } catch (err) {
        this.$message({ type: "error", message: this.$t("general.error") });
      }
    },
    // modify the remark information
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
    // modify key information
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
        // this.$message({ type: "success", message: "Update key successfully" });
        await this.linkService(row, false);
      } catch (error) {
        this.$message({ type: "error", message: error });
      } finally {
        setTimeout(() => this.refresh(), 1000);
      }
    },
    openPrinciplePanel() {
      this.isOpenPrinciplePanel = true;
    },
    isCorrectDaemonVersion(remoteVersion = "", specifiedDaemonVersion = "") {
      const [major1, minor1] = remoteVersion.split(".");
      const [major2, minor2] = specifiedDaemonVersion.split(".");
      return major1 === major2 && minor1 === minor2;
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>

<style scoped lang="scss">
.collapse-item-title-table {
  width: 100%;
}

.service-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pointer {
  color: #409eff;
  cursor: pointer;
}

.daemonInfoArea > * {
  margin-bottom: 6px;
}

.daemonValueArea,
.daemonChartArea {
  p,
  div {
    margin-bottom: 8px;
  }
  p {
    margin-top: 0;
    font-size: 13px;
    line-height: 13px;
  }
  div {
    font-size: 12px;
  }
}

.daemon-chart {
  overflow: hidden;
}
</style>
