<template>
  <div>
    <Panel v-menus:right="menus">
      <template #title>
        <span id="fileManagerTop">{{ $t("fileManager.title") }}</span>
      </template>
      <template #default>
        <div>
          <el-row :gutter="10">
            <el-col :md="18">
              <div class="dir-node-container row-mb">
                <div class="dir-node dir-node-back-btn" @click="toUpDir">
                  <i class="el-icon-caret-left"></i>
                </div>
                <div
                  class="flex flex-align-items-center"
                  v-for="(item, index) in currentDirArray"
                  :key="index"
                >
                  <div
                    class="dir-node"
                    :style="{ 'padding-left': index == 0 ? '8px' : '4px' }"
                    v-if="item"
                    @click="changeDir(item.value)"
                  >
                    {{ item.label }}
                  </div>
                  <i class="el-icon-arrow-right" v-if="index < currentDirArray.length - 1"></i>
                </div>
              </div>
            </el-col>
            <el-col :md="6">
              <div class="flex flex-space-center flex-align-items-center row-mb">
                <el-input
                  v-model="searchFileName"
                  :placeholder="$t('fileManager.searchFile')"
                  size="small"
                  style="width: 100%"
                  @change="searchFile"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="24" :offset="0">
              <FunctionGroup :container="true">
                <FunctionComponent>
                  <el-button size="small" type="primary" plain @click="back">
                    <i class="el-icon-pie-chart"></i>
                    {{ $t("schedule.backToConsole") }}
                  </el-button>
                </FunctionComponent>

                <FunctionComponent>
                  <el-button size="small" @click="refresh">
                    <i class="el-icon-refresh"></i>
                    {{ $t("general.refresh") }}
                  </el-button>
                </FunctionComponent>

                <FunctionGroup align="right">
                  <FunctionComponent>
                    <el-button size="small" @click="touch">
                      <i class="el-icon-document-add"></i>
                      {{ $t("fileManager.touch") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="mkdir">
                      <i class="el-icon-folder-add"></i>
                      {{ $t("fileManager.mkdir") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="compress(1)">
                      <i class="el-icon-box"></i>
                      {{ $t("fileManager.zip") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="compress(2)">
                      <i class="el-icon-files"></i>
                      {{ $t("fileManager.unzip") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="move">
                      <i class="el-icon-scissors"></i>
                      {{ $t("fileManager.cut") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="copy">
                      <i class="el-icon-document-copy"></i>
                      {{ $t("fileManager.copy") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="paste">
                      <i class="el-icon-tickets"></i>
                      {{ $t("fileManager.paste") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" @click="rename">
                      <i class="el-icon-document"></i>
                      {{ $t("fileManager.rename") }}
                    </el-button>
                  </FunctionComponent>
                  <FunctionComponent>
                    <el-button size="small" type="danger" @click="deleteFiles">
                      <i class="el-icon-document-delete"></i>
                      {{ $t("general.delete") }}
                    </el-button>
                  </FunctionComponent>
                </FunctionGroup>

                <FunctionComponent>
                  <el-upload
                    action
                    ref="fileForm"
                    :before-upload="handleUploadBefore"
                    :auto-upload="true"
                    :show-file-list="false"
                    :limit="1"
                    style="display: inline-block"
                  >
                    <el-button size="small" type="success" @click="upload">
                      <i class="el-icon-plus"></i>
                      {{ $t("fileManager.uploadFile") }}
                    </el-button>
                  </el-upload>
                </FunctionComponent>
              </FunctionGroup>
            </el-col>
          </el-row>
        </div>

        <div class="row-mt page-pagination" v-if="statusInfo.disks && statusInfo.isGlobalInstance">
          <div>
            <el-button
              icon="el-icon-receiving"
              v-for="item in statusInfo.disks"
              size="small"
              :key="item"
              @click="toDisk(item)"
              type="success"
              plain
              >{{ $t("fileManager.disk") }} {{ item }}</el-button
            >
          </div>
        </div>

        <div class="row-mt page-pagination">
          <div>
            <div v-if="statusInfo.instanceFileTask">
              <span>
                <i class="el-icon-loading"></i>
              </span>
              <span>{{ $t("fileManager.unzipInfo", { tasks: statusInfo.instanceFileTask }) }}</span>
            </div>
          </div>
        </div>

        <div class="row-mt" v-show="percentComplete > 0">
          <el-progress
            :text-inside="true"
            :stroke-width="14"
            :percentage="percentComplete"
          ></el-progress>
        </div>

        <el-table
          :data="files"
          stripe
          style="width: 100%"
          size="mini"
          ref="multipleTable"
          @selection-change="selectionChange"
          @row-contextmenu="fileRightClick"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" :label="$t('fileManager.name')" min-width="100">
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
          ></el-table-column>
          <el-table-column :label="$t('fileManager.fileSize')" width="110">
            <template #default="scope">
              <span v-if="scope.row.size > 1024 * 1024 * 1024"
                >{{ Number(Number(scope.row.size) / 1024 / 1024 / 1024).toFixed(0) }} GB</span
              >
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
          <el-table-column v-if="!isWindows" :label="$t('general.permission')" width="100">
            <template #default="scope">{{ scope.row.mode }}</template>
          </el-table-column>
          <el-table-column
            prop="timeText"
            :label="$t('fileManager.lastEdit')"
            width="160"
          ></el-table-column>
          <el-table-column :label="$t('general.operate')" style="text-align: center" width="280">
            <template #default="scope">
              <el-button size="mini" v-if="!isWindows" @click="toEditFilePermission(scope.row)">{{
                $t("general.permission")
              }}</el-button>
              <el-button
                size="mini"
                :disabled="scope.row.type != 1"
                @click="toEditFilePage(scope.row)"
                >{{ $t("general.edit") }}</el-button
              >
              <el-button size="mini" :disabled="scope.row.type != 1" @click="download(scope.row)">{{
                $t("fileManager.download")
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="row-mt page-pagination">
          <div>
            <!-- <el-link type="primary" :underline="false" href="javascript:void(0);">-</el-link> -->
          </div>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            v-model:currentPage="pageParam.page"
            :page-size="pageParam.pageSize"
            :total="pageParam.total"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </template>
    </Panel>

    <SelectUnzipCode ref="selectUnzipCode"></SelectUnzipCode>

    <FloatFileEditor ref="floatFileEditor"></FloatFileEditor>

    <PermissionDialog ref="permissionDialog" @submit="refresh"></PermissionDialog>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
import FloatFileEditor from "../FloatFileEditor";
import PermissionDialog from "./PermissionDialog.vue";
import axios from "axios";
import {
  API_FILE_COMPRESS,
  API_FILE_COPY,
  API_FILE_DOWNLOAD,
  API_FILE_LIST,
  API_FILE_MKDIR,
  API_FILE_MOVE,
  API_FILE_UPLOAD,
  API_FILE_URL,
  API_FILE_TOUCH
} from "@/app/service/common";
import path from "path";
import { parseforwardAddress, request } from "@/app/service/protocol";
import SelectUnzipCode from "./selectUnzipCode";
import { API_FILE_STATUS } from "../../service/common";
import { defineComponent } from "vue";
import { directive } from "vue3-menus";
export default defineComponent({
  components: {
    Panel,
    SelectUnzipCode,
    FloatFileEditor,
    PermissionDialog
  },
  directives: {
    menus: directive
  },
  data() {
    return {
      menus: [
        {
          label: window.$t("CommonText.020"),
          click: () => {
            this.toUpDir();
          }
        },
        {
          label: window.$t("CommonText.021"),
          tip: "",
          click: () => {
            this.copy();
          }
        },
        {
          label: window.$t("CommonText.022"),
          tip: "",
          click: () => {
            this.paste();
          }
        },
        {
          label: window.$t("CommonText.023"),
          tip: "",
          click: () => {
            this.move();
          }
        },
        {
          label: window.$t("CommonText.024"),
          tip: "",
          click: () => {
            this.rename();
          }
        },
        {
          label: window.$t("CommonText.025"),
          tip: "",
          click: () => {
            this.deleteFiles();
          }
        },
        {
          label: window.$t("CommonText.026"),
          tip: "",
          click: () => {
            this.mkdir();
          }
        },
        {
          label: window.$t("CommonText.027"),
          tip: "",
          click: () => {
            this.compress(1);
          }
        },
        {
          label: window.$t("CommonText.028"),
          tip: "",
          click: () => {
            this.compress(2);
          }
        }
      ],
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
        pageSize: 20,
        total: 1
      },
      paramPath: this.$route.query.path,
      searchFileName: "",
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
  computed: {
    currentDirArray() {
      let arr = this.currentDir.split("/");
      arr = arr.filter((v) => v);
      const newArr = arr.map((v, i) => {
        const slice = arr.slice(0, i + 1);
        return {
          label: v,
          value: `${slice.join("/")}`
        };
      });
      arr = [
        {
          label: window.$t("fileManager.rootDir"),
          value: "/"
        },
        ...newArr
      ];
      return arr;
    },
    isWindows() {
      return this.statusInfo?.platform == "win32";
    }
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
      this.$router.push({
        path: `/terminal/${this.serviceUuid}/${this.instanceUuid}/`
      });
    },
    async refresh() {
      await this.render();
      this.$message({
        message: this.$t("general.refreshFinish"),
        type: "success"
      });
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
        this.$message({
          message: this.$t("fileManager.noSee"),
          type: "error"
        });
      }
    },
    // return to the upper directory
    async toUpDir() {
      this.pageParam.page = 1;
      const p = path.normalize(path.join(this.currentDir, "../"));
      await this.list(p);
    },
    // Directory next page or previous page event
    currentChange() {
      this.toDir(".");
    },
    toEditFilePermission(row) {
      row = JSON.parse(JSON.stringify(row));
      const target = path.normalize(path.join(this.currentDir, row.name));
      row.target = target;
      this.$refs.permissionDialog.prompt(row);
    },
    fileRightClick(row) {
      this.multipleSelection = [];
      this.multipleSelection.push(row);
    },
    async changeDir(cwd = ".") {
      this.pageParam.page = 1;
      return await this.list(cwd);
    },
    toDisk(name) {
      this.changeDir(name + ":\\");
    },
    async searchFile() {
      this.pageParam.page = 1;
      this.list(this.currentDir);
    },
    // Directory List function
    async list(cwd = this.currentDir) {
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
            page_size: this.pageParam.pageSize,
            file_name: this.searchFileName
          }
        });
        // eslint-disable-next-line no-unused-vars
        const { items, total, page, absolutePath } = data;

        // this.currentDir = path.normalize(absolutePath).replace(/\\/gim, "/");
        this.currentDir = path.normalize(cwd);
        this.tableFilter(items);
        this.pageParam.total = total;
        this.pageParam.page = page + 1;
      } catch (error) {
        this.$message({
          message: error,
          type: "error"
        });
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
          ...iterator,
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
        this.$message({
          message: this.$t("fileManager.setSuccess"),
          type: "success"
        });
        this.render();
      } catch (error) {
        if (error && error.message)
          this.$message({
            message: `Error: ${error.message}`,
            type: "error"
          });
      }
    },
    // copy the file
    async copy() {
      this.tmpFile.tmpFileNames = this.multipleFileToNames(this.multipleSelection);
      this.tmpFile.tmpDir = this.currentDir;
      this.tmpFile.tmpOperationMode = 1;
      this.$message({
        message: this.$t("fileManager.fileCopied"),
        type: "info"
      });
    },
    // move the file
    async move() {
      this.tmpFile.tmpFileNames = this.multipleFileToNames(this.multipleSelection);
      this.tmpFile.tmpDir = this.currentDir;
      this.tmpFile.tmpOperationMode = 2;
      this.$message({
        message: this.$t("fileManager.fileMoved"),
        type: "info"
      });
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
        this.$message({
          message: this.$t("fileManager.setSuccess"),
          type: "success"
        });
        this.render();
      } catch (error) {
        this.$message({
          message: `Error :${error.message}`,
          type: "error"
        });
      } finally {
        this.tmpFile.tmpOperationMode = -1;
        this.tmpFile.tmpFileNames = null;
        this.tmpFile.tmpDir = null;
      }
    },
    // create a new file
    async touch() {
      const { value } = await this.$prompt(this.$t("fileManager.newFileName"), undefined, {
        confirmButtonText: this.$t("general.confirm"),
        cancelButtonText: this.$t("general.cancel")
      });
      try {
        if (!value) throw new Error(this.$t("fileManager.inputValidValues"));
        const p = path.normalize(path.join(this.currentDir, value));
        await request({
          method: "POST",
          url: API_FILE_TOUCH,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          },
          data: {
            target: p
          }
        });
        this.$message({
          message: this.$t("notify.createSuccess"),
          type: "success"
        });
        this.render();
      } catch (err) {
        this.$message({
          message: err,
          type: "error"
        });
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
        this.$message({
          message: this.$t("notify.createSuccess"),
          type: "success"
        });
        this.render();
      } catch (err) {
        this.$message({
          message: err,
          type: "error"
        });
      }
    },
    // edit the file
    async toEditFilePage(row) {
      const target = path.normalize(path.join(this.currentDir, row.name));
      this.$refs.floatFileEditor.open(row, target);
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
          return this.$message({
            message: this.$t("fileManager.selectAFile"),
            type: "error"
          });
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
        this.$message({
          message: `Error: ${error}`,
          type: "error"
        });
        this.render();
      }
    },
    // compress/decompress the file
    async compress(type) {
      const cwd = this.currentDir;
      try {
        const fileNames = this.multipleFileToNames(this.multipleSelection);
        if (fileNames.length === 0)
          return this.$message({
            message: this.$t("fileManager.selectAFile"),
            type: "error"
          });
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
            return this.$message({
              message: this.$t("fileManager.onlyUnzipOne"),
              type: "error"
            });
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
        this.$message({
          message: error.message || error,
          type: "error"
        });
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
        this.$message({
          message: this.$t("fileManager.uploadOk"),
          type: "success"
        });
        await this.refresh();
        // this.$refs.fileForm.reset();
        this.percentComplete = -1;
      } catch (error) {
        this.$message({
          message: `Error: ${error}`,
          type: "error"
        });
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

<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<style lang="scss" scoped>
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

.dir-node-container {
  border: 1px solid #dcdfe6;
  /* background: #f3f3f3; */
  overflow: hidden;
  overflow-x: auto;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 4px;
  height: 30px;
  font-size: 13px;
}

.dir-node {
  font-size: 13px;
  transition: all 0.4s;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  max-width: 200px;
  height: 30px;
  padding: 0px 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dir-node-back-btn {
  font-size: 14px;
  padding: 0px 12px;
  border-right: 1px solid #cfcfcf;
}

.dir-node:hover {
  background: #f1f1f1;
}
</style>
