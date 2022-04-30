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
    <template #title>商业出租风险警告</template>
    <template #default>
      <div class="content">
        <h2 class="title color-red-2">您可能会被入侵！</h2>
        <p>
          如果您在 <el-tag type="info" size="mini">Windows/Linux</el-tag> 下将实例分配给
          <b>陌生人</b> ，那么您的主机将随时可以被其他人通过上传恶意程序入侵主机。
        </p>
        <h2 class="title color-red-2">如何保护我的主机？</h2>
        <p>
          您的系统必须是<el-tag type="info" size="mini">Linux</el-tag>系统，并且安装了 Docker
          软件，在实例设置界面右下角有
          <el-tag type="info" size="mini">进程启动方式</el-tag
          >选择框，请选择虚拟化容器方案，即可确保您的主机安全。
          <br />
          <b>虚拟化容器将可以让您的实例在一个虚拟的沙盒环境中运行</b>
          ，您的子用户不管上传任何恶意程序，都将无法危害到其他人。
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
