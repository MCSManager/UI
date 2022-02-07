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
  <div class="line-option-warpper">
    <el-card
      class=""
      shadow="hover"
      style="margin-bottom: 0px; border-radius: 4px"
      :body-style="{ padding: '14px' }"
    >
      <div class="line-option" v-if="!custom">
        <el-row
          :gutter="20"
          justify="space-around"
          class="flex-align-items-center col-md-responsive"
        >
          <el-col :sm="7" :offset="0">
            <slot name="title"></slot>
          </el-col>
          <el-col :sm="11" :offset="0">
            <span style="">
              <slot name="info"></slot>
            </span>
          </el-col>
          <el-col :sm="6" :offset="0">
            <div v-if="$slots.optionInput">
              <slot name="optionInput"></slot>
            </div>
            <div v-else class="flex">
              <el-input v-if="type == 2" v-model="optionValue[optionKey]" size="small"></el-input>
              <el-select
                v-if="type == 1"
                v-model="optionValue[optionKey]"
                size="small"
                style="width: 100%"
                placeholder="未选择"
              >
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
              <el-button
                v-if="type == 1"
                size="small"
                icon="el-icon-edit"
                @click="forceType"
              ></el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["optionValue", "optionKey", "custom"],
  data: function () {
    return {
      type: 0
    };
  },
  methods: {
    valueType(value) {
      if (typeof value === "object") return -1;
      if (typeof value === "boolean") return 1;
      if (typeof value === "number") return 2;
      return 0;
    },
    forceType() {
      if (this.type >= 2) return (this.type = 1);
      this.type = this.type + 1;
    }
  },
  mounted() {
    if (this.custom) return;
    if (this.valueType(this.optionValue[this.optionKey]) == 1) {
      this.type = 1;
    }
    if (this.valueType(this.optionValue[this.optionKey]) != 1) {
      this.type = 2;
    }
  }
};
</script>

<style scoped>
.line-option-warpper {
  width: 100%;
  margin-bottom: 4px;
}

.line-option {
  font-size: 13px;
}
</style>
