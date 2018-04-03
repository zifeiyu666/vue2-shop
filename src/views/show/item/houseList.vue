<template>
  <div>
    <mt-header title="户型鉴赏">
      <span @click='goBack()' slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div class="itemlist">
      
    </div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="(item, index) in houseList" :key='index' @click='goToHouseDetail(item)'>
        <div class="item-container">
          <img :src="item.imgurl" alt="">
          <p class="title">{{item.title}}</p>
        </div>
      </li>
    </ul>

  </div>
  
</template>
<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
  export default{
    data() {
      return {
        houseList: []
      }
    },
    mounted() {
      this.getHouseList()
    },
    methods: {
      getHouseList() {
        mockapi.show.api_Show_getPicNewsList_post({
          params: {
          }
        }).then(response => {
          var data = response.data.data
          this.houseList = this.houseList.concat(data)
          console.log(this.houseList)
          this.loading = false
        }).catch(error => {
          console.log(error)
        })
      },
      loadMore() {
        this.loading = true;
        // setTimeout(() => {
        //   let last = this.list[this.list.length - 1];
        //   for (let i = 1; i <= 10; i++) {
        //     this.list.push(last + i);
        //   }
        //   this.loading = false;
        // }, 2500);
        this.getHouseList()
      },
      goToHouseDetail(item) {
        this.$router.push({path:'/show/houseDetail', query: {id: this.$route.query.id}})
      },
      goBack(){
        this.$router.push()
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
