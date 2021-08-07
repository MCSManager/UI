<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-18 14:32:17
 * @LastEditTime: 2021-07-28 15:21:30
 * @Description: 
-->
<template>
  <el-row :gutter="20">
    <!-- 左侧用户数据栏 -->
    <el-col :md="16" :offset="0">
      <Panel style="height: 120px">
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
                <p class="overview-info-title">忙碌（离线/不可用）</p>
                <p class="overview-info-value color-red">{{ this.info.unknown }}</p>
              </div>
            </el-col>
            <el-col :md="6" :offset="0"></el-col>
          </el-row>
        </template>
      </Panel>

      <Panel style="height: 100px">
        <template #title>快捷链接</template>
        <template #default>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="/"><i class="el-icon-link"></i>用户手册</a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="/"><i class="el-icon-link"></i>接口文档</a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="/"><i class="el-icon-link"></i>常见问题</a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="/"><i class="el-icon-link"></i>错误报告</a>
              </div>
            </el-col>
          </el-row>
        </template>
      </Panel>
    </el-col>

    <!-- 右侧用户信息栏 -->
    <el-col :md="8" :offset="0">
      <Panel style="height: 240px">
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
            <template #default>普通用户</template>
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
        <el-table-column label="运行状态" width="80">
          <template #default="scope">
            {{ statusToText(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="到期时间">
          <template #default="scope">
            {{ String(scope.row.endTime || "").split("T")[0] }}
          </template>
        </el-table-column>
        <el-table-column label="流编码">
          <template #default="scope"> {{ scope.row.ie }}/{{ scope.row.oe }} </template>
        </el-table-column>
        <el-table-column prop="lastDatetime" label="最后启动" width="120"></el-table-column>

        <el-table-column label="操作" style="text-align: center" width="180">
          <template #default="scope">
            <el-button size="small" @click="toEditInstance(scope.row)"> 编辑 </el-button>
            <el-button
              size="small"
              @click="toInstance(scope.row.serviceUuid, scope.row.instanceUuid)"
            >
              管理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

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
          <el-input v-model="editInstance.instance.ie" size="small" style="width: 40%"></el-input>
          <el-input v-model="editInstance.instance.oe" size="small" style="width: 40%"></el-input>
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
        console.log("普通用户界面 详细实例信息:", data);
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
      console.log(instance);
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

<style></style>
