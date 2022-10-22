<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div v-if="displayType === 1" v-loading="loading">
    <div class="quick-title">
      <h4>{{ title }}</h4>
    </div>
    <div class="quick-container">
      <el-row :gutter="10" justify="center" style="width: 100%">
        <el-col
          :md="6"
          :offset="0"
          v-for="(item, index) in quickItems"
          :key="index"
          @click="item.fn(item.value)"
        >
          <ItemGroup>
            <QuickStartButton style="height: 120px">
              <template #title>
                <p class="sub-title-title">{{ item.title }}</p>
              </template>
              <template #info>
                <p class="sub-title-info">
                  {{ item.subTitle }}
                </p>
              </template>
            </QuickStartButton>
          </ItemGroup>

          <div v-if="item.extra" style="text-align: center">
            <el-link type="primary" @click="item.fn(item.value)">
              {{ item.extra.title }}
            </el-link>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="task-container" v-if="selectedHostUuid">
      <div>
        <h4>这台主机下的历史安装任务:</h4>
      </div>
      <div>
        <div v-if="taskList.length === 0">
          <el-link type="info" :underline="false">
            没有任何安装任务，您可以点击上述选项来创建
          </el-link>
        </div>
        <div class="task-btn" v-for="(item, index) in taskList" :key="index">
          <span>
            <el-link type="primary">
              {{ index + 1 }}. {{ item.detail.instanceConfig.nickname }}
            </el-link>
            <el-link
              type="info"
              v-if="item.status === 0"
              style="margin-left: 4px"
              @click="toInstance(selectedHostUuid, item.detail.instanceUuid)"
            >
              前往控制台
            </el-link>
          </span>
          <span style="margin-left: 8px">
            <span v-if="item.status === 0">
              <el-tag type="success" size="mini">安装完成</el-tag>
            </span>
            <span v-else-if="item.status === 1">
              <el-tag type="primary" size="mini">
                <i class="el-icon-loading"></i>
                安装中
              </el-tag>
            </span>
            <span v-else>
              <el-tag type="danger" size="mini">安装失败</el-tag>
            </span>
          </span>
        </div>
      </div>
      <div v-if="taskList.length > 0">
        <el-link type="info" @click="refresh" size="mini">刷新</el-link>
      </div>
    </div>
  </div>
  <McPreset
    :task-id="taskDetailPageId"
    :remote-uuid="selectedHostUuid"
    v-else-if="displayType === 2"
  ></McPreset>
</template>

<script>
import QuickStartButton from "@/components/SelectBlock";
import { request } from "@/app/service/protocol";
import { API_INSTANCE_ASYNC_QUERY, API_SERVICE } from "../../service/common";
import McPreset from "./McPreset";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { QuickStartButton, McPreset },
  inject: ["app"],
  data: function () {
    return {
      loading: false,
      displayType: 1,
      title: this.$t("quickStart.title"),
      remoteObjects: [],
      quickStartType: 0,
      selectedHostUuid: "",
      invTask: null,
      taskDetailPageId: "",
      step: 0,
      isMC: false,
      // 已经在运行的任务列表
      taskList: [],
      quickItems: [
        {
          title: this.$t("quickStart.quickItems[0].title"),
          subTitle: this.$t("quickStart.quickItems[0].subTitle"),
          value: 1,
          fn: this.selectQuickStartType,
          extra: {
            title: "查看历史安装任务",
            fn: this.selectQuickStartType
          }
        },
        {
          title: this.$t("quickStart.quickItems[1].title"),
          subTitle: this.$t("quickStart.quickItems[1].subTitle"),
          value: 2,
          fn: this.selectQuickStartType
        },
        {
          title: this.$t("quickStart.quickItems[2].title"),
          subTitle: this.$t("quickStart.quickItems[2].subTitle"),
          value: 3,
          fn: this.selectQuickStartType
        }
      ],

      minecraftCreateMethod: [
        {
          title: "一键快速开服（初次使用推荐）",
          subTitle: "适合初学者，通过预设模板快速帮助您部署和启动服务器。",
          value: 1,
          fn: this.mcSelectCreateMethod
        },
        {
          title: "普通流程创建服务器",
          subTitle: "导入本地服务器，或自定义创建一个服务器。",
          value: 2,
          fn: this.mcSelectCreateMethod
        }
      ]
    };
  },
  async mounted() {
    this.taskDetailPageId = this.$route.query.task_id;
    this.selectedHostUuid = this.$route.query.remote_uuid;
    if (this.taskDetailPageId) {
      this.displayType = 2;
    }
    await this.initRemoteHost();
  },
  unmounted() {
    clearInterval(this.invTask);
  },
  methods: {
    async initRemoteHost() {
      this.remoteObjects = await request({
        method: "GET",
        url: API_SERVICE
      });
    },

    async startLoading() {
      this.loading = true;
      return new Promise((ok) => {
        setTimeout(() => {
          this.loading = false;
          ok();
        }, 1200);
      });
    },

    // 选择快速启动
    selectQuickStartType(v) {
      this.step++;
      if (v === 1) {
        this.isMC = true;
      }
      if (v === 4) {
        return window.open("https://docs.mcsmanager.com/");
      }
      this.quickStartType = v;
      this.title = this.$t("quickStart.whichServer");

      // 载入主机选择
      this.quickItems = this.remoteObjects.map((v) => {
        return {
          title: `HOST: ${v.ip}:${v.port}`,
          subTitle: "备注：" + v.remarks,
          value: v.uuid,
          fn: this.selectHost
        };
      });

      if (this.quickItems.length === 1) {
        this.selectHost(this.quickItems[0].value);
      }
    },

    // 选择主机
    async selectHost(uuid) {
      this.step++;
      console.log("Select host:", uuid);
      this.selectedHostUuid = uuid;
      this.title = "选择创建方式";
      await this.startLoading();
      if (this.isMC) {
        this.quickItems = this.minecraftCreateMethod;
        this.startQueryTasks();
      } else {
        this.$router.push({
          path: `/new_instance/${this.selectedHostUuid}`,
          query: {
            type: this.quickStartType
          }
        });
      }
    },

    async mcSelectCreateMethod(type = 0) {
      this.step++;
      if (type === 1) {
        await this.startLoading();
        this.displayType = 2;
      }

      if (type === 2) {
        this.$router.push({
          path: `/new_instance/${this.selectedHostUuid}`,
          query: {
            type: this.quickStartType
          }
        });
      }
    },

    async startQueryTasks() {
      await this.queryAllTaskStatus();
      setTimeout(() => {
        this.queryAllTaskStatus();
      }, 3000);
    },

    refresh() {
      this.queryAllTaskStatus();
      this.$message({ message: this.$t("general.refreshFinish"), type: "success" });
    },

    async queryAllTaskStatus() {
      // Task Class
      // [
      //   {
      //     taskId:
      //       "QuickInstallTask-3ad03650f2ba4eadb11362867444cb4f-0acd53bb-15a1-445d-b9ed-31e6fb11d2f7",
      //     status: 1,
      //     detail: {
      //       taskId:
      //         "QuickInstallTask-3ad03650f2ba4eadb11362867444cb4f-0acd53bb-15a1-445d-b9ed-31e6fb11d2f7",
      //       status: 1,
      //       instanceUuid: "3ad03650f2ba4eadb11362867444cb4f",
      //       instanceStatus: 0,
      //       instanceConfig: {
      //         nickname: "T"
      //       }
      //     }
      //   }
      // ];
      const tasks = await request({
        method: "POST",
        url: API_INSTANCE_ASYNC_QUERY,
        params: {
          remote_uuid: this.selectedHostUuid,
          uuid: "-",
          task_name: "quick_install"
        },
        data: {}
      });
      this.taskList = tasks;
    },

    toTaskDetail(item = {}) {
      this.$router.push({
        path: "/quickstart",
        query: {
          task_id: item.taskId,
          remote_uuid: this.selectedHostUuid
        }
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },

    // 前往控制台
    toInstance(remoteUuid, instanceUuid) {
      this.$router.push({
        path: `/terminal/${remoteUuid}/${instanceUuid}/`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.quick-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.quick-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.task-container {
  text-align: left;
  margin-top: 30px;
  width: 300px;
  margin: auto;
}
.task-btn {
  margin: 8px;
}
</style>
