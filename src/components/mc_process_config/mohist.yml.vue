<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
  This page is for Chinese users only
-->

<template>
  <LineOption :custom="true">
    <template #default>
      <div class="sub-title">
        <div class="sub-title">关于配置兼容与翻译</div>
        <div class="sub-title-info">
          此界面由开源社区开发者开发与翻译，若翻译发现错误可前往开源社区进行反馈。配置文件部分设置因版本和服务端类型不同会有些许变化，某些配置文件子元素过于复杂，可能会导致配置项值无法正常显示，如遇到不正常的配置项值切勿进行修改。若对配置文件要进行更为详细的配置，建议前往文件在线管理功能进行文件编辑。
        </div>
      </div>
      <div class="sub-title">
        <div class="sub-title">关于配置文件</div>
        <div class="sub-title-info">
          此文件为 Mohist 服务端专用的配置文件，可以进一步的设置服务端的一些高级参数。
        </div>
      </div>
    </template>
  </LineOption>

  <div v-if="modelValue">
    <div v-for="(item, index) in config" :key="index">
      <LineOption :option-value="config" :option-key="index">
        <template #title>{{ index }}</template>
        <template #info>{{ descriptionByTitle(description, index) }}</template>
      </LineOption>
    </div>
  </div>
</template>

<script>
import { getDescriptionByTitle, jsonToMap } from "../../app/service/common";
import LineOption from "../LineOption";

export default {
  components: { LineOption },
  props: {
    modelValue: Object
  },
  async mounted() {
    // 将多子节点JSON对象转为无子对象的一层 Map 对象
    this.config = jsonToMap(this.modelValue);
  },
  methods: {
    descriptionByTitle(...p) {
      // 利用已转换到一层 Map 对象 Key 值获取来自多子节点的 JSON 对象具体 Value
      return getDescriptionByTitle(...p);
    }
  },
  data() {
    return {
      config: null,
      description: {
        "mohist": {
          "check_update": this.$t("processConfig.mohistYml.mohist.checkUpdate"),
          "lang": this.$t("processConfig.mohistYml.mohist.lang"),
          "check_libraries": this.$t("processConfig.mohistYml.mohist.checkLibraries"),
          "disable_mods_blacklist": this.$t("processConfig.mohistYml.mohist.disableModsBlacklist"),
          "disable_plugins_blacklist": this.$t("processConfig.mohistYml.mohist.disablePluginsBlacklist"),
          "check_update_auto_download": this.$t("processConfig.mohistYml.mohist.checkUpdateAutoDownload"),
          "use_custom_java8": this.$t("processConfig.mohistYml.mohist.useCustomJava8"),
          "showlogo": this.$t("processConfig.mohistYml.mohist.showlogo"),
          "optimize_explosions": this.$t("processConfig.mohistYml.mohist.optimizeExplosions"),
          "prevent_from_entering_unloaded_chunks": this.$t("processConfig.mohistYml.mohist.preventFromEnteringUnloadedChunks"),
          "ignore_empty_time": this.$t("processConfig.mohistYml.mohist.ignoreEmptyTime")
        },
        "libraries_black_list": this.$t("processConfig.mohistYml.librariesBlackList")
      }
    };
  }
};
</script>
