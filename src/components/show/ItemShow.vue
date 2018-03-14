<template>
  <div class="item-show">
    <div class="wrap clearfix">
      <div class="img-wrap fl">
        <img :src="imgHost + '80x80/999'" alt="">
      </div>
      <div class="content-wrap">
        <h3 class="title">项目名称</h3>
        <p>简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</p>
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
      padding: 15px 10px;
    }
    .content-wrap{
      padding-left: 110px;
      padding-right: 15px; 
      word-wrap: break-word;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 14px;
      width: 100%;
      height: 80px;
      overflow: hidden;
      p{
        line-height: 24px;
      }
    }
  }
</style>
