<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel v-loading="true">
    <template #title>{{ $t("root.title") }}</template>
    <template #default>
      <el-skeleton :rows="12" />
    </template>
  </Panel>
</template>
<script>
import Panel from "../../components/Panel";
import router from "../router";
import { setupUserInfo } from "../service/protocol";

export default {
  components: { Panel },
  data: function () {
    return {};
  },
  methods: {
    async init() {
      try {
        // In order to adapt to seamless login, data must be requested again here
        if (this.$store.state.userInfo?.permission && this.$store.state.userInfo?.uuid) return;
        await setupUserInfo();
        const userInfo = this.$store.state.userInfo;
        if (!userInfo || !userInfo.uuid) throw new Error(`userInfo status error: ${userInfo}`);
        if (userInfo.permission >= 10) {
          router.push({ path: "/overview" });
        } else {
          router.push({ path: "/home" });
        }
        return;
      } catch (error) {
        console.log("App.vue setupUserInfo() ERROR:");
        console.log(error);
        router.push({ path: "/login" });
      }
    }
  },
  async mounted() {
    this.init();
  }
};
</script>
