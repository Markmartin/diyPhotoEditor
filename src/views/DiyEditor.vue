<template>
  <div class="diy-editor">
    <div class="edit-container" id="fitst-layer">
      <!-- 全视图layer -->
      <img class="layer-template" :src="bgLayerSrc" />
      <div class="layer-container" id="second-layer">
        <!-- 身体挂件layer -->
        <img class="layer-template" :src="bgBodyLayerSrc" />
        <div class="layer-container" id="third-layer">
          <!-- 挂件layer -->
          <img class="layer-template" :src="bgWidgetLayerSrc" />
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
    </div>

    <img class="preview" :src="previewSrc" />
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

import backgroundImage from '@/assets/background_layer.png'
import backgroundBodyImage from '@/assets/background_body_layer.png'
import backgroundWidgetImage from '@/assets/background_widget_layer.png'
import avatar from '@/assets/avatar.png'
import Drr from '@/components/Drr.vue'

export default {
  name: 'Editor',
  components: { Drr },
  data() {
    return {
      bgLayerSrc: backgroundImage,
      bgBodyLayerSrc: backgroundBodyImage,
      bgWidgetLayerSrc: backgroundWidgetImage,
      avatarArray: [
        {
          x: 230,
          y: 205,
          width: 59,
          height: 97,
          rotation: 0,
          src: avatar
        }
      ],
      previewSrc: null
    }
  },

  methods: {
    fileChange(e) {
      if (e.target.files.length > 0) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function(readRes) {
          this.avatarArray.push({
            x: 230,
            y: 205,
            width: 59,
            height: 97,
            rotation: 0,
            src: avatar || readRes.target.result
          })
          this.$refs['upload-input'].value = ''
        }.bind(this)
      }
    },
    deleteSelf(index) {
      this.avatarArray.splice(index, 1)
    },
    genetateImage() {
      const firstDom = document.getElementById('fitst-layer')
      const secondDom = document.getElementById('second-layer')

      domtoimage.toBlob(firstDom, { bgcolor: '#ffffff', width: 2000, height: 2000 }).then(function(blob) {
        const a = document.createElement('a')
        const url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = '生产图.png'
        a.click()
        window.URL.revokeObjectURL(url)

        domtoimage.toBlob(secondDom, { bgcolor: '#ffffff', width: 2000, height: 2000 }).then(function(blob) {
          const a = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          a.href = url
          a.download = '身体挂件.png'
          a.click()
          window.URL.revokeObjectURL(url)
        })
      })

      // domtoimage.toBlob(firstDom, { bgcolor: '#ffffff' }).then(function(blob) {
      //   const a = document.createElement('a')
      //   const url = window.URL.createObjectURL(blob)
      //   a.href = url
      //   a.download = 'first-dom.png'
      //   a.click()
      //   window.URL.revokeObjectURL(url)
      // })

      // domtoimage.toBlob(thirdDom, { bgcolor: '#ffffff' }).then(function(blob) {
      //   const a = document.createElement('a')
      //   const url = window.URL.createObjectURL(blob)
      //   a.href = url
      //   a.download = 'third-dom.png'
      //   a.click()
      //   window.URL.revokeObjectURL(url)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.diy-editor {
  position: relative;
  // width: 100vw;
  // height: 100vh;
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .edit-container {
    position: relative;
    width: 100vw;
    height: 100vw;
    // width: 2000px;
    // height: 2000px;
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
    }

    .avatar {
      z-index: 1;
      width: 100%;
      height: 100%;
    }
  }

  .preview {
    position: relative;
    // width: 100vw;
    // height: 100vw;
    width: 2000px;
    height: 2000px;
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
