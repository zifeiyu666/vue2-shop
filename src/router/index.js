import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
// shop
const Index = resolve => require(['@/views/shop/Index.vue'], resolve)
const Category = resolve => require(['@/views/shop/Category.vue'], resolve)
const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Car = resolve => require(['@/views/shop/Car.vue'],resolve)
const Collection = resolve => require(['@/views/shop/Collection.vue'],resolve)
const Order = resolve => require(['@/views/shop/Order.vue'],resolve)
const Share = resolve => require(['@/views/shop/Share.vue'],resolve)
const User = resolve => require(['@/views/shop/User.vue'], resolve)
const Detail = resolve => require(['@/views/shop/Detail.vue'], resolve)
const Search = resolve => require(['@/views/shop/Search.vue'], resolve)
const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const Login = resolve => require(['@/views/shop/login.vue'], resolve)
const Edit = resolve => require(['@/views/shop/Edit.vue'], resolve)
const ShareCompany = resolve => require(['@/views/shop/ShareCompany.vue'], resolve)
// show
const ShowIndex = resolve => require(['@/views/show/index.vue'], resolve)
const ShowItem = resolve => require(['@/views/show/item.vue'], resolve)
const ShowNews = resolve => require(['@/views/show/news.vue'], resolve)
const ShowHistory = resolve => require(['@/views/show/history.vue'],resolve)
const ShowItemList = resolve => require(['@/views/show/itemList.vue'],resolve)
const ShowItemNav = resolve => require(['@/views/show/itemNav.vue'],resolve)
const ShowItemDetail = resolve => require(['@/views/show/item/itemDetail.vue'],resolve)
const ShowHouseList = resolve => require(['@/views/show/item/houseList.vue'],resolve)
const ShowHouseDetail = resolve => require(['@/views/show/item/houseDetail.vue'],resolve)
const ShowBrandList = resolve => require(['@/views/show/item/brandList.vue'],resolve)
const ShowBrandDetail = resolve => require(['@/views/show/item/brandDetail.vue'],resolve)
const ShowAutoNav = resolve => require(['@/views/show/item/autoNav.vue'],resolve)

const shopRouters = [{
    path: '/shop',
    name: '首页',
    component: Index
  }, 
  {
    path: '/shop/category',
    name: '分类页',
    redirect: '/shop/category/all',
    component: Category,
    children: [{
      name: '分类子页',
      path: '/shop/category/:tab',
      component:CategoryMain
    }]
  },
  {
    path: '/shop/car',
    name: '购物车页',
    component: Car
  },
  {
    path: '/shop/collection',
    name: '收藏',
    component: Collection
  },
  {
    path: '/shop/order',
    name: '立即购买',
    component: Order
  },{
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
  }, 
  {
    path: '/shop/share',
    name: '分销中心',
    component: Share,
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    },
  },
  {
    path: '/shop/shareCompany',
    name: '分销商',
    component: ShareCompany,
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    },
  }, 
  {
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
  },
  {
    path: '/shop/edit',
    name: '修改资料',
    component: Edit
  }
]

const showRouters = [
  {
    path: '/show',
    name: 'showIndex',
    component: ShowIndex
  },
  {
    path: '/show/item',
    name: 'showItem',
    component: ShowItem
  },
  {
    path: '/show/item/list',
    name: 'showItemList',
    component: ShowItemList
  },
  {
    path: '/show/itemNav',
    name: 'showItemNav',
    component: ShowItemNav
  },
  {
    path: '/show/itemDetail',
    name: 'ShowItemDetail',
    component: ShowItemDetail
  },
  {
    path: '/show/houseList',
    name: 'ShowHouseList',
    component: ShowHouseList
  },
  {
    path: '/show/houseDetail',
    name: 'ShowHouseDetail',
    component: ShowHouseDetail
  },
  {
    path: '/show/brandList',
    name: 'ShowBrandList',
    component: ShowBrandList
  },
  {
    path: '/show/brandDetail',
    name: 'ShowBrandDetail',
    component: ShowBrandDetail
  },
  {
    path: '/show/autoNav',
    name: 'ShowAutoNav',
    component: ShowAutoNav
  },
  {
    path: '/show/news',
    name: 'showNews',
    component: ShowNews
  },
  {
    path: '/show/history',
    name: 'showHistory',
    component: ShowHistory
  }
]

export default new Router({
  routes: [
    ...shopRouters,
    ...showRouters
  ]
})
