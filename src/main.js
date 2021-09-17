import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import Toast from 'muse-ui-toast'
Vue.use(Toast)

import 'muse-ui-loading/dist/muse-ui-loading.css' // load css
import Loading from 'muse-ui-loading'
Vue.use(Loading)

Vue.use(MuseUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
