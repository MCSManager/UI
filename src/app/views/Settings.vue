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
  <Panel>
    <template #title>配置操作</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <ItemGroup>
            <el-button type="success" size="small" @click="updateSettings">更新配置</el-button>
            <el-button type="" size="small" @click="refresh">刷新</el-button>
          </ItemGroup>
        </div>
        <span class="color-gray hidden-md-and-down"
          >部分配置可能需要重启面板才能生效&nbsp;&nbsp;</span
        >
      </div>
    </template>
  </Panel>

  <div v-if="settings">
    <Panel>
      <template #title>基础设置</template>
      <template #default>
        <el-row :gutter="20">
          <el-col :md="12">
            <!-- <div class="system-index-block">
              <SystemIndex></SystemIndex>
            </div> -->
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">面板访问端口</p>
                <p class="sub-title-info">浏览器访问网页面板的端口，必须防火墙放行此端口。</p>
              </div>
              <el-input placeholder="请必须填入数字" v-model="settings.httpPort"> </el-input>
            </div>
            <!-- <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">面板数据转发端口</p>
                <p class="sub-title-info">
                  采用“面板端流量转发模式”时才使用此端口转发数据到守护进程端，必须开放此端口。
                </p>
              </div>
              <el-input placeholder="请必须填入数字" v-model="settings.dataPort"> </el-input>
            </div> -->
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">面板绑定IP</p>
                <p class="sub-title-info">一般情况请保持默认值，一般适用于多个IP的场景。</p>
              </div>
              <el-input placeholder="默认 0.0.0.0 | 可不填" v-model="settings.httpIp"> </el-input>
            </div>

            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">登录界面简单说明</p>
                <p class="sub-title-info">
                  用于显示在登录界面公开简要说明文字，可以用于管理员身份介绍，备案信息介绍
                </p>
              </div>
              <el-input
                placeholder="请输入文案，列如：京ICP备00000001号"
                v-model="settings.loginInfo"
              >
              </el-input>
            </div>
          </el-col>

          <el-col :md="4"></el-col>
          <el-col :md="8">
            <div>
              <div class="sub-title">
                <p class="sub-title">相关参考链接</p>
                <p class="sub-title-info">
                  面板的大部分设置十分重要，在一般情况下，绝大部分参数都无需更改，如果某个参数您并不知晓代表什么，那么建议您不要对其进行修改。
                </p>
                <p class="sub-title-info">或者，您可以考虑阅读以下链接。</p>
              </div>
              <!-- <a class="alink" href="http://">
                <p>面板设置配置手册</p>
              </a>
              <a class="alink">
                <p>反馈问题</p>
              </a> -->
            </div>
          </el-col>
        </el-row>
      </template>
    </Panel>
    <Panel>
      <template #title>限制与安全</template>
      <template #default>
        <el-row :gutter="20">
          <el-col :md="12">
            <!-- <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">解压缩功能实现方式</p>
                <p class="sub-title-info">命令实现方式 Windows 自带无需操作，Linux 则需要额外安装 zip/unzip 两个指令确保可用</p>
              </div>
              <el-select v-model="settings.zipType" placeholder="请选择">
                <el-option label="7z/unzip/zip 系统原生命令(效率高,需要额外安装)" :value="1"></el-option>
                <el-option label="Node 跨平台实现方式(效率低)" :value="2"></el-option>
              </el-select>
            </div> -->
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">跨域请求 API 接口</p>
                <p class="sub-title-info">
                  HTTP 响应将会加入 access-control-allow-origin:
                  *，可能会降低安全性，但是会提高开发扩展性。
                </p>
              </div>
              <el-select v-model="settings.crossDomain" placeholder="请选择">
                <el-option label="启用" :value="true"></el-option>
                <el-option label="禁止" :value="false"></el-option>
              </el-select>
            </div>
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">同IP登录次数限制</p>
                <p class="sub-title-info">
                  此功能将保护您的面板不被单个主机暴力破解密码，每个IP只有10次密码错误次数。
                </p>
              </div>
              <el-select v-model="settings.loginCheckIp" placeholder="请选择">
                <el-option label="启用" :value="true"></el-option>
                <el-option label="禁止" :value="false"></el-option>
              </el-select>
            </div>
            <!-- <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">使用 gzip 静态文件压缩</p>
                <p class="sub-title-info">
                  如果你使用反向代理或某 HTTP 服务自带的gzip，请关闭它，否则可以使用默认值。
                </p>
              </div>
              <el-select v-model="settings.gzip" placeholder="请选择">
                <el-option label="启用" :value="true"></el-option>
                <el-option label="禁止" :value="false"></el-option>
              </el-select>
            </div>
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">解压缩最大并发任务</p>
                <p class="sub-title-info">
                  对于机械硬盘请略调小此值，对于高性能硬盘和CPU可以适当提高。
                </p>
              </div>
              <el-select v-model="settings.maxCompress" placeholder="请选择">
                <el-option label="无限制" :value="-1"></el-option>
                <el-option label="最大并发 1 个" :value="1"></el-option>
                <el-option label="最大并发 2 个" :value="2"></el-option>
                <el-option label="最大并发 3 个" :value="3"></el-option>
                <el-option label="最大并发 5 个" :value="5"></el-option>
                <el-option label="最大并发 8 个" :value="8"></el-option>
                <el-option label="最大并发 10 个" :value="10"></el-option>
                <el-option label="最大并发 15 个" :value="15"></el-option>
                <el-option label="最大并发 20 个" :value="20"></el-option>
                <el-option label="最大并发 30 个" :value="30"></el-option>
                <el-option label="最大并发 40 个" :value="40"></el-option>
                <el-option label="最大并发 60 个" :value="60"></el-option>
                <el-option label="最大并发 80 个" :value="80"></el-option>
                <el-option label="最大并发 100 个" :value="100"></el-option>
                <el-option label="最大并发 200 个" :value="200"></el-option>
              </el-select>
            </div>
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">最大并发下载文件</p>
                <p class="sub-title-info">所有用户最多可同时下载多少个文件，根据宽带自主调整</p>
              </div>
              <el-select v-model="settings.maxDonwload" placeholder="请选择">
                <el-option label="无限制" value=""></el-option>
                <el-option label="最大并发 1 个" :value="1"></el-option>
                <el-option label="最大并发 5 个" :value="5"></el-option>
                <el-option label="最大并发 10 个" :value="10"></el-option>
                <el-option label="最大并发 15 个" :value="15"></el-option>
                <el-option label="最大并发 20 个" :value="20"></el-option>
                <el-option label="最大并发 30 个" :value="30"></el-option>
                <el-option label="最大并发 40 个" :value="40"></el-option>
                <el-option label="最大并发 60 个" :value="60"></el-option>
                <el-option label="最大并发 80 个" :value="80"></el-option>
                <el-option label="最大并发 100 个" :value="100"></el-option>
                <el-option label="最大并发 200 个" :value="200"></el-option>
              </el-select>
            </div>
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">下载限速</p>
                <p class="sub-title-info">对于小宽度服务器可以适当调小。</p>
              </div>
              <el-select v-model="value3" placeholder="请选择">
                <el-option label="无限制" value=""></el-option>
                <el-option label="100kb/s" value="100kb"></el-option>
                <el-option label="200kb/s" value="200kb"></el-option>
                <el-option label="300kb/s" value="300kb"></el-option>
                <el-option label="500kb/s" value="500kb"></el-option>
                <el-option label="1mb/s" value="1mb"></el-option>
                <el-option label="2mb/s" value="2mb"></el-option>
                <el-option label="5mb/s" value="5mb"></el-option>
                <el-option label="10mb/s" value="10mb"></el-option>
              </el-select>
            </div> -->
          </el-col>

          <el-col :md="4"></el-col>
          <el-col :md="8">
            <div>
              <div class="sub-title">
                <p class="sub-title">注意事项</p>
                <p class="sub-title-info">
                  这些配置设置需要一部分专业知识，您可以根据您的硬件设备来大概猜测哪些值适合您。<br />一般情况下，默认值可以满足个人日常的使用场景，如果规模一旦更大，对硬件的要求更高，为了不过分损失用户体验，一个合适的阈值是十分重要的。
                </p>
              </div>
              <!-- <div class="sub-title">
                <p class="sub-title">常见概念</p>
              </div>
              <a class="alink" href="https://cn.bing.com/">
                <p>什么是并发？</p>
              </a>
              <a class="alink" href="https://cn.bing.com/">
                <p>什么是 gzip 压缩？</p>
              </a>
              <a class="alink" href="https://cn.bing.com/">
                <p>反馈问题</p>
              </a> -->
            </div>
          </el-col>
        </el-row>
      </template>
    </Panel>
    <!-- <Panel>
      <template #title>远程守护进程数据传输模式</template>
      <template #default>
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <div class="sub-title">
              <p class="sub-title-title">使用须知</p>
              <p class="sub-title-info">
                在您的用户量较少时，可以采用默认的“流量转发模式”，当您的用户量过大导致面板端运行缓慢时，请采用“守护进程直连模式”模式。<br />
                为确保高可用性，建议中小型商业用户采用第二种转发模式，更改后需要重启面板端才可生效。
              </p>
            </div>
          </el-col>

          <el-col :md="6">
            <SelectBlock
              @click="changeForwardType(1)"
              style="height: 240px"
              :class="settings.forwardType === 1 ? 'selectedForwardMode' : ''"
            >
              <template #title>面板端流量转发模式</template>
              <template #info>
                <span>
                  配置简单，所有流量都要经过面板端的数据端口做转发，但会增加中央面板端的流量压力。
                </span>
                <div style="margin-top: 8px">
                  <img :src="require('../../assets/mode2.png')" style="width: 100%" />
                </div>
              </template>
            </SelectBlock>
          </el-col>

          <el-col :md="6">
            <SelectBlock
              @click="changeForwardType(2)"
              style="height: 240px"
              :class="settings.forwardType === 2 ? 'selectedForwardMode' : ''"
            >
              <template #title>跨面板端远程守护进程直连模式</template>
              <template #info>
                <span style="margin-bottom: 4px">
                  配置复杂，大量流量由远程守护进程与浏览器建立直接连接通道，以减小面板端的流量压力。
                </span>
                <div style="margin-top: 8px">
                  <img :src="require('../../assets/mode1.png')" style="width: 100%" />
                </div>
              </template>
            </SelectBlock>
          </el-col>
        </el-row>
      </template>
    </Panel> -->

    <Panel>
      <template #title>关于</template>
      <template #default>
        <div class="sub-title">
          <p class="sub-title-title">
            软件根据
            <a
              target="black"
              href="https://github.com/MCSManager/MCSManager-Daemon/blob/master/LICENSE"
              >GPL-3.0</a
            >
            开源软件协议发行
          </p>
          <p class="sub-title-info">
            此协议准许每个人都可以复制和分发代码副本，并且可以对使用者收取服务费用。<br />
            若对代码任何修改，则必须无偿提供软件的完整源代码下载。
          </p>
        </div>

        <div class="sub-title">
          <p class="sub-title-title">闭源商业许可证</p>
          <p class="sub-title-info">
            若您想二次开发并且闭源使用于任何活动（包括但不限于商业，个人）。<br />
            请参考:
            <a href="https://mcsmanager.com/" target="_blank" rel="noopener noreferrer">
              相关许可证
            </a>
          </p>
          <p class="sub-title-info"></p>
        </div>

        <div class="sub-title">
          <p class="sub-title-title">项目赞助者</p>
          <p class="sub-title-info">没有以下名单的重点支持，就不会有 MCSManager 的长期维护。</p>
          <p class="sub-title-info"></p>
        </div>

        <div class="contributors">
          <el-row :gutter="10" v-if="sponsorList">
            <el-col :md="4" v-for="(item, index) in sponsorList" :key="index">
              <a
                :href="item.link || 'https://mcsmanager.com'"
                target="_blank"
                rel="noopener noreferrer"
              >
                <el-card
                  shadow="hover"
                  :body-style="{ padding: '16px' }"
                  style="height: 70px; margin-bottom: 10px"
                >
                  <p style="margin: 0px; font-size: 13px">
                    <b>{{ item.name }}</b>
                  </p>
                  <p style="margin: 0px; font-size: 12px; color: gray">
                    {{ item.message ? item.message : "--" }}
                  </p>
                </el-card>
              </a>
            </el-col>
            <el-col :span="24">
              <p class="color-gray text-center">
                只含前 30 名赞助者，查看完整赞助名单或进行赞助支持请前往
                <a href="https://mcsmanager.com/" target="_blank" rel="noopener noreferrer">
                  MCSManager 官方网站
                </a>
              </p>
            </el-col>
          </el-row>
          <div v-else>
            <p>暂无数据</p>
          </div>
        </div>

        <div>
          <p class="color-gray text-center">
            版权所有
            <a target="black" href="https://github.com/Suwings">Suwings</a>
          </p>
        </div>
      </template>
    </Panel>
  </div>
</template>

<style scoped>
.selectedForwardMode {
  border: 1px solid #0450ff;
  color: #409eff;
}
</style>

<script>
import Panel from "../../components/Panel";
import SystemIndex from "../../components/SystemImage.vue";
import { API_SETTINGS } from "../service/common";
import { request } from "../service/protocol";
import SelectBlock from "../../components/SelectBlock";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Panel, SystemIndex, SelectBlock },
  data: function () {
    return {
      settings: {},
      sponsorList: null
    };
  },
  methods: {
    async refresh() {
      await this.render();
      this.$message({ message: "已刷新", type: "success" });
    },
    async render() {
      this.settings = await request({
        method: "GET",
        url: API_SETTINGS
      });
    },
    async updateSettings() {
      try {
        await request({
          method: "PUT",
          url: API_SETTINGS,
          data: this.settings
        });
        this.$message({ message: "已更新，部分选项生效可能需要重启面板", type: "success" });
      } catch (error) {
        this.$message({ message: error, type: "error" });
      }
    },
    loadSponsorList() {
      if (window.sponsorList) {
        const arr = window.sponsorList();
        for (const i in arr) {
          for (const j in arr) {
            if (arr[i].price > arr[j].price) {
              const tmp = arr[i];
              arr[i] = arr[j];
              arr[j] = tmp;
            }
          }
        }
        this.sponsorList = arr.slice(0, 30);
      } else {
        this.sponsorList = null;
      }
    },
    async changeForwardType(v) {
      await this.$confirm(
        "您确定要更改分布式流量转发类型吗？更改后某些配置可能需要重新调整，您随时可以调整回来。",
        "最终确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      this.settings.forwardType = v;
      this.$message({ message: "点击最上方保存按钮即可更改", type: "info" });
    }
  },
  async mounted() {
    await this.render();
    setTimeout(this.loadSponsorList, 3000);
  }
};
</script>

<style scoped>
.system-index-block {
  margin: 0px 0px 24px 0px;
}
.config-item {
  margin-top: 10px;
}
</style>
