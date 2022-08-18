<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
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
                  <el-button size="small" @click="generate">{{
                    $t("cmdAssist.generate")
                  }}</el-button>
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
                <el-input
                  size="small"
                  :placeholder="$t('general.required')"
                  v-model="command.programName"
                ></el-input>
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
                <el-input
                  size="small"
                  :placeholder="$t('general.required')"
                  v-model="command.programName"
                ></el-input>
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
                  <el-button size="small" @click="generate3">{{
                    $t("cmdAssist.generate")
                  }}</el-button>
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
        additional: "-Dfile.encoding=UTF-8 -Duser.language=zh -Duser.country=CN",
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
