<template>
  <div>
    <mt-header title="品牌故事">
      <span @click='goBack()' slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div v-if="brandList">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li v-for="(item, index) in brandList" :key='index' @click='goToBrandDetail(item)'>
          <div class="item-container">
            <img :src="item.imgurl" alt="">
            <p class="title">{{item.title}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p class='nomore'>暂无更多内容</p>
    </div>

  </div>
  
</template>
<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
  export default{
    data() {
      return {
        brandList: [],
        query: {
          pageNo: 1,
          pageSize: 10,
          typeCode: undefined
        },
        busy: false, // loadmore是否busy
        firstFlag: true
      }
    },
    mounted() {
      this.query.typeCode = this.$route.query.code
      console.log(this.query.typeCode)
      this.getBrandList()
    },
    methods: {
      getBrandList() {
        this.busy = true
        mockapi.show.api_Show_getPicNewsList_get({
          params: this.query
        }).then(response => {
          var data = response.data.data
          if (this.firstFlag) {
            this.brandList = data
            this.firstFlag = false
          } else {
            this.brandList = this.brandList.concat(data)
          }
          this.loading = false
          this.busy = false
        }).catch(error => {
          console.log(error)
        })
      },
      loadMore() {
        if (!this.busy && !this.firstFlag) {
          this.query.pageNo++
          this.getBrandList()
        }
      },
      goToBrandDetail(item) {
        this.$router.push({path:'/show/BrandDetail', query: {id: this.$route.query.id}})
      },
      goBack(){
        this.$router.push({path: '/show/itemNav', query: {id: this.$route.query.id}})
      }
    }
  }
</script>
<style lang=less scoped>
.item-container{
  box-shadow: 0px 1px 4px #ccc;
  margin: 10px;
  background: #fff;
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
