<template>
  <div>
    <v-header>
      <h1 slot="title">业务员成交记录</h1>
    </v-header>
    <!-- <header class="header">
        <div class="header-icon">
          <img v-if='avatar' :src="avatar" style='width: 100%; height: 100%' alt="">
        </div>
        <div class="header-content">
          <p>欢迎您：{{username}}</p>
          <p>总积分：{{score}}</p>
        </div>
    </header> -->
    <!-- <div @click='openDialog' class='tx-btn'> <i class='iconfont icon-yiwancheng1'></i></div> -->
    <p class='jfmx'><span style='background: #f3f5f7'>成交明细</span></p>
    <ul
      v-if='FxList.length > 0 && FxList[0]'
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isloading"
      infinite-scroll-distance="10"
      >
      <li v-for="(i, index) in FxList" :key='index' >
        <div class="company-wrap clearfix">
          <!-- <div class="avatar">
            <img src="" alt="">
          </div> -->
          <div class="content">
            <ul style='background-color: #F8FCFF!important'>
                <!-- <li><span>{{i.inout}}</span></li> -->
                <li><span>{{i.producttitle}}</span></li>
                <li><span>购买数量：{{i.buynum}}</span></li>
                <li class='score'><span class="in"> ￥{{i.totalprice}}</span></li>
                <!-- <li>变动前积分数量：<span>{{i.beforescore}}</span></li> -->
                <!-- <li>变动后积分数量：<span>{{i.afterscore}}</span></li>  -->
                <li><span style='font-size: 12px; color: #666'>{{parseTime(i.recordTime)}}</span></li>
              </ul>
          </div>
        </div>
      </li>
    </ul>
    
    <div v-else>
      <v-nomore></v-nomore>
    </div>

    <v-baseline v-if='isLastPage && FxList.length > 0'></v-baseline>
    
  </div>
  
</template>
<script>
import Baseline from '@/common/_baseline.vue'
import { Toast } from 'mint-ui';
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
import NorMore from '@/components/nomore'
import { parseTime } from '@/util/data.js'

  export default{
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        isLastPage: false,
        FxList: [],
        score: null,
        usescore: null,
        loading: false
      }
    },
    components: {
      'v-header':Header,
      'v-baseline': Baseline,
      'v-nomore': NorMore
    },
    mounted() {
      let userInfo = sessionStorage.getItem('token')
      if (userInfo) {
        let data = userInfo.split(',')
        this.username = data[0]
        this.token = data[1]
      } else {
        this.$router.push('/channelcenter/login')
      }
      this.getFxList()
    },
    methods: {
      parseTime,
      getFxList() {
        this.isloading = true
        this.$store.commit('SET_LOADING', true);
        mockapi.shop.api_Channel_getSalesmanOrdersList_get({
          params: {
            token: this.token,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            openid: this.$route.query.id
          }
        }).then(res => {
          this.isloading = false
          var data = res.data.data.list
          this.pageNo++
          this.FxList = this.FxList.concat(data)
          this.isLastPage = res.data.data.pager.isLastPage
          this.$store.commit('SET_LOADING', false);
        }).catch(err => {
          console.log(err)
          this.$store.commit('SET_LOADING', false);
          this.isloading = false
        })
      },
      loadMore() {
        console.log('loadmore')
        console.log({isLastPage: this.isLastPage})
        if (!this.isLastPage) {
          this.getFxList()
        }
      } 
    }
  }
</script>
<style lang=less>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  @import '../../assets/user/icon/carstyle.css';
  .tx-btn{
    padding: 10px;
    background: #ff4800;
    width: 10vw;
    height:10vw;
    position:fixed;
    z-index: 100;
    right: 20px;
    bottom: 20px;
    border-radius: 10vw;
    color: #fff;
    i{
      font-size: 10vw;
    }
  }
  .el-dialog{
    width: 80%;
  }
  .mint-toast{
    z-index: 10000;
  }
  .el-message-box{
    width: 90%;
  }
  .totalScore{
    text-align: right;
    padding: 0px 10px;
    span{
      font-size: 12px;
      color: #FFAA00;
    }
  }
  .company-wrap{
    padding-top: 5px; 
    padding-left: 10px;
    background: #F8FCFF;
    border-bottom: 1px solid #eee;
    position: relative;
    /* box-shadow: 0px 1px 2px 1px #ddd;
     */
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
      .score{
        position: absolute;
        right: 20px;
        top: 20px;
        span{
          color: #ff4800;
          font-size: 25px !important;
        }

        .in{
          color: green
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
