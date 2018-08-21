import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from '@/vuex/store.js'   //vuex
import less from 'less'
import Mint from 'mint-ui';    //移动端UI
import 'mint-ui/lib/style.css'
import { Toast } from 'mint-ui';
import VueLazyload from 'vue-lazyload-cosmo-zp'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg2QUIxRjJGRjdERjExRTU4RjNCQjNFNzdDMTBGQ0E3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg2QUIxRjMwRjdERjExRTU4RjNCQjNFNzdDMTBGQ0E3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODZBQjFGMkRGN0RGMTFFNThGM0JCM0U3N0MxMEZDQTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODZBQjFGMkVGN0RGMTFFNThGM0JCM0U3N0MxMEZDQTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4S67MLAAAAEElEQVR42mL4//8/A0CAAQAI/AL+26JNFgAAAABJRU5ErkJggg==',
  loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg2QUIxRjJGRjdERjExRTU4RjNCQjNFNzdDMTBGQ0E3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg2QUIxRjMwRjdERjExRTU4RjNCQjNFNzdDMTBGQ0E3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODZBQjFGMkRGN0RGMTFFNThGM0JCM0U3N0MxMEZDQTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODZBQjFGMkVGN0RGMTFFNThGM0JCM0U3N0MxMEZDQTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4S67MLAAAAEElEQVR42mL4//8/A0CAAQAI/AL+26JNFgAAAABJRU5ErkJggg==',
  attempt: 1
})


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
      // console.log('进入需要登录信息路由')
      if (store.state.userInfo.MemberToken) {  // 通过vuex state获取当前的token是否存在
        // 不要求必须有手机号
        next()
        // if (store.state.userInfo.Phone) {
        //   // console.log('已经绑定手机')
        //   next();
        // } else {
        //   // 未绑定手机去绑定
        //   // console.log('没有绑定手机')
        //   next({
        //     path: '/shop/login',
        //     query: {oldUrl: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        //   })
        // }
      }
      else {    
        //如果没有token，获取token
        console.log('没有token')
        // if (to.query.code) {
        //   var code = to.query.code
        //   console.log(`微信取到的code: ${to.query.code}`)
        // } else {
        //   console.log('获取membertoken')
        //   var membertoken = sessionStorage.getItem('membertoken')
        //   // var membertoken = '95d031ca-669a-406a-adcc-caa85bd398e6'
        // }

        if (sessionStorage.getItem('membertoken')) {
          console.log('获取membertoken')
          var membertoken = sessionStorage.getItem('membertoken')
          // var membertoken = '95d031ca-669a-406a-adcc-caa85bd398e6'
        } else {
          var code = to.query.code
          console.log(`微信取到的code: ${to.query.code}`)
        }

        if (membertoken && membertoken != 'undefined' && membertoken != '') {
          console.log('未能成功获取到code，通过membertoken接口获取')
          // alert('获取用户信息失败')
          // return
          mockapi.shop.api_GetUserInfoByMemberToken_get({
            params: {
              MemberToken: membertoken // sessionStorage保存的membertoken
            }
          }).then(response => {
            console.log('通过membertoken请求成功')
            
            var data = response.data.data
            // TODO: 为了测试添加手机号
            // data.Phone = '18554870804'
            console.log(data)
            // 用户信息存在vuex中
            store.commit('setUserInfo', data)
            // 不强制绑定手机
            next()
            // 已经绑定手机放行
            // if(data.Phone) {
            //   console.log('已经绑定手机')
            //   next()
            // } else {
            //   // 未绑定手机去绑定
            //   console.log('没有绑定手机')
            //   next({
            //     path: '/shop/login',
            //     query: {oldUrl: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            //   })
            // }
          }).catch(err => {
            console.log(err)
          })
        } else if (code && code != 'undefined' && code != '') {
          mockapi.shop.api_GetUserInfo_get({
            params: {
              code: code // 微信传递过来的code
            }
          }).then(response => {
            if (response.data.result == 0) {
              router.push('/shop/noauth')
              return
            }
            console.log('成功获取到token')
            
            var data = response.data.data
            // TODO: 为了测试添加手机号
            // data.Phone = '18554870804'
            console.log(data)
            var MemberToken = data.MemberToken
            console.log(MemberToken)
            sessionStorage.setItem('membertoken', MemberToken)
            // 用户信息存在vuex中
            store.commit('setUserInfo', data)
            // 不强制绑定手机
            next()
            // 已经绑定手机放行
            // if(data.Phone) {
            //   console.log('已经绑定手机')
            //   next()
            // } else {
            //   // 未绑定手机去绑定
            //   console.log('没有绑定手机')
            //   next({
            //     path: '/shop/login',
            //     query: {oldUrl: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            //   })
            // }
          }).catch(err => {
            console.log(err)
          })
        } else {

          console.log('获取code和membertoken都失败了')

          // 生产环境直接让用户去注册页面
          if (process.env.NODE_ENV === 'production') {
            // Toast('获取用户信息失败，请重关闭页面并重试！')
            router.push('/shop/noauth')
            console.log('环境变量')
            console.log(process.env.NODE_ENV)
            return
          }

          // 开发环境用测试用户
          console.log('环境变量')
          console.log(process.env.NODE_ENV)
          mockapi.shop.api_TestGetUserInfo_get({
            params: {
              code: 123
            }
          }).then(response => {
            console.log('成功获取到token')
            
            var data = response.data.data

            console.log(data)
            var MemberToken = data.MemberToken
            console.log(MemberToken)
            sessionStorage.setItem('membertoken', data.MemberToken)
            // TODO: 为了测试添加手机号
            // data.Phone = '18554870804'
            console.log(data)
            // 用户信息存在vuex中
            store.commit('setUserInfo', data)
            // 不校验手机了
            next()
            // 已经绑定手机放行

            // if(data.Phone) {
            //   console.log('已经绑定手机')
            //   next()
            // } else {
            //   // 未绑定手机去绑定
            //   console.log('没有绑定手机')
            //   next({
            //     path: '/shop/login',
            //     query: {oldUrl: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            //   })
            // }
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
