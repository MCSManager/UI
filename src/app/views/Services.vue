<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-05-18 11:25:47
 * @Description: 
-->

<template>
  <!-- <Panel>
    <template #title>应用实例列表</template>
    <template #default>
      <el-collapse>
        <el-collapse-item v-for="(item, index) in services" :key="index">
          <template #title>
            <table class="collapse-item-title-table">
              <tr>
                <td style="width: 300px">UUID:{{ item.uuid }}</td>
                <td style="width: 140px">远程地址:{{ item.ip }}</td>
                <td v-text="item.available ? '是否可用:可用' : '是否可用:不可用'"></td>
                <td style="">
                  <el-button size="mini" type="danger">删除</el-button>
                </td>
              </tr>
            </table>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        </el-collapse-item>
      </el-collapse>
    </template>
  </Panel> -->
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="24" v-for="(item, index) in services" :key="index">
      <Panel>
        <template #title>
          <div>
            <span v-text="item.ip + ':' + item.port"></span>
            &nbsp;
            <el-tag size="small">{{ item.available ? "已连接" : "不可使用" }}</el-tag>
          </div>
          <el-button class="button" type="text">删除</el-button>
        </template>
        <template #default>
          <el-descriptions size="mini">
            <el-descriptions-item label="UUID">{{ item.uuid }}</el-descriptions-item>
            <el-descriptions-item label="远程实例数">{{
              item.instances.length
            }}</el-descriptions-item>
          </el-descriptions>
          <el-collapse>
            <el-collapse-item title="包含的实例列表">
              <el-table :data="item.instances" stripe style="width: 100%" size="small">
                <el-table-column prop="instanceUuid" label="UUID"></el-table-column>
                <el-table-column prop="config.nickname" label="实例昵称"></el-table-column>
                <el-table-column prop="config.type" label="实例类型"></el-table-column>
                <el-table-column prop="started" label="已启动次数" width="120"></el-table-column>
                <el-table-column prop="status" label="运行状态" width="120"></el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </template>
      </Panel>
    </el-col>
  </el-row>
</template>

<script>
import Panel from "../../components/Panel";
import axios from "axios";
import { API_SERVICE } from "../service/common";

export default {
  data() {
    return {
      services: []
    };
  },
  methods: {},
  components: { Panel },
  async mounted() {
    const result = await axios.get(API_SERVICE);
    const responseObjects = result.data.data;
    responseObjects.forEach((v) => {
      this.services.push(v);
    });
  }
};
</script>

<style>
.collapse-item-title-table {
  width: 100%;
}

.service-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
