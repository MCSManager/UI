<template>
  <div :style="`--color: ${color}`" class="DaemonProgressBar-Container" ref="container">

    <canvas :width='canvasWidth' :height='canvasHeight' class="progressbar-canvas" ref="canvas"></canvas>

    <div class="float-info">

      <span class="float-info-text">

        {{ now }} / {{ max }}

      </span>

    </div>

  </div>
</template>

<script>

const dToR = function(degrees){
  return degrees * (Math.PI / 180);
}

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

    },

    color: {

      type: String,
      default: "rgba(255,208,75,0.45)"

    }

  },
  watch: {

    now() {

      // 用 now / max 然后计算 360° 的弧度
      this.circle.rotation = (this.now / this.max) * 360;

    },

    max() {

      // 用 now / max 然后计算 360° 的弧度
      this.circle.rotation = (this.now / this.max) * 360;

    },

    'circle.rotation': {

      handler() {

        this.clear()
        this.renderCircle()

      }

    }

  },
  data() {

    return {

      canvasWidth: 0,
      canvasHeight: 0,

      circle: {
        x: -1,
        y: -1,
        radius: 70,
        speed: 1,
        rotation: 20,
        angleStart: 270,
        angleEnd: 90,
        thickness: 10,
        blur: 2
      },

      ctx: null,
      gradient1: null,
      gradient2: null

    }

  },
  mounted() {

    const container = this.$refs.container

    this.canvasWidth = container.clientWidth
    this.canvasHeight = container.clientHeight

    const c = this.$refs.canvas

    this.ctx = c.getContext('2d')

    this.circle.x = (this.canvasWidth / 2)
    this.circle.y = (this.canvasHeight / 2)

    this.ctx.shadowBlur = this.circle.blur;
    this.ctx.shadowColor = this.color;
    this.ctx.lineCap = 'round'

    this.gradient1 = this.ctx.createLinearGradient(0, -this.circle.radius, 0, this.circle.radius);
    this.gradient1.addColorStop(0, this.color);
    this.gradient1.addColorStop(1, this.color);

    this.gradient2 = this.ctx.createLinearGradient(0, -this.circle.radius, 0, this.circle.radius);
    this.gradient2.addColorStop(0, this.color);
    this.gradient2.addColorStop(.1, this.color);
    this.gradient2.addColorStop(1, this.color);

    this.renderCircle();

    const initial = () => {

      this.updateCircle()

      setTimeout(() => {

        initial()

      }, 16)

      // if( amo < 100 ) {
      //
      //
      //
      // } else {
      //
      //   this.clear()
      //
      //   this.circle.rotation = (this.now / this.max) * 360
      //
      //   console.log( this.circle.rotation );
      //
      //   this.renderCircle()
      //
      // }

    }

    initial()

  },
  methods: {

    updateCircle() {

      if(this.circle.rotation < 360){
        this.circle.rotation += this.circle.speed;
      } else {
        this.circle.rotation = 0;
      }
    },

    renderCircle() {

      const ctx = this.ctx
      const circle = this.circle

      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation));
      ctx.beginPath();
      ctx.arc(0, 0, circle.radius, dToR(circle.angleStart), dToR(circle.angleEnd), true);
      ctx.lineWidth = circle.thickness;
      ctx.strokeStyle = this.gradient1;
      ctx.stroke();
      ctx.restore();
    },

    clear() {

      const ctx = this.ctx

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, this.ctx.canvas.clientWidth * 2, this.ctx.canvas.clientHeight * 2);
      ctx.globalCompositeOperation = 'lighter';

    }

  }
};

</script>

<style scoped>

.float-info-text {

  position: absolute;

  left: 50%;
  top: 50%;

  font-size: 2em;
  font-weight: bold;

  transform: translate(-50%, -50%);

}

.float-info {

  position: absolute;

  top: 0;
  left: 50%;

  width: 100%;
  height: 100%;

  border-radius: 50%;
  background-color: var(--color);

  transform: translateX(-50%) scale(.7);
  animation: breathe 1.25s infinite linear;

}

.float-info::after {

  content: "";
  position: absolute;

  top: 0;
  left: 50%;

  width: 100%;
  height: 100%;

  border-radius: 50%;
  background-color: var(--color);
  opacity: .45;

  transform: translateX(-50%) scale(1.2);
  animation: breatheForBg 1.25s infinite linear;

}

@keyframes breathe {

  0% {

    transform: translateX(-50%) scale(.7)

  }

  40% {

    transform: translateX(-50%) scale(.75)

  }

  60% {

    transform: translateX(-50%) scale(.7)

  }

}

@keyframes breatheForBg {

  0% {

    transform: translateX(-50%) scale(1)

  }

  40% {

    transform: translateX(-50%) scale(1.2)

  }

  60% {

    transform: translateX(-50%) scale(1)

  }

}

.DaemonProgressBar-Container {

  position: absolute;

  width: 160px;
  height: 160px;

}

</style>
