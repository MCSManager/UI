<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-30 17:05:22
 * @LastEditTime: 2021-08-02 21:05:16
 * @Description: 
-->
<template>
  <Panel>
    <template #title>配置列表组</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <div class="row-mb">
            <el-button type="primary" size="small" @click="rf">刷新</el-button>
            <el-button size="small" @click="back">回到控制台</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="6" v-for="(item, index) in configs" :key="index">
          <BlockButton style="height: 210px" class="row-mb-12">
            <template #title>{{ item.fileName }}</template>
            <template #default>

              <div>模块作者：<a class="alink" :href="item.fromLink">{{item.from}}</a></div>

              <div class="row-mt" v-text="item.info"></div>

            </template>
            <template #link>
              <el-button type="text" icon="el-icon-right" @click="toProcessConfig(item.fileName)">浏览</el-button>
            </template>
          </BlockButton>
        </el-col>
      </el-row>
    </template>
  </Panel>
</template>

<script>
import Panel from "../../components/Panel";
import BlockButton from "../../components/BlockButton";
import { request } from "../service/protocol";
import { API_PROCESS_CONFIG_LIST } from "../service/common";

export default {
  components: { Panel, BlockButton },
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      configs: []
    };
  },
  methods: {
    toProcessConfig(configName) {
      this.$router.push({
        path: `/process_config_file/${this.serviceUuid}/${this.instanceUuid}/${configName}/`
      });
    },
    async rf() {
      await this.render();
    },
    back() {
      this.$router.push({ path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    async render() {
      this.configs = await request({
        method: "GET",
        url: API_PROCESS_CONFIG_LIST,
        params: {
          uuid: this.instanceUuid,
          remote_uuid: this.serviceUuid
        }
      });
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>
