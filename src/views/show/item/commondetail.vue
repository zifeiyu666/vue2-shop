<template>
  <div>
    <mt-header :title="title">
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
    <div v-if='content' class="item-wrap">
      <h2 class='item-title'>{{content.NewsTitle}}</h2>
      <p>{{content.NewsAbstract}}</p>
      <div v-html="content.NewsContent"></div>
    </div>
    <div v-else class='nomore'>暂无更多内容</div>
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
        content: '',
        loading:true,
        title: ''
      }
    },
    mixins: [goBack],
    mounted() {
      this.title = this.$route.query.name
      this.getNewsDetail()
    },
    methods: {
      getNewsDetail() {
        mockapi.show.api_Show_getNews_get({
          params: {
            id: this.$route.query.id
          }
        }).then(response => {
          var data = response.data.data
          this.content = data
          console.log(this.content)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang=less scoped>
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
