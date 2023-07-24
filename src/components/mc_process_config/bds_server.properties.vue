<template>
  <!-- 当前文件的说明，请根据需要自定义修改文字 -->
  <LineOption :custom="true">
    <template #default>
      <div class="sub-title" v-iszh>
        <div class="sub-title">关于配置兼容与翻译</div>
        <div class="sub-title-info">
          此界面由开源社区开发者开发与翻译，若翻译发现错误可前往开源社区进行反馈。配置文件部分设置因版本和服务端类型不同会有些许变化，某些配置文件子元素过于复杂，可能会导致配置项值无法正常显示，如遇到不正常的配置项值切勿进行修改。若对配置文件要进行更为详细的配置，建议前往文件在线管理功能进行文件编辑。
        </div>
      </div>
      <div class="sub-title">
        <div class="sub-title">关于配置文件</div>
        <div class="sub-title-info">
          此配置文件为基岩版专用服务器主要配置文件，基岩版服务器绝大部分配置都在此配置文件进行设置，例如服务器端口，人数，视距和限制参数等。
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
        "server-name": this.$t("processConfig.bdsServerProperties.serverName"),
        "allow-cheats": this.$t("processConfig.bdsServerProperties.allowCheats"),
        "server-portv6": this.$t("processConfig.bdsServerProperties.serverPortv6"),
        "tick-distance": this.$t("processConfig.bdsServerProperties.tickDistance"),
        "max-threads": this.$t("processConfig.bdsServerProperties.maxThreads"),
        "default-player-permission-level": this.$t("processConfig.bdsServerProperties.defaultPlayerPermissionLevel"),
        "texturepack-required": this.$t("processConfig.bdsServerProperties.texturepackRequired"),
        "content-log-file-enabled": this.$t("processConfig.bdsServerProperties.contentLogFileEnabled"),
        "compression-threshold": this.$t("processConfig.bdsServerProperties.compressionThreshold"),
        "server-authoritative-movement": this.$t("processConfig.bdsServerProperties.serverAuthoritativeMovement"),
        "player-movement-score-threshold": this.$t("processConfig.bdsServerProperties.playerMovementScoreThreshold"),
        "enable-lan-visibility": this.$t("processConfig.bdsServerProperties.enableLanVisibility"),
        "compression-algorithm": this.$t("processConfig.bdsServerProperties.compressionAlgorithm"),
        "player-movement-action-direction-threshold": this.$t("processConfig.bdsServerProperties.playerMovementActionDirectionThreshold"),
        "chat-restriction": this.$t("processConfig.bdsServerProperties.chatRestriction"),
        "disable-player-interaction": this.$t("processConfig.bdsServerProperties.disablePlayerInteraction"),
        "client-side-chunk-generation-enabled": this.$t("processConfig.bdsServerProperties.clientSideChunkGenerationEnabled"),
        "player-movement-distance-threshold": this.$t("processConfig.bdsServerProperties.playerMovementDistanceThreshold"),
        "player-movement-duration-threshold-in-ms": this.$t("processConfig.bdsServerProperties.playerMovementDurationThresholdInMs"),
        "correct-player-movement": this.$t("processConfig.bdsServerProperties.correctPlayerMovement"),
        "server-authoritative-block-breaking": this.$t("processConfig.bdsServerProperties.serverAuthoritativeBlockBreaking"),
        "generator-settings": this.$t("processConfig.bdsServerProperties.generatorSettings"),
        "allow-nether": this.$t("processConfig.bdsServerProperties.allowNether"),
        "level-name": this.$t("processConfig.bdsServerProperties.levelName"),
        "enable-query": this.$t("processConfig.bdsServerProperties.enableQuery"),
        "allow-flight": this.$t("processConfig.bdsServerProperties.allowFlight"),
        "server-port": this.$t("processConfig.bdsServerProperties.serverPort"),
        "level-type": this.$t("processConfig.bdsServerProperties.levelType"),
        "enable-rcon": this.$t("processConfig.bdsServerProperties.enableRcon"),
        "force-gamemode": this.$t("processConfig.bdsServerProperties.forceGamemode"),
        "level-seed": this.$t("processConfig.bdsServerProperties.levelSeed"),
        "server-ip": this.$t("processConfig.bdsServerProperties.serverIp"),
        "max-build-height": this.$t("processConfig.bdsServerProperties.maxBuildHeight"),
        "spawn-npcs": this.$t("processConfig.bdsServerProperties.spawnNpcs"),
        "white-list": this.$t("processConfig.bdsServerProperties.whiteList"),
        "allow-list": this.$t("processConfig.bdsServerProperties.allowList"),
        "spawn-animals": this.$t("processConfig.bdsServerProperties.spawnAnimals"),
        "snooper-enabled": this.$t("processConfig.bdsServerProperties.snooperEnabled"),
        "hardcore": this.$t("processConfig.bdsServerProperties.hardcore"),
        "texture-pack": this.$t("processConfig.bdsServerProperties.texturePack"),
        "online-mode": this.$t("processConfig.bdsServerProperties.onlineMode"),
        "pvp": this.$t("processConfig.bdsServerProperties.pvp"),
        "difficulty": this.$t("processConfig.bdsServerProperties.difficulty"),
        "player-idle-timeout": this.$t("processConfig.bdsServerProperties.playerIdleTimeout"),
        "gamemode": this.$t("processConfig.bdsServerProperties.gamemode"),
        "max-players": this.$t("processConfig.bdsServerProperties.maxPlayers"),
        "spawn-monsters": this.$t("processConfig.bdsServerProperties.spawnMonsters"),
        "view-distance": this.$t("processConfig.bdsServerProperties.viewDistance"),
        "generate-structures": this.$t("processConfig.bdsServerProperties.generateStructures"),
        "motd": this.$t("processConfig.bdsServerProperties.motd"),
        "op-permission-level": this.$t("processConfig.bdsServerProperties.opPermissionLevel"),
        "announce-player-achievements": this.$t("processConfig.bdsServerProperties.announcePlayerAchievements"),
        "network-compression-threshold": this.$t("processConfig.bdsServerProperties.networkCompressionThreshold"),
        "resource-pack-sha1": this.$t("processConfig.bdsServerProperties.resourcePackSha1"),
        "enable-command-block": this.$t("processConfig.bdsServerProperties.enableCommandBlock"),
        "resource-pack": this.$t("processConfig.bdsServerProperties.resourcePack"),
        "max-world-size": this.$t("processConfig.bdsServerProperties.maxWorldSize"),
        "function-permission-level": this.$t("processConfig.bdsServerProperties.functionPermissionLevel"),
        "max-tick-time": this.$t("processConfig.bdsServerProperties.maxTickTime"),
        "prevent-proxy-connections": this.$t("processConfig.bdsServerProperties.preventProxyConnections"),
        "rcon.port": this.$t("processConfig.bdsServerProperties.rconPort"),
        "rcon.password": this.$t("processConfig.bdsServerProperties.rconPassword"),
        "query.port": this.$t("processConfig.bdsServerProperties.query.port"),
        "use-native-transport": this.$t("processConfig.bdsServerProperties.useNativeTransport"),
        "debug": this.$t("processConfig.bdsServerProperties.debug"),
        "broadcast-rcon-to-ops": this.$t("processConfig.bdsServerProperties.broadcastRconToOps"),
        "broadcast-console-to-ops": this.$t("processConfig.bdsServerProperties.broadcastConsoleToOps"),
        "enforce-whitelist": this.$t("processConfig.bdsServerProperties.enforceWhitelist"),
        "spawn-protection": this.$t("processConfig.bdsServerProperties.spawnProtection")
      }
    };
  }
};
</script>
