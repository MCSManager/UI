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
  

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。
-->

<template>
  <Panel>
    <template #title>远程服务管理</template>
    <template #default>
      <div class="flex flex-space-between">
        <ItemGroup>
          <el-button type="success" size="small" @click="openNewServiceDialog">
            新增远程守护进程
          </el-button>
          <el-button size="small" @click="refresh">刷新</el-button>
        </ItemGroup>
        <ItemGroup>
          <el-button size="small" @click="openPrinciplePanel">了解工作原理</el-button>
        </ItemGroup>
      </div>
    </template>
  </Panel>
  <Panel>
    <template #title>所有分布式服务总览</template>
    <template #default>
      <p>
        远程服务（远程主机）必须确保全部在线且互相网络畅通，面板连接需公开放行远程服务端口与配置密钥。
        <br />
        网页需要能直接连接远程服务（上传，下载与控制台），避免使用除 localhost
        外的局域网段任何IP，尽可能使用外网IP或域名进行连接。
      </p>
      <el-table :data="services" style="width: 100%" size="small">
        <el-table-column label="地址" width="170">
          <template #default="scope">
            <el-input size="small" v-model="scope.row.ip" placeholder="必填"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="端口" width="110">
          <template #default="scope">
            <el-input size="small" v-model="scope.row.port" placeholder="必填"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="210">
          <template #default="scope">
            <span
              >{{ scope.row.remarks }}
              <i style="cursor: pointer" class="el-icon-edit" @click="updateRemarks(scope.row)"></i
            ></span>
            <!-- <el-input size="small" v-model="scope.row.remarks"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column label="平台" width="100">
          <template #default="scope">
            <div v-if="scope.row.system">{{ scope.row.system.platform }}</div>
          </template>
        </el-table-column>
        <el-table-column label="CPU">
          <template #default="scope">
            <div v-if="scope.row.system">
              {{ Number(scope.row.system.cpuUsage * 100).toFixed(1) }}%
            </div>
          </template>
        </el-table-column>
        <el-table-column label="内存" width="160">
          <template #default="scope">
            <div v-if="scope.row.system">{{ scope.row.system.memText }}</div>
          </template>
        </el-table-column>
        <el-table-column label="实例状态">
          <template #default="scope">
            <div v-if="scope.row.instance">
              {{ scope.row.instance.running }}/{{ scope.row.instance.total }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="连接状态">
          <template #default="scope">
            <span class="color-green" v-if="scope.row.available">
              <i class="el-icon-circle-check"></i> 在线
            </span>
            <span class="color-red" v-if="!scope.row.available">
              <el-tooltip effect="dark" content="无法连接到指定ip或者密钥错误" placement="top">
                <span><i class="el-icon-warning-outline"></i> 离线</span>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align: center" width="260px">
          <template #default="scope">
            <el-button size="mini" @click="linkService(scope.row, true)">
              {{ scope.row.available ? "更新" : "连接" }}
            </el-button>
            <el-button size="mini" @click="updateKey(scope.row, true)">修改密钥</el-button>
            <el-button size="mini" type="danger" plain @click="deleteService(scope.row.uuid)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Dialog v-model="isNewService">
    <template #title>新增远程服务</template>
    <template #default>
      <div>
        <div class="sub-title">备注信息</div>
        <el-input
          v-model="newServiceInfo.remarks"
          placeholder="选填，支持中文，用于填写相关备注信息"
          size="small"
        ></el-input>
        <div class="sub-title row-mt">
          <div class="sub-title-title">远程服务所在主机的IP地址</div>
          <div class="sub-title-info">
            <b>必须使用外网地址</b>或 localhost 地址，否则将导致远程实例无法连接
          </div>
        </div>
        <el-input
          v-model="newServiceInfo.ip"
          placeholder="必填，列如 mcsmanager.com，43.123.211.12"
          size="small"
        ></el-input>
        <div class="sub-title row-mt">远程服务端口</div>
        <el-input
          v-model="newServiceInfo.port"
          placeholder="必填，列如 24444"
          size="small"
        ></el-input>
        <div class="sub-title row-mt">
          <div class="sub-title-title">验证密钥</div>
          <div class="sub-title-info">
            在守护进程启动时控制台上会输出显示，务必确保密钥安全
            <br />
            <a
              href="https://github.com/Suwings/MCSManager-Document/wiki/%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B%E5%AF%86%E9%92%A5%E6%9C%89%E4%BD%95%E4%BD%9C%E7%94%A8%EF%BC%9F"
              class="color-blue"
            >
              如何获取密钥？
            </a>
          </div>
        </div>
        <el-input
          v-model="newServiceInfo.apiKey"
          placeholder="必填，列如 6ff0fa1ef9a943f3c6f2fe0e4564a2fa383d35c4b78ccb5"
          size="small"
        ></el-input>
        <div class="row-mt">
          <ItemGroup>
            <el-button type="success" size="small" @click="toNewService(false)">新增</el-button>
            <el-button @click="isNewService = !isNewService" size="small"> 取消 </el-button>
          </ItemGroup>
        </div>
      </div>
    </template>
  </Dialog>

  <Dialog v-model="isNewServiceWarning">
    <template #title>新增远程主机警告</template>
    <template #default>
      <div class="sub-title">
        <div class="sub-title-title">
          检测到您的连接IP为 :{{ newServiceInfo.ip }}，似乎是一个内网地址？
        </div>
        <div class="sub-title-info">
          面板与远程服务端均要能够让用户访问，以此行为设计即可实现流量分流减轻中心面板端的压力。
        </div>
      </div>
      <div class="sub-title">
        <div class="sub-title-title">为什么必须使用外网IP连接远程节点</div>
        <div class="sub-title-info">
          为了减轻中心控制端（Web 面板端）的流量压力，我们必须将流量分流到各自的远程主机，<br />
          这样就必须保证每个远程主机均要能够使用外网访问，所以您也必须使用外网IP地址来访问这个主机的实例
        </div>
      </div>
      <div class="sub-title">分布式服务数据传输工作原理</div>
      <div style="text-align: center">
        <img :src="require('../../assets/connect.png')" alt="" srcset="" style="height: 230px" />
      </div>
      <div class="sub-title row-mt">
        <div class="sub-title-title">请问您是否依然要坚持使用内网IP连接？</div>
        <div class="sub-title-info">如果强制使用，则实例的部分功能不可用。</div>
      </div>
      <div class="row-mt">
        <ItemGroup>
          <el-button type="danger" size="small" @click="toNewService(true)">强制执行</el-button>
          <el-button @click="isNewServiceWarning = !isNewServiceWarning" size="small"
            >取消执行</el-button
          >
        </ItemGroup>
      </div>
    </template>
  </Dialog>

  <Dialog v-model="isOpenPrinciplePanel">
    <template #title>分布式服务工作原理</template>
    <template #default>
      <div class="sub-title">
        <div class="sub-title-info">
          为了减轻中心控制端（Web 面板端）的流量压力与计算压力，我们采用 “数据走直连，指令走转发”
          的设计概念。<br />
          这样的设计会暴露各个守护进程，但您守护进程主机上的服务本应就会暴露，再加上可控的权限识别，无需担忧各个主机安全问题。
        </div>
      </div>
      <div class="sub-title">分布式服务工作原理图</div>
      <div style="text-align: center">
        <img :src="require('../../assets/principle.png')" alt="" srcset="" style="height: 460px" />
      </div>

      <div class="sub-title">
        <div class="sub-title-info">
          如果您只有一个主机，则可以无视此工作原理，按正常使用方式即可。
        </div>
      </div>
      <div class="row-mt">
        <ItemGroup>
          <el-button type="success" size="small" @click="isOpenPrinciplePanel = false">
            确定
          </el-button>
        </ItemGroup>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Panel from "../../components/Panel";
import Dialog from "../../components/Dialog";
import axios from "axios";
import { API_OVERVIEW, API_SERVICE_CURD, API_SERVICE_URL } from "../service/common";
import { ERROR_TEXT, OK_TEXT } from "../service/text";
import { request } from "../service/protocol";

export default {
  components: { Panel, Dialog },
  data() {
    return {
      newServiceInfo: {
        ip: "",
        port: "",
        apiKey: "",
        remarks: ""
      },
      services: [],
      drawer: false,
      selectRow: null,
      isNewService: false,
      isNewServiceWarning: false,
      isOpenPrinciplePanel: false
    };
  },
  methods: {
    // 刷新按钮
    async refresh() {
      await this.render();
      this.$message({ type: "info", message: "已刷新", duration: 400 });
    },
    // 渲染数据方法
    async render() {
      const result = await request({
        method: "GET",
        url: API_OVERVIEW
      });
      result.remote.forEach((element) => {
        if (element.system) {
          // 计算内存
          const free = Number(element.system.freemem / 1024 / 1024 / 1024).toFixed(1);
          const total = Number(element.system.totalmem / 1024 / 1024 / 1024).toFixed(1);
          const used = Number(total - free).toFixed(1);
          element.system.memText = `${used}G/${total}G`;
        }
      });
      this.services = result.remote;
    },
    // 新增服务
    async toNewService(enforce = false) {
      const addr = this.newServiceInfo.ip;
      if (
        addr.indexOf("192.") == 0 ||
        addr.indexOf("172.16") == 0 ||
        addr.indexOf("10.") == 0 ||
        addr.indexOf("172.31") == 0
      ) {
        if (!enforce) {
          this.isNewServiceWarning = true;
          return;
        } else {
          this.isNewServiceWarning = false;
        }
      }
      try {
        if (this.newServiceInfo.remarks === "") this.newServiceInfo.remarks = "Remote Host";
        await request({
          method: "POST",
          url: API_SERVICE_CURD,
          data: this.newServiceInfo
        });
        this.isNewService = false;
        this.$message({ type: "success", message: OK_TEXT });
        this.render();
      } catch (err) {
        this.$message({ type: "error", message: ERROR_TEXT });
      }
    },
    // 打开新增服务面板
    openNewServiceDialog() {
      this.isNewService = true;
    },
    // 连接服务
    async linkService(row, isNeedSave) {
      try {
        if (isNeedSave) await this.updateService(row);
        await request({
          url: `${API_SERVICE_URL}/link_remote_service`,
          method: "GET",
          params: { uuid: row.uuid }
        });
        setTimeout(this.refresh, 500);
        this.$message({ type: "success", message: OK_TEXT });
      } catch (error) {
        this.$message({ type: "error", message: error.message });
      }
    },
    // 更新服务
    async updateService(row) {
      await axios.put(
        API_SERVICE_CURD,
        { ip: row.ip, port: row.port, remarks: row.remarks || "Remote Host" },
        {
          params: { uuid: row.uuid }
        }
      );
    },
    // 删除服务
    async deleteService(uuid) {
      await this.$confirm("此操作将永久删除该远程服务，是否继续？", "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      });
      try {
        axios.delete(API_SERVICE_CURD, { params: { uuid } });
        this.$message({ type: "success", message: OK_TEXT });
        this.render();
      } catch (err) {
        this.$message({ type: "error", message: ERROR_TEXT });
      }
    },
    // 修改备注信息
    async updateRemarks(row) {
      const text = await this.$prompt("请输入新的备注内容", "备注", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      });
      row.remarks = text.value;
      try {
        await this.updateService(row);
        this.$message({ type: "success", message: "更新备注信息成功" });
      } catch (error) {
        this.$message({ type: "error", message: error });
      }
    },
    // 修改密钥信息
    async updateKey(row) {
      let text = await this.$prompt("请输入新密钥，设置后将自动尝试连接", "密钥", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      });
      text = String(text.value);
      text = text.trim();
      try {
        await axios.put(
          API_SERVICE_CURD,
          {
            apiKey: text
          },
          {
            params: { uuid: row.uuid }
          }
        );
        // this.$message({ type: "success", message: "更新密钥成功" });
        await this.linkService(row, false);
      } catch (error) {
        this.$message({ type: "error", message: error });
      } finally {
        setTimeout(() => this.refresh(), 1000);
      }
    },
    openPrinciplePanel() {
      this.isOpenPrinciplePanel = true;
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>

<style scoped>
.collapse-item-title-table {
  width: 100%;
}

.service-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
