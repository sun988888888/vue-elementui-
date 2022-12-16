/* 请求封装成api来进行调用维护 */
import service from '@/utils/serves'

/* 登录请求 */
export function login(data) {
  return service({
    method: 'post',
    url: '/user@login',
    data:{
      api: 'user@login',
      data
    }
  })
}
/* 我的项目列表 */
export function getProjectList(data) {
  return service({
    method: 'post',
    url: '/project@list',
    data:{
      api: 'project@list',
      data
    }
  })
}
/* 项目详情 */
export function getProjectDetail(data) {
  return service({
    method: 'post',
    url: '/project@projectUserList',
    data:{
      api: 'project@projectUserList',
      data
    }
  })
}
/* 创建项目 */
export function editProject(data) {
  return service({
    method: 'post',
    url: '/project@create',
    data:{
      api: 'project@create',
      data
    }
  })
}
/* 创建数据回收任务 */
export function addRecycleOrder(data) {
  return service({
    method: 'post',
    url: '/task@create',
    data:{
      api: 'task@create',
      data
    }
  })
}
/* 选择任务用户 */
export function selectOrderUser(data) {
  return service({
    method: 'post',
    url: '/task@taskUserSelect',
    data:{
      api: 'task@taskUserSelect',
      data
    }
  })
}
/* 选择任务用户 */
export function orderList(data) {
  return service({
    method: 'post',
    url: '/task@list',
    data:{
      api: 'task@list',
      data
    }
  })
}
/* 选择任务用户列表 */
export function orderUserList(data) {
  return service({
    method: 'post',
    url: '/task@taskUser',
    data:{
      api: 'task@taskUser',
      data
    }
  })
}
/* 选择任务用户详情 */
export function orderUserInfo(data) {
  return service({
    method: 'post',
    url: '/task@taskUserInfo',
    data:{
      api: 'task@taskUserInfo',
      data
    }
  })
}
/* 下拉选项刷新 */
export function selectTypes(data) {
  return service({
    method: 'post',
    url: '/common@dataMaps',
    data:{
      api: 'common@dataMaps',
      data
    }
  })
}
/* 编辑用户任务 */
export function editUserOrder(data) {
  return service({
    method: 'post',
    url: '/task@editUserTask',
    data:{
      api: 'task@editUserTask',
      data
    }
  })
}
/* 数据回收任务详情 */
export function backOrderInfo(data) {
  return service({
    method: 'post',
    url: '/task@taskInfo',
    data:{
      api: 'task@taskInfo',
      data
    }
  })
}
/* 编辑任务 */
export function editTask(data) {
  return service({
    method: 'post',
    url: '/task@editTask',
    data:{
      api: 'task@editTask',
      data
    }
  })
}
/* 添加达人 */
export function addOrderUser(data) {
  return service({
    method: 'post',
    url: '/task@append',
    data:{
      api: 'task@append',
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