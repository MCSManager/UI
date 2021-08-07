<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-28 13:45:55
 * @Description: 
-->

<template>
  <el-row>
    <el-col :span="24">
      <Panel>
        <template #title>新增实例</template>
        <template #default>
          <div class="">
            <el-steps :active="page" finish-status="success" align-center>
              <el-step title="实例类型"></el-step>
              <el-step title="分配主机"></el-step>
              <el-step title="基本参数"></el-step>
              <el-step title="容器设置"></el-step>
              <el-step title="最终确认"></el-step>
            </el-steps>
          </div>

          <!-- 不同步骤的动态内容，这里采用简单的方式实现 -->
          <div v-show="page == 0" class="panel-context row-mt-40">
            <h2>根据需求选择合适的实例类型。</h2>
            <div class="select-box-wrapper">
              <SelectBlock @click="selectType(1)">
                <h3>Java 版 Minecraft 服务端</h3>
                <p>适用于类似于 Spigot，Bungeecord 等 Jar 格式文件的服务端</p>
              </SelectBlock>
              <SelectBlock @click="selectType(2)">
                <h3>基岩版 Minecraft 服务端</h3>
                <p>适用于基岩版等 exe 格式或其他格式的服务端软件</p>
              </SelectBlock>
              <SelectBlock @click="selectType(3)">
                <h3>自定义命令程序</h3>
                <p>适用于类似于 bash，cmd.exe 和其他任何可用命令启动的程序</p>
              </SelectBlock>
            </div>
          </div>

          <div v-show="page == 1" class="panel-context row-mt-40">
            <h2>请选择此实例要分配到哪个主机？</h2>
            <div
              v-for="(item, index) in services"
              :key="index"
              class="select-tag"
              @click="selectRemoteService(item.uuid)"
            >
              {{ item.ip }}:{{ item.port }}
            </div>
            <p class="sub-title">
              如果您不知道应该如何选择，请选择 Localhost 或者 127.0.0.1 的主机。
            </p>
            <div class="panel-context row-mt-40" style="text-align: right">
              <el-button type="success" @click="up" size="small">上一步</el-button>
            </div>
          </div>

          <div v-show="page == 2 && type == 1" class="panel-context row-mt-40">
            <h2>完善此实例的基本信息</h2>
            <div class="row-mt">
              <el-input placeholder="请输入内容" v-model="input1">
                <template #prepend>实例昵称</template>
              </el-input>
            </div>
            <div class="row-mt">
              <el-input placeholder="请输入内容" v-model="input1">
                <template #prepend>Jar 文件名</template>
              </el-input>
            </div>
            <div class="row-mt">
              <el-input placeholder="请输入内容" v-model="input1">
                <template #prepend>工作目录</template>
              </el-input>
            </div>
            <div class="panel-context row-mt-40" style="text-align: right">
              <el-button type="success" @click="up" size="small">上一步</el-button>
              <el-button type="success" @click="down" size="small">下一步</el-button>
            </div>
          </div>

          <div v-show="page == 2 && type == 3" class="panel-context row-mt-40">
            <h2>完善此实例的基本信息</h2>
            <el-row :gutter="20" class="row-mt">
              <el-col :span="16" :offset="0">
                <el-input placeholder="请输入内容" v-model="form.nickname">
                  <template #prepend>实例昵称</template>
                </el-input>
              </el-col>
              <el-col :md="8" :offset="0">
                <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  placeholder="选择使用到期时间"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-col>
            </el-row>
            <div class="row-mt">
              <el-input placeholder="请输入内容" v-model="form.startCommand">
                <template #prepend>启动命令</template>
              </el-input>
            </div>
            <div class="row-mt">
              <el-input placeholder="请输入内容" v-model="form.cwd">
                <template #prepend>工作目录</template>
              </el-input>
            </div>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <div class="row-mt">
                  <el-input placeholder="默认是 Ctrl+C 用 ^C 表示" v-model="form.stopCommand">
                    <template #prepend>关闭命令</template>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="12" :offset="0">
                <div class="row-mt">
                  <el-input placeholder="单位GB" v-model="form.maxSpace">
                    <template #prepend>最大可用储存</template>
                  </el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12" :offset="0">
                <div class="row-mt">
                  <el-input placeholder="默认是 Ctrl+C 用 ^C 表示" v-model="form.ie">
                    <template #prepend>标准输入流编码</template>
                  </el-input>
                </div>
              </el-col>
              <el-col :md="12" :offset="0">
                <div class="row-mt">
                  <el-input placeholder="单位GB" v-model="form.oe">
                    <template #prepend>标准输出流编码</template>
                  </el-input>
                </div>
              </el-col>
            </el-row>
            <p class="sub-title">更多设置信息在创建完毕后可在实例的"编辑"页面进行设置。</p>
            <div class="panel-context row-mt-40" style="text-align: right">
              <el-button type="success" @click="up" size="small">上一步</el-button>
              <el-button type="success" @click="down" size="small">下一步</el-button>
            </div>
          </div>

          <div v-show="page == 3" class="panel-context row-mt-40">
            <h2>是否需要使用容器？</h2>
            <p class="sub-title">
              如果您运行的程序是个人或内部使用（非商业），那么可以忽略此功能直接点击“下一步”按钮。
            </p>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="sub-title">启用容器</div>
                <el-select v-model="isDocker" style="width: 100%">
                  <el-option label="禁用" :value="false"></el-option>
                  <el-option label="启用" :value="true"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <div class="sub-title">选择容器镜像</div>
                <el-select
                  v-model="form.docker.image"
                  placeholder="请选择"
                  style="width: 100%"
                  :disabled="!isDocker"
                >
                  <el-option label="默认镜像" value="mcsd"></el-option>
                  <el-option label="java16" value="java16"></el-option>
                  <el-option label="linux" value="linux"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6" :offset="0">
                <div class="sub-title">最大内存</div>
                <el-input
                  v-model="form.docker.xmx"
                  placeholder="单位为MB，如 1024 即可"
                  :disabled="!isDocker"
                ></el-input>
              </el-col>
              <el-col :span="6" :offset="0">
                <div class="sub-title">CPU核心数</div>
                <el-input
                  v-model="form.docker.cpu"
                  placeholder="单位为MB，如 1024 即可"
                  :disabled="!isDocker"
                ></el-input>
              </el-col>
              <el-col :span="24" class="row-mt">
                <div class="sub-title">开放端口，开放多个需用空格分割格式如下</div>
                <el-input
                  v-model="form.docker.ports"
                  placeholder="列如：25565:25565/tcp 8080:8080/tcp 81:81/udp"
                  :disabled="!isDocker"
                ></el-input>
              </el-col>
            </el-row>

            <div class="panel-context row-mt-40" style="text-align: right">
              <el-button type="success" @click="up" size="small">上一步</el-button>
              <el-button type="success" @click="down" size="small">下一步</el-button>
            </div>
          </div>

          <div v-show="page == 4" class="panel-context row-mt-40">
            <h2>基本参数填写完毕，准备创建</h2>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <p>名称: {{ form.nickname }}</p>
                <p>启动命令: {{ form.startCommand }}</p>
                <p>工作目录: {{ form.cwd }}</p>
                <p>输入编码: {{ form.ie }}</p>
                <p>创建日期: {{ form.createDatetime }}</p>
                <p>容器: {{ form.isDocker ? "启用" : "禁用" }}</p>
                <p>最大空间: {{ form.maxSpace }}GB</p>
              </el-col>
              <el-col :span="12" :offset="0">
                <p>到期时间: {{ form.endTime }}</p>
                <p>停止命令: {{ form.stopCommand }}</p>
                <p>输出编码: {{ form.oe }}</p>
                <p>类型: {{ form.type }}</p>
                <p>容器镜像名: {{ form.docker.image }}</p>
                <p>容器最大内存: {{ form.docker.xmx }}</p>
                <p>容器暴露端口: {{ form.docker.ports }}</p>
                <p>容器核心数: {{ form.docker.cpu }}</p>
              </el-col>
            </el-row>

            <div class="panel-context row-mt-40" style="text-align: right">
              <el-button type="success" @click="up" size="small">上一步</el-button>
              <el-button type="primary" @click="createInstance" size="small">创建实例</el-button>
            </div>
          </div>

          <div v-show="page == 5" class="panel-context row-mt-40">
            <h2>创建成功！您已完成基本步骤，接下来您可以：</h2>
            <div class="select-box-wrapper">
              <SelectBlock>
                <h3>前往此实例编辑页面</h3>
                <p>修改更多详细设置和具体参数</p>
              </SelectBlock>
              <SelectBlock>
                <h3>前往实例控制台</h3>
                <p>开启/关闭/上传文件等具体操作</p>
              </SelectBlock>
              <SelectBlock>
                <h3>回到实例列表</h3>
                <p>查看分布式的所有实例列表</p>
              </SelectBlock>
            </div>
          </div>
        </template>
      </Panel>
    </el-col>
  </el-row>
</template>

<script>
import Panel from "../../components/Panel";

import SelectBlock from "../../components/SelectBlock";
import axios from "axios";
import { API_INSTANCE, API_SERVICE } from "../service/common";
import { request } from "../service/protocol";

export default {
  components: { Panel, SelectBlock },
  data: function () {
    return {
      stepActive: 0,
      page: 0,
      type: -1,
      service: "",
      services: [],
      isDocker: false,
      form: {
        nickname: "未定义的名字",
        startCommand: "",
        stopCommand: "^c",
        cwd: ".",
        ie: "GBK",
        oe: "GBK",
        createDatetime: new Date().toDateString(),
        lastDatetime: "",
        type: "TYPE_UNIVERSAL",
        tag: [],
        maxSpace: null,
        endTime: "",
        docker: {
          image: "",
          xmx: "",
          ports: "",
          cpu: ""
        }
      }
    };
  },
  methods: {
    async createInstance() {
      try {
        console.log("正在保存:", this.form);
        const postData = JSON.parse(JSON.stringify(this.form));
        postData.docker.ports = this.form.docker.ports.split(" ");
        await request({
          method: "POST",
          url: API_INSTANCE,
          params: { remote_uuid: this.service },
          data: postData
        });
        this.$message({ message: "创建成功", type: "success" });
        this.down();
      } catch (err) {
        this.$message({
          type: "error",
          message: `创建失败，原因: ${err.message}`
        });
        console.error("创建失败，原因:", err);
      }
    },
    selectType(v) {
      this.type = v;
      this.down();
    },
    selectRemoteService(service) {
      console.log("选择分配到:", service);
      this.service = service;
      this.down();
    },
    up() {
      if (this.page > 0) this.page -= 1;
    },
    down() {
      this.page += 1;
    }
  },
  async mounted() {
    const result = await axios.get(API_SERVICE);
    const responseObjects = result.data.data;
    responseObjects.forEach((v) => {
      this.services.push(v);
    });
  }
};
</script>

<style>
.select-box-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
