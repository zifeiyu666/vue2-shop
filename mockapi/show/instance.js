import { createAPI } from '../util';
import config from '../config';

var mock = 'https://www.easy-mock.com/mock/59b0f2bae0dc663341a0cef7/xjha'
var wj = 'http://47.95.230.197'
var test = 'http://www.yunhi.vip'

const baseUrl = {
  mock: wj,
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock'];

export default createAPI(baseUrl);
