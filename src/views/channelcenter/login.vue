<template>
  <div id='channelcenter-login'>
    <div class="title">
      <h3>渠道用户登录</h3>
    </div>
    <mt-field label='用户名' placeholder='请输入用户名' v-model='username'></mt-field>
    <mt-field label='密码' placeholder='请输入密码' type="password" v-model='password'></mt-field>
    <div class="login">
      <mt-button type='danger' size='large' @click='login'>登录</mt-button>
    </div>
    
  </div>
</template>
<script>
  import * as mockapi from '@/../mockapi'
  import { Toast } from 'mint-ui';
  import qs from 'qs'
  export default{
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        if (!this.username) {
          Toast('请输入用户名')
          return
        }
        if (!this.password) {
          Toast('请输入密码')
          return
        }
        mockapi.shop.api_Channel_ChannelLogin_post({
          data: (
            qs.stringify({
              username: this.username,
              password: this.password
            })
          )
        }).then(res => {
          console.log('success')
          if(res.data.result == 1) {
            Toast('登陆成功，跳转中。。。')
            sessionStorage.setItem('token', res.data.data)
            this.$router.push('/channelcenter')
          } else {
            Toast(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang='less'>
#channelcenter-login{
  padding: 10px 0px;
  .title{
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 20px;
    h3{
      text-align: center;
    }
  }
  .login{
    margin-top: 20px;
  }
}
</style>