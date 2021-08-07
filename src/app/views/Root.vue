<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-21 15:12:01
 * @LastEditTime: 2021-07-22 12:20:00
 * @Description: 导航页面
-->
<template>
  <Panel v-loading="true">
    <template #title>板块</template>
    <template #default>
      <el-skeleton :rows="12" />
    </template>
  </Panel>
</template>
<script>
import Panel from "../../components/Panel";
// import router from "../router";
export default {
  components: { Panel },
  data: function () {
    return {};
  },
  methods: {},
  async mounted() {
    // const userInfo = this.$store.state.userInfo;
    // if (userInfo.uuid) {
    //   if (userInfo.permission >= 10) {
    //     console.log("辅助链接 - 导航跳转至高权限界面");
    //     router.push({ path: "/overview" });
    //   } else {
    //     console.log("辅助链接 - 导航跳转至普通界面");
    //     router.push({ path: "/home" });
    //   }
    // }
  }
};
</script>
