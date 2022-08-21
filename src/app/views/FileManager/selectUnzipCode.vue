<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
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
        <el-select
          v-model="selected"
          class="m-2"
          :placeholder="$t('selectUnzipCode.selectCode')"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
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
        { label: this.$t("selectUnzipCode.utf8"), value: "utf-8" },
        { label: this.$t("selectUnzipCode.gbk"), value: "gbk" },
        { label: this.$t("selectUnzipCode.big5"), value: "big5" }
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
