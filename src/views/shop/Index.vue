<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index_wrap">
    <!-- <v-header></v-header> -->
    <!-- 隐藏搜索按钮 -->
    <mt-button icon="search" @click='goToSearch'></mt-button>
    <v-swiper :swiperData="bannerList"></v-swiper>

    <!-- 小分类 -->
    <el-row  class="search clearfix">
      <el-col :span='6' class='sel-icon' @click.native='goToSearch("嗨周末")'>
        <img class='icon' src="../../assets/img/01.png" alt="">
        <span class='icon-title'>嗨周末</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToSearch("乐假日")'>
        <img class='icon' src="../../assets/img/02.png" alt="">
        <span class='icon-title'>乐假日</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToSearch("享度假")'>
        <img class='icon' src="../../assets/img/03.png" alt="">
        <span class='icon-title'>享度假</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToSearch("直通车")'>
        <img class='icon' src="../../assets/img/04.png" alt="">
        <span class='icon-title'>直通车</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToSearch("门票")'>
        <img class='icon' src="../../assets/img/05.png" alt="">
        <span class='icon-title'>门票</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToSearch("研学旅行")'>
        <img class='icon' src="../../assets/img/06.png" alt="">
        <span class='icon-title'>研学旅行</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToSearch("特产")'>
        <img class='icon' src="../../assets/img/07.png" alt="">
        <span class='icon-title'>特产</span>
      </el-col>
      <el-col :span='6' class='sel-icon' @click.native='goToSearch("更多")'>
        <img class='icon' src="../../assets/img/08.png" alt="">
        <span class='icon-title'>更多</span>
      </el-col>
    </el-row>

    <!-- 推荐商品 -->
    <v-section1 v-if='section1.length > 0' :section1="section1" :banner='banner1'></v-section1>

    <!-- 所有商品 -->
    <v-all></v-all>

    <v-baseline v-if='isLastPage'></v-baseline>

    <!-- 返回顶部 -->
    <v-backtotop bottom="60px" right="10px">
      <i class='btn-to-top iconfont icon-fanhuidingbu'></i>
    </v-backtotop>

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
import Section1 from '@/components/index/section1.vue'
import BackToTop from 'vue-backtotop'
import AllProduct from '@/common/_productList.vue'

export default {
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-baseline': Baseline,
    'v-footer': Footer,
    'v-section1': Section1,
    'v-backtotop': BackToTop,
    'v-all': AllProduct
  },
  data() {
    return {
      bannerList: '',
      avatar: '',
      productTypeList: [], // 商品类别
      pageNo: 1,
      pageSize: 10,
      isLastPage: false,
      loading: false,
      section1: '',
      banner1: '',
    }
  },
  mounted() {
    if (this.$store.state.userInfo) {
      this.avatar = this.$store.state.userInfo.headimgurl
    }
    
    this.getProductType()
    this.getBanner()
    this.getBanner1()
  },
  methods: {
    getProductType() {
      this.loading = true
      mockapi.shop.api_Shop_getProductType_get({
        params: {}
      }).then(res => {
        this.loading = false
        var data = res.data.data
        console.log(data)
        this.productTypeList = data
        // 请求数据
        this.getSection1()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    getSection1() {
      this.loading = true
      mockapi.shop.api_Shop_getTopProduct_get({
        params: {
          ProductType: this.productTypeList[0].EntryCode,
          ProjectType: '',
          top: 10
        }
      }).then(res => {
        this.loading = false
        var data = res.data.data
        console.log(data)
        this.section1 = data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    getBanner1() {
      this.loading = true
      mockapi.shop.api_Shop_getADByCode_get({
        params: {
          typeCode: 'ADO'
        }
      }).then(res => {
        this.loading = false
        var data = res.data.data
        this.banner1 = data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
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
    goToSearch(title) {
      this.$router.push({path: '/shop/search', query: {title: title}})
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
  margin-bottom: 6px;
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
    width: 60%;
    display: block;
    margin:4px 20%;
  }
  .icon-title{
    color: @fontBlack;
    font-size: 12px;
    margin-top: 2px;
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
