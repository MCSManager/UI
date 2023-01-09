<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
  This page is for Chinese users only
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
        "level-type": "地图的生成类型（默认：default，超平坦：flat，放大的世界：amplified，巨型生物群系：largeBiomes）",
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
        "enforce-secure-profile": "如果开启，则没有 Mojang 签名公钥的玩家将无法连接到服务器。",
        difficulty: "游戏难度（peaceful, easy, normal,hard）",
        "player-idle-timeout": "允许的挂机时间，单位为分钟 超过限制后自动踢出服务器",
        gamemode: "游戏模式（survival，creative，adventure，spectator）",
        "max-players": "服务器最大玩家数限制",
        "spawn-monsters": "生成攻击型生物（怪物）",
        "view-distance": "服务器发送给客户端的数据量，决定玩家能设置的视野",
        "generate-structures": "生成世界时生成结构（如村庄）禁止后地牢和地下要塞仍然生成",
        motd: "服务器信息展示 若使用 ColorMotd 等插件可留空该选项",
        "op-permission-level": "OP 权限等级 (1-4)",
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
          "通过将该值进行 2x+1 的运算来决定出生点的保护半径，设置为0将只保护出生点下方那一个方块。",
        "max-chained-neighbor-updates": "在跳过其他更新之前限制连续临近更新的数量。负值移除限制。",
        "enable-status":
          "使服务器在服务器列表中显示为在线。如果设置为否，它将抑制来自客户端的回复。这意味着它将显示为脱机，但仍将接受连接。",
        "resource-pack-prompt":
          "可选，添加一个自定义消息，当使用require-resource-pack时，将显示在资源包提示窗口上。",
        "hide-online-players": "是否隐藏在线人数",
        "entity-broadcast-range-percentage": "控制客户端最远可见实体距离，可以适当优化缩小距离。",
        "simulation-distance":
          "设置生物实体与玩家之间的最大距离，以便服务器更新，以玩家每个方向的块为单位(半径)。如果实体在这个半径之外，那么它们将不会被服务器发送，也不会被玩家看到。",
        "rate-limit": "当玩家客户端发送多少数据包总量时会被踢出，0代表关闭",
        "previews-chat":
          "如果设置为是，将启用聊天预览。如果启用，服务器禁止用户使用vpn或代理；如果禁用，服务器不阻止用户使用vpn或代理。",
        "text-filtering-config": "文本过滤规则配置文件（可能工作不正常）"
      }
    };
  }
};
</script>
