<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->
<template>
  <Panel>
    <template #title>
      {{ $t("fileManagerEditor.title") }}
      {{ target }}
      <el-tag type="warning" effect="plain" size="small" v-if="editStatus === 'edit'">{{
        $t("CommonText.032")
      }}</el-tag>
      <el-tag type="success" effect="plain" size="small" v-if="editStatus === 'success'">{{
        $t("CommonText.033")
      }}</el-tag>
    </template>
    <template #default>
      <div class="instance-table-wrapper">
        <div>
          <ItemGroup>
            <el-button size="small" type="success" @click="saveFile">
              <i class="el-icon-refresh"></i>
              {{ $t("fileManagerEditor.updateFile") }}
            </el-button>
            <el-button size="small" @click="refresh">
              <i class="el-icon-refresh"></i>
              {{ $t("general.refresh") }}
            </el-button>
            <el-button size="small" @click="jumpToLine">
              <i class="el-icon-sort-down"></i>{{ $t("CommonText.034") }}</el-button
            >
            <el-dropdown :hide-on-click="false">
              <el-button type="default" size="small">
                <i class="el-icon-setting"></i>{{ $t("views.FileManagerEditor.001")
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-switch
                      v-model="editorSettings.wrapMode"
                      @change="setWrapMode($event)"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-text="$t('CommonText.035')"
                    ></el-switch>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-switch
                      v-model="editorSettings.behavioursEnabled"
                      @change="setBehavioursEnabled($event)"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-text="$t('CommonText.036')"
                    ></el-switch>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-switch
                      v-model="editorSettings.highlightActiveLine"
                      @change="setHighlightActiveLine($event)"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-text="$t('views.FileManagerEditor.002')"
                    ></el-switch>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-switch
                      v-model="editorSettings.readOnly"
                      @change="setReadOnly($event)"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-text="$t('CommonText.037')"
                    ></el-switch>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-switch
                      v-model="editorSettings.showInvisibles"
                      @change="setShowInvisibles($event)"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-text="$t('views.FileManagerEditor.003')"
                    ></el-switch>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-switch
                      v-model="editorSettings.enableMultiselect"
                      @change="setEnableMultiselect($event)"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-text="$t('CommonText.038')"
                    ></el-switch>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-switch
                      v-model="editorSettings.showLineNumbers"
                      @change="setShowLineNumbers($event)"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-text="$t('CommonText.039')"
                    ></el-switch>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-select
              v-model="editorSettings.theme"
              filterable
              size="small"
              @change="changeEditorTheme($event)"
              :placeholder="$t('views.FileManagerEditor.004')"
            >
              <el-option
                v-for="item in editorThemes"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-input-number
              v-model="editorSettings.fontSize"
              @change="changeEditorFontsize($event)"
              :min="1"
              :max="114.514"
              size="small"
            ></el-input-number>
            <el-button type="default" size="small" @click="toHotKey">
              <i class="el-icon-sort-down"></i>{{ $t("views.FileManagerEditor.005") }}</el-button
            >
            <el-button size="small" @click="back" v-if="!backType">
              <i class="el-icon-pie-chart"></i>
              {{ $t("fileManagerEditor.backToFileManager") }}
            </el-button>
          </ItemGroup>
        </div>
        <div>
          <el-button
            size="small"
            @click="backViaHistory"
            type="primary"
            plain
            v-if="backType == 1"
            >{{ $t("fileManagerEditor.backViaHistory") }}</el-button
          >
        </div>
      </div>
      <div v-show="!error" style="overflow: auto">
        <div
          id="editor"
          style="height: 70vh"
          class="editor-code-font"
          @keyup.ctrl.S="this.onkeydown"
        ></div>
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
  components: {
    Panel
  },
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
      editor: null,
      editorSettings: {
        highlightActiveLine: true,
        readOnly: false,
        showInvisibles: true,
        wrapMode: true,
        enableMultiselect: true,
        showLineNumbers: true,
        behavioursEnabled: true,
        fontSize: parseInt(localStorage.getItem("editorFontSize") || 16),
        theme: localStorage.getItem("editorTheme") || "monokai"
      },
      editorThemes: [
        "ambiance",
        "chaos",
        "chrome",
        "clouds_midnight",
        "clouds",
        "cobalt",
        "crimson_editor",
        "dawn",
        "dracula",
        "dreamweaver",
        "eclipse",
        "github",
        "gob",
        "gruvbox",
        "idle_fingers",
        "iplastic",
        "katzenmilch",
        "kr_theme",
        "kuroir",
        "merbivore_soft",
        "merbivore",
        "mono_industrial",
        "monokai",
        "nord_dark",
        "pastel_on_dark",
        "solarized_dark",
        "solarized_light",
        "sqlserver",
        "terminal",
        "textmate",
        "tomorrow_night",
        "tomorrow_night_blue",
        "tomorrow_night_bright",
        "tomorrow_night_eighties",
        "tomorrow",
        "twilight",
        "vibrant_ink",
        "xcode"
      ],
      editStatus: null,
      editorHotKey: false
    };
  },
  async mounted() {
    await this.render();
    this.editor = window.ace.edit("editor");
    this.editor.setTheme("ace/theme/" + this.editorSettings.theme);
    this.editor.setOptions({
      highlightActiveLine: this.editorSettings.highlightActiveLine,
      readOnly: this.editorSettings.readOnly,
      showInvisibles: this.editorSettings.showInvisibles,
      wrap: this.editorSettings.wrapMode,
      enableMultiselect: this.editorSettings.enableMultiselect,
      showPrintMargin: false,
      showLineNumbers: this.editorSettings.showLineNumbers,
      fontSize: this.editorSettings.fontSize
    });
    this.editor.session.on("change", () => {
      this.editStatus = "edit";
    });
    this.editor.commands.addCommand({
      name: "saveFile",
      bindKey: {
        win: "Ctrl-S",
        mac: "Command-S"
      },
      exec: () => {
        this.saveFile();
        this.editStatus = "success";
      }
    });
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
    changeEditorFontsize(val) {
      this.editor.setFontSize(val);
      localStorage.setItem("editorFontSize", val);
    },
    jumpToLine() {
      this.editor.find();
      this.$prompt(window.$t("views.FileManagerEditor.006"), window.$t("CommonText.040"), {
        confirmButtonText: window.$t("CommonText.041"),
        cancelButtonText: window.$t("CommonText.042"),
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: window.$t("views.FileManagerEditor.007")
      }).then(({ value }) => {
        this.$message({
          type: "success",
          message: window.$t("views.FileManagerEditor.008") + value + window.$t("CommonText.043")
        });
        this.editor.gotoLine(value);
      });
    },
    setWrapMode(val) {
      this.editor.getSession().setUseWrapMode(val);
    },
    setHighlightActiveLine(val) {
      this.editor.setOption("highlightActiveLine", val);
    },
    setReadOnly(val) {
      this.editor.setOption("readOnly", val);
    },
    setShowInvisibles(val) {
      this.editor.setOption("showInvisibles", val);
    },
    setEnableMultiselect(val) {
      this.editor.setOption("enableMultiselect", val);
    },
    setShowLineNumbers(val) {
      this.editor.setOption("showLineNumbers", val);
    },
    setBehavioursEnabled(val) {
      this.editor.setOption("behavioursEnabled", val);
    },
    changeEditorTheme(val) {
      this.editor.setTheme("ace/theme/" + val);
      localStorage.setItem("editorTheme", val);
    },
    toHotKey() {
      window.open("https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts");
    },
    async refresh() {
      await this.render();
      this.$message({
        message: this.$t("general.refreshFinish"),
        type: "success"
      });
    },
    async backTerminal() {
      this.$router.push({
        path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/`
      });
    },
    async back() {
      if (this.editStatus === "edit") {
        this.$confirm(window.$t("views.FileManagerEditor.009"), window.$t("CommonText.040"), {
          confirmButtonText: window.$t("CommonText.041"),
          cancelButtonText: window.$t("CommonText.042"),
          type: "warning"
        }).then(() => {
          this.$router.push({
            path: `/file/${this.serviceUuid}/${this.instanceUuid}/`,
            query: {
              path: path.dirname(this.target)
            }
          });
        });
      } else {
        this.$router.push({
          path: `/file/${this.serviceUuid}/${this.instanceUuid}/`,
          query: {
            path: path.dirname(this.target)
          }
        });
      }
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
      this.$message({
        message: this.$t("fileManagerEditor.updateTextSuccess"),
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
.editor-code-font {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", "Droid Sans Mono",
    monospace;
  font-size: 16px;
  white-space: pre-wrap;
}
</style>
