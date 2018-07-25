<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <!-- <v-header></v-header> -->
    <mt-button icon="search" @click='goToSearch'></mt-button>
    <v-swiper :swiperData="bannerList"></v-swiper>
    <!-- <v-service></v-service> -->
    <div class="search clearfix">
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
    </div>
    

    <v-section4 :section4="section4" :banner="banner4"></v-section4>
    <v-section2 :section2="section2" :banner="banner2"></v-section2>
    <!-- <v-section3 :section3="section3"></v-section3> -->
    
    <v-section1 :section1="section1" :banner='banner1'></v-section1>
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
      loading:true,
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
      productTypeList: [] // 商品类别
    }
  },
  beforeCreate() {
  },
  mounted() {
    this.getProductType()
    this.getBanner()
    
    // this.getSection3()
    
    this.getBanner1()
    this.getBanner2()
    this.getBanner4()
    this.avatar = this.$store.state.userInfo.headimgurl
  },
  methods: {
    getProductType() {
      mockapi.shop.api_Shop_getProductType_get({
        params: {}
      }).then(res => {
        var data = res.data.data
        console.log(data)
        this.productTypeList = data
        // 请求数据
        this.getSection1()
        this.getSection2()
        this.getSection4()
      }).catch(err => {
        console.log(err)
      })
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
    getSection1() {
      mockapi.shop.api_Shop_getTopProduct_get({
        params: {
          ProductType: this.productTypeList[0].EntryCode,
          ProjectType: '',
          top: 10
        }
      }).then(res => {
        var data = res.data.data
        console.log(data)
        this.section1 = data
      }).catch(err => {
        console.log(err)
      })
    },
    getSection2() {
      mockapi.shop.api_Shop_getTopProduct_get({
        params: {
          ProductType: this.productTypeList[1].EntryCode,
          ProjectType: '',
          top: 10
        }
      }).then(res => {
        var data = res.data.data
        console.log(data)
        this.section2 = data
      }).catch(err => {
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
      mockapi.shop.api_Shop_getTopProduct_get({
        params: {
          ProductType: this.productTypeList[2].EntryCode,
          ProjectType: '',
          top: 10
        }
      }).then(res => {
        var data = res.data.data
        console.log(data)
        this.section4 = data
      }).catch(err => {
        console.log(err)
      })
    },
    getBanner1() {
      mockapi.shop.api_Shop_getADByCode_get({
        params: {
          typeCode: 'ADO'
        }
      }).then(res => {
        var data = res.data.data
        this.banner1 = data
      }).catch(err => {
        console.log(err)
      })
    },
    getBanner2() {
      mockapi.shop.api_Shop_getADByCode_get({
        params: {
          typeCode: 'ADT'
        }
      }).then(res => {
        var data = res.data.data
        this.banner2 = data
      }).catch(err => {
        console.log(err)
      })
    },
    getBanner4() {
      mockapi.shop.api_Shop_getADByCode_get({
        params: {
          typeCode: 'ADF'
        }
      }).then(res => {
        var data = res.data.data
        this.banner4 = data
      }).catch(err => {
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
    }
  }
}
</script>

<style lang="less" scoped>

.index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF !important;
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
