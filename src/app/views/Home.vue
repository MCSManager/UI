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
  
  According to the GPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。

  根据协议，您必须保留所有版权声明，如果修改源码则必须开源修改后的源码。
  前往 https://mcsmanager.com/ 申请闭源开发授权或了解更多。
-->

<template>
  <el-row :gutter="20">
    <!-- 左侧用户数据栏 -->
    <el-col :md="16" :offset="0">
      <Panel style="min-height: 120px">
        <template #title>数据总览</template>
        <template #default>
          <el-row :gutter="20">
            <el-col :xs="12" :md="6" :offset="0">
              <div class="overview-info-warpper">
                <p class="overview-info-title">实例总计</p>
                <p class="overview-info-value color-green">{{ this.info.total }}</p>
              </div>
            </el-col>
            <el-col :xs="12" :md="6" :offset="0">
              <div class="overview-info-warpper">
                <p class="overview-info-title">正在运行</p>
                <p class="overview-info-value color-green">{{ this.info.running }}</p>
              </div>
            </el-col>
            <el-col :xs="12" :md="6" :offset="0">
              <div class="overview-info-warpper">
                <p class="overview-info-title">未运行</p>
                <p class="overview-info-value color-green">{{ this.info.stopped }}</p>
              </div>
            </el-col>
            <el-col :xs="12" :md="6" :offset="0">
              <div class="overview-info-warpper">
                <p class="overview-info-title">离线/不可用</p>
                <p class="overview-info-value color-red">{{ this.info.unknown }}</p>
              </div>
            </el-col>
            <el-col :md="6" :offset="0"></el-col>
          </el-row>
        </template>
      </Panel>

      <Panel style="min-height: 120px">
        <template #title>快捷链接</template>
        <template #default>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="https://guide.mcsmanager.com/"
                  ><i class="el-icon-link"></i> 用户手册</a
                >
              </div>
            </el-col>
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="https://docs.mcsmanager.com/"
                  ><i class="el-icon-link"></i> 接口文档</a
                >
              </div>
            </el-col>
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="https://guide.mcsmanager.com/"
                  ><i class="el-icon-link"></i> 常见问题</a
                >
              </div>
            </el-col>
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="https://github.com/Suwings/MCSManager/wiki"
                  ><i class="el-icon-link"></i> 维基百科</a
                >
              </div>
            </el-col>
          </el-row>
        </template>
      </Panel>
    </el-col>

    <!-- 右侧用户信息栏 -->
    <el-col :md="8" :offset="0">
      <Panel style="min-height: 240px">
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
            <span class="color-red" v-else-if="scope.row.status == -1">离线</span>
            <span class="color-red" v-else>离线</span>
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
      <span>MCSManager is released under the GPL-3.0 License</span>
      <br />
      <span>Copyright © 2021 Suwings</span>
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

<script>
import Dialog from "../../components/Dialog";
import Panel from "../../components/Panel";
import LineLabel from "../../components/LineLabel";
import { request, requestUserInfo } from "../service/protocol";
import { API_INSTANCE_LOW_PERMISSION_PUT } from "../service/common";
import { statusCodeToText } from "../service/instance_tools";
export default {
  components: { Panel, LineLabel, Dialog },
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
