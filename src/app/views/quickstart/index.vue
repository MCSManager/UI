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
  <div class="quick-container">
    <div>
      <h1 class="title-tip title-tip-primary">您希望使用 MCSManager 面板做什么？</h1>
      <p>欢迎您访问“快速开始”，我们将尽可能的降低使用门槛并帮助您使用面板！</p>
    </div>
    <el-row :gutter="10" justify="left" class="col-md-responsive">
      <el-col :md="6" :offset="0" v-for="(item, index) in quickItems" :key="index">
        <SelectBlock style="height: 120px; background-color: white">
          <template #title>{{ item.title }}</template>
          <template #info>{{ item.subTitle }}</template>
        </SelectBlock>
      </el-col>
    </el-row>

    <div>
      <!-- <p class="sub-title">
        更多资料参考：<a
          href="https://docs.mcsmanager.com/"
          target="_blank"
          rel="noopener noreferrer"
          >https://docs.mcsmanager.com/</a
        >
      </p> -->
    </div>
    <!-- <QuickStartButton>创建 Minecraft 服务器</QuickStartButton>
    <QuickStartButton>在面板中管理我的控制台程序</QuickStartButton> -->
  </div>
</template>

<script>
import SelectBlock from "@/components/SelectBlock";
export default {
  components: { SelectBlock },
  data: function () {
    return {
      quickItems: [
        {
          title: "创建一个的 Minecraft 服务器",
          subTitle: "帮助您快速部署 Java/基岩版 Minecraft 服务器",
          value: 1
        },
        {
          title: "创建一个其他游戏服务器",
          subTitle: "尝试帮助您创建其他游戏服务器，不保证完全兼容",
          value: 1
        },
        {
          title: "在面板中管理我的控制台程序",
          subTitle: "让您的控制台程序，比如 Nginx.exe，frp.exe 和 cmd.exe 在网页上进行管理",
          value: 1
        },
        {
          title: "我需要出租一个 Minecraft 服务器给客户",
          subTitle: "帮助您快速出租一个服务器给您的客户实现盈利",
          value: 1
        }
      ]
    };
  },
  methods: {
    async init() {}
  },
  async mounted() {}
};
</script>

<style scoped></style>
