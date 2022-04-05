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

  <div v-if="transmissions">
    <Panel>
      <template #title>所有通讯模块</template>
      <template #default>
        <div class="config-item" :key="index" v-for="(transmission, index) in transmissions">
          <div class="sub-title">
            <p class="sub-title-title">{{  transmission.name  }}</p>
          </div>
        </div>
      </template>
    </Panel>
    <Panel>
      <template #title>添加通讯模块</template>
      <template #default>
        <el-tabs :active-name="addTransmissionForm.options.selectTab" tab-position="right">
          <el-tab-pane name="1" label="基本信息">
            <el-form ref="form1" :model="addTransmissionForm.form1" :rules="addTransmissionForm.form1.rules">
              <el-form-item label="通讯类型" prop="name">
                <el-select v-model="addTransmissionForm.form1.name" placeholder="请选择通讯方式">
                  <el-option :key="index" v-for="(transmission, index) in transmissions" :label="transmission.name" :value="transmission.name" />
                </el-select>
              </el-form-item>
              <el-form-item label="通讯地址" prop="url">
                <el-input v-model="addTransmissionForm.form1.url" />
              </el-form-item>
              <el-form-item label="通讯密钥" prop="secret">
                <el-input v-model="addTransmissionForm.form1.secret" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="toDetailsForm">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="2" label="详细信息">
            <el-form ref="form2" :model="addTransmissionForm.form2">
              <el-form-item :rules="{required: true,message: '请输入内容', trigger: 'blur',}" :label="item.k" :prop="item.v" v-for="(item) in addTransmissionForm.form2.config" :key="item.k">
                <el-input v-model="item.v" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="toTestForm">提交并测试</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="3" label="测试模块" v-loading="addTransmissionForm.options.loading">
            <el-alert title="系统即将发送一条测试消息到指定通讯地址已完成测试!" type="warning" />
            <el-result style="float: left"
                    icon="warning"
                    title="准备测试"
                    sub-title="请点击连接完成测试!"
            >
              <template #extra>
                <el-button type="primary">发送</el-button>
              </template>
            </el-result>
          </el-tab-pane>
        </el-tabs>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../../components/Panel";
import { API_SETTINGS, API_TRANSMISSION_GET, API_TRANSMISSION_LIST, API_TRANSMISSION_UPDATE } from "../service/common";
import { request } from "../service/protocol";

const validateUrl = ( rule, value, callback ) => {

  // 检验 value 是不是一个合法的 http 地址
  const regx = /^(http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/;

  if ( !regx.test( value ) ) {
    callback( new Error( "请输入合法的 URL" ) );
  } else {
    callback();
  }

}

export default {
  components: { Panel },
  data: function () {
    return {
      transmissions: [],

      addTransmissionForm: {

        form1: {

          rules: {

            name: [ { required: true, message: '请先选择 通讯方式', trigger: 'change', }],
            url: [
              { required: true, message: '请输入一个合法的地址', trigger: 'blur' },
              { validator: validateUrl, triggers: 'blur' }
            ],
            secret: [
              { required: true, message: '请输入一个合法的密钥', trigger: 'blur' },
            ],
          }

        },
        form2: {},
        options: { selectTab: '1', loading: false }

      }
    };
  },
  methods: {
    async toTestForm() {

      this.addTransmissionForm.options.loading = true

      // 发送 PUT 请求
      const response = await request( {
        method: 'PUT',
        url: API_TRANSMISSION_UPDATE,
        data: {
          transmissions: [ {
        name: this.addTransmissionForm.form1.name,
            config: {
        ...this.addTransmissionForm.form2.config.value, secret: this.addTransmissionForm.form1.secret, doOpen: true,
              url: this.addTransmissionForm.form1.url,
        },
      } ]
        }
      });

      console.log( response )

    },
    toDetailsForm() {

      this.$refs.form1.validate().then( async ( valid ) => {

        if ( valid ) {

          const data = await request({
            method: "GET",
            url: API_TRANSMISSION_GET,
            params: { name: this.addTransmissionForm.form1.name }
          });

          const arr = []

          Object.keys(data.config).forEach(v => ['doOpen','secret','name','url'].indexOf(v) === -1 && arr.push({ k: v, v: data.config[v] }))

          this.addTransmissionForm.form2.config = arr

          this.addTransmissionForm.options.selectTab = '2';

        }

      } ).catch( () => {



      } );

    },
    async refresh() {
      await this.render();
      this.$message({ message: "已刷新", type: "success" });
    },
    async render() {
      this.transmissions = await request({
        method: "GET",
        url: API_TRANSMISSION_LIST
      });

      console.log(  this.transmissions )
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
  },
  async mounted() {
    await this.render();
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
