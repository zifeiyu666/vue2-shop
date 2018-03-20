<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <!-- <v-header></v-header> -->
    <mt-button icon="search" @click='goToSearch'></mt-button>
    <v-swiper :swiperData="datas.swiper"></v-swiper>
    <!-- <v-service></v-service> -->
    <div class="search clearfix">
      <div class="avatar">
        <img src="http://dummyimage.com/70x70/eeeeee&text=avatar" alt="">
      </div>
      <div class="part part01">
        <h2 class="title">18</h2>
        <span>全部商品</span>
      </div>
      <div class="part part02">
        <h2 class="title">18</h2>
        <span>最新上架</span>
      </div>
      <div class="part part03">
        <h2 class="title">18</h2>
        <span>我的订单</span>
      </div>
    </div>
    

    <v-section1 :section1="datas.section1"></v-section1>
    <v-section2 :section2="datas.section2"></v-section2>
    <v-section3></v-section3>
    <v-section4 :section4="datas.section4"></v-section4>
    <v-baseline></v-baseline>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from '@/components/index/header.vue'
import Swiper from '@/components/index/swiper.vue'
import Service from '@/components/index/service.vue'
import Section1 from '@/components/index/section1.vue'
import Section2 from '@/components/index/section2.vue'
import Section3 from '@/components/index/section3.vue'
import Section4 from '@/components/index/section4.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import index from '@/http/mock.js' //模拟数据
export default {
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-service': Service,
    'v-section1': Section1,
    'v-section2': Section2,
    'v-section3': Section3,
    'v-section4': Section4,
    'v-baseline': Baseline,
    'v-footer': Footer
  },
  data() {
    return {
      datas: '',
      loading:true,
      active: 'tab-container1'
    }
  },
  beforeCreate() {

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
    goToSearch() {
      this.$router.push('/shop/all')
    }
  }
}
</script>

<style lang="less">
.index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
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
    position:absolute;
    width: 70px;
    height: 70px;
    left: 10px;
    top: -30px;
    border-radius: 4px;
    overflow: hidden;
    img{
      width: 100%;
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
    }
    border-right: 1px solid #eee;
    padding: 0 20px;
  }
  .part01{
    border: none;
  }
}
</style>
