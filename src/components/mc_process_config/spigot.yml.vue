<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
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
        <div class="sub-title" v-iszh>
          <div class="sub-title">关于配置兼容与翻译</div>
          <div class="sub-title-info">
            此界面由开源社区开发者开发与翻译，若翻译发现错误可前往开源社区进行反馈。Spigot
            服务端每个版本几乎都有修改过配置文件，导致适配难度极大，此文件部分配置可能不会如期显示翻译，但是依然可以工作。
          </div>
        </div>
        <div class="sub-title">
          <div class="sub-title">{{this.$t("processConfig.introduction.common.aboutConfig")}}</div>
          <div class="sub-title-info">
            {{this.$t("processConfig.introduction.spigotYml.infoLong")}}
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
        "config-version": this.$t("processConfig.spigotYml.configVersion"),
        "settings": {
          "debug": this.$t("processConfig.spigotYml.settings.debug"),
          "save-user-cache-on-stop-only": this.$t("processConfig.spigotYml.settings.saveUserCacheOnStopOnly"),
          "moved-wrongly-threshold": this.$t("processConfig.spigotYml.settings.movedWronglyThreshold"),
          "moved-too-quickly-multiplier": this.$t("processConfig.spigotYml.settings.movedTooQuicklyMultiplier"),
          "log-villager-deaths": this.$t("processConfig.spigotYml.settings.logVillagerDeaths"),
          "timeout-time": this.$t("processConfig.spigotYml.settings.timeoutTime"),
          "restart-on-crash": this.$t("processConfig.spigotYml.settings.restartOnCrash"),
          "restart-script": this.$t("processConfig.spigotYml.settings.restartScript"),
          "sample-count": this.$t("processConfig.spigotYml.settings.sampleCount"),
          "user-cache-size": this.$t("processConfig.spigotYml.settings.userCacheSize"),
          "netty-threads": this.$t("processConfig.spigotYml.settings.nettyThreads"),
          "player-shuffle": this.$t("processConfig.spigotYml.settings.playerShuffle"),
          "bungeecord": this.$t("processConfig.spigotYml.settings.bungeecord"),
          "attribute": {
            "maxHealth": {
              "max": this.$t("processConfig.spigotYml.settings.attribute.maxHealth.max"),
              "min": this.$t("processConfig.spigotYml.settings.attribute.maxHealth.min")
            },
            "movementSpeed": {
              "max": this.$t("processConfig.spigotYml.settings.attribute.movementSpeed.max"),
              "min": this.$t("processConfig.spigotYml.settings.attribute.movementSpeed.min")
            },
            "attackDamage": {
              "max": this.$t("processConfig.spigotYml.settings.attribute.attackDamage.max"),
              "min": this.$t("processConfig.spigotYml.settings.attribute.attackDamage.min")
            }
          }
        },
        "stats": {
          "disable-saving": this.$t("processConfig.spigotYml.stats.disableSaving"),
          "forced-stats": this.$t("processConfig.spigotYml.stats.forcedStats")
        },
        "players": {
          "disable-saving": this.$t("processConfig.spigotYml.players.disableSaving")
        },
        "messages": {
          "whitelist": this.$t("processConfig.spigotYml.messages.whitelist"),
          "unknown-command": this.$t("processConfig.spigotYml.messages.unknownCommand"),
          "server-full": this.$t("processConfig.spigotYml.messages.serverFull"),
          "outdated-client": this.$t("processConfig.spigotYml.messages.outdatedClient"),
          "outdated-server": this.$t("processConfig.spigotYml.messages.outdatedServer"),
          "restart": this.$t("processConfig.spigotYml.messages.restart")
        },
        "commands": {
          "silent-commandblock-console": this.$t("processConfig.spigotYml.commands.silentCommandblockConsole"),
          "log": this.$t("processConfig.spigotYml.commands.log"),
          "tab-complete": this.$t("processConfig.spigotYml.commands.tabComplete"),
          "send-namespaced": this.$t("processConfig.spigotYml.commands.sendNamespaced"),
          "replace-commands": this.$t("processConfig.spigotYml.commands.replaceCommands"),
          "spam-exclusions": this.$t("processConfig.spigotYml.commands.spamExclusions")
        },
        "world-settings": {
          "default": {
            "random-light-updates": this.$t("processConfig.spigotYml.worldSettings.default.randomLightUpdates"),
            "save-structure-info": this.$t("processConfig.spigotYml.worldSettings.default.saveStructureInfo"),
            "seed-feature": this.$t("processConfig.spigotYml.worldSettings.default.seedFeature"),
            "verbose": this.$t("processConfig.spigotYml.worldSettings.default.verbose"),
            "item-despawn-rate": this.$t("processConfig.spigotYml.worldSettings.default.itemDespawnRate"),
            "enable-zombie-pigmen-portal-spawns": this.$t("processConfig.spigotYml.worldSettings.default.enableZombiePigmenPortalSpawns"),
            "view-distance": this.$t("processConfig.spigotYml.worldSettings.default.viewDistance"),
            "hanging-tick-frequency": this.$t("processConfig.spigotYml.worldSettings.default.hangingTickFrequency"),
            "mob-spawn-range": this.$t("processConfig.spigotYml.worldSettings.default.mobSpawnRange"),
            "hopper-amount": this.$t("processConfig.spigotYml.worldSettings.default.hopperAmount"),
            "max-tnt-per-tick": this.$t("processConfig.spigotYml.worldSettings.default.maxTntPerTick"),
            "wither-spawn-sound-radius": this.$t("processConfig.spigotYml.worldSettings.default.witherSpawnSoundRadius"),
            "arrow-despawn-rate": this.$t("processConfig.spigotYml.worldSettings.default.arrowDespawnRate"),
            "trident-despawn-rate": this.$t("processConfig.spigotYml.worldSettings.default.tridentDespawnRate"),
            "seed-village": this.$t("processConfig.spigotYml.worldSettings.default.seedVillage"),
            "seed-desert": this.$t("processConfig.spigotYml.worldSettings.default.seedDesert"),
            "seed-igloo": this.$t("processConfig.spigotYml.worldSettings.default.seedIgloo"),
            "seed-jungle": this.$t("processConfig.spigotYml.worldSettings.default.seedJungle"),
            "seed-swamp": this.$t("processConfig.spigotYml.worldSettings.default.seedSwamp"),
            "seed-monument": this.$t("processConfig.spigotYml.worldSettings.default.seedMonument"),
            "seed-shipwreck": this.$t("processConfig.spigotYml.worldSettings.default.seedShipwreck"),
            "seed-ocean": this.$t("processConfig.spigotYml.worldSettings.default.seedOcean"),
            "seed-outpost": this.$t("processConfig.spigotYml.worldSettings.default.seedOutpost"),
            "seed-endcity": this.$t("processConfig.spigotYml.worldSettings.default.seedEndcity"),
            "seed-slime": this.$t("processConfig.spigotYml.worldSettings.default.seedSlime"),
            "seed-bastion": this.$t("processConfig.spigotYml.worldSettings.default.seedBastion"),
            "seed-fortress": this.$t("processConfig.spigotYml.worldSettings.default.seedFortress"),
            "seed-mansion": this.$t("processConfig.spigotYml.worldSettings.default.seedMansion"),
            "seed-fossil": this.$t("processConfig.spigotYml.worldSettings.default.seedFossil"),
            "seed-portal": this.$t("processConfig.spigotYml.worldSettings.default.seedPortal"),
            "nerf-spawner-mobs": this.$t("processConfig.spigotYml.worldSettings.default.nerfSpawnerMobs"),
            "dragon-death-sound-radius": this.$t("processConfig.spigotYml.worldSettings.default.dragonDeathSoundRadius"),
            "zombie-aggressive-towards-villager": this.$t("processConfig.spigotYml.worldSettings.default.zombieAggressiveTowardsVillager"),
            "end-portal-sound-radius": this.$t("processConfig.spigotYml.worldSettings.default.endPortalSoundRadius"),
            "entity-tracking-range": {
              "players": this.$t("processConfig.spigotYml.worldSettings.default.entityTrackingRange.players"),
              "animals": this.$t("processConfig.spigotYml.worldSettings.default.entityTrackingRange.animals"),
              "monsters": this.$t("processConfig.spigotYml.worldSettings.default.entityTrackingRange.monsters"),
              "misc": this.$t("processConfig.spigotYml.worldSettings.default.entityTrackingRange.misc"),
              "other": this.$t("processConfig.spigotYml.worldSettings.default.entityTrackingRange.other")
            },
            "merge-radius": {
              "item": this.$t("processConfig.spigotYml.worldSettings.default.mergeRadius.item"),
              "exp": this.$t("processConfig.spigotYml.worldSettings.default.mergeRadius.exp")
            },
            "ticks-per": {
              "hopper-transfer": this.$t("processConfig.spigotYml.worldSettings.default.ticksPer.hopperTransfer"),
              "hopper-check": this.$t("processConfig.spigotYml.worldSettings.default.ticksPer.hopperCheck")
            },
            "growth": {
              "cactus-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.cactusModifier"),
              "cane-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.caneModifier"),
              "melon-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.melonModifier"),
              "mushroom-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.mushroomModifier"),
              "pumpkin-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.pumpkinModifier"),
              "sapling-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.saplingModifier"),
              "beetroot-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.beetrootModifier"),
              "carrot-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.carrotModifier"),
              "potato-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.potatoModifier"),
              "wheat-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.wheatModifier"),
              "netherwart-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.netherwartModifier"),
              "vine-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.vineModifier"),
              "cocoa-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.cocoaModifier"),
              "bamboo-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.bambooModifier"),
              "sweetberry-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.sweetberryModifier"),
              "kelp-modifier": this.$t("processConfig.spigotYml.worldSettings.default.growth.kelpModifier")
            },
            "hunger": {
              "jump-walk-exhaustion": this.$t("processConfig.spigotYml.worldSettings.default.hunger.jumpWalkExhaustion"),
              "jump-sprint-exhaustion": this.$t("processConfig.spigotYml.worldSettings.default.hunger.jumpSprintExhaustion"),
              "combat-exhaustion": this.$t("processConfig.spigotYml.worldSettings.default.hunger.combatExhaustion"),
              "regen-exhaustion": this.$t("processConfig.spigotYml.worldSettings.default.hunger.regenExhaustion"),
              "swim-multiplier": this.$t("processConfig.spigotYml.worldSettings.default.hunger.swimMultiplier"),
              "sprint-multiplier": this.$t("processConfig.spigotYml.worldSettings.default.hunger.sprintMultiplier"),
              "other-multiplier": this.$t("processConfig.spigotYml.worldSettings.default.hunger.otherMultiplier")
            },
            "entity-activation-range": {
              "animals": this.$t("processConfig.spigotYml.worldSettings.default.entityActivationRange.animals"),
              "monsters": this.$t("processConfig.spigotYml.worldSettings.default.entityActivationRange.monsters"),
              "raiders": this.$t("processConfig.spigotYml.worldSettings.default.entityActivationRange.raiders"),
              "misc": this.$t("processConfig.spigotYml.worldSettings.default.entityActivationRange.misc"),
              "tick-inactive-villagers": this.$t("processConfig.spigotYml.worldSettings.default.entityActivationRange.tickInactiveVillagers")
            },
            "squid-spawn-range": {
              "min": this.$t("processConfig.spigotYml.worldSettings.default.squidSpawnRange.min")
            },
            "max-tick-time": {
              "tile": this.$t("processConfig.spigotYml.worldSettings.default.maxTickTime.tile"),
              "entity": this.$t("processConfig.spigotYml.worldSettings.default.maxTickTime.entity")
            }
          }
        }
      }
    };
  }
};
</script>
