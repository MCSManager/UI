<!--
 * @Author: Copyright(c) 2021 Suwings
 * @Date: 2021-05-08 10:07:55
 * @LastEditTime: 2021-07-06 22:14:17
 * @Description: 
-->
<template>
  <el-container>
    <!-- 手机屏幕菜单栏 -->
    <el-drawer size="240" v-model="drawer" :with-header="false" direction="ltr">
      <el-aside width="240px" style="height: 100%">
        <Aside />
      </el-aside>
    </el-drawer>
    <!-- 电脑屏幕菜单栏 -->
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
    }
  },
  mounted() {
    router.beforeEach((to, from, next) => {
      console.log("Router:", to, "->", from);
      this["breadCrumbs"] = to.name;
      next();
    });
  }
};
</script>
