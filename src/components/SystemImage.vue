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
  <div class="component-system-wrapper">
    <div class="component-system-img-wrapper">
      <div class="component-system-img"></div>
    </div>
    <div class="component-system-content">
      <p class="component-system-title">MCSManager</p>
      <p class="component-system-subtitle color-gray">Windows 10 build 21h2</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
.component-system-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.component-system-img-wrapper {
  margin: 0px;
  overflow: hidden;
  border-radius: 2px;
}
.component-system-img {
  background: url("/static/images/index.png") no-repeat;
  background-size: cover;
  background-position: center;
  height: 80px;
  width: 120px;
}
.component-system-content {
  margin-left: 18px;
}
.component-system-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0px;
}
.component-system-subtitle {
  font-size: 12px;
}
</style>
