<template>
  <div>
    <v-header>
      <h1 slot="title">我的积分</h1>
    </v-header>
    <header class="header">
        <div class="header-icon">
            <span class="icon2-user"></span>
        </div>
        <!-- <span>登录/注册</span> -->
        <div class="header-content">
          <p>欢迎您：xxx</p>
          <p>总积分：123</p>
        </div>
    </header>
    <!-- <mt-navbar v-model="selected">
      <mt-tab-item id="1">当前积分</mt-tab-item>
      <mt-tab-item id="2">积分记录</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :key='n' :title="'content ' + n" />
      </mt-tab-container-item>
    </mt-tab-container> -->
    <p class='title jf-title'>积分获取记录</p>
    <div v-for="n in 4" :key='n'>
      <div class="company-wrap clearfix">
        <div class="avatar">
          <img :src="$imgHost + '60x60&text=jifen'" alt="">
        </div>
        <div class="content">
          <ul>
            <li>积分获取事件</li>
            <li>获取积分数量33</li>
            <li>时间：2017-6-12</li>
          </ul>
        </div>
      </div>
    </div>
    
  </div>
  
</template>
<script>
import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        selected: '1'
      }
    },
    components: {
      'v-header':Header
    }
  }
</script>
<style lang=less>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  @import '../../assets/user/icon/carstyle.css';
  .company-wrap{
    margin-top: 20px;
    padding-left: 10px;
    background: #F8FCFF;
    border-bottom: 1px solid #eee;
    .avatar{
      float: left;
      padding: 10px;
    }
    .content{
      padding: 10px;
      font-size: 14px;
      float: left;
    }
  }
  .header {
    .header-content{
      color: #fff;
      position: absolute;
      left: 100px;
      p{
        font-size: 16px;
      }
    }
      width: 100%;
      height: 16vw;
      background: url(../../../static/carbg.png) center 0 #f37d0f;
      background-size: auto 100%;
      padding: 3.2vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .header-icon {
        border: .4vw solid #ffffff;
        background-color: @cl;
        margin-left: 4vw;
        -webkit-box-sizing: border-box;
              box-sizing: border-box;
        width: 14vw;
        height: 14vw;
        line-height: 16vw;
        text-align: center;
        border-radius: 50%;
        span {
          .fz(font-size, 54);
          &::before {
            color: #ffffff;
          }
        }
      }
      >span {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #ffffff;
        letter-spacing: .2vw;
      }
    }
    .jf-title{
      padding: 10px 0  0 15px;
    }
</style>
