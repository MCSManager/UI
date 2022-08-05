<!-- eslint-disable vue/no-mutating-props -->
<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div>
    <Panel :style="style" class="value-card-wrapper">
      <template #title>{{ title }}</template>
      <template #default>
        <div class="guser-top-info">
          <p class="sub-title-info" style="font-size: 12px">{{ subTitle }}</p>
          <div class="guser-top-info-text">
            <i :class="fontClass"></i>
            <div v-if="$slots.default" style="padding: 8px 0px">
              <slot></slot>
            </div>
            <div v-else>
              <p>
                {{ value }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "./Panel";

export default {
  components: { Panel },
  props: ["value", "title", "subTitle", "fontClass", "style"],
  data: function () {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.value-card-wrapper {
  position: relative;
  overflow: hidden;
}
.guser-top-info > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.guser-top-info-text > i {
  font-size: 100px;
  color: #d1d1d11c;
  position: absolute;
  right: 2px;
  bottom: 4px;
}

.guser-top-info-text > div > p {
  margin: 8px 2px;
  font-size: 40px;
  font-weight: 800;
}
</style>
