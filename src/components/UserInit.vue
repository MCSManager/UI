<!-- eslint-disable vue/no-mutating-props -->
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
  <Dialog v-model="visible" :canClose="false">
    <template #title>请更改密码</template>
    <template #default>
      <div class="content">
        <div class="sub-title">
          <div class="sub-title-title require-field">重置最高级别账号密码</div>
          <div class="sub-title-info">
            为确保面板安全，第一次登录必须重设密码，密码必须由大写字母，小写字母和数字组成，长度为
            12 到 36 位
          </div>
          <div class="row-mt">
            <el-input
              type="password"
              v-model="passWord"
              autocomplete="off"
              placeholder="请输入您要设置的新密码"
            />
            <div style="text-align: right">
              <el-button size="small" class="row-mt" @click="submit()" type="danger" plain
                >重置密码</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script>
import { API_USER_UPDATE } from "../app/service/common";
import { request } from "../app/service/protocol";
import Dialog from "./Dialog";

export default {
  components: { Dialog },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passWord: ""
    };
  },
  mounted() {},
  methods: {
    async submit() {
      await this.$confirm(`确定重设密码为：${this.passWord} 吗？`, "重置密码确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      try {
        await request({
          method: "PUT",
          url: API_USER_UPDATE,
          data: {
            passWord: this.passWord,
            isInit: true
          }
        });
        this.$message({ message: "已设置密码，欢迎使用", type: "success" });
        this.$emit("update:visible", false);
      } catch (error) {
        this.$message({
          message: error,
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped>
.content {
  max-width: 500px;
}
.title {
  margin: 8px 0px;
}
</style>
