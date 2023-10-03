<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="contanier">
    <el-skeleton :rows="5" animated />
    <br />
    <el-skeleton :rows="8" animated />
    <br />
    <el-skeleton :rows="4" animated />
    <div class="bg"></div>

    <!-- <div class="panel-wrapper" v-if="step == -1">
      <Panel class="panel tc" body-style="padding:40px;">
        <h1 class="title">
          <i class="el-icon-guide"></i>
          Select Language
        </h1>
        <div style="margin-top: 48px" v-loading="isLoading">
          <ItemGroup>
            <SelectBlock
              v-for="(item, index) in language"
              :key="index"
              @click="selectLanguage(item.value)"
            >
              <template #title> {{ item.label }}</template>
            </SelectBlock>
          </ItemGroup>
        </div>
      </Panel>
    </div> -->

    <div class="panel-wrapper" v-if="step == 0">
      <Panel class="panel tc" body-style="padding:40px;">
        <h1 class="title">{{ $t("install.welcome") }}</h1>
        <p>{{ $t("install.desc") }}</p>
        <div style="margin-top: 48px">
          <el-button type="primary" @click="next" v-loading="isLoading">{{
            $t("install.start")
          }}</el-button>
        </div>
        <div class="panel-bottom">
          <a href="https://mcsmanager.com/" target="_blank" rel="noopener noreferrer">
            Reference: https://mcsmanager.com/
          </a>
          <br />
          <span>Released under the Apache-2.0 License.</span>
        </div>
      </Panel>
    </div>

    <div class="panel-wrapper" v-if="step == 1">
      <Panel class="panel" body-style="padding:40px;">
        <h1 class="title">{{ $t("install.createAdminAccount") }}</h1>
        <p>{{ $t("install.createAdminAccountInfo") }}</p>
        <div>
          <el-form ref="form" :model="initUser" :rules="rules" label-width="80px">
            <el-form-item :label="$t('users.userName')" prop="userName">
              <el-input v-model="initUser.userName" />
            </el-form-item>
            <el-form-item :label="$t('install.passWord')" prop="passWord">
              <el-input v-model="initUser.passWord" />
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="createUser" v-loading="isLoading">
                {{ $t("install.createAccount") }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </Panel>
    </div>

    <div class="panel-wrapper" v-if="step == 2">
      <Panel class="panel" body-style="padding:40px;" v-loading="isLoading">
        <h1 class="title">{{ $t("install.ohhh") }}</h1>
        <p>{{ $t("install.ohhhInfo") }}</p>
        <ItemGroup>
          <SelectBlock @click="toQuickStart">
            <template #title>{{ $t("install.firstTime") }}</template>
            <template #info>{{ $t("install.firstTimeInfo") }}</template>
          </SelectBlock>
        </ItemGroup>
        <ItemGroup>
          <SelectBlock @click="toOverview">
            <template #title>{{ $t("install.oldUSer") }}</template>
            <template #info>{{ $t("install.oldUSerInfo") }}</template>
          </SelectBlock>
        </ItemGroup>
      </Panel>
    </div>
  </div>
</template>

<script>
import SelectBlock from "@/components/SelectBlock";
import Panel from "@/components/Panel";
import { request } from "../../service/protocol";
import { API_PANEL_INSTALL, API_UPDATE_SETTING_WHEN_INSTALL } from "../../service/common";
export default {
  components: { Panel, SelectBlock },
  data: function () {
    return {
      isLoading: false,
      step: 0,
      initUser: {
        userName: "",
        passWord: ""
      },
      language: [
        {
          label: "English",
          value: "en_us"
        },
        {
          label: "简体中文",
          value: "zh_cn"
        },
        {
          label: "Русский",
          value: "ru_ru"
        }
      ],
      rules: {
        userName: {
          required: true,
          message: this.$t("users.newUserDialog.inputSth"),
          trigger: "blur"
        },
        passWord: {
          required: true,
          message: this.$t("users.newUserDialog.inputSth"),
          trigger: "blur"
        }
      }
    };
  },
  mounted() {
    const language = window.navigator.language;
    if (language.includes("zh")) {
      this.selectLanguage("zh_cn");
    } else if (language.includes("ru")) {
      this.selectLanguage("ru_ru");
    } else {
      this.selectLanguage("en_us");
    }
  },
  methods: {
    next() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.step++;
      }, 2000);
    },
    async createUser() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        try {
          await request({
            method: "POST",
            url: API_PANEL_INSTALL,
            data: {
              username: this.initUser.userName,
              password: this.initUser.passWord
            }
          });
          this.next();
          this.$message({ message: this.$t("install.adminOK"), type: "success" });
        } catch (err) {
          this.$message({ message: err, type: "error" });
        }
      });
    },
    toQuickStart() {
      window.location.href = "./#/quickstart?from_install=1";
    },
    toOverview() {
      window.location.href = "./#/overview?from_install=1";
    },
    installLib() {
      this.next();
    },
    async selectLanguage(lang) {
      try {
        this.isLoading = true;
        await this.updateSettings({ language: lang });
        this.$i18n.locale = lang;
      } catch (error) {
        this.$message({ message: error, type: "error" });
      } finally {
        this.isLoading = false;
      }
    },
    async updateSettings(cfg) {
      return await request({
        method: "PUT",
        url: API_UPDATE_SETTING_WHEN_INSTALL,
        data: cfg
      });
    }
  }
};
</script>

<style scoped>
.bg {
  z-index: 998;
  position: fixed;
  backdrop-filter: blur(10px) brightness(0.5);
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

.panel-wrapper {
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition-property: all;
  transition-duration: 1.5s;
  transition-timing-function: cubic-bezier(1, 0.05, 0.84, 0.74);
  transition-delay: 0s;
}

.panel {
  min-height: 340px;
  width: 520px;
  transition: all 0.4s;
  position: relative;
}

.panel p {
  font-size: 16px;
}

.tc {
  text-align: center;
}

.panel:hover {
  border: 1px solid #b6bbc2;
  /* width: 540px; */
}

.panel-bottom {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0;
  text-align: center;
  padding-bottom: 20px;
}

.title {
  font-weight: 400;
  font-size: 24px;
  margin: 0px 0px 12px 0px;
}
</style>
