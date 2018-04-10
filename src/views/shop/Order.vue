<template lang="html">

    <div class="car">
      <!-- slot分发内容 让子组件混合父组件的内容 -->
      <v-header>
        <h1 slot="title">订单详情</h1>
      </v-header>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <v-something></v-something>
      <!-- <v-nothing></v-nothing> -->
      <v-footer></v-footer>
    </div>
</template>

<script>
import Header from '@/common/_header.vue'
import Nothing from '@/components/order/nothing.vue'
import Something from '@/components/order/something.vue'
import Footer from '@/components/order/footer.vue'

export default {
  components:{
    'v-header':Header,
    'v-nothing':Nothing,
    'v-something':Something,
    'v-footer':Footer
  },
  mounted() {},
  methods() {
    // TODO:这里缺少一个根据当前订单号返回正在支付的订单信息的接口
    
  }

}
</script>

<style lang="less" scoped>
.car {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
