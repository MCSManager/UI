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
        </el-col>
      </el-row>
    </div>

    <div v-if="step === 0" class="task-container">
      <el-link type="primary" :underline="false">
        查看正在进行的任务<i class="el-icon-right"></i>
      </el-link>
    </div>
  </div>
  <McPreset :remote-uuid="selectedHostUuid" v-else-if="displayType === 2"></McPreset>
</template>

<script>
import QuickStartButton from "@/components/SelectBlock";
import { request } from "@/app/service/protocol";
import { API_SERVICE } from "../../service/common";
import McPreset from "./McPreset";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { QuickStartButton, McPreset },
  inject: ["appLoading"],
  data: function () {
    return {
      loading: false,
      displayType: 1,
      title: this.$t("quickStart.title"),
      remoteObjects: [],
      quickStartType: 0,
      selectedHostUuid: "",
      step: 0,
      isMC: false,
      // 已经在运行的任务列表
      taskList: [
        {
          id: 213213,
          daemonUuid: "sad"
        }
      ],
      quickItems: [
        {
          title: this.$t("quickStart.quickItems[0].title"),
          subTitle: this.$t("quickStart.quickItems[0].subTitle"),
          value: 1,
          fn: this.selectQuickStartType
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
          title: "一键快速开服（推荐初学者）",
          subTitle: "适合初学者，通过预设模板快速帮助您部署和启动服务器！",
          value: 1,
          fn: this.mcSelectCreateMethod
        },
        {
          title: "自定义创建服务器",
          subTitle: "适合初学者，快速帮助您部署和启动服务器！",
          value: 2,
          fn: this.mcSelectCreateMethod
        }
      ]
    };
  },
  async mounted() {
    await this.initRemoteHost();
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
  text-align: center;
  margin-top: 30px;

  .el-link {
    font-size: 18px;
  }
}
</style>
