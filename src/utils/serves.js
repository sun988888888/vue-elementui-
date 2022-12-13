import axios from 'axios'
import { getToken } from '@/utils/setToken'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: '/api',//baseurl会自动加在请求地址
  timeout: 3000
})

/* 请求拦截 */
service.interceptors.request.use((config) => {
  //获取并设置token
  config.headers['token'] = getToken('token')
  return config
}, (err) => {
  return Promise.reject(err)
})
/* 添加响应拦截器 */
service.interceptors.response.use((response) => {
  //对响应做些什么
  let { status, message } = response.data
  if (status != 200) {
    return Message({ message: message || 'error', type: "warning" })
  }
  return Promise.resolve(response.data)
}, (err) => {
  return Promise.reject(err)
})
export default service