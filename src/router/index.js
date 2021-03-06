import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
// shop
const Index = resolve => require(['@/views/shop/Index.vue'], resolve)
const ChangeCard = resolve => require(['@/views/shop/changeCard.vue'], resolve)
const Category = resolve => require(['@/views/shop/Category.vue'], resolve)
const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Car = resolve => require(['@/views/shop/Car.vue'],resolve)
const Collection = resolve => require(['@/views/shop/Collection.vue'],resolve)
const Order = resolve => require(['@/views/shop/Order.vue'],resolve)
const orderDetail = resolve => require(['@/views/shop/orderDetail.vue'],resolve)
const Share = resolve => require(['@/views/shop/Share.vue'],resolve)
const User = resolve => require(['@/views/shop/User.vue'], resolve)
const Detail = resolve => require(['@/views/shop/Detail.vue'], resolve)
const Search = resolve => require(['@/views/shop/Search.vue'], resolve)
const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const Login = resolve => require(['@/views/shop/login.vue'], resolve)
const Edit = resolve => require(['@/views/shop/Edit.vue'], resolve)
const ShareCompany = resolve => require(['@/views/shop/ShareCompany.vue'], resolve)
const All = resolve => require(['@/views/shop/All.vue'], resolve)
const ShareJf = resolve => require(['@/views/shop/ShareJf.vue'], resolve)
const fxJf = resolve => require(['@/views/shop/fxJf.vue'], resolve)
const myOrder = resolve => require(['@/views/shop/myOrders.vue'], resolve)
const shareProduct = resolve => require(['@/views/shop/ShareProduct.vue'], resolve)
const shareOrders = resolve => require(['@/views/shop/ShareOrders.vue'], resolve)
const chouJiang = resolve => require(['@/views/shop/choujiang.vue'], resolve)
const refund = resolve => require(['@/views/shop/refund.vue'], resolve)
const refundList = resolve => require(['@/views/shop/refundList.vue'], resolve)
const refundDetail = resolve => require(['@/views/shop/refundDetail.vue'], resolve)
const NoAuth = resolve => require(['@/views/shop/NoAuth.vue'],resolve)
const shareAll = resolve => require(['@/views/shop/shareAll.vue'],resolve)
const cardList = resolve => require(['@/views/shop/CardList.vue'],resolve)
const bookHistory = resolve => require(['@/views/shop/bookHistory.vue'],resolve)
const YDXZ = resolve => require(['@/views/shop/xz.vue'],resolve)
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
const NewsDetail = resolve => require(['@/views/show/item/newsDetail'],resolve)
const CommonDetail = resolve => require(['@/views/show/item/commonDetail'],resolve)
const CommonList = resolve => require(['@/views/show/item/commonList'],resolve)

// sharecenter
const ShareCenter = resolve => require(['@/views/sharecenter/index.vue'],resolve)
const MyChannel = resolve => require(['@/views/sharecenter/myChannel.vue'],resolve)
const SCorders = resolve => require(['@/views/sharecenter/shareOrders.vue'],resolve)
const SCprouducts = resolve => require(['@/views/sharecenter/shareProducts.vue'],resolve)
const SCsearch = resolve => require(['@/views/sharecenter/search.vue'],resolve)
const SCfxjl = resolve => require(['@/views/sharecenter/fxJl.vue'],resolve)
const SCproductDetail = resolve => require(['@/views/sharecenter/productDetail.vue'],resolve)

// channelcenter
const CCindex = resolve => require(['@/views/channelcenter/index.vue'],resolve)
const CCmanager = resolve => require(['@/views/channelcenter/sharemanager.vue'],resolve)
const CCfxjl = resolve => require(['@/views/channelcenter/fxJl.vue'],resolve)
const CCproducts = resolve => require(['@/views/channelcenter/shareProducts.vue'],resolve)
const CCsearch = resolve => require(['@/views/channelcenter/search.vue'],resolve)
const CClogin = resolve => require(['@/views/channelcenter/login.vue'],resolve)
const CChylist = resolve => require(['@/views/channelcenter/hyList.vue'],resolve)
const CCywyFxjl = resolve => require(['@/views/channelcenter/ywyfxJl.vue'],resolve)
const CCywyCjjl = resolve => require(['@/views/channelcenter/ywycjJl.vue'],resolve)
const CCdetail = resolve => require(['@/views/channelcenter/productDetail.vue'],resolve)


const shopRouters = [
  {
    path: '/shop',
    name: '首页',
    component: Index,
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  }, 
  {
    path: '/shop/changeCard',
    name: '兑换度假卡',
    component: ChangeCard,
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  }, 
  {
    path: '/shop/cardList',
    name: '度假卡',
    component: cardList,
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  }, 
  {
    path: '/shop/xz',
    name: '预定须知',
    component: YDXZ,
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  }, 
  {
    path: '/shop/bookhistory',
    name: '预定记录',
    component: bookHistory,
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  }, 
  {
    path: '/shop/category',
    name: '分类页',
    redirect: '/shop/category/all',
    component: Category,
    children: [{
      name: '分类子页',
      path: '/shop/category/:tab',
      component:CategoryMain,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      }
    }],
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/car',
    name: '购物车',
    component: Car,
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/collection',
    name: '收藏',
    component: Collection,
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/all',
    name: '所有商品',
    component: All,
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/order',
    name: '立即购买',
    component: Order,
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },{
    path: '/shop/car/pay',
    name: '支付页',
    component: Pay,
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/user',
    name: '会员中心',
    component: User,
    meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
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
    path: '/shop/shareJf',
    name: '购物积分',
    component: ShareJf,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/shop/fxJf',
    name: '分销积分',
    component: fxJf,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/shop/detail',
    name: '详情页',
    component: Detail,
    meta: {
      keep_alive: true,
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  }, {
    path: '/shop/search',
    name: '搜索页',
    component: Search,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },{
    path: '/shop/login',
    name: '登录页',
    component: Login
  },
  {
    path: '/shop/edit',
    name: '修改资料',
    component: Edit,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/myorder',
    name: '我的订单',
    component: myOrder,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/orderDetail',
    name: '订单详情',
    component: orderDetail,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/shareproduct',
    name: '分销产品',
    component: shareProduct,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/shareOrders',
    name: '分销订单',
    component: shareOrders,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/choujiang',
    name: '活动抽奖',
    component: chouJiang,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    path: '/shop/refund',
    name: '退款操作',
    component: refund,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/shop/refundDetail',
    name: '退款详情',
    component: refundDetail,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/shop/refundList',
    name: '申请退款',
    component: refundList,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/shop/noauth',
    name: '未关注',
    component: NoAuth
  },
  {
    path: '/shop/shareAll',
    name: 'shareAll',
    component: shareAll
  }
]

const showRouters = [
  {
    path: '/show',
    name: 'showIndex',
    component: ShowIndex,
    meta: {
      title: '途世文旅'
    }
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
    name: '项目简介',
    component: ShowItemDetail
  },
  {
    path: '/show/houseList',
    name: '户型鉴赏',
    component: ShowHouseList
  },
  {
    path: '/show/houseDetail',
    name: 'ShowHouseDetail',
    component: ShowHouseDetail
  },
  {
    path: '/show/brandList',
    name: '品牌故事',
    component: ShowBrandList
  },
  {
    path: '/show/brandDetail',
    name: 'ShowBrandDetail',
    component: ShowBrandDetail
  },
  {
    path: '/show/autoNav',
    name: '一键导航',
    component: ShowAutoNav
  },
  {
    path: '/show/news',
    name: '项目资讯',
    component: ShowNews
  },
  {
    path: '/show/newsDetail',
    name: '资讯详情',
    component: NewsDetail
  },
  {
    path: '/show/history',
    name: '发展历程',
    component: ShowHistory
  },
  {
    path: '/show/commonDetail',
    name: '详情',
    component: CommonDetail
  },
  {
    path: '/show/commonList',
    name: '列表',
    component: CommonList
  }
]

const shareRouters = [
  {
    path: '/sharecenter',
    name: 'ShareCenter',
    component: ShareCenter,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      ywyAuth: true
    }
  },
  {
    path: '/sharecenter/mychannel',
    name: 'MyChannel',
    component: MyChannel,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      ywyAuth: true
    }
  },
  {
    path: '/sharecenter/shareorders',
    name: 'SCorders',
    component: SCorders,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      ywyAuth: true
    }
  },
  {
    path: '/sharecenter/shareproducts',
    name: 'SCprouducts',
    component: SCprouducts,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      ywyAuth: true
    }
  },
  {
    path: '/sharecenter/search',
    name: 'SCsearch',
    component: SCsearch,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      ywyAuth: true
    }
  },
  {
    path: '/sharecenter/fxjl',
    name: 'SCfxjl',
    component: SCfxjl,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      ywyAuth: true
    }
  },
  {
    path: '/sharecenter/productdetail',
    name: 'SCproductDetail',
    component: SCproductDetail,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
      ywyAuth: true
    }
  }
]

const channelRouters = [
  {
    path: '/channelcenter',
    name: 'ChannelCenter',
    component: CCindex
  },
  {
    path: '/channelcenter/sharemanager',
    name: 'sharemanager',
    component: CCmanager
  },
  {
    path: '/channelcenter/fxjl',
    name: 'fxjl',
    component: CCfxjl
  },
  {
    path: '/channelcenter/shareproducts',
    name: 'CCproducts',
    component: CCproducts
  },
  {
    path: '/channelcenter/search',
    name: 'CCsearch',
    component: CCsearch
  },
  {
    path: '/channelcenter/login',
    name: 'CClogin',
    component: CClogin
  },
  {
    path: '/channelcenter/hylist',
    name: 'CChylist',
    component: CChylist
  },
  {
    path: '/channelcenter/ywyfxjl',
    name: 'CCywyFxjl',
    component: CCywyFxjl
  },
  {
    path: '/channelcenter/ywycjjl',
    name: 'CCywyCjjl',
    component: CCywyCjjl
  },
  {
    path: '/channelcenter/detail',
    name: 'CCdetail',
    component: CCdetail
  },


]

export default new Router({
  // mode: 'history',
  routes: [
    ...shopRouters,
    ...showRouters,
    ...shareRouters,
    ...channelRouters
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
