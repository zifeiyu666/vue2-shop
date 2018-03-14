import { createAPI } from '../util';
import config from '../config';

const baseUrl = {
  mock: 'https://www.easy-mock.com/mock/59b0f2bae0dc663341a0cef7/xjha',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock'];

export default createAPI(baseUrl);
