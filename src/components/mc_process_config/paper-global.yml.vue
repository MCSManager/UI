<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
  This page is for Chinese users only
-->

<template>
  <div v-if="modelValue">
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
            此文件是 Paper 服务端软件专用配置文件，Paper
            每个版本的各个参数都可能有细节变化从而导致翻译工作及其困难，部分参数可能不会有中文翻译。
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
        "_version": "",
        "async-chunks": {
          "threads": "服务器应该用于世界保存和块加载的线程数。默认值 (-1) 表示 Paper 将使用系统的一半线程来加载块，除非另有说明。用于保存和加载块的最大默认值为 4 个线程。这可以通过添加 -Dpaper.maxChunkThreads=[number] 到你的启动参数来覆盖"
        },
        "chunk-loading": {
          "autoconfig-send-distance": "是否使用客户端的渲染距离作为服务器的区块发送距离。这将专门更改发送到客户端的区块的半径，并且不会影响服务器端的区块加载或 ticking。",
          "enable-frustum-priority": "是否在将区块加载到玩家的侧面或后面之前尝试在玩家前面加载区块。由于客户端对无序接收区块反应不佳，默认情况下禁用此功能，通常不建议使用。",
          "global-max-chunk-load-rate": "整个服务器每秒加载的最大区块数。优先于 player-max-chunk-load-rate",
          "global-max-chunk-send-rate": "整个服务器每秒发送的最大区块数。这可能有助于服务器端的峰值带宽使用。",
          "global-max-concurrent-loads": "一次为整个服务器处理的最大区块加载数。如果超过 player-max-concurrent-loads 将覆盖",
          "max-concurrent-sends": "每次排队发送的最大区块数。较低的值将有助于缓解服务器端网络瓶颈，例如反矿透。但是，它不太可能帮助网不好的玩家。",
          "min-load-radius": "玩家周围没有限制加载区块的区块半径。受影响的块区数实际上是配置值加一，此配置能控制客户端实际能够渲染的区块数。",
          "player-max-chunk-load-rate": "每个玩家每秒加载的最大区块数。",
          "player-max-concurrent-loads": "每个玩家一次处理的最大区块加载数。",
          "target-player-chunk-send-rate": "在一秒钟内发送给单个玩家的最大区块数。",
        },
        "collisions": {
          "enable-player-collisions": "设置服务器是否允许玩家碰撞。与记分板交互的插件可能会破坏此选项。如果你在使用此选项时遇到问题，请尝试不要安装插件。",
          "send-full-pos-for-hard-colliding-entities": "尝试通过发送涉及冲突的实体的精确位置来缓解这种不同步。启用此功能将使用更多带宽；然而，在大多数情况下，这是一个值得权衡的选择。",
        },
        "commands": {
          "fix-target-selector-tag-completion": "解决客户端错误，防止实体类型标记建议在目标选择器中发挥作用。",
          "suggest-player-names-when-null-tab-completions": "设置服务器在选项卡完成时，如果没有其他完成项可用，则返回玩家列表。",
          "time-command-affects-all-worlds": "/time 命令是否作用于所有世界？false 则只作用于发送者当前的世界。",
        },
        "console": {
          "enable-brigadier-completions": "在服务器控制台中启用 Mojang 的准将（高级）命令完成。",
          "enable-brigadier-highlighting": "在服务器控制台中启用 Mojang 的准将突出显示。",
          "has-all-permissions": "控制台命令是否拥有所有权限。",
        },
        "item-validation": {
          "book": {
            "author": "书本作者的最大长度（以字符为单位）",
            "page": "一本书页面的最大长度（以字符为单位",
            "title": "书名的最大长度（以字符为单位）",
          },
          "book-size": {
            "page-max": "",
            "total-multiplier": "",
          },
          "display-name": "物品显示名称的最大长度。（以字符为单位）",
          "lore-line": "物品 lore 的最大长度。（以字符为单位）",
          "resolve-selectors-in-books": "是否解析书中的选择器。启用此功能后，获得创造模式的玩家将能够以另一种方式使服务器崩溃。",
        },
        "logging": {
          "deobfuscate-stacktraces": "是否将 Spigot 映射的堆栈跟踪重新映射到日志记录中的 Mojang 映射。对 Mojang 映射服务器没有影响。",
          "log-player-ip-addresses": "服务器是否应记录玩家 IP 地址。这不会影响插件记录玩家 IP 地址的功能。",
          "use-rgb-for-named-text-colors": "是否应使用 RGB 代码记录命名的 ANSI 颜色。",
        },
        "messages": {
          "kick": {
            "authentication-servers-down": "当 Mojang 的身份验证服务器无法访问时发送给玩家的消息。",
            "connection-throttle": "当玩家由于连接受到限制而无法加入时发送给玩家的消息。",
            "flying-player": "发送给被检测到飞行的玩家的消息。",
            "flying-vehicle": "发送给被检测到乘坐飞行器的玩家的消息。",
          },
          "no-permission": "当玩家没有足够的权限进行操作时发送给玩家的消息",
          "use-display-name-in-quit-message": "服务器是否应该在退出消息中使用玩家的显示名称（由插件设置）或实际名称",
        },
        "misc": {
          "chat-threads": {
            "chat-executor-core-size": "",
            "chat-executor-max-size": "",
          },
          "fix-entity-position-desync": "固定实体位置同步。",
          "lag-compensate-block-breaking": "服务器是否使用时间或 TPS 来确定区块中断的持续时间。客户端假设服务器始终以 20 TPS 运行，当服务器延迟期间方块被破坏时会导致不一致。此设置可防止这种不同步。",
          "load-permissions-yml-before-plugins": "是否在插件加载之前加载 bukkit 的 permission.yml 文件，允许他们在启用时立即检查那里的设置信息",
          "max-joins-per-tick": "设置一次可以加入服务器的最大玩家数量。如果有更多玩家加入，他们将被推迟到稍后的 ticks 加入，但不会被踢出。这与 bukkit.yml 中的连接限制无关",
          "region-file-cache-size": "区域文件缓存的最大大小。",
          "strict-advancement-dimension-check": "",
          "use-alternative-luck-formula": "是否使用 替代运气公式 ，允许将运气应用于没有定义质量的项目。对钓鱼公式进行了重大更改。",
          "use-dimension-type-for-custom-spawners": "幻翼、流浪商人等是否应该能够在自定义世界中生成",
        },
        "packet-limiter": {
          "all-packets": {
            "action": "一旦违反限制就采取的行动。可能的值 DROP 将忽略超过限制的数据包，并且 KICK 将踢出超过限制的玩家。",
            "interval": "应用的时间间隔。（单位为秒）",
            "max-packet-rate": "间隔内每个玩家允许的数据包数。",
          },
          "kick-message": "玩家因发送太多数据包而被踢的消息。",
          "overrides": {
            "ServerboundPlaceRecipePacket": {
              "action": "",
              "interval": "",
              "max-packet-rate": "",
            },
          },
        },
        "player-auto-save": {
          "max-per-tick": "一个 tick 内最多可以保存多少名玩家数据。",
          "rate": "玩家数据应该多久保存一次。",
        },
        "proxies": {
          "bungee-cord": {
            "online-mode": "设置为与你的 bungee-cord 的 online-mode 相同。",
          },
          "proxy-protocol": "服务器是否应该处理 代理协议消息。这与 Velocity 或 BungeeCord 完全无关。仅当你使用 HAProxy 或类似工具时才启用此功能。",
          "velocity": {
            "enabled": "服务器是否应该接受 Velocity 代理。",
            "online-mode": "设置为与你的 Velocity 的 online-mode 相同。",
            "secret": "由 Velocity 代理和此服务器共享的密钥字符串。这需要与你的 Velocity 的 forwarding-secret 设置相同。",
          },
        },
        "scoreboards": {
          "save-empty-scoreboard-teams": "设置服务器是否应自动删除那些空的队伍的计分板。",
          "track-plugin-scoreboards": "服务器是否应该跟踪只有虚拟目标的插件的记分牌。",
        },
        "spam-limiter": {
          "incoming-packet-threshold": "设置服务器认为传入数据包是垃圾邮件并忽略它们的阈值。",
          "recipe-spam-increment": "当玩家按下配方时，配方垃圾计数器增加的数字。",
          "recipe-spam-limit": "在服务器将玩家踢出垃圾邮件之前，配方垃圾邮件计数器可以达到的数量。",
          "tab-spam-increment": "当玩家在聊天窗口中按下选项卡时，内部选项卡垃圾邮件计数器增加的数量。",
          "tab-spam-limit": "在服务器将玩家踢出垃圾邮件之前，内部标签垃圾邮件计数器可以达到的数量。",
        },
        "timings": {
          "enabled": "是否启用 Timings",
          "hidden-config-entries": "要隐藏在 Timings 报告中的配置条目。",
          "history-interval": "Timings 报告中各个点之间的间隔。（以秒为单位）",
          "history-length": "为单个报告保留的数据总量。此值在服务器端经过验证。超过这个数的报告将被拒绝。",
          "server-name": "设置 Timings 输入服务器名称的内容。",
          "server-name-privacy": "设置 Timings 是否在报告中隐藏服务器名称。",
          "url": "设置 Timings Viewer 的服务器的 URL。",
          "verbose": "设置 Timings 是否在其报告中提供更具体的信息。",
        },
        "unsupported-settings": {
          "allow-headless-pistons": "服务器是否允许创建无头活塞。",
          "allow-permanent-block-break-exploits": "是否可以通过普通漏洞破坏不可破坏的方块。",
          "allow-piston-duplication": "是否允许复制 TNT、地毯和铁轨。这不能控制沙子的复制。",
          "perform-username-validation": "是否允许名称中包含特殊字符的玩家加入。",
        },
        "watchdog": {
          "early-warning-delay": "在服务器开始挂起后看门狗线程开始打印线程转储之前的毫秒数。",
          "early-warning-every": "服务器挂起时打印线程转储之间的间隔。（以毫秒为单位）",
        }
      }
    };
  }
};
</script>