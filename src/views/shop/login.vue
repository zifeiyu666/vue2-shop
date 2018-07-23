<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">登录页</h1>
    </v-header>
    <section>
      <span ref="timerbtn" class="btn btn-default timer" @click='getVeriCode'>
        <span v-if='isFeatching'>{{timer}}秒后重试</span>
        <span v-else>获取验证码</span>
      </span>
      <mt-field
        label="手机号"
        placeholder="请输入手机号"
        type = "text"
        v-model = "phone"
      ></mt-field>
      <!-- <mt-button
     plain
     size="large"
     @click="bindPhone"
     >获取验证码</mt-button> -->
      <mt-field
        label="验证码"
        placeholder="请输入验证码"
        type = "text"
        v-model = "identifyCode"
      ></mt-field>
      <!-- <mt-field
       label="密码"
       placeholder="请输入密码"
       type="password"
       v-model="password"
       :readonly='!toggle'
       :disableClear = '!toggle'
        ></mt-field> -->
      <p v-if='!isBindSuccess' class="tip">Tip : 您尚未绑定手机号，请进行手机号绑定</p>
    </section>
    <mt-button
     plain
     size="large"
     @click="bindPhone"
     v-if='!isBindSuccess'
     >绑定</mt-button>
     <mt-button
     style='margin-top: 20px;'
     plain
     size="large"
     @click="gotoIndex"
     v-if='isBindSuccess'
     >点击跳转</mt-button>
    <!-- <mt-button
     plain
     size="large"
     @click="logout"
     v-else>退出登录</mt-button> -->

  </div>
</template>

<script>
import identify from '@/components/identifyPhone'
import * as mockapi from '@/../mockapi'
import qs from 'qs'
import Header from '@/common/_header.vue'
import { Toast } from 'mint-ui'
export default {
  components:{
    'v-header':Header,
    'v-timer': identify
  },
  data(){
    return {
      phone:'',
      identifyCode: '',
      disabled: null,
      isFeatching: false,
      timer: 60,
      timerStore: '',
      isBindSuccess: false
    }
  },
  mounted() {
    // this.getVeriCode()
    this.timerStore = this.timer
  },
  methods: {
    // 获取验证码
    getVeriCode() {
      console.log(this.isFeatching)
      if (!this.phone) {
        Toast('请输入手机号')
        return
      }
      if (this.isFeatching) {
        Toast('您已经获取验证码，请稍后重试')
        return
      }
      mockapi.shop.api_Shop_generateVeriCode_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          phone: this.phone
        })
      }).then(response => {
        var data = response.data.data
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
      this.isFeatching = true
      var that = this
      var interval = setInterval(() => {
        that.timer -- 
        if (that.timer == 0 ) {
          clearInterval(interval)
          that.timer = that.timerStore
          console.log(`that.timer${that.timer}`)
          console.log(that.timer)
          console.log(that.timerStore)
          that.isFeatching = false
        }
      }, 1000)
      // setTimeout(() => {
      //   that.isFeatching = false
      // }, 6000)
    },
    sendCode (){
      if (this.phone) {
        this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
        this.$refs.timerbtn.start();
        var that = this
        setTimeout(function(){
          console.log('stop timer')
           that.$refs.timerbtn.stop(); //停止倒计时
        },4000)
      } else {
        Toast('请输入手机号')
      }
    },
    // 绑定手机
    bindPhone(){
      // var that = this
      if(this.account!=="") {
        mockapi.shop.api_Shop_bindPhone_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            phone: this.phone,
            VeriCode : this.identifyCode,
          })
        }).then(response => {
          console.log(111111)
          console.log(response.data.result)
          if (response.data.result == 1){
            this.isBindSuccess = true
            console.log('success')
            Toast('手机号绑定成功,页面跳转中... 如果没有跳转请点击手动跳转')
            // 绑定成功调到首页
            // this.$router.push({name: '首页'})
            // this.$router.push('/shop/all')
            // window.location="http://www.yunhi.vip/dist/index.html#/shop"
          }
          
          // if (response.data.result != 0) {
          //   console.log('success')
          //   // var data = response.data.data
          //   // this.navList = data.list
          //   // this.banner = data.imgurl
          //   // this.intro = data.itemintro
          //   // console.log(this.navList)
          //   Toast('手机号绑定成功')
          //   // 绑定成功调到首页
          //   this.$router.push({
          //     path: '/shop'
          //   })
          // } else {
          //   Toast('手机号绑定失败:' + response.data.msg);
          // }
          
        }).catch(error => {
          console.log(error)
        })
        
      }else {
        Toast('手机号不能为空');
      }
    },

    //退出登录按钮
    logout(){
      Toast('退出登录成功,清除token');
      this.$store.commit('CHANGE_TOKEN',0);
      this.toggle = true;
      this.account = '';
      this.password = '';

    },

    // 点击跳转
    gotoIndex() {
      this.$router.push('/shop')
    }
  }
}

</script>

<style lang="less" scoped>
.login {
  >section {
    .tip {
      padding: 6vw 3vw;
      color:rgb(224, 145, 71);
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
}
.timer{
  position: absolute;
  right: 0px;
  z-index: 1000;
  top: 12vw;
  height: 48px;
  padding: 0 6px;
  font-size: 13px;
  color: #666;
  background: #eee;
  line-height: 48px;
}
</style>
