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
        mohist: {
          check_update: "是否检查更新",
          lang: "语言",
          check_libraries: "是否检查依赖库",
          disable_mods_blacklist: "禁用 MOD 黑名单",
          disable_plugins_blacklist: "禁用插件黑名单",
          check_update_auto_download: "是否检查更新并且自动下载",
          use_custom_java8: "是否准许自定义下载",
          showlogo: "是否显示 Logo",
          optimize_explosions: "是否优化爆炸时的算法",
          prevent_from_entering_unloaded_chunks: "是否防止进入已卸载块",
          ignore_empty_time: "忽略所有空时间"
        },
        libraries_black_list: "依赖库黑名单"
      }
    };
  }
};
</script>
