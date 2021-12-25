<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-12-25 22:46:13
 * @Description: 
-->

<template>
  <el-card
    v-if="isTopPermission"
    class="box-card"
    body-style="padding: 12px;"
    style="margin-bottom: 20px; border-radius: 4px"
  >
    <el-row>
      <el-col :span="12">
        <!-- 手机端只显示扩展按钮 -->
        <div class="only-phone-display header-left-buttion" @click="toAside">
          <i class="el-icon-s-operation"></i>
        </div>
        <div
          style="font-size: 14px; font-weight: 700; line-height: 28px"
          v-for="(item, index) in breadcrumbsList"
          :to="{ path: item.path }"
          :key="index"
        >
          控制面板 / {{ item.title }}
        </div>
        <!-- 电脑端显示全部内容 -->
        <!-- <el-breadcrumb separator="/" style="line-height: 28px" class="only-pc-display">
          <el-breadcrumb-item :to="{ path: '/overview' }">控制面板</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbsList"
            :to="{ path: item.path }"
            :key="index"
          >
            {{ item.title }}
          </el-breadcrumb-item>
        </el-breadcrumb> -->
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

  <el-card
    v-if="!isTopPermission"
    class="box-card page-header-img"
    body-style="padding: 12px;"
    style="margin-bottom: 20px; border-radius: 4px; color: white"
  >
    <div class="flex flex-space-between">
      <router-link to="/home">
        <div style="height: 36px; line-height: 36px">
          <div>
            <Logo style="vertical-align: text-top" margin="0px"></Logo>
          </div>
        </div>
      </router-link>
      <div style="height: 36px; line-height: 36px">
        <ItemGroup :lr="true">
          <router-link to="/home">
            <el-link :underline="false" class="header-a">欢迎您，{{ userInfo.userName }}</el-link>
          </router-link>
          <el-link @click="toPrivate" class="header-a">个人资料</el-link>
          <el-link @click="logout" class="header-a">退出</el-link>
        </ItemGroup>
      </div>
    </div>
  </el-card>
</template>

<script>
import router from "../app/router";
import { API_USER_LOGOUT } from "../app/service/common";
import { request } from "../app/service/protocol";
import Logo from "./Logo.vue";

export default {
  props: {
    breadcrumbsList: Array,
    breadcrumbs: String,
    aside: Function
  },
  data: function () {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    isTopPermission() {
      return this.$store.state.userInfo.permission >= 10;
    }
  },
  methods: {
    toAside() {
      this.$props.aside();
    },
    toPrivate() {
      router.push({ path: "/private" });
    },
    async logout() {
      try {
        await request({
          method: "GET",
          url: API_USER_LOGOUT
        });
        window.location.href = "/";
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
  components: { Logo }
};
</script>

<style scoped>
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

.page-header-img {
  background: url("../assets/side.png");
  background-position-y: 40px;
  transition: all 1s;
}

.page-header-img:hover {
  background-position-y: 100px;
}

.header-a {
  color: rgb(235, 235, 235);
  font-weight: 400;
}
</style>
