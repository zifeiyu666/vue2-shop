import axios from 'axios';
import { Toast } from 'mint-ui';

const instance = axios.create();

function createAPI(baseURL) {
  return function (conf) {
    conf = conf || {};
    return instance(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method
    }, conf.opts));
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}
// respone拦截器
// 做了一个最简单的拦截，如果不成功，统一弹框，但仍会将response数据传递出去，可能后续有些自己的独特操作
instance.interceptors.response.use(
  response => {
    console.log(123123123)
    console.log(response.data.result)
    if (response.data.result === '0') {
      var msg = response.data.msg || '发生未知错误'
      Toast(msg)
    }
    return response
  },
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export {
  createAPI,
  convertRESTAPI
};
