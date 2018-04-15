<template lang="html">
  <footer class="footer">

    <div class="footer-result">
      <p>共{{count}}件 金额：</p>
      <p><span>{{allpay}} </span>元</p>
    </div>
    <router-link :to="{ path: '/shop/all'}" class="footer-goon" >
      继续购物
    </router-link>
    <a class="footer-pay" @click="goPay">
      去结算
    </a>
  </footer>

</template>

<script>
import { MessageBox } from 'mint-ui';
import * as mockapi from '@/../mockapi'
import qs from 'qs'
export default {
  computed:{
    // 勾选的商品数量
    // count(){
    //   // 如果已选择列表为空 就返回0
    //   if(this.$store.getters.selectedList==undefined) {
    //     return 0
    //   }else {

    //     return this.$store.getters.selectedList.length
    //   }
    // },
    carList() {
      return this.$store.state.carList
    },
    count() {
      return this.$store.state.allJS ? this.$store.state.allJS : 0
    },
    allpay() {
      return this.$store.state.allMoney ? this.$store.state.allMoney : 0
    }
  },
  data() {
    return {
      params: []
    }
  },
  watch: {
    carList() {
      console.log(123123333)
      console.log(this.carList)
      this.carList.forEach((item, i) => {
        this.params.push({propid: item.propid, num: item.num})
      })
    }
  },
  methods:{
    //点击跳转到支付页
    goPay(){
      mockapi.shop.api_Shop_generateCarOrder_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          params: this.params,
          Score: 0 // TODO: 暂时这么处理
        })
      }).then(res => {
        var data = res.data.data
        this.$router.push({path: '/shop/order', query: {orderno: data.orderno, orderid: data.orderid}})
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';

  .footer {
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
