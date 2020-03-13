import Vue from 'vue'
import App from './index.vue'
import cjhUI from 'cjh-ui-vue'
import axios from 'axios'
import returnTop from '@/components/returnTop'
import goShopCar from '@/components/goShopCar'
import 'lib-flexible/flexible.js'
import 'cjh-ui-vue/lib/cjh-ui-vue.css'
import '@/styles/common.less'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(cjhUI)
Vue.use(returnTop)
Vue.use(goShopCar)

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
