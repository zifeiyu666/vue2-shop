<template>
  <div>
    <v-header>
      <h1 slot="title">资料修改</h1>
    </v-header>
    <!-- <mt-field label="姓名" placeholder="请输入" v-model="username"></mt-field> -->
    <!-- <mt-field label="原密码" placeholder="请输入" type="password" v-modal="password"></mt-field>
    <mt-field label="新密码" placeholder="请输入" type="password" v-modal="password"></mt-field> -->
    <!-- <div>
      <span>已绑定手机号：</span>
      12354234234
    </div>
    <mt-field label="手机号" placeholder="请输入" type="tel" v-model="phone"></mt-field>
    <mt-field label="验证码" placeholder="请输入" type="tel" v-model="phone"></mt-field> -->
    <identify-phone>获取验证码</identify-phone>
    <!-- <div>
      <mt-button class='btn'>保存</mt-button>
    </div> -->
  </div>
</template>
<script>
  import Header from '@/common/_header.vue'
  import IdentifyPhone from '@/components/identifyPhone'
  export default{
    components: {
      'v-header': Header,
      IdentifyPhone
    },
    data() {
      return {
        phone: ''
      }
    }
  }
</script>
<style>
  .btn{
    width: 100%;

    text-align: center;
    margin-top: 20px; 
    color:#fff;
    background: #f37d0f;
  }
</style>