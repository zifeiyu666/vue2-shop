import { createAPI } from '../util';
import config from '../config';

const baseUrl = {
  mock: 'https://www.easy-mock.com/mock/5aa88e678ed9a05f24bed96d/xjha_copy',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock'];

export default createAPI(baseUrl);
