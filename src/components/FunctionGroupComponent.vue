<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="function-group-component" v-if="!isPhone" style="display: inline-block">
    <el-button v-if="component === 'button'" type="primary" size="small" v-bind="this.$props">
      <slot></slot>
    </el-button>
  </div>
  <div class="item" v-else style="display: block">
    <el-button
      v-if="component === 'button'"
      size="small"
      plain
      v-bind="this.$props"
      style="width: 100%; margin: 4px 0px"
    >
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  props: [
    "component",
    "type",
    "plain",
    "round",
    "size",
    "loading",
    "circle",
    "disabled",
    "icon",
    "autofocus",
    "native-type"
  ],
  data: function () {
    return {
      isPhone: false
    };
  },
  mounted() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    resizeHandler() {
      console.log(this);
      if (window.innerWidth <= 900) {
        this.isPhone = true;
      } else {
        this.isPhone = false;
      }
    }
  }
};
</script>

<style>
.function-group-component {
  display: inline-block;
  margin: 6px;
}
/* @media (min-width: 900px) {
  .function-group-component {
    display: block;
    width: 100%;
  }
} */
</style>

<style scoped>
.list-item {
  display: block;
  font-size: 14px;
  margin: 4px 0px;
  border: 1px solid #dcdfe4;
  border-top: 1px solid #dcdfe4;
  border-bottom: 1px solid #dcdfe4;
  padding: 16px 4px;
  cursor: pointer;
}

.list-item :hover {
  background-color: #dcdfe4;
}
</style>
