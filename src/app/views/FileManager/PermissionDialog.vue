<!--
  Copyright (C) 2023 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="v" :cancel="close">
    <template #title>{{ $t("views.FileManager_PermissionDialog.001") }}</template>
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
            <el-checkbox v-model="includeSubDir">{{
              $t("views.FileManager_PermissionDialog.002")
            }}</el-checkbox>
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
import { API_FILE_CHMOD } from "../../service/common";
import axios from "axios";
const event = new EventEmitter();
const DEFAULT_PERMISSIONS_OPTIONS = [
  {
    label: window.$t("CommonText.046"),
    value: 4
  },
  {
    label: window.$t("CommonText.047"),
    value: 2
  },
  {
    label: window.$t("CommonText.048"),
    value: 1
  }
];
const DEFAULT_OPTIONS = [
  {
    groupName: window.$t("CommonText.049"),
    permissions: []
  },
  {
    groupName: window.$t("CommonText.050"),
    permissions: []
  },
  {
    groupName: window.$t("CommonText.051"),
    permissions: []
  }
];
export default {
  components: {
    Dialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      DEFAULT_PERMISSIONS_OPTIONS,
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      v: this.visible,
      includeSubDir: true,
      options: [],
      selected: "",
      func: null,
      reject: null,
      row: {}
    };
  },
  watch: {
    visible(n) {
      this.v = n;
    }
  },
  methods: {
    prompt(row) {
      this.show();
      this.row = row;
      const permissionArr = String(row.mode)
        .split("")
        .map((v) => parseInt(v));
      permissionArr.forEach((v, index) => {
        if (v - 4 >= 0) {
          this.options[index].permissions.push(4);
          v -= 4;
        }
        if (v - 2 >= 0) {
          this.options[index].permissions.push(2);
          v -= 2;
        }
        if (v - 1 >= 0) {
          this.options[index].permissions.push(1);
          v -= 1;
        }
      });
      return new Promise((ok, reject) => {
        this.reject = reject;
        event.on("submit", (v) => {
          ok(v);
        });
      });
    },
    show() {
      this.options = JSON.parse(JSON.stringify(DEFAULT_OPTIONS));
      this.v = true;
      this.$emit("update:visible", true);
    },
    close() {
      this.options = [];
      this.v = false;
      if (this.reject) this.reject(new Error(this.$t("selectUnzipCode.cancel")));
      this.reject = null;
      this.$emit("update:visible", false);
    },
    async submit() {
      const chmod = this.getChmodValue();
      await axios.request({
        method: "PUT",
        url: API_FILE_CHMOD,
        params: {
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid
        },
        data: {
          chmod,
          target: this.row.target,
          deep: this.includeSubDir
        }
      });
      event.emit("submit", this.getChmodValue());
      this.$emit("submit");
      this.close();
    },
    getChmodValue() {
      let chmodValue = "";
      for (let index = 0; index < this.options.length; index++) {
        const { permissions } = this.options[index];
        const v = permissions.reduce((v, c) => v + c);
        chmodValue += String(v);
      }
      return parseInt(chmodValue);
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
