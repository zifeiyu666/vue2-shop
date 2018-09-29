<template>
  <div class="product_list_wrap">
      <h3 class='title' v-if='!hideHead' style='margin-bottom: 10px;'>
        全部商品
        <span class="more" @click='goToSearch("全部商品")'>查看更多></span>
      </h3>
      <ul 
        class="something"
        v-if='allList.length != 0'
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isLoading"
        infinite-scroll-distance="0"
        >
        <li v-for="(k,i) in allList" @click='gotoDetail(k)' :key="i">
          <count-down class='count_down' v-if='k.limitTime' v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :startTime="new Date().getTime()" :endTime="new Date(k.limitTime).getTime()" :tipText="'距离开始文字1'" :tipTextEnd="'距离结束文字1'" :endText="'结束自定义文字2'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
          <!-- <router-link class='img_wrap' :to="{path:'/shop/detail', query:{pid: k.id}}" :key="k.id">
            <img v-lazy="k.imgurl[0]" alt="">
            <p>{{k.intro}}</p>
          </router-link> -->
          <div class="something-middle">
            <img v-lazy="k.imgurl[0]" alt="">
          </div>
          <div class="something-right">
            <p>{{k.title}}</p>
            <p>{{k.intro}}</p>
            <p>
              <span>￥{{k.price}}</span>
              <span class='fx' v-if='k.gwfx && k.gwfx!=0'>
                <i>返</i>￥{{k.gwfx}}
              </span>
            </p>
          </div>
          <!-- <h3>{{k.title}}</h3>
          <span>￥{{k.price}}</span>
          <span class='fx' v-if='k.gwfx && k.gwfx!=0'>
            <i>返</i>￥{{k.gwfx}}
          </span> -->
        </li>
      </ul>
      <div v-else>
        <v-nomore></v-nomore>
      </div>
      <v-baseline v-if='isLastPage'></v-baseline>
    </div>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import NorMore from '@/components/nomore'
import Baseline from '@/common/_baseline.vue'
import CountDown from 'vue2-countdown'

export default {
  components: {
    'v-nomore': NorMore,
    'v-baseline': Baseline,
    CountDown
  },
  props: {
    hideHead: {
      required: false
    },
    searchForm: {
      required: false,
      default() {
        return {
          ProductType: '',
          ProjectType: '',
          Title: '',
          SuitableUser: '',
          DestinationType: '',
          KeyWord: '',
          City: '',
          Classification: '',
          IsMain: '',
          IsLimitTime: ''
        }
      }
    },
    fxtype: {
      required: false
    }

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
    console.log('类型')
    console.log(this.fxtype)
  },
  methods: {
    countDownS_cb: function (x) {
      console.log(x)
    },
    countDownE_cb: function (x) {
      console.log(x)
    },
    goToSearch(title) {
      this.$router.push({path: '/shop/search', query: {title: title}})
    },
    // 所有商品加载更多
    getAllProductList(isSearch) {
      if (isSearch) {
        this.pageNo = 1
        this.allList = []
      }
      this.isLoading = true
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_Shop_getProductList_get({
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          ...this.searchForm
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
      this.$router.push({path: '/shop/detail', query: {pid: i.id, type: this.fxtype}})
    },
  }
}

</script>

<style lang='less'>
@import '../assets/utils.less';
.product_list_wrap{
  .count_down{
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  display: block;

  position: absolute;
  top: 30px;
  right: 10px;
  height: 26px;
  border-radius: 4px;
  margin-top: -26px;
  p{
    float: right;
    margin: 4px 2px;
  }
  span:nth-of-type(1){
    background: rgba(0,0,0,0);
    padding: 0;
    font-size: 10px!important;
    >span{
      padding: 0 2px;
      background: @fontRed;
      color: #fff;
      line-height: 18px;
      height: 18px;
      display: inline-block;
      border-radius: 4px;
      font-size: 10px!important;
    }
  }
  i{
    color: #fff;
    font-size: 8px!important;
  }
  span{
    padding: 0 2px;
    background: @fontRed;
    color: #fff;
    line-height: 18px;
    height: 18px;
    display: inline-block;
    border-radius: 4px;
    font-size: 10px!important;
  }
}
}

</style>
