<template lang="html">
  <div class="index">
    <div class='swiper-container'>
      <!-- <mt-swipe :auto="4000">
        <mt-swipe-item>
          <p class='item01'>1</p>
        </mt-swipe-item>
        <mt-swipe-item>
          <p class='item02'>2</p>
        </mt-swipe-item>
        <mt-swipe-item>
          <p class='item03'>3</p>
        </mt-swipe-item>
      </mt-swipe> -->
      <v-swiper :swiperData="datas.bannerList"></v-swiper>
    </div>
    <v-title title='项目展示' @clickMore='moreItems'></v-title>
    <div v-for='(i, index) in items' :key='index' @click='goToDetail(i)'>
      <item-show :itemData="i"></item-show>
    </div>
    
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
import index from '@/http/mock.js' //模拟数据

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
      datas: '',
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
      mockapi.show.show_getBanner_get({
      }).then(response => {
        var data = response.data.data
        this.datas = data
      }).catch(error => {
        console.log(error)
      })
    },
    getItemList() {
      mockapi.show.getItemList_get({

      }).then(response => {
        var data = response.data.data
        this.items = data.itemList
        console.log(this.items)
      }).catch(error => {
        console.log(error)
      })
    },
    // 查看详情
    goToDetail(i) {
      console.log(11111)
      this.$store.commit('SAVE_CURRENT_ITEM', i)
      this.$router.push('/show/itemnav')
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
</style>
