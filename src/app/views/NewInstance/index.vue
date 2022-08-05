<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="container">
    <Panel style="max-width: 1200px">
      <template #title>{{ title }}</template>
      <template #default>
        <div v-show="page == 0" class="panel-context row-mt">
          <div class="sub-title">
            <p class="sub-title-title">{{ $t("newInstances.selectType") }}</p>
            <p class="sub-title-info"></p>
          </div>
          <el-row :gutter="10" justify="left" class="col-md-responsive row-mt">
            <el-col :md="6" :offset="0" v-show="!quickStartType || quickStartType == 1">
              <SelectBlock @click="selectTypeA(1)" style="min-height: 120px">
                <template #title>{{ $t("newInstances.types[0].name") }}</template>
                <template #info>
                  {{ $t("newInstances.types[0].desc") }}
                </template>
              </SelectBlock>
            </el-col>
            <el-col :md="6" :offset="0" v-show="!quickStartType || quickStartType == 1">
              <SelectBlock @click="selectTypeA(2)" style="min-height: 120px">
                <template #title>{{ $t("newInstances.types[1].name") }}</template>
                <template #info>
                  {{ $t("newInstances.types[1].desc") }}
                </template>
              </SelectBlock>
            </el-col>
            <el-col :md="6" :offset="0" v-show="!quickStartType || quickStartType == 2">
              <SelectBlock @click="selectTypeA(3)" style="min-height: 120px">
                <template #title>{{ $t("newInstances.types[2].name") }}</template>
                <template #info>
                  {{ $t("newInstances.types[2].desc") }}
                </template>
              </SelectBlock>
            </el-col>
            <el-col :md="6" :offset="0" v-show="!quickStartType || quickStartType == 3">
              <SelectBlock @click="selectTypeA(3)" style="min-height: 120px">
                <template #title>{{ $t("newInstances.types[3].name") }}</template>
                <template #info>
                  {{ $t("newInstances.types[3].desc") }}
                </template>
              </SelectBlock>
            </el-col>
          </el-row>
        </div>

        <div v-show="page == 1" class="panel-context row-mt">
          <div class="sub-title">
            <p class="sub-title-title">{{ $t("newInstances.selectCreateType") }}</p>
            <p class="sub-title-info">
              {{ $t("newInstances.selectCreateTypeInfo") }}
            </p>
          </div>

          <el-row :gutter="10" justify="center" class="col-md-responsive">
            <el-col :md="8" :offset="0" v-if="form.type != TYPE_MINECRAFT_BEDROCK">
              <SelectBlock @click="selectTypeB(1)" style="min-height: 120px">
                <template #title>{{ $t("newInstances.createTypes[0].name") }}</template>
                <template #info>
                  {{ $t("newInstances.createTypes[0].desc") }}
                </template>
              </SelectBlock>
            </el-col>
            <el-col :md="8" :offset="0">
              <SelectBlock @click="selectTypeB(2)" style="min-height: 120px">
                <template #title>{{ $t("newInstances.createTypes[1].name") }}</template>
                <template #info>
                  {{ $t("newInstances.createTypes[1].desc") }}
                </template>
              </SelectBlock>
            </el-col>
            <el-col :md="8" :offset="0">
              <SelectBlock @click="selectTypeB(3)" style="min-height: 120px">
                <template #title>{{ $t("newInstances.createTypes[2].name") }}</template>
                <template #info>
                  {{ $t("newInstances.createTypes[2].desc") }}
                </template>
              </SelectBlock>
            </el-col>
          </el-row>
          <div class="row-mt" style="text-align: center">
            <el-button @click="up" size="small">{{ $t("newInstances.back") }}</el-button>
          </div>
        </div>

        <!-- 上传单个服务端软件创建新实例 -->
        <div v-show="page == 2 && typeB == 1" class="panel-context row-mt">
          <div class="">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("instances.instanceName") }}</p>
              <p class="sub-title-info">{{ $t("newInstances.instanceNameInfo") }}</p>
            </div>
            <el-input
              :placeholder="$t('newInstances.instanceNameInfo2')"
              v-model="form.nickname"
              :disabled="assist.creating"
            >
            </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("newInstances.commandTemplate") }}</p>
              <p class="sub-title-info">{{ $t("newInstances.commandTemplateText") }}</p>
            </div>
            <div class="flex">
              <el-input
                v-model="assist.commandtemplate"
                :placeholder="$t('newInstances.cmdInfo')"
                :disabled="assist.creating"
              ></el-input>
              <el-button @click="openCommandAssistCall(1)">{{
                $t("newInstances.cmdAssist")
              }}</el-button>
            </div>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("newInstances.fileDir") }}</p>
              <p class="sub-title-info">
                {{ $t("newInstances.fileDirInfo") }}
              </p>
            </div>
            <el-input
              :placeholder="$t('newInstances.autoCreate')"
              v-model="form.cwd"
              :disabled="assist.creating"
            >
            </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("newInstances.uploadFile") }}</p>
              <p class="sub-title-info">
                {{ $t("newInstances.uploadFileInfo") }}
              </p>
            </div>
            <el-button @click="uploadFile(1)" :disabled="assist.creating">{{
              $t("newInstances.uploadFile")
            }}</el-button>
            <div v-if="percentComplete > 0">
              <el-progress :percentage="percentComplete"></el-progress>
            </div>
            <p>{{ $t("newInstances.afterUpload") }}</p>
          </div>
          <div class="row-mt" style="text-align: center">
            <el-button @click="up" size="small" :disabled="assist.creating">{{
              $t("newInstances.back")
            }}</el-button>
            <!-- <el-button @click="down" size="small">下一步</el-button> -->
          </div>
        </div>

        <!-- 上传服务端压缩包创建新实例 -->
        <div v-show="page == 2 && typeB == 2" class="panel-context row-mt">
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("instances.instanceName") }}</p>
              <p class="sub-title-info">{{ $t("newInstances.instanceNameInfo") }}</p>
            </div>
            <el-input
              :placeholder="$t('newInstances.instanceNameInfo2')"
              v-model="form.nickname"
              :disabled="assist.creating"
            >
            </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("newInstances.launchCmd") }}</p>
              <p class="sub-title-info">{{ $t("newInstances.launchCmdInfo") }}</p>
            </div>
            <div class="flex">
              <el-input
                v-model="form.startCommand"
                :placeholder="$t('newInstances.cmdInfo')"
                :disabled="assist.creating"
              ></el-input>
              <el-button @click="openCommandAssistCall(2)">{{
                $t("newInstances.cmdAssist")
              }}</el-button>
            </div>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("newInstances.fileDir") }}</p>
              <p class="sub-title-info">
                {{ $t("newInstances.fileDirInfo") }}
              </p>
            </div>
            <el-input
              :placeholder="$t('newInstances.autoCreate2')"
              v-model="form.cwd"
              :disabled="assist.creating"
            >
            </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("newInstances.uploadZip") }}</p>
              <p class="sub-title-info">{{ $t("newInstances.uploadZipInfo") }}</p>
            </div>
            <el-button @click="uploadFile(2)" :disabled="assist.creating">{{
              $t("newInstances.uploadZipButton")
            }}</el-button>
            <div v-if="percentComplete > 0">
              <el-progress :percentage="percentComplete"></el-progress>
            </div>
            <p>{{ $t("newInstances.upFileInfo") }}</p>
          </div>
          <div class="row-mt" style="text-align: center">
            <el-button @click="up" size="small" :disabled="assist.creating">{{
              $t("newInstances.back")
            }}</el-button>
            <!-- <el-button @click="createInstance" size="small">创建实例</el-button> -->
          </div>
        </div>

        <!-- 从已存在的文件选择服务端 -->
        <div v-show="page == 2 && typeB == 3" class="panel-context row-mt">
          <div>
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("newInstances.selectFromExist") }}</p>
              <p class="sub-title-info">{{ $t("newInstances.selectFromExistInfo") }}</p>
            </div>
            <el-input :placeholder="$t('newInstances.instanceNameInfo2')" v-model="form.nickname">
            </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("newInstances.launchCmd") }}</p>
              <p class="sub-title-info">{{ $t("newInstances.launchCmdInfo2") }}</p>
            </div>
            <div class="flex">
              <el-input
                v-model="form.startCommand"
                :placeholder="$t('newInstances.cmd2')"
              ></el-input>
              <el-button @click="openCommandAssistCall(2)">{{
                $t("newInstances.cmdAssist")
              }}</el-button>
            </div>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("newInstances.fileDir") }}</p>
              <p class="sub-title-info">
                {{ $t("newInstances.fileDirInfo") }}
              </p>
            </div>
            <el-input :placeholder="$t('newInstances.fileDirInfo')" v-model="form.cwd"> </el-input>
          </div>
          <p>{{ $t("newInstances.afterFlieName") }}</p>
          <div class="row-mt" style="text-align: center">
            <ItemGroup>
              <el-button @click="up" size="small">{{ $t("newInstances.back") }}</el-button>
              <el-button @click="createInstance" size="small">{{
                $t("newInstances.createInstant")
              }}</el-button></ItemGroup
            >
          </div>
        </div>

        <div v-show="page == 3" class="panel-context row-mt">
          <div class="sub-title">
            <p class="sub-title-title">{{ $t("newInstances.createFinish") }}</p>
            <p class="sub-title-info">{{ $t("newInstances.nowYouCan") }}</p>
          </div>
          <el-row :gutter="10" justify="center" class="col-md-responsive">
            <el-col :md="8" :offset="0">
              <SelectBlock @click="toEdit" style="min-height: 120px">
                <template #title>{{ $t("newInstances.toEdit") }}</template>
                <template #info>
                  {{ $t("newInstances.toEditInfo") }}
                </template>
              </SelectBlock>
            </el-col>
          </el-row>
        </div>
      </template>
    </Panel>

    <!-- 命令助手 -->
    <CommandAssist
      v-model="commandAssistPanel"
      :result="commandAssistCallback"
      :default-program-name="assist.defaultProgramName"
    >
    </CommandAssist>

    <!-- 隐藏的文件上传按钮 -->
    <input type="file" ref="fileButtonHidden" @change="selectedFile" hidden="hidden" />

    <selecct-unzip-code ref="selecctUnzipCode"></selecct-unzip-code>
  </div>
</template>

<script>
import path from "path";
import axios from "axios";
import SelecctUnzipCode from "@/app/views/FileManager/selecctUnzipCode";
import Panel from "@/components/Panel";
import CommandAssist from "@/components/CommandAssist";
import SelectBlock from "@/components/SelectBlock";
import { API_INSTANCE, API_INSTANCE_UPLOAD } from "@/app/service/common";
import {
  TYPE_MINECRAFT_JAVA,
  TYPE_MINECRAFT_BEDROCK,
  TYPE_UNIVERSAL
} from "@/app/service/instance_type";
import { parseforwardAddress, request } from "@/app/service/protocol";

export default {
  components: { Panel, SelectBlock, CommandAssist, SelecctUnzipCode },
  data: function () {
    return {
      title: this.$t("newInstances.newInstanceGuide"),
      page: 0,
      quickStartType: 0,
      typeA: -1,
      typeB: -1,
      commandAssistPanel: false,
      serviceUuid: this.$route.params.serviceUuid,
      TYPE_MINECRAFT_BEDROCK,
      form: {
        nickname: "",
        startCommand: "",
        stopCommand: "^c",
        cwd: "",
        ie: "GBK",
        oe: "GBK",
        createDatetime: new Date().toDateString(),
        lastDatetime: "",
        type: TYPE_UNIVERSAL,
        tag: [],
        maxSpace: null,
        endTime: ""
      },
      assist: {
        defaultProgramName: "",
        commandtemplate: "",
        uploadFileType: 0,
        creating: false
      },
      newInstanceUuid: "",
      uploadConfig: {
        addr: "",
        password: ""
      },
      percentComplete: 0,
      zipCode: "gbk"
    };
  },
  methods: {
    // 创建实例并上传文件
    async uploadFile(type) {
      if (!this.form.nickname || (!this.assist.commandtemplate && !this.form.startCommand)) {
        return this.$message({ message: this.$t("newInstances.pleaseFinish"), type: "error" });
      }
      this.zipCode = await this.$refs.selecctUnzipCode.prompt();
      await this.$confirm(
        this.$t("newInstances.uploadAndCreate"),
        this.$t("notify.confirmDelTitle"),
        {
          confirmButtonText: this.$t("general.confirm"),
          cancelButtonText: this.$t("general.cancel"),
          type: "warning"
        }
      );
      this.assist.uploadFileType = type;
      this.$refs.fileButtonHidden.click();
    },
    // 文件已选择，开始上传
    async selectedFile() {
      try {
        this.assist.creating = true;
        const file = this.$refs.fileButtonHidden.files[0];
        // 命令模板替换
        if (this.assist.uploadFileType === 1) {
          this.form.startCommand = this.assist.commandtemplate.replace(
            "{{ProgramName}}",
            file.name
          );
        }
        if (!this.form.cwd) this.form.cwd = ".";
        // 上传文件式创建实例 & 请求守护进程直连上传
        const cfg = await request({
          method: "POST",
          url: API_INSTANCE_UPLOAD,
          params: {
            upload_dir: ".",
            remote_uuid: this.serviceUuid
          },
          data: this.form
        });
        this.uploadConfig.addr = parseforwardAddress(cfg.addr, "http");
        this.uploadConfig.password = cfg.password;
        this.newInstanceUuid = cfg.instanceUuid;
        // 上传文件参数准备
        const formData = new FormData();
        formData.append("file", file);
        const fullAddress = `${this.uploadConfig.addr}/upload/${this.uploadConfig.password}`;
        console.log("NewInstance - FileUpload:", fullAddress, "\n", file);
        // 上传文件
        const fileName = file.name;
        const extName = path.extname(fileName);
        await axios.post(fullAddress, formData, {
          params: {
            // 根据后缀自动解压文件
            unzip: extName === ".zip" ? 1 : null,
            code: this.zipCode
          },
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            this.percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        });
        this.$message({ message: this.$t("newInstances.uploadFinish"), type: "success" });
        this.down();
        this.title = this.$t("newInstances.createFinish");
      } catch (error) {
        this.$message({ message: `Error: ${error.message}`, type: "error" });
      }
    },
    // 非上传文件式的创建实例
    async createInstance() {
      await this.$confirm(
        this.$t("newInstances.instantWillBeCreate"),
        this.$t("notify.confirmDelTitle"),
        {
          confirmButtonText: this.$t("general.confirm"),
          cancelButtonText: this.$t("general.cancel"),
          type: "warning"
        }
      );
      if (this.form.nickname === "" || this.form.startCommand === "") {
        return this.$message({
          message: this.$t("newInstances.parameterNotFinish"),
          type: "error"
        });
      }
      try {
        if (!this.form.cwd) this.form.cwd = ".";
        const data = await request({
          method: "POST",
          url: API_INSTANCE,
          params: { remote_uuid: this.serviceUuid },
          data: this.form
        });
        this.$message({ message: this.$t("newInstances.createSuccess"), type: "success" });
        this.newInstanceUuid = data.instanceUuid;
        this.down();
      } catch (err) {
        this.$message({
          type: "error",
          message: this.$t("newInstances.createFailed") + `${err.message}`
        });
        console.error(this.$t("newInstances.createFailed"), err);
      }
    },
    selectTypeA(v) {
      if (v === 1) {
        this.form.type = TYPE_MINECRAFT_JAVA;
        this.assist.commandtemplate = "java -jar {{ProgramName}}";
        this.form.stopCommand = "stop";
      }
      if (v === 2) {
        this.form.type = TYPE_MINECRAFT_BEDROCK;
        this.assist.commandtemplate = "{{ProgramName}}";
        this.form.stopCommand = "stop";
      }
      if (v === 3) {
        this.form.type = TYPE_UNIVERSAL;
        this.assist.commandtemplate = "{{ProgramName}}";
        this.form.stopCommand = "^c";
      }
      this.title = this.$t("newInstances.selectCreateType");
      this.typeA = v;
      this.down();
    },
    selectTypeB(v) {
      this.title = this.$t("newInstances.uploadAndSet");
      this.typeB = v;
      this.down();
    },
    toEdit() {
      this.$router.push({ path: `/instance_detail/${this.serviceUuid}/${this.newInstanceUuid}/` });
    },
    up() {
      this.title = this.$t("newInstances.newInstanceGuide");
      if (this.page > 0) this.page -= 1;
    },
    down() {
      this.page += 1;
    },
    openCommandAssistCall(type) {
      if (type === 1) {
        this.assist.defaultProgramName = "{{ProgramName}}";
      } else {
        this.assist.defaultProgramName = "";
      }
      this.commandAssistPanel = true;
    },
    commandAssistCallback(cmd) {
      this.assist.commandtemplate = cmd;
      this.form.startCommand = cmd;
    }
  },
  async mounted() {
    this.quickStartType = this.$route.query.type;
    console.log(this.$route);
  }
};
</script>

<style scoped>
.container {
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  height: calc(100% - 80px) !important; */
}
</style>
