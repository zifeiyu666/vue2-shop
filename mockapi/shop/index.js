import instance from './instance';
import { convertRESTAPI } from '../util';

/** 获取我的购物车里面商品数量 */
function api_Shop_getMyCarCount_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getMyCarCount',
    opts: opts
  });
}

/** 测试 */
function http_10_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/http:/10.130.92.177:3001/api/test', opts),
    opts: opts
  });
}

/** ddd */
function api_Shop_Action_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/Action',
    opts: opts
  });
}

/** 获取我的所有分销订单 */
function api_Shop_getShareOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getShareOrders',
    opts: opts
  });
}

/** 获取我的三级分销商 */
function api_Shop_getThreeShareCompany_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getThreeShareCompany',
    opts: opts
  });
}

/** 获取我的二级分销商 */
function api_Shop_getTwoShareCompany_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getTwoShareCompany',
    opts: opts
  });
}

/** 获取我的一级分销商 */
function api_Shop_getOneShareCompany_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getOneShareCompany',
    opts: opts
  });
}

/** 获取我的所有分销商 */
function api_Shop_getShareCompany_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getShareCompany',
    opts: opts
  });
}

/** 获取待支付所有订单 */
function api_Shop_getUnpayedOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getUnpayedOrders',
    opts: opts
  });
}

/** 获取已支付所有订单 */
function api_Shop_getPayedOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getPayedOrders',
    opts: opts
  });
}

/** 获取所有订单 */
function api_Shop_getAllOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getAllOrders',
    opts: opts
  });
}

/** 根据字典类别代码获取字典项列表 */
function api_Shop_getDicEntryList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getDicEntryList',
    opts: opts
  });
}

/** 根据字典类别代码获取字典类别 */
function api_Shop_getDicType_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getDicType',
    opts: opts
  });
}

/** 根据广告位代码获取最新发布的一条广告（一共四个广告位，代码分别为ADO，ADT，ADTH，ADF） */
function api_Shop_getADByCode_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getADByCode',
    opts: opts
  });
}

/** 获取商品信息 */
function api_Shop_getProduct_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getProduct',
    opts: opts
  });
}

/** 获取所有商品列表 */
function api_Shop_getAllProductList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getAllProductList',
    opts: opts
  });
}

/** 根据商品类型和所属项目获取商品列表 */
function api_Shop_getProductList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getProductList',
    opts: opts
  });
}

/** 获取首页上展示的商品 */
function api_Shop_getTopProduct_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getTopProduct',
    opts: opts
  });
}

/** 获取商品类别（权益卡、旅游打包类、单独类） */
function api_Shop_getProductType_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getProductType',
    opts: opts
  });
}

/** 获取我的购物车 */
function api_Shop_getMyCar_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getMyCar',
    opts: opts
  });
}

/** 删除购物车的商品 */
function api_Shop_deleteCar_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/deleteCar',
    opts: opts
  });
}

/** 修改购物车中的商品数量 */
function api_Shop_updateCar_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/updateCar',
    opts: opts
  });
}

/** 加入购物车 */
function api_Shop_addToCar_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/addToCar',
    opts: opts
  });
}

/** api/Shop/isMyCollection */
function api_Shop_isMyCollection_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/isMyCollection',
    opts: opts
  });
}

/** 取消收藏 */
function api_Shop_cancleCollection_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/cancleCollection',
    opts: opts
  });
}

/** 加入收藏 */
function api_Shop_addCollection_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/addCollection',
    opts: opts
  });
}

/** 根据微信的Code获取用户基本信息，会生成MemberToken,去掉OpenID，后续用MemberToken进行交互 */
function api_GetUserInfo_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/GetUserInfo',
    opts: opts
  });
}

/** 获取我的收藏 */
function api_Shop_getMyCollection_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getMyCollection',
    opts: opts
  });
}

/** 绑定手机号 */
function api_Shop_bindPhone_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/bindPhone',
    opts: opts
  });
}

/** 获取商城首页Banner */
function api_Shop_getShopBanner_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getShopBanner',
    opts: opts
  });
}

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
  api_Shop_getMyCarCount_get,
  http_10_get,
  api_Shop_Action_get,
  api_Shop_getShareOrders_get,
  api_Shop_getThreeShareCompany_get,
  api_Shop_getTwoShareCompany_get,
  api_Shop_getOneShareCompany_get,
  api_Shop_getShareCompany_get,
  api_Shop_getUnpayedOrders_get,
  api_Shop_getPayedOrders_get,
  api_Shop_getAllOrders_get,
  api_Shop_getDicEntryList_get,
  api_Shop_getDicType_get,
  api_Shop_getADByCode_get,
  api_Shop_getProduct_get,
  api_Shop_getAllProductList_get,
  api_Shop_getProductList_get,
  api_Shop_getTopProduct_get,
  api_Shop_getProductType_get,
  api_Shop_getMyCar_get,
  api_Shop_deleteCar_post,
  api_Shop_updateCar_post,
  api_Shop_addToCar_post,
  api_Shop_isMyCollection_get,
  api_Shop_cancleCollection_post,
  api_Shop_addCollection_post,
  api_GetUserInfo_get,
  api_Shop_getMyCollection_get,
  api_Shop_bindPhone_post,
  api_Shop_getShopBanner_get,
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
