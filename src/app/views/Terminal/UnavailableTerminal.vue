<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel style="max-width: 600px">
    <template #title>
      {{ $t("terminal.unavailableTerminal.title") }}
    </template>
    <template #default>
      <div class="sub-title">
        <div class="sub-title-title">
          <strong> {{ $t("terminal.unavailableTerminal.whathappened") }}</strong>
        </div>
        <p class="sub-title-title row-mt">
          <span v-if="unavailableIp">
            {{ $t("terminal.unavailableTerminal.browserCannotConnect") }} {{ unavailableIp }}
          </span>
          <span v-else>{{ $t("terminal.unavailableTerminal.browserCannotConnect2") }}</span>
        </p>
        <p class="sub-title-title">
          {{ $t("terminal.unavailableTerminal.maybe") }}
        </p>
        <div style="text-align: center; margin: 20px">
          <img
            :src="require('@/assets/daemon_connection_error.png')"
            alt=""
            srcset=""
            style="width: 460px"
          />
        </div>
        <div class="sub-title">
          <strong>{{ $t("terminal.unavailableTerminal.solution") }}</strong>
        </div>
        <ol style="padding-left: 20px">
          <span v-html="$t('terminal.unavailableTerminal.solutions')"></span>
        </ol>
      </div>

      <div class="btm-wrapper">
        <el-button type="primary" size="small" @click="backInstancesView">
          {{ $t("terminal.backInstancesView") }}
        </el-button>
        <el-button size="small" @click="toDocs" v-iszh>
          {{ $t("terminal.unavailableTerminal.toDocs") }}
        </el-button>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel.vue";

export default {
  components: { Panel },

  data() {
    return {
      unavailableIp: ""
    };
  },

  created() {
    this.unavailableIp = this.$route.query.ip;
  },
  methods: {
    backInstancesView() {
      this.$router.push("/instances");
    },
    toDocs() {
      window.open("https://docs.mcsmanager.com/#/qa/common_qa");
    }
  }
};
</script>

<style scoped>
.btm-wrapper {
  margin: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
