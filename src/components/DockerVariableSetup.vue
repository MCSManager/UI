<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
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
