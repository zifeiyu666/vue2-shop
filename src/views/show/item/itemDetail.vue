<template>
  <div>
    <mt-header title="项目简介">
      <router-link to="/show/itemNav" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div class="item-wrap">
      <div class="banner">
        <img :src="this.$imgHost + '414x200/999'" alt="">
      </div>
      <h2 class='item-title'>某某项目简介</h2>
      <p>王家皂民俗旅游村，是日照市秦楼街道的一个渔家小村，曾是一个以海产品捕捞业为主的沿海渔村，风景秀丽，气候宜人，是休闲度假、观光游光....王家皂民俗旅游村，是日照市秦楼街道的一个渔家小村，曾是一个以海产品捕捞业为主的沿海渔村，风景秀丽，气候宜人，是休闲度假、观光游光....</p>
    </div>
  
  </div>
  
</template>
<script>
  import * as mockapi from '@/../mockapi'
  export default{
    data() {
      return {
        content: ''
      }
    },
    methods: {
      getItemNav() {
        mockapi.show.getItemIntro_get({
          typeId: 1,
          id: 2
        }).then(response => {
          var data = response.data.data
          this.navList = data.navList
          console.log(this.navList)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang=less>
.item-wrap{
  padding: 10px;
  .banner{
    width: 100%;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .item-title{
    margin-top: 15px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #333;
  }
  p{
    padding: 5px;
  }
}

</style>
