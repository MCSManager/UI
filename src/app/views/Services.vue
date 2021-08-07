<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-30 15:08:17
 * @Description: 
-->

<template>
  <Panel>
    <template #title>远程服务管理</template>
    <template #default>
      <el-button type="success" size="small" @click="openNewServiceDialog"
        >新增远程守护进程</el-button
      >
      <el-button size="small" @click="refresh">刷新</el-button>
    </template>
  </Panel>
  <Panel>
    <template #title>所有分布式服务总览</template>
    <template #default>
      <p>
        远程服务（远程主机）必须确保全部在线且互相网络畅通，面板连接需公开放行远程服务端口与配置密钥。
      </p>
      <el-table :data="services" style="width: 100%" size="small">
        <el-table-column prop="ip" label="地址" width="220">
          <template #default="scope">
            <el-input size="small" v-model="scope.row.ip" placeholder="必填"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="port" label="端口" width="100">
          <template #default="scope">
            <el-input size="small" v-model="scope.row.port" placeholder="必填"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="CPU">
          <template #default="scope">
            <div v-if="scope.row.system">
              {{ Number(scope.row.system.cpuUsage * 100).toFixed(1) }}%
            </div>
          </template>
        </el-table-column>
        <el-table-column label="内存">
          <template #default="scope">
            <div v-if="scope.row.system">{{ scope.row.system.memText }}</div>
          </template>
        </el-table-column>
        <el-table-column label="正在运行">
          <template #default="scope">
            <div v-if="scope.row.instance">{{ scope.row.instance.running }} 个</div>
          </template>
        </el-table-column>
        <el-table-column label="实例总数">
          <template #default="scope">
            <div v-if="scope.row.instance">{{ scope.row.instance.total }} 个</div>
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
        <el-table-column label="操作" style="text-align: center" width="240">
          <template #default="scope">
            <el-button size="mini" @click="linkService(scope.row, true)">连接</el-button>
            <el-button size="mini" @click="deleteService(scope.row.uuid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Dialog v-model="isNewService">
    <template #title>新增远程服务</template>
    <template #default>
      <div>
        <div class="sub-title">远程服务所在主机的IP地址</div>
        <el-input v-model="newServiceInfo.ip" placeholder="地址，必填" size="small"></el-input>
        <div class="sub-title row-mt">远程服务端口</div>
        <el-input v-model="newServiceInfo.port" placeholder="端口，必填" size="small"></el-input>
        <div class="sub-title row-mt">
          <div class="sub-title-title">验证密钥</div>
          <div class="sub-title-info">
            为安全考虑，设置后将无法查看与更改，更改密钥只能删除远程服务重新连接
          </div>
        </div>
        <el-input
          v-model="newServiceInfo.key"
          placeholder="必填，设置后无法更改与查看"
          size="small"
        ></el-input>
        <div class="row-mt">
          <el-button
            type="success"
            size="small"
            @click="toNewService(newServiceInfo.ip, newServiceInfo.port, newServiceInfo.key)"
            >新增</el-button
          >
          <el-button @click="isNewService = !isNewService" size="small">取消</el-button>
        </div>
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
        key: ""
      },
      services: [],
      drawer: false,
      selectRow: null,
      isNewService: false
    };
  },
  methods: {
    // 刷新按钮
    async refresh() {
      await this.render();
    },
    // 渲染数据方法
    async render() {
      const result = await request({
        method: "GET",
        url: API_OVERVIEW
      });
      console.log("分布式列表:", result.remote);
      result.remote.forEach((element) => {
        if (element.system) {
          // 计算内存
          const free = Number(element.system.freemem / 1024 / 1024 / 1024).toFixed(1);
          const total = Number(element.system.totalmem / 1024 / 1024 / 1024).toFixed(1);
          const used = Number(total - free).toFixed(1);
          element.system.memText = `${used}GB/${total}GB`;
        }
      });
      this.services = result.remote;
    },
    // 新增服务
    async toNewService(ip, port, apiKey) {
      try {
        await axios.post(API_SERVICE_CURD, { ip, port, apiKey });
        this.isNewService = false;
        this.$message({ type: "success", message: OK_TEXT });
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
        if (isNeedSave) await this.saveService(row);
        await axios.get(`${API_SERVICE_URL}/link_remote_service`, {
          params: { uuid: row.uuid }
        });
        this.$message({ type: "success", message: OK_TEXT });
      } catch (error) {
        this.$message({ type: "error", message: ERROR_TEXT });
      }
    },
    // 保存服务
    async saveService(row) {
      await axios.put(
        API_SERVICE_CURD,
        { ip: row.ip, port: row.port },
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
      } catch (err) {
        this.$message({ type: "error", message: ERROR_TEXT });
      }
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>

<style>
.collapse-item-title-table {
  width: 100%;
}

.service-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
