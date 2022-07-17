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
  <Dialog v-model="v">
    <template #title>实例设置</template>
    <template #default>
      <div>
        <div class="sub-title">
          <p class="sub-title-title">仿真终端（Beta）</p>
          <p class="sub-title-info">
            通过仿真终端转发程序来获得终端完全交互能力。<br />包括使用 Tab，Ctrl
            功能键等，但需要额外安装依赖库，默认情况下已经安装。
            <br />
            如果使用有问题，建议关闭。
          </p>
        </div>
        <div class="row-mt">
          <el-switch v-model="options.pty"></el-switch>
        </div>
      </div>

      <div class="row-mt">
        <div class="sub-title">
          <p class="sub-title-title">仿真终端窗口大小</p>
          <p class="sub-title-info">
            在仿真终端开启时生效，用于设置仿真终端高度和宽度，更改生效需要重启实例。
            <br />
            如果使用有问题，建议关闭。
          </p>
        </div>
        <div class="row-mt">
          <span>列：</span>
          <el-input
            v-model="options.ptyWindowCol"
            :disabled="!options.pty"
            size="small"
            style="width: 80px"
          ></el-input>
          &nbsp;
          <span>行：</span>
          <el-input
            :disabled="!options.pty"
            v-model="options.ptyWindowRow"
            size="small"
            style="width: 80px"
          ></el-input>
        </div>
      </div>

      <div class="row-mt">
        <div class="sub-title">
          <p class="sub-title-title">输入输出编码</p>
          <p class="sub-title-info">
            在仿真终端开启时生效，用于设置仿真终端高度和宽度，更改生效需要重启实例。
            <br />
            如果使用有问题，建议关闭。
          </p>
        </div>
        <div class="row-mt" style="display: flex">
          <el-select
            v-model="options.oe"
            filterable
            allow-create
            size="small"
            default-first-option
            placeholder="终端输出编码"
            style="width: 220px"
          >
            <el-option
              v-for="item in TERMINAL_CODE"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="options.ie"
            filterable
            size="small"
            allow-create
            default-first-option
            placeholder="命令输入编码"
            style="width: 220px; margin-left: 12px"
          >
            <el-option
              v-for="item in TERMINAL_CODE"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div>
        <div class="sub-title row-mt">
          <p class="sub-title-title">关闭实例命令</p>
          <p class="sub-title-info">
            当点击“关闭实例”按钮时，会立刻执行此命令，^C 代表 Ctrl+C 信号。
          </p>
        </div>
        <div class="row-mt">
          <el-input v-model="options.stopCommand" size="small"></el-input>
        </div>
      </div>

      <div>
        <div class="sub-title row-mt">
          <p class="sub-title-title">命令执行回车符</p>
          <p class="sub-title-info">
            如果您输入命令按回车没有反应，可以尝试调整此选项。
            <br />
            Windows 平台下一般是“回车换行符”，Linux/MacOS 平台下一般是“换行符”。
          </p>
        </div>
        <div class="row-mt">
          <el-select v-model="options.crlf" placeholder="请选择" size="small" style="width: 220px">
            <el-option label="换行符（\n）" :value="1"></el-option>
            <el-option label="回车换行符（\r\n）" :value="2"></el-option>
          </el-select>
        </div>
      </div>

      <div>
        <div class="sub-title row-mt">
          <p class="sub-title-title">网页颜色渲染</p>
          <p class="sub-title-info">
            网页自动给输出内容增加颜色渲染，渲染的颜色不一定完全正确。<br />如果颜色渲染功能与软件自带的颜色功能冲突，可以关闭此功能。
          </p>
        </div>
        <div class="row-mt">
          <el-switch v-model="options.haveColor"></el-switch>
        </div>
      </div>

      <div class="row-mt">
        <ItemGroup>
          <el-button type="success" size="small" @click="submit">保存</el-button>
          <el-button size="small" @click="close">取消</el-button>
        </ItemGroup>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { request } from "@/app//service/protocol";
import { API_INSTANCE_UPDATE } from "@/app/service/common";
import { TERMINAL_CODE } from "../../service/common";
export default {
  components: { Dialog },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object
    },
    serviceUuid: {
      type: String
    },
    instanceUuid: {
      type: String
    }
  },
  data() {
    return {
      TERMINAL_CODE,
      v: false,
      options: {}
    };
  },
  watch: {
    visible(n) {
      this.v = n;
      this.init();
    }
  },

  methods: {
    init() {
      console.log(this.config);
      this.options = this.config;
    },
    show() {
      this.$emit("update:visible", true);
    },
    close() {
      this.$emit("update:visible", false);
    },
    // 普通用户更新配置
    async submit() {
      try {
        await request({
          method: "PUT",
          url: API_INSTANCE_UPDATE,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid },
          data: {
            terminalOption: {
              ...this.options
            },
            pingConfig: {},
            eventTask: {},
            crlf: this.options.crlf,
            ie: this.options.ie,
            oe: this.options.oe,
            stopCommand: this.options.stopCommand
          }
        });
        this.options = {};
        this.close();
        this.$message({
          type: "success",
          message: "实例配置已更新，部分配置可能需要重启实例生效"
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error.message
        });
      }
    }
  }
};
</script>

<style scoped>
.btn-area {
  margin-top: 8px;
}
</style>
