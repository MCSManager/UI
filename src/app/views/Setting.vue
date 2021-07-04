<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-04 17:04:34
 * @Description: 
-->

<template>
  <Panel>
    <template #title>配置操作</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <el-button type="success" size="mini">更新配置</el-button>
          <el-button type="" size="mini">刷新</el-button>
        </div>
        <span class="color-gray">部分配置可能需要重启面板才能生效&nbsp;&nbsp;</span>
      </div>
    </template>
  </Panel>

  <Panel>
    <template #title>基础设置</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :md="12" class="row-mt">
          <div class="system-index-block">
            <SystemIndex></SystemIndex>
          </div>
          <div class="config-item">
            <div class="sub-title">
              <p class="sub-title-title">面板访问端口</p>
              <p class="sub-title-info">建议修改成非默认端口以确保基本的安全性。</p>
            </div>

            <el-input placeholder="请必须填入数字" v-model="input1"> </el-input>
          </div>
          <div class="config-item">
            <div class="sub-title">
              <p class="sub-title-title">面板绑定IP</p>
              <p class="sub-title-info">一般情况请保持默认值，一般适用于多个IP的场景。</p>
            </div>
            <el-input placeholder="默认 0.0.0.0 | 可不填" v-model="input1"> </el-input>
          </div>
        </el-col>

        <el-col :md="4"></el-col>
        <el-col :md="8" class="row-mt">
          <div>
            <div class="sub-title">
              <p class="sub-title-title">相关参考链接</p>
              <p class="sub-title-info">
                面板的大部分设置十分重要，在一般情况下，绝大部分参数都无需更改，如果某个参数您并不知晓代表什么，那么建议您不要对其进行修改。
              </p>
              <p class="sub-title-info">或者，您可以考虑阅读以下链接。</p>
            </div>
            <a class="alink" href="http://"> <p>面板设置配置手册</p></a>
            <a class="alink"> <p>反馈问题</p></a>
          </div>
        </el-col>
      </el-row>
    </template>
  </Panel>
  <Panel>
    <template #title>限制与安全</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :md="12" class="row-mt">
          <div class="config-item">
            <div class="sub-title">
              <p class="sub-title-title">跨域请求 API 接口</p>
              <p class="sub-title-info">启动此项目可能会降低安全性，但是会提高开发扩展性。</p>
            </div>
            <el-select v-model="value" placeholder="请选择">
              <el-option label="启用" :value="true"></el-option>
              <el-option label="禁止" :value="false"></el-option>
            </el-select>
          </div>
          <div class="config-item">
            <div class="sub-title">
              <p class="sub-title-title">使用 gzip 静态文件压缩</p>
              <p class="sub-title-info">
                如果你使用反向代理或某 HTTP 服务自带的gzip，请关闭它，否则可以使用默认值。
              </p>
            </div>
            <el-select v-model="value" placeholder="请选择">
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
            <el-select v-model="value2" placeholder="请选择">
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
            <el-select v-model="value2" placeholder="请选择">
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
          </div>
        </el-col>

        <el-col :md="4"></el-col>
        <el-col :md="8" class="row-mt">
          <div>
            <div class="sub-title">
              <p class="sub-title-title">注意事项</p>
              <p class="sub-title-info">
                这些配置设置需要一部分专业知识，您可以根据您的硬件设备来大概猜测哪些值适合您。<br />一般情况下，默认值可以满足两至三个人的使用场景，如果规模一旦更大，对硬件的要求更高，为了不过分损失用户体验，一个合适的阈值是十分重要的。
              </p>
            </div>
            <div class="sub-title">
              <p class="sub-title-title">常见概念</p>
            </div>
            <a class="alink" href="https://cn.bing.com/"> <p>什么是并发？</p></a>
            <a class="alink" href="https://cn.bing.com/"> <p>什么是 gzip 压缩？</p></a>
            <a class="alink" href="https://cn.bing.com/"> <p>反馈问题</p></a>
          </div>
        </el-col>
      </el-row>
    </template>
  </Panel>
</template>

<script>
import Panel from "../../components/Panel";
import SystemIndex from "../../components/SystemImage.vue";

export default {
  components: { Panel, SystemIndex },
  data: function () {
    return {
      input1: "",
      value: false,
      value2: 1,
      value3: ""
    };
  },
  methods: {}
};
</script>

<style>
.system-index-block {
  margin: 0px 0px 24px 0px;
}
.config-item {
  margin-top: 10px;
}
</style>
