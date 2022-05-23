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
  <el-row :gutter="20">
    <el-col :span="24">
      <Panel>
        <template #title>基本信息</template>
        <template #default>
          <el-row :gutter="20">
            <el-col :md="12" :offset="0">
              <LineLabel class="only-pc-display">
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
            <el-col :md="12" :offset="0">
              <LineLabel>
                <template #title>注册时间</template>
                <template #default>{{ userInfo.registerTime }}</template>
              </LineLabel>
              <LineLabel>
                <template #title>登录时间</template>
                <template #default>{{ userInfo.loginTime }}</template>
              </LineLabel>
              <LineLabel class="only-pc-display">
                <template #title>接口</template>
                <template #default>
                  {{ moreUserInfo.api }}
                </template>
              </LineLabel>
            </el-col>
          </el-row>
        </template>
      </Panel>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :md="8" :offset="0">
      <Panel style="height: 300px">
        <template #title>注意事项</template>
        <template #default>
          <div class="sub-title">
            <p class="sub-title">关于用户名</p>
            <p class="sub-title-info">
              用户名仅可唯一存在，修改时面板会检查是否存在冲突，如果发现冲突则无法进行修改用户名，用户名请勿包含特殊字符或旧版本系统不兼容的文字。
            </p>
          </div>
          <div class="sub-title">
            <p class="sub-title">关于密码</p>
            <p class="sub-title-info">
              账号密码请尽可能复杂化。请放心，面板管理员无法直接解读您的自定义密码，您的密码即使与其他网站密码有相似之处也不必过于担忧安全问题。
            </p>
          </div>
          <div class="sub-title">
            <p class="sub-title">关于 API 密钥</p>
            <p class="sub-title-info">
              适用于开发者使用的 API 密钥与账号密码登录拥有同等权限，重要程度与密码相同，请勿泄露。
            </p>
          </div>
        </template>
      </Panel>
    </el-col>
    <el-col :md="8" :offset="0">
      <!-- <Panel>
        <template #title>用户名</template>
        <template #default>
          <div class="sub-title row-mt">
            <p class="sub-title-title require-field">更改用户名</p>
            <p class="sub-title-info">支持中文和字母，长度为 2 到 18 个文字</p>
          </div>
          <el-input
            size="small"
            placeholder="保持原值"
            v-model="userData.userName"
            :readonly="readonly.a"
            @focus="() => (readonly.a = false)"
            autocomplete="off"
          ></el-input>
          <div style="text-align: right">
            <el-button size="small" class="row-mt" @click="update(1)" type="danger" plain
              >更新用户名</el-button
            >
          </div>
        </template>
      </Panel> -->
      <Panel style="height: 300px">
        <template #title>更新密码</template>
        <template #default>
          <el-form
            :model="userData"
            :rules="rules"
            label-position="top"
            size="small"
            ref="ruleFormRef"
          >
            <el-form-item label="新密码" prop="passWord" required>
              <el-input
                size="small"
                type="password"
                v-model="userData.passWord"
                autocomplete="off"
                :readonly="readonly.b"
                placeholder="长度必须 9 到 24 位，尽可能包含字母数字加符号组合方式"
                @focus="() => (readonly.b = false)"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="确认新密码" prop="passWord2" required>
              <el-input
                size="small"
                type="password"
                v-model="userData.passWord2"
                placeholder="保持原值"
                :readonly="readonly.c"
                @focus="() => (readonly.c = false)"
                autocomplete="off"
              >
              </el-input>
            </el-form-item>
            <div style="text-align: right">
              <el-form-item>
                <el-button size="small" type="danger" plain class="row-mt" @click="update(2)">
                  更新密码
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </Panel>
    </el-col>

    <el-col :md="8" :offset="0">
      <Panel style="height: 300px">
        <template #title>API 接口密钥</template>
        <template #default>
          <div class="sub-title row-mt">
            <p class="sub-title-title">什么是 API 密钥？</p>
            <p class="sub-title-info">
              专供给开发者使用的同等权限密钥，可以为您的第三方程序提供充足的功能与可靠的稳定性。
            </p>
          </div>
          <div
            class="row-mt"
            style="
              padding: 12px 8px;
              background: rgba(0, 0, 0, 0.02);
              box-sizing: border-box;
              border-radius: 2px;
              font-size: 13px;
            "
          >
            <span>{{ userInfo.apiKey ? userInfo.apiKey : "未启用" }}</span>
          </div>
          <div style="text-align: right">
            <ItemGroup>
              <el-button size="small" class="row-mt" @click="changeApi(true)"
                >生成 API 密钥</el-button
              >
              <el-button size="small" class="row-mt" @click="changeApi(false)"
                >关闭 API 接口</el-button
              >
            </ItemGroup>
          </div>
        </template>
      </Panel>
    </el-col>
  </el-row>
</template>

<script>
import Panel from "../../components/Panel";
import LineLabel from "../../components/LineLabel";
import { API_URL, API_USER_API, API_USER_UPDATE } from "../service/common";
import { request } from "../service/protocol";

export default {
  data() {
    return {
      readonly: {
        a: true,
        b: true,
        c: true
      },
      userData: {
        userName: "",
        passWord: "",
        passWord2: "",
        apiKey: ""
      },
      moreUserInfo: {
        api: API_URL,
        safe: "账号正常"
      },
      api: {
        enable: false,
        key: ""
      },
      rules: {
        passWord: [{ validator: this.validatePassword, trigger: "blur" }],
        passWord2: [{ validator: this.validatePassword, trigger: "blur" }]
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },

  async mounted() {},
  methods: {
    async update() {
      await this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return;
        await this.$confirm("确定要更改此信息吗？", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        const passWord = this.userData.passWord;
        try {
          await request({
            method: "PUT",
            url: API_USER_UPDATE,
            data: {
              passWord
            }
          });
          this.$message({ message: "用户数据已更新", type: "success" });
        } catch (error) {
          this.$message({
            message: error.toString(),
            type: "error"
          });
        }
      });
    },

    async changeApi(enable) {
      try {
        const key = await request({
          method: "PUT",
          url: API_USER_API,
          data: {
            enable
          }
        });
        this.$store.commit("setApiKey", key);
        this.$message({ message: "API 操作更改成功", type: "success" });
      } catch (error) {
        this.$message({
          message: `更改失败:${error}`,
          type: "error"
        });
      }
    },
    validatePassword(rule, value = "", callback) {
      if (!value) return callback(new Error("请输入密码值，若不输入则不进行密码修改"));
      if (value.length < 9 || value.length > 36)
        return callback(new Error("密码长度不规范，必须长度在 9 位到 36 位之间"));
      // const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[0-9A-Za-z]{12,}$/;
      // if (!reg.test(value)) return callback(new Error("您的密码必须包含：数字，大写和小写字母"));
      callback();
    },
    validatePassword2(rule, value = "", callback) {
      if (value !== this.passWord) return callback(new Error("两次密码不一致"));

      callback();
    }
  },
  components: { Panel, LineLabel }
};
</script>
