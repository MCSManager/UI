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
    <el-col :span="24">
      <Panel v-loading="loading">
        <!-- 多语言HTML处示例代码，基础玩法 -->
        <template #title>{{ $t("overview.systemInfoTable") }}</template>
        <template #default>
          <el-row :gutter="20">
            <el-col :xs="12" :md="6" v-for="(item, index) in computerInfoA" :key="index">
              <div class="overview-info-warpper">
                <p class="overview-info-title">
                  <b v-text="item.name"></b>
                </p>
                <p
                  class="overview-info-value"
                  v-text="item.value"
                  :class="{ 'color-red': item.warn }"
                ></p>
              </div>
            </el-col>
          </el-row>
        </template>
      </Panel>
      <div>
        <el-row :gutter="20">
          <el-col :md="6" :xs="12" :offset="0">
            <!-- 多语言HTML处示例代码，绑定属性内部的话，需要在属性名前加冒号。里面的双引号变单引号 -->
            <ValueCard
              :title="$t('overview.daemonStatus')"
              :sub-title="$t('overview.daemonAvailable')"
              :value="`${valueCard.availableDaemon}/${valueCard.totalDaemon}`"
              style="height: 260px"
              font-class="el-icon-s-data"
              v-loading="loading"
            >
            </ValueCard>
          </el-col>
          <el-col :md="6" :xs="12" :offset="0">
            <ValueCard
              :title="$t('overview.instanceStatus')"
              :sub-title="$t('overview.runningAndTotalInstance')"
              :value="`${valueCard.runningInstance}/${valueCard.totalInstance}`"
              style="height: 260px"
              font-class="el-icon-s-promotion"
              v-loading="loading"
            >
            </ValueCard>
          </el-col>
          <el-col :md="6" :xs="12" :offset="0">
            <ValueCard
              :title="$t('overview.userLogin')"
              :sub-title="$t('overview.failedLogin')"
              :value="`${valueCard.failedLogin}:${valueCard.Logined}`"
              style="height: 260px"
              font-class="el-icon-upload"
              v-loading="loading"
            >
            </ValueCard>
          </el-col>
          <el-col :md="6" :xs="12" :offset="0">
            <ValueCard
              :title="$t('overview.systemLoad')"
              :sub-title="$t('overview.systemLoadPercentage')"
              :value="`${valueCard.cpu}% ${valueCard.mem}%`"
              style="height: 260px"
              font-class="el-icon-s-flag"
              v-loading="loading"
            >
            </ValueCard>
          </el-col>
        </el-row>
      </div>

      <Panel v-loading="loading">
        <template #title>{{ $t('overview.daemonOverview') }}</template>
        <template #default>
          <p v-html="$t('overview.daemonOverviewInfo',{ panelVersion,specifiedDaemonVersion} )">
          </p>
          <el-table :data="servicesStatus" style="width: 100%" size="small">
            <el-table-column prop="ip" label="地址" width="180"> </el-table-column>
            <el-table-column prop="remarks" label="备注" width="240"> </el-table-column>
            <el-table-column prop="port" label="端口" width="180"> </el-table-column>
            <el-table-column prop="cpu" label="CPU"> </el-table-column>
            <el-table-column prop="mem" label="内存"> </el-table-column>
            <el-table-column prop="instance" :label="$t('overview.instance')"> </el-table-column>
            <el-table-column prop="started" :label="$t('overview.runningInstance')"> </el-table-column>
            <el-table-column prop="version" :label="$t('overview.daemonVersion')">
              <template #default="scope">
                <span
                  class="color-green"
                  v-if="scope.row.version && scope.row.version === specifiedDaemonVersion"
                >
                  <i class="el-icon-circle-check"></i> {{ scope.row.version }}
                </span>
                <span class="color-red">
                  <el-tooltip
                    effect="dark"
                    v-if="scope.row.version !== specifiedDaemonVersion && scope.row.status"
                    placement="top"
                    :content="$t('overview.lowDaemonVersion')"
                  >
                    <span><i class="el-icon-warning-outline"></i> {{ scope.row.version }}</span>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="status" :label="$t('overview.connectStatus')">
              <template #default="scope">
                <span class="color-green" v-if="scope.row.status">
                  <i class="el-icon-circle-check"></i> {{ $t('overview.online') }}
                </span>
                <span class="color-red" v-if="!scope.row.status">
                  <el-tooltip
                    effect="dark"
                    :content="$t('overview.errorConnect')"
                    placement="top"
                  >
                    <span><i class="el-icon-warning-outline"></i> {{ $t('overview.outline') }}</span>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </Panel>
      <el-row :gutter="20">
        <el-col :md="12" :offset="0">
          <Panel v-loading="loading">
            <template #title>{{ $t('overview.panelApiRequestCount') }}</template>
            <template #default>
              <p>{{ $t('overview.panelApiRequestInfo') }}</p>
              <div class="echart-wrapper">
                <div id="echart-wrapper-main3" style="width: 100%; height: 200px"></div>
              </div>
            </template>
          </Panel>
        </el-col>
        <el-col :md="12" :offset="0">
          <Panel v-loading="loading">
            <template #title>{{ $t('overview.panelCpuUsage') }}</template>
            <template #default>
              <p>{{ $t('overview.panelCpuUsageInfo') }}</p>
              <div class="echart-wrapper">
                <div id="echart-wrapper-main" style="width: 100%; height: 200px"></div>
              </div>
            </template>
          </Panel>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" :offset="0">
          <Panel v-loading="loading">
            <template #title>{{ $t('overview.runningInstances') }}</template>
            <template #default>
              <p>{{ $t('overview.runningInstancesInfo') }}</p>
              <div class="echart-wrapper">
                <div id="echart-wrapper-main4" style="width: 100%; height: 200px"></div>
              </div>
            </template>
          </Panel>
        </el-col>
        <el-col :md="12" :offset="0">
          <Panel v-loading="loading">
            <template #title>{{ $t('overview.panelMemoryUsage') }}</template>
            <template #default>
              <p>{{ $t('overview.panelMemoryUsageInfo') }}</p>
              <div class="echart-wrapper">
                <div id="echart-wrapper-main2" style="width: 100%; height: 200px"></div>
              </div>
            </template>
          </Panel>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <Panel v-if="manualLink">
    <template #title>{{ $t('overview.docs') }}</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :md="6" :offset="0" v-for="(item, index) in manualLink['helpLink']" :key="index">
          <a class="manualLink" :href="item.link" v-text="item.title" target="_black"></a>
        </el-col>

        <el-col :span="24">
          <div class="box-card-title-more">{{ $t('overview.Q&A') }}</div>
        </el-col>
        <el-col :md="6" :offset="0" v-for="(item, index) in manualLink['faq']" :key="index">
          <a class="manualLink" :href="item.link" v-text="item.title" target="_black"></a>
        </el-col>
      </el-row>
    </template>
  </Panel>
</template>

<script>
import * as echarts from "echarts";
import Panel from "../../components/Panel";
import { request } from "../service/protocol";
import { API_OVERVIEW } from "../service/common";
import {
  getDefaultOption,
  getStatusChartOption1,
  getStatusChartOption2
} from "../service/chart_option";
import ValueCard from "../../components/ValueCard";
export default {
  components: { Panel, ValueCard },
  data() {
    return {
      loading: true,

      systemChart: null,
      systemChart2: null,
      requestChart: null,
      systemChartData: [],
      data: {},
      interval: null,
      computerInfoA: [],
      computerInfoB: [],
      servicesStatus: [],
      manualLink: null,

      forChartTotalInstance: 0,

      specifiedDaemonVersion: null,
      panelVersion: null,

      valueCard: {
        runningInstance: 0,
        totalInstance: 0,
        cpu: 0,
        mem: 0,
        freemem: 0,
        totalmem: 0,
        usedmem: 0,
        availableDaemon: 0,
        totalDaemon: 0,
        totalLogin: 0,
        failedLogin: 0,
        Logined: 0
      },

      // 初始化用户密码窗口
      initUserVisible: false
    };
  },
  methods: {
    startInterval() {
      this.interval = setInterval(async () => {
        const data = await this.request();
        this.render(data);
        this.setChartSource();
      }, 5000);
    },
    stopInterval() {
      clearInterval(this.interval);
    },
    async request() {
      return await request({
        method: "GET",
        url: API_OVERVIEW
      });
    },
    render(data) {
      // 版本相关数据渲染
      this.specifiedDaemonVersion = data.specifiedDaemonVersion;
      this.panelVersion = data.version;

      const system = data.system;
      // 表格数据渲染
      if (data.chart) this.systemChartData = data.chart;
      const remoteCount = data.remoteCount;
      const remote = data.remote;
      // 计算总实例与运行实例数
      let totalInstance = 0;
      let runningInstance = 0;
      for (const iterator of remote) {
        if (iterator.instance) {
          totalInstance += iterator.instance.total;
          runningInstance += iterator.instance.running;
        }
      }

      this.forChartTotalInstance = totalInstance;

      // 计算内存
      const free = Number(system.freemem / 1024 / 1024 / 1024).toFixed(1);
      const total = Number(system.totalmem / 1024 / 1024 / 1024).toFixed(1);
      const used = Number(total - free).toFixed(1);

      // 数值卡片列表赋值
      this.valueCard.totalInstance = totalInstance;
      this.valueCard.runningInstance = runningInstance;
      this.valueCard.freemem = free;
      this.valueCard.totalmem = total;
      this.valueCard.usedmem = used;
      this.valueCard.availableDaemon = remoteCount.available;
      this.valueCard.totalDaemon = remoteCount.total;
      this.valueCard.failedLogin = data.record.loginFailed;
      this.valueCard.totalLogin = parseInt(data.record.logined) + parseInt(data.record.loginFailed);
      this.valueCard.Logined = data.record.logined;
      this.valueCard.cpu = Number(system.cpu * 100).toFixed(0);
      this.valueCard.mem = Number((used / total) * 100).toFixed(0);
      // 计算已正常运行时间
      // const uptime = Number(system.uptime / 60 / 60).toFixed(0);
      this.computerInfoA = [
        {
          // 在Javascript代码中的用法，记得加this，单双引号灵活使用
          name: this.$t("overview.systemType"),
          value: `${system.type} ${system.platform}`
        },
        {
          name: this.$t("overview.systemName"),
          value: `${system.version} ${system.release}`
        },
        {
          name: this.$t("overview.webPanelTime"),
          value: system.time
        },
        {
          name: this.$t("overview.localTime"),
          value: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
        },
        {
          name: this.$t("overview.computerName"),
          value: system.hostname
        },
        {
          name: this.$t("overview.systemUserName"),
          value: system.user.username
        },
        {
          name: this.$t("overview.memoryUsage"),
          value: `${used}GB/${total}GB`,
          warn: used / total > 0.9
        },
        // {
        //   name: "系统 CPU 使用率",
        //   value: `${Number(system.cpu * 100).toFixed(1)}%`,
        //   warn: system.cpu * 100 > 90
        // }

        {
          name: this.$t("overview.nodeVersion"),
          value: system.node
        },
        {
          name: this.$t("overview.panelVersion"),
          value: data.version
        },
        // {
        //   name: "分布式在线",
        //   value: `${remoteCount.available}/${remoteCount.total}`,
        //   warn: remoteCount.available !== remoteCount.total
        // },
        // {
        //   name: "实例运行数",
        //   value: `${runningInstance}/${totalInstance}`
        // },

        {
          name: this.$t("overview.specifiedDaemonVersion"),
          value: this.specifiedDaemonVersion
        },
        {
          name: this.$t("overview.illegalAccess"),
          value: data.record.illegalAccess
        },
        // {
        //   name: "登录失败与总次数",
        //   value: `${data.record.loginFailed}/${data.record.logined}`
        // },
        {
          name: this.$t("overview.banips"),
          value: data.record.banips,
          warn: data.record.banips > 0
        }
      ];
      // 装载守护进程信息
      this.servicesStatus = [];
      for (const iterator of remote) {
        if (iterator.system) {
          const cpu = Number(iterator.system.cpuUsage * 100).toFixed(1);
          const totalmem = Number(iterator.system.totalmem / 1024 / 1024 / 1024).toFixed(1);
          const freemem = Number(iterator.system.freemem / 1024 / 1024 / 1024).toFixed(1);
          const usedmem = Number(totalmem - freemem).toFixed(1);
          this.servicesStatus.push({
            ip: iterator.ip,
            port: iterator.port,
            cpu: `${cpu}%`,
            mem: `${usedmem}GB/${totalmem}GB`,
            instance: iterator.instance.total,
            started: iterator.instance.running,
            status: iterator.available,
            version: iterator.version,
            remarks: iterator.remarks
          });
        } else {
          this.servicesStatus.push({
            ip: iterator.ip,
            port: iterator.port,
            remarks: "--",
            cpu: "--",
            mem: "--",
            instance: "--",
            started: "--",
            version: "--",
            status: iterator.available
          });
        }
      }
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.systemChart = echarts.init(document.getElementById("echart-wrapper-main"));
      this.systemChart.setOption(getDefaultOption());
      // this.systemChart.resize({});
      this.systemChart2 = echarts.init(document.getElementById("echart-wrapper-main2"));
      this.systemChart2.setOption(getDefaultOption());
      this.systemChart3 = echarts.init(document.getElementById("echart-wrapper-main3"));
      this.systemChart3.setOption(getStatusChartOption1());
      this.systemChart4 = echarts.init(document.getElementById("echart-wrapper-main4"));
      this.systemChart4.setOption(getStatusChartOption2());
      this.setChartSource();
    },
    setRequestChart() {
      const MAX_TIME = this.systemChartData["request"].length - 1;
      const source = this.systemChartData["request"];
      for (const key in source) {
        source[key]["time"] = `${MAX_TIME - key * 1}` + this.$t("overview.minBefore");
      }
      this.systemChart3.setOption({
        dataset: {
          dimensions: ["time", "value"],
          source
        }
      });
      this.systemChart4.setOption({
        yAxis: {
          max: this.forChartTotalInstance <= 1 ? 1 : this.forChartTotalInstance
        },
        dataset: {
          dimensions: ["time", "runningInstance"],
          source
        }
      });
    },
    setSystemChart() {
      const MAX_TIME = this.systemChartData["system"].length - 1;
      const source = this.systemChartData["system"];
      for (const key in source) {
        source[key]["time"] = `${(MAX_TIME - key) * 10}` + this.$t("overview.secBefore");
      }
      this.systemChart.setOption({
        dataset: {
          dimensions: ["time", "cpu"],
          source
        }
      });
      this.systemChart2.setOption({
        dataset: {
          dimensions: ["time", "mem"],
          source
        }
      });
    },
    setChartSource() {
      this.setRequestChart();
      this.setSystemChart();
    }
  },
  async mounted() {
    this.loading = true;
    const data = await this.request();
    this.render(data);
    this.initChart();
    this.loading = false;
    this.manualLink = window.onlineMCSManagerNotice ? window.onlineMCSManagerNotice() : null;
    this.startInterval();
  },
  beforeUnmount() {
    this.stopInterval();
    this.systemChart.dispose();
    this.systemChart2.dispose();
    this.systemChart3.dispose();
    this.systemChart4.dispose();
  }
};
</script>
