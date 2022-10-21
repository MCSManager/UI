<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="quick-container-install">
    <Panel style="width: 100%" v-if="!installView">
      <template #title>预设服务器模板</template>
      <template #default>
        <el-table
          :data="tableData"
          size="small"
          stripe
          style="width: 100%"
          v-loading="requestLoading"
        >
          <el-table-column prop="info" label="介绍" min-width="300px"></el-table-column>
          <el-table-column prop="mc" label="Minecraft 版本" width="120px"></el-table-column>
          <el-table-column prop="java" label="Java 版本要求" width="120px"></el-table-column>
          <el-table-column prop="size" label="整合包大小" width="120px">
            <template v-slot="scope">约{{ scope.row.size }}MB</template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                type="success"
                size="small"
                @click="handleSelectTemplate(scope.$index, scope.row)"
              >
                使用
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <p>目标主机 ID: {{ remoteUuid }}</p>
      </template>
    </Panel>

    <Panel style="width: 600px" v-if="installView && !isInstalled">
      <template #title>{{ "正在安装中" }}</template>
      <template #default>
        <div class="display-center">
          <div style="text-align: center">
            <el-progress type="circle" :percentage="percentage" />
            <div style="margin-top: 12px; text-align: center">
              <p class="tip-title">正在下载文件...</p>
              <p class="sub-title-info">实际所需时间与网速，处理器运行速度有关，请务必耐心等待。</p>
            </div>
          </div>
        </div>
      </template>
    </Panel>

    <Panel style="width: 600px" v-if="installView && isInstalled">
      <template #title>{{ "安装完毕" }}</template>
      <template #default>
        <div class="display-center">
          <div style="margin: 16px">
            <p class="tip-title">大功告成！接下来您只需要进入“实例控制台”，轻点“启动实例”即可。</p>
            <el-button type="primary" size="default" @click="toInstance">前往实例控制台</el-button>
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Panel from "@/components/Panel";
import {
  API_GET_QUICK_INSTALL_LIST_ADDR,
  API_INSTANCE_ASYNC_TASK,
  API_INSTANCE_ASYNC_QUERY
} from "../../service/common";
import { request } from "../../service/protocol";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Panel, Dialog },
  props: {
    remoteUuid: {
      type: String
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
      this.requestLoading = false;
    },

    // 开始安装
    async handleSelectTemplate(index, row) {
      this.requestLoading = true;
      this.installView = true;
      this.isInstalled = false;

      // eslint-disable-next-line no-unreachable
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
          newInstanceName: "测试服务器",
          targetLink: row.targetLink
        }
      });
      this.requestLoading = false;

      // 开始轮询
      setInterval(() => {
        if (this.percentage <= 90) this.percentage += 4;
        this.queryStatus();
      }, 3000);
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

    // 安装完毕状态
    installed() {
      console.log("已安装完毕");
      this.isInstalled = true;
    },

    // 前往控制台
    toInstance() {
      this.$router.push({
        path: `/terminal/${this.remoteUuid}/${this.taskInfo.detail.instanceUuid}/`
      });
    }
  },
  mounted() {
    this.init();
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
