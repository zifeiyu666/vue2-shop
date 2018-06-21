<template>
  <div>
    <v-header>
      <h1 slot="title">购物积分</h1>
    </v-header>
    <header class="header">
        <div class="header-icon">
          <img :src="avatar" style='width: 100%; height: 100%' alt="">
        </div>
        <!-- <span>登录/注册</span> -->
        <div class="header-content">
          <p>欢迎您：{{username}}</p>
          <p>总积分：{{jifen}}</p>
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
    <div v-for="(i, index) in JfList" :key='index' style='margin: 0 10px;'>
      <div class="company-wrap clearfix">
        <!-- <div class="avatar">
          <img src="" alt="">
        </div> -->
        <div class="content">
          <ul style='background-color: #F8FCFF!important'>
            <li>变动类型：<span>{{i.inout}}</span></li>
            <li>原因： <span>{{i.reason}}</span></li>
            <li>数量： <span>{{i.score}}</span></li>
            <!-- <li>变动前积分数量：<span>{{i.beforescore}}</span></li> -->
            <!-- <li>变动后积分数量：<span>{{i.afterscore}}</span></li>  -->
            <li>时间：<span>{{generateTime(i.recordTime)}}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="btn-wrap" style='text-align: center;margin-top:30px;margin-bottom: 20px;'>
      <mt-button @click='loadMore'>加载更多</mt-button>
    </div> -->
    <div style='padding-bottom: 40px'>

      <div style='text-align: center;position: relative;top: 20px;'>
        <mt-button @click='loadMore' v-if='!isLastPage'>加载更多</mt-button>
        <v-baseline v-else></v-baseline>
      </div>

    </div>
    
    
  </div>
  
</template>
<script>
import Baseline from '@/common/_baseline.vue'
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
import { Toast } from 'mint-ui';
  export default{
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        isLastPage: false,
        JfList: []
      }
    },
    components: {
      'v-baseline': Baseline,
      'v-header':Header
    },
    mounted() {
      this.getJfList()
      var userInfo = this.$store.state.userInfo
      this.qrcode = userInfo.SharedQRCode
      this.avatar = userInfo.headimgurl
      this.username = userInfo.nickname
      this.jifen = userInfo.Score,
      this.time = userInfo.subscribe_time
    },
    methods: {
      getJfList() {
        if (this.isLastPage) {
          Toast('已经是最后一页了')
          return 
        }
        mockapi.shop.api_Shop_getMyScoreList_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          var data = res.data.data.list
          var pager = res.data.data.pager
          this.JfList = this.JfList.concat(data)
          console.log(this.JfList)
          this.isLastPage = pager.isLastPage
        })
      },
      generateTime(time) {
        var date = ''
        var timer = ''
        date = time.substring(0,10)
        timer = time.slice(11,19)
        return (date + " " + timer)
        
      },
      loadMore() {
        this.pageNo ++ 
        this.getJfList()
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
    /* border-bottom: 1px solid #eee; */
    box-shadow: 0px 1px 2px 1px #ddd;
    .avatar{
      float: left;
      padding: 10px;
    }
    .content{
      padding: 10px;
      font-size: 14px;
      float: left;
      li{
        /* background: none; */
        font-size: 12px;
        line-height: 20px;
        span{
          font-size: 14px;
          color: #333;
          margin-left: 5px;
        }
      }
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
        overflow: hidden;
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
      font-size: 16px;
      color: #777;
      font-weight: bold;
    }
</style>
