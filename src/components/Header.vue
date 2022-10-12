<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <el-card
    v-if="isTopPermission"
    class="box-card"
    body-style="padding: 12px;"
    style="margin-bottom: 20px; border-radius: 4px"
  >
    <el-row>
      <el-col :span="12">
        <div class="only-phone-display header-left-button" @click="toAside">
          <i class="el-icon-s-operation"></i>
        </div>
        <div
          style="font-size: 14px; font-weight: 700; line-height: 28px"
          v-for="(item, index) in breadcrumbsList"
          :to="{ path: item.path }"
          :key="index"
        >
          <span class="only-pc-display"
            >{{ $t("router.panel") }}&nbsp;/&nbsp;{{ $t("router." + item.title) }}</span
          >
        </div>
      </el-col>
      <el-col :span="12" style="text-align: right; line-height: 28px">
        <ItemGroup :lr="true">
          <div class="el-dropdown-link">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('settings.selectColor.title')"
              placement="bottom"
            >
              <el-dropdown style="margin: 0px 0px" :lr="true">
                <span>
                  <i class="el-icon-brush"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="setTheme('auto')">
                      {{ $t("settings.selectColor.auto") }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="setTheme('light')">
                      {{ $t("settings.selectColor.light") }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="setTheme('dark')">
                      {{ $t("settings.selectColor.dark") }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-tooltip>
          </div>
          <div class="el-dropdown-link">
            <el-tooltip class="item" effect="dark" :content="$t('root.private')" placement="bottom">
              <el-link :underline="false" @click="toPrivate">
                <i class="el-icon-user"></i>
              </el-link>
            </el-tooltip>
          </div>

          <div class="el-dropdown-link">
            <el-tooltip class="item" effect="dark" :content="$t('root.logout')" placement="bottom">
              <el-link :underline="false" @click="logout">
                <i class="el-icon-switch-button"></i>
              </el-link>
            </el-tooltip>
          </div>
        </ItemGroup>
      </el-col>
    </el-row>
  </el-card>

  <!-- User Navigation Bar -->
  <el-card
    v-if="!isTopPermission"
    class="box-card page-header-img"
    body-style="padding: 12px;"
    style="margin-bottom: 20px; border-radius: 4px; color: white"
  >
    <div class="flex flex-space-between">
      <router-link to="/home">
        <div style="height: 36px; line-height: 36px">
          <div>
            <Logo style="vertical-align: text-top" margin="0px"></Logo>
          </div>
        </div>
      </router-link>

      <div style="height: 36px; line-height: 36px">
        <ItemGroup :lr="true">
          <!-- <router-link to="/home">
            <el-link :underline="false" class="only-pc-display header-a">
              {{ userInfo.userName }}
            </el-link>
          </router-link> -->

          <el-link @click="toPrivate" class="header-a">{{ $t("root.private") }}</el-link>
          <el-dropdown style="margin: 0px 10px" :lr="true">
            <span class="el-dropdown-link" style="color: white">
              {{ $t("settings.selectColor.title") }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="setTheme('auto')">
                  {{ $t("settings.selectColor.auto") }}
                </el-dropdown-item>
                <el-dropdown-item @click="setTheme('light')">
                  {{ $t("settings.selectColor.light") }}
                </el-dropdown-item>
                <el-dropdown-item @click="setTheme('dark')">
                  {{ $t("settings.selectColor.dark") }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-link @click="logout" class="header-a">{{ $t("root.logout") }}</el-link>
        </ItemGroup>
      </div>
    </div>
  </el-card>
</template>

<script>
import router from "../app/router";
import { API_USER_LOGOUT } from "../app/service/common";
import { request } from "../app/service/protocol";
import Logo from "./Logo.vue";

export default {
  props: {
    breadcrumbsList: Array,
    breadcrumbs: String,
    aside: Function
  },
  data: function () {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    isTopPermission() {
      return this.$store.state.userInfo.permission >= 10;
    }
  },
  methods: {
    setTheme(v = "") {
      localStorage.setItem("theme", v);
      document.body.setAttribute("class", v);
      this.$message({ message: this.$t("fileManager.setSuccess"), type: "success" });
    },
    async refresh() {
      await this.render();
      this.$message({ message: this.$t("general.refreshFinish"), type: "success" });
    },
    toAside() {
      this.$props.aside();
    },
    toPrivate() {
      router.push({ path: "/private" });
    },
    async logout() {
      try {
        await request({
          method: "GET",
          url: API_USER_LOGOUT
        });
        window.location.href = "/";
        this.$notify({
          title: this.$t("root.logoutSuccess"),
          message: this.$t("root.logoutSuccessInfo"),
          type: "success"
        });
      } catch (error) {
        this.$notify({
          title: this.$t("root.logoutError"),
          message: error.message,
          type: "error",
          duration: 0
        });
      }
    }
  },
  components: { Logo }
};
</script>

<style scoped>
.box-card {
  transition: all 0.4s;
}
.box-card:hover {
  transform: scale(1.01);
}
.el-dropdown-link {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  padding: 0px 2px;
  background-color: white;
  border-radius: 4px;
}
.el-dropdown-link:hover {
  padding: 0px 12px;
  background-color: rgb(236, 236, 236);
}

.el-dropdown-link i {
  font-weight: 400;
  font-size: 18px;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.header-left-button {
  line-height: 28px;
  font-size: 22px;
  cursor: pointer;
}

.page-header-img {
  background: url("../assets/side.png");
  background-position-y: 40px;
  transition: all 1s;
}

.page-header-img:hover {
  background-position-y: 100px;
}

.header-a {
  color: rgb(235, 235, 235);
  font-weight: 400;
}
</style>
