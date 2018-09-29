<template lang="html">
  <div class="index">
    <div class='swiper-container'>
      <v-swiper :swiperData="bannerList"></v-swiper>
    </div>
    <mt-button @click='goToIntroduce()' style='display: block; width: 95vw; background: #FFAA00; margin: 2.5vw' size='small' type='danger'>集团介绍</mt-button>
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
      this.$store.commit('SET_LOADING', true)
      mockapi.show.api_Show_getWebBanner_get({
      }).then(response => {
        this.$store.commit('SET_LOADING', false)
        var data = response.data.data
        console.log(data)
        this.bannerList = data
      }).catch(error => {
        this.$store.commit('SET_LOADING', false)
        console.log(error)
      })
    },
    getItemList() {
      this.$store.commit('SET_LOADING', true)
      mockapi.show.api_Show_getTopItem_get({
        params: {
          top: 5
        }
      }).then(response => {
        this.$store.commit('SET_LOADING', false)
        var data = response.data.data
        this.items = data
        console.log(this.items)
      }).catch(error => {
        this.$store.commit('SET_LOADING', false)
        console.log(error)
      })
    },
    // 查看详情
    goToDetail(i) {
      console.log(11111)
      this.$router.push({path: '/show/itemnav', query:{id: i.id}})
    },
    // 项目简介
    goToIntroduce() {
      this.$router.push({path: '/show/itemDetail', query: {code: 'JTJS', name: ''}})
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
