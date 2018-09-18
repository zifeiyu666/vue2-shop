<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index_wrap">
    <!-- <v-header></v-header> -->
    <!-- 隐藏搜索按钮 -->
    <mt-button icon="search" @click='goToSearch'></mt-button>
    <v-swiper :swiperData="bannerList"></v-swiper>

    <!-- 小分类 -->
    <el-row  class="search clearfix">
      <el-col :span='6' class='sel-icon' @click.native='goToSearch'>
        <img class='icon' src="../../assets/img/all.png" alt="">
        <span class='icon-title'>全部商品</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToCollection'>
        <img class='icon' src="../../assets/img/mycol.png" alt="">
        <span class='icon-title'>我的收藏</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToMyOrder'>
        <img class='icon' src="../../assets/img/myorder.png" alt="">
        <span class='icon-title'>我的订单</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToMyCar'>
        <img class='icon' src="../../assets/img/shopcar.png" alt="">
        <span class='icon-title'>购物车</span>
      </el-col>
    </el-row>

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
            <p style="color:rgb(199, 108, 28);"> {{k.intro}}</p>
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
    <v-baseline></v-baseline>
    <v-footer></v-footer>
  </div>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import Header from '@/components/index/header.vue'
import Swiper from '@/components/shop/swiper.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import NorMore from '@/components/nomore'
import {scrollTo} from '@/assets/utils'

export default {
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-baseline': Baseline,
    'v-footer': Footer,
    'v-nomore': NorMore
  },
  data() {
    return {
      bannerList: '',
      avatar: '',
      productTypeList: [], // 商品类别
      pageNo: 1,
      pageSize: 10,
      isLastPage: false,
      allList: [],
      loading: false
    }
  },
  beforeCreate() {
  },
  mounted() {
    if (this.$store.state.userInfo) {
      this.avatar = this.$store.state.userInfo.headimgurl
    }
    this.getBanner()
    this.getAllProductList()
  },
  methods: {
    scrollTo,
    gotoDetail(i) {
      console.log()
      this.$router.push({path: '/shop/detail', query: {pid: i.id}})
    },
    getBanner() {
      mockapi.shop.api_Shop_getShopBanner_get({
        params: {}
      }).then(res => {
        var data = res.data.data
        console.log(data)
        this.bannerList = data
      }).catch(err => {
        console.log(err)
      })
    },
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
    goToSearch() {
      this.$router.push('/shop/search')
    },
    goToMyOrder() {
      this.$router.push('/shop/myorder')
    },
    goToCollection() {
      this.$router.push('/shop/collection')
    },
    goToMyCar() {
      this.$router.push('/shop/car')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/utils.less';
@import '../../assets/fz.less';
.sel-icon{
  cursor: pointer;
}
.index_wrap {
  padding-bottom: 60px;
  
    width: 100%;
    .mint-button{
      position: absolute;
      right: 15px;
      top: 8px;
      z-index: 10;
      background: none;
      color: #fff;
      background: rgba(0,0,0,.2);
      padding: 0px 10px;
      height: 36px;
      width: 36px;
    }
    .mint-button::after{
      opacity: 0.6;
    }
}
.mint-searchbar{
  padding: 6px 8px;
  // margin: 5px;
}
.search{
  background: #fff;
  position: relative;
  box-shadow: 0px 1px 1px #eee;
  padding-bottom: 5px;
  padding-top: 5px;
  text-align: center;
  padding: 4% 2%;
  box-shadow: 0px 1px 4px #ccc;
  .icon{
    width: 50%;
    display: block;
    margin:0 25%;
  }
  .icon-title{
    color: @fontGray;
    font-size: 14px;
  }
  .avatar{
    position: absolute;
    float: right;
    width: 25%;
    box-sizing: border-box;
    bottom: -2px;
    padding: 14px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 0px 1px 2px #999;
    }
  }
  .part{
    float: right;
    .title{
      text-align: center;
      font-size: 18px;
    }
    span{
      font-size: 14px;
      line-height: 40px;
    }
    border-right: 1px solid #eee;
    // padding: 0 20px;
    text-align: center;
    width: 25%;
    box-sizing: border-box;
  }
  .part01{
    border: none;
  }
}
</style>
