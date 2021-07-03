<template>
  <el-row :gutter="20">
    <el-col :md="7">
      <Panel>
        <template #title>基本信息</template>
        <template #default>
          <LineInfo>
            <i class="el-icon-edit"></i> 昵称: {{ instanceInfo.config.nickname }}
          </LineInfo>
          <LineInfo>
            <i class="el-icon-tickets"></i> 类型: {{ instanceInfo.config.type }}
          </LineInfo>

          <LineInfo><i class="el-icon-finished"></i> 状态: {{ instanceInfo.status }}</LineInfo>
        </template>
      </Panel>
      <Panel>
        <template #title>实例控制组</template>
        <template #default>
          <el-row type="flex" class="row-bg" justify="space-between" :gutter="10">
            <el-col :span="12">
              <LineInfo @click="openInstance"><i class="el-icon-video-play"></i> 开启实例</LineInfo>
            </el-col>
            <el-col :span="12">
              <LineInfo @click="stopInstance">
                <i class="el-icon-video-pause"></i> 关闭实例
              </LineInfo>
            </el-col>
            <el-col :span="12">
              <LineInfo @click="stopInstance">
                <i class="el-icon-refresh-right"></i> 重启实例
              </LineInfo>
            </el-col>
            <el-col :span="12">
              <LineInfo @click="stopInstance">
                <i class="el-icon-circle-close"></i> 终止实例
              </LineInfo>
            </el-col>
          </el-row>
        </template>
      </Panel>
      <Panel>
        <template #title>详细信息</template>
        <template #default>
          <LineInfo><i class="el-icon-document"></i> GID {{ serviceUuid }}</LineInfo>
          <LineInfo><i class="el-icon-document"></i> UID {{ instanceInfo.instanceUuid }}</LineInfo>
          <LineInfo>
            <i class="el-icon-date"></i> 创建日期:
            {{ instanceInfo.config.createDatetime }}
          </LineInfo>
          <LineInfo>
            <i class="el-icon-date"></i> 最后启动:
            {{ instanceInfo.config.lastDatetime }}
          </LineInfo>
          <LineInfo><i class="el-icon-document"></i> 标签: {{ instanceInfo.tag }}</LineInfo>
          <LineInfo
            ><i class="el-icon-document"></i> 输入编码: {{ instanceInfo.config.ie }} 输出编码:
            {{ instanceInfo.config.oe }}</LineInfo
          >
        </template>
      </Panel>
    </el-col>
    <el-col :md="17">
      <Panel>
        <template #title>实例功能组</template>
        <template #default>
          <el-row type="flex" justify="space-between" :gutter="10">
            <el-col :span="6" :offset="0">
              <LineButton>
                <div><i class="el-icon-s-operation"></i> 常用配置</div>
              </LineButton>
            </el-col>
            <el-col :span="6" :offset="0">
              <LineButton>
                <div><i class="el-icon-folder-opened"></i> 文件管理</div>
              </LineButton>
            </el-col>
            <el-col :span="6" :offset="0">
              <LineButton>
                <div><i class="el-icon-mobile"></i> 实例接口</div>
              </LineButton>
            </el-col>
            <el-col :span="6" :offset="0">
              <LineButton>
                <div><i class="el-icon-user"></i> 32 / 80</div>
              </LineButton>
            </el-col>
          </el-row>
        </template>
      </Panel>
      <Panel>
        <template #title>实例控制台</template>
        <template #default>
          <div class="terminal-wrapper">
            <div id="terminal-container" style="height: 400px; width: 100%"></div>
            <div id="terminal-input-warpper">
              <!-- <input type="text" v-model="command" @keyup.enter="sendCommand(command)" /> -->
              <el-input
                placeholder="此处可输入命令，按回车键执行"
                prefix-icon="el-icon-arrow-right"
                size="mini"
                v-model="command"
                @keyup.enter="sendCommand(command)"
              >
              </el-input>
            </div>
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

import axios from "axios";
import socket from "../service/socket";
import { API_URL } from "../service/common";

export default {
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      term: null,
      command: "",
      instanceInfo: {
        config: {}
      }
    };
  },
  components: { Panel, LineInfo, LineButton },
  methods: {
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
      try {
        await axios.request({
          method: "GET",
          url: `${API_URL}/api/instance/open/${this.serviceUuid}/?uuid=${this.instanceUuid}`
        });
      } catch (err) {
        // 控制台会自动输出错误信息
        // this.term.info(err.response.data.data);
      }
    },
    // 关闭实例（Ajax）
    async stopInstance() {
      try {
        await axios.request({
          method: "GET",
          url: `${API_URL}/api/instance/stop/${this.serviceUuid}/?uuid=${this.instanceUuid}`
        });
      } catch (err) {
        // 控制台会自动输出错误信息
        // this.term.info(err.response.data.data);
      }
    },
    // 使用Ajax传输命令（弃用）
    async sendCommandViaAjax() {
      const result = await axios.request({
        method: "GET",
        url: `${API_URL}/api/instance/command/${this.serviceUuid}/?uuid=${this.instanceUuid}&command=X`
      });
      console.log("sendCommand RES:", result);
    },
    // 使用标准输入流进行传输数据
    stdin(data) {
      socket.emit("instance/stdin", {
        serviceUuid: this.serviceUuid,
        instanceUuid: this.instanceUuid,
        command: data
      });
    },
    // 使用Websocket发送命令
    sendCommand(command) {
      socket.emit("instance/command", {
        serviceUuid: this.serviceUuid,
        instanceUuid: this.instanceUuid,
        command: command
      });
      this.command = "";
    }
  },
  async mounted() {
    this.initTerm();

    const result = await axios.request({
      method: "GET",
      url: `${API_URL}/api/instance/${this.serviceUuid}/`,
      params: { uuid: this.instanceUuid }
    });

    this.instanceInfo = result.data.data;
    console.log("实例信息:", this.instanceInfo);

    // 开始请求转发当前实例数据
    socket.emit("forward/instance", {
      serviceUuid: this.serviceUuid,
      instanceUuid: this.instanceUuid,
      isForward: true
    });

    socket.on("instance/stdout", (data) => {
      this.term.write(data);
    });
  },
  beforeUnmount() {
    // 请求取消转发当前实例数据
    socket.emit("forward/instance", {
      serviceUuid: this.serviceUuid,
      instanceUuid: this.instanceUuid,
      isForward: false
    });
    this.term.dispose();
  }
};
</script>

<style>
.terminal-wrapper {
  background-color: rgb(30, 30, 30);
  padding: 4px;
  border-radius: 4px;
}
#terminal-input-warpper input {
  width: 100%;
  font-size: 12px;
}
</style>
