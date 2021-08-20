<template>
  <div
    class="drag-container"
    :style="containerStyle"
    @touchstart.stop.prevent="touchstart"
    @touchmove.stop.prevent="touchmove"
    @touchend.stop.prevent="touchend"
  >
    <div
      class="stick tro"
      @touchstart.stop.prevent="stickTouchStart"
      @touchmove.stop.prevent="stickTouchMove($event, 'tro')"
      @touchend.stop.prevent="stickTouchUp"
    />

    <div
      class="stick tl"
      @touchstart.stop.prevent="stickTouchStart"
      @touchmove.stop.prevent="stickTouchMove($event, 'tl')"
      @touchend.stop.prevent="stickTouchUp"
    />
    <div
      class="stick tr"
      @touchstart.stop.prevent="stickTouchStart"
      @touchmove.stop.prevent="stickTouchMove($event, 'tr')"
      @touchend.stop.prevent="stickTouchUp"
    />
    <div
      class="stick bl"
      @touchstart.stop.prevent="stickTouchStart"
      @touchmove.stop.prevent="stickTouchMove($event, 'bl')"
      @touchend.stop.prevent="stickTouchUp"
    />
    <div
      class="stick br"
      @touchstart.stop.prevent="stickTouchStart"
      @touchmove.stop.prevent="stickTouchMove($event, 'br')"
      @touchend.stop.prevent="stickTouchUp"
    />

    <div class="ro-stick-handle" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 150,
      y: 50,
      width: 160,
      height: 110,
      ratio: (160 / 110).toFixed(2),
      tRatio: (110 / 160).toFixed(2),
      rotation: -90,
      touchStartPoint: {
        x: 0,
        y: 0,
      },
      moving: false,
      stickMoving: false,
    };
  },
  methods: {
    touchstart(e) {
      console.log("手指按下");
      this.moving = true;
      this.touchStartPoint = {
        x: e.pageX || e.touches[0].pageX,
        y: e.pageY || e.touches[0].pageY,
      };
    },
    touchmove(e) {
      if (this.moving) {
        const touchPoint = {
          x: e.pageX || e.touches[0].pageX,
          y: e.pageY || e.touches[0].pageY,
        };

        const distance = {
          x: touchPoint.x - this.touchStartPoint.x,
          y: touchPoint.y - this.touchStartPoint.y,
        };
        console.log(`鼠标坐标 - x:${touchPoint.x} y:${touchPoint.y}`);
        console.log(`鼠标移动距离 - x:${distance.x} y:${distance.y}`);
        if (distance.x !== 0 || distance.y !== 0) {
          this.x = this.x + distance.x;
          this.y = this.y + distance.y;
          this.touchStartPoint = { ...touchPoint };
        }
      }
    },
    touchend() {
      console.log("鼠标松开");
      this.moving = false;
      this.touchStartPoint = { x: 0, y: 0 };
    },
    stickTouchStart(e) {
      console.log("图钉按下");
      this.stickMoving = true;
      this.touchStartPoint = {
        x: e.pageX || e.touches[0].pageX,
        y: e.pageY || e.touches[0].pageY,
      };
    },
    stickTouchMove(e, direction) {
      if (this.stickMoving) {
        const touchPoint = {
          x: e.pageX || e.touches[0].pageX,
          y: e.pageY || e.touches[0].pageY,
        };

        const distance = {
          x: touchPoint.x - this.touchStartPoint.x,
          y: touchPoint.y - this.touchStartPoint.y,
        };

        // console.log(`鼠标坐标 - x:${touchPoint.x} y:${touchPoint.y}`);
        // console.log(`鼠标移动距离 - x:${distance.x} y:${distance.y}`);
        if (distance.x !== 0 || distance.y !== 0) {
          if (direction === "br") {
            if (Math.abs(distance.x / distance.y) > this.ratio) {
              this.width = this.width + distance.x;
              this.height = this.height + distance.x * this.tRatio;
            } else {
              this.width = this.width + distance.y * this.ratio;
              this.height = this.height + distance.y;
            }
          }

          if (direction === "bl") {
            if (Math.abs(distance.x / distance.y) > this.ratio) {
              this.x = this.x + distance.x;
              this.width = this.width - distance.x;
              this.height = this.height - distance.x * this.tRatio;
            } else {
              this.x = this.x - distance.y * this.ratio;
              this.width = this.width + distance.y * this.ratio;
              this.height = this.height + distance.y;
            }
          }

          if (direction === "tl") {
            if (Math.abs(distance.x / distance.y) > this.ratio) {
              this.x = this.x + distance.x;
              this.y = this.y + distance.x * this.tRatio;
              this.width = this.width - distance.x;
              this.height = this.height - distance.x * this.tRatio;
            } else {
              this.x = this.x + distance.y * this.ratio;
              this.y = this.y + distance.y;
              this.width = this.width - distance.y * this.ratio;
              this.height = this.height - distance.y;
            }
          }

          if (direction === "tr") {
            if (Math.abs(distance.x / distance.y) > this.ratio) {
              this.y = this.y - distance.x * this.tRatio;
              this.width = this.width + distance.x;
              this.height = this.height + distance.x * this.tRatio;
            } else {
              this.y = this.y + distance.y;
              this.width = this.width - distance.y * this.ratio;
              this.height = this.height - distance.y;
            }
          }

          if (direction === "tro") {
            // console.log(`初始点:${JSON.stringify(this.touchStartPoint)}`);
            // console.log(`当前点:${JSON.stringify(touchPoint)}`);
            // console.log(this.circleCenterPoint);

            const x1 = this.touchStartPoint.x - this.circleCenterPoint.x;
            const y1 = this.touchStartPoint.y - this.circleCenterPoint.y;

            const x2 = touchPoint.x - this.circleCenterPoint.x;
            const y2 = touchPoint.y - this.circleCenterPoint.y;

            // 计算cos =(x1x2+y1y2)/[√(x1²+y1²)*√(x2²+y2²)]
            const cos =
              (x1 * x2 + y1 * y2) /
              (Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2)) *
                Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2)));

            // 弧度
            const radina = Math.acos(cos);
            // 角度
            const angle = 180 / (Math.PI / radina);

            // if (x2 < 0 && y2< 0) {
            //   //相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系
            //   angle = -angle;
            // } else if (ox < 0 && oy > 0) {
            //   //左下角,3象限
            //   angle = -(180 - angle);
            // } else if (ox > 0 && oy < 0) {
            //   //右上角，1象限
            //   angle = angle;
            // } else if (ox > 0 && oy > 0) {
            //   //右下角，2象限
            //   angle = 180 - angle;
            // }

            this.rotation = this.rotation + angle;
          }

          this.touchStartPoint = { ...touchPoint };
        }
      }
    },
    stickTouchUp() {
      console.log("图钉松开");
      this.moving = false;
      this.touchStartPoint = { x: 0, y: 0 };
    },
  },
  computed: {
    circleCenterPoint() {
      return {
        x: this.x + Math.round(this.width / 2),
        y: this.y + Math.round(this.width / 2),
      };
    },
    containerStyle() {
      return {
        left: `${this.x}px`,
        top: `${this.y}px`,
        width: `${this.width}px`,
        height: `${this.height}px`,
        transform: `rotate(${this.rotation}deg`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.drag-container {
  position: absolute;
  box-sizing: border-box;
  cursor: pointer;
  background-color: bisque;
  width: 100vw;
  height: 100vh;
  background: url("https://static-files.ai-ways.com/wp-content/uploads/2020/04/u5-pics-1-to-https___media.ai-ways.eu_wp-content_uploads_2020_05_u5-hi-res-10_MY21.jpg")
    no-repeat center center;
  background-size: cover;

  .stick {
    position: absolute;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #6c6c6c;
    box-shadow: 0 0 2px #bbb;
  }

  .tro {
    left: calc(50% - 4px);
    top: -25px;
    cursor: ew-resize;
    border-radius: 4px;
  }

  .ro-stick-handle {
    position: absolute;
    left: 50%;
    top: -16px;
    box-sizing: border-box;
    font-size: 1px;
    background: #ffffff;
    border: 1px solid #6c6c6c;
    box-shadow: 0 0 2px #bbb;
    width: 0px;
    height: 16px;
  }

  .tl {
    cursor: nwse-resize;
    top: -5px;
    left: -5px;
  }

  .tr {
    cursor: nesw-resize;
    top: -5px;
    right: -5px;
  }

  .bl {
    cursor: nesw-resize;
    bottom: -5px;
    left: -5px;
  }

  .br {
    cursor: nwse-resize;
    bottom: -5px;
    right: -5px;
  }
}
</style>
