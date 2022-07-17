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
  <el-card class="box-card-shadow" :body-style="bodyStyle || 'padding:12px;'" :style="style">
    <div v-bind:class="{ 'box-card-title': true }" v-if="$slots.title">
      <span v-bind:class="{ 'left-tip': tipType }"></span>
      <span>
        <slot name="title"></slot>
      </span>
    </div>
    <div class="box-card-rtitle" v-if="$slots.rtitle">
      <slot name="rtitle"></slot>
    </div>

    <div class="box-card-content">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    style: String,
    bodyStyle: String,
    tip: {
      type: Boolean,
      default: true
    },
    tipType: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.box-card-title {
  font-weight: 800;
  margin-bottom: 12px;
  font-size: 14px;
  display: inline-block;
}

.box-card-rtitle {
  float: right;
}

.box-card-content {
  font-size: 12px;
  font-weight: 400;
}

.box-card-shadow {
  border-radius: 0px;
}

.left-tip {
  display: inline-block;
  margin-right: 6px;
  margin-bottom: 2px;
  /* margin-top: 2px; */
  border-radius: 2px;
  color: #409eff;
  background-color: #409eff;
  height: 14px;
  width: 6px;
  vertical-align: middle;
}
</style>
