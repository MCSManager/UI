<!-- eslint-disable vue/no-mutating-props -->
<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="visible">
    <template #title>{{ $t("businessWarning.title") }}</template>
    <template #default>
      <div class="content">
        <h2 class="title color-red-2">{{ $t("businessWarning.youMayWillBeHack") }}</h2>
        <p>
          <span v-html="$t('businessWarning.warningInfo')"></span>
        </p>
        <h2 class="title color-red-2">{{ $t("businessWarning.hotToProtect") }}</h2>
        <p>
          <span v-html="$t('businessWarning.protectInfo')"></span>
        </p>
      </div>
    </template>
  </Dialog>
</template>

<script>
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
      v: this.visible
    };
  },
  mounted() {}
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
