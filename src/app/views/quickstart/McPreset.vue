<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="quick-container">
    <Panel style="width: 100%" v-if="!loading">
      <template #title>预设服务器模板</template>
      <template #default>
        <el-table :data="tableData" size="small" stripe style="width: 100%">
          <el-table-column prop="info" label="介绍" min-width="300px"></el-table-column>
          <el-table-column prop="mc" label="Minecraft 版本" width="120px"></el-table-column>
          <el-table-column prop="java" label="Java 版本要求" width="120px"></el-table-column>
          <el-table-column prop="size" label="整合包大小" width="120px">
            <template v-slot="scope"> {{ scope.row.size }}MB </template>
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
      </template>
    </Panel>

    <Panel style="width: 600px" v-if="loading">
      <template #title>{{ isInstall ? "安装完毕" : "正在安装中" }}</template>
      <template #default>
        <div class="display-center" v-if="!isInstall">
          <div style="text-align: center">
            <el-progress type="circle" :percentage="percentage" />
            <div style="margin-top: 12px; text-align: center">
              <p class="tip-title">正在下载文件...</p>
              <p class="sub-title-info">实际所需时间与网速，处理器运行速度有关，请务必耐心等待。</p>
            </div>
          </div>
        </div>
        <div v-else class="display-center">
          <div style="margin: 16px">
            <p class="tip-title">接下来您只需要进入“实例控制台”，轻点“启动实例”即可。</p>
            <el-button type="primary" size="default" @click="toInstance">前往控制台</el-button>
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Panel from "@/components/Panel";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Panel, Dialog },
  data: function () {
    return {
      tableData: [],
      percentage: 25,
      loading: false,
      visibleDialog: false
    };
  },
  methods: {
    init() {
      this.tableData = [
        {
          info: "[原版生存] 基友快速联机必备，让你和你的小伙伴一起享受原汁原味的极致生存！",
          mc: "1.19.2",
          java: "1.17",
          size: 500,
          remark: "内存至少8G才可使用哦~"
        },
        {
          info: "[原版生存] 基友快速联机必备，让你和你的小伙伴一起享受原汁原味的极致生存！",
          mc: "1.18",
          java: "1.17",
          size: 500,
          remark: "内存至少8G才可使用哦~"
        },
        {
          info: "[原版生存] 基友快速联机必备，让你和你的小伙伴一起享受原汁原味的极致生存！",
          mc: "1.17",
          java: "1.17",
          size: 500,
          remark: "内存至少8G才可使用哦~"
        },
        {
          info: "[原版生存] 基友快速联机必备，让你和你的小伙伴一起享受原汁原味的极致生存！",
          mc: "1.16",
          java: "1.17",
          size: 500,
          remark: "内存至少8G才可使用哦~"
        }
      ];
    },

    // 开始安装
    handleSelectTemplate() {
      this.loading = true;
      setTimeout(() => {
        this.percentage = 100;
        this.installed();
      }, 1000);
    },

    // 安装完毕状态
    installed() {
      this.isInstall = true;
    },

    // 前往控制台
    toInstance() {}
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
