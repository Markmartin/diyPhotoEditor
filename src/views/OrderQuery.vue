<template>
  <div class="order-query">
    <img class="header" :src="headerSrc" />
    <div class="content">
      <div class="title">{{ title }}</div>
      <mu-text-field class="order-input" v-model="orderNo" placeholder="请在此处粘贴订单号" icon="search" full-width />
      <mu-button class="order-submit" color="primary" full-width @click="gotoScene">订单获取</mu-button>
    </div>
    <img class="footer" :src="footerSrc" />
  </div>
</template>

<script>
import headerImage from '@/assets/order-header.png'
import footerImage from '@/assets/order-footer.png'
export default {
  name: 'OrderQuery',
  data() {
    return {
      headerSrc: headerImage,
      footerSrc: footerImage,
      title: '影像DIY助手',
      orderNo: null
    }
  },
  methods: {
    gotoScene() {
      this.$router.push({ name: 'Scene' })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-query {
  position: relative;
  width: 100vw;
  height: 100vh;
  //   background-color: bisque;

  .header {
    position: relative;
    width: 100vw;
    height: 58.6vw;
  }

  .content {
    position: relative;
    margin: -50px auto 0;
    width: 87vw;
    height: 200px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 16px 0 rgb(0 0 0 / 11%);
    padding: 1px;
    .title {
      position: relative;
      margin: 20px auto 0;
      width: 200px;
      height: 40px;
      line-height: 40px;
      font-weight: 400;
      font-size: 26px;
    }

    .title::before,
    .title::after {
      content: '';
      width: 0.8125rem;
      height: 0.1875rem;
      background: linear-gradient(90deg, #cbe5ff, #1a8cff);
      display: block;
      border-radius: 0.1875rem;
      position: absolute;
      top: 1rem;
    }

    .title::before {
      left: 0;
    }

    .title::after {
      right: 0;
    }

    .order-input {
      width: 80%;
      margin: 10px auto;
      padding-right: 40px;
    }

    .order-submit {
      width: 80%;
      margin: 0 auto;
    }
  }

  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 14.9vw;
  }
}
</style>
