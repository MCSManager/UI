<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>{{ $t("settings.setOperate") }}</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <ItemGroup>
            <el-button type="success" size="small" @click="updateSettings">{{
              $t("settings.updateSet")
            }}</el-button>
            <el-button type="" size="small" @click="refresh">{{ $t("general.refresh") }}</el-button>
          </ItemGroup>
        </div>
        <span class="color-gray hidden-md-and-down"
          >{{ $t("settings.updateSetInfo") }}&nbsp;&nbsp;</span
        >
      </div>
    </template>
  </Panel>

  <div v-if="settings">
    <Panel>
      <template #title>{{ $t("settings.basicSetting") }}</template>
      <template #default>
        <el-row :gutter="20">
          <el-col :md="12">
            <!-- <div class="system-index-block">
              <SystemIndex></SystemIndex>
            </div> -->
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">{{ $t("settings.accessPort") }}</p>
                <p class="sub-title-info">
                  {{ $t("settings.accessPortInfo") }}
                </p>
              </div>
              <el-input :placeholder="$t('settings.inputNum')" v-model="settings.httpPort">
              </el-input>
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
                <p class="sub-title-title">{{ $t("settings.bindIP") }}</p>
                <p class="sub-title-info">
                  {{ $t("settings.bindIPInfo") }}
                </p>
              </div>
              <el-input :placeholder="$t('settings.inputIP')" v-model="settings.httpIp"> </el-input>
            </div>

            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">{{ $t("settings.loginPage") }}</p>
                <p class="sub-title-info">
                  {{ $t("settings.loginPageInfo") }}
                </p>
              </div>
              <el-input :placeholder="$t('settings.inputCopy')" v-model="settings.loginInfo">
              </el-input>
            </div>
          </el-col>

          <el-col :md="4"></el-col>
          <el-col :md="8">
            <div>
              <div class="sub-title">
                <p class="sub-title">{{ $t("settings.referenceLink") }}</p>
                <p class="sub-title-info">
                  {{ $t("settings.referenceLinksInfo") }}
                </p>
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
      <template #title>{{ $t("settings.limitAndSecurity") }}</template>
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
                <p class="sub-title-title">{{ $t("settings.canFileManager") }}</p>
                <p class="sub-title-info">
                  {{ $t("settings.canFileManagerInfo") }}
                </p>
              </div>
              <el-select
                v-model="settings.canFileManager"
                :placeholder="$t('general.pleaseSelect')"
              >
                <el-option :label="$t('general.allow')" :value="true"></el-option>
                <el-option :label="$t('general.forbid')" :value="false"></el-option>
              </el-select>
            </div>
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">{{ $t("settings.crossAPI") }}</p>
                <p class="sub-title-info">
                  {{ $t("settings.crossAPIInfo") }}
                </p>
              </div>
              <el-select v-model="settings.crossDomain" :placeholder="$t('general.pleaseSelect')">
                <el-option :label="$t('general.enable')" :value="true"></el-option>
                <el-option :label="$t('general.forbid')" :value="false"></el-option>
              </el-select>
            </div>
            <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">{{ $t("settings.loginCheckIp") }}</p>
                <p class="sub-title-info">
                  {{ $t("settings.loginCheckIpInfo") }}
                </p>
              </div>
              <el-select v-model="settings.loginCheckIp" :placeholder="$t('general.pleaseSelect')">
                <el-option :label="$t('general.enable')" :value="true"></el-option>
                <el-option :label="$t('general.forbid')" :value="false"></el-option>
              </el-select>
            </div>
            <!-- <div class="config-item">
              <div class="sub-title">
                <p class="sub-title-title">使用 Gzip 静态文件压缩</p>
                <p class="sub-title-info">
                  如果你使用反向代理或某 HTTP 服务自带的 Gzip，请关闭它，否则可以使用默认值。
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
                  对于机械硬盘请略调小此值，对于高性能硬盘和 CPU 可以适当提高。
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
              <el-select v-model="settings.maxDownload" placeholder="请选择">
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
                <p class="sub-title">{{ $t("settings.attention") }}</p>
                <p class="sub-title-info">
                  <span v-html="$t('settings.attentionInfo')"></span>
                </p>
              </div>
              <!-- <div class="sub-title">
                <p class="sub-title">常见概念</p>
              </div>
              <a class="alink" href="https://cn.bing.com/search?q=%E5%B9%B6%E5%8F%91">
                <p>什么是并发？</p>
              </a>
              <a class="alink" href="https://cn.bing.com/search?q=Gzip+%E5%8E%8B%E7%BC%A9">
                <p>什么是 Gzip 压缩？</p>
              </a>
              <a class="alink" href="https://github.com/MCSManager/MCSManager/issues">
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
      <template #title>{{ $t("settings.about") }}</template>
      <template #default>
        <div class="sub-title">
          <p class="sub-title-title">
            <span v-html="$t('settings.aboutTitle')"></span>
          </p>
          <p class="sub-title-info">
            <span v-html="$t('settings.aboutTitleInfo')"></span>
          </p>
        </div>

        <div class="sub-title">
          <p class="sub-title-title">{{ $t("settings.closedSource") }}</p>
          <p class="sub-title-info">
            {{ $t("settings.closedSourceInfo") }}
          </p>
        </div>
        <div>
          <ItemGroup>
            <a
              href="https://mcsmanager.com/#app-download"
              target="_blank"
              rel="noopener noreferrer"
              style="display: inline-block"
            >
              <el-button type="" size="medium">{{ $t("settings.learnMore") }}</el-button>
            </a>
            <a
              href="https://mcsmanager.com/agreement.html"
              target="_blank"
              rel="noopener noreferrer"
              style="display: inline-block"
            >
              <el-button type="" size="medium">{{ $t("settings.userAgreement") }}</el-button>
            </a>
          </ItemGroup>
        </div>

        <div class="contributors" v-if="sponsorList">
          <div class="sub-title">
            <p class="sub-title-title">{{ $t("settings.sponsorList") }}</p>
            <p class="sub-title-info">
              {{ $t("settings.sponsorListInfo") }}
              <a href="https://mcsmanager.com/" target="_blank" rel="noopener noreferrer">
                MCSManager.com </a
              >。
            </p>
            <p class="sub-title-info"></p>
          </div>
          <el-row :gutter="10">
            <el-col :span="24">
              <div
                v-for="(item, index) in sponsorList"
                :key="index"
                style="margin: 0px 8px 4px 0px; display: inline-block"
              >
                <a
                  :href="item.link || 'https://mcsmanager.com'"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="text-decoration: underline"
                >
                  <span style="margin: 0px; font-size: 13px">
                    {{ item.name }}
                  </span>
                </a>
              </div>
            </el-col>
          </el-row>
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
      this.$message({ message: this.$t("general.refreshFinish"), type: "success" });
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
        this.$message({ message: this.$t("settings.settingUpdate"), type: "success" });
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
        this.sponsorList = arr.slice(0, 40);
      } else {
        this.sponsorList = null;
      }
    }
    //async changeForwardType(v) {
    //}
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
.contributors {
  margin: 10px 0px;
}
</style>
