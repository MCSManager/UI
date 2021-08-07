<!--
 * @Author: Copyright(c) 2021 Suwings
 * @Date: 2021-05-08 10:07:55
 * @LastEditTime: 2021-08-02 20:10:32
 * @Description: 
-->
<template>
  <!-- 普通用户 通用导航栏 -->
  <!-- <el-header style="padding:0px" v-if="!isTopPermission">
    <TopHeader />
  </el-header> -->
  <el-container>
    <!-- 管理用户 手机屏幕菜单栏 -->
    <el-drawer size="240" v-model="drawer" :with-header="false" direction="ltr">
      <el-aside width="240px" style="height: 100%">
        <Aside />
      </el-aside>
    </el-drawer>
    <!-- 管理用户 电脑屏幕菜单栏 -->
    <div id="app-menu" class="only-pc-display">
      <el-aside width="240px" style="height: 100%">
        <Aside />
      </el-aside>
    </div>
    <el-container>
      <el-main>
        <el-row>
          <el-col>
            <Header v-bind:breadcrumbs="breadCrumbs" :aside="toAside" />
          </el-col>
        </el-row>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "../components/Aside";
import Header from "../components/Header";
import { setupUserInfo } from "./service/protocol.js";
import router from "./router";

export default {
  name: "App",
  components: { Aside, Header },
  data: function () {
    return {
      breadCrumbs: "",
      mode: 1,
      drawer: false
    };
  },
  methods: {
    toAside() {
      this.drawer = !this.drawer;
    },
    nav() {
      // 若用户地址本身不为根目录，则不管
      console.log("路由地址:", this.$route.path);
      if (this.$route.path != "/") return;
      // 根据不同的用户类型进行跳转
      const userInfo = this.$store.state.userInfo;
      if (userInfo && userInfo.permission >= 10) {
        console.log("导航至管理界面");
        router.push({ path: "/overview" });
      } else {
        console.log("导航至普通界面");
        router.push({ path: "/home" });
      }
    }
  },
  async beforeCreate() {
    try {
      await setupUserInfo();
      this.nav();
    } catch (error) {
      console.log("App.vue setupUserInfo():", error);
      router.push({ path: "/login" });
    }
  },
  async mounted() {
    router.beforeEach((to, from, next) => {
      console.log("Router:", to, "->", from);
      this["breadCrumbs"] = to.name;
      next();
    });
  }
};
</script>
