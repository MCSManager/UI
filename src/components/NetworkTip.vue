<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="v" :cancel="close">
    <template #title>联机方式</template>
    <template #default>
      <div class="wrapper">
        <el-row :gutter="20" v-if="viewType === 0">
          <el-col :span="12" :offset="0">
            <SelectBlock style="height: 140px" @click="select(1)">
              <template #title>
                <p class="sub-title-title">服务器公网联机方案</p>
              </template>
              <template #info>
                <p class="sub-title-info">您必须拥有一台公网IP的服务器，才可以使用此方式联网。</p>
              </template>
            </SelectBlock>
          </el-col>
          <el-col :span="12" :offset="0">
            <SelectBlock style="height: 140px" @click="select(2)">
              <template #title>
                <p class="sub-title-title">家庭网络联机方案</p>
              </template>
              <template #info>
                <p class="sub-title-info">
                  使用由第三方提供的分布式虚拟局域网服务进行联机，实现家庭网络接入。
                </p>
              </template>
            </SelectBlock>
          </el-col>
        </el-row>

        <div v-if="viewType === 1">
          <div class="flex flex-space-between flex-space-center">
            <div style="margin: 24px 0px 24px 0px; text-align: center">
              <i class="el-icon-share" style="font-size: 72px; margin-bottom: 12px"></i>
              <div>
                <p class="sub-title color-green" v-if="ipv4">服务器 IP 地址：{{ ipv4 }}</p>
              </div>
            </div>
          </div>

          <p class="sub-title">
            当您选择使用公网IP时，MCSManager 无需进行任何操作，您只需使用公网 IP
            地址和您的软件默认端口号即可让其他人连接您的服务器，列如
            {{ ipv4 ? ipv4 : "8.8.8.8" }}:25565。
          </p>

          <p class="sub-title">注意：此处获取的公网 IP 不一定正确。</p>
        </div>

        <div v-if="viewType === 2">
          <p class="sub-title-title row-mb">
            通过 HiPer 使您与主流的 Minecraft 启动器进行安全、快速、稳定的多人联机。
          </p>
          <p class="sub-title-title">
            对于中国大陆用户，最新版本的 HMCL，PCL 启动器均已支持 HiPer
            联机，您与朋友们可以使用最新版本的多人联机功能加入服务器。
          </p>
          <p>
            状态：
            <span class="color-gray" v-if="taskInfo.status == 0">未启用</span>
            <span class="color-green" v-if="taskInfo.status == 1">运行中</span>
            <span class="color-red" v-if="taskInfo.status == -1">启动错误</span>
          </p>
          <!-- <p>任务 ID: {{ taskInfo.taskId }}</p> -->
          <p v-if="taskInfo.detail && taskInfo.detail.ip">
            IP 地址：
            <span class="color-green">{{ taskInfo.detail.ip }}</span>
          </p>
          <div class="row-mb">
            <div class="sub-title">
              <div class="sub-title-title require-field">HiPer 索引码：</div>
              <div class="sub-title-info">
                索引码是接入 HiPer 网络的必备钥匙，您可以点击底部的“获取索引码”来获得。
              </div>
            </div>
            <el-input v-model="indexCode" placeholder="请输入索引码" size="small" clearable>
            </el-input>
          </div>

          <div style="display: flex; justify-content: space-between">
            <div>
              <ItemGroup>
                <el-button type="primary" size="small" @click="startHiPer" v-if="!isOpen">
                  启用
                </el-button>
                <el-button type="danger" size="small" @click="stopHiPer" v-if="isOpen">
                  停止
                </el-button>

                <el-link
                  type="primary"
                  :underline="false"
                  href="https://docs.mcsmanager.com/#/"
                  target="_blank"
                >
                  获取索引码
                </el-link>
              </ItemGroup>
            </div>
            <el-link
              type="primary"
              :underline="false"
              href="https://docs.mcsmanager.com/#/"
              target="_blank"
            >
              使用教程
            </el-link>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import SelectBlock from "@/components/SelectBlock";
import {
  API_INSTANCE_ASYNC_QUERY,
  API_INSTANCE_ASYNC_STOP,
  API_INSTANCE_ASYNC_TASK
} from "@/app/service/common";
import { request } from "@/app/service/protocol";
import { API_FORWARD_REQUEST, QUERY_PUBLIC_IP } from "../app/service/common";
export default {
  components: { Dialog, SelectBlock },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    daemonUuid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      v: false,
      viewType: 0,
      ipv4: "",
      indexCode: "",
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
    }
  },

  watch: {
    visible(n) {
      this.v = n;
      if (n) this.init();
    }
  },

  unmounted() {},
  methods: {
    async getPublicIP() {
      const data = await request({
        method: "GET",
        url: API_FORWARD_REQUEST,
        params: {
          target: QUERY_PUBLIC_IP
        }
      });
      this.ipv4 = data.ipv4;
    },
    clearIntervalTask() {
      if (this.timeTask) clearInterval(this.timeTask);
    },
    init() {
      this.clearIntervalTask();
      this.queryStatus();
      this.getPublicIP();
      this.timeTask = setInterval(() => {
        this.queryStatus();
      }, 2500);
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
    async startHiPer() {
      if (!this.indexCode) {
        return this.$message({
          message: "请填写索引码",
          type: "error"
        });
      }
      try {
        await request({
          method: "POST",
          url: API_INSTANCE_ASYNC_TASK,
          params: {
            remote_uuid: this.daemonUuid,
            uuid: "-",
            task_name: "hiper"
          },
          data: {
            indexCode: this.indexCode
          }
        });
        this.$message({ message: this.$t("general.success"), type: "success" });
      } catch (error) {
        this.$message({
          message: `${this.$t("general.error")}: ${error.message}`,
          type: "error"
        });
      }
    },
    async stopHiPer() {
      try {
        await request({
          method: "POST",
          url: API_INSTANCE_ASYNC_STOP,
          params: {
            remote_uuid: this.daemonUuid,
            uuid: "-",
            task_name: "hiper"
          },
          data: {
            taskId: this.taskInfo.taskId
          }
        });
        this.$message({ message: this.$t("general.success"), type: "success" });
      } catch (error) {
        this.$message({
          message: `${this.$t("general.error")}: ${error.message}`,
          type: "error"
        });
      }
    },

    async queryStatus() {
      const taskInfo = await request({
        method: "POST",
        url: API_INSTANCE_ASYNC_QUERY,
        params: {
          remote_uuid: this.daemonUuid,
          uuid: "-",
          task_name: "hiper"
        },
        data: {}
      });

      if (taskInfo.length > 0) {
        this.taskInfo = taskInfo[0];
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  margin: 16px;
  max-width: 600px;
}
</style>
