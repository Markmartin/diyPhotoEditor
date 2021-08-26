<template>
  <div class="photo-edit-view">
    <div id="image-container" class="image-container">
      <img class="base-plate" :src="bgSrc" />
      <div class="layer-container" id="layer-container">
        <img class="base-plate" :src="bgBodyLayerSrc" />
        <img class="base-plate" :src="bgWidgetLayerSrc" />
        <Drr
          v-for="(item, index) in avatarRectArray"
          :key="index"
          :x="item.x"
          :y="item.y"
          :w="item.width"
          :h="item.height"
          :aspectRatio="true"
        >
          <img class="avatar" :src="item.src" />
        </Drr>
      </div>
    </div>
    <button @click="generate">生成图片</button>
    <img class="image-result" :src="imageSrc" />
    <img class="image-layer-result" :src="imageLayerSrc" />
  </div>
</template>

<script>
import bgImage from '@/assets/BG.png'
import bgBodyLayerImage from '@/assets/BG_Body_Layer.png'
import bgWidgetLayerImage from '@/assets/BG_Widget_Layer.png'
import avatar from '@/assets/avatar.png'
import Drr from '@/components/Drr.vue'
import domtoimage from 'dom-to-image-scale'

export default {
  components: { Drr },
  data() {
    return {
      bgSrc: bgImage,
      bgBodyLayerSrc: bgBodyLayerImage,
      bgWidgetLayerSrc: bgWidgetLayerImage,
      avatarRectArray: [
        {
          x: 230,
          y: 205,
          width: 59,
          height: 97,
          rotation: 0,
          src: avatar
        },
        {
          x: 230,
          y: 205,
          width: 59,
          height: 97,
          rotation: 0,
          src: avatar
        }
      ],

      imageSrc: null,
      imageLayerSrc: null
    }
  },
  mounted() {},
  methods: {
    generate() {
      const _this = this
      const imageNode = document.getElementById('image-container')
      const imageLayerNode = document.getElementById('layer-container')
      domtoimage
        .toPng(imageNode, { bgcolor: '#ffffff' })
        .then(async function(dataUrl) {
          _this.imageSrc = dataUrl
        })
        .catch(function(error) {
          console.error('生成海报失败', error)
        })

      domtoimage
        .toPng(imageLayerNode, { bgcolor: '#ffffff' })
        .then(async function(dataUrl) {
          _this.imageLayerSrc = dataUrl
        })
        .catch(function(error) {
          console.error('生成海报失败', error)
        })
    }
  },
  computed: {
    avatarStyle() {
      return {
        left: `${this.avatarRect.x}px`,
        top: `${this.avatarRect.y}px`,
        width: `${this.avatarRect.width}px`,
        height: `${this.avatarRect.height}px`,
        transform: `rotate(${this.avatarRect.rotation}deg)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-edit-view {
  position: relative;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: aquamarine;
  overflow: auto;

  .image-container {
    position: relative;
    width: 100vw;
    height: 100vw;
    .base-plate {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .layer-container {
      position: relative;
      width: 100vw;
      height: 100vw;
    }
    .avatar {
      z-index: 1;
      //   object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  //   .image-result {
  //   }

  //   .image-layer-result {
  //   }
}
</style>
