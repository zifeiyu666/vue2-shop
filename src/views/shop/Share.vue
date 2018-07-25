<template lang="html">

  <div class="car">
      <header class="header">
          <div class="header-icon">
            <img :src="avatar" style='width: 100%; height: 100%' alt="">
          </div>
          <!-- <span>登录/注册</span> -->
           <div class="header-content">
            <p>欢迎您：{{username}}</p>
            <!-- <p>注册时间：{{time}}</p> -->
            <!-- <p>会员等级：{{memberrank}}</p> -->
            <!-- <p>购物积分：{{score}}</p> -->
            <p>分销积分：{{fxscore}}</p>
            <P>手机号：{{phone}}</P>
          </div>
          <img class='qrcode' :src="smallQrCode" alt="" @click='showQrCode()'>
      </header>
      <div class="main">
          <!-- <router-link class="my-indent" :to="{ name: ''}">
              <span class="my-indent-left">我的订单</span>
              <div class="my-indent-right">
                  <span>全部订单</span>
                  <i class="icon-go"></i>
              </div>
          </router-link> -->
          <!-- <div class='money'>
            <div class='total'>
              累计佣金：0.00元
            </div>
            <div class="current">
              0.00
            </div>
            <button class="charge">去提现</button>
          </div> -->

          <!-- <section class="my-pay">
              <router-link :to="{path: '/shop/shareproduct'}">
                  <span>18</span>
                  <p>分销产品</p>
              </router-link>
              <router-link to="/shop/shareCompany">
                  <span>3</span>
                  <p>分销商</p>
              </router-link>
              <router-link :to="{ path: '/shop/shareOrders'}">
                  <span>8</span>
                  <p>分销订单</p>
              </router-link>

          </section> -->

          <!-- <section class="my-vip">
            <router-link class="my-vip-top ho" :to="{ name: ''}" >
              <div class="my-vip-top-div">
                <span class="icon2-vip">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span>
                </span>
              </div>
              <p>
                <span>分销专题</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: ''}">
              <div>
                <span class="icon2-money"></span>
              </div>
              <p>
                <span>我的优惠</span><i class="icon-go"></i>
              </p>
            </router-link>
          </section> -->

          <section class="my-service">
              <!-- <router-link class="my-service-top" :to="{path: '/shop/shareproduct'}">
                  <div>
                    <span class="icon2-service">
                        <img src='../../assets/img/cp.png' style='width: 26px;margin-top:-4px' >
                    </span>
                    
                  </div>
                  <p>
                    <span>分销产品</span><i class="icon-go"></i>
                  </p>
              </router-link> -->
              <router-link class="my-service-bottom" to="/shop/shareCompany">
                  <div>
                    <!-- <span class="icon2-milogo"></span> -->
                    <img src='../../assets/img/fxs.png' style='width: 24px;margin-top:-4px' >
                  </div>
                  <p>
                    <span>我的分销商</span><i class="icon-go"></i>
                  </p>
              </router-link>
              <router-link class="my-service-bottom" :to="{ path: '/shop/shareOrders'}">
                  <div>
                    <!-- <span class="icon2-milogo"></span> -->
                    <img src='../../assets/img/dd.png' style='width: 22px;margin-top:-4px' >
                  </div>
                  <p>
                    <span>分销订单</span><i class="icon-go"></i>
                  </p>
              </router-link>
              <router-link :to="{ name: '分销积分'}" class="my-settle-top">
                <div>
                  <span class="icon2-f"></span>
                </div>
                <p>
                  <span>分销积分</span><i class="icon-go"></i>
                </p>
              </router-link>
          </section>

          <!-- <section class="my-settle"> -->
              
              <!-- <router-link :to="{ name: ''}" class="my-settle-bottom">
                <div>
                  <span class="icon2-settle"></span>
                </div>
                <p>
                  <span>我的上级</span><i class="icon-go"></i>
                </p>
              </router-link> -->
          <!-- </section> -->

      </div>
      <!-- <v-baseline></v-baseline> -->
      <v-footer></v-footer>

      <!-- 二维码弹窗 -->
      <el-dialog
        class='code_dialog'
        title='我的分享码'
        fullscreen
        :visible.sync="dialogVisible"
        width="100%"
        center>
        <span><img style='width: 100%; display: inline-block' :src="qrcode" alt=""></span>
      </el-dialog>
    </div>
</template>

<script>
  import * as mockapi from '@/../mockapi'
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    data() {
      return {
        qrcode: '',
        username: '',
        avatar: '',
        time: '',
        jifen: '',
        dialogVisible: false
      }
    },
    mounted() {
      var userInfo = this.$store.state.userInfo
      this.smallQrCode = userInfo.SharedQRCode
      this.avatar = userInfo.headimgurl
      this.username = userInfo.nickname
      this.jifen = userInfo.Score,
      this.time = userInfo.subscribe_time
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
          var data = res.data.data
          this.qrcode = data
        })
      },
      showQrCode() {
        console.log(11111)
        this.dialogVisible = true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  @import '../../assets/user/icon/carstyle.css';
  .avatar{
      float: left;
      padding: 10px;
    }
  .car {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
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
        color: #333;
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
            color: rgba(0, 0, 0, .4);
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
          color: #999;
          text-align: center;
          border-right: 1px solid #eee;

          >span {
            .fz(font-size, 40);
            margin-top: 1.6vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 1.8vw 0;
            text-align: center;
          }
        }
      }

      .my-vip,.my-service,.my-settle {
        width: 100%;
        .mt();
        .bd();
        .bt();
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

  .money{
    background: #f37d0f;
    position: relative;
    color: #fff;
    padding: 10px 14px;
    .total{
      font-size: 14px;
      color: #fff;
    }
    .current{
      font-size: 24px;
      line-height: 36px;
    }
    button{
      position: absolute;
      top: 24px;
      right: 16px;
      padding: 4px 6px;
      background: none;
      border: 1px solid #fff;
      border-radius: 4px;
      color: #fff;
    }
  }

</style>
