<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div>
    <el-row :gutter="20">
      <el-col :md="6" v-if="!isGlobalTerminal">
        <Panel>
          <template #title>{{ $t("userDetail.basicInfo") }}</template>
          <template #default>
            <div v-if="!available">
              <el-skeleton :rows="3" animated></el-skeleton>
            </div>
            <div v-else>
              <LineInfo>
                <i class="el-icon-edit"></i>
                {{ $t("terminal.name") }}:
                {{ instanceInfo.config.nickname }}
              </LineInfo>
              <LineInfo>
                <i class="el-icon-tickets"></i>
                {{ $t("terminal.type") }}:
                {{ typeToText(instanceInfo.config.type) }}
              </LineInfo>
              <LineInfo v-if="instanceInfo.info?.openFrpStatus">
                <i class="el-icon-share"></i>
                {{ $t("terminal.openfrp") }}:
                <span
                  class="color-green"
                >{{ $t("instances.status.running") }}</span>
              </LineInfo>

              <LineInfo v-if="hasDocker">
                <i class="el-icon-tickets"></i>
                {{ $t("terminal.limit") }}:
                <span
                  class="color-blue"
                  style="cursor: pointer"
                  @click="openDockerInfoDialog"
                >{{ $t("general.read") }}</span>
              </LineInfo>

              <LineInfo v-if="hasDocker && instanceInfo.config.docker.ports">
                <i class="el-icon-money"></i>
                {{ $t("terminal.dockerPort") }}:
                <div style="padding: 10px 0px 0px 16px">
                  <div
                    style="margin-bottom: 2px"
                    v-for="(item, index) in dockerPortsParse(instanceInfo.config.docker.ports)"
                    :key="index"
                  >
                    <template v-if="!item.more">
                      <span>{{ $t("CommonText.029") }}: {{ item.p1 }}</span>
                      <span style="margin-left: 6px">{{ $t("CommonText.030") }}: {{ item.p2 }}</span>
                      <span style="margin-left: 8px">
                        <el-tag type="success" size="mini">{{ item.protocol }}</el-tag>
                      </span>
                    </template>
                    <template v-else>...</template>
                  </div>
                </div>
              </LineInfo>
              <LineInfo>
                <i class="el-icon-finished"></i>
                {{ $t("imageManager.status") }}:
                <span
                  v-if="instanceInfo.status === -1"
                  class="color-red"
                >{{ $t("home.maintaining") }}</span>
                <span
                  v-else-if="instanceInfo.status === 0"
                  class="color-gray"
                >{{ $t("home.outOfRunning") }}</span>
                <span
                  v-else-if="instanceInfo.status === 1"
                  class="color-yellow"
                >{{ $t("home.stopping") }}</span>
                <span
                  v-else-if="instanceInfo.status === 2"
                  class="color-yellow"
                >{{ $t("home.starting") }}</span>
                <span
                  v-else-if="instanceInfo.status === 3"
                  class="color-green"
                >{{ $t("instances.status.running") }}</span>
                <span v-else class="color-red">{{ $t("terminal.unknown") }}</span>
              </LineInfo>
              <LineInfo v-if="instanceInfo.info && instanceInfo.info.currentPlayers != -1">
                <i class="el-icon-user"></i>
                {{ $t("terminal.currentPlayers") }}:
                {{ instanceInfo.info.currentPlayers }} /
                {{ instanceInfo.info.maxPlayers }}
              </LineInfo>
              <LineInfo v-if="instanceInfo.info && instanceInfo.info.version">
                <i class="el-icon-collection"></i>
                {{ $t("services.version") }}:
                {{ instanceInfo.info.version }}
              </LineInfo>
            </div>
          </template>
        </Panel>
        <Panel>
          <template #title>{{ $t("terminal.controlGroup") }}</template>
          <template #default>
            <div v-loading="busy">
              <el-row type="flex" justify="space-between" :gutter="10">
                <el-col :lg="24" v-show="instanceInfo.status === 0">
                  <el-popconfirm :title="$t('terminal.confirmOperate')" @confirm="openInstance">
                    <template #reference>
                      <el-button
                        icon="el-icon-video-play"
                        type="warning"
                        style="width: 100%"
                        size="small"
                        plain
                      >{{ $t("terminal.start") }}</el-button>
                    </template>
                  </el-popconfirm>
                </el-col>
                <el-col :lg="24" v-show="instanceInfo.status === 3">
                  <el-popconfirm :title="$t('terminal.confirmOperate')" @confirm="stopInstance">
                    <template #reference>
                      <el-button
                        icon="el-icon-video-pause"
                        style="width: 100%"
                        size="small"
                        class="row-mt"
                      >{{ $t("terminal.stop") }}</el-button>
                    </template>
                  </el-popconfirm>
                </el-col>
                <el-col :lg="24" v-show="instanceInfo.status === 3">
                  <el-popconfirm :title="$t('terminal.confirmOperate')" @confirm="restartInstance">
                    <template #reference>
                      <el-button
                        icon="el-icon-refresh-right"
                        style="width: 100%"
                        size="small"
                        class="row-mt"
                      >{{ $t("terminal.restart") }}</el-button>
                    </template>
                  </el-popconfirm>
                </el-col>
                <el-col :lg="24" v-show="instanceInfo.status > 0">
                  <el-popconfirm :title="$t('terminal.confirmOperate')" @confirm="killInstance">
                    <template #reference>
                      <el-button
                        icon="el-icon-switch-button"
                        type="danger"
                        plain
                        style="width: 100%"
                        size="small"
                        class="row-mt"
                      >{{ $t("terminal.kill") }}</el-button>
                    </template>
                  </el-popconfirm>
                </el-col>
                <el-col :lg="24" v-show="instanceInfo.status === -1">
                  <el-popconfirm
                    :title="$t('terminal.confirmOperate')"
                    @confirm="stopAsynchronousTask"
                  >
                    <template #reference>
                      <el-button
                        icon="el-icon-switch-button"
                        type="danger"
                        plain
                        style="width: 100%"
                        size="small"
                        class="row-mt"
                      >{{ $t("terminal.killTask") }}</el-button>
                    </template>
                  </el-popconfirm>
                </el-col>
                <el-col
                  :lg="24"
                  v-show="instanceInfo.config.updateCommand && instanceInfo.status === 0"
                >
                  <el-popconfirm :title="$t('terminal.confirmOperate')" @confirm="updateInstace">
                    <template #reference>
                      <el-button
                        icon="el-icon-files"
                        plain
                        style="width: 100%"
                        size="small"
                        class="row-mt"
                      >{{ $t("terminal.updateInstance") }}</el-button>
                    </template>
                  </el-popconfirm>
                </el-col>
              </el-row>
            </div>
          </template>
        </Panel>
        <Panel>
          <template #title>{{ $t("terminal.functionGroup") }}</template>
          <template #default>
            <el-row :gutter="10">
              <el-col :lg="24" :offset="0" class="row-mb" v-iszh v-if="isShowInstanceConfig">
                <el-button
                  :disabled="!instanceInfo.config.type"
                  icon="el-icon-s-operation"
                  style="width: 100%"
                  size="small"
                  @click="toProcessConfig"
                >{{ getInstanceConfigBtnName }}</el-button>
              </el-col>
              <el-col :lg="12" :offset="0" class="row-mb">
                <el-button
                  :disabled="!available"
                  icon="el-icon-monitor"
                  style="width: 100%"
                  size="small"
                  @click="toTerminalSettingPanel"
                >{{ $t("terminal.termSet") }}</el-button>
              </el-col>

              <el-col :lg="12" :offset="0" class="row-mb">
                <el-button
                  :disabled="!available"
                  icon="el-icon-mobile"
                  style="width: 100%"
                  size="small"
                  @click="toSchedule"
                >{{ $t("router.schedule") }}</el-button>
              </el-col>
              <el-col :lg="12" :offset="0" class="row-mb">
                <el-button
                  :disabled="!available"
                  icon="el-icon-data-line"
                  style="width: 100%"
                  size="small"
                  @click="toPingPanel"
                >{{ $t("terminal.statusQuery") }}</el-button>
              </el-col>
              <el-col :lg="12" :offset="0" class="row-mb">
                <el-button
                  :disabled="!available"
                  icon="el-icon-notebook-2"
                  style="width: 100%"
                  size="small"
                  @click="toEventPanel"
                >{{ $t("terminal.eventTask") }}</el-button>
              </el-col>
              <el-col :lg="24" :offset="0" class="row-mb">
                <el-button
                  :disabled="!available"
                  icon="el-icon-folder-opened"
                  style="width: 100%"
                  size="small"
                  @click="toFileManager"
                >{{ $t("instancesDetail.fileManager") }}</el-button>
              </el-col>

              <el-col :lg="24" :offset="0" v-if="isTopPermission">
                <el-button
                  :disabled="!available"
                  icon="el-icon-setting"
                  style="width: 100%"
                  size="small"
                  @click="toInstanceDetail"
                >{{ $t("terminal.instanceDetail") }}</el-button>
              </el-col>
            </el-row>
          </template>
        </Panel>
        <Panel>
          <template #title>{{ $t("instances.detailsInfo") }}</template>
          <template #default>
            <div v-if="!available">
              <el-skeleton :rows="5" animated></el-skeleton>
            </div>
            <div v-else>
              <LineInfo>
                <div class="text-overflow-ellipsis">
                  <i class="el-icon-document"></i>
                  <span style="font-size: 12px">GID {{ serviceUuid }}</span>
                </div>
              </LineInfo>
              <LineInfo>
                <div class="text-overflow-ellipsis">
                  <i class="el-icon-document"></i>
                  <span
                    class="text-overflow-ellipsis"
                    style="font-size: 12px"
                  >UID {{ instanceInfo.instanceUuid }}</span>
                </div>
              </LineInfo>
              <LineInfo>
                <i class="el-icon-date"></i>
                {{ $t("instances.endTime") }}:
                {{ instanceInfo.config.endTime || $t("instancesDetail.unlimited") }}
              </LineInfo>
              <LineInfo>
                <i class="el-icon-date"></i>
                {{ $t("instancesDetail.createDateTime") }}:
                {{ instanceInfo.config.createDatetime }}
              </LineInfo>
              <LineInfo>
                <i class="el-icon-date"></i>
                {{ $t("terminal.lastDatetime") }}:
                {{ instanceInfo.config.lastDatetime }}
              </LineInfo>
              <LineInfo>
                <i class="el-icon-document"></i>
                {{ $t("terminal.ie") }}:
                {{ instanceInfo.config.ie }} {{ $t("terminal.oe") }}:
                {{ instanceInfo.config.oe }}
              </LineInfo>
            </div>
          </template>
        </Panel>
      </el-col>
      <el-col :md="isGlobalTerminal ? 24 : 18">
        <Panel v-loading="!available" :class="{ 'global-terminal-wrapper': isGlobalTerminal }">
          <template #title>
            <span v-if="!isGlobalTerminal">{{ $t("router.terminal") }}</span>
            <span v-else>{{ $t("CommonText.054") }}</span>
          </template>
          <template #rtitle>
            <div v-if="!isGlobalTerminal">
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('terminal.clearTerminal')"
                placement="top"
              >
                <span class="terminal-right-botton" @click="term.clear()">
                  <i class="el-icon-delete"></i>
                </span>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('terminal.newFullScreen')"
                placement="top"
              >
                <span class="terminal-right-botton" @click="toFullTerminal(2)">
                  <i class="el-icon-monitor"></i>
                </span>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('terminal.fullScreen')"
                placement="top"
              >
                <span class="terminal-right-botton" @click="toFullTerminal(1)">
                  <i class="el-icon-full-screen"></i>
                </span>
              </el-tooltip>
            </div>
          </template>
          <template #default>
            <!-- Logo display in full screen mode -->
            <!-- <div v-if="isFull" class="full-terminal-logo only-pc-display">
             <Logo></Logo>
            </div>-->
            <!-- Action button in full screen mode -->
            <div v-show="isFull" class="full-terminal-button-wrapper">
              <div class="full-terminal-button" @click="openInstance">{{ $t("instances.start") }}</div>
              <div class="full-terminal-button" @click="stopInstance">{{ $t("instances.stop") }}</div>
              <div
                class="full-terminal-button"
                @click="restartInstance"
              >{{ $t("terminal.restart2") }}</div>
              <div class="full-terminal-button" @click="killInstance">{{ $t("instances.kill") }}</div>
              <div class="full-terminal-button" @click="backTerminal">{{ $t("terminal.exit") }}</div>
            </div>
            <!-- Fullscreen and non-fullscreen terminal windows -->
            <div :class="{ 'terminal-wrapper': true, 'full-terminal-wrapper': isFull }">
              <div id="terminal-container"></div>
            </div>
            <div
              :class="{
                'terminal-input-wrapper': true,
                'full-terminal-input-wrapper': isFull
              }"
            >
              <el-row :gutter="20">
                <el-col :md="isGlobalTerminal ? 14 : 24" :offset="0">
                  <el-input
                    :placeholder="$t('terminal.inputCmd')"
                    prefix-icon="el-icon-arrow-right"
                    size="small"
                    v-model="command"
                    ref="terminalCommandInput"
                    @keyup.enter="sendCommand(command)"
                  ></el-input>
                </el-col>
                <el-col v-if="isGlobalTerminal" :md="10" :offset="0">
                  <div class="global-terminal-btn-container">
                    <el-button
                      icon="el-icon-video-play"
                      size="small"
                      style="width: 100px"
                      @click="openInstance"
                    >{{ $t("instances.start") }}</el-button>
                    <el-button
                      icon="el-icon-video-pause"
                      size="small"
                      style="width: 100px"
                      @click="killInstance"
                    >{{ $t("instances.kill") }}</el-button>
                    <el-button
                      :disabled="!available"
                      icon="el-icon-monitor"
                      style="width: 100px"
                      size="small"
                      @click="toTerminalSettingPanel"
                    >{{ $t("terminal.termSet") }}</el-button>
                    <el-button
                      :disabled="!available"
                      icon="el-icon-setting"
                      style="width: 100px"
                      size="small"
                      @click="toInstanceDetail"
                    >{{ $t("terminal.paramsSet") }}</el-button>
                  </div>
                </el-col>
              </el-row>

              <div
                class="sub-title-info row-mt"
                style
                v-if="isGlobalTerminal"
              >{{ $t("terminal.globalTerminalTip") }}</div>
            </div>
          </template>
        </Panel>

        <Panel v-if="!isGlobalTerminal">
          <template #title>{{ $t("terminal.cmdHistory") }}</template>
          <template #rtitle>
            <span class="terminal-right-botton" @click="deleteCommandHistory">
              <i class="el-icon-delete"></i>
            </span>
          </template>
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
                >{{ item }}</el-tag>
              </ItemGroup>
            </div>
            <div v-else>
              <p class="color-gray">{{ $t("terminal.noCmdHistory") }}</p>
            </div>
          </template>
        </Panel>
      </el-col>
    </el-row>

    <Dialog v-model="pingConfigForm.is">
      <template #title>{{ $t("terminal.pingConfig.title") }}</template>
      <template #default>
        <div class="sub-title">
          <p class="sub-title-title">{{ $t("terminal.pingConfig.title2") }}</p>
          <p class="sub-title-info">{{ $t("terminal.pingConfig.title2Info") }}</p>
        </div>
        <div class="sub-title">
          <p class="sub-title-title">{{ $t("terminal.pingConfig.addr") }}</p>
          <p class="sub-title-info">{{ $t("terminal.pingConfig.inputAddr") }}</p>
        </div>
        <el-input
          v-model="pingConfigForm.ip"
          :placeholder="$t('terminal.pingConfig.addrExample')"
          size="small"
        ></el-input>
        <div class="sub-title row-mt">
          <p class="sub-title-title">{{ $t("terminal.pingConfig.port") }}</p>
          <p class="sub-title-info">{{ $t("terminal.pingConfig.inputPort") }}</p>
        </div>
        <el-input
          v-model="pingConfigForm.port"
          :placeholder="$t('terminal.pingConfig.portExample')"
          size="small"
        ></el-input>
        <div class="row-mt">
          <ItemGroup>
            <el-button type="success" size="small" @click="instanceConfigUpdate">
              {{
              $t("users.updateData")
              }}
            </el-button>
            <el-button @click="pingConfigForm.is = !pingConfigForm.is" size="small">
              {{
              $t("general.cancel")
              }}
            </el-button>
          </ItemGroup>
        </div>
      </template>
    </Dialog>

    <Dialog v-model="eventConfigPanel.visible">
      <template #title>{{ $t("terminal.eventConfigPanel.title") }}</template>
      <template #default>
        <div class="sub-title">
          <p class="sub-title-title">{{ $t("terminal.eventConfigPanel.autoRestart") }}</p>
          <p class="sub-title-info">
            <span v-html="$t('terminal.eventConfigPanel.autoRestartInfo')"></span>
          </p>
          <div class="row-mt">
            <el-switch v-model="eventConfigPanel.autoRestart"></el-switch>
          </div>
        </div>

        <div class="sub-title">
          <p class="sub-title-title">{{ $t("terminal.eventConfigPanel.autoStart") }}</p>
          <p class="sub-title-info">
            <span v-html="$t('terminal.eventConfigPanel.autoStartInfo')"></span>
          </p>
          <div class="row-mt">
            <el-switch v-model="eventConfigPanel.autoStart"></el-switch>
          </div>
        </div>

        <div class="row-mt">
          <ItemGroup>
            <el-button type="success" size="small" @click="instanceConfigUpdate">
              {{
              $t("general.save")
              }}
            </el-button>
            <el-button size="small" @click="eventConfigPanel.visible = false">
              {{
              $t("general.cancel")
              }}
            </el-button>
          </ItemGroup>
        </div>
      </template>
    </Dialog>

    <!-- Terminal Settings Dialog -->
    <TermSetting
      v-model:visible="terminalSettingPanel.visible"
      v-model:config="terminalSettingPanel"
      :serviceUuid="serviceUuid"
      :isDisable="instanceInfo.status != 0"
      :instanceUuid="instanceUuid"
    ></TermSetting>

    <NetworkTip
      ref="networkTip"
      :extraServiceConfig="instanceInfo.config.extraServiceConfig"
      :instanceUuid="instanceUuid"
      :serviceUuid="serviceUuid"
    ></NetworkTip>

    <DockerInfo
      v-if="instanceInfo.config.docker"
      ref="dockerInfoDialog"
      :dockerInfo="instanceInfo.config.docker"
    ></DockerInfo>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Dialog from "@/components/Dialog";
import Panel from "@/components/Panel";
import "@/assets/xterm/xterm.css";
import LineInfo from "@/components/LineInfo";
import { connectRemoteService } from "@/app/service/socket";
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
  API_INSTANCE_ASYNC_STOP,
  GLOBAL_INSTANCE_UUID
} from "../../service/common";
import router from "../../router";
import { parseforwardAddress, request } from "../../service/protocol";
import { encodeConsoleColor } from "../../service/terminal_color";
import { statusCodeToText, typeTextToReadableText } from "../../service/instance_tools";
import { initTerminalWindow, textToTermText } from "../../service/term";
import { getPlayersOption } from "../../service/chart_option";
import TermSetting from "./TermSetting";
import DockerInfo from "./DockerInfo";
import NetworkTip from "@/components/NetworkTip";
import { INSTANCE_TYPE_DEF_CONFIG } from "@/app/service/instance_type";
export default {
  components: {
    Panel,
    LineInfo,
    Dialog,
    TermSetting,
    NetworkTip,
    DockerInfo
  },
  data: function () {
    return {
      INSTANCE_TYPE_DEF_CONFIG,
      input1: "",
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      isFull: this.$route.query.full,
      term: null,
      terminalWidth: 0,
      terminalHeight: 0,
      visibleNetworkTip: false,
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
        visible: false
      },
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
    },
    isPty() {
      return (
        this.instanceInfo?.config?.terminalOption?.pty ||
        this.instanceInfo?.config?.processType === "docker"
      );
    },
    ptyCol() {
      return this.instanceInfo.config.terminalOption.ptyWindowCol ?? 80;
    },
    ptyRow() {
      return this.instanceInfo.config.terminalOption.ptyWindowRow ?? 40;
    },
    hasDocker() {
      return this.instanceInfo.config?.docker?.image ? true : false;
    },
    isGlobalTerminal() {
      return this.$route.params.instanceUuid === GLOBAL_INSTANCE_UUID;
    },
    isShowInstanceConfig() {
      return (
        typeof INSTANCE_TYPE_DEF_CONFIG[this.instanceInfo?.config?.type]?.getConfigEntryName ===
        "function"
      );
    },
    getInstanceConfigBtnName() {
      if (!this.isShowInstanceConfig) return null;
      return INSTANCE_TYPE_DEF_CONFIG[this.instanceInfo?.config?.type]?.getConfigEntryName();
    }
  },
  methods: {
    receiveInstanceDetailEvent() {
      // empty
    },
    // request data source (Ajax)
    async renderFromAjax() {
      try {
        const result = await request({
          method: "GET",
          url: API_INSTANCE,
          params: {
            uuid: this.instanceUuid,
            remote_uuid: this.serviceUuid
          }
        });
        this.instanceInfo = result;
      } catch (err) {
        console.log("Error", err);
      }
    },
    // Request data source (Websocket)
    async renderFromSocket() {
      this.sendResize(this.terminalWidth, this.terminalHeight);
      if (this.socket) {
        this.socket.emit("stream/detail", {});
      }
    },
    // Create a connection with the daemon
    async setUpWebsocket() {
      // Request a task passport from the panel to get permission to connect directly to the daemon
      let res = null;
      try {
        res = await request({
          method: "POST",
          url: API_INSTANCE_REMOTE_SERVICE_STREAM,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          }
        });
      } catch (error) {
        this.$router.push({
          path: "/terminal_error",
          query: {
            ip: this.unavailableIp || ""
          }
        });
        return;
      }

      // Establish a channel directly with the daemon
      const password = res.password;
      const addr = parseforwardAddress(res.addr, "ws");
      this.socket = connectRemoteService(
        addr,
        password,
        () => {
          this.unavailableIp = null;
          this.syncLog();
        },
        () => {
          this.unavailableIp = addr;
          this.$router.push({
            path: "/terminal_error",
            query: {
              ip: this.unavailableIp || ""
            }
          });
        }
      );

      // listen to the output stream
      this.socket.on("instance/stdout", (packet) => {
        if (this.instanceInfo?.config?.terminalOption?.haveColor) {
          this.term.write(encodeConsoleColor(packet.data.text));
        } else {
          this.term.write(textToTermText(packet.data.text));
        }
      });
      // Monitor instance details
      this.socket.on("stream/detail", (packet) => {
        this.instanceInfo = packet.data;
        this.resizePtyTerminalWindow();
        this.initChart();
        this.receiveInstanceDetailEvent(this.instanceInfo);
      });
      // disconnect event
      this.socket.on("disconnect", () => {
        this.available = false;
      });
      // return async await
      return new Promise((r) => {
        // connect event
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
      // Clear duplicate records with the same record as the current command
      this.commandhistory = Array.from(new Set(this.commandhistory)).filter((r) => r != cmd);
      // Insert the currently entered command forward
      this.commandhistory.unshift(cmd);
      if (this.commandhistory.length > 40) {
        this.commandhistory.pop();
      }
      localStorage.setItem("CommandHistory", JSON.stringify(this.commandhistory));
    },
    deleteCommandHistory() {
      localStorage.setItem("CommandHistory", JSON.stringify([]));
      this.commandhistory = [];
    },
    startInterval() {
      if (!this.renderTask) this.renderTask = setInterval(this.renderFromSocket, 1000);
    },
    stopInterval() {
      clearInterval(this.renderTask);
    },
    // Initialize the Terminal window
    initTerm() {
      // Create window and pass input event
      const terminalContainer = document.getElementById("terminal-container");
      const ft = localStorage.getItem("terminalFontSize");
      if (!ft) {
        this.term = initTerminalWindow(terminalContainer, {
          fontSize: 12
        });
      } else {
        this.term = initTerminalWindow(terminalContainer, {
          fontSize: localStorage.getItem("terminalFontSize")
        });
      }
      this.term.onData(this.sendInput);
      this.onChangeTerminalContainerHeight();
    },
    // Fixed height and width based on backend configuration settings in PTY mode
    resizePtyTerminalWindow() {
      if (this.instanceInfo.config?.terminalOption?.pty) {
        this.term.resize(
          this.instanceInfo.config?.terminalOption?.ptyWindowCol,
          this.instanceInfo.config?.terminalOption?.ptyWindowRow
        );
      }
    },
    // Open the instance (Ajax)
    async openInstance() {
      // this. busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_OPEN,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          }
        });
      } catch (error) {
        this.$message({
          message: error.toString(),
          type: "error"
        });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // Close the instance (Ajax)
    async stopInstance() {
      // this. busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_STOP,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          }
        });
      } catch (error) {
        this.$message({
          message: error.toString(),
          type: "error"
        });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // Terminate an ongoing asynchronous task (such as an update)
    async stopAsynchronousTask() {
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_ASYNC_STOP,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          }
        });
      } catch (error) {
        this.$message({
          message: error.toString(),
          type: "error"
        });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // update instance
    async updateInstace() {
      try {
        await request({
          method: "POST",
          url: API_INSTANCE_ASYNC_TASK,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid,
            task_name: "update"
          },
          data: {
            time: new Date().getTime()
          }
        });
      } catch (error) {
        this.$message({
          message: error.toString(),
          type: "error"
        });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // Terminate the instance (Ajax)
    async killInstance() {
      // this. busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_KILL,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          }
        });
      } catch (error) {
        this.$message({
          message: error.toString(),
          type: "error"
        });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // Restart the instance (Ajax)
    async restartInstance() {
      // this. busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_RESTART,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          }
        });
      } catch (error) {
        this.$message({
          message: error.toString(),
          type: "error"
        });
      } finally {
        setTimeout(() => (this.busy = false), 2000);
      }
    },
    sendResize(w, h) {
      if (this.instanceInfo.config.processType !== "docker") return;
      if (!this.socket || !this.available) return;
      if (!this.isStarted) return;
      this.socket.emit("stream/resize", {
        data: {
          w,
          h
        }
      });
    },
    // Send input using Websocket
    sendInput(input) {
      // When the terminal is in PTY or other type, support full data mode
      if (this.isPty) {
        if (!this.socket || !this.available || !this.isStarted)
          return console.log("!this.socket || !this.available || !this.isStarted");
        this.socket.emit("stream/write", {
          data: {
            input
          }
        });
      }
    },
    // Send commands using Websocket
    sendCommand(command, method) {
      if (!this.socket || !this.available)
        return this.$message({
          message: this.$t("terminal.cantSendCmdBecauseData"),
          type: "error"
        });
      if (!this.isStarted)
        return this.$message({
          message: this.$t("terminal.cantSendCmdBecauseNotRun"),
          type: "error"
        });
      if (method !== 1) this.pushHistoryCommand(command);
      this.socket.emit("stream/input", {
        data: {
          command
        }
      });
      this.command = "";
    },
    // Go to the file management interface
    toFileManager() {
      router.push({
        path: `/file/${this.serviceUuid}/${this.instanceUuid}/`
      });
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
      router.push({
        path: `/schedule/${this.serviceUuid}/${this.instanceUuid}/`
      });
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
      this.terminalSettingPanel = {
        ...this.instanceInfo.config.terminalOption,
        crlf: this.instanceInfo.config.crlf,
        oe: this.instanceInfo.config.oe,
        ie: this.instanceInfo.config.ie,
        stopCommand: this.instanceInfo.config.stopCommand
      };
      this.terminalSettingPanel.visible = true;
    },
    async syncLog() {
      try {
        const text = await request({
          url: API_INSTANCE_OUTPUT,
          method: "GET",
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          }
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
    // Ordinary user update configuration
    async instanceConfigUpdate() {
      try {
        await request({
          method: "PUT",
          url: API_INSTANCE_UPDATE,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          },
          data: {
            pingConfig: this.pingConfigForm.is ? this.pingConfigForm : null,
            eventTask: this.eventConfigPanel.visible ? this.eventConfigPanel : null
          }
        });
        this.$message({
          type: "success",
          message: this.$t("termSet.setUpdate")
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
      // record the history of executed commands
      if (ch) {
        this.commandhistory = JSON.parse(ch);
      } else {
        localStorage.setItem("CommandHistory", JSON.stringify([]));
      }
    },
    toInstanceDetail() {
      this.$router.push({
        path: `/instance_detail/${this.serviceUuid}/${this.instanceUuid}/`
      });
    },
    /**
     * Initialize the number of people to display the report
     */
    initChart() {
      if (!this.instanceInfo.info.playersChart || !this.instanceInfo.info.playersChart.length) {
        return;
      }
      if (!this.playersChart) {
        // Determine whether the div exists (it will be rendered the next time it is executed)
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
     * Set the number of people to display the report display value
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
     * The number of people processed shows the time display value of the horizontal axis of the report
     */
    showTimeStr(time, now) {
      const date = new Date(now - time);
      return `${date.getHours()}:${(Array(2).join(0) + date.getMinutes()).slice(-2)}`;
    },
    toFullTerminal(type = 1) {
      if (type === 1) {
        this.isFull = true;
        this.onChangeTerminalContainerHeight();
        router.push({
          path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/`,
          query: {
            full: 1
          }
        });
      }
      if (type === 2) {
        window.open(`#/terminal/${this.serviceUuid}/${this.instanceUuid}/?full=1`);
      }
    },
    backTerminal() {
      this.isFull = false;
      this.onChangeTerminalContainerHeight();
      router.push({
        path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/`,
        query: {}
      });
    },
    // Terminal window size adaptation event
    onChangeTerminalContainerHeight() {
      const terminalContainer = document.getElementById("terminal-container");
      if (this.isFull) {
        const height = document.body.clientHeight - 50;
        terminalContainer.removeAttribute("style");
        terminalContainer.setAttribute("style", `height: ${height}px; width:100%`);
      } else {
        terminalContainer.removeAttribute("style");
        terminalContainer.setAttribute("style", `height: 580px; width:100%`);
      }
      if (this.term && this.term.fitAddon) {
        if (this.isPty) {
          this.resizePtyTerminalWindow();
        } else {
          this.$nextTick(() => this.term.fitAddon.fit());
        }
      }
    },
    openDockerInfoDialog() {
      this.$refs.dockerInfoDialog.open();
    },
    // [ "25565:25565/tcp", "27766:27766/tcp" ]
    dockerPortsParse(list = []) {
      let line = [];
      list.forEach((v, index) => {
        if (index >= 2) return;
        const tmp = v.split("/");
        if (tmp.length != 2) return;
        const protocol = tmp[1];
        const p = tmp[0].split(":");
        if (p.length >= 2) {
          line.push({
            p1: p[0],
            p2: p[1],
            protocol: String(protocol).toUpperCase()
          });
        }
      });
      if (list.length >= 2) {
        line.push({
          p1: null,
          p2: null,
          protocol: null,
          more: true
        });
      }
      return line;
    }
  },
  async mounted() {
    try {
      this.visibleNetworkTip = this.$route.query.network_tip ? true : false;

      // Initialize web local storage
      this.initStorage();

      // Initialize the terminal window
      this.initTerm();
      this.term.onResize((size) => {
        this.terminalHeight = size.rows;
        this.terminalWidth = size.cols;
        this.sendResize(size.cols, size.rows);
      });

      // Establish a Websocket connection with the daemon
      await this.setUpWebsocket();
      // request data & enable status get timer
      await this.renderFromSocket();
      this.startInterval();
    } catch (error) {
      console.error(error);
      // neglect
    } finally {
      if (this.visibleNetworkTip) {
        this.$refs.networkTip.open();
      }
    }

    // Listen for window change events
    window.addEventListener("resize", this.onChangeTerminalContainerHeight);
  },
  // unload event
  beforeUnmount() {
    // Uninstall monitor browser window change time
    window.removeEventListener("resize", this.onChangeTerminalContainerHeight);
    try {
      // stop the timer
      this.stopInterval();
      // disconnect from the daemon
      this.socket.disconnect();
      // Uninstall the terminal window
      this.term.dispose();
      // Unload the count report
      if (this.playersChart) {
        this.playersChart.dispose();
        this.playersChart = null;
      }
    } catch (error) {
      // neglect
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
}

.terminal-input-wrapper {
  margin-top: 12px;
}

.terminal-input-wrapper input {
  width: 100%;
  font-size: 12px;
}

.full-terminal-input-wrapper {
  position: fixed;
  bottom: 0px;
  z-index: 99;
  text-align: center;
  left: 0px;
  right: 0px;
  margin: 6px 10px;
}

.full-terminal-wrapper {
  background-color: rgb(30, 30, 30);
  padding: 8px;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  z-index: 99;
}

.terminal-right-botton {
  font-size: 14px;
  padding: 2px 6px;
  margin: 0 2px;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 4px;
}

.terminal-right-botton:hover {
  background-color: rgb(219, 219, 219);
}

.full-terminal-button-wrapper {
  position: fixed;
  right: 30px;
  top: 12px;
  z-index: 100;
}

.full-terminal-button {
  display: inline-block;
  margin: 6px;
  padding: 8px 14px;
  color: white;
  background-color: rgb(54, 54, 54);
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(25, 25, 25, 0.626);
  border: 1px solid rgb(73, 73, 73);
  transition: all 0.6s;
  cursor: pointer;
}

.full-terminal-button:hover {
  background-color: rgb(101, 101, 101);
}
.full-terminal-logo {
  z-index: 100;
  text-align: center;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  line-height: 30px;
}

#terminal-container {
  height: 580px;
  width: 100%;
  overflow-x: scroll !important;
  overflow-y: hidden;
}

.global-terminal-flex {
  display: flex;
}

.global-terminal-wrapper {
  max-width: 900px;
  margin: auto;
}

.global-terminal-btn-container {
  text-align: center;
  display: flex;
  justify-content: center;
}

@media (max-width: 900px) {
  .global-terminal-flex {
    display: block;
  }

  .global-terminal-btn-container {
    margin-top: 8px;
  }
}
</style>
