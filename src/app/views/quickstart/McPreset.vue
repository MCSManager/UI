<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->
<template>
  <div class="quick-container-install">
    <div v-if="!installView" v-loading="requestLoading">
      <Panel>
        <template #title>注意事项</template>
        <template #default>
          <p>
            {{ $t("views.quickstart_McPreset.eulaReadTitle") }}
            <a href="https://aka.ms/MinecraftEULA" target="_blank" rel="noopener noreferrer">
              https://aka.ms/MinecraftEULA
            </a>
          </p>
          <p>{{ $t("views.quickstart_McPreset.007") }}</p>
        </template>
      </Panel>
      <el-row :gutter="20" v-if="tableData && tableData.length > 0">
        <el-col :md="6" :offset="0" v-for="(item, index) in tableData" :key="index">
          <Panel>
            <template #title>
              {{ item.mc }}
            </template>
            <template #default>
              <div class="package-info-wrapper">
                <p class="color-gray">{{ item.info }}</p>
                <p>{{ $t("views.quickstart_McPreset.004") }}: {{ item.java }}</p>
                <p>
                  {{ $t("views.quickstart_McPreset.005") }}:
                  {{ $t("views.quickstart_McPreset.006", [item.size]) }}
                </p>

                <p>
                  {{ item.remark }}
                </p>
              </div>
              <div class="package-op-wrapper">
                <el-link
                  type="primary"
                  size="medium"
                  href="javascript:void(0)"
                  @click="handleSelectTemplate(index, item)"
                >
                  {{ $t("router.install") }}
                </el-link>
              </div>
            </template>
          </Panel>
        </el-col>
      </el-row>
      <Panel v-else-if="!requestLoading" class="flex flex-align-items-center flex-space-center">
        <template #default>
          <div style="text-align: center">
            <i class="el-icon-warning-outline" style="font-size: 100px"></i>
            <h2>{{ $t("install.stoppedServiceTitle") }}</h2>
            <div>
              <p>{{ $t("install.stoppedServiceContent") }}</p>
            </div>
          </div>
        </template>
      </Panel>
    </div>

    <Panel style="width: 600px" v-if="installView && !isInstalled">
      <template #title>{{ $t("views.quickstart_McPreset.014") }}</template>
      <template #default>
        <div class="display-center">
          <div style="text-align: center" v-if="taskInfo?.status != -1">
            <el-progress type="circle" :percentage="percentage"></el-progress>
            <div style="margin-top: 12px; text-align: center">
              <p class="tip-title">{{ $t("views.quickstart_McPreset.008") }}</p>
              <p class="sub-title-info">{{ $t("views.quickstart_McPreset.009") }}</p>
            </div>
          </div>
          <div style="text-align: center" v-else-if="taskInfo?.status == -1">
            <h1>{{ $t("CommonText.044") }}</h1>
            <p>{{ $t("views.quickstart_McPreset.015") }}</p>
          </div>
        </div>
      </template>
    </Panel>

    <Panel style="width: 640px" v-if="installView && isInstalled">
      <template #title>{{ $t("CommonText.010") }}</template>
      <template #default>
        <div class="display-center">
          <div style="margin: 16px">
            <p class="tip-title">{{ $t("views.quickstart_McPreset.010") }}</p>
            <el-button type="primary" size="default" @click="toInstance">
              {{ $t("views.quickstart_McPreset.011") }}
            </el-button>
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
import {
  API_GET_QUICK_INSTALL_LIST_ADDR,
  API_INSTANCE_ASYNC_TASK,
  API_INSTANCE_ASYNC_QUERY
} from "../../service/common";
import { request } from "../../service/protocol";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: {
    Panel
  },
  props: {
    remoteUuid: {
      type: String
    },
    taskId: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {
      tableData: [],
      percentage: 1,
      installView: false,
      intervalTask: null,
      requestLoading: true,
      visibleDialog: false,
      isInstalled: false,
      taskInfo: {},
      newTaskInfo: {
        instanceConfig: {
          nickname: ""
        },
        instanceStatus: 0,
        instanceUuid: "19a0d57f6ebd4585951ff529f3e687f6",
        status: 1,
        taskId:
          "QuickInstallTask-19a0d57f6ebd4585951ff529f3e687f6-9f7b0318-9c55-450b-9388-7bab89e30389"
      }
    };
  },
  methods: {
    async init() {
      this.requestLoading = true;
      try {
        const data = await request({
          method: "GET",
          url: API_GET_QUICK_INSTALL_LIST_ADDR
        });
        this.tableData = data || [];
      } catch (error) {
        this.$message({
          type: "error",
          message: error.message
        });
        this.tableData = null;
      } finally {
        this.requestLoading = false;
      }
      if (this.taskId && this.tableData) {
        this.percentage = 50;
        this.startDownloadTask();
      }
    },
    startDownloadTask() {
      if (this.intervalTask) clearInterval(this.intervalTask);
      this.requestLoading = false;
      this.installView = true;
      this.queryStatus();
      this.intervalTask = setInterval(() => {
        if (this.percentage <= 90) this.percentage += 4;
        this.queryStatus();
      }, 3000);
    },
    // Start install
    async handleSelectTemplate(index, row) {
      const { value: instanceName } = await this.$prompt(
        window.$t("views.quickstart_McPreset.016")
      );
      this.requestLoading = true;
      this.installView = true;
      this.isInstalled = false;
      this.newTaskInfo = await request({
        method: "POST",
        url: API_INSTANCE_ASYNC_TASK,
        params: {
          remote_uuid: this.remoteUuid,
          uuid: "-",
          task_name: "quick_install"
        },
        data: {
          time: new Date().getTime(),
          newInstanceName: instanceName,
          targetLink: row.targetLink
        }
      });
      this.requestLoading = false;
      this.startDownloadTask();
    },
    async queryStatus() {
      this.taskInfo = await request({
        method: "POST",
        url: API_INSTANCE_ASYNC_QUERY,
        params: {
          remote_uuid: this.remoteUuid,
          uuid: "-",
          task_name: "quick_install"
        },
        data: {
          taskId: this.newTaskInfo.taskId
        }
      });
      if (this.taskInfo.status === 0) {
        this.percentage = 100;
        setTimeout(() => this.installed(), 2000);
      }
    },
    installed() {
      console.log(window.$t("views.quickstart_McPreset.013"));
      this.isInstalled = true;
    },
    toInstance() {
      this.$router.push({
        path: `/terminal/${this.remoteUuid}/${this.taskInfo.detail.instanceUuid}/`,
        query: {
          network_tip: 1
        }
      });
    }
  },
  mounted() {
    this.init();
  },
  unmounted() {
    clearInterval(this.intervalTask);
  }
};
</script>

<style lang="scss" scoped>
.package-info-wrapper {
  height: 140px;
  overflow: hidden;
  p {
    font-size: 13px;
    margin: 0px 0px 6px 0px;
  }
}
.package-op-wrapper {
  text-align: center;
  padding-bottom: 8px;
}
.panel-action {
  transition: all 0.4s;
}

.panel-action:hover {
  transform: scale(1.024);
  border: 1px solid rgb(27, 121, 203);
}

.display-center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.quick-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.tip-title {
  font-size: 18px;
}
</style>
