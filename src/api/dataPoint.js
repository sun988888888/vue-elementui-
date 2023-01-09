/* 请求封装成api来进行调用维护 */
import service from '@/utils/serves'
/* 资源整理的api接口*/
/* 埋点 */
export function dataPoint(data) {
  return service({
    method: 'post',
    url: '/data@record',
    data:{
      api: 'data@record',
      data
    }
  })
}
/* 埋点数据获取 */
export function dataPointList(data) {
  return service({
    method: 'post',
    url: '/data@list',
    data:{
      api: 'data@list',
      data
    }
  })
}