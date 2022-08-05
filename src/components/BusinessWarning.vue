<!-- eslint-disable vue/no-mutating-props -->
<!--
  Copyright (C) 2022 Suwings <Suwings@outlook.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  According to the AGPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings <Suwings@outlook.com>

  该程序是免费软件，您可以重新分发和/或修改据 GNU Affero 通用公共许可证的条款，
  由自由软件基金会，许可证的第 3 版，或（由您选择）任何更高版本。

  根据 AGPL 与用户协议，您必须保留所有版权声明，如果修改源代码则必须开源修改后的源代码。
  可以前往 https://mcsmanager.com/ 阅读用户协议，申请闭源开发授权等。
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
