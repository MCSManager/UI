<!--
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 11:08:44
 * @LastEditTime: 2021-08-06 11:00:31
 * @Description: 
-->
<template>

  <div class="line-option-list-wrapper" v-if="options[optionKey]">
    <div v-for="(item,index) in options[optionKey]" :key="index">
      <LineOption v-if="valueType(options[optionKey][index])!=-1" :option-value="options[optionKey]" :option-key="index">
        <template #title>
          <span v-if="topTitle">{{topTitle}}/</span><span>{{optionKey}}/{{index}}</span>
        </template>
        <template #info>
          <span v-if="description">{{description[index]}}</span>
        </template>
      </LineOption>
    </div>
  </div>

</template>

<script>
import LineOption from "./LineOption";

export default {
  components: { LineOption },
  props: ["options", "optionKey", "topTitle", "description"],
  data: function () {
    return {};
  },
  computed: {
    // optionList() {
    //   return this.list;
    // }
  },
  methods: {
    valueType(value) {
      if (typeof value === "object") return -1;
    }
  }
};
</script>
