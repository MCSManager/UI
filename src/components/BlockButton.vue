<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-09-02 17:39:09
 * @Description: 
-->
<template>
  <div class="components-block-button-warpper" :style="style">
    <div class="components-block-button">
      <div>
        <p class="components-block-button-title">
          <slot name="title"></slot>
        </p>
        <div class="components-block-button-context">
          <slot></slot>
        </div>
      </div>
      <div class="components-block-button-link">
        <slot name="link"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    style: String
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.components-block-button-warpper {
  border-radius: 4px;
  height: 100%;
  width: 100%;
  margin: auto;
  background-color: rgb(255, 255, 255);
  transition: all 0.5s;
  border: 1px solid rgb(239, 239, 239);
}

.components-block-button-warpper:hover {
  /* background-color: rgb(194, 194, 194);
  border: 1px solid rgb(95, 93, 93); */
}

.components-block-button-title {
  font-weight: 600;
  font-size: 16px;
}

.components-block-button-context {
  font-size: 13px;
}

.components-block-button {
  margin: 0px 32px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100%;
}

.components-block-button-link {
  font-size: 13px;
}
</style>
