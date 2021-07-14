<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-14 15:25:18
 * @Description: 
-->

<template>
  <Panel>
    <template #title>文件管理</template>
    <template #default>
      <div class="instance-table-warpper">
        <div>
          <el-button size="small" type="success"> <i class="el-icon-plus"></i> 上传文件 </el-button>
          <el-button size="small" type="primary"> <i class="el-icon-refresh"></i> 刷新 </el-button>
        </div>
        <div>
          <el-button size="small" type="primary">
            <i class="el-icon-video-play"></i> 压缩
          </el-button>
          <el-button size="small" type="primary">
            <i class="el-icon-video-pause"></i> 解压
          </el-button>
          <el-button size="small" type="primary">
            <i class="el-icon-video-pause"></i> 移动
          </el-button>
          <el-button size="small" type="danger"> <i class="el-icon-delete"></i> 删除 </el-button>
        </div>
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
              <i class="el-icon-tickets"></i>
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="typeText" label="文件类型" width="120"></el-table-column>
        <el-table-column prop="size" label="文件大小" width="140"></el-table-column>
        <el-table-column prop="timeText" label="最后修改" width="160"></el-table-column>
        <el-table-column label="操作" style="text-align: center" width="180">
          <template #default="scope">
            <el-button size="mini" :disabled="scope.row.type != 1"> 编辑 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>
</template>

<script>
import Panel from "../../components/Panel";
import axios from "axios";
import { API_FILE_URL } from "../service/common";
import path from "path";
// import qs from "qs";

export default {
  data() {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      multipleSelection: [],
      files: [],
      currentDir: "./"
    };
  },
  async mounted() {
    await this.render();
  },
  unmounted() {},
  methods: {
    async refresh() {
      await this.render();
      this.$message({ message: "已刷新", type: "success" });
    },
    async render() {
      await this.cd(".");
      const result = await this.list();
      console.log("响应:", result.data.data);
    },

    // 进入某目录
    async toDir(name) {
      try {
        let p = ".";
        if (name == "返回上层") p = path.normalize(path.join(this.currentDir, "../"));
        else p = path.normalize(path.join(this.currentDir, name));
        await this.cd(p);
        await this.list();
      } catch (error) {
        this.$message({ message: "错误，无法查看此目录或文件", type: "error" });
      }
    },

    // 目录 CD 功能
    async cd(cwd = ".") {
      const res = await axios.get(`${API_FILE_URL}/cd/${this.serviceUuid}/`, {
        params: {
          uuid: this.instanceUuid,
          cd: cwd
        }
      });
      this.currentDir = path.normalize(cwd);
      console.log("cd", res, cwd);
    },
    // 目录 List 功能
    async list() {
      const res = await axios.get(`${API_FILE_URL}/list/${this.serviceUuid}/`, {
        params: {
          uuid: this.instanceUuid
        }
      });
      this.tableFilter(res.data.data);
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
    }
  },
  components: { Panel }
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
</style>
