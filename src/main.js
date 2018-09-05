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
  error: require('./assets/error.jpg'),
  loading: '../static/timg.gif',
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
      if (store.state.userInfo || store.state.userInfo.MemberToken) {  // 通过vuex state获取当前的token是否存在
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

            // 验证业务员身份
            var userType = data.AttentionMethod
            if (to.meta.ywyAuth) {
              if (userType != 4) {
                Toast('当前页面没有访问权限')
                return
              }
            }

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
