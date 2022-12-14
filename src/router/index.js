import Vue from 'vue'
import Router from 'vue-router'
/* import Home from '../components/Home.vue' */
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
        },
        {
          path: '/layout/expertDetail',
          name: '达人信息',
          hidden: true,
          iconClass: 'fa fa-line-chart',
          component: () => import('@/view/expertDetail'),
        },
        {
          path: '/layout/dataBack',
          name: '数据回收',
          iconClass: 'fa fa-line-chart',
          component: () => import('@/view/DataBackView'),
        },
        {
          path: '/layout/DataBackDetail',
          name: '数据回收详情',
          hidden: true,
          iconClass: 'fa fa-line-chart',
          component: () => import('@/view/DataBackDetail'),
        },

      ]
    },
    {
      path: '*',
      name: 'notFind',
      hidden: true,
      component: () => import('@/view/notFind.vue') //官方推荐路由懒加载
    }
  ],
  mode: 'history'
})