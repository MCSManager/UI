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
  <el-row :gutter="20">
    <el-col :md="16" :offset="0">
      <Panel>
        <template #title>在线通知</template>
        <template #default>
          <div v-if="notice" style="height: 280px; overflow: auto">
            <div class="sub-title row-mb" v-for="(item, index) in notice" :key="index">
              <div class="sub-title-title">{{ item.title }}</div>
              <div class="sub-title-info">{{ item.info }}</div>
            </div>
          </div>
          <div v-else>
            <el-alert
              title="无法获取到最新信息"
              type="warning"
              description="可能是官方服务器维护或您本地网络问题，请稍等一段时间后再试或检查互联网连接"
              show-icon
              :closable="false"
            >
            </el-alert>
          </div>
        </template>
      </Panel>
    </el-col>
    <el-col :md="8" :offset="0">
      <Panel>
        <template #title>版本更新</template>
        <template #default>
          <div style="height: 280px; overflow: auto">
            <div class="sub-title">
              <div class="sub-title-title">最新版本</div>
              <div class="sub-title-info">
                控制面板版本代指主控端（此网页）后端的官方最新版本，守护进程端版本代指被控端（实际进程处，远程主机）的官方最新版本。如果您要查看您自己的版本，请前往数据监控界面查看。
              </div>
            </div>
            <LineLabel>
              <template #title>最新控制面板端</template>
              <template #default> {{ latestVersion }}</template>
            </LineLabel>
            <LineLabel>
              <template #title>最新守护进程端</template>
              <template #default> {{ latestVersion2 }}</template>
            </LineLabel>
          </div>
        </template>
      </Panel>
    </el-col>
  </el-row>

  <Panel v-if="activities">
    <template #title>产品动态</template>
    <template #default>
      <div>
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
              <p class="sub-title-info">{{ activity.info }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "../../components/Panel";
import LineLabel from "../../components/LineLabel";

export default {
  components: { Panel, LineLabel },
  data: function () {
    return {
      activities: null,
      notice: null,
      latestVersion: "",
      latestVersion2: ""
    };
  },
  methods: {},
  mounted() {
    const onlineNotice = this.$store.state.onlineNotice ? this.$store.state.onlineNotice : {};
    this.activities = onlineNotice["news"];
    this.notice = onlineNotice["notice"];
    this.latestVersion = onlineNotice["version"];
    this.latestVersion2 = onlineNotice["version2"];
  }
};
</script>
