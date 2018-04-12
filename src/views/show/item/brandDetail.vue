<template>
  <div>
    <mt-header title="品牌故事标题示例">
      <span @click='goBack()' slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
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
      <!-- <v-swiper :swiperData="datas.swiper"></v-swiper> -->
    </div>
    <div class="item-wrap">
      <!-- <h2 class='item-title'>户型一</h2> -->
      <p>　近日，山东省“仙境海岸”发展协调小组召开全体成员会议，根据省旅游局关于加快打造“仙境海岸”品牌的意见，鼓励各产业领域参与“仙境海岸”重点项目的建设。....</p>
      <img :src="this.$imgHost + '414x200/999'" alt="">
      <div class="line"></div>
      <p>会议提出，山东省将青岛、烟台、威海、日照4市近两年新规划、新引进、新布局的重大旅游项目纳入该规划，并将借鉴世界滨海旅游发达国家的经验，把“仙境海岸”打造成世界级滨海度假旅游品牌。为此，该省将加快“仙境海岸”基础配套设施建设，以水陆空大交通和慢游海滨步道绿道为中心实现配套。</p>
      <img :src="this.$imgHost + '414x200/999'" alt="">
      <img :src="this.$imgHost + '414x200/999'" alt="">
      <img :src="this.$imgHost + '414x200/999'" alt="">
      <img :src="this.$imgHost + '414x200/999'" alt="">
    </div>
  </div>
  
</template>
<script>
  import Swiper from '@/components/index/swiper.vue'
  import * as mockapi from '@/../mockapi'
  import {goBack} from '@/mixin'  
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
    mixins: [goBack],
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
