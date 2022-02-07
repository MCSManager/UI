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
        prevent_proxy_connections: "是否向 Mojang 发送玩家 IP 数据以阻止使用了代理的玩家进入服务器",
        listeners: [
          {
            query_port: "UDP查询端口",
            motd: "当仅有一个默认服务器时，服务器将会显示给玩家的Motd。当ping_passthrough被开启时，此项无效",
            tab_list: "连接到服务器的玩家的 TAB 列表所显示的内容格式",
            query_enabled: "是否开启 UDP 查询",
            proxy_protocol: "是否开启对 HAProxy 的支持",
            forced_hosts: "端口转发设置",
            ping_passthrough: "是否开启 ping 穿透",
            priorities: "优先级设置",
            bind_local_address: "是否显示 BungeeCord 正在监听的 IP 地址",
            host: "监听的 IP 地址和端口",
            max_players:
              "玩家客户端将会显示的最大玩家数，默认值为1。此项只作为装饰，并未真实的最大玩家数设置",
            tab_size: "显示在 TAB 列表上的最大玩家数量",
            force_default_server: "每次玩家进入服务器时，是否强制将玩家传送到默认服务器中"
          }
        ],
        remote_ping_cache: "",
        network_compression_threshold: "",
        permissions: {
          default: "默认用户组权限",
          admin: "管理员用户组权限"
        },
        log_pings: "是否在控制台记录玩家客户端向 BungeeCord 发起 ping 请求的记录",
        connection_throttle: "断开时间",
        connection_throttle_limit: "断开次数",
        server_connect_timeout: "",
        timeout: "超时时间",
        player_limit: "整个 BungeeCord 实例能够接受的最大玩家数量，默认值为-1，即不限数量",
        ip_forward: "是否启用 IP 追踪",
        groups: "权限组设置",
        remote_ping_timeout: "",
        log_commands: "是否在控制台记录玩家输入的指令（仅记录 BungeeCord 指令）",
        stats: "",
        online_mode: "正版验证",
        forge_support: "是否启用对 Forge 的支持",
        disabled_commands: "禁用的指令",
        servers: "下游服务端设置，只有在此处设置过的下游服务器才可被连接"
      }
    };
  }
};
</script>
