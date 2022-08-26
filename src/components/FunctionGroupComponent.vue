<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <div class="function-group-component no-phone-component" v-if="!isPhone">
    <el-button v-if="component === 'button'" type="primary" size="small" v-bind="$props">
      <slot></slot>
    </el-button>
    <template v-else>
      <slot></slot>
    </template>
  </div>
  <div class="is-phone-component" v-else>
    <div v-if="component === 'button'" style="display: block; margin: 5px">
      <el-button size="small" plain v-bind="$props" style="width: 100%">
        <slot></slot>
      </el-button>
    </div>
    <div class="function-group-component-phone" v-else>
      <slot></slot>
    </div>
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
.function-group-component-phone {
  margin: 5px;
  overflow: hidden;
}
.function-group-component-phone > * {
  display: block;
  width: 100% !important;
}

.function-group-component {
  display: inline-block;
  margin: 5px;
}
</style>

<style scoped></style>
