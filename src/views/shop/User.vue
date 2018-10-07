<template lang="html">

  <div class="car">
      <header class="header" >
          <div class="header-icon">
              <span>
                <img :src="avatar" style='width: 100%; height: 100%' alt="">
              </span>
          </div>
          <!-- <span>登录/注册</span> -->
          <div class="header-content">
            <p>{{username}} <span style='font-size: 16px; font-weight: bold; margin-left: 5px'>v</span> {{memberrank}}</p>
            <p>注册时间：{{time}}</p>
            <!-- <p>会员等级：{{memberrank}}</p> -->
            <!-- <p>购物积分：{{score}}</p> -->
            <p>手机号：{{phone}}</p>
            <!-- <p>分销积分：{{fxscore}}</p> -->
          </div>
          <!-- <img class='qrcode' :src="smallQrCode" alt="" @click='showQrCode()'> -->
      </header>
      <div class="main">
          <router-link class="my-indent" :to="{ path: '/shop/myorder'}">
              <span class="my-indent-left">我的订单</span>
              <div class="my-indent-right">
                  <span>全部订单</span>
                  <i class="icon-go"></i>
              </div>
          </router-link>
          <section class="my-pay">
              <router-link :to="{ path: '/shop/myorder'}">
                  <i class="iconfont icon-yifukuan"></i>
                  <p>全部</p>
              </router-link>
              <router-link :to="{ path: '/shop/myorder', query: {selected: '2'}}">
                  <i class="iconfont icon-daifukuan"></i>
                  <p>待付款</p>
              </router-link>
              <router-link :to="{ path: '/shop/myorder', query: {selected: '3'}}">
                  <i class="iconfont icon-yiwancheng1"></i>
                  <p>已付款</p>
              </router-link>
              <router-link :to="{ path: '/shop/refundList'}">
                  <i class="iconfont icon-tuihuanhuo"></i>
                  <p>退换货</p>
              </router-link>

          </section>

          <section class="my-vip">
            <router-link class="my-vip-top ho" to="/shop/collection" >
              <div class="my-vip-top-div">
                <span class="icon2-vip">
                  <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span>
                </span>
              </div>
              <p>
                <span>我的收藏</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ path: '/shop/choujiang'}">
              <div>
                <img class='icon' src="../../assets/img/choujiang.png" alt="">
              </div>
              <p>
                <span>每日好礼</span><i class="icon-go"></i>
              </p>
            </router-link>
            <!-- 需求变动不需要购物积分 -->
            <!-- <router-link :to="{ name: '购物积分'}" class="my-settle-top">
              <div>
                <span class="icon2-f"></span>
              </div>
              <p>
                <span>购物积分</span><i class="icon-go"></i>
              </p>
            </router-link> -->
            <!-- <router-link :to="{ name: '分销积分'}" class="my-settle-top">
              <div>
                <span class="icon2-f"></span>
              </div>
              <p>
                <span>分销积分</span><i class="icon-go"></i>
              </p>
            </router-link> -->
            
            <a @click='goToCar()' class="my-service-bottom">
              <div>
                <img src='../../assets/img/carcar.png' style='width: 30px;margin-left:-4px' >
              </div>
              <p>
                <span>我的购物车</span><i class="icon-go"></i>
              </p>
            </a>
            <a @click='showQrCode()' class="my-service-bottom">
              <div>
                <img src='../../assets/img/qrcode.png' style='width: 22px;' >
              </div>
              <p>
                <span>我的二维码</span><i class="icon-go"></i>
              </p>
            </a>
            <router-link :to="{ name: '度假卡'}" class="my-settle-top">
              <div>
                <img src='../../assets/img/hotel.png' style='width: 22px;' >
              </div>
              <p>
                <span>我的度假卡</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link :to="{ name: '分销中心'}" class="my-settle-top">
              <div>
                <span class="icon2-f"></span>
              </div>
              <p>
                <span>分销中心</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" to="/shop/edit">
              <div>
                <span class="icon2-settle"></span>
              </div>
              <p>
                <span>资料修改</span><i class="icon-go"></i>
              </p>
            </router-link>
            
            
          </section>

          

      </div>
      <v-footer></v-footer>

      <!-- 二维码弹窗 -->
      <!-- <el-dialog
        class='code_dialog'
        title='我的分享码'
        fullscreen
        :visible.sync="dialogVisible"
        width="100%"
        center>
        <span><img style='width: 100%; display: inline-block' :src="qrcode" alt=""></span>
      </el-dialog> -->
      <v-qrcode @close='closeQrCode' :imgurl='qrcode' :isShow='isShow'></v-qrcode>
    </div>
</template>

<script>
  import * as mockapi from '@/../mockapi'
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { mapState } from 'vuex'
  import Qrcode from '@/components/qrcode.vue'
  
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer,
      'v-qrcode': Qrcode
    },
    data() {
      return {
        qrcode: '',
        username: '',
        phone: '',
        avatar: '',
        time: '',
        jifen: '',
        smallQrCode: '',
        memberrank: '',
        // dialogVisible: false,
        isShow: false
      }
    },
    mounted() {
      var userInfo = this.$store.state.userInfo
      console.log({userInfo: userInfo})
      console.log(userInfo)
      console.log(userInfo.nickname)
      this.avatar = userInfo.headimgurl
      // this.smallQrCode = userInfo.SharedQRCode
      this.username = userInfo.nickname
      this.jifen = userInfo.Score,
      this.time = userInfo.subscribe_time,
      this.memberrank = userInfo.MemberRankName
      this.score = userInfo.Score
      this.fxscore = userInfo.FenXiaoScore
      this.phone = userInfo.Phone

      this.getQrCord()
    },
    methods: {
      // 获取二维码
      getQrCord() {
        mockapi.shop.api_Shop_getMySharedQRCode_get({
          params:{
            token: this.$store.state.userInfo.MemberToken
          }
        }).then(res => {
          var data = res.data.data.split(',')
          this.qrcode = data[1]
          this.smallQrCode = data[0]
        })
      },
      showQrCode() {
        console.log(11111)
        // this.dialogVisible = true
        this.isShow = true
      },
      closeQrCode() {
        this.isShow = false
      },
      goToCar() {
        this.$router.push('/shop/car')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/utils.less';
  @import '../../assets/index/style.css';
  @import '../../assets/user/icon/carstyle.css';

  .car {
    width: 100%;
    padding-bottom: 14vw;
    .qrcode{
        position: absolute;
        width: 50px;
        height: 50px;
        right: 20px;
        border: 1px solid #eee;
      }
    .header-content{
      p{
        font-size: 12px;
      }
      color: #fff;
      position: absolute;
      left: 80px;
    }
    .header {
      width: 100%;
      height: 16vw;
      background: url(../../../static/carbg.png)  #f37d0f;
      background-position: center 0;
      background-color: #f37d0f;
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
        // line-height: 16vw;
        text-align: center;
        border-radius: 50%;
        overflow: hidden;
        // span {
        //   .fz(font-size, 54);
        //   &::before {
        //     color: #ffffff;
        //   }
        // }
      }
      >span {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #ffffff;
        letter-spacing: .2vw;
      }
    }
    .main {
      width: 100%;
      .my-indent {
        width: 100%;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: @fontBlack;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        .bd();
        &:active {
          background-color: rgb(224, 227, 230)
        }

        .my-indent-right {
          span {
            display: inline-block;
            .fz(font-size, 28);
            color: @fontGray;
            position: relative;
          }
          i {
            position: relative;
            top: .8vw;
          }
        }
      }

      .my-pay {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff;
        .bd();

        >a {
          display: block;
          width: 33.33%;
          color: @fontGray;
          text-align: center;

          >span {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 2.3vw 0;
            text-align: center;
          }
        }
      }

      .my-vip,.my-service,.my-settle {
        width: 100%;
        .mt();
        .bd();
        .bt();
        margin-top: 6px !important;
        .icon{
          width: 27px;
        }
        p{
          color: @fontBlack;
        }
        >a {
          background-color: #fff;
          display: block;
          width: 100%;
          display: -ms-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 15vw;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          padding: 0 6vw;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          &:active {
            background-color: rgb(224, 227, 230);
          }
          >div {
            -ms-flex: 2;
            -webkit-box-flex: 2;
                    flex: 2;
                    padding-top: 1.3vw;
          }

          .my-vip-top-div {
            padding-top: 0;
          }
          >p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
                    flex: 10;
            position: relative;

            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: .4vw;
            }
          }
        }

      }
    }
  }
  /*图标大小不一，重新定义*/

  .icon-go {
    .fz(font-size, 36);
    &::before {
      color: #aba8a8;
    }
  }

  [class^="icon2-"],
  [class*=" icon2-"] {
    .fz(font-size, 50);
  }

  .icon2-service {
    .fz(font-size, 34);
  }
  .iconfont{
    font-size: 26px;
    line-height: 26px;
    margin-top: 2.3vw;
    display: block;
    text-align: center;
  }

</style>
