<template lang="html">
  <footer class="pay_footer">

    <div class="footer-result">
      <p>合计：</p>
      <p><span v-if='orderDetail'>{{orderDetail.realtotalprice}} </span>元</p>
    </div>
    <!-- <router-link :to="{ name: '分类页'}" class="footer-goon" >
      继续购物
    </router-link> -->
    <a class="footer-pay" @click="goPay">
      支付订单
    </a>
  </footer>

</template>

<script>
import { MessageBox } from 'mint-ui';
import * as mockapi from '@/../mockapi'
export default {
  props: ['orderDetail'],
  data() {
    return {
      jsondata: undefined
    }
  },
  computed:{

    //商品的价格总和
    allpay(){
      var all = 0
      if (this.orderDetail.opd) {
        this.orderDetail.opd.forEach((item,i) => {
          all = all + item.realprice
        })
      }
      return all
    }
  },

  methods:{
    //点击跳转到支付页
    goPay(){
      var that = this
      MessageBox.confirm('立即去支付?').then(action => {
        mockapi.shop.api_GetWCPay_get({
          params: {
            MemberToken: this.$store.state.userInfo.MemberToken,
            OrderId: this.$route.query.orderid
          }
        }).then(res => {
          var data = res.data.data
          var jsondata = data
          
          WeixinJSBridge.invoke('getBrandWCPayRequest', {
              "appId": jsondata.appId, //公众号名称，由商户传入
              "timeStamp": jsondata.timeStamp, //时间戳
              "nonceStr": jsondata.nonceStr, //随机串
              "package": jsondata.package,//扩展包
              "signType": "MD5", //微信签名方式:MD5
              "paySign": jsondata.paySign //微信签名
          }, function (res) {
              // alert(JSON.stringify(res));
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                  // if (confirm('支付成功！点击“确定”进入退款流程测试。')) {
                  //     location.href = '@Url.Action("Refund", "TenPayV3")';
                  // }
                  //console.log(JSON.stringify(res));
                  // that.$message('支付成功')
                  that.$confirm('已成功支付，接下来您打算去往哪里？', '支付成功', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '查看订单',
                    cancelButtonText: '返回首页',
                    center: true,
                    customClass: 'el_message',
                    showClose: false
                  })
                  .then(() => {
                    that.$router.push('/shop/myorder')
                  })
                  .catch(action => {
                    that.$router.push('/shop')
                  });
                  // that.$router.push('/shop/myorder')
              } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                // that.$message('支付被取消')
                // that.$router.push('/shop/myorder')
                that.$confirm('支付被取消，接下来您打算去往哪里？', '支付失败', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '查看订单',
                    cancelButtonText: '返回首页',
                    center: true,
                    customClass: 'el_message',
                    showClose: false
                  })
                  .then(() => {
                    that.$router.push('/shop/myorder')
                  })
                  .catch(action => {
                    that.$router.push('/shop')
                  });
              }
              // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              //因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
          })
        }).catch(err => {
          console.log('支付出错', err)
          that.$confirm('发生错误，接下来您打算去往哪里？', '支付失败', {
            distinguishCancelAndClose: true,
            confirmButtonText: '查看订单',
            cancelButtonText: '返回首页',
            center: true,
            customClass: 'el_message',
            showClose: false
          })
          .then(() => {
            that.$router.push('/shop/myorder')
          })
          .catch(action => {
            that.$router.push('/shop')
          });
        })
      })
    }
  }
}
</script>

<style lang="less">
@import '../../assets/fz.less';
  .el_message{
    width: 80vw;
  }
  .pay_footer {
    width: 100%;
    height: 16vw;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    
    .footer-result,a {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
    }

    .footer-result {
      p {
        .fz(font-size,24);
        color: #999;
      }

      p:last-of-type {

        padding: 1vw 0 0 1vw;
        span {
          color:@cl;
          .fz(font-size,42);
        }
      }
    }

    .footer-goon {
      background-color: #F4F4F4;
      line-height: 16vw;
    }

    .footer-pay {
      background-color: @cl;
      line-height: 16vw;
      color:#fff;
    }

  }
</style>
