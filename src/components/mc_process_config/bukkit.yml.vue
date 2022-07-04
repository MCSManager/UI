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
  <div v-if="modelValue">
    <!-- 当前文件的说明，请根据需要自定义修改文字 -->
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
            此配置文件为 Bukkit
            类或其他衍生类服务端常见的配置文件，一般情况下，此配置文件无需过多修改，您可以根据翻译进行适当调节，但如果使用
            Bukkit 衍生类服务端软件，可能这个配置文件将是无效的。
          </div>
        </div>
      </template>
    </LineOption>

    <!-- 根据一层 Map 对象遍历所有选项 -->
    <div v-for="(item, index) in config" :key="index">
      <!-- 选项标题与选项传值,组件会自动判断其值类型采用不同组件 -->
      <LineOption :option-value="config" :option-key="index">
        <!-- 选项标题 -->
        <template #title>{{ index }}</template>
        <!-- 选项中文解释 -->
        <template #info>{{ descriptionByTitle(description, index) }}</template>
      </LineOption>
    </div>
  </div>
</template>

<script>
import { getDescriptionByTitle, jsonToMap } from "../../app/service/common";
import LineOption from "../LineOption";
import LineOptionList from "../LineOptionList";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { LineOption, LineOptionList },
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
        settings: {
          "allow-end": "是否开启末地",
          "warn-on-overload": "服务器过载警告",
          "permissions-file": "自定义权限文件的名字",
          "update-folder":
            "插件更新文件夹，放进新版本插件的文件夹名字，这个文件夹会在服务器重新启动时自动更新插件",
          "plugin-profiling": "允许使用命令 /timings。用于测量插件为事件所花费的时间",
          "connection-throttle": "客户端在最近一次连接尝试后，在允许再次连接之前的间隔",
          "query-plugins": "在 MCSM 内置控制台查询时，服务器是否返回插件列表",
          "deprecated-verbose": "当插件注册已弃用事件时，服务器是否显示警告",
          "shutdown-message": "服务器关闭后游戏客户端提示的信息",
          "minimum-api": ""
        },
        "spawn-limits": {
          monsters: "每个世界可以产生的怪物数量",
          animals: "每个世界可以产生的动物数量",
          "water-animals": "每个世界可以产生的水生动物的数量",
          "water-ambient": "",
          ambient: "可以按世界生成的周围生物（又名蝙蝠）的数量"
        },
        "chunk-gc": {
          "period-in-ticks": "每个大区块垃圾回收之间的 Tick"
        },
        "ticks-per": {
          "animal-spawns":
            "每 Tick 尝试生成一次动物，值为 400 表示服务器将尝试在每 400 Ticks 尝试生成一次动物，值小于 0 将重置为 Minecraft 的默认值",
          "monster-spawns": "每 Tick 尝试生成一次怪物，同上",
          autosave:
            "自动保存，值 6000 表示服务器将尝试每 5 分钟自动保存一次世界。注: 过小可能会导致服务器卡顿",
          "water-spawns": "",
          "water-ambient-spawns": "",
          "ambient-spawns": ""
        },
        aliases: "简化指令文件"
      }
    };
  }
};
</script>
