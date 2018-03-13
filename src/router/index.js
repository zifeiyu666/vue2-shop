import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/shop/Index.vue'], resolve)
const Category = resolve => require(['@/views/shop/Category.vue'], resolve)
const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Car = resolve => require(['@/views/shop/Car.vue'],resolve)
const User = resolve => require(['@/views/shop/User.vue'], resolve)
const Detail = resolve => require(['@/views/shop/Detail.vue'], resolve)
const Search = resolve => require(['@/views/shop/Search.vue'], resolve)
const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const Login = resolve => require(['@/views/shop/login.vue'], resolve)


export default new Router({
  routes: [{
      path: '/shop',
      name: '首页',
      component: Index
    }, {
      path: '/shop/category',
      name: '分类页',
      redirect: '/shop/category/all',
      component: Category,
      children: [{
        path: '/shop/category/:tab',
        component:CategoryMain
      }]
    }, {
      path: '/shop/car',
      name: '购物车页',
      component: Car
    }, {
      path: '/shop/car/pay',
      name: '支付页',
      component: Pay
    },
    {
      path: '/shop/user',
      name: '用户页',
      component: User,
      meta: {
           requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
       },
    }, {
      path: '/shop/detail',
      name: '详情页',
      component: Detail
    }, {
      path: '/shop/search',
      name: '搜索页',
      component: Search
    },{
      path: '/shop/login',
      name: '登录页',
      component: Login
    }
  ]
})
