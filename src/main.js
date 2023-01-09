import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
/* import './dataBackVuex' */
/* 挂载路由 */
/* import axios from 'axios'
Vue.prototype.axios=axios */
import service from './utils/serves'
Vue.prototype.service=service
/* 全局安装复制剪贴板 */
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(!localStorage.getItem('token')){
    if(to.path!='/login'){
      next('/login')
    } next()
  } next()
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
