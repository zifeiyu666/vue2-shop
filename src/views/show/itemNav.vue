<template>
  <div class='circle-nav'>
    <mt-header title="快捷导航">
      <router-link to="/show/item/list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <router-link v-for='(i, index) in navList' :key='index' class='circle' :class='"nav0" + i.typeId' :to="{name: i.title}">{{i.title}}</router-link>
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
  .circle-nav{
    background: url('https://dummyimage.com/640x980&text=背景图');
    background-size: 100% 100%;
    position: relative;
    height: 100%;
    .circle{
      background: #fff;
      display: inline-block;
      text-align: center;
      line-height: 100px;
      height: 100px;
      width: 100px;
      height: 100px;
      box-shadow: 0px 1px 2px #eee;
      border-radius: 50px;
    }
    .nav01{
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
    }
  }
  
</style>
