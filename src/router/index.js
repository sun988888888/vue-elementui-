import Vue from 'vue'
import Router from 'vue-router'
/* import Home from '../components/Home.vue' */
/* 
role   1是管理员 0不是
*/
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      hidden: true,
      component: () => import('@/view/Login.vue')
    },
    {
      path: '/login',
      name: 'Login',
      hidden: true,
      component: () => import('@/view/Login.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      iconClass: 'fa fa-users',
      redirect: '/layout/myProject',
      component: () => import('@/layout'),
      children: [
        {
          path: '/layout/myProject',
          name: '我的项目',
          iconClass: 'fa fa-line-chart',
          component: () => import('@/view/MyProject'),
          meta: {keepAlive: false,role:[1,0]} //是否开启缓存
        },
        {
          path: '/layout/expertDetail',
          name: '达人信息',
          hidden: true,
          iconClass: 'fa fa-line-chart',
          component: () => import('@/view/expertDetail'),
          meta: {keepAlive: false,role:[1,0]} //是否开启缓存
        },
        {
          path: '/layout/dataBack',
          name: '数据回收',
          iconClass: 'fa fa-line-chart',
          component: () => import('@/view/DataBackView'),
          meta: {keepAlive: false,role:[1,0]} //是否开启缓存
        },
        {
          path: '/layout/DataBackDetail',
          name: '数据回收详情',
          hidden: true,
          iconClass: 'fa fa-line-chart',
          component: () => import('@/view/DataBackDetail'),
          meta: {keepAlive: false,role:[1,0]} //是否开启缓存
        },
        {
          path: '/layout/expertData',
          name: '达人资源',
          iconClass: 'fa fa-line-chart',
          component: () => import('@/view/expertData'),
          meta: {keepAlive: true,role:[1,0]} //是否开启缓存
        },
        {
          path: '/layout/dataPoint',
          name: '数据埋点',
          iconClass: 'fa fa-line-chart',
          component: () => import('@/view/dataPoint'),
          meta: {keepAlive: false,role:[1]} //是否开启缓存
        }
      ]
    },
    {
      path: '*',
      name: 'notFind',
      hidden: true,
      component: () => import('@/view/notFind.vue') //官方推荐路由懒加载
    }
  ],
  mode: 'hash'
})