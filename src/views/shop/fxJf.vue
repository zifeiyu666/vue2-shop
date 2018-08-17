<template>
  <div>
    <v-header>
      <h1 slot="title">分销积分</h1>
    </v-header>
    <header class="header">
        <div class="header-icon">
          <img v-if='avatar' :src="avatar" style='width: 100%; height: 100%' alt="">
        </div>
        <!-- <span>登录/注册</span> -->
        <div class="header-content">
          <p>欢迎您：{{username}}</p>
          <p>总积分：{{score}}</p>
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
    <div @click='openDialog' class='tx-btn'> <i class='iconfont icon-yiwancheng1'></i></div>
    <p class='jfmx'><span style='background: #f3f5f7'>积分明细</span></p>
    <div v-for="(i, index) in JfList" :key='index'>
      <div class="company-wrap clearfix">
        <!-- <div class="avatar">
          <img src="" alt="">
        </div> -->
        <div class="content">
           <ul style='background-color: #F8FCFF!important'>
              <!-- <li><span>{{i.inout}}</span></li> -->
              <li><span>{{i.reason}}</span></li>
              <li class='score'><span :class="{ in: i.inout == '收入' }"><i v-if='i.inout == "收入"'>+</i> <i v-else>-</i> {{i.score}}</span></li>
              <!-- <li>变动前积分数量：<span>{{i.beforescore}}</span></li> -->
              <!-- <li>变动后积分数量：<span>{{i.afterscore}}</span></li>  -->
              <li><span style='font-size: 12px; color: #666'>{{generateTime(i.recordTime)}}</span></li>
            </ul>
        </div>
      </div>
    </div>
    <div style='padding-bottom: 40px'>

      <div style='text-align: center;position: relative;top: 20px;'>
        <mt-button @click='loadMore' v-if='!isLastPage'>加载更多</mt-button>
        <v-baseline v-else></v-baseline>
      </div>

    </div>

    <el-dialog
      title="提现"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-input v-model="usescore" placeholder="请输入提现积分"></el-input>
      <div class="totalScore">
        <span>当前可用积分：{{score}}</span>
        <p>可提现现金：{{usescore/scoreRate ? Math.floor((usescore/scoreRate) * 100) / 100 : '0'}}元</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="concleTx()">取 消</el-button>
        <el-button size='small' type="primary" @click="confirmTx()">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
  
</template>
<script>
import Baseline from '@/common/_baseline.vue'
import { Toast } from 'mint-ui';
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        isLastPage: false,
        JfList: [],
        dialogVisible: false,
        score: null,
        usescore: null,
        scoreRate: '' //提现比例
      }
    },
    components: {
      'v-header':Header,
      'v-baseline': Baseline,
    },
    created() {
      var userInfo = this.$store.state.userInfo
      this.qrcode = userInfo.SharedQRCode
      this.avatar = userInfo.headimgurl
      this.username = userInfo.nickname
      this.time = userInfo.subscribe_time
    },
    mounted() {
      this.getJfList()
      this.getScoreRate()
      this.getScore()
    },
    watch: {
      usescore() {
        if (this.usescore > this.score) {
          this.usescore = '0'
          Toast('不能超过最大可用积分')
        } else if (isNaN(parseInt(this.usescore)) ) {
          // this.usescore = '0'
          Toast('请输入整形数字')
        }
      }
    },
    methods: {
      openDialog() {
        this.dialogVisible = true
      },
      concleTx() {
        this.usescore = 0
        this.dialogVisible = false
      },
      confirmTx() {
        console.log(this.usescore)
        console.log(isNaN(parseInt(this.usescore)))
        if(isNaN(parseInt(this.usescore))) {
          Toast('请输入正确的积分格式')
          return 
        }
        
        mockapi.shop.api_MustBeJustSoSo_MustBeLQ_get({
          params: {
            MemberToken: this.$store.state.userInfo.MemberToken,
            MustBeJ: Math.floor((this.usescore/this.scoreRate) * 100) / 100,
            MustBeF: this.usescore
          }
        }).then(res => {
          if (res.data.result == 1) {
            Toast('兑换成功')
            this.dialogVisible = false
          }
        })
        
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getJfList() {
        mockapi.shop.api_Shop_getMyScoreList_get({
          params: {
            type: 2,
            token: this.$store.state.userInfo.MemberToken,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          var data = res.data.data.list
          var pager = res.data.data.pager
          this.JfList = this.JfList.concat(data)
          // console.log(this.JfList)
          this.isLastPage = pager.isLastPage
        })
      },
      getScore() {
        mockapi.shop.api_Shop_getMyScore_get({
          params: {
            type: 2,
            token: this.$store.state.userInfo.MemberToken
          }
        }).then(res => {
          var data = res.data.data
          this.score = data
          console.log(111)
          console.log(this.score)
        })
      },
      getScoreRate() {
        mockapi.shop.api_Shop_getRatio_get({
          params: {
            type: 2,
            token: this.$store.state.userInfo.MemberToken
          }
        }).then(res => {
          var data = res.data.data
          this.scoreRate = data
          console.log(222)
          console.log(this.scoreRate)
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
