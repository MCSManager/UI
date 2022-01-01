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
  <div class="select-block" :style="style">
    <div>
      <p class="color-black" style="font-size: 14px; font-weight: 600; letter-spacing: -0.4px">
        <slot name="title"></slot>
      </p>
      <p>
        <slot name="info"></slot>
      </p>
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
.select-block {
  border: 1px solid #dcdfe6;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.4s;
  padding: 4px 14px;
}

.select-block:hover {
  border: 1px solid #409eff;
}
</style>
