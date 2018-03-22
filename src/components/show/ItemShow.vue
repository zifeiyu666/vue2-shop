<template>
  <div class="item-show">
    <div class="wrap clearfix">
      <div class="img-wrap fl">
        <img :src="itemData.url" alt="">
      </div>
      <div class="content-wrap">
        <h3 class="title">{{itemData.title}}</h3>
        <p>{{itemData.intro}}</p>
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
  .item-show { 
    background: #fff;
    padding: 0 10px;
    .wrap{
      position: relative;
      border-bottom: 1px solid #eee;
      padding: 10px 6px;
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
