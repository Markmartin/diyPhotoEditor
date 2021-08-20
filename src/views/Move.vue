<template>
  <div class="page" id="page">
    <div class="photo-container" id="photo-container">
      <img class="base-plate" :src="plateSrc" />
      <Moveable
        class="moveable"
        v-bind="moveable"
        @drag="handleDrag"
        @scale="handleScale"
        @rotate="handleRotate"
        @pinch="handlePinch"
      >
        <img class="avatar" :src="avatarSrc" />
      </Moveable>
    </div>
  </div>
</template>

<script>
import Moveable from "vue-moveable";
import image from "@/assets/background.jpeg";
import avatar from "@/assets/avatar.png";
export default {
  components: { Moveable },
  data() {
    return {
      plateSrc: image,
      avatarSrc: avatar,
      moveable: {
        draggable: false,
        scalable: false,
        rotatable: false,
        // pinchable: true,
        keepRatio: false,
        warpable: false,
        renderDirections: [],
        ables: [],
      },
    };
  },
  mounted() {
    // this.moveable = {
    //   ...this.moveable,
    // container: document.getElementById("photo-container"),
    // };
  },
  methods: {
    handleDrag({ target, transform }) {
      console.log("onDrag left, top", transform);
      target.style.transform = transform;
    },
    handleScale({ target, transform, scale }) {
      console.log("onScale scale", scale);
      target.style.transform = transform;
    },
    handleRotate({ target, dist, transform }) {
      console.log("onRotate", dist);
      target.style.transform = transform;
    },
    handlePinch({ target }) {
      console.log("onPinch", target);
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 100px;
  height: 100px;
}
.page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: bisque;
  display: flex;
  justify-content: center;
  // align-items: center;
  .photo-container {
    position: relative;
    width: 100vw;
    height: 100vw;
    overflow: hidden;
    .base-plate {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .moveable {
      border: none;
      position: absolute;
      left: 50px;
      top: 50px;
      width: 100px;
      height: 100px;
    }
  }
}
</style>
