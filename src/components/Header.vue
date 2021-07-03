<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-05-11 22:38:14
 * @Description: 
-->

<template>
  <el-card class="box-card" body-style="padding: 12px;" style="margin-bottom: 20px">
    <el-row>
      <el-col :sm="12">
        <el-breadcrumb separator="/" style="line-height: 28px">
          <el-breadcrumb-item :to="{ path: '/' }">控制面板</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="#" v-text="breadcrumbs"></a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :sm="12" style="text-align: right">
        <el-dropdown style="margin: 0px 10px">
          <span class="el-dropdown-link">
            Suwings<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人资料</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-tooltip content="消息">
          <el-button size="mini" icon="el-icon-bell" circle></el-button>
        </el-tooltip>
        <el-tooltip content="在线支持">
          <el-button size="mini" icon="el-icon-cloudy" circle></el-button>
        </el-tooltip>
        <el-tooltip content="使用文档">
          <el-button size="mini" icon="el-icon-help" circle></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: ["breadcrumbs"],
  data: function () {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-weight: 400;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
