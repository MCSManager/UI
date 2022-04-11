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
    <template #title>命令助手</template>
    <template #default>
      <div style="max-width: 700px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="MC Java 版" name="java">
            <el-row :gutter="10">
              <el-col :md="24" :offset="0">
                <div class="sub-title">
                  <p class="sub-title-title">Java 路径或环境变量</p>
                  <p class="sub-title-info">
                    若想指定具体的 Java 程序，可写绝对路径，如 C:\Program
                    Files\Java\jdk-16.0.1\bin\java.exe
                  </p>
                </div>
                <el-input
                  size="small"
                  placeholder="选填，默认使用 java 环境变量"
                  v-model="command.javaPath"
                ></el-input>
              </el-col>
              <el-col :md="24" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">服务端软件文件名</p>
                  <p class="sub-title-info">
                    即您文件目录下存在的服务端软件名字，必须真实存在，如 Paper.jar，Server.jar
                  </p>
                </div>
                <el-input
                  size="small"
                  placeholder="必填，一般是 jar 格式文件"
                  v-model="command.programName"
                ></el-input>
              </el-col>
              <el-col :md="12" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">最大内存</p>
                  <p class="sub-title-info">Java 程序 -Xmx 参数，必须填写单位，如：1024M，2G 等</p>
                </div>
                <el-input
                  size="small"
                  placeholder="选填，不填写则由 Java 自动管理"
                  v-model="command.maxMemory"
                ></el-input>
              </el-col>
              <el-col :md="12" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">最小内存</p>
                  <p class="sub-title-info">Java 程序 -Xms 参数，必须填写单位，如：1024M，2G 等</p>
                </div>
                <el-input
                  size="small"
                  placeholder="选填，不填写则由 Java 自动管理"
                  v-model="command.minMemory"
                ></el-input>
              </el-col>
              <el-col :md="12" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">附加参数</p>
                  <p class="sub-title-info">Java 程序 -jar 之前的附加参数，如 -server 等</p>
                </div>
                <el-input
                  size="small"
                  placeholder="选填，默认为空"
                  v-model="command.additional"
                ></el-input>
              </el-col>
              <el-col :md="12" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">后缀参数</p>
                  <p class="sub-title-info">Java 程序 -jar 文件名 之后的附加参数，如 -nogui 等</p>
                </div>
                <el-input
                  size="small"
                  placeholder="选填，默认为空"
                  v-model="command.suffix"
                ></el-input>
              </el-col>
              <el-col :md="24">
                <div class="row-mt">
                  <el-button size="small" @click="generate">生成命令</el-button>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="MC 基岩版" name="bds">
            <el-row>
              <el-col :md="24" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">基岩版二进制执行文件名</p>
                  <p class="sub-title-info">
                    如 bedrock_server.exe (Windows) 或 bedrock_server (Linux)
                  </p>
                </div>
                <el-input size="small" placeholder="必填" v-model="command.programName"></el-input>
              </el-col>
              <el-col :md="24">
                <div class="row-mt">
                  <ItemGroup>
                    <el-button size="small" @click="generate2(1)">
                      生成适用于 Windows 的命令
                    </el-button>
                    <el-button size="small" @click="generate2(2)">
                      生成适用于 Linux 的命令
                    </el-button>
                  </ItemGroup>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="通用控制台程序" name="program">
            <el-row>
              <el-col :md="24" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">可执行程序文件名</p>
                  <p class="sub-title-info">
                    程序必须已经存在实例文件目录或环境变量中，如 cmd.exe，bash，program.exe 等
                  </p>
                </div>
                <el-input size="small" placeholder="必填" v-model="command.programName"></el-input>
              </el-col>
              <el-col :md="24" :offset="0">
                <div class="sub-title row-mt">
                  <p class="sub-title-title">附加参数</p>
                  <p class="sub-title-info">
                    此选项无具体参考，不同程序类型有不同参数，常见的格式如 -o -c --option
                    等，以空格分隔
                  </p>
                </div>
                <el-input
                  size="small"
                  placeholder="选填，默认不传递任何附加参数"
                  v-model="command.additional"
                ></el-input>
              </el-col>
              <el-col :md="24">
                <div class="row-mt">
                  <el-button size="small" @click="generate3">生成命令</el-button>
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
        return this.$message({ type: "error", message: "必填字段未填写内容" });
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
        return this.$message({ type: "error", message: "必填字段未填写内容" });
      let cmd = "";
      if (type === 1) {
        cmd = `${this.command.programName}`;
      } else {
        cmd = `LD_LIBRARY_PATH=. ${this.command.programName}`;
        return this.$message({
          type: "error",
          message: "因为 Linux 系统环境复杂多变，我们无法生成一个正确的启动命令，请手动编写启动命令"
        });
      }
      this.result(cmd);
      this.close();
    },
    generate3() {
      if (!this.command.programName)
        return this.$message({ type: "error", message: "必填字段未填写内容" });
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
