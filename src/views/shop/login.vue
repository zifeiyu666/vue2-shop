<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">登录页</h1>
    </v-header>
    <section>
      <v-timer ref="timerbtn" class="btn btn-default timer" v-on:run="sendCode" 
:disabled="disabled" :second="60"></v-timer>
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
        v-model = "phone"
      ></mt-field>
      <!-- <mt-field
       label="密码"
       placeholder="请输入密码"
       type="password"
       v-model="password"
       :readonly='!toggle'
       :disableClear = '!toggle'
        ></mt-field> -->
      <p class="tip">Tip : 您尚未绑定手机号，请进行手机号绑定</p>
    </section>
    <mt-button
     plain
     size="large"
     @click="bindPhone"
     >绑定</mt-button>
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
      phone:''
    }
  },
  mounted() {
    this.getVeriCode()
  },
  methods: {
    // 获取验证码
    getVeriCode() {
      mockapi.shop.api_Shop_generateVeriCode_post({
        data: qs.stringify({
          token: 1,
          phone: '18554870804'
        })
      }).then(response => {
        var data = response.data.data
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
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
      if(this.account!=="") {
        mockapi.shop.api_Shop_bindPhone_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            phone: this.phone,
            VeriCode: '123123',
          })
        }).then(response => {
          var data = response.data.data
          this.navList = data.list
          this.banner = data.imgurl
          this.intro = data.itemintro
          console.log(this.navList)
        }).catch(error => {
          console.log(error)
        })
        Toast('手机号绑定成功');
      }else {
        Toast('手机号不能为空');
      }

      setTimeout(()=>{
        this.$router.replace({
          path: 'user'
        })
      },1000);
      // 登录成
    },

    //退出登录按钮
    logout(){
      Toast('退出登录成功,清除token');
      this.$store.commit('CHANGE_TOKEN',0);
      this.toggle = true;
      this.account = '';
      this.password = '';

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
  top: 42px;
  height: 48px;
  padding: 0 6px;
  font-size: 13px;
  color: #666;
  background: #eee;
}
</style>
