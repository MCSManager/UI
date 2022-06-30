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
  <Dialog v-model="visible" :cancel="close">
    <template #title>配置对话框</template>
    <template #default>
      <div v-if="items" class="components-warpper">
        <el-table :data="items" style="width: 100%" size="small">
          <el-table-column v-for="(item, index) in columns" :key="index" v-bind="item">
            <template #default="scope">
              <el-input v-model="scope.row[item.prop]" type="text" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button text size="small" @click="deleteTableItem(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="btn-area">
        <el-button size="small" type="success" @click="createTableData">新增项目</el-button>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <el-button size="small" type="primary" @click="sumbit">确定</el-button>
        <el-button size="small" type="danger" @click="close">取消</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "./Dialog";
export default {
  components: { Dialog },
  props: {
    loadData: Function,
    columns: Array
  },
  data: function () {
    return {
      visible: false,
      items: []
    };
  },
  methods: {
    show() {
      console.log(1);
      this.items = this.loadData();
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.items = [];
    },
    sumbit() {
      this.$emit("submit", this.items);
      this.close();
    },
    deleteTableItem(index) {
      this.items.splice(index, 1);
    },
    createTableData() {
      const lastItem = this.items[this.items.length - 1];
      if (lastItem) {
        const newData = JSON.parse(JSON.stringify(lastItem));
        for (const key in newData) {
          newData[key] = "";
        }
        this.items.push(newData);
      } else {
        this.items.push({});
      }
    }
  }
};
</script>

<style scoped>
.btn-area {
  margin-top: 8px;
  margin-left: 2px;
}
</style>
