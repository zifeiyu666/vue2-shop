import axios from 'axios';

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
    // if (response.data.isSuccess === false) {
    //   if (response.data.msg = '用户未登录') {
    //     store.dispatch('LogOut').then(() => {
    //       location && location.reload
    //     })
    //   } else {
    //     var msg = response.data.msg || '发生未知错误'
    //     Message({
    //       message: msg,
    //       type: 'error',
    //       duration: 2 * 1000
    //     })
    //   }
    // }
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
