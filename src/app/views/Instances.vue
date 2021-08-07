<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-08-02 16:01:29
 * @Description: 
-->

<template>
  <Panel>
    <template #title>分布式服务状态</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :span="6">
          <LineLabel size="small">
            <template #title>在线远程服务: </template>
            <template #default> {{ availableService.length }} 个 </template>
          </LineLabel>
        </el-col>
        <el-col :span="6">
          <LineLabel size="small">
            <template #title>离线远程服务: </template>
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

  <Panel v-loading="loading">
    <template #title>分布式应用实例列表</template>
    <template #default>
      <div class="instance-table-warpper">
        <div>
          <el-select v-model="currentRemoteUuid" filterable placeholder="请选择远程服务地址" size="small" style="margin-right: 10px" @change="remoteSelectHandle">
            <el-option v-for="item in remoteList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="query.instanceName" placeholder="实例名称" size="small" style="width: 180px; margin-right: 10px"></el-input>
          <el-button size="small" type="success" @click="refresh">
            <i class="el-icon-refresh"></i> 刷新
          </el-button>
        </div>
        <div>
          <el-button size="small" type="success" @click="toNewInstance">
            <i class="el-icon-plus"></i> 新建实例
          </el-button>
          <el-button size="small" type="primary" @click="batOpen">
            <i class="el-icon-video-play"></i> 开启
          </el-button>
          <el-button size="small" type="primary" @click="batStop">
            <i class="el-icon-video-pause"></i> 关闭
          </el-button>
          <el-button size="small" type="primary" @click="batKill">
            <i class="el-icon-video-pause"></i> 终止
          </el-button>
          <el-button size="small" type="danger" @click="batDelete">
            <i class="el-icon-delete"></i> 删除
          </el-button>
        </div>
      </div>

      <div class="instance-table-warpper">
        <div></div>
        <div>
          <el-pagination background layout="prev, pager, next" :total="maxPage" v-model:currentPage="page" :page-size="1" @current-change="handleCurrentChange" small></el-pagination>
        </div>
      </div>

      <el-table :data="instances" stripe style="width: 100%" size="mini" ref="multipleTable" @selection-change="selectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="nickname" label="实例昵称" min-width="240"></el-table-column>
        <el-table-column prop="status" label="运行状态" width="120"></el-table-column>
        <el-table-column prop="type" label="实例类型" width="140"></el-table-column>
        <el-table-column label="操作" style="text-align: center" width="180">
          <template #default="scope">
            <el-button size="mini" @click="editInstance(scope.row.serviceUuid, scope.row.instanceUuid)">
              编辑
            </el-button>
            <el-button size="mini" @click="toInstance(scope.row.serviceUuid, scope.row.instanceUuid)">
              管理
            </el-button>
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
import { API_INSTANCE, API_SERVICE_INSTANCES, API_SERVICE_LIST, API_URL } from "../service/common";
import router from "../router";
import { request } from "../service/protocol";
import { statusCodeToText, typeTextToReadableText } from "../service/instance_tools";
export default {
  components: { Panel, LineLabel },
  data() {
    return {
      remoteList: [],
      currentRemoteUuid: null,
      instances: [],
      multipleSelection: [], // 表格多选属性
      startedInstance: 0,
      loading: false,
      availableService: [], // 可用和不可用远程服务列表
      unavailableService: [],

      page: 1,
      maxPage: 1,

      query: {
        instanceName: ""
      }
    };
  },
  async mounted() {
    await this.render();
  },
  beforeUnmount() {},
  methods: {
    // 获取分布式服务列表（不包括具体实例列表）
    async displayRemoteServiceList() {
      const data = await request({
        method: "GET",
        url: API_SERVICE_LIST
      });
      for (const service of data) {
        if (service.available) {
          const ip = `${service.ip}:${service.port}`;
          this.remoteList.push({
            value: service.uuid,
            label: ip
          });
          this.availableService.push(service);
        } else {
          const ip = `${service.ip}:${service.port}`;
          this.remoteList.push({
            value: service.uuid,
            label: `${ip} (离线)`
          });
          this.unavailableService.push(service);
        }
      }

      // 如果存在上次的选择记录，那么直接跳转到上次记录
      const lastSelected = localStorage.getItem("pageSelectedRemoteUuid");
      if (lastSelected) {
        this.remoteList.forEach((v) => {
          if (v.value === lastSelected) {
            this.currentRemoteUuid = v.value;
            return this.remoteSelectHandle();
          }
        });
      }
    },
    // 获取分布式服务具体实例列表
    async remoteSelectHandle() {
      try {
        if (!this.currentRemoteUuid) throw new Error("还未选择远程服务器");
        this.startedInstance = 0;
        this.instances = [];
        const result = await request({
          method: "GET",
          url: API_SERVICE_INSTANCES,
          params: {
            remote_uuid: this.currentRemoteUuid,
            page: this.page,
            page_size: 40,
            instance_name: this.query.instanceName
          }
        });
        // 页码调整
        this.page = result.page;
        this.maxPage = result.maxPage;
        const instances = result.data;
        instances.forEach((instance) => {
          const status = statusCodeToText(instance.status);
          const type = typeTextToReadableText(instance.config.type);
          // 计算正在运行的实例
          if (instance.status != 0) this.startedInstance++;
          // 压入所有实例
          this.instances.push({
            instanceUuid: instance.instanceUuid,
            serviceUuid: this.currentRemoteUuid,
            nickname: instance.config.nickname,
            type,
            status
          });
        });
        // 记录当前选择的远程服务，方便下次直接加载
        localStorage.setItem("pageSelectedRemoteUuid", this.currentRemoteUuid);
      } catch (error) {
        this.$notify({
          title: "访问远程服务异常",
          message: error.toString(),
          type: "error"
        });
      }
    },
    // 分页改变
    handleCurrentChange() {
      this.refresh();
    },
    refresh() {
      this.remoteSelectHandle();
    },
    async render() {
      await this.displayRemoteServiceList();
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
    // 批量删除
    async batDelete() {
      const uuids = [];
      for (const iterator of this.multipleSelection) {
        uuids.push(iterator.instanceUuid);
      }
      await axios.request({
        method: "DELETE",
        url: API_INSTANCE,
        params: {
          remote_uuid: this.currentRemoteUuid
        },
        data: { uuids }
      });
      this.$notify({
        title: "批量删除成功",
        message: "可能会存在一定延迟，文件删除需要一定的时间"
      });
      console.log("Delete:", this.multipleSelection);
    },
    async batKill() {
      if (this.multipleSelection.length == 0)
        return ElMessage.error("无法执行，请至少选择一个实例");
      await axios.request({
        method: "POST",
        url: `${API_URL}/api/instance/multi_kill/`,
        data: this.multipleSelection
      });
      this.$notify({
        title: "终止命令已发出",
        message: "已成功向各个远程主机发布命令，具体操作可能略有延时，请稍等一段时间后查看结果"
      });
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
        title: "开启命令已发出",
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
        title: "关闭命令已发出",
        message: "已成功向各个远程主机发布命令，具体操作可能略有延时，请稍等一段时间后查看结果"
      });
    }
  }
};
</script>
