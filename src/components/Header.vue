<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-28 15:00:20
 * @Description: 
-->

<template>
  <el-card class="box-card" body-style="padding: 12px;" style="margin-bottom: 20px">
    <el-row>
      <el-col :span="12">
        <!-- 手机端只显示扩展按钮 -->
        <div class="only-phone-display header-left-buttion" @click="toAside">
          <i class="el-icon-s-operation"></i>
        </div>
        <!-- 电脑端显示全部内容 -->
        <el-breadcrumb separator="/" style="line-height: 28px" class="only-pc-display">
          <el-breadcrumb-item :to="{ path: '/' }">控制面板</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="#" v-text="breadcrumbs"></a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" style="text-align: right; line-height: 28px">
        <el-dropdown style="margin: 0px 10px">
          <span class="el-dropdown-link">
            {{ userInfo.userName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toPrivate">个人资料</el-dropdown-item>
              <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <el-tooltip content="消息" class="only-pc-display">
          <el-button size="mini" icon="el-icon-bell" circle></el-button>
        </el-tooltip>
        <el-tooltip content="使用文档" class="only-pc-display">
          <el-button size="mini" icon="el-icon-help" circle></el-button>
        </el-tooltip> -->
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import router from "../app/router";
import { API_USER_LOGOUT } from "../app/service/common";
import { request } from "../app/service/protocol";
export default {
  props: {
    breadcrumbs: String,
    aside: Function
  },
  data: function () {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    toAside() {
      this.$props.aside();
    },
    toPrivate() {
      router.push({ path: "private" });
    },
    async logout() {
      try {
        request({
          method: "GET",
          url: API_USER_LOGOUT
        });
        window.location.href = "/login";
        this.$notify({
          title: "退出成功",
          message: "欢迎下次使用",
          type: "success"
        });
      } catch (error) {
        this.$notify({
          title: "退出失败",
          message: error.message,
          type: "error",
          duration: 0
        });
      }
    }
  },
  components: {}
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-weight: 400;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.header-left-buttion {
  line-height: 28px;
  font-size: 22px;
  cursor: pointer;
}
</style>
