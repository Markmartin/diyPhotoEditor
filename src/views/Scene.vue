<template>
  <div class="scene">
    <mu-load-more @refresh="reload" @load="loadMore" :loading="paper.loading" :loaded-all="paper.loadAll">
      <div class="gird-scene">
        <div class="scene-view" v-for="(item, index) in scenes" :key="index">
          <img class="scene-image" :src="item.url" />
          <div class="select-button">选择这个</div>
        </div>
      </div>
    </mu-load-more>
  </div>
</template>

<script>
import sceneImage from '@/assets/scene.png'
export default {
  name: 'Scene',
  data() {
    return {
      scenes: [{ url: sceneImage }],
      paper: {
        pageNum: 1,
        pageSize: 10,
        loading: false,
        loadAll: false
      }
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    loadScene() {
      this.paper = { ...this.paper, loading: true }
      for (let i = 0; i < 10; i++) {
        this.scenes.push({ url: sceneImage })
      }
      this.paper = { ...this.paper, loading: false, loadAll: this.scenes.length === 30 ? true : false }
    },
    reload() {
      this.scenes = []
      this.page = { pageNum: 1, pageSize: 10, loadAll: false, loading: false }
      this.loadScene()
    },
    loadMore() {
      this.page = { ...this.paper, pageNum: ++this.paper.pageNum }
      this.loadScene()
    }
  }
}
</script>

<style lang="scss" scoped>
$scene-width: 49vw;
$scene-height: 49vw;

.scene {
  position: relative;
  width: 100vw;
  .gird-scene {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: $scene-width $scene-width;
    grid-template-rows: $scene-height $scene-height;
    grid-row-gap: 2vw;
    grid-column-gap: 2vw;
    .scene-view {
      position: relative;
      width: $scene-width;
      height: $scene-height;
      .scene-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .select-button {
        position: absolute;
        left: 10%;
        bottom: 10px;
        width: 80%;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
