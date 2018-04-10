<template lang="html">

    <div class="car">
      <!-- slot分发内容 让子组件混合父组件的内容 -->
      <v-header>
        <h1 slot="title">我的收藏</h1>
      </v-header>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <v-something v-if="list" :list = 'list' @loadmore = 'loadmore' @updatelist='updatelist'></v-something>
      <v-nothing v-else></v-nothing>
      <!-- <v-footer></v-footer> -->
    </div>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
import Nothing from '@/components/collection/nothing.vue'
import Something from '@/components/collection/something.vue'
import Footer from '@/components/collection/footer.vue'

export default {
  components:{
    'v-header':Header,
    'v-nothing':Nothing,
    'v-something':Something,
    'v-footer':Footer
  },
  data() {
    return {
      count: '',
      pageNo: 1,
      pageSize: 10,
      list: []
    }
  },
  mounted(){
    this.getCollectionList()
   
  },
  methods: {
    getCollectionList() {
      mockapi.shop.api_Shop_getMyCollection_get({
        params: {
          token: this.$store.state.userInfo.MemberToken,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(res => {
        var data = res.data.data
        this.pageNo++
        this.list = this.list.concat(data)
      })
    },
    updatelist() {
      this.list = []
      this.pageNo = 1
      this.getCollectionList()
    },
    loadmore() {
      this.getCollectionList()
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
