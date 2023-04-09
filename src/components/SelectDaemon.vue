<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div v-loading="loading">
    <el-row :gutter="10">
      <el-col
        v-for="item in serviceList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :md="6"
        :offset="0"
      >
        <div class="daemon-card row-mb" @click="select(item)">
          <el-card shadow="always" body-style="padding: 8px">
            <div class="daemon-card-body">
              <i class="el-icon-cpu"></i>
              <div>
                <p class="title">{{ item.ip }}</p>
                <p class="sub-title-info">{{ item.label }}</p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { API_SERVICE_LIST } from "../app/service/common";
import { request } from "../app/service/protocol";

export default {
  data: function () {
    return {
      instances: [],
      serviceList: [],
      selectedServiceUuid: "",
      selectedServiceIp: "",
      instanceNameKeyword: "",

      page: 1,
      maxPage: 1,
      loading: true
    };
  },
  methods: {
    select(daemon) {
      if (daemon?.available) this.$emit("selected", daemon);
    },
    async renderServices() {
      try {
        const data = await request({
          method: "GET",
          url: API_SERVICE_LIST
        });
        let onlineCount = 0;
        for (const service of data) {
          const remarks = `${service.remarks}`;
          const ip = `${service.ip}:${service.port}`;
          if (service.available) {
            onlineCount++;
            this.serviceList.push({
              value: service.uuid,
              label: remarks,
              ip,
              ...service
            });
          } else {
            this.serviceList.push({
              value: service.uuid,
              label: `${remarks} (${this.$t("overview.offline")})`,
              ip,
              ...service
            });
          }
        }

        if (onlineCount === 1)
          return this.select(this.serviceList.filter((v) => v?.available)?.[0]);
      } catch (error) {
        this.$message({ type: "error", message: `Error: ${error.message}` });
      } finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    await this.renderServices();
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.daemon-card {
  cursor: pointer;

  .el-card {
    margin-bottom: 0px !important;
  }
}

.daemon-card:hover {
  .title {
    color: #409eff;
  }
}

.daemon-card-body {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  i {
    font-size: 22px;
    margin-right: 12px;
    margin-left: 8px;
  }

  p {
    margin-bottom: 2px !important;
    margin-top: 2px !important;
    transition: all 0.4s;
  }
}
</style>
