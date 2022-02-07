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
    <template #title>计划任务</template>
    <template #default>
      <ItemGroup>
        <el-button type="success" size="small" @click="toCreate">新增计划任务</el-button>
        <el-button size="small" @click="refresh">刷新</el-button>
        <el-button size="small" @click="back">回到控制台</el-button>
      </ItemGroup>
    </template>
  </Panel>

  <Panel>
    <template #title>计划任务表</template>
    <template #default>
      <el-table :data="tasks" style="width: 100%" size="small">
        <el-table-column prop="name" label="任务名"></el-table-column>
        <el-table-column prop="payload" label="有效载荷"></el-table-column>
        <el-table-column prop="count" label="剩余次数" width="80px">
          <template #default="scope">
            <span v-if="scope.row.count > 0">{{ scope.row.count }}</span>
            <span v-else>无限</span>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="动作" width="100px">
          <template #default="scope">
            <span v-if="scope.row.action === 'command'">发送命令</span>
            <span v-if="scope.row.action === 'stop'">停止实例</span>
            <span v-if="scope.row.action === 'start'">开启实例</span>
            <span v-if="scope.row.action === 'restart'">重启实例</span>
            <span v-if="scope.row.action === 'kill'">终止实例</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" style="text-align: center" width="120">
          <template #default="scope">
            <span v-if="scope.row.type === 1">间隔时间性任务</span>
            <span v-if="scope.row.type === 2">周期时间性任务</span>
            <span v-if="scope.row.type === 3">指定时间性任务</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="触发时间" width="190px"></el-table-column>
        <el-table-column label="操作" style="text-align: center" width="120">
          <template #default="scope">
            <el-button type="danger" size="mini" @click="deleteTask(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Dialog v-model="newTask.is">
    <template #title>新建计划任务</template>
    <template #default>
      <div class="sub-title">计划任务名字</div>
      <el-input v-model="newTask.name" placeholder="必填，并且必须唯一" size="small"></el-input>
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <div class="sub-title row-mt">任务动作/类型</div>
        </el-col>
        <el-col :md="12" :offset="0">
          <el-select size="small" v-model="newTask.action" placeholder="请选择" style="width: 100%">
            <el-option label="发送命令" value="command"></el-option>
            <el-option label="开启实例" value="start"></el-option>
            <el-option label="关闭实例" value="stop"></el-option>
            <el-option label="重启实例" value="restart"></el-option>
            <el-option label="终止实例" value="kill"></el-option>
          </el-select>
        </el-col>
        <el-col :md="12" :offset="0">
          <el-select size="small" v-model="newTask.type" placeholder="请选择" style="width: 100%">
            <el-option label="间隔时间性任务" :value="1"></el-option>
            <el-option label="周期时间性任务" :value="2"></el-option>
            <el-option label="指定时间性任务" :value="3"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 指定时间型选择器 -->
      <div v-if="newTask.type == 3" class="row-mt">
        <el-date-picker
          v-model="newTask.time"
          type="datetime"
          placeholder="选择日期时间点"
          size="small"
        ></el-date-picker>
      </div>

      <!-- 指定时间型日期选择器 -->
      <el-row :gutter="20" class="row-mt" v-if="newTask.type == 2">
        <el-col :md="24" :offset="0">
          <div class="sub-title">触发时间</div>
          <div>
            <el-time-picker
              size="small"
              v-model="newTask.objTime"
              placeholder="具体时间点"
              style="width: 100%"
            ></el-time-picker>
            <el-checkbox-group v-model="newTask.weekend" class="row-mt">
              <el-checkbox size="small" label="周一" value="1"></el-checkbox>
              <el-checkbox size="small" label="周二"></el-checkbox>
              <el-checkbox size="small" label="周三"></el-checkbox>
              <el-checkbox size="small" label="周四"></el-checkbox>
              <el-checkbox size="small" label="周五"></el-checkbox>
              <el-checkbox size="small" label="周六"></el-checkbox>
              <el-checkbox size="small" label="周日"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
        <el-col :md="6" :offset="0">
          <div class="sub-title">执行次数</div>
          <el-input
            type="number"
            v-model="newTask.count"
            placeholder="留空为无限次"
            size="small"
            style="width: 100%"
          ></el-input>
        </el-col>
      </el-row>

      <!-- 时间间隔周期型选择器 -->
      <div v-if="newTask.type == 1" class="row-mt">
        <div class="row-mb">
          <div class="sub-title-info">每隔一定时间将执行一次，具体间隔可以仔细设置</div>
        </div>
        <el-row :gutter="10">
          <el-col :md="6">
            <el-input
              size="small"
              placeholder="不可为空，请写0代表每隔0时"
              v-model="newTask.cycle[2]"
              style="width: 100%"
            >
              <template #append>时</template>
            </el-input>
          </el-col>
          <el-col :md="6">
            <el-input
              size="small"
              placeholder="不可为空，请写0代表每隔0分"
              v-model="newTask.cycle[1]"
              style="width: 100%"
            >
              <template #append>分</template>
            </el-input>
          </el-col>
          <el-col :md="6">
            <el-input
              size="small"
              placeholder="不可为空，请写0代表每隔0秒"
              v-model="newTask.cycle[0]"
              style="width: 100%"
            >
              <template #append>秒</template>
            </el-input>
          </el-col>
          <el-col :md="6">
            <el-input
              type="number"
              v-model="newTask.count"
              placeholder="执行次数，留空无限"
              size="small"
              style="width: 100%"
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="sub-title row-mt">任务有效负载</div>
      <el-input
        v-model="newTask.payload"
        placeholder="比如命令，文件名或其他参数等"
        size="small"
      ></el-input>
      <div class="row-mt">
        <ItemGroup>
          <el-button type="success" size="small" @click="createTask"> 保存 </el-button>
          <el-button type="danger" size="small" @click="newTask.is = !newTask.is"> 取消 </el-button>
        </ItemGroup>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Panel from "../../components/Panel";
import Dialog from "../../components/Dialog";
import { request } from "../service/protocol";
import { API_SCHEDULE } from "../service/common";
export default {
  components: { Panel, Dialog },
  data: function () {
    return {
      serviceUuid: this.$route.params.serviceUuid,
      instanceUuid: this.$route.params.instanceUuid,
      newTask: {
        is: false,
        name: "",
        action: "command",
        count: "",
        type: 1,
        payload: "",
        weekend: [],
        cycle: [0, 0, 0],
        time: "",
        objTime: null
      },
      tasks: []
    };
  },
  methods: {
    async refresh() {
      await this.render();
      this.$message({ message: "已刷新", type: "success" });
    },
    async createTask() {
      try {
        if (this.newTask.type === 1) {
          await this.createTaskType1();
        }
        if (this.newTask.type === 2) {
          await this.createTaskType2();
        }
        if (this.newTask.type === 3) {
          await this.createTaskType3();
        }
      } catch (error) {
        console.error("错误:", error);
      }
    },
    async render() {
      try {
        const tasks = await request({
          method: "GET",
          url: API_SCHEDULE,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          }
        });
        for (const iterator of tasks) {
          if (iterator.type === 1) {
            const time = Number(iterator.time);
            let s = time;
            let m = 0;
            let h = 0;
            while (s >= 60) {
              s -= 60;
              m += 1;
            }
            while (m >= 60) {
              m -= 60;
              h += 1;
            }
            iterator.time = `每隔${h}时${m}分${s}秒`;
          }
          if (iterator.type === 2) {
            const time = iterator.time;
            //16 41 15 * * 1,3,5,7,4
            const timeArr = time.split(" ");
            const h = timeArr[2];
            const m = timeArr[1];
            const s = timeArr[0];
            const w = timeArr[5];
            iterator.time = `每${w}星期 ${h}:${m}:${s}`;
          }
          if (iterator.type === 3) {
            const time = iterator.time;
            //2 3 3 27 8 *
            const timeArr = time.split(" ");
            const h = timeArr[2];
            const m = timeArr[1];
            const s = timeArr[0];
            const dd = timeArr[3];
            const mm = timeArr[4];
            iterator.time = `${mm}月${dd}日 ${h}:${m}:${s}`;
          }
        }
        this.tasks = tasks;
      } catch (error) {
        this.$notify({
          title: "数据异常",
          message: error.toString(),
          type: "error"
        });
      }
    },
    async deleteTask(row) {
      try {
        await request({
          method: "DELETE",
          url: API_SCHEDULE,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid,
            task_name: row.name
          }
        });
        this.$message({ type: "success", message: "已删除" });
        await this.render();
      } catch (error) {
        this.$message({ type: "error", message: error.toString() });
      }
    },
    async createTaskType3() {
      const time = this.newTask.time;
      const mm = time.getMonth() + 1;
      const dd = time.getDate();
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      this.newTask.time = `${s} ${m} ${h} ${dd} ${mm} *`;
      await this.createRequest();
    },
    async createTaskType2() {
      const weekend = this.newTask.weekend;
      const w = [];
      weekend.forEach((v) => {
        if (v == "周一") w.push(1);
        if (v == "周二") w.push(2);
        if (v == "周三") w.push(3);
        if (v == "周四") w.push(4);
        if (v == "周五") w.push(5);
        if (v == "周六") w.push(6);
        if (v == "周日") w.push(7);
      });
      const time = this.newTask.objTime;
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      this.newTask.time = `${s} ${m} ${h} * * ${w.join(",")}`;
      await this.createRequest();
    },
    //间隔时间性任务
    async createTaskType1() {
      const arr = this.newTask.cycle;
      let ps = Number(arr[0]);
      let pm = Number(arr[1]);
      let ph = Number(arr[2]);
      const rs = ps + pm * 60 + ph * 60 * 60;
      this.newTask.time = rs;
      await this.createRequest();
    },
    async createRequest() {
      try {
        if (!this.newTask.count) this.newTask.count = -1;
        const res = await request({
          method: "POST",
          url: API_SCHEDULE,
          params: {
            remote_uuid: this.serviceUuid,
            uuid: this.instanceUuid
          },
          data: this.newTask
        });
        this.$notify({
          title: "创建成功",
          message: "计划任务已创建成功，刷新任务列表可见信息",
          type: "success"
        });
        this.newTask = {
          is: false,
          name: "",
          action: "command",
          count: 1,
          type: 1,
          payload: "",
          weekend: [],
          cycle: [0, 0, 0],
          time: ""
        };
        return res;
      } catch (error) {
        this.$message({ type: "error", message: error.toString() });
      }
    },
    back() {
      this.$router.go(-1);
    },
    toCreate() {
      this.newTask.is = true;
    }
  },
  async mounted() {
    await this.render();
  }
};
</script>
