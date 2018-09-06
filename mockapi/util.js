import axios from 'axios';
import { Toast } from 'mint-ui';

const instance = axios.create();

function createAPI(baseURL) {
  return function (conf) {
    conf = conf || {};
    return instance(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method,
      // withCredentials: false
    }, conf.opts));
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url
  const pathKeys = Object.keys(opts.path)
  pathKeys.forEach(function(key) {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g')
    url = url.replace(r, opts.path[key])
  })

  return url
}

// request拦截器
instance.interceptors.request.use(config => {
  // Do something before request is sent
  // config.headers.Authorization = 'test'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(
  response => {
    console.log(123123123)
    console.log(response.data.result)
    if (response.data.result === '0') {
      var msg = response.data.msg
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
