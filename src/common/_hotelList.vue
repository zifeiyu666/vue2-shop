<template>
  <div class="product_list_wrap">
      <h3 class='title' v-if='!hideHead'>
        全部商品
        <span class="more" @click='goToSearch("全部商品")'>查看更多></span>
      </h3>
      <ul 
        class="section1-list"
        v-if='allList.length != 0'
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isLoading"
        infinite-scroll-distance="0"
        >
        <li v-for="(k,i) in allList" @click='gotoDetail(k)' :key="i">
          <count-down class='count_down' v-if='k.limitTime' v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :startTime="new Date().getTime()" :endTime="new Date(k.limitTime).getTime()" :tipText="'距离开始文字1'" :tipTextEnd="'距离结束文字1'" :endText="'结束自定义文字2'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
          <router-link :to="{path:'/shop/detail', query:{pid: k.id}}" :key="k.id">
            <img v-lazy="k.imgurl[0]" alt="">
            <p>{{k.intro}}</p>
          </router-link>
          <h3>{{k.title}}</h3>
          <span>￥{{k.price}}</span>
          <span class='fx' v-if='k.gwfx && k.gwfx!=0'>
            <i>返</i>￥{{k.gwfx}}
          </span>
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
.section1-list {
      width: 100%;
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: left;
          -ms-flex-pack: left;
              justify-content: left;
      -ms-flex-wrap: wrap;
          flex-wrap: wrap;
      overflow: hidden;
      li {
        width: 50%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding:0 2vw;
        .count_down{
          z-index: 10;
          background: rgba(0, 0, 0, 0.4);
          display: block;
          width: 100%;
          position: relative;
          top: 26px;
          height: 26px;
          border-radius: 4px;
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
        >a {
          display: block;
          width: 100%;
          position: relative;
          img {
            display: block;
            width: 100%;
            // border-top-left-radius: 6px; 
            // border-top-right-radius: 6px; 
            border-radius: 4px;
          }
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: rgba(0,0,0,.5);
            color: #fff;
            -webkit-box-sizing: border-box;
                    box-sizing: border-box;
            padding:1.2vw 2vw;
          }
        }

        >h3{
          font-size: 14px;
          padding-top: 6px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          height: 40px;
        }
        >span {
          font-size: 18px;
          font-weight: bold;
          display: inline-block;
          padding-bottom: 6px;
          color: @fontRed;
          font-size: 16px;
        }
      }
    }

</style>
