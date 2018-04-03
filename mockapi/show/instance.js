import { createAPI } from '../util';
import config from '../config';

// mock: https://www.easy-mock.com/mock/59b0f2bae0dc663341a0cef7/xjha
// wj: http://47.95.230.197

const baseUrl = {
  mock: 'https://www.easy-mock.com/mock/59b0f2bae0dc663341a0cef7/xjha',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock'];

export default createAPI(baseUrl);
