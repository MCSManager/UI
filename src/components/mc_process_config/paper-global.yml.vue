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
        "_version": this.$t("processConfig.paperGlobalYml.Version"),
        "async-chunks": {
          "threads": this.$t("processConfig.paperGlobalYml.asyncChunks.threads")
        },
        "chunk-loading": {
          "autoconfig-send-distance": this.$t("processConfig.paperGlobalYml.chunkLoading.autoconfigSendDistance"),
          "enable-frustum-priority": this.$t("processConfig.paperGlobalYml.chunkLoading.enableFrustumPriority"),
          "global-max-chunk-load-rate": this.$t("processConfig.paperGlobalYml.chunkLoading.globalMaxChunkLoadRate"),
          "global-max-chunk-send-rate": this.$t("processConfig.paperGlobalYml.chunkLoading.globalMaxChunkSendRate"),
          "global-max-concurrent-loads": this.$t("processConfig.paperGlobalYml.chunkLoading.globalMaxConcurrentLoads"),
          "max-concurrent-sends": this.$t("processConfig.paperGlobalYml.chunkLoading.maxConcurrentSends"),
          "min-load-radius": this.$t("processConfig.paperGlobalYml.chunkLoading.minLoadRadius"),
          "player-max-chunk-load-rate": this.$t("processConfig.paperGlobalYml.chunkLoading.playerMaxChunkLoadRate"),
          "player-max-concurrent-loads": this.$t("processConfig.paperGlobalYml.chunkLoading.playerMaxConcurrentLoads"),
          "target-player-chunk-send-rate": this.$t("processConfig.paperGlobalYml.chunkLoading.targetPlayerChunkSendRate")
        },
        "collisions": {
          "enable-player-collisions": this.$t("processConfig.paperGlobalYml.collisions.enablePlayerCollisions"),
          "send-full-pos-for-hard-colliding-entities": this.$t("processConfig.paperGlobalYml.collisions.sendFullPosForHardCollidingEntities")
        },
        "commands": {
          "fix-target-selector-tag-completion": this.$t("processConfig.paperGlobalYml.commands.fixTargetSelectorTagCompletion"),
          "suggest-player-names-when-null-tab-completions": this.$t("processConfig.paperGlobalYml.commands.suggestPlayerNamesWhenNullTabCompletions"),
          "time-command-affects-all-worlds": this.$t("processConfig.paperGlobalYml.commands.timeCommandAffectsAllWorlds")
        },
        "console": {
          "enable-brigadier-completions": this.$t("processConfig.paperGlobalYml.console.enableBrigadierCompletions"),
          "enable-brigadier-highlighting": this.$t("processConfig.paperGlobalYml.console.enableBrigadierHighlighting"),
          "has-all-permissions": this.$t("processConfig.paperGlobalYml.console.hasAllPermissions")
        },
        "item-validation": {
          "book": {
            "author": this.$t("processConfig.paperGlobalYml.itemValidation.book.author"),
            "page": this.$t("processConfig.paperGlobalYml.itemValidation.book.page"),
            "title": this.$t("processConfig.paperGlobalYml.itemValidation.book.title")
          },
          "book-size": {
            "page-max": this.$t("processConfig.paperGlobalYml.itemValidation.bookSize.pageMax"),
            "total-multiplier": this.$t("processConfig.paperGlobalYml.itemValidation.bookSize.totalMultiplier")
          },
          "display-name": this.$t("processConfig.paperGlobalYml.itemValidation.displayName"),
          "lore-line": this.$t("processConfig.paperGlobalYml.itemValidation.loreLine"),
          "resolve-selectors-in-books": this.$t("processConfig.paperGlobalYml.itemValidation.resolveSelectorsInBooks")
        },
        "logging": {
          "deobfuscate-stacktraces": this.$t("processConfig.paperGlobalYml.logging.deobfuscateStacktraces"),
          "log-player-ip-addresses": this.$t("processConfig.paperGlobalYml.logging.logPlayerIpAddresses"),
          "use-rgb-for-named-text-colors": this.$t("processConfig.paperGlobalYml.logging.useRgbForNamedTextColors")
        },
        "messages": {
          "kick": {
            "authentication-servers-down": this.$t("processConfig.paperGlobalYml.messages.kick.authenticationServersDown"),
            "connection-throttle": this.$t("processConfig.paperGlobalYml.messages.kick.connectionThrottle"),
            "flying-player": this.$t("processConfig.paperGlobalYml.messages.kick.flyingPlayer"),
            "flying-vehicle": this.$t("processConfig.paperGlobalYml.messages.kick.flyingVehicle")
          },
          "no-permission": this.$t("processConfig.paperGlobalYml.messages.noPermission"),
          "use-display-name-in-quit-message": this.$t("processConfig.paperGlobalYml.messages.useDisplayNameInQuitMessage")
        },
        "misc": {
          "chat-threads": {
            "chat-executor-core-size": this.$t("processConfig.paperGlobalYml.misc.chatThreads.chatExecutorCoreSize"),
            "chat-executor-max-size": this.$t("processConfig.paperGlobalYml.misc.chatThreads.chatExecutorMaxSize")
          },
          "fix-entity-position-desync": this.$t("processConfig.paperGlobalYml.misc.fixEntityPositionDesync"),
          "lag-compensate-block-breaking": this.$t("processConfig.paperGlobalYml.misc.lagCompensateBlockBreaking"),
          "load-permissions-yml-before-plugins": this.$t("processConfig.paperGlobalYml.misc.loadPermissionsYmlBeforePlugins"),
          "max-joins-per-tick": this.$t("processConfig.paperGlobalYml.misc.maxJoinsPerTick"),
          "region-file-cache-size": this.$t("processConfig.paperGlobalYml.misc.regionFileCacheSize"),
          "strict-advancement-dimension-check": this.$t("processConfig.paperGlobalYml.misc.strictAdvancementDimensionCheck"),
          "use-alternative-luck-formula": this.$t("processConfig.paperGlobalYml.misc.useAlternativeLuckFormula"),
          "use-dimension-type-for-custom-spawners": this.$t("processConfig.paperGlobalYml.misc.useDimensionTypeForCustomSpawners")
        },
        "packet-limiter": {
          "all-packets": {
            "action": this.$t("processConfig.paperGlobalYml.packetLimiter.allPackets.action"),
            "interval": this.$t("processConfig.paperGlobalYml.packetLimiter.allPackets.interval"),
            "max-packet-rate": this.$t("processConfig.paperGlobalYml.packetLimiter.allPackets.maxPacketRate")
          },
          "kick-message": this.$t("processConfig.paperGlobalYml.packetLimiter.kickMessage"),
          "overrides": {
            "ServerboundPlaceRecipePacket": {
              "action": this.$t("processConfig.paperGlobalYml.packetLimiter.overrides.ServerboundPlaceRecipePacket.action"),
              "interval": this.$t("processConfig.paperGlobalYml.packetLimiter.overrides.ServerboundPlaceRecipePacket.interval"),
              "max-packet-rate": this.$t("processConfig.paperGlobalYml.packetLimiter.overrides.ServerboundPlaceRecipePacket.maxPacketRate")
            }
          }
        },
        "player-auto-save": {
          "max-per-tick": this.$t("processConfig.paperGlobalYml.playerAutoSave.maxPerTick"),
          "rate": this.$t("processConfig.paperGlobalYml.playerAutoSave.rate")
        },
        "proxies": {
          "bungee-cord": {
            "online-mode": this.$t("processConfig.paperGlobalYml.proxies.bungeeCord.onlineMode")
          },
          "proxy-protocol": this.$t("processConfig.paperGlobalYml.proxies.proxyProtocol"),
          "velocity": {
            "enabled": this.$t("processConfig.paperGlobalYml.proxies.velocity.enabled"),
            "online-mode": this.$t("processConfig.paperGlobalYml.proxies.velocity.onlineMode"),
            "secret": this.$t("processConfig.paperGlobalYml.proxies.velocity.secret")
          }
        },
        "scoreboards": {
          "save-empty-scoreboard-teams": this.$t("processConfig.paperGlobalYml.scoreboards.saveEmptyScoreboardTeams"),
          "track-plugin-scoreboards": this.$t("processConfig.paperGlobalYml.scoreboards.trackPluginScoreboards")
        },
        "spam-limiter": {
          "incoming-packet-threshold": this.$t("processConfig.paperGlobalYml.spamLimiter.incomingPacketThreshold"),
          "recipe-spam-increment": this.$t("processConfig.paperGlobalYml.spamLimiter.recipeSpamIncrement"),
          "recipe-spam-limit": this.$t("processConfig.paperGlobalYml.spamLimiter.recipeSpamLimit"),
          "tab-spam-increment": this.$t("processConfig.paperGlobalYml.spamLimiter.tabSpamIncrement"),
          "tab-spam-limit": this.$t("processConfig.paperGlobalYml.spamLimiter.tabSpamLimit")
        },
        "timings": {
          "enabled": this.$t("processConfig.paperGlobalYml.timings.enabled"),
          "hidden-config-entries": this.$t("processConfig.paperGlobalYml.timings.hiddenConfigEntries"),
          "history-interval": this.$t("processConfig.paperGlobalYml.timings.historyInterval"),
          "history-length": this.$t("processConfig.paperGlobalYml.timings.historyLength"),
          "server-name": this.$t("processConfig.paperGlobalYml.timings.serverName"),
          "server-name-privacy": this.$t("processConfig.paperGlobalYml.timings.serverNamePrivacy"),
          "url": this.$t("processConfig.paperGlobalYml.timings.url"),
          "verbose": this.$t("processConfig.paperGlobalYml.timings.verbose")
        },
        "unsupported-settings": {
          "allow-headless-pistons": this.$t("processConfig.paperGlobalYml.unsupportedSettings.allowHeadlessPistons"),
          "allow-permanent-block-break-exploits": this.$t("processConfig.paperGlobalYml.unsupportedSettings.allowPermanentBlockBreakExploits"),
          "allow-piston-duplication": this.$t("processConfig.paperGlobalYml.unsupportedSettings.allowPistonDuplication"),
          "perform-username-validation": this.$t("processConfig.paperGlobalYml.unsupportedSettings.performUsernameValidation")
        },
        "watchdog": {
          "early-warning-delay": this.$t("processConfig.paperGlobalYml.watchdog.earlyWarningDelay"),
          "early-warning-every": this.$t("processConfig.paperGlobalYml.watchdog.earlyWarningEvery")
        }
      }
    };
  }
};
</script>