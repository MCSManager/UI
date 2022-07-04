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
    <!-- {{config}} -->
    <!-- 硬编码指定配置 HTML 模板 -->
    <!-- <LineOption>
      <template #title>config-version</template>
      <template #info>配置文件版本号，一般情况无需修改</template>
      <template #optionInput>
        <el-input v-model="modelValue['config-version']" size="small"></el-input>
      </template>
    </LineOption> -->

    <!-- 当前文件的说明，请根据需要自定义修改文字，勿修改排版 -->
    <LineOption :custom="true">
      <template #default>
        <div class="sub-title">
          <div class="sub-title">关于配置兼容与翻译</div>
          <div class="sub-title-info">
            此界面由开源社区开发者开发与翻译，若翻译发现错误可前往开源社区进行反馈。Spigot
            服务端每个版本几乎都有修改过配置文件，导致适配难度极大，此文件部分配置可能不会如期显示翻译，但是依然可以工作。
          </div>
        </div>
        <div class="sub-title">
          <div class="sub-title">关于配置文件</div>
          <div class="sub-title-info">
            此文件为 Spigot
            服务端专用的配置文件，可以进一步的设置服务端的一些高级参数，比如实体 AI 范围，玩家限制，视距限制和区块限制等
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
        "config-version": "配置版本号，一般情况无需修改",
        settings: {
          debug: "调试模式",
          "save-user-cache-on-stop-only": "是否只要停止时才准缓存用户数据",
          "moved-wrongly-threshold": "控制“错误移动”检查的阈值",
          "moved-too-quickly-multiplier": "判断移动速度太快的倍数阈值",
          "log-villager-deaths": "是否记载村民死亡",
          "timeout-time": "连接超时时间",
          "restart-on-crash": "崩溃时是否自动重启",
          "restart-script": "重启时执行的脚本名（如 ./start.sh）",
          "sample-count":
            "控制将鼠标悬停在客户端服务器列表中的玩家计数上时显示的(随机选择的)样本玩家数量。",
          "user-cache-size": "用户缓存大小",
          "netty-threads": "Netty 通信线程数",
          "player-shuffle":
            "每隔多少 ticks（20ticks/1s）刷新玩家在数据遍历中的顺序，可以有效调整玩家在内存中顺序，在 PvP 服务器上有些帮助，低于100会导致性能问题",
          bungeecord: "是否开启集群模式（还需要更多辅助软件与配置结合使用）",
          attribute: {
            maxHealth: {
              max: "服务器最大的生命值上限",
              min: "服务器最小的生命值上限"
            },
            movementSpeed: {
              max: "服务器最大的速度上限",
              min: "服务器最小的生命值上限"
            },
            attackDamage: {
              max: "服务器最大的伤害上限",
              min: "服务器最小的生命值上限"
            }
          }
        },
        stats: {
          "disable-saving": "如果启用，则服务器将不保存玩家统计数据或成就",
          "forced-stats": "无法修改，暂不支持"
        },
        players: {
          "disable-saving": ""
        },
        messages: {
          whitelist: "当玩家被白名单阻止时显示的文本内容",
          "unknown-command": "当玩家执行未知命令时所提示的文本内容",
          "server-full": "当服务器满人时的提示文本",
          "outdated-client": "当客户端版本过低时，提示的文本内容，其中 {0} 为服务器版本变量",
          "outdated-server": "当服务器版本过低时，提示的文本内容，其中 {0} 为客户端版本变量",
          restart: "当服务器重启时玩家进入服务器的文本提示"
        },
        commands: {
          "silent-commandblock-console": "屏蔽命令方块的控制台输出",
          log: "是否开启日志输出",
          "tab-complete":
            "控制是否允许玩家按下 TAB 键来自动完成命令。-1 为关闭，0 为立即，1 为第一个字母，以此类推",
          "send-namespaced": "是否发送命令命令空间",
          "replace-commands":
            "禁用 Bukkit 对所列命令的实现，并启用它们的原始行为，支持多项且使用英文逗号分隔",
          "spam-exclusions": "垃圾排除,支持多项且使用英文逗号分隔"
        },
        "world-settings": {
          default: {
            verbose:
              "是否在服务器启动时在控制台/日志中显示每个世界的详细报告和配置。可以全局禁用/启用，也可以按世界禁用/启用",
            "item-despawn-rate": "控制在地面上的项目实体删除之前所需的 Tick(s)（20 Ticks = 1s）",
            "enable-zombie-pigmen-portal-spawns": "是否启用僵尸猪人入口生成",
            "view-distance":
              "控制所有玩家最远视距，最低为 1，最高为 15，调整到 8 左右可以显著提升服务器性能",
            "hanging-tick-frequency": "每 Tick 的更新频率",
            "mob-spawn-range": "怪物生成范围",
            "hopper-amount":
              "控制漏斗在漏斗 Tick 周期中接收/发出的最大物品数量。最好与每个漏斗转移和检查的更高 Tick 结合使用以将动作合二为一",
            "max-tnt-per-tick": "每 Tick 刷新时最大更新的 TNT 数量",
            "wither-spawn-sound-radius": "生成凋灵的声音范围",
            "arrow-despawn-rate": "箭消失距离",
            "trident-despawn-rate": "三叉戟消失距离",
            "seed-village": "生成村庄的种子码",
            "seed-desert": "生成沙漠的种子码",
            "seed-igloo": "生成小屋的种子码",
            "seed-jungle": "生成丛林的种子码",
            "seed-swamp": "生成沼泽的种子码",
            "seed-monument": "生成遗迹的种子码",
            "seed-shipwreck": "生成船骸的种子码",
            "seed-ocean": "生成海洋的种子码",
            "seed-outpost": "生成守护者前哨的种子码",
            "seed-endcity": "生成末地城的种子码",
            "seed-slime": "生成黏液区块的种子码",
            "seed-bastion": "生成造箭台的种子码",
            "seed-fortress": "生成要塞的种子码",
            "seed-mansion": "生成宅邸的种子码",
            "seed-fossil": "生成化石的种子码",
            "seed-portal": "生成传送门的种子码",
            "nerf-spawner-mobs": "启用后，由怪物生成的新怪物将不会有任何 AI",
            "dragon-death-sound-radius": "末地龙死亡声音范围",
            "zombie-aggressive-towards-villager": "是否准许生成僵尸村民",
            "end-portal-sound-radius": "下界传送门声音范围",
            "entity-tracking-range": {
              players: "实体AI追踪玩家的最大范围，调小此值可轻微节约服务器计算资源",
              animals: "实体AI追踪动物的最大范围，调小此值可轻微节约服务器计算资源",
              monsters: "实体AI追踪怪物的最大范围，调小此值可轻微节约服务器计算资源",
              misc: "实体AI追踪物品的最大范围，调小此值可轻微节约服务器计算资源",
              other: "实体AI追踪其他的最大范围，调小此值可轻微节约服务器计算资源"
            },
            "merge-radius": {
              item: "物品距离多少时会互相合并吸引",
              exp: "经验球距离多少时会互相合并吸引"
            },
            "ticks-per": {
              "hopper-transfer":
                "漏斗推/拉/接收物品与漏斗推/拉更多物品之间的时间，在服务器每个 Tick 中更新 8 个行为",
              "hopper-check":
                '自上次尝试后，漏斗尝试推/拉物品。例如，值8表示空料斗每隔 8 个刻度查找上方的物料实体、上方的库存等。值 0 或 1 反映原版行为。当 HOPPER-ALT-TICKING 设置为"是"时，此选项被禁用'
            },
            growth: {
              "cactus-modifier": "仙人掌生长速度",
              "cane-modifier": "甘蔗速度",
              "melon-modifier": "西瓜速度",
              "mushroom-modifier": "蘑菇速度",
              "pumpkin-modifier": "南瓜速度",
              "sapling-modifier": "树苗生长速度",
              "beetroot-modifier": "甜菜根生长速度",
              "carrot-modifier": "胡萝卜生长速度",
              "potato-modifier": "马铃薯生长速度",
              "wheat-modifier": "小麦生长速度",
              "netherwart-modifier": "地狱疣生长速度",
              "vine-modifier": "藤曼生长速度",
              "cocoa-modifier": "可可豆生长速度",
              "bamboo-modifier": "柱子生长速度",
              "sweetberry-modifier": "甜莓生长速度",
              "kelp-modifier": "海藻生长速度"
            },
            hunger: {
              "jump-walk-exhaustion": "跳跃跑步动作时消耗的饥饿度",
              "jump-sprint-exhaustion": "跳跃冲刺动作时消耗的饥饿度",
              "combat-exhaustion": "战斗时消耗的饥饿度",
              "regen-exhaustion": "回复时消耗的饥饿度",
              "swim-multiplier": "游泳时消耗的饥饿度倍率",
              "sprint-multiplier": "仅冲刺时消耗的饥饿度倍率",
              "other-multiplier": "其他动作消耗的饥饿度倍率"
            },
            "entity-activation-range": {
              animals: "动物最大激活范围",
              monsters: "怪物最大激活范围",
              raiders: "突袭最大激活范围",
              misc: "物品最大激活范围",
              "tick-inactive-villagers": "是否更新不活跃的村民"
            },
            "squid-spawn-range": {
              min: "鱿鱼最小生成范围"
            },
            "max-tick-time": {
              tile: "分配给 Tile 的最大 Tick 时间",
              entity: "分配给实体的最大 Tick 时间"
            }
          }
        }
      }
    };
  }
};
</script>
