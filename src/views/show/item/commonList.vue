<template>
  <div>
    <mt-header :title="title">
      <span @click='goBack()' slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div class="itemlist">
      
    </div>
    <ul
      v-if = 'houseList.length'
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="(item, index) in houseList" :key='index' @click='goToDetail(item)'>
        <div class="item-container">
          <img v-if='item.imgurl' :src="item.imgurl" alt="">
          <p class="title">{{item.title}}</p>
          <p style='color: #666;margin:0px  4px' v-if='item.newsAbstract'>{{item.newsAbstract}}</p>
          <p style='color: #999;margin:6px 4px' v-if='item.publishTime'>{{parseTime(item.publishTime)}}</p>
        </div>
      </li>
    </ul>
    <v-nomore v-else></v-nomore>

  </div>
  
</template>
<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import Baseline from '@/common/_baseline.vue'
import NoMore from '@/components/nomore.vue'
import {parseTime} from '@/util/data.js'
export default{
  components: {
    'v-nomore': NoMore,
    'v-baseline': Baseline
  },
  data() {
    return {
      houseList: [],
      query: {
        pageNo: 1,
        pageSize: 10,
        typeCode: this.$route.query.code
      },
      busy: false, // loadmore是否busy
      firstFlag: true,
      title: '',
      isLastPage: false
    }
  },
  mounted() {
    this.title = this.$route.query.name
    this.houseList = []
    this.getHouseList()
  },
  methods: {
    parseTime,
    getHouseList() {
      this.busy = true
      if (this.title == '企业新闻') {
        this.loading = true
        mockapi.show.api_Show_getWzNewsList_get({
          params: this.query
        }).then(response => {
          var data = response.data.data
          this.isLastPage = data.pager.isLastPage
          if (this.firstFlag) {
            this.houseList = data.list
            this.firstFlag = false
          } else {
            this.houseList = this.houseList.concat(data)
          }
          this.loading = false
          this.busy = false
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.loading = true
        mockapi.show.api_Show_getPicNewsList_get({
          params: this.query
        }).then(response => {
          var data = response.data.data
          this.isLastPage = data.pager.isLastPage
          if (this.firstFlag) {
            this.houseList = data.list
            this.firstFlag = false
          } else {
            this.houseList = this.houseList.concat(data)
          }
          this.loading = false
          this.busy = false
        }).catch(error => {
          console.log(error)
        })
      }
      
    },
    loadMore() {
      if (!this.busy && !this.firstFlag && !this.isLastPage) {
        console.log('loadmore')
        this.query.pageNo++
        this.getHouseList()
      }
      
    },
    goToDetail(item) {
      this.$router.push({path:'/show/commonDetail', query: {id: item.id, name: this.$route.query.name}})
    },
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>
<style lang=less scoped>
.item-container{
  box-shadow: 0px 1px 4px #ccc;
  margin: 10px;
  background: #fff;
  border-radius: 4px;
  padding: 4px;
  img{
    width: 100%;
    height: 60px;
  }
  .title{
    padding: 0 4px;
    line-height: 30px; 
    height: 30px;
  }
}
</style>
