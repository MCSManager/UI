<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>{{ $t("fileManagerEditor.title") }} {{ target }}</template>
    <template #default>
      <div class="instance-table-wrapper">
        <div>
          <ItemGroup>
            <el-button size="small" type="success" @click="saveFile">
              <i class="el-icon-refresh"></i> {{ $t("fileManagerEditor.updateFile") }}
            </el-button>
            <el-button size="small" @click="refresh">
              <i class="el-icon-refresh"></i> {{ $t("general.refresh") }}
            </el-button>
            <el-button size="small" @click="back" v-if="!backType">
              <i class="el-icon-pie-chart"></i> {{ $t("fileManagerEditor.backToFileManager") }}
            </el-button>
          </ItemGroup>
        </div>
        <div>
          <el-button size="small" @click="backViaHistory" type="primary" plain v-if="backType == 1">
            {{ $t("fileManagerEditor.backViaHistory") }}
          </el-button>
        </div>
      </div>
      <div v-show="!error" style="overflow: auto">
        <div id="editor" style="height: 70vh" class="editor-code-font"></div>
      </div>
      <div v-show="error" style="padding: 16px 0px">
        <el-alert
          :title="$t('fileManagerEditor.editError')"
          type="error"
          :description="error"
          show-icon
        ></el-alert>
      </div>
    </template>
  </Panel>
</template>
<script>
import Panel from "../../components/Panel";
import { API_FILE_URL } from "../service/common";
import path from "path";
import { request } from "../service/protocol";

export default {
  components: { Panel },
  data() {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      target: this.$route.query.target,
      backType: this.$route.query.backType,
      error: null,
      edit: {
        text: "",
        fileName: this.$route.query.target
      },
      editor: null
    };
  },
  async mounted() {
    await this.render();
    this.editor = window.ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    const extName = path.extname(this.target);
    if (extName === ".js") this.editor.session.setMode("ace/mode/javascript");
    if (extName === ".json") this.editor.session.setMode("ace/mode/json");
    if (extName === ".json5") this.editor.session.setMode("ace/mode/json5");
    if (extName === ".yml" || extName === ".yaml") this.editor.session.setMode("ace/mode/yaml");
    if (extName === ".xml" || extName === ".xaml") this.editor.session.setMode("ace/mode/xml");
    if (extName === ".ini") this.editor.session.setMode("ace/mode/ini");
    if (extName === ".java") this.editor.session.setMode("ace/mode/java");
    if (extName === ".css") this.editor.session.setMode("ace/mode/css");
    if (extName === ".html") this.editor.session.setMode("ace/mode/html");
    if (extName === ".properties") this.editor.session.setMode("ace/mode/properties");
    if (extName === ".py") this.editor.session.setMode("ace/mode/python");
    if (extName === ".txt") this.editor.session.setMode("ace/mode/text");
    if (extName === ".bat") this.editor.session.setMode("ace/mode/batchfile");
    if (extName === ".sh") this.editor.session.setMode("ace/mode/sh");
    if (extName === ".c" || extName === ".cpp") this.editor.session.setMode("ace/mode/c_cpp");
    if (extName === ".toml") this.editor.session.setMode("ace/mode/toml");
    this.editor.setValue(this.edit.text);
  },
  methods: {
    async refresh() {
      await this.render();
      this.$message({ message: this.$t("general.refreshFinish"), type: "success" });
    },
    async backTerminal() {
      this.$router.push({
        path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/`
      });
    },
    async back() {
      this.$router.push({
        path: `/file/${this.serviceUuid}/${this.instanceUuid}/`,
        query: {
          path: path.dirname(this.target)
        }
      });
    },
    backViaHistory() {
      this.$router.go(-1);
    },

    async render() {
      try {
        const text = await request({
          method: "PUT",
          url: API_FILE_URL,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          },
          data: {
            target: this.target
          }
        });
        this.edit.text = text;
        this.edit.isOpenEdit = true;
        this.edit.fileName = this.target;
        if (this.editor) this.editor.setValue(this.edit.text);
      } catch (error) {
        this.error = error.message;
      }
    },

    async saveFile() {
      this.edit.text = this.editor.getValue();
      await request({
        method: "PUT",
        url: API_FILE_URL,
        params: {
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid
        },
        data: {
          text: this.edit.text,
          target: this.target
        }
      });
      this.$message({ message: this.$t("fileManagerEditor.updateTextSuccess"), type: "success" });
    }
  }
};
</script>

<style scoped>
.editor-code-font {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", "Droid Sans Mono",
    monospace;
  font-size: 12px;
  white-space: pre-wrap;
}
</style>
