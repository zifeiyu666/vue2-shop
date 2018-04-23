<template lang="html">

    <div class="car">
      <!-- slot分发内容 让子组件混合父组件的内容 -->
      <v-header>
        <h1 slot="title">购物车</h1>
      </v-header>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <v-something></v-something>
      <!-- <v-nothing></v-nothing> -->
      <v-footer></v-footer>
    </div>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
import Nothing from '@/components/car/nothing.vue'
import Something from '@/components/car/something.vue'
import Footer from '@/components/car/footer.vue'

export default {
  components:{
    'v-header':Header,
    'v-nothing':Nothing,
    'v-something':Something,
    'v-footer':Footer
  },
  data() {
    return {
      carList: undefined,
      pageNo: 1,
      pageSize: 10
    }
  },
  mounted(){
    // this.getMyCar()
  },
  methods: {
    getMyCar() {
      mockapi.shop.api_Shop_getMyCar_get({
        params: {
          token: this.$store.state.userInfo.MemberToken,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(res => {
        var data = res.data.data.list
        this.carList = data
        this.$store.commit('saveCarlist', data)
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
