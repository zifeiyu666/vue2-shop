<template>
  <div class="news-show">
    <div class="wrap clearfix">
      <div class="content-wrap">
        <h3>新闻标题</h3>
        <icon name='angle-right' scale="1.5"></icon>
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
  .news-show { 
    background: #fff;
    padding: 0 10px;
    
    .wrap{
      position: relative;
      border-bottom: 1px solid #eee;
      padding: 15px 10px;
    }
    .content-wrap{
      word-wrap: break-word;
      box-sizing: border-box;
      h3{
        text-align: center;
      }
      .fa-icon{
        position: absolute;
        right: 10px;
        top: 14px;
      }
    }
  }
</style>
