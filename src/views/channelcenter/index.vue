<template lang="html">

  <div class="car">
      <header class="header">
          <!-- <div class="header-icon">
            <img :src="avatar" style='width: 100%; height: 100%' alt="">
          </div> -->
          <!-- <span>登录/注册</span> -->
           <div class="header-content">
            <p>渠道中心</p>
            <p>欢迎您：{{username}}</p>
            <!-- <p>注册时间：{{time}}</p> -->
            <!-- <p>会员等级：{{memberrank}}</p> -->
            <!-- <p>购物积分：{{score}}</p> -->
            <!-- <p>分销积分：{{fxscore}}</p>
            <P>手机号：{{phone}}</P> -->
          </div>
          <!-- <img class='qrcode' :src="smallQrCode" alt="" @click='showQrCode()'> -->
      </header>
      <div class="main">


          <section class="my-service">
            <a @click='showQrCode()' class="my-service-bottom">
              <div>
                <img src='../../assets/img/qrcode.png' style='width: 22px;margin-top:-4px' >
              </div>
              <p>
                <span>渠道二维码</span><i class="icon-go"></i>
              </p>
            </a>
              <router-link class="my-service-bottom" to="/channelcenter/sharemanager">
                  <div>
                    <!-- <span class="icon2-milogo"></span> -->
                    <img src='../../assets/img/fxs.png' style='width: 24px;margin-top:-4px' >
                  </div>
                  <p>
                    <span>渠道业务员管理</span><i class="icon-go"></i>
                  </p>
              </router-link>
              <router-link to="/channelcenter/fxjl" class="my-service-bottom">
                <div>
                  <span class="icon2-f"></span>
                </div>
                <p>
                  <span>渠道整理业绩</span><i class="icon-go"></i>
                </p>
              </router-link>
              <router-link class="my-service-bottom" :to="{ path: '/channelcenter/search', query: {title: '分销产品',  type: 'qd'}}">
                  <div>
                    <!-- <span class="icon2-milogo"></span> -->
                    <img src='../../assets/img/sharegoods1.png' style='width: 22px;margin-top:-4px' >
                  </div>
                  <p>
                    <span>热门分销产品</span><i class="icon-go"></i>
                  </p>
              </router-link>
              
              
          </section>

      </div>
      <v-qrcode @close='closeQrCode' :imgurl='qrcode' :isShow='isShow'></v-qrcode>
    </div>
</template>

<script>
  import * as mockapi from '@/../mockapi'
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
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
        avatar: '',
        time: '',
        jifen: '',
        fxscore: '',
        phone: '',
        smallQrCode: '',
        // dialogVisible: false,
        isShow: false
      }
    },
    mounted() {
      let userInfo = sessionStorage.getItem('token')
      if (userInfo) {
        let data = userInfo.split(',')
        this.username = data[0]
        this.token = data[1]
      } else {
        this.$router.push('/channelcenter/login')
        return
      }
      this.getQrCord()
    },
    methods: {
      // 获取二维码
      getQrCord() {
        mockapi.shop.api_Channel_getChannelQRCode_get({
          params:{
            token: this.token
          }
        }).then(res => {
          var data = res.data.data
          console.log(data)
          var qrcodeList = data.split(',')
          console.log(qrcodeList)
          this.smallQrCode = qrcodeList[0]
          this.qrcode = qrcodeList[1]
        })
      },
      showQrCode() {
        console.log(11111)
        // this.dialogVisible = true
        this.isShow = true
      },
      closeQrCode() {
        this.isShow = false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  @import '../../assets/user/icon/carstyle.css';
  
  .my-service-bottom{
    p span{
      color: @fontBlack;
    }
  }
  
  .avatar{
      float: left;
      padding: 10px;
    }
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
        font-size: 18px;
      }
      color: #fff;
      position: absolute;
      left: 20px;
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
      .my-service{
        color: @fontBlack;
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
