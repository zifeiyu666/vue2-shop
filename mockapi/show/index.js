import instance from './instance';
import { convertRESTAPI } from '../util';

/** Show/Action */
function api_Show_Action_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Show/Action',
    opts: opts
  });
}

/** 获取新闻详细内容 */
function api_Show_getNews_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Show/getNews',
    opts: opts
  });
}

/** 获取图片新闻列表 */
function api_Show_getPicNewsList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Show/getPicNewsList',
    opts: opts
  });
}

/** 获取文字新闻列表 */
function api_Show_getWzNewsList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Show/getWzNewsList',
    opts: opts
  });
}

/** 获取项目所在地坐标 */
function api_Show_getNavCoordinate_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Show/getNavCoordinate',
    opts: opts
  });
}

/** 获取项目新闻导航 */
function api_Show_getItemNav_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Show/getItemNav',
    opts: opts
  });
}

/** 获取项目列表 */
function api_Show_getItemList_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Show/getItemList',
    opts: opts
  });
}

/** 获取首页的项目导航(最新5条) */
function api_Show_getTopItem_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Show/getTopItem',
    opts: opts
  });
}

/** 获取一键导航坐标 */
function getNavCoordinate_get(opts) {
  return instance({
    method: 'get',
    url:  '/getNavCoordinate',
    opts: opts
  });
}

/** 获取发展历程 */
function getHistory_get(opts) {
  return instance({
    method: 'get',
    url:  '/getHistory',
    opts: opts
  });
}

/** 获取项目资讯详情 */
function getNewsIntro_get(opts) {
  return instance({
    method: 'get',
    url:  '/getNewsIntro',
    opts: opts
  });
}

/** 获取项目资讯列表 */
function getNewsList_get(opts) {
  return instance({
    method: 'get',
    url:  '/getNewsList',
    opts: opts
  });
}

/** 获取品牌故事简介 */
function getBrandIntro_get(opts) {
  return instance({
    method: 'get',
    url:  '/getBrandIntro',
    opts: opts
  });
}

/** 获取品牌故事列表 */
function getBrandList_get(opts) {
  return instance({
    method: 'get',
    url:  '/getBrandList',
    opts: opts
  });
}

/** 获取户型简介 */
function getHouseIntro_get(opts) {
  return instance({
    method: 'get',
    url:  '/getHouseIntro',
    opts: opts
  });
}

/** 获取户型列表 */
function getHouseList_get(opts) {
  return instance({
    method: 'get',
    url:  '/getHouseList',
    opts: opts
  });
}

/** 获取项目导航 */
function getItemNav_get(opts) {
  return instance({
    method: 'get',
    url:  '/getItemNav',
    opts: opts
  });
}

/** 获取项目简介 */
function getItemIntro_get(opts) {
  return instance({
    method: 'get',
    url:  '/getItemIntro',
    opts: opts
  });
}

/** 获取首页banner图 */
function api_Show_getWebBanner_get(opts) {
  return instance({
    method: 'get',
    url:  '/api/Show/getWebBanner',
    opts: opts
  });
}

/** 获取项目列表 */
function getItemList_get(opts) {
  return instance({
    method: 'get',
    url:  '/getItemList',
    opts: opts
  });
}

/** 这只是一个响应 post 接口返回随机数据的例子 */
function upload_post(opts) {
  return instance({
    method: 'post',
    url:  '/upload',
    opts: opts
  });
}

export {
  api_Show_Action_get,
  api_Show_getNews_get,
  api_Show_getPicNewsList_get,
  api_Show_getWzNewsList_get,
  api_Show_getNavCoordinate_get,
  api_Show_getItemNav_get,
  api_Show_getItemList_get,
  api_Show_getTopItem_get,
  getNavCoordinate_get,
  getHistory_get,
  getNewsIntro_get,
  getNewsList_get,
  getBrandIntro_get,
  getBrandList_get,
  getHouseIntro_get,
  getHouseList_get,
  getItemNav_get,
  getItemIntro_get,
  api_Show_getWebBanner_get,
  getItemList_get,
  upload_post
};
