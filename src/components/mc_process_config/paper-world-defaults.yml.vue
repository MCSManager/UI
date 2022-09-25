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
        "anticheat": {
          "anti-xray": {
            "enabled": "是否开启反矿透。（Anti-Xray）",
            "engine-mode": "设置 Anti-Xray 引擎模式。",
            "hidden-blocks": "",
            "lava-obscures": "是否混淆接触岩浆的方块。",
            "max-block-height": "设置 Anti-Xray 操作的最大高度。只接受 16 的整数倍。",
            "replacement-blocks": "",
            "update-radius": "当客户端与方块交互时，将发送包含真实方块数据的方块更新的半径。只可以设置 0、1和2。（0仅用于测试目的，不要在生产环境中使用）",
            "use-permission": "是否允许有 paper.antixray.bypass 权限的玩家绕过 Anti-Xray。",
          },
          "obfuscation": {
            "items": {
              "hide-durability": "是否将耐久度信息发送给其他玩家的客户端。",
              "hide-itemmeta": "否应将作弊客户端中的不必要的物品信息（例如附魔、潜影盒中的物品等）发送给其他玩家的客户端。",
            },
          },
        },
        "chunks": {
          "auto-save-interval": "以 Tick 为单位配置世界自动保存间隔。",
          "delay-chunk-unloads-by": "设置区块延迟卸载的时间。",
          "fixed-chunk-inhabited-time": "",
          "max-auto-save-chunks-per-tick": "自动保存系统将在每 Tick 中保存的最大区块数。",
          "prevent-moving-into-unloaded-chunks": "是否阻止玩家进入未加载的区块。",
        },
        "collisions": {
          "allow-player-cramming-damage": "",
          "allow-vehicle-collisions": "交通工具否能够碰撞。",
          "fix-climbing-bypassing-cramming-rule": "攀爬是否绕过实体填塞限制。",
          "max-entity-collisions": "设置服务器在达到此值后停止处理碰撞。",
          "only-players-collide": "是否仅当玩家是两个碰撞实体之一时才计算碰撞。",
        },
        "entities": {
          "armor-stands": {
            "do-collision-entity-lookups": "盔甲架实体是否进行实体碰撞检查。",
            "tick": "禁用以防止盔甲架 Ticking。（可以提高许多盔甲架的性能）",
          },
          "behavior": {
            "baby-zombie-movement-modifier": "修改小僵尸移动的速度，0.5 比基本速度快 50%，-0.4 慢 40%。",
            "disable-chest-cat-detection": "箱子上坐着一只猫时是否可以打开箱子。",
            "disable-creeper-lingering-effect": "是否禁用随机苦力怕，并留下一个挥之不去的区域效果云。",
            "disable-player-crits": "是否禁用暴击。",
            "door-breaking-difficulty": {
              "husk": "尸壳可以破门的难度。",
              "vindicator": "卫道士可以破门的难度。",
              "zombie": "僵尸可以破门的难度。",
              "zombie_villager": "僵尸村民可以破门的难度。",
              "zombified_piglin": "僵尸猪灵可以破门的难度。",
            },
            "ender-dragons-death-always-places-dragon-egg": "末影龙是否总是在死亡时掉落龙蛋。",
            "experience-merge-max-value": "设置服务器单个经验球最大值，防止它们全部合并为 1 个经验球。",
            "mobs-can-always-pick-up-loot": {
              "skeletons": "骷髅是否总是能够拾取战利品。（如果设置为 false，捡起物品的概率取决于世界的难度）",
              "zombies": "僵尸是否总是能够拾取战利品。（如果设置为 false，捡起物品的概率取决于世界的难度）",
            },
            "nerf-pigmen-from-nether-portals": "从通过下界传送门传送的猪灵身上移除 AI。",
            "parrots-are-unaffected-by-player-movement": "是否防止鹦鹉在玩家移动时从玩家的肩膀上掉下来。",
            "phantoms-do-not-spawn-on-creative-players": "是否在创造模式下禁止生成幻翼。",
            "phantoms-only-attack-insomniacs": "是否防止幻翼攻击已经睡觉的玩家。",
            "piglins-guard-chests": "猪灵在被激怒时是否应该保护箱子。",
            "pillager-patrols": {
              "disable": "是否禁用掠夺者巡逻和相关的 AI。",
              "spawn-chance": "修改掠夺者的生成几率",
              "spawn-delay": {
                "per-player": "",
                "ticks": "",
              },
              "start": {
                "day": "",
                "per-player": "",
              },
            },
            "should-remove-dragon": "如果没有传送门存在，是否移除末影龙。",
            "spawner-nerfed-mobs-should-jump": "",
            "zombie-villager-infection-chance": "设置村民转换为僵尸村民的变化几率。如果基于游戏难度变化就设置为 -1.0。（设置为 0.0 则始终让村民在被僵尸杀死时死亡，设置为 100.0 则始终将村民转化为僵尸村民）",
            "zombies-target-turtle-eggs": "设置僵尸和僵尸猪灵是否会自动寻找并破坏海龟蛋。",
          },
          "entities-target-with-follow-range": "设置服务器在定位实体时是否应使用跟踪范围。",
          "mob-effects": {
            "immune-to-wither-effect": {
              "wither": "",
              "wither-skeleton": "凋灵骷髅是否免疫凋零效果",
            },
            "spiders-immune-to-poison-effect": "蜘蛛是否免疫中毒效果",
            "undead-immune-to-certain-effects": "亡灵生物是否免疫再生和中毒效果",
          },
          "spawning": {
            "all-chunks-are-slime-chunks": "是否将所有区块设置为史莱姆区块，允许史莱姆在任何区块中生成。（这实际上可能会减少你遇到史莱姆的机会，因为它们现在有更大的潜在生成区域。）",
            "alt-item-despawn-rate": {
              "enabled": "设置物品是否具有不同的消失率。",
              "items": {
                "cobblestone": "圆石消失的概率。",
              },
            },
            "count-all-mobs-for-spawning": "是否将刷怪蛋生成的怪物和其他杂类生物计入全局生物限制。",
            "creative-arrow-despawn-rate": "玩家在创造模式下射出的箭消失的速率，以 Tick 为单位。",
            "despawn-ranges": {
              "ambient": {
                "hard": "",
                "soft": "",
              },
              "axolotls": {
                "hard": "美西螈距离玩家的方块数，超过这个距离将被强制消失",
                "soft": "美西螈距离玩家的方块数，超过这个距离将被随机消失",
              },
              "creature": {
                "hard": "动物距离玩家的方块数，超过这个距离将被强制消失",
                "soft": "动物距离玩家的方块数，超过这个距离将被随机消失",
              },
              "misc": {
                "hard": "杂物距离玩家的方块数，超过这个距离将被强制消失",
                "soft": "杂物距离玩家的方块数，超过这个距离将被随机消失",
              },
              "monster": {
                "hard": "怪物距离玩家的方块数，超过这个距离将被强制消失",
                "soft": "怪物距离玩家的方块数，超过这个距离将被随机消失",
              },
              "underground_water_creature": {
                "hard": "水下生物距离玩家的方块数，超过这个距离将被强制消失",
                "soft": "水下生物距离玩家的方块数，超过这个距离将被随机消失",
              },
              "water_ambient": {
                "hard": "",
                "soft": "",
              },
              "water_creature": {
                "hard": "水中动物距离玩家的方块数，超过这个距离将被强制消失",
                "soft": "水中动物距离玩家的方块数，超过这个距离将被随机消失",
              },
            },
            "disable-mob-spawner-spawn-egg-transformation": "是否阻止玩家用刷怪蛋改变刷怪笼的类型。",
            "duplicate-uuid": {
              "mode": "指定服务器用来解析具有重复 UUID 的实体的方法。（SAFE_REGEN：为实体重新生成一个 UUID，如果它们关闭，则将其删除。DELETE: 删除实体。SILENT: 什么都不做，不打印日志。WARN: 什么都不做，打印日志。）",
              "safe-regen-delete-range": "",
            },
            "filter-nbt-data-from-spawn-eggs-and-related": "是否从刷怪蛋、掉落的方块和其他在创造模式中经常被滥用的物品中删除某些 NBT 数据。",
            "iron-golems-can-spawn-in-air": "铁傀儡是否可以在空中生成。",
            "monster-spawn-max-light-level": "",
            "non-player-arrow-despawn-rate": "非玩家实体射出的箭头消失的速率（以 Tick 为单位）",
            "per-player-mob-spawns": "设置是按玩家还是整个服务器计算暴民限制（在 bukkit.yml 中）。启用此设置会产生大致相同数量的生物，但分布更均匀，可防止一个玩家使用整个生物上限并提供更像单人游戏的体验。",
            "scan-for-legacy-ender-dragon": "",
            "skeleton-horse-thunder-spawn-chance": "设置“骷髅陷阱”（4 个骷髅骑士）在雷暴中生成的几率。",
            "slime-spawn-height": {
              "slime-chunk": {
                "maximum": "设置史莱姆区块中自然生成史莱姆的最大 Y 位置。",
              },
              "surface-biome": {
                "maximum": "设置沼泽生物群系中自然生成史莱姆的最大 Y 位置。",
                "minimum": "设置沼泽生物群系中自然生成史莱姆的最小 Y 位置。",
              },
            },
            "spawn-limits": {},
            "wandering-trader": {
              "spawn-chance-failure-increment": "",
              "spawn-chance-max": "生成流浪商人的最大几率。",
              "spawn-chance-min": "生成流浪商人的最小几率。",
              "spawn-day-length": "生成流浪商人的时间间隔。",
              "spawn-minute-length": "",
            },
            "wateranimal-spawn-height": {
              "maximum": "水生动物产卵的最大高度。",
              "minimum": "水生动物产卵的最小高度。",
            }
          },
        },
        "environment": {
          "disable-explosion-knockback": "是否阻止因爆炸而被击退。",
          "disable-ice-and-snow": "是否禁用冰雪生成。",
          "disable-teleportation-suffocation-check": "是否禁用服务器在传送玩家之前执行的卡墙检查。",
          "disable-thunder": "是否禁用雷暴。",
          "frosted-ice": {
            "delay": {
              "max": "应用结霜冰效果的最大 RNG 值。",
              "min": "应用结霜冰效果的最小 RNG 值。",
            },
            "enabled": "是否启用结霜的冰块。",
          },
          "generate-flat-bedrock": "基岩是否生成为单层。（类似于超平坦）",
          "nether-ceiling-void-damage-height": "玩家在地狱受到虚空伤害的等级。",
          "optimize-explosions": "服务器是否在爆炸期间缓存实体查找，而不是在整个过程中重新计算。",
          "portal-create-radius": "服务器在生成新传送门时尝试创建传送门的最大半径。",
          "portal-search-radius": "服务器将用于查找现有下界传送门的最大半径。如果在该范围内找不到一个，将生成一个新的。",
          "portal-search-vanilla-dimension-scaling": "",
          "treasure-maps": {
            "enabled": "",
            "find-already-discovered": {
              "loot-tables": "",
              "villager-trade": "",
            }
          },
          "water-over-lava-flow-speed": "设置水流过岩浆时的速度。",
        },
        "feature-seeds": {
          "generate-random-seeds-for-all": "是否为尚未设置种子的所有可用功能启用随机种子自动填充。",
        },
        "fishing-time-range": {
          "maximum": "钓到一条鱼所需的最大 RNG Tick。",
          "minimum": "钓到一条鱼所需的最小 RNG Tick。",
        },
        "fixes": {
          "disable-unloaded-chunk-enderpearl-exploit": "",
          "falling-block-height-nerf": "方块从高空掉落超过多少个方块时会被服务器移除。（<1则禁用此功能）",
          "fix-curing-zombie-villager-discount-exploit": "是否修复通过感染和治愈僵尸村民来获得大量折扣的漏洞。",
          "fix-items-merging-through-walls": "是否防止物品通过墙壁合并。",
          "prevent-tnt-from-moving-in-water": "是否阻止已启动的 TNT 实体在流动的水中移动。",
          "split-overstacked-loot": "",
          "tnt-entity-height-nerf": "",
        },
        "hopper": {
          "cooldown-when-full": "在漏斗装满时是否有短暂的冷却时间，而不是不断尝试吸新物品。",
          "disable-move-event": "",
          "ignore-occluding-blocks": "漏斗是否会忽略遮挡方块内的容器，例如沙子内的漏斗矿车。启用此功能将提高漏斗检查流入物品位置的性能。",
        },
        "lootables": {
          "auto-replenish": "",
          "max-refills": "",
          "refresh-max": "",
          "refresh-min": "",
          "reset-seed-on-fill": "",
          "restrict-player-reloot": "",
        },
        "maps": {
          "item-frame-cursor-limit": "每个地图允许的光标（标记）数量。",
          "item-frame-cursor-update-interval": "更新物品展示框中地图上的光标的时间间隔。（将此设置为小于 1 的数字将完全禁用更新）",
        },
        "max-growth-height": {
          "bamboo": {
            "max": "竹子自然会长到的最大高度。",
            "min": "竹子自然会长到的最低高度。",
          },
          "cactus": "仙人掌块的自然生长最大高度。",
          "reeds": "甘蔗自然生长的最大高度。",
        },
        "misc": {
          "disable-end-credits": "是否在离开游戏结束时永远不要发送游戏结束点数。",
          "disable-relative-projectile-velocity": "是否在计算射箭速度时忽略射手速度。",
          "disable-sprint-interruption-on-attack": "玩家冲刺时受到攻击是否会被打断。",
          "light-queue-size": "设置每个世界的主线程的光照更新队列有多大。",
          "max-leash-distance": "配置拴绳的最大距离。",
          "redstone-implementation": "指定服务器使用的红石实现。替代实现可以通过优化功率计算和减少发出的方块和形状更新的数量来大大减少红石粉造成的延迟。可以使用以下实现：VANILLA(原版)、EIGENCRAFT、ALTERNATE-CURRENT",
          "shield-blocking-delay": "玩家激活他们的盾牌和它实际阻挡伤害之间的 Tick。",
          "show-sign-click-command-failure-msgs-to-player": "通过单击告示牌执行的命令是否应向玩家显示执行失败的消息。",
          "update-pathfinding-on-block-update": "控制在世界中更新一个方块时是否更新怪物的寻路AI。禁用此选项可以显着提高服务器性能，而对游戏机制几乎没有明显影响。当加载了很多实体并且你有自动农场或红石时钟时，建议开启此选项。",
        },
        "scoreboards": {
          "allow-non-player-entities-on-scoreboards": "在计算碰撞时是否将非玩家实体视为从未出现在记分板上。",
          "use-vanilla-world-scoreboard-name-coloring": "是否使用原版计分板为玩家昵称着色。",
        },
        "spawn": {
          "allow-using-signs-inside-spawn-protection": "是否允许玩家在重生点保护区内使用告示牌。",
          "keep-spawn-loaded": "是否保持重生点保护区为常加载区块。",
          "keep-spawn-loaded-range": "重生点保护区常加载区块范围。",
        },
        "tick-rates": {
          "behavior": {
            "villager": {
              "validatenearbypoi": ""
            }
          },
          "container-update": "服务器更新容器和库存的速率（以 Tick 为单位）",
          "grass-spread": "设置服务器散播草的延迟。（以 Tick 为单位）",
          "mob-spawner": "刷怪笼应该多久计算一次可用的生成区域并在世界中生成新实体。（-1 值将禁用所有刷怪笼）",
          "sensor": {
            "villager": {
              "secondarypoisensor": ""
            },
          },
        },
        "unsupported-settings": {
          "fix-invulnerable-end-crystal-exploit": "如果设置为 false，将允许创建无敌的末影水晶。",
        }
      }
    };
  }
};
</script>
