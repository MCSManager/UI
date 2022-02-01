<!--
  Copyright (C) 2022 Suwings(https://github.com/Suwings)

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  
  According to the GPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。

  根据协议，您必须保留所有版权声明，如果修改源码则必须开源修改后的源码。
  前往 https://mcsmanager.com/ 申请闭源开发授权或了解更多。
-->

<template>
  <el-row :gutter="20">
    <el-col :md="6">
      <Panel>
        <template #title>基本信息</template>
        <template #default>
          <div v-if="!available">
            <el-skeleton :rows="3" animated />
          </div>
          <div v-else>
            <LineInfo>
              <i class="el-icon-edit"></i> 昵称: {{ instanceInfo.config.nickname }}
            </LineInfo>
            <LineInfo>
              <i class="el-icon-tickets"></i> 类型: {{ typeToText(instanceInfo.config.type) }}
            </LineInfo>
            <LineInfo
              ><i class="el-icon-finished"></i> 状态:
              {{ codeToText(instanceInfo.status) }}</LineInfo
            >
            <LineInfo v-if="instanceInfo.info && instanceInfo.info.currentPlayers != -1">
              <i class="el-icon-user"></i> 玩家数: {{ instanceInfo.info.currentPlayers }} /
              {{ instanceInfo.info.maxPlayers }}
            </LineInfo>
            <LineInfo v-if="instanceInfo.info && instanceInfo.info.version">
              <i class="el-icon-user"></i> 版本: {{ instanceInfo.info.version }}
            </LineInfo>
          </div>
        </template>
      </Panel>
      <Panel>
        <template #title>实例控制组</template>
        <template #default>
          <div v-loading="busy">
            <el-row type="flex" justify="space-between" :gutter="10">
              <el-col :lg="24">
                <el-popconfirm title="确定执行此操作？" @confirm="openInstance">
                  <template #reference>
                    <el-button
                      icon="el-icon-video-play"
                      style="width: 100%"
                      size="small"
                      :disabled="instanceInfo.status != 0"
                    >
                      开启实例
                    </el-button>
                  </template>
                </el-popconfirm>
              </el-col>
              <el-col :lg="24">
                <el-popconfirm title="确定执行此操作？" @confirm="stopInstance">
                  <template #reference>
                    <el-button
                      icon="el-icon-video-pause"
                      style="width: 100%"
                      size="small"
                      class="row-mt"
                      :disabled="instanceInfo.status == 0"
                      >关闭实例</el-button
                    >
                  </template>
                </el-popconfirm>
              </el-col>
              <el-col :lg="24">
                <el-popconfirm title="确定执行此操作？" @confirm="restartInstance">
                  <template #reference>
                    <el-button
                      icon="el-icon-refresh-right"
                      style="width: 100%"
                      size="small"
                      class="row-mt"
                      :disabled="instanceInfo.status == 0"
                    >
                      重启实例
                    </el-button>
                  </template>
                </el-popconfirm>
              </el-col>
              <el-col :lg="24">
                <el-popconfirm title="确定执行此操作？" @confirm="killInstance">
                  <template #reference>
                    <el-button
                      icon="el-icon-switch-button"
                      type="danger"
                      plain
                      style="width: 100%"
                      size="small"
                      class="row-mt"
                      :disabled="instanceInfo.status == 0"
                      >强制终止实例</el-button
                    >
                  </template>
                </el-popconfirm>
              </el-col>
            </el-row>
          </div>
        </template>
      </Panel>
      <Panel>
        <template #title>实例功能组</template>
        <template #default>
          <el-row :gutter="10">
            <!-- <el-col :span="12" :offset="0">
              <el-button style="width: 100%" size="small">自动重启 <span class="color-green">开启</span>
              </el-button>
            </el-col> -->
            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!instanceInfo.config.type"
                icon="el-icon-s-operation"
                style="width: 100%"
                size="small"
                @click="toProcessConfig"
                >特定配置</el-button
              >
            </el-col>
            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-monitor"
                style="width: 100%"
                size="small"
                @click="toTerminalSettingPanel"
                >终端设置</el-button
              >
            </el-col>

            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-mobile"
                style="width: 100%"
                size="small"
                @click="toSchedule"
                >计划任务</el-button
              >
            </el-col>
            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-data-line"
                style="width: 100%"
                size="small"
                @click="toPingPanel"
                >状态查询</el-button
              >
            </el-col>
            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-notebook-2"
                style="width: 100%"
                size="small"
                @click="toEventPanel"
                >事件任务</el-button
              >
            </el-col>
            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-reading"
                style="width: 100%"
                size="small"
                @click="toLogPanel"
                >终端日志</el-button
              >
            </el-col>
            <el-col :sm="24" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-folder-opened"
                style="width: 100%"
                size="small"
                @click="toFileManager"
                >文件管理</el-button
              >
            </el-col>
            <el-col :sm="24" :offset="0" v-if="isTopPermission">
              <el-button
                :disabled="!available"
                icon="el-icon-setting"
                style="width: 100%"
                size="small"
                @click="toInstanceDetail"
                >实例设置</el-button
              >
            </el-col>
          </el-row>
        </template>
      </Panel>
      <Panel>
        <template #title>详细信息</template>
        <template #default>
          <div v-if="!available">
            <el-skeleton :rows="5" animated />
          </div>
          <div v-else>
            <LineInfo>
              <div class="text-overflow-ellipsis">
                <i class="el-icon-document"></i>
                <span style="font-size: 12px"> GID {{ serviceUuid }}</span>
              </div>
            </LineInfo>
            <LineInfo>
              <div class="text-overflow-ellipsis">
                <i class="el-icon-document"></i>
                <span class="text-overflow-ellipsis" style="font-size: 12px">
                  UID {{ instanceInfo.instanceUuid }}</span
                >
              </div>
            </LineInfo>
            <LineInfo>
              <i class="el-icon-date"></i> 到期时间:
              {{
                instanceInfo.config.endTime
                  ? new Date(instanceInfo.config.endTime).toLocaleDateString()
                  : "无限制"
              }}
            </LineInfo>
            <LineInfo>
              <i class="el-icon-date"></i> 创建日期:
              {{ instanceInfo.config.createDatetime }}
            </LineInfo>
            <LineInfo>
              <i class="el-icon-date"></i> 最后启动:
              {{ instanceInfo.config.lastDatetime }}
            </LineInfo>
            <!-- <LineInfo><i class="el-icon-document"></i> 标签: {{ instanceInfo.tag }}</LineInfo> -->
            <LineInfo
              ><i class="el-icon-document"></i> 输入编码: {{ instanceInfo.config.ie }} 输出编码:
              {{ instanceInfo.config.oe }}</LineInfo
            >
          </div>
        </template>
      </Panel>
    </el-col>
    <el-col :md="18">
      <Panel v-loading="!available" element-loading-text="连接中">
        <template #title>实例操作终端</template>
        <template #default>
          <div class="terminal-wrapper">
            <div id="terminal-container" style="height: 560px; width: 100%"></div>
            <div id="terminal-input-wrapper">
              <el-input
                placeholder="此处可输入命令，按回车键执行"
                prefix-icon="el-icon-arrow-right"
                size="mini"
                v-model="command"
                ref="terminalCommandInput"
                @keyup.enter="sendCommand(command)"
              >
              </el-input>
            </div>
          </div>
        </template>
      </Panel>
      <Panel>
        <template #title>命令历史</template>
        <template #default>
          <div v-if="commandhistory.length > 0">
            <ItemGroup>
              <el-tag
                v-for="(item, index) in commandhistory"
                :key="index"
                @click="selectHistoryCommand(item)"
                size="small"
                type="info"
                class="text-overflow-ellipsis"
                style="max-width: 23%; cursor: pointer; font-size: 13px"
              >
                {{ item }}
              </el-tag>
            </ItemGroup>
          </div>
          <div v-else>
            <p class="color-gray">暂无任何命令历史</p>
          </div>
        </template>
      </Panel>
    </el-col>
  </el-row>

  <Dialog v-model="pingConfigForm.is">
    <template #title>实例状态查询协议配置</template>
    <template #default>
      <div class="sub-title">
        <p class="sub-title-title">更好的监控服务端状态</p>
        <p class="sub-title-info">
          此功能将根据管理员设置的实例类型自动选择相应协议，获取服务端进程的具体信息和参数（如：游戏人数，版本等）
        </p>
      </div>
      <div class="sub-title">
        <p class="sub-title-title">服务端访问地址</p>
        <p class="sub-title-info">必填，支持域名与IP地址，不填写则自动为 localhost 地址</p>
      </div>
      <el-input v-model="pingConfigForm.ip" placeholder="如 mcsmanager.com" size="small"></el-input>
      <div class="sub-title row-mt">
        <p class="sub-title-title">服务端访问端口</p>
        <p class="sub-title-info">必填，仅可输入数字端口号</p>
      </div>
      <el-input v-model="pingConfigForm.port" placeholder="如 25565" size="small"></el-input>
      <div class="row-mt">
        <ItemGroup>
          <el-button type="success" size="small" @click="instanceConfigUpdate">更新数据</el-button>
          <el-button @click="pingConfigForm.is = !pingConfigForm.is" size="small">取消</el-button>
        </ItemGroup>
      </div>
    </template>
  </Dialog>

  <Dialog v-model="eventConfigPanel.visible">
    <template #title>事件触发型任务</template>
    <template #default>
      <div class="sub-title">
        <p class="sub-title-title">自动重启</p>
        <p class="sub-title-info">
          若实例状态在未经面板操作的情况下变为非运行状态将立刻发起启动实例操作。<br />可用于崩溃后自动重启功能。
        </p>
        <div class="row-mt">
          <el-switch v-model="eventConfigPanel.autoRestart"> </el-switch>
        </div>
      </div>

      <div class="sub-title">
        <p class="sub-title-title">自动启动</p>
        <p class="sub-title-info">
          只要守护进程（远程节点）运行，就自动发起一次启动实例操作。<br />如果将守护进程开机自启则可用于开机自启实例。
        </p>
        <div class="row-mt">
          <el-switch v-model="eventConfigPanel.autoStart"> </el-switch>
        </div>
      </div>

      <div class="row-mt">
        <ItemGroup>
          <el-button type="success" size="small" @click="instanceConfigUpdate">保存</el-button>
          <el-button size="small" @click="eventConfigPanel.visible = false">取消</el-button>
        </ItemGroup>
      </div>
    </template>
  </Dialog>

  <Dialog v-model="terminalSettingPanel.visible">
    <template #title>网页终端设置</template>
    <template #default>
      <div class="sub-title">
        <p class="sub-title-title">颜色渲染</p>
        <p class="sub-title-info">
          网页自动给输出内容增加颜色渲染，渲染的颜色不一定完全正确。<br />如果颜色渲染功能与软件自带的颜色功能冲突，可以关闭此功能。
        </p>
        <div class="row-mt">
          <el-switch v-model="terminalSettingPanel.haveColor"> </el-switch>
        </div>
      </div>
      <div class="row-mt">
        <ItemGroup>
          <el-button type="success" size="small" @click="instanceConfigUpdate">保存</el-button>
          <el-button size="small" @click="terminalSettingPanel.visible = false">取消</el-button>
        </ItemGroup>
      </div>
    </template>
  </Dialog>

  <Dialog v-model="logPanel.visible">
    <template #title>终端日志</template>
    <template #default>
      <div class="sub-title">
        <div class="sub-title-info">
          终端日志仅会记录 1MB 的日常日志，超过 1MB
          后会删除重新记录，若需要更多日志可前往文件管理下载日志文件。
        </div>
      </div>

      <div style="width: 80vw">
        <el-input
          ref="logPanelTextArea"
          v-loading="!logPanel.data"
          element-loading-text="获取中"
          v-model="logPanel.data"
          :rows="30"
          style="width: 100%; font-size: 12px"
          type="textarea"
          placeholder="暂无内容，请先启动实例稍等一段时间"
        />
      </div>

      <div class="row-mt">
        <ItemGroup>
          <el-button
            type="success"
            size="small"
            @click="
              () => {
                logPanel.visible = false;
                this.logPanel.data = '';
              }
            "
            >关闭</el-button
          >
        </ItemGroup>
      </div>
    </template>
  </Dialog>

  <Dialog v-model="unavailableTerminal" style="z-index: 9999">
    <template #title>无法与守护进程建立连接</template>
    <template #default>
      <div class="sub-title">
        <p class="sub-title-title">
          {{ unavailableIp ? `浏览器无法连接到 ${unavailableIp}` : "浏览器无法与守护进程建立连接" }}
        </p>
        <p class="sub-title-info">
          <span>可能是您未开放守护进程的端口导致，或是使用了内网地址的缘故</span>
        </p>
        <div>
          <img
            :src="require('../../assets/daemon_connection_error.png')"
            alt=""
            srcset=""
            style="width: 460px"
          />
        </div>
        <div class="sub-title">可能的解决方案</div>
        <ol style="padding-left: 20px">
          <li>确保守护进程的地址是公网地址，且守护进程端口已经开放。</li>
          <li>
            若有反向代理，FRP，HTTPS 等，请采用 wss:// 协议连接，
            <br />
            并且守护进程端地址也需要 HTTPS，WSS 支持。
          </li>
          <li>
            前往
            <a href="https://docs.mcsmanager.com" target="_blank" rel="noopener noreferrer"
              >https://docs.mcsmanager.com</a
            >
            了解更多
          </li>
        </ol>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "../../components/Dialog";
import Panel from "../../components/Panel";
import "../../assets/xterm/xterm.css";
import LineInfo from "../../components/LineInfo";
import LineButton from "../../components/LineButton";
import { connectRemoteService } from "../service/socket";
import {
  API_INSTANCE,
  API_INSTANCE_KILL,
  API_INSTANCE_OPEN,
  API_INSTANCE_REMOTE_SERVICE_STREAM,
  API_INSTANCE_RESTART,
  API_INSTANCE_UPDATE,
  API_INSTANCE_STOP,
  API_INSTANCE_OUTPUT
} from "../service/common";
import router from "../router";
import { parseforwardAddress, request } from "../service/protocol";
import { encodeConsoleColor } from "../service/terminal_color";
import { ElNotification } from "element-plus";
import { statusCodeToText, typeTextToReadableText } from "../service/instance_tools";
import { initTerminalWindow, textToTermText } from "../service/term";

export default {
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      term: null,
      command: "",
      available: false,
      socket: null,
      instanceInfo: {
        config: {}
      },
      renderTask: null,
      commandhistory: [],
      busy: false,

      bool: false,

      pingConfigForm: {
        is: false,
        ip: "",
        port: "",
        type: 1
      },

      eventConfigPanel: {
        visible: false,
        autoRestart: false,
        autoStart: false
      },

      logPanel: {
        visible: false,
        data: ""
      },

      terminalSettingPanel: {
        visible: false,
        haveColor: true
      },

      unavailableTerminal: false,
      unavailableIp: null
    };
  },
  computed: {
    isStarted() {
      return this.instanceInfo.status !== 0;
    },
    isTopPermission() {
      return this.$store.state.userInfo.permission >= 10;
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { Panel, LineInfo, LineButton, Dialog },
  methods: {
    // 请求数据源(Ajax)
    async renderFromAjax() {
      try {
        const result = await request({
          method: "GET",
          url: API_INSTANCE,
          params: { uuid: this.instanceUuid, remote_uuid: this.serviceUuid }
        });
        this.instanceInfo = result;
        // console.log("实例信息:", this.instanceInfo);
      } catch (err) {
        console.log("错误", err);
      }
    },
    // 请求数据源（Websocket）
    async renderFromSocket() {
      this.socket.emit("stream/detail", {});
    },
    // 与守护进程建立连接
    async setUpWebsocket() {
      // 向面板端请求任务护照来获取直连守护进程的准许
      let res = null;
      try {
        res = await request({
          method: "POST",
          url: API_INSTANCE_REMOTE_SERVICE_STREAM,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
      } catch (error) {
        ElNotification({
          title: "无法与终端建立连接",
          message: error,
          dangerouslyUseHTMLString: true,
          type: "error",
          duration: 0
        });
        this.unavailableTerminal = true;
        return;
      }

      // 直接与守护进程建立频道
      const password = res.password;
      const addr = parseforwardAddress(res.addr, "ws");
      this.socket = connectRemoteService(
        addr,
        password,
        () => {
          this.unavailableIp = null;
          this.unavailableTerminal = false;
        },
        () => {
          this.unavailableIp = addr;
          this.unavailableTerminal = true;
        }
      );

      // 监听输出流
      this.socket.on("instance/stdout", (packet) => {
        if (this.instanceInfo?.config?.terminalOption?.haveColor) {
          this.term.write(encodeConsoleColor(packet.data.text));
        } else {
          this.term.write(textToTermText(packet.data.text));
        }
      });
      // 监听实例详细信息
      this.socket.on("stream/detail", (packet) => {
        this.instanceInfo = packet.data;
      });
      // 断开事件
      this.socket.on("disconnect", () => {
        this.available = false;
      });
      // 返回异步等待
      return new Promise((r) => {
        // 连接事件
        this.socket.on("connect", () => {
          this.available = true;
          r();
        });
      });
    },
    typeToText(v) {
      return typeTextToReadableText(v);
    },
    selectHistoryCommand(item) {
      this.command = item;
      console.log(this.$refs.terminalCommandInput.focus());
    },
    pushHistoryCommand(cmd) {
      if (cmd.trim().length <= 0) return;
      this.commandhistory.unshift(cmd);
      if (this.commandhistory.length > 40) {
        this.commandhistory.pop();
      }
      localStorage.setItem("CommandHistory", JSON.stringify(this.commandhistory));
    },
    startInterval() {
      if (!this.renderTask) this.renderTask = setInterval(this.renderFromSocket, 1000);
    },
    stopInterval() {
      clearInterval(this.renderTask);
    },
    // 初始化 Terminal 窗口
    initTerm() {
      this.term = initTerminalWindow(document.getElementById("terminal-container"));
    },
    // 开启实例（Ajax）
    async openInstance() {
      // this.busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_OPEN,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
      } catch (error) {
        this.$message({ message: error.toString(), type: "error" });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // 关闭实例（Ajax）
    async stopInstance() {
      // this.busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_STOP,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
      } catch (error) {
        this.$message({ message: error.toString(), type: "error" });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // 终止实例（Ajax）
    async killInstance() {
      // this.busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_KILL,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
      } catch (error) {
        this.$message({ message: error.toString(), type: "error" });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // 重启实例（Ajax）
    async restartInstance() {
      // this.busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_RESTART,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
      } catch (error) {
        this.$message({ message: error.toString(), type: "error" });
      } finally {
        setTimeout(() => (this.busy = false), 2000);
      }
    },
    // 使用Websocket发送命令
    sendCommand(command, method) {
      if (!this.socket || !this.available) return this.$message("无法执行命令，数据流通道不可用");
      if (method !== 1) this.pushHistoryCommand(command);
      this.socket.emit("stream/input", {
        data: { command }
      });
      this.command = "";
    },
    // 前往文件管理界面
    toFileManager() {
      router.push({ path: `/file/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    toProcessConfig() {
      router.push({
        path: `/process_config/${this.serviceUuid}/${this.instanceUuid}/`,
        query: {
          type: this.instanceInfo.config.type
        }
      });
    },
    toSchedule() {
      router.push({ path: `/schedule/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    toPingPanel() {
      if (this.instanceInfo.config && this.instanceInfo.config.pingConfig) {
        this.pingConfigForm.ip = this.instanceInfo.config.pingConfig.ip;
        this.pingConfigForm.port = this.instanceInfo.config.pingConfig.port;
      }
      this.pingConfigForm.is = true;
    },
    toEventPanel() {
      if (this.instanceInfo.config && this.instanceInfo.config.eventTask) {
        this.eventConfigPanel.autoRestart = this.instanceInfo.config.eventTask.autoRestart;
        this.eventConfigPanel.autoStart = this.instanceInfo.config.eventTask.autoStart;
      }
      this.eventConfigPanel.visible = true;
    },
    toTerminalSettingPanel() {
      this.terminalSettingPanel.visible = true;
      this.terminalSettingPanel.haveColor = this.instanceInfo.config.terminalOption.haveColor;
    },
    async toLogPanel() {
      this.logPanel.data = "";
      this.logPanel.visible = true;
      try {
        const text = await request({
          url: API_INSTANCE_OUTPUT,
          method: "GET",
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
        this.logPanel.data = text;
      } catch (error) {
        this.logPanel.data = error;
      }
      this.$nextTick(() => {
        const tr = this.$refs.logPanelTextArea.textarea;
        window.tr = tr;
        if (tr) {
          tr.scrollTop = tr.scrollHeight;
        }
      });
    },
    // 普通用户更新配置
    async instanceConfigUpdate() {
      try {
        await request({
          method: "PUT",
          url: API_INSTANCE_UPDATE,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid },
          data: {
            pingConfig: this.pingConfigForm,
            eventTask: this.eventConfigPanel,
            terminalOption: this.terminalSettingPanel
          }
        });
        this.$message({
          type: "success",
          message: "实例配置已更新，部分配置可能需要重启实例生效"
        });
        this.pingConfigForm.is = false;
        this.eventConfigPanel.visible = false;
        this.terminalSettingPanel.visible = false;
      } catch (error) {
        this.$message({
          type: "error",
          message: error.message
        });
      }
    },
    codeToText(p) {
      return statusCodeToText(p);
    },
    initStorage() {
      const ch = localStorage.getItem("CommandHistory");
      // 记录已执行命令历史
      if (ch) {
        this.commandhistory = JSON.parse(ch);
      } else {
        localStorage.setItem("CommandHistory", JSON.stringify([]));
      }
    },
    toInstanceDetail() {
      this.$router.push({ path: `/instance_detail/${this.serviceUuid}/${this.instanceUuid}/` });
    }
  },
  // 装载事件
  async mounted() {
    try {
      // 初始化Web本地储存
      this.initStorage();

      // 初始化终端窗口
      this.initTerm();

      // 与守护进程建立 Websocket 连接
      await this.setUpWebsocket();

      // 请求数据 & 启用状态获取定时器
      await this.renderFromSocket();
      this.startInterval();
    } catch (error) {
      console.error(error);
      // 忽略
    }
  },
  // 卸载事件
  beforeUnmount() {
    try {
      // 停止定时器
      this.stopInterval();
      // 断开与守护进程联系
      this.socket.disconnect();
      // 卸载终端窗口
      this.term.dispose();
    } catch (error) {
      // 忽略
      console.error(error);
    }
  }
};
</script>

<style scoped>
.terminal-wrapper {
  background-color: rgb(30, 30, 30);
  padding: 4px;
  border-radius: 4px;
  /* overflow: hidden; */
}
#terminal-input-wrapper input {
  width: 100%;
  font-size: 12px;
}
</style>
