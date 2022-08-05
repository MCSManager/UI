<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel v-show="step == 1">
    <template #title>{{ $t("newImage.createImage") }}</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <ItemGroup>
            <el-button type="" size="small" @click="back">{{
              $t("newImage.toImageList")
            }}</el-button>
            <el-button type="" size="small" @click="toProgress">{{
              $t("newImage.buildProgress")
            }}</el-button>
          </ItemGroup>
        </div>
        <span class="color-gray">{{ $t("newImage.need10min") }}&nbsp;&nbsp;</span>
      </div>
      <LineOption class="row-mt" :custom="true">
        <template #default>
          <div class="sub-title">{{ $t("newImage.whatIsImage") }}</div>
          <div class="sub-title-info">
            {{ $t("newImage.whatIsImageInfo") }}
          </div>
          <div class="sub-title row-mt">{{ $t("newImage.whatIsDocker") }}</div>
          <div class="sub-title-info">
            {{ $t("newImage.whatIsDockerInfo") }}
          </div>
        </template>
      </LineOption>
      <div class="row-mt">
        <el-row :gutter="10">
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(1)">
              <template #title>{{ $t("newImage.images[0].title") }}</template>
              <template #info>
                {{ $t("newImage.images[0].info") }}
              </template>
            </SelectBlock>
          </el-col>
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(2)">
              <template #title>{{ $t("newImage.images[1].title") }}</template>
              <template #info>{{ $t("newImage.images[1].info") }}</template>
            </SelectBlock>
          </el-col>
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(5)">
              <template #title>{{ $t("newImage.images[2].title") }}</template>
              <template #info>{{ $t("newImage.images[2].info") }}</template>
            </SelectBlock>
          </el-col>
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(3)">
              <template #title>{{ $t("newImage.images[3].title") }}</template>
              <template #info>{{ $t("newImage.images[3].info") }}</template>
            </SelectBlock>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="row-mt">
          <el-col :md="6" :offset="0">
            <SelectBlock style="min-height: 120px" @click="selectType(4)">
              <template #title>{{ $t("newImage.images[4].title") }}</template>
              <template #info>{{ $t("newImage.images[4].info") }}</template>
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
          <p class="sub-title-title">{{ $t("newImage.aboutDockerFile") }}</p>
          <p class="sub-title-info">
            {{ $t("newImage.referenceDoc") }}
          </p>
        </div>
        <div class="sub-title">
          <p class="sub-title-title">{{ $t("settings.attention") }}</p>
          <p class="sub-title-info">{{ $t("newImage.attention") }}</p>
        </div>
        <div class="row-mt">
          <el-input
            type="textarea"
            :rows="14"
            :placeholder="$t('newImage.requireInput')"
            v-model="dockerFile"
            style="word-break: break-all"
          ></el-input>
        </div>
        <div class="sub-title row-mt">
          <p class="sub-title-title">{{ $t("newImage.afterCreate") }}</p>
        </div>
        <div class="flex row-mt">
          <el-input
            v-model="name"
            size="small"
            style="width: 240px"
            :placeholder="$t('newImage.imageName')"
          ></el-input>
          &nbsp;&nbsp;
          <el-input
            v-model="version"
            size="small"
            style="width: 240px"
            :placeholder="$t('newImage.imageVer')"
          ></el-input>
        </div>
      </div>
      <div class="row-mt">
        <el-button type="success" @click="createViaDockerFile" size="small">{{
          $t("general.confirm")
        }}</el-button>
        <el-button type="" size="small" @click="forward(1)">{{
          $t("newImage.toSelectImage")
        }}</el-button>
      </div>
    </template>
  </Panel>

  <Panel v-show="step == 3">
    <template #title>{{ $t("newImage.buildProgress") }}</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <ItemGroup>
            <el-button type="" size="small" @click="toProgress">{{
              $t("general.refresh")
            }}</el-button>
            <el-button type="" size="small" @click="forward(1)">{{
              $t("newImage.toSelectImage")
            }}</el-button>
          </ItemGroup>
        </div>
        <span class="color-gray">{{ $t("newImage.need10min") }}&nbsp;&nbsp;</span>
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
          <p>{{ $t("newImage.noData") }}</p>
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
        this.dockerFile = `FROM openjdk:8-jre
# RUN sed -i -E 's/http:\\/\\/(deb|security).debian.org/http:\\/\\/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
RUN apt update && apt install -y locales
RUN echo "zh_CN.UTF-8 UTF-8">/etc/locale.gen && locale-gen
ENV LANG=zh_CN.UTF-8
ENV LANGUAGE=zh_CN.UTF-8
ENV LC_ALL=zh_CN.UTF-8
ENV TZ=Asia/Shanghai
RUN mkdir -p /workspace
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
        this.dockerFile = `FROM ubuntu:18.04
ENV TZ=Asia/Shanghai
# 
# RUN sed -i -E 's/http:\\/\\/(archive|security).ubuntu.com/http:\\/\\/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
RUN apt update && apt -y install libcurl4 && DEBIAN_FRONTEND="noninteractive" apt -y install tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN mkdir -p /workspace
WORKDIR /workspace
`;
        this.name = "mcsm-ubuntu";
        this.version = "18.04";
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
      this.$message({ type: "info", message: this.$t("newImage.getProcess") });
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
        if (progress[k] == 1) progress[k] = this.$t("newImage.building");
        if (progress[k] == -1) progress[k] = this.$t("newImage.buildError");
        if (progress[k] == 2) progress[k] = this.$t("newImage.buildOk");
        list.push({
          name: k,
          status: progress[k]
        });
      }
      this.progress = list;
    },
    async createViaDockerFile() {
      if (!this.name || !this.version || !this.dockerFile) {
        return this.$message({ type: "error", message: this.$t("newImage.pleaseFinish") });
      }
      // eslint-disable-next-line no-unreachable
      await this.$confirm(this.$t("newImage.buildTip"), this.$t("imageManager.tip"), {
        confirmButtonText: this.$t("general.confirm"),
        cancelButtonText: this.$t("general.cancel"),
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
          title: this.$t("newImage.createTaskStart"),
          message: this.$t("newImage.pleaseWait")
        });
      } catch (error) {
        this.$notify({
          title: this.$t("newImage.createTaskError"),
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
