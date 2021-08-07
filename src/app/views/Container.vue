<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:53:54
 * @LastEditTime: 2021-07-22 12:15:42
 * @Description: 
-->

<template>
  <Panel>
    <template #title>容器操作</template>
    <template #default>
      <div class="flex flex-space-between flex-align-items-center">
        <div>
          <el-button type="success" size="small" @click="newImage">新建镜像</el-button>
          <el-button type="" size="small">刷新</el-button>
        </div>
        <span class="color-gray">新建镜像可能需要一定时间。&nbsp;&nbsp;</span>
      </div>
    </template>
  </Panel>

  <Panel>
    <template #title>镜像列表</template>
    <template #default>
      <el-table :data="images" stripe style="width: 100%" size="small">
        <el-table-column prop="id" label="序号" width="260"></el-table-column>
        <el-table-column prop="tag" label="标签名" width="120"></el-table-column>
        <el-table-column prop="size" label="大小"></el-table-column>
        <el-table-column prop="time" label="上次启动"></el-table-column>
        <el-table-column prop="text" label="备注"></el-table-column>
        <el-table-column label="操作" style="text-align: center">
          <template #default="scope">
            <el-button size="mini" @click="deleteImage(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>
</template>

<script>
import router from "../router";
import Panel from "../../components/Panel";
// import LineLabel from "../../components/LineLabel";

export default {
  components: { Panel },
  data: function () {
    return {
      images: [
        {
          id: "IVCIOHSOFJIOVCPOSJDOPWA",
          tag: "openjdk:16",
          size: "200MB",
          time: "2021/12/24",
          text: "用来开 MC1.17 版本"
        },
        {
          id: "IVCIOHSOFJIOVCPOSJDOPWA",
          tag: "mcsd",
          size: "400MB",
          time: "2021/12/24",
          text: "原版MC开服环境"
        },
        {
          id: "IVCIOHSOFJIOVCPOSJDOPWA",
          tag: "ubuntu14",
          size: "421MB",
          time: "2021/12/24",
          text: "基岩版环境"
        },
        {
          id: "IVCIOHSOFJIOVCPOSJDOPWA",
          tag: "openjdk:16",
          size: "200MB",
          time: "2021/12/24",
          text: "用来开 MC1.17 版本"
        },
        {
          id: "IVCIOHSOFJIOVCPOSJDOPWA",
          tag: "openjdk:16",
          size: "200MB",
          time: "2021/12/24",
          text: "用来开 MC1.17 版本"
        }
      ]
    };
  },
  methods: {
    newImage() {
      router.push({ path: `/new_image` });
    }
  }
};
</script>

<style></style>
