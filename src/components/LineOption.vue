<!-- eslint-disable vue/no-mutating-props -->
<!--
  Copyright (C) 2022 Suwings(https://github.com/Suwings)

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。
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
