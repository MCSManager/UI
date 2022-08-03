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
  <Dialog v-model="v" :cancel="close">
    <template #title>{{ $t("selectUnzipCode.title") }}</template>
    <template #default>
      <div class="components-warpper">
        <p>{{ $t("selectUnzipCode.info") }}</p>

        <p>
          {{ $t("selectUnzipCode.CN") }}
          <br />
          {{ $t("selectUnzipCode.HKorTW") }}
        </p>
        <el-select v-model="selected" class="m-2" :placeholder="$t('selectUnzipCode.selectCode')" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="btn-area">
        <el-button size="small" type="primary" @click="submit">{{ $t("general.confirm") }}</el-button>
        <el-button size="small" type="danger" @click="close">{{ $t("general.cancel") }}</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { EventEmitter } from "events";

const event = new EventEmitter();

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
      v: this.visible,
      options: [
        { label: this.$t("selectUnzipCode.gbk"), value: "gbk" },
        { label: this.$t("selectUnzipCode.big5"), value: "big5" },
        { label: this.$t("selectUnzipCode.utf8"), value: "utf-8" }
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
      if (!this.selected) {
        return this.$message({ message: this.$t("selectUnzipCode.selectOneCode"), type: "info" });
      }
      event.emit("submit", this.selected);
      this.$emit("submit", this.selected);
      this.close();
    }
  }
};
</script>

<style scoped>
.btn-area {
  margin-top: 8px;
}
</style>
