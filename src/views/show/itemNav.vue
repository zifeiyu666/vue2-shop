<template>
  <div class='circle-nav'>
    <div class="goback" @click='goBack'>
      <i class='iconfont icon-fanhui'></i>
    </div>
    <div class="header-img">
      <img v-lazy="banner" alt="banner图">
    </div>
    <div class="intro-wrap">
      <p class='dec'>{{intro}}</p>
      <!-- <router-link :to="{path:'/shop/detail', query: {id: currentId}}">购买详情</router-link> -->
    </div>
    <router-link v-for='(i, index) in navList' :key='index' class='circle' :class='"nav0" + i.id' :to="{ path: generateRoute(i.name), query: {code: i.code, id: currentId, name: i.name}}">
      <i class='iconfont' :class="generateIcon(i.name)"></i>
      <span>{{i.name}}</span>
    </router-link>
  </div>
</template>
<script>
  import * as mockapi from '@/../mockapi'
  import qs from 'qs'
  export default{
    data() {
      return {
        navList: [],
        banner: '',
        intro: '',
        currentId: undefined
      }
    },
    mounted() {
      this.currentId = this.$route.query.id
      this.getItemNav()
    },
    methods: {
      getItemNav() {
        this.$store.commit('SET_LOADING', true)
        mockapi.show.api_Show_getItemNav_get({
          params: {
            itemId: this.currentId
          }
        }).then(response => {
          this.$store.commit('SET_LOADING', false)
          var data = response.data.data
          this.navList = data.list.concat({name: '一键导航'})
          this.banner = data.imgurl
          this.intro = data.itemintro
          console.log(this.navList)
        }).catch(error => {
          this.$store.commit('SET_LOADING', false)
          console.log(error)
        })
      },
      generateIcon(name) {
        var icon = undefined
        switch(name)
        {
        case '项目简介': 
          icon = 'icon-zixun1'
          break
        case '户型鉴赏': 
          icon = 'icon-haofangtuo400iconfonthuxing'
          break
        case '品牌故事': 
          icon = 'icon-pinpaiyingxiangli'
          break
        case '项目资讯': 
          icon = 'icon-zixun2'
          break
        case '发展历程': 
          icon = 'icon-lishicaozuoliebiao'
          break
        case '一键导航': 
          icon = 'icon-compass'
          break 
        default:
        
        }
        return icon
      },
      goBack() {
        this.$router.push('/show')
      },
      generateRoute(name) {
        var route = ''
        switch(name)
        {
        case '项目简介': 
          route = '/show/itemDetail'
          break
        case '户型鉴赏': 
          route = '/show/commonList'
          break
        case '品牌故事': 
          route = '/show/commonList'
          break
        case '项目资讯': 
          route = '/show/commonList'
          break
        case '发展历程': 
          route = '/show/history'
          break
        case '一键导航': 
          route = '/show/autoNav'
          break 
        default:
        
        }
        return route
      }
    }
  }
</script>
<style lang=less scoped>
.intro-wrap{
  background: #fff;
}
  .dec{
    position:relative;
    line-height:1.4em;
    /* 3 times the line-height to show 3 lines */
    height:7em;
    overflow:hidden;
    background: #fff;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
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
      margin-top: 2vh;
      height: 20vh;
      margin-bottom: 2vh;
      padding: 3vw;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      box-shadow: 1px 1px 3px #ccc;
      p{
        font-size: 14px;
        /* width: 100%; */
        /* height: 100%; */
        overflow: hidden;
        /* line-height: 20px; */
        /* padding-bottom: 20px; */
        /* box-sizing: border-box; */
      }
      a{
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        background: #ff4800;
        color: #fff;
        position: absolute;
        bottom: 10px;
        right: 20px;
        font-size: 14px;
        box-shadow: 1px 1px 3px #7a2300
      }
    }
    .circle{
      background: #FFAA00;
      display: inline-block;
      text-align: center;
      line-height: 100px; 
      height: 20vh;
      width: 100px;
      width: 33.33333%;
      /* border: 1px solid #eee; */
      outline: 4px solid #FFF;
      box-sizing: border-box;
      i {
        font-size: 28px;
        display: block;
        height: 0px;
        position: relative;
        border: none;
        outline: none;
        top: 18px;
        color: #FFF;
      }
      span{
        position: relative;
        top: 44px;
        COLOR: #FFF;
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
