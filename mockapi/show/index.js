import instance from './instance';
import { convertRESTAPI } from '../util';

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
  show_getBanner_get,
  getItemList_get,
  proxy_get,
  mock_get,
  user_post,
  upload_post,
  query_get
};
