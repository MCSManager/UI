<template>
  <div class="ElProgressBar-Container">

    <el-progress type="circle" :percentage="+now / +max"></el-progress>

  </div>
</template>

<script>

export default {
  name: "DaemonProgressBar",
  props: {

    now: {

      type: Number,
      required: true

    },

    max: {

      type: Number,
      required: true

    }

  }
};

</script>

<style scoped>

.ElProgressBar-Container {

  position: absolute;

  top: 32%;
  left: 5%;

  width: 80%;
  height: 60%;

}

</style>
