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
    <router-link class='circle nav04' to='/show/autoNav'>一键导航</router-link>
  </div>
</template>
<script>

</script>
<style lang=less>
  .circle-nav{
    position: relative;
    height: 100%;
    .circle{
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
      left: 10%;
      top: 20%;
    }
    .nav02{
      position: absolute;
      left: 10%;
      top: 50%;
    }
    .nav03{
      position: absolute;
      left: 60%;
      top: 40%;
    }
    .nav04{
      position: absolute;
      left: 60%;
      top: 70%;
    }
  }
  
</style>
