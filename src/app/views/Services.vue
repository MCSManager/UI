<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-03 22:28:04
 * @Description: 
-->

<template>
  <el-row :gutter="20">
    <el-col :md="8">
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
        <template #title>远程服务节点</template>
        <template #default>
          <el-tree
            :data="remoteNodes"
            :props="defaultProps"
            :default-expand-all="true"
            @node-click="handleNodeClick"
          ></el-tree>
        </template>
      </Panel>
    </el-col>
    <el-col :md="16">
      <Panel v-if="displayService">
        <template #title>
          <div>
            <span v-text="displayService.ip + ':' + displayService.port"></span>
            &nbsp;
            <el-tag size="small">{{ displayService.available ? "已连接" : "不可使用" }}</el-tag>
          </div>
          <el-button class="button" type="text">删除</el-button>
        </template>
        <template #default>
          <el-descriptions size="mini">
            <el-descriptions-item label="UUID">{{ displayService.uuid }}</el-descriptions-item>
            <el-descriptions-item label="远程实例数">{{
              displayService.instances.length
            }}</el-descriptions-item>
          </el-descriptions>
          <el-table :data="displayService.instances" stripe style="width: 100%" size="small">
            <el-table-column prop="instanceUuid" label="UUID"></el-table-column>
            <el-table-column prop="config.nickname" label="实例昵称"></el-table-column>
          </el-table>
        </template>
      </Panel>
      <Panel v-if="!displayService">
        <template #title> 具体信息 </template>
        <template #default>选择右侧菜单中任意一个节点即可查看远程服务的详细信息</template>
      </Panel>
    </el-col>
  </el-row>

  <!-- 对话框代码 -->
  <Dialog v-show="isNewService">
    <template #title>新增远程服务</template>
    <template #default>
      <p>
        远程服务一般情况指远程主机，在将来也有可能会有不同类型的服务对接。
        <br />确保目标主机已经部署运行守护进程（Daemon），接下来您便可以轻松连接远程服务
      </p>
      <div>
        <el-input
          placeholder="列如 127.0.0.1 或 www.demo.com"
          v-model="newServiceInfo.ip"
          size="small"
        >
          <template #prepend>地址</template>
        </el-input>
      </div>
      <div class="row-mt">
        <el-input placeholder="一般为 24444 端口" v-model="newServiceInfo.port" size="small">
          <template #prepend>端口</template>
        </el-input>
      </div>
      <div class="row-mt">
        <el-button type="success" size="small" @click="closeNewServiceDialog">
          新增远程服务
        </el-button>
        <el-button type="danger" size="small" @click="closeNewServiceDialog">取消</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Panel from "../../components/Panel";
import Dialog from "../../components/Dialog";
import axios from "axios";
import { API_SERVICE } from "../service/common";

export default {
  data() {
    return {
      newServiceInfo: {
        ip: "",
        port: ""
      },
      isNewService: false,
      services: [],
      remoteNodes: [],
      displayService: null
    };
  },
  methods: {
    openNewServiceDialog() {
      this.isNewService = true;
    },
    closeNewServiceDialog() {
      this.isNewService = false;
    },
    handleNodeClick(v) {
      console.log("Node Click:", v);
      const sAddr = v.id;
      this.services.forEach((service) => {
        const tAddr = `${service.ip}:${service.port}`;
        if (sAddr == tAddr) return (this.displayService = service);
      });
    }
  },
  components: { Panel, Dialog },
  async mounted() {
    const result = await axios.get(API_SERVICE);
    const responseObjects = result.data.data;
    this.remoteNodes = [
      {
        label: "面板节点",
        children: []
      }
    ];
    this.services = [];
    responseObjects.forEach((v) => {
      // 服务类所有数据列表
      this.services.push(v);

      // 节点菜单，根据状态进行不同的参数压入
      if (v.available) {
        this.remoteNodes[0].children.push({
          id: `${v.ip}:${v.port}`,
          label: `${v.ip}:${v.port}`,
          available: v.available
        });
      } else {
        this.remoteNodes[0].children.push({
          id: `${v.ip}:${v.port}`,
          label: `${v.ip}:${v.port} (不可用)`,
          available: v.available
        });
      }
    });
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
