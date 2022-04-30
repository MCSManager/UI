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
  <Panel>
    <template #title>文件管理</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :xs="24" :md="6" :offset="0">
          <ItemGroup>
            <el-button size="small" @click="back">
              <i class="el-icon-pie-chart"></i> 回到控制台
            </el-button>
            <el-button size="small" @click="refresh">
              <i class="el-icon-refresh"></i> 刷新
            </el-button>
          </ItemGroup>
        </el-col>
        <el-col :xs="24" :md="18" :offset="0" class="text-align-right">
          <ItemGroup>
            <el-button size="small" @click="toUpDir">
              <i class="el-icon-pie-chart"></i> 上层目录
            </el-button>
            <el-button size="small" @click="mkdir">
              <i class="el-icon-folder-add"></i> 新建目录
            </el-button>
            <el-button size="small" @click="compress(1)">
              <i class="el-icon-box"></i> 压缩
            </el-button>
            <el-button size="small" @click="compress(2)">
              <i class="el-icon-files"></i> 解压
            </el-button>
            <el-button size="small" @click="rename">
              <i class="el-icon-document"></i> 重命名
            </el-button>
            <el-button size="small" @click="move">
              <i class="el-icon-scissors"></i> 剪切
            </el-button>
            <el-button size="small" @click="copy">
              <i class="el-icon-document-copy"></i> 复制
            </el-button>
            <el-button size="small" @click="paste">
              <i class="el-icon-tickets"></i> 粘贴
            </el-button>
            <el-button size="small" type="success" @click="upload">
              <i class="el-icon-plus"></i> 上传文件
            </el-button>
            <el-button size="small" type="danger" @click="deleteFiles">
              <i class="el-icon-document-delete"></i> 删除
            </el-button>
          </ItemGroup>
        </el-col>
      </el-row>

      <div class="row-mt page-pagination">
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

      <div class="row-mt" v-show="percentComplete > 0">
        <el-progress
          :text-inside="true"
          :stroke-width="14"
          :percentage="percentComplete"
        ></el-progress>
      </div>

      <p>
        <el-tag type="success" size="small">当前目录</el-tag>
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
        <el-table-column
          prop="typeText"
          label="文件类型"
          width="120"
          class="only-pc-display"
        ></el-table-column>
        <el-table-column label="文件大小" width="140">
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
        <el-table-column prop="timeText" label="最后修改" width="160"></el-table-column>
        <el-table-column label="操作" style="text-align: center" width="180">
          <template #default="scope">
            <el-button
              size="mini"
              :disabled="scope.row.type != 1"
              @click="toEditFilePage(scope.row)"
            >
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

  <!-- 隐藏的文件上传按钮 -->
  <form ref="fileForm" action="" method="post">
    <input type="file" ref="fileButtonHidden" @change="selectedFile" hidden="hidden" />
  </form>
</template>

<script>
import Panel from "../../components/Panel";
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
} from "../service/common";
import path from "path";
import { parseforwardAddress, request } from "../service/protocol";

export default {
  components: { Panel },
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

      // 移动，复制，粘贴文件所需数据
      tmpFile: {
        tmpFileNames: null,
        tmpOperationMode: -1,
        tmpDir: null
      }
    };
  },
  async mounted() {
    if (this.paramPath) {
      this.currentDir = this.paramPath;
    }
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
        const p = path.normalize(path.join(this.currentDir, name));
        console.log("EN：", p);
        await this.list(p);
      } catch (error) {
        this.$message({ message: "错误，无法查看此目录或文件", type: "error" });
      }
    },
    // 返回上层目录
    async toUpDir() {
      const p = path.normalize(path.join(this.currentDir, "../"));
      await this.list(p);
    },

    // 目录下一页或上一页事件
    currentChange() {
      this.toDir(".");
    },

    // 目录 List 功能
    async list(cwd = ".") {
      this.$route.query.path = cwd;
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
    },

    // 表格数据处理
    tableFilter(filesData) {
      this.files = [];

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

    // 重命名文件
    async rename() {
      try {
        if (this.multipleSelection.length !== 1) throw new Error("必须选择一个文件进行重命名操作");
        const file = this.multipleSelection[0];
        let { value } = await this.$prompt("新的名字", "重命名", {
          inputValue: file.name
        });
        if (!value) throw new Error("请输入一个有效值");
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
        if (error && error.message)
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
        if (!value) throw new Error("请输入一个有效值");
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
    async toEditFilePage(row) {
      const target = path.normalize(path.join(this.currentDir, row.name));
      this.$router.push({
        path: `/file_editor/${this.serviceUuid}/${this.instanceUuid}/`,
        query: {
          target
        }
      });
    },

    // 删除文件
    async deleteFiles() {
      await this.$confirm("确定要删除选中的文件吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      try {
        const fileNames = this.multipleFileToNames(this.multipleSelection);
        const targets = this.fileNamesToPaths(fileNames);
        if (fileNames.length === 0)
          return this.$message({ message: "请至少选择一个文件", type: "error" });
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
        this.$message({ message: "文件已删除", type: "success" });
        this.render();
      } catch (error) {
        this.$message({ message: `错误:${error}`, type: "error" });
        this.render();
      }
    },

    // 压缩/解压文件
    async compress(type) {
      const cwd = this.currentDir;
      try {
        const fileNames = this.multipleFileToNames(this.multipleSelection);
        if (fileNames.length === 0)
          return this.$message({ message: "请至少选择一个文件", type: "error" });
        const targets = this.fileNamesToPaths(fileNames);
        if (type === 1) {
          //压缩
          const text = await this.$prompt("新的压缩包文件名", "文件名", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          });
          if (!text.value) throw new Error("请输入一个有效值");
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
              targets
            }
          });
          this.$notify({
            title: "压缩任务已经开始",
            message: "异步压缩需要一段时间，可以利用刷新文件列表查看 zip 大小来判断是否压缩完毕"
          });
        } else {
          if (fileNames.length !== 1)
            return this.$message({ message: "解压只能同时进行一个压缩文件", type: "error" });
          //解压
          const text = await this.$prompt("请输入新的解压文件夹名称", "文件名", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          });
          if (!text.value) throw new Error("请输入一个有效值");
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
              targets: path.join(cwd, dirName)
            }
          });
          this.$notify({
            title: "解压任务已经开始",
            message: "异步解压需要一段时间，可以利用刷新文件列表查看目录内容来判断是否压缩完毕"
          });
        }
      } catch (error) {
        this.$message({ message: `${error}`, type: "error" });
      }
    },

    // 文件已选择，开始上传
    async selectedFile() {
      try {
        const file = this.$refs.fileButtonHidden.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("source", "MCSManager/FileManager");
        formData.append("time", new Date().toUTCString());
        const fullAddress = `${this.uploadConfig.addr}/upload/${this.uploadConfig.password}`;
        console.log("上传文件:", fullAddress);
        // 上传文件
        await axios.post(fullAddress, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            this.percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        });
        this.$message({ message: `上传完毕`, type: "success" });
        await this.refresh();
        this.$refs.fileForm.reset();
        this.percentComplete = -1;
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
      this.uploadConfig.addr = parseforwardAddress(cfg.addr, "http");
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
      const addr = parseforwardAddress(cfg.addr, "http");
      const password = cfg.password;
      window.open(`${addr}/download/${password}/${fileName}`);
    }
  }
};
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
  justify-content: right;
}
</style>
