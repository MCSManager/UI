<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-03 09:32:19
 * @Description: 
-->

<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <Panel>
        <template #title>用户列表</template>
        <template #default> test </template>
      </Panel>
    </el-col>
  </el-row>
</template>

<script>
import Panel from "../../components/Panel";
// import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      objects: [
        {
          uuid: "14c154fc93bb4186a129d235310f2431",
          userName: "Suwings",
          permission: "管理账户",
          registerTime: "2021/1/1 12:24:11",
          loginTime: "2021/1/1 12:24:11",
          instances: []
        }
      ],
      multipleSelection: [] // 表格多选属性
    };
  },
  mounted() {},
  methods: {
    // 表格多选函数
    selectionChange(v) {
      this.multipleSelection = v;
    },
    editObject() {},
    batDelete() {
      console.log("Delete:", this.multipleSelection);
    }
  },
  components: { Panel }
};
</script>

<style>
.instance-table-warpper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
</style>
