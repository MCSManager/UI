<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
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
</template>

<script>
import router from "@/app/router";
import { API_USER_LOGOUT } from "@/app/service/common";
import { request } from "@/app/service/protocol";

export default {
  props: {},
  data: function () {
    return {};
  },
  computed: {},
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
  }
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
  /* background-color: rgba(0, 0, 0, 0); */
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
</style>
