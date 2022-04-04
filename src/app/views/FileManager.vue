
<template>
  <div @click="closeMenu" @mouseleave="leaveHandle"  @click.right="menuOpen">

    <Panel>
      <template #title>文件管理</template>
      <template #default>
        <p>
          <span class="dir-info" @click="list('/')">...</span>
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item @click="breadCrumb(index)" :key="index" v-for="(item, index) in paths">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
        </p>

        <el-row :gutter="20">
          <el-col :xs="24" :md="6" :offset="0">
            <ItemGroup>
              <el-button :disabled="pathHistory.length <= 0" size="small" @click="backforward" type="primary">
                <i class="el-icon-back"></i> 后退
              </el-button>
              <el-button size="small" @click="toUpDir">
                <i class="el-icon-pie-chart"></i> 上层目录
              </el-button>
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
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="文件名" min-width="240">
            <template #default="scope">
              <div
                      v-if="scope.row.type == 0"
                      class="filemanager-item-dir"
                      @click="toDir(scope.row.name)"
              >
                <i class="el-icon-folder"></i>
                <span>{{ scope.row.name }}</span>
              </div>
              <div @dblclick="toEditFilePage(scope.row)" v-if="scope.row.type == 1" class="filemanager-item-file">
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
          <el-table-column label="操作" style="text-align: center" width="200">
            <template #default="scope">
              <el-button
                      size="mini"
                      :disabled="scope.row.type != 1"
                      @click="toEditFilePage(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                      size="mini"
                      :disabled="scope.row.type != 1"
                      @click="previewFile(scope.row)"
              >
                预览
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

    <Panel class="right-click-menu" ref="menuRef">
      <template #title>菜单</template>
      <template #default>
        <ItemGroup>
          <el-tooltip content="新建目录">
            <el-button size="small" @click="mkdir" circle plain placement="top-start">
              <i class="el-icon-folder-add"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="压缩">
            <el-button size="small" @click="compress(1)" circle plain placement="top">
              <i class="el-icon-box"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="解压">
            <el-button size="small" @click="compress(2)" circle plain placement="top">
              <i class="el-icon-files"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="重命名">
            <el-button size="small" @click="rename" circle plain  placement="top">
              <i class="el-icon-document"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="剪切">
            <el-button size="small" @click="move" circle plain  placement="top-end">
              <i class="el-icon-scissors"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="复制">
            <el-button size="small" @click="copy" circle plain  placement="left-start">
              <i class="el-icon-document-copy"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="粘贴">
            <el-button size="small" @click="paste" circle plain placement="top">
              <i class="el-icon-tickets"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="上传文件">
            <el-button size="small" type="success" @click="upload" circle plain  placement="top">
              <i class="el-icon-plus"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除">
            <el-button size="small" type="danger" @click="deleteFiles" circle plain  placement="top">
              <i class="el-icon-document-delete"></i>
            </el-button>
          </el-tooltip>
        </ItemGroup>
      </template>
    </Panel>

    <Dialog v-model="preview.open">

      <template #title>预览文件</template>
      <tempalte>

        <div>

          <el-image v-if="preview.type === 'image'"
                  style="width: 400px; height: 300px"
                  :src="preview.url"
                  :preview-src-list="[ preview.url ]"
                  :initial-index="4"
                  fit="cover"
          />

          <iframe v-else :url="preview.url" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

        </div>

      </tempalte>

    </Dialog>
  </div>
</template>

<script>
import Panel from "../../components/Panel";
import Dialog from "../../components/Dialog";
import axios from "axios";
import {
  API_FILE_COMPRESS,
  API_FILE_COPY,
  API_FILE_DOWNLOAD,
  API_FILE_LIST,
  API_FILE_MKDIR,
  API_FILE_MOVE,
  API_FILE_UPLOAD,
  API_FILE_URL, sleep
} from "../service/common";
import path from "path";
import { parseforwardAddress, request } from "../service/protocol";

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

      paramPath: this.$route.query.path,

      // 移动，复制，粘贴文件所需数据
      tmpFile: {
        tmpFileNames: null,
        tmpOperationMode: -1,
        tmpDir: null
      },

      paths: [],
      pathHistory: [],

      menu: {

        open: false,
        x: -1,
        y: -1,

      },

      preview: {

        open: false,
        type: '',
        url: ''

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
  watch: {

    async 'menu.open'(latest) {

      const ref = this.$refs.menuRef.$el

      if( latest) {

        ref.style.display = 'block'
        ref.style.left = this.menu.x + 'px'
        ref.style.top = this.menu.y + 'px'
        ref.style.transform = 'translateY(-25px)'

        await sleep(250)

        ref.style.opacity = '1'
        ref.style.transform = 'translateY(0)'

      } else {

        ref.style.transform = 'translateY(-25px)'
        ref.style.opacity = '0'

        await sleep(250)

        ref.style.display = 'none'

      }

    },
    currentDir(latest, old) {

      this.paths = [ ...latest.split("/") ];

      const pop = this.paths.pop()

      if( pop ) {

        this.paths = [ ...this.paths, pop, '' ]

      }

      if( this.paths.length === 0 ) {

        this.paths = [ '' ]

      }

      this.pathHistory.push(old);

    }

  },
  methods: {
    async menuOpen( event ) {

      event.preventDefault();

      this.closeMenu()

      await sleep(300)

      this.menu.x = event.clientX;
      this.menu.y = event.clientY;

      this.menu.open = true;

    },
    leaveHandle( event ) {

      if( event?.relatedTarget?.className === 'el-popper__arrow' ) return

      this.closeMenu()

    },
    closeMenu() {
      this.menu.open = false;
    },
    // 返回上层目录
    async breadCrumb( index ) {

      let path = '';

      for( let i = 0; i <= index; i++ ) {

        path += this.paths[i] + "/";

      }

      await this.list(path);
    },
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
        await this.list(p);
      } catch (error) {
        this.$message({ message: "错误，无法查看此目录或文件", type: "error" });
      }
    },
    // 后退
    async backforward() {

      if( this.pathHistory.length < 1 ) {

        return await this.toUpDir()

      }

      // 取数组最后一个并删除
      const backforwardPath = this.pathHistory.pop();

      await this.list( path.normalize(backforwardPath) )

      this.pathHistory.pop()

    },
    // 返回上层目录
    async toUpDir() {
      const p = path.normalize(path.join(this.currentDir, "../"));
      await this.list(p);
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
          target: cwd
        }
      });
      this.currentDir = path.normalize(cwd);
      this.tableFilter(data);
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

    getFileType( fileName ) {

      // 后缀获取
      let suffix = '';
      // 获取类型结果
      let result = '';

      try {

        let fileArr = fileName.split('.');
        suffix = fileArr[fileArr.length - 1];

      } catch (err) {

        suffix = '';

      }

      // fileName无后缀返回 false
      if (!suffix) return false

      // 图片格式
      const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
      // 进行图片匹配
      result = imgList.some(function (item) {
        return item === suffix;
      });
      if (result) {
        result = 'image';
        return result;
      }

      // 匹配txt
      const txtList = ['txt', 'md', 'sh', 'bat', 'conf', 'ini', 'log', 'sql', 'xml', 'yml', 'yaml', 'json'];
      result = txtList.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'text';
        return result;
      }

      // 匹配 excel
      const excelList = ['xls', 'xlsx'];
      result = excelList.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'excel';
        return result;
      }

      // 匹配 word
      const wordList = ['doc', 'docx'];
      result = wordList.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'word';
        return result;
      }

      // 匹配 pdf
      const pdfList = ['pdf'];
      result = pdfList.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'pdf';
        return result;
      }

      // 匹配 ppt
      const pptList = ['ppt'];
      result = pptList.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'ppt';
        return result;
      }

      // 匹配 视频
      const videoList = ['mp4', 'm2v', 'mkv'];
      result = videoList.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'video';
        return result;
      }

      // 匹配 音频
      const radioList = ['mp3', 'wav', 'wmv'];
      result = radioList.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = 'radio';
        return result;
      }

      return false

    },

    // 预览文件
    async previewFile( row ) {

      let type = this.preview.type = this.getFileType( row.name );

      if( !type ) {

        this.$message({ message: '此文件不支持预览', type: 'error' });
        return;

      }

      if( type === 'text' ) {

        this.$message({ message: '请直接进行编辑', type: 'error' });
        return;

      }

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

      this.preview.url = `${addr}/download/${password}/${fileName}`

      if( [ 'doc', 'ppt', 'pdf', 'excel' ].indexOf(type) !== -1 ) {

        this.preview.url = 'https://view.officeapps.live.com/op/view.aspx?src=' + this.preview.url

      }

      // if( type === 'text' ) {

        // this.preview.url = `/file_editor/${this.serviceUuid}/${this.instanceUuid}/` + path.normalize(path.join(this.currentDir, row.name))

      // }

      this.preview.open = true;

    },

    // 编辑文件
    async toEditFilePage(row) {
      const target = path.normalize(path.join(this.currentDir, row.name));
      await this.$router.push( {
        path: `/file_editor/${ this.serviceUuid }/${ this.instanceUuid }/`,
        query: {
          target
        }
      } );

      location.reload();
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
.right-click-menu {

  position: absolute;

  width: 200px;
  min-height: 50px;
  height: auto;

  opacity: 0;
  transition: all .25s;

}
.breadcrumb {

  position: relative;
  display: inline-block;

  top: 3px;

  font-size: 16px;

}
.dir-info {

  position: relative;
  padding-left: 5px;

  left: 5px;

  font-size: 16px;

  cursor: pointer;

}
.dir-info::before {

  content: "";
  position: absolute;

  top: 0;
  left: 0;

  width: 2px;
  height: 100%;

  background-color: var(--el-color-primary);

}
.filemanager-item-dir {
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}
.filemanager-item-file {
  font-size: 14px;
  cursor: pointer;
  transition: all .25s;
}
.filemanager-item-file:hover {

  opacity: .75;

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
