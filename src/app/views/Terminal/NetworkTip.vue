<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="v" :cancel="close">
    <template #title>联机模式</template>
    <template #default>
      <div class="wrapper">
        <el-row :gutter="20" v-if="viewType === 0">
          <el-col :span="12" :offset="0">
            <SelectBlock style="height: 140px" @click="select(1)">
              <template #title>
                <p class="sub-title-title">公网 IP 联机</p>
              </template>
              <template #info>
                <p class="sub-title-info">您必须拥有一台公网IP的服务器，才可以使用此方式联网。</p>
              </template>
            </SelectBlock>
          </el-col>
          <el-col :span="12" :offset="0">
            <SelectBlock style="height: 140px" @click="select(2)">
              <template #title>
                <p class="sub-title-title">使用 HiPer 提供的虚拟网络联机</p>
              </template>
              <template #info>
                <p class="sub-title-info">适用于家庭宽带，动态公网IP，以及容易遭受攻击的用户。</p>
              </template>
            </SelectBlock>
          </el-col>
        </el-row>

        <div v-if="viewType === 1">
          <p class="sub-title-title">
            当您选择使用公网IP时，MCSManager
            无需进行任何操作，您只需使用公网IP+您的软件默认端口号即可让其他人连接您的服务器，列如
            40.1.2.3:25565。
          </p>
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
          <p>任务 ID: {{ taskInfo.taskId }}</p>
          <p>
            IP 地址：
            <span class="color-green">-</span>
          </p>
          <div class="row-mb">
            <div class="sub-title">
              <div class="sub-title-title require-field">HiPer 索引码：</div>
              <div class="sub-title-info">
                索引码是接入 HiPer 网络的必备钥匙，您可以前往
                <a href="" target="_blank"> 这里 </a>
                获取
              </div>
            </div>
            <el-input v-model="indexCode" placeholder="请输入索引码" size="small" clearable>
            </el-input>
          </div>

          <div style="display: flex; justify-content: space-between">
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
              使用说明
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
} from "../../service/common";
import { request } from "../../service/protocol";
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
      indexCode: "",
      taskInfo: {
        status: 0,
        taskId: "--"
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
      this.init();
    }
  },

  methods: {
    init() {
      this.timeTask = setInterval(() => {
        this.queryStatus();
      }, 2500);
    },
    show() {
      this.$emit("update:visible", true);
    },
    close() {
      this.$emit("update:visible", false);
      this.viewType = 0;
    },
    select(type) {
      this.viewType = type;
    },
    async startHiPer() {
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
