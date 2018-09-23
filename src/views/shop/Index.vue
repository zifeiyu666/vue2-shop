<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index" v-loading="loading">
    <!-- <v-header></v-header> -->
    <!-- 隐藏搜索按钮 -->
    <!-- <mt-button icon="search" @click='goToSearch'></mt-button> -->
    <v-swiper :swiperData="bannerList"></v-swiper>
    <!-- <v-service></v-service> -->
    <!-- <div class="search clearfix">
      <div class="avatar">
        <img :src="avatar" alt="">
      </div>
      <div class="part part01" @click='goToSearch'>
        <h2 class="title"> </h2>
        <span>全部商品</span>
      </div>
      <div class="part part02" @click='goToCollection'>
        <h2 class="title"> </h2>
        <span>我的收藏</span>
      </div>
      <div class="part part03" @click='goToMyOrder'>
        <h2 class="title"> </h2>
        <span>我的订单</span>
      </div>
    </div> -->
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
    

    <v-section4 v-if='section4.length > 0' :section4="section4" :banner="banner4"></v-section4>
    <v-section2 v-if='section2.length > 0' :section2="section2" :banner="banner2"></v-section2>
    <!-- <v-section3 :section3="section3"></v-section3> -->
    
    <v-section1 v-if='section1.length > 0' :section1="section1" :banner='banner1'></v-section1>
    <v-baseline></v-baseline>
    <v-footer></v-footer>
  </div>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import Header from '@/components/index/header.vue'
import Swiper from '@/components/shop/swiper.vue'
import Service from '@/components/index/service.vue'
import Section1 from '@/components/index/section1.vue'
import Section2 from '@/components/index/section2.vue'
// import Section3 from '@/components/index/section3.vue'
import Section4 from '@/components/index/section4.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
export default {
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-service': Service,
    'v-section1': Section1,
    'v-section2': Section2,
    // 'v-section3': Section3,
    'v-section4': Section4,
    'v-baseline': Baseline,
    'v-footer': Footer
  },
  data() {
    return {
      active: 'tab-container1',
      bannerList: '',
      avatar: '',
      section1: '',
      section2: '',
      // section3: '',
      section4: '',
      banner1: '',
      banner2: '',
      // banner3: '',
      banner4: '',
      productTypeList: [], // 商品类别
      loading: true
    }
  },
  beforeCreate() {
  },
  mounted() {
    this.getProductType()
    this.getBanner()
    
    // this.getSection3()
    
    // this.getBanner1()
    // this.getBanner2()
    // this.getBanner4()
    if (this.$store.state.userInfo) {
      this.avatar = this.$store.state.userInfo.headimgurl
    }
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
        this.getSection2()
        this.getSection4()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    getBanner() {
      this.loading = true
      mockapi.shop.api_Shop_getShopBanner_get({
        params: {}
      }).then(res => {
        // this.loading = false
        var data = res.data.data
        console.log(data)
        this.bannerList = data
      }).catch(err => {
        // this.loading = false
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
    getSection2() {
      this.loading = true
      mockapi.shop.api_Shop_getTopProduct_get({
        params: {
          ProductType: this.productTypeList[1].EntryCode,
          ProjectType: '',
          top: 10
        }
      }).then(res => {
        this.loading = false
        var data = res.data.data
        console.log(data)
        this.section2 = data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // getSection3() {
    //   mockapi.shop.api_Shop_getTopProduct_get({
    //     params: {
    //       ProductType: 3,
    //       ProjectType: 1, // typecode
    //       top: 10
    //     }
    //   }).then(res => {
    //     var data = res.data.data
    //     console.log(data)
    //     this.section3 = data
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    getSection4() {
      this.loading = true
      mockapi.shop.api_Shop_getTopProduct_get({
        params: {
          ProductType: this.productTypeList[2].EntryCode,
          ProjectType: '',
          top: 10
        }
      }).then(res => {
        this.loading = false
        var data = res.data.data
        console.log(data)
        this.section4 = data
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
    getBanner2() {
      this.loading = true
      mockapi.shop.api_Shop_getADByCode_get({
        params: {
          typeCode: 'ADT'
        }
      }).then(res => {
        this.loading = false
        var data = res.data.data
        this.banner2 = data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    getBanner4() {
      this.loading = true
      mockapi.shop.api_Shop_getADByCode_get({
        params: {
          typeCode: 'ADF'
        }
      }).then(res => {
        this.loading = false
        var data = res.data.data
        this.banner4 = data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    goToSearch() {
      this.$router.push('/shop/all')
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
.sel-icon{
  cursor: pointer;
}
.index {
    width: 100%;
    padding-bottom: 14vw;
    position: relative;
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
  .icon{
    width: 50%;
    display: block;
    margin:0 25%;
  }
  .icon-title{
    color: @fontBlack;
    font-size: 12px;
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
