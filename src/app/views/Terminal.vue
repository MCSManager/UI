<template>
  <el-row :gutter="20">
    <el-col :md="6">
      <Panel>
        <template #title>基本信息</template>
        <template #default>
          <LineInfo>
            <i class="el-icon-edit"></i> 昵称: {{ instanceInfo.config.nickname }}
          </LineInfo>
          <LineInfo>
            <i class="el-icon-tickets"></i> 类型: {{ instanceInfo.config.type }}
          </LineInfo>
          <LineInfo><i class="el-icon-finished"></i> 状态: {{ codeToText(instanceInfo.status) }}</LineInfo>
        </template>
      </Panel>
      <Panel>
        <template #title>实例控制组</template>
        <template #default>
          <div v-loading="busy">
            <el-row type="flex" class="row-bg" justify="space-between" :gutter="10">
              <el-col :span="6">
                <el-button @click="openInstance" style="width: 100%" size="small" :disabled="instanceInfo.status != 0">开启</el-button>
              </el-col>
              <el-col :span="6">
                <el-button @click="stopInstance" style="width: 100%" size="small" :disabled="instanceInfo.status == 0">关闭</el-button>
              </el-col>
              <el-col :span="6">
                <el-button @click="stopInstance" style="width: 100%" size="small" :disabled="instanceInfo.status == 0">重启</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="danger" plain @click="killInstance" style="width: 100%" size="small" :disabled="instanceInfo.status == 0">终止</el-button>
              </el-col>
            </el-row>
          </div>
        </template>
      </Panel>
      <Panel>
        <template #title>维护机制</template>
        <template #default>
          <el-row :gutter="10">
            <el-col :span="12" :offset="0">
              <el-button style="width: 100%" size="small">自动重启 <span class="color-green">开启</span> </el-button>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-button @click="toCommandhistoryPanel" style="width: 100%" size="small">
                命令历史
                <span v-show="commandhistoryPanel" class="color-gray">关闭</span>
                <span v-show="!commandhistoryPanel" class="color-green">开启</span>
              </el-button>
            </el-col>
          </el-row>

        </template>
      </Panel>
      <Panel>
        <template #title>详细信息</template>
        <template #default>
          <LineInfo><i class="el-icon-document"></i>
            <span style="font-size: 12px"> GID{{ serviceUuid }}</span>
          </LineInfo>
          <LineInfo><i class="el-icon-document"></i>
            <span style="font-size: 12px"> UID{{ instanceInfo.instanceUuid }}</span>
          </LineInfo>
          <LineInfo>
            <i class="el-icon-date"></i> 创建日期:
            {{ instanceInfo.config.createDatetime }}
          </LineInfo>
          <LineInfo>
            <i class="el-icon-date"></i> 最后启动:
            {{ instanceInfo.config.lastDatetime }}
          </LineInfo>
          <LineInfo><i class="el-icon-document"></i> 标签: {{ instanceInfo.tag }}</LineInfo>
          <LineInfo><i class="el-icon-document"></i> 输入编码: {{ instanceInfo.config.ie }} 输出编码:
            {{ instanceInfo.config.oe }}</LineInfo>
        </template>
      </Panel>
    </el-col>
    <el-col :md="18">
      <Panel>
        <template #title>实例功能组</template>
        <template #default>
          <el-row type="flex" justify="space-between" :gutter="10">
            <el-col :span="6" :offset="0">
              <el-button icon="el-icon-s-operation" style="width: 100%" size="small" @click="toProcessConfig">常用配置</el-button>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-button icon="el-icon-folder-opened" style="width: 100%" size="small" @click="toFileManager">文件管理</el-button>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-button icon="el-icon-mobile" style="width: 100%" size="small">计划任务</el-button>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-button icon="el-icon-user" style="width: 100%" size="small">10 / 100</el-button>
            </el-col>
          </el-row>
        </template>
      </Panel>
      <Panel v-loading="!available" element-loading-text="连接中">
        <template #title>实例控制台</template>
        <template #default>
          <div class="terminal-wrapper">
            <div id="terminal-container" style="height: 500px; width: 100%"></div>
            <div id="terminal-input-wrapper">
              <el-input placeholder="此处可输入命令，按回车键执行" prefix-icon="el-icon-arrow-right" size="mini" v-model="command" @keyup.enter="sendCommand(command)">
              </el-input>
            </div>
          </div>
        </template>
      </Panel>
      <Panel v-show="commandhistoryPanel">
        <template #title>命令历史</template>
        <template #default>
          <div class="flex flex-wrap" style="overflow: hidden;" v-if="commandhistory.length >0">
            <div class="margin-4" v-for="(item,index) in commandhistory" :key="index">
              <el-tag type="info" size="small" style="cursor: pointer;max-width:250px;" class="text-overflow-ellipsis" @click="sendCommand(item,1)">
                {{item}}
              </el-tag>
            </div>
          </div>
          <div v-else>
            <p class="color-gray">暂无任何命令历史</p>
          </div>
        </template>
      </Panel>
    </el-col>
  </el-row>
</template>

<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
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
  API_INSTANCE_STOP
} from "../service/common";
import router from "../router";
import { request } from "../service/protocol";
import { ElNotification } from "element-plus";
import { statusCodeToText } from "../service/instance_tools";

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
      commandhistoryPanel: true,
      busy: false,

      bool: false
    };
  },
  computed: {
    isStarted() {
      return this.instanceInfo.status !== 0;
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { Panel, LineInfo, LineButton },
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
        console.log("实例信息:", this.instanceInfo);
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
      }

      const password = res.password;
      const addr = res.addr;
      console.log("准备验证:", res, password, addr);

      // 直接与守护进程建立频道
      this.socket = connectRemoteService(addr, password);

      // 监听输出流
      this.socket.on("instance/stdout", (packet) => {
        this.term.write(packet.data.text);
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
    toCommandhistoryPanel() {
      this.commandhistoryPanel = !this.commandhistoryPanel;
    },
    pushHistoryCommand(cmd) {
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
      const term = (this.term = new Terminal({
        rendererType: "canvas",
        convertEol: true,
        disableStdin: false,
        cursorStyle: "underline",
        cursorBlink: true,
        fontSize: 12,
        theme: {
          background: "#1e1e1e"
        }
      }));
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(document.getElementById("terminal-container"));
      fitAddon.fit();
      term.writeln("MCSManager Terminal [Power by Term.js]");
      term.writeln("© 2021 MCSManager. All rights reserved.");
      // term.writeln(new Date().toString());
      term.info = (msg) => {
        term.writeln(`\r\n[MCSManager] [INFO] ${msg}`);
      };
      term.prompt = () => {
        term.write("\r\n$");
      };
      term.prompt();
    },
    // 开启实例（Ajax）
    async openInstance() {
      this.busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_OPEN,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // 关闭实例（Ajax）
    async stopInstance() {
      this.busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_STOP,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
      } finally {
        setTimeout(() => (this.busy = false), 200);
      }
    },
    // 终止实例（Ajax）
    async killInstance() {
      this.busy = true;
      try {
        await request({
          method: "GET",
          url: API_INSTANCE_KILL,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
        });
      } finally {
        setTimeout(() => (this.busy = false), 200);
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
      router.push({ path: `/process_config/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    codeToText(p) {
      return statusCodeToText(p);
    },
    initStorage() {
      const ch = localStorage.getItem("CommandHistory");
      if (ch) {
        this.commandhistory = JSON.parse(ch);
      } else {
        localStorage.setItem("CommandHistory", JSON.stringify([]));
      }
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

<style>
.terminal-wrapper {
  background-color: rgb(30, 30, 30);
  padding: 4px;
  border-radius: 4px;
}
#terminal-input-wrapper input {
  width: 100%;
  font-size: 12px;
}
</style>
