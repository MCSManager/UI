<!--
  Copyright (C) 2022 Suwings <Suwings@outlook.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  According to the AGPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings <Suwings@outlook.com>

  该程序是免费软件，您可以重新分发和/或修改据 GNU Affero 通用公共许可证的条款，
  由自由软件基金会，许可证的第 3 版，或（由您选择）任何更高版本。

  根据 AGPL 与用户协议，您必须保留所有版权声明，如果修改源代码则必须开源修改后的源代码。
  可以前往 https://mcsmanager.com/ 阅读用户协议，申请闭源开发授权等。
-->

<template>
  <Panel v-show="step == 1">
    <template #title>创建镜像</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <ItemGroup>
            <el-button type="" size="small" @click="back">回到镜像列表</el-button>
            <el-button type="" size="small" @click="toProgress">构建进度</el-button>
          </ItemGroup>
        </div>
        <span class="color-gray">新建镜像可能需要十几分钟，请耐心等待&nbsp;&nbsp;</span>
      </div>
      <LineOption class="row-mt" :custom="true">
        <template #default>
          <div class="sub-title">什么是环境镜像？</div>
          <div class="sub-title-info">
            由于 Minecraft 或其他程序需要特定的运行环境，比如 Java/Python/.Net 等等，
            不同版本在同一台机器上安装管理十分复杂，使用不同的环境镜像可以很方便的管理不同版本不同类型的服务环境。
          </div>
          <div class="sub-title row-mt">什么是 Docker？为什么需要它？</div>
          <div class="sub-title-info">
            Docker
            是一款轻量级虚拟化软件，能够利用环境镜像来创建容器（就像一个盒子）包裹你的实际应用程序，
            让你的应用程序在一个虚拟的沙箱环境中运行，不论应用程序做任何恶意操作，都不会影响到宿主机的任何文件。
          </div>
        </template>
      </LineOption>
      <div class="row-mt">
        <el-row :gutter="10">
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(1)">
              <template #title>创建 OpenJDK 8 环境镜像</template>
              <template #info
                >适用于需要 Java 8 的服务端软件，属于经典的 Java 运行时版本，适用于 Minecraft 1.17
                以下的所有版本</template
              >
            </SelectBlock>
          </el-col>
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(2)">
              <template #title>创建 OpenJDK 16 环境镜像</template>
              <template #info>内置 Java 16 运行时环境，适用于 Minecraft 1.17 版本的服务端</template>
            </SelectBlock>
          </el-col>
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(5)">
              <template #title>创建 OpenJDK 17 环境镜像</template>
              <template #info
                >内置 Java 17 运行时环境，适用于 Minecraft 1.18 版本以上的服务端</template
              >
            </SelectBlock>
          </el-col>
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(3)">
              <template #title>创建 Ubuntu 环境镜像</template>
              <template #info>适用于 MC 基岩版服务端运行环境或者其他 Linux 程序</template>
            </SelectBlock>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="row-mt">
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(4)">
              <template #title>使用 DockerFile 自定义创建</template>
              <template #info
                >使用 DockerFile 自定义创建任何环境镜像，此操作建议技术人员进行</template
              >
            </SelectBlock>
          </el-col>
        </el-row>
      </div>
    </template>
  </Panel>

  <Panel v-show="step == 2">
    <template #title>DockerFile</template>
    <template #default>
      <div class="row-mt">
        <div class="sub-title">
          <p class="sub-title-title">关于 DockerFile 文件</p>
          <p class="sub-title-info">
            官方参考文档：https://docs.docker.com/engine/reference/builder/
          </p>
        </div>
        <div class="sub-title">
          <p class="sub-title-title">注意事项</p>
          <p class="sub-title-info">必须创建 /workspace 目录，此目录将自动挂载到实例的文件根目录</p>
        </div>
        <div class="row-mt">
          <el-input 
            type="textarea" 
            :rows="14" 
            placeholder="必填，请输入内容" 
            v-model="dockerFile"
            style="word-break: break-all"
          ></el-input>
        </div>
        <div class="sub-title row-mt">
          <p class="sub-title-title">创建后的镜像名与版本标识</p>
        </div>
        <div class="flex row-mt">
          <el-input
            v-model="name"
            size="small"
            style="width: 240px"
            placeholder="[必填] 镜像名，如 openjdk"
          ></el-input>
          &nbsp;&nbsp;
          <el-input
            v-model="version"
            size="small"
            style="width: 240px"
            placeholder="[必填] 镜像版本，如 1.0 1.1 latest"
          ></el-input>
        </div>
      </div>
      <div class="row-mt">
        <el-button type="success" @click="createViaDockerFile" size="small">确定</el-button>
        <el-button type="" size="small" @click="forward(1)">回到镜像选择</el-button>
      </div>
    </template>
  </Panel>

  <Panel v-show="step == 3">
    <template #title>构建进度</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <ItemGroup>
            <el-button type="" size="small" @click="toProgress">刷新</el-button>
            <el-button type="" size="small" @click="forward(1)">回到镜像选择</el-button>
          </ItemGroup>
        </div>
        <span class="color-gray">新建镜像可能需要十几分钟，请耐心等待&nbsp;&nbsp;</span>
      </div>
      <div class="row-mt">
        <el-row :gutter="10" v-if="progress">
          <el-col :span="6" :offset="0" v-for="(activity, index) in progress" :key="index">
            <LineOption class="row-mt" :custom="true">
              <template #default>
                <div style="font-size: 14px">
                  <span>{{ activity.name }}</span>
                  &nbsp;
                  <span>{{ activity.status }}</span>
                </div>
              </template>
            </LineOption>
          </el-col>
        </el-row>
        <div v-if="!progress" class="text-center">
          <p>暂无数据</p>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "../../components/Panel";
import LineOption from "../../components/LineOption";
import SelectBlock from "../../components/SelectBlock";
import axios from "axios";
import { API_IMAGES, API_PROGRESS, API_SERVICE } from "../service/common";
import { request } from "../service/protocol";

export default {
  components: { Panel, SelectBlock, LineOption },
  data: function () {
    return {
      dockerFile: `FROM ubuntu:latest\nRUN mkdir -p /workspace\nWORKDIR /workspace\n`,
      step: 1,
      name: "",
      version: "",
      serviceUuid: this.$route.params.serviceUuid,
      progress: null
    };
  },
  methods: {
    forward(v) {
      this.step = v;
    },
    selectType(type) {
      if (type === 1) {
        this.dockerFile = `FROM openjdk:8
RUN mkdir -p /workspace
RUN apt update && apt install -y locales
RUN echo "zh_CN.UTF-8 UTF-8">/etc/locale.gen && locale-gen
ENV LANG=zh_CN.UTF-8
ENV LANGUAGE=zh_CN.UTF-8
ENV LC_ALL=zh_CN.UTF-8
ENV TZ=Asia/Shanghai
WORKDIR /workspace
`;
        this.name = "mcsm-openjdk";
        this.version = "8";
      }
      if (type === 2) {
        this.dockerFile = `FROM openjdk:16.0.2
RUN mkdir -p /workspace
ENV TZ=Asia/Shanghai
WORKDIR /workspace
`;
        this.name = "mcsm-openjdk";
        this.version = "16";
      }
      if (type === 3) {
        this.dockerFile = `FROM ubuntu:latest
RUN mkdir -p /workspace
RUN apt update
WORKDIR /workspace
`;
        this.name = "mcsm-ubuntu";
        this.version = "latest";
      }
      if (type === 5) {
        this.dockerFile = `FROM openjdk:17
RUN mkdir -p /workspace
ENV LANG=zh_CN.UTF-8
ENV LANGUAGE=zh_CN.UTF-8
ENV LC_ALL=zh_CN.UTF-8
ENV TZ=Asia/Shanghai
WORKDIR /workspace
`;
        this.name = "mcsm-openjdk";
        this.version = "17";
      }
      this.step = 2;
    },
    back() {
      this.$router.push({ path: `/image/${this.serviceUuid}` });
    },
    async toProgress() {
      this.step = 3;
      await this.getProgress();
      this.$message({ type: "info", message: "已获取最新构建进度" });
    },
    async getProgress() {
      const progress = await request({
        methods: "POST",
        url: API_PROGRESS,
        params: {
          remote_uuid: this.serviceUuid
        }
      });
      const list = [];
      for (const k in progress) {
        if (progress[k] == 1) progress[k] = "正在构建...";
        if (progress[k] == -1) progress[k] = "构建错误...";
        if (progress[k] == 2) progress[k] = "构建完毕";
        list.push({
          name: k,
          status: progress[k]
        });
      }
      this.progress = list;
    },
    async createViaDockerFile() {
      if (!this.name || !this.version || !this.dockerFile) {
        return this.$message({ type: "error", message: "请完成必填项目" });
      }
      // eslint-disable-next-line no-unreachable
      await this.$confirm("此构建过程可能需要几分钟时间，请确保网络畅通，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      try {
        await request({
          method: "POST",
          url: API_IMAGES,
          params: {
            remote_uuid: this.serviceUuid
          },
          data: {
            dockerFile: this.dockerFile,
            name: this.name,
            tag: this.version
          }
        });
        this.$notify({
          title: "创建镜像任务已经开始",
          message: "请耐心等待"
        });
      } catch (error) {
        this.$notify({
          title: "创建时失败",
          message: error.toString(),
          type: "error"
        });
      } finally {
        this.step = 3;
        await this.getProgress();
      }
    }
  },
  async mounted() {
    const result = await axios.get(API_SERVICE);
    const responseObjects = result.data.data;
    responseObjects.forEach((v) => {
      this.services.push(v);
    });
  }
};
</script>

<style scoped>
.select-box-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
