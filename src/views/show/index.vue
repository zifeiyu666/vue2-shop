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
      <v-swiper :swiperData="datas.swiper"></v-swiper>
    </div>
    <v-title title='项目展示' @clickMore='moreItems'></v-title>
    <item-show></item-show>
    <item-show></item-show>
    <item-show></item-show>
    <v-title title='新闻资讯' @clickMore='moreNews'></v-title>
    <news-show></news-show>
    <news-show></news-show>
    <news-show></news-show>
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
      loading:true
    }
  },
  beforeCreate() {
    mockapi.show.test_get({}).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
    this.$api({
      method: 'post',
      url: '/index'
    }).then((response) => {
      this.datas = response.data;
    }).catch(function(error) {
      alert(error)
    })
  },
  methods: {
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
