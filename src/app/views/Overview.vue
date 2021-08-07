<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-08-03 18:58:28
 * @Description: 
-->

<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <Panel v-loading="loading">
        <template #title>面板端系统数据</template>
        <template #default>
          <el-row :gutter="20">
            <el-col :xs="12" :md="6" v-for="(item, index) in computerInfoA" :key="index">
              <div class="overview-info-warpper">
                <p class="overview-info-title" v-html="item.name"></p>
                <p class="overview-info-value" v-text="item.value" :class="{ 'color-red': item.warn }"></p>
              </div>
            </el-col>

            <el-col :span="24" :offset="0">
              <div class="box-card-title">面板总览数据</div>
            </el-col>

            <el-col :xs="12" :md="6" v-for="(item, index) in computerInfoB" :key="index">
              <div class="overview-info-warpper">
                <p class="overview-info-title" v-html="item.name"></p>
                <p class="overview-info-value" v-text="item.value" :class="{ 'color-red': item.warn }"></p>
              </div>
            </el-col>
          </el-row>
        </template>
      </Panel>
      <el-row :gutter="20">
        <el-col :md="12" :offset="0">
          <Panel v-loading="loading">
            <template #title>面板端接口请求量</template>
            <template #default>
              <p>
                每1分钟统计间隔，总计1小时的请求历史
              </p>
              <div class="echart-wrapper">
                <div id="echart-wrapper-main3" style="width:100%;height:200px"></div>
              </div>
            </template>
          </Panel>
        </el-col>
        <el-col :md="12" :offset="0">
          <Panel v-loading="loading">
            <template #title>面板端 CPU 使用率</template>
            <template #default>
              <p>
                每10秒统计间隔，总十分钟的 CPU 历史使用率
              </p>
              <div class="echart-wrapper">
                <div id="echart-wrapper-main" style="width:100%;height:200px"></div>
              </div>
            </template>
          </Panel>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" :offset="0">
          <Panel v-loading="loading">
            <template #title>分布式应用实例状态</template>
            <template #default>
              <p>
                每1分钟统计间隔，总计1小时的实例状态历史
              </p>
              <div class="echart-wrapper">
                <div id="echart-wrapper-main4" style="width:100%;height:200px"></div>
              </div>
            </template>
          </Panel>
        </el-col>
        <el-col :md="12" :offset="0">
          <Panel v-loading="loading">
            <template #title>面板端内存使用率</template>
            <template #default>
              <p>
                每10秒统计间隔，总十分钟的内存历史使用率
              </p>
              <div class="echart-wrapper">
                <div id="echart-wrapper-main2" style="width:100%;height:200px"></div>
              </div>
            </template>
          </Panel>
        </el-col>
      </el-row>

      <Panel v-loading="loading">
        <template #title>分布式服务总览</template>
        <template #default>
          <p>
            确保所有远程服务均在线，离线状态将导致此远程服务以及相关功能不可用，可能会影响使用体验与数据。
          </p>
          <el-table :data="servicesStatus" style="width: 100%">
            <el-table-column prop="ip" label="地址" width="180"> </el-table-column>
            <el-table-column prop="port" label="端口" width="180"> </el-table-column>
            <el-table-column prop="cpu" label="CPU"> </el-table-column>
            <el-table-column prop="mem" label="内存"> </el-table-column>
            <el-table-column prop="instance" label="已有实例"> </el-table-column>
            <el-table-column prop="started" label="运行实例"> </el-table-column>
            <el-table-column prop="status" label="连接状态"> </el-table-column>
          </el-table>
        </template>
      </Panel>
    </el-col>
  </el-row>

  <Panel>
    <template #title>帮助文档</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :span="12" :offset="0" v-for="(item, index) in manualLink" :key="index">
          <a class="manualLink" :href="item.link" v-text="item.title"></a>
        </el-col>

        <el-col :span="24">
          <div class="box-card-title">常见问题</div>
        </el-col>
        <el-col :span="12" :offset="0" v-for="(item, index) in manualLink" :key="index">
          <a class="manualLink" :href="item.link" v-text="item.title"></a>
        </el-col>
      </el-row>
    </template>
  </Panel>

</template>

<script>
import * as echarts from "echarts";
import Panel from "../../components/Panel";
// import LineLabel from "../../components/LineLabel";
import { request } from "../service/protocol";
import { API_OVERVIEW } from "../service/common";
import {
  getDefaultOption,
  getStatusChartOption1,
  getStatusChartOption2
} from "../service/chart_option";
export default {
  data: function () {
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
      manualLink: [
        {
          title: "如何获取云服务器的初始密码？",
          link: ""
        },
        {
          title: "为何控制台展示的流量数据与日志计算的流量对不上？",
          link: ""
        },
        {
          title: "使用 SSH 密钥登录还可以同时使用密码登录吗？",
          link: ""
        },
        {
          title: "在群聊中如何对群成员设置或取消禁言？",
          link: ""
        },
        {
          title: "备案初审被腾讯云驳回如何解决？",
          link: ""
        },
        {
          title: "即时通信 IM 消息存储时长是多久？",
          link: ""
        }
      ]
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
      console.log(data);
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
      // 计算内存
      const free = Number(system.freemem / 1024 / 1024 / 1024).toFixed(1);
      const total = Number(system.totalmem / 1024 / 1024 / 1024).toFixed(1);
      const used = Number(total - free).toFixed(1);
      // 计算已正常运行时间
      const uptime = Number(system.uptime / 60 / 60 / 60).toFixed(0);
      this.computerInfoA = [
        {
          name: "系统类型",
          value: `${system.type} ${system.release}`
        },
        {
          name: "操作系统",
          value: system.version
        },
        {
          name: "计算机名称",
          value: system.hostname
        },
        {
          name: "正常运行时间",
          value: `${uptime} 小时`
        },
        {
          name: "Node 版本",
          value: system.node
        },
        {
          name: "系统平台",
          value: system.platform
        },
        {
          name: "内存使用",
          value: `${used}GB/${total}GB`
        },
        {
          name: "系统 CPU 率",
          value: `${Number(system.cpu).toFixed(2) * 100}%`
        }
      ];
      this.computerInfoB = [
        {
          name: "面板版本",
          value: system.node
        },
        {
          name: "分布式在线",
          value: `${remoteCount.available}/${remoteCount.total}`,
          warn: remoteCount.available !== remoteCount.total
        },
        {
          name: "用户总数",
          value: "20"
        },
        {
          name: "实例运行数",
          value: `${runningInstance}/${totalInstance}`
        },

        {
          name: "封禁 IP 数",
          value: "4"
        },
        {
          name: "面板使用内存",
          value: `${Number(data.process.memory / 1024 / 1024).toFixed(0)}MB`
        },
        {
          name: "越权访问接口",
          value: "0"
        },
        {
          name: "面板 CPU 事件",
          value: `${Number(data.process.cpu / 1000 / 60).toFixed(1)}秒`
        }
      ];
      // 装载远程服务信息
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
            status: iterator.available ? "正常" : "离线"
          });
        } else {
          this.servicesStatus.push({
            ip: iterator.ip,
            port: iterator.port,
            cpu: "--",
            mem: "--",
            instance: "--",
            started: "--",
            status: iterator.available ? "正常" : "离线"
          });
        }
      }
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.systemChart = echarts.init(document.getElementById("echart-wrapper-main"));
      this.systemChart.setOption(getDefaultOption());
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
        source[key]["time"] = `${MAX_TIME - key * 1} 分前`;
      }
      this.systemChart3.setOption({
        dataset: {
          dimensions: ["time", "value"],
          source
        }
      });
      this.systemChart4.setOption({
        dataset: {
          dimensions: ["time", "totalInstance", "runningInstance"],
          source
        }
      });
    },
    setSystemChart() {
      const MAX_TIME = this.systemChartData["system"].length - 1;
      const source = this.systemChartData["system"];
      for (const key in source) {
        source[key]["time"] = `${(MAX_TIME - key) * 10} 秒前`;
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
  components: { Panel },
  async mounted() {
    this.loading = true;
    const data = await this.request();
    this.render(data);
    this.initChart();
    this.loading = false;
    this.startInterval();
  },
  beforeUnmount() {
    this.stopInterval();
  }
};
</script>
