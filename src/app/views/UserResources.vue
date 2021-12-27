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
  

  版权所有 (C) 2021 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。
-->

<template>
  <Panel>
    <template #title>用户信息</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :span="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">UUID</p>
            <p class="overview-info-value" v-text="userInfo.uuid"></p>
          </div>
        </el-col>
        <el-col :span="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">名称</p>
            <p class="overview-info-value" v-text="userInfo.userName"></p>
          </div>
        </el-col>
        <el-col :span="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">注册时间</p>
            <p class="overview-info-value" v-text="userInfo.registerTime"></p>
          </div>
        </el-col>
        <el-col :span="6" :offset="0">
          <div class="overview-info-warpper">
            <p class="overview-info-title">拥有实例</p>
            <p class="overview-info-value" v-text="userInfo.instances.length"></p>
          </div>
        </el-col>
      </el-row>
    </template>
  </Panel>
  <Panel v-loading="loading">
    <template #title>用户资源管理</template>
    <template #default>
      <div class="sub-title row-mt">
        <p class="sub-title-title">用户资源表</p>
        <p class="sub-title-info">
          当前子用户可管理的所有实例，若实例状态显示“忙碌”代表此实例不存在或远程主机已经离线。
        </p>
      </div>
      <div class="row-mt">
        <ItemGroup>
          <el-button size="small" type="success" @click="openAddInstancePanel">
            <i class="el-icon-plus"></i> 分配实例
          </el-button>
          <el-button size="small" type="primary" @click="save">
            <i class="el-icon-document-checked"></i> 保存数据
          </el-button>
          <el-button size="small" @click="refresh">
            <i class="el-icon-refresh"></i> 刷新
          </el-button>
        </ItemGroup>
      </div>
      <div class="row-mt">
        <el-table :data="userInfo.instances" stripe style="width: 100%" size="small">
          <el-table-column label="远程服务节点">
            <template #default="{ row }"> {{ row.hostIp }}（{{ row.remarks }}） </template>
          </el-table-column>
          <el-table-column prop="nickname" label="实例名称" width="240"></el-table-column>
          <el-table-column label="到期时间">
            <template #default="scope">
              {{ String(scope.row.endTime || "").split("T")[0] }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              {{ statusToText(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" style="text-align: center">
            <template #default="scope">
              <el-button size="mini" @click="deleteInstance(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </Panel>

  <!-- 新增实例框 -->
  <Dialog v-model="isAddInstanceForUser">
    <template #title>为用户新增实例资源</template>
    <template #default>
      <div class="sub-title">
        <p class="sub-title-title">分配资源</p>
        <p class="sub-title-info">利用远程主机地址与模糊查询来为此用户增加应用实例</p>
      </div>
      <SelectInstance :callback="selectedInstance"></SelectInstance>
    </template>
  </Dialog>
</template>

<script>
import Panel from "../../components/Panel";
import Dialog from "../../components/Dialog";
import SelectInstance from "../../components/SelectInstance";
import { API_USER } from "../service/common";
import { request } from "../service/protocol";
import { statusCodeToText } from "../service/instance_tools";

export default {
  components: { Panel, SelectInstance, Dialog },
  data() {
    return {
      userUuid: this.$route.params.userUuid,
      userInfo: {
        instances: []
      },
      isAddInstanceForUser: false,
      loading: true
    };
  },
  methods: {
    openAddInstancePanel() {
      this.isAddInstanceForUser = true;
    },
    selectedInstance(row) {
      this.userInfo.instances.push({
        instanceUuid: row.instanceUuid,
        serviceUuid: row.serviceUuid,
        nickname: row.nickname,
        status: row.status,
        hostIp: row.hostIp
      });
      this.isAddInstanceForUser = false;
    },
    deleteInstance(row) {
      this.userInfo.instances.forEach((v, index) => {
        if (v.instanceUuid === row.instanceUuid) {
          this.userInfo.instances.splice(index, 1);
        }
      });
    },
    statusToText(code) {
      return statusCodeToText(code);
    },
    async save() {
      try {
        await request({
          method: "PUT",
          url: API_USER,
          data: {
            uuid: this.userUuid,
            config: this.userInfo
          }
        });
        this.$message({ type: "success", message: "更新成功" });
      } catch (error) {
        this.$message({
          type: "error",
          message: `错误: ${error.message}`
        });
      }
    },
    // 用户数据渲染
    async render() {
      const result = await request({
        method: "GET",
        url: API_USER,
        params: {
          uuid: this.userUuid,
          advanced: true
        }
      });
      this.userInfo = result;
      this.loading = false;
    },
    async refresh() {
      await this.render();
      this.$message({ type: "info", message: "已刷新" });
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>
