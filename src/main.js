import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

import router from './router'
/* 挂载路由 */
/* import axios from 'axios'
Vue.prototype.axios=axios */
import service from './utils/serves'
Vue.prototype.service=service

import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
