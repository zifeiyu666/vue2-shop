<template>
  <div class='circle-nav'>
    <div class="goback" @click='goBack'>
      <i class='iconfont icon-fanhui'></i>
    </div>
    <div class="header-img">
      <img :src="$imgHost + '400x200&text=项目图片'" alt="">
    </div>
    <div class="intro-wrap">
      <p>产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介</p>
      <router-link to='/shop/detail'>购买详情</router-link>
    </div>
    <router-link v-for='(i, index) in navList' :key='index' class='circle' :class='"nav0" + i.typeId' :to="{ name: i.title}">
      <i class='iconfont' :class="generateIcon(index)"></i>
      {{i.title}}
    </router-link>
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
      generateIcon(index) {
        var 
        switch(index)
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
      },
      goBack() {
        this.$router.push('/show')
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
    position: relative;
    height: 100%;
    .header-img{
      width: 100%;
      height: 35vh;
      background: #eee;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .intro-wrap{
      height: 25vh;
      padding: 15px;
      box-sizing: border-box;
      position: relative;
      p{
        font-size: 16px;
      }
      a{
        border: 1px solid #eee;
        padding: 6px 10px;
        border-radius: 6px;
        background: #FFAA00;
        color: #fff;
        position: absolute;
        bottom: 10px;
        right: 20px;
      }
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
