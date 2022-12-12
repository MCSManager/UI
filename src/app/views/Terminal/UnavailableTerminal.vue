<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="v" style="z-index: 9999">
    <template #title>
      <span v-if="v">
        {{ $t("terminal.unavailableTerminal.title") }}
      </span>
    </template>
    <template #default>
      <div v-if="v" class="sub-title">
        <p class="sub-title-title">
          <span v-if="unavailableIp">
            {{ $t("terminal.unavailableTerminal.browserCannotConnect") }} {{ unavailableIp }}
          </span>
          <span v-else>{{ $t("terminal.unavailableTerminal.browserCannotConnect2") }}</span>
        </p>
        <p class="sub-title-info">
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
        <div class="sub-title">{{ $t("terminal.unavailableTerminal.solution") }}</div>
        <ol style="padding-left: 20px">
          <span v-html="$t('terminal.unavailableTerminal.solutions')"></span>
        </ol>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
export default {
  components: { Dialog },
  props: {
    unavailableIp: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      v: false
    };
  },

  methods: {
    open() {
      this.v = true;
    },
    close() {
      this.v = false;
    }
  }
};
</script>
