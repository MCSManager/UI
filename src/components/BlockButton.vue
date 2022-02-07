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
  <div class="components-block-button-warpper" :style="style">
    <div class="components-block-button">
      <div>
        <p class="components-block-button-title">
          <slot name="title"></slot>
        </p>
        <div class="components-block-button-context">
          <slot></slot>
        </div>
      </div>
      <div class="components-block-button-link">
        <slot name="link"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    style: String
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.components-block-button-warpper {
  border-radius: 4px;
  height: 100%;
  width: 100%;
  margin: auto;
  background-color: rgb(255, 255, 255);
  transition: all 0.5s;
  border: 1px solid rgb(239, 239, 239);
}

.components-block-button-title {
  font-weight: 600;
  font-size: 16px;
}

.components-block-button-context {
  font-size: 13px;
}

.components-block-button {
  margin: 0px 32px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100%;
}

.components-block-button-link {
  font-size: 13px;
}
</style>
