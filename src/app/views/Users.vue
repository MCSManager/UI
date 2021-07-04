<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-05-13 12:04:14
 * @Description: 
-->

<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <Panel>
        <template #title>用户列表</template>
        <template #default>
          <div class="instance-table-warpper">
            <div>
              <el-button size="mini" type="success">
                <i class="el-icon-plus"></i> 新建用户
              </el-button>
              <el-button size="mini" type="primary">
                <i class="el-icon-refresh"></i> 刷新
              </el-button>
            </div>

            <div>
              <el-button size="mini" type="danger" @click="batDelete">
                <i class="el-icon-delete"></i> 删除用户
              </el-button>
            </div>
          </div>

          <el-table
            :data="objects"
            stripe
            style="width: 100%"
            size="small"
            ref="multipleTable"
            @selection-change="selectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="uuid" label="UUID" width="240"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="permission" label="权限等级"></el-table-column>
            <el-table-column prop="registerTime" label="注册时间"></el-table-column>
            <el-table-column prop="loginTime" label="最后登录时间"></el-table-column>
            <el-table-column label="操作" style="text-align: center">
              <template #default="scope">
                <el-button size="mini" @click="editObject(scope.row)" type="primary"
                  >详细</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
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
