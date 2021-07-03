<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-02 18:53:24
 * @Description: 
-->

<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <Panel>
        <template #title>应用实例列表</template>
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
          <p class="row-mb">
            列表只包含成功连接的守护进程中所有实例，其中有 4
            个远程主机无法成功链接，请到“分布式服务”查看详情。
          </p>
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
            <el-table-column prop="nickname" label="实例昵称" width="260"></el-table-column>
            <el-table-column prop="status" label="运行状态" width="120"></el-table-column>
            <el-table-column prop="type" label="实例类型"></el-table-column>
            <el-table-column prop="ip" label="来自于"></el-table-column>
            <el-table-column label="操作" style="text-align: center">
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
    </el-col>
  </el-row>
</template>

<script>
import Panel from "../../components/Panel";
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
      multipleSelection: [] // 表格多选属性
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
        }, 2000);
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
      const remoteObjects = result.data.data;
      remoteObjects.forEach((v) => {
        const fromIP = v.ip;
        const fromPort = v.port;
        const instances = v.instances;
        const serviceUuid = v.uuid;
        // const available = v.available;
        let statusText = null;
        this.instances = [];
        instances.forEach((instance) => {
          //Busy=-1;Stop=0;Stopping=1;Starting=2;Running=3;
          if (instance.status == -1) statusText = "忙碌";
          if (instance.status == 0) statusText = "未运行";
          if (instance.status == 1) statusText = "停止中";
          if (instance.status == 2) statusText = "启动中";
          if (instance.status == 3) statusText = "正在运行";
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
  components: { Panel }
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
