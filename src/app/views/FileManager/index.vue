<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div v-menus:right="menus">
    <Panel>
      <template #title>
        <span id="fileManagerTop">
          {{ $t("fileManager.title") }}
        </span>
      </template>
      <template #default>
        <div>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <FunctionGroup :container="true">
                <FunctionComponent>
                  <el-button size="small" @click="back">
                    <i class="el-icon-pie-chart"></i> {{ $t("schedule.backToConsole") }}
                  </el-button>
                </FunctionComponent>

                <FunctionComponent>
                  <el-button size="small" @click="refresh">
                    <i class="el-icon-refresh"></i> {{ $t("general.refresh") }}
                  </el-button>
                </FunctionComponent>

                <FunctionGroup align="right">
                  <FunctionComponent>
                    <el-button size="small" @click="toUpDir">
                      <i class="el-icon-pie-chart"></i> {{ $t("fileManager.upperDir") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="mkdir">
                      <i class="el-icon-folder-add"></i> {{ $t("fileManager.mkdir") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="compress(1)">
                      <i class="el-icon-box"></i> {{ $t("fileManager.zip") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="compress(2)">
                      <i class="el-icon-files"></i> {{ $t("fileManager.unzip") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="rename">
                      <i class="el-icon-document"></i> {{ $t("fileManager.rename") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="move">
                      <i class="el-icon-scissors"></i> {{ $t("fileManager.cut") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="copy">
                      <i class="el-icon-document-copy"></i> {{ $t("fileManager.copy") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="paste">
                      <i class="el-icon-tickets"></i> {{ $t("fileManager.paste") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" type="danger" @click="deleteFiles">
                      <i class="el-icon-document-delete"></i> {{ $t("general.delete") }}
                    </el-button>
                  </FunctionComponent>
                </FunctionGroup>

                <FunctionComponent>
                  <el-upload
                    action=""
                    ref="fileForm"
                    :before-upload="handleUploadBefore"
                    :auto-upload="true"
                    :show-file-list="false"
                    :limit="1"
                    style="display: inline-block"
                  >
                    <el-button size="small" type="success" @click="upload">
                      <i class="el-icon-plus"></i> {{ $t("fileManager.uploadFile") }}
                    </el-button>
                  </el-upload>
                </FunctionComponent>
              </FunctionGroup></el-col
            >
          </el-row>
        </div>

        <div class="row-mt page-pagination">
          <div>
            <div v-if="statusInfo.instanceFileTask">
              <span>
                <i class="el-icon-loading"></i>
              </span>
              <span>
                {{ $t("fileManager.unzipInfo", { tasks: statusInfo.instanceFileTask }) }}</span
              >
            </div>
          </div>

          <div>
            <el-pagination
              small
              background
              layout="prev, pager, next"
              v-model:currentPage="pageParam.page"
              :page-size="pageParam.pageSize"
              :total="pageParam.total"
              @current-change="currentChange"
            />
          </div>
        </div>

        <div class="row-mt" v-show="percentComplete > 0">
          <el-progress
            :text-inside="true"
            :stroke-width="14"
            :percentage="percentComplete"
          ></el-progress>
        </div>

        <p>
          <el-tag type="success" size="small">{{ $t("fileManager.dir") }}</el-tag>
          &nbsp;
          <el-tag type="info" size="small"> {{ currentDir }}</el-tag>
        </p>

        <el-table
          :data="files"
          stripe
          style="width: 100%"
          size="mini"
          ref="multipleTable"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" :label="$t('fileManager.name')" min-width="240">
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
          <el-table-column
            prop="typeText"
            :label="$t('fileManager.fileType')"
            width="120"
            class="only-pc-display"
          ></el-table-column>
          <el-table-column :label="$t('fileManager.fileSize')" width="140">
            <template #default="scope">
              <span v-if="scope.row.size > 1024 * 1024"
                >{{ Number(Number(scope.row.size) / 1024 / 1024).toFixed(0) }} MB</span
              >
              <span v-else-if="scope.row.size > 1024"
                >{{ Number(Number(scope.row.size) / 1024).toFixed(0) }} KB</span
              >
              <span v-else-if="scope.row.size > 0"
                >{{ Number(Number(scope.row.size)).toFixed(0) }} B</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="timeText"
            :label="$t('fileManager.lastEdit')"
            width="160"
          ></el-table-column>
          <el-table-column :label="$t('general.operate')" style="text-align: center" width="180">
            <template #default="scope">
              <el-button
                size="mini"
                :disabled="scope.row.type != 1"
                @click="toEditFilePage(scope.row)"
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button size="mini" :disabled="scope.row.type != 1" @click="download(scope.row)">
                {{ $t("fileManager.download") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="row-mt page-pagination">
          <div>
            <el-link type="primary" :underline="false" href="javascript:void(0);">-</el-link>
          </div>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            v-model:currentPage="pageParam.page"
            :page-size="pageParam.pageSize"
            :total="pageParam.total"
            @current-change="currentChange"
          />
        </div>
      </template>
    </Panel>

    <SelectUnzipCode ref="selectUnzipCode"></SelectUnzipCode>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
import axios from "axios";
import {
  API_FILE_COMPRESS,
  API_FILE_COPY,
  API_FILE_DOWNLOAD,
  API_FILE_LIST,
  API_FILE_MKDIR,
  API_FILE_MOVE,
  API_FILE_UPLOAD,
  API_FILE_URL
} from "@/app/service/common";
import path from "path";
import { parseforwardAddress, request } from "@/app/service/protocol";
import SelectUnzipCode from "./selectUnzipCode";
import { API_FILE_STATUS } from "../../service/common";
import { defineComponent, ref } from "vue";
import { directive } from 'vue3-menus';

export default defineComponent({
  components: { Panel, SelectUnzipCode },
  directives: {
    menus: directive
  },
  setup() {
    const menus = ref([
        // {
        //   label: "返回(B)",
        //   tip: 'Alt+向左箭头',
        //   click: () => {
        //     window.history.back();
        //   }
        // },
        {
          label: "返回上层",
          tip: '👆',
          click: () => {
            this.refresh();
          }
        },{
          label: "复制",
          tip: '',
          click: () => {
            return false;
          }
        },{
          label: "粘贴",
          tip: '',
          click: () => {
            return false;
          }
        },{
          label: "剪切",
          tip: '',
          click: () => {
            return false;
          }
        },{
          label: "重命名",
          tip: '',
          click: () => {
            return false;
          }
        },{
          label: "删除",
          tip: '',
          click: () => {
            return false;
          }
        },
        {
          label: "新建目录",
          tip: '',
          click: () => {
            return false;
          }
        },
        {
          label: "压缩",
          tip: '',
          click: () => {
            return false;
          }
        },
        {
          label: "解压",
          tip: '',
          click: () => {
            return false;
          }
        },
        
      ]
    );
    return { menus }
  },
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
      pageParam: {
        page: 1,
        pageSize: 30,
        total: 1
      },

      paramPath: this.$route.query.path,

      // Move, copy, paste the required data of the file
      tmpFile: {
        tmpFileNames: null,
        tmpOperationMode: -1,
        tmpDir: null
      },

      statusInfo: {},
      statusRequestTask: null
    };
  },
  async mounted() {
    if (this.paramPath) {
      this.currentDir = this.paramPath;
    }
    await this.render();

    // Start the file management status query timer
    this.requestFileManagerStatus();
    this.statusRequestTask = setInterval(() => {
      this.requestFileManagerStatus();
    }, 3000);
  },
  beforeUnmount() {
    clearInterval(this.statusRequestTask);
  },
  methods: {
    back() {
      this.$router.push({ path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/` });
    },
    async refresh() {
      await this.render();
      this.$message({ message: this.$t("general.refreshFinish"), type: "success" });
    },
    async render() {
      await this.list(this.currentDir);
    },
    // enter a directory
    async toDir(name) {
      try {
        const p = path.normalize(path.join(this.currentDir, name));
        await this.list(p);
      } catch (error) {
        this.$message({ message: this.$t("fileManager.noSee"), type: "error" });
      }
    },
    // return to the upper directory
    async toUpDir() {
      const p = path.normalize(path.join(this.currentDir, "../"));
      await this.list(p);
    },

    // Directory next page or previous page event
    currentChange() {
      this.toDir(".");
    },

    // Directory List function
    async list(cwd = ".") {
      this.$route.query.path = cwd;
      try {
        const data = await request({
          method: "GET",
          url: API_FILE_LIST,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid,
            target: cwd,
            page: parseInt(this.pageParam.page) - 1,
            page_size: this.pageParam.pageSize
          }
        });
        const { items, total, page } = data;
        this.currentDir = path.normalize(cwd);
        this.tableFilter(items);
        this.pageParam.total = total;
        this.pageParam.page = page + 1;
      } catch (error) {
        this.$message({ message: error, type: "error" });
      }
    },

    // table data processing
    tableFilter(filesData) {
      this.files = [];

      for (const iterator of filesData) {
        const typeText =
          iterator.type == 1 ? this.$t("fileManager.file") : this.$t("fileManager.directory");
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

    // table multi-select function
    selectionChange(v) {
      this.multipleSelection = v;
    },

    // table file data to name list
    multipleFileToNames(arr = []) {
      const res = [];
      arr.forEach((v) => res.push(v.name));
      return res;
    },

    fileNamesToPaths(fileNames = []) {
      const targets = [];
      fileNames.forEach((v) => {
        targets.push(path.normalize(path.join(this.currentDir, v)));
      });
      return targets;
    },

    multipleFileJoinPath(arr = [], dir = null) {
      const res = [];
      arr.forEach((name) => {
        res.push(path.normalize(path.join(dir ? dir : this.currentDir, name)));
      });
      return res;
    },

    // rename the file
    async rename() {
      try {
        if (this.multipleSelection.length !== 1)
          throw new Error(this.$t("fileManager.selectFileToRename"));
        const file = this.multipleSelection[0];
        let { value } = await this.$prompt(
          this.$t("fileManager.newName"),
          this.$t("fileManager.rename"),
          {
            inputValue: file.name,
            confirmButtonText: this.$t("general.confirm"),
            cancelButtonText: this.$t("general.cancel")
          }
        );
        if (!value) throw new Error(this.$t("fileManager.inputValidValues"));
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
        this.$message({ message: this.$t("fileManager.setSuccess"), type: "success" });
        this.render();
      } catch (error) {
        if (error && error.message)
          this.$message({ message: `Error: ${error.message}`, type: "error" });
      }
    },

    // copy the file
    async copy() {
      this.tmpFile.tmpFileNames = this.multipleFileToNames(this.multipleSelection);
      this.tmpFile.tmpDir = this.currentDir;
      this.tmpFile.tmpOperationMode = 1;
      this.$message({ message: this.$t("fileManager.fileCopied"), type: "info" });
    },
    // move the file
    async move() {
      this.tmpFile.tmpFileNames = this.multipleFileToNames(this.multipleSelection);
      this.tmpFile.tmpDir = this.currentDir;
      this.tmpFile.tmpOperationMode = 2;
      this.$message({ message: this.$t("fileManager.fileMoved"), type: "info" });
    },

    // Paste the file (send different commands according to the mode)
    async paste() {
      try {
        if (this.tmpFile.tmpOperationMode === -1) {
          throw new Error(this.$t("fileManager.cantCopy"));
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
        this.$message({ message: this.$t("fileManager.setSuccess"), type: "success" });
        this.render();
      } catch (error) {
        this.$message({ message: `Error :${error.message}`, type: "error" });
      } finally {
        this.tmpFile.tmpOperationMode = -1;
        this.tmpFile.tmpFileNames = null;
        this.tmpFile.tmpDir = null;
      }
    },

    // create a new directory
    async mkdir() {
      const { value } = await this.$prompt(this.$t("fileManager.newDirName"), undefined, {
        confirmButtonText: this.$t("general.confirm"),
        cancelButtonText: this.$t("general.cancel")
      });
      try {
        if (!value) throw new Error(this.$t("fileManager.inputValidValues"));
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
        this.$message({ message: this.$t("notify.createSuccess"), type: "success" });
        this.render();
      } catch (err) {
        this.$message({ message: err, type: "error" });
      }
    },

    // edit the file
    async toEditFilePage(row) {
      const target = path.normalize(path.join(this.currentDir, row.name));
      this.$router.push({
        path: `/file_editor/${this.serviceUuid}/${this.instanceUuid}/`,
        query: {
          target
        }
      });
    },

    // Delete Files
    async deleteFiles() {
      await this.$confirm(this.$t("fileManager.confirmDelFile"), this.$t("general.warn"), {
        confirmButtonText: this.$t("general.confirm"),
        cancelButtonText: this.$t("general.cancel"),
        type: "warning"
      });
      try {
        const fileNames = this.multipleFileToNames(this.multipleSelection);
        const targets = this.fileNamesToPaths(fileNames);
        if (fileNames.length === 0)
          return this.$message({ message: this.$t("fileManager.selectAFile"), type: "error" });
        await request({
          method: "DELETE",
          url: API_FILE_URL,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          },
          data: {
            targets
          }
        });
        this.$message({
          message: this.$t("fileManager.delFileStart"),
          type: "success"
        });
        this.render();
      } catch (error) {
        this.$message({ message: `Error: ${error}`, type: "error" });
        this.render();
      }
    },

    // compress/decompress the file
    async compress(type) {
      const cwd = this.currentDir;
      try {
        const fileNames = this.multipleFileToNames(this.multipleSelection);
        if (fileNames.length === 0)
          return this.$message({ message: this.$t("fileManager.selectAFile"), type: "error" });
        const targets = this.fileNamesToPaths(fileNames);
        if (type === 1) {
          //compression
          const text = await this.$prompt(
            this.$t("fileManager.newZipName"),
            this.$t("fileManager.fileName"),
            {
              confirmButtonText: this.$t("general.confirm"),
              cancelButtonText: this.$t("general.cancel")
            }
          );
          if (!text.value) throw new Error(this.$t("fileManager.inputValidValues"));
          const zipName = text.value;
          for (const k in fileNames) {
            fileNames[k] = path.join(cwd, fileNames[k]);
          }
          await request({
            method: "POST",
            url: API_FILE_COMPRESS,
            params: {
              remote_uuid: this.serviceUuid,
              uuid: this.instanceUuid
            },
            data: {
              type: 1,
              source: path.join(cwd, `${zipName}.zip`),
              targets,
              code: "utf-8" // The decompression file function module does not support other encodings temporarily
            }
          });
          this.$notify({
            title: this.$t("fileManager.zipTaskStart"),
            message: this.$t("fileManager.zipTaskStartInfo")
          });
        } else {
          if (fileNames.length !== 1)
            return this.$message({ message: this.$t("fileManager.onlyUnzipOne"), type: "error" });
          // decompress
          const text = await this.$prompt(
            this.$t("fileManager.inputUnzipDirName"),
            this.$t("fileManager.fileName"),
            {
              confirmButtonText: this.$t("general.confirm"),
              cancelButtonText: this.$t("general.cancel")
            }
          );
          if (!text.value) throw new Error(this.$t("fileManager.inputValidValues"));
          const selected = await this.$refs.selectUnzipCode.prompt();
          if (!selected) return;
          const dirName = text.value;
          await request({
            method: "POST",
            url: API_FILE_COMPRESS,
            params: {
              remote_uuid: this.serviceUuid,
              uuid: this.instanceUuid
            },
            data: {
              type: 2,
              source: path.join(cwd, fileNames[0]),
              targets: path.join(cwd, dirName),
              code: selected
            }
          });
          this.$notify({
            title: this.$t("fileManager.UnzipTaskStart"),
            message: this.$t("fileManager.UnzipTaskStartInfo")
          });
        }
      } catch (error) {
        this.$message({ message: error.message || error, type: "error" });
      }
    },

    // file is selected, start uploading
    async selectedFile(file) {
      try {
        // const file = this.$refs.fileButtonHidden.files[0];
        console.log("selectedFile:", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("source", "MCSManager/FileManager");
        formData.append("time", new Date().toUTCString());
        const fullAddress = `${this.uploadConfig.addr}/upload/${this.uploadConfig.password}`;
        console.log("Upload File", fullAddress);
        // upload files
        await axios.post(fullAddress, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            this.percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        });
        this.$message({ message: this.$t("fileManager.uploadOk"), type: "success" });
        await this.refresh();
        // this.$refs.fileForm.reset();
        this.percentComplete = -1;
      } catch (error) {
        this.$message({ message: `Error: ${error}`, type: "error" });
      }
    },

    // upload files
    async upload() {
      const result = await axios.get(API_FILE_UPLOAD, {
        params: {
          upload_dir: this.currentDir,
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid
        }
      });
      const cfg = result.data.data;
      this.uploadConfig.addr = parseforwardAddress(cfg.addr, "http");
      this.uploadConfig.password = cfg.password;
      // this.$refs.fileButtonHidden.click();
    },

    //download
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
      const addr = parseforwardAddress(cfg.addr, "http");
      const password = cfg.password;
      window.open(`${addr}/download/${password}/${fileName}`);
    },

    async requestFileManagerStatus() {
      const status = await request({
        method: "GET",
        url: API_FILE_STATUS,
        params: {
          remote_uuid: this.serviceUuid,
          uuid: this.instanceUuid
        }
      });
      this.statusInfo = status;
    },

    async handleUploadBefore(v) {
      await this.upload();
      await this.selectedFile(v);
      return new Promise((o, j) => j(false));
    }
  }
});
</script>

<style scoped>
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
.page-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #409eff;
}
</style>
