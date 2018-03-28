<template>
  <div class='circle-nav'>
    <div class="goback" @click='goBack'>
      <i class='iconfont icon-fanhui'></i>
    </div>
    <div class="header-img">
      <img :src="$imgHost + '400x200'" alt="">
    </div>
    <div class="intro-wrap">
      <p>产品简介产品简介产品简介产品简介</p>
      <router-link to='/shop/detail'>购买详情</router-link>
    </div>
    <router-link v-for='(i, index) in navList' :key='index' class='circle' :class='"nav0" + i.typeId' :to="{ name: i.title}">{{i.title}}</router-link>
    <!-- <router-link class='circle nav02' to='/show/houseList'>户型鉴赏</router-link>
    <router-link class='circle nav03' to='/show/brandList'>品牌故事</router-link>
    <router-link class='circle nav04' to='/show/news'>项目资讯</router-link>
    <router-link class='circle nav05' to='/show/history'>发展历程</router-link>
    <router-link class='circle nav06' to='/show/autoNav'>一键导航</router-link> -->
  </div>
</template>
<script>
  import * as mockapi from '@/../mockapi'
  export default{
    data() {
      return {
        navList: []
      }
    },
    computed: {
      currentItem() {
        return this.$store.state.show.currentItem
      }
    },
    mounted() {
      this.getItemNav()
    },
    methods: {
      getItemNav() {
        console.log(1111111111111)
        console.log(this.currentItem)
        console.log(this.$store.state.show.currentItem)
        mockapi.show.getItemNav_get({
          params: {
            id: this.currentItem
          }
        }).then(response => {
          var data = response.data.data
          this.navList = data.navList
          console.log(this.navList)
        }).catch(error => {
          console.log(error)
        })
      },
      goBack() {
        this.$router.go('-1')
      },
      generateRoute(id) {
        var route = ''
        switch(id)
        {
        case 1: 
          route = '/show/itemDetail'
          break
        case 2: 
          route = '/show/houseList'
          break
        case 3: 
          route = '/show/brandList'
          break
        case 4: 
          route = '/show/news'
          break
        case 5: 
          route = '/show/history'
          break
        case 6: 
          route = '/show/autoNav'
          break 
        default:
        
        }
        
      }
    }
  }
</script>
<style lang=less>
  .goback{
    position: fixed;
    z-index: 1000;
    width: 20px;
    height: 20px;
    border-radius: 14px;
    background: rgba(0,0,0,.3);
    left: 10px;
    top: 10px;
    padding: 2px;
    i{
      font-size: 14px;
      color: #fff;
      position: relative;
      left: 2px;
    }
  }
  .circle-nav{
    background: url('https://dummyimage.com/640x980&text=背景图');
    background-size: 100% 100%;
    position: relative;
    height: 100%;
    .header-img{
      height: 30vh;
      background: #eee;
    }
    .intro-wrap{
      height: 30vh;
    }
    .circle{
      background: #fff;
      display: inline-block;
      text-align: center;
      line-height: 100px;
      height: 20vh;
      width: 100px;
      width: 33.33333%;
      border: 1px solid #eee;
      box-sizing: border-box;
    }
    /* .nav01{
      position: absolute;
      left: 15%;
      top: 10%;
    }
    .nav02{
      position: absolute;
      left: 43%;
      top: 20%;
    }
    .nav03{
      position: absolute;
      left: 60%;
      top: 36%;
    }
    .nav04{
      position: absolute;
      left: 60%;
      top: 54%;
    }
    .nav05{
      position: absolute;
      left: 43%;
      top: 70%;
    }
    .nav06{
      position: absolute;
      left: 15%;
      top: 80%;
    } */
  }
  
</style>
