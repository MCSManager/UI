<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Panel>
    <template #title>{{ $t("router.schedule") }}</template>
    <template #default>
      <ItemGroup>
        <el-button type="success" size="small" @click="toCreate">{{
          $t("schedule.addSchedule")
        }}</el-button>
        <el-button size="small" @click="refresh">{{ $t("general.refresh") }}</el-button>
        <el-button size="small" @click="back">{{ $t("schedule.backToConsole") }}</el-button>
      </ItemGroup>
    </template>
  </Panel>

  <Panel>
    <template #title>{{ $t("schedule.schedules") }}</template>
    <template #default>
      <el-table :data="tasks" style="width: 100%" size="small">
        <el-table-column prop="name" :label="$t('schedule.taskName')"></el-table-column>
        <el-table-column prop="payload" :label="$t('schedule.payload')"></el-table-column>
        <el-table-column prop="count" :label="$t('schedule.count')" width="80px">
          <template #default="scope">
            <span v-if="scope.row.count > 0">{{ scope.row.count }}</span>
            <span v-else>{{ $t("schedule.infinite") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="action" :label="$t('schedule.action')" width="180px">
          <template #default="scope">
            <span v-if="scope.row.action === 'command'">{{ $t("schedule.sendCmd") }}</span>
            <span v-if="scope.row.action === 'stop'">{{ $t("schedule.stop") }}</span>
            <span v-if="scope.row.action === 'start'">{{ $t("schedule.start") }}</span>
            <span v-if="scope.row.action === 'restart'">{{ $t("schedule.restart") }}</span>
            <span v-if="scope.row.action === 'kill'">{{ $t("schedule.kill") }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('terminal.type')" style="text-align: center" width="180">
          <template #default="scope">
            <span v-if="scope.row.type === 1">{{ $t("schedule.intervalsTask") }}</span>
            <span v-if="scope.row.type === 2">{{ $t("schedule.cycleTask") }}</span>
            <span v-if="scope.row.type === 3">{{ $t("schedule.specifyTask") }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          :label="$t('schedule.triggerTime')"
          width="240px"
        ></el-table-column>
        <el-table-column :label="$t('general.operate')" style="text-align: center" width="100">
          <template #default="scope">
            <el-button type="danger" size="mini" @click="deleteTask(scope.row)">
              {{ $t("general.delete") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Panel>

  <Dialog v-model="newTask.is">
    <template #title>{{ $t("schedule.addSchedule") }}</template>
    <template #default>
      <div class="sub-title">{{ $t("schedule.taskName") }}</div>
      <el-input
        v-model="newTask.name"
        :placeholder="$t('schedule.inputTaskName')"
        size="small"
      ></el-input>
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <div class="sub-title row-mt">{{ $t("schedule.taskType") }}</div>
        </el-col>
        <el-col :md="12" :offset="0">
          <el-select
            size="small"
            v-model="newTask.action"
            :placeholder="$t('general.pleaseSelect')"
            style="width: 100%"
          >
            <el-option :label="$t('schedule.sendCmd')" value="command"></el-option>
            <el-option :label="$t('schedule.start')" value="start"></el-option>
            <el-option :label="$t('schedule.stop')" value="stop"></el-option>
            <el-option :label="$t('schedule.restart')" value="restart"></el-option>
            <el-option :label="$t('schedule.kill')" value="kill"></el-option>
          </el-select>
        </el-col>
        <el-col :md="12" :offset="0">
          <el-select
            size="small"
            v-model="newTask.type"
            :placeholder="$t('general.pleaseSelect')"
            style="width: 100%"
          >
            <el-option :label="$t('schedule.intervalsTask')" :value="1"></el-option>
            <el-option :label="$t('schedule.cycleTask')" :value="2"></el-option>
            <el-option :label="$t('schedule.specifyTask')" :value="3"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- Specify time selector -->
      <div v-if="newTask.type == 3" class="row-mt">
        <el-date-picker
          v-model="newTask.time"
          type="datetime"
          :placeholder="$t('schedule.selectDate')"
          size="small"
        ></el-date-picker>
      </div>

      <!-- Specify time type date picker -->
      <el-row :gutter="20" class="row-mt" v-if="newTask.type == 2">
        <el-col :md="24" :offset="0">
          <div class="sub-title">{{ $t("schedule.triggerTime") }}</div>
          <div>
            <el-time-picker
              size="small"
              v-model="newTask.objTime"
              :placeholder="$t('schedule.specificTime')"
              style="width: 100%"
            ></el-time-picker>
            <el-checkbox-group v-model="newTask.weekend" class="row-mt">
              <el-checkbox size="small" :label="$t('schedule.mon')"></el-checkbox>
              <el-checkbox size="small" :label="$t('schedule.tue')"></el-checkbox>
              <el-checkbox size="small" :label="$t('schedule.wen')"></el-checkbox>
              <el-checkbox size="small" :label="$t('schedule.thur')"></el-checkbox>
              <el-checkbox size="small" :label="$t('schedule.fri')"></el-checkbox>
              <el-checkbox size="small" :label="$t('schedule.sat')"></el-checkbox>
              <el-checkbox size="small" :label="$t('schedule.sun')"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
        <el-col :md="6" :offset="0">
          <div class="sub-title">{{ $t("schedule.executions") }}</div>
          <el-input
            type="number"
            v-model="newTask.count"
            :placeholder="$t('schedule.executionsNull')"
            size="small"
            style="width: 100%"
          ></el-input>
        </el-col>
      </el-row>

      <!-- Time interval period selector -->
      <div v-if="newTask.type == 1" class="row-mt">
        <div class="row-mb">
          <div class="sub-title-info">{{ $t("schedule.intervalsTaskInfo") }}</div>
        </div>
        <el-row :gutter="10">
          <el-col :md="6">
            <el-input
              size="small"
              :placeholder="$t('schedule.representHour')"
              v-model="newTask.cycle[2]"
              style="width: 100%"
            >
              <template #append>{{ $t("schedule.hour") }}</template>
            </el-input>
          </el-col>
          <el-col :md="6">
            <el-input
              size="small"
              :placeholder="$t('schedule.representMin')"
              v-model="newTask.cycle[1]"
              style="width: 100%"
            >
              <template #append>{{ $t("schedule.min") }}</template>
            </el-input>
          </el-col>
          <el-col :md="6">
            <el-input
              size="small"
              :placeholder="$t('schedule.representSec')"
              v-model="newTask.cycle[0]"
              style="width: 100%"
            >
              <template #append>{{ $t("schedule.sec") }}</template>
            </el-input>
          </el-col>
          <el-col :md="6">
            <el-input
              type="number"
              v-model="newTask.count"
              :placeholder="$t('schedule.executionsNum')"
              size="small"
              style="width: 100%"
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="sub-title row-mt">{{ $t("schedule.missionPayload") }}</div>
      <el-input
        v-model="newTask.payload"
        :placeholder="$t('schedule.inputPayload')"
        size="small"
      ></el-input>
      <div class="row-mt">
        <ItemGroup>
          <el-button type="success" size="small" @click="createTask">
            {{ $t("general.save") }}
          </el-button>
          <el-button type="danger" size="small" @click="newTask.is = !newTask.is">
            {{ $t("general.cancel") }}
          </el-button>
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
      this.$message({ message: this.$t("general.refreshFinish"), type: "success" });
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
        console.error("Error:", error);
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
            iterator.time =
              this.$t("schedule.every") +
              ` ${h}` +
              this.$t("schedule.hour") +
              ` ${m}` +
              this.$t("schedule.min") +
              ` ${s}` +
              this.$t("schedule.sec");
          }
          if (iterator.type === 2) {
            const time = iterator.time;
            //16 41 15 * * 1,3,5,7,4
            const timeArr = time.split(" ");
            const h = timeArr[2];
            const m = timeArr[1];
            const s = timeArr[0];
            const w = timeArr[5];
            iterator.time =
              this.$t("schedule.on") + ` ${w} ` + this.$t("schedule.week") + ` ${h}:${m}:${s}`;
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
            iterator.time =
              `${mm}` +
              this.$t("schedule.every") +
              ` ${dd}` +
              this.$t("schedule.every") +
              ` ${h}:${m}:${s}`;
          }
        }
        this.tasks = tasks;
      } catch (error) {
        this.$notify({
          title: this.$t("schedule.dataError"),
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
        this.$message({ type: "success", message: this.$t("general.deleteFinish") });
        setTimeout(() => {
          this.render();
        }, 500);
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
        if (v == this.$t("schedule.mon")) w.push(1);
        if (v == this.$t("schedule.tue")) w.push(2);
        if (v == this.$t("schedule.wen")) w.push(3);
        if (v == this.$t("schedule.thur")) w.push(4);
        if (v == this.$t("schedule.fri")) w.push(5);
        if (v == this.$t("schedule.sat")) w.push(6);
        if (v == this.$t("schedule.sun")) w.push(7);
      });
      const time = this.newTask.objTime;
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      this.newTask.time = `${s} ${m} ${h} * * ${w.join(",")}`;
      await this.createRequest();
    },
    // interval task
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
          title: this.$t("notify.createSuccess"),
          message: this.$t("schedule.createSuccess"),
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
