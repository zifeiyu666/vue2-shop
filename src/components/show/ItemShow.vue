<template>
  <div class="item-show">
    <div class="wrap clearfix">
      <div class="img-wrap fl">
        <img v-lazy="itemData.imgurl" alt="">
      </div>
      <div class="content-wrap">
        <h3 class="title">{{itemData.name}}</h3>
        <p class='dec'>{{itemData.itemintro}}</p> 
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        imgHost: 'https://dummyimage.com/'
      }
    },
    props: [
      'itemData'
    ],
    methods: {
    
    }
  }
</script>
<style lang="less">
  .dec{
    position:relative;
    line-height:1.4em;
    /* 3 times the line-height to show 3 lines */
    height:2.8em;
    overflow:hidden;
  }
  .dec:after{
    content:"...";
    color: #999;
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    padding:0 10px 1px 45px;
    background:url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png) repeat-y;
  }
  .item-show { 
    background: #fff;
    padding: 0 10px;
    .wrap{
      position: relative;
      border-bottom: 1px solid #eee;
      padding: 10px 6px;
    }
    .img-wrap{
      min-height: 70px;
      img{
        width: 70px;
        height: 70px;
      }
    }
    .content-wrap{
      padding-left: 100px;
      padding-right: 15px; 
      word-wrap: break-word;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 14px;
      width: 100%;
      height: 70px;
      overflow: hidden;
      p{
        margin-top: 4px;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
</style>
