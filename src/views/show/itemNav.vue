<template>
  <div class='circle-nav'>
    <mt-header title="快捷导航">
      <router-link to="/show/item/list" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <router-link class='circle nav01' to='/show/itemDetail'>项目简介</router-link>
    <router-link class='circle nav02' to='/show/houseList'>户型鉴赏</router-link>
    <router-link class='circle nav03' to='/show/brandList'>品牌故事</router-link>
    <router-link class='circle nav04' to='/show/news'>项目资讯</router-link>
    <router-link class='circle nav05' to='/show/history'>发展历程</router-link>
    <router-link class='circle nav06' to='/show/autoNav'>一键导航</router-link>
  </div>
</template>
<script>

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
