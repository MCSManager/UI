<!--
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-03 20:12:26
 * @LastEditTime: 2021-07-03 21:05:31
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
                <template #default>{{ user.uuid }}</template>
              </LineLabel>
              <LineLabel>
                <template #title>用户名</template>
                <template #default>{{ user.userName }}</template>
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
                <template #default>{{ user.registerTime }}</template>
              </LineLabel>
              <LineLabel>
                <template #title>登录时间</template>
                <template #default>{{ user.loginTime }}</template>
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

      <el-row :gutter="20">
        <el-col :span="16" :offset="0">
          <Panel>
            <template #title>拥有的实例</template>
            <template #default>
              <el-table :data="user.instances" style="width: 100%">
                <el-table-column prop="uuid" label="标识符（UUID）"> </el-table-column>
                <el-table-column prop="region" label="所属主机（Region）"> </el-table-column>
              </el-table>
            </template>
          </Panel>
        </el-col>
        <el-col :span="8" :offset="0">
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
// import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      user: {
        uuid: "e5de5a80c26a4c4ea4a32716bc0a11db",
        userName: "RUser_Champlin",
        loginTime: "2021/7/3 下午8:14:48",
        registerTime: "2021/7/3 下午8:14:40",
        instances: [
          {
            uuid: "测试服务器",
            region: "e5de5a80c26a4c4ea4a32716bc0a11db"
          },
          {
            uuid: "群组服务器1号",
            region: "4c4ea4a32716bc0a11db4c4ea4a32716"
          },
          {
            uuid: "云端小游戏服",
            region: "4c4ea4a32716bc0a11db4c4ea4a32716"
          },
          {
            uuid: "test2",
            region: "a"
          },
          {
            uuid: "test2",
            region: "a"
          }
        ]
      },
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
  mounted() {},
  methods: {},
  components: { Panel, LineLabel }
};
</script>

<style>
</style>
