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

          <div v-if="item.extra && isCN()" style="text-align: center">
            <el-link type="primary" @click="item.fn(item.value)">
              {{ item.extra.title }}
            </el-link>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="task-container" v-if="selectedHostUuid && isCN()">
      <div>
        <h4>{{ $t("views.quickstart_index.001") }}</h4>
      </div>
      <div>
        <div v-if="taskList.length === 0">
          <el-link type="info" :underline="false">{{ $t("views.quickstart_index.002") }}</el-link>
        </div>
        <div class="task-btn" v-for="(item, index) in taskList" :key="index">
          <span>
            <el-link type="primary" v-if="item.detail && item.detail.instanceConfig">
              {{ index + 1 }}. {{ item.detail.instanceConfig.nickname }}
            </el-link>
            <el-link
              type="info"
              v-if="item.status === 0"
              style="margin-left: 4px"
              @click="toInstance(selectedHostUuid, item.detail.instanceUuid)"
            >
              {{ $t("views.quickstart_index.003") }}
            </el-link>
          </span>
          <span style="margin-left: 8px">
            <span v-if="item.status === 0">
              <el-tag type="success" size="mini">{{ $t("CommonText.001") }}</el-tag>
            </span>
            <span v-else-if="item.status === 1">
              <el-tag type="primary" size="mini">
                <i class="el-icon-loading"></i>&nbsp;{{ $t("CommonText.002") }}
              </el-tag>
            </span>
            <span v-else>
              <el-tag type="danger" size="mini">{{ $t("CommonText.003") }}</el-tag>
            </span>
          </span>
        </div>
      </div>
      <div v-if="taskList.length > 0">
        <el-link type="info" @click="refresh" size="mini">{{ $t("CommonText.004") }}</el-link>
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
import { isCN } from "@/app/utils/lang";
export default {
  components: {
    QuickStartButton,
    McPreset
  },
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
      taskList: [],
      quickItems: [
        {
          title: this.$t("quickStart.quickItems[0].title"),
          subTitle: this.$t("quickStart.quickItems[0].subTitle"),
          value: 1,
          fn: this.selectQuickStartType,
          extra: {
            title: window.$t("views.quickstart_index.004"),
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
          title: window.$t("views.quickstart_index.007"),
          subTitle: window.$t("views.quickstart_index.008"),
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

    if (isCN()) {
      this.minecraftCreateMethod.splice(0, null, {
        title: window.$t("views.quickstart_index.005"),
        subTitle: window.$t("views.quickstart_index.006"),
        value: 1,
        fn: this.mcSelectCreateMethod
      });
    }

    await this.initRemoteHost();
  },

  unmounted() {
    clearInterval(this.invTask);
  },

  methods: {
    isCN,
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

      this.quickItems = this.remoteObjects.map((v) => {
        return {
          title: `HOST: ${v.ip}:${v.port}`,
          subTitle: window.$t("CommonText.005") + v.remarks,
          value: v.uuid,
          fn: this.selectHost
        };
      });

      if (this.quickItems.length === 1) {
        this.selectHost(this.quickItems[0].value);
      }
    },

    async selectHost(uuid) {
      this.step++;
      console.log("Select host:", uuid);
      this.selectedHostUuid = uuid;
      this.title = window.$t("views.quickstart_index.009");
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
      this.$message({
        message: this.$t("general.refreshFinish"),
        type: "success"
      });
    },

    async queryAllTaskStatus() {
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

    toInstance(remoteUuid, instanceUuid) {
      this.$router.push({
        path: `/terminal/${remoteUuid}/${instanceUuid}/`,
        query: {
          network_tip: 1
        }
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
  color: #767676;
  text-align: left;
  margin-top: 30px;
  width: 300px;
  margin: auto;
}
.task-btn {
  margin: 8px;
}
</style>
