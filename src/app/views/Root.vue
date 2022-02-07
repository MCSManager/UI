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
