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
              <span v-if="instanceInfo.status === -1" class="color-red">维护中</span>
              <span v-else-if="instanceInfo.status === 0" class="color-gray">未运行</span>
              <span v-else-if="instanceInfo.status === 1" class="color-yellow">停止中</span>
              <span v-else-if="instanceInfo.status === 2" class="color-yellow">启动中</span>
              <span v-else-if="instanceInfo.status === 3" class="color-green">正在运行</span>
              <span v-else class="color-red">未知</span>
            </LineInfo>
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
              <el-col :lg="24" v-show="instanceInfo.status === 0">
                <el-popconfirm title="确定执行此操作？" @confirm="openInstance">
                  <template #reference>
                    <el-button
                      icon="el-icon-video-play"
                      type="warning"
                      style="width: 100%"
                      size="small"
                      plain
                    >
                      开启实例
                    </el-button>
                  </template>
                </el-popconfirm>
              </el-col>
              <el-col :lg="24" v-show="instanceInfo.status === 3">
                <el-popconfirm title="确定执行此操作？" @confirm="stopInstance">
                  <template #reference>
                    <el-button
                      icon="el-icon-video-pause"
                      style="width: 100%"
                      size="small"
                      class="row-mt"
                      >关闭实例
                    </el-button>
                  </template>
                </el-popconfirm>
              </el-col>
              <el-col :lg="24" v-show="instanceInfo.status === 3">
                <el-popconfirm title="确定执行此操作？" @confirm="restartInstance">
                  <template #reference>
                    <el-button
                      icon="el-icon-refresh-right"
                      style="width: 100%"
                      size="small"
                      class="row-mt"
                    >
                      重启实例
                    </el-button>
                  </template>
                </el-popconfirm>
              </el-col>
              <el-col :lg="24" v-show="instanceInfo.status > 0">
                <el-popconfirm title="确定执行此操作？" @confirm="killInstance">
                  <template #reference>
                    <el-button
                      icon="el-icon-switch-button"
                      type="danger"
                      plain
                      style="width: 100%"
                      size="small"
                      class="row-mt"
                      >强制终止实例
                    </el-button>
                  </template>
                </el-popconfirm>
              </el-col>
              <el-col :lg="24" v-show="instanceInfo.status === -1">
                <el-popconfirm title="确定执行此操作？" @confirm="stopAsynchronousTask">
                  <template #reference>
                    <el-button
                      icon="el-icon-switch-button"
                      type="danger"
                      plain
                      style="width: 100%"
                      size="small"
                      class="row-mt"
                      >终止正在运行的任务
                    </el-button>
                  </template>
                </el-popconfirm>
              </el-col>
              <el-col
                :lg="24"
                v-show="instanceInfo.config.updateCommand && instanceInfo.status === 0"
              >
                <el-popconfirm title="确定执行此操作？" @confirm="updateInstace">
                  <template #reference>
                    <el-button
                      icon="el-icon-files"
                      plain
                      style="width: 100%"
                      size="small"
                      class="row-mt"
                      >更新/安装实例
                    </el-button>
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
                >特定配置
              </el-button>
            </el-col>
            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-monitor"
                style="width: 100%"
                size="small"
                @click="toTerminalSettingPanel"
                >终端设置
              </el-button>
            </el-col>

            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-mobile"
                style="width: 100%"
                size="small"
                @click="toSchedule"
                >计划任务
              </el-button>
            </el-col>
            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-data-line"
                style="width: 100%"
                size="small"
                @click="toPingPanel"
                >状态查询
              </el-button>
            </el-col>
            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-notebook-2"
                style="width: 100%"
                size="small"
                @click="toEventPanel"
                >事件任务
              </el-button>
            </el-col>
            <el-col :lg="12" :offset="0" class="row-mb">
              <el-button
                :disabled="!available"
                icon="el-icon-folder-opened"
                style="width: 100%"
                size="small"
                @click="toFileManager"
                >文件管理
              </el-button>
            </el-col>
            <el-col :lg="24" :offset="0" v-if="isTopPermission">
              <el-button
                :disabled="!available"
                icon="el-icon-setting"
                style="width: 100%"
                size="small"
                @click="toInstanceDetail"
                >实例设置
              </el-button>
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
              {{ instanceInfo.config.oe }}
            </LineInfo>
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
      <Panel
        v-if="
          instanceInfo &&
          instanceInfo.info &&
          instanceInfo.info.playersChart &&
          instanceInfo.info.playersChart.length
        "
      >
        <template #title>面板端在线人数</template>
        <template #default>
          <p>每10分钟统计间隔，总10小时的在线人数趋势</p>
          <div class="echart-wrapper">
            <div id="echart-wrapper-players" style="width: 100%; height: 200px"></div>
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
        <p class="sub-title-info">
          必填，支持域名与IP地址，不填写则不会查询服务端信息，人数，版本等。
        </p>
      </div>
      <el-input v-model="pingConfigForm.ip" placeholder="列如：localhost" size="small"></el-input>
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
          <el-switch v-model="eventConfigPanel.autoRestart"></el-switch>
        </div>
      </div>

      <div class="sub-title">
        <p class="sub-title-title">自动启动</p>
        <p class="sub-title-info">
          只要守护进程（远程节点）运行，就自动发起一次启动实例操作。<br />如果将守护进程开机自启则可用于开机自启实例。
        </p>
        <div class="row-mt">
          <el-switch v-model="eventConfigPanel.autoStart"></el-switch>
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
          <el-switch v-model="terminalSettingPanel.haveColor"></el-switch>
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
import * as echarts from "echarts";
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
  API_INSTANCE_OUTPUT,
  API_INSTANCE_ASYNC_TASK,
  API_INSTANCE_ASYNC_STOP
} from "../service/common";
import router from "../router";
import { parseforwardAddress, request } from "../service/protocol";
import { encodeConsoleColor } from "../service/terminal_color";
import { ElNotification } from "element-plus";
import { statusCodeToText, typeTextToReadableText } from "../service/instance_tools";
import { initTerminalWindow, textToTermText } from "../service/term";
import { getPlayersOption } from "../service/chart_option";

export default {
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      term: null,
      terminalWidth: 0,
      terminalHeight: 0,
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

      terminalSettingPanel: {
        visible: false,
        haveColor: true
      },

      unavailableTerminal: false,
      unavailableIp: null,

      playersChart: null,
      isShowPlayersChart: false
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
      this.sendResize(this.terminalWidth, this.terminalHeight);
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
          // 获取一次系统日志
          this.syncLog();
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
        this.initChart();
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
      // 清除重复的记录和当前指令一样的记录
      this.commandhistory = Array.from(new Set(this.commandhistory)).filter((r) => r != cmd);
      // 往前方插入当前输入的指令
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
      // 创建窗口与输入事件传递
      this.term = initTerminalWindow(document.getElementById("terminal-container"));
      this.term.onData(this.sendInput);
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
    // 终止正在进行异步任务（如更新）
    async stopAsynchronousTask() {
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_ASYNC_STOP,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
      } catch (error) {
        this.$message({ message: error.toString(), type: "error" });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // 更新实例
    async updateInstace() {
      try {
        await request({
          method: "POST",
          url: API_INSTANCE_ASYNC_TASK,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid, task_name: "update" },
          data: {
            time: new Date().getTime()
          }
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
    sendResize(w, h) {
      if (this.instanceInfo.config.processType !== "docker") return;
      if (!this.socket || !this.available) return;
      if (!this.isStarted) return;
      this.socket.emit("stream/resize", {
        data: { w, h }
      });
    },
    // 使用Websocket发送输入
    sendInput(input) {
      // 非 Docker 类型拒绝终端直接输入，不需要提示。
      if (this.instanceInfo.config.processType !== "docker") return;
      if (!this.socket || !this.available)
        return this.$message({ message: "无法输入到终端，数据流通道不可用", type: "error" });
      if (!this.isStarted)
        return this.$message({ message: "无法输入到终端，服务器未开启", type: "error" });
      this.socket.emit("stream/write", {
        data: { input }
      });
    },
    // 使用Websocket发送命令
    sendCommand(command, method) {
      if (!this.socket || !this.available)
        return this.$message({ message: "无法执行命令，数据流通道不可用", type: "error" });
      if (!this.isStarted)
        return this.$message({ message: "无法执行命令，服务器未开启", type: "error" });
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
    async syncLog() {
      try {
        const text = await request({
          url: API_INSTANCE_OUTPUT,
          method: "GET",
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
        this.term.clear();
        if (this.instanceInfo?.config?.terminalOption?.haveColor) {
          this.term.write(encodeConsoleColor(text));
        } else {
          this.term.write(text);
        }
        this.term.scrollToBottom();
      } catch (error) {
        this.term.write(error);
      }
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
    },
    /**
     * 初始化人数显示报表
     */
    initChart() {
      if (!this.instanceInfo.info.playersChart || !this.instanceInfo.info.playersChart.length) {
        return;
      }
      if (!this.playersChart) {
        // 判断div是否存在（要下次执行的时候才会渲染）
        const echartDiv = document.getElementById("echart-wrapper-players");
        if (!echartDiv) {
          return;
        }
        this.playersChart = echarts.init(echartDiv);
        this.playersChart.setOption(getPlayersOption());
        this.setPlayersChart();
      } else {
        this.setPlayersChart();
      }
    },
    /**
     * 设置人数显示报表显示值
     */
    setPlayersChart() {
      if (!this.playersChart) return;
      const MAX_TIME = this.instanceInfo.info.playersChart.length - 1;
      const source = this.instanceInfo.info.playersChart;
      const now = Date.now();
      for (const key in source) {
        source[key]["time"] = this.showTimeStr((MAX_TIME - key) * 600000, now);
      }
      this.playersChart.setOption({
        dataset: {
          dimensions: ["time", "value"],
          source
        }
      });
    },
    /**
     * 处理人数显示报表横坐标时间显示值
     */
    showTimeStr(time, now) {
      const date = new Date(now - time);
      return `${date.getHours()}:${(Array(2).join(0) + date.getMinutes()).slice(-2)}`;
    }
  },
  // 装载事件
  async mounted() {
    try {
      // 初始化Web本地储存
      this.initStorage();

      // 初始化终端窗口
      this.initTerm();
      this.term.onResize((size) => {
        this.terminalHeight = size.rows;
        this.terminalWidth = size.cols;
        this.sendResize(size.cols, size.rows);
      });
      this.term.fitAddon.fit();
      window.onresize = () => {
        this.term.fitAddon.fit();
      };

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
      // 卸载人数报表
      if (this.playersChart) {
        this.playersChart.dispose();
        this.playersChart = null;
      }
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
