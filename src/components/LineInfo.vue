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
  <div class="line-info-warpper">
    <div class="line-info" :class="{ 'line-info-button': isButton }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isButton: Boolean
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.line-info-warpper {
  text-align: left;
  margin-bottom: 10px;
}

.line-info {
  /* background-color: #eeeeee; */
  font-size: 13px;
  padding: 2px 0px;
  overflow: hidden;
  display: block;

  color: #333;
  /* user-select: none; */
  transition: all 0.4s;
}
.line-info-button {
  cursor: pointer;
}
.line-info-button:hover {
  color: rgb(126, 123, 123);
}
</style>
