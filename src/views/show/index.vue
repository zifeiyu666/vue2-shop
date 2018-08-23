<template lang="html">
  <div class="index">
    <div class='swiper-container'>
      <v-swiper :swiperData="bannerList"></v-swiper>
    </div>
    <v-title title='项目展示' @clickMore='moreItems'></v-title>
    <div v-for='(i, index) in items' :key='index' @click='goToDetail(i)'>
      <item-show :itemData="i"></item-show>
    </div>
    <div class="nothing"></div>
    <!-- <v-title title='新闻资讯' @clickMore='moreNews'></v-title>
    <news-show></news-show> 
    <news-show></news-show>
    <news-show></news-show> -->
    <v-footer></v-footer>
  </div>
</template>

<script>
import Swiper from '@/components/index/swiper.vue'
import * as mockapi from '@/../mockapi'
import qs from 'qs'
import Footer from '@/common/show/_footer'
import ItemShow from '@/components/show/ItemShow'
import Title from '@/components/show/Title'
import NewsShow from '@/components/show/NewsShow'

export default {  
  components: {
    'v-footer': Footer,
    ItemShow,
    'v-title': Title,
    NewsShow,
    'v-swiper': Swiper,
  },
  data() {
    return {
      bannerList: [],
      items: [],
      loading:true
    }
  },
  mounted() {
    this.getBannerList()
    this.getItemList()
  },
  methods: {
    getBannerList() {
      mockapi.show.api_Show_getWebBanner_get({
      }).then(response => {
        console.log('成功返回banner')
        var data = response.data.data
        console.log(data)
        this.bannerList = data
      }).catch(error => {
        console.log(error)
      })
    },
    getItemList() {
      mockapi.show.api_Show_getTopItem_get({
        params: {
          top: 5
        }
      }).then(response => {
        var data = response.data.data
        this.items = data
        console.log(this.items)
      }).catch(error => {
        console.log(error)
      })
    },
    // 查看详情
    goToDetail(i) {
      console.log(11111)
      this.$router.push({path: '/show/itemnav', query:{id: i.id}})
    },
    moreItems() {
      console.log(11111111)
      this.$router.push('/show/item/list')
    },
    moreNews() {

    }
  }
}
</script>


<style lang="less" scoped>
.index {
    padding-top: 0;
    padding-bottom: 90px;
    width: 100%;
    height: 100%;
    background-color: #EBEBEB;
}
.nothing {
  height: 60px;
}
</style>
