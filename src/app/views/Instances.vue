<!--
  Copyright (C) 2022 Suwings <Suwings@outlook.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  According to the AGPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings <Suwings@outlook.com>

  该程序是免费软件，您可以重新分发和/或修改据 GNU Affero 通用公共许可证的条款，
  由自由软件基金会，许可证的第 3 版，或（由您选择）任何更高版本。

  根据 AGPL 与用户协议，您必须保留所有版权声明，如果修改源代码则必须开源修改后的源代码。
  可以前往 https://mcsmanager.com/ 阅读用户协议，申请闭源开发授权等。
-->

<template>
  <Panel>
    <template #title>{{ $t("instances.instancesList") }}</template>
    <template #default>
      <el-row :gutter="20" justify="space-between" class="row-mb">
        <el-col :md="12" :offset="0">
          <ItemGroup>
            <el-select
              style="width: 320px"
              v-model="currentRemoteUuid"
              filterable
              :placeholder="$t('instances.selectDaemon')"
              size="small"
              @change="remoteSelectHandle"
            >
              <el-option
                v-for="item in remoteList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-model="query.instanceName"
              :placeholder="$t('instances.selectDaemon')"
              size="small"
              style="width: 160px"
            ></el-input>
            <el-button size="small" @click="refresh" type="primary">
              <i class="el-icon-refresh"></i> {{ $t("general.search") }}
            </el-button>
          </ItemGroup>
        </el-col>
        <el-col :md="12" :offset="0">
          <ItemGroup style="text-align: right">
            <el-button
              type="primary"
              size="small"
              plain
              @click="changeView(1)"
              v-show="showTableList"
              >{{ $t("instances.showCardList") }}</el-button
            >
            <el-button
              type="primary"
              size="small"
              plain
              @click="changeView(2)"
              v-show="!showTableList"
              >{{ $t("instances.showTableList") }}</el-button
            >
            <el-button size="small" type="success" @click="toNewInstance">
              <i class="el-icon-plus"></i> {{ $t("instances.newInstance") }}
            </el-button>
            <el-button size="small" @click="batOpen" v-if="showTableList">
              <i class="el-icon-video-play"></i> {{ $t("instances.start") }}
            </el-button>
            <el-button size="small" @click="batStop" v-if="showTableList">
              <i class="el-icon-video-pause"></i> {{ $t("instances.stop") }}
            </el-button>
            <el-button size="small" @click="batKill" v-if="showTableList">
              <i class="el-icon-video-pause"></i> {{ $t("instances.kill") }}
            </el-button>
            <el-button size="small" type="danger" plain @click="batDelete(1)" v-if="showTableList">
              <i class="el-icon-delete"></i> {{ $t("instances.remove") }}
            </el-button>
            <el-button size="small" type="danger" @click="batDelete(2)" v-if="showTableList">
              <i class="el-icon-delete"></i> {{ $t("instances.delete") }}
            </el-button>
          </ItemGroup>
        </el-col>
      </el-row>

      <div>
        <div class="instance-table-warpper">
          <div>
            <div class="color-red" v-if="!currentRemoteUuid">
              &nbsp;Error: {{ $t("instances.selectRemoteError") }}
            </div>
          </div>
          <div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="maxPage"
              v-model:currentPage="page"
              :page-size="1"
              @current-change="handleCurrentChange"
              small
            ></el-pagination>
          </div>
        </div>

        <!-- 未选择守护进程时显示 -->
        <div v-show="!currentRemoteUuid">
          <div class="notAnyInstanceTip">
            <i class="el-icon-guide" style="font-size: 190px"></i>
            <div class="sub-title">
              <div class="sub-title-title">{{ $t("instances.selectRemoteTitle") }}</div>
              <div class="sub-title-info">
                {{ $t("instances.selectRemoteInfo") }}
              </div>
            </div>
          </div>
        </div>

        <!-- 第一页且无任何数据时显示 -->
        <div v-show="notAnyInstance && page === 1">
          <div class="notAnyInstanceTip">
            <i class="el-icon-truck" style="font-size: 190px"></i>
            <div class="sub-title">
              <div class="sub-title-title">{{ $t("instances.notAnyInstanceTitle") }}</div>
              <div class="sub-title-info">
                {{ $t("instances.notAnyInstanceInfo") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Panel>

  <!-- 卡片显示风格 -->
  <el-row :gutter="20" class="row-mb" v-show="!showTableList">
    <el-col :md="6" :offset="0" v-for="(item, index) in instances" :key="index">
      <Panel
        :class="{
          instanceStatusGreen: item.status === 3,
          instanceStatusGray: item.status !== 3,
          CradInstance: true
        }"
        :tipType="0"
      >
        <template #title>
          <span style="font-size: 13px" class="only-line-text">
            {{ item.nickname }}
          </span>
        </template>
        <template #rtitle>
          <div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i
                  class="el-icon-more-outline"
                  style="font-weight: 400; color: #409eff; font-size: 18px"
                ></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <!-- <el-dropdown-item>开启实例</el-dropdown-item>
                  <el-dropdown-item>关闭实例</el-dropdown-item>
                  <el-dropdown-item>重启实例</el-dropdown-item>
                  <el-dropdown-item>终止实例</el-dropdown-item> -->
                  <el-dropdown-item @click="editInstance(item.serviceUuid, item.instanceUuid)">{{
                    $t("instances.card.editConfig")
                  }}</el-dropdown-item>
                  <el-dropdown-item @click="toInstance(item.serviceUuid, item.instanceUuid)">{{
                    $t("instances.card.controlPanel")
                  }}</el-dropdown-item>
                  <el-dropdown-item @click="unlinkInstance(item.instanceUuid)">{{
                    $t("instances.card.remove")
                  }}</el-dropdown-item>
                  <el-dropdown-item @click="unlinkInstance(item.instanceUuid, true)">{{
                    $t("instances.card.delete")
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        <template #default>
          <div
            class="instanceInfoArea only-line-text"
            @click="toInstance(item.serviceUuid, item.instanceUuid)"
          >
            <div>
              {{ $t("instances.status.title") }}：
              <span class="color-gray" v-if="item.status == 0">{{
                $t("instances.status.die")
              }}</span>
              <span class="color-green" v-else-if="item.status == 3">{{
                $t("instances.status.running")
              }}</span>
              <span class="color-yellow" v-else-if="item.status == 1">{{
                $t("instances.status.stopping")
              }}</span>
              <span class="color-yellow" v-else-if="item.status == 2">{{
                $t("instances.status.starting")
              }}</span>
              <span class="color-red" v-else-if="item.status == -1">{{
                $t("instances.status.busy")
              }}</span>
              <span class="color-red" v-else>{{ $t("instances.status.busy") }}</span>
            </div>
            <div>
              <span>{{ $t("instances.lastDatetime") }}：</span>
              <span>{{ item.config.lastDatetime }}</span>
            </div>
            <div>
              <span>{{ $t("instances.endTime") }}：</span>
              <span>{{ item.config.endTime }}</span>
            </div>
            <div>
              <span>{{ $t("instances.otherInfo") }}：</span>
              <span>
                <span v-if="item.info && item.info.currentPlayers >= 0">
                  {{ $t("instances.playerCount") }} {{ item.info.currentPlayers }}/{{
                    item.info.maxPlayers
                  }}
                </span>
                <span v-else-if="item.info && item.version">
                  &nbsp;{{ $t("instances.mcVersion") }} {{ item.version }}
                </span>
                <span v-else></span>
              </span>
            </div>
          </div>
          <div class="InstanceFunctionArea"></div>
        </template>
      </Panel>
    </el-col>
  </el-row>

  <!-- 表格显示风格 -->
  <el-row :gutter="20" class="row-mb" v-show="showTableList">
    <el-col :span="24" :offset="0">
      <Panel>
        <template #title>{{ $t("instances.table.instancesList") }}</template>
        <template #default>
          <!-- 表格显示 -->
          <el-table
            :data="instances"
            stripe
            style="width: 100%"
            size="mini"
            ref="multipleTable"
            @selection-change="selectionChange"
            v-show="!notAnyInstance && currentRemoteUuid && showTableList"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="nickname" :label="$t('instances.instanceName')" min-width="240">
              <template #default="scope">
                <div
                  @click="toInstance(scope.row.serviceUuid, scope.row.instanceUuid)"
                  class="instanceTitle"
                >
                  {{ scope.row.nickname }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="currentPlayers" :label="$t('instances.detailsInfo')" width="240">
              <template #default="scope">
                <div>
                  <span v-if="scope.row.info && scope.row.info.currentPlayers >= 0">
                    {{ $t("instances.playerCount") }}: {{ scope.row.info.currentPlayers }}/{{
                      scope.row.info.maxPlayers
                    }}
                  </span>
                  <span v-if="scope.row.info && scope.row.version">
                    &nbsp;{{ $t("instances.mcVersion") }}: {{ scope.row.version }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" :label="$t('instances.status.runStatus')" width="120">
              <template #default="scope">
                <div class="color-gray" v-if="scope.row.status == 0">
                  <i class="el-icon-video-pause"></i>
                  <span> {{ $t("instances.status.die") }}</span>
                </div>
                <div class="color-green" v-else-if="scope.row.status == 3">
                  <i class="el-icon-video-play"></i>
                  <span> {{ $t("instances.status.running") }}</span>
                </div>
                <span class="color-yellow" v-else-if="scope.row.status == 1">{{
                  $t("instances.status.stopping")
                }}</span>
                <span class="color-yellow" v-else-if="scope.row.status == 2">{{
                  $t("instances.status.starting")
                }}</span>

                <span class="color-red" v-else-if="scope.row.status == -1">{{
                  $t("instances.status.budy")
                }}</span>
                <span class="color-red" v-else>{{ $t("instances.status.budy") }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              :label="$t('instances.table.instanceType')"
              width="140"
            ></el-table-column>
            <el-table-column :label="$t('general.operate')" style="text-align: center" width="180">
              <template #default="scope">
                <el-button
                  size="mini"
                  @click="editInstance(scope.row.serviceUuid, scope.row.instanceUuid)"
                >
                  {{ $t("general.setting") }}
                </el-button>
                <el-button
                  size="mini"
                  @click="toInstance(scope.row.serviceUuid, scope.row.instanceUuid)"
                >
                  {{ $t("general.manage") }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </Panel>
    </el-col>
  </el-row>
</template>

<style scoped>
.instanceTitle {
  cursor: pointer;
}

.instanceTitle:hover {
  color: rgb(20, 128, 230);
}
.notAnyInstanceTip {
  text-align: center;
  margin: 100px 0px;
}

.instanceStatusGreen {
  border-left: 4px solid rgb(8, 166, 8);
}

.instanceStatusGray {
  border-left: 4px solid rgb(175, 175, 175);
}

.CradInstance {
  overflow: hidden;
  cursor: pointer;
  transition: all 1s;
  height: 146px;
}
.CradInstance:hover {
  border-right: 1px solid #409eff;
  border-top: 1px solid #409eff;
  border-bottom: 1px solid #409eff;
  border-left: 4px solid #409eff;
}
.instanceInfoArea > * {
  margin-bottom: 6px;
}
</style>

<script>
import { CircleCheckFilled, CircleCloseFilled } from "@element-plus/icons";
import Panel from "../../components/Panel";
// import LineLabel from "../../components/LineLabel";
import { ElMessage } from "element-plus";
import axios from "axios";
import { API_INSTANCE, API_SERVICE_INSTANCES, API_SERVICE_LIST, API_URL } from "../service/common";
import router from "../router";
import { request } from "../service/protocol";
import { typeTextToReadableText } from "../service/instance_tools";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Panel, CircleCheckFilled, CircleCloseFilled },
  data() {
    return {
      remoteList: [],
      currentRemoteUuid: null,
      instances: [],
      multipleSelection: [], // 表格多选属性
      startedInstance: 0,
      loading: true,
      availableService: [], // 可用和不可用守护进程列表
      unavailableService: [],

      notAnyInstance: false, // 无任何实例

      page: 1,
      maxPage: 1,

      query: {
        instanceName: ""
      },

      // 批量处理模式
      showTableList: false
    };
  },
  async mounted() {
    // 初始化数据读取
    this.showTableList = Number(localStorage.getItem("InstanceView")) === 2 ? true : false;
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
        const ip = `${service.ip}:${service.port}`;
        const remarks = `${service.remarks}`;
        if (service.available) {
          this.remoteList.push({
            value: service.uuid,
            label: `${ip} ${remarks}`,
            available: true
          });
          this.availableService.push(service);
        } else {
          this.remoteList.push({
            value: service.uuid,
            label: `${ip} ${remarks} ( ` + this.$t("overview.offline") + " )",
            available: false
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
      } else {
        this.remoteList.forEach((v) => {
          if (v.available) {
            // 默认取第一个开启的实例
            this.currentRemoteUuid = v.value;
            return;
          }
        });
        this.remoteSelectHandle();
      }
    },
    // 获取守护进程具体实例列表
    async remoteSelectHandle() {
      try {
        if (!this.currentRemoteUuid) throw new Error(this.$t("instances.selectRemoteError"));
        this.startedInstance = 0;
        this.instances = [];
        this.loading = true;
        const result = await request({
          method: "GET",
          url: API_SERVICE_INSTANCES,
          params: {
            remote_uuid: this.currentRemoteUuid,
            page: this.page,
            page_size: 20,
            instance_name: this.query.instanceName
          }
        });
        // 页码调整
        this.page = result.page;
        this.maxPage = result.maxPage;
        const instances = result.data;
        instances.forEach((instance) => {
          const status = instance.status;
          const type = typeTextToReadableText(instance.config.type);
          // 计算正在运行的实例
          if (instance.status != 0) this.startedInstance++;
          // 压入所有实例
          this.instances.push({
            instanceUuid: instance.instanceUuid,
            serviceUuid: this.currentRemoteUuid,
            nickname: instance.config.nickname,
            info: instance.info,
            currentPlayers: instance.info ? instance.info.currentPlayers : "0",
            version: instance.info ? instance.info.version : "",
            config: instance.config,
            type,
            status
          });
        });
        console.log(this.instances);
        this.loading = false;
        // 记录当前选择的守护进程，方便下次直接加载
        localStorage.setItem("pageSelectedRemoteUuid", this.currentRemoteUuid);

        // 无任何实例时，显示快速创建界面
        if (this.instances.length === 0) {
          this.notAnyInstance = true;
        } else {
          this.notAnyInstance = false;
        }
      } catch (error) {
        this.$notify({
          title: this.$t("notify.connectDaemonErrorr"),
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
      console.log("Edit Instances:", serviceUuid, instanceUuid);
      router.push({ path: `/instance_detail/${serviceUuid}/${instanceUuid}/` });
    },
    toNewInstance() {
      if (!this.currentRemoteUuid) {
        return this.$message({ type: "info", message: this.$t("instances.selectRemoteTitle") });
      }
      router.push({ path: `/new_instace/${this.currentRemoteUuid}` });
    },
    toInstance(serviceUuid, instanceUuid) {
      console.log("View Instance:", serviceUuid, instanceUuid);
      router.push({ path: `/terminal/${serviceUuid}/${instanceUuid}/` });
    },
    async unlinkInstance(uuid, deleteFile = false) {
      await this.$confirm(this.$t("notify.confirmDelContent"), this.$t("notify.confirmDelTitle"), {
        confirmButtonText: this.$t("general.confirm"),
        cancelButtonText: this.$t("general.cancel"),
        type: "warning"
      });
      await axios.request({
        method: "DELETE",
        url: API_INSTANCE,
        params: {
          remote_uuid: this.currentRemoteUuid
        },
        data: { uuids: [uuid], deleteFile }
      });
      this.$notify({
        title: this.$t("notify.delSuccess"),
        message: this.$t("notify.Success")
      });
    },
    // 批量删除
    async batDelete(type) {
      if (type === 1) {
        await this.$confirm(
          this.$t("notify.confirmBatchDelContent"),
          this.$t("notify.confirmDelTitle"),
          {
            confirmButtonText: this.$t("general.confirm"),
            cancelButtonText: this.$t("general.cancel"),
            type: "warning"
          }
        );
      } else {
        await this.$confirm(
          this.$t("notify.confirmBatchDelFileContent"),
          this.$t("notify.confirmDelTitle"),
          {
            confirmButtonText: this.$t("general.confirm"),
            cancelButtonText: this.$t("general.cancel"),
            type: "warning"
          }
        );
      }

      const uuids = [];
      for (const iterator of this.multipleSelection) {
        uuids.push(iterator.instanceUuid);
      }
      if (uuids.length === 0) {
        return this.$message({ type: "error", message: this.$t("instances.selectOne") });
      }
      await axios.request({
        method: "DELETE",
        url: API_INSTANCE,
        params: {
          remote_uuid: this.currentRemoteUuid
        },
        data: { uuids, deleteFile: type === 1 ? false : true }
      });
      this.$notify({
        title: this.$t("notify.batchDelSuccess"),
        message: this.$t("notify.mayBeDelay")
      });
    },
    async batKill() {
      if (this.multipleSelection.length == 0)
        return ElMessage.error(this.$t("notify.selectInsError"));
      await axios.request({
        method: "POST",
        url: `${API_URL}/api/instance/multi_kill/`,
        data: this.multipleSelection
      });
      this.$notify({
        title: this.$t("notify.killCmdSend"),
        message: this.$t("notify.cmdSendInfo")
      });
    },
    async batOpen() {
      if (this.multipleSelection.length == 0)
        return ElMessage.error(this.$t("notify.selectInsError"));
      await axios.request({
        method: "POST",
        url: `${API_URL}/api/instance/multi_open/`,
        data: this.multipleSelection
      });
      this.$notify({
        title: this.$t("notify.startCmdSend"),
        message: this.$t("notify.cmdSendInfo")
      });
    },
    async batStop() {
      if (this.multipleSelection.length == 0)
        return ElMessage.error(this.$t("notify.selectInsError"));
      await axios.request({
        method: "POST",
        url: `${API_URL}/api/instance/multi_stop/`,
        data: this.multipleSelection
      });
      this.$notify({
        title: this.$t("notify.stopCmdSend"),
        message: this.$t("notify.cmdSendInfo")
      });
    },
    changeView(type = 1) {
      if (type === 1) this.showTableList = false;
      if (type === 2) this.showTableList = true;
      localStorage.setItem("InstanceView", type);
    }
  }
};
</script>
