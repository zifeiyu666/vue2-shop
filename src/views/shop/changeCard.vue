<template lang="html">
  
  <div class="index_wrap changeCard">
    <v-header>
      <h1 slot="title">预定酒店</h1>
    </v-header>
    <v-swiper :swiperData="bannerList"></v-swiper>
    <div class="search_wrap">
      <HotelDatePicker 
        style='z-index: 1000' 
        :i18n="ptBr" 
        @checkInChanged='getStartTime'
        @checkOutChanged='getEndTime'>
      </HotelDatePicker>
      <mt-button size='large' class='search_btn' @click='searchHotel'>开始搜索</mt-button>
    </div>
    <v-list ref='list' :startTime='startTime' :endTime='endTime'></v-list>
    <!-- 返回顶部 -->
    <v-backtotop bottom="60px" right="10px">
      <i class='btn-to-top iconfont icon-fanhuidingbu'></i>
    </v-backtotop>

    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
import Swiper from '@/components/shop/swiper.vue'
import Footer from '@/common/_footer.vue'
import BackToTop from 'vue-backtotop'
import HotelDatePicker from 'vue-hotel-datepicker'
import HotelList from '@/common/_hotelList.vue'
import dayjs from 'dayjs'

export default {
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-footer': Footer,
    'v-backtotop': BackToTop,
    HotelDatePicker,
    'v-list': HotelList
  },
  data() {
    return {
      bannerList: '',
      ptBr: {
        night: 'Noite',
        nights: 'Noites',
        'day-names': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        'check-in': '入住时间',
        'check-out': '离店时间',
        'month-names': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      },
      startTime: '',
      endTime: ''
    }
  },
  mounted() {
    this.getBanner()
  },
  methods: {
    dayjs,
    getStartTime(time) {
      this.startTime = dayjs(time).format('YYYY-MM-DD')
    },
    getEndTime(time) {
      this.endTime = dayjs(time).format('YYYY-MM-DD')
    },
    getBanner() {
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_Shop_getShopBanner_get({
        params: {}
      }).then(res => {
        this.$store.commit('SET_LOADING', false)
        var data = res.data.data
        console.log(data)
        this.bannerList = data
      }).catch(err => {
        this.$store.commit('SET_LOADING', false)
        console.log(err)
      })
    },
    searchHotel() {
      this.$refs.list.getList()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/utils.less';
.changeCard{
  .search_wrap{
    background: #fff;
    .search_btn{
      width: 100%;
      background: @fontRed;
      color: #fff;
    }
  }
}
</style>
