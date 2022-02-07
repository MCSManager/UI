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
            此文件是 Paper 服务端软件专用配置文件，有近400行的服务器具体参数配置，Paper
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
        "use-display-name-in-quit-message":
          "设置服务器是否应该在退出消息中使用玩家名称(dispalyname)",
        verbose: "设置服务器是否在启动时将所有配置值转储到服务器日志。",
        "config-version": "配置文件版本（请勿更改）",
        settings: {
          "console-has-all-permissions": "是否允许服务端控制台获得所有权限",
          "use-alternative-luck-formula":
            "使用 Aikar 的运气公式替换原版运气公式。（或许对钓鱼有帮助）",
          "chunk-tasks-per-tick": "每tick中可以完成多少区块任务。这有助于渲染和块生成。",
          "save-empty-scoreboard-teams": "是否保留空的计分板团队数据",
          "enable-player-collisions": "是否启用玩家碰撞",
          "player-auto-save-rate": "设置玩家应该被保存的频率",
          "max-player-auto-save-per-tick": "在一tick中最多应该保存多少个玩家数据",
          "track-plugin-scoreboards": "服务器是否应该跟踪只有虚拟目标的插件计分板",
          "region-file-cache-size": "设置区域文件缓存的最大大小",
          "incoming-packet-spam-threshold": "设置服务器将传入数据包视为垃圾邮件并忽略它们的阈值。",
          "suggest-player-names-when-null-tab-completions":
            "Instructs the server to return a list of players when tab-completing if the plugin has no tab completions of its own.",
          "bungee-online-mode": "设置为和server.properties一样即可",
          "max-joins-per-tick":
            "最大连接数，设置允许同时加入服务器的最大玩家数量。如果超过这个数，他们将被推迟加入。",
          "load-permissions-yml-before-plugins":
            "在插件之前加载 bukkit 的 permission.yml 文件，允许他们在启用时立即检查权限。",
          "use-display-name-in-quit-message":
            "设置服务器是否应该在退出消息中使用玩家名称(dispalyname)",
          "fix-entity-position-desync": "修复了客户端和服务器之间项目位置不同步的问题",
          "log-named-entity-deaths": "是否记录命名实体的死亡信息",
          "save-player-data": "设置服务器是否应该保存玩家数据，例如背包、经验和成就",
          "use-versioned-world": "",
          "unsupported-settings": {
            "allow-permanent-block-break-exploits": "是否可以使用原版漏洞破坏不可破坏的方块",
            "allow-piston-duplication": "是否允许刷方块，例如复制TNT、刷地毯和铁轨",
            "allow-headless-pistons": "是否允许无头活塞，通常用于破坏基岩等方块",
            "allow-permanent-block-break-exploits-readme": "",
            "allow-piston-duplication-readme": "",
            "allow-headless-pistons-readme": ""
          },
          "async-chunks": {
            enable: "",
            threads: "服务器用于保存和加载世界的线程数"
          },
          watchdog: {
            "early-warning-every":
              "The interval in milliseconds between printed thread dumps while the server is hanging",
            "early-warning-delay":
              "The number of milliseconds before the watchdog thread starts printing thread dumps after the server starts hanging."
          },
          "book-size": {
            "page-max": "书本中单个页面的最大字节数可构成书本允许的字节总数",
            "total-multiplier": "每一页都有上一页的字节数的倍数"
          },
          "spam-limiter": {
            "tab-spam-increment":
              "The number that the internal tab spam counter increases by when a player presses tab in the chat window",
            "tab-spam-limit":
              "The number that the internal tab spam counter can reach until the server kicks the player for spam",
            "recipe-spam-increment":
              "The number that the recipe spam counter increases by when a player presses a recipe",
            "recipe-spam-limit":
              "The number that the recipe spam counter can reach until the server kicks the player for spam"
          },
          "velocity-support": {
            enabled:
              "如果此服务器被Velocity代理之后，则将此设置为 true 。如果这是真的，请不要在 spigot.yml 中启用 bungeecord 设置。",
            "online-mode": "",
            secret:
              "Velocity 代理和此服务器共享的密钥。这需要与你代理的 forwarding-secret 设置相匹配。"
          },
          "item-validation": {
            "display-name": "物品显示名称长度的限制（覆盖Spigot.yml）",
            "loc-name": "loc-name长度的限制（覆盖Spigot.yml）",
            "lore-line": "物品Lore长度的限制（覆盖Spigot.yml）",
            book: {
              title: "书名长度限制（覆盖Spigot.yml）",
              author: "作者名字长度限制（覆盖Spigot.yml）",
              page: "单个书页长度限制（覆盖Spigot.yml）"
            },
            console: {
              "enable-brigadier-highlighting":
                " Enables Mojang’s Brigadier highlighting in the server console",
              "enable-brigadier-completions":
                "Enables Mojang’s Brigadier command completions in the server console"
            },
            loggers: {
              "deobfuscate-stacktraces": ""
            }
          }
        },
        timings: {
          enabled: "是否启用 Timings",
          verbose:
            "Instructs Timings to provide more specific information in its reports. For example, specific entity types causing lag rather than just “entities”",
          "server-name-privacy": "Instructs Timings to hide server name information in reports.",
          url: "指定 Timings 报告应上传到的Timings Viewer服务器的 URL",
          "hidden-config-entries": "要隐藏在 Timings 报告中的配置条目",
          "history-interval": "Timings 报告中各个点之间的间隔（以秒为单位）",
          "history-length": "为单个报告保留的数据最大量",
          "server-name": "设置为服务器名称输入内容的时间"
        },
        messages: {
          "no-permission": "没有权限时客户端提示的消息",
          kick: {
            "connection-throttle": "当玩家连接受到限制时提示的消息",
            "flying-player": "当玩家在服务器内飞行被踢出的消息",
            "flying-vehicle": "当玩家在服务器内用飞行器飞行被踢出的消息",
            "authentication-servers-down":
              "当玩家因为 Mojang 身份验证服务器关闭而断开连接时被踢出的消息"
          }
        },
        "world-settings": {
          default: {
            "armor-stands-tick":
              "Disable to prevent armor stands from ticking. Can improve performance with many armor stands",
            "disable-teleportation-suffocation-check": "在传送玩家之前禁用服务器检测目的地是否安全",
            "remove-corrupt-tile-entities": "服务器是否自动删除损坏且无法修复的tile实体",
            "experience-merge-max-value": "设置服务器经验球最大值，防止它们全部合并为 1 个",
            "falling-block-height-nerf":
              "The height at which falling blocks will be removed from the server",
            "tnt-entity-height-nerf":
              "The height at which Primed TNT entities will be removed from the server",
            "phantoms-do-not-spawn-on-creative-players": "玩家在创造模式下禁止产生幻翼",
            "phantoms-only-attack-insomniacs": "防止幻翼攻击睡着的玩家",
            "max-auto-save-chunks-per-tick": "每tick中系统自动保存的最大区块数",
            "per-player-mob-spawns": "生物限制（在 bukkit.yml 中）是计算每个玩家还是整个服务器",
            "delay-chunk-unloads-by": "Delays chunk unloads by the specified time",
            "disable-thunder": "禁用雷暴",
            "keep-spawn-loaded-range": "围绕出生点区块保持加载的区块范围",
            "spawner-nerfed-mobs-should-jump":
              "Determines if spawner nerfed mobs should attempt to float (jump) in water",
            "entities-target-with-follow-range":
              "Sets whether the server should use follow range when targeting entities",
            "non-player-arrow-despawn-rate":
              "从非玩家实体（发射器）射出的箭消失的速率，以tick为单位",
            "creative-arrow-despawn-rate": "玩家在创造模式下射出的箭消失的速率，以tick为单位",
            "zombies-target-turtle-eggs": "设置僵尸和僵尸猪灵是否以海龟蛋为目标",
            "zombie-villager-infection-chance":
              "设置村民转换为僵尸村民的变化，根据游戏难度设置。默认为-1.0，设置为0始终让村民在被僵尸杀死时死亡；设置为100则始终将村民转换为僵尸村民",
            "all-chunks-are-slime-chunks":
              "是否允许服务器将所有区块视为史莱姆区块（可能并不会增加生成史莱姆的几率）",
            "mob-spawner-tick-rate": "刷怪笼应该多久计算一次可用的生成区域并将新实体生成到该区域中",
            "seed-based-feature-search":
              "Whether the server should check if a chunk’s biome (determined by world seed) can support the desired feature before loading it during feature searches.",
            "prevent-tnt-from-moving-in-water": "是否防止点燃的TNT在水中移动",
            "iron-golems-can-spawn-in-air": "设置铁傀儡是否可以在空中生成",
            "skeleton-horse-thunder-spawn-chance": "设置4个骷髅骑士在雷暴中生成的几率",
            "disable-ice-and-snow": "禁用冰和雪的形成",
            "water-over-lava-flow-speed": "设置水在岩浆上流动的速度",
            "use-faster-eigencraft-redstone": "提升红石性能",
            "nether-ceiling-void-damage-height":
              "Sets the level above which players in the nether will take void damage",
            "allow-non-player-entities-on-scoreboards": "是否允许非玩家实体在记分板上",
            "parrots-are-unaffected-by-player-movement": "防止鹦鹉在玩家移动时从玩家的肩膀上掉下来",
            "portal-search-radius":
              "查找现有下界传送门的最大范围。如果在该范围内找不到一个，将生成一个新的",
            "portal-create-radius":
              "The maximum range the server will try to create a portal around when generating a new portal",
            "disable-explosion-knockback": "防止被炸飞",
            "container-update-tick-rate":
              "The rate, in ticks, at which the server updates containers and inventories",
            "keep-spawn-loaded": "保持出生点区块加载",
            "armor-stands-do-collision-entity-lookups":
              "Instructs armor stand entities to do entity collision checks",
            "grass-spread-tick-rate": "艹每tick的生长速度",
            "should-remove-dragon":
              "Sets whether or not to remove the dragon if it exists without a portal.",
            "use-vanilla-world-scoreboard-name-coloring": "使用原版世界记分板名称着色",
            "fixed-chunk-inhabited-time":
              "If 0 or greater, set the chunk inhabited time to a fixed number",
            "prevent-moving-into-unloaded-chunks": "服务器是否阻止玩家进入未加载的区块",
            "baby-zombie-movement-modifier": "修改幼年僵尸移动的速度",
            "count-all-mobs-for-spawning": "刷怪笼和其他生物是否计入全局生物限制",
            "optimize-explosions": "优化TNT/苦力怕等爆炸",
            "duplicate-uuid-resolver":
              "指定服务器用于解析具有重复 UUID 的实体的方法（saferegen：为实体重新生成一个UUID；delete：删除实体；silent：什么都不做，不打印日志；warn：什么都不做，打印日志）",
            "duplicate-uuid-saferegen-delete-range":
              "If multiple entities with duplicate UUIDs are within this many blocks, saferegen will delete all but 1 of them",
            "disable-creeper-lingering-effect": "随机禁用苦力怕，留下一个挥之不去的区域效果云",
            "max-entity-collisions": "最大实体碰撞，服务器在达到此值后停止处理碰撞冲突",
            "filter-nbt-data-from-spawn-eggs-and-related":
              "从创造模式中的生成蛋、掉落方块和其他经常被滥用的物品中删除某些 NBT 数据",
            "light-queue-size":
              "Sets how large the queue of light updates off the main thread for each world should be",
            "auto-save-interval": "自动保存间隔",
            "enable-treasure-maps": "是否允许村民交易藏宝图",
            "treasure-maps-return-already-discovered":
              "Instructs the server to target the first treasure location found, rather than the first undiscovered one",
            "show-sign-click-command-failure-msgs-to-player":
              "Whether commands executed by sign click should show failure messages to players",
            "fix-items-merging-through-walls":
              "是否禁止物品穿过墙壁合并（启用后可能会导致性能下降）",
            "fix-climbing-bypassing-cramming-rule": "设置攀爬是否应绕过Cramming限制",
            "only-players-collide":
              "Only calculate collisions if a player is one of the two entities colliding",
            "allow-vehicle-collisions": "允许车辆碰撞",
            "portal-search-vanilla-dimension-scaling":
              "Whether to apply vanilla dimension scaling to portal-search-radius",
            "seed-based-feature-search-loads-chunks":
              "基于种子的特征搜索加载区块（禁用后会提高性能，但会影响/locate指令）",
            "max-leash-distance": "配置拴绳的最大距离，如果超过这个距离则断开",
            "fix-wither-targeting-bug": "修复凋零目标错误（MC-29274）",
            "allow-player-cramming-damage":
              "允许玩家在游戏规则设置中的更多的实体发生碰撞时受到的来自maxEntityCramming的伤害",
            "update-pathfinding-on-block-update":
              "控制在世界中更新区块时是否更新怪物的寻路balabala（禁用此选项可以显着提高服务器性能）",
            "map-item-frame-cursor-limit": "每个地图在展示框的光标限制（就是绿色那个箭头），",
            "ender-dragons-death-always-places-dragon-egg": "末影龙死亡是否掉落龙蛋",
            "allow-using-signs-inside-spawn-protection": "允许玩家在出生点保护区内使用告示牌",
            "bed-search-radius": "",
            "allow-leashing-undead-horse": "",
            "baby-zombie-movement-speed":
              "修改小僵尸移动的速度（0.5表示比基本速度快50%，-0.4会慢40%）",
            "door-breaking-difficulty": {
              zombie: "列出僵尸能够破门的难度列表",
              vindicator: "列出卫道士能够破门的难度列表"
            },
            "mobs-can-always-pick-up-loot": {
              zombies:
                "设置僵尸是否可以捡起物品。如果设置为 false，那么僵尸捡起物品的概率取决于世界的难度",
              skeletons:
                "设置骷髅是否可以捡起物品。如果设置为 false，那么僵尸捡起物品的概率取决于世界的难度"
            },
            "spawn-limits": {
              monsters: "每个世界可以生成的怪物数量（如果为-1，则使用bukkit.yml中的设置，下同）",
              animals: "每个世界可以生成的动物数量",
              "water-animals": "每个世界可以生成的水生动物的数量",
              "water-ambient": "每个世界可以生成的water-ambient数量",
              ambient: "每个世界可以生成的ambient数量"
            },
            "entity-per-chunk-save-limit": {
              experience_orb: "限制每个区块保存/加载的 经验球 数量（-1则禁用此限制，下同）",
              snowball: "限制每个区块保存/加载的 雪球 数量",
              ender_pearl: "限制每个区块保存/加载的 末影珍珠 数量",
              fireball: "限制每个区块保存/加载的 火焰弹 数量",
              small_fireball: "限制每个区块保存/加载 烈焰人喷出来的火球 的数量",
              arrow: "限制每个区块保存/加载 箭 的数量"
            },
            "mob-effects": {
              "undead-immune-to-certain-effects": "",
              "spiders-immune-to-poison-effect": "",
              "immune-to-wither-effect": {
                wither: "",
                "wither-skeleton": ""
              }
            },
            "tick-rates": {
              sensor: {
                villager: {
                  secondarypoisensor:
                    "Sets the tick rate of the secondarypoisensor sensor of Villager entities",
                  validatenearbypoi: ""
                }
              }
            },
            "fishing-time-range": {
              MinimumTicks: "钓到一条鱼所需的最小 RNG Tick",
              MaximumTicks: "钓到一条鱼之前的最大 RNG Tick"
            },
            "despawn-ranges": {
              soft: "距离玩家的方块数，一旦超过，实体将随机清除",
              hard: "距离玩家的方块数，一旦超过，实体将被强制清除"
            },
            "frosted-ice": {
              enabled: "是否启用霜冰",
              delay: {
                min: "Minimum RNG value to apply frosted-ice effects at",
                max: "Maximum RNG value to apply frosted-ice effects at"
              }
            },
            "game-mechanics": {
              "disable-pillager-patrols": "禁用掠夺者巡逻和相关的AI",
              "disable-relative-projectile-velocity": "",
              "disable-unloaded-chunk-enderpearl-exploit": "防止末影珍珠在未加载的区块中存放投掷器",
              "disable-chest-cat-detection": "箱子上面有🐱时是否可以打开",
              "nerf-pigmen-from-nether-portals": "是否把通过下界传送门到主世界的猪人移除其AI",
              "disable-player-crits": "是否禁用玩家暴击",
              "shield-blocking-delay":
                "Instructs the server to ignore shooter velocity when calculating the velocity of a fired arrow",
              "disable-end-credits":
                "Instructs the server to never send the end game credits when leaving the end",
              "scan-for-legacy-ender-dragon": "服务器在加载旧世界时是否搜索末影龙",
              "disable-sprint-interruption-on-attack": "如果冲刺玩家受到攻击，是否会打断他们",
              "fix-curing-zombie-villager-discount-exploit":
                "修复通过感染和治愈僵尸村民来获得大量折扣的漏洞",
              "disable-mob-spawner-spawn-egg-transformation":
                "是否阻止玩家使用刷怪蛋改变刷怪笼的类型",
              "pillager-patrols": {
                "spawn-chance": "掠夺者巡逻队的生成几率",
                "spawn-delay": {
                  "per-player": "Makes spawn-delay per player",
                  ticks: "Delay in ticks between spawn chance"
                },
                start: {
                  "per-player": "Makes days per player",
                  day: "Days between raid spawns"
                }
              }
            },
            viewdistances: {
              "no-tick-view-distance": "Sets the no-tick view distance"
            },
            "anti-xray": {
              enabled: "是否启用反Xray",
              "engine-mode":
                "设置反Xray引擎模式。其中 1 是用石头替换隐藏方块，2 是用随机方块数据替换所有方块",
              "max-chunk-section-index": "",
              "update-radius":
                "Controls the distance in blocks from air or water that hidden-blocks are hidden by the anti-xray engine",
              "lava-obscures": "是否混淆接触岩浆的方块",
              "max-block-height":
                "设置反Xray尝试隐藏矿石的最大高度（只允许16的倍数，若输入其他值则向下舍入为16的倍数）",
              "use-permission": "是否允许有paper.antixray.bypass权限的玩家 绕过反Xray",
              "chunk-edge-mode": "",
              "replacement-blocks": "在引擎模式 2 中应该被隐藏方块替换的方块列表",
              "hidden-blocks": "在引擎模式 1 中要隐藏的方块列表"
            },
            "squid-spawn-height": {
              maximum: "鱿鱼生成的最大高度"
            },
            "generator-settings": {
              "flat-bedrock": "Instructs the server to generate bedrock as a single flat layer"
            },
            "max-growth-height": {
              cactus: "仙人掌自然生长的最大高度",
              reeds: "甘蔗自然生长的最大高度",
              bamboo: {
                max: "竹子自然生长的最大高度",
                min: "竹子自然生长的最小高度"
              }
            },
            lootables: {
              "auto-replenish":
                "Instructs the server to automatically replenish lootable containers",
              "restrict-player-reloot": "防止相同的玩家回来并一遍又一遍地重新掠夺相同的容器",
              "reset-seed-on-fill":
                "Resets the loot seed each time the lootable is refilled. Effectively randomizing the new loot items on each refill",
              "max-refills": "Sets the maximum number of times a lootable may be refilled",
              "refresh-min":
                "The minimum amount of time that must pass before a lootable will be eligible to be refilled",
              "refresh-max":
                "The maximum amount of time that can pass before a lootable is refilled"
            },
            hopper: {
              "cooldown-when-full":
                "设置服务器在漏斗已满时应用短暂的冷却时间，而不是不断尝试拉出新物品",
              "disable-move-event":
                "完全禁用漏斗的InventoryMoveItemEvent，显着提高漏斗性能。但会破坏保护插件和任何其他依赖于此事件的插件",
              "disable-move-event-quickshop-tips": ""
            },
            "alt-item-despawn-rate": {
              enabled: "物品是否具有不同的消失率",
              items: {
                COBBLESTONE: "（默认值）原石"
              }
            },
            "lightning-strike-distance-limit": {
              sound: "玩家听到闪电的距离",
              "impact-sound": "玩家听到闪电冲击的距离",
              flash: "玩家看到闪电在天空中的距离"
            },
            "wandering-trader": {
              "spawn-minute-length": "流浪商人刷新分钟的长度（以tick为单位）",
              "spawn-day-length": "流浪商人生成之间的时间间隔（以tick为单位）",
              "spawn-chance-failure-increment":
                "How much the spawn chance will be increased on every failed wandering trader spawn.",
              "spawn-chance-min": "生成流浪商人的最小机会",
              "spawn-chance-max": "生成流浪商人的最大机会"
            },
            "unsupported-settings": {
              "fix-invulnerable-end-crystal-exploit": "修复无敌的末影水晶漏洞利用（MC-108513）"
            }
          }
        }
      }
    };
  }
};
</script>
