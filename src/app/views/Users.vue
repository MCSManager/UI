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
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <Panel>
          <template #title>用户列表</template>
          <template #default>
            <el-row :gutter="20" class="row-mb">
              <el-col :md="12" :offset="0" class="col-md-responsive">
                <el-input
                  v-model="query.userName"
                  type="text"
                  placeholder="根据名字搜索"
                  size="small"
                  style="width: 180px; margin-right: 10px"
                  autocomplete="off"
                  :readonly="readonly"
                  @focus="() => (readonly = false)"
                ></el-input>
                <el-button size="small" type="primary" @click="refresh">
                  <i class="el-icon-refresh"></i> 刷新/搜索
                </el-button>
              </el-col>
              <el-col :md="12" :offset="0" class="text-align-right col-md-responsive">
                <el-button size="small" type="success" @click="toNewUserPanel">
                  <i class="el-icon-plus"></i> 新建用户
                </el-button>
                <el-button size="small" type="danger" @click="deleteUser">
                  <i class="el-icon-delete"></i> 删除用户
                </el-button>
              </el-col>
            </el-row>

            <div class="instance-table-warpper">
              <div></div>
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

            <el-table
              :data="objects"
              stripe
              style="width: 100%"
              size="small"
              ref="multipleTable"
              @selection-change="selectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="uuid" label="UUID" width="240"></el-table-column>
              <el-table-column prop="userName" label="用户名"></el-table-column>
              <el-table-column prop="permission" label="权限等级"></el-table-column>
              <el-table-column prop="registerTime" label="注册时间"></el-table-column>
              <el-table-column prop="loginTime" label="最后登录"></el-table-column>
              <el-table-column label="操作" style="text-align: center" width="180">
                <template #default="scope">
                  <el-button size="mini" @click="toEditUserPanel(scope.row)">编辑</el-button>
                  <el-button size="mini" @click="toAssignPanel(scope.row)">分配资源</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </Panel>
      </el-col>
    </el-row>

    <!-- 新增用户弹框 -->
    <Dialog v-model="isNewUser">
      <template #title>新增用户</template>
      <template #default>
        <div>
          <div class="sub-title">
            <p class="sub-title-title">用户昵称</p>
            <p class="sub-title-info">必填，6到12个字符，支持中文，英文和字符</p>
          </div>
          <el-input
            v-model="newUserInfo.userName"
            placeholder="请输入内容..."
            size="small"
          ></el-input>
          <div class="sub-title row-mt">
            <p class="sub-title-title">用户密码</p>
            <p class="sub-title-info">必填，9到36个字符，不支持中文，只限于字母，数字和符号</p>
          </div>
          <el-input
            v-model="newUserInfo.password"
            placeholder="请输入密码"
            size="small"
            type="text"
          ></el-input>
          <div class="sub-title row-mt">
            <p class="sub-title-title">权限</p>
            <p class="sub-title-info">普通权限适用于商业用户，最高权限适用于管理人员</p>
          </div>
          <el-select v-model="newUserInfo.permission" placeholder="请选择" size="small">
            <el-option label="普通权限" :value="1"></el-option>
            <el-option label="最高权限" :value="10"></el-option>
            <el-option label="禁封" :value="-1"></el-option>
          </el-select>

          <div class="sub-title row-mt">
            <p class="sub-title-title">注意事项</p>
            <p class="sub-title-info">
              若您从事出租商业活动，请务必保证应用实例运行在 Linux 的 Docker
              虚拟容器中，否则将有安全隐患。
              <br />
              <a
                class="color-blue"
                href="https://docs.mcsmanager.com/"
                target="_blank"
                rel="noopener noreferrer"
                >具体信息参考</a
              >
            </p>
          </div>
          <div class="row-mt">
            <el-button type="success" size="small" @click="createUser">新增</el-button>
            <el-button @click="cancelNewPanel" size="small">取消</el-button>
          </div>
        </div>
      </template>
    </Dialog>

    <!-- 编辑用户弹框 -->
    <Dialog v-model="isEditUser">
      <template #title>编辑用户</template>
      <template #default>
        <div>
          <div class="sub-title">
            <p class="sub-title-title require-field">用户昵称</p>
            <p class="sub-title-info">必填，6到12个字符，支持中文，英文和字符</p>
          </div>
          <el-input
            v-model="editUserInfo.userName"
            placeholder="请输入内容..."
            size="medium"
          ></el-input>
          <div class="sub-title row-mt">
            <p class="sub-title-title require-field">重置密码</p>
            <p class="sub-title-info">不填写则不更变原有值</p>
          </div>
          <el-input v-model="editUserInfo.passWord" placeholder="原值" size="medium"></el-input>
          <div class="sub-title row-mt">
            <p class="sub-title-title require-field">权限</p>
            <p class="sub-title-info">普通权限适用于商业用户，最高权限适用于管理人员</p>
          </div>
          <el-select v-model="editUserInfo.permission" placeholder="请选择" size="medium">
            <el-option label="普通权限" :value="1"></el-option>
            <el-option label="最高权限" :value="10"></el-option>
            <el-option label="禁封" :value="-1"></el-option>
          </el-select>
          <div class="row-mt">
            <el-button type="success" size="small" @click="updateUser">更新数据</el-button>
            <el-button @click="cancelEditPanel" size="small">取消</el-button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Panel from "../../components/Panel";
import Dialog from "../../components/Dialog";
import { request } from "../service/protocol";
import { API_SERVICE, API_USER, API_SEARCH } from "../service/common";

export default {
  components: { Panel, Dialog },
  data() {
    return {
      page: 1,
      maxPage: 1,
      query: {
        userName: ""
      },
      newUserInfo: {
        userName: "",
        password: "",
        permission: 1
      },
      isEditUser: false,
      isNewUser: false,
      // isAssign: false,
      // isAssignLoading: true,
      editUserInfo: {},
      objects: [],
      remoteObjects: [], // 以守护进程为主键的列表
      instances: [], // 以实例为主键的列表
      multipleSelection: [], // 表格多选属性

      readonly: true,

      businessWarningDialog: false
    };
  },
  async mounted() {
    this.businessWarning = true;
    // 请求并渲染所有用户
    await this.render();
    // 异步请求所有实例缓存结果
    this.renderServices();
  },
  methods: {
    // 用户数据渲染
    async render() {
      const result = await request({
        method: "GET",
        url: API_SEARCH,
        params: {
          userName: this.query.userName,
          page: this.page,
          page_size: 50
        }
      });
      this.maxPage = result.maxPage;
      this.page = result.page;
      this.objects = result.data;
      this.query.userName = "";
    },
    async renderServices() {
      this.remoteObjects = await request({
        method: "GET",
        url: API_SERVICE
      });
      this.remoteObjects.forEach((v) => {
        v.instances.forEach((instance) => {
          this.instances.push({
            instanceUuid: instance.instanceUuid,
            serviceUuid: v.uuid,
            nickname: instance.config.nickname
          });
        });
      });
    },
    async requestUserInfo(uuid) {
      return await request({
        method: "GET",
        url: API_USER,
        params: {
          uuid: uuid,
          advanced: true
        }
      });
    },
    // 页码点击事件
    handleCurrentChange() {
      this.refresh();
    },
    // 表格多选函数
    selectionChange(v) {
      this.multipleSelection = v;
    },
    toEditUserPanel(row) {
      this.editUserInfo = row;
      this.isEditUser = true;
    },
    toNewUserPanel() {
      this.isNewUser = true;
    },
    async cancelEditPanel() {
      this.isEditUser = false;
      await this.render();
    },
    async cancelNewPanel() {
      this.isNewUser = false;
      await this.render();
    },
    async toAssignPanel(row) {
      const uuid = row.uuid;
      this.$router.push({ path: `/user_resources/${uuid}` });
      // this.isAssign = true;
      // this.isAssignLoading = true;
      // this.editUserInfo = {};
      // // 请求选择的用户详细信息
      // this.editUserInfo = await this.requestUserInfo(row.uuid);
      // this.isAssignLoading = false;
    },
    assignInstance(row) {
      this.editUserInfo.instances.push({
        uuid: row.instanceUuid,
        region: row.serviceUuid,
        instanceInfo: {
          config: {
            nickname: row.nickname
          }
        }
      });
    },
    cancelInstace(uuid) {
      const targetUuid = uuid;
      this.editUserInfo.instances.forEach((v, index) => {
        if (v.uuid == targetUuid) this.editUserInfo.instances.splice(index, 1);
      });
    },
    async updateUser() {
      try {
        await request({
          method: "PUT",
          url: API_USER,
          data: {
            uuid: this.editUserInfo.uuid,
            config: this.editUserInfo
          }
        });
        this.$message({ type: "success", message: "修改成功" });
        this.isEditUser = false;
        this.isAssign = false;
      } catch (error) {
        this.$message({
          type: "error",
          message: `错误: ${error.message}`
        });
      }
      this.refresh();
    },
    async createUser() {
      try {
        await request({
          method: "POST",
          url: API_USER,
          data: {
            username: this.newUserInfo.userName,
            password: this.newUserInfo.password,
            permission: this.newUserInfo.permission
          }
        });
        this.$message({ type: "success", message: "创建成功" });
        this.isNewUser = !this.isNewUser;
      } catch (error) {
        this.$message({
          type: "error",
          message: `错误: ${error.message}`
        });
      }
      this.refresh();
    },
    async deleteUser() {
      try {
        const uuids = [];
        for (const v of this.multipleSelection) {
          uuids.push(v.uuid);
        }
        if (!uuids.length) {
          throw new Error("请至少选择一个用户");
        }
        await request({
          method: "DELETE",
          url: API_USER,
          data: uuids
        });
        this.$message({ type: "success", message: "删除成功" });
      } catch (error) {
        this.$message({
          type: "error",
          message: `错误: ${error.message}`
        });
      }
      this.refresh();
    },
    refresh() {
      this.render();
    }
  }
};
</script>
