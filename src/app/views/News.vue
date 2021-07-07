<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-07 13:01:36
 * @Description: 
-->

<template>
  <el-row :gutter="20">
    <el-col :md="16" :offset="0">
      <Panel>
        <template #title>最新动态</template>
        <template #default>
          <el-timeline style="margin-left: -36px">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.time"
            >
              <div class="sub-title">
                <p class="sub-title-title">{{ activity.title }}</p>
                <p class="sub-title-info">{{ activity.msg }}</p>
              </div>
            </el-timeline-item>
          </el-timeline>
        </template>
      </Panel>
    </el-col>
    <el-col :md="8" :offset="0">
      <Panel>
        <template #title>官方公告</template>
        <template #default>
          <div
            class="sub-title component-message-item"
            v-for="(item, index) in notice"
            :key="index"
          >
            <p class="sub-title-title row-mb">{{ item.title }}</p>
            <p class="sub-title-info">{{ item.msg }}</p>
          </div>
        </template>
      </Panel>

      <Panel>
        <template #title>重要通知</template>
        <template #default>
          <div
            class="sub-title component-message-item"
            v-for="(item, index) in notice"
            :key="index"
          >
            <p class="sub-title-title row-mb">{{ item.title }}</p>
            <p class="sub-title-info">{{ item.msg }}</p>
          </div>
        </template>
      </Panel>
    </el-col>
  </el-row>
</template>

<script>
import Panel from "../../components/Panel";
export default {
  components: { Panel },
  data: function () {
    return {
      activities: [
        {
          title: "TDSQL-A PostgreSQL 版-新品上线",
          msg: "提供高性能、高扩展、高安全、高性价比的在线关系型实时数仓服务，自研列式存储引擎，支持完整事务能力，全面兼容 PostgreSQL，高度兼",
          time: "2021年7月"
        },
        {
          title: "边缘可用区-开放专用可用区申请",
          msg: "专用可用区（CDZ）是一种特殊的边缘可用区，旨在帮助中大型企业、政府/机构、IDC 服务商在本地机房快速搭建专属的云计算服务，用户可根据",
          time: "2021年8月"
        }
      ],
      notice: [
        {
          title: "TDSQL-A PostgreSQL 版-新品上线",
          msg: "提供高性能、高扩展、高安全、高性价比的在线关系型实时数仓服务，自研列式存储引擎，支持完整事务能力，全面兼容 PostgreSQL，高度兼",
          time: "2021年9月"
        },
        {
          title: "边缘可用区-开放专用可用区申请",
          msg: "专用可用区（CDZ）是一种特殊的边缘可用区，旨在帮助中大型企业、政府/机构、IDC 服务商在本地机房快速搭建专属的云计算服务，用户可根据"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.component-message-item {
  margin: 18px 0px;
}
</style>
