<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <!-- 当前文件的说明，请根据需要自定义修改文字，勿修改排版 -->
  <LineOption :custom="true">
    <template #default>
      <div class="sub-title" v-iszh>
        <div class="sub-title">关于配置兼容与翻译</div>
        <div class="sub-title-info">
          此界面由开源社区开发者开发与翻译，若翻译发现错误可前往开源社区进行反馈。配置文件部分设置因版本和服务端类型不同会有些许变化，某些配置文件子元素过于复杂，可能会导致配置项值无法正常显示，如遇到不正常的配置项值切勿进行修改。若对配置文件要进行更为详细的配置，建议前往文件在线管理功能进行文件编辑。
        </div>
      </div>
      <div class="sub-title">
        <div class="sub-title">{{this.$t("processConfig.introduction.common.aboutConfig")}}</div>
        <div class="sub-title-info">
          {{this.$t("processConfig.introduction.serverProperties.infoLong")}}
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
  async mounted() {
  },
  methods: {},
  data() {
    return {
      description: {
        "require-resource-pack": this.$t("processConfig.serverProperties.requireResourcePack"),
        "enable-jmx-monitoring": this.$t("processConfig.serverProperties.enableJmxMonitoring"),
        "sync-chunk-writes": this.$t("processConfig.serverProperties.syncChunkWrites"),
        "generator-settings": this.$t("processConfig.serverProperties.generatorSettings"),
        "allow-nether": this.$t("processConfig.serverProperties.allowNether"),
        "level-name": this.$t("processConfig.serverProperties.levelName"),
        "enable-query": this.$t("processConfig.serverProperties.enableQuery"),
        "allow-flight": this.$t("processConfig.serverProperties.allowFlight"),
        "server-port": this.$t("processConfig.serverProperties.serverPort"),
        "level-type": this.$t("processConfig.serverProperties.levelType"),
        "enable-rcon": this.$t("processConfig.serverProperties.enableRcon"),
        "force-gamemode": this.$t("processConfig.serverProperties.forceGamemode"),
        "level-seed": this.$t("processConfig.serverProperties.levelSeed"),
        "server-ip": this.$t("processConfig.serverProperties.serverIp"),
        "max-build-height": this.$t("processConfig.serverProperties.maxBuildHeight"),
        "spawn-npcs": this.$t("processConfig.serverProperties.spawnNpcs"),
        "white-list": this.$t("processConfig.serverProperties.whiteList"),
        "spawn-animals": this.$t("processConfig.serverProperties.spawnAnimals"),
        "snooper-enabled": this.$t("processConfig.serverProperties.snooperEnabled"),
        "hardcore": this.$t("processConfig.serverProperties.hardcore"),
        "texture-pack": this.$t("processConfig.serverProperties.texturePack"),
        "online-mode": this.$t("processConfig.serverProperties.onlineMode"),
        "pvp": this.$t("processConfig.serverProperties.pvp"),
        "enforce-secure-profile": this.$t("processConfig.serverProperties.enforceSecureProfile"),
        "difficulty": this.$t("processConfig.serverProperties.difficulty"),
        "player-idle-timeout": this.$t("processConfig.serverProperties.playerIdleTimeout"),
        "gamemode": this.$t("processConfig.serverProperties.gamemode"),
        "max-players": this.$t("processConfig.serverProperties.maxPlayers"),
        "spawn-monsters": this.$t("processConfig.serverProperties.spawnMonsters"),
        "view-distance": this.$t("processConfig.serverProperties.viewDistance"),
        "generate-structures": this.$t("processConfig.serverProperties.generateStructures"),
        "motd": this.$t("processConfig.serverProperties.motd"),
        "op-permission-level": this.$t("processConfig.serverProperties.opPermissionLevel"),
        "announce-player-achievements": this.$t("processConfig.serverProperties.announcePlayerAchievements"),
        "network-compression-threshold": this.$t("processConfig.serverProperties.networkCompressionThreshold"),
        "resource-pack-sha1": this.$t("processConfig.serverProperties.resourcePackSha1"),
        "enable-command-block": this.$t("processConfig.serverProperties.enableCommandBlock"),
        "resource-pack": this.$t("processConfig.serverProperties.resourcePack"),
        "max-world-size": this.$t("processConfig.serverProperties.maxWorldSize"),
        "function-permission-level": this.$t("processConfig.serverProperties.functionPermissionLevel"),
        "max-tick-time": this.$t("processConfig.serverProperties.maxTickTime"),
        "prevent-proxy-connections": this.$t("processConfig.serverProperties.preventProxyConnections"),
        "rcon.port": this.$t("processConfig.serverProperties.rconPort"),
        "rcon.password": this.$t("processConfig.serverProperties.rconPassword"),
        "query.port": this.$t("processConfig.serverProperties.queryPort"),
        "use-native-transport": this.$t("processConfig.serverProperties.useNativeTransport"),
        "debug": this.$t("processConfig.serverProperties.debug"),
        "broadcast-rcon-to-ops": this.$t("processConfig.serverProperties.broadcastRconToOps"),
        "broadcast-console-to-ops": this.$t("processConfig.serverProperties.broadcastConsoleToOps"),
        "enforce-whitelist": this.$t("processConfig.serverProperties.enforceWhitelist"),
        "spawn-protection": this.$t("processConfig.serverProperties.spawnProtection"),
        "max-chained-neighbor-updates": this.$t("processConfig.serverProperties.maxChainedNeighborUpdates"),
        "enable-status": this.$t("processConfig.serverProperties.enableStatus"),
        "resource-pack-prompt": this.$t("processConfig.serverProperties.resourcePackPrompt"),
        "hide-online-players": this.$t("processConfig.serverProperties.hideOnlinePlayers"),
        "entity-broadcast-range-percentage": this.$t("processConfig.serverProperties.entityBroadcastRangePercentage"),
        "simulation-distance": this.$t("processConfig.serverProperties.simulationDistance"),
        "rate-limit": this.$t("processConfig.serverProperties.rateLimit"),
        "previews-chat": this.$t("processConfig.serverProperties.previewsChat"),
        "text-filtering-config": this.$t("processConfig.serverProperties.textFilteringConfig")
      }
    };
  }
};
</script>
