<template>
  <div>
    <mt-header title="户型详情">
      <router-link to="/show/houseList" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
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
    <div class="item-wrap">
      <h2 class='item-title'>户型一</h2>
      <p>户型一使用面积XX平方米，为套房设计。户型一使用面积XX平方米，为套房设计。户型一使用面积XX平方米，为套房设计。....</p>
      <div class="line"></div>
      <h2 class='title'>其卧室为地中海风格设计，参考户型图如下：</h2>
      <img :src="this.$imgHost + '414x200/999'" alt="">
      <h2 class='title'>其客厅为美式田园风格设计，参考户型图如下：</h2>
      <img :src="this.$imgHost + '414x200/999'" alt="">
      <img :src="this.$imgHost + '414x200/999'" alt="">
      <img :src="this.$imgHost + '414x200/999'" alt="">
    </div>
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
  export default{
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
      goToItemDetail(item) {
        this.$router.push('/show/itemNav')
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
<style lang=less>
.index {
    width: 100%;
    height: 100%;
    background-color: #EBEBEB;
}
.item{
  box-shadow: 0px 1px 3px #eee;
  margin: 10px;
  height: 80px;
}
.item-wrap{
  padding: 10px;
  .title{
    line-height: 40px;
  }
  img{
    width: 100%;
    margin-bottom: 5px;
  }
  .banner{
    width: 100%;
    overflow: hidden;
  }
  .item-title{
    margin-top: 15px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #333;
  }
  p{
    padding: 5px;
  }
}
</style>
