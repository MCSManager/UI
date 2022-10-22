<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="v" :cancel="close">
    <template #title>联网方式</template>
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
            使用 HiPer 的去中心化服务实现虚拟局域网，从而让您与其他人共同进入服务器。
          </p>
          <p class="sub-title-title">
            对于中国大陆用户，最新版本的 HMCL，PCL 启动器均已支持 HiPer
            联机，您的朋友必须也要使用最新的启动器并启动 HiPer 网络联机模式才可以与您一起游玩。
          </p>
          <p>
            状态：
            <span class="color-gray">未启用</span>
          </p>
          <p>
            IP 地址：
            <span class="color-green">-</span>
          </p>
          <el-button type="primary" size="small" @click="startHiPer">开始使用</el-button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import SelectBlock from "@/components/SelectBlock";
export default {
  components: { Dialog, SelectBlock },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      v: false,
      viewType: 0
    };
  },
  watch: {
    visible(n) {
      this.v = n;
      this.init();
    }
  },

  methods: {
    init() {},
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
    startHiPer() {}
  }
};
</script>

<style scoped>
.wrapper {
  margin: 16px;
  max-width: 600px;
}
</style>
