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
          {{this.$t("processConfig.introduction.bdsServerProperties.infoLong")}}
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
        "level-name": this.$t("processConfig.bdsServerProperties.levelName"),
      }
    };
  }
};
</script>
