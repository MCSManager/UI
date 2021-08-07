<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-03 20:12:26
 * @LastEditTime: 2021-08-07 13:15:21
 * @Description: 
-->
<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-05-13 12:04:14
 * @Description: 
-->

<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <Panel>
        <template #title>基本信息</template>
        <template #default>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <LineLabel>
                <template #title>唯一标识符</template>
                <template #default>{{ userInfo.uuid }}</template>
              </LineLabel>
              <LineLabel>
                <template #title>用户名</template>
                <template #default>{{ userInfo.userName }}</template>
              </LineLabel>
              <LineLabel>
                <template #title>账号状态</template>
                <template #default>
                  <span style="color: green">{{ moreUserInfo.safe }}</span>
                </template>
              </LineLabel>
            </el-col>
            <el-col :span="12" :offset="0">
              <LineLabel>
                <template #title>注册时间</template>
                <template #default>{{ userInfo.registerTime }}</template>
              </LineLabel>
              <LineLabel>
                <template #title>登录时间</template>
                <template #default>{{ userInfo.loginTime }}</template>
              </LineLabel>
              <LineLabel>
                <template #title>接口</template>
                <template #default>
                  {{ moreUserInfo.api }}
                </template>
              </LineLabel>
            </el-col>
          </el-row>
        </template>
      </Panel>
      <el-row :gutter="20">
        <el-col :md="16" :offset="0">
          <Panel>
            <template #title>常见问题</template>
            <template #default>
              <el-row :gutter="20">
                <el-col :span="8" :offset="0" v-for="(item, index) in manualLink" :key="index">
                  <a class="manualLink" :href="item.link" v-text="item.title"></a>
                </el-col>
              </el-row>
            </template>
          </Panel>
        </el-col>
        <el-col :md="8" :offset="0">
          <Panel>
            <template #title>访问密码</template>
            <template #default>
              <p>更新您的访问密码</p>
              <el-input placeholder="" v-model="input1" size="small">
                <template #prepend>原密码</template>
              </el-input>
              <el-input class="row-mt" placeholder="" v-model="input1" size="small">
                <template #prepend>新密码</template>
              </el-input>
              <div style="text-align: right">
                <el-button class="row-mt" size="small">更新密码</el-button>
              </div>
            </template>
          </Panel>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import Panel from "../../components/Panel";
import LineLabel from "../../components/LineLabel";
import { API_URL } from "../service/common";
// import { request } from "../service/protocol";
// import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      moreUserInfo: {
        api: API_URL,
        safe: "账号正常"
      },
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
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },

  async mounted() {
    // this.user = await request({
    //   method: "GET",
    //   url: API_USER
    // });
  },
  methods: {},
  components: { Panel, LineLabel }
};
</script>

<style></style>
