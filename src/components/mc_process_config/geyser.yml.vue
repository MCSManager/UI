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
          此文件为 Geyser 服务端专用的配置文件，可以进一步的设置服务端的一些高级参数。
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
        bedrock: {
          address: "Geyser端服务器IP",
          port: "服务器端口",
          "clone-remote-port": "使每次启动服务器时Geyser端端口与Java端端口相同（仅限插件版）",
          motd1: "第一行MOTD；如果“passthrough-motd”设置为true则忽略此项",
          motd2: "第二行MOTD",
          "server-name": "服务器名称，在暂停菜单和设置菜单中都可见"
        },
        remote: {
          address: "需要连接的Java服务器的IP",
          port: "需要连接的Java服务器的端口",
          "auth-type": "验证方式（online、offline、floodgate）"
        },
        "floodgate-key-file": "Floodgate 生成的公钥（不使用 Floodgate 时请忽略此项）",
        "command-suggestions": "是否启用命令提示",
        "passthrough-motd": "是否使用Java服务器的MOTD",
        "passthrough-protocol-name": "是否使用Java服务器的协议",
        "passthrough-player-counts": "是否同步显示Java服务器的玩家数量",
        "legacy-ping-passthrough":
          "是否开启LEGACY ping passthrough，除非你的 MOTD 或玩家数量显示不正确，否则无需启用此功能",
        "ping-passthrough-interval": "ping 远程Java服务器的频率，以秒为单位。",
        "max-players": "最大玩家限制",
        "debug-mode": "调试模式",
        "general-thread-pool": "线程池大小",
        "allow-third-party-capes":
          "允许第三方披风可见（目前支持OptiFine、LabyMod、5Zig、Minecraft官方）",
        "allow-third-party-ears": "允许第三方 deadmau5 ears",
        "show-cooldown": "允许显示虚假的冷却时间",
        "default-locale": "默认语言",
        "cache-chunks": "是否启用区块缓存（建议在生产环境中禁用，因为会吃掉大量的内存）",
        "cache-images":
          "设置图像缓存的天数（有助于节省从网络下载它们的时间。设置为 0 即可禁用；默认值：0）",
        "above-bedrock-nether-building": "是否允许在地狱建造和显示高于 Y=127 的方块",
        metrics: {
          enabled: "是否启用bStats统计",
          uuid: "服务器UUID，请勿更改！"
        },
        "scoreboard-packet-threshold":
          "指定在每秒收到多少个记分板数据包之后，记分板更新将限制为每秒四次更新",
        "enable-proxy-connections": "是否允许来自 ProxyPass 和 Waterdog 的连接",
        "config-version": "配置文件版本"
      }
    };
  }
};
</script>
