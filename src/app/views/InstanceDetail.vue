<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-09-08 17:12:24
 * @Description: 
-->

<template>
  <Panel>
    <template #title>实例详细信息设置</template>
    <template #default>
      <div v-loading="loading" element-loading-text="获取中">
        <el-row :gutter="20">
          <el-col :md="8">
            <div class="sub-title">唯一标识符（UUID）</div>
            <p v-text="instanceInfo.instanceUuid"></p>
            <div class="sub-title">远程标识符（GUID）</div>
            <p v-text="serviceUuid"></p>
            <div class="sub-title">当前状态</div>
            <p v-text="codeToText(instanceInfo.status)"></p>
            <div class="sub-title">已启动次数</div>
            <p v-text="instanceInfo.started"></p>
            <div class="sub-title">创建日期</div>
            <p v-text="instanceInfo.config.createDatetime"></p>
            <div class="sub-title">最后启动日期</div>
            <p v-text="instanceInfo.config.lastDatetime"></p>
            <div class="sub-title">到期时间</div>
            <p v-text="instanceInfo.config.endTime ? instanceInfo.config.endTime : '无限制'"></p>
            <div class="sub-title">进程类型</div>
            <p v-text="instanceInfo.config.processType"></p>
          </el-col>
          <el-col :md="16">
            <el-row :gutter="20">
              <el-col :md="24">
                <div class="sub-title">
                  <div class="sub-title-title">实例名称</div>
                  <div class="sub-title-info">支持中文，尽可能保证唯一性</div>
                </div>
                <el-input v-model="instanceInfo.config.nickname" type="text"> </el-input>
              </el-col>
              <el-col :md="24" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">实例类型</div>
                  <div class="sub-title-info">
                    不同类型会导致功能不同，若无需求类型，可以选择较为抽象的通用类型，列如 Java
                    通用版服务端
                  </div>
                </div>
                <el-select
                  v-model="instanceInfo.config.type"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="(item, index) in typeList"
                    :key="index"
                    :label="item"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :md="24" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">启动命令</div>
                  <div class="sub-title-info">
                    <span>
                      适用于任何程序命令，若程序路径或附加参数中含有空格可使用双引号作为边界，包含的文本将视作一段整体
                    </span>
                    <br />
                    <span>
                      通常情况下，建议使用命令助手生成启动命令，如果有额外需求可以自定义启动命令
                    </span>
                    <br />
                    <span>
                      列如 "C:\Program Files\Java\bin\java.exe" -server -jar "my server.jar" -nogui
                    </span>
                  </div>
                </div>
                <div class="flex">
                  <el-input v-model="instanceInfo.config.startCommand" type="text"> </el-input>
                  <el-button type="primary" plain @click="openCommandAssistCall(1)">
                    命令生成
                  </el-button>
                </div>
              </el-col>
              <el-col :md="24" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">工作目录</div>
                  <div class="sub-title-info">实例运行的工作目录，可填绝对路径与相对路径</div>
                </div>
                <el-input v-model="instanceInfo.config.cwd" type="text"> </el-input>
              </el-col>
              <el-col :md="8" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">终端输入编码</div>
                  <div class="sub-title-info">如 GBK/UTF-8/big5 等</div>
                </div>
                <el-input v-model="instanceInfo.config.ie" type="text"> </el-input>
              </el-col>
              <el-col :md="8" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">终端输出编码</div>
                  <div class="sub-title-info">如 GBK/UTF-8/big5 等</div>
                </div>
                <el-input v-model="instanceInfo.config.oe" type="text"> </el-input>
              </el-col>
              <el-col :md="8" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">关闭实例命令</div>
                  <div class="sub-title-info">^C 代表发送 Ctrl+C 组合键</div>
                </div>
                <el-input v-model="instanceInfo.config.stopCommand" type="text"> </el-input>
              </el-col>

              <el-col :md="16" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">进程类型</div>
                  <div class="sub-title-info">
                    进程启动方式和交互方式，一般情况下选择默认类型即可
                  </div>
                </div>
                <el-select v-model="instanceInfo.config.processType" style="width: 100%">
                  <el-option label="默认类型" value="general"></el-option>
                  <el-option label="Linux Docker 容器" value="docker"></el-option>
                </el-select>
              </el-col>
              <el-col :md="8" class="row-mt" :offset="0">
                <div class="sub-title">
                  <div class="sub-title-title">到期时间</div>
                  <div class="sub-title-info">到期后无法启动</div>
                </div>
                <el-date-picker
                  v-model="instanceInfo.config.endTime"
                  type="date"
                  placeholder="无限制"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <div class="dokcer-config-view row-mt" v-if="instanceInfo.config.processType === 'docker'">
          <div class="sub-title">
            <div class="sub-title-title">Docker 容器配置</div>
            <div class="sub-title-info">
              Docker
              是一种轻量级虚拟化软件，可以给每个实例使用“环境镜像”来随时启动全新的系统容器，使用完毕后立刻删除，可保证宿主机安全和稳定性
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :md="6" class="row-mt" :offset="0">
              <div class="sub-title">
                <div class="sub-title-title">环境镜像</div>
                <div class="sub-title-info">指定实例镜像</div>
              </div>
              <el-select
                filterable
                v-model="instanceInfo.config.docker.image"
                placeholder="请选择"
                @focus="loadImages"
                style="width: 100%"
                v-loading="componentsLoading"
              >
                <el-option
                  v-for="item in images"
                  :key="item.RepoTags[0]"
                  :label="item.RepoTags[0]"
                  :value="item.RepoTags[0]"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :md="18" class="row-mt" :offset="0">
              <div class="sub-title">
                <div class="sub-title-title">开放端口</div>
                <div class="sub-title-info">
                  多个以空格分割，冒号左边为宿主机暴露端口，右边为容器暴露端口，通常保持一致即可
                </div>
              </div>
              <el-input
                v-model="instanceInfo.config.docker.ports"
                type="text"
                placeholder="示例 25565:25565/tcp 3380:3380/udp"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="6" class="row-mt">
              <div class="sub-title">最大内存（单位 MB）</div>
              <el-input v-model="instanceInfo.config.docker.memory" type="text"> </el-input>
            </el-col>
          </el-row>
        </div>

        <el-row :gutter="20" class="row-mt">
          <el-col :md="24" style="text-align: right">
            <ItemGroup>
              <el-button size="small" @click="toConsole">控制台</el-button>
              <el-button size="small" @click="toFileManager">文件管理</el-button>
              <el-button size="small" @click="back">返回</el-button>
              <el-button type="success" size="small" @click="saveConfig">保存配置</el-button>
            </ItemGroup>
          </el-col>
        </el-row>
      </div>
    </template>
  </Panel>

  <!-- 命令助手 -->
  <CommandAssist v-model="commandAssistPanel" :result="commandAssistCallback"></CommandAssist>
</template>

<script>
import { API_IMAGES, API_INSTANCE } from "../service/common";
import { processTypeList, statusCodeToText } from "../service/instance_tools";
import Panel from "../../components/Panel";
import router from "../router";
import { request } from "../service/protocol";
import CommandAssist from "../../components/CommandAssist";
// import qs from "qs";

export default {
  components: { Panel, CommandAssist },
  data() {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      instanceInfo: {
        config: {}
      },
      typeList: processTypeList(),
      display: false,
      loading: true,
      images: [],
      componentsLoading: false,
      commandAssistPanel: false
    };
  },
  methods: {
    back() {
      router.go(-1);
    },
    toFileManager() {
      router.push({ path: `/file/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    toConsole() {
      router.push({ path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    async saveConfig() {
      // 保存实例配置文件
      try {
        const postData = JSON.parse(JSON.stringify(this.instanceInfo.config));
        postData.docker.ports = this.instanceInfo.config.docker.ports.split(" ");
        console.log(this.instanceInfo.config);
        if (!this.instanceInfo.config.endTime) postData.endTime = "";
        else if (typeof this.instanceInfo.config.endTime === "object")
          postData.endTime = this.instanceInfo.config.endTime.toLocaleDateString();

        console.log(postData);
        await request({
          method: "PUT",
          url: API_INSTANCE,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid },
          data: postData
        });
        this.$message({ message: "保存成功", type: "success" });
      } catch (err) {
        this.$message({ message: err.message, type: "error" });
      }
    },
    codeToText(p) {
      return statusCodeToText(p);
    },
    async loadImages() {
      this.componentsLoading = true;
      try {
        this.images = await request({
          method: "GET",
          url: API_IMAGES,
          params: {
            remote_uuid: this.serviceUuid
          }
        });
      } catch (error) {
        this.$message({
          message: "无法获得远程主机镜像列表，建议前往“服务环境”界面创建镜像",
          type: "error"
        });
      } finally {
        this.componentsLoading = false;
      }
      return this.images;
    },

    openCommandAssistCall() {
      this.commandAssistPanel = true;
    },
    commandAssistCallback(cmd) {
      this.instanceInfo.config.startCommand = cmd;
    }
  },
  async mounted() {
    const result = await request({
      method: "GET",
      url: API_INSTANCE,
      params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid }
    });
    this.instanceInfo = result;
    // 特殊处理字段
    if (this.instanceInfo.config.docker && this.instanceInfo.config.docker.ports) {
      this.instanceInfo.config.docker.ports = this.instanceInfo.config.docker.ports.join(" ");
    }
    this.loading = false;
  }
};
</script>
