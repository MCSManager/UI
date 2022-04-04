
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
