<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="v" :cancel="close">
    <template #title>容器资源限制信息</template>
    <template #default>
      <div style="min-width: 480px">
        <p>这里显示管理员分配给您的这个实例的资源信息。</p>
        <el-row :gutter="20">
          <el-col :md="12" :offset="0">
            <LineInfo>
              <i class="el-icon-tickets"></i> <span>镜像名：{{ dockerInfo.image }}</span>
            </LineInfo>
            <LineInfo>
              <i class="el-icon-tickets"></i> <span>网络模式：{{ dockerInfo.networkMode }}</span>
            </LineInfo>
            <LineInfo>
              <i class="el-icon-tickets"></i> <span>容器名：{{ dockerInfo.containerName }}</span>
            </LineInfo>
            <LineInfo>
              <i class="el-icon-tickets"></i> <span>挂载目录：{{ dockerInfo.extraVolumes }}</span>
            </LineInfo>
          </el-col>
          <el-col :md="12" :offset="0">
            <LineInfo>
              <i class="el-icon-tickets"></i> <span>最大内存：{{ dockerInfo.memory }}MB</span>
            </LineInfo>
            <!-- <LineInfo>
              <i class="el-icon-tickets"></i>
              <span>CPU 限制：{{ dockerInfo.cpuUsage }}%</span>
            </LineInfo> -->
            <LineInfo v-if="dockerInfo && dockerInfo.ports">
              <i class="el-icon-tickets"></i> {{ $t("terminal.dockerPort") }}
              <i class="el-icon-question"></i>:

              <div style="padding: 10px 0px 0px 16px">
                <div
                  style="margin-bottom: 2px"
                  v-for="(item, index) in dockerPortsParse(dockerInfo.ports)"
                  :key="index"
                >
                  <span>{{ item.protocol }}:</span>
                  <span style="margin-left: 8px">{{ $t("CommonText.029") }}: {{ item.p1 }} </span>
                  <span style="margin-left: 6px">{{ $t("CommonText.030") }}: {{ item.p2 }} </span>
                </div>
              </div>
            </LineInfo>
          </el-col>
        </el-row>
      </div>
    </template>
  </Dialog>
</template>

<script>
// a = {
//   containerName: "",
//   image: "",
//   ports: ["8080:25565/tcp", "8081:27766/tcp", "8082:20348/udp", "23142:65563/udp", "214:2412/tcp"],
//   extraVolumes: [],
//   memory: null,
//   networkMode: "bridge",
//   networkAliases: [],
//   cpusetCpus: "",
//   cpuUsage: null,
//   maxSpace: null,
//   io: null,
//   network: null
// };
import LineInfo from "@/components/LineInfo";
import Dialog from "@/components/Dialog";
import { TERMINAL_CODE } from "../../service/common";
export default {
  components: {
    Dialog,
    LineInfo
  },
  props: {
    dockerInfo: {
      type: Object
    }
  },
  data() {
    return {
      TERMINAL_CODE,
      v: false,
      options: {}
    };
  },

  methods: {
    open() {
      this.v = true;
    },
    close() {
      this.v = false;
    },
    // [ "25565:25565/tcp", "27766:27766/tcp" ]
    dockerPortsParse(list = []) {
      let line = [];
      list.forEach((v, index) => {
        if (index >= 50) return;
        const tmp = v.split("/");
        if (tmp.length != 2) return;
        const protocol = tmp[1];
        const p = tmp[0].split(":");
        if (p.length >= 2) {
          line.push({
            p1: p[0],
            p2: p[1],
            protocol: String(protocol).toUpperCase()
          });
        }
      });
      if (list.length >= 50) {
        line.push({
          p1: null,
          p2: null,
          protocol: null,
          more: true
        });
      }
      return line;
    }
  }
};
</script>

<style scoped>
.btn-area {
  margin-top: 8px;
}
</style>
