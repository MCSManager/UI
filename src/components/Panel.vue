
<template>
  <el-card class="box-card-shadow" :body-style="bodyStyle || 'padding:12px;'" :style="style">
    <div class="pin" v-if="pin"></div>
    <div class="box-card-title" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div class="box-card-content">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    style: String,
    bodyStyle: String,
    pin: Boolean
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.pin {

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 2px;

  background-color: var(--el-color-primary);

}

.box-card-title {
  font-weight: 800;
  margin-bottom: 12px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card-content {
  font-size: 12px;
  font-weight: 400;
}

.box-card-shadow {
  border-radius: 4px;
}
</style>
