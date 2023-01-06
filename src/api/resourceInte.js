/* 请求封装成api来进行调用维护 */
import service from '@/utils/serves'
/* 资源整理的api接口*/
/* 登录请求 */
export function searchData(data) {
  return service({
    method: 'post',
    url: '/KocPool@list',
    data:{
      api: 'KocPool@list',
      data
    }
  })
}
/* 修改领域请求 */
export function editTable(data) {
  return service({
    method: 'post',
    url: '/KocPool@edit',
    data:{
      api: 'KocPool@edit',
      data
    }
  })
}