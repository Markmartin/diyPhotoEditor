<template>
  <div class="diy-editor">
    <div class="edit-container" id="fitst-layer">
      <!-- 全视图layer -->
      <img class="layer-template" :src="bgLayerSrc" />
      <div class="layer-container" id="second-layer">
        <!-- 身体挂件layer -->
        <img class="layer-template" :src="bgBodyLayerSrc" />
        <!-- 挂件layer -->
        <!-- <img class="layer-template" :src="bgWidgetLayerSrc" /> -->
        <!-- 头饰layer -->
        <img class="layer-template head-wear" :src="bgHeadwearLayerSrc" />
        <Drr
          v-for="(item, index) in avatarArray"
          :key="index"
          :index="index"
          :x="item.x"
          :y="item.y"
          :w="item.width"
          :h="item.height"
          :aspectRatio="true"
          @deleteSelf="deleteSelf"
        >
          <img class="avatar" :src="item.src" />
        </Drr>
      </div>
    </div>

    <div class="footer">
      <div class="footer-view">
        <div class="upload">
          <div class="upload-text">上传头像照片</div>
          <input ref="upload-input" class="upload-button" type="file" accept=".jpg, .jpeg, .png" @change="fileChange" />
        </div>
      </div>
      <div class="footer-view">
        <div class="upload" @click="genetateImage">
          <div class="upload-text">编辑完成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image-scale'
import Drr from '@/components/Drr.vue'
import { apiSceneLayer, apiUploadAvatar, apiUploadImage, apiOrder } from '@/utils/api'

export default {
  name: 'Editor',
  components: { Drr },
  data() {
    return {
      bgLayerSrc: null,
      bgBodyLayerSrc: null,
      // bgWidgetLayerSrc: null,
      bgHeadwearLayerSrc: null,
      avatarArray: [],
      previewSrc: null,
      loading: null
    }
  },
  mounted() {
    this.downloadLayer()
  },

  methods: {
    async downloadLayer() {
      if (this.$route.query.id && this.$route.query.orderNo) {
        this.loading = this.$loading()

        const response = await apiSceneLayer(this.$route.query.id)
        if (response.status) {
          const { backgroundImage, headPartsImage, partsImage } = response.data
          this.bgLayerSrc = `data:image/png;base64,${backgroundImage}`
          this.bgBodyLayerSrc = `data:image/png;base64,${partsImage}`
          this.bgHeadwearLayerSrc = `data:image/png;base64,${headPartsImage}`
        }

        this.loading.close()
      }
    },
    async fileChange(e) {
      if (e.target.files.length > 0) {
        const loading = this.$loading()
        const response = await apiUploadAvatar(e.target.files[0])
        if (response.status) {
          console.log(response)
          this.addAvatar(response.data)
        }
        loading.close()
        this.$refs['upload-input'].value = ''
      }
    },
    addAvatar(avatar) {
      const { width, height, file } = avatar
      const avatarWidget = {
        x: parseInt(this.screenWidth / 2),
        y: parseInt(this.screenWidth / 2),
        width: parseInt(this.screenWidth * 0.2),
        height: parseInt((height * parseInt(this.screenWidth * 0.2)) / width),
        rotation: 0,
        src: `data:image/png;base64,${file}`
      }
      this.avatarArray.push(avatarWidget)
    },
    deleteSelf(index) {
      this.avatarArray.splice(index, 1)
    },
    genetateImage() {
      const firstDom = document.getElementById('fitst-layer')
      const secondDom = document.getElementById('second-layer')

      let fileUrlMap = new Map()

      const _this = this

      this.loading = this.$loading()

      domtoimage.toBlob(firstDom, { bgcolor: '#ffffff', width: 2000, height: 2000 }).then(async function(blob) {
        const file = new window.File([blob], 'mainlayer.png', { type: 'image/png' })
        const response = await apiUploadImage(file)
        if (response.status) {
          fileUrlMap.set('mainLayer', response.data)
          if (fileUrlMap.size === 2) {
            console.log('触发生成订单')
            _this.generateOrder(fileUrlMap)
          }
        }

        if (!response.status) {
          this.loading.close()
        }
      })

      domtoimage.toBlob(secondDom, { bgcolor: '#ffffff', width: 2000, height: 2000 }).then(async function(blob) {
        const file = new window.File([blob], 'attachlayer.png', { type: 'image/png' })
        const response = await apiUploadImage(file)
        if (response.status) {
          fileUrlMap.set('attachLayer', response.data)
          if (fileUrlMap.size === 2) {
            console.log('触发生成订单')
            _this.generateOrder(fileUrlMap)
          }
        }

        if (!response.status) {
          this.loading.close()
        }
      })
    },
    async generateOrder(fileUrlMap) {
      const response = await apiOrder({
        orderNum: this.$route.query.orderNo,
        backProduct: fileUrlMap.mainLayer,
        composeProduct: fileUrlMap.attachLayer
      })
      this.loading.close()

      if (response.status) {
        this.$toast.success({ position: 'top', message: '图片提交成功' })
      }
    }
  },
  computed: {
    screenWidth() {
      return document.documentElement.clientWidth
    },
    screenHeight() {
      return document.documentElement.clientHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.diy-editor {
  position: relative;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  // justify-content: center;

  .edit-container {
    position: relative;
    width: 100vw;
    height: 100vw;
    .layer-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .layer-template {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .head-wear {
      z-index: 100;
    }

    .avatar {
      z-index: 99;
      width: 100%;
      height: 100%;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    display: flex;

    .footer-view:last-child {
      border-left: 1px solid white;
    }

    .footer-view {
      flex: auto;
      width: 50%;
      height: 40px;
      .upload {
        position: relative;
        width: 100%;
        background-color: #2196f3;
        color: white;
        .upload-text {
          width: 100%;
          text-align: center;
          height: 40px;
          line-height: 40px;
        }

        .upload-button {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }
}
</style>
