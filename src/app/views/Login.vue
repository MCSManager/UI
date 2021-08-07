<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-26 09:23:13
 * @Description: 
-->

<template>
  <!-- 登录界面 -->
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
          <p>使用此设备的 MCSManager 账号登录到面板</p>
          <div style="margin-top: 22px">
            <div>
              <el-input
                v-model="form.username"
                type="text"
                name="username"
                placeholder="账号"
                autocomplete="on"
                :disabled="close"
              >
                <template #suffix>
                  <i class="el-icon-user"></i>
                </template>
              </el-input>
            </div>
            <div class="row-mt">
              <el-input
                v-model="form.password"
                type="password"
                name="password"
                placeholder="密码"
                autocomplete="on"
                :disabled="close"
              >
                <template #suffix>
                  <i class="el-icon-lock"></i>
                </template>
              </el-input>
            </div>
            <div class="login-btn-wrapper row-mt">
              <transition name="fade">
                <div v-if="cause" id="login-cause">{{ cause }}</div>
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
            <div class="login-btn-wrapper row-mt">
              <span class="color-gray">Copyright © 2021 Suwings.</span>
            </div>
          </div>
        </form>
      </template>
    </Panel>
  </div>

  <!-- 背景样板 -->
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
import { API_USER_LOGIN, sleep } from "../service/common";
import { request, setupUserInfo } from "../service/protocol";
export default {
  components: { Panel },
  data: function () {
    return {
      form: {
        username: "root",
        password: "123456"
      },
      close: false,
      closeWindow: false,
      loginText: "登录",
      loading: false,
      cause: ""
    };
  },
  methods: {
    // 登录过程入口
    async login() {
      try {
        this.loading = true;
        this.cause = "";
        this.loginText = "登录中";
        await sleep(800);
        const res = await request({
          method: "POST",
          url: API_USER_LOGIN,
          data: {
            username: this.form.username,
            password: this.form.password
          }
        });
        if (res) {
          console.log("登录成功");
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
      await sleep(1500);
      // router.push({ path: `/` });
      window.location.href = "/";
    }
  },
  async mounted() {
    console.log("Welcome use MCSManager.");
    console.log("Copyright 2021 Suwings All rights reserved.");
  }
};
</script>

<style>
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
  transition-duration: 1.5s;
  transition-timing-function: cubic-bezier(0.17, 0.99, 0.63, 0.6);
  transition-delay: 0s;
}

#login-layer-right,
#login-layer-left {
  transition-property: all;
  transition-duration: 1.5s;
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
  min-height: 340px;
  width: 440px;
}

.login-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#login-cause {
  color: rgb(170, 8, 8);
  font-size: 12px;
  margin-right: 18px;
}
</style>
