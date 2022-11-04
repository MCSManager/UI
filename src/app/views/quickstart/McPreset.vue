<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="quick-container-install">
    <Panel style="width: 100%" v-if="!installView">
      <template #title>{{ $t("views.quickstart_McPreset.001") }}</template>
      <template #default>
        <p>{{ $t("views.quickstart_McPreset.002", [remoteUuid]) }}</p>
        <el-table
          :data="tableData"
          size="small"
          stripe
          style="width: 100%"
          v-loading="requestLoading"
        >
          <el-table-column
            prop="info"
            min-width="300px"
            :label="$t('CommonText.006')"
          ></el-table-column>
          <el-table-column
            prop="mc"
            width="120px"
            :label="$t('views.quickstart_McPreset.003')"
          ></el-table-column>
          <el-table-column
            prop="java"
            width="120px"
            :label="$t('views.quickstart_McPreset.004')"
          ></el-table-column>
          <el-table-column prop="size" width="120px" :label="$t('views.quickstart_McPreset.005')">
            <template v-slot="scope">{{
              $t("views.quickstart_McPreset.006", [scope.row.size])
            }}</template>
          </el-table-column>
          <el-table-column prop="remark" :label="$t('CommonText.007')"></el-table-column>
          <el-table-column :label="$t('CommonText.008')">
            <template v-slot="scope">
              <el-button
                type="success"
                size="small"
                @click="handleSelectTemplate(scope.$index, scope.row)"
                >{{ $t("CommonText.009") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <p>{{ $t("views.quickstart_McPreset.007") }}</p>
      </template>
    </Panel>

    <Panel style="width: 600px" v-if="installView && !isInstalled">
      <template #title>{{ $t("views.quickstart_McPreset.014") }}</template>
      <template #default>
        <div class="display-center">
          <div style="text-align: center">
            <el-progress type="circle" :percentage="percentage"></el-progress>
            <div style="margin-top: 12px; text-align: center">
              <p class="tip-title">{{ $t("views.quickstart_McPreset.008") }}</p>
              <p class="sub-title-info">{{ $t("views.quickstart_McPreset.009") }}</p>
            </div>
          </div>
        </div>
      </template>
    </Panel>

    <Panel style="width: 600px" v-if="installView && isInstalled">
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
      const data = await request({
        method: "GET",
        url: API_GET_QUICK_INSTALL_LIST_ADDR
      });
      this.tableData = data;
      this.requestLoading = false; // 直接前往详情页

      if (this.taskId) {
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
      const { value: instanceName } = await this.$prompt("请输入新建服务器的名字：");
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
        path: `/terminal/${this.remoteUuid}/${this.taskInfo.detail.instanceUuid}/`
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
