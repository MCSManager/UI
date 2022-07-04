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
  <!-- 当前文件的说明，请根据需要自定义修改文字，勿修改排版 -->
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
          此配置文件为 Minecraft 服务端的
          EULA（最终用户许可协议），您必须同意此协议才可以正常运行服务端软件，如果您发现此设置并不是“是”状态，那么请立即修改。
        </div>
      </div>
      <div class="sub-title">
        <div class="sub-title">什么是最终用户许可协议</div>
        <div class="sub-title-info">
          最终用户许可协议是软件应用程序作者或者发布者与应用程序使用者之间的合法合同。最终用户许可协议（EULA），通常是指“软件许可”，它与租赁协议类似；用户同意支付软件的使用费用，并且向软件作者或者发行者承诺遵守EULA中规定的所有约束条件。用户被告知，当他们打开软件包的包装、打开CD盒的封条、将卡片寄回给软件发行者、安装应用程序、执行下载文件或者简单的使用应用程序的时候就意味着他们已经“接受”了EULA中的条款。
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
        eula: "是否同意 Minecraft EULA协议，如果您要启动 Minecraft 服务器，则此选项是必须开启"
      }
    };
  }
};
</script>
