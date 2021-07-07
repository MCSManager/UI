<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-06 22:37:35
 * @Description: 
-->

<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <Panel>
        <template #title>面板部署系统数据</template>
        <template #default>
          <el-row :gutter="20">
            <el-col :xs="12" :md="6" v-for="(item, index) in computerInfoA" :key="index">
              <div class="overview-info-warpper">
                <p class="overview-info-title" v-text="item.name"></p>
                <p class="overview-info-value" v-text="item.value"></p>
              </div>
            </el-col>

            <el-col :span="24" :offset="0">
              <div class="box-card-title">控制面板数据</div>
            </el-col>

            <el-col :xs="12" :md="6" v-for="(item, index) in computerInfoB" :key="index">
              <div class="overview-info-warpper">
                <p class="overview-info-title" v-text="item.name"></p>
                <p class="overview-info-value" v-text="item.value"></p>
              </div>
            </el-col>
          </el-row>
        </template>
      </Panel>
      <Panel>
        <template #title>分布式服务状态</template>
        <template #default>
          <el-row :gutter="20">
            <el-col :span="6">
              <LineLabel size="small">
                <template #title>已连接远程服务: </template>
                <template #default> 0 个 </template>
              </LineLabel>
            </el-col>
            <el-col :span="6">
              <LineLabel size="small">
                <template #title>不可用远程服务: </template>
                <template #default> 0 个 </template>
              </LineLabel>
            </el-col>
            <el-col :span="6">
              <LineLabel size="small">
                <template #title>实例总数: </template>
                <template #default> 0 个 </template>
              </LineLabel>
            </el-col>
            <el-col :span="6">
              <LineLabel size="small">
                <template #title>运行中: </template>
                <template #default> 0</template>
              </LineLabel>
            </el-col>
          </el-row>
          <div v-show="true">
            <span style="color: red">
              <b>警告：</b> 检测到您有一个或以上远程服务无法建立连接，请前往
              <a class="alink" href="./services">分布式服务</a>
              功能确认各个远程服务器状态，若不修复此问题，则有部分远程实例您可能无法访问和显示。
            </span>
          </div>
        </template>
      </Panel>

      <Panel>
        <template #title>所有分布式服务总览</template>
        <template #default>
          <el-table :data="servicesStatus" style="width: 100%">
            <el-table-column prop="ip" label="地址" width="180"> </el-table-column>
            <el-table-column prop="port" label="端口" width="180"> </el-table-column>
            <el-table-column prop="cpu" label="CPU 使用"> </el-table-column>
            <el-table-column prop="mem" label="内存使用"> </el-table-column>
            <el-table-column prop="instance" label="已有实例"> </el-table-column>
            <el-table-column prop="started" label="运行实例"> </el-table-column>
            <el-table-column prop="status" label="连接状态"> </el-table-column>
          </el-table>
        </template>
      </Panel>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :md="16">
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
      <Panel>
        <template #title>更多服务</template>
        <template #default>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="/"><i class="el-icon-link"></i> API 文档</a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="/"><i class="el-icon-link"></i> 快速入门</a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="/"><i class="el-icon-link"></i> 官方网站</a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="manual-link-block-wrapper">
                <a class="manual-link-block" href="/"><i class="el-icon-link"></i> 购买专业版</a>
              </div>
            </el-col>
          </el-row>
        </template>
      </Panel>
    </el-col>

    <el-col :md="8">
      <Panel>
        <template #title>最新公告</template>
        <template #default>
          <div style="height: 300px">
            测试数据 - 测试面板 <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </div>
        </template>
      </Panel>
    </el-col>
  </el-row>
</template>

<script>
import Panel from "../../components/Panel";
import LineLabel from "../../components/LineLabel";
export default {
  data: function () {
    return {
      computerInfoA: [
        {
          name: "操作系统",
          value: "Windows 10"
        },
        {
          name: "系统版本",
          value: "Windows 20H4"
        },
        {
          name: "计算机名称",
          value: "Suwings"
        },
        {
          name: "正常运行时间",
          value: "234:21"
        },
        {
          name: "处理器型号",
          value: "Intel i7-4002K"
        },
        {
          name: "磁盘空间",
          value: "123.2GB/256GB"
        },
        {
          name: "内存使用率",
          value: "64%"
        },
        {
          name: "CPU使用率",
          value: "12%"
        }
      ],
      computerInfoB: [
        {
          name: "面板版本",
          value: "9.0.0"
        },
        {
          name: "用户在线数",
          value: "4/20"
        },
        {
          name: "实例运行数",
          value: "16/70"
        },
        {
          name: "集群在线",
          value: "4/4"
        },
        {
          name: "封禁 IP 数",
          value: "4"
        },
        {
          name: "面板使用内存",
          value: "78MB"
        },
        {
          name: "越权访问接口",
          value: "0"
        },
        {
          name: "登录次数",
          value: "0"
        }
      ],

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
      ],
      servicesStatus: [
        {
          ip: "127.0.0.1",
          port: 24444,
          cpu: "18%",
          mem: "15.4GB/126GB", // 记得合并数据
          instance: 23,
          started: 14,
          status: "正常"
        },
        {
          ip: "127.0.0.1",
          port: 24444,
          cpu: "18%",
          mem: "15.4GB/126GB", // 记得合并数据
          instance: 23,
          started: 14,
          status: "正常"
        },
        {
          ip: "127.0.0.1",
          port: 24444,
          cpu: "18%",
          mem: "15.4GB/126GB", // 记得合并数据
          instance: 23,
          started: 14,
          status: "正常"
        },
        {
          ip: "127.0.0.1",
          port: 24444,
          cpu: "18%",
          mem: "15.4GB/126GB", // 记得合并数据
          instance: 23,
          started: 14,
          status: "正常"
        }
      ]
    };
  },
  methods: {},
  components: { Panel, LineLabel }
};
</script>

<style>
.overview-info-title {
  /* text-align: center; */
  color: rgb(66, 66, 66);
  font-size: 12px;
  margin-top: 0px;
}
.overview-info-value {
  /* text-align: center; */
  font-size: 14px;
}
.overview-info-hr {
  line-height: normal;
  margin-bottom: 16px;
  font-weight: 800;
  font-size: 12px;
  color: rgb(122, 122, 122);
}
.manualLink {
  display: block;
  color: black;
  line-height: 1.5;
  margin-bottom: 8px;
  box-sizing: border-box;
  text-decoration: none;
}
.manualLink:hover {
  color: #006eff !important;
}

.manual-link-block-wrapper {
  margin: 4px;
  text-align: center;
}

.manual-link-block {
  background-color: #ebeef3;
  display: block;
  padding: 8px;
  line-height: 1.5;
  transition: all 0.4s;
}
.manual-link-block:hover {
  background-color: #caced6;
}
</style>
