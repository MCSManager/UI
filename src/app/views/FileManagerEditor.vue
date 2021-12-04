<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-09-03 16:45:24
 * @Description: 
-->

<template>
  <Panel>
    <template #title>编辑文件 {{ target }}</template>
    <template #default>
      <div class="instance-table-warpper">
        <div>
          <ItemGroup>
            <el-button size="small" type="success" @click="saveFile">
              <i class="el-icon-refresh"></i> 更新文件
            </el-button>
            <el-button size="small" @click="refresh">
              <i class="el-icon-refresh"></i> 刷新
            </el-button>
            <el-button size="small" @click="back" v-if="!backType">
              <i class="el-icon-pie-chart"></i> 回到文件列表
            </el-button>
          </ItemGroup>
        </div>
        <div>
          <el-button size="small" @click="backViaHistory" type="primary" plain v-if="backType == 1">
            回到简单编辑视图
          </el-button>
        </div>
      </div>
      <div v-show="!error" style="overflow: auto">
        <!-- <textarea :value="value" id="mcode-editor" style="display:none"></textarea> -->
        <div id="editor" style="height: 70vh" class="editor-code-font"></div>
      </div>
      <div v-show="error" style="padding: 16px 0px">
        <el-alert title="编辑文件错误" type="error" :description="error" show-icon></el-alert>
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
      // 文件编辑功能
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
    if (extName === ".yml" || extName === ".yaml") this.editor.session.setMode("ace/mode/yaml");
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
    this.editor.setValue(this.edit.text);
  },
  methods: {
    async refresh() {
      await this.render();
      this.$message({ message: "已刷新", type: "success" });
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
    // 编辑文件
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

    // 保存文件
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
      this.$message({ message: "更新文本成功", type: "success" });
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
