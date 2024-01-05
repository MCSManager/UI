<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div>
    <div id="register-panel-wrapper">
      <Panel id="register-panel" body-style="padding:44px;" v-loading="loading">
        <template #default>
          <form action="/register" method="post">
            <div style="font-size: 24px; font-weight: 600">{{ $t("register.title") }}</div>
            <p>{{ $t("register.titleInfo") }}</p>
            <form action="/" method="post">
              <div style="margin-top: 22px">
                <div>
                  <el-input
                    type="text"
                    name="mcsm_username"
                    v-model="form.username"
                    :placeholder="$t('register.account')"
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
                    :placeholder="$t('register.passWord')"
                    autocomplete="on"
                    :disabled="close"
                    @keyup.enter="submit"
                  >
                    <template #suffix>
                      <i class="el-icon-lock"></i>
                    </template>
                  </el-input>
                </div>
                <div class="row-mt">
                  <el-input
                    type="password"
                    name="mcsm_password"
                    v-model="form.rePassword"
                    :placeholder="$t('register.rePassWord')"
                    autocomplete="on"
                    :disabled="close"
                    @keyup.enter="submit"
                  >
                    <template #suffix>
                      <i class="el-icon-lock"></i>
                    </template>
                  </el-input>
                </div>
                <div class="register-info-wrapper row-mt">
                  <transition name="fade">
                    <div v-if="cause" id="register-cause">{{ cause }}</div>
                  </transition>
                </div>
                <div class="register-btn-wrapper row-mt">
                  <router-link to="/login" style="margin-right: 10px;">
                    <el-button
                      type="success"
                      size="small"
                      style="width: 100px"
                      :disabled="close"
                      :loading="loading"
                    >
                      {{ $t("register.toLogin") }}
                    </el-button>
                  </router-link>
                  <el-button
                    type="primary"
                    size="small"
                    style="width: 100px"
                    @click="register"
                    :disabled="close"
                    :loading="loading"
                  >
                    {{ registerText }}
                  </el-button>
                </div>
                <div class="register-info-wrapper row-mt">
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
  </div>
</template>

<script>
import Panel from "../../components/Panel";
// eslint-disable-next-line no-unused-vars
// import router from "../router";
import {API_USER_REGISTER, sleep} from "../service/common";
import { request } from "../service/protocol";

export default {
  components: { Panel },
  data: function () {
    return {
      form: {
        username: "",
        password: "",
        rePassword: ""
      },
      close: false,
      registerText: this.$t("register.register"),
      loading: false,
      cause: ""
    };
  },
  methods: {
    submit() {
      this.register();
    },

    async register() {
      try {
        if (!this.form.username || !this.form.password || !this.form.rePassword) {
          this.cause = this.$t("register.isNull");
          return;
        }
        this.loading = true;
        this.registerText = this.$t("register.registering");
        await sleep(600);
        const res = await request({
          method: "POST",
          url: API_USER_REGISTER,
          data: {
            username: this.form.username,
            password: this.form.password,
            rePassword: this.form.rePassword
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
        this.cause = this.$t("register.errorCause");
      }
      this.registerText = this.$t("register.reRegister");
      this.close = true;
      await sleep(400);
      this.close = false;
    },

    async success() {
      this.close = true;
      this.registerText = this.$t("register.registerSuccess");
      await sleep(1500);
      this.$router.push({ path: `/login` });
    }
  },
  async mounted() {
    console.log("Welcome use MCSManager.");
    console.log("Copyright 2022 MCSManager All rights reserved.");
  }
};
</script>

<style lang="scss" scoped>

.register-panel-wrapper-out {
  opacity: 0;
  z-index: 1;
}

.register-layer-fadeout-top {
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 100vh;
  opacity: 0.2;
}

.register-layer-fadein-top {
  bottom: 50vh;
}

.register-layer-fadeout-bottom {
  top: 100vh;
  left: 0px;
  right: 0px;
  bottom: 0px;
  opacity: 0.2;
}

.register-layer-fadein-bottom {
  top: 50vh;
}

.register-layer-fadeout-left {
  top: 0px;
  left: 100vw;
  right: 0px;
  bottom: 100vh;
  opacity: 0.2;
}

.register-layer-fadein-left {
  left: 50vw;
}

.register-layer-fadeout-right {
  top: 0px;
  right: 100vw;
  left: 0px;
  bottom: 100vh;
  opacity: 0.2;
}

.register-layer-fadein-right {
  right: 50vw;
}

#register-panel-wrapper {
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  backdrop-filter: blur(8px) brightness(0.5);
  display: flex;
  align-items: center;

  transition-property: all;
  transition-duration: 1.5s;
  transition-timing-function: cubic-bezier(1, 0.05, 0.84, 0.74);
  transition-delay: 0s;
}

.light #register-panel-wrapper {
  // background: #e4e4e400;
}

#register-panel {
  min-height: 330px;
  width: 430px;
  transition: all 0.4s 0.2s;
}

#register-panel:hover {
  /* box-shadow: 0 0px 18px rgba(0, 0, 0, 0.1); */
  border: 1px solid #828487;
  transform: scale(1.04);
}

.register-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.register-info-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
}

.register-info-wrapper a {
  color: gray;
  text-decoration: underline;
}

#register-cause {
  color: rgb(170, 8, 8);
  font-size: 12px;
}

@media (max-width: 900px) {
  #register-panel {
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
  #register-panel:hover {
    border: none;
  }
  .register-btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  #register-cause {
    margin-top: 12px;
    margin-right: 0px;
  }
  .register-info-wrapper {
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
