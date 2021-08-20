<template>
  <div class="photo-container">
    <div id="container" class="container">
      <img class="base-plate" :src="plateSrc" />

      <Drr
        :x="avatarRect.x"
        :y="avatarRect.y"
        :w="avatarRect.width"
        :h="avatarRect.height"
        :aspectRatio="true"
      >
        <img class="avatar" :src="avatarRect.src" />
      </Drr>
    </div>
    <button @click="generate">生成图片</button>
    <img class="cp" :src="imageSrc" />
  </div>
</template>

<script>
import image from "@/assets/background.jpeg";
import avatar from "@/assets/avatar.png";

import Drr from "@/components/Drr.vue";
import domtoimage from "dom-to-image-scale";

export default {
  components: { Drr },
  data() {
    return {
      plateSrc: image,
      avatarRect: {
        x: 230,
        y: 205,
        width: 100,
        height: 100,
        rotation: 0,
        src: avatar,
      },

      imageSrc: null,
    };
  },
  mounted() {
    // const div = document.getElementById("container");
    // this.outerBound = {
    //   x: div.offsetLeft + div.offsetWidth / 2,
    //   y: div.offsetHeight / 2,
    //   w: div.offsetWidth,
    //   h: div.offsetHeight,
    // };
    // this.innerBound = {
    //   x: div.offsetWidth / 2,
    //   y: div.offsetHeight / 2,
    //   w: div.offsetWidth,
    //   h: div.offsetHeight,
    // };
    // console.log(div);
  },
  methods: {
    generate() {
      // const _this = this;
      const node = document.getElementById("container");
      // domtoimage
      //   .toPng(node, { bgcolor: "#ffffff" })
      //   .then(async function(blob) {
      //     _this.imageSrc = blob;
      //     // _this.imageSrc = window.URL.createObjectURL(blob);
      //   })
      //   .catch(function(error) {
      //     console.error("生成海报失败", error);
      //   });
      domtoimage
        .toBlob(node, { bgcolor: "#ffffff" })
        .then(async function(blob) {
          let url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "result.png";
          a.click();
        })
        .catch(function(error) {
          console.error("生成海报失败", error);
        });
    },
  },
  computed: {
    avatarStyle() {
      return {
        left: `${this.avatarRect.x}px`,
        top: `${this.avatarRect.y}px`,
        width: `${this.avatarRect.width}px`,
        height: `${this.avatarRect.height}px`,
        transform: `rotate(${this.avatarRect.rotation}deg)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.photo-container {
  position: relative;
  min-width: 100vw;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  background-color: aquamarine;
  // overflow: hidden;
  overflow: auto;

  .container {
    position: relative;
    width: 100vw;
    height: 100vw;
    .base-plate {
      position: relative;
      width: 100vw;
      height: 100vw;
    }
    .avatar {
      z-index: 1;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .cp {
    display: block;
    width: 2000px;
    height: 2000px;
  }
}
// .photo-container {
//   position: absolute;
//   width: 100vw;
//   height: 100vw;
//   top: calc(50% - 50vw);
//   .base-plate {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//   }

//   .avatar {
//     object-fit: cover;
//     width: 100%;
//     height: 100%;
//   }
// }
</style>
