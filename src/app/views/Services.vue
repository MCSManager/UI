<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-07 12:44:20
 * @Description: 
-->

<template>
  <Panel>
    <template #title>远程服务管理</template>
    <template #default>
      <el-button type="success" size="mini" @click="openNewServiceDialog"
        >新增远程守护进程</el-button
      >
      <el-button size="mini">刷新</el-button>
    </template>
  </Panel>
  <Panel>
    <template #title>所有分布式服务总览</template>
    <template #default>
      <p style="color: red">
        无法连接到远程服务，此远程服务所在主机的全部信息都将无法正常获取，请确认地址是否正确且服务正常启用。
      </p>
      <el-table :data="services" style="width: 100%">
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
        <el-table-column label="正在运行">
          <template #default="scope"> {{ scope.row.started }} 个 </template>
        </el-table-column>
        <el-table-column label="实例总数">
          <template #default="scope"> {{ scope.row.ilen }} 个 </template>
        </el-table-column>
        <el-table-column label="连接状态">
          <template #default="scope">
            <span class="color-green" v-if="scope.row.available">连接正常</span>
            <span class="color-red" v-if="!scope.row.available">无法连接</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align: center" width="240">
          <template #default="scope">
            <el-button size="mini" @click="toLink(scope.row)">应用更改</el-button>
            <el-button size="mini" @click="toInfo(scope.row)">详情</el-button>
            <el-button size="mini" @click="toInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <!-- 示例抽屉 -->
  <Drawer ref="drawer" title="远程服务详情">
    <LineLabel>
      <template #title>地址</template>
      <template #default> {{ selectRow.ip }}:{{ selectRow.port }}</template>
    </LineLabel>
    <el-table :data="selectRow.instances" style="width: 100%">
      <el-table-column prop="instanceUuid" label="标识符"></el-table-column>
      <el-table-column prop="config.nickname" label="名字"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </el-table>
  </Drawer>

  <!-- 详情弹框 -->
  <Dialog v-model="drawer">
    <template #title>远程服务详情</template>
    <template #default>
      <LineLabel>
        <template #title>地址</template>
        <template #default> {{ selectRow.ip }}:{{ selectRow.port }}</template>
      </LineLabel>
      <p>
        本远程守护进程拥有的实例列表，具体的实例列表详细信息可在“实例管理”功能中进行管理和编辑，这里仅供浏览基本信息。
      </p>
      <el-table :data="selectRow.instances" style="width: 100%; min-width: 300px" size="mini">
        <el-table-column prop="instanceUuid" label="标识符" width="260"></el-table-column>
        <el-table-column prop="config.nickname" label="名字"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
    </template>
  </Dialog>

  <Dialog v-model="isNewService">
    <template #title>新增远程服务</template>
    <template #default>
      <div class="sub-title">远程服务所在主机的IP地址</div>
      <el-input v-model="newServiceInfo.ip" placeholder="地址，必填" size="small"></el-input>
      <div class="sub-title row-mt">远程服务端口</div>
      <el-input v-model="newServiceInfo.port" placeholder="端口，必填" size="small"></el-input>
      <div class="row-mt">
        <el-button type="success" size="small">新增</el-button>
        <el-button @click="isNewService = !isNewService" size="small">取消</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Panel from "../../components/Panel";
import LineLabel from "../../components/LineLabel";
import Dialog from "../../components/Dialog";
import Drawer from "../../components/Drawer";
import axios from "axios";
import { API_SERVICE } from "../service/common";

export default {
  components: { Panel, LineLabel, Dialog, Drawer },
  data() {
    return {
      newServiceInfo: {
        ip: "",
        port: ""
      },
      services: [],
      drawer: false,
      selectRow: null,
      isNewService: false
    };
  },
  methods: {
    openNewServiceDialog() {
      this.isNewService = true;
    },
    toLink(row) {
      this.selectRow = row;
      this.$refs.drawer.open();
    },
    toInfo(row) {
      this.selectRow = row;
      this.drawer = true;
    },
    deleteService() {
      this.$confirm("此操作将永久删除该远程服务，是否继续？", "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    }
  },
  async mounted() {
    const result = await axios.get(API_SERVICE);
    const responseObjects = result.data.data;

    this.services = [];
    responseObjects.forEach((v) => {
      let started = 0;
      let len = 0;
      if (v.instances) {
        for (const iterator of v.instances) {
          len++;
          if (iterator.status != 0) started++;
        }
      }
      v.started = started;
      v.ilen = len;
      this.services.push(v);
    });
    window.services = this.services;
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
