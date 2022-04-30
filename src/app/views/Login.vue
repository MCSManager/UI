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
  <div
    id="login-layer-top"
    :class="{ 'login-layer-fadeout-top': close, 'login-layer-fadein-top': !close }"
  ></div>
  <div
    id="login-layer-left"
    :class="{ 'login-layer-fadeout-left': close, 'login-layer-fadein-left': !close }"
  ></div>
  <div
    id="login-layer-right"
    :class="{ 'login-layer-fadeout-right': close, 'login-layer-fadein-right': !close }"
  ></div>
  <div
    id="login-layer-bottom"
    :class="{ 'login-layer-fadeout-bottom': close, 'login-layer-fadein-bottom': !close }"
  ></div>

  <div id="login-panel-wrapper" :class="{ 'login-panel-wrapper-out': closeWindow }">
    <Panel id="login-panel" body-style="padding:44px;" v-loading="loading">
      <template #default>
        <form action="/login" method="post">
          <div style="font-size: 24px; font-weight: 600">身份验证</div>
          <p>使用服务器的 MCSManager 账号登录到面板</p>
          <form action="/" method="post">
            <div style="margin-top: 22px">
              <div>
                <el-input
                  type="text"
                  name="mcsm_username"
                  v-model="form.username"
                  placeholder="账号"
                  autocomplete="on"
                  :disabled="close"
                  @keyup.enter="submit"
                >
                  <template #suffix>
                    <i class="el-icon-user"></i>
                  </template>
                </el-input>
              </div>
              <div class="row-mt">
                <el-input
                  type="password"
                  name="mcsm_password"
                  v-model="form.password"
                  placeholder="密码"
                  autocomplete="on"
                  :disabled="close"
                  @keyup.enter="submit"
                >
                  <template #suffix>
                    <i class="el-icon-lock"></i>
                  </template>
                </el-input>
              </div>
              <div class="login-btn-wrapper row-mt">
                <transition name="fade">
                  <div v-if="cause" id="login-cause">{{ cause }}</div>
                  <div v-else class="login-info-wrapper fgp" @click="forgotPassword">
                    <a href="javascript:void(0)" rel="noopener noreferrer"> 忘记密码 </a>
                  </div>
                </transition>
                <el-button
                  type="primary"
                  size="small"
                  style="width: 110px"
                  @click="login"
                  :disabled="close"
                  :loading="loading"
                >
                  {{ loginText }}
                </el-button>
              </div>
              <div class="login-info-wrapper row-mt" v-if="loginInfo">
                <span class="color-gray">
                  {{ loginInfo }}
                </span>
              </div>
              <div class="login-info-wrapper row-mt">
                <div>
                  <span class="color-gray"
                    >Powered by
                    <a target="black" href="https://github.com/Suwings">MCSManager</a></span
                  >
                </div>
              </div>
            </div>
          </form>
        </form>
      </template>
    </Panel>
  </div>

  <div>
    <el-row :gutter="20">
      <el-col :md="24" :offset="0">
        <Panel>
          <template #default>
            <el-skeleton :rows="8" />
          </template>
        </Panel>
        <Panel>
          <template #default>
            <el-skeleton :rows="2" />
          </template>
        </Panel>
        <Panel>
          <template #default>
            <el-skeleton :rows="2" />
          </template>
        </Panel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Panel from "../../components/Panel";
// eslint-disable-next-line no-unused-vars
// import router from "../router";
import { API_USER_LOGIN, API_USER_LOGIN_INFO, sleep } from "../service/common";
import { request, setupUserInfo } from "../service/protocol";

export default {
  components: { Panel },
  data: function () {
    return {
      form: {
        username: "",
        password: ""
      },
      close: false,
      closeWindow: false,
      loginText: "登录",
      loading: false,
      cause: "",
      loginInfo: ""
    };
  },
  methods: {
    // 回车登录
    submit() {
      this.login();
    },
    // 登录过程入口
    async login() {
      try {
        if (!this.form.username || !this.form.username) {
          throw new Error("账号或密码不能为空值");
        }
        this.loading = true;
        this.cause = "";
        this.loginText = "登录中";
        await sleep(600);
        const res = await request({
          method: "POST",
          url: API_USER_LOGIN,
          data: {
            username: this.form.username,
            password: this.form.password
          }
        });
        if (res) {
          return this.success(res);
        }
      } catch (error) {
        this.failed(error);
      } finally {
        this.loading = false;
      }
    },
    // 登录失败
    async failed(error) {
      this.cause = error.message;
      if (this.cause == "null") {
        this.cause = "账号或密码错误，请检查后重试";
      }
      this.loginText = "重新登录";
      this.close = true;
      await sleep(400);
      this.close = false;
    },
    // 登录成功
    async success() {
      this.close = true;
      this.closeWindow = true;
      this.loginText = "登录成功";
      try {
        await setupUserInfo();
      } catch (error) {
        this.$notify({
          title: "网页无法正确运作",
          message: "无法获取身份数据，网页所有功能将全部不可用，请立刻刷新网页或重新登录",
          type: "error",
          duration: 0
        });
      }
      // 等待动画效果完毕
      await sleep(1500);
      // 无缝切换，不采用刷新方法登录系统
      this.$router.push({ path: `/` });
    },
    async requestLoginInfo() {
      const res = await request({
        method: "POST",
        url: API_USER_LOGIN_INFO
      });
      this.loginInfo = res?.loginInfo ?? "";
    },
    forgotPassword() {
      this.$confirm(
        `如果您是管理员且第一次登录，默认账号密码为：root，123456。如果您是普通用户，请要求您的服务商帮助您重置密码。如果您是管理员，请删除 mcsmanager/web/data/Users 文件夹重启面板端以重新加载用户。`,
        "忘记密码",
        {
          confirmButtonText: "好的",
          cancelButtonText: "关闭"
        }
      );
    }
  },
  async mounted() {
    console.log("Welcome use MCSManager.");
    console.log("Copyright 2022 Suwings All rights reserved.");
    // 请求登录界面文案
    this.requestLoginInfo();

    // try {
    //   await setupUserInfo();
    //   if (this.$store.state?.userInfo?.uuid) {
    //     console.log("用户已登录，正在跳转");
    //     window.location.href = "/";
    //   }
    // } catch (err) {
    //   // 忽略
    // }
  }
};
</script>

<style scoped>
/* 动画与基本元素CSS */

.login-panel-wrapper-out {
  opacity: 0;
  z-index: 1;
}

.login-layer-fadeout-top {
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 100vh;
  opacity: 0.2;
}

.login-layer-fadein-top {
  bottom: 50vh;
}

.login-layer-fadeout-bottom {
  top: 100vh;
  left: 0px;
  right: 0px;
  bottom: 0px;
  opacity: 0.2;
}

.login-layer-fadein-bottom {
  top: 50vh;
}

.login-layer-fadeout-left {
  top: 0px;
  left: 100vw;
  right: 0px;
  bottom: 100vh;
  opacity: 0.2;
}

.login-layer-fadein-left {
  left: 50vw;
}

.login-layer-fadeout-right {
  top: 0px;
  right: 100vw;
  left: 0px;
  bottom: 100vh;
  opacity: 0.2;
}

.login-layer-fadein-right {
  right: 50vw;
}

#login-layer-top,
#login-layer-bottom {
  transition-property: all;
  transition-duration: 1.6s;
  transition-timing-function: cubic-bezier(0.17, 0.99, 0.63, 0.6);
  transition-delay: 0s;
}

#login-layer-right,
#login-layer-left {
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.17, 0.99, 0.63, 0.6);
  transition-delay: 0s;
}

#login-layer-top,
#login-layer-left,
#login-layer-right,
#login-layer-bottom {
  z-index: 998;
  background-color: rgb(228, 228, 228);
  position: fixed;
}
#login-layer-top {
  top: 0px;
  left: 0px;
  right: 0px;
}

#login-layer-bottom {
  bottom: 0px;
  left: 0px;
  right: 0px;
}
#login-layer-left {
  top: 0px;
  right: 0px;
  bottom: 0px;
}
#login-layer-right {
  top: 0px;
  left: 0px;
  bottom: 0px;
}

#login-panel-wrapper {
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  display: flex;
  align-items: center;

  transition-property: all;
  transition-duration: 1.5s;
  transition-timing-function: cubic-bezier(1, 0.05, 0.84, 0.74);
  transition-delay: 0s;
}

#login-panel {
  min-height: 330px;
  width: 430px;
  transition: all 1s;
}

#login-panel:hover {
  border: 1px solid #77797c;
}

.login-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-info-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
}

.login-info-wrapper a {
  color: gray;
  text-decoration: underline;
}

#login-cause {
  color: rgb(170, 8, 8);
  font-size: 12px;
  margin-right: 18px;
}

.fgp {
  font-size: 12px;
  margin-right: 18px;
}

/* 针对手机的登录界面 */
@media (max-width: 900px) {
  #login-panel {
    text-align: center;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 0px;
  }
  #login-panel:hover {
    border: none;
  }
  .login-btn-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column-reverse;
    text-align: center;
  }
  #login-cause {
    margin-top: 12px;
    margin-right: 0px;
  }
  .login-info-wrapper {
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
