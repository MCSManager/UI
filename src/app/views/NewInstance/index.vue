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
  <div class="container">
    <Panel style="max-width: 1200px">
      <template #title>{{ title }}</template>
      <template #default>
        <div v-show="page == 0" class="panel-context row-mt">
          <div class="sub-title">
            <p class="sub-title-title">请选择您要创建的应用类型</p>
            <p class="sub-title-info"></p>
          </div>
          <el-row :gutter="10" justify="left" class="col-md-responsive row-mt">
            <el-col :md="6" :offset="0" v-show="!quickStartType || quickStartType == 1">
              <SelectBlock @click="selectTypeA(1)" style="min-height: 120px">
                <template #title>Java 版 Minecraft 游戏服务端</template>
                <template #info> 适用于类似于 Spigot，Bungeecord 等 Jar 格式文件的服务端 </template>
              </SelectBlock>
            </el-col>
            <el-col :md="6" :offset="0" v-show="!quickStartType || quickStartType == 1">
              <SelectBlock @click="selectTypeA(2)" style="min-height: 120px">
                <template #title>基岩版 Minecraft 游戏服务端</template>
                <template #info>
                  适用于 Bedrock Dedicated Server 等二进制执行文件或其他格式的服务端软件
                </template>
              </SelectBlock>
            </el-col>
            <el-col :md="6" :offset="0" v-show="!quickStartType || quickStartType == 2">
              <SelectBlock @click="selectTypeA(3)" style="min-height: 120px">
                <template #title>其他游戏服务端</template>
                <template #info> 适用于类似于大部分游戏私服程序运行，不保证能够完全兼容</template>
              </SelectBlock>
            </el-col>
            <el-col :md="6" :offset="0" v-show="!quickStartType || quickStartType == 3">
              <SelectBlock @click="selectTypeA(3)" style="min-height: 120px">
                <template #title>通用控制台应用程序</template>
                <template #info>
                  适用于类似于 bash，cmd.exe，app.exe，start.sh 和其他任何可用命令启动的程序
                </template>
              </SelectBlock>
            </el-col>
          </el-row>
        </div>

        <div v-show="page == 1" class="panel-context row-mt">
          <div class="sub-title">
            <p class="sub-title-title">选择创建方式</p>
            <p class="sub-title-info">
              如果您只想通过服务端软件开启服务器则选择第一项，其他选项均适用于不同的场景需求
            </p>
          </div>

          <el-row :gutter="10" justify="center" class="col-md-responsive">
            <el-col :md="8" :offset="0" v-if="form.type != TYPE_MINECRAFT_BEDROCK">
              <SelectBlock @click="selectTypeB(1)" style="min-height: 120px">
                <template #title>上传单个服务端软件（推荐）</template>
                <template #info>
                  适用于第一次创建服务器，只需上传一个程序文件即可直接创建服务器并生成地图存档等
                </template>
              </SelectBlock>
            </el-col>
            <el-col :md="8" :offset="0">
              <SelectBlock @click="selectTypeB(2)" style="min-height: 120px">
                <template #title>上传服务端压缩包</template>
                <template #info>
                  适用于服务端整合包，以及现有的服务器存档，打包上传后自动解压并运行，只支持 zip
                  格式
                </template>
              </SelectBlock>
            </el-col>
            <el-col :md="8" :offset="0">
              <SelectBlock @click="selectTypeB(3)" style="min-height: 120px">
                <template #title>无需文件或选择已存在文件</template>
                <template #info>
                  不需要任何文件或者服务端文件已存在远程主机上，只需要手动设置启动命令以及文件目录即可完成
                </template>
              </SelectBlock>
            </el-col>
          </el-row>
          <div class="row-mt" style="text-align: center">
            <el-button @click="up" size="small">回退</el-button>
          </div>
        </div>

        <!-- 上传单个服务端软件创建新实例 -->
        <div v-show="page == 2 && typeB == 1" class="panel-context row-mt">
          <div class="">
            <div class="sub-title">
              <p class="sub-title-title">实例名称</p>
              <p class="sub-title-info">支持中文，尽可能保证唯一性</p>
            </div>
            <el-input
              placeholder="实例名，尽可能确保唯一性"
              v-model="form.nickname"
              :disabled="assist.creating"
            >
            </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">启动命令模板</p>
              <p
                class="sub-title-info"
                v-text="'其中 {{ProgramName}} 代表您接下来上传的文件名，一般情况下无需进行修改'"
              ></p>
            </div>
            <div class="flex">
              <el-input
                v-model="assist.commandtemplate"
                placeholder="如 java -jar server.jar"
                :disabled="assist.creating"
              ></el-input>
              <el-button @click="openCommandAssistCall(1)">命令助手</el-button>
            </div>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">服务端文件目录</p>
              <p class="sub-title-info">
                选填，默认自动创建与管理，如需填写请写完整绝对路径，如: C:/Servers/MyServer
              </p>
            </div>
            <el-input
              placeholder="默认自动创建与管理"
              v-model="form.cwd"
              :disabled="assist.creating"
            >
            </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">上传服务端软件</p>
              <p class="sub-title-info">
                服务端软件指 JAR/EXE 格式或其他可执行程序（如 Spigot.jar，Paper.jar 等）
              </p>
            </div>
            <el-button @click="uploadFile(1)" :disabled="assist.creating">上传服务端软件</el-button>
            <div v-if="percentComplete > 0">
              <el-progress :percentage="percentComplete"></el-progress>
            </div>
            <p>上传文件后实例将自动创建</p>
          </div>
          <div class="row-mt" style="text-align: center">
            <el-button @click="up" size="small" :disabled="assist.creating">回退</el-button>
            <!-- <el-button @click="down" size="small">下一步</el-button> -->
          </div>
        </div>

        <!-- 上传服务端压缩包创建新实例 -->
        <div v-show="page == 2 && typeB == 2" class="panel-context row-mt">
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">实例名称</p>
              <p class="sub-title-info">支持中文，尽可能保证唯一性</p>
            </div>
            <el-input
              placeholder="实例名，尽可能确保唯一性"
              v-model="form.nickname"
              :disabled="assist.creating"
            >
            </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">启动命令</p>
              <p class="sub-title-info">因为无法识别压缩包中的服务端文件名，请您自行填写启动命令</p>
            </div>
            <div class="flex">
              <el-input
                v-model="form.startCommand"
                placeholder="如 java -jar server.jar"
                :disabled="assist.creating"
              ></el-input>
              <el-button @click="openCommandAssistCall(2)">命令助手</el-button>
            </div>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">服务端文件目录</p>
              <p class="sub-title-info">
                选填，默认自动创建与管理，如需填写请写完整绝对路径，如: C:/Servers/MyServer
              </p>
            </div>
            <el-input
              placeholder="选填，默认自动管理"
              v-model="form.cwd"
              :disabled="assist.creating"
            >
            </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">上传服务端压缩包</p>
              <p class="sub-title-info">仅支持 ZIP 格式，上传后压缩包会自动解压到 “文件目录”</p>
            </div>
            <el-button @click="uploadFile(2)" :disabled="assist.creating">上传压缩包</el-button>
            <div v-if="percentComplete > 0">
              <el-progress :percentage="percentComplete"></el-progress>
            </div>
            <p>上传文件后实例将自动创建并解压文件，可能需要一段时间才能完成解压任务</p>
          </div>
          <div class="row-mt" style="text-align: center">
            <el-button @click="up" size="small" :disabled="assist.creating">回退</el-button>
            <!-- <el-button @click="createInstance" size="small">创建实例</el-button> -->
          </div>
        </div>

        <!-- 从已存在的文件选择服务端 -->
        <div v-show="page == 2 && typeB == 3" class="panel-context row-mt">
          <div>
            <div class="sub-title">
              <p class="sub-title-title">从已存在的文件选择服务端</p>
              <p class="sub-title-info">文件必须已经存在远程主机（非面板机器）</p>
            </div>
            <el-input placeholder="实例名，尽可能确保唯一性" v-model="form.nickname"> </el-input>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">启动命令</p>
              <p class="sub-title-info">请您自行填写启动命令</p>
            </div>
            <div class="flex">
              <el-input
                v-model="form.startCommand"
                placeholder="如 java -jar server.jar，cmd.exe 等等"
              ></el-input>
              <el-button @click="openCommandAssistCall(2)">命令助手</el-button>
            </div>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">服务端文件目录</p>
              <p class="sub-title-info">
                选填，默认自动创建与管理，如需填写请写完整绝对路径，如: C:/Servers/MyServer
              </p>
            </div>
            <el-input
              placeholder="选填，默认自动创建与管理，如需填写请写完整绝对路径，如: C:/Servers/MyServer"
              v-model="form.cwd"
            >
            </el-input>
          </div>
          <p>填写好服务端软件文件名后，再前往文件管理上传服务端软件即可开启实例。</p>
          <div class="row-mt" style="text-align: center">
            <ItemGroup>
              <el-button @click="up" size="small">回退</el-button>
              <el-button @click="createInstance" size="small">创建实例</el-button></ItemGroup
            >
          </div>
        </div>

        <div v-show="page == 3" class="panel-context row-mt">
          <div class="sub-title">
            <p class="sub-title-title">创建完毕</p>
            <p class="sub-title-info">您现在可以对实例进行具体的设置和编辑</p>
          </div>
          <el-row :gutter="10" justify="center" class="col-md-responsive">
            <el-col :md="8" :offset="0">
              <SelectBlock @click="toEdit" style="min-height: 120px">
                <template #title>前往编辑实例具体参数</template>
                <template #info>
                  推荐立即前往编辑界面设置相关参数，比如 Docker 启动方式，编码设置，工作环境等
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
      title: "新建实例引导程序",
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
        return this.$message({ message: "请先完善基本参数再进行上传文件操作", type: "error" });
      }
      this.zipCode = await this.$refs.selecctUnzipCode.prompt();
      await this.$confirm("上传文件时将同时创建实例，此操作不可逆，是否继续？", "最终确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
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
        console.log("新建实例 - 文件上传:", fullAddress, "\n", file);
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
        this.$message({ message: `上传完毕`, type: "success" });
        this.down();
        this.title = "创建完毕";
      } catch (error) {
        this.$message({ message: `错误:${error.message}`, type: "error" });
      }
    },
    // 非上传文件式的创建实例
    async createInstance() {
      await this.$confirm("实例将创建，是否继续？", "最终确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      if (this.form.nickname === "" || this.form.startCommand === "") {
        return this.$message({ message: "参数不完整，请填写", type: "error" });
      }
      try {
        if (!this.form.cwd) this.form.cwd = ".";
        const data = await request({
          method: "POST",
          url: API_INSTANCE,
          params: { remote_uuid: this.serviceUuid },
          data: this.form
        });
        this.$message({ message: "创建成功", type: "success" });
        this.newInstanceUuid = data.instanceUuid;
        this.down();
      } catch (err) {
        this.$message({
          type: "error",
          message: `创建失败，原因: ${err.message}`
        });
        console.error("创建失败，原因:", err);
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
      this.title = "选择创建方式";
      this.typeA = v;
      this.down();
    },
    selectTypeB(v) {
      this.title = "上传文件/设置参数";
      this.typeB = v;
      this.down();
    },
    toEdit() {
      this.$router.push({ path: `/instance_detail/${this.serviceUuid}/${this.newInstanceUuid}/` });
    },
    up() {
      this.title = "新建实例引导程序";
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
