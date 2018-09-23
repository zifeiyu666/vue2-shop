import { createAPI } from '../util';
import config from '../config';

var mock =  'https://www.easy-mock.com/mock/5aa88e678ed9a05f24bed96d/xjha_copy'
var wj = 'http://47.95.230.197'
var test = 'http://www.yunhi.vip'

const baseUrl = {
  mock: '',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock'];

export default createAPI(baseUrl);
