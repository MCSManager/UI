<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-08-01 20:19:03
 * @Description: 
-->

<template>
  <Panel>
    <template #title>实例详细信息</template>
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
            <div class="sub-title">已用储存 (MB)</div>
            <p v-text="Number(instanceInfo.space / 1024 / 1024).toFixed(2)"></p>
            <div class="sub-title">到期时间</div>
            <p v-text="instanceInfo.config.endTime ? instanceInfo.config.endTime : '无限制'"></p>
          </el-col>
          <el-col :md="16">
            <el-row :gutter="20">
              <el-col :md="12" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">实例名称</div>
                  <div class="sub-title-info">支持中文，尽可能保证唯一性</div>
                </div>
                <el-input v-model="instanceInfo.config.nickname" type="text"> </el-input>
              </el-col>
              <el-col :md="12" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">类型</div>
                  <div class="sub-title-info">不同类型可能会导致功能的实现不同</div>
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
                    适用于任何程序启动命令，列如 cmd.exe /c ping localhost
                  </div>
                </div>
                <el-input v-model="instanceInfo.config.startCommand" type="text"> </el-input>
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
                  <div class="sub-title-title">输入编码</div>
                </div>
                <el-input v-model="instanceInfo.config.ie" type="text"> </el-input>
              </el-col>
              <el-col :md="8" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">输出编码</div>
                </div>
                <el-input v-model="instanceInfo.config.oe" type="text"> </el-input>
              </el-col>
              <el-col :md="8" class="row-mt">
                <div class="sub-title">
                  <div class="sub-title-title">关闭命令</div>
                </div>
                <el-input v-model="instanceInfo.config.stopCommand" type="text"> </el-input>
              </el-col>
              <el-col :md="8" class="row-mt" :offset="0">
                <div class="sub-title">
                  <div class="sub-title-title">最大储存（单位GB）</div>
                </div>
                <el-input v-model="instanceInfo.config.maxSpace" type="text"> </el-input>
              </el-col>
              <el-col :md="8" class="row-mt" :offset="0">
                <div class="sub-title">
                  <div class="sub-title-title">到期时间</div>
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

        <el-collapse class="row-mt">
          <el-collapse-item title="虚拟化容器配置（Docker）">
            <div class="dokcer-config-view" v-if="instanceInfo.config.docker">
              <el-row :gutter="20">
                <el-col :span="6" class="row-mt" :offset="0">
                  <div class="sub-title">镜像名</div>
                  <el-input v-model="instanceInfo.config.docker.image" type="text"> </el-input>
                </el-col>
                <el-col :span="18" class="row-mt" :offset="0">
                  <div class="sub-title">
                    开放端口（多个以空格分割，冒号左边为容器内部端口，右边为主机端口，通常保持一致即可）
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
                <el-col :span="8" class="row-mt">
                  <div class="sub-title">最大内存（单位 MB）</div>
                  <el-input v-model="instanceInfo.config.docker.xmx" type="text"> </el-input>
                </el-col>
                <el-col :span="8" class="row-mt">
                  <div class="sub-title">最大CPU核心数</div>
                  <el-input v-model="instanceInfo.config.docker.cpu" type="text"> </el-input>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>

        <el-row :gutter="20" class="row-mt">
          <el-col :md="24" style="text-align: right">
            <el-button type="info" size="small" @click="toConsole">转到控制台</el-button>
            <el-button type="success" size="small" @click="saveConfig">保存配置</el-button>
            <el-button type="warning" size="small" @click="back">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </template>
  </Panel>
</template>

<script>
import { API_INSTANCE } from "../service/common";
import { processTypeList, statusCodeToText } from "../service/instance_tools";
import Panel from "../../components/Panel";
import router from "../router";
import { request } from "../service/protocol";
// import qs from "qs";

export default {
  components: { Panel },
  data() {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      instanceInfo: {
        config: {}
      },
      typeList: processTypeList(),
      display: false,
      loading: true
    };
  },
  methods: {
    back() {
      router.push({ path: `/instances/` });
    },
    toConsole() {
      router.push({ path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    async saveConfig() {
      // 保存实例配置文件
      try {
        console.log("正在保存1:", this.instanceInfo.config);
        const postData = JSON.parse(JSON.stringify(this.instanceInfo.config));
        postData.docker.ports = this.instanceInfo.config.docker.ports.split(" ");
        if (typeof this.instanceInfo.endtime === "object")
          postData.endtime = this.instanceInfo.endtime.toLocaleDateString();
        console.log("正在保存2:", postData);
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
    console.log("实例信息:", this.instanceInfo);
  }
};
</script>

<style></style>
