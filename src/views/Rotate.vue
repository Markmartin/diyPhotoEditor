<template>
  <div>
    <div
      id="view"
      class="drag-container"
      :style="containerStyle"
      @touchstart.stop.prevent="touchstart"
      @touchmove.stop.prevent="touchmove"
      @touchend.stop.prevent="touchend"
    >
      <div
        class="stick br"
        @touchstart.stop.prevent="stickTouchStart"
        @touchmove.stop.prevent="stickTouchMove($event, 'br')"
        @touchend.stop.prevent="stickTouchUp"
      />
      <div
        class="stick tro"
        @touchstart.stop.prevent="stickTouchStart"
        @touchmove.stop.prevent="stickTouchMove($event, 'tro')"
        @touchend.stop.prevent="stickTouchUp"
      />

      <div class="ro-stick-handle" />
    </div>

    <button @click="click">测试</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      ratio: (200 / 200).toFixed(2),
      tRatio: (200 / 200).toFixed(2),
      rotation: 30,
      startPoint: {
        x: 0,
        y: 0,
      },
      moving: false,
      stickMoving: false,
      symmetricPoint: { x: 100, y: 100 },
    };
  },
  mounted() {
    const doc = document.getElementById("view");
    console.log(doc);
  },
  methods: {
    click(e) {
      console.log("666" + e);
      const div = document.getElementById("view");
      console.log(div.getBoundingClientRect());
    },
    touchstart(e) {
      console.log("手指按下");
      this.moving = true;
      this.startPoint = {
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
          x: touchPoint.x - this.startPoint.x,
          y: touchPoint.y - this.startPoint.y,
        };
        console.log(`鼠标坐标 - x:${touchPoint.x} y:${touchPoint.y}`);
        console.log(`鼠标移动距离 - x:${distance.x} y:${distance.y}`);
        if (distance.x !== 0 || distance.y !== 0) {
          this.x = this.x + distance.x;
          this.y = this.y + distance.y;
          this.startPoint = { ...touchPoint };
        }
      }
    },
    touchend() {
      console.log("鼠标松开");
      this.moving = false;
      this.startPoint = { x: 0, y: 0 };
    },
    stickTouchStart(e) {
      console.log("图钉按下");
      this.stickMoving = true;
      this.startPoint = {
        x: e.pageX || e.touches[0].pageX,
        y: e.pageY || e.touches[0].pageY,
      };

      this.symmetricPoint = {
        x:
          this.circleCenterPoint.x -
          (this.startPoint.x - this.circleCenterPoint.x),
        y:
          this.circleCenterPoint.y -
          (this.startPoint.y - this.circleCenterPoint.y),
      };
    },
    calculateRotatedPointCoordinate(point, center, rotate) {
      /**
       * 旋转公式：
       *  点a(x, y)
       *  旋转中心c(x, y)
       *  旋转后点n(x, y)
       *  旋转角度θ                tan ??
       * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
       * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
       */

      return {
        x:
          (point.x - center.x) * Math.cos((rotate * Math.PI) / 180) -
          (point.y - center.y) * Math.sin((rotate * Math.PI) / 180) +
          center.x,
        y:
          (point.x - center.x) * Math.sin((rotate * Math.PI) / 180) +
          (point.y - center.y) * Math.cos((rotate * Math.PI) / 180) +
          center.y,
      };
    },
    stickTouchMove(e, direction) {
      if (this.stickMoving) {
        const touchPoint = {
          x: e.pageX || e.touches[0].pageX,
          y: e.pageY || e.touches[0].pageY,
        };

        const distance = {
          x: touchPoint.x - this.startPoint.x,
          y: touchPoint.y - this.startPoint.y,
        };

        if (distance.x !== 0 || distance.y !== 0) {
          if (direction === "br") {
            // const dirX = direction.includes("r") ? 1 : -1;
            // const dirY = direction.inculdes("b") ? 1 : -1;

            // const rotateRad = (this.rotation * Math.PI) / 180;

            // const rotateDirVector = {
            //   x:
            //     distance.x * Math.cos(-rotateRad) -
            //     distance.y * Math.sin(-rotateRad),
            //   y:
            //     distance.x * Math.sin(-rotateRad) +
            //     distance.y * Math.cos(-rotateRad),
            // };

            // const symmetricPoint = {
            //   x: this.x,
            //   y: this.y,
            // };

            // const symmetricPoint = {
            //   x:
            //     this.circleCenterPoint.x -
            //     (touchPoint.x - this.circleCenterPoint.x),
            //   y:
            //     this.circleCenterPoint.y -
            //     (touchPoint.y - this.circleCenterPoint.y),
            // };

            const newCenterPoint = {
              x:
                this.symmetricPoint.x +
                (touchPoint.x - this.symmetricPoint.x) / 2,
              y:
                this.symmetricPoint.y +
                (touchPoint.y - this.symmetricPoint.y) / 2,
            };

            const newBottomRightPoint = this.calculateRotatedPointCoordinate(
              touchPoint,
              newCenterPoint,
              -this.rotation
            );

            const newTopLeftPoint = this.calculateRotatedPointCoordinate(
              this.symmetricPoint,
              newCenterPoint,
              -this.rotation
            );

            const newWidth = Math.abs(
              newBottomRightPoint.x - newTopLeftPoint.x
            );
            const newHeight = Math.abs(
              newBottomRightPoint.y - newTopLeftPoint.y
            );

            if (newWidth > 0 && newHeight > 0) {
              this.x = Math.round(newTopLeftPoint.x);
              this.y = Math.round(newTopLeftPoint.y);
              this.width = Math.round(newWidth);
              this.height = Math.round(newHeight);
            }

            const startVector = this.pointVector(
              this.circleCenterPoint,
              this.startPoint
            );
            const endVector = this.pointVector(
              this.circleCenterPoint,
              touchPoint
            );

            const direct =
              startVector.x * endVector.y - startVector.y * endVector.x;

            const lengthAB = this.pointDistance(
              this.circleCenterPoint,
              this.startPoint
            );
            const lengthAC = this.pointDistance(
              this.circleCenterPoint,
              touchPoint
            );
            const lengthBC = this.pointDistance(this.startPoint, touchPoint);

            const cosAngle =
              (Math.pow(lengthAB, 2) +
                Math.pow(lengthAC, 2) -
                Math.pow(lengthBC, 2)) /
              (2 * lengthAB * lengthAC); //   余弦定理求出旋转角

            const angle = Math.round((Math.acos(cosAngle) * 180) / Math.PI);

            if (direct < 0) {
              //叉乘结果为负表示逆时针旋转， 逆时针旋转减度数
              console.log(`旋转角度${-angle}`);
              this.rotation = this.rotation - angle;
            } else {
              //叉乘结果为正表示顺时针旋转，顺时针旋转加度数
              console.log(`旋转角度${angle}`);
              this.rotation = this.rotation + angle;
            }
          }

          if (direction === "tro") {
            const startVector = this.pointVector(
              this.circleCenterPoint,
              this.startPoint
            );
            const endVector = this.pointVector(
              this.circleCenterPoint,
              touchPoint
            );

            const direct =
              startVector.x * endVector.y - startVector.y * endVector.x;

            const lengthAB = this.pointDistance(
              this.circleCenterPoint,
              this.startPoint
            );
            const lengthAC = this.pointDistance(
              this.circleCenterPoint,
              touchPoint
            );
            const lengthBC = this.pointDistance(this.startPoint, touchPoint);

            const cosAngle =
              (Math.pow(lengthAB, 2) +
                Math.pow(lengthAC, 2) -
                Math.pow(lengthBC, 2)) /
              (2 * lengthAB * lengthAC); //   余弦定理求出旋转角

            const angle = Math.round((Math.acos(cosAngle) * 180) / Math.PI);

            if (direct < 0) {
              //叉乘结果为负表示逆时针旋转， 逆时针旋转减度数
              console.log(`旋转角度${-angle}`);
              this.rotation = this.rotation - angle;
            } else {
              //叉乘结果为正表示顺时针旋转，顺时针旋转加度数
              console.log(`旋转角度${angle}`);
              this.rotation = this.rotation + angle;
            }
          }

          this.startPoint = { ...touchPoint };
        }
      }
    },
    stickTouchUp() {
      console.log("图钉松开");
      this.symmetricPoint;
      this.moving = false;
      // const endTouchPoint = {
      //   x: e.pageX || e.touches[0].pageX,
      //   y: e.pageY || e.touches[0].pageY,
      // };

      // this.symmetricPoint = {
      //   x:
      //     this.circleCenterPoint.x -
      //     (endTouchPoint.x - this.circleCenterPoint.x),
      //   y:
      //     this.circleCenterPoint.y -
      //     (endTouchPoint.y - this.circleCenterPoint.y),
      // };
    },
    pointVector(p1, p2) {
      return {
        x: p2.x - p1.x,
        y: p2.y - p1.y,
      };
    },
    pointDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
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
        transform: `rotate(${this.rotation}deg)`,
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
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #6c6c6c;
    box-shadow: 0 0 2px #bbb;
  }

  .tro {
    left: calc(50% - 9px);
    top: -35px;
    cursor: ew-resize;
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

  .br {
    cursor: nwse-resize;
    bottom: -5px;
    right: -5px;
  }
}
</style>
