<!-- eslint-disable vue/no-mutating-props -->
<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="visible" :canClose="false">
    <template #title>请更改密码</template>
    <template #default>
      <div class="content">
        <div class="sub-title">
          <div class="sub-title-title require-field">重置最高级别账号密码</div>
          <div class="sub-title-info">
            为确保面板安全，第一次登录必须重设密码，密码必须由大写字母，小写字母和数字组成，长度为 9
            到 36 位
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
        location.reload();
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
