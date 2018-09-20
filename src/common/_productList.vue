<template>
  <div class="product_list_wrap">
      <h3 class='title'>
        全部商品
        <span class="more">查看更多></span>
      </h3>
      <ul 
        class="something" 
        v-if='allList.length != 0'
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isLoading"
        infinite-scroll-distance="0"
        >
        <li v-for="(k,i) in allList" @click='gotoDetail(k)' :key="i">
          <div class="something-middle">
            <img :src="k.imgurl[0]">
          </div>
          <div class="something-right">
            <p>{{k.title}}</p>
            <!-- <p style="color:rgb(199, 108, 28);"> {{k.intro}}</p> -->
            <p>￥{{k.price}}元</p>
            <!-- <div class="something-right-bottom">
              <span @click='deleteCollection(k)'></span>
            </div> -->
          </div>
        </li>
      </ul>
      <div v-else>
        <v-nomore></v-nomore>
      </div>
    </div>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import NorMore from '@/components/nomore'

export default {
  components: {
    'v-nomore': NorMore
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      isLastPage: false,
      allList: [],
      isLoading: false,
    }
  },
  mounted() {
    this.getAllProductList()
  },
  methods: {
    // 所有商品加载更多
    getAllProductList() {
      this.isLoading = true
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_Shop_getAllProductList_get({
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          Title: '',
          ProductType: '',
          SuitableUser: '',
          DestinationType: '',
        }
      }).then(res => {
        var data = res.data.data.list
        this.pageNo++
        this.allList = this.allList.concat(data)
        this.isLastPage = res.data.data.pager.isLastPage
        this.$store.commit('SET_LOADING', false)
        this.isLoading = false
      }).catch(err => {
        this.$store.commit('SET_LOADING', false)
        this.isLoading = false
        console.log(err)
      })
    },
    loadMore() {
      if (!this.isLastPage) {
        this.getAllProductList()
      }
    },
    gotoDetail(i) {
      console.log()
      this.$router.push({path: '/shop/detail', query: {pid: i.id}})
    },
  }
}

</script>

<style lang='less'>
@import '../assets/utils.less';
</style>
