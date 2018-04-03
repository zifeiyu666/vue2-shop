import instance from './instance';
import { convertRESTAPI } from '../util';

/** 添加收藏 */
function shop_addCollection_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/addCollection',
    opts: opts
  });
}

/** 订单支付 */
function shop_payOrder_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/payOrder',
    opts: opts
  });
}

/** 生成订单 */
function shop_generateOrder_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/generateOrder',
    opts: opts
  });
}

/** 加入购物车 */
function shop_addToCar_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/addToCar',
    opts: opts
  });
}

/** 编辑用户信息 */
function shop_updateUserInfo_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/updateUserInfo',
    opts: opts
  });
}

/** 我的积分 */
function shop_getPoints_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getPoints',
    opts: opts
  });
}

/** 我的分销订单 */
function shop_getShareOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getShareOrders',
    opts: opts
  });
}

/** 我的分销商 */
function shop_getShareCompany_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getShareCompany',
    opts: opts
  });
}

/** 获取我的分销产品 */
function shop_getShareGoods_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getShareGoods',
    opts: opts
  });
}

/** 获取购物车列表 */
function shop_getShopCar_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getShopCar',
    opts: opts
  });
}

/** 获取我的收藏 */
function shop_getCollections_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getCollections',
    opts: opts
  });
}

/** 获取已支付订单 */
function shop_getPayedOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getPayedOrders',
    opts: opts
  });
}

/** 获取待支付订单 */
function shop_getUnpayedOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getUnpayedOrders',
    opts: opts
  });
}

/** 获取我的全部订单 */
function shop_getAllOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getAllOrders',
    opts: opts
  });
}

/** 获取全部商品 */
function shop_getGoodsList_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getGoodsList',
    opts: opts
  });
}

/** 登出 */
function shop_logout_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/logout',
    opts: opts
  });
}

/** 登录(成功后拉取用户信息) */
function shop_login_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/login',
    opts: opts
  });
}

/** 获取首页banner图 */
function shop_getBanner_get(opts) {
  return instance({
    method: 'get',
    url:  '/shop/getBanner',
    opts: opts
  });
}

export {
  shop_addCollection_get,
  shop_payOrder_get,
  shop_generateOrder_get,
  shop_addToCar_get,
  shop_updateUserInfo_get,
  shop_getPoints_get,
  shop_getShareOrders_get,
  shop_getShareCompany_get,
  shop_getShareGoods_get,
  shop_getShopCar_get,
  shop_getCollections_get,
  shop_getPayedOrders_get,
  shop_getUnpayedOrders_get,
  shop_getAllOrders_get,
  shop_getGoodsList_get,
  shop_logout_get,
  shop_login_get,
  shop_getBanner_get
};
