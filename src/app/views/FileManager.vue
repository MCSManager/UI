<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-08-01 19:47:34
 * @Description: 
-->

<template>
  <Panel>
    <template #title>文件管理</template>
    <template #default>
      <div class="instance-table-warpper">
        <div>
          <el-button size="small" type="primary" @click="refresh">
            <i class="el-icon-refresh"></i> 刷新
          </el-button>
          <el-button size="small" @click="back">
            <i class="el-icon-pie-chart"></i> 回到控制台
          </el-button>
        </div>
        <div>
          <el-button size="small" @click="mkdir">
            <i class="el-icon-folder-add"></i> 新建目录
          </el-button>
          <el-button size="small"> <i class="el-icon-box"></i> 压缩 </el-button>
          <el-button size="small"> <i class="el-icon-files"></i> 解压 </el-button>
          <el-button size="small" @click="rename">
            <i class="el-icon-document"></i> 重命名
          </el-button>
          <el-button size="small" @click="move"> <i class="el-icon-scissors"></i> 剪切 </el-button>
          <el-button size="small" @click="copy">
            <i class="el-icon-document-copy"></i> 复制
          </el-button>
          <el-button size="small" @click="paste"> <i class="el-icon-tickets"></i> 粘贴 </el-button>
          <el-button size="small" type="success" @click="upload">
            <i class="el-icon-plus"></i> 上传文件
          </el-button>
          <el-button size="small" type="danger">
            <i class="el-icon-document-delete"></i> 删除
          </el-button>
        </div>
      </div>

      <div v-show="percentComplete > 0">
        <el-progress
          :text-inside="true"
          :stroke-width="14"
          :percentage="percentComplete"
        ></el-progress>
      </div>

      <p>当前目录: {{ this.currentDir }}</p>

      <el-table
        :data="files"
        stripe
        style="width: 100%"
        size="mini"
        ref="multipleTable"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="文件命令" min-width="240">
          <template #default="scope">
            <div
              v-if="scope.row.type == 0"
              class="filemanager-item-dir"
              @click="toDir(scope.row.name)"
            >
              <i class="el-icon-folder"></i>
              <span>{{ scope.row.name }}</span>
            </div>
            <div v-if="scope.row.type == 1" class="filemanager-item-file">
              <i class="el-icon-document"></i>
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="typeText" label="文件类型" width="120"></el-table-column>
        <el-table-column prop="size" label="文件大小" width="140"></el-table-column>
        <el-table-column prop="timeText" label="最后修改" width="160"></el-table-column>
        <el-table-column label="操作" style="text-align: center" width="180">
          <template #default="scope">
            <el-button size="mini" :disabled="scope.row.type != 1" @click="editFile(scope.row)">
              编辑
            </el-button>
            <el-button size="mini" :disabled="scope.row.type != 1" @click="download(scope.row)">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <!-- 编辑框 -->
  <Dialog v-model="edit.isOpenEdit" :cancel="cancelSaveFile">
    <template #title>文件 {{ edit.fileName }}</template>
    <template #default>
      <div class="file-code-editor-wrapper" style="height: 560px; width: 100%">
        <div id="file-code-editor" style="height: 540px; width: 1024px"></div>
      </div>
      <el-button type="success" size="small" @click="saveFile"> 保存 </el-button>
      <el-button type="danger" size="small" @click="cancelSaveFile"> 取消 </el-button>
    </template>
  </Dialog>

  <!-- 隐藏的文件上传按钮 -->
  <input type="file" ref="fileButtonHidden" @change="selectedFile" hidden="hidden" />
</template>

<script>
// import * as monaco from "monaco-editor";
// import * as CodeMirror from "codemirror";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/idea.css";
// import "codemirror/mode/javascript/javascript.js";
// import "codemirror/mode/css/css.js";
// import "codemirror/mode/xml/xml.js";
// import "codemirror/mode/shell/shell.js";
// import "codemirror/mode/sql/sql.js";
// import "codemirror/addon/hint/anyword-hint.js";
// import "codemirror/addon/hint/css-hint.js";
// import "codemirror/addon/hint/html-hint.js";
// import "codemirror/addon/hint/javascript-hint.js";
// import "codemirror/addon/hint/show-hint.css";
// import "codemirror/addon/hint/show-hint.js";
// import "codemirror/addon/hint/sql-hint.js";
// import "codemirror/addon/hint/xml-hint.js";
// import "codemirror/addon/merge/merge.js";
// import "codemirror/addon/merge/merge.css";

// eslint-disable-next-line no-unused-vars
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

import { CodeJar } from "codejar";
import { withLineNumbers } from "codejar/linenumbers";

import Dialog from "../../components/Dialog";
import Panel from "../../components/Panel";
import axios from "axios";
import {
  API_FILE_COPY,
  API_FILE_DOWNLOAD,
  API_FILE_LIST,
  API_FILE_MKDIR,
  API_FILE_MOVE,
  API_FILE_UPLOAD,
  API_FILE_URL
} from "../service/common";
import path from "path";
import { request } from "../service/protocol";

export default {
  components: { Panel, Dialog },
  data() {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      multipleSelection: [],
      files: [],
      currentDir: "/",
      percentComplete: -1,
      uploadConfig: {
        addr: "",
        password: ""
      },

      // 移动，复制，粘贴文件所需数据
      tmpFile: {
        tmpFileNames: null,
        tmpOperationMode: -1,
        tmpDir: null
      },

      // 文件编辑功能
      edit: {
        isOpenEdit: false,
        text: "",
        fileName: ""
      },

      editor: null,
      value: "function a(){}",
      highlighterThrottle: null,
      highlighterThrottleb: false
    };
  },
  async mounted() {
    // 创建在线代码编辑器
    const editor = document.querySelector("#file-code-editor");
    const highlightFunc = (editor) => {
      const code = editor.textContent;
      editor.innerHTML = code;
      // editor.innerHTML = highlight(code, languages.js);
    };
    this.editor = CodeJar(editor, withLineNumbers(highlightFunc), {
      history: false,
      spellcheck: false,
      catchTab: false,
      preserveIdent: false,
      addClosing: false
    });

    await this.render();
  },
  unmounted() {},
  methods: {
    back() {
      this.$router.push({ path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    async refresh() {
      await this.render();
      this.$message({ message: "已刷新", type: "success" });
    },
    async render() {
      await this.list(this.currentDir);
    },
    // 进入某目录
    async toDir(name) {
      try {
        let p = ".";
        if (name == "返回上层") p = path.normalize(path.join(this.currentDir, "../"));
        else p = path.normalize(path.join(this.currentDir, name));
        await this.list(p);
      } catch (error) {
        this.$message({ message: "错误，无法查看此目录或文件", type: "error" });
      }
    },

    // 目录 List 功能
    async list(cwd = ".") {
      const data = await request({
        method: "GET",
        url: API_FILE_LIST,
        params: {
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid,
          target: cwd
        }
      });
      this.currentDir = path.normalize(cwd);
      this.tableFilter(data);
    },

    // 表格数据处理
    tableFilter(filesData) {
      this.files = [];
      // 存放返回上层目录
      this.files.push({
        name: "返回上层",
        type: 0,
        size: 0,
        typeText: "目录",
        timeText: "--"
      });

      for (const iterator of filesData) {
        const typeText = iterator.type == 1 ? "文件" : "目录";
        const timeText =
          new Date(iterator.time).toLocaleDateString() +
          " " +
          new Date(iterator.time).toLocaleTimeString();
        this.files.push({
          name: iterator.name,
          type: iterator.type,
          size: iterator.size,
          typeText: typeText,
          timeText: timeText
        });
      }
    },

    // 表格多选函数
    selectionChange(v) {
      this.multipleSelection = v;
    },

    // 表格文件数据转名字列表
    multipleFileToNames(arr = []) {
      const res = [];
      arr.forEach((v) => res.push(v.name));
      return res;
    },

    multipleFileJoinPath(arr = [], dir = null) {
      const res = [];
      arr.forEach((name) => {
        res.push(path.normalize(path.join(dir ? dir : this.currentDir, name)));
      });
      return res;
    },

    // 重命名文件
    async rename() {
      try {
        if (this.multipleSelection.length !== 1) throw new Error("必须选择一个文件进行重命名操作");
        const file = this.multipleSelection[0];
        const { value } = await this.$prompt("新的名字");
        const oldFilePath = path.join(this.currentDir, file.name);
        const newFilePath = path.join(this.currentDir, value);
        await request({
          method: "PUT",
          url: API_FILE_MOVE,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          },
          data: {
            targets: [[oldFilePath, newFilePath]]
          }
        });
        this.$message({ message: "操作成功", type: "success" });
        this.render();
      } catch (error) {
        this.$message({ message: `错误:${error.message}`, type: "error" });
      }
    },

    // 复制文件
    async copy() {
      this.tmpFile.tmpFileNames = this.multipleFileToNames(this.multipleSelection);
      this.tmpFile.tmpDir = this.currentDir;
      this.tmpFile.tmpOperationMode = 1;
      this.$message({ message: "文件已选择，使用粘贴即可复制到其他目录", type: "info" });
    },
    // 移动文件
    async move() {
      this.tmpFile.tmpFileNames = this.multipleFileToNames(this.multipleSelection);
      this.tmpFile.tmpDir = this.currentDir;
      this.tmpFile.tmpOperationMode = 2;
      this.$message({ message: "文件已选择，使用粘贴即可移动到其他目录", type: "info" });
    },

    // 粘贴文件（根据模式发送不同的指令）
    async paste() {
      try {
        if (this.tmpFile.tmpOperationMode === -1) {
          throw new Error("未复制或剪切任何文件，无法粘贴");
        }
        const targets = [];
        this.tmpFile.tmpFileNames.forEach((v) => {
          targets.push([
            path.normalize(path.join(this.tmpFile.tmpDir, v)),
            path.normalize(path.join(this.currentDir, v))
          ]);
        });

        if (this.tmpFile.tmpOperationMode === 1) {
          await request({
            method: "POST",
            url: API_FILE_COPY,
            params: {
              remote_uuid: this.serviceUuid,
              uuid: this.instanceUuid
            },
            data: {
              targets
            }
          });
        }
        if (this.tmpFile.tmpOperationMode === 2) {
          await request({
            method: "PUT",
            url: API_FILE_MOVE,
            params: {
              remote_uuid: this.serviceUuid,
              uuid: this.instanceUuid
            },
            data: {
              targets
            }
          });
        }
        this.$message({ message: "操作成功", type: "success" });
        console.log("操作目标:", targets);
        this.render();
      } catch (error) {
        this.$message({ message: `错误:${error.message}`, type: "error" });
      } finally {
        this.tmpFile.tmpOperationMode = -1;
        this.tmpFile.tmpFileNames = null;
        this.tmpFile.tmpDir = null;
      }
    },

    // 新建目录
    async mkdir() {
      const { value } = await this.$prompt("新建目录名");
      try {
        const p = path.normalize(path.join(this.currentDir, value));
        await request({
          method: "POST",
          url: API_FILE_MKDIR,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          },
          data: {
            target: p
          }
        });
        this.$message({ message: "创建成功", type: "success" });
        this.render();
      } catch (err) {
        this.$message({ message: err, type: "error" });
      }
    },

    // 编辑文件
    async editFile(row) {
      const target = path.normalize(path.join(this.currentDir, row.name));
      const text = await request({
        method: "PUT",
        url: API_FILE_URL,
        params: {
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid
        },
        data: {
          target
        }
      });
      this.edit.text = text;
      this.edit.isOpenEdit = true;
      this.edit.fileName = row.name;
      this.value = text;
      // this.editor.setValue(this.edit.text);
      this.editor.updateCode(this.edit.text);

      // 新建代码编辑器
      // eslint-disable-next-line no-undef

      // this.editor.setValue(this.edit.text.toString());
      // setTimeout(() => {
      //   this.editor.refresh();
      // }, 1000);
      // setTimeout(() => {
      //   this.editor.refresh();
      // }, 1000);
    },

    // 取消保存文件
    async cancelSaveFile() {
      this.edit.text = "";
      this.edit.fileName = "";
      this.edit.isOpenEdit = false;
    },

    // 保存文件
    async saveFile() {
      this.edit.text = this.editor.toString();
      const target = path.normalize(path.join(this.currentDir, this.edit.fileName));
      await request({
        method: "PUT",
        url: API_FILE_URL,
        params: {
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid
        },
        data: {
          text: this.edit.text,
          target
        }
      });
      this.edit.text = "";
      this.edit.fileName = "";
      this.edit.isOpenEdit = false;
      // this.editor.toTextArea();
      this.$message({ message: "更新文本成功", type: "success" });
    },

    // 文件已选择，开始上传
    async selectedFile() {
      try {
        const file = this.$refs.fileButtonHidden.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("source", "MCSManager/FileManager");
        formData.append("time", new Date().toUTCString());
        const fullAddress = `http://${this.uploadConfig.addr}/upload/${this.uploadConfig.password}`;
        console.log("Req Upload:", fullAddress);
        // 上传文件
        await axios.post(fullAddress, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            this.percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log("UploadPercentComplete:", this.percentComplete);
          }
        });
        this.$message({ message: `上传完毕`, type: "success" });
        setTimeout(() => location.reload(), 1400);
      } catch (error) {
        this.$message({ message: `错误:${error}`, type: "error" });
      }
    },

    // 上传文件
    async upload() {
      const result = await axios.get(API_FILE_UPLOAD, {
        params: {
          upload_dir: this.currentDir,
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid
        }
      });
      const cfg = result.data.data;
      this.uploadConfig.addr = cfg.addr;
      this.uploadConfig.password = cfg.password;
      this.$refs.fileButtonHidden.click();
    },

    //下载
    async download(row) {
      const fileName = row.name;
      const filePath = path.normalize(path.join(this.currentDir, fileName));
      const result = await axios.get(API_FILE_DOWNLOAD, {
        params: {
          file_name: filePath,
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid
        }
      });
      const cfg = result.data.data;
      const addr = cfg.addr;
      const password = cfg.password;
      window.open(`http://${addr}/download/${password}/${fileName}`);
    }
  }
};
</script>

<style>
.filemanager-item-dir {
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}
.filemanager-item-file {
  font-size: 14px;
}
.filemanager-item-dir span {
  margin-left: 4px;
}
.filemanager-item-file span {
  margin-left: 4px;
}

.file-code-editor-wrapper {
  overflow-y: hidden;
  overflow-x: auto;
}

#file-code-editor {
  border-radius: 2px;
  background: #2d2d2d;
  color: #ccc;
  font-family: "Source Code Pro", Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  letter-spacing: normal;
  line-height: 1.5;
  padding: 5px;
  overflow-x: hidden;
  tab-size: 4;
  padding: 4px;
}

.codejar-linenumbers {
  color: #ccc;
  font-family: "Source Code Pro", Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  bottom: 20px;
  padding-left: 8px;
}
</style>
