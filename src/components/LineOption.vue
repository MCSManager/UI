<!--
 eslint-disable vue/no-mutating-props
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-09-07 11:15:04
 * @Description: 
-->
<template>
  <div class="line-option-warpper">
    <el-card class="" shadow="hover" style="margin-bottom: 0px; border-radius: 4px" :body-style="{ padding: '14px' }">
      <div class="line-option" v-if="!custom">
        <el-row :gutter="20" justify="space-around" class="flex-align-items-center col-md-responsive">
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
              <el-select v-if="type == 1" v-model="optionValue[optionKey]" size="small" style="width: 100%" placeholder="未选择">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
              <el-button v-if="type == 1" size="small" icon="el-icon-edit" @click="forceType"></el-button>
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
