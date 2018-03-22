import instance from './instance';
import { convertRESTAPI } from '../util';

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
function show_getBanner_get(opts) {
  return instance({
    method: 'get',
    url:  '/show/getBanner',
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

/** 支持接口代理的 mock，试试在 url 上加 ?s={数字} */
function proxy_get(opts) {
  return instance({
    method: 'get',
    url:  '/proxy',
    opts: opts
  });
}

/** 带随机数据的 mock */
function mock_get(opts) {
  return instance({
    method: 'get',
    url:  '/mock',
    opts: opts
  });
}

/** 普通的 mock */
function user_post(opts) {
  return instance({
    method: 'post',
    url:  '/user',
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

/** 根据请求参数返回指定数据，试试在 url 上加 ?name={任意值} */
function query_get(opts) {
  return instance({
    method: 'get',
    url:  '/query',
    opts: opts
  });
}

export {
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
  show_getBanner_get,
  getItemList_get,
  proxy_get,
  mock_get,
  user_post,
  upload_post,
  query_get
};
