<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 10:07:55
 * @LastEditTime: 2021-05-16 22:47:30
 * @Description: 
-->
<template>
  <el-container>
    <el-aside width="240px">
      <Aside />
    </el-aside>

    <el-container>
      <el-main>
        <el-row>
          <el-col>
            <Header v-bind:breadcrumbs="breadCrumbs" />
          </el-col>
        </el-row>
        <!-- <transition name="fade"> -->
        <router-view></router-view>
        <!-- </transition> -->
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
      breadCrumbs: "aaa"
    };
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
