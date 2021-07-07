<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-07 13:23:10
 * @Description: 
-->

<template>
  <Panel>
    <template #title>分布式服务状态</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :span="6">
          <LineLabel size="small">
            <template #title>已连接远程服务: </template>
            <template #default> {{ availableService.length }} 个 </template>
          </LineLabel>
        </el-col>
        <el-col :span="6">
          <LineLabel size="small">
            <template #title>不可用远程服务: </template>
            <template #default> {{ unavailableService.length }} 个 </template>
          </LineLabel>
        </el-col>
        <el-col :span="6">
          <LineLabel size="small">
            <template #title>实例总数: </template>
            <template #default> {{ instances.length }} 个 </template>
          </LineLabel>
        </el-col>
        <el-col :span="6">
          <LineLabel size="small">
            <template #title>运行中: </template>
            <template #default> {{ startedInstance }} 个 </template>
          </LineLabel>
        </el-col>
      </el-row>
      <div v-show="unavailableService.length != 0">
        <span style="color: red">
          <b>警告：</b> 检测到您有一个或以上远程服务无法建立连接，请前往
          <a class="alink" href="./services">分布式服务</a>
          功能确认各个远程服务器状态，若不修复此问题，则有部分远程实例您可能无法访问和显示。
        </span>
      </div>
    </template>
  </Panel>

  <Panel>
    <template #title>分布式应用实例列表</template>
    <template #default>
      <div class="instance-table-warpper">
        <div>
          <el-button size="mini" type="success" @click="toNewInstance">
            <i class="el-icon-plus"></i> 新建实例
          </el-button>
          <el-button size="mini" type="primary" @click="refresh">
            <i class="el-icon-refresh"></i> 刷新
          </el-button>
        </div>
        <div>
          <el-tag style="margin: 0px 12px" v-show="!canInterval" type="danger">
            实时刷新已暂停
          </el-tag>
          <el-button size="mini" type="primary" @click="batOpen">
            <i class="el-icon-video-play"></i> 开启
          </el-button>
          <el-button size="mini" type="primary" @click="batStop">
            <i class="el-icon-video-pause"></i> 关闭
          </el-button>
          <el-button size="mini" type="primary" @click="batKill">
            <i class="el-icon-video-pause"></i> 终止
          </el-button>
          <el-button size="mini" type="danger" @click="batDelete">
            <i class="el-icon-delete"></i> 删除
          </el-button>
        </div>
      </div>

      <el-table
        :data="instances"
        stripe
        style="width: 100%"
        size="small"
        ref="multipleTable"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- <el-table-column prop="instanceUuid" label="UUID" width="240"></el-table-column> -->
        <el-table-column prop="nickname" label="实例昵称" min-width="240"></el-table-column>
        <el-table-column prop="status" label="运行状态" width="120"></el-table-column>
        <el-table-column prop="type" label="实例类型" width="140"></el-table-column>
        <el-table-column prop="ip" label="来自于" width="140"></el-table-column>
        <el-table-column label="操作" style="text-align: center" width="180">
          <template #default="scope">
            <el-button
              size="mini"
              @click="editInstance(scope.row.serviceUuid, scope.row.instanceUuid)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="toInstance(scope.row.serviceUuid, scope.row.instanceUuid)"
              >管理</el-button
            >
            <!-- <el-button size="mini" type="danger" @click="delInstance(scope.row)">
                  删除
                </el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>
</template>

<script>
import Panel from "../../components/Panel";
import LineLabel from "../../components/LineLabel";
import { ElMessage } from "element-plus";
import axios from "axios";
import { API_SERVICE, API_URL } from "../service/common";
import router from "../router";
export default {
  data() {
    return {
      canInterval: true,
      interval: null,
      instances: [],
      remoteIps: [],
      remoteObjects: [],
      multipleSelection: [], // 表格多选属性
      availableService: [],
      unavailableService: [],
      startedInstance: 0
    };
  },
  async mounted() {
    await this.render();
    this.startAjaxTask();
  },
  unmounted() {
    this.stopAjaxTask();
  },
  methods: {
    startAjaxTask() {
      if (this.interval === null) {
        this.interval = setInterval(() => {
          if (this.canInterval) this.render();
        }, 5000);
      }
    },
    stopAjaxTask() {
      clearInterval(this.interval);
      this.interval = null;
    },
    refresh() {
      this.render();
      this.$message({ message: "已刷新", type: "success" });
    },
    async render() {
      const result = await axios.get(API_SERVICE);
      console.log("响应:", result.data.data);
      this.remoteObjects = result.data.data;
      // 初始化数据模型
      this.instances = [];
      this.remoteIps = [];
      this.multipleSelection = []; // 表格多选属性
      this.availableService = [];
      this.unavailableService = [];
      this.startedInstance = 0;
      // 开始遍历解析数据
      this.remoteObjects.forEach((v) => {
        const fromIP = v.ip;
        const fromPort = v.port;
        const addr = `${v.ip}:${v.port}`;
        const instances = v.instances;
        const serviceUuid = v.uuid;
        const available = v.available;
        // 根据可用性识别出所有可用/不可用服务
        if (available) {
          this.availableService.push(addr);
        } else {
          this.unavailableService.push(addr);
        }
        let statusText = null;
        instances.forEach((instance) => {
          //Busy=-1;Stop=0;Stopping=1;Starting=2;Running=3;
          if (instance.status == -1) statusText = "忙碌";
          if (instance.status == 0) statusText = "未运行";
          if (instance.status == 1) statusText = "停止中";
          if (instance.status == 2) statusText = "启动中";
          if (instance.status == 3) statusText = "正在运行";

          // 计算正在运行的实例
          if (instance.status != 0) this.startedInstance++;

          // 压入所有实例
          this.instances.push({
            instanceUuid: instance.instanceUuid,
            serviceUuid: serviceUuid,
            nickname: instance.config.nickname,
            type: instance.config.type,
            status: statusText,
            ip: `${fromIP}:${fromPort}`
          });
        });
      });
    },

    // 表格多选函数
    selectionChange(v) {
      if (v.length == 0) this.canInterval = true;
      else this.canInterval = false;
      this.multipleSelection = v;
    },
    editInstance(serviceUuid, instanceUuid) {
      console.log("编辑实例:", serviceUuid, instanceUuid);
      router.push({ path: `/instance_detail/${serviceUuid}/${instanceUuid}/` });
    },
    toNewInstance() {
      router.push({ path: `/new_instace` });
    },
    toInstance(serviceUuid, instanceUuid) {
      console.log("访问实例:", serviceUuid, instanceUuid);
      router.push({ path: `/terminal/${serviceUuid}/${instanceUuid}/` });
    },
    batDelete() {
      console.log("Delete:", this.multipleSelection);
    },
    async batOpen() {
      if (this.multipleSelection.length == 0)
        return ElMessage.error("无法执行，请至少选择一个实例");
      console.log("Open:", this.multipleSelection);
      await axios.request({
        method: "POST",
        url: `${API_URL}/api/instance/multi_open/`,
        data: this.multipleSelection
      });
      this.$notify({
        title: "命令已发出",
        message: "已成功向各个远程主机发布命令，具体操作可能略有延时，请稍等一段时间后查看结果"
      });
    },
    async batStop() {
      if (this.multipleSelection.length == 0)
        return ElMessage.error("无法执行，请至少选择一个实例");
      await axios.request({
        method: "POST",
        url: `${API_URL}/api/instance/multi_stop/`,
        data: this.multipleSelection
      });
      this.$notify({
        title: "命令已发出",
        message: "已成功向各个远程主机发布命令，具体操作可能略有延时，请稍等一段时间后查看结果"
      });
    },
    batKill() {
      console.log("Kill:", this.multipleSelection);
    }
  },
  components: { Panel, LineLabel }
};
</script>

<style>
.instance-table-warpper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
</style>
