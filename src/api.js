/* 请求封装成api来进行调用维护 */
import service from '@/utils/serves'

/* 登录请求 */
export function login(data) {
  console.log(data,11111);
  return service({
    method: 'post',
    url: '/user@login',
    data:{
      api: 'user@login',
      data
    }
  })
}
/* 学生列表数据 */
export function studentList(params){
  return service({
    method: 'get',
    url: '/students',
    params
  })
}