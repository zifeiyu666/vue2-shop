import instance from './instance';
import { convertRESTAPI } from '../util';

/** 成交记录 */
function api_Channel_getSalesmanOrdersList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Channel/getSalesmanOrdersList',
    opts: opts
  });
}

/** 预定记录 */
function api_FangYuan_GetYuDingJiLu_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/FangYuan/GetYuDingJiLu',
    opts: opts
  });
}

/** 房源列表 */
function api_FangYuan_GetKeYuYongList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/FangYuan/GetKeYuYongList',
    opts: opts
  });
}

/** 获取房源 */
function api_FangYuan_getFangYuan_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/FangYuan/getFangYuan',
    opts: opts
  });
}

/** 权益卡使用次数 */
function api_QYK_GetYiYongCiShuByKaHao_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/QYK/GetYiYongCiShuByKaHao',
    opts: opts
  });
}

/** 未知获取权益卡 */
function api_QYK_GetQuanYiKaByOrderID_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/QYK/GetQuanYiKaByOrderID',
    opts: opts
  });
}

/** 权益卡列表 */
function api_QYK_GetMyQuanYiKa_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/QYK/GetMyQuanYiKa',
    opts: opts
  });
}

/** 房源预定 */
function api_FangYuan_YuDing_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/FangYuan/YuDing',
    opts: opts
  });
}

/** 修改密码 */
function api_QYK_XiuGaiMiMa_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/QYK/XiuGaiMiMa',
    opts: opts
  });
}

/** 解绑 */
function api_QYK_JieBang_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/QYK/JieBang',
    opts: opts
  });
}

/** 绑定 */
function api_QYK_BangDing_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/QYK/BangDing',
    opts: opts
  });
}

/** 商品规格联动 */
function api_Shop_getProductProp_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getProductProp',
    opts: opts
  });
}

/** 快速搜索 */
function api_Shop_getKeyWord_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getKeyWord',
    opts: opts
  });
}

/** 我的积分记录 */
function api_Shop_getMyCrashbackList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getMyCrashbackList',
    opts: opts
  });
}

/** 业务员分享二维码 */
function api_Share_GetProductQRCard_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Share/GetProductQRCard',
    opts: opts
  });
}

/** 会员分享商品吗 */
function api_Shop_GetProductQRCard_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/GetProductQRCard',
    opts: opts
  });
}

/** 获取商品信息 */
function api_Share_getProduct_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Share/getProduct',
    opts: opts
  });
}

/** 获取像请 */
function api_Channel_getProduct_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Channel/getProduct',
    opts: opts
  });
}

/** 获取我的营业额记录 */
function api_Channel_getMyCrashbackList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Channel/getMyCrashbackList',
    opts: opts
  });
}

/** 获取我的业务员的返现记录 */
function api_Channel_getSalesmanCrashbackList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Channel/getSalesmanCrashbackList',
    opts: opts
  });
}

/** 获取我的业务员发展的会员信息 */
function api_Channel_getSalesmanMembersList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Channel/getSalesmanMembersList',
    opts: opts
  });
}

/** 获取我的业务员 */
function api_Channel_getMySalesmanList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Channel/getMySalesmanList',
    opts: opts
  });
}

/** 根据商品类型和所属项目获取商品列表 */
function api_Channel_getProductList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Channel/getProductList',
    opts: opts
  });
}

/** 获取渠道的二维码 */
function api_Channel_getChannelQRCode_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Channel/getChannelQRCode',
    opts: opts
  });
}

/** 渠道登录 */
function api_Channel_ChannelLogin_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Channel/ChannelLogin',
    opts: opts
  });
}

/** 根据会员的Token，ProductName商品名称，top多少条获取访问记录， */
function api_ProductsVisit_Get_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/ProductsVisit/Get',
    opts: opts
  });
}

/** 会员浏览记录生成 */
function api_ProductsVisit_Post_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/ProductsVisit/Post',
    opts: opts
  });
}

/** 获取业务员渠道记录 */
function api_Share_getMyQudaoList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Share/getMyQudaoList',
    opts: opts
  });
}

/** 获取业务员相关订单记录 */
function api_Share_getMyRelationOrdersList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Share/getMyRelationOrdersList',
    opts: opts
  });
}

/** 获取我的返现记录 */
function api_Share_getMyCrashbackList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Share/getMyCrashbackList',
    opts: opts
  });
}

/** 获取我的业务员身份的二维码 */
function api_Share_getMyYeWuYuanSharedQRCode_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Share/getMyYeWuYuanSharedQRCode',
    opts: opts
  });
}

/** 根据商品类型和所属项目获取商品列表 */
function api_Share_getProductList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Share/getProductList',
    opts: opts
  });
}

/** 待审核订单列表 */
function api_Shop_getSHOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getSHOrders',
    opts: opts
  });
}

/** 根据MemberToken获取用户信息 */
function api_GetUserInfoByMemberToken_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/GetUserInfoByMemberToken',
    opts: opts
  });
}

/** 提现 */
function api_MustBeJustSoSo_MustBeLQ_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/MustBeJustSoSo/MustBeLQ',
    opts: opts
  });
}

/** 获取购物积分抵现比例和分销积分提现比例 */
function api_Shop_getRatio_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getRatio',
    opts: opts
  });
}

/** 获取退款申请记录列表 */
function api_Shop_getRefundApplyList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getRefundApplyList',
    opts: opts
  });
}

/** 获取退款申请记录详情 */
function api_Shop_getRefundApply_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getRefundApply',
    opts: opts
  });
}

/** 取消订单 */
function api_Shop_CancleOrder_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/CancleOrder',
    opts: opts
  });
}

/** 申请退款，针对订单中的商品进行退款申请,传入订单商品表里面的主键Id */
function api_Shop_saveRefundApply_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/saveRefundApply',
    opts: opts
  });
}

/** 获取我的积分 */
function api_Shop_getMyScore_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getMyScore',
    opts: opts
  });
}

/** 抽奖 返回前台用户抽中的选项 */
function api_Shop_Lottery_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/Lottery',
    opts: opts
  });
}

/** 获取我的今日中奖情况 返回为空说明今天没抽奖 */
function api_Shop_getTodayLottery_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getTodayLottery',
    opts: opts
  });
}

/** 获取每日好礼活动信息 */
function api_Shop_getActivity_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getActivity',
    opts: opts
  });
}

/** 获取我的二维码 */
function api_Shop_getMySharedQRCode_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getMySharedQRCode',
    opts: opts
  });
}

/** 获取我的积分记录 */
function api_Shop_getMyScoreList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getMyScoreList',
    opts: opts
  });
}

/** 提交多个商品生成订单，返回订单号 */
function api_Shop_generateCarOrder_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/generateCarOrder',
    opts: opts
  });
}

/** 作用：根据MemberToken和OrderID生成预支付订单，并且返回预支付订单的参数供前台调用 */
function api_GetWCPay_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/GetWCPay',
    opts: opts
  });
}

/** 直接购买商品，生成订单，返回订单号 */
function api_Shop_generateOrder_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/generateOrder',
    opts: opts
  });
}

/** 绑定手机的时候先生成验证码 */
function api_Shop_generateVeriCode_post(opts) {
  return instance({
    method: 'post',
    url:  '/api/Shop/generateVeriCode',
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

/** 测试用户验证 */
function api_TestGetUserInfo_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/TestGetUserInfo',
    opts: opts
  });
}

/** 根据订单号获取订单详情 */
function api_Shop_getOrders_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getOrders',
    opts: opts
  });
}

/** 获取商品的规格列表 */
function api_Shop_getProductPropList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Shop/getProductPropList',
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
  api_Channel_getSalesmanOrdersList_get,
  api_FangYuan_GetYuDingJiLu_get,
  api_FangYuan_GetKeYuYongList_get,
  api_FangYuan_getFangYuan_get,
  api_QYK_GetYiYongCiShuByKaHao_get,
  api_QYK_GetQuanYiKaByOrderID_get,
  api_QYK_GetMyQuanYiKa_get,
  api_FangYuan_YuDing_post,
  api_QYK_XiuGaiMiMa_post,
  api_QYK_JieBang_post,
  api_QYK_BangDing_post,
  api_Shop_getProductProp_get,
  api_Shop_getKeyWord_get,
  api_Shop_getMyCrashbackList_get,
  api_Share_GetProductQRCard_get,
  api_Shop_GetProductQRCard_get,
  api_Share_getProduct_get,
  api_Channel_getProduct_get,
  api_Channel_getMyCrashbackList_get,
  api_Channel_getSalesmanCrashbackList_get,
  api_Channel_getSalesmanMembersList_get,
  api_Channel_getMySalesmanList_get,
  api_Channel_getProductList_get,
  api_Channel_getChannelQRCode_get,
  api_Channel_ChannelLogin_post,
  api_ProductsVisit_Get_get,
  api_ProductsVisit_Post_post,
  api_Share_getMyQudaoList_get,
  api_Share_getMyRelationOrdersList_get,
  api_Share_getMyCrashbackList_get,
  api_Share_getMyYeWuYuanSharedQRCode_get,
  api_Share_getProductList_get,
  api_Shop_getSHOrders_get,
  api_GetUserInfoByMemberToken_get,
  api_MustBeJustSoSo_MustBeLQ_get,
  api_Shop_getRatio_get,
  api_Shop_getRefundApplyList_get,
  api_Shop_getRefundApply_get,
  api_Shop_CancleOrder_post,
  api_Shop_saveRefundApply_post,
  api_Shop_getMyScore_get,
  api_Shop_Lottery_post,
  api_Shop_getTodayLottery_get,
  api_Shop_getActivity_get,
  api_Shop_getMySharedQRCode_get,
  api_Shop_getMyScoreList_get,
  api_Shop_generateCarOrder_post,
  api_GetWCPay_get,
  api_Shop_generateOrder_post,
  api_Shop_generateVeriCode_post,
  api_Shop_bindPhone_post,
  api_TestGetUserInfo_get,
  api_Shop_getOrders_get,
  api_Shop_getProductPropList_get,
  api_Shop_getADByCode_get,
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
