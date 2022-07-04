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
  <!-- 当前文件的说明，请根据需要自定义修改文字，勿修改排版 -->
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
          类或其他衍生类服务端常见的配置文件，包含了绝大部分的服务端设置，例如服务器端口，最大人数，玩家视距和正版验证等。
        </div>
      </div>
    </template>
  </LineOption>

  <div v-for="(item, index) in modelValue" :key="index">
    <LineOption :option-value="modelValue" :option-key="index">
      <template #title>{{ index }}</template>
      <template #info>{{ description[index] }}</template>
    </LineOption>
  </div>
</template>

<script>
import LineOption from "../LineOption";

export default {
  components: { LineOption },
  props: {
    modelValue: Object
  },
  async mounted() {},
  methods: {},
  data() {
    return {
      description: {
        "require-resource-pack": "是否需要资源包",
        "enable-jmx-monitoring": "是否启用 JMX 监视",
        "sync-chunk-writes": "是否启用同步区块写入",
        "generator-settings": "用于自定义超平坦世界的生成，不生成超平坦世界请留空",
        "allow-nether": "是否允许下界（包括地狱）",
        "level-name": "世界（地图）名称 不要使用中文",
        "enable-query": "是否允许使用 GameSpy4 协议的服务器监听器",
        "allow-flight": "是否允许玩家飞行（在任何游戏模式下）",
        "server-port": "服务器端口（若服务器有更高级的设置，此选项可能会失效）",
        "level-type": "地图的生成类型",
        "enable-rcon": "是否允许远程访问服务器控制台（RCON）",
        "force-gamemode": "强制玩家加入时为默认游戏模式",
        "level-seed": "地图种子 默认留空",
        "server-ip": "服务器ip，若不绑定请留空",
        "max-build-height": "玩家在服务器放置方块的最高高度",
        "spawn-npcs": "是否生成村民",
        "white-list": "是否开启白名单",
        "spawn-animals": "是否生成动物",
        "snooper-enabled": "启用数据采集",
        hardcore: "极限模式（死后自动封禁）",
        "texture-pack": "材质包",
        "online-mode": "在线（正版）验证",
        pvp: "是否允许玩家互相攻击",
        difficulty: "游戏难度",
        "player-idle-timeout": "允许的挂机时间，单位为分钟 超过限制后自动踢出服务器",
        gamemode: "游戏模式 0=生存 1=创造 2=冒险 3=旁观",
        "max-players": "服务器最大玩家数限制",
        "spawn-monsters": "生成攻击型生物（怪物）",
        "view-distance": "服务器发送给客户端的数据量，决定玩家能设置的视野",
        "generate-structures": "生成世界时生成结构（如村庄）禁止后地牢和地下要塞仍然生成",
        motd: "服务器信息展示 若使用 ColorMotd 等插件可留空该选项",
        "op-permission-level": "OP 权限等级 ",
        "announce-player-achievements": "玩家获得成就时，是否在服务器聊天栏显示（是否允许其装X）",
        "network-compression-threshold": "网络压缩阈值",
        "resource-pack-sha1": "资源包的 SHA-1 值，必须为小写十六进制，不是必填选项",
        "enable-command-block": "启用命令方块",
        "resource-pack": "统一资源标识符 (URI) 指向一个资源包。玩家可选择是否使用",
        "max-world-size": "最大世界大小",
        "function-permission-level": "设定函数的默认权限等级",
        "max-tick-time": "设置每个 Tick 花费的最大毫秒数",
        "prevent-proxy-connections": "是否允许玩家使用网络代理进入服务器",
        "rcon.port": "设置 RCON 远程访问的端口号",
        "rcon.password": "设置 RCON 远程访问的密码（参见 enable-rcon）",
        "query.port": "设置监听服务器的端口号（参见 enable-rcon）",
        "use-native-transport": "是否使用针对 Linux 平台的数据包收发优化 [ 仅 Linux ]",
        debug: "调试模式",
        "broadcast-rcon-to-ops": "向 OP 广播 RCON 信息",
        "broadcast-console-to-ops": "向 OP 广播服务器控制台信息",
        "enforce-whitelist": "在服务器上强制使用白名单",
        "spawn-protection":
          "通过将该值进行 2x+1 的运算来决定出生点的保护半径，设置为0将只保护出生点下方那一个方块。"
      }
    };
  }
};
</script>
