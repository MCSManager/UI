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
  <Dialog v-model="visible" :cancel="close">
    <template #title>{{ $t("newInstances.cmdAssist") }}</template>
    <template #default>
      <div style="max-width: 700px">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('cmdAssist.java')" name="java">
            <el-row :gutter="10">
              <el-col :md="24" :offset="0">
                <div class="sub-title">
                  <p class="sub-title-title">{{ $t("cmdAssist.javaPath") }}</p>
                  <p class="sub-title-info">
                    {{ $t("cmdAssist.javaPathInfo") }}
                  </p>
                </div>
                <el-input
                  size="small"
                  :placeholder="$t('cmdAssist.javaPathInput')"
                  v-model="command.javaPath"
                ></el-input>
              </el-col>
              <el-col :md="24" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">{{ $t("cmdAssist.programName") }}</p>
                  <p class="sub-title-info">
                    {{ $t("cmdAssist.programNameInfo") }}
                  </p>
                </div>
                <el-input
                  size="small"
                  :placeholder="$t('cmdAssist.inputProgramName')"
                  v-model="command.programName"
                ></el-input>
              </el-col>
              <el-col :md="12" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">{{ $t("cmdAssist.xmx") }}</p>
                  <p class="sub-title-info">{{ $t("cmdAssist.xmxInfo") }}</p>
                </div>
                <el-input
                  size="small"
                  :placeholder="$t('cmdAssist.inputXmx')"
                  v-model="command.maxMemory"
                ></el-input>
              </el-col>
              <el-col :md="12" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">{{ $t("cmdAssist.xms") }}</p>
                  <p class="sub-title-info">{{ $t("cmdAssist.xmsInfo") }}</p>
                </div>
                <el-input
                  size="small"
                  :placeholder="$t('cmdAssist.inputXmx')"
                  v-model="command.minMemory"
                ></el-input>
              </el-col>
              <el-col :md="12" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">{{ $t("cmdAssist.additional") }}</p>
                  <p class="sub-title-info">{{ $t("cmdAssist.additionalInfo") }}</p>
                </div>
                <el-input
                  size="small"
                  :placeholder="$t('cmdAssist.inputAdditional')"
                  v-model="command.additional"
                ></el-input>
              </el-col>
              <el-col :md="12" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">{{ $t("cmdAssist.suffix") }}</p>
                  <p class="sub-title-info">{{ $t("cmdAssist.suffixInfo") }}</p>
                </div>
                <el-input
                  size="small"
                  :placeholder="$t('cmdAssist.inputAdditional')"
                  v-model="command.suffix"
                ></el-input>
              </el-col>
              <el-col :md="24">
                <div class="row-mt">
                  <el-button size="small" @click="generate">{{ $t("cmdAssist.generate") }}</el-button>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane :label="$t('cmdAssist.bds')" name="bds">
            <el-row>
              <el-col :md="24" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">{{ $t("cmdAssist.binaryFileName") }}</p>
                  <p class="sub-title-info">
                    {{ $t("cmdAssist.inputBinaryFileName") }}
                  </p>
                </div>
                <el-input size="small" :placeholder="$t('general.required')" v-model="command.programName"></el-input>
              </el-col>
              <el-col :md="24">
                <div class="row-mt">
                  <ItemGroup>
                    <el-button size="small" @click="generate2(1)">
                      {{ $t("cmdAssist.summonWin") }}
                    </el-button>
                    <el-button size="small" @click="generate2(2)">
                      {{ $t("cmdAssist.summonLinux") }}
                    </el-button>
                  </ItemGroup>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane :label="$t('cmdAssist.program')" name="program">
            <el-row>
              <el-col :md="24" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">{{ $t("cmdAssist.programName2") }}</p>
                  <p class="sub-title-info">
                    {{ $t("cmdAssist.programName2Info") }}
                  </p>
                </div>
                <el-input size="small" :placeholder="$t('general.required')" v-model="command.programName"></el-input>
              </el-col>
              <el-col :md="24" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">{{ $t("cmdAssist.additional") }}</p>
                  <p class="sub-title-info">
                    {{ $t("cmdAssist.additionalInfo2") }}
                  </p>
                </div>
                <el-input
                  size="small"
                  :placeholder="$t('cmdAssist.inputAdditional2')"
                  v-model="command.additional"
                ></el-input>
              </el-col>
              <el-col :md="24">
                <div class="row-mt">
                  <el-button size="small" @click="generate3">{{ $t("cmdAssist.generate") }}</el-button>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "./Dialog";

// 使用 v-model 指令实现双向数据传递
export default {
  props: {
    modelValue: Boolean,
    cancel: Function,
    result: Function,
    defaultProgramName: String
  },
  emits: ["update:modelValue"],
  data: function () {
    return {
      activeName: "java",
      visible: false,
      command: {
        javaPath: "",
        programName: "",
        maxMemory: "",
        minMemory: "",
        additional: "-Dfile.encoding=UTF-8 -Duser.language=cn -Duser.country=ZH",
        suffix: "nogui"
      }
    };
  },
  watch: {
    defaultProgramName() {
      this.command.programName = this.defaultProgramName;
    },
    modelValue() {
      this.visible = this.modelValue;
    }
  },
  methods: {
    clearCommand() {
      this.command = {
        javaPath: "",
        programName: "",
        maxMemory: "",
        minMemory: "",
        additional: "",
        suffix: ""
      };
    },
    generate() {
      if (!this.command.programName)
        return this.$message({ type: "error", message: this.$t("cmdAssist.noContent") });
      const xmx = this.command.maxMemory ? `-Xmx${this.command.maxMemory}` : null;
      const xms = this.command.minMemory ? `-Xms${this.command.minMemory}` : null;
      const cmdArray = [`${this.command.javaPath ? `"${this.command.javaPath}"` : "java"}`];
      if (xmx) cmdArray.push(xmx);
      if (xms) cmdArray.push(xms);
      if (this.command.additional) cmdArray.push(this.command.additional);
      if (this.command.programName) {
        if (this.command.programName.includes(" ")) {
          cmdArray.push(`-jar "${this.command.programName}"`);
        } else {
          cmdArray.push(`-jar ${this.command.programName}`);
        }
      }
      if (this.command.suffix) cmdArray.push(this.command.suffix);
      const cmd = cmdArray.join(" ");
      this.result(cmd);
      this.close();
    },
    generate2(type) {
      if (!this.command.programName)
        return this.$message({ type: "error", message: this.$t("cmdAssist.noContent") });
      let cmd = "";
      if (type === 1) {
        cmd = `${this.command.programName}`;
      } else {
        cmd = `LD_LIBRARY_PATH=. ${this.command.programName}`;
        return this.$message({
          type: "error",
          message: this.$t("cmdAssist.noLinuxBds")
        });
      }
      this.result(cmd);
      this.close();
    },
    generate3() {
      if (!this.command.programName)
        return this.$message({ type: "error", message: this.$t("cmdAssist.noContent") });
      if (this.command.programName.includes(" ")) {
        this.command.programName = `"${this.command.programName}"`;
      }
      const cmd = `${this.command.programName} ${this.command.additional}`;
      this.result(cmd);
      this.close();
    },
    close() {
      if (this.cancel) this.cancel();
      this.$emit("update:modelValue", false);
      this.clearCommand();
    }
  },
  components: { Dialog }
};
</script>
