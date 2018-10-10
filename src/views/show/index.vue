<template lang="html">
  <div class="index">
    <div class='swiper-container'>
      <v-swiper :swiperData="bannerList"></v-swiper>
    </div>
    <div class="btn-wrap clearfix" style='margin-top: 1vw'>
      <span class='my-btn' @click='goTo(1)' size='small' type='danger'></span>
      <span class='my-btn' @click='goTo(2)' size='small' type='danger'></span>
      <span class='my-btn' @click='goTo(3)' size='small' type='danger'></span>
      <span class='my-btn' @click='goTo(4)' size='small' type='danger'></span>
    </div>
    
    <!-- <v-title title='项目展示' @clickMore='moreItems'></v-title> -->
    
    <!-- <div v-for='(i, index) in items' :key='index' @click='goToDetail(i)'>
      <item-show :itemData="i"></item-show>
    </div> -->
    <div class="nothing"></div>
    <!-- <v-title title='新闻资讯' @clickMore='moreNews'></v-title>
    <news-show></news-show> 
    <news-show></news-show>
    <news-show></news-show> -->
    <!-- <v-footer></v-footer> -->
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
    // this.getItemList()
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
    // goToDetail(i) {
    //   console.log(11111)
    //   this.$router.push({path: '/show/itemnav', query:{id: i.id}})
    // },
    // 项目简介
    goTo(index) {
      if (index == 1) {
        this.$router.push({path: '/show/itemDetail', query: {code: 'JTJS', name: ''}})
      } else if (index == 2) {
        this.$router.push({path: '/show/commonList', query: {code: 'QYXW', name: '企业新闻'}})
      } else if (index == 3) {
        this.$router.push({path: '/show/itemDetail', query: {code: 'LXBK', name: '旅游板块'}})
      } else {
        this.$router.push({path: '/show/item/list'})
      }
      
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
    // height: 100%;
    // background-color: #EBEBEB;
    .my-btn{
      font-size: 5vw;
      float: left; 
      width: 48vw;
      margin: 1.25vw;
      padding-top: 48vw;
      height: 0;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-bottom: 0px;
    }
    .my-btn:nth-of-type(1) {
      background-image: url('../../assets/img/show_btn01.jpeg');
      margin-right: 0;
    }
    .my-btn:nth-of-type(2) {
      background-image: url('../../assets/img/show_btn02.jpeg');
      /* margin-right: 0; */
    }
    .my-btn:nth-of-type(3) {
      background-image: url('../../assets/img/show_btn03.jpeg');
      margin-right: 0;
    }
    .my-btn:nth-of-type(4) {
      background-image: url('../../assets/img/show_btn04.jpeg');
      /* margin-right: 0; */
    }
}
.nothing {
  height: 60px;
}
</style>
