<!--
  Copyright (C) 2022 Suwings(https://github.com/Suwings)

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。
-->

<template>
  <div
    class="line-label-wrapper"
    v-bind:class="{
      'line-label-margin-24': !size,
      'line-label-margin-12': size == 'small',
      'line-label-margin-4': size == 'mini'
    }"
  >
    <div
      class="line-label-title"
      v-bind:class="{
        'line-label-title-120px': !space,
        'line-label-title-80px': space == 'small',
        'line-label-title-40px': space == 'mini'
      }"
    >
      <slot name="title"></slot>
    </div>
    <div class="line-label-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: String,
    space: String
  }
};
</script>

<style scoped>
.line-label-wrapper {
  line-height: 14px;
  font-size: 14px;
}

.line-label-margin-24 {
  margin: 24px 0px;
}

.line-label-margin-12 {
  margin: 12px 0px;
}

.line-label-margin-4 {
  margin: 4px 0px;
}

.line-label-title-120px {
  width: 120px;
}

.line-label-title-80px {
  width: 80px;
}

.line-label-title-40px {
  width: 40px;
}

.line-label-title {
  display: inline-block;

  color: rgb(117, 117, 117);
}

.line-label-text {
  display: inline-block;
  vertical-align: top;
}

.line-label-link {
  font-size: 14px;
  color: #348de6;
}
</style>
