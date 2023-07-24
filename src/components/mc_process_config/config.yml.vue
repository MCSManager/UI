<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
  This page is for Chinese users only
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
        <div class="sub-title">关于配置文件</div>
        <div class="sub-title-info">
          此配置适用于 BungeeCord
          群组服务端软件，但由于此配置文件略微有些复杂，大部分配置只能进行简单修改，建议您使用文件在线管理功能编辑此文件。
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
        "prevent_proxy_connections": this.$t("processConfig.configYml.preventProxyConnections"),
        "listeners": {
          "0": {
            "query_port": this.$t("processConfig.configYml.listeners.0.queryPort"),
            "motd": this.$t("processConfig.configYml.listeners.0.motd"),
            "tab_list": this.$t("processConfig.configYml.listeners.0.tabList"),
            "query_enabled": this.$t("processConfig.configYml.listeners.0.queryEnabled"),
            "proxy_protocol": this.$t("processConfig.configYml.listeners.0.proxyProtocol"),
            "forced_hosts": this.$t("processConfig.configYml.listeners.0.forcedHosts"),
            "ping_passthrough": this.$t("processConfig.configYml.listeners.0.pingPassthrough"),
            "priorities": this.$t("processConfig.configYml.listeners.0.priorities"),
            "bind_local_address": this.$t("processConfig.configYml.listeners.0.bindLocalAddress"),
            "host": this.$t("processConfig.configYml.listeners.0.host"),
            "max_players": this.$t("processConfig.configYml.listeners.0.maxPlayers"),
            "tab_size": this.$t("processConfig.configYml.listeners.0.tabSize"),
            "force_default_server": this.$t("processConfig.configYml.listeners.0.forceDefaultServer")
          }
        },
        "remote_ping_cache": this.$t("processConfig.configYml.remotePingCache"),
        "network_compression_threshold": this.$t("processConfig.configYml.networkCompressionThreshold"),
        "permissions": {
          "default": this.$t("processConfig.configYml.permissions.default"),
          "admin": this.$t("processConfig.configYml.permissions.admin")
        },
        "log_pings": this.$t("processConfig.configYml.logPings"),
        "connection_throttle": this.$t("processConfig.configYml.connectionThrottle"),
        "connection_throttle_limit": this.$t("processConfig.configYml.connectionThrottleLimit"),
        "server_connect_timeout": this.$t("processConfig.configYml.serverConnectTimeout"),
        "timeout": this.$t("processConfig.configYml.timeout"),
        "player_limit": this.$t("processConfig.configYml.playerLimit"),
        "ip_forward": this.$t("processConfig.configYml.ipForward"),
        "groups": this.$t("processConfig.configYml.groups"),
        "remote_ping_timeout": this.$t("processConfig.configYml.remotePingTimeout"),
        "log_commands": this.$t("processConfig.configYml.logCommands"),
        "stats": this.$t("processConfig.configYml.stats"),
        "online_mode": this.$t("processConfig.configYml.onlineMode"),
        "forge_support": this.$t("processConfig.configYml.forgeSupport"),
        "disabled_commands": this.$t("processConfig.configYml.disabledCommands"),
        "servers": this.$t("processConfig.configYml.servers")
      }
    };
  }
};
</script>
