<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
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
          {{this.$t("processConfig.introduction.geyserYml.infoLong")}}
        </div>
      </div>
    </template>
  </LineOption>

  <div v-if="modelValue">
    <div v-for="(item, index) in config" :key="index">
      <LineOption :option-value="config" :option-key="index">
        <template #title>{{ index }}</template>
        <template #info>{{ descriptionByTitle(description, index) }}</template>
      </LineOption>
    </div>
  </div>
</template>

<script>
import { getDescriptionByTitle, jsonToMap } from "../../app/service/common";
import LineOption from "../LineOption";

export default {
  components: { LineOption },
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
        "bedrock": {
          "address": this.$t("processConfig.geyserYml.bedrock.address"),
          "port": this.$t("processConfig.geyserYml.bedrock.port"),
          "clone-remote-port": this.$t("processConfig.geyserYml.bedrock.cloneRemotePort"),
          "motd1": this.$t("processConfig.geyserYml.bedrock.motd1"),
          "motd2": this.$t("processConfig.geyserYml.bedrock.motd2"),
          "server-name": this.$t("processConfig.geyserYml.bedrock.serverName"),
          "compression-level": this.$t("processConfig.geyserYml.bedrock.compressionLevel"),
          "enable-proxy-protocol": this.$t("processConfig.geyserYml.bedrock.enableProxyProtocol")
        },
        "remote": {
          "address": this.$t("processConfig.geyserYml.remote.address"),
          "port": this.$t("processConfig.geyserYml.remote.port"),
          "auth-type": this.$t("processConfig.geyserYml.remote.authType"),
          "allow-password-authentication": this.$t("processConfig.geyserYml.remote.allowPasswordAuthentication"),
          "use-proxy-protocol": this.$t("processConfig.geyserYml.remote.useProxyProtocol"),
          "forward-hostname": this.$t("processConfig.geyserYml.remote.forwardHostname")
        },
        "extended-world-height": this.$t("processConfig.geyserYml.extendedWorldHeight"),
        "floodgate-key-file": this.$t("processConfig.geyserYml.floodgateKeyFile"),
        "command-suggestions": this.$t("processConfig.geyserYml.commandSuggestions"),
        "passthrough-motd": this.$t("processConfig.geyserYml.passthroughMotd"),
        "passthrough-protocol-name": this.$t("processConfig.geyserYml.passthroughProtocolName"),
        "passthrough-player-counts": this.$t("processConfig.geyserYml.passthroughPlayerCounts"),
        "legacy-ping-passthrough": this.$t("processConfig.geyserYml.legacyPingPassthrough"),
        "ping-passthrough-interval": this.$t("processConfig.geyserYml.pingPassthroughInterval"),
        "forward-player-ping": this.$t("processConfig.geyserYml.forwardPlayerPing"),
        "max-players": this.$t("processConfig.geyserYml.maxPlayers"),
        "debug-mode": this.$t("processConfig.geyserYml.debugMode"),
        "general-thread-pool": this.$t("processConfig.geyserYml.generalThreadPool"),
        "allow-third-party-capes": this.$t("processConfig.geyserYml.allowThirdPartyCapes"),
        "allow-third-party-ears": this.$t("processConfig.geyserYml.allowThirdPartyEars"),
        "show-cooldown": this.$t("processConfig.geyserYml.showCooldown"),
        "default-locale": this.$t("processConfig.geyserYml.defaultLocale"),
        "cache-chunks": this.$t("processConfig.geyserYml.cacheChunks"),
        "show-coordinates": this.$t("processConfig.geyserYml.showCoordinates"),
        "emote-offhand-workaround": this.$t("processConfig.geyserYml.emoteOffhandWorkaround"),
        "cache-images": this.$t("processConfig.geyserYml.cacheImages"),
        "allow-custom-skulls": this.$t("processConfig.geyserYml.allowCustomSkulls"),
        "add-non-bedrock-items": this.$t("processConfig.geyserYml.addNonBedrockItems"),
        "above-bedrock-nether-building": this.$t("processConfig.geyserYml.aboveBedrockNetherBuilding"),
        "force-resource-packs": this.$t("processConfig.geyserYml.forceResourcePacks"),
        "xbox-achievements-enabled": this.$t("processConfig.geyserYml.xboxAchievementsEnabled"),
        "metrics": {
          "enabled": this.$t("processConfig.geyserYml.metrics.enabled"),
          "uuid": this.$t("processConfig.geyserYml.metrics.uuid")
        },
        "scoreboard-packet-threshold": this.$t("processConfig.geyserYml.scoreboardPacketThreshold"),
        "enable-proxy-connections": this.$t("processConfig.geyserYml.enableProxyConnections"),
        "use-direct-connection": this.$t("processConfig.geyserYml.useDirectConnection"),
        "config-version": this.$t("processConfig.geyserYml.configVersion")
      }
    };
  }
};
</script>
