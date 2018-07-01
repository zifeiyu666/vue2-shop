import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from '@/vuex/store.js'   //vuex
import less from 'less'
import Mint from 'mint-ui';    //移动端UI
import 'mint-ui/lib/style.css'
Vue.use(Mint);
Vue.config.productionTip = false
// Vue.prototype.$api = api;

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 引入vue-awesome
import 'vue-awesome/icons'
/* Register component with one of 2 methods */
import Icon from 'vue-awesome/components/Icon'
// globally (in your main .js file)
Vue.component('icon', Icon)

// easymock
import qs from 'qs'
import * as mockapi from '@/../mockapi'

// 用钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
      console.log('进入需要登录信息路由')
      if (store.state.userInfo.MemberToken) {  // 通过vuex state获取当前的token是否存在
        console.log('有token')
        if (store.state.userInfo.Phone) {
          console.log('已经绑定手机')
          next();
        } else {
          // 未绑定手机去绑定
          console.log('没有绑定手机')
          next({
            path: '/shop/login',
            query: {oldUrl: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      }
      else {    
        //如果没有token，获取token
        console.log('没有token')
        // 测试接口 api_TestGetUserInfo_get
        // 正式接口 api_GetUserInfo_get
        var code = to.query.code
        console.log(`微信取到的code: ${to.query.code}`)

        if (code) {
          mockapi.shop.api_GetUserInfo_get({
            params: {
              code: code ? code : '' // 微信传递过来的code
            }
          }).then(response => {
            console.log('成功获取到token')
            
            var data = response.data.data
            // TODO: 为了测试添加手机号
            // data.Phone = '18554870804'
            console.log(data)
            // 用户信息存在vuex中
            store.commit('setUserInfo', data)
            // 已经绑定手机放行
            if(data.Phone) {
              console.log('已经绑定手机')
              next()
            } else {
              // 未绑定手机去绑定
              console.log('没有绑定手机')
              next({
                path: '/shop/login',
                query: {oldUrl: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('未能成功获取到code，走测试接口')
          alert('未能成功获取到用户信息')
          mockapi.shop.api_TestGetUserInfo_get({
            params: {
              code: 123
            }
          }).then(response => {
            console.log('成功获取到token')
            
            var data = response.data.data
            // TODO: 为了测试添加手机号
            data.Phone = '18554870804'
            console.log(data)
            // 用户信息存在vuex中
            store.commit('setUserInfo', data)
            // 已经绑定手机放行
            if(data.Phone) {
              console.log('已经绑定手机')
              next()
            } else {
              // 未绑定手机去绑定
              console.log('没有绑定手机')
              next({
                path: '/shop/login',
                query: {oldUrl: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
        
      }
    }
    else { //不需要权限 直接跳转
      next();
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
