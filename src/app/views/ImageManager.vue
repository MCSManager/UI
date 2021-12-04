<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-09-08 16:43:20
 * @Description: 
-->

<template>
  <Panel>
    <template #title>镜像管理</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <ItemGroup>
            <el-button type="success" size="small" @click="toNewImage"> 新建镜像 </el-button>
            <el-button type="" size="small" @click="refresh"> 刷新 </el-button>
            <el-button type="" size="small" @click="back"> 返回 </el-button>
          </ItemGroup>
        </div>
        <span class="color-gray hidden-md-and-down">新建镜像可能需要一定时间。&nbsp;&nbsp;</span>
      </div>
    </template>
  </Panel>

  <Panel>
    <template #title>远程服务镜像列表</template>
    <template #default>
      <el-table :data="images" stripe style="width: 100%" size="small">
        <el-table-column label="ID">
          <template #default="scope">
            <span class="text-overflow-ellipsis">{{ scope.row.Id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="RepoTags" label="名称" width="120px"></el-table-column>

        <el-table-column label="占用空间" width="100px">
          <template #default="scope">
            <span>{{ parseInt(scope.row.Size / 1024 / 1024) }}MB</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" style="text-align: center" width="160px">
          <template #default="scope">
            <el-button size="mini" @click="toDetail(scope.row)">详情</el-button>
            <el-button type="danger" size="mini" @click="deleteImage(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Panel>
    <template #title>远程服务容器列表</template>
    <template #default>
      <el-table :data="containers" stripe style="width: 100%" size="small">
        <el-table-column prop="Command" label="ID">
          <template #default="scope">
            <div class="text-overflow-ellipsis" style="max-width: 120px">{{ scope.row.Id }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Command" label="启动命令">
          <template #default="scope">
            <div class="text-overflow-ellipsis" style="max-width: 120px">
              {{ scope.row.Command }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Image" label="使用镜像"></el-table-column>
        <!-- <el-table-column prop="Ports" label="端口开放">
          <template #default="scope">
            <div v-if="scope.row.Ports">
              <span v-for="(item,index) in scope.row.Ports" :key="index">
                {{item.PublicPort}}:{{item.PrivatePort}}&nbsp;
              </span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column prop="State" label="状态"></el-table-column>
        <el-table-column prop="Status" label="情况"></el-table-column>
        <el-table-column label="操作" style="text-align: center" width="90px">
          <template #default="scope">
            <el-button size="mini" @click="toDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Dialog v-model="dialog">
    <template #title>信息详情</template>
    <template #default>
      <div class="sub-title">
        <p class="sub-title-title">关于详情信息</p>
        <p class="sub-title-info">
          Docker 镜像与容器等详细信息建议由技术人员阅读，此处提供完整的 JSON 格式信息内容。
        </p>
      </div>
      <pre style="max-height: 460px; overflow-y: auto">{{ detail }}</pre>
    </template>
  </Dialog>

  <Dialog v-model="unsupported">
    <template #title>不受支持的操作系统</template>
    <template #default>
      <div style="margin: 24px 0px">
        <el-alert :closable="false" title="Windows 系统暂时无法使用" type="error" show-icon>
          <template #default>
            <span
              >很抱歉，因为 Windows 下的虚拟化使用较为复杂且安装繁琐，所以 MCSManager
              面板暂时无法兼容 Docker for Windows 版本。<br />相信在不久后的将来会逐渐支持此功能。</span
            >
          </template>
        </el-alert>
      </div>
      <div class="flex flex-space-center">
        <el-button type="" size="small" @click="back">确定</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Panel from "../../components/Panel";
import { API_CONTAINERS, API_IMAGES } from "../service/common";
import { request } from "../service/protocol";
import Dialog from "../../components/Dialog";

export default {
  components: { Panel, Dialog },
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      images: [],
      containers: [],
      loading: true,
      dialog: false,
      detail: "",
      unsupported: false
    };
  },
  async mounted() {
    await this.render();
  },
  methods: {
    async refresh() {
      await this.render();
      this.$message({ type: "info", message: "已刷新" });
    },
    back() {
      this.$router.push({
        path: "/container"
      });
    },
    toNewImage() {
      this.$router.push({ path: `/new_image/${this.serviceUuid}` });
    },
    toDetail(row) {
      this.detail = JSON.stringify(row, null, 4);
      this.dialog = true;
    },
    async render() {
      try {
        this.images = await request({
          method: "GET",
          url: API_IMAGES,
          params: {
            remote_uuid: this.serviceUuid
          }
        });
        this.containers = await request({
          method: "GET",
          url: API_CONTAINERS,
          params: {
            remote_uuid: this.serviceUuid
          }
        });
        this.loading = false;
      } catch (error) {
        if (error.toString().includes("Unsupported")) {
          return (this.unsupported = true);
        }
        this.$notify({
          title: "数据加载失败",
          message: error.toString(),
          type: "error"
        });
      }
    },
    async deleteImage(row) {
      await this.$confirm("此操作将永久删除该镜像, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      try {
        await request({
          method: "DELETE",
          url: API_IMAGES,
          params: {
            remote_uuid: this.serviceUuid,
            imageId: String(row.RepoTags[0])
          }
        });
        this.$notify({
          title: "删除指令已发出",
          message: "请耐心等待，使用刷新功能加载列表，稍后此镜像预计将会被删除"
        });
      } catch (error) {
        this.$notify({
          title: "删除镜像失败",
          message: error.toString(),
          type: "error"
        });
      }
    }
  }
};
</script>
