<template>
  <Dialog v-model="v" :cancel="close">
    <template #title> {{ $t("CommonText.012") }} </template>
    <template #default>
      <div class="wrapper">
        <div v-if="isFromTerminal && viewType === 0">
          <p class="sub-title">
            {{ $t("components.NetworkTip.016") }}
          </p>
        </div>
        <el-row :gutter="20" v-if="viewType === 0">
          <el-col :span="12" :offset="0">
            <SelectBlock style="height: 140px" @click="select(1)">
              <template #title>
                <p class="sub-title-title">
                  {{ $t("components.NetworkTip.001") }}
                </p>
              </template>
              <template #info>
                <p class="sub-title-info">
                  {{ $t("components.NetworkTip.002") }}
                </p>
              </template>
            </SelectBlock>
          </el-col>
          <el-col :span="12" :offset="0">
            <SelectBlock style="height: 140px" @click="select(2)">
              <template #title>
                <p class="sub-title-title">
                  {{ $t("components.NetworkTip.003") }}
                </p>
              </template>
              <template #info>
                <p class="sub-title-info">
                  {{ $t("components.NetworkTip.004") }}
                </p>
              </template>
            </SelectBlock>
          </el-col>
        </el-row>

        <div v-if="viewType === 0">
          <el-link type="primary" @click="close"> {{ $t("components.NetworkTip.017") }}</el-link>
        </div>

        <div v-if="viewType === 1">
          <div class="flex flex-space-between flex-space-center">
            <div style="margin: 24px 0px 24px 0px; text-align: center">
              <i class="el-icon-share" style="font-size: 72px; margin-bottom: 12px"></i>
              <div>
                <p class="sub-title color-green" v-if="ipv4">
                  {{ $t("components.NetworkTip.005", [ipv4]) }}
                </p>
              </div>
            </div>
          </div>

          <p class="sub-title">
            {{ $t("components.NetworkTip.006", [ipv4 ? ipv4 : "8.8.8.8"]) }}
          </p>

          <p class="sub-title">
            {{ $t("components.NetworkTip.007") }}
          </p>
        </div>

        <div v-if="viewType === 2">
          <p class="sub-title-title row-mb">
            {{ $t("components.NetworkTip.008") }}
          </p>
          <p class="sub-title-title">
            {{ $t("components.NetworkTip.009") }}
          </p>
          <!-- <p>
            {{ $t("CommonText.013") }}
            <span class="color-gray" v-if="taskInfo.status == 0"> {{ $t("CommonText.014") }} </span>
            <span class="color-green" v-if="taskInfo.status == 1">
              {{ $t("CommonText.015") }}
            </span>
            <span class="color-red" v-if="taskInfo.status == -1"> {{ $t("CommonText.016") }} </span>
          </p> -->
          <p v-if="taskInfo.detail && taskInfo.detail.ip">
            {{ $t("components.NetworkTip.010") }}
            <span class="color-green"> {{ taskInfo.detail.ip }} </span>
          </p>
          <div class="row-mb">
            <div class="sub-title">
              <div class="sub-title-title require-field">
                {{ $t("components.NetworkTip.011") }}
              </div>
              <div class="sub-title-info">
                {{ $t("components.NetworkTip.012") }}
              </div>
            </div>
            <el-input
              v-model="config.openFrpToken"
              size="small"
              clearable
              :placeholder="$t('components.NetworkTip.013')"
            >
            </el-input>
          </div>
          <div class="row-mb">
            <div class="sub-title">
              <div class="sub-title-title require-field">{{ $t("CommonText.031") }}</div>
            </div>
            <el-input
              v-model="config.openFrpTunnelId"
              size="small"
              clearable
              :placeholder="$t('CommonText.031')"
            >
            </el-input>
          </div>

          {{ instanceInfo }}

          <div style="display: flex; justify-content: space-between">
            <div>
              <ItemGroup>
                <el-button type="primary" size="small" @click="saveConfig">
                  {{ $t("general.save") }}
                </el-button>

                <el-link
                  type="primary"
                  :underline="false"
                  href="https://docs.mcsmanager.com/#/"
                  target="_blank"
                >
                  {{ $t("components.NetworkTip.014") }}
                </el-link>
                -
                <el-link
                  type="primary"
                  :underline="false"
                  href="https://docs.mcsmanager.com/#/"
                  target="_blank"
                >
                  {{ $t("CommonText.019") }}
                </el-link>

                <p class="color-gray">{{ $t("components.NetworkTip.019") }}</p>
              </ItemGroup>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script>
// "extraServiceConfig": { "isOpenFrp": false, "openFrpTunnelId": "", "openFrpToken": "" } }
import Dialog from "@/components/Dialog";
import SelectBlock from "@/components/SelectBlock";
// import {
//   API_INSTANCE_ASYNC_QUERY,
//   API_INSTANCE_ASYNC_STOP,
//   API_INSTANCE_ASYNC_TASK
// } from "@/app/service/common";
import { request } from "@/app/service/protocol";
import { API_FORWARD_REQUEST, QUERY_PUBLIC_IP } from "../app/service/common";
export default {
  components: {
    Dialog,
    SelectBlock
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    daemonUuid: {
      type: String,
      default: ""
    },
    extraServiceConfig: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      v: false,
      viewType: 0,
      ipv4: "",
      indexCode: "",
      tunnelId: "",
      config: {},
      taskInfo: {
        status: 0,
        taskId: "--",
        ip: ""
      },
      timeTask: null
    };
  },

  computed: {
    isOpen() {
      return this.taskInfo.status == 1;
    },

    isFromTerminal() {
      const r = this.$route.query.network_tip ? true : false;

      return r;
    }
  },
  watch: {
    visible(n) {
      this.v = n;
      this.config = this.extraServiceConfig;
      if (n) this.init();
    }
  },

  methods: {
    async getPublicIP() {
      try {
        const data = await request({
          method: "GET",
          url: API_FORWARD_REQUEST,
          params: {
            target: QUERY_PUBLIC_IP
          }
        });
        this.ipv4 = data.ipv4;
      } catch (error) {
        this.ipv4 = "";
      }
    },

    clearIntervalTask() {
      if (this.timeTask) clearInterval(this.timeTask);
    },

    init() {
      this.clearIntervalTask();
      this.getPublicIP();
    },

    show() {
      this.$emit("update:visible", true);
    },

    close() {
      this.$emit("update:visible", false);
      this.clearIntervalTask();
      this.viewType = 0;
    },

    select(type) {
      this.viewType = type;
    },

    saveConfig() {
      this.$emit("submit", this.config);
      this.close();
    }

    // async startHiPer() {
    //   if (!this.indexCode) {
    //     return this.$message({
    //       message: window.$t("components.NetworkTip.015"),
    //       type: "error"
    //     });
    //   }

    //   try {
    //     await request({
    //       method: "POST",
    //       url: API_INSTANCE_ASYNC_TASK,
    //       params: {
    //         remote_uuid: this.daemonUuid,
    //         uuid: "-",
    //         task_name: "hiper"
    //       },
    //       data: {
    //         indexCode: this.indexCode
    //       }
    //     });
    //     this.$message({
    //       message: this.$t("general.success"),
    //       type: "success"
    //     });
    //   } catch (error) {
    //     this.$message({
    //       message: `${this.$t("general.error")}: ${error.message}`,
    //       type: "error"
    //     });
    //   }
    // },

    // async stopHiPer() {
    //   try {
    //     await request({
    //       method: "POST",
    //       url: API_INSTANCE_ASYNC_STOP,
    //       params: {
    //         remote_uuid: this.daemonUuid,
    //         uuid: "-",
    //         task_name: "hiper"
    //       },
    //       data: {
    //         taskId: this.taskInfo.taskId
    //       }
    //     });
    //     this.$message({
    //       message: this.$t("general.success"),
    //       type: "success"
    //     });
    //   } catch (error) {
    //     this.$message({
    //       message: `${this.$t("general.error")}: ${error.message}`,
    //       type: "error"
    //     });
    //   }
    // },

    // async queryStatus() {
    //   const taskInfo = await request({
    //     method: "POST",
    //     url: API_INSTANCE_ASYNC_QUERY,
    //     params: {
    //       remote_uuid: this.daemonUuid,
    //       uuid: "-",
    //       task_name: "hiper"
    //     },
    //     data: {}
    //   });

    //   if (taskInfo.length > 0) {
    //     this.taskInfo = taskInfo[0];
    //   }
    // }
  }
};
</script>

<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<style scoped>
.wrapper {
  margin: 16px;
  max-width: 600px;
}
</style>
