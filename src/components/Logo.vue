<!--
  Copyright (C) 2022 Suwings <Suwings@outlook.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  According to the AGPL, it is forbidden to delete all copyright notices,
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings <Suwings@outlook.com>

  该程序是免费软件，您可以重新分发和/或修改据 GNU Affero 通用公共许可证的条款，
  由自由软件基金会，许可证的第 3 版，或（由您选择）任何更高版本。

  根据 AGPL 与用户协议，您必须保留所有版权声明，如果修改源代码则必须开源修改后的源代码。
  可以前往 https://mcsmanager.com/ 阅读用户协议，申请闭源开发授权等。
-->

<template>
  <div>
    <div class="logo-wrapper" :style="{ margin }">
<!--      <img class="logo-img" :src="require('../assets/logo.png')" width="172" />-->

      <div class="LogoContainer">

        <div class="graphic-container">

          <div class="graphic g1"></div>
          <div class="graphic g2"></div>
          <div class="graphic g3"></div>

        </div>

        <p>

          <span class='logo-text'>Real</span><span class='logo-text mc'>MC</span>

        </p>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    style: String,
    margin: String
  },
  data: function () {
    return {};
  }
};
</script>

<style scoped>

.LogoContainer {

  position: relative;
  display: flex;

  justify-self: center;
  vertical-align: middle;

  width: 240px;
  height: 50px;

}

.logo-text {

  position: relative;
  margin: 0 4px;

  font-family: 'ZCOLL KuaiLe';
  font-size: 24px;

  animation: logoTextMoving 15s infinite linear;

}

p {

  margin: auto;

  color: white;

}

.mc {

  padding: 8px 4px 4px 4px;

  background-color: #f1511b;
  border-radius: 3px;

  color: black;

}

@font-face {
  font-family: 'ZCOLL KuaiLe';
  src: local("ZCOOL KuaiLe"),
  url('./../assets/ZCOOL KuaiLe.ttf');
  font-weight: bold;
}

.graphic-container {

  margin: auto;
  margin-right: -25px;

}

.graphic {

  z-index: 6;
  position: relative;
  display: inline-block;
  margin: -8px;

  width: 24px;
  height: 32px;

  border-radius: 3px;
  opacity: .85;

  animation: graphicMoving 15s infinite linear;

  transform: skewY(-25deg) rotateY(200deg);

}

@keyframes graphicMoving {

  0% {

    left: 70px;

  }

  20% {

    transform: rotateY(720deg);

  }

  25% {

    transform: skewY(50deg) rotateY(0deg);

  }

  30% {

    transform: skewY(-50deg) rotateY(0deg);

  }

  35%, 90% {

    left: 0;
    transform: rotateY(0deg);

  }

  100% {

    left: 70px;

  }

}

@keyframes logoTextMoving {

  0%, 35% {

    left: 10px;
    opacity: 0;

  }

  40%, 90% {

    left: 0;
    opacity: 1;

  }

  100% {

    opacity: 0;

  }

}

.g1 {

  z-index: 5;

  background-color: #02035e;

  transition-delay: 2s;

}

.g2 {

  z-index: 6;

  background-color: #008ec0;

  transition-delay: 1s;

}

.g3 {

  z-index: 7;

  background-color: #1ab8dc;

  transition-delay: 3s;

}

.logo-img {
  vertical-align: middle;
}
.logo-wrapper {
  margin: 22px 0px;
  text-align: center;
}
</style>
