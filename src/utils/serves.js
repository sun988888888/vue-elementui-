import axios from 'axios'
import { getStorage } from '@/utils/setStorage'
import { Message } from 'element-ui'
import $store from '@/store'
import router from "@/router";
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,//baseurl会自动加在请求地址
  timeout: 20000
})

/* 请求拦截 */
service.interceptors.request.use((config) => {
  /* 没有身份的话重新登陆 */
  if(config.data.api!='user@login' && $store.state.user.identity===''){
    router.push('/')
  }
  //获取并设置token
  config.headers['token'] = getStorage('token')
  return config
}, (err) => {
  return Promise.reject(err)
})
/* 添加响应拦截器 */
service.interceptors.response.use((response) => {
  //对响应做些什么
  let { code, msg } = response.data
  if (code == 501) {
    router.push('/')
    return Message({ message: msg || 'error', type: "warning" })
  }
  return Promise.resolve(response.data)
}, (err) => {
  return Promise.reject(err)
})
export default service