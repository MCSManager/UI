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
  <el-row :gutter="20">
    <!-- 左侧用户数据栏 -->
    <el-col :md="16" :offset="0">
      <el-row :gutter="20">
        <el-col :xs="12" :md="6" :offset="0">
          <ValueCard
            title="实例总计"
            sub-title="管理员所分配给您的所有实例总数"
            :value="this.info.total"
            style="height: 260px"
            font-class="el-icon-s-data"
          >
          </ValueCard>
        </el-col>
        <el-col :xs="12" :md="6" :offset="0">
          <ValueCard
            title="正在运行"
            sub-title="实例正在运行中的数量"
            :value="this.info.running"
            style="height: 260px"
            font-class="el-icon-s-promotion"
          >
          </ValueCard>
        </el-col>
        <el-col :xs="12" :md="6" :offset="0">
          <ValueCard
            title="未运行"
            sub-title="实例未处于运行中的数量"
            :value="this.info.stopped"
            style="height: 260px"
            font-class="el-icon-s-flag"
          >
          </ValueCard>
        </el-col>
        <el-col :xs="12" :md="6" :offset="0">
          <ValueCard
            title="维护中"
            sub-title="因主机忙碌/维护而暂时不可使用的实例数"
            :value="this.info.unknown"
            style="height: 260px"
            font-class="el-icon-s-opportunity"
          >
          </ValueCard>
        </el-col>
      </el-row>
    </el-col>

    <!-- 右侧用户信息栏 -->
    <el-col :md="8" :offset="0">
      <Panel style="height: 260px">
        <template #title>个人信息</template>
        <template #default>
          <LineLabel space="small">
            <template #title>UID</template>
            <template #default>{{ userInfo.uuid }}</template>
          </LineLabel>
          <LineLabel space="small">
            <template #title>用户昵称</template>
            <template #default>{{ userInfo.userName }}</template>
          </LineLabel>
          <LineLabel space="small">
            <template #title>注册时间</template>
            <template #default>{{ userInfo.registerTime }}</template>
          </LineLabel>
          <LineLabel space="small">
            <template #title>最后登录</template>
            <template #default>{{ userInfo.loginTime }}</template>
          </LineLabel>
          <LineLabel space="small">
            <template #title>权限</template>
            <template #default>{{ userInfo.permission >= 10 ? "管理用户" : "普通用户" }}</template>
          </LineLabel>
        </template>
      </Panel>
    </el-col>
  </el-row>

  <Panel>
    <template #title>拥有的实例列表</template>
    <template #default>
      <el-table
        :data="userInfo.instances"
        stripe
        style="width: 100%"
        size="mini"
        v-loading="info.loading"
      >
        <el-table-column prop="nickname" label="实例昵称" min-width="240"></el-table-column>
        <el-table-column label="运行状态">
          <template #default="scope">
            <div class="color-gray" v-if="scope.row.status == 0">
              <i class="el-icon-video-pause"></i>
              <span> 未运行</span>
            </div>
            <div class="color-green" v-else-if="scope.row.status == 3">
              <i class="el-icon-video-play"></i>
              <span> 运行中</span>
            </div>
            <span class="color-yellow" v-else-if="scope.row.status == 1">停止中</span>
            <span class="color-yellow" v-else-if="scope.row.status == 2">启动中</span>
            <span class="color-red" v-else-if="scope.row.status == -1">维护中</span>
            <span class="color-red" v-else>未知状态</span>
            <!-- {{ statusToText(scope.row.status) }} -->
          </template>
        </el-table-column>

        <el-table-column label="字节流编码">
          <template #default="scope"> {{ scope.row.ie }}/{{ scope.row.oe }} </template>
        </el-table-column>
        <el-table-column prop="lastDatetime" label="最后启动"></el-table-column>
        <el-table-column label="到期时间">
          <template #default="scope">
            {{ String(scope.row.endTime || "").split("T")[0] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align: center" width="180">
          <template #default="scope">
            <el-button
              size="small"
              @click="toEditInstance(scope.row)"
              :disabled="scope.row.status == -1"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              @click="toInstance(scope.row.serviceUuid, scope.row.instanceUuid)"
              :disabled="scope.row.status == -1"
            >
              管理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <!-- 版权信息 -->
  <div
    class="flex flex-space-center flex-align-items-center"
    style="font-size: 12px; color: #cdcdcd; text-align: center; margin-top: 40px"
  >
    <div>
      <span>MCSManager is released under the AGPL-3.0 License</span>
      <br />
      <span>Copyright © 2022 Suwings</span>
    </div>
  </div>

  <!-- 实例详情编辑框 -->
  <Dialog v-model="editInstance.is">
    <template #title>实例参数编辑</template>
    <template #default>
      <div>
        <div class="sub-title">
          <p class="sub-title-title">关闭命令</p>
          <p class="sub-title-info">执行“关闭”命令时所执行的实际命令</p>
        </div>
        <div class="flex">
          <el-input v-model="editInstance.instance.stopCommand" size="small"></el-input>
        </div>
        <div class="sub-title row-mt">
          <p class="sub-title-title">输入/输出编码</p>
          <p class="sub-title-info">当控制台出现乱码时可以尝试调整，列如: GBK，UTF-8 等</p>
        </div>
        <div class="flex">
          <ItemGroup :lr="true">
            <el-input v-model="editInstance.instance.ie" size="small" style="width: 40%"></el-input>
            <el-input v-model="editInstance.instance.oe" size="small" style="width: 40%"></el-input>
          </ItemGroup>
        </div>
        <div class="row-mt">
          <el-button type="success" size="small" @click="saveInstance">更新</el-button>
          <el-button @click="editInstance.is = !editInstance.is" size="small">关闭</el-button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style></style>

<script>
import Dialog from "../../components/Dialog";
import Panel from "../../components/Panel";
import ValueCard from "../../components/ValueCard";
import LineLabel from "../../components/LineLabel";
import { request, requestUserInfo } from "../service/protocol";
import { API_INSTANCE_LOW_PERMISSION_PUT } from "../service/common";
import { statusCodeToText } from "../service/instance_tools";
export default {
  components: { Panel, LineLabel, Dialog, ValueCard },
  data: function () {
    return {
      editInstance: {
        is: false,
        instance: {}
      },
      info: {
        loading: true,
        total: 0,
        running: 0,
        stopped: 0,
        unknown: 0
      },
      userInfo: {}
    };
  },
  methods: {
    async render() {
      try {
        this.info.loading = true;
        const data = await requestUserInfo(true);
        this.userInfo = data;
        await this.loadInfoPanel();
      } catch (error) {
        this.$notify({
          title: "数据加载出错",
          message: error.toString(),
          type: "error"
        });
      } finally {
        this.info.loading = false;
      }
    },
    async loadInfoPanel() {
      this.info = { total: 0, running: 0, stopped: 0, unknown: 0 };
      const instance = this.userInfo.instances;
      for (const iterator of instance) {
        this.info.total++;
        if (iterator.status === -1) this.info.unknown++;
        if (iterator.status === 0) this.info.stopped++;
      }
      this.info.running = this.info.total - this.info.unknown - this.info.stopped;
    },
    statusToText(code) {
      return statusCodeToText(code);
    },
    toInstance(serviceUuid, instanceUuid) {
      console.log("访问实例:", serviceUuid, instanceUuid);
      this.$router.push({ path: `/terminal/${serviceUuid}/${instanceUuid}/` });
    },
    toEditInstance(row) {
      this.editInstance.is = true;
      this.editInstance.instance = JSON.parse(JSON.stringify(row));
    },
    async saveInstance() {
      const row = this.editInstance.instance;
      try {
        await request({
          method: "PUT",
          url: API_INSTANCE_LOW_PERMISSION_PUT,
          params: {
            remote_uuid: row.serviceUuid,
            uuid: row.instanceUuid
          },
          data: row
        });
        this.$message({ type: "success", message: "更新成功" });
      } catch (error) {
        this.$message({ type: "error", message: `失败:${error.message}` });
      }
      this.editInstance.is = false;
      await this.render();
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>
