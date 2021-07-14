<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-07 17:27:02
 * @Description: 
-->

<template>
  <el-row>
    <el-col :span="24">
      <Panel>
        <template #title>创建镜像</template>
        <template #default>
          <div class="">
            <el-steps :active="page" finish-status="success" align-center>
              <el-step title="实例类型"></el-step>
              <el-step title="分配主机"></el-step>
              <el-step title="基本参数"></el-step>
              <el-step title="容器设置"></el-step>
              <el-step title="最终确认"></el-step>
            </el-steps>
          </div>
          <div class="select-box-wrapper">
            <SelectBlock @click="selectType(1)">
              <h3>自带预设镜像（建议）</h3>
              <p>环境是 openjdk 8，适用于 Minecraft 1.17 以下的 Java 版服务端运行。</p>
            </SelectBlock>
            <SelectBlock @click="selectType(2)">
              <h3>自带预设镜像（建议）</h3>
              <p>环境是 openjdk 16，适用于 Minecraft 1.17 以上的 Java 版服务端运行。</p>
            </SelectBlock>
            <SelectBlock @click="selectType(3)">
              <h3>自定义命令程序</h3>
              <p>适用于类似于 bash，cmd.exe 和其他任何可用命令启动的程序</p>
            </SelectBlock>
          </div>
        </template>
      </Panel>
    </el-col>
  </el-row>
</template>

<script>
import Panel from "../../components/Panel";

import SelectBlock from "../../components/SelectBlock";
import axios from "axios";
import { API_SERVICE } from "../service/common";

export default {
  components: { Panel, SelectBlock },
  data: function () {
    return {
      stepActive: 0,
      page: 0,
      type: -1,
      service: "",
      services: [],
      isDocker: false,
      form: {
        nickname: "未定义的名字",
        startCommand: "",
        stopCommand: "^c",
        cwd: ".",
        ie: "GBK",
        oe: "GBK",
        createDatetime: new Date().toDateString(),
        lastDatetime: "",
        type: "TYPE_UNIVERSAL",
        tag: [],
        maxSpace: null,
        endTime: "",
        docker: {
          image: "",
          xmx: "",
          ports: "",
          cpu: ""
        }
      }
    };
  },
  methods: {
    async createInstance() {},
    selectType(v) {
      this.type = v;
      this.down();
    },
    up() {
      if (this.page > 0) this.page -= 1;
    },
    down() {
      this.page += 1;
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

<style>
.select-box-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
