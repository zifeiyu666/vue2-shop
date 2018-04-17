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
    <div v-for="(i, index) in JfList" :key='index'>
      <div class="company-wrap clearfix">
        <div class="avatar">
          <img src="" alt="">
        </div>
        <div class="content">
          <ul>
            <li>变动类型：{{i.inout}}</li>
            <li>原因： {{i.reason}}</li>
            <li>数量： {{i.score}}</li>
            <li>变动前积分数量：{{i.beforescore}}</li>
            <li>变动前积分数量：{{i.afterscore}}</li> 
            <li>时间：{{i.recordTime}}</li>
          </ul>
        </div>
      </div>
    </div>
    
  </div>
  
</template>
<script>
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        JfList: []
      }
    },
    components: {
      'v-header':Header
    },
    mounted() {
      this.getJfList()
    },
    methods: {
      getJfList() {
        mockapi.shop.api_Shop_getMyScoreList_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          var data = res.data.data
          this.JfList = data
          console.log(this.JfList)
        })
      }
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
