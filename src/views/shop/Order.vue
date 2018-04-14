<template lang="html">

    <div class="car">
      <!-- slot分发内容 让子组件混合父组件的内容 -->
      <v-header>
        <h1 slot="title">订单详情</h1>
      </v-header>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <v-something :orderDetail="orderDetail"></v-something>
      <!-- <v-nothing></v-nothing> -->
      <v-footer :orderDetail="orderDetail"></v-footer>
    </div>
</template>

<script>
import Header from '@/common/_header.vue'
import Nothing from '@/components/order/nothing.vue'
import Something from '@/components/order/something.vue'
import Footer from '@/components/order/footer.vue'
import qs from 'qs'
import * as mockapi from '@/../mockapi'
export default {
  components:{
    'v-header':Header,
    'v-nothing':Nothing,
    'v-something':Something,
    'v-footer':Footer
  },
  data() {
    return {
      orderDetail: {}
    }
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      // TODO:这里缺少一个根据当前订单号返回正在支付的订单信息的接口
      mockapi.shop.api_Shop_getOrders_get({
        params:{
          token: this.$store.state.userInfo.MemberToken,
          orderno: this.$route.query.orderno
        }
      }).then(res => {
        var data = res.data.data
        this.orderDetail = data
        this.$store.commit('saveOrderId', data.orderid)
      })
    }
  }

}
</script>

<style lang="less" scoped>
.car {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
