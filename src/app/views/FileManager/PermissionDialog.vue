<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="v" :cancel="close">
    <template #title>文件/文件夹权限</template>
    <template #default>
      <el-row :gutter="12">
        <el-col :md="8" :offset="0" v-for="(item, index) in options" :key="index">
          <el-card shadow="never" body-style="padding:8px 4px" style="margin-bottom: 0px">
            <div class="group-container">
              <div class="group-name">
                {{ item.groupName }}
              </div>
              <el-checkbox-group v-model="item.permissions">
                <div v-for="item in DEFAULT_PERMISSIONS_OPTIONS" :key="item.label">
                  <el-checkbox :label="item.value">{{ item.label }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <div class="item-container">
            <el-checkbox v-model="includeSubDir">应用到子目录</el-checkbox>
          </div>
        </el-col>
      </el-row>

      <div class="btn-area">
        <el-button size="small" type="primary" @click="submit">{{
          $t("general.confirm")
        }}</el-button>
        <el-button size="small" type="danger" @click="close">{{ $t("general.cancel") }}</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { EventEmitter } from "events";

const event = new EventEmitter();

const DEFAULT_PERMISSIONS_OPTIONS = [
  {
    label: "读取",
    value: 4
  },
  {
    label: "写入",
    value: 2
  },
  {
    label: "执行",
    value: 1
  }
];

export default {
  components: { Dialog },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      DEFAULT_PERMISSIONS_OPTIONS,
      v: this.visible,
      includeSubDir: true,
      options: [
        {
          groupName: "所有者",
          permissions: []
        },
        {
          groupName: "用户组",
          permissions: []
        },
        {
          groupName: "任何人",
          permissions: []
        }
      ],
      selected: "",
      func: null,
      reject: null
    };
  },
  watch: {
    visible(n) {
      this.v = n;
    }
  },
  methods: {
    prompt() {
      this.show();
      return new Promise((ok, reject) => {
        this.reject = reject;
        event.on("submit", (v) => ok(v));
      });
    },
    show() {
      this.v = true;
      this.$emit("update:visible", true);
    },
    close() {
      this.v = false;
      if (this.reject) this.reject(new Error(this.$t("selectUnzipCode.cancel")));
      this.reject = null;
      this.$emit("update:visible", false);
    },
    submit() {
      // if (!this.selected) {
      //   return this.$message({ message: this.$t("selectUnzipCode.selectOneCode"), type: "info" });
      // }
      // event.emit("submit", this.selected);
      // this.$emit("submit", this.selected);
      // this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.group-container {
  margin: 0px 12px;

  .el-checkbox {
    margin: -6px 0px !important;
  }
}
.item-container {
  margin: 0px 0px;
}
.group-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}
.btn-area {
  margin: 12px 0px 0px 0px;
}
</style>
