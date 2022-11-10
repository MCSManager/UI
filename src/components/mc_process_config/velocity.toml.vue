<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
  This page is for Chinese users only
-->

<template>
    <!-- 当前文件的说明，请根据需要自定义修改文字 -->
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
            Velocity 群组服务端的重要配置文件，可以进行分布式管理，节点控制等
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
          "config-version": "配置文件版本, 不要更改这个选项",
          "bind": "监听地址",
          "motd": "MOTD",
          "show-max-players": "展示的最大玩家数量（实际Velocity不限制玩家数）",
          "online-mode": "是否启用正版验证",
          "force-key-authentication": "是否开启强制秘钥验证",
          "prevent-client-proxy-connections": "是否禁止客户端代理连接",
          "player-info-forwarding-mode": "玩家信息转发模式",
          "forwarding-secret-file": "转发秘钥文件",
          "announce-forge": "是否广播服务器支持Forge",
          "kick-existing-players": "是否踢出已存在的玩家",
          "ping-passthrough": "PING请求透传模式",
          "enable-player-address-logging": "如果不启用，玩家的IP地址将在日志中被<ip address withheld>取代",
          "servers": {
            "try": "尝试连接服务器顺序（格式如：lobby,minigame1,minigame2）",
          },
          "advanced": {
            "compression-threshold": "网络数据包压缩阈值，设置为 0 将压缩所有数据包，设置为 -1 将会完全禁用所有数据包压缩",
            "compression-level": "压缩等级（0 - 9，设为 -1 使用默认值 6）",
            "login-ratelimit": "客户端登录冷却时间",
            "connection-timeout": "连接超时时间",
            "read-timeout": "读取超时时间",
            "haproxy-protocol": "是否启用对 HAProxy 协议的支持",
            "tcp-fast-open": "是否启用对 tcp fast open 的支持，需要运行在 Linux 上",
            "bungee-plugin-message-channel": "是否启用对 BungeeCord 自定义消息信道支持",
            "show-ping-requests": "是否在代理端上显示来自于客户端的 PING 请求",
            "failover-on-unexpected-server-disconnect": "是否禁止当用户连接意外丢失但服务器的连接而没有显式断开的情况下 Velocity 将玩家行为回退（Read Timeout 除外），而不是断开与玩家的连接的处理方式",
            "announce-proxy-commands": "是否向 1.13+ 客户端声明代理端指令（这将允许客户端接收到代理端的指令补全等信息）",
            "log-command-executions": "是否记录代理端的指令使用情况",
            "log-player-connections": "是否录代理端的玩家连接情况",
          },
          "query": {
            "enabled": "是否开启对 GameSpy 4 查询的响应",
            "port": "查询协议监听端口",
            "map": "反馈给查询服务的 map 名",
            "show-plugins": "是否将插件展示在查询响应结果中",
          },
        }
      };
    }
  };
  </script>
  