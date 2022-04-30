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
  <Panel>
    <template #title>实例详细信息设置</template>
    <template #default>
      <div v-loading="loading" element-loading-text="获取中">
        <el-row :gutter="20">
          <el-col :lg="6">
            <div class="only-pc-display" style="margin: 0 0 10px 0">
              <div class="sub-title">
                <div class="sub-title-title">使用须知</div>
                <div class="sub-title-info">
                  实例功能将涉及到远程命令执行，MCSManager
                  会尽可能的保护您的宿主机安全，但是如果需要出售给陌生用户，则必须使用 Linux Docker
                  的虚拟化隔离功能才可以完成安全风险控制。
                </div>
              </div>
            </div>
            <div class="sub-title">远程/本地实例标识符</div>
            <p v-text="instanceInfo.instanceUuid"></p>
            <div class="sub-title">守护进程标识符</div>
            <p v-text="serviceUuid"></p>
            <div class="sub-title">当前状态</div>
            <p v-text="codeToText(instanceInfo.status)"></p>
            <div class="sub-title">已启动次数</div>
            <p v-text="instanceInfo.started"></p>
            <div class="sub-title">创建日期</div>
            <p v-text="instanceInfo.config.createDatetime"></p>
            <div class="sub-title">最后启动日期</div>
            <p v-text="instanceInfo.config.lastDatetime"></p>
            <div class="sub-title">到期时间</div>
            <p v-text="instanceInfo.config.endTime ? instanceInfo.config.endTime : '无限制'"></p>
            <div class="sub-title">进程类型</div>
            <p v-text="instanceInfo.config.processType"></p>
          </el-col>
          <el-col :lg="18">
            <el-row :gutter="20">
              <el-col :md="24">
                <div class="sub-title">
                  <div class="sub-title-title require-field">实例名称</div>
                  <div class="sub-title-info">支持中文，尽可能保证唯一性</div>
                </div>
                <el-input v-model="instanceInfo.config.nickname" type="text"></el-input>
              </el-col>
              <el-col :md="24" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title require-field">实例类型</div>
                  <div class="sub-title-info">
                    不同类型会导致功能不同，若无需求类型，可以选择较为抽象的通用类型，列如 Java
                    通用版服务端
                  </div>
                </div>
                <el-select
                  @change="instanceTypeChange(instanceInfo.config.type)"
                  v-model="instanceInfo.config.type"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="(item, index) in typeList"
                    :key="index"
                    :label="item"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :md="24" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title require-field">启动命令</div>
                  <div class="sub-title-info">
                    <span>
                      适用于任何程序命令，若程序路径或附加参数中含有空格可使用双引号作为边界，包含的文本将视作一段整体
                    </span>
                    <br />
                    <span>
                      通常情况下，建议使用命令助手生成启动命令，如果有额外需求可以自定义启动命令
                    </span>
                    <br />
                    <span>
                      列如 "C:\Program Files\Java\bin\java.exe" -Dfile.encoding=utf-8 -jar "my
                      server.jar" -nogui
                    </span>
                  </div>
                </div>
                <div class="flex">
                  <el-input v-model="instanceInfo.config.startCommand" type="text"></el-input>
                  <el-button type="primary" plain @click="openCommandAssistCall(1)">
                    命令生成
                  </el-button>
                </div>
              </el-col>
              <el-col :md="24" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title require-field">工作目录</div>
                  <div class="sub-title-info">实例运行的工作目录，可填绝对路径与相对路径</div>
                </div>
                <el-input
                  v-model="instanceInfo.config.cwd"
                  type="text"
                  placeholder="列如: D:/MyServers/0001"
                ></el-input>
              </el-col>
              <el-col :md="24" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">更新/安装程序文件命令</div>
                  <div class="sub-title-info">
                    当用户执行更新/安装操作时，将会执行此命令，${mcsm_workspace}
                    代表工作目录，为空则不提供此功能
                  </div>
                </div>
                <el-input
                  v-model="instanceInfo.config.updateCommand"
                  type="text"
                  placeholder='列如: "D:/SteamCMD/steamcmd.exe" +login anonymous +force_install_dir "${mcsm_workspace}" "+app_update 380870 validate" +quit'
                ></el-input>
              </el-col>
              <el-col :lg="8" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title require-field">终端输入编码</div>
                  <div class="sub-title-info">命令发送编码，重启实例生效</div>
                </div>
                <el-select
                  v-model="instanceInfo.config.ie"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择终端输入编码"
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
                  <div class="sub-title-title require-field">终端输出编码</div>
                  <div class="sub-title-info">终端输出编码，重启实例生效</div>
                </div>
                <el-select
                  v-model="instanceInfo.config.oe"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择终端输出编码"
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
                  <div class="sub-title-title require-field">关闭实例命令</div>
                  <div class="sub-title-info">^C 代表发送 Ctrl+C 组合键</div>
                </div>
                <el-input v-model="instanceInfo.config.stopCommand" type="text"></el-input>
              </el-col>
              <el-col :lg="8" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title require-field">文件管理编码</div>
                  <div class="sub-title-info">文件管理功能的解压缩，编辑等编码</div>
                </div>
                <el-select
                  v-model="instanceInfo.config.fileCode"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择文件管理编码"
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
                  <div class="sub-title-title">到期时间</div>
                  <div class="sub-title-info">到期后无法启动</div>
                </div>
                <el-date-picker
                  v-model="instanceInfo.config.endTime"
                  type="date"
                  placeholder="无限制"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-col>
              <el-col :lg="8" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title require-field">进程启动方式</div>
                  <div class="sub-title-info">可选择 Docker，默认等</div>
                </div>
                <el-select v-model="instanceInfo.config.processType" style="width: 100%">
                  <el-option label="默认类型" value="general"></el-option>
                  <el-option label="虚拟化容器（Linux Docker）" value="docker"></el-option>
                </el-select>
              </el-col>
            </el-row>

            <div
              class="dokcer-config-view row-mt"
              v-if="instanceInfo.config.processType === 'docker'"
            >
              <br />
              <div class="sub-title">
                <div class="sub-title-title"><b>虚拟化容器配置</b></div>
                <div class="sub-title-info">
                  一种基于 Docker
                  的虚拟化方案，可以给每个实例装入一个一次性的盒子中运行，使用后销毁，确保主机安全。
                </div>
              </div>
              <el-row :gutter="20">
                <el-col :md="8" class="row-mt" :offset="0">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">环境镜像</div>
                    <div class="sub-title-info">指定实例镜像</div>
                  </div>
                  <el-select
                    filterable
                    v-model="instanceInfo.config.docker.image"
                    placeholder="请选择"
                    @focus="loadImages"
                    style="width: 100%"
                    v-loading="imageListLoading"
                  >
                    <el-option v-for="item in dockerImages" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :md="16" class="row-mt" :offset="0">
                  <div class="sub-title">
                    <div class="sub-title-title">开放端口</div>
                    <div class="sub-title-info">
                      多个以空格分割，冒号左边为宿主机暴露端口，右边为容器暴露端口，通常保持一致即可
                    </div>
                  </div>
                  <el-input
                    v-model="instanceInfo.config.docker.ports"
                    type="text"
                    placeholder="选填，示例 25565:25565/tcp 3380:3380/udp"
                  >
                  </el-input>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col class="row-mt" :offset="0">
                  <div class="sub-title">
                    <div class="sub-title-title">额外挂载路径</div>
                    <div class="sub-title-info">
                      向容器内挂载除工作目录外的其他目录，多个以空格分割，冒号左边为宿主机路径，右边为容器路径
                    </div>
                  </div>
                  <el-input
                    v-model="instanceInfo.config.docker.extraVolumes"
                    type="text"
                    placeholder="示例 /backups/test1:/workspace/backups /var/logs/test1:/workspace/logs"
                  >
                  </el-input>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :md="8" class="row-mt" :offset="0">
                  <div class="sub-title">
                    <div class="sub-title-title">容器名</div>
                    <div class="sub-title-info">容器创建使用的名字，为空随机生成</div>
                  </div>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="选填，无特殊需求不建议填写此项"
                    placement="bottom"
                  >
                    <el-input
                      v-model="instanceInfo.config.docker.containerName"
                      type="text"
                      placeholder="选填，示例 lobby-1"
                    >
                    </el-input>
                  </el-tooltip>
                </el-col>
                <el-col :md="8" class="row-mt" :offset="0">
                  <div class="sub-title">
                    <div class="sub-title-title require-field">网络模式</div>
                    <div class="sub-title-info">选择容器接入的网络模式 如 bridge 网桥</div>
                  </div>
                  <el-select
                    filterable
                    v-model="instanceInfo.config.docker.networkMode"
                    placeholder="请选择"
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
                    <div class="sub-title-title">网络别名</div>
                    <div class="sub-title-info">用于在自定义网络中容器互相访问，空格分隔</div>
                  </div>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="选填，无特殊需求不建议填写此项"
                    placement="bottom"
                  >
                    <el-input
                      v-model="instanceInfo.config.docker.networkAliases"
                      type="text"
                      placeholder="选填，示例 login-server-1"
                    >
                    </el-input>
                  </el-tooltip>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :md="8" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title">最大内存（单位 MB）</div>
                    <div class="sub-title-info">列如 1024，2048 等，请勿加单位</div>
                  </div>

                  <el-input
                    v-model="instanceInfo.config.docker.memory"
                    type="text"
                    placeholder="选填，列如 1024"
                  >
                  </el-input>
                </el-col>
                <el-col :md="8" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title">限制 CPU 使用率（百分比）</div>
                    <div class="sub-title-info">限制所有 CPU 总和使用率，会有少许偏差</div>
                  </div>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="填写 50 代表所有核心使用率和限制在 50%，若填写 200 则代表准许使用所有核心使用率总和为 200%"
                    placement="bottom"
                  >
                    <el-input
                      v-model="instanceInfo.config.docker.cpuUsage"
                      type="text"
                      placeholder="选填，0 到 无限大"
                    >
                    </el-input>
                  </el-tooltip>
                </el-col>
                <el-col :md="8" class="row-mt">
                  <div class="sub-title">
                    <div class="sub-title-title">指定 CPU 计算核心</div>
                    <div class="sub-title-info">限制容器在指定的 CPU 核心上运行</div>
                  </div>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="指定进程在某些核心上运行，合理分配可以更好的利用您的系统硬件资源，列如 0,1 代表在第1，2核心上运作，逗号隔开"
                    placement="bottom"
                  >
                    <el-input
                      v-model="instanceInfo.config.docker.cpusetCpus"
                      type="text"
                      placeholder="选填，列如 0,1,2,3"
                    >
                    </el-input>
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="row-mt">
          <el-col :md="24" style="text-align: right">
            <ItemGroup>
              <el-button size="small" @click="toConsole">控制台</el-button>
              <el-button size="small" @click="toFileManager">文件管理</el-button>
              <el-button size="small" @click="back">返回</el-button>
              <el-button type="success" size="small" @click="saveConfig">保存配置</el-button>
            </ItemGroup>
          </el-col>
        </el-row>
      </div>
    </template>
  </Panel>

  <!-- 命令助手 -->
  <CommandAssist v-model="commandAssistPanel" :result="commandAssistCallback"></CommandAssist>
</template>

<script>
import { API_IMAGES, API_INSTANCE, API_NETWORK_MODES } from "../service/common";
import { processTypeList, statusCodeToText } from "../service/instance_tools";
import Panel from "../../components/Panel";
import router from "../router";
import { request } from "../service/protocol";
import CommandAssist from "../../components/CommandAssist";
import { INSTANCE_TYPE_DEF_CONFIG } from "../service/instance_type";
// import qs from "qs";

export default {
  components: { Panel, CommandAssist },
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

      networkModes: [],
      imageListLoading: false,
      networkModeListLoading: false,
      commandAssistPanel: false,

      dockerImages: [],
      characters: [
        { label: "UTF-8（通用）", value: "UTF-8" },
        { label: "GBK（中文）", value: "GBK" },
        { label: "BIG5（繁中）", value: "BIG5" },
        { label: "Shift_JIS（日文）", value: "Shift_JIS" },
        { label: "KS_C_5601（韩文）", value: "KS_C_5601" },
        { label: "GB2312（中文）", value: "GB2312" },
        { label: "GB18030（中文）", value: "GB18030" },
        { label: "Big5-HKSCS（繁中）", value: "Big5-HKSCS" },
        { label: "UTF-16", value: "UTF-16" }
      ]
    };
  },
  methods: {
    back() {
      router.go(-1);
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
      // 保存实例配置文件
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
        console.log(this.instanceInfo.config);
        if (!this.instanceInfo.config.endTime) postData.endTime = "";
        else if (typeof this.instanceInfo.config.endTime === "object")
          postData.endTime = this.instanceInfo.config.endTime.toLocaleDateString();

        console.log(postData);
        await request({
          method: "PUT",
          url: API_INSTANCE,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid },
          data: postData
        });
        this.$message({ message: "保存成功", type: "success" });
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
        const images = await request({
          method: "GET",
          url: API_IMAGES,
          params: {
            remote_uuid: this.serviceUuid
          }
        });
        this.dockerImages = [];
        if (images) {
          for (const iterator of images) {
            const repoTags = (iterator?.RepoTags ?? [])[0];
            if (repoTags) this.dockerImages.push(repoTags);
          }
        }
      } catch (error) {
        this.$message({
          message: "无法获得远程主机镜像列表，建议前往“服务环境”界面创建镜像",
          type: "error"
        });
      } finally {
        this.imageListLoading = false;
      }
      return this.images;
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
          message: "无法获得远程主机网络列表，建议检查docker配置",
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
    }
  },
  async mounted() {
    const result = await request({
      method: "GET",
      url: API_INSTANCE,
      params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
    });
    this.instanceInfo = result;
    // 特殊处理字段
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
    this.instanceInfo.config = {
      ...this.instanceInfo.config,
      ie: this.instanceInfo.config.ie ? this.instanceInfo.config.ie.toUpperCase() : "GBK",
      oe: this.instanceInfo.config.oe ? this.instanceInfo.config.oe.toUpperCase() : "GBK",
      fileCode: this.instanceInfo.config.fileCode
        ? this.instanceInfo.config.fileCode.toUpperCase()
        : "GBK"
    };
    this.loading = false;
  }
};
</script>
