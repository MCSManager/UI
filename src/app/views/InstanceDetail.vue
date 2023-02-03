<!--
Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->
<template>
  <div>
    <Panel>
      <template #title>{{ $t("instancesDetail.title") }}</template>
      <template #default>
        <div v-loading="loading">
          <el-row :gutter="20">
            <el-col :lg="6">
              <div class="only-pc-display" style="margin: 0 0 10px 0">
                <div class="sub-title">
                  {{ $t("instancesDetail.titleInfo") }}
                </div>
              </div>
              <div class="sub-title bt">{{ $t("instancesDetail.uid") }}</div>
              <p v-text="instanceInfo.instanceUuid"></p>
              <div class="sub-title bt">{{ $t("instancesDetail.gid") }}</div>
              <p v-text="serviceUuid"></p>
              <div class="sub-title bt">{{ $t("instancesDetail.status") }}</div>
              <p v-text="codeToText(instanceInfo.status)"></p>
              <div class="sub-title bt">{{ $t("instancesDetail.started") }}</div>
              <p v-text="instanceInfo.started"></p>
              <div class="sub-title bt">{{ $t("instancesDetail.createDateTime") }}</div>
              <p v-text="instanceInfo.config.createDatetime"></p>
              <div class="sub-title bt">{{ $t("instancesDetail.lastDateTime") }}</div>
              <p v-text="instanceInfo.config.lastDatetime"></p>
              <div class="sub-title bt">{{ $t("instancesDetail.endTime") }}</div>
              <p
                v-text="
                  instanceInfo.config.endTime
                    ? instanceInfo.config.endTime
                    : $t('instancesDetail.unlimited')
                "
              ></p>
              <div class="sub-title bt">{{ $t("instancesDetail.processType.title") }}</div>
              <p v-if="instanceInfo.config.processType === 'general'">
                {{ $t("instancesDetail.processType.general") }}
              </p>
              <p v-if="instanceInfo.config.processType === 'docker'">
                {{ $t("instancesDetail.processType.docker") }}
              </p>
              <div v-if="instanceInfo.config.docker">
                <div class="sub-title bt">{{ $t("instancesDetail.distribute.title") }}</div>
                <p class="color-green" v-if="instanceInfo.config.processType === 'docker'">
                  {{ $t("instancesDetail.distribute.ok") }}
                </p>
                <p class="color-red" v-else>{{ $t("instancesDetail.distribute.no") }}</p>
              </div>
            </el-col>
            <el-col :lg="18">
              <el-row :gutter="20">
                <el-col :md="24">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">
                      {{ $t("instances.instanceName") }}
                    </div>
                    <div class="sub-title-info">{{ $t("newInstances.instanceNameInfo") }}</div>
                  </div>
                  <el-input
                    v-model="instanceInfo.config.nickname"
                    type="text"
                    :disabled="isGlobalInstance"
                  ></el-input>
                </el-col>
                <el-col :md="24" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">
                      {{ $t("instancesDetail.instanceType") }}
                    </div>
                    <div class="sub-title-info">
                      {{ $t("instancesDetail.instanceTypeInfo") }}
                    </div>
                  </div>
                  <el-select
                    :disabled="isGlobalInstance"
                    @change="instanceTypeChange(instanceInfo.config.type)"
                    v-model="instanceInfo.config.type"
                    :placeholder="$t('general.pleaseSelect')"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(item, index) in typeList"
                      :key="index"
                      :label="$t('instanceTypeList.' + item)"
                      :value="index"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :md="24" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">
                      {{ $t("newInstances.launchCmd") }}
                    </div>
                    <div class="sub-title-info">
                      <span v-html="$t('instancesDetail.launchCmdText')"> </span>
                      <br />
                    </div>
                  </div>
                  <div class="flex">
                    <el-input
                      v-model="instanceInfo.config.startCommand"
                      :rows="3"
                      type="textarea"
                      resize="none"
                    >
                    </el-input>
                    <el-button type="primary" plain @click="openCommandAssistCall(1)">
                      {{ $t("newInstances.cmdAssist") }}
                    </el-button>
                  </div>
                </el-col>
                <el-col :md="24" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">{{ $t("instancesDetail.cwd") }}</div>
                    <div class="sub-title-info">{{ $t("instancesDetail.cwdInfo") }}</div>
                  </div>
                  <el-input
                    v-model="instanceInfo.config.cwd"
                    type="text"
                    :placeholder="$t('instancesDetail.cwdExample')"
                  >
                  </el-input>
                </el-col>
                <el-col :md="24" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title">{{ $t("instancesDetail.updateCmd") }}</div>
                    <div class="sub-title-info">
                      {{ $t("instancesDetail.updateCmdInfo", { t: "${mcsm_workspace}" }) }}
                    </div>
                  </div>
                  <el-input
                    v-model="instanceInfo.config.updateCommand"
                    type="text"
                    :placeholder="defaultInstallCommand"
                    :disabled="isGlobalInstance"
                  >
                  </el-input>
                </el-col>
                <el-col :lg="8" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">
                      {{ $t("instancesDetail.ie") }}
                    </div>
                    <div class="sub-title-info">
                      {{ $t("instancesDetail.ieInfo") }}
                    </div>
                  </div>
                  <el-select
                    v-model="instanceInfo.config.ie"
                    filterable
                    allow-create
                    default-first-option
                    :placeholder="$t('general.pleaseSelect')"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in characters"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :lg="8" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">
                      {{ $t("instancesDetail.oe") }}
                    </div>
                    <div class="sub-title-info">
                      {{ $t("instancesDetail.oeInfo") }}
                    </div>
                  </div>
                  <el-select
                    v-model="instanceInfo.config.oe"
                    filterable
                    allow-create
                    default-first-option
                    :placeholder="$t('general.pleaseSelect')"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in characters"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :lg="8" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">
                      {{ $t("instancesDetail.stopCmd") }}
                    </div>
                    <div class="sub-title-info">
                      {{ $t("instancesDetail.stopCmdInfo") }}
                    </div>
                  </div>
                  <el-input v-model="instanceInfo.config.stopCommand" type="text"></el-input>
                </el-col>
                <el-col :lg="8" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">
                      {{ $t("instancesDetail.fileCode") }}
                    </div>
                    <div class="sub-title-info">
                      {{ $t("instancesDetail.fileCodeInfo") }}
                    </div>
                  </div>
                  <el-select
                    v-model="instanceInfo.config.fileCode"
                    filterable
                    allow-create
                    default-first-option
                    :placeholder="$t('general.pleaseSelect')"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in characters"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :lg="8" class="row-mt" :offset="0">
                  <div class="sub-title">
                    <div class="sub-title-title">{{ $t("instancesDetail.endTime") }}</div>
                    <div class="sub-title-info">{{ $t("instancesDetail.endTimeInfo") }}</div>
                  </div>
                  <el-date-picker
                    :disabled="isGlobalInstance"
                    v-model="instanceInfo.config.endTime"
                    type="date"
                    :placeholder="$t('instancesDetail.unlimited')"
                    style="width: 100%"
                  >
                  </el-date-picker>
                </el-col>

                <el-col :lg="8" class="row-mt" :offset="0" v-iszh>
                  <div class="sub-title">
                    <div class="sub-title-title">{{ $t("CommonText.012") }}</div>
                    <div class="sub-title-info">{{ $t("components.NetworkTip.018") }}</div>
                  </div>
                  <el-button plain size="big" @click="openNetwork">{{
                    $t("general.read")
                  }}</el-button>
                </el-col>

                <el-col :lg="24" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">
                      {{ $t("instancesDetail.launchType") }}
                    </div>
                    <div class="sub-title-info">
                      {{ $t("instancesDetail.launchTypeInfo") }}
                    </div>
                  </div>
                  <el-select
                    v-model="instanceInfo.config.processType"
                    style="width: 100%"
                    :disabled="isGlobalInstance"
                  >
                    <el-option
                      :label="$t('instancesDetail.defaultType')"
                      value="general"
                    ></el-option>
                    <el-option :label="$t('instancesDetail.docker')" value="docker"></el-option>
                  </el-select>
                </el-col>
              </el-row>

              <div
                class="dokcer-config-view row-mt"
                v-if="instanceInfo.config.processType === 'docker'"
              >
                <br />
                <div class="sub-title">
                  <div class="sub-title-title">
                    <b>
                      {{ $t("instancesDetail.dockerConfig") }}
                    </b>
                  </div>
                  <div class="sub-title-info">
                    {{ $t("instancesDetail.dockerConfigInfo") }}
                  </div>
                </div>
                <el-row :gutter="20">
                  <el-col :md="8" class="row-mt" :offset="0">
                    <div class="sub-title">
                      <div class="sub-title-title require-field">
                        {{ $t("instancesDetail.dockerImage") }}
                      </div>
                      <div class="sub-title-info">
                        {{ $t("instancesDetail.dockerImageInfo") }}
                      </div>
                    </div>
                    <el-select
                      filterable
                      v-model="instanceInfo.config.docker.image"
                      :placeholder="$t('general.pleaseSelect')"
                      @focus="loadImages"
                      style="width: 100%"
                      v-loading="imageListLoading"
                      @change="selectImage"
                    >
                      <el-option
                        v-for="item in dockerImages"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :md="16" class="row-mt" :offset="0">
                    <div class="sub-title">
                      <div class="sub-title-title">
                        {{ $t("instancesDetail.openPort") }}
                      </div>
                      <div class="sub-title-info">
                        {{ $t("instancesDetail.openPortInfo") }}
                      </div>
                    </div>
                    <div class="flex">
                      <el-input
                        v-model="instanceInfo.config.docker.ports"
                        type="text"
                        :placeholder="$t('instancesDetail.portExample')"
                      >
                      </el-input>
                      <el-button type="primary" plain @click="toEditDockerPort">{{
                        $t("instancesDetail.quickEdit")
                      }}</el-button>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col class="row-mt" :offset="0">
                    <div class="sub-title">
                      <div class="sub-title-title">
                        {{ $t("instancesDetail.extraVolumes") }}
                      </div>
                      <div class="sub-title-info">
                        {{ $t("instancesDetail.extraVolumesInfo") }}
                      </div>
                    </div>
                    <div class="flex">
                      <el-input
                        v-model="instanceInfo.config.docker.extraVolumes"
                        type="text"
                        :placeholder="$t('instancesDetail.extraVolumesExample')"
                      >
                      </el-input>
                      <el-button type="primary" plain @click="toEditDockerVolumes">{{
                        $t("instancesDetail.quickEdit")
                      }}</el-button>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :md="8" class="row-mt" :offset="0">
                    <div class="sub-title">
                      <div class="sub-title-title">
                        {{ $t("instancesDetail.containerName") }}
                      </div>
                      <div class="sub-title-info">
                        {{ $t("instancesDetail.containerNameInfo") }}
                      </div>
                    </div>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="$t('instancesDetail.containerNameTooltip')"
                      placement="bottom"
                    >
                      <el-input
                        v-model="instanceInfo.config.docker.containerName"
                        type="text"
                        :placeholder="$t('instancesDetail.containerNameExample')"
                      >
                      </el-input>
                    </el-tooltip>
                  </el-col>
                  <el-col :md="8" class="row-mt" :offset="0">
                    <div class="sub-title">
                      <div class="sub-title-title require-field">
                        {{ $t("instancesDetail.netMode") }}
                      </div>
                      <div class="sub-title-info">
                        {{ $t("instancesDetail.netModeInfo") }}
                      </div>
                    </div>
                    <el-select
                      filterable
                      v-model="instanceInfo.config.docker.networkMode"
                      :placeholder="$t('general.pleaseSelect')"
                      @focus="loadNetworkModes"
                      style="width: 100%"
                      v-loading="networkModeListLoading"
                    >
                      <el-option
                        v-for="item in networkModes"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :md="8" class="row-mt" :offset="0">
                    <div class="sub-title">
                      <div class="sub-title-title">{{ $t("instancesDetail.netAliases") }}</div>
                      <div class="sub-title-info">{{ $t("instancesDetail.netAliasesInfo") }}</div>
                    </div>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="$t('instancesDetail.netAliasesTooltip')"
                      placement="bottom"
                    >
                      <el-input
                        v-model="instanceInfo.config.docker.networkAliases"
                        type="text"
                        :placeholder="$t('instancesDetail.netAliasesTooltip')"
                      >
                      </el-input>
                    </el-tooltip>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :md="8" class="row-mt">
                    <div class="sub-title">
                      <div class="sub-title-title">{{ $t("instancesDetail.limitCpu") }}</div>
                      <div class="sub-title-info">{{ $t("instancesDetail.limitCpuInfo") }}</div>
                    </div>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="$t('instancesDetail.limitCpuTooltip')"
                      placement="bottom"
                    >
                      <el-input
                        v-model="instanceInfo.config.docker.cpuUsage"
                        type="text"
                        :placeholder="$t('instancesDetail.limitCpuExample')"
                      >
                      </el-input>
                    </el-tooltip>
                  </el-col>
                  <el-col :md="8" class="row-mt">
                    <div class="sub-title">
                      <div class="sub-title-title">{{ $t("instancesDetail.cpuSetCpus") }}</div>
                      <div class="sub-title-info">{{ $t("instancesDetail.cpuSetCpusInfo") }}</div>
                    </div>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="$t('instancesDetail.cpuSetCpusTooltip')"
                      placement="bottom"
                    >
                      <el-input
                        v-model="instanceInfo.config.docker.cpusetCpus"
                        type="text"
                        :placeholder="$t('instancesDetail.cpuSetCpusExample')"
                      >
                      </el-input>
                    </el-tooltip>
                  </el-col>
                  <el-col :md="8" class="row-mt">
                    <div class="sub-title">
                      <div class="sub-title-title">{{ $t("instancesDetail.maxMem") }}</div>
                      <div class="sub-title-info">{{ $t("instancesDetail.maxMemInfo") }}</div>
                    </div>

                    <el-input
                      v-model="instanceInfo.config.docker.memory"
                      type="text"
                      :placeholder="$t('instancesDetail.maxMemExample')"
                    >
                    </el-input>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="row-mt">
            <el-col :md="24" style="text-align: right">
              <ItemGroup>
                <el-button @click="toConsole">{{ $t("instancesDetail.console") }}</el-button>
                <el-button @click="toFileManager">{{
                  $t("instancesDetail.fileManager")
                }}</el-button>
                <el-button @click="back">{{ $t("instancesDetail.back") }}</el-button>
                <el-button type="success" @click="saveConfig">{{
                  $t("instancesDetail.saveSet")
                }}</el-button>
              </ItemGroup>
            </el-col>
          </el-row>
        </div>
      </template>
    </Panel>

    <NetworkTip
      ref="networkTip"
      :extraServiceConfig="instanceInfo.config.extraServiceConfig"
      :instanceUuid="instanceUuid"
      :serviceUuid="serviceUuid"
    ></NetworkTip>

    <!-- 命令助手 -->
    <CommandAssist v-model="commandAssistPanel" :result="commandAssistCallback"></CommandAssist>

    <DockerVariableSetup
      ref="dockerVariableSetup"
      @submit="handleSubmitDockerPort"
      :loadData="handleDockerPortLoadData"
      :columns="tableDict1"
    ></DockerVariableSetup>

    <DockerVariableSetup
      ref="dockerVariableSetup2"
      @submit="handleSubmitDockerVolumes"
      :loadData="handleDockerVolumesLoadData"
      :columns="tableDict2"
    ></DockerVariableSetup>
  </div>
</template>

<script>
import NetworkTip from "../../components/NetworkTip";
import {
  API_IMAGES,
  API_INSTANCE,
  API_NETWORK_MODES,
  GLOBAL_INSTANCE_UUID,
  TERMINAL_CODE
} from "../service/common";
import { processTypeList, statusCodeToText } from "../service/instance_tools";
import Panel from "../../components/Panel";
import router from "../router";
import { request } from "../service/protocol";
import CommandAssist from "../../components/CommandAssist";
import DockerVariableSetup from "../../components/DockerVariableSetup";
import { INSTANCE_TYPE_DEF_CONFIG } from "../service/instance_type";
// import qs from "qs";

export default {
  components: { Panel, CommandAssist, DockerVariableSetup, NetworkTip },
  data() {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      instanceInfo: {
        config: {}
      },
      typeList: processTypeList(),
      display: false,
      loading: true,
      networkTip: false,
      networkModes: [],
      imageListLoading: false,
      networkModeListLoading: false,
      commandAssistPanel: false,
      defaultInstallCommand:
        'D:/SteamCMD/steamcmd.exe +login anonymous +force_install_dir "${mcsm_workspace}" "+app_update 380870 validate" +quit',
      dockerImages: [],

      // Docker port configuration table fields
      tableDict1: [
        {
          prop: "protocol",
          label: this.$t("instancesDetail.dockerTableDict[0].label"),
          width: "140px"
        },
        {
          prop: "port1",
          label: this.$t("instancesDetail.dockerTableDict[1].label"),
          width: "120px"
        },
        {
          prop: "port2",
          label: this.$t("instancesDetail.dockerTableDict[2].label"),
          width: "120px"
        }
      ],
      // Docker path mapping
      tableDict2: [
        {
          prop: "path1",
          label: this.$t("instancesDetail.dockerTableDict[3].label"),
          width: "200px"
        },
        {
          prop: "path2",
          label: this.$t("instancesDetail.dockerTableDict[4].label"),
          width: "200px"
        }
      ],
      // optional character encoding
      characters: TERMINAL_CODE
    };
  },
  computed: {
    isGlobalInstance() {
      return this.instanceInfo?.instanceUuid === GLOBAL_INSTANCE_UUID;
    }
  },
  methods: {
    back() {
      router.go(-1);
    },
    openNetwork() {
      this.$refs.networkTip.open();
    },
    instanceTypeChange(type) {
      const config = INSTANCE_TYPE_DEF_CONFIG[type];
      if (config?.stopCommand) {
        this.instanceInfo.config.stopCommand = config?.stopCommand;
      }
    },
    toFileManager() {
      router.push({ path: `/file/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    toConsole() {
      router.push({ path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    async saveConfig() {
      if (this.instanceInfo?.config?.startCommand.includes("\n")) {
        return this.$message({
          message: this.$t("instancesDetail.startError"),
          type: "error"
        });
      }

      try {
        const postData = JSON.parse(JSON.stringify(this.instanceInfo.config));
        if (this.instanceInfo.config.docker.ports)
          postData.docker.ports = this.instanceInfo.config.docker.ports.split(" ");
        else postData.docker.ports = [];
        if (this.instanceInfo.config.docker.networkAliases) {
          postData.docker.networkAliases =
            this.instanceInfo.config.docker.networkAliases.split(" ");
        } else {
          postData.docker.networkAliases = [];
        }
        if (this.instanceInfo.config.docker.extraVolumes) {
          postData.docker.extraVolumes = this.instanceInfo.config.docker.extraVolumes.split(" ");
        } else {
          postData.docker.extraVolumes = [];
        }
        if (!this.instanceInfo.config.endTime) postData.endTime = "";
        else if (typeof this.instanceInfo.config.endTime === "object")
          postData.endTime = this.instanceInfo.config.endTime.toLocaleDateString();
        await request({
          method: "PUT",
          url: API_INSTANCE,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid },
          data: postData
        });
        this.$message({ message: this.$t("notify.saveSuccess"), type: "success" });
      } catch (err) {
        this.$message({ message: err.message, type: "error" });
      }
    },
    codeToText(p) {
      return statusCodeToText(p);
    },
    async loadImages() {
      this.imageListLoading = true;
      try {
        this.dockerImages = [this.$t("instancesDetail.newImage")];
        const images = await request({
          method: "GET",
          url: API_IMAGES,
          params: {
            remote_uuid: this.serviceUuid
          }
        });
        if (images) {
          for (const iterator of images) {
            const repoTags = (iterator?.RepoTags ?? [])[0];
            if (repoTags) this.dockerImages.push(repoTags);
          }
        }
      } catch (error) {
        this.$message({
          message: this.$t("instancesDetail.cantGetImageList"),
          type: "error"
        });
      } finally {
        this.imageListLoading = false;
      }
      return this.images;
    },

    selectImage(item = "") {
      if (typeof item === "string" && item.startsWith("---", 0)) {
        this.$router.push({
          path: `/image/${this.serviceUuid}`
        });
      }
    },

    async loadNetworkModes() {
      this.networkModeListLoading = true;
      try {
        this.networkModes = await request({
          method: "GET",
          url: API_NETWORK_MODES,
          params: {
            remote_uuid: this.serviceUuid
          }
        });
      } catch (error) {
        this.$message({
          message: this.$t("instancesDetail.cantGetNetModeList"),
          type: "error"
        });
      } finally {
        this.networkModeListLoading = false;
      }
      return this.networkModes;
    },

    openCommandAssistCall() {
      this.commandAssistPanel = true;
    },
    commandAssistCallback(cmd) {
      this.instanceInfo.config.startCommand = cmd;
    },
    toEditDockerPort() {
      this.$refs.dockerVariableSetup.show();
    },
    handleDockerPortLoadData() {
      const result = [];
      const lines = this.instanceInfo.config?.docker?.ports?.split(" ");
      for (const iterator of lines) {
        const pad = iterator.split("/");
        const ports = pad[0];
        const protocol = pad[1];
        const port1 = ports.split(":")[0];
        const port2 = ports.split(":")[1];
        result.push({
          port1,
          port2,
          protocol
        });
      }
      return result;
    },
    handleSubmitDockerPort(items) {
      let v = [];
      for (const iterator of items) {
        v.push(`${iterator.port1}:${iterator.port2}/${iterator.protocol}`);
      }
      this.instanceInfo.config.docker.ports = v.join(" ");
    },

    toEditDockerVolumes() {
      this.$refs.dockerVariableSetup2.show();
    },
    handleDockerVolumesLoadData() {
      const result = [];
      const lines = this.instanceInfo.config?.docker?.extraVolumes?.split(" ");
      for (const iterator of lines) {
        const path1 = iterator.split(":")[0];
        const path2 = iterator.split(":")[1];
        result.push({
          path1,
          path2
        });
      }
      return result;
    },
    handleSubmitDockerVolumes(items) {
      let v = [];
      for (const iterator of items) {
        v.push(`${iterator.path1}:${iterator.path2}`);
      }
      this.instanceInfo.config.docker.extraVolumes = v.join(" ");
    }
  },
  async mounted() {
    const result = await request({
      method: "GET",
      url: API_INSTANCE,
      params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
    });
    this.instanceInfo = result;
    if (this.instanceInfo.config.docker && this.instanceInfo.config.docker.ports) {
      this.instanceInfo.config.docker.ports = this.instanceInfo.config.docker.ports.join(" ");
    }
    if (this.instanceInfo.config.docker && this.instanceInfo.config.docker.networkAliases) {
      this.instanceInfo.config.docker.networkAliases =
        this.instanceInfo.config.docker.networkAliases.join(" ");
    }
    if (this.instanceInfo.config.docker && this.instanceInfo.config.docker.extraVolumes) {
      this.instanceInfo.config.docker.extraVolumes =
        this.instanceInfo.config.docker.extraVolumes.join(" ");
    }
    let DEF_CODE = "UTF-8";
    if (this.$i18n.locale == "zh_cn") DEF_CODE = "GBK";
    this.instanceInfo.config = {
      ...this.instanceInfo.config,
      ie: this.instanceInfo.config.ie ? this.instanceInfo.config.ie.toUpperCase() : DEF_CODE,
      oe: this.instanceInfo.config.oe ? this.instanceInfo.config.oe.toUpperCase() : DEF_CODE,
      fileCode: this.instanceInfo.config.fileCode
        ? this.instanceInfo.config.fileCode.toUpperCase()
        : DEF_CODE
    };
    this.loading = false;
  }
};
</script>

<style scoped>
.bt {
  font-weight: 600;
}
</style>
