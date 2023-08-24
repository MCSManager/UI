<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

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
        <div class="sub-title">{{this.$t("processConfig.introduction.common.aboutConfig")}}</div>
        <div class="sub-title-info">
          {{this.$t("processConfig.introduction.velocityToml.infoLong")}}
        </div>
      </div>
    </template>
  </LineOption>

  <div v-if="modelValue">
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
        "config-version": this.$t("processConfig.velocityToml.configVersion"),
        "bind": this.$t("processConfig.velocityToml.bind"),
        "motd": this.$t("processConfig.velocityToml.motd"),
        "show-max-players": this.$t("processConfig.velocityToml.showMaxPlayers"),
        "online-mode": this.$t("processConfig.velocityToml.onlineMode"),
        "force-key-authentication": this.$t("processConfig.velocityToml.forceKeyAuthentication"),
        "prevent-client-proxy-connections": this.$t("processConfig.velocityToml.preventClientProxyConnections"),
        "player-info-forwarding-mode": this.$t("processConfig.velocityToml.playerInfoForwardingMode"),
        "forwarding-secret-file": this.$t("processConfig.velocityToml.forwardingSecretFile"),
        "announce-forge": this.$t("processConfig.velocityToml.announceForge"),
        "kick-existing-players": this.$t("processConfig.velocityToml.kickExistingPlayers"),
        "ping-passthrough": this.$t("processConfig.velocityToml.pingPassthrough"),
        "enable-player-address-logging": this.$t("processConfig.velocityToml.enablePlayerAddressLogging"),
        "servers": {
          "try": this.$t("processConfig.velocityToml.servers.try")
        },
        "advanced": {
          "compression-threshold": this.$t("processConfig.velocityToml.advanced.compressionThreshold"),
          "compression-level": this.$t("processConfig.velocityToml.advanced.compressionLevel"),
          "login-ratelimit": this.$t("processConfig.velocityToml.advanced.loginRatelimit"),
          "connection-timeout": this.$t("processConfig.velocityToml.advanced.connectionTimeout"),
          "read-timeout": this.$t("processConfig.velocityToml.advanced.readTimeout"),
          "haproxy-protocol": this.$t("processConfig.velocityToml.advanced.haproxyProtocol"),
          "tcp-fast-open": this.$t("processConfig.velocityToml.advanced.tcpFastOpen"),
          "bungee-plugin-message-channel": this.$t("processConfig.velocityToml.advanced.bungeePluginMessageChannel"),
          "show-ping-requests": this.$t("processConfig.velocityToml.advanced.showPingRequests"),
          "failover-on-unexpected-server-disconnect": this.$t("processConfig.velocityToml.advanced.failoverOnUnexpectedServerDisconnect"),
          "announce-proxy-commands": this.$t("processConfig.velocityToml.advanced.announceProxyCommands"),
          "log-command-executions": this.$t("processConfig.velocityToml.advanced.logCommandExecutions"),
          "log-player-connections": this.$t("processConfig.velocityToml.advanced.logPlayerConnections")
        },
        "query": {
          "enabled": this.$t("processConfig.velocityToml.query.enabled"),
          "port": this.$t("processConfig.velocityToml.query.port"),
          "map": this.$t("processConfig.velocityToml.query.map"),
          "show-plugins": this.$t("processConfig.velocityToml.query.showPlugins")
        }
      }
    };
  }
};
</script>
  