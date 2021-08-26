<template>
  <div class="scene">
    <mu-load-more @refresh="reload" @load="loadMore" :loading="paper.loading" :loaded-all="paper.loadAll">
      <div class="gird-scene">
        <div class="scene-view" v-for="(item, index) in scenes" :key="index">
          <img class="scene-image" :src="item.url" />
          <mu-button class="select-button" round color="success" @click="gotoEditor">选择这个</mu-button>
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
    },
    gotoEditor() {
      this.$router.push({ name: 'Editor' })
    }
  }
}
</script>

<style lang="scss" scoped>
$scene-width: 49vw;
$scene-height: calc(49vw + 45px);

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
    background-color: wheat;

    .scene-view {
      position: relative;
      width: $scene-width;
      height: $scene-height;
      background-color: white;
      border-radius: 10px;
      border: 5px solid white;
      .scene-image {
        position: absolute;
        top: 0;
        left: 0;
        width: $scene-width;
        height: $scene-width;
      }

      .select-button {
        position: absolute;
        left: calc(24vw - 60px);
        bottom: 0;
        width: 120px;
        height: 25px;
        line-height: 25px;
        border: 1px solid transparent;
        border-radius: 5vw;
      }
    }
  }
}
</style>
