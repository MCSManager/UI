<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-10-20 15:18:59
 * @Description: 
-->
<template>
  <div class="item-group-warpper">
    <div :class="classz" :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    style: String,
    lr: Boolean
  },
  data: function () {
    return {
      classz: "item-responsive-group"
    };
  },
  mounted() {
    if (this.lr) {
      this.classz = "item-responsive-group-only-lr";
    }
  }
};
</script>
