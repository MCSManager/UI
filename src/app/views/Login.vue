<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div>
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
            <div style="font-size: 24px; font-weight: 600">{{ $t("login.title") }}</div>
            <p>{{ $t("login.titleInfo") }}</p>
            <form action="/" method="post">
              <div style="margin-top: 22px">
                <div>
                  <el-input
                    type="text"
                    name="mcsm_username"
                    v-model="form.username"
                    :placeholder="$t('login.account')"
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
                    :placeholder="$t('login.passWord')"
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
                      <a href="javascript:void(0)" rel="noopener noreferrer">
                        {{ $t("login.forgotPassword") }}
                      </a>
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
                      <a target="black" href="https://github.com/MCSManager">MCSManager</a></span
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
              <el-skeleton :rows="5" />
            </template>
          </Panel>
        </el-col>
        <el-col :md="6" :offset="0">
          <Panel>
            <template #default>
              <el-skeleton :rows="7" />
            </template>
          </Panel>
        </el-col>

        <el-col :md="6" :offset="0">
          <Panel>
            <template #default>
              <el-skeleton :rows="7" />
            </template>
          </Panel>
        </el-col>

        <el-col :md="6" :offset="0">
          <Panel>
            <template #default>
              <el-skeleton :rows="7" />
            </template>
          </Panel>
        </el-col>

        <el-col :md="6" :offset="0">
          <Panel>
            <template #default>
              <el-skeleton :rows="7" />
            </template>
          </Panel>
        </el-col>

        <el-col :md="24" :offset="0">
          <Panel>
            <template #default>
              <el-skeleton :rows="4" />
            </template>
          </Panel>
          <Panel>
            <template #default>
              <el-skeleton :rows="2" />
            </template>
          </Panel>
          <Panel>
            <template #default>
              <el-skeleton :rows="5" />
            </template>
          </Panel>
        </el-col>
      </el-row>
    </div>

    <div class="bg"></div>
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
      loginText: this.$t("login.login"),
      loading: false,
      cause: "",
      loginInfo: ""
    };
  },
  methods: {
    submit() {
      this.login();
    },

    async login() {
      try {
        if (!this.form.username || !this.form.username) {
          this.cause = this.$t("login.isNull");
          return;
        }
        this.loading = true;
        this.loginText = this.$t("login.logging");
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

    async failed(error) {
      this.cause = error.message;
      if (this.cause == "null") {
        this.cause = this.$t("login.errorCause");
      }
      this.loginText = this.$t("login.logBackIn");
      this.close = true;
      await sleep(400);
      this.close = false;
    },

    async success() {
      this.close = true;
      this.closeWindow = true;
      this.loginText = this.$t("login.loginSuccess");
      try {
        await setupUserInfo();
      } catch (error) {
        this.$alert(this.$t("login.notify.message"), this.$t("login.notify.title"));
      }
      // wait for the animation to finish
      await sleep(1500);
      // Seamless switch, do not use the refresh method to log in to the system
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
      this.$confirm(this.$t("login.forgotPasswordInfo"), this.$t("login.forgotPassword"), {
        confirmButtonText: this.$t("general.confirm"),
        cancelButtonText: this.$t("general.closed")
      });
    }
  },
  async mounted() {
    console.log("Welcome use MCSManager.");
    console.log("Copyright 2022 MCSManager All rights reserved.");
    // Request login copyleft text
    this.requestLoginInfo();
  }
};
</script>

<style lang="scss" scoped>
.bg {
  z-index: 997;
  position: fixed;
  backdrop-filter: blur(8px) brightness(0.5);
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

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
  background-color: rgba(43, 43, 43, 0.183);
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

.light #login-panel-wrapper {
  // background: #e4e4e400;
}

#login-panel {
  min-height: 330px;
  width: 430px;
  transition: all 0.4s 0.2s;
}

#login-panel:hover {
  /* box-shadow: 0 0px 18px rgba(0, 0, 0, 0.1); */
  border: 1px solid #828487;
  transform: scale(1.04);
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

@media (max-width: 900px) {
  .fgp {
    font-size: 12px;
    margin-right: 0px;
    margin-top: 8px;
  }
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
