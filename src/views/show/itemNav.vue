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
      <router-link :to="{path:'/shop/detail', query: {id: currentId}}">购买详情</router-link>
    </div>
    <router-link v-for='(i, index) in navList' :key='index' class='circle' :class='"nav0" + i.id' :to="{ path: generateRoute(index), query: {id: currentId}}">
      <i class='iconfont' :class="generateIcon(index)"></i>
      <span>{{i.name}}</span>
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
  import qs from 'qs'
  export default{
    data() {
      return {
        navList: [],
        currentId: undefined
      }
    },
    mounted() {
      this.currentId = this.$route.query.id
      this.getItemNav()
    },
    methods: {
      getItemNav() {
        console.log(1111111111111)
        console.log(this.currentId)
        mockapi.show.api_Show_getItemNav_post({
          data: qs.stringify({
            itemId: this.currentId
          })
        }).then(response => {
          var data = response.data.data
          this.navList = data
          console.log(this.navList)
        }).catch(error => {
          console.log(error)
        })
      },
      generateIcon(index) {
        var icon = undefined
        switch(index)
        {
        case 0: 
          icon = 'icon-zixun1'
          break
        case 1: 
          icon = 'icon-haofangtuo400iconfonthuxing'
          break
        case 2: 
          icon = 'icon-pinpaiyingxiangli'
          break
        case 3: 
          icon = 'icon-zixun2'
          break
        case 4: 
          icon = 'icon-lishicaozuoliebiao'
          break
        case 5: 
          icon = 'icon-compass'
          break 
        default:
        
        }
        return icon
      },
      goBack() {
        this.$router.push('/show')
      },
      generateRoute(id) {
        var route = ''
        switch(id)
        {
        case 0: 
          route = '/show/itemDetail'
          break
        case 1: 
          route = '/show/houseList'
          break
        case 2: 
          route = '/show/brandList'
          break
        case 3: 
          route = '/show/news'
          break
        case 4: 
          route = '/show/history'
          break
        case 5: 
          route = '/show/autoNav'
          break 
        default:
        
        }
        return route
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
      background: rgb(250, 251, 252);
      display: inline-block;
      text-align: center;
      line-height: 100px; 
      height: 20vh;
      width: 100px;
      width: 33.33333%;
      /* border: 1px solid #eee; */
      outline: 1px solid #999;
      box-sizing: border-box;
      i {
        font-size: 28px;
        display: block;
        height: 0px;
        position: relative;
        border: none;
        outline: none;
        top: 0px;
      }
      span{
        position: relative;
        top: 30px;
      }
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
